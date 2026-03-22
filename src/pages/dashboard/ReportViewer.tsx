import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, DbReport } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, AlertCircle } from 'lucide-react';

export default function ReportViewer() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<DbReport | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
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

      // Fetch HTML from storage
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
  }, [id]);

  return (
    <PortalLayout>
      <div className="flex items-center justify-between mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        {report && (
          <Button asChild size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
            <a href={report.storage_url} download className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </a>
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
