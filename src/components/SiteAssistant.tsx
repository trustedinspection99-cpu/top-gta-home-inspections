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

const WELCOME = "Hi! I'm **Max** — ASADS Home Inspection specialist.\n\nI can help you book an inspection, answer pricing questions, or tell you about our services. What can I help you with?";
const WELCOME_REPLIES: QuickReply[] = [
  { label: '🏠 Book Inspection', value: 'I want to book an inspection' },
  { label: '💰 See Pricing', value: 'What are your prices?' },
  { label: '🔍 All Services', value: 'What services do you offer?' },
  { label: '📍 Service Areas', value: 'What cities do you serve?' },
];

// ─── Mini avatar for chat header ─────────────────────────────────────────────
const MaxAvatar: React.FC = () => (
  <div style={{
    width: 36, height: 36, borderRadius: '50%',
    background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'white', fontWeight: 800, fontSize: 14, letterSpacing: '-0.5px',
  }}>A</div>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

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

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for open event from portal CTAs
  useEffect(() => {
    const handler = () => setChatOpen(true);
    window.addEventListener('open-scout-chat', handler);
    return () => window.removeEventListener('open-scout-chat', handler);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'auto' }); }, [messages, typing]);

  useEffect(() => {
    if (chatOpen && !greeted) {
      setGreeted(true);
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

    const apiMessages = newMessages
      .map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));
    const firstUserIdx = apiMessages.findIndex(m => m.role === 'user');
    const cleanMessages = firstUserIdx > 0 ? apiMessages.slice(firstUserIdx) : apiMessages;

    try {
      const { data, error } = await supabase.functions.invoke('scout-booking', {
        body: { messages: cleanMessages, sessionId },
      });
      if (error) throw error;

      const reply: string = data.content ?? data.message ?? 'Sorry, something went wrong. Please try again.';
      setTyping(false);
      setMessages(prev => [...prev, { id: nid(), from: 'bot', text: reply }]);

      const parsed = parseBookingReady(reply);
      if (parsed) await handleBookingReady(parsed);
    } catch {
      setTyping(false);
      setMessages(prev => [...prev, { id: nid(), from: 'bot', text: 'Something went wrong. Please try again or call **(647) 801-9311**.' }]);
    }
  };

  const handleBookingReady = async (parsed: BookingDetails) => {
    try { await supabase.functions.invoke('send-booking-confirmation', { body: parsed }); } catch { /* ignore */ }

    if (dbUser) {
      try {
        let scheduled_at: string | null = null;
        try { const d = new Date(parsed.preferred_date); if (!isNaN(d.getTime())) scheduled_at = d.toISOString(); } catch { /* ignore */ }
        await supabase.from('jobs').insert({
          homeowner_id: dbUser.id,
          client_name: parsed.client_name || dbUser.name || '',
          client_email: parsed.client_email || dbUser.email || '',
          client_phone: parsed.client_phone || null,
          address: parsed.address,
          city: parsed.city,
          inspection_type: parsed.inspection_type,
          status: 'scheduled',
          scheduled_at,
        });
      } catch { /* ignore */ }
    }
  };

  const renderText = (text: string) => {
    const display = displayContent(text);
    return display.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
        p.startsWith('**') && p.endsWith('**') ? <strong key={j}>{p.slice(2, -2)}</strong> : p
      );
      return <React.Fragment key={i}>{parts}{i < display.split('\n').length - 1 && <br/>}</React.Fragment>;
    });
  };

  const unread = !chatOpen && messages.length > 0;

  return (
    <>
      <style>{`
        @keyframes max-dot {
          0%,60%,100% { transform: translateY(0); opacity:.35; }
          30%          { transform: translateY(-5px); opacity:1; }
        }
        @keyframes max-pop {
          0%   { opacity:0; transform: scale(0.85) translateY(12px); }
          100% { opacity:1; transform: scale(1) translateY(0); }
        }
        .max-pop { animation: max-pop 0.2s ease-out forwards; }
      `}</style>

      {/* Chat window */}
      {chatOpen && (
        <div className="max-pop" style={{
          position: 'fixed', right: 16, bottom: 80, zIndex: 9999,
          width: Math.min(360, (window.innerWidth || 400) - 32),
          height: 'min(540px, calc(100vh - 100px))',
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
            <MaxAvatar />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: 'white' }}>Max</p>
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
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1d4ed8', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 800, fontSize: 11, marginRight: 6, marginTop: 2 }}>A</div>
                )}
                <div style={{
                  maxWidth: '78%', padding: '9px 13px',
                  borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
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
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1d4ed8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 800, fontSize: 11 }}>A</div>
                <div style={{ background: 'white', borderRadius: '4px 16px 16px 16px', padding: '10px 14px',
                  display: 'flex', gap: 5, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  {[0, 0.18, 0.36].map((d, i) => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b82f6',
                      animation: `max-dot 1.1s ease-in-out ${d}s infinite` }}/>
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
            <input id="max-chat-input" name="max-chat-input" ref={inputRef} value={input}
              onChange={e => setInput(e.target.value)}
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
              <SendIcon/>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button — fixed bottom-right, always visible */}
      <button
        onClick={() => setChatOpen(o => !o)}
        style={{
          position: 'fixed', right: 16, bottom: 16, zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
          boxShadow: '0 4px 20px rgba(29,78,216,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', transition: 'transform 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        title={chatOpen ? 'Close chat' : 'Chat with Max'}
      >
        {chatOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <>
            <ChatIcon/>
            {unread && (
              <div style={{ position: 'absolute', top: 4, right: 4, width: 14, height: 14,
                background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}/>
            )}
          </>
        )}
      </button>
    </>
  );
};

export default SiteAssistant;
