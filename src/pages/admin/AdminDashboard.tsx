import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, DbJob, DbUser } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Clock, CheckCircle2, Calendar, Users } from 'lucide-react';

interface JobWithClient extends DbJob {
  client?: DbUser;
}

const STATUS_COLORS: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-500',
};

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<JobWithClient[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, realtors: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: jobData }, { count: realtorCount }] = await Promise.all([
        supabase.from('jobs').select('*').order('scheduled_at', { ascending: false }).limit(20),
        supabase.from('realtors').select('*', { count: 'exact', head: true }).eq('listed', true),
      ]);

      const jobList = (jobData as DbJob[]) ?? [];

      // Fetch client names
      const clientIds = [...new Set(jobList.map(j => j.homeowner_id))];
      const { data: userData } = await supabase
        .from('users')
        .select('id, name, email')
        .in('id', clientIds);
      const userMap = Object.fromEntries((userData ?? []).map((u: DbUser) => [u.id, u]));

      const enriched = jobList.map(j => ({ ...j, client: userMap[j.homeowner_id] }));
      setJobs(enriched);
      setStats({
        total: jobList.length,
        pending: jobList.filter(j => j.status === 'scheduled' || j.status === 'in_progress').length,
        completed: jobList.filter(j => j.status === 'completed').length,
        realtors: realtorCount ?? 0,
      });
      setLoading(false);
    }
    load();
  }, []);

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
          <h2 className="font-semibold text-gray-900">Recent Jobs</h2>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />)}
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No jobs yet. <Link to="/admin/jobs/new" className="text-blue-600 hover:underline">Create the first one.</Link></div>
        ) : (
          <div className="divide-y divide-gray-100">
            {jobs.map(job => (
              <div key={job.id} className="flex items-center px-5 py-4 hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{job.address}</p>
                  <p className="text-sm text-gray-500">
                    {job.client?.name ?? 'Unknown'} · {job.city} · {job.inspection_type}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {job.scheduled_at && (
                    <span className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(job.scheduled_at).toLocaleDateString('en-CA')}
                    </span>
                  )}
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[job.status]}`}>
                    {job.status.replace('_', ' ')}
                  </span>
                  {job.status === 'completed' && (
                    <Button asChild size="sm" variant="outline" className="border-blue-300 text-blue-700 text-xs">
                      <Link to={`/admin/jobs/${job.id}/report`} className="flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" />
                        Report
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
