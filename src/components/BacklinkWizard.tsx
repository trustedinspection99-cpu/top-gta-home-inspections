import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, AlertCircle, RefreshCw, X, ChevronRight, ChevronLeft } from 'lucide-react';

const LINK_URL = 'https://www.asads.ca';
const LINK_TEXT = 'ASADS Home Inspection';

type Platform = 'wordpress' | 'wix' | 'squarespace' | 'godaddy' | 'showit' | 'other';
type VerifyStatus = 'idle' | 'checking' | 'verified' | 'failed';

interface Props {
  domain: string;
  realtorId: string;
  onVerified: (domain: string) => void;
  onClose: () => void;
  checkBacklink: (domain: string) => Promise<boolean>;
}

const PLATFORMS: { id: Platform; label: string; logo: string }[] = [
  { id: 'wordpress', label: 'WordPress', logo: '🔵' },
  { id: 'wix', label: 'Wix', logo: '🟣' },
  { id: 'squarespace', label: 'Squarespace', logo: '⬛' },
  { id: 'godaddy', label: 'GoDaddy', logo: '🟢' },
  { id: 'showit', label: 'Showit', logo: '🟠' },
  { id: 'other', label: 'Other / Not sure', logo: '🌐' },
];

interface Step {
  title: string;
  instruction: string;
  detail?: string;
  image?: string; // emoji illustration
}

function getSteps(platform: Platform): Step[] {
  switch (platform) {
    case 'wordpress':
      return [
        {
          title: 'Go to your footer widgets',
          instruction: 'In your WordPress dashboard, click Appearance → Customize → Widgets → Footer',
          detail: 'If your theme uses the block editor: go to Appearance → Editor → Templates → Footer',
          image: '🎨',
        },
        {
          title: 'Add a text or button block',
          instruction: 'Click the + button to add a new block. Search for "Paragraph" or "Buttons".',
          detail: 'Type the link text, then highlight it and click the link icon (🔗) in the toolbar.',
          image: '➕',
        },
        {
          title: 'Paste the link and save',
          instruction: `Paste this URL into the link field: ${LINK_URL}`,
          detail: 'Click Save / Publish. Your footer link is now live!',
          image: '💾',
        },
      ];
    case 'wix':
      return [
        {
          title: 'Open your Wix Editor',
          instruction: 'Go to your Wix dashboard → Edit Site. Scroll down to your footer section.',
          image: '✏️',
        },
        {
          title: 'Add a Text element',
          instruction: 'Click the + Add button on the left sidebar → Text → Paragraph. Type "ASADS Home Inspection".',
          detail: 'Alternatively click Add → Button to use a button style.',
          image: '📝',
        },
        {
          title: 'Add the link',
          instruction: 'Select the text you just typed → click the Link icon (🔗) → choose Web Address → paste the URL.',
          detail: `URL to paste: ${LINK_URL}  — then click Done → Publish.`,
          image: '🔗',
        },
      ];
    case 'squarespace':
      return [
        {
          title: 'Open your Footer',
          instruction: 'In your Squarespace editor, scroll to the very bottom of any page. Click Edit Footer.',
          image: '⬇️',
        },
        {
          title: 'Add a Text Block',
          instruction: 'Click the + icon inside the footer → choose Text. Type "ASADS Home Inspection".',
          image: '📝',
        },
        {
          title: 'Link it and Save',
          instruction: 'Highlight the text → click the link icon in the toolbar → External Link → paste the URL.',
          detail: `URL: ${LINK_URL}  — Click Apply → Save.`,
          image: '✅',
        },
      ];
    case 'godaddy':
      return [
        {
          title: 'Open Website Builder',
          instruction: 'Log in to GoDaddy → My Products → Websites → Edit Website.',
          image: '🌐',
        },
        {
          title: 'Edit your Footer section',
          instruction: 'Click on the footer area of your site. Click + Add Section or click an existing text area.',
          image: '✏️',
        },
        {
          title: 'Add link text and Save',
          instruction: 'Type "ASADS Home Inspection", highlight it, and click the link icon. Paste the URL and Save.',
          detail: `URL: ${LINK_URL}`,
          image: '💾',
        },
      ];
    case 'showit':
      return [
        {
          title: 'Open Showit app',
          instruction: 'Log into Showit and open your site. Navigate to the Footer canvas.',
          image: '🎨',
        },
        {
          title: 'Add a Text widget',
          instruction: 'Drag a Text widget into your footer. Type "ASADS Home Inspection".',
          image: '📝',
        },
        {
          title: 'Add the link',
          instruction: 'Select the text → in the right panel under Link, choose URL → paste the link → Publish.',
          detail: `URL: ${LINK_URL}`,
          image: '🔗',
        },
      ];
    default:
      return [
        {
          title: 'Go to your website editor',
          instruction: 'Log in to whatever platform hosts your website and find the Footer section.',
          detail: 'Most website builders have a footer you can edit without any coding.',
          image: '🌐',
        },
        {
          title: 'Add a text link',
          instruction: `Type "${LINK_TEXT}" anywhere in your footer. Most editors let you highlight text and click a 🔗 Link button.`,
          image: '📝',
        },
        {
          title: 'Set the URL and publish',
          instruction: `Paste this URL into the link field: ${LINK_URL}`,
          detail: 'Save or Publish your site. Then come back here to verify.',
          image: '✅',
        },
      ];
  }
}

export default function BacklinkWizard({ domain: initialDomain, onVerified, onClose, checkBacklink }: Props) {
  const [step, setStep] = useState<'platform' | 'steps' | 'verify'>('platform');
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [domain, setDomain] = useState(initialDomain || '');
  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle');

  const steps = platform ? getSteps(platform) : [];
  const currentStep = steps[stepIndex];

  async function handleVerify() {
    if (!domain.trim()) return;
    setVerifyStatus('checking');
    const ok = await checkBacklink(domain.trim());
    setVerifyStatus(ok ? 'verified' : 'failed');
    if (ok) {
      setTimeout(() => onVerified(domain.trim()), 1200);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">Get Listed — Add Your Link</h2>
            <p className="text-blue-200 text-sm mt-0.5">
              {step === 'platform' ? 'Step 1 of 3 — Choose your website platform' :
               step === 'steps' ? `Step 2 of 3 — ${platform ? PLATFORMS.find(p => p.id === platform)?.label : ''} instructions` :
               'Step 3 of 3 — Verify your link'}
            </p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-blue-100">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: step === 'platform' ? '33%' : step === 'steps' ? '66%' : '100%' }}
          />
        </div>

        {/* Step 1: Pick platform */}
        {step === 'platform' && (
          <div className="p-6">
            <p className="text-gray-700 font-medium mb-4">What platform is your website on?</p>
            <div className="grid grid-cols-2 gap-3">
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setPlatform(p.id); setStep('steps'); setStepIndex(0); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
                >
                  <span className="text-2xl">{p.logo}</span>
                  <span className="font-medium text-gray-800">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Platform-specific steps */}
        {step === 'steps' && currentStep && (
          <div className="p-6">
            {/* Step counter */}
            <div className="flex items-center gap-2 mb-5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-colors ${i <= stepIndex ? 'bg-blue-500' : 'bg-gray-200'}`}
                />
              ))}
            </div>

            {/* Current step card */}
            <div className="bg-blue-50 rounded-xl p-5 mb-5">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{currentStep.image}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {stepIndex + 1} of {steps.length}
                    </span>
                    <h3 className="font-bold text-gray-900">{currentStep.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{currentStep.instruction}</p>
                  {currentStep.detail && (
                    <p className="text-gray-500 text-xs mt-2 leading-relaxed">{currentStep.detail}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Link to copy (shown on last step) */}
            {stepIndex === steps.length - 1 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-5 flex items-center justify-between gap-3">
                <span className="text-sm text-gray-700 font-mono break-all">{LINK_URL}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(LINK_URL)}
                  className="text-blue-600 text-xs font-semibold shrink-0 hover:underline"
                >
                  Copy
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => stepIndex === 0 ? setStep('platform') : setStepIndex(i => i - 1)}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              {stepIndex < steps.length - 1 ? (
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-1"
                  onClick={() => setStepIndex(i => i + 1)}
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-1"
                  onClick={() => setStep('verify')}
                >
                  I've added the link ✓
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Verify */}
        {step === 'verify' && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🔍</div>
              <h3 className="font-bold text-gray-900 text-lg">Let's confirm your link is live</h3>
              <p className="text-gray-500 text-sm mt-1">Enter your website address and we'll check automatically</p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  placeholder="yoursite.com"
                  className="flex-1"
                  disabled={verifyStatus === 'checking' || verifyStatus === 'verified'}
                />
                <Button
                  onClick={handleVerify}
                  disabled={!domain.trim() || verifyStatus === 'checking' || verifyStatus === 'verified'}
                  className="bg-blue-600 hover:bg-blue-700 shrink-0"
                >
                  {verifyStatus === 'checking'
                    ? <><RefreshCw className="h-4 w-4 mr-1.5 animate-spin" />Checking…</>
                    : 'Verify'}
                </Button>
              </div>

              {verifyStatus === 'verified' && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Link verified! 🎉</p>
                    <p className="text-xs mt-0.5">We'll review and activate your listing shortly.</p>
                  </div>
                </div>
              )}

              {verifyStatus === 'failed' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                  <div className="flex items-start gap-2 text-amber-800">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Link not found yet</p>
                      <p className="text-xs mt-1 text-amber-700">
                        Make sure the link is in your published site footer — sometimes changes take a few minutes to go live. Try again shortly.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setStep('steps'); setStepIndex(0); }}
                    className="text-amber-700 text-xs underline mt-2 hover:text-amber-900"
                  >
                    ← Go back to instructions
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              <Button variant="outline" onClick={() => setStep('steps')} className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
            </div>
          </div>
        )}

        {/* Footer note */}
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-3">
          <p className="text-xs text-gray-400 text-center">
            You're adding a simple text link — no code required. Takes about 2 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
