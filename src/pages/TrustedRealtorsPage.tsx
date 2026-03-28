import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase, DbRealtor, DbUser } from '@/lib/supabase';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { realtorSlug } from '@/lib/realtorUtils';
import { Users, Star, MapPin, Building2, BadgeCheck, ArrowRight, Globe } from 'lucide-react';

interface RealtorWithUser {
  realtor: DbRealtor;
  user: DbUser;
}

const FILTER_CITIES = [
  'Toronto', 'Mississauga', 'Brampton', 'Markham', 'Vaughan',
  'Richmond Hill', 'Oakville', 'Burlington', 'Hamilton', 'Oshawa',
];

export default function TrustedRealtorsPage() {
  const [entries, setEntries] = useState<RealtorWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const cityFilter = searchParams.get('city') ?? 'All';

  useEffect(() => {
    async function load() {
      const { data: realtors } = await supabase
        .from('realtors')
        .select('*')
        .eq('listed', true)
        .eq('backlink_verified', true);

      if (!realtors || realtors.length === 0) { setLoading(false); return; }

      const userIds = (realtors as DbRealtor[]).map(r => r.user_id);
      const { data: users } = await supabase.from('users').select('*').in('id', userIds);
      const userMap = Object.fromEntries(((users ?? []) as DbUser[]).map(u => [u.id, u]));

      const combined: RealtorWithUser[] = (realtors as DbRealtor[])
        .filter(r => userMap[r.user_id])
        .map(r => ({ realtor: r, user: userMap[r.user_id] }));

      setEntries(combined);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = cityFilter === 'All'
    ? entries
    : entries.filter(e => e.realtor.cities.includes(cityFilter));

  function setCity(city: string) {
    if (city === 'All') setSearchParams({});
    else setSearchParams({ city });
  }

  const pageTitle = cityFilter === 'All'
    ? 'Trusted Realtors GTA & Ontario | ASADS Home Inspection Partners'
    : `Trusted Realtors in ${cityFilter} | ASADS Home Inspection Partners`;
  const pageDesc = cityFilter === 'All'
    ? 'Verified GTA realtors who partner with ASADS Home Inspection. Find a trusted real estate agent in Toronto, Mississauga, Brampton and across Ontario.'
    : `Verified real estate agents in ${cityFilter} who partner with ASADS Home Inspection for pre-purchase and pre-listing inspections.`;

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`https://www.asads.ca/trusted-realtors${cityFilter !== 'All' ? `?city=${encodeURIComponent(cityFilter)}` : ''}`} />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-4">
            <Star className="h-4 w-4 text-yellow-400" />
            Verified Partners
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {cityFilter === 'All' ? 'Trusted Realtors — GTA & Ontario' : `Trusted Realtors in ${cityFilter}`}
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Real estate agents who recommend ASADS inspections to their clients. Every listed realtor has a verified backlink and is personally approved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
              <Link to="/signup/realtor" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Get Listed Free
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link to="/booking">Book an Inspection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value prop strip */}
      <section className="bg-white border-b border-gray-100 py-6 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
          <div className="flex flex-col items-center gap-1">
            <BadgeCheck className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-800">Free permanent listing</span>
            <span className="text-gray-500 text-xs">Your profile stays live as long as your backlink does</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-gray-800">Co-marketing exposure</span>
            <span className="text-gray-500 text-xs">Your name on a top-ranked inspection site in your city</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Users className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-gray-800">Client sample reports</span>
            <span className="text-gray-500 text-xs">PDF sample report to show buyers what to expect</span>
          </div>
        </div>
      </section>

      {/* Directory */}
      <section className="max-w-5xl mx-auto px-4 py-10">

        {/* City filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', ...FILTER_CITIES].map(city => (
            <button
              key={city}
              onClick={() => setCity(city)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                cityFilter === city
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-700'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {cityFilter === 'All' ? 'No realtors listed yet' : `No realtors listed in ${cityFilter} yet`}
            </h2>
            <p className="text-gray-500 mb-6">Be the first in your area to join the ASADS Trusted Realtors directory.</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/signup/realtor">Get Listed Free</Link>
            </Button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-6">
              {filtered.length} verified realtor{filtered.length !== 1 ? 's' : ''}
              {cityFilter !== 'All' ? ` in ${cityFilter}` : ' across Ontario'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(({ realtor, user }) => {
                const slug = realtorSlug(user.name, realtor.cities);
                return (
                  <Link
                    key={realtor.id}
                    to={`/trusted-realtors/${slug}`}
                    className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    {/* Avatar + name */}
                    <div className="flex items-center gap-3">
                      {realtor.photo_url ? (
                        <img src={realtor.photo_url} alt={user.name} className="w-14 h-14 rounded-full object-cover" />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{user.name}</p>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Building2 className="h-3.5 w-3.5" />
                          <span>{realtor.agency}</span>
                        </div>
                      </div>
                    </div>

                    {/* Cities */}
                    {realtor.cities.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {realtor.cities.slice(0, 4).map(city => (
                          <span key={city} className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                            <MapPin className="h-3 w-3" />{city}
                          </span>
                        ))}
                        {realtor.cities.length > 4 && (
                          <span className="text-xs text-gray-400">+{realtor.cities.length - 4} more</span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                        <BadgeCheck className="h-3.5 w-3.5" /> Verified Partner
                      </div>
                      <span className="text-xs text-gray-400 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                        View Profile <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </section>

      {/* CTA for realtors */}
      <section className="bg-blue-700 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Are you a GTA realtor?</h2>
          <p className="text-blue-100 mb-3 text-lg">
            Get a free permanent profile on this page — visible to every homebuyer who searches for a home inspector in your city.
          </p>
          <p className="text-blue-200 text-sm mb-8">
            All we ask: one link to <strong className="text-white">asads.ca</strong> from your website's preferred vendors or resources page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-white text-blue-700 hover:bg-blue-50 font-semibold text-base px-8 py-3 h-auto">
              <Link to="/signup/realtor">Join the Directory Free →</Link>
            </Button>
          </div>
          <p className="text-blue-300 text-xs mt-4">Takes 2 minutes · No cost · No subscription</p>
        </div>
      </section>
    </Layout>
  );
}
