import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase, DbJob } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Calendar, Clock, MapPin, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STATUS_COLORS: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-amber-100 text-amber-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-500',
};

export default function SchedulePage() {
  const { dbUser } = useAuth();
  const [jobs, setJobs] = useState<DbJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dbUser) return;
    supabase
      .from('jobs')
      .select('*')
      .eq('homeowner_id', dbUser.id)
      .order('scheduled_at', { ascending: true })
      .then(({ data }) => {
        setJobs((data as DbJob[]) ?? []);
        setLoading(false);
      });
  }, [dbUser]);

  const upcoming = jobs.filter(j => j.status === 'scheduled' || j.status === 'in_progress');
  const past = jobs.filter(j => j.status === 'completed' || j.status === 'cancelled');

  return (
    <PortalLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Schedule</h1>
      <p className="text-gray-500 mb-8">Your upcoming and past inspection appointments</p>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Upcoming */}
          <section>
            <h2 className="text-base font-semibold text-gray-700 mb-3">Upcoming</h2>
            {upcoming.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center">
                <Calendar className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No upcoming inspections</p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <a href="tel:+16478019311" className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4" />
                    Book an Inspection
                  </a>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </section>

          {/* Past */}
          {past.length > 0 && (
            <section>
              <h2 className="text-base font-semibold text-gray-700 mb-3">Past</h2>
              <div className="space-y-3">
                {past.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </PortalLayout>
  );
}

function JobCard({ job }: { job: DbJob }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-gray-900">{job.address}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-3.5 w-3.5" />
            {job.city}
          </div>
          <p className="text-sm text-gray-500">{job.inspection_type}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[job.status]}`}>
          {job.status.replace('_', ' ')}
        </span>
      </div>
      {job.scheduled_at && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          {new Date(job.scheduled_at).toLocaleDateString('en-CA', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </div>
      )}
    </div>
  );
}
