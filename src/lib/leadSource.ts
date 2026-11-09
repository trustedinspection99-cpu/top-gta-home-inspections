/**
 * Lead source ("Came from") for bookings, owner approved 2026-11-09.
 * Tracker.tsx remembers how the visit started (first page, referrer, utm tags) in sessionStorage;
 * the booking forms send it to save-booking, which adds a "Came from" line to the booking email,
 * and log a booking_submit event so the admin dashboard marks the visit as converted.
 * Every step is best-effort: a failure here never blocks a booking.
 */
import { supabase } from "@/lib/supabase";

const VISIT_KEY = "asads_visit";
const SESSION_KEY = "asads_session";

export interface Visit {
  source: string;
  landing: string;
  referrer: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
}

export function rememberVisit(v: Visit) {
  try {
    if (!sessionStorage.getItem(VISIT_KEY)) sessionStorage.setItem(VISIT_KEY, JSON.stringify(v));
  } catch {
    /* storage blocked */
  }
}

export function getCameFrom(form: string) {
  let visit: Partial<Visit> = {};
  let sessionId: string | null = null;
  try {
    visit = JSON.parse(sessionStorage.getItem(VISIT_KEY) || "{}");
    sessionId = sessionStorage.getItem(SESSION_KEY);
  } catch {
    /* storage blocked */
  }
  return { ...visit, form, booked_on: window.location.pathname, session_id: sessionId };
}

export function logBookingSubmit(form: string) {
  try {
    const sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) return;
    supabase
      .from("visitor_events")
      .insert({ session_id: sessionId, type: "booking_submit", page: window.location.pathname, data: { form } })
      .then();
  } catch {
    /* never block a booking */
  }
}
