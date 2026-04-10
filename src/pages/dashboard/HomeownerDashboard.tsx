import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase, DbJob, DbReport } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Clock, CheckCircle2, PhoneCall, CreditCard, Loader2 } from 'lucide-react';

function openChat() { window.dispatchEvent(new Event('open-scout-chat')); }

interface JobWithReport extends DbJob {
  report?: DbReport;
}

export default function HomeownerDashboard() {
  const { dbUser } = useAuth();
  const [jobs, setJobs] = useState<JobWithReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  async function load() {
    if (!dbUser) return;
    const { data: jobData } = await supabase
      .from('jobs')
      .select('*')
      .or(`homeowner_id.eq.${dbUser.id},client_email.eq.${dbUser.email}`)
      .order('scheduled_at', { ascending: false });

    if (!jobData) { setLoading(false); return; }

    const jobsWithReports = await Promise.all(
      (jobData as DbJob[]).map(async job => {
        const { data: rep } = await supabase
          .from('reports')
          .select('*')
          .eq('job_id', job.id)
          .order('generated_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        return { ...job, report: rep ?? undefined } as JobWithReport;
      })
    );

    setJobs(jobsWithReports);
    setLoading(false);
  }

  // Confirm payment on redirect back from Stripe
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    const sessionId = searchParams.get('session_id');
    if (paymentStatus !== 'success' || !sessionId) return;

    setSearchParams({}, { replace: true });

    fetch('/api/confirm-payment-asads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    }).then(() => load()).catch(() => {});
  }, []);

  useEffect(() => {
    if (dbUser) load();
  }, [dbUser]);

  async function handlePayNow(job: JobWithReport) {
    if (!job.report) return;
    setPayingId(job.report.id);
    try {
      const summary = job.report.report_data?.summary ?? {};
      const baseCents = summary.baseCents ?? 39900;
      const taxCents = summary.taxCents ?? 5187;
      const description = `Home Inspection — ${job.address}`;

      const res = await fetch('/api/create-checkout-asads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId: job.report.id,
          baseCents,
          taxCents,
          description,
          customerEmail: dbUser?.email,
        }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } finally {
      setPayingId(null);
    }
  }

  const activeJob = jobs.find(j => j.status === 'scheduled' || j.status === 'in_progress');
  const visibleReports = jobs.filter(j => j.report?.status === 'visible');
  const pendingPayment = jobs.filter(j => j.report?.status === 'sent' || j.report?.status === 'paid');

  return (
    <PortalLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Welcome back{dbUser?.name ? `, ${dbUser.name.split(' ')[0]}` : ''}
      </h1>
      <p className="text-gray-500 mb-6">Your ASADS inspection portal</p>

      {!loading && jobs.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total', value: jobs.length, color: 'bg-blue-50 text-blue-700' },
            { label: 'Scheduled', value: jobs.filter(j => j.status === 'scheduled').length, color: 'bg-purple-50 text-purple-700' },
            { label: 'In Progress', value: jobs.filter(j => j.status === 'in_progress').length, color: 'bg-amber-50 text-amber-700' },
            { label: 'Completed', value: jobs.filter(j => j.status === 'completed').length, color: 'bg-green-50 text-green-700' },
          ].map(s => (
            <div key={s.label} className={`${s.color} rounded-xl p-4 text-center`}>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs font-medium mt-0.5 opacity-80">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(i => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">No inspections yet</h2>
          <p className="text-gray-500 mb-6">Book your first inspection to get started</p>
          <Button onClick={openChat} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <PhoneCall className="h-4 w-4" />
            Book an Inspection
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active inspection */}
          {activeJob && (
            <div className="bg-white border border-blue-200 rounded-xl p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Active Inspection</p>
                  <h2 className="text-lg font-semibold text-gray-900">{activeJob.address}</h2>
                  <p className="text-sm text-gray-500">{activeJob.city} · {activeJob.inspection_type}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium shrink-0 ${
                  activeJob.status === 'in_progress' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {activeJob.status === 'in_progress' ? <Clock className="h-3.5 w-3.5" /> : <Calendar className="h-3.5 w-3.5" />}
                  {activeJob.status === 'in_progress' ? 'In Progress' : 'Scheduled'}
                </span>
              </div>
              {activeJob.scheduled_at && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  {new Date(activeJob.scheduled_at).toLocaleDateString('en-CA', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </div>
              )}
            </div>
          )}

          {/* Payment pending */}
          {pendingPayment.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Pending Payment</h2>
              <div className="space-y-3">
                {pendingPayment.map(job => {
                  const summary = job.report?.report_data?.summary ?? {};
                  const price = summary.price ?? null;
                  const isLoading = payingId === job.report?.id;
                  return (
                    <div key={job.id} className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-gray-900">{job.address}</p>
                        <p className="text-sm text-gray-500">{job.city} · {job.inspection_type}</p>
                        <p className="text-xs text-amber-700 mt-1">
                          Your report is ready. Pay to unlock instant access.
                          {price && <span className="font-semibold ml-1">{price} CAD (incl. HST)</span>}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-600 text-white shrink-0 flex items-center gap-1.5"
                        onClick={() => handlePayNow(job)}
                        disabled={isLoading}
                      >
                        {isLoading
                          ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          : <CreditCard className="h-3.5 w-3.5" />}
                        {isLoading ? 'Loading…' : 'Pay Now'}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed reports */}
          {visibleReports.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Inspection Reports</h2>
              <div className="space-y-3">
                {visibleReports.map(job => (
                  <div key={job.id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-gray-900">{job.address}</p>
                      <p className="text-sm text-gray-500">
                        {job.city} · {job.inspection_type}
                        {job.completed_at && ` · ${new Date(job.completed_at).toLocaleDateString('en-CA')}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle2 className="h-3.5 w-3.5" />Paid
                      </span>
                      <Button asChild size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                        <Link to={`/dashboard/reports/${job.report!.id}`} className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          View Report
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact CTA */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-gray-900">Questions about your report?</p>
              <p className="text-sm text-gray-500">Call or email ASADS directly</p>
            </div>
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 shrink-0">
              <a href="tel:+16478019311" className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4" />
                (647) 801-9311
              </a>
            </Button>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
