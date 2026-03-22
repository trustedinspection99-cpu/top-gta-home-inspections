import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase, DbRealtor, DbUser } from '@/lib/supabase';
import RealtorCard from '@/components/RealtorCard';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Users, Star } from 'lucide-react';

interface RealtorWithUser {
  realtor: DbRealtor;
  user: DbUser;
}

export default function TrustedRealtorsPage() {
  const [entries, setEntries] = useState<RealtorWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: realtors } = await supabase
        .from('realtors')
        .select('*')
        .eq('listed', true)
        .eq('backlink_verified', true);

      if (!realtors || realtors.length === 0) {
        setLoading(false);
        return;
      }

      const userIds = (realtors as DbRealtor[]).map(r => r.user_id);
      const { data: users } = await supabase
        .from('users')
        .select('*')
        .in('id', userIds);

      const userMap = Object.fromEntries(((users ?? []) as DbUser[]).map(u => [u.id, u]));
      const combined: RealtorWithUser[] = (realtors as DbRealtor[])
        .filter(r => userMap[r.user_id])
        .map(r => ({ realtor: r, user: userMap[r.user_id] }));

      setEntries(combined);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Trusted Realtors GTA | ASADS Home Inspection Partners</title>
        <meta
          name="description"
          content="Verified GTA realtors who partner with ASADS Home Inspection. Find a trusted real estate agent in Toronto, Mississauga, Brampton and across Ontario."
        />
        <link rel="canonical" href="https://www.asads.ca/trusted-realtors" />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-4">
            <Star className="h-4 w-4 text-yellow-400" />
            Verified Partners
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Trusted Realtors in the GTA</h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Work with real estate agents who prioritize quality home inspections for their clients.
            Every realtor listed here is a verified ASADS partner.
          </p>
          <Button asChild className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
            <Link to="/signup/realtor" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Become a Trusted Realtor
            </Link>
          </Button>
        </div>
      </section>

      {/* Directory */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-16">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No realtors listed yet</h2>
            <p className="text-gray-500 mb-6">Be the first to join the ASADS Trusted Realtors directory.</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/signup/realtor">Get Listed Free</Link>
            </Button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-6">{entries.length} verified realtor{entries.length !== 1 ? 's' : ''} across the GTA</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {entries.map(({ realtor, user }) => (
                <RealtorCard key={realtor.id} realtor={realtor} user={user} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gray-50 border-t border-gray-200 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Are you a GTA realtor?</h2>
          <p className="text-gray-600 mb-6">
            Get free exposure to homebuyers across the GTA. Add one backlink to asads.ca on your site
            and we'll list you in this directory — free forever.
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/signup/realtor">Join the Directory →</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
