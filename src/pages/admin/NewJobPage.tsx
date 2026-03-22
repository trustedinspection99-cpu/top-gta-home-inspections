import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

const INSPECTION_TYPES = [
  'Pre-Purchase Home Inspection',
  'Pre-Listing Home Inspection',
  'New Construction Inspection',
  'Condo Inspection',
  'Commercial Inspection',
  'Radon Testing',
  'Mold Inspection',
  'Asbestos Testing',
  'WETT Inspection',
  'Thermal Imaging',
  'Sewer Scope Inspection',
  'Air Quality Testing',
  'Well Water Testing',
  'Lead Paint Testing',
];

export default function NewJobPage() {
  const navigate = useNavigate();
  const [clientEmail, setClientEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [inspectionType, setInspectionType] = useState(INSPECTION_TYPES[0]);
  const [scheduledAt, setScheduledAt] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Look up homeowner by email
    const { data: userData } = await supabase
      .from('users')
      .select('id')
      .eq('email', clientEmail.trim())
      .eq('role', 'homeowner')
      .single();

    if (!userData) {
      setError('No homeowner account found with that email. Ask the client to sign up first.');
      setLoading(false);
      return;
    }

    const { error: insertErr } = await supabase.from('jobs').insert({
      homeowner_id: userData.id,
      address: address.trim(),
      city: city.trim(),
      inspection_type: inspectionType,
      status: 'scheduled',
      scheduled_at: scheduledAt || null,
    });

    setLoading(false);
    if (insertErr) {
      setError(insertErr.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate('/admin'), 1500);
  }

  return (
    <PortalLayout>
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin" className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Inspection Job</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-xl">
        {success ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
            <p className="font-semibold text-gray-900">Job created!</p>
            <p className="text-sm text-gray-500">Returning to dashboard…</p>
          </div>
        ) : (
          <>
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="clientEmail">Client email (homeowner account)</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={clientEmail}
                  onChange={e => setClientEmail(e.target.value)}
                  placeholder="client@example.com"
                  required
                />
                <p className="text-xs text-gray-400">Client must have a homeowner account on the portal</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="address">Property address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="123 Main Street"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Toronto"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="type">Inspection type</Label>
                <select
                  id="type"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={inspectionType}
                  onChange={e => setInspectionType(e.target.value)}
                >
                  {INSPECTION_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="scheduledAt">Scheduled date & time</Label>
                <Input
                  id="scheduledAt"
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={e => setScheduledAt(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? 'Creating…' : 'Create Job'}
              </Button>
            </form>
          </>
        )}
      </div>
    </PortalLayout>
  );
}
