// Owner rule (2026-11-25): bookings for a date within the next 7 days need a phone call to confirm
// availability; bookings 1-2+ weeks out follow the normal "request received, we'll confirm" flow.
export const SOON_DAYS = 7;

export function isWithinWeek(date: string | Date | null | undefined): boolean {
  if (!date) return false;
  const d = typeof date === 'string'
    ? new Date(/^\d{4}-\d{2}-\d{2}$/.test(date) ? date + 'T12:00:00' : date.replace(/(\d+)(st|nd|rd|th)/i, '$1'))
    : date;
  if (isNaN(d.getTime())) return false;
  const days = (d.getTime() - Date.now()) / 86400000;
  return days < SOON_DAYS;
}

export const SOON_NOTE = 'Your preferred date is within the next 7 days. Please call us at (647) 801-9311 so we can confirm availability.';
