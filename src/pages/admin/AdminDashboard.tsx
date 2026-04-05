import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, DbJob, DbReport } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Clock, CheckCircle2, Calendar, Users, DollarSign, Send, ListChecks, BadgeCheck, Link2, BarChart2, MessageCircle, Mail } from 'lucide-react';

interface JobRow extends DbJob {
  report?: DbReport;
}

const JOB_STATUS_COLORS: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-500',
};

const REPORT_STATUS_COLORS: Record<string, string> = {
  saved: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-700',
  paid: 'bg-amber-100 text-amber-700',
  visible: 'bg-green-100 text-green-700',
};

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, realtors: 0 });
  const [pendingRealtors, setPendingRealtors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [markingPaid, setMarkingPaid] = useState<string>('');
  const [populatingChecklist, setPopulatingChecklist] = useState<string>('');
  const [checklistMsg, setChecklistMsg] = useState<Record<string, string>>({});
  const [attachingJob, setAttachingJob] = useState<JobRow | null>(null);
  const [attachUrl, setAttachUrl] = useState('');
  const [attachSaving, setAttachSaving] = useState(false);
  const [attachError, setAttachError] = useState('');

  async function load() {
    const [{ data: jobData }, { count: realtorCount }, { count: pendingCount }] = await Promise.all([
      supabase.from('jobs').select('*').order('scheduled_at', { ascending: false }).limit(50),
      supabase.from('realtors').select('*', { count: 'exact', head: true }).eq('listed', true),
      supabase.from('realtors').select('*', { count: 'exact', head: true }).eq('backlink_verified', true).eq('approved', false),
    ]);
    setPendingRealtors(pendingCount ?? 0);

    const jobList = (jobData as DbJob[]) ?? [];

    // Fetch reports for all jobs
    const allJobIds = jobList.map(j => j.id);
    const { data: reportData } = allJobIds.length > 0
      ? await supabase.from('reports').select('*').in('job_id', allJobIds)
      : { data: [] };

    const reportMap = Object.fromEntries((reportData ?? []).map((r: DbReport) => [r.job_id, r]));
    const enriched = jobList.map(j => ({ ...j, report: reportMap[j.id] }));

    setJobs(enriched);
    setStats({
      total: jobList.length,
      pending: jobList.filter(j => j.status === 'scheduled' || j.status === 'in_progress').length,
      completed: jobList.filter(j => j.status === 'completed').length,
      realtors: realtorCount ?? 0,
    });
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function populateChecklist(job: JobRow) {
    if (!job.report || !job.homeowner_id) return;
    setPopulatingChecklist(job.id);
    const address = `${job.address}, ${job.city}`;
    let items: any[] = [];

    if (job.report.report_data) {
      // Use structured JSON data
      items = job.report.report_data.sections.flatMap((section: any) =>
        section.findings
          .filter((f: any) => f.priority === 'P1' || f.priority === 'P2' || f.priority === 'P3')
          .map((f: any) => ({
            user_id: job.homeowner_id,
            title: f.location ? `${f.location} — ${f.recommendation.slice(0, 120)}` : f.recommendation.slice(0, 120),
            category: section.name,
            completed: false,
            property_address: address,
            due_date: null,
          }))
      );
    } else {
      // Parse from stored HTML report
      try {
        const res = await fetch(job.report.storage_url);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        doc.querySelectorAll('.page-wrap').forEach(wrap => {
          const sectionName = wrap.querySelector('.section-header h2')?.textContent?.trim() ?? 'General';
          wrap.querySelectorAll('.finding-card.p1, .finding-card.p2, .finding-card.p3').forEach(card => {
            const title = card.querySelector('.finding-title')?.textContent?.trim() ?? '';
            const recEl = card.querySelector('.finding-rec');
            const rec = (recEl?.textContent ?? '').replace('Recommendation:', '').trim();
            items.push({
              user_id: job.homeowner_id,
              title: title ? `${title} — ${rec.slice(0, 100)}` : rec.slice(0, 120),
              category: sectionName,
              completed: false,
              property_address: address,
              due_date: null,
            });
          });
        });
      } catch {
        setChecklistMsg(prev => ({ ...prev, [job.id]: 'Failed to fetch report' }));
        setPopulatingChecklist('');
        return;
      }
    }

    if (items.length === 0) {
      setChecklistMsg(prev => ({ ...prev, [job.id]: 'No P1/P2/P3 findings found' }));
      setPopulatingChecklist('');
      return;
    }
    const { error } = await supabase.from('maintenance').insert(items);
    setChecklistMsg(prev => ({ ...prev, [job.id]: error ? 'Failed' : `Added ${items.length} items` }));
    setPopulatingChecklist('');
  }

  async function markPaid(report: DbReport) {
    setMarkingPaid(report.id);
    await supabase.from('reports')
      .update({ status: 'visible', paid_at: new Date().toISOString() })
      .eq('id', report.id);
    await load();
    setMarkingPaid('');
  }

  async function saveAttachedReport() {
    if (!attachingJob || !attachUrl.trim()) return;
    setAttachSaving(true);
    setAttachError('');
    const job = attachingJob;

    // Upsert job to completed
    const { error: jobErr } = await supabase.from('jobs')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', job.id);
    if (jobErr) { setAttachError('Failed to update job: ' + jobErr.message); setAttachSaving(false); return; }

    // Check if report already exists for this job
    const { data: existing } = await supabase.from('reports').select('id').eq('job_id', job.id).maybeSingle();
    let reportErr;
    if (existing?.id) {
      ({ error: reportErr } = await supabase.from('reports')
        .update({ storage_url: attachUrl.trim(), status: 'sent', generated_at: new Date().toISOString() })
        .eq('id', existing.id));
    } else {
      ({ error: reportErr } = await supabase.from('reports')
        .insert({ job_id: job.id, storage_url: attachUrl.trim(), status: 'sent', report_data: null }));
    }
    if (reportErr) { setAttachError('Failed to save report: ' + reportErr.message); setAttachSaving(false); return; }

    setAttachingJob(null);
    setAttachUrl('');
    setAttachSaving(false);
    await load();
  }

  return (
    <PortalLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">ASADS inspection management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="border-orange-300 text-orange-700">
            <Link to="/admin/outreach" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Outreach
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-green-300 text-green-700">
            <Link to="/admin/seo" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              SEO Rankings
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-indigo-300 text-indigo-700">
            <Link to="/admin/asad" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Asad Analytics
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-purple-300 text-purple-700 relative">
            <Link to="/admin/realtors" className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              Realtors
              {pendingRealtors > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {pendingRealtors}
                </span>
              )}
            </Link>
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/admin/jobs/new" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              New Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Jobs', value: stats.total, icon: <FileText className="h-5 w-5 text-blue-600" />, bg: 'bg-blue-50' },
          { label: 'Active', value: stats.pending, icon: <Clock className="h-5 w-5 text-amber-600" />, bg: 'bg-amber-50' },
          { label: 'Completed', value: stats.completed, icon: <CheckCircle2 className="h-5 w-5 text-green-600" />, bg: 'bg-green-50' },
          { label: 'Listed Realtors', value: stats.realtors, icon: <Users className="h-5 w-5 text-purple-600" />, bg: 'bg-purple-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-5`}>
            <div className="flex items-center justify-between mb-2">
              {s.icon}
              <span className="text-2xl font-bold text-gray-900">{s.value}</span>
            </div>
            <p className="text-sm text-gray-600">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Jobs table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Jobs</h2>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />)}
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No jobs yet.{' '}
            <Link to="/admin/jobs/new" className="text-blue-600 hover:underline">Create the first one.</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {jobs.map(job => (
              <div key={job.id} className="px-5 py-4 hover:bg-gray-50">
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Job info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{job.address}</p>
                    <p className="text-sm text-gray-500">
                      {job.client_name} · {job.client_email} · {job.city} · {job.inspection_type}
                    </p>
                    {job.scheduled_at && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        {new Date(job.scheduled_at).toLocaleDateString('en-CA', {
                          weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </p>
                    )}
                  </div>

                  {/* Status badges + actions */}
                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${JOB_STATUS_COLORS[job.status]}`}>
                      {job.status.replace('_', ' ')}
                    </span>

                    {job.report && (
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${REPORT_STATUS_COLORS[job.report.status]}`}>
                        Report: {job.report.status}
                      </span>
                    )}

                    {job.report && (job.report.storage_url === 'mobile' ? !!job.report.report_data : true) && (
                      <Button asChild size="sm" variant="outline" className="border-slate-300 text-slate-700 text-xs h-7 hover:bg-slate-50">
                        <Link to={`/admin/reports/${job.report.id}`} className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          View Report
                        </Link>
                      </Button>
                    )}

                    {/* Mark Paid button — shown when report is sent but not yet visible */}
                    {job.report && (job.report.status === 'sent' || job.report.status === 'paid') && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-xs h-7 px-3"
                        onClick={() => markPaid(job.report!)}
                        disabled={markingPaid === job.report.id}
                      >
                        <DollarSign className="h-3 w-3 mr-1" />
                        {markingPaid === job.report.id ? 'Updating…' : 'Mark Paid'}
                      </Button>
                    )}

                    {job.report?.status === 'visible' && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Paid · Visible
                      </span>
                    )}

                    {job.report && job.homeowner_id && (
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-300 text-purple-700 text-xs h-7"
                          onClick={() => populateChecklist(job)}
                          disabled={populatingChecklist === job.id}
                        >
                          <ListChecks className="h-3 w-3 mr-1" />
                          {populatingChecklist === job.id ? 'Adding…' : 'Populate Checklist'}
                        </Button>
                        {checklistMsg[job.id] && (
                          <span className="text-xs text-gray-500">{checklistMsg[job.id]}</span>
                        )}
                      </div>
                    )}

                    {/* Attach external report URL */}
                    {job.status !== 'cancelled' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-300 text-amber-700 text-xs h-7 hover:bg-amber-50"
                        onClick={() => { setAttachingJob(job); setAttachUrl(''); setAttachError(''); }}
                      >
                        <Link2 className="h-3 w-3 mr-1" />
                        Attach Report
                      </Button>
                    )}

                    {job.status !== 'cancelled' && (
                      <Button asChild size="sm" variant="outline" className="border-blue-300 text-blue-700 text-xs h-7">
                        <Link to={`/admin/jobs/${job.id}/report`} className="flex items-center gap-1">
                          {job.report ? (
                            <><Send className="h-3 w-3" />Scout / Update Report</>
                          ) : (
                            <><FileText className="h-3 w-3" />Start Scout</>
                          )}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Attach Report Modal */}
      {attachingJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Attach Report</h2>
            <p className="text-sm text-gray-500 mb-4">
              {attachingJob.address}, {attachingJob.city}
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Run <code className="bg-gray-100 px-1 rounded">node scripts/upload-report-to-supabase.mjs</code>, then paste the Report URL here.
            </p>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Report Storage URL</label>
            <input
              type="url"
              value={attachUrl}
              onChange={e => setAttachUrl(e.target.value)}
              placeholder="https://wjxbojjhyocrxqkfnxmz.supabase.co/storage/v1/object/public/Reports/..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            {attachError && <p className="text-xs text-red-600 mb-3">{attachError}</p>}
            <p className="text-xs text-gray-400 mb-4">
              Job will be marked <strong>completed</strong> and report status set to <strong>sent</strong>.
              Click "Mark Paid" after receiving payment to make it visible to the client.
            </p>
            <div className="flex gap-3">
              <Button
                className="bg-blue-600 hover:bg-blue-700 flex-1"
                onClick={saveAttachedReport}
                disabled={attachSaving || !attachUrl.trim()}
              >
                {attachSaving ? 'Saving…' : 'Save Report'}
              </Button>
              <Button variant="outline" onClick={() => setAttachingJob(null)} disabled={attachSaving}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
