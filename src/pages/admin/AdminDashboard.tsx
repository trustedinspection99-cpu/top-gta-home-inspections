import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase, DbJob, DbReport, DbConversationLog } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import {
  PlusCircle, FileText, Clock, CheckCircle2, Calendar, Users, DollarSign,
  Send, ListChecks, BadgeCheck, Link2, BarChart2, MessageCircle, Mail,
  Bell, ChevronDown, ChevronUp, XCircle,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface JobRow extends DbJob { report?: DbReport; }

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

type Tab = 'jobs' | 'asad' | 'notifications';

const LAST_SEEN_KEY = 'pt_asads_admin_last_seen';

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('jobs');
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [asadLogs, setAsadLogs] = useState<DbConversationLog[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, realtors: 0, asadBooked: 0 });
  const [pendingRealtors, setPendingRealtors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [markingPaid, setMarkingPaid] = useState<string>('');
  const [populatingChecklist, setPopulatingChecklist] = useState<string>('');
  const [checklistMsg, setChecklistMsg] = useState<Record<string, string>>({});
  const [attachingJob, setAttachingJob] = useState<JobRow | null>(null);
  const [attachUrl, setAttachUrl] = useState('');
  const [attachSaving, setAttachSaving] = useState(false);
  const [attachError, setAttachError] = useState('');

  // Notifications = Asad bookings since last seen
  const lastSeenRef = useRef<string>(sessionStorage.getItem(LAST_SEEN_KEY) ?? new Date(0).toISOString());
  const [unreadCount, setUnreadCount] = useState(0);

  async function load() {
    const [
      { data: jobData },
      { count: realtorCount },
      { count: pendingCount },
      { data: logData },
    ] = await Promise.all([
      supabase.from('jobs').select('*').order('scheduled_at', { ascending: false }).limit(50),
      supabase.from('realtors').select('*', { count: 'exact', head: true }).eq('listed', true),
      supabase.from('realtors').select('*', { count: 'exact', head: true }).eq('backlink_verified', true).eq('approved', false),
      supabase.from('conversation_logs').select('*').eq('booked', true).order('started_at', { ascending: false }).limit(100),
    ]);

    setPendingRealtors(pendingCount ?? 0);

    const jobList = (jobData as DbJob[]) ?? [];
    const allJobIds = jobList.map(j => j.id);
    const { data: reportData } = allJobIds.length > 0
      ? await supabase.from('reports').select('*').in('job_id', allJobIds)
      : { data: [] };

    const reportMap = Object.fromEntries((reportData ?? []).map((r: DbReport) => [r.job_id, r]));
    const enriched = jobList.map(j => ({ ...j, report: reportMap[j.id] }));
    setJobs(enriched);

    const logs = (logData as DbConversationLog[]) ?? [];
    setAsadLogs(logs);

    const newCount = logs.filter(l => l.started_at > lastSeenRef.current).length;
    setUnreadCount(newCount);

    setStats({
      total: jobList.length,
      pending: jobList.filter(j => j.status === 'scheduled' || j.status === 'in_progress').length,
      completed: jobList.filter(j => j.status === 'completed').length,
      realtors: realtorCount ?? 0,
      asadBooked: logs.length,
    });
    setLoading(false);
  }

  useEffect(() => {
    load();

    // Realtime — new Asad bookings
    const channel = supabase
      .channel('asad-bookings')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'conversation_logs' }, (payload) => {
        const log = payload.new as DbConversationLog;
        if (log.booked) {
          setAsadLogs(prev => [log, ...prev]);
          setUnreadCount(prev => prev + 1);
          setStats(prev => ({ ...prev, asadBooked: prev.asadBooked + 1 }));
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  function openNotificationsTab() {
    setTab('notifications');
    const now = new Date().toISOString();
    lastSeenRef.current = now;
    sessionStorage.setItem(LAST_SEEN_KEY, now);
    setUnreadCount(0);
  }

  // ── Job actions ───────────────────────────────────────────────────────────

  async function populateChecklist(job: JobRow) {
    if (!job.report || !job.homeowner_id) return;
    setPopulatingChecklist(job.id);
    const address = `${job.address}, ${job.city}`;
    let items: any[] = [];

    if (job.report.report_data) {
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

    const { error: jobErr } = await supabase.from('jobs')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', job.id);
    if (jobErr) { setAttachError('Failed to update job: ' + jobErr.message); setAttachSaving(false); return; }

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

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <PortalLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">ASADS inspection management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="border-orange-300 text-orange-700">
            <Link to="/admin/outreach" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />Outreach
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-green-300 text-green-700">
            <Link to="/admin/seo" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />SEO Rankings
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-indigo-300 text-indigo-700">
            <Link to="/admin/asad" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />Asad Analytics
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-purple-300 text-purple-700 relative">
            <Link to="/admin/realtors" className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />Realtors
              {pendingRealtors > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {pendingRealtors}
                </span>
              )}
            </Link>
          </Button>
          {/* Notifications bell */}
          <button
            onClick={openNotificationsTab}
            className="relative p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/admin/jobs/new" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />New Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total Jobs', value: stats.total, icon: <FileText className="h-5 w-5 text-blue-600" />, bg: 'bg-blue-50' },
          { label: 'Active', value: stats.pending, icon: <Clock className="h-5 w-5 text-amber-600" />, bg: 'bg-amber-50' },
          { label: 'Completed', value: stats.completed, icon: <CheckCircle2 className="h-5 w-5 text-green-600" />, bg: 'bg-green-50' },
          { label: 'Asad Bookings', value: stats.asadBooked, icon: <MessageCircle className="h-5 w-5 text-indigo-600" />, bg: 'bg-indigo-50' },
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

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-gray-200">
        {([
          { id: 'jobs', label: 'Jobs', count: stats.total },
          { id: 'asad', label: 'Asad Bookings', count: stats.asadBooked },
          { id: 'notifications', label: 'Notifications', count: unreadCount },
        ] as { id: Tab; label: string; count: number }[]).map(t => (
          <button
            key={t.id}
            onClick={() => t.id === 'notifications' ? openNotificationsTab() : setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors relative ${
              tab === t.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
            {t.count > 0 && t.id === 'notifications' && unreadCount > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                {t.count}
              </span>
            )}
            {t.count > 0 && t.id !== 'notifications' && (
              <span className="ml-1.5 bg-gray-100 text-gray-600 text-xs rounded-full px-1.5 py-0.5">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab: Jobs ── */}
      {tab === 'jobs' && (
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
                            <FileText className="h-3 w-3" />View Report
                          </Link>
                        </Button>
                      )}

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
                          <CheckCircle2 className="h-3.5 w-3.5" />Paid · Visible
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
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-300 text-amber-700 text-xs h-7 hover:bg-amber-50"
                          onClick={() => { setAttachingJob(job); setAttachUrl(''); setAttachError(''); }}
                        >
                          <Link2 className="h-3 w-3 mr-1" />Attach Report
                        </Button>
                      )}

                      {job.status !== 'cancelled' && (
                        <Button asChild size="sm" variant="outline" className="border-blue-300 text-blue-700 text-xs h-7">
                          <Link to={`/admin/jobs/${job.id}/report`} className="flex items-center gap-1">
                            {job.report ? <><Send className="h-3 w-3" />Scout / Update Report</> : <><FileText className="h-3 w-3" />Start Scout</>}
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
      )}

      {/* ── Tab: Asad Bookings ── */}
      {tab === 'asad' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Asad Bookings</h2>
              <p className="text-xs text-gray-400 mt-0.5">Bookings completed via the Asad AI assistant</p>
            </div>
            <Button asChild variant="outline" size="sm" className="text-indigo-600 border-indigo-200">
              <Link to="/admin/asad">Full Analytics →</Link>
            </Button>
          </div>

          {loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />)}
            </div>
          ) : asadLogs.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <MessageCircle className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p>No Asad bookings yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {asadLogs.map(log => (
                <div key={log.id}>
                  <button
                    className="w-full px-5 py-4 hover:bg-gray-50 text-left"
                    onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle2 className="h-3 w-3" />Booked
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {log.client_name ?? 'Unknown'}{log.city ? ` · ${log.city}` : ''}{log.service_type ? ` · ${log.service_type.replace(/-/g, ' ')}` : ''}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(log.started_at).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}
                          {log.client_email ? ` · ${log.client_email}` : ''}
                          {log.client_phone ? ` · ${log.client_phone}` : ''}
                          {log.inspection_date ? ` · ${log.inspection_date}` : ''}
                          {log.price ? ` · ${log.price}` : ''}
                        </p>
                        {log.address && <p className="text-xs text-gray-500 mt-0.5">{log.address}</p>}
                      </div>
                      <span className="text-gray-300 shrink-0">
                        {expandedLogId === log.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </span>
                    </div>
                  </button>

                  {expandedLogId === log.id && (
                    <div className="px-5 pb-4 bg-gray-50 border-t border-gray-100">
                      <div className="mt-3 space-y-2 max-h-80 overflow-y-auto">
                        {log.messages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-lg px-3 py-2 rounded-lg text-sm ${
                              msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-700'
                            }`}>
                              <p className={`text-xs font-semibold mb-1 ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                                {msg.role === 'user' ? 'Visitor' : 'Asad'}
                              </p>
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Notifications ── */}
      {tab === 'notifications' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Activity</h2>
            <p className="text-xs text-gray-400 mt-0.5">Asad bookings — newest first</p>
          </div>

          {asadLogs.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <Bell className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p>No notifications yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {asadLogs.map(log => (
                <div
                  key={log.id}
                  className={`px-5 py-4 ${log.started_at > (sessionStorage.getItem(LAST_SEEN_KEY) ?? '') ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 shrink-0 w-2 h-2 rounded-full ${log.booked ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {log.booked ? 'New booking via Asad' : 'Conversation (not booked)'}
                        {log.client_name ? ` — ${log.client_name}` : ''}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {log.service_type?.replace(/-/g, ' ')}{log.city ? ` · ${log.city}` : ''}
                        {log.client_email ? ` · ${log.client_email}` : ''}
                        {log.inspection_date ? ` · ${log.inspection_date}` : ''}
                        {log.price ? ` · ${log.price}` : ''}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(log.started_at).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>
                    {log.booked ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-300 shrink-0 mt-0.5" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Attach Report Modal */}
      {attachingJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Attach Report</h2>
            <p className="text-sm text-gray-500 mb-4">{attachingJob.address}, {attachingJob.city}</p>
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
