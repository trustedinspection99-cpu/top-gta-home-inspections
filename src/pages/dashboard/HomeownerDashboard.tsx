import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase, DbJob, DbReport } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Clock, CheckCircle2, AlertCircle, PhoneCall } from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-700', icon: <Calendar className="h-4 w-4" /> },
  in_progress: { label: 'In Progress', color: 'bg-amber-100 text-amber-700', icon: <Clock className="h-4 w-4" /> },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700', icon: <CheckCircle2 className="h-4 w-4" /> },
  cancelled: { label: 'Cancelled', color: 'bg-gray-100 text-gray-500', icon: <AlertCircle className="h-4 w-4" /> },
};

interface JobWithReport extends DbJob {
  report?: DbReport;
}

export default function HomeownerDashboard() {
  const { dbUser } = useAuth();
  const [jobs, setJobs] = useState<JobWithReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dbUser) return;
    async function load() {
      const { data: jobData } = await supabase
        .from('jobs')
        .select('*')
        .eq('homeowner_id', dbUser!.id)
        .order('scheduled_at', { ascending: false });

      if (!jobData) { setLoading(false); return; }

      // Fetch reports for each job
      const jobsWithReports = await Promise.all(
        (jobData as DbJob[]).map(async job => {
          const { data: rep } = await supabase
            .from('reports')
            .select('*')
            .eq('job_id', job.id)
            .single();
          return { ...job, report: rep ?? undefined } as JobWithReport;
        })
      );

      setJobs(jobsWithReports);
      setLoading(false);
    }
    load();
  }, [dbUser]);

  const activeJob = jobs.find(j => j.status === 'scheduled' || j.status === 'in_progress');
  const completedJobs = jobs.filter(j => j.status === 'completed' && j.report);

  return (
    <PortalLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {dbUser?.name?.split(' ')[0]}</h1>
      <p className="text-gray-500 mb-8">Your ASADS inspection portal</p>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        /* Empty state */
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">No inspections yet</h2>
          <p className="text-gray-500 mb-6">Book your first inspection to get started</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a href="tel:+16478019311" className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4" />
              Call (647) 801-9311
            </a>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active job card */}
          {activeJob && (
            <div className="bg-white border border-blue-200 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Active Inspection</p>
                  <h2 className="text-lg font-semibold text-gray-900">{activeJob.address}</h2>
                  <p className="text-sm text-gray-500">{activeJob.city} · {activeJob.inspection_type}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${STATUS_CONFIG[activeJob.status].color}`}>
                  {STATUS_CONFIG[activeJob.status].icon}
                  {STATUS_CONFIG[activeJob.status].label}
                </span>
              </div>
              {activeJob.scheduled_at && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  {new Date(activeJob.scheduled_at).toLocaleDateString('en-CA', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </div>
              )}
            </div>
          )}

          {/* Completed reports */}
          {completedJobs.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Inspection Reports</h2>
              <div className="space-y-3">
                {completedJobs.map(job => (
                  <div key={job.id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{job.address}</p>
                      <p className="text-sm text-gray-500">
                        {job.city} · {job.inspection_type}
                        {job.completed_at && ` · ${new Date(job.completed_at).toLocaleDateString('en-CA')}`}
                      </p>
                    </div>
                    <Button asChild size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                      <Link to={`/dashboard/reports/${job.report!.id}`} className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        View Report
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </PortalLayout>
  );
}
