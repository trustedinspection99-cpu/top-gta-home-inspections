import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase, DbJob } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, CheckCircle2, AlertCircle, Send, ImagePlus, Mic, MicOff, Loader2 } from 'lucide-react';
import { buildReportHtml, ReportData } from '@/lib/reportTemplate';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  photoUrls?: string[]; // Supabase Storage URLs
}

function greeting(job?: DbJob | null) {
  return `Hi! I'm Scout, your AI inspection assistant.\n\n${
    job ? `This is a **${job.inspection_type}** at **${job.address}, ${job.city}**.\n\n` : ''
  }Tap the mic and describe what you see — I'll categorize everything automatically by OAHI section.\n\nUpload photos anytime. They'll be stored and embedded in the final report.\n\nWhen you've covered everything, tap **Generate Report**.`;
}

export default function ReportGeneratorPage() {
  const { id: jobId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const draftKey = `scout-draft-${jobId ?? 'new'}`;

  const [job, setJob] = useState<DbJob | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [pendingPhotos, setPendingPhotos] = useState<{ url: string; preview: string }[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [sending, setSending] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [listening, setListening] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const [reportHtml, setReportHtml] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedReportId, setSavedReportId] = useState('');
  const [sendingReport, setSendingReport] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const pendingInputRef = useRef('');

  // ── Load job + restore draft ──
  useEffect(() => {
    const restore = (j: DbJob | null) => {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        try {
          const parsed: Message[] = JSON.parse(saved);
          if (parsed.length > 1) {
            setMessages(parsed);
            setDraftRestored(true);
            return;
          }
        } catch { /* ignore */ }
      }
      setMessages([{ role: 'assistant', content: greeting(j) }]);
    };

    if (!jobId) { restore(null); return; }
    supabase.from('jobs').select('*').eq('id', jobId).single().then(({ data }) => {
      const j = data as DbJob | null;
      setJob(j);
      restore(j);
    });
  }, [jobId, draftKey]);

  // ── Auto-save draft ──
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem(draftKey, JSON.stringify(messages));
    }
  }, [messages, draftKey]);

  // ── Auto-scroll ──
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  // ── Upload photos to Supabase Storage ──
  async function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    e.target.value = '';
    setUploadingPhotos(true);
    setError('');

    const uploaded: { url: string; preview: string }[] = [];

    for (const file of files) {
      // Create local preview
      const preview = URL.createObjectURL(file);

      // Upload to Supabase Storage
      const ext = file.name.split('.').pop() ?? 'jpg';
      const fileName = `inspections/${jobId ?? 'draft'}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from('reports')
        .upload(fileName, file, { contentType: file.type, upsert: false });

      if (uploadErr) {
        setError(`Photo upload failed: ${uploadErr.message}`);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from('reports').getPublicUrl(fileName);
      uploaded.push({ url: publicUrl, preview });
    }

    setPendingPhotos(prev => [...prev, ...uploaded]);
    setUploadingPhotos(false);
  }

  // ── Send message ──
  const sendWithText = useCallback(async (text: string, photos: { url: string; preview: string }[] = []) => {
    if (!text.trim() && photos.length === 0) return;

    // Build photo note to append to message so Scout knows photos were attached
    const photoNote = photos.length > 0
      ? `\n\n[${photos.length} photo${photos.length > 1 ? 's' : ''} attached — stored for report]`
      : '';

    const userMsg: Message = {
      role: 'user',
      content: text.trim() + photoNote,
      photoUrls: photos.length > 0 ? photos.map(p => p.url) : undefined,
    };

    setMessages(prev => {
      const updated = [...prev, userMsg];
      (async () => {
        setSending(true);
        setError('');
        try {
          // Send only text to Claude — photos are referenced by URL, not bytes
          const { data, error: fnErr } = await supabase.functions.invoke('generate-report', {
            body: {
              mode: 'chat',
              messages: updated.map(m => ({ role: m.role, content: m.content })),
            },
          });
          if (fnErr || !data?.reply) {
            setError(fnErr?.message ?? 'Scout did not respond. Check the Edge Function is deployed.');
          } else {
            setMessages(prev2 => [...prev2, { role: 'assistant', content: data.reply }]);
          }
        } catch (e: unknown) {
          setError((e as Error).message);
        }
        setSending(false);
      })();
      return updated;
    });

    setInput('');
    setPendingPhotos([]);
    pendingInputRef.current = '';
  }, []);

  function handleSend() {
    sendWithText(input, pendingPhotos);
  }

  // ── Voice ──
  function toggleVoice() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SR = (window as typeof window & { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition
      ?? (window as typeof window & { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;

    if (!SR) {
      setError('Voice not supported in this browser. Use Chrome or Edge.');
      return;
    }

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-CA';

    rec.onresult = (e: SpeechRecognitionEvent) => {
      let transcript = '';
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setInput(transcript);
      pendingInputRef.current = transcript;
    };

    rec.onend = () => {
      setListening(false);
      const text = pendingInputRef.current.trim();
      if (text) sendWithText(text, pendingPhotos);
    };

    rec.onerror = () => {
      setListening(false);
      setError('Microphone error. Check browser permissions and try again.');
    };

    rec.start();
    recognitionRef.current = rec;
    setListening(true);
    setError('');
  }

  // ── Generate report (Scout summarizes → template fills → opens in new tab) ──
  async function generateReport() {
    setGenerating(true);
    setError('');

    const allPhotoUrls = messages.flatMap(m => m.photoUrls ?? []);

    try {
      // Step 1: Ask Scout to extract structured JSON from the conversation
      const { data, error: fnErr } = await supabase.functions.invoke('generate-report', {
        body: {
          mode: 'summarize',
          messages: messages.map(m => ({ role: m.role, content: m.content })),
        },
      });

      if (fnErr || !data?.data) {
        setError(fnErr?.message ?? 'Scout did not return findings. Try again.');
        setGenerating(false);
        return;
      }

      const reportData = data.data as ReportData;

      // Step 2: Fill the pre-built HTML template client-side
      const jobInfo = {
        address: job?.address ?? 'Property Address',
        city: job?.city ?? '',
        inspectionType: job?.inspection_type ?? 'Home Inspection',
        inspectionDate: job?.scheduled_at
          ? new Date(job.scheduled_at).toLocaleDateString('en-CA')
          : new Date().toLocaleDateString('en-CA'),
        inspector: 'ASADS Certified Inspector',
      };

      const html = buildReportHtml(reportData, jobInfo, allPhotoUrls);

      // Step 3: Open in new tab for review + print-to-PDF
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setReportHtml(html);
    } catch (e: unknown) {
      setError((e as Error).message);
    }
    setGenerating(false);
  }

  // ── Save report ──
  async function saveReport() {
    if (!jobId || savedReportId) return;
    setSaving(true);
    setError('');

    const fileName = `report-${jobId}-${Date.now()}.html`;
    const blob = new Blob([reportHtml], { type: 'text/html' });

    const { error: uploadErr } = await supabase.storage
      .from('reports').upload(fileName, blob, { contentType: 'text/html', upsert: true });

    if (uploadErr) { setError('Upload failed: ' + uploadErr.message); setSaving(false); return; }

    const { data: { publicUrl } } = supabase.storage.from('reports').getPublicUrl(fileName);

    const { data: reportRow, error: insertErr } = await supabase
      .from('reports')
      .insert({ job_id: jobId, storage_url: publicUrl, status: 'saved' })
      .select('id')
      .single();

    if (insertErr) { setError('DB insert failed: ' + insertErr.message); setSaving(false); return; }

    await supabase.from('jobs').update({ status: 'completed', completed_at: new Date().toISOString() }).eq('id', jobId);

    localStorage.removeItem(draftKey);
    setSaving(false);
    setSavedReportId(reportRow.id);
  }

  // ── Send report to client ──
  async function sendToClient() {
    if (!job || !savedReportId) return;
    setSendingReport(true);
    setError('');

    const { error: fnErr } = await supabase.functions.invoke('send-report', {
      body: {
        reportId: savedReportId,
        jobId,
        clientEmail: job.client_email,
        clientName: job.client_name,
        address: `${job.address}, ${job.city}`,
      },
    });

    if (fnErr) {
      setError('Send failed: ' + fnErr.message);
      setSendingReport(false);
      return;
    }

    setSendingReport(false);
    setSent(true);
  }

  // ── Save / Send bar ──
  const SaveBar = reportHtml ? (
    <div className="border border-gray-200 rounded-lg px-4 py-3 mb-3 bg-white">
      {sent ? (
        <div className="flex items-center gap-2 text-green-700 text-sm">
          <CheckCircle2 className="h-4 w-4" />
          Report sent to {job?.client_email}. The client will receive a login link. Once payment is confirmed, mark it paid in the dashboard.
          <Button size="sm" variant="outline" className="ml-auto" onClick={() => navigate('/admin')}>
            Back to Dashboard
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle2 className={`h-4 w-4 ${savedReportId ? 'text-green-600' : 'text-gray-300'}`} />
            {savedReportId ? 'Report saved.' : 'Report generated — review it then save.'}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="outline" onClick={() => {
              const blob = new Blob([reportHtml], { type: 'text/html' });
              window.open(URL.createObjectURL(blob), '_blank');
            }}>
              Open Report
            </Button>
            {!savedReportId ? (
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={saveReport} disabled={saving}>
                {saving ? 'Saving…' : 'Save Report'}
              </Button>
            ) : (
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={sendToClient} disabled={sending}>
                {sending ? 'Sending…' : `Send to ${job?.client_name ?? 'Client'}`}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  ) : null;

  // ── Chat screen ──
  return (
    <PortalLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin" className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="h-4 w-4" />Back
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

      {/* Save bar */}
      {SaveBar}

      {/* Draft restored banner */}
      {draftRestored && (
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-3 text-sm text-amber-800">
          <span>Draft restored — your previous conversation is back.</span>
          <button
            className="text-amber-600 hover:text-amber-900 font-medium ml-4"
            onClick={() => {
              localStorage.removeItem(draftKey);
              setMessages([{ role: 'assistant', content: greeting(job) }]);
              setDraftRestored(false);
            }}
          >
            Start fresh
          </button>
        </div>
      )}

      {/* Chat window */}
      <div className="flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden" style={{ height: 'calc(100vh - 220px)' }}>
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
                {m.photoUrls && m.photoUrls.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {m.photoUrls.map((url, j) => (
                      <img key={j} src={url} className="h-20 w-20 object-cover rounded-lg opacity-90" alt="inspection photo" />
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
                  {[0, 150, 300].map(d => (
                    <div key={d} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
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
            <AlertCircle className="h-4 w-4 shrink-0" />{error}
          </div>
        )}

        {/* Listening indicator */}
        {listening && (
          <div className="flex items-center gap-2 bg-red-50 border-t border-red-100 px-4 py-2 text-sm text-red-700">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Listening… speak freely, tap mic when done.
          </div>
        )}

        {/* Pending photos */}
        {pendingPhotos.length > 0 && (
          <div className="flex gap-2 px-4 py-2 bg-white border-t border-gray-100 flex-wrap items-center">
            <span className="text-xs text-gray-400 mr-1">Photos ready:</span>
            {pendingPhotos.map((p, i) => (
              <div key={i} className="relative">
                <img src={p.preview} className="h-14 w-14 object-cover rounded-lg border border-gray-300" alt="" />
                <button
                  onClick={() => setPendingPhotos(prev => prev.filter((_, j) => j !== i))}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold"
                >×</button>
              </div>
            ))}
          </div>
        )}

        {/* Uploading indicator */}
        {uploadingPhotos && (
          <div className="flex items-center gap-2 bg-blue-50 border-t border-blue-100 px-4 py-2 text-sm text-blue-700">
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading photos…
          </div>
        )}

        {/* Input bar */}
        <div className="flex gap-2 p-3 bg-white border-t border-gray-200 items-end">
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />

          {/* Photo upload */}
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploadingPhotos}
            className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition-colors shrink-0 disabled:opacity-40"
            title="Upload photos"
          >
            <ImagePlus className="h-5 w-5" />
          </button>

          {/* Text input */}
          <textarea
            className="flex-1 resize-none text-sm focus:outline-none bg-transparent placeholder-gray-400 py-2"
            placeholder="Type or use the mic…"
            value={input}
            onChange={e => { setInput(e.target.value); pendingInputRef.current = e.target.value; }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            rows={1}
            style={{ maxHeight: '120px' }}
          />

          {/* Mic button */}
          <button
            onClick={toggleVoice}
            className={`p-2 rounded-lg shrink-0 transition-colors ${
              listening
                ? 'bg-red-500 text-white animate-pulse'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            title={listening ? 'Tap to stop & send' : 'Tap to speak'}
          >
            {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          {/* Send */}
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 shrink-0 h-9 w-9 p-0"
            onClick={handleSend}
            disabled={sending || uploadingPhotos || (!input.trim() && pendingPhotos.length === 0)}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </PortalLayout>
  );
}
