import { useEffect, useState } from 'react';
import { supabase, DbOutreach, OutreachStatus } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Mail, Plus, Check, X, Send, Clock, MessageCircle, BadgeCheck,
  Trash2, Globe, MapPin, Building2, Settings, ChevronDown, ChevronUp,
} from 'lucide-react';

const SAMPLE_URL_KEY = 'asads_outreach_sample_url';
const DEFAULT_SAMPLE_URL = 'https://wjxbojjhyocrxqkfnxmz.supabase.co/storage/v1/object/public/Reports/inspections/23-seed-house-lane/report.html';

const STATUS_STYLES: Record<OutreachStatus, string> = {
  pending: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-700',
  replied: 'bg-amber-100 text-amber-700',
  listed: 'bg-green-100 text-green-700',
};

const STATUS_ICONS: Record<OutreachStatus, JSX.Element> = {
  pending: <Clock className="h-3 w-3" />,
  sent: <Send className="h-3 w-3" />,
  replied: <MessageCircle className="h-3 w-3" />,
  listed: <BadgeCheck className="h-3 w-3" />,
};

const STATUS_ORDER: OutreachStatus[] = ['pending', 'sent', 'replied', 'listed'];

interface AddForm {
  name: string;
  email: string;
  city: string;
  agency: string;
  website: string;
}

const BLANK_FORM: AddForm = { name: '', email: '', city: '', agency: '', website: '' };

export default function OutreachPage() {
  const [rows, setRows] = useState<DbOutreach[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<OutreachStatus | 'all'>('all');
  const [sampleUrl, setSampleUrl] = useState(() => localStorage.getItem(SAMPLE_URL_KEY) ?? DEFAULT_SAMPLE_URL);
  const [showConfig, setShowConfig] = useState(false);
  const [sampleDraft, setSampleDraft] = useState(() => localStorage.getItem(SAMPLE_URL_KEY) ?? DEFAULT_SAMPLE_URL);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<AddForm>(BLANK_FORM);
  const [adding, setAdding] = useState(false);
  const [sendingId, setSendingId] = useState('');
  const [sendMsg, setSendMsg] = useState<Record<string, string>>({});
  const [deletingId, setDeletingId] = useState('');

  async function load() {
    const { data } = await supabase
      .from('realtor_outreach')
      .select('*')
      .order('created_at', { ascending: false });
    setRows((data as DbOutreach[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function saveSampleUrl() {
    localStorage.setItem(SAMPLE_URL_KEY, sampleDraft);
    setSampleUrl(sampleDraft);
    setShowConfig(false);
  }

  async function addProspect() {
    if (!form.name || !form.email) return;
    setAdding(true);
    await supabase.from('realtor_outreach').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      city: form.city.trim() || null,
      agency: form.agency.trim() || null,
      website: form.website.trim() || null,
      status: 'pending',
    });
    setForm(BLANK_FORM);
    setShowAdd(false);
    setAdding(false);
    await load();
  }

  async function sendEmail(row: DbOutreach) {
    setSendingId(row.id);
    setSendMsg(prev => ({ ...prev, [row.id]: '' }));
    try {
      const { data, error } = await supabase.functions.invoke('send-realtor-outreach', {
        body: {
          outreach_id: row.id,
          name: row.name,
          email: row.email,
          city: row.city,
          agency: row.agency,
          website: row.website,
          sample_report_url: sampleUrl || null,
        },
      });
      if (error || data?.error) {
        setSendMsg(prev => ({ ...prev, [row.id]: 'Failed to send — check edge function logs' }));
      } else {
        await supabase
          .from('realtor_outreach')
          .update({ status: 'sent', sent_at: new Date().toISOString() })
          .eq('id', row.id);
        setSendMsg(prev => ({ ...prev, [row.id]: 'Sent!' }));
        await load();
      }
    } catch {
      setSendMsg(prev => ({ ...prev, [row.id]: 'Network error' }));
    }
    setSendingId('');
  }

  async function updateStatus(row: DbOutreach, status: OutreachStatus) {
    await supabase.from('realtor_outreach').update({ status }).eq('id', row.id);
    await load();
  }

  async function deleteRow(row: DbOutreach) {
    if (!confirm(`Remove ${row.name} from outreach list?`)) return;
    setDeletingId(row.id);
    await supabase.from('realtor_outreach').delete().eq('id', row.id);
    setDeletingId('');
    await load();
  }

  const filtered = filterStatus === 'all' ? rows : rows.filter(r => r.status === filterStatus);
  const counts: Record<string, number> = {
    all: rows.length,
    pending: rows.filter(r => r.status === 'pending').length,
    sent: rows.filter(r => r.status === 'sent').length,
    replied: rows.filter(r => r.status === 'replied').length,
    listed: rows.filter(r => r.status === 'listed').length,
  };

  return (
    <PortalLayout>
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Realtor Outreach</h1>
          <p className="text-gray-500">Send personalized emails to recruit realtors to the Trusted Partner program.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-600"
            onClick={() => { setShowConfig(v => !v); setSampleDraft(sampleUrl); }}
          >
            <Settings className="h-4 w-4 mr-1" />
            Sample Report URL
            {showConfig ? <ChevronUp className="h-3.5 w-3.5 ml-1" /> : <ChevronDown className="h-3.5 w-3.5 ml-1" />}
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowAdd(v => !v)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Prospect
          </Button>
        </div>
      </div>

      {/* Sample report config */}
      {showConfig && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
          <p className="text-sm font-semibold text-amber-900 mb-1">Sample Report URL</p>
          <p className="text-xs text-amber-700 mb-3">
            Paste a public Supabase Storage URL for a real inspection report. This will be included in all outreach emails.
            Make the file public in Supabase Storage → Reports bucket → right-click → "Make Public".
          </p>
          <div className="flex gap-2">
            <Input
              value={sampleDraft}
              onChange={e => setSampleDraft(e.target.value)}
              placeholder="https://wjxbojjhyocrxqkfnxmz.supabase.co/storage/v1/object/public/Reports/..."
              className="flex-1 text-sm"
            />
            <Button size="sm" onClick={saveSampleUrl} className="bg-amber-600 hover:bg-amber-700 shrink-0">
              <Check className="h-3.5 w-3.5 mr-1" />Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowConfig(false)} className="shrink-0">
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
          {sampleUrl && (
            <p className="text-xs text-green-700 mt-2">
              Current: <a href={sampleUrl} target="_blank" rel="noopener noreferrer" className="underline">{sampleUrl}</a>
            </p>
          )}
        </div>
      )}

      {/* Add prospect form */}
      {showAdd && (
        <div className="bg-white border border-blue-200 rounded-xl p-5 mb-6 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Add Prospect</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Full Name *</label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Sarah Johnson" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Email *</label>
              <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="sarah@realty.ca" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Agency</label>
              <Input value={form.agency} onChange={e => setForm(f => ({ ...f, agency: e.target.value }))} placeholder="RE/MAX Hallmark" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">City</label>
              <Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="Toronto" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Website (optional)</label>
              <Input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="sarahjohnsonhomes.ca" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={addProspect}
              disabled={adding || !form.name || !form.email}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />{adding ? 'Adding…' : 'Add Prospect'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => { setShowAdd(false); setForm(BLANK_FORM); }}>
              <X className="h-3.5 w-3.5 mr-1" />Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {(['all', ...STATUS_ORDER] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`rounded-xl p-3 text-left transition-all border ${
              filterStatus === s
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <p className="text-xl font-bold text-gray-900">{counts[s]}</p>
            <p className="text-xs text-gray-500 capitalize">{s === 'all' ? 'Total' : s}</p>
          </button>
        ))}
      </div>

      {/* Prospect list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            {filterStatus === 'all'
              ? 'No prospects yet. Add your first realtor to get started.'
              : `No prospects with status "${filterStatus}".`}
          </p>
          {filterStatus === 'all' && (
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAdd(true)}>
              <Plus className="h-4 w-4 mr-1" />Add First Prospect
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(row => (
            <div key={row.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 flex-wrap hover:border-blue-200 transition-colors">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                {row.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{row.name}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-0.5">
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{row.email}</span>
                  {row.agency && <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{row.agency}</span>}
                  {row.city && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{row.city}</span>}
                  {row.website && <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{row.website}</span>}
                </div>
                {row.sent_at && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Sent {new Date(row.sent_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {row.opened_at && (
                      <span className="ml-2 text-green-600 font-semibold">
                        · ✅ Opened {new Date(row.opened_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })} at {new Date(row.opened_at).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })}
                      </span>
                    )}
                  </p>
                )}
                {sendMsg[row.id] && (
                  <p className={`text-xs mt-1 font-medium ${sendMsg[row.id] === 'Sent!' ? 'text-green-600' : 'text-red-600'}`}>
                    {sendMsg[row.id]}
                  </p>
                )}
              </div>

              {/* Status + Actions */}
              <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                {/* Status badge / dropdown */}
                <div className="relative group">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer ${STATUS_STYLES[row.status]}`}>
                    {STATUS_ICONS[row.status]}
                    {row.status}
                  </span>
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 hidden group-hover:block min-w-[130px]">
                    {STATUS_ORDER.filter(s => s !== row.status).map(s => (
                      <button
                        key={s}
                        onClick={() => updateStatus(row, s)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-700 first:rounded-t-lg last:rounded-b-lg capitalize"
                      >
                        {STATUS_ICONS[s]}{s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Send email */}
                {row.status === 'pending' && (
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-xs h-7"
                    onClick={() => sendEmail(row)}
                    disabled={sendingId === row.id}
                  >
                    <Send className="h-3 w-3 mr-1" />
                    {sendingId === row.id ? 'Sending…' : 'Send Email'}
                  </Button>
                )}

                {/* Resend */}
                {row.status === 'sent' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-300 text-blue-700 text-xs h-7"
                    onClick={() => sendEmail(row)}
                    disabled={sendingId === row.id}
                  >
                    <Send className="h-3 w-3 mr-1" />
                    {sendingId === row.id ? 'Sending…' : 'Resend'}
                  </Button>
                )}

                {/* Delete */}
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-600 text-xs h-7 hover:bg-red-50"
                  onClick={() => deleteRow(row)}
                  disabled={deletingId === row.id}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PortalLayout>
  );
}
