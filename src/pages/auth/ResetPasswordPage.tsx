import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, AlertCircle, CheckCircle } from 'lucide-react';

/** Set a new password after opening the reset link from the email (Supabase recovery session). */
export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // The reset link signs the user in with a short-lived recovery session.
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Use at least 8 characters.'); return; }
    if (password !== confirm) { setError('The two passwords do not match.'); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setDone(true);
    const { data: { user } } = await supabase.auth.getUser();
    let role: string | undefined;
    if (user) {
      const { data } = await supabase.from('users').select('role').eq('id', user.id).single();
      role = data?.role ?? user.user_metadata?.role;
    }
    setTimeout(() => navigate(role === 'admin' ? '/admin' : role === 'realtor' ? '/realtor-dashboard' : '/dashboard'), 1500);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-gray-900">ASADS Home Inspection</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Set a new password</h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          {done ? (
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle className="h-4 w-4 shrink-0" /> Password changed. Taking you to your dashboard…
            </div>
          ) : !ready ? (
            <p className="text-sm text-gray-600">
              Open this page from the reset link in your email. If the link has expired,{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">request a new one</Link>.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="password">New password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm">Confirm new password</Label>
                <Input id="confirm" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required autoComplete="new-password" />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? 'Saving…' : 'Save new password'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
