import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message { id: number; from: 'bot' | 'user'; text: string; }
interface QuickReply { label: string; value: string; }
interface BookingDetails {
  address: string; city: string; inspection_type: string; preferred_date: string;
  client_name: string; client_phone: string; client_email: string; total_price: string;
}

let _nid = Date.now();
const nid = () => ++_nid;

function parseBookingReady(text: string): BookingDetails | null {
  if (!text.includes('BOOKING_READY')) return null;
  const get = (key: string) => { const m = text.match(new RegExp(`${key}:\\s*(.+)`)); return m ? m[1].trim() : ''; };
  return {
    address: get('address'), city: get('city'), inspection_type: get('inspection_type'),
    preferred_date: get('preferred_date'), client_name: get('client_name'),
    client_phone: get('client_phone'), client_email: get('client_email'), total_price: get('total_price'),
  };
}

function displayContent(text: string): string {
  return text.includes('BOOKING_READY') ? text.split('BOOKING_READY')[0].trim() : text;
}

const WELCOME = "Hi! I'm **Asad** — ASADS Home Inspection specialist.\n\nI can help you book an inspection, answer pricing questions, or tell you about our services. What can I help you with?";
const WELCOME_REPLIES: QuickReply[] = [
  { label: '🏠 Book Inspection', value: 'I want to book an inspection' },
  { label: '💰 See Pricing', value: 'What are your prices?' },
  { label: '🔍 All Services', value: 'What services do you offer?' },
  { label: '📍 Service Areas', value: 'What cities do you serve?' },
];

// ─── Scout character SVG ──────────────────────────────────────────────────────
type ScoutMood = 'idle' | 'happy' | 'excited' | 'curious' | 'fire';
interface ScoutProps { mood?: ScoutMood; blinking?: boolean; eyeX?: number; eyeY?: number; wingsOpen?: boolean; mini?: boolean; }

const ScoutSVG: React.FC<ScoutProps> = ({ mood = 'idle', blinking = false, eyeX = 0, eyeY = 0, mini = false }) => {
  const happy = mood === 'happy' || mood === 'excited';
  const w = mini ? 44 : 140;
  const h = mini ? 50 : 193;
  return (
    <svg width={w} height={h} viewBox="0 0 160 230" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sc-skin" cx="38%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#fde8d0"/><stop offset="55%" stopColor="#f9c49a"/><stop offset="100%" stopColor="#e8a06a"/>
        </radialGradient>
        <radialGradient id="sc-skin-d" cx="38%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#f9c49a"/><stop offset="100%" stopColor="#d4845a"/>
        </radialGradient>
        <radialGradient id="sc-shirt" cx="36%" cy="22%" r="74%">
          <stop offset="0%" stopColor="#93c5fd"/><stop offset="40%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#1d4ed8"/>
        </radialGradient>
        <radialGradient id="sc-hat" cx="38%" cy="25%" r="72%">
          <stop offset="0%" stopColor="#fde68a"/><stop offset="45%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#d97706"/>
        </radialGradient>
        <radialGradient id="sc-pants" cx="40%" cy="25%" r="72%">
          <stop offset="0%" stopColor="#d4b896"/><stop offset="55%" stopColor="#a08060"/><stop offset="100%" stopColor="#7a6048"/>
        </radialGradient>
        <radialGradient id="sc-eye-l" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#6ab0e8"/><stop offset="45%" stopColor="#2980c8"/><stop offset="100%" stopColor="#1a5c9a"/>
        </radialGradient>
        <radialGradient id="sc-eye-r" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#6ab0e8"/><stop offset="45%" stopColor="#2980c8"/><stop offset="100%" stopColor="#1a5c9a"/>
        </radialGradient>
        <radialGradient id="sc-lens" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#d4f0e8" stopOpacity="0.85"/><stop offset="60%" stopColor="#a8dfc8" stopOpacity="0.6"/><stop offset="100%" stopColor="#70c0a0" stopOpacity="0.4"/>
        </radialGradient>
        <filter id="sc-drop" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#3a2010" floodOpacity="0.22"/>
        </filter>
        <filter id="sc-glow-blue" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <ellipse cx="72" cy="226" rx="44" ry="5" fill="#3a2010" opacity="0.12"/>

      <path d="M 54,168 Q 52,190 51,212 Q 50,220 58,220 Q 65,220 66,212 Q 67,190 66,168 Z" fill="url(#sc-pants)"/>
      <path d="M 78,168 Q 78,190 78,212 Q 78,220 86,220 Q 93,220 92,212 Q 91,190 88,168 Z" fill="url(#sc-pants)"/>
      <line x1="57" y1="172" x2="55" y2="208" stroke="#7a6048" strokeWidth="1.2" opacity="0.35"/>
      <line x1="82" y1="172" x2="82" y2="208" stroke="#7a6048" strokeWidth="1.2" opacity="0.35"/>
      <path d="M 48,213 Q 44,220 47,224 Q 53,227 63,226 Q 68,224 68,220 Q 66,214 58,213 Z" fill="#2a1a0e"/>
      <path d="M 76,213 Q 75,220 78,224 Q 84,227 93,226 Q 97,224 96,220 Q 93,214 85,213 Z" fill="#2a1a0e"/>
      <path d="M 49,218 Q 53,216 59,217" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.28"/>
      <path d="M 78,218 Q 82,216 88,217" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.28"/>

      <rect x="48" y="160" width="48" height="10" rx="3" fill="#4a3728"/>
      <rect x="68" y="161" width="10" height="8" rx="1.5" fill="#c8a020"/>
      <rect x="69" y="162" width="8" height="6" rx="1" fill="#f0c030" opacity="0.7"/>
      <rect x="88" y="160" width="5" height="10" rx="2" fill="#888"/>
      <ellipse cx="90" cy="160" rx="3" ry="2" fill="#ffee88" opacity="0.7"/>
      <rect x="52" y="158" width="3" height="12" rx="1.5" fill="#1d4ed8"/>
      <rect x="56" y="158" width="3" height="12" rx="1.5" fill="#dc2626"/>

      <path d="M 50,100 Q 36,118 26,148 Q 23,156 29,158 Q 35,160 38,152 Q 46,126 56,106 Z" fill="url(#sc-shirt)"/>
      <ellipse cx="31" cy="159" rx="7" ry="8" fill="url(#sc-skin)" filter="url(#sc-drop)"/>

      <g transform="rotate(-6,18,168)">
        <rect x="4" y="144" width="30" height="42" rx="3" fill="#b07840"/>
        <rect x="6" y="149" width="26" height="35" rx="2" fill="#f5f0e4"/>
        <rect x="11" y="141" width="16" height="10" rx="3" fill="#777"/>
        <rect x="13" y="142" width="12" height="7" rx="2" fill="#555"/>
        <ellipse cx="19" cy="142" rx="5" ry="2.5" fill="#666"/>
        <line x1="10" y1="156" x2="28" y2="156" stroke="#9ca3af" strokeWidth="1.2" opacity="0.6"/>
        <line x1="10" y1="162" x2="28" y2="162" stroke="#9ca3af" strokeWidth="1.2" opacity="0.6"/>
        <line x1="10" y1="168" x2="28" y2="168" stroke="#9ca3af" strokeWidth="1.2" opacity="0.6"/>
        <line x1="10" y1="174" x2="28" y2="174" stroke="#9ca3af" strokeWidth="1.2" opacity="0.6"/>
        <path d="M 9,155 L 11,157 L 14,153" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M 9,161 L 11,163 L 14,159" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M 9,167 L 13,171 M 13,167 L 9,171" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
      </g>

      <path d="M 96,100 Q 110,80 120,56 Q 123,48 118,45 Q 113,42 110,50 Q 102,70 90,92 Z" fill="url(#sc-shirt)"/>
      <ellipse cx="117" cy="44" rx="7" ry="8" fill="url(#sc-skin)" filter="url(#sc-drop)"/>

      <path d="M 119,50 L 148,20" stroke="#2d7a3a" strokeWidth="8" strokeLinecap="round"/>
      <path d="M 119,50 L 148,20" stroke="#3a9a4a" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
      <line x1="128" y1="42" x2="132" y2="38" stroke="#1a5c28" strokeWidth="2.5" opacity="0.55"/>
      <line x1="134" y1="36" x2="138" y2="32" stroke="#1a5c28" strokeWidth="2.5" opacity="0.55"/>
      <circle cx="108" cy="54" r="22" fill="none" stroke="#2d7a3a" strokeWidth="5"/>
      <circle cx="108" cy="54" r="22" fill="none" stroke="#4aaa5a" strokeWidth="2" opacity="0.4"/>
      <circle cx="108" cy="54" r="18" fill="url(#sc-lens)"/>
      <ellipse cx="102" cy="46" rx="6" ry="4" fill="white" opacity="0.32" transform="rotate(-20,102,46)"/>
      <path d="M 108,42 L 99,52 L 117,52 Z" fill="#1a5c28" opacity="0.9"/>
      <path d="M 108,42 L 100,51 L 116,51 Z" fill="#2d7a3a" opacity="0.45"/>
      <rect x="100" y="51" width="16" height="12" rx="1.5" fill="#1a5c28" opacity="0.85"/>
      <rect x="105" y="55" width="6" height="8" rx="1" fill="#4aaa5a" opacity="0.95"/>
      <circle cx="110" cy="59" r="1" fill="#2d7a3a"/>
      <circle cx="108" cy="54" r="2.5" fill="#2d7a3a" opacity="0.45"/>

      <path d="M 46,100 Q 42,128 44,162 L 100,162 Q 102,128 98,100 Q 88,88 72,86 Q 56,88 46,100 Z"
        fill="url(#sc-shirt)" filter="url(#sc-drop)"/>
      <path d="M 46,100 Q 42,128 44,162 L 58,162 Q 54,132 56,104 Z" fill="#1d4ed8" opacity="0.3"/>
      <rect x="74" y="108" width="15" height="13" rx="2" fill="#2563eb"/>
      <rect x="74" y="108" width="15" height="5" rx="1" fill="#1d4ed8"/>
      <line x1="78" y1="108" x2="78" y2="121" stroke="#f0c030" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="82" y1="108" x2="82" y2="121" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 58,92 Q 65,100 72,96 Q 79,100 86,92 Q 80,85 72,83 Q 64,85 58,92 Z" fill="#60a5fa"/>
      <path d="M 59,92 Q 65,97 72,95" stroke="#93c5fd" strokeWidth="1" opacity="0.5"/>
      <path d="M 85,92 Q 79,97 72,95" stroke="#93c5fd" strokeWidth="1" opacity="0.5"/>
      <line x1="72" y1="96" x2="72" y2="162" stroke="#2563eb" strokeWidth="1.5" opacity="0.45"/>
      {[108,122,136,150].map((y, i) => <circle key={i} cx="72" cy={y} r="2" fill="#1d4ed8" opacity="0.55"/>)}

      <rect x="65" y="84" width="14" height="10" rx="5" fill="url(#sc-skin)"/>

      <ellipse cx="72" cy="56" rx="30" ry="32" fill="url(#sc-skin)" filter="url(#sc-drop)"/>
      <ellipse cx="72" cy="71" rx="18" ry="10" fill="white" opacity="0.07"/>

      <ellipse cx="42" cy="58" rx="7" ry="9" fill="url(#sc-skin)"/>
      <ellipse cx="43" cy="58" rx="4" ry="6" fill="url(#sc-skin-d)" opacity="0.45"/>
      <ellipse cx="102" cy="58" rx="7" ry="9" fill="url(#sc-skin)"/>
      <ellipse cx="101" cy="58" rx="4" ry="6" fill="url(#sc-skin-d)" opacity="0.45"/>

      <path d="M 38,44 Q 38,10 72,8 Q 106,10 106,44 Q 98,30 72,28 Q 46,30 38,44 Z" fill="url(#sc-hat)"/>
      <path d="M 38,44 Q 40,22 52,14 Q 44,26 42,40 Z" fill="#d97706" opacity="0.4"/>
      <path d="M 106,44 Q 104,22 92,14 Q 100,26 102,40 Z" fill="#d97706" opacity="0.35"/>
      <ellipse cx="66" cy="18" rx="16" ry="7" fill="white" opacity="0.18" transform="rotate(-8,66,18)"/>
      <path d="M 54,12 Q 68,9 82,12" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
      <path d="M 30,44 Q 30,52 72,54 Q 114,52 114,44 Q 114,38 72,40 Q 30,38 30,44 Z" fill="#d97706"/>
      <path d="M 34,47 Q 72,52 110,47" stroke="#b45309" strokeWidth="2" opacity="0.35" fill="none"/>
      <path d="M 42,42 Q 72,46 102,42" stroke="#b45309" strokeWidth="1.5" opacity="0.25" fill="none"/>
      <rect x="62" y="24" width="20" height="10" rx="2" fill="#1d4ed8" opacity="0.85"/>
      <text x="72" y="32" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="sans-serif" opacity="0.9">ASADS</text>

      <path d="M 38,44 Q 36,52 38,62" stroke="#5c3a18" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M 106,44 Q 108,52 106,62" stroke="#5c3a18" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M 40,46 Q 38,55 40,64" stroke="#3a2010" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5"/>
      <path d="M 104,46 Q 106,55 104,64" stroke="#3a2010" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5"/>

      <ellipse cx="61" cy="54" rx="11" ry={blinking ? 2 : 12} fill="white" stroke="#d4a060" strokeWidth="0.5"/>
      <ellipse cx="83" cy="54" rx="11" ry={blinking ? 2 : 12} fill="white" stroke="#d4a060" strokeWidth="0.5"/>
      {!blinking && <>
        <circle cx={61 + eyeX * 2} cy={54 + eyeY * 2} r={7.5} fill="url(#sc-eye-l)" filter="url(#sc-glow-blue)"/>
        <circle cx={83 + eyeX * 2} cy={54 + eyeY * 2} r={7.5} fill="url(#sc-eye-r)" filter="url(#sc-glow-blue)"/>
        <circle cx={61 + eyeX * 2} cy={54 + eyeY * 2} r={4} fill="#0a1a2e"/>
        <circle cx={83 + eyeX * 2} cy={54 + eyeY * 2} r={4} fill="#0a1a2e"/>
        <circle cx={58 + eyeX * 2} cy={51 + eyeY * 2} r={2.2} fill="white" opacity="0.95"/>
        <circle cx={80 + eyeX * 2} cy={51 + eyeY * 2} r={2.2} fill="white" opacity="0.95"/>
        <circle cx={63 + eyeX * 2} cy={56 + eyeY * 2} r={1} fill="white" opacity="0.5"/>
        <circle cx={85 + eyeX * 2} cy={56 + eyeY * 2} r={1} fill="white" opacity="0.5"/>
      </>}
      <ellipse cx="61" cy="54" rx="11" ry={blinking ? 2 : 12} fill="none" stroke="#5c3a18" strokeWidth="1.5"/>
      <ellipse cx="83" cy="54" rx="11" ry={blinking ? 2 : 12} fill="none" stroke="#5c3a18" strokeWidth="1.5"/>

      <path d={happy ? "M 51,41 Q 61,37 71,40" : "M 51,42 Q 61,39 71,41"}
        stroke="#5c3a18" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d={happy ? "M 73,40 Q 83,37 93,41" : "M 73,41 Q 83,39 93,42"}
        stroke="#5c3a18" strokeWidth="2.8" strokeLinecap="round" fill="none"/>

      <path d="M 68,66 Q 72,70 76,66" stroke="#d4845a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="68" cy="66" r="2.5" fill="#d4845a" opacity="0.45"/>
      <circle cx="76" cy="66" r="2.5" fill="#d4845a" opacity="0.45"/>

      <path d={happy ? "M 58,76 Q 72,89 86,76" : "M 60,76 Q 72,84 84,76"}
        stroke="#c47850" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d={happy ? "M 60,77 Q 72,87 84,77 L 82,79 Q 72,88 62,79 Z" : "M 62,76 Q 72,83 82,76 L 80,78 Q 72,84 64,78 Z"}
        fill="white" opacity="0.88"/>
      {happy && <line x1="72" y1="77" x2="72" y2="86" stroke="#e0c0a0" strokeWidth="1" opacity="0.4"/>}
      <ellipse cx="51" cy="70" rx="9" ry="6" fill="#ff8888" opacity="0.26"/>
      <ellipse cx="93" cy="70" rx="9" ry="6" fill="#ff8888" opacity="0.26"/>

      <ellipse cx="62" cy="44" rx="10" ry="6" fill="white" opacity="0.08" transform="rotate(-15,62,44)"/>
    </svg>
  );
};

const MagnifyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

type LifeState = 'hidden' | 'peek' | 'idle' | 'walk' | 'flap' | 'fire' | 'curious';

// ─── Main Component ───────────────────────────────────────────────────────────
const SiteAssistant: React.FC = () => {
  const navigate = useNavigate();
  const { dbUser } = useAuth();

  const [sessionId] = useState(() => crypto.randomUUID());
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(WELCOME_REPLIES);
  const [greeted, setGreeted] = useState(false);

  // Animation state
  const [life, setLife] = useState<LifeState>('hidden');
  const [catX, setCatX] = useState(60);
  const [facingRight, setFacingRight] = useState(true);
  const [blinking, setBlinking] = useState(false);
  const [eyeX, setEyeX] = useState(0);
  const [eyeY, setEyeY] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [mood, setMood] = useState<ScoutMood>('idle');
  const [wingsOpen, setWingsOpen] = useState(false);
  const [walkClass, setWalkClass] = useState('');

  const ref = useRef<HTMLDivElement>(null);
  const behaviorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const posRef = useRef(catX);
  posRef.current = catX;

  const clearBT = () => { if (behaviorTimer.current) clearTimeout(behaviorTimer.current); };

  // Listen for open event from portal CTAs
  useEffect(() => {
    const handler = () => { setShowBubble(false); setChatOpen(true); };
    window.addEventListener('open-scout-chat', handler);
    return () => window.removeEventListener('open-scout-chat', handler);
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => { t = setTimeout(() => { setBlinking(true); setTimeout(() => setBlinking(false), 150); loop(); }, 2500 + Math.random() * 4000); };
    loop();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.sqrt(dx * dx + dy * dy);
      setEyeX(d < 10 ? 0 : (dx / d) * Math.min(2.5, d / 55));
      setEyeY(d < 10 ? 0 : (dy / d) * Math.min(2.5, d / 55));
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  const walkTo = (tx: number) => {
    setFacingRight(tx > posRef.current);
    setLife('walk'); setMood('idle');
    setWalkClass('scout-walk');
    setCatX(tx);
    setTimeout(() => { setLife('idle'); setWalkClass(''); }, 2000);
  };

  const scheduleBehavior = () => {
    clearBT();
    behaviorTimer.current = setTimeout(() => {
      const roll = Math.random();
      const vw = Math.max(380, window.innerWidth);
      if (roll < 0.28) {
        walkTo(20 + Math.floor(Math.random() * (vw - 200)));
        setTimeout(scheduleBehavior, 2800);
      } else if (roll < 0.45) {
        setWingsOpen(true); setLife('flap'); setMood('happy');
        setTimeout(() => { setWingsOpen(false); setLife('idle'); setMood('idle'); scheduleBehavior(); }, 1800);
      } else if (roll < 0.58) {
        setMood('fire'); setLife('fire');
        setTimeout(() => { setMood('idle'); setLife('idle'); scheduleBehavior(); }, 1600);
      } else if (roll < 0.72) {
        setMood('curious'); setLife('curious');
        setEyeX(-2.5);
        setTimeout(() => { setEyeX(2.5); setEyeY(-0.5); }, 700);
        setTimeout(() => { setEyeX(0); setEyeY(0); setMood('idle'); setLife('idle'); scheduleBehavior(); }, 1600);
      } else {
        setMood('happy'); setTimeout(() => { setMood('idle'); scheduleBehavior(); }, 1400);
      }
    }, 5000 + Math.random() * 6000);
  };

  useEffect(() => {
    const vw = Math.max(380, window.innerWidth);
    setCatX(50 + Math.floor(Math.random() * (vw - 220)));
    const t1 = setTimeout(() => setLife('peek'), 800);
    const t2 = setTimeout(() => {
      setLife('idle');
      setTimeout(() => {
        setShowBubble(true); setMood('happy'); setWingsOpen(true);
        setTimeout(() => { setWingsOpen(false); setMood('idle'); scheduleBehavior(); }, 1200);
        setTimeout(() => setShowBubble(false), 10000);
      }, 600);
    }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearBT(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (chatOpen) setShowBubble(false); }, [chatOpen]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'auto' }); }, [messages, typing]);

  useEffect(() => {
    if (chatOpen && !greeted) {
      setGreeted(true); setMood('excited'); setWingsOpen(true);
      setTimeout(() => { setWingsOpen(false); setMood('idle'); }, 1400);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([{ id: nid(), from: 'bot', text: WELCOME }]);
        setQuickReplies(WELCOME_REPLIES);
      }, 900);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [chatOpen, greeted]);

  // ── AI chat send ─────────────────────────────────────────────────────────────
  const handleSend = async (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    setInput(''); setQuickReplies([]);

    const newMessages: Message[] = [...messages, { id: nid(), from: 'user', text: t }];
    setMessages(newMessages);
    setTyping(true);

    // Convert to API format; skip initial assistant greeting if first message
    const apiMessages = newMessages
      .map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));
    // Ensure we don't start with assistant message
    const firstUserIdx = apiMessages.findIndex(m => m.role === 'user');
    const cleanMessages = firstUserIdx > 0 ? apiMessages.slice(firstUserIdx) : apiMessages;

    try {
      const { data, error } = await supabase.functions.invoke('scout-booking', {
        body: { messages: cleanMessages, sessionId },
      });
      if (error) throw error;

      const reply: string = data.content ?? 'Sorry, something went wrong. Please try again.';
      setTyping(false);
      setMessages(prev => [...prev, { id: nid(), from: 'bot', text: reply }]);
      setMood('happy');
      setTimeout(() => setMood('idle'), 1500);

      const parsed = parseBookingReady(reply);
      if (parsed) {
        await handleBookingReady(parsed);
      }
    } catch {
      setTyping(false);
      setMessages(prev => [...prev, { id: nid(), from: 'bot', text: 'Something went wrong. Please try again or call **(647) 801-9311**.' }]);
    }
  };

  const handleBookingReady = async (parsed: BookingDetails) => {
    // Send confirmation email (non-blocking)
    try { await supabase.functions.invoke('send-booking-confirmation', { body: parsed }); } catch { /* ignore */ }

    // Create DB job if logged in
    if (dbUser) {
      try {
        let scheduled_at: string | null = null;
        try { const d = new Date(parsed.preferred_date); if (!isNaN(d.getTime())) scheduled_at = d.toISOString(); } catch { /* ignore */ }
        await supabase.from('jobs').insert({
          homeowner_id: dbUser.id,
          client_name: parsed.client_name || dbUser.name || '',
          client_email: parsed.client_email || dbUser.email || '',
          address: parsed.address,
          city: parsed.city,
          inspection_type: parsed.inspection_type,
          status: 'scheduled',
          scheduled_at,
        });
      } catch { /* ignore */ }
    }
  };

  const bottomOffset = life === 'hidden' ? -145 : life === 'peek' ? -85 : 0;

  const renderText = (text: string) => {
    const display = displayContent(text);
    return display.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
        p.startsWith('**') && p.endsWith('**') ? <strong key={j}>{p.slice(2, -2)}</strong> : p
      );
      return <React.Fragment key={i}>{parts}{i < display.split('\n').length - 1 && <br/>}</React.Fragment>;
    });
  };

  return (
    <>
      <style>{`
        @keyframes scout-float {
          0%,100% { transform: translateY(0) rotate(-0.5deg); }
          50%      { transform: translateY(-8px) rotate(0.5deg); }
        }
        @keyframes scout-walk {
          0%,100% { transform: translateY(0) rotate(-1deg); }
          25%      { transform: translateY(-6px) rotate(0.5deg); }
          75%      { transform: translateY(-3px) rotate(1.5deg); }
        }
        @keyframes scout-excited {
          0%,100% { transform: scale(1) rotate(0); }
          25%     { transform: scale(1.1) rotate(-6deg) translateY(-8px); }
          50%     { transform: scale(1.12) rotate(6deg) translateY(-12px); }
          75%     { transform: scale(1.06) rotate(-3deg) translateY(-6px); }
        }
        @keyframes scout-bubble-pop {
          0%   { opacity:0; transform: scale(0.7) translateY(12px); }
          65%  { transform: scale(1.04) translateY(-2px); }
          100% { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes scout-dot {
          0%,60%,100% { transform: translateY(0); opacity:.35; }
          30%          { transform: translateY(-5px); opacity:1; }
        }
        @keyframes scout-shine {
          0%,100% { opacity: 0.1; }
          50%     { opacity: 0.22; }
        }
        .scout-float   { animation: scout-float 3s ease-in-out infinite; }
        .scout-walk    { animation: scout-walk 0.4s ease-in-out infinite; }
        .scout-excited { animation: scout-excited 0.5s ease-in-out 3; }
        .scout-shine   { animation: scout-shine 3s ease-in-out infinite; }
        .scout-bubble-pop { animation: scout-bubble-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      `}</style>

      {/* Scout character */}
      <div ref={ref}
        style={{
          position: 'fixed', left: catX, bottom: bottomOffset, zIndex: 9998,
          cursor: 'pointer', userSelect: 'none',
          display: chatOpen ? 'none' : 'block',
          transition: 'bottom 1.1s cubic-bezier(0.34,1.56,0.64,1), left 2s ease-in-out',
          transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)',
          filter: 'drop-shadow(0 8px 24px rgba(29,78,216,0.35))',
        }}
        onClick={() => { if (life === 'hidden') return; setShowBubble(false); setChatOpen(o => !o); }}
        onMouseEnter={() => {
          if (['hidden', 'peek'].includes(life)) return;
          setMood('happy'); setShowBubble(true); setWingsOpen(true);
          setTimeout(() => setWingsOpen(false), 1000);
        }}
        onMouseLeave={() => setMood('idle')}
      >
        <div className={`${walkClass || (life === 'idle' ? 'scout-float' : '')} ${mood === 'excited' ? 'scout-excited' : ''}`}>
          <ScoutSVG mood={mood} blinking={blinking} eyeX={eyeX} eyeY={eyeY} wingsOpen={wingsOpen}/>
        </div>

        {/* Greeting bubble */}
        {showBubble && !chatOpen && (
          <div className="scout-bubble-pop" style={{
            position: 'absolute', bottom: 207, left: '50%',
            transform: facingRight ? 'translateX(-50%)' : 'translateX(-50%) scaleX(-1)',
            background: 'linear-gradient(135deg,#eff6ff,#dbeafe)',
            border: '2px solid #60a5fa', borderRadius: 18,
            padding: '10px 18px',
            boxShadow: '0 8px 32px rgba(29,78,216,0.25)',
            whiteSpace: 'nowrap', pointerEvents: 'none',
          }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#1d4ed8', margin: 0 }}>Buyer, Seller or Realtor? 🏠</p>
            <p style={{ fontSize: 11, color: '#2563eb', margin: '2px 0 0', fontWeight: 500 }}>I can help — tap to chat! ✨</p>
            <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0,
              borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #60a5fa' }}/>
          </div>
        )}

        {/* Unread dot */}
        {!chatOpen && messages.length > 0 && (
          <div style={{ position: 'absolute', top: 12, right: -4, width: 16, height: 16,
            background: '#ef4444', borderRadius: '50%', border: '2px solid white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: facingRight ? 'none' : 'scaleX(-1)' }}>
            <span style={{ color: 'white', fontSize: 8, fontWeight: 700 }}>!</span>
          </div>
        )}
      </div>

      {/* Chat window */}
      {chatOpen && (
        <div className="scout-bubble-pop" style={{
          position: 'fixed', left: 12, bottom: 16, zIndex: 9997,
          width: Math.min(380, (window.innerWidth || 400) - 16),
          height: 'min(580px, calc(100vh - 32px))',
          display: 'flex', flexDirection: 'column',
          background: '#f0f9ff',
          border: '1.5px solid #bfdbfe',
          borderRadius: 20,
          boxShadow: '0 24px 64px rgba(29,78,216,0.22), 0 4px 16px rgba(29,78,216,0.1)',
          overflow: 'hidden',
          fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px',
            background: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
            flexShrink: 0,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ScoutSVG mini mood={mood}/>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: 'white' }}>Asad</p>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>ASADS Home Inspection · Online</p>
            </div>
            <button onClick={() => setChatOpen(false)} style={{
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
              width: 30, height: 30, cursor: 'pointer', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 4px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                {m.from === 'bot' && (
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1d4ed8', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 6, marginTop: 2 }}>
                    <MagnifyIcon/>
                  </div>
                )}
                <div style={{
                  maxWidth: '78%', padding: '9px 13px', borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                  background: m.from === 'user' ? 'linear-gradient(135deg,#1d4ed8,#2563eb)' : 'white',
                  color: m.from === 'user' ? 'white' : '#1e293b',
                  fontSize: 13.5, lineHeight: 1.55,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}>
                  {renderText(m.text)}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1d4ed8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MagnifyIcon/>
                </div>
                <div style={{ background: 'white', borderRadius: '4px 16px 16px 16px', padding: '10px 14px',
                  display: 'flex', gap: 5, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  {[0, 0.18, 0.36].map((d, i) => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b82f6',
                      animation: `scout-dot 1.1s ease-in-out ${d}s infinite` }}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Quick replies */}
          {quickReplies.length > 0 && (
            <div style={{ padding: '6px 10px', display: 'flex', flexWrap: 'wrap', gap: 6, flexShrink: 0 }}>
              {quickReplies.map(qr => (
                <button key={qr.value} onClick={() => handleSend(qr.value)}
                  style={{
                    padding: '6px 12px', borderRadius: 20, fontSize: 12.5, cursor: 'pointer', fontWeight: 600,
                    background: '#eff6ff', color: '#1d4ed8', border: '1.5px solid #bfdbfe',
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = '#1d4ed8'; (e.target as HTMLElement).style.color = 'white'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = '#eff6ff'; (e.target as HTMLElement).style.color = '#1d4ed8'; }}
                >{qr.label}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '8px 12px 12px', display: 'flex', gap: 8, flexShrink: 0,
            borderTop: '1px solid #dbeafe', background: 'white' }}>
            <input id="asad-chat-input" name="asad-chat-input" ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask about inspections…"
              autoComplete="off"
              onKeyDown={e => { if (e.key === 'Enter') handleSend(input); }}
              style={{
                flex: 1, border: '1.5px solid #bfdbfe', borderRadius: 20, padding: '9px 14px',
                fontSize: 13.5, outline: 'none', background: '#f8fafc', color: '#1e293b',
              }}/>
            <button onClick={() => handleSend(input)} disabled={!input.trim() || typing}
              style={{
                width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: input.trim() && !typing ? 'linear-gradient(135deg,#1d4ed8,#2563eb)' : '#e2e8f0',
                color: input.trim() && !typing ? 'white' : '#94a3b8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', flexShrink: 0,
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Open button (when chat is closed) */}
      {!chatOpen && life !== 'hidden' && (
        <button onClick={() => setChatOpen(true)}
          style={{
            position: 'fixed', right: 16, bottom: 16, zIndex: 9996,
            width: 52, height: 52, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
            boxShadow: '0 4px 20px rgba(29,78,216,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', transition: 'transform 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          title="Chat with Asad"
        >
          <MagnifyIcon/>
          {messages.length > 0 && (
            <div style={{ position: 'absolute', top: 4, right: 4, width: 14, height: 14,
              background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}/>
          )}
        </button>
      )}
    </>
  );
};

export default SiteAssistant;
