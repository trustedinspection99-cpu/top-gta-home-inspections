import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase, DbJob } from '../lib/supabase';
import { buildReportHtml } from '@/lib/reportTemplate';

export default function ReportPortalPage() {
  const { id } = useParams<{ id: string }>();
  const [htmlContent, setHtmlContent] = useState('');
  const [directUrl, setDirectUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!id) { setError('Invalid report link.'); setLoading(false); return; }

    (async () => {
      const { data: rep, error: repErr } = await supabase
        .from('reports')
        .select('*')
        .eq('id', id)
        .single();

      if (repErr || !rep) {
        setError('Report not found. The link may have expired or is invalid.');
        setLoading(false);
        return;
      }

      const { data: jobData } = await supabase
        .from('jobs').select('*').eq('id', rep.job_id).single();
      const job = jobData as DbJob | null;

      if (job) setAddress(`${job.address}, ${job.city}`);

      if (rep.storage_url === 'mobile' && rep.report_data) {
        // Mobile-generated report — build HTML from report_data JSON
        const inspectionDate = job?.completed_at
          ? new Date(job.completed_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
          : new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
        const normalized = {
          ...rep.report_data,
          notInspected: rep.report_data.notInspected ?? [],
          sections: (rep.report_data.sections ?? []).map((s: any) => ({
            ...s,
            satisfactory: s.satisfactory ?? [],
            findings: (s.findings ?? []).map((f: any) => ({
              ...f,
              implication: f.implication ?? f.observation ?? '',
            })),
          })),
        };
        setHtmlContent(buildReportHtml(
          normalized,
          { address: job?.address ?? '', city: job?.city ?? '', inspectionType: job?.inspection_type ?? '', inspectionDate, inspector: 'Haroon Chaudhary' },
          normalized.photoUrls ?? [],
          normalized.photoUrls?.[0] ?? ''
        ));
      } else if (rep.storage_url && rep.storage_url !== 'mobile') {
        // Load HTML directly via src — avoids null-origin srcDoc blocking external images
        setDirectUrl(rep.storage_url);
      }

      setLoading(false);
    })();
  }, [id]);

  function handlePrint() {
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(htmlContent);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 500);
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
      <div style={{ color: '#94a3b8', fontFamily: 'Arial, sans-serif', fontSize: 16 }}>Loading report…</div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', padding: 24 }}>
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #ef4444', borderRadius: 12, padding: 32, maxWidth: 480, textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
        <h2 style={{ color: '#f1f5f9', margin: '0 0 8px' }}>Report Not Found</h2>
        <p style={{ color: '#94a3b8', margin: 0 }}>{error}</p>
        <p style={{ color: '#64748b', fontSize: 13, marginTop: 16 }}>
          Questions? Contact ASADS Home Inspection at (647) 801-9311 or <a href="https://www.asads.ca" style={{ color: '#3b82f6' }}>www.asads.ca</a>
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Inspection Report{address ? ` — ${address}` : ''} | ASADS Home Inspection</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Print-only: hide toolbar */}
      <style>{`@media print { #report-toolbar { display: none !important; } }`}</style>

      {/* Toolbar */}
      <div id="report-toolbar" style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: '#1e293b', borderBottom: '1px solid #334155',
        padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'Arial, sans-serif',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/logo.png" alt="ASADS" style={{ height: 30 }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15 }}>Inspection Report</span>
          {address && <span style={{ color: '#94a3b8', fontSize: 13 }}>· {address}</span>}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handlePrint}
            style={{
              backgroundColor: '#1d4ed8', color: '#fff', border: 'none',
              borderRadius: 8, padding: '8px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}
          >
            ⬇ Download / Print PDF
          </button>
          <a
            href="https://www.asads.ca"
            style={{
              backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155',
              borderRadius: 8, padding: '8px 14px', fontSize: 13, textDecoration: 'none',
              display: 'flex', alignItems: 'center',
            }}
          >
            asads.ca
          </a>
        </div>
      </div>

      {/* Report HTML — use src for storage-hosted reports (preserves image loading), srcDoc for mobile-generated */}
      <iframe
        src={directUrl || undefined}
        srcDoc={directUrl ? undefined : htmlContent}
        style={{ width: '100%', border: 'none', display: 'block', minHeight: '100vh' }}
        title="Inspection Report"
        onLoad={e => {
          const iframe = e.target as HTMLIFrameElement;
          try {
            const h = iframe.contentDocument?.body?.scrollHeight;
            if (h) iframe.style.height = `${h + 40}px`;
          } catch { iframe.style.height = '100vh'; }
        }}
      />

      {/* Footer */}
      <div style={{
        backgroundColor: '#1e293b', borderTop: '1px solid #334155', padding: '20px 24px',
        textAlign: 'center', fontFamily: 'Arial, sans-serif',
      }}>
        <p style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 8px' }}>
          ASADS Home Inspection · Certified &amp; Insured · (647) 801-9311
        </p>
        <p style={{ color: '#64748b', fontSize: 12, margin: 0 }}>
          Report generated in accordance with OAHI, InterNACHI, and CAHPI/NHICC Standards of Practice.
          This report is for the sole use of the named client.
        </p>
      </div>
    </>
  );
}
