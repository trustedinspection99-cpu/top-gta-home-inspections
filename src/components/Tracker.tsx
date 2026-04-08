/**
 * Invisible component — mounted once in Layout.
 * Creates a visitor session on first page load and fires a page_view
 * event on every route change. All errors are silently swallowed.
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const SESSION_KEY = 'asads_session';

function generateSessionId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function detectSource(referrer: string, params: URLSearchParams): string {
  const utmMedium = (params.get('utm_medium') ?? '').toLowerCase();
  const utmSource = (params.get('utm_source') ?? '').toLowerCase();

  if (params.get('gclid') || utmMedium === 'cpc' || utmMedium === 'ppc' || utmMedium === 'paid') return 'paid';
  if (params.get('fbclid') || utmMedium === 'social' || utmSource === 'facebook' || utmSource === 'instagram') return 'social';
  if (utmSource) return 'referral';
  if (!referrer) return 'direct';

  const ref = referrer.toLowerCase();
  if (/google\.|bing\.|yahoo\.|duckduckgo\.|yandex\./.test(ref)) return 'organic';
  if (/facebook\.|instagram\.|twitter\.|t\.co|linkedin\.|tiktok\.|pinterest\./.test(ref)) return 'social';
  if (ref.includes(window.location.hostname)) return 'direct';
  return 'referral';
}

const Tracker: React.FC = () => {
  const { pathname } = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    // Never track admin or portal pages
    if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/realtor-dashboard')) return;

    try {
      let sessionId = sessionStorage.getItem(SESSION_KEY);

      if (!sessionId) {
        sessionId = generateSessionId();
        sessionStorage.setItem(SESSION_KEY, sessionId);

        const params = new URLSearchParams(window.location.search);
        const referrer = document.referrer || '';

        supabase.from('visitor_sessions').insert({
          id: sessionId,
          entry_page: pathname,
          referrer: referrer || null,
          utm_source: params.get('utm_source'),
          utm_medium: params.get('utm_medium'),
          utm_campaign: params.get('utm_campaign'),
          utm_term: params.get('utm_term'),
          source: detectSource(referrer, params),
        }).then();
      }

      // Page view on every navigation
      supabase.from('visitor_events').insert({
        session_id: sessionId,
        type: 'page_view',
        page: pathname,
      }).then();

    } catch {
      // Never let tracking errors reach the user
    }
  }, [pathname]);

  // Send leave beacon when tab closes
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const handleUnload = () => {
      const sessionId = sessionStorage.getItem(SESSION_KEY);
      if (!sessionId) return;
      const payload = JSON.stringify({ action: 'leave', sessionId, page: window.location.pathname });
      navigator.sendBeacon?.('/api/events', new Blob([payload], { type: 'application/json' }));
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  return null;
};

export default Tracker;
