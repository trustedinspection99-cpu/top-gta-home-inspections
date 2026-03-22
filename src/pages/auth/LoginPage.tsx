import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // Fetch role directly from DB — don't rely on context timing
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('users').select('role').eq('id', user.id).single();
      const r = data?.role;
      if (r === 'admin') navigate('/admin');
      else if (r === 'realtor') navigate('/realtor-dashboard');
      else navigate('/dashboard');
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-gray-900">ASADS Home Inspection</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Sign in to your portal</h1>
          <p className="text-gray-500 mt-1">Access your inspection reports and job status</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">Sign up</Link>
          </div>
          <div className="mt-2 text-center text-sm text-gray-500">
            Are you a realtor?{' '}
            <Link to="/signup/realtor" className="text-blue-600 hover:underline font-medium">Realtor sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
