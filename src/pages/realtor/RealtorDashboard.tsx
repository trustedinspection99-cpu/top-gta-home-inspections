import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase, DbRealtor } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, MapPin, ExternalLink, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RealtorDashboard() {
  const { dbUser } = useAuth();
  const [realtor, setRealtor] = useState<DbRealtor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dbUser) return;
    supabase
      .from('realtors')
      .select('*')
      .eq('user_id', dbUser.id)
      .single()
      .then(({ data }) => {
        setRealtor(data as DbRealtor ?? null);
        setLoading(false);
      });
  }, [dbUser]);

  return (
    <PortalLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Realtor Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome, {dbUser?.name}</p>

      {loading ? (
        <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
      ) : !realtor ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <p className="font-semibold text-amber-800">Profile not found</p>
          <p className="text-sm text-amber-700 mt-1">Your realtor profile may still be setting up. Contact ASADS if this persists.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Listing status */}
          <div className={`rounded-xl border p-5 flex items-center gap-4 ${
            realtor.listed ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
          }`}>
            {realtor.listed
              ? <CheckCircle2 className="h-8 w-8 text-green-600 shrink-0" />
              : <Clock className="h-8 w-8 text-amber-600 shrink-0" />
            }
            <div>
              <p className={`font-semibold ${realtor.listed ? 'text-green-800' : 'text-amber-800'}`}>
                {realtor.listed ? 'Active — Listed in Trusted Realtors Directory' : 'Pending Verification'}
              </p>
              <p className={`text-sm mt-0.5 ${realtor.listed ? 'text-green-600' : 'text-amber-600'}`}>
                {realtor.backlink_verified
                  ? 'Backlink verified ✓'
                  : 'Backlink not yet verified — add the link to your site to go live'}
              </p>
            </div>
          </div>

          {/* Profile card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Your Profile</h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Name</p>
                <p className="font-medium text-gray-900">{dbUser?.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Agency</p>
                <p className="font-medium text-gray-900">{realtor.agency}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Website</p>
                <a href={`https://${realtor.domain}`} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1">
                  {realtor.domain}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Email</p>
                <p className="font-medium text-gray-900">{dbUser?.email}</p>
              </div>
            </div>

            {realtor.cities.length > 0 && (
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Cities served</p>
                <div className="flex flex-wrap gap-1.5">
                  {realtor.cities.map(city => (
                    <span key={city} className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                      <MapPin className="h-3 w-3" />
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-blue-900">View your listing</p>
              <p className="text-sm text-blue-700">See how you appear in the Trusted Realtors directory</p>
            </div>
            <Button asChild variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              <Link to="/trusted-realtors" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                View Directory
              </Link>
            </Button>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
