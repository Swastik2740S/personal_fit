/** Shared SWR fetcher + last-good-payload snapshot helpers. */

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

/**
 * Snapshot the last good dashboard payload per user so the dashboard can paint
 * instantly on the next visit (even through a Neon cold start) while SWR
 * revalidates in the background.
 */
const snapshotKey = (scope: string, userId: string) => `sf:${scope}:${userId}`;

export function readSnapshot<T>(scope: string, userId: string): T | null {
  try {
    const raw = localStorage.getItem(snapshotKey(scope, userId));
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function saveSnapshot(scope: string, userId: string, data: unknown): void {
  try {
    localStorage.setItem(snapshotKey(scope, userId), JSON.stringify(data));
  } catch {
    // Storage full/unavailable — snapshot is best-effort only.
  }
}
