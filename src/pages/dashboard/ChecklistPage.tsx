import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase, DbMaintenance } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { CheckSquare, Square, Plus, Wrench } from 'lucide-react';

const CATEGORIES = ['Roofing', 'Electrical', 'Plumbing', 'HVAC', 'Exterior', 'Interior', 'Foundation', 'General'];

export default function ChecklistPage() {
  const { dbUser } = useAuth();
  const [items, setItems] = useState<DbMaintenance[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('General');

  useEffect(() => {
    if (!dbUser) return;
    supabase
      .from('maintenance')
      .select('*')
      .eq('user_id', dbUser.id)
      .order('due_date', { ascending: true })
      .then(({ data }) => {
        setItems((data as DbMaintenance[]) ?? []);
        setLoading(false);
      });
  }, [dbUser]);

  async function toggleItem(item: DbMaintenance) {
    const { data } = await supabase
      .from('maintenance')
      .update({ completed: !item.completed })
      .eq('id', item.id)
      .select()
      .single();
    if (data) {
      setItems(prev => prev.map(i => i.id === item.id ? data as DbMaintenance : i));
    }
  }

  async function addItem() {
    if (!newTitle.trim() || !dbUser) return;
    const { data } = await supabase
      .from('maintenance')
      .insert({
        user_id: dbUser.id,
        title: newTitle.trim(),
        category: newCategory,
        completed: false,
        property_address: '',
      })
      .select()
      .single();
    if (data) {
      setItems(prev => [...prev, data as DbMaintenance]);
      setNewTitle('');
      setAdding(false);
    }
  }

  const pending = items.filter(i => !i.completed);
  const done = items.filter(i => i.completed);

  return (
    <PortalLayout>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Maintenance Checklist</h1>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Add Item
        </Button>
      </div>
      <p className="text-gray-500 mb-8">Track repairs and maintenance from your inspection report</p>

      {/* Add form */}
      {adding && (
        <div className="bg-white border border-blue-200 rounded-xl p-4 mb-6 flex gap-3 items-end">
          <div className="flex-1 space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Task</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Replace bathroom exhaust fan"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addItem()}
              autoFocus
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Category</label>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={addItem}>Save</Button>
          <Button size="sm" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">
          <Wrench className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No maintenance items yet.</p>
          <p className="text-sm text-gray-400 mt-1">Items from your inspection report will appear here automatically.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pending.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                To Do ({pending.length})
              </h2>
              <div className="space-y-2">
                {pending.map(item => (
                  <ChecklistItem key={item.id} item={item} onToggle={toggleItem} />
                ))}
              </div>
            </section>
          )}
          {done.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Completed ({done.length})
              </h2>
              <div className="space-y-2 opacity-60">
                {done.map(item => (
                  <ChecklistItem key={item.id} item={item} onToggle={toggleItem} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </PortalLayout>
  );
}

function ChecklistItem({ item, onToggle }: { item: DbMaintenance; onToggle: (i: DbMaintenance) => void }) {
  const PRIORITY_COLORS: Record<string, string> = {
    P1: 'bg-red-100 text-red-700',
    P2: 'bg-amber-100 text-amber-700',
    P3: 'bg-blue-100 text-blue-700',
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onToggle(item)}
    >
      {item.completed
        ? <CheckSquare className="h-5 w-5 text-green-500 shrink-0" />
        : <Square className="h-5 w-5 text-gray-400 shrink-0" />
      }
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${item.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {item.title}
        </p>
        {item.property_address && (
          <p className="text-xs text-gray-400 truncate">{item.property_address}</p>
        )}
      </div>
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[item.category] ?? 'bg-gray-100 text-gray-500'}`}>
        {item.category}
      </span>
      {item.due_date && (
        <span className="text-xs text-gray-400 shrink-0">
          {new Date(item.due_date).toLocaleDateString('en-CA')}
        </span>
      )}
    </div>
  );
}
