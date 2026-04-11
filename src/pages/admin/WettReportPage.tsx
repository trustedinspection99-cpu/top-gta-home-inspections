import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, DbJob } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft, Save, Printer, ImagePlus, CheckCircle2, AlertCircle, Loader2, Plus, Trash2,
} from 'lucide-react';
import { buildWettReportHtml, WettFormData, BLANK_WETT, WETT_UNIT_TYPES } from '@/lib/wettReportTemplate';

type Tab = 'unit' | 'chimney' | 'clearances' | 'safety' | 'review';

const TABS: { id: Tab; label: string }[] = [
  { id: 'unit',       label: '1. Heating Unit' },
  { id: 'chimney',    label: '2. Chimney' },
  { id: 'clearances', label: '3. Clearances' },
  { id: 'safety',     label: '4. Loss Prevention' },
  { id: 'review',     label: '5. Review & Save' },
];

const YN = ['', 'Y', 'N'] as const;

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function Select({ value, onChange, options, placeholder = '— select —' }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[] | string[];
  placeholder?: string;
}) {
  const opts = typeof options[0] === 'string'
    ? (options as string[]).map(o => ({ value: o, label: o }))
    : options as { value: string; label: string }[];
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      <option value="">{placeholder}</option>
      {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function YNSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
    >
      <option value="">— select —</option>
      <option value="Y">Yes</option>
      <option value="N">No</option>
    </select>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
      <div className="bg-blue-900 text-white px-5 py-3 text-sm font-semibold">{title}</div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function MeasureRow({ label, actualKey, requiredKey, form, set, unit }: {
  label: string;
  actualKey: keyof WettFormData;
  requiredKey: keyof WettFormData;
  form: WettFormData;
  set: (k: keyof WettFormData, v: string) => void;
  unit: string;
}) {
  const actual = form[actualKey] as string;
  const required = form[requiredKey] as string;
  const ok = actual && required && parseFloat(actual) >= parseFloat(required);
  const notOk = actual && required && !ok;
  return (
    <tr className={notOk ? 'bg-red-50' : ''}>
      <td className="py-2 pr-3 text-xs text-gray-700 whitespace-nowrap">{label}</td>
      <td className="py-1 pr-2">
        <div className="flex items-center gap-1">
          <input
            type="number"
            step="0.1"
            value={actual}
            onChange={e => set(actualKey, e.target.value)}
            placeholder="0"
            className="w-20 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-xs text-gray-400">{unit}</span>
        </div>
      </td>
      <td className="py-1 pr-2">
        <div className="flex items-center gap-1">
          <input
            type="number"
            step="0.1"
            value={required}
            onChange={e => set(requiredKey, e.target.value)}
            placeholder="0"
            className="w-20 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <span className="text-xs text-gray-400">{unit}</span>
        </div>
      </td>
      <td className="py-1 pl-1">
        {ok && <CheckCircle2 className="h-4 w-4 text-green-500" />}
        {notOk && <AlertCircle className="h-4 w-4 text-red-500" />}
      </td>
    </tr>
  );
}

export default function WettReportPage() {
  const { id: jobId } = useParams<{ id: string }>();
  const [job, setJob] = useState<DbJob | null>(null);
  const [tab, setTab] = useState<Tab>('unit');
  const [form, setForm] = useState<WettFormData>({ ...BLANK_WETT });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedReportId, setSavedReportId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof WettFormData, value: any) =>
    setForm(prev => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!jobId) return;
    supabase.from('jobs').select('*').eq('id', jobId).single().then(({ data }) => {
      if (!data) return;
      const j = data as DbJob;
      setJob(j);
      setForm(prev => ({
        ...prev,
        clientName: j.client_name ?? '',
        clientPhone: '',
        clientEmail: j.client_email ?? '',
        propertyAddress: j.address ?? '',
        city: j.city ?? '',
        inspectionDate: j.scheduled_at
          ? new Date(j.scheduled_at).toLocaleDateString('en-CA')
          : new Date().toLocaleDateString('en-CA'),
      }));
    });

    // Load existing WETT report if one exists
    supabase.from('reports').select('*').eq('job_id', jobId).eq('storage_url', 'wett').maybeSingle()
      .then(({ data }) => {
        if (data?.report_data?.wettForm) {
          setForm(data.report_data.wettForm);
          setSavedReportId(data.id);
          setSaved(true);
        }
      });
  }, [jobId]);

  const unit = form.measurementUnit === 'inches' ? 'in' : 'cm';

  async function uploadPhoto(file: File) {
    if (!jobId) return;
    setUploadingPhoto(true);
    const ext = file.name.split('.').pop();
    const path = `job-photos/${jobId}/wett-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from('Reports').upload(path, file, { upsert: true });
    if (upErr) { setError('Photo upload failed: ' + upErr.message); setUploadingPhoto(false); return; }
    const { data: { publicUrl } } = supabase.storage.from('Reports').getPublicUrl(path);
    set('photoUrls', [...form.photoUrls, publicUrl]);
    setUploadingPhoto(false);
  }

  async function saveReport() {
    setSaving(true);
    setError('');
    const html = buildWettReportHtml(form);
    const reportPayload = {
      job_id: jobId,
      storage_url: 'wett',
      status: 'sent' as const,
      generated_at: new Date().toISOString(),
      report_data: {
        type: 'wett',
        wettForm: form,
        htmlCache: html, // cached for fast rendering
        summary: {
          price: '$299.00',
          baseCents: 26460,
          taxCents: 3440,
        },
      },
    };

    if (savedReportId) {
      const { error: e } = await supabase.from('reports').update(reportPayload).eq('id', savedReportId);
      if (e) { setError(e.message); setSaving(false); return; }
    } else {
      const { data, error: e } = await supabase.from('reports').insert(reportPayload).select('id').single();
      if (e) { setError(e.message); setSaving(false); return; }
      setSavedReportId(data?.id ?? null);
      // Mark job completed
      await supabase.from('jobs').update({ status: 'completed', completed_at: new Date().toISOString() }).eq('id', jobId);
    }

    setSaved(true);
    setSaving(false);
  }

  function printReport() {
    const html = buildWettReportHtml(form);
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 600);
  }

  return (
    <PortalLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin" className="flex items-center gap-2 text-gray-600">
              <ArrowLeft className="h-4 w-4" />Back
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">WETT Inspection Report</h1>
            {job && <p className="text-sm text-gray-500">{job.address}, {job.city} · {job.client_name}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
              <CheckCircle2 className="h-4 w-4" />Saved
            </span>
          )}
          <Button variant="outline" size="sm" onClick={printReport} className="border-blue-300 text-blue-700">
            <Printer className="h-4 w-4 mr-1.5" />Print / PDF
          </Button>
          <Button onClick={saveReport} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
            {saving ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Save className="h-4 w-4 mr-1.5" />}
            {saving ? 'Saving…' : 'Save Report'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-5 border-b border-gray-200 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors ${
              tab === t.id ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab 1: Heating Unit ── */}
      {tab === 'unit' && (
        <div>
          <SectionCard title="Property & Client">
            <Field label="Client Name">
              <Input value={form.clientName} onChange={e => set('clientName', e.target.value)} />
            </Field>
            <Field label="Client Phone">
              <Input value={form.clientPhone} onChange={e => set('clientPhone', e.target.value)} />
            </Field>
            <Field label="Client Email">
              <Input value={form.clientEmail} onChange={e => set('clientEmail', e.target.value)} />
            </Field>
            <Field label="Inspection Date">
              <Input type="date" value={form.inspectionDate} onChange={e => set('inspectionDate', e.target.value)} />
            </Field>
            <Field label="Inspector Name">
              <Input value={form.inspectorName} onChange={e => set('inspectorName', e.target.value)} />
            </Field>
            <Field label="WETT Certificate Number">
              <Input value={form.wettCertNumber} onChange={e => set('wettCertNumber', e.target.value)} placeholder="e.g. 12345" />
            </Field>
          </SectionCard>

          <SectionCard title="3. Heating Unit">
            <Field label="Primary or Auxiliary">
              <Select value={form.unitRole} onChange={v => set('unitRole', v)}
                options={[{ value: 'primary', label: 'Primary' }, { value: 'auxiliary', label: 'Auxiliary' }]} />
            </Field>
            <Field label="Year">
              <Input value={form.unitYear} onChange={e => set('unitYear', e.target.value)} placeholder="e.g. 2010" />
            </Field>
            <Field label="Make / Manufacturer">
              <Input value={form.unitMake} onChange={e => set('unitMake', e.target.value)} />
            </Field>
            <Field label="Model">
              <Input value={form.unitModel} onChange={e => set('unitModel', e.target.value)} />
            </Field>
            <Field label="Heating Unit Type">
              <Select value={form.heatingUnitType} onChange={v => set('heatingUnitType', v)} options={WETT_UNIT_TYPES} />
            </Field>
            <Field label="CSA / ULC Certified">
              <YNSelect value={form.unitCertified} onChange={v => set('unitCertified', v)} />
            </Field>
            {form.unitCertified === 'Y' && (
              <Field label="Certification Label">
                <Select value={form.certLabel} onChange={v => set('certLabel', v)}
                  options={[
                    { value: 'CSA', label: 'CSA — Canadian Standards Association' },
                    { value: 'ULC', label: 'ULC — Underwriters Laboratories of Canada' },
                    { value: 'OTL', label: 'OTL' },
                    { value: 'WH', label: 'WH — Warnock-Hersey' },
                    { value: 'other', label: 'Other' },
                  ]} />
              </Field>
            )}
            {form.certLabel === 'other' && (
              <Field label="Certification Label (specify)">
                <Input value={form.certLabelOther} onChange={e => set('certLabelOther', e.target.value)} />
              </Field>
            )}
            <Field label="Fuel">
              <Select value={form.fuel} onChange={v => set('fuel', v)}
                options={['Wood', 'Pellet', 'Coal', 'Other']} />
            </Field>
            {form.fuel === 'Wood' && <>
              <Field label="Cords burned per year">
                <Input type="number" value={form.cordsPerYear} onChange={e => set('cordsPerYear', e.target.value)} />
              </Field>
              <Field label="Cord type">
                <Select value={form.cordType} onChange={v => set('cordType', v)}
                  options={[
                    { value: 'face', label: "Face cord (16″×4′×8′)" },
                    { value: 'standard', label: "Standard bush cord (4′×4′×8′)" },
                  ]} />
              </Field>
            </>}
            {form.fuel !== 'Wood' && form.fuel && (
              <Field label="Amount burned per year (kg)">
                <Input type="number" value={form.cordsPerYear} onChange={e => set('cordsPerYear', e.target.value)} />
              </Field>
            )}
            <Field label="Hours used per day">
              <Input type="number" value={form.hoursPerDay} onChange={e => set('hoursPerDay', e.target.value)} />
            </Field>
            <Field label="Days used per year">
              <Input type="number" value={form.daysPerYear} onChange={e => set('daysPerYear', e.target.value)} />
            </Field>
          </SectionCard>

          <SectionCard title="4. Unit Installation">
            <Field label="Installed by">
              <Input value={form.installedBy} onChange={e => set('installedBy', e.target.value)} placeholder="Homeowner / Contractor name" />
            </Field>
            <Field label="Installer WETT certified?">
              <YNSelect value={form.installerWettCertified} onChange={v => set('installerWettCertified', v)} />
            </Field>
            {form.installerWettCertified === 'Y' && (
              <Field label="Installer WETT #">
                <Input value={form.installerWettNumber} onChange={e => set('installerWettNumber', e.target.value)} />
              </Field>
            )}
            <Field label="Where is heating unit located?">
              <Select value={form.unitLocation} onChange={v => set('unitLocation', v)}
                options={[
                  { value: 'inside', label: 'Inside Building' },
                  { value: 'outside', label: 'Outside Building' },
                  { value: 'outside-insulated', label: 'Outside Building in Insulated Enclosure' },
                ]} />
            </Field>
          </SectionCard>
        </div>
      )}

      {/* ── Tab 2: Chimney ── */}
      {tab === 'chimney' && (
        <div>
          <SectionCard title="5. Chimney — Type">
            <Field label="Chimney type" hint="Select masonry or metal — only the relevant fields will show">
              <Select value={form.chimneyType} onChange={v => set('chimneyType', v)}
                options={[{ value: 'masonry', label: 'Masonry Chimney' }, { value: 'metal', label: 'Metal Chimney' }]} />
            </Field>
          </SectionCard>

          {form.chimneyType === 'masonry' && (
            <SectionCard title="5. Masonry Chimney">
              <Field label="Type">
                <Select value={form.masonrySubtype} onChange={v => set('masonrySubtype', v)}
                  options={[
                    { value: 'masonry', label: 'Masonry' },
                    { value: 'concrete', label: 'Concrete' },
                    { value: 'other', label: 'Other' },
                  ]} />
              </Field>
              {form.masonrySubtype === 'other' && (
                <Field label="Type (specify)"><Input value={form.masonrySubtypeOther} onChange={e => set('masonrySubtypeOther', e.target.value)} /></Field>
              )}
              <Field label="Construction">
                <Select value={form.builtFrom} onChange={v => set('builtFrom', v)}
                  options={[{ value: 'ground', label: 'Built from ground' }, { value: 'foundation', label: 'Built from foundation' }]} />
              </Field>
              <Field label="Chimney lining">
                <Select value={form.chimneyLining} onChange={v => set('chimneyLining', v)}
                  options={[
                    { value: 'flue-tile', label: 'Flue Tile' },
                    { value: 'stainless-steel', label: 'Stainless Steel' },
                    { value: 'other', label: 'Other' },
                  ]} />
              </Field>
              {form.chimneyLining === 'other' && (
                <Field label="Lining (specify)"><Input value={form.chimneyLiningOther} onChange={e => set('chimneyLiningOther', e.target.value)} /></Field>
              )}
            </SectionCard>
          )}

          {form.chimneyType === 'metal' && (
            <SectionCard title="5. Metal Chimney">
              <Field label="Type">
                <Select value={form.metalChimneySubtype} onChange={v => set('metalChimneySubtype', v)}
                  options={[
                    { value: 'factory-double-wall', label: 'Factory Built Double Walled Metal Chimney' },
                    { value: 'other', label: 'Other' },
                  ]} />
              </Field>
              {form.metalChimneySubtype === 'other' && (
                <Field label="Type (specify)"><Input value={form.metalChimneySubtypeOther} onChange={e => set('metalChimneySubtypeOther', e.target.value)} /></Field>
              )}
              <Field label="Year installed">
                <Input value={form.metalYear} onChange={e => set('metalYear', e.target.value)} placeholder="e.g. 2015" />
              </Field>
              <Field label="Manufacturer">
                <Input value={form.metalManufacturer} onChange={e => set('metalManufacturer', e.target.value)} />
              </Field>
              <Field label="Installed by">
                <Input value={form.metalInstalledBy} onChange={e => set('metalInstalledBy', e.target.value)} />
              </Field>
              <Field label="Installer WETT certified?">
                <YNSelect value={form.metalWettCertified} onChange={v => set('metalWettCertified', v)} />
              </Field>
              {form.metalWettCertified === 'Y' && (
                <Field label="Installer WETT #"><Input value={form.metalWettNumber} onChange={e => set('metalWettNumber', e.target.value)} /></Field>
              )}
              <Field label="Rated for continuous 650°C / 1200°F flue gas?">
                <YNSelect value={form.ratedFor650} onChange={v => set('ratedFor650', v)} />
              </Field>
              <Field label="Clearance to nearest combustibles">
                <div className="flex gap-2">
                  <Input type="number" value={form.clearanceToNearest} onChange={e => set('clearanceToNearest', e.target.value)} className="flex-1" />
                  <Select value={form.clearanceUnit} onChange={v => set('clearanceUnit', v)}
                    options={[{ value: 'inches', label: 'inches' }, { value: 'cm', label: 'cm' }]} />
                </div>
              </Field>
            </SectionCard>
          )}

          <SectionCard title="5. Cleaning & Installation">
            <Field label="Times cleaned per year">
              <Input type="number" value={form.cleaningTimesPerYear} onChange={e => set('cleaningTimesPerYear', e.target.value)} />
            </Field>
            <Field label="Cleaned by">
              <Input value={form.cleaningByWhom} onChange={e => set('cleaningByWhom', e.target.value)} placeholder="Homeowner / Company name" />
            </Field>
            <Field label="Date of last cleaning">
              <Input type="date" value={form.lastCleaningDate} onChange={e => set('lastCleaningDate', e.target.value)} />
            </Field>
            <Field label="Chimney installed">
              <Select value={form.chimneyInstalledLocation} onChange={v => set('chimneyInstalledLocation', v)}
                options={[
                  { value: 'inside', label: 'Inside Building' },
                  { value: 'outside', label: 'Outside Building' },
                  { value: 'outside-insulated', label: 'Outside Building in Insulated Enclosure' },
                ]} />
            </Field>
            <Field label="Does unit share a chimney flue?">
              <YNSelect value={form.sharesFlue} onChange={v => set('sharesFlue', v)} />
            </Field>
            {form.sharesFlue === 'Y' && (
              <Field label="Shared flue — details">
                <Input value={form.sharesFlueDetails} onChange={e => set('sharesFlueDetails', e.target.value)} />
              </Field>
            )}
          </SectionCard>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Section 6 — Remarks</label>
            <textarea
              rows={4}
              value={form.section6Remarks}
              onChange={e => set('section6Remarks', e.target.value)}
              placeholder="General remarks about the chimney installation…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* ── Tab 3: Clearances ── */}
      {tab === 'clearances' && (
        <div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 mb-4 text-sm text-amber-800">
            <strong>Note:</strong> Actual = what you measured on site. Required = distance specified in owner's manual or label on unit.
          </div>

          <SectionCard title="7. Stove Pipe Details">
            <Field label="Measurement unit">
              <Select value={form.measurementUnit} onChange={v => set('measurementUnit', v)}
                options={[{ value: 'inches', label: 'Inches' }, { value: 'cm', label: 'Centimetres' }]} />
            </Field>
            <Field label="Thimble where pipe passes through wall?">
              <YNSelect value={form.thimble} onChange={v => set('thimble', v)} />
            </Field>
            <Field label={`Total length of stove pipe incl. elbows (${unit})`}>
              <Input type="number" value={form.stovePipeTotalLength} onChange={e => set('stovePipeTotalLength', e.target.value)} />
            </Field>
            <Field label="Number of elbows">
              <Input type="number" value={form.stovePipeElbows} onChange={e => set('stovePipeElbows', e.target.value)} />
            </Field>
            <Field label="Stove pipe construction">
              <Select value={form.stovePipeConstruction} onChange={v => set('stovePipeConstruction', v)}
                options={[
                  { value: 'double-wall', label: 'Double Walled' },
                  { value: 'single-wall', label: 'Single Walled (incl. black steel)' },
                  { value: 'galvanized', label: 'Galvanized' },
                  { value: 'other', label: 'Other' },
                ]} />
            </Field>
            {form.stovePipeConstruction === 'other' && (
              <Field label="Construction (specify)"><Input value={form.stovePipeConstructionOther} onChange={e => set('stovePipeConstructionOther', e.target.value)} /></Field>
            )}
            <Field label="Pipe passes through concealed space or wall?">
              <YNSelect value={form.stovePipeThroughConcealed} onChange={v => set('stovePipeThroughConcealed', v)} />
            </Field>
            {form.stovePipeThroughConcealed === 'Y' && (
              <Field label="Describe concealed area">
                <Input value={form.stovePipeConcealedDesc} onChange={e => set('stovePipeConcealedDesc', e.target.value)} />
              </Field>
            )}
            <Field label="Non-combustible floor pad present?">
              <YNSelect value={form.nonCombustiblePad} onChange={v => set('nonCombustiblePad', v)} />
            </Field>
            <Field label={`Shortest distance to furniture/fuel/combustibles (${unit})`}>
              <Input type="number" value={form.distanceToFurniture} onChange={e => set('distanceToFurniture', e.target.value)} />
            </Field>
          </SectionCard>

          <SectionCard title="7. Wall & Ceiling Construction">
            <Field label="Sidewall construction">
              <Input value={form.sidewallConstruction} onChange={e => set('sidewallConstruction', e.target.value)} placeholder="e.g. Drywall on wood studs" />
            </Field>
            <Field label="Backwall construction">
              <Input value={form.backwallConstruction} onChange={e => set('backwallConstruction', e.target.value)} placeholder="e.g. Brick, drywall…" />
            </Field>
            <Field label="Ceiling construction">
              <Input value={form.ceilingConstruction} onChange={e => set('ceilingConstruction', e.target.value)} placeholder="e.g. Drywall on joists" />
            </Field>
          </SectionCard>

          {/* Measurements table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
            <div className="bg-blue-900 text-white px-5 py-3 text-sm font-semibold">7. Clearance Measurements (Actual vs. Required)</div>
            <div className="p-5 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-gray-200">
                    <th className="text-left pb-2 pr-3 w-48">Measurement</th>
                    <th className="text-left pb-2 pr-2">Actual ({unit})</th>
                    <th className="text-left pb-2 pr-2">Required ({unit})</th>
                    <th className="pb-2 w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td colSpan={4} className="py-2 text-xs font-bold text-blue-900 uppercase tracking-wide">Stove to surfaces</td></tr>
                  <MeasureRow label="Backwall" actualKey="stoveToBackwallActual" requiredKey="stoveToBackwallRequired" form={form} set={set} unit={unit} />
                  <MeasureRow label="Sidewall" actualKey="stoveToSidewallActual" requiredKey="stoveToSidewallRequired" form={form} set={set} unit={unit} />
                  <MeasureRow label="Corner" actualKey="stoveToCornerActual" requiredKey="stoveToCornerRequired" form={form} set={set} unit={unit} />
                  <MeasureRow label="Ceiling" actualKey="stoveToCeilingActual" requiredKey="stoveToCeilingRequired" form={form} set={set} unit={unit} />
                  <tr><td colSpan={4} className="py-2 text-xs font-bold text-blue-900 uppercase tracking-wide">Stove pipe to surfaces</td></tr>
                  <MeasureRow label="Backwall" actualKey="pipeToBackwallActual" requiredKey="pipeToBackwallRequired" form={form} set={set} unit={unit} />
                  <MeasureRow label="Sidewall" actualKey="pipeToSidewallActual" requiredKey="pipeToSidewallRequired" form={form} set={set} unit={unit} />
                  <MeasureRow label="Ceiling" actualKey="pipeToCeilingActual" requiredKey="pipeToCeilingRequired" form={form} set={set} unit={unit} />
                  <tr><td colSpan={4} className="py-2 text-xs font-bold text-blue-900 uppercase tracking-wide">Heating unit to edge of floor pad</td></tr>
                  <MeasureRow label="Front" actualKey="floorPadFrontActual" requiredKey="floorPadFrontRequired" form={form} set={set} unit={unit} />
                  <MeasureRow label="Left" actualKey="floorPadLeftActual" requiredKey="floorPadLeftRequired" form={form} set={set} unit={unit} />
                  <MeasureRow label="Right" actualKey="floorPadRightActual" requiredKey="floorPadRightRequired" form={form} set={set} unit={unit} />
                  <MeasureRow label="Back" actualKey="floorPadBackActual" requiredKey="floorPadBackRequired" form={form} set={set} unit={unit} />
                </tbody>
              </table>
            </div>
          </div>

          {/* Shielding */}
          <SectionCard title="7. Heat Shielding">
            <Field label="Shielding type">
              <Select value={form.shieldingType} onChange={v => set('shieldingType', v)}
                options={[
                  { value: 'none', label: 'No shielding' },
                  { value: 'sheet-metal', label: 'Sheet Metal' },
                  { value: 'ceramic-tile', label: 'Ceramic Tile' },
                  { value: 'brick', label: 'Brick' },
                  { value: 'concrete', label: 'Concrete' },
                  { value: 'other', label: 'Other' },
                ]} />
            </Field>
            {form.shieldingType && form.shieldingType !== 'none' && <>
              {form.shieldingType === 'sheet-metal' && (
                <Field label="Sheet metal — permanently installed?">
                  <YNSelect value={form.sheetMetalPermanent} onChange={v => set('sheetMetalPermanent', v)} />
                </Field>
              )}
              {form.shieldingType === 'other' && (
                <Field label="Shielding type (specify)"><Input value={form.shieldingTypeOther} onChange={e => set('shieldingTypeOther', e.target.value)} /></Field>
              )}
              <Field label="Wall spacers non-combustible?">
                <YNSelect value={form.wallSpacersNonCombustible} onChange={v => set('wallSpacersNonCombustible', v)} />
              </Field>
              <Field label="Air space at top and bottom of shield?">
                <YNSelect value={form.airSpaceAtShield} onChange={v => set('airSpaceAtShield', v)} />
              </Field>
            </>}
          </SectionCard>

          {form.shieldingType && form.shieldingType !== 'none' && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
              <div className="bg-blue-900 text-white px-5 py-3 text-sm font-semibold">7. Shield Distances (Actual vs. Required)</div>
              <div className="p-5 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b border-gray-200">
                      <th className="text-left pb-2 pr-3 w-48">Distance</th>
                      <th className="text-left pb-2 pr-2">Actual ({unit})</th>
                      <th className="text-left pb-2 pr-2">Required ({unit})</th>
                      <th className="pb-2 w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <MeasureRow label="Wall to shield" actualKey="wallToShieldActual" requiredKey="wallToShieldRequired" form={form} set={set} unit={unit} />
                    <MeasureRow label="Top of stove to top of shield" actualKey="topStoveToTopShieldActual" requiredKey="topStoveToTopShieldRequired" form={form} set={set} unit={unit} />
                    <MeasureRow label="Heat shield to floor" actualKey="shieldToFloorActual" requiredKey="shieldToFloorRequired" form={form} set={set} unit={unit} />
                    <MeasureRow label="Bottom of stove to floor" actualKey="bottomStoveToFloorActual" requiredKey="bottomStoveToFloorRequired" form={form} set={set} unit={unit} />
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 4: Loss Prevention ── */}
      {tab === 'safety' && (
        <div>
          <SectionCard title="8. Loss Prevention">
            <Field label="Ashes disposed of in a metal container?">
              <YNSelect value={form.ashesInMetalContainer} onChange={v => set('ashesInMetalContainer', v)} />
            </Field>
            {form.ashesInMetalContainer === 'Y' && <>
              <Field label="Metal container stored">
                <Select value={form.metalContainerLocation} onChange={v => set('metalContainerLocation', v)}
                  options={[{ value: 'inside', label: 'Inside' }, { value: 'outside', label: 'Outside' }]} />
              </Field>
              <Field label="Metal container has metal lid?">
                <YNSelect value={form.metalContainerHasLid} onChange={v => set('metalContainerHasLid', v)} />
              </Field>
            </>}
            <Field label="Ash container placed on non-flammable surface?">
              <YNSelect value={form.ashOnNonFlammable} onChange={v => set('ashOnNonFlammable', v)} />
            </Field>
            <Field label="Smoke detector on same floor as unit?">
              <YNSelect value={form.smokeDetector} onChange={v => set('smokeDetector', v)} />
            </Field>
            <Field label="Fire extinguisher in area of unit?">
              <YNSelect value={form.fireExtinguisher} onChange={v => set('fireExtinguisher', v)} />
            </Field>
            <Field label="Carbon monoxide detector in building?">
              <YNSelect value={form.coDetector} onChange={v => set('coDetector', v)} />
            </Field>
            <Field label={`How far is fuel stored from unit?`}>
              <div className="flex gap-2">
                <Input type="number" value={form.fuelDistance} onChange={e => set('fuelDistance', e.target.value)} className="flex-1" />
                <Select value={form.fuelDistanceUnit} onChange={v => set('fuelDistanceUnit', v)}
                  options={[{ value: 'feet', label: 'feet' }, { value: 'metres', label: 'metres' }]} />
              </div>
            </Field>
          </SectionCard>

          <SectionCard title="8. Inspection History">
            <Field label="Since installation, has unit been inspected by a WETT certified person?">
              <YNSelect value={form.wettInspectedSinceInstall} onChange={v => set('wettInspectedSinceInstall', v)} />
            </Field>
            {form.wettInspectedSinceInstall === 'Y' && (
              <Field label="WETT inspector # (previous inspector)">
                <Input value={form.wettInspectorNumber} onChange={e => set('wettInspectorNumber', e.target.value)} />
              </Field>
            )}
            <Field label="Modifications to heating unit or chimney since installed?">
              <YNSelect value={form.modifications} onChange={v => set('modifications', v)} />
            </Field>
            {form.modifications === 'Y' && (
              <Field label="Describe modification">
                <Input value={form.modificationDetails} onChange={e => set('modificationDetails', e.target.value)} />
              </Field>
            )}
            <Field label="Has there been a previous chimney fire?">
              <YNSelect value={form.previousChimneyFire} onChange={v => set('previousChimneyFire', v)} />
            </Field>
            {form.previousChimneyFire === 'Y' && (
              <Field label="Cause of fire">
                <Input value={form.chimneyFireCause} onChange={e => set('chimneyFireCause', e.target.value)} />
              </Field>
            )}
          </SectionCard>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Section 9 — Remarks</label>
            <textarea
              rows={4}
              value={form.section9Remarks}
              onChange={e => set('section9Remarks', e.target.value)}
              placeholder="Additional safety observations, notes for the insurance company…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* ── Tab 5: Review & Save ── */}
      {tab === 'review' && (
        <div>
          {/* Overall result */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
            <h2 className="font-semibold text-gray-900 mb-4">Overall Inspection Result</h2>
            <div className="grid grid-cols-3 gap-3">
              {([
                { value: 'pass', label: '✅ PASS', desc: 'System meets all clearances and safety requirements', color: 'border-green-500 bg-green-50 text-green-800' },
                { value: 'pass-with-deficiencies', label: '⚠️ PASS — Deficiencies Noted', desc: 'System is operable but has items requiring correction', color: 'border-amber-500 bg-amber-50 text-amber-800' },
                { value: 'fail', label: '❌ FAIL', desc: 'System is unsafe or not insurable in current state', color: 'border-red-500 bg-red-50 text-red-800' },
              ] as const).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => set('overallResult', opt.value)}
                  className={`p-4 border-2 rounded-xl text-left transition-all ${
                    form.overallResult === opt.value ? opt.color + ' border-2' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-sm">{opt.label}</div>
                  <div className="text-xs mt-1 opacity-80">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Deficiencies */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Deficiencies &amp; Required Corrections</h2>
              <Button size="sm" variant="outline" onClick={() => set('deficiencies', [...form.deficiencies, ''])}>
                <Plus className="h-3.5 w-3.5 mr-1" />Add
              </Button>
            </div>
            {form.deficiencies.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No deficiencies — add any items requiring correction for the insurance company.</p>
            ) : (
              <div className="space-y-2">
                {form.deficiencies.map((def, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="text-xs text-gray-400 mt-2 w-5 shrink-0 text-right">{i + 1}.</span>
                    <Input
                      value={def}
                      onChange={e => {
                        const next = [...form.deficiencies];
                        next[i] = e.target.value;
                        set('deficiencies', next);
                      }}
                      placeholder="e.g. Stove pipe clearance to ceiling is insufficient — minimum 18″ required"
                      className="flex-1"
                    />
                    <button onClick={() => set('deficiencies', form.deficiencies.filter((_, j) => j !== i))}
                      className="mt-2 text-gray-300 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Photos */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Inspection Photos</h2>
              <div className="flex gap-2">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                  multiple
                  onChange={async e => {
                    const files = Array.from(e.target.files ?? []);
                    for (const f of files) await uploadPhoto(f);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }} />
                <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploadingPhoto}>
                  {uploadingPhoto ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5 mr-1" />}
                  {uploadingPhoto ? 'Uploading…' : 'Add Photos'}
                </Button>
              </div>
            </div>
            {form.photoUrls.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No photos attached yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {form.photoUrls.map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt={`Photo ${i + 1}`} className="w-full aspect-[4/3] object-cover rounded-lg border border-gray-200" />
                    <button
                      onClick={() => set('photoUrls', form.photoUrls.filter((_, j) => j !== i))}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={printReport} className="border-blue-300 text-blue-700">
              <Printer className="h-4 w-4 mr-1.5" />Print / PDF
            </Button>
            <Button onClick={saveReport} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
              {saving ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Save className="h-4 w-4 mr-1.5" />}
              {saving ? 'Saving…' : saved ? 'Update Report' : 'Save Report'}
            </Button>
          </div>
          {saved && savedReportId && (
            <div className="mt-3 text-center">
              <Link to={`/admin/reports/${savedReportId}`} className="text-sm text-blue-600 hover:underline">
                View saved report →
              </Link>
            </div>
          )}
        </div>
      )}
    </PortalLayout>
  );
}
