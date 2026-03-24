import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, AlertCircle, CheckCircle2 } from 'lucide-react';

const GTA_CITIES = [
  'Toronto', 'Mississauga', 'Brampton', 'Markham', 'Vaughan', 'Richmond Hill',
  'Oakville', 'Burlington', 'Hamilton', 'Oshawa', 'Whitby', 'Ajax', 'Pickering',
  'Newmarket', 'Aurora', 'Barrie', 'Cambridge', 'Kitchener', 'Waterloo', 'Guelph',
];

export default function RealtorSignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [agency, setAgency] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function toggleCity(city: string) {
    setSelectedCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signUpError } = await signUp(email, password, name, 'realtor', phone);
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('realtors').insert({
        user_id: user.id,
        agency,
        domain: domain.trim(),
        backlink_verified: false,
        listed: false,
        approved: false,
        cities: selectedCities,
      });
    }

    setLoading(false);
    setDone(true);
    setTimeout(() => navigate('/realtor-dashboard'), 2000);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900">Account created!</h2>
          <p className="text-gray-500">Taking you to your dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-gray-900">ASADS Home Inspection</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Realtor Portal Sign Up</h1>
          <p className="text-gray-500 mt-1">Create your account — get listed in our directory after verification</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="agency">Agency / Brokerage</Label>
                <Input id="agency" value={agency} onChange={e => setAgency(e.target.value)} placeholder="RE/MAX Realty" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@agency.com" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(647) 555-0100" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 chars" required minLength={8} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="domain">Your website domain <span className="text-gray-400 font-normal">(optional)</span></Label>
              <Input id="domain" value={domain} onChange={e => setDomain(e.target.value)} placeholder="yoursite.com" />
              <p className="text-xs text-gray-500">You can add this later from your dashboard to get listed in the directory</p>
            </div>

            <div className="space-y-2">
              <Label>Cities you serve</Label>
              <div className="flex flex-wrap gap-2">
                {GTA_CITIES.map(city => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => toggleCity(city)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      selectedCities.includes(city)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
