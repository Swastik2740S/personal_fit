/**
 * Day-boundary helpers shared by API routes and client pages so that
 * "today" is computed identically everywhere (fixes timezone drift between
 * the dashboard/steps and the food/weekly views).
 */

/** Client: ISO string for the start of the user's local day. Send as `?localStart=`. */
export function getLocalStartOfDay(): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

/**
 * Server: resolve the start-of-day instant for a request. Prefers the client's
 * `localStart` query param (their local midnight); falls back to server midnight.
 */
export function getDayStart(req: Request): Date {
  const localStart = new URL(req.url).searchParams.get("localStart");
  if (localStart) {
    const parsed = new Date(localStart);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** How many days back (including today) a user may view / backfill. */
export const BACKFILL_DAYS = 7;

/**
 * Server: the half-open day window `[start, end)` for a request (end = start + 1 day).
 * Use this instead of a bare `gte` so queries target a single day, not "everything
 * from that day onward" — required once a past day can be selected.
 */
export function getDayRange(req: Request): { start: Date; end: Date } {
  const start = getDayStart(req);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

/**
 * Server guard: is `date` inside the editable window (today back through
 * `BACKFILL_DAYS - 1` days ago)? Compares instants directly and allows ~1 day of
 * slack on each side to absorb client/server timezone differences — the exact
 * 7-day list is enforced on the client; this is a sanity bound, not a security one.
 */
export function isWithinBackfillWindow(date: Date, n: number = BACKFILL_DAYS): boolean {
  const dayMs = 24 * 60 * 60 * 1000;
  const diffDays = Math.floor((Date.now() - date.getTime()) / dayMs);
  return diffDays >= -1 && diffDays <= n;
}

/**
 * Client: the last `n` days as day-start ISO strings (oldest → newest) plus labels
 * for the day-picker pills. The newest entry's `iso` equals `getLocalStartOfDay()`.
 */
export function getLastNDays(n: number = BACKFILL_DAYS) {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  const days: { iso: string; weekday: string; dayNum: number; isToday: boolean }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(d.getDate() - i);
    days.push({
      iso: d.toISOString(),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: d.getDate(),
      isToday: i === 0,
    });
  }
  return days;
}
