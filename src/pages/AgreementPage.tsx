import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const EDGE_URL = 'https://wjxbojjhyocrxqkfnxmz.supabase.co/functions/v1/sign-agreement';

interface JobInfo {
  clientName: string;
  address: string;
  city: string;
  inspectionType: string;
  scheduledAt: string | null;
  alreadySigned: boolean;
  signedAt: string | null;
}

export default function AgreementPage() {
  const { token } = useParams<{ token: string }>();
  const [job, setJob] = useState<JobInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [signedName, setSignedName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [signed, setSigned] = useState(false);
  const [signedAt, setSignedAt] = useState('');

  useEffect(() => {
    if (!token) { setError('Invalid link — no token found.'); setLoading(false); return; }
    fetch(EDGE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, mode: 'info' }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(data.error); }
        else {
          setJob(data);
          if (data.alreadySigned) {
            setSigned(true);
            setSignedAt(data.signedAt ?? '');
          }
        }
        setLoading(false);
      })
      .catch(() => { setError('Could not load agreement. Please check your link.'); setLoading(false); });
  }, [token]);

  async function handleSign() {
    if (!signedName.trim()) return;
    setSubmitting(true);
    try {
      const resp = await fetch(EDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, mode: 'sign', signedName: signedName.trim() }),
      });
      const data = await resp.json();
      if (data.error) { setError(data.error); }
      else {
        setSigned(true);
        setSignedAt(data.signedAt ?? new Date().toISOString());
      }
    } catch {
      setError('Submission failed. Please try again.');
    }
    setSubmitting(false);
  }

  const inspDate = job?.scheduledAt
    ? new Date(job.scheduledAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'TBD';

  return (
    <>
      <Helmet>
        <title>Pre-Inspection Agreement | ASADS Home Inspection</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#1e293b', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src="/logo.png" alt="ASADS Home Inspection" style={{ height: 36 }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 17 }}>ASADS Home Inspection</span>
        </div>

        <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 20px' }}>

          {loading && (
            <div style={{ textAlign: 'center', padding: 60, color: '#64748b' }}>Loading agreement…</div>
          )}

          {error && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 12, padding: 24, color: '#991b1b' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && job && signed && (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: 16, padding: 32, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <h2 style={{ color: '#166534', margin: '0 0 8px' }}>Agreement Signed</h2>
              <p style={{ color: '#4ade80', margin: '0 0 16px' }}>
                Signed on {signedAt ? new Date(signedAt).toLocaleString('en-CA', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'today'}
              </p>
              <p style={{ color: '#15803d' }}>
                Thank you, <strong>{job.clientName}</strong>. Your signed agreement has been recorded.<br />
                Your {job.inspectionType} at {job.address}, {job.city} is confirmed for <strong>{inspDate}</strong>.
              </p>
              <p style={{ color: '#64748b', fontSize: 13, marginTop: 24 }}>
                Questions? Call Haroon at (647) 801-9311 or visit <a href="https://www.asads.ca" style={{ color: '#1d4ed8' }}>www.asads.ca</a>
              </p>
            </div>
          )}

          {!loading && !error && job && !signed && (
            <>
              {/* Property card */}
              <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <div style={{ color: '#64748b', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Inspection Details</div>
                <div style={{ color: '#1e293b', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{job.address}, {job.city}</div>
                <div style={{ color: '#475569' }}>{job.inspectionType} · {inspDate}</div>
                <div style={{ color: '#475569', marginTop: 4 }}>Client: {job.clientName}</div>
              </div>

              {/* Agreement text */}
              <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 24, maxHeight: 420, overflowY: 'auto' }}>
                <h2 style={{ color: '#1e293b', margin: '0 0 16px', fontSize: 18 }}>Pre-Inspection Agreement</h2>
                <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7 }}>
                  This Pre-Inspection Agreement ("Agreement") is entered into between <strong>ASADS Home Inspection</strong> (the "Inspector," Haroon Chaudhary) and the client identified above (the "Client") in accordance with the <strong>Ontario Home Inspection Act, 2017</strong>.
                </p>

                <h3 style={{ color: '#1e293b', fontSize: 14, marginTop: 20, marginBottom: 8 }}>1. Scope of Inspection</h3>
                <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7 }}>
                  The inspection is a visual, non-invasive examination of the readily accessible components of the property as listed above. The inspection is performed in accordance with the Standards of Practice of the Ontario Association of Home Inspectors (OAHI), InterNACHI (International Association of Certified Home Inspectors), and CAHPI/NHICC (Canadian Association of Home &amp; Property Inspectors / National Home Inspector Certification Council).
                </p>
                <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7 }}>
                  The inspection includes, where accessible and visible: roofing, exterior, structural/foundation, electrical, heating, cooling, plumbing, interior, insulation &amp; ventilation, and life safety components.
                </p>

                <h3 style={{ color: '#1e293b', fontSize: 14, marginTop: 20, marginBottom: 8 }}>2. Limitations</h3>
                <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7 }}>
                  This is a visual inspection only. The Inspector is not required to inspect: areas not accessible or visible; concealed or buried components; systems that are shut down; items outside the scope defined in the applicable Standards of Practice. The inspection does not constitute a warranty, guarantee, or insurance policy of any kind regarding the condition of the property or any component.
                </p>

                <h3 style={{ color: '#1e293b', fontSize: 14, marginTop: 20, marginBottom: 8 }}>3. Written Report</h3>
                <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7 }}>
                  The Inspector will provide a written report of the inspection findings to the Client. The report will be delivered electronically following the inspection. The report is prepared for the sole and exclusive use of the Client named above.
                </p>

                <h3 style={{ color: '#1e293b', fontSize: 14, marginTop: 20, marginBottom: 8 }}>4. Payment</h3>
                <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7 }}>
                  Payment is due on or before the day of the inspection. Accepted methods: credit/debit card (online payment link provided), e-transfer to Haroon4951@hotmail.com, or cash. A receipt will be provided upon payment.
                </p>

                <h3 style={{ color: '#1e293b', fontSize: 14, marginTop: 20, marginBottom: 8 }}>5. Limitation of Liability</h3>
                <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7 }}>
                  In the event of a claim arising from this inspection, the Inspector's liability shall be limited to a refund of the fee paid for the inspection. The Inspector shall not be liable for any consequential, incidental, special, or exemplary damages. The Client agrees that any claim must be reported in writing within 30 days of receipt of the inspection report.
                </p>

                <h3 style={{ color: '#1e293b', fontSize: 14, marginTop: 20, marginBottom: 8 }}>6. Cancellation Policy</h3>
                <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7 }}>
                  Cancellations made less than 24 hours prior to the scheduled inspection may be subject to a $75 cancellation fee. The Inspector reserves the right to reschedule due to unsafe conditions or circumstances beyond their control.
                </p>

                <h3 style={{ color: '#1e293b', fontSize: 14, marginTop: 20, marginBottom: 8 }}>7. Client Acknowledgement</h3>
                <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.7 }}>
                  The Client acknowledges that they have read and understood this Agreement, and agree to its terms. The Client understands that this is a visual inspection only, that the Inspector will not move personal belongings or furniture, and that the Client is encouraged to attend the inspection.
                </p>

                <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 20 }}>
                  Inspector: Haroon Chaudhary | ASADS Home Inspection | Certified &amp; Insured<br />
                  (647) 801-9311 | bookings@asads.ca | www.asads.ca
                </p>
              </div>

              {/* Signature */}
              <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
                <h3 style={{ color: '#1e293b', margin: '0 0 16px', fontSize: 16 }}>Client Signature</h3>
                <p style={{ color: '#475569', fontSize: 13, marginBottom: 16 }}>
                  By typing your full name below and clicking "I Agree," you acknowledge that you have read, understood, and agree to the terms of this Pre-Inspection Agreement.
                </p>
                <label style={{ display: 'block', color: '#374151', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={signedName}
                  onChange={e => setSignedName(e.target.value)}
                  placeholder="Type your full legal name"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #cbd5e1',
                    fontSize: 15, color: '#1e293b', marginBottom: 16, boxSizing: 'border-box',
                  }}
                />
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 16 }}>
                  Date: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })} ·
                  Your signature is legally binding under the Electronic Commerce Act (Ontario).
                </p>
                <button
                  onClick={handleSign}
                  disabled={submitting || !signedName.trim()}
                  style={{
                    width: '100%', padding: '16px', backgroundColor: signedName.trim() ? '#1d4ed8' : '#94a3b8',
                    color: '#fff', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700,
                    cursor: signedName.trim() ? 'pointer' : 'not-allowed',
                  }}
                >
                  {submitting ? 'Signing…' : '✓ I Agree — Sign Agreement'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '24px 16px', color: '#94a3b8', fontSize: 12, borderTop: '1px solid #e2e8f0', marginTop: 40 }}>
          ASADS Home Inspection · Certified &amp; Insured · (647) 801-9311 · www.asads.ca
        </div>
      </div>
    </>
  );
}
