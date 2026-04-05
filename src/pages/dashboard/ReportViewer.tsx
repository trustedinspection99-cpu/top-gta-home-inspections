import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { supabase, DbReport, DbJob } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, AlertCircle } from 'lucide-react';
import { buildReportHtml } from '@/lib/reportTemplate';

export default function ReportViewer() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [report, setReport] = useState<DbReport | null>(null);
  const [job, setJob] = useState<DbJob | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const originalTitle = document.title;
    async function load() {
      const { data, error: dbErr } = await supabase
        .from('reports')
        .select('*')
        .eq('id', id)
        .single();

      if (dbErr || !data) {
        setError('Report not found.');
        setLoading(false);
        return;
      }

      const rep = data as DbReport;
      setReport(rep);

      // Fetch job for filename
      const { data: jobData } = await supabase.from('jobs').select('*').eq('id', rep.job_id).single();
      if (jobData) {
        const j = jobData as DbJob;
        setJob(j);
        const date = j.completed_at ? new Date(j.completed_at).toLocaleDateString('en-CA') : '';
        document.title = `ASADS Inspection Report - ${j.address}, ${j.city}${date ? ` - ${date}` : ''}`;
      }

      // Mobile-generated report: render from report_data JSON
      if (rep.storage_url === 'mobile' && rep.report_data) {
        const j = jobData as DbJob | null;
        const inspectionDate = j?.completed_at
          ? new Date(j.completed_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
          : new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
        // Normalize mobile JSON to match buildReportHtml schema
        const normalizedData = {
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
        const html = buildReportHtml(
          normalizedData,
          {
            address: j?.address ?? '',
            city: j?.city ?? '',
            inspectionType: j?.inspection_type ?? '',
            inspectionDate,
            inspector: 'Haroon Chaudhary',
          },
          normalizedData.photoUrls ?? [],
          normalizedData.photoUrls?.[0] ?? ''
        );
        setHtmlContent(html);
        setLoading(false);
        return;
      }

      // Fetch HTML from storage URL
      const res = await fetch(rep.storage_url);
      if (!res.ok) {
        setError('Could not load report file.');
        setLoading(false);
        return;
      }
      const html = await res.text();
      setHtmlContent(html);
      setLoading(false);
    }
    load();
    return () => { document.title = originalTitle; };
  }, [id]);

  return (
    <PortalLayout>
      <div className="flex items-center justify-between mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        {report && (
          <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50"
            onClick={() => {
            const win = window.open('', '_blank');
            if (!win) return;
            win.document.write(htmlContent);
            win.document.close();
            win.focus();
            setTimeout(() => { win.print(); }, 500);
          }}>
            <Printer className="h-4 w-4 mr-2" />
            Print / Save PDF
          </Button>
        )}
      </div>

      {loading ? (
        <div className="h-[600px] bg-gray-100 rounded-xl animate-pulse" />
      ) : error ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <AlertCircle className="h-10 w-10 text-red-400" />
          <p className="text-gray-600">{error}</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div
            className="w-full"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      )}
    </PortalLayout>
  );
}
