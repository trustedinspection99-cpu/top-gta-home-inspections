import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, AlertCircle, CheckCircle2, RefreshCw, Copy } from 'lucide-react';

const GTA_CITIES = [
  'Toronto', 'Mississauga', 'Brampton', 'Markham', 'Vaughan', 'Richmond Hill',
  'Oakville', 'Burlington', 'Hamilton', 'Oshawa', 'Whitby', 'Ajax', 'Pickering',
  'Newmarket', 'Aurora', 'Barrie', 'Cambridge', 'Kitchener', 'Waterloo', 'Guelph',
];

const BACKLINK_SNIPPET = `<a href="https://www.asads.ca">ASADS Home Inspection</a>`;

type VerifyStatus = 'idle' | 'checking' | 'verified' | 'failed';

export default function RealtorSignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<'form' | 'verify' | 'done'>('form');
  const [name, setName] = useState('');
  const [agency, setAgency] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function toggleCity(city: string) {
    setSelectedCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  }

  async function checkBacklink() {
    setVerifyStatus('checking');
    const { data, error } = await supabase.functions.invoke('verify-backlink', {
      body: { domain: domain.trim() },
    });
    if (error || !data?.verified) {
      setVerifyStatus('failed');
    } else {
      setVerifyStatus('verified');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Step 1: verify backlink first
    if (verifyStatus !== 'verified') {
      await checkBacklink();
      setLoading(false);
      setStep('verify');
      return;
    }

    // Create auth account
    const { error: signUpError } = await signUp(email, password, name, 'realtor', phone);
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Get new user id
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('realtors').insert({
        user_id: user.id,
        agency,
        domain: domain.trim(),
        backlink_verified: true,
        listed: true,
        cities: selectedCities,
      });
    }

    setLoading(false);
    setStep('done');
    setTimeout(() => navigate('/realtor-dashboard'), 2000);
  }

  async function handleRecheck() {
    await checkBacklink();
    if (verifyStatus === 'verified') {
      await handleFinalSubmit();
    }
  }

  async function handleFinalSubmit() {
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
        backlink_verified: true,
        listed: true,
        cities: selectedCities,
      });
    }
    setLoading(false);
    setStep('done');
    setTimeout(() => navigate('/realtor-dashboard'), 2000);
  }

  if (step === 'done') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
          <h2 className="text-xl font-bold">You're listed!</h2>
          <p className="text-gray-500">Redirecting to your realtor dashboard…</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Become a Trusted Realtor</h1>
          <p className="text-gray-500 mt-1">Get listed on our public directory — free, with one backlink</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Backlink verification failure state */}
          {step === 'verify' && verifyStatus === 'failed' && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="font-semibold text-amber-800 mb-2">Backlink not found on {domain}</p>
              <p className="text-sm text-amber-700 mb-3">
                Add this HTML to your site footer, then click Re-check:
              </p>
              <div className="flex items-center gap-2 bg-white border border-amber-300 rounded p-2">
                <code className="text-xs flex-1 text-gray-700 break-all">{BACKLINK_SNIPPET}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(BACKLINK_SNIPPET)}
                  className="text-amber-600 hover:text-amber-800"
                  title="Copy"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <Button
                className="mt-3 bg-amber-600 hover:bg-amber-700 text-white"
                onClick={handleRecheck}
                disabled={verifyStatus === 'checking' || loading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Re-check Backlink
              </Button>
            </div>
          )}

          {step === 'verify' && verifyStatus === 'verified' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p className="text-green-700 font-medium">Backlink verified! Creating your account…</p>
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
              <Label htmlFor="domain">Your website domain</Label>
              <Input
                id="domain"
                value={domain}
                onChange={e => setDomain(e.target.value)}
                placeholder="yoursite.com"
                required
              />
              <p className="text-xs text-gray-500">We'll verify a do-follow link to asads.ca exists on your site</p>
            </div>

            {/* Cities */}
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
              {loading ? 'Verifying…' : 'Verify Backlink & Create Account'}
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
