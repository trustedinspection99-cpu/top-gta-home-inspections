import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';

export default function ReportPortalPage() {
  const { id } = useParams<{ id: string }>();
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!id) { setError('Invalid report link.'); setLoading(false); return; }

    supabase
      .from('reports')
      .select('html_content, report_data, created_at')
      .eq('id', id)
      .single()
      .then(({ data, error: err }) => {
        if (err || !data) {
          setError('Report not found. The link may have expired or is invalid.');
        } else {
          setHtmlContent(data.html_content ?? '');
          // Extract address from email subject: "Inspection Report — 123 Main St, Toronto"
          const subject: string = (data.report_data as any)?.clientEmail?.subject ?? '';
          const match = subject.match(/—\s*(.+)$/);
          if (match) setAddress(match[1].trim());
        }
        setLoading(false);
      });
  }, [id]);

  function handlePrint() {
    window.print();
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

      {/* Report HTML rendered in a sandboxed iframe */}
      <iframe
        srcDoc={htmlContent}
        style={{ width: '100%', border: 'none', display: 'block' }}
        title="Inspection Report"
        onLoad={e => {
          // Auto-resize iframe to content height
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
