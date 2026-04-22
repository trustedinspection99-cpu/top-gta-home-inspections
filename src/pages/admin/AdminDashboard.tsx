import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase, DbJob, DbReport, DbConversationLog } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import {
  PlusCircle, FileText, Clock, CheckCircle2, Calendar, Users, DollarSign,
  Send, ListChecks, BadgeCheck, Link2, BarChart2, MessageCircle, Mail,
  Bell, ChevronDown, ChevronUp, XCircle, Eye, Search, Radio,
  Phone, RefreshCw, TrendingUp, PhoneCall,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface JobRow extends DbJob { report?: DbReport; }

interface VisitorEvent {
  id: string; session_id: string; created_at: string; type: string; page: string | null; data: any;
}

interface VisitorSession {
  id: string; created_at: string; entry_page: string; referrer: string | null;
  utm_source: string | null; utm_medium: string | null; utm_campaign: string | null;
  utm_term: string | null; source: string;
  visitor_events: VisitorEvent[];
  page_count: number; converted: boolean; is_live: boolean;
}

interface Client {
  id: string; name: string | null; email: string | null; phone: string | null;
  created_at: string; jobs: { count: number }[];
}

interface PaidReport {
  id: string; status: string; paid_at: string | null; generated_at: string | null;
  report_data: any | null;
  jobs: { client_name: string | null; city: string | null; inspection_type: string | null; scheduled_at: string | null } | null;
}

interface PendingReport {
  id: string;
  report_data: any | null;
  jobs: { client_name: string | null; city: string | null; inspection_type: string | null } | null;
}

interface ActionItem {
  label: string;
  detail: string;
  count: number;
  color: 'red' | 'amber' | 'blue';
}

const SOURCE_META: Record<string, { icon: string; label: string }> = {
  organic:  { icon: '🔍', label: 'Organic Search' },
  direct:   { icon: '🔗', label: 'Direct' },
  referral: { icon: '↗️', label: 'Referral' },
  paid:     { icon: '💰', label: 'Paid Ads' },
  social:   { icon: '📱', label: 'Social' },
};

const EVENT_ICONS: Record<string, string> = {
  page_view:      '📄',
  booking_start:  '📋',
  booking_submit: '✅',
  cta_click:      '🖱',
  leave:          '👋',
};

const fmtRelative = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

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

type Tab = 'jobs' | 'asad' | 'visitors' | 'notifications' | 'clients' | 'revenue' | 'broadcast';

const LAST_SEEN_KEY = 'pt_asads_admin_last_seen';

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('jobs');
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [asadLogs, setAsadLogs] = useState<DbConversationLog[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, realtors: 0, asadBooked: 0, leadsTotal: 0 });
  const [pendingRealtors, setPendingRealtors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [changingStatus, setChangingStatus] = useState<string>('');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [markingPaid, setMarkingPaid] = useState<string>('');
  const [populatingChecklist, setPopulatingChecklist] = useState<string>('');
  const [checklistMsg, setChecklistMsg] = useState<Record<string, string>>({});
  const [attachingJob, setAttachingJob] = useState<JobRow | null>(null);
  const [attachUrl, setAttachUrl] = useState('');
  const [attachSaving, setAttachSaving] = useState(false);
  const [attachError, setAttachError] = useState('');

  // Job search / filter
  const [jobSearch, setJobSearch] = useState('');
  const [jobStatusFilter, setJobStatusFilter] = useState('all');

  // Visitors
  const [visitors, setVisitors] = useState<VisitorSession[]>([]);
  const [liveCount, setLiveCount] = useState(0);
  const [visitorsLoaded, setVisitorsLoaded] = useState(false);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [visitorTimeFilter, setVisitorTimeFilter] = useState<'today' | '7d' | '30d' | 'all'>('7d');
  const [visitorSourceFilter, setVisitorSourceFilter] = useState('all');
  const [showConvertedOnly, setShowConvertedOnly] = useState(false);

  // Notifications
  const lastSeenRef = useRef<string>(sessionStorage.getItem(LAST_SEEN_KEY) ?? new Date(0).toISOString());
  const [unreadCount, setUnreadCount] = useState(0);

  // Clients
  const [clients, setClients] = useState<Client[]>([]);
  const [clientSearch, setClientSearch] = useState('');
  const [clientsLoaded, setClientsLoaded] = useState(false);

  // Revenue
  const [paidReports, setPaidReports] = useState<PaidReport[]>([]);
  const [pendingReports, setPendingReports] = useState<PendingReport[]>([]);
  const [revenueLoaded, setRevenueLoaded] = useState(false);

  // Revenue intelligence
  const [totalConvCount, setTotalConvCount] = useState(0);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [totalRevenueCad, setTotalRevenueCad] = useState(0);
  const [mtdRevenueCad, setMtdRevenueCad] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<{ month: string; cad: number }[]>([]);
  const [avgDaysToCollect, setAvgDaysToCollect] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Broadcast
  const [bSubject, setBSubject] = useState('');
  const [bBody, setBBody] = useState('');
  const [bSending, setBSending] = useState(false);
  const [bResult, setBResult] = useState<string | null>(null);

  async function load() {
    setLoadError(null);
    const now = new Date();
    const in24h = new Date(now.getTime() + 24 * 3600000).toISOString();
    const threeDaysAgo = new Date(now.getTime() - 3 * 86400000).toISOString();

    try {
    const [
      { data: jobData, error: jobErr },
      { count: realtorCount },
      { count: pendingCount },
      { data: logData },
      { count: totalConvs },
      { data: overdueReports },
      { data: upcoming24h },
    ] = await Promise.all([
      supabase.from('jobs').select('*').order('scheduled_at', { ascending: false }).limit(200),
      supabase.from('realtors').select('*', { count: 'exact', head: true }).eq('listed', true),
      supabase.from('realtors').select('*', { count: 'exact', head: true }).eq('backlink_verified', true).eq('approved', false),
      supabase.from('conversation_logs').select('*').not('client_name', 'is', null).order('started_at', { ascending: false }).limit(100),
      supabase.from('conversation_logs').select('*', { count: 'exact', head: true }),
      supabase.from('reports').select('id, generated_at').eq('status', 'sent').lt('generated_at', threeDaysAgo),
      supabase.from('jobs').select('id, address, city, scheduled_at').in('status', ['scheduled']).gte('scheduled_at', now.toISOString()).lte('scheduled_at', in24h),
    ]);

    if (jobErr) { setLoadError(`Failed to load jobs: ${jobErr.message}`); setLoading(false); return; }

    setPendingRealtors(pendingCount ?? 0);
    setTotalConvCount(totalConvs ?? 0);

    const jobList = (jobData as DbJob[]) ?? [];
    const allJobIds = jobList.map(j => j.id);
    const { data: reportData } = allJobIds.length > 0
      ? await supabase.from('reports').select('*').in('job_id', allJobIds)
      : { data: [] };

    const reportMap = Object.fromEntries((reportData ?? []).map((r: DbReport) => [r.job_id, r]));
    const enriched = jobList.map(j => ({ ...j, report: reportMap[j.id] }));
    setJobs(enriched);

    // Action items
    const items: ActionItem[] = [];
    const overdueCount = (overdueReports ?? []).length;
    if (overdueCount > 0) {
      items.push({
        label: `${overdueCount} unpaid report${overdueCount > 1 ? 's' : ''} — 3+ days`,
        detail: 'Follow up with clients to collect payment',
        count: overdueCount,
        color: 'red',
      });
    }
    const upcomingCount = (upcoming24h ?? []).length;
    if (upcomingCount > 0) {
      items.push({
        label: `${upcomingCount} job${upcomingCount > 1 ? 's' : ''} in next 24 hours`,
        detail: (upcoming24h as any[]).map(j => j.address).join(', '),
        count: upcomingCount,
        color: 'blue',
      });
    }
    // Jobs completed with no report
    const noReportCompleted = jobList.filter(j => j.status === 'completed' && !reportMap[j.id]).length;
    if (noReportCompleted > 0) {
      items.push({
        label: `${noReportCompleted} completed job${noReportCompleted > 1 ? 's' : ''} without a report`,
        detail: 'Generate and attach reports for these inspections',
        count: noReportCompleted,
        color: 'amber',
      });
    }
    setActionItems(items);

    const logs = (logData as DbConversationLog[]) ?? [];
    setAsadLogs(logs);

    const newCount = logs.filter(l => l.started_at > lastSeenRef.current).length;
    setUnreadCount(newCount);

    setStats({
      total: jobList.length,
      pending: jobList.filter(j => j.status === 'scheduled' || j.status === 'in_progress').length,
      completed: jobList.filter(j => j.status === 'completed').length,
      realtors: realtorCount ?? 0,
      asadBooked: logs.filter(l => l.booked).length,
      leadsTotal: logs.length,
    });
    setLastRefreshed(new Date());
    setLoading(false);
    setRefreshing(false);
    } catch (e: any) {
      setLoadError(`Unexpected error: ${e.message}`);
      setLoading(false);
    }
  }

  async function loadVisitors(range: 'today' | '7d' | '30d' | 'all' = visitorTimeFilter) {
    setVisitorsLoaded(false);
    const now = new Date();
    let startDate: string | null = null;
    if (range === 'today') {
      const d = new Date(now); d.setHours(0, 0, 0, 0); startDate = d.toISOString();
    } else if (range === '7d') {
      startDate = new Date(now.getTime() - 7 * 86400000).toISOString();
    } else if (range === '30d') {
      startDate = new Date(now.getTime() - 30 * 86400000).toISOString();
    }

    let q = supabase.from('visitor_sessions').select('*, visitor_events(*)').order('created_at', { ascending: false }).limit(500);
    if (startDate) q = q.gte('created_at', startDate);

    const { data } = await q;
    if (!data) { setVisitorsLoaded(true); return; }

    const FIVE_MIN = 5 * 60 * 1000;
    const nowMs = Date.now();

    const enriched: VisitorSession[] = (data as any[]).map(s => {
      const events: VisitorEvent[] = (s.visitor_events ?? []).sort(
        (a: VisitorEvent, b: VisitorEvent) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      const lastEvent = events.at(-1);
      const isLive = lastEvent ? (nowMs - new Date(lastEvent.created_at).getTime()) < FIVE_MIN : false;
      const pageCount = events.filter(e => e.type === 'page_view').length;
      const converted = events.some(e => ['booking_submit', 'quote_submit'].includes(e.type));
      return { ...s, visitor_events: events, page_count: pageCount, converted, is_live: isLive };
    });

    setVisitors(enriched);
    setLiveCount(enriched.filter(s => s.is_live).length);
    setVisitorsLoaded(true);
  }

  async function loadClients() {
    const { data } = await supabase
      .from('users')
      .select('id, name, email, phone, created_at, jobs(count)')
      .eq('role', 'homeowner')
      .order('created_at', { ascending: false });
    setClients((data as Client[]) ?? []);
    setClientsLoaded(true);
  }

  function centsToReport(r: PaidReport): number {
    const s = r.report_data?.summary;
    if (!s) return 0;
    if (s.baseCents !== undefined) return (s.baseCents ?? 0) + (s.taxCents ?? 0);
    if (s.price) {
      const n = parseFloat(String(s.price).replace(/[^0-9.]/g, ''));
      return isNaN(n) ? 0 : Math.round(n * 100);
    }
    return 0;
  }

  async function loadRevenue() {
    const [{ data: paid }, { data: pending }] = await Promise.all([
      supabase
        .from('reports')
        .select('id, status, paid_at, generated_at, report_data, jobs(client_name, city, inspection_type, scheduled_at)')
        .in('status', ['paid', 'visible'])
        .order('paid_at', { ascending: false }),
      supabase
        .from('reports')
        .select('id, report_data, jobs(client_name, city, inspection_type)')
        .eq('status', 'sent'),
    ]);

    const paidList = (paid as PaidReport[]) ?? [];
    setPaidReports(paidList);
    setPendingReports((pending as PendingReport[]) ?? []);

    // Compute revenue totals from report_data
    const nowMs = Date.now();
    const mtdStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
    let total = 0;
    let mtd = 0;
    const byMonth: Record<string, number> = {};

    for (const r of paidList) {
      const cents = centsToReport(r);
      total += cents;
      const paidMs = r.paid_at ? new Date(r.paid_at).getTime() : 0;
      if (paidMs >= mtdStart) mtd += cents;
      if (r.paid_at) {
        const monthKey = r.paid_at.slice(0, 7); // YYYY-MM
        byMonth[monthKey] = (byMonth[monthKey] ?? 0) + cents;
      }
    }

    setTotalRevenueCad(total);
    setMtdRevenueCad(mtd);

    // Time-to-collect: avg days from generated_at → paid_at
    const collectTimes = paidList
      .filter(r => r.paid_at && r.generated_at)
      .map(r => (new Date(r.paid_at!).getTime() - new Date(r.generated_at!).getTime()) / 86400000);
    setAvgDaysToCollect(collectTimes.length > 0 ? collectTimes.reduce((a, b) => a + b, 0) / collectTimes.length : null);

    // Build sorted monthly series (last 6 months)
    const months = Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, cents]) => ({ month, cad: cents / 100 }));
    setMonthlyRevenue(months);

    setRevenueLoaded(true);
  }

  async function sendBroadcast() {
    if (!bSubject.trim() || !bBody.trim()) return;
    if (!confirm(`Send to all registered homeowners?\n\nSubject: ${bSubject}`)) return;
    setBSending(true);
    setBResult(null);
    try {
      const r = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'broadcast', subject: bSubject, body: bBody }),
      });
      const json = await r.json();
      if (json.ok) setBResult(`Sent to ${json.sent} homeowners`);
      else setBResult('Error: ' + (json.error ?? 'unknown'));
    } catch (e: any) {
      setBResult('Error: ' + e.message);
    }
    setBSending(false);
  }

  useEffect(() => {
    load();

    const channel = supabase
      .channel('admin-live')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'conversation_logs' }, (payload) => {
        const log = payload.new as DbConversationLog;
        setTotalConvCount(prev => prev + 1);
        if (log.booked) {
          setAsadLogs(prev => [log, ...prev]);
          setUnreadCount(prev => prev + 1);
          setStats(prev => ({ ...prev, asadBooked: prev.asadBooked + 1 }));
        }
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'jobs' }, () => load())
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'jobs' }, () => load())
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
    const paidAt = new Date().toISOString();
    // Optimistic: update local state immediately so UI responds instantly
    setJobs(prev => prev.map(j =>
      j.report?.id === report.id
        ? { ...j, report: { ...j.report!, status: 'visible', paid_at: paidAt } }
        : j
    ));
    setMarkingPaid(report.id);
    const { error } = await supabase.from('reports')
      .update({ status: 'visible', paid_at: paidAt })
      .eq('id', report.id);
    if (error) {
      // Revert on failure
      setJobs(prev => prev.map(j =>
        j.report?.id === report.id
          ? { ...j, report: { ...j.report!, status: report.status, paid_at: report.paid_at } }
          : j
      ));
    }
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

  async function changeJobStatus(jobId: string, newStatus: DbJob['status']) {
    setChangingStatus(jobId);
    const patch: Record<string, string | null> = { status: newStatus };
    if (newStatus === 'completed') patch.completed_at = new Date().toISOString();
    await supabase.from('jobs').update(patch).eq('id', jobId);
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
    setChangingStatus('');
  }

  // ── Derived ───────────────────────────────────────────────────────────────

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayJobs = jobs.filter(j =>
    j.scheduled_at && j.scheduled_at.slice(0, 10) === todayStr && j.status !== 'cancelled'
  );
  const conversionRate = stats.leadsTotal > 0
    ? Math.round((stats.asadBooked / stats.leadsTotal) * 100)
    : 0;

  const filteredJobs = jobs.filter(j => {
    const q = jobSearch.toLowerCase();
    const matchSearch = !q || j.address?.toLowerCase().includes(q) ||
      j.client_name?.toLowerCase().includes(q) || j.client_email?.toLowerCase().includes(q) ||
      j.client_phone?.toLowerCase().includes(q);
    const matchStatus = jobStatusFilter === 'all' || j.status === jobStatusFilter;
    return matchSearch && matchStatus;
  });

  const filteredClients = clients.filter(c => {
    const q = clientSearch.toLowerCase();
    return !q || c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.phone?.toLowerCase().includes(q);
  });

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <PortalLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">
            ASADS inspection management · refreshed {lastRefreshed.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })}
          </p>
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
          <button
            onClick={() => { setRefreshing(true); load(); }}
            disabled={refreshing}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`h-5 w-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
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
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
        {[
          { label: 'Total Jobs', value: stats.total, icon: <FileText className="h-5 w-5 text-blue-600" />, bg: 'bg-blue-50' },
          { label: 'Active', value: stats.pending, icon: <Clock className="h-5 w-5 text-amber-600" />, bg: 'bg-amber-50' },
          { label: 'Completed', value: stats.completed, icon: <CheckCircle2 className="h-5 w-5 text-green-600" />, bg: 'bg-green-50' },
          { label: 'Leads / Booked', value: `${stats.leadsTotal} / ${stats.asadBooked}`, icon: <MessageCircle className="h-5 w-5 text-indigo-600" />, bg: 'bg-indigo-50' },
          { label: 'Chat Conversion', value: stats.leadsTotal > 0 ? `${conversionRate}%` : '—', icon: <TrendingUp className="h-5 w-5 text-rose-600" />, bg: 'bg-rose-50' },
          { label: 'Listed Realtors', value: stats.realtors, icon: <Users className="h-5 w-5 text-purple-600" />, bg: 'bg-purple-50' },
          {
            label: 'Revenue MTD',
            value: mtdRevenueCad > 0 ? `$${(mtdRevenueCad / 100).toLocaleString('en-CA', { minimumFractionDigits: 0 })}` : '—',
            icon: <DollarSign className="h-5 w-5 text-emerald-600" />,
            bg: 'bg-emerald-50',
          },
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

      {/* Load error */}
      {loadError && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
          <span className="font-semibold">Error:</span> {loadError}
          <button onClick={load} className="ml-auto text-red-600 underline text-xs">Retry</button>
        </div>
      )}

      {/* Action Required */}
      {actionItems.length > 0 && (
        <div className="mb-4 space-y-2">
          {actionItems.map((item, i) => {
            const colorMap = {
              red: 'bg-red-50 border-red-200 text-red-800',
              amber: 'bg-amber-50 border-amber-200 text-amber-800',
              blue: 'bg-blue-50 border-blue-200 text-blue-800',
            };
            const dotMap = { red: 'bg-red-500', amber: 'bg-amber-500', blue: 'bg-blue-500' };
            return (
              <div key={i} className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${colorMap[item.color]}`}>
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${dotMap[item.color]}`} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs opacity-75 truncate">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Today's Jobs */}
      {todayJobs.length > 0 && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-blue-100 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <p className="text-sm font-semibold text-blue-800">Today — {new Date().toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{todayJobs.length} job{todayJobs.length > 1 ? 's' : ''}</span>
          </div>
          <div className="divide-y divide-blue-100">
            {todayJobs.map(job => (
              <div key={job.id} className="px-5 py-3 flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{job.address}, {job.city}</p>
                  <p className="text-xs text-gray-600">{job.client_name} · {job.inspection_type}</p>
                  <p className="text-xs text-blue-600 font-medium mt-0.5">
                    {new Date(job.scheduled_at!).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {(job.client_phone) && (
                    <a href={`tel:${job.client_phone}`} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">
                      <PhoneCall className="h-3 w-3" />{job.client_phone}
                    </a>
                  )}
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${JOB_STATUS_COLORS[job.status]}`}>{job.status.replace('_', ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-gray-200 overflow-x-auto">
        {([
          { id: 'jobs', label: 'Jobs', count: stats.total },
          { id: 'asad', label: 'Asad Bookings', count: stats.asadBooked },
          { id: 'visitors', label: 'Visitors', count: liveCount },
          { id: 'notifications', label: 'Notifications', count: unreadCount },
          { id: 'clients', label: 'Clients', count: clients.length },
          { id: 'revenue', label: 'Revenue', count: paidReports.length },
          { id: 'broadcast', label: 'Broadcast', count: 0 },
        ] as { id: Tab; label: string; count: number }[]).map(t => (
          <button
            key={t.id}
            onClick={() => {
              if (t.id === 'notifications') { openNotificationsTab(); return; }
              setTab(t.id as Tab);
              if (t.id === 'visitors' && !visitorsLoaded) loadVisitors(visitorTimeFilter);
              if (t.id === 'clients' && !clientsLoaded) loadClients();
              if (t.id === 'revenue' && !revenueLoaded) loadRevenue();
            }}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors relative whitespace-nowrap ${
              tab === t.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
            {t.id === 'notifications' && unreadCount > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                {unreadCount}
              </span>
            )}
            {t.id === 'visitors' && liveCount > 0 && (
              <span className="ml-1.5 bg-green-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                {liveCount}
              </span>
            )}
            {!['notifications', 'visitors', 'broadcast'].includes(t.id) && t.count > 0 && (
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
          {/* Search + filter bar */}
          <div className="px-5 py-4 border-b border-gray-100 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by address, client name or email…"
                  value={jobSearch}
                  onChange={e => setJobSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-1 flex-wrap">
                {(['all', 'scheduled', 'in_progress', 'completed', 'cancelled'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setJobStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      jobStatusFilter === s
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s === 'all' ? 'All' : s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-400">{filteredJobs.length} of {jobs.length} jobs</p>
          </div>

          {loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />)}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              {jobs.length === 0
                ? <><p>No jobs yet.</p><Link to="/admin/jobs/new" className="text-blue-600 hover:underline">Create the first one.</Link></>
                : <p>No jobs match your search.</p>
              }
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredJobs.map(job => (
                <div key={job.id} className="px-5 py-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{job.address}, {job.city}</p>
                      <div className="flex items-center gap-3 flex-wrap mt-0.5">
                        <p className="text-sm text-gray-600 font-medium">{job.client_name}</p>
                        {job.client_phone && (
                          <a href={`tel:${job.client_phone}`} className="flex items-center gap-1 text-sm text-green-700 font-semibold hover:underline">
                            <Phone className="h-3.5 w-3.5" />{job.client_phone}
                          </a>
                        )}
                        {job.client_email && (
                          <a href={`mailto:${job.client_email}`} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                            <Mail className="h-3 w-3" />{job.client_email}
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        <p className="text-xs text-gray-500">{job.inspection_type}</p>
                        {job.scheduled_at && (
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(job.scheduled_at).toLocaleDateString('en-CA', {
                              weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                            })}
                          </p>
                        )}
                        {job.report?.report_data?.summary?.price && (
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            {job.report.report_data.summary.price} CAD
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${JOB_STATUS_COLORS[job.status]}`}>
                        {job.status.replace('_', ' ')}
                      </span>

                      {/* Quick status change */}
                      {job.status === 'scheduled' && (
                        <button
                          onClick={() => changeJobStatus(job.id, 'in_progress')}
                          disabled={changingStatus === job.id}
                          className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                        >
                          → In Progress
                        </button>
                      )}
                      {job.status === 'in_progress' && (
                        <button
                          onClick={() => changeJobStatus(job.id, 'completed')}
                          disabled={changingStatus === job.id}
                          className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                        >
                          ✓ Complete
                        </button>
                      )}

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
                        <div className="flex items-center gap-1">
                          <Button asChild size="sm" variant="outline" className="border-blue-300 text-blue-700 text-xs h-7">
                            <Link to={`/admin/jobs/${job.id}/report`} className="flex items-center gap-1">
                              {job.report ? <><Send className="h-3 w-3" />Scout / Update Report</> : <><FileText className="h-3 w-3" />Start Scout</>}
                            </Link>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="border-orange-300 text-orange-700 text-xs h-7">
                            <Link to={`/admin/jobs/${job.id}/wett`} className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />WETT
                            </Link>
                          </Button>
                        </div>
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
        <div className="space-y-4">
          {/* Conversion funnel KPIs */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: 'Total Conversations',
                value: totalConvCount,
                sub: 'all time',
                color: 'text-gray-900',
                bg: 'bg-white border border-gray-200',
              },
              {
                label: 'Bookings Completed',
                value: stats.asadBooked,
                sub: `${totalConvCount > 0 ? ((stats.asadBooked / totalConvCount) * 100).toFixed(1) : '0'}% conversion`,
                color: 'text-green-700',
                bg: 'bg-green-50 border border-green-100',
              },
              {
                label: 'Drop-offs',
                value: Math.max(0, totalConvCount - stats.asadBooked),
                sub: 'left before booking',
                color: 'text-amber-700',
                bg: 'bg-amber-50 border border-amber-100',
              },
            ].map(k => (
              <div key={k.label} className={`rounded-xl p-5 ${k.bg}`}>
                <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                <p className="text-sm text-gray-700 font-medium mt-1">{k.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{k.sub}</p>
              </div>
            ))}
          </div>

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
              <p>No conversations yet.</p>
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
                      {log.booked ? (
                        <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle2 className="h-3 w-3" />Booked
                        </span>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          Lead
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {log.client_name ?? 'Unknown'}{log.city ? ` · ${log.city}` : ''}{log.service_type ? ` · ${log.service_type.replace(/-/g, ' ')}` : ''}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap mt-0.5">
                          <span className="text-xs text-gray-400">
                            {new Date(log.started_at).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                          {log.client_phone && (
                            <a href={`tel:${log.client_phone}`} onClick={e => e.stopPropagation()} className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full hover:bg-green-200">
                              <Phone className="h-3 w-3" />{log.client_phone}
                            </a>
                          )}
                          {log.client_email && (
                            <a href={`mailto:${log.client_email}`} onClick={e => e.stopPropagation()} className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200">
                              <Mail className="h-3 w-3" />{log.client_email}
                            </a>
                          )}
                          {log.price && <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{log.price}</span>}
                          {log.inspection_date && <span className="text-xs text-gray-400">📅 {log.inspection_date}</span>}
                        </div>
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
        </div>
      )}

      {/* ── Tab: Visitors ── */}
      {tab === 'visitors' && (() => {
        // Derived stats
        const filtered = visitors.filter(s => {
          if (visitorSourceFilter !== 'all' && s.source !== visitorSourceFilter) return false;
          if (showConvertedOnly && !s.converted) return false;
          return true;
        });
        const conversions = filtered.filter(s => s.converted).length;
        const convRate = filtered.length > 0 ? ((conversions / filtered.length) * 100).toFixed(1) : '0';
        const avgPages = filtered.length > 0
          ? (filtered.reduce((a, s) => a + s.page_count, 0) / filtered.length).toFixed(1)
          : '0';

        // Source breakdown (from all visitors, not filtered)
        const sourceCounts: Record<string, number> = {};
        for (const s of visitors) sourceCounts[s.source] = (sourceCounts[s.source] ?? 0) + 1;
        const sourceList = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]);

        // Top pages from all page_view events across loaded sessions
        const pageCounts: Record<string, number> = {};
        for (const s of visitors) {
          for (const e of s.visitor_events) {
            if (e.type === 'page_view' && e.page) {
              pageCounts[e.page] = (pageCounts[e.page] ?? 0) + 1;
            }
          }
        }
        const topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
        const maxPageCount = topPages[0]?.[1] ?? 1;

        return (
          <div className="space-y-4">
            {/* Live bar + time filter */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border flex-1 min-w-48 ${liveCount > 0 ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${liveCount > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                <p className="text-sm font-semibold text-gray-800">
                  {liveCount > 0 ? `${liveCount} live now` : 'No live visitors'}
                </p>
                <span className="text-xs text-gray-400">· active within 5 min</span>
              </div>
              <div className="flex gap-1">
                {(['today', '7d', '30d', 'all'] as const).map(r => (
                  <button
                    key={r}
                    onClick={() => { setVisitorTimeFilter(r); loadVisitors(r); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      visitorTimeFilter === r ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {r === 'all' ? 'All time' : r}
                  </button>
                ))}
              </div>
              <button onClick={() => loadVisitors(visitorTimeFilter)} className="text-xs text-blue-600 hover:underline px-2">
                Refresh
              </button>
            </div>

            {!visitorsLoaded ? (
              <div className="p-10 text-center text-gray-400">
                <Eye className="h-8 w-8 mx-auto mb-3 opacity-30" />
                <p>Loading visitor data…</p>
              </div>
            ) : visitors.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-400">
                <Eye className="h-8 w-8 mx-auto mb-3 opacity-30" />
                <p className="font-medium text-gray-600 mb-1">No visitor data yet</p>
                <p className="text-sm">Try a wider time range or check your tracking tables.</p>
              </div>
            ) : (
              <>
                {/* Summary stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { label: 'Sessions', value: filtered.length, sub: `of ${visitors.length} total` },
                    { label: 'Conversions', value: conversions, sub: `${convRate}% rate` },
                    { label: 'Avg Pages', value: avgPages, sub: 'per session' },
                    { label: 'Live Now', value: liveCount, sub: 'active < 5 min' },
                  ].map(s => (
                    <div key={s.label} className="bg-white border border-gray-200 rounded-xl px-5 py-4">
                      <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                      <p className="text-xs font-semibold text-gray-600 mt-1">{s.label}</p>
                      <p className="text-xs text-gray-400">{s.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Source breakdown + Top pages side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Source breakdown */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">Traffic Sources</h3>
                    </div>
                    <div className="p-4 space-y-2">
                      {sourceList.map(([src, count]) => {
                        const meta = SOURCE_META[src] ?? { icon: '🌐', label: src };
                        const pct = Math.round((count / visitors.length) * 100);
                        return (
                          <button
                            key={src}
                            onClick={() => setVisitorSourceFilter(visitorSourceFilter === src ? 'all' : src)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                              visitorSourceFilter === src ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                            }`}
                          >
                            <span>{meta.icon}</span>
                            <span className="flex-1 text-left text-gray-700 font-medium">{meta.label}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Top pages */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">Top Pages</h3>
                    </div>
                    <div className="p-4 space-y-2">
                      {topPages.length === 0 ? (
                        <p className="text-xs text-gray-400 py-2">No page view data yet.</p>
                      ) : topPages.map(([page, count]) => (
                        <div key={page} className="flex items-center gap-3 text-sm">
                          <span className="flex-1 font-mono text-xs text-gray-700 truncate">{page}</span>
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${Math.round((count / maxPageCount) * 100)}%` }} />
                            </div>
                            <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Session list */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3 flex-wrap">
                    <h3 className="text-sm font-semibold text-gray-900">Sessions</h3>
                    <span className="text-xs text-gray-400">{filtered.length} shown</span>
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        onClick={() => setShowConvertedOnly(!showConvertedOnly)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                          showConvertedOnly ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        ✅ Converted only
                      </button>
                      {visitorSourceFilter !== 'all' && (
                        <button
                          onClick={() => setVisitorSourceFilter('all')}
                          className="px-3 py-1 rounded-lg text-xs bg-blue-100 text-blue-700 font-medium"
                        >
                          {SOURCE_META[visitorSourceFilter]?.label ?? visitorSourceFilter} ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {filtered.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">No sessions match the current filters.</div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {filtered.map(session => {
                        const sourceMeta = SOURCE_META[session.source] ?? { icon: '🌐', label: session.source };
                        const expanded = expandedSession === session.id;
                        const lastEvent = session.visitor_events.at(-1);
                        const firstTs = session.visitor_events[0]?.created_at ?? session.created_at;
                        const lastTs = lastEvent?.created_at ?? session.created_at;
                        const durationMs = new Date(lastTs).getTime() - new Date(firstTs).getTime();
                        const durationStr = durationMs < 60000
                          ? `${Math.round(durationMs / 1000)}s`
                          : `${Math.floor(durationMs / 60000)}m ${Math.round((durationMs % 60000) / 1000)}s`;
                        return (
                          <div key={session.id} className={`${session.is_live ? 'bg-green-50/50' : ''}`}>
                            <button
                              className="w-full px-5 py-3.5 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                              onClick={() => setExpandedSession(expanded ? null : session.id)}
                            >
                              <span className={`w-2 h-2 rounded-full shrink-0 ${session.is_live ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                              <span className="text-lg shrink-0">{sourceMeta.icon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-xs font-mono text-gray-700 truncate">{session.entry_page}</span>
                                  {session.page_count > 1 && <span className="text-xs text-gray-400">→ {session.page_count - 1} more</span>}
                                  {session.converted && (
                                    <span className="text-xs bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold">✅ Converted</span>
                                  )}
                                  {session.is_live && (
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">● Live</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs text-gray-400">{sourceMeta.label}</span>
                                  {session.utm_source && (
                                    <span className="text-xs text-gray-400">· {session.utm_source}{session.utm_campaign ? ` / ${session.utm_campaign}` : ''}</span>
                                  )}
                                  {session.referrer && !session.utm_source && (
                                    <span className="text-xs text-gray-400 truncate max-w-xs">· from {session.referrer.replace(/^https?:\/\//, '').split('/')[0]}</span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-xs text-gray-500">{session.page_count} page{session.page_count !== 1 ? 's' : ''} · {durationStr}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{fmtRelative(lastEvent?.created_at ?? session.created_at)}</p>
                              </div>
                              <span className={`text-gray-400 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}>
                                <ChevronDown className="h-4 w-4" />
                              </span>
                            </button>

                            {expanded && (
                              <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Session Journey</p>
                                <div className="space-y-1.5 max-h-64 overflow-y-auto">
                                  {session.visitor_events.map(event => (
                                    <div key={event.id} className="flex items-start gap-2.5 text-xs">
                                      <span className="text-base shrink-0 mt-0.5">{EVENT_ICONS[event.type] ?? '•'}</span>
                                      <div className="flex-1 min-w-0">
                                        <span className={`font-medium ${
                                          event.type === 'leave' ? 'text-gray-400' :
                                          ['booking_submit', 'quote_submit'].includes(event.type) ? 'text-green-600' :
                                          'text-gray-700'
                                        }`}>
                                          {event.type === 'page_view' ? (event.page || '/') : event.type.replace(/_/g, ' ')}
                                        </span>
                                        {event.data && Object.keys(event.data).length > 0 && (
                                          <span className="text-gray-400 ml-2">· {Object.values(event.data).join(', ')}</span>
                                        )}
                                      </div>
                                      <span className="text-gray-400 shrink-0">{fmtRelative(event.created_at)}</span>
                                    </div>
                                  ))}
                                  {session.visitor_events.length === 0 && (
                                    <p className="text-gray-400">No events recorded.</p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })()}

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

      {/* ── Tab: Clients ── */}
      {tab === 'clients' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Registered Homeowners</h2>
              <span className="text-sm text-gray-400">{filteredClients.length} clients</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or phone…"
                value={clientSearch}
                onChange={e => setClientSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {!clientsLoaded ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />)}
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <Users className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p>{clients.length === 0 ? 'No registered homeowners yet.' : 'No clients match your search.'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                  <tr>
                    <th className="px-5 py-3 text-left">Name</th>
                    <th className="px-5 py-3 text-left">Email</th>
                    <th className="px-5 py-3 text-left">Phone</th>
                    <th className="px-5 py-3 text-center">Inspections</th>
                    <th className="px-5 py-3 text-left">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredClients.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-900">{c.name ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{c.email ?? '—'}</td>
                      <td className="px-5 py-3 text-gray-600">{c.phone ?? '—'}</td>
                      <td className="px-5 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                          {c.jobs?.[0]?.count ?? 0}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-400 text-xs">
                        {new Date(c.created_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Revenue ── */}
      {tab === 'revenue' && (
        <div className="space-y-4">
          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: 'Total Revenue',
                value: totalRevenueCad > 0 ? `$${(totalRevenueCad / 100).toLocaleString('en-CA', { minimumFractionDigits: 2 })}` : '—',
                sub: 'all paid reports',
                color: 'text-green-700', bg: 'bg-green-50 border-green-100',
              },
              {
                label: 'Revenue MTD',
                value: mtdRevenueCad > 0 ? `$${(mtdRevenueCad / 100).toLocaleString('en-CA', { minimumFractionDigits: 2 })}` : '—',
                sub: 'this calendar month',
                color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100',
              },
              {
                label: 'Avg Deal Size',
                value: paidReports.length > 0 && totalRevenueCad > 0
                  ? `$${((totalRevenueCad / 100) / paidReports.length).toLocaleString('en-CA', { minimumFractionDigits: 2 })}`
                  : '—',
                sub: 'per paid inspection',
                color: 'text-blue-700', bg: 'bg-blue-50 border-blue-100',
              },
              {
                label: 'Pipeline',
                value: (() => {
                  const total = pendingReports.reduce((sum, r) => {
                    const s = r.report_data?.summary;
                    if (!s) return sum;
                    if (s.baseCents !== undefined) return sum + (s.baseCents ?? 0) + (s.taxCents ?? 0);
                    const n = parseFloat(String(s.price ?? '').replace(/[^0-9.]/g, ''));
                    return sum + (isNaN(n) ? 0 : Math.round(n * 100));
                  }, 0);
                  return total > 0 ? `$${(total / 100).toLocaleString('en-CA', { minimumFractionDigits: 2 })}` : `${pendingReports.length} pending`;
                })(),
                sub: 'awaiting payment',
                color: 'text-amber-700', bg: 'bg-amber-50 border-amber-100',
              },
            ].map(k => (
              <div key={k.label} className={`rounded-xl border p-5 ${k.bg}`}>
                <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                <p className="text-sm text-gray-700 font-medium mt-1">{k.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{k.sub}</p>
              </div>
            ))}
          </div>

          {/* Monthly revenue chart */}
          {monthlyRevenue.length > 1 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
              <div className="flex items-end gap-3 h-28">
                {monthlyRevenue.map(({ month, cad }) => {
                  const maxCad = Math.max(...monthlyRevenue.map(m => m.cad), 1);
                  const pct = Math.round((cad / maxCad) * 100);
                  const label = new Date(month + '-01').toLocaleDateString('en-CA', { month: 'short', year: '2-digit' });
                  return (
                    <div key={month} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-gray-500 font-medium">
                        {cad > 0 ? `$${(cad / 1000).toFixed(1)}k` : '—'}
                      </span>
                      <div className="w-full bg-gray-100 rounded-t-md overflow-hidden" style={{ height: '72px' }}>
                        <div
                          className="w-full bg-emerald-500 rounded-t-md transition-all"
                          style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Service mix + City breakdown + Time-to-collect */}
          {revenueLoaded && jobs.length > 0 && (() => {
            const completedJobs = jobs.filter(j => j.status === 'completed');

            // Service mix from all completed jobs
            const byService: Record<string, number> = {};
            for (const j of completedJobs) {
              const k = j.inspection_type ?? 'Other';
              byService[k] = (byService[k] ?? 0) + 1;
            }
            const serviceList = Object.entries(byService).sort((a, b) => b[1] - a[1]).slice(0, 6);
            const maxService = serviceList[0]?.[1] ?? 1;

            // City breakdown
            const byCity: Record<string, number> = {};
            for (const j of completedJobs) {
              const k = j.city ?? 'Unknown';
              byCity[k] = (byCity[k] ?? 0) + 1;
            }
            const cityList = Object.entries(byCity).sort((a, b) => b[1] - a[1]).slice(0, 8);
            const maxCity = cityList[0]?.[1] ?? 1;

            return (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Service mix */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Service Mix</h3>
                    <p className="text-xs text-gray-400">Completed jobs by type</p>
                  </div>
                  <div className="p-4 space-y-2">
                    {serviceList.length === 0 ? <p className="text-xs text-gray-400">No data yet</p> : serviceList.map(([svc, count]) => (
                      <div key={svc} className="flex items-center gap-2 text-sm">
                        <span className="flex-1 text-gray-700 text-xs truncate">{svc}</span>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden shrink-0">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.round((count / maxService) * 100)}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-4 text-right shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* City breakdown */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Top Cities</h3>
                    <p className="text-xs text-gray-400">Completed jobs by city</p>
                  </div>
                  <div className="p-4 space-y-2">
                    {cityList.length === 0 ? <p className="text-xs text-gray-400">No data yet</p> : cityList.map(([city, count]) => (
                      <div key={city} className="flex items-center gap-2 text-sm">
                        <span className="flex-1 text-gray-700 text-xs truncate">{city}</span>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden shrink-0">
                          <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${Math.round((count / maxCity) * 100)}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-4 text-right shrink-0">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cash flow metrics */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Cash Flow</h3>
                    <p className="text-xs text-gray-400">Collection efficiency</p>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {avgDaysToCollect !== null ? `${avgDaysToCollect.toFixed(1)}d` : '—'}
                      </p>
                      <p className="text-xs text-gray-600 font-medium mt-0.5">Avg days to collect</p>
                      <p className="text-xs text-gray-400">From report sent → paid</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{pendingReports.length}</p>
                      <p className="text-xs text-gray-600 font-medium mt-0.5">Outstanding invoices</p>
                      <p className="text-xs text-gray-400">Reports sent, not yet paid</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {paidReports.length + pendingReports.length > 0
                          ? `${Math.round((paidReports.length / (paidReports.length + pendingReports.length)) * 100)}%`
                          : '—'}
                      </p>
                      <p className="text-xs text-gray-600 font-medium mt-0.5">Collection rate</p>
                      <p className="text-xs text-gray-400">Paid ÷ (paid + outstanding)</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Paid reports table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Paid Inspections</h2>
              <p className="text-xs text-gray-400 mt-0.5">Reports marked paid or visible</p>
            </div>

            {!revenueLoaded ? (
              <div className="p-6 space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />)}
              </div>
            ) : paidReports.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                <DollarSign className="h-8 w-8 mx-auto mb-3 opacity-30" />
                <p>No paid reports yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                    <tr>
                      <th className="px-5 py-3 text-left">Paid At</th>
                      <th className="px-5 py-3 text-left">Client</th>
                      <th className="px-5 py-3 text-left">City</th>
                      <th className="px-5 py-3 text-left">Service</th>
                      <th className="px-5 py-3 text-right">Amount</th>
                      <th className="px-5 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paidReports.map(r => {
                      const cents = centsToReport(r);
                      return (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                          {r.paid_at ? new Date(r.paid_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </td>
                        <td className="px-5 py-3 font-medium text-gray-900">{r.jobs?.client_name ?? '—'}</td>
                        <td className="px-5 py-3 text-gray-600">{r.jobs?.city ?? '—'}</td>
                        <td className="px-5 py-3 text-gray-600">{r.jobs?.inspection_type ?? '—'}</td>
                        <td className="px-5 py-3 text-right">
                          {cents > 0
                            ? <span className="font-semibold text-emerald-700">${(cents / 100).toFixed(2)}</span>
                            : <span className="text-gray-300">—</span>
                          }
                        </td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${REPORT_STATUS_COLORS[r.status] ?? 'bg-gray-100 text-gray-600'}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pending payment */}
          {pendingReports.length > 0 && (
            <div className="bg-white border border-amber-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-amber-100 bg-amber-50">
                <h2 className="font-semibold text-amber-800">Awaiting Payment ({pendingReports.length})</h2>
                <p className="text-xs text-amber-600 mt-0.5">Reports sent but not yet marked paid</p>
              </div>
              <div className="divide-y divide-gray-100">
                {pendingReports.map(r => {
                  const s = r.report_data?.summary;
                  const cents = s?.baseCents !== undefined ? (s.baseCents + (s.taxCents ?? 0)) : 0;
                  const priceStr = s?.price ?? (cents > 0 ? `$${(cents / 100).toFixed(2)}` : null);
                  return (
                  <div key={r.id} className="px-5 py-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{r.jobs?.client_name ?? '—'}</p>
                      <p className="text-xs text-gray-500">{r.jobs?.city} · {r.jobs?.inspection_type}</p>
                    </div>
                    {priceStr && <span className="text-xs font-semibold text-amber-700">{priceStr}</span>}
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">sent</span>
                  </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Tab: Broadcast ── */}
      {tab === 'broadcast' && (
        <div className="max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Radio className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Broadcast Email</h2>
                <p className="text-xs text-gray-400">Send a message to all registered homeowners</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={bSubject}
                  onChange={e => setBSubject(e.target.value)}
                  placeholder="e.g. Spring home maintenance tips from ASADS"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Body <span className="font-normal text-gray-400">— use <code className="bg-gray-100 px-1 rounded">{'{name}'}</code> to personalize</span>
                </label>
                <textarea
                  rows={10}
                  value={bBody}
                  onChange={e => setBBody(e.target.value)}
                  placeholder={`Hi {name},\n\nSpring is a great time to check your home for…\n\n— ASADS Home Inspection Team`}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              {bResult && (
                <div className={`px-4 py-3 rounded-lg text-sm font-medium ${bResult.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {bResult}
                </div>
              )}

              <Button
                onClick={sendBroadcast}
                disabled={bSending || !bSubject.trim() || !bBody.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                {bSending ? 'Sending…' : 'Send to all homeowners'}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                Emails are sent via Resend from <code>no-reply@asads.ca</code>.
                Recipients are all users with role = homeowner in your database.
              </p>
            </div>
          </div>
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
