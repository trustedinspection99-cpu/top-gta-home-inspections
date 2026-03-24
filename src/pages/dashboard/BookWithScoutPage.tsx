import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import PortalLayout from '@/components/PortalLayout';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, CheckCircle2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function parseBookingReady(text: string) {
  if (!text.includes('BOOKING_READY')) return null;
  const get = (key: string) => {
    const m = text.match(new RegExp(`${key}:\\s*(.+)`));
    return m ? m[1].trim() : '';
  };
  return {
    address: get('address'),
    city: get('city'),
    inspection_type: get('inspection_type'),
    preferred_date: get('preferred_date'),
    client_name: get('client_name'),
    client_phone: get('client_phone'),
  };
}

export default function BookWithScoutPage() {
  const { dbUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi${dbUser?.name ? ` ${dbUser.name.split(' ')[0]}` : ''}! I'm Scout — I'll get your inspection booked in just a few questions.\n\nWhat's the address of the property you'd like inspected?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<ReturnType<typeof parseBookingReady>>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update greeting once dbUser loads
  useEffect(() => {
    if (dbUser?.name && messages.length === 1 && messages[0].content.startsWith('Hi!')) {
      setMessages([{
        role: 'assistant',
        content: `Hi ${dbUser.name.split(' ')[0]}! I'm Scout — I'll get your inspection booked in just a few questions.\n\nWhat's the address of the property you'd like inspected?`,
      }]);
    }
  }, [dbUser]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setSending(true);

    try {
      const { data, error } = await supabase.functions.invoke('scout-booking', {
        body: { messages: newMessages },
      });

      if (error) throw error;

      const reply: string = data.content ?? 'Sorry, something went wrong. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

      // Check if booking is ready to create
      const parsed = parseBookingReady(reply);
      if (parsed) {
        await createJob(parsed);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong. Please try again.' }]);
    }
    setSending(false);
  }

  async function createJob(details: NonNullable<ReturnType<typeof parseBookingReady>>) {
    // Parse a rough scheduled_at from preferred_date (best effort)
    let scheduled_at: string | null = null;
    try {
      const d = new Date(details.preferred_date);
      if (!isNaN(d.getTime())) scheduled_at = d.toISOString();
    } catch { /* ignore */ }

    const { error } = await supabase.from('jobs').insert({
      homeowner_id: dbUser?.id ?? null,
      client_name: details.client_name || dbUser?.name || '',
      client_email: dbUser?.email || '',
      address: details.address,
      city: details.city,
      inspection_type: details.inspection_type,
      status: 'scheduled',
      scheduled_at,
    });

    if (!error) {
      setBookingDetails(details);
      setBooked(true);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  if (booked && bookingDetails) {
    return (
      <PortalLayout>
        <div className="max-w-lg mx-auto text-center py-16 space-y-4">
          <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900">Inspection Booked!</h1>
          <p className="text-gray-500">We've received your request and will confirm shortly.</p>
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-left space-y-2 text-sm">
            <p><span className="font-medium text-gray-700">Address:</span> {bookingDetails.address}, {bookingDetails.city}</p>
            <p><span className="font-medium text-gray-700">Type:</span> {bookingDetails.inspection_type}</p>
            <p><span className="font-medium text-gray-700">Preferred time:</span> {bookingDetails.preferred_date}</p>
            <p><span className="font-medium text-gray-700">Name:</span> {bookingDetails.client_name}</p>
            <p><span className="font-medium text-gray-700">Phone:</span> {bookingDetails.client_phone}</p>
          </div>
          <div className="flex gap-3 justify-center pt-2">
            <Button asChild variant="outline">
              <Link to="/dashboard/schedule" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />View Schedule
              </Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">Book an Inspection</h1>
          <p className="text-sm text-gray-500">Scout will guide you through scheduling</p>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
              }`}>
                {msg.role === 'assistant' && msg.content.includes('BOOKING_READY')
                  ? msg.content.split('BOOKING_READY')[0].trim()
                  : msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          {sending && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyDown={handleKey}
              placeholder="Type your reply…"
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <Button
              onClick={send}
              disabled={sending || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 h-12 w-12 rounded-xl p-0 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">Press Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </PortalLayout>
  );
}
