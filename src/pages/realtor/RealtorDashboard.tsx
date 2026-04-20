import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase, DbJob, DbReport, DbRealtor } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import BacklinkWizard from '@/components/BacklinkWizard';
import { Button } from '@/components/ui/button';
import {
  Calendar, FileText, Clock, CheckCircle2, PhoneCall, CreditCard,
  Star, BadgeCheck, ExternalLink, PlusCircle,
} from 'lucide-react';

function openChat() { window.dispatchEvent(new Event('open-scout-chat')); }

interface JobWithReport extends DbJob {
  report?: DbReport;
}

export default function RealtorDashboard() {
  const { dbUser } = useAuth();
  const [jobs, setJobs] = useState<JobWithReport[]>([]);
  const [realtor, setRealtor] = useState<DbRealtor | null>(null);
  const [loading, setLoading] = useState(true);
  const [domain, setDomain] = useState('');
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    if (!dbUser) return;
    async function load() {
      const [{ data: jobData }, { data: realtorData }] = await Promise.all([
        supabase.from('jobs').select('*')
          .or(`homeowner_id.eq.${dbUser!.id},client_email.eq.${dbUser!.email}`)
          .order('scheduled_at', { ascending: false }),
        supabase.from('realtors').select('*').eq('user_id', dbUser!.id).maybeSingle(),
      ]);

      const r = realtorData as DbRealtor | null;
      setRealtor(r);
      if (r?.domain) setDomain(r.domain);

      if (jobData) {
        const withReports = await Promise.all(
          (jobData as DbJob[]).map(async job => {
            const { data: rep } = await supabase.from('reports').select('*')
              .eq('job_id', job.id).order('generated_at', { ascending: false }).limit(1).maybeSingle();
            return { ...job, report: rep ?? undefined } as JobWithReport;
          })
        );
        setJobs(withReports);
      }
      setLoading(false);
    }
    load();
  }, [dbUser]);

  async function checkBacklink(d: string): Promise<boolean> {
    const clean = d.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    const { data, error } = await supabase.functions.invoke('verify-backlink', { body: { domain: clean } });
    const ok = !error && !!data?.verified;
    if (ok && realtor) {
      await supabase.from('realtors').update({ backlink_verified: true, domain: clean }).eq('id', realtor.id);
      setRealtor(prev => prev ? { ...prev, backlink_verified: true, domain: clean } : prev);
    }
    return ok;
  }

  const activeJob = jobs.find(j => j.status === 'scheduled' || j.status === 'in_progress');
  const visibleReports = jobs.filter(j => j.report?.status === 'visible');
  const pendingPayment = jobs.filter(j => j.report?.status === 'sent' || j.report?.status === 'paid');

  function GetListedSection() {
    if (!realtor) return null;

    if (realtor.listed) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-8 w-8 text-green-600 shrink-0" />
            <div>
              <p className="font-semibold text-green-800">Listed in Trusted Realtors Directory</p>
              <p className="text-sm text-green-600">You're visible to homebuyers across the GTA</p>
            </div>
          </div>
          <Button asChild size="sm" variant="outline" className="border-green-300 text-green-700 shrink-0">
            <Link to="/trusted-realtors" className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" />View Listing
            </Link>
          </Button>
        </div>
      );
    }

    if (realtor.backlink_verified) {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <Clock className="h-7 w-7 text-blue-600 shrink-0" />
            <div>
              <p className="font-semibold text-blue-800">Link verified — Pending admin approval</p>
              <p className="text-sm text-blue-600 mt-0.5">We've been notified and will review your listing shortly.</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-amber-100 rounded-full p-2.5 shrink-0">
            <Star className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-gray-900 text-base">Get Listed in Our Trusted Realtors Directory — Free</h2>
            <p className="text-sm text-gray-600 mt-1">
              Add a simple link to your website footer and we'll list your profile. No coding — takes about 2 minutes.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Step-by-step guide for your platform
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Auto-verified in seconds
              </div>
            </div>
            <Button
              onClick={() => setShowWizard(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add to my website →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    {showWizard && realtor && (
      <BacklinkWizard
        domain={domain}
        realtorId={realtor.id}
        onVerified={(d) => {
          setDomain(d);
          setShowWizard(false);
          setRealtor(prev => prev ? { ...prev, backlink_verified: true, domain: d } : prev);
        }}
        onClose={() => setShowWizard(false)}
        checkBacklink={checkBacklink}
      />
    )}
    <PortalLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Welcome back{dbUser?.name ? `, ${dbUser.name.split(' ')[0]}` : ''}
      </h1>
      <p className="text-gray-500 mb-6">Your ASADS inspection portal</p>

      {/* Get Listed */}
      {!loading && <div className="mb-6"><GetListedSection /></div>}

      {/* Stats */}
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
        <div className="space-y-4">{[1, 2].map(i => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)}</div>
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

          {/* Pending payment */}
          {pendingPayment.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Pending Payment</h2>
              <div className="space-y-3">
                {pendingPayment.map(job => {
                  const summary = (job as any).report?.report_data?.summary ?? {};
                  const price = summary.price ?? null;
                  return (
                    <div key={job.id} className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-gray-900">{job.address}</p>
                        <p className="text-sm text-gray-500">{job.city} · {job.inspection_type}</p>
                        <p className="text-xs text-amber-700 mt-1">
                          Report ready — pay to unlock instant access.
                          {price && <span className="font-semibold ml-1">{price} CAD (incl. HST)</span>}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-600 text-white shrink-0 flex items-center gap-1.5"
                        onClick={async () => {
                          const report = (job as any).report;
                          if (!report) return;
                          const res = await fetch('/api/create-checkout-asads', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              reportId: report.id,
                              baseCents: summary.baseCents ?? 39900,
                              taxCents: summary.taxCents ?? 5187,
                              description: `Home Inspection — ${job.address}`,
                              customerEmail: dbUser?.email,
                            }),
                          });
                          const { url } = await res.json();
                          if (url) window.location.href = url;
                        }}
                      >
                        <CreditCard className="h-3.5 w-3.5" />
                        Pay Now
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reports */}
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
                          <FileText className="h-4 w-4" />View Report
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-gray-900">Book an inspection for your client?</p>
              <p className="text-sm text-gray-500">Asad will handle the scheduling</p>
            </div>
            <Button onClick={openChat} size="sm" className="bg-blue-600 hover:bg-blue-700 shrink-0 flex items-center gap-2">
              <PhoneCall className="h-4 w-4" />Book Now
            </Button>
          </div>
        </div>
      )}
    </PortalLayout>
    </>
  );
}
