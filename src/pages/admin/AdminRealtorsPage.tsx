import { useEffect, useState } from 'react';
import { supabase, DbRealtor, DbUser } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, Check, X, Building2, Globe } from 'lucide-react';

const GTA_CITIES = [
  'Toronto', 'Mississauga', 'Brampton', 'Markham', 'Vaughan', 'Richmond Hill',
  'Oakville', 'Burlington', 'Hamilton', 'Oshawa', 'Whitby', 'Ajax', 'Pickering',
  'Newmarket', 'Aurora', 'Barrie', 'Cambridge', 'Kitchener', 'Waterloo', 'Guelph',
];

interface RealtorRow {
  realtor: DbRealtor;
  user: DbUser;
}

interface EditState {
  name: string;
  agency: string;
  domain: string;
  cities: string[];
  listed: boolean;
  backlink_verified: boolean;
}

export default function AdminRealtorsPage() {
  const [rows, setRows] = useState<RealtorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string>('');
  const [editState, setEditState] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  async function load() {
    const { data: realtors } = await supabase.from('realtors').select('*').order('id');
    if (!realtors || realtors.length === 0) { setLoading(false); return; }

    const userIds = (realtors as DbRealtor[]).map(r => r.user_id);
    const { data: users } = await supabase.from('users').select('*').in('id', userIds);
    const userMap = Object.fromEntries(((users ?? []) as DbUser[]).map(u => [u.id, u]));

    setRows((realtors as DbRealtor[]).filter(r => userMap[r.user_id]).map(r => ({ realtor: r, user: userMap[r.user_id] })));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function startEdit(row: RealtorRow) {
    setEditId(row.realtor.id);
    setEditState({
      name: row.user.name,
      agency: row.realtor.agency,
      domain: row.realtor.domain,
      cities: row.realtor.cities,
      listed: row.realtor.listed,
      backlink_verified: row.realtor.backlink_verified,
    });
  }

  async function saveEdit(row: RealtorRow) {
    if (!editState) return;
    setSaving(true);
    await Promise.all([
      supabase.from('realtors').update({
        agency: editState.agency,
        domain: editState.domain,
        cities: editState.cities,
        listed: editState.listed,
        backlink_verified: editState.backlink_verified,
      }).eq('id', row.realtor.id),
      supabase.from('users').update({ name: editState.name }).eq('id', row.user.id),
    ]);
    setSaving(false);
    setEditId('');
    setEditState(null);
    load();
  }

  async function deleteRealtor(row: RealtorRow) {
    if (!confirm(`Remove ${row.user.name} from the directory?`)) return;
    setDeletingId(row.realtor.id);
    await supabase.from('realtors').update({ listed: false }).eq('id', row.realtor.id);
    setDeletingId('');
    load();
  }

  function toggleCity(city: string) {
    if (!editState) return;
    setEditState(prev => prev ? ({
      ...prev,
      cities: prev.cities.includes(city) ? prev.cities.filter(c => c !== city) : [...prev.cities, city],
    }) : prev);
  }

  return (
    <PortalLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Realtor Directory</h1>
        <p className="text-gray-500">{rows.length} realtors total</p>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}</div>
      ) : rows.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No realtors yet.</p>
      ) : (
        <div className="space-y-4">
          {rows.map(row => {
            const isEditing = editId === row.realtor.id;
            return (
              <div key={row.realtor.id} className={`bg-white border rounded-xl p-5 ${isEditing ? 'border-blue-300 shadow-sm' : 'border-gray-200'}`}>
                {isEditing && editState ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Full Name</label>
                        <Input value={editState.name} onChange={e => setEditState(s => s ? { ...s, name: e.target.value } : s)} />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Agency</label>
                        <Input value={editState.agency} onChange={e => setEditState(s => s ? { ...s, agency: e.target.value } : s)} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">Domain</label>
                      <Input value={editState.domain} onChange={e => setEditState(s => s ? { ...s, domain: e.target.value } : s)} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-2 block">Cities</label>
                      <div className="flex flex-wrap gap-1.5">
                        {GTA_CITIES.map(city => (
                          <button
                            key={city}
                            type="button"
                            onClick={() => toggleCity(city)}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                              editState.cities.includes(city)
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                            }`}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" checked={editState.listed} onChange={e => setEditState(s => s ? { ...s, listed: e.target.checked } : s)} className="rounded" />
                        Listed
                      </label>
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" checked={editState.backlink_verified} onChange={e => setEditState(s => s ? { ...s, backlink_verified: e.target.checked } : s)} className="rounded" />
                        Backlink Verified
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => saveEdit(row)} disabled={saving}>
                        <Check className="h-3.5 w-3.5 mr-1" />{saving ? 'Saving…' : 'Save'}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => { setEditId(''); setEditState(null); }}>
                        <X className="h-3.5 w-3.5 mr-1" />Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
                        {row.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900">{row.user.name}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                          <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{row.realtor.agency}</span>
                          <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{row.realtor.domain}</span>
                        </div>
                        <div className="flex gap-1.5 mt-1 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${row.realtor.listed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {row.realtor.listed ? 'Listed' : 'Unlisted'}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${row.realtor.backlink_verified ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                            {row.realtor.backlink_verified ? 'Backlink ✓' : 'Backlink pending'}
                          </span>
                          {row.realtor.cities.slice(0, 3).map(c => (
                            <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{c}</span>
                          ))}
                          {row.realtor.cities.length > 3 && <span className="text-xs text-gray-400">+{row.realtor.cities.length - 3}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 text-xs h-7" onClick={() => startEdit(row)}>
                        <Pencil className="h-3 w-3 mr-1" />Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-300 text-red-600 text-xs h-7" onClick={() => deleteRealtor(row)} disabled={deletingId === row.realtor.id}>
                        <Trash2 className="h-3 w-3 mr-1" />{deletingId === row.realtor.id ? 'Removing…' : 'Remove'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </PortalLayout>
  );
}
