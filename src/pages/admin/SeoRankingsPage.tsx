import { useEffect, useState } from 'react';
import { supabase, DbRankTracking } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, TrendingDown, Minus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUPABASE_URL = 'https://wjxbojjhyocrxqkfnxmz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqeGJvampoeW9jcnhxa2ZueG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTY3NzMsImV4cCI6MjA4OTc3Mjc3M30.-QlS8qmiGs5cqlUOZP5_iMGbBoPyeimXhLOU6lwO-fQ';

type Filter = 'all' | 'toronto' | 'ontario' | 'other';

function positionColor(pos: number | null) {
  if (pos === null) return 'text-gray-400';
  if (pos <= 3) return 'text-green-600 font-bold';
  if (pos <= 10) return 'text-blue-600 font-semibold';
  if (pos <= 20) return 'text-amber-600';
  return 'text-red-500';
}

function positionBadge(pos: number | null) {
  if (pos === null) return <span className="text-gray-400 text-sm">Not found</span>;
  if (pos <= 3) return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-bold">#{pos} Top 3</span>;
  if (pos <= 10) return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 font-semibold">#{pos} Page 1</span>;
  if (pos <= 20) return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700">#{pos} Page 2</span>;
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-600">#{pos}</span>;
}

function DeltaBadge({ current, previous }: { current: number | null; previous: number | null }) {
  if (current === null || previous === null) return <span className="text-gray-300">—</span>;
  const diff = previous - current; // positive = improved (lower number = better rank)
  if (diff === 0) return <span className="flex items-center gap-0.5 text-gray-400 text-xs"><Minus className="h-3 w-3" />0</span>;
  if (diff > 0) return <span className="flex items-center gap-0.5 text-green-600 text-xs font-medium"><TrendingUp className="h-3 w-3" />+{diff}</span>;
  return <span className="flex items-center gap-0.5 text-red-500 text-xs font-medium"><TrendingDown className="h-3 w-3" />{diff}</span>;
}

export default function SeoRankingsPage() {
  const [rows, setRows] = useState<DbRankTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [lastChecked, setLastChecked] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    // Get the latest check per keyword (most recent checked_at per keyword)
    const { data } = await supabase
      .from('rank_tracking')
      .select('*')
      .order('checked_at', { ascending: false });

    if (data) {
      // Deduplicate: keep only the most recent row per keyword
      const seen = new Set<string>();
      const latest: DbRankTracking[] = [];
      for (const row of data as DbRankTracking[]) {
        if (!seen.has(row.keyword)) {
          seen.add(row.keyword);
          latest.push(row);
        }
      }
      latest.sort((a, b) => {
        // Sort: ranked first (by position), then not-found
        if (a.position === null && b.position !== null) return 1;
        if (a.position !== null && b.position === null) return -1;
        if (a.position !== null && b.position !== null) return a.position - b.position;
        return a.keyword.localeCompare(b.keyword);
      });
      setRows(latest);
      if (latest.length > 0) setLastChecked(latest[0].checked_at);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function refreshNow() {
    setRefreshing(true);
    setRefreshMsg('');
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/check-rankings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (res.ok) {
        setRefreshMsg('Rankings updated successfully.');
        await load();
      } else {
        const err = await res.text();
        setRefreshMsg(`Error: ${err}`);
      }
    } catch (e: any) {
      setRefreshMsg(`Error: ${e.message}`);
    }
    setRefreshing(false);
  }

  const filtered = rows.filter(r => {
    if (filter === 'toronto') return r.city === 'Toronto' || r.city === 'North York' || r.city === 'Scarborough' || r.city === 'Etobicoke';
    if (filter === 'ontario') return r.city === 'Ontario';
    if (filter === 'other') return r.city !== 'Toronto' && r.city !== 'North York' && r.city !== 'Scarborough' && r.city !== 'Etobicoke' && r.city !== 'Ontario';
    return true;
  });

  const top3 = rows.filter(r => r.position !== null && r.position <= 3).length;
  const page1 = rows.filter(r => r.position !== null && r.position <= 10).length;
  const page2 = rows.filter(r => r.position !== null && r.position > 10 && r.position <= 20).length;
  const notFound = rows.filter(r => r.position === null).length;

  return (
    <PortalLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin"><ArrowLeft className="h-4 w-4 mr-1" />Dashboard</Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SEO Rankings</h1>
            {lastChecked && (
              <p className="text-xs text-gray-400 mt-0.5">
                Last updated: {new Date(lastChecked).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {refreshMsg && <p className="text-sm text-gray-600">{refreshMsg}</p>}
          <Button
            onClick={refreshNow}
            disabled={refreshing}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Checking…' : 'Refresh Now'}
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Top 3', value: top3, bg: 'bg-green-50', text: 'text-green-700' },
          { label: 'Page 1 (1–10)', value: page1, bg: 'bg-blue-50', text: 'text-blue-700' },
          { label: 'Page 2 (11–20)', value: page2, bg: 'bg-amber-50', text: 'text-amber-700' },
          { label: 'Not Found', value: notFound, bg: 'bg-red-50', text: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4`}>
            <p className={`text-3xl font-bold ${s.text}`}>{s.value}</p>
            <p className="text-sm text-gray-600 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {(['all', 'toronto', 'ontario', 'other'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? `All (${rows.length})` : f === 'toronto' ? 'Toronto' : f === 'ontario' ? 'Ontario-wide' : 'Other Cities'}
          </button>
        ))}
      </div>

      {/* Rankings table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Keyword</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">City</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600">Position</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-600">Change</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 hidden lg:table-cell">Ranking URL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={5} className="px-4 py-3">
                    <div className="h-5 bg-gray-100 rounded animate-pulse w-3/4" />
                  </td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                  {rows.length === 0
                    ? 'No ranking data yet. Click "Refresh Now" to fetch rankings.'
                    : 'No keywords match this filter.'}
                </td>
              </tr>
            ) : (
              filtered.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{row.keyword}</td>
                  <td className="px-4 py-3 text-gray-500">{row.city}</td>
                  <td className="px-4 py-3 text-center">
                    {positionBadge(row.position)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <DeltaBadge current={row.position} previous={row.previous_position} />
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs truncate max-w-xs hidden lg:table-cell">
                    {row.url_ranked ? (
                      <a href={row.url_ranked} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline truncate block max-w-xs">
                        {row.url_ranked.replace('https://', '').replace('http://', '')}
                      </a>
                    ) : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && !loading && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Setup required:</strong> Deploy the <code>check-rankings</code> Supabase Edge Function and create the <code>rank_tracking</code> table. See <code>supabase/setup.sql</code> and <code>supabase/functions/check-rankings/index.ts</code> in the project.
        </div>
      )}
    </PortalLayout>
  );
}
