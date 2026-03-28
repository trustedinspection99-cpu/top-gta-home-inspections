import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase, DbRealtor, DbUser } from '@/lib/supabase';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { realtorSlug, cityToLocationSlug } from '@/lib/realtorUtils';
import { MapPin, Building2, Globe, Phone, BadgeCheck, ArrowRight, Copy, Check } from 'lucide-react';

interface RealtorWithUser {
  realtor: DbRealtor;
  user: DbUser;
}

function BadgeEmbed({ slug, name }: { slug: string; name: string }) {
  const [copied, setCopied] = useState<boolean>(false);
  const url = `https://www.asads.ca/trusted-realtors/${slug}`;
  const code = `<a href="${url}" target="_blank" rel="noopener" title="${name} — ASADS Trusted Inspection Partner">
  <div style="display:inline-block;border:2px solid #1d4ed8;border-radius:10px;padding:10px 18px;font-family:Arial,sans-serif;text-align:center;background:#fff">
    <div style="font-size:10px;color:#1d4ed8;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Trusted Partner</div>
    <div style="font-size:18px;font-weight:900;color:#0f172a;margin:3px 0">ASADS</div>
    <div style="font-size:11px;color:#64748b">Home Inspection</div>
    <div style="font-size:10px;color:#16a34a;margin-top:4px;font-weight:600">✓ Verified Inspector</div>
  </div>
</a>`;

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-1">Your Partner Badge</h3>
      <p className="text-sm text-gray-500 mb-4">Add this to your website's "Preferred Vendors" or "Resources" page.</p>
      {/* Preview */}
      <div className="flex justify-center mb-4">
        <div style={{ display: 'inline-block', border: '2px solid #1d4ed8', borderRadius: 10, padding: '10px 18px', fontFamily: 'Arial,sans-serif', textAlign: 'center', background: '#fff' }}>
          <div style={{ fontSize: 10, color: '#1d4ed8', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Trusted Partner</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', margin: '3px 0' }}>ASADS</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Home Inspection</div>
          <div style={{ fontSize: 10, color: '#16a34a', marginTop: 4, fontWeight: 600 }}>✓ Verified Inspector</div>
        </div>
      </div>
      {/* Code block */}
      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 text-xs rounded-lg p-4 overflow-x-auto whitespace-pre-wrap break-all">{code}</pre>
        <button
          onClick={copy}
          className="absolute top-2 right-2 flex items-center gap-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-white px-2.5 py-1.5 rounded-md transition-colors"
        >
          {copied ? <><Check className="h-3 w-3" />Copied!</> : <><Copy className="h-3 w-3" />Copy</>}
        </button>
      </div>
    </div>
  );
}

export default function RealtorProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const [entry, setEntry] = useState<RealtorWithUser | null>(null);
  const [loading, setLoading] = useState(true);

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

      const match = (realtors as DbRealtor[])
        .filter(r => userMap[r.user_id])
        .find(r => realtorSlug(userMap[r.user_id].name, r.cities) === slug);

      setEntry(match ? { realtor: match, user: userMap[match.user_id] } : null);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!entry) {
    return (
      <Layout>
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-2xl font-bold text-gray-900">Realtor Not Found</h1>
          <p className="text-gray-500">This profile may have been removed or the URL is incorrect.</p>
          <Button asChild><Link to="/trusted-realtors">View All Realtors</Link></Button>
        </div>
      </Layout>
    );
  }

  const { realtor, user } = entry;
  const primaryCity = realtor.cities[0] ?? 'Ontario';
  const pageTitle = `${user.name} — ${primaryCity} Realtor | ASADS Trusted Partner`;
  const pageDescription = `${user.name} is a verified real estate agent at ${realtor.agency} serving ${realtor.cities.slice(0, 3).join(', ')}. Recommended home inspection partner: ASADS Home Inspection.`;
  const canonicalUrl = `https://www.asads.ca/trusted-realtors/${slug}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: user.name,
    worksFor: { '@type': 'Organization', name: realtor.agency },
    areaServed: realtor.cities.map(c => ({ '@type': 'City', name: c })),
    telephone: user.phone ?? undefined,
    url: realtor.domain ? `https://${realtor.domain}` : undefined,
    knowsAbout: 'Real Estate, Home Buying, Ontario Real Estate Market',
    description: pageDescription,
  };

  return (
    <Layout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-8">
          {realtor.photo_url ? (
            <img src={realtor.photo_url} alt={user.name} className="w-28 h-28 rounded-full object-cover border-4 border-white/30 shrink-0" />
          ) : (
            <div className="w-28 h-28 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold shrink-0">
              {user.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-xs font-semibold mb-3">
              <BadgeCheck className="h-3.5 w-3.5 text-yellow-300" />
              ASADS Verified Partner
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-1">{user.name}</h1>
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
              <Building2 className="h-4 w-4" />
              <span>{realtor.agency}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {realtor.cities.map(city => (
                <span key={city} className="inline-flex items-center gap-1 bg-white/15 rounded-full px-3 py-1 text-xs">
                  <MapPin className="h-3 w-3" />{city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12 space-y-8">

        {/* Contact */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-wrap gap-4">
          {user.phone && (
            <a href={`tel:${user.phone}`} className="flex items-center gap-2 text-blue-700 font-semibold hover:underline">
              <Phone className="h-4 w-4" />{user.phone}
            </a>
          )}
          {realtor.domain && (
            <a href={`https://${realtor.domain}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-700 font-semibold hover:underline">
              <Globe className="h-4 w-4" />{realtor.domain}
            </a>
          )}
        </div>

        {/* Cities served */}
        {realtor.cities.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cities Served</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {realtor.cities.map(city => (
                <Link
                  key={city}
                  to={`/locations/${cityToLocationSlug(city)}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors text-sm group"
                >
                  <span className="font-medium text-gray-800">{city}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-blue-600" />
                </Link>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Each city links to our home inspection page for that area.</p>
          </div>
        )}

        {/* What is this partnership */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-blue-600" />
            About the ASADS Trusted Partner Program
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {user.name} has partnered with ASADS Home Inspection to give their clients access to Ontario's most thorough home inspection service. ASADS Trusted Realtors recommend ASADS for pre-purchase, pre-listing, mold, radon, and specialty inspections — and receive priority scheduling and co-marketing exposure in return.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/booking">Book an Inspection</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/trusted-realtors">View All Trusted Realtors</Link>
            </Button>
          </div>
        </div>

        {/* Badge embed — show only to the realtor (they know their own URL) */}
        <BadgeEmbed slug={slug!} name={user.name} />

      </section>
    </Layout>
  );
}
