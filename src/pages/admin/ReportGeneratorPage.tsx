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
  const reportDataKey = `scout-reportdata-${jobId ?? 'new'}`;

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
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [photoStep, setPhotoStep] = useState(false);
  const [findingPhotos, setFindingPhotos] = useState<Record<string, string[]>>({});
  const [coverPhoto, setCoverPhoto] = useState<string>('');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingFindingPhotos, setUploadingFindingPhotos] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [savedReportId, setSavedReportId] = useState('');   // set after saving this session
  const existingReportIdRef = useRef('');                    // pre-loaded from DB on mount
  const [sendingReport, setSendingReport] = useState(false);
  const [sent, setSent] = useState(false);
  const [magicLink, setMagicLink] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const saveBarRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');

  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const pendingInputRef = useRef('');
  const alreadySentRef = useRef(false);

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
            // Restore reportData if it was previously generated
            const savedReport = localStorage.getItem(reportDataKey);
            if (savedReport) {
              try { setReportData(JSON.parse(savedReport)); } catch { /* ignore */ }
            }
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
    // Load existing report — store ID and restore findings into Scout context
    supabase.from('reports').select('id, report_data, storage_url').eq('job_id', jobId)
      .order('generated_at', { ascending: false }).limit(1).maybeSingle()
      .then(async ({ data }) => {
        if (!data?.id) return;
        existingReportIdRef.current = data.id;
        const hasDraft = (() => { try { const s = localStorage.getItem(`scout-draft-${jobId}`); return s && JSON.parse(s).length > 1; } catch { return false; } })();
        if (hasDraft) return;

        let lines: string[] = [];

        if (data.report_data?.sections) {
          // Use structured data if available
          const rd = data.report_data as ReportData;
          setReportData(rd);
          rd.sections.forEach(sec => {
            sec.findings.filter(f => f.priority !== 'OK').forEach(f => {
              lines.push(`• [${sec.name} · ${f.priority}] ${f.location ? f.location + ': ' : ''}${f.observation}`);
            });
          });
        } else if (data.storage_url) {
          // Fall back to parsing the stored HTML
          try {
            const res = await fetch(data.storage_url);
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            doc.querySelectorAll('.page-wrap').forEach(wrap => {
              const section = wrap.querySelector('.section-header h2')?.textContent?.trim() ?? 'General';
              wrap.querySelectorAll('.finding-card.p1, .finding-card.p2, .finding-card.p3').forEach(card => {
                const priority = card.classList.contains('p1') ? 'P1' : card.classList.contains('p2') ? 'P2' : 'P3';
                const title = card.querySelector('.finding-title')?.textContent?.trim() ?? '';
                const obs = (card.querySelector('.finding-body p')?.textContent ?? '').replace('Observation:', '').trim();
                lines.push(`• [${section} · ${priority}] ${title ? title + ': ' : ''}${obs}`);
              });
            });
          } catch { /* ignore parse errors */ }
        }

        if (lines.length > 0) {
          setMessages(prev => [
            prev[0],
            { role: 'assistant', content: `Previous report loaded — here are the findings on file:\n\n${lines.join('\n')}\n\nDescribe any new findings or corrections and I'll update the report.` },
          ]);
        }
      });
  }, [jobId, draftKey]);

  // ── Auto-save draft ──
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem(draftKey, JSON.stringify(messages));
    }
  }, [messages, draftKey]);

  // ── Persist reportData ──
  useEffect(() => {
    if (reportData) {
      localStorage.setItem(reportDataKey, JSON.stringify(reportData));
      // If restored and no HTML built yet, go straight to photo step
      if (!reportHtml) setPhotoStep(true);
    }
  }, [reportData, reportDataKey, reportHtml]);

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
        .from('Reports')
        .upload(fileName, file, { contentType: file.type, upsert: false });

      if (uploadErr) {
        setError(`Photo upload failed: ${uploadErr.message}`);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from('Reports').getPublicUrl(fileName);
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
    if (listening) {
      alreadySentRef.current = true;
      stopVoice();
    }
    sendWithText(input, pendingPhotos);
  }

  // ── Voice ──
  function stopVoice() {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
    }
    setListening(false);
  }

  function toggleVoice() {
    if (listening) {
      // Mark as sent so any late onresult from Chrome doesn't re-populate input
      alreadySentRef.current = true;
      stopVoice();
      const text = pendingInputRef.current.trim();
      if (text) sendWithText(text, pendingPhotos);
      return;
    }

    const SR = (window as typeof window & { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition
      ?? (window as typeof window & { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;

    if (!SR) {
      setError('Voice not supported in this browser. Use Chrome or Edge.');
      return;
    }

    alreadySentRef.current = false;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-CA';

    rec.onresult = (e: SpeechRecognitionEvent) => {
      if (alreadySentRef.current) return;
      let transcript = '';
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setInput(transcript);
      pendingInputRef.current = transcript;
    };

    rec.onend = () => {
      setListening(false);
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

  // ── Generate report: extract JSON → photo step ──
  async function generateReport() {
    setGenerating(true);
    setError('');
    try {
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
      setReportData(data.data as ReportData);
      setFindingPhotos({});
      setCoverPhoto('');
      setReportHtml('');
      setPhotoStep(true);
    } catch (e: unknown) {
      setError((e as Error).message);
    }
    setGenerating(false);
  }

  // ── Upload cover photo ──
  async function uploadCoverPhoto(file: File) {
    setUploadingCover(true);
    const ext = file.name.split('.').pop() ?? 'jpg';
    const fileName = `inspections/${jobId ?? 'draft'}/cover-${Date.now()}.${ext}`;
    const { error: uploadErr } = await supabase.storage
      .from('Reports')
      .upload(fileName, file, { contentType: file.type, upsert: true });
    if (uploadErr) { setError(`Cover upload failed: ${uploadErr.message}`); setUploadingCover(false); return; }
    const { data: { publicUrl } } = supabase.storage.from('Reports').getPublicUrl(fileName);
    setCoverPhoto(publicUrl);
    setUploadingCover(false);
  }

  // ── Upload photo for a specific finding ──
  async function uploadFindingPhoto(key: string, file: File) {
    const uid = `${key}-${Date.now()}`;
    setUploadingFindingPhotos(prev => new Set(prev).add(uid));
    const ext = file.name.split('.').pop() ?? 'jpg';
    const fileName = `inspections/${jobId ?? 'draft'}/finding-${key}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: uploadErr } = await supabase.storage
      .from('Reports')
      .upload(fileName, file, { contentType: file.type, upsert: false });
    if (uploadErr) {
      setError(`Upload failed: ${uploadErr.message}`);
      setUploadingFindingPhotos(prev => { const n = new Set(prev); n.delete(uid); return n; });
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from('Reports').getPublicUrl(fileName);
    setFindingPhotos(prev => ({ ...prev, [key]: [...(prev[key] ?? []), publicUrl] }));
    setUploadingFindingPhotos(prev => { const n = new Set(prev); n.delete(uid); return n; });
  }

  // ── Build final HTML with assigned photos ──
  function buildFinalReport() {
    if (!reportData) return;
    const allChatPhotos = messages.flatMap(m => m.photoUrls ?? []);
    const enriched: ReportData = {
      ...reportData,
      sections: reportData.sections.map((section, si) => ({
        ...section,
        findings: section.findings.map((finding, fi) => {
          const urls = findingPhotos[`${si}-${fi}`] ?? [];
          return urls.length > 0 ? { ...finding, photoUrls: [...urls, ...(finding.photoUrls ?? [])] } : finding;
        }),
      })),
    };
    const jobInfo = {
      address: job?.address ?? 'Property Address',
      city: job?.city ?? '',
      inspectionType: job?.inspection_type ?? 'Home Inspection',
      inspectionDate: job?.scheduled_at
        ? new Date(job.scheduled_at).toLocaleDateString('en-CA')
        : new Date().toLocaleDateString('en-CA'),
      inspector: 'ASADS Certified Inspector',
    };
    const html = buildReportHtml(enriched, jobInfo, allChatPhotos, coverPhoto || undefined);
    setReportHtml(html);
    setPhotoStep(false);
  }

  // ── Save report ──
  async function saveReport() {
    if (!jobId) return;
    setSaving(true);
    setError('');

    const fileName = `report-${jobId}-${Date.now()}.html`;
    const blob = new Blob([reportHtml], { type: 'text/html' });

    const { error: uploadErr } = await supabase.storage
      .from('Reports').upload(fileName, blob, { contentType: 'text/html', upsert: true });

    if (uploadErr) { setError('Upload failed: ' + uploadErr.message); setSaving(false); return; }

    const { data: { publicUrl } } = supabase.storage.from('Reports').getPublicUrl(fileName);

    const reportIdToUpdate = savedReportId || existingReportIdRef.current;
    if (reportIdToUpdate) {
      // Update existing report
      const { error: updateErr } = await supabase
        .from('reports')
        .update({ storage_url: publicUrl, report_data: reportData, generated_at: new Date().toISOString() })
        .eq('id', reportIdToUpdate);
      if (updateErr) { setError('Update failed: ' + updateErr.message); setSaving(false); return; }
      setSavedReportId(reportIdToUpdate);
    } else {
      // Insert new report
      const { data: reportRow, error: insertErr } = await supabase
        .from('reports')
        .insert({ job_id: jobId, storage_url: publicUrl, status: 'saved', report_data: reportData })
        .select('id')
        .single();
      if (insertErr) { setError('DB insert failed: ' + insertErr.message); setSaving(false); return; }
      setSavedReportId(reportRow.id);
    }

    await supabase.from('jobs').update({ status: 'completed', completed_at: new Date().toISOString() }).eq('id', jobId);

    localStorage.removeItem(reportDataKey);
    setSaving(false);
    setTimeout(() => saveBarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }

  // ── Send report to client ──
  async function sendToClient() {
    if (!job || !savedReportId) return;
    setSendingReport(true);
    setError('');

    const { data: sendData, error: fnErr } = await supabase.functions.invoke('send-report', {
      body: {
        reportId: savedReportId,
        jobId,
        clientEmail: job.client_email,
        clientName: job.client_name,
      },
    });

    if (fnErr) {
      setError('Send failed: ' + fnErr.message);
      setSendingReport(false);
      return;
    }

    if (sendData?.magicLink) setMagicLink(sendData.magicLink);

    // Auto-populate maintenance checklist from P1/P2/P3 findings
    if (reportData) {
      const { data: jobRow } = await supabase.from('jobs').select('homeowner_id').eq('id', jobId).single();
      const homeownerId = jobRow?.homeowner_id;
      if (homeownerId) {
        const address = `${job.address}, ${job.city}`;
        const items = reportData.sections.flatMap(section =>
          section.findings
            .filter(f => f.priority === 'P1' || f.priority === 'P2' || f.priority === 'P3')
            .map(f => ({
              user_id: homeownerId,
              title: f.location ? `${f.location} — ${f.recommendation.slice(0, 120)}` : f.recommendation.slice(0, 120),
              category: section.name,
              completed: false,
              property_address: address,
              due_date: null,
            }))
        );
        if (items.length > 0) {
          await supabase.from('maintenance').insert(items);
        }
      }
    }

    setSendingReport(false);
    setSent(true);
  }

  // ── Save / Send bar ──
  const SaveBar = reportHtml ? (
    <div className="space-y-2 mb-3" ref={saveBarRef}>
      {/* Preview / Print row */}
      <div className="flex gap-2 flex-wrap">
        <Button size="sm" variant="outline" onClick={() => setShowPreview(p => !p)}>
          {showPreview ? 'Hide Preview' : 'Preview Report'}
        </Button>
        <Button size="sm" variant="outline" onClick={() => {
          if (iframeRef.current?.contentWindow) iframeRef.current.contentWindow.print();
        }} disabled={!showPreview}>
          Print / Save PDF
        </Button>
      </div>

      {/* Sent state */}
      {sent ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-4 space-y-3">
          <div className="flex items-center gap-2 text-green-800 font-semibold">
            <CheckCircle2 className="h-5 w-5" />
            Report sent to {job?.client_email}
          </div>
          <p className="text-sm text-green-700">
            {magicLink ? 'Invite email delivered. Copy the login link below to also send via text.' : 'Magic link ready — copy and send to the client.'}
          </p>
          {magicLink && (
            <div className="flex items-center gap-2 bg-white border border-green-200 rounded-lg px-3 py-2">
              <input readOnly value={magicLink} className="flex-1 text-xs text-gray-700 bg-transparent outline-none font-mono truncate" onFocus={e => e.target.select()} />
              <Button size="sm" variant="outline" className="shrink-0 text-xs" onClick={() => navigator.clipboard.writeText(magicLink)}>Copy</Button>
            </div>
          )}
          <Button size="sm" variant="outline" onClick={() => navigate('/admin')}>Back to Dashboard</Button>
        </div>

      /* Saved — ready to send */
      ) : savedReportId ? (
        <div className="rounded-xl border border-green-300 bg-green-50 px-4 py-4 space-y-3">
          <div className="flex items-center gap-2 text-green-800 font-bold text-base">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            Report saved to Supabase
          </div>
          <div className="bg-white border border-green-200 rounded-lg px-4 py-3 text-sm">
            <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1">Sending to client</p>
            <p className="font-semibold text-gray-900">{job?.client_name ?? '—'}</p>
            <p className="text-gray-500">{job?.client_email ?? '—'}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-green-600 hover:bg-green-700" onClick={sendToClient} disabled={sendingReport}>
              {sendingReport ? 'Sending…' : `Send Report to ${job?.client_name ?? 'Client'}`}
            </Button>
            <p className="text-xs text-gray-500">This creates their login and sends a magic link to the email above.</p>
          </div>
        </div>

      /* Unsaved */
      ) : (
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
          <p className="text-sm text-blue-800">Report generated — preview it, then {existingReportIdRef.current ? 'update' : 'save'} to make it available to the client.</p>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shrink-0" onClick={saveReport} disabled={saving}>
            {saving ? 'Saving…' : existingReportIdRef.current ? 'Update Report' : 'Save Report'}
          </Button>
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
        {!photoStep && !reportHtml && (
          <Button
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            onClick={generateReport}
            disabled={generating || messages.length < 3}
            title={messages.length < 3 ? 'Have a conversation first' : 'Generate the report'}
          >
            <Sparkles className="h-4 w-4" />
            {generating ? 'Generating…' : 'Generate Report'}
          </Button>
        )}
      </div>

      {/* Save bar */}
      {SaveBar}

      {/* Inline report preview */}
      {reportHtml && showPreview && (
        <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
          <iframe
            ref={iframeRef}
            srcDoc={reportHtml}
            className="w-full"
            style={{ height: '80vh' }}
            title="Report Preview"
          />
          {/* Repeat save/send bar below iframe so it's visible while scrolled */}
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            {savedReportId && !sent ? (
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-green-700 flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Report saved</p>
                  <p className="text-xs text-gray-500">Send to: {job?.client_name} · {job?.client_email}</p>
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 shrink-0" onClick={sendToClient} disabled={sendingReport}>
                  {sendingReport ? 'Sending…' : 'Send to Client'}
                </Button>
              </div>
            ) : !savedReportId ? (
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-gray-600">Report ready — {existingReportIdRef.current ? 'update it to replace the existing one.' : 'save it to send to the client.'}</p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shrink-0" onClick={saveReport} disabled={saving}>
                  {saving ? 'Saving…' : existingReportIdRef.current ? 'Update Report' : 'Save Report'}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Photo assignment step */}
      {photoStep && reportData && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-1">📷 Assign Photos to Report</h2>
          <p className="text-sm text-gray-500 mb-5">Add a cover photo and upload photos for each deficiency. Skip any you don't have.</p>

          {/* Cover photo */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Cover Photo (Property exterior)</p>
            <div className="flex items-center gap-4">
              {coverPhoto ? (
                <div className="relative">
                  <img src={coverPhoto} className="h-24 w-36 object-cover rounded-xl border border-gray-200 shadow-sm" alt="Cover" />
                  {!reportHtml && (
                    <button onClick={() => setCoverPhoto('')} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">×</button>
                  )}
                </div>
              ) : (
                <label className={`flex flex-col items-center justify-center gap-2 h-24 w-36 rounded-xl border-2 border-dashed cursor-pointer text-xs font-medium ${uploadingCover ? 'border-blue-200 text-blue-400 bg-blue-50' : 'border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'}`}>
                  {uploadingCover ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
                  {uploadingCover ? 'Uploading…' : 'Add Cover Photo'}
                  <input type="file" accept="image/*" className="hidden" disabled={uploadingCover} onChange={e => { if (e.target.files?.[0]) uploadCoverPhoto(e.target.files[0]); e.target.value = ''; }} />
                </label>
              )}
              <p className="text-xs text-gray-400">This appears on the front page of the report</p>
            </div>
          </div>

          <div className="space-y-6">
            {reportData.sections.map((section, si) => {
              const deficient = section.findings.filter(f => f.priority !== 'OK');
              if (deficient.length === 0) return null;
              return (
                <div key={si}>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">{section.name}</p>
                  <div className="space-y-3">
                    {section.findings.map((finding, fi) => {
                      if (finding.priority === 'OK') return null;
                      const key = `${si}-${fi}`;
                      const photo = findingPhotos[key];
                      const uploading = [...uploadingFindingPhotos].some(k => k.startsWith(key + '-'));
                      const priorityColor = finding.priority === 'P1' ? 'text-red-600 bg-red-50 border-red-200' : finding.priority === 'P2' ? 'text-orange-600 bg-orange-50 border-orange-200' : 'text-yellow-600 bg-yellow-50 border-yellow-200';
                      return (
                        <div key={fi} className="flex items-start gap-3 border border-gray-100 rounded-lg p-3">
                          <div className="flex-1 min-w-0">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${priorityColor} mb-1`}>{finding.priority}</span>
                            <p className="text-sm font-medium text-gray-800 truncate">{finding.location || finding.observation.slice(0, 60)}</p>
                            <p className="text-xs text-gray-400 truncate">{finding.observation.slice(0, 80)}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 items-center shrink-0">
                            {(findingPhotos[key] ?? []).map((url, pi) => (
                              <div key={pi} className="relative">
                                <img src={url} className="h-16 w-16 object-cover rounded-lg border border-gray-200" alt="" />
                                {!reportHtml && (
                                  <button
                                    onClick={() => setFindingPhotos(prev => ({ ...prev, [key]: prev[key].filter((_, j) => j !== pi) }))}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold"
                                  >×</button>
                                )}
                              </div>
                            ))}
                            {!reportHtml && (
                              <label className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed cursor-pointer text-xs font-medium ${uploading ? 'border-blue-200 text-blue-400 bg-blue-50' : 'border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'}`}>
                                {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
                                {uploading ? 'Uploading…' : 'Add Photo'}
                                <input type="file" accept="image/*" multiple className="hidden" disabled={uploading} onChange={e => {
                                  const files = Array.from(e.target.files ?? []);
                                  e.target.value = '';
                                  files.forEach(f => uploadFindingPhoto(key, f));
                                }} />
                              </label>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={buildFinalReport}>
              <Sparkles className="h-4 w-4 mr-2" />Build Report
            </Button>
            <Button variant="outline" onClick={() => setPhotoStep(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Draft restored banner */}
      {draftRestored && (
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-3 text-sm text-amber-800">
          <span>Draft restored — your previous conversation is back.</span>
          <button
            className="text-amber-600 hover:text-amber-900 font-medium ml-4"
            onClick={() => {
              localStorage.removeItem(draftKey);
              localStorage.removeItem(reportDataKey);
              setMessages([{ role: 'assistant', content: greeting(job) }]);
              setReportData(null);
              setReportHtml('');
              setPhotoStep(false);
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
            onChange={e => {
              setInput(e.target.value);
              pendingInputRef.current = e.target.value;
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
            }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            rows={1}
            ref={el => {
              if (el) {
                el.style.height = 'auto';
                el.style.height = Math.min(el.scrollHeight, 200) + 'px';
              }
            }}
            style={{ maxHeight: '200px', overflowY: 'auto' }}
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
