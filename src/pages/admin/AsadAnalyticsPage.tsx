import { useEffect, useState } from 'react';
import { supabase, DbConversationLog } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle, CheckCircle2, XCircle, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

type Period = '1d' | '7d' | '30d' | 'all';

function periodLabel(p: Period) {
  return { '1d': 'Today', '7d': 'Last 7 days', '30d': 'Last 30 days', 'all': 'All time' }[p];
}

function periodStart(p: Period): string | null {
  const now = new Date();
  if (p === '1d') { now.setHours(0, 0, 0, 0); return now.toISOString(); }
  if (p === '7d') { now.setDate(now.getDate() - 7); return now.toISOString(); }
  if (p === '30d') { now.setDate(now.getDate() - 30); return now.toISOString(); }
  return null;
}

export default function AsadAnalyticsPage() {
  const [logs, setLogs] = useState<DbConversationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>('7d');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    let query = supabase
      .from('conversation_logs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(500);

    const start = periodStart(period);
    if (start) query = query.gte('started_at', start);

    const { data } = await query;
    setLogs((data as DbConversationLog[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, [period]);

  const total = logs.length;
  const booked = logs.filter(l => l.booked).length;
  const bookingRate = total > 0 ? Math.round((booked / total) * 100) : 0;

  // Topic frequency
  const serviceCounts: Record<string, number> = {};
  const cityCounts: Record<string, number> = {};
  for (const log of logs) {
    if (log.service_type) serviceCounts[log.service_type] = (serviceCounts[log.service_type] ?? 0) + 1;
    if (log.city) cityCounts[log.city] = (cityCounts[log.city] ?? 0) + 1;
  }
  const topServices = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const topCities = Object.entries(cityCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // Reasons not booked
  const reasonCounts: Record<string, number> = {};
  for (const log of logs.filter(l => !l.booked && l.reason_not_booked)) {
    const r = log.reason_not_booked!;
    reasonCounts[r] = (reasonCounts[r] ?? 0) + 1;
  }
  const topReasons = Object.entries(reasonCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <PortalLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin"><ArrowLeft className="h-4 w-4 mr-1" />Dashboard</Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Asad Analytics</h1>
            <p className="text-gray-500 text-sm">AI booking assistant performance</p>
          </div>
        </div>
        {/* Period filter */}
        <div className="flex gap-2">
          {(['1d', '7d', '30d', 'all'] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                period === p ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {periodLabel(p)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{total}</span>
          </div>
          <p className="text-sm text-gray-600">Total Conversations</p>
        </div>
        <div className="bg-green-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{booked}</span>
          </div>
          <p className="text-sm text-gray-600">Bookings Made</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-5 w-5 text-amber-600" />
            <span className="text-2xl font-bold text-gray-900">{bookingRate}%</span>
          </div>
          <p className="text-sm text-gray-600">Booking Rate</p>
        </div>
        <div className="bg-red-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">{total - booked}</span>
          </div>
          <p className="text-sm text-gray-600">Not Booked</p>
        </div>
      </div>

      {/* Top services + cities + reasons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Top Services Asked About</h3>
          {topServices.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet</p>
          ) : (
            <div className="space-y-2">
              {topServices.map(([service, count]) => (
                <div key={service} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-700 capitalize">{service.replace(/-/g, ' ')}</span>
                      <span className="text-gray-500">{count}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${Math.round((count / (topServices[0][1] || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Top Cities</h3>
          {topCities.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet</p>
          ) : (
            <div className="space-y-2">
              {topCities.map(([city, count]) => (
                <div key={city} className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-700">{city}</span>
                      <span className="text-gray-500">{count}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${Math.round((count / (topCities[0][1] || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Why Not Booked</h3>
          {topReasons.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet</p>
          ) : (
            <div className="space-y-2">
              {topReasons.map(([reason, count]) => (
                <div key={reason} className="flex items-start gap-2 text-xs">
                  <span className="bg-red-100 text-red-600 rounded-full px-1.5 py-0.5 shrink-0 font-medium">{count}×</span>
                  <span className="text-gray-700">{reason}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Conversation log table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Conversation Log</h2>
          <p className="text-xs text-gray-400 mt-0.5">{total} conversations — click any row to see full transcript</p>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />)}
          </div>
        ) : logs.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            <MessageCircle className="h-8 w-8 mx-auto mb-3 opacity-30" />
            <p>No conversations recorded yet.</p>
            <p className="text-sm mt-1">Deploy the updated <code className="bg-gray-100 px-1 rounded">scout-booking</code> edge function to start logging.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {logs.map(log => (
              <div key={log.id}>
                <button
                  className="w-full px-5 py-4 hover:bg-gray-50 text-left"
                  onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Status */}
                    <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      log.booked ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {log.booked ? <><CheckCircle2 className="h-3 w-3" />Booked</> : <><XCircle className="h-3 w-3" />Not booked</>}
                    </span>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {log.client_name ?? 'Anonymous'} {log.city ? `· ${log.city}` : ''} {log.service_type ? `· ${log.service_type.replace(/-/g, ' ')}` : ''}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(log.started_at).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}
                        {log.client_email ? ` · ${log.client_email}` : ''}
                        {log.inspection_date ? ` · ${log.inspection_date}` : ''}
                        {log.price ? ` · ${log.price}` : ''}
                      </p>
                      {!log.booked && log.reason_not_booked && (
                        <p className="text-xs text-red-500 mt-0.5">Reason: {log.reason_not_booked}</p>
                      )}
                    </div>

                    <span className="text-gray-300 shrink-0">
                      {expandedId === log.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </div>
                </button>

                {/* Expanded transcript */}
                {expandedId === log.id && (
                  <div className="px-5 pb-4 bg-gray-50 border-t border-gray-100">
                    <div className="mt-3 space-y-2 max-h-96 overflow-y-auto">
                      {log.messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-lg px-3 py-2 rounded-lg text-sm ${
                            msg.role === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-200 text-gray-700'
                          }`}>
                            <p className={`text-xs font-semibold mb-1 ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                              {msg.role === 'user' ? 'Visitor' : 'Asad'}
                            </p>
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {logs.length === 0 && !loading && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Setup required:</strong> The <code>scout-booking</code> Supabase Edge Function needs to be updated to log conversations. See <code>supabase/functions/scout-booking-updated/index.ts</code> in the project for the updated code.
        </div>
      )}
    </PortalLayout>
  );
}
