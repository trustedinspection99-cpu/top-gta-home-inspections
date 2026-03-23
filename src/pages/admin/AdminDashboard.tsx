import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, DbJob, DbReport } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Clock, CheckCircle2, Calendar, Users, DollarSign, Send, ListChecks } from 'lucide-react';

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
  const [loading, setLoading] = useState(true);
  const [markingPaid, setMarkingPaid] = useState<string>('');
  const [populatingChecklist, setPopulatingChecklist] = useState<string>('');
  const [checklistMsg, setChecklistMsg] = useState<Record<string, string>>({});

  async function load() {
    const [{ data: jobData }, { count: realtorCount }] = await Promise.all([
      supabase.from('jobs').select('*').order('scheduled_at', { ascending: false }).limit(50),
      supabase.from('realtors').select('*', { count: 'exact', head: true }).eq('listed', true),
    ]);

    const jobList = (jobData as DbJob[]) ?? [];

    // Fetch reports for completed jobs
    const completedIds = jobList.filter(j => j.status === 'completed').map(j => j.id);
    const { data: reportData } = completedIds.length > 0
      ? await supabase.from('reports').select('*').in('job_id', completedIds)
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

  return (
    <PortalLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">ASADS inspection management</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/admin/jobs/new" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            New Job
          </Link>
        </Button>
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

                    {job.status !== 'cancelled' && (
                      <Button asChild size="sm" variant="outline" className="border-blue-300 text-blue-700 text-xs h-7">
                        <Link to={`/admin/jobs/${job.id}/report`} className="flex items-center gap-1">
                          {job.report ? (
                            <><Send className="h-3 w-3" />Report</>
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
    </PortalLayout>
  );
}
