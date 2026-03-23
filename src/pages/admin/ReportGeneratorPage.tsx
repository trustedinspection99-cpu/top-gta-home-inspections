import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase, DbJob } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, CheckCircle2, AlertCircle, Send, ImagePlus } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  images?: string[];
}

function greeting(job?: DbJob | null) {
  return `Hi! I'm Scout, ASADS's AI inspection assistant.\n\n${
    job
      ? `I can see this is a **${job.inspection_type}** at **${job.address}, ${job.city}**.\n\n`
      : ''
  }Tell me what you found during the inspection — go section by section (Roofing, Exterior, Foundation, Electrical, Plumbing, HVAC, Insulation, Interior) or just describe what stood out. Upload photos anytime.\n\nWhen you've covered everything, click **Generate Report** and I'll write the full professional report.`;
}

export default function ReportGeneratorPage() {
  const { id: jobId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<DbJob | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [reportHtml, setReportHtml] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!jobId) {
      setMessages([{ role: 'assistant', content: greeting() }]);
      return;
    }
    supabase.from('jobs').select('*').eq('id', jobId).single().then(({ data }) => {
      const j = data as DbJob | null;
      setJob(j);
      setMessages([{ role: 'assistant', content: greeting(j) }]);
    });
  }, [jobId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  async function send() {
    if (!input.trim() && pendingImages.length === 0) return;

    const userMsg: Message = {
      role: 'user',
      content: input.trim(),
      images: pendingImages.length > 0 ? [...pendingImages] : undefined,
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setPendingImages([]);
    setSending(true);
    setError('');

    try {
      const { data, error: fnErr } = await supabase.functions.invoke('generate-report', {
        body: {
          mode: 'chat',
          messages: updated.map(m => ({ role: m.role, content: m.content })),
        },
      });

      if (fnErr || !data?.reply) {
        setError(fnErr?.message ?? 'Scout did not respond. Check the Edge Function is deployed.');
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch (e: unknown) {
      setError((e as Error).message);
    }
    setSending(false);
  }

  async function generateReport() {
    setGenerating(true);
    setError('');

    try {
      const { data, error: fnErr } = await supabase.functions.invoke('generate-report', {
        body: {
          mode: 'report',
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          jobContext: job
            ? {
                address: job.address,
                inspectionType: job.inspection_type,
                inspectionDate: job.scheduled_at
                  ? new Date(job.scheduled_at).toLocaleDateString('en-CA')
                  : new Date().toLocaleDateString('en-CA'),
                inspector: 'ASADS Certified Inspector',
              }
            : undefined,
        },
      });

      if (fnErr || !data?.html) {
        setError(fnErr?.message ?? 'Report generation failed. Check the Edge Function logs.');
      } else {
        setReportHtml(data.html);
      }
    } catch (e: unknown) {
      setError((e as Error).message);
    }
    setGenerating(false);
  }

  async function saveReport() {
    if (!jobId) return;
    setSaving(true);
    setError('');

    const fileName = `report-${jobId}-${Date.now()}.html`;
    const blob = new Blob([reportHtml], { type: 'text/html' });

    const { error: uploadErr } = await supabase.storage
      .from('reports')
      .upload(fileName, blob, { contentType: 'text/html', upsert: true });

    if (uploadErr) {
      setError('Upload failed: ' + uploadErr.message);
      setSaving(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('reports').getPublicUrl(fileName);
    await supabase.from('reports').insert({ job_id: jobId, storage_url: publicUrl });
    await supabase.from('jobs').update({
      status: 'completed',
      completed_at: new Date().toISOString(),
    }).eq('id', jobId);

    setSaving(false);
    setSaved(true);
    setTimeout(() => navigate('/admin'), 2000);
  }

  function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    Array.from(e.target.files ?? []).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setPendingImages(prev => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  }

  // ── Report review screen ──
  if (reportHtml) {
    return (
      <PortalLayout>
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={() => setReportHtml('')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chat
          </Button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Review Report</h1>

        {saved ? (
          <div className="flex flex-col items-center gap-3 py-16 bg-white border border-gray-200 rounded-xl text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <p className="font-semibold text-gray-900 text-lg">Report saved!</p>
            <p className="text-sm text-gray-500">Returning to admin dashboard…</p>
          </div>
        ) : (
          <>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
              <div
                className="w-full max-h-[600px] overflow-auto p-6"
                dangerouslySetInnerHTML={{ __html: reportHtml }}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setReportHtml('')}>← Revise</Button>
              <Button
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                onClick={saveReport}
                disabled={saving}
              >
                <CheckCircle2 className="h-4 w-4" />
                {saving ? 'Saving…' : 'Save & Send to Client'}
              </Button>
            </div>
          </>
        )}
      </PortalLayout>
    );
  }

  // ── Chat screen ──
  return (
    <PortalLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin" className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="text-center">
          <p className="font-semibold text-gray-900">Scout AI</p>
          {job && <p className="text-xs text-gray-500">{job.address}</p>}
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          onClick={generateReport}
          disabled={generating || messages.length < 3}
          title={messages.length < 3 ? 'Have a conversation first' : 'Generate the report'}
        >
          <Sparkles className="h-4 w-4" />
          {generating ? 'Generating…' : 'Generate Report'}
        </Button>
      </div>

      {/* Chat window */}
      <div className="flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
              }`}>
                <p className="whitespace-pre-wrap">{m.content}</p>
                {m.images && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {m.images.map((img, j) => (
                      <img key={j} src={img} className="h-20 w-20 object-cover rounded-lg" alt="inspection photo" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {sending && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 150, 300].map(delay => (
                    <div
                      key={delay}
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border-t border-red-200 text-red-700 px-4 py-2 text-sm">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Pending images preview */}
        {pendingImages.length > 0 && (
          <div className="flex gap-2 px-4 py-2 bg-white border-t border-gray-100 flex-wrap">
            {pendingImages.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} className="h-14 w-14 object-cover rounded-lg border border-gray-300" alt="" />
                <button
                  onClick={() => setPendingImages(prev => prev.filter((_, j) => j !== i))}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold"
                >×</button>
              </div>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="flex gap-2 p-3 bg-white border-t border-gray-200">
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
          <button
            onClick={() => fileRef.current?.click()}
            className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
            title="Upload photos"
          >
            <ImagePlus className="h-5 w-5" />
          </button>
          <textarea
            className="flex-1 resize-none text-sm focus:outline-none bg-transparent placeholder-gray-400 py-2"
            placeholder="Describe what you found… (Shift+Enter for new line)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            style={{ maxHeight: '120px' }}
          />
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 shrink-0 h-9 w-9 p-0"
            onClick={send}
            disabled={sending || (!input.trim() && pendingImages.length === 0)}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </PortalLayout>
  );
}
