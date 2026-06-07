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
