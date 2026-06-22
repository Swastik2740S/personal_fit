/**
 * Reactive light source for the Liquid Glass theme.
 *
 * Apple's "mirror" quality comes from a bright specular highlight that *moves*
 * as light catches the surface. We model a single global light and publish its
 * position as two CSS custom properties on <html>:
 *   --lg-lx / --lg-ly  (viewport-relative %, default 50% 50%)
 * The CSS sheen/rim layers (globals.css, scoped to [data-ui="liquid"]) read
 * those vars, so ONE light sweeps across every glass panel at once — no
 * per-element listeners.
 *
 * Inputs (progressive enhancement, never both at once):
 *   • desktop  → pointermove  (gated to pointer:fine)
 *   • mobile   → deviceorientation gyroscope (gated to pointer:coarse)
 *
 * Everything is gated: it no-ops unless the liquid theme is active, freezes the
 * light at center under prefers-reduced-motion, and is fully torn down on
 * cleanup. Writes are rAF-batched so we touch the DOM at most once per frame.
 */

const ROOT_VARS = { x: "--lg-lx", y: "--lg-ly" } as const;

function isLiquid(): boolean {
  return typeof document !== "undefined" && document.documentElement.dataset.ui === "liquid";
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Begin tracking the light. Returns a cleanup function that removes every
 * listener and resets the light to center. Safe to call on the server (no-op).
 */
export function startGlassLight(): () => void {
  if (typeof window === "undefined") return () => {};

  const root = document.documentElement;
  let frame = 0;
  let pendingX = 50;
  let pendingY = 50;

  const setLight = (xPct: number, yPct: number) => {
    pendingX = Math.max(0, Math.min(100, xPct));
    pendingY = Math.max(0, Math.min(100, yPct));
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      root.style.setProperty(ROOT_VARS.x, `${pendingX.toFixed(2)}%`);
      root.style.setProperty(ROOT_VARS.y, `${pendingY.toFixed(2)}%`);
    });
  };

  const resetLight = () => {
    root.style.setProperty(ROOT_VARS.x, "50%");
    root.style.setProperty(ROOT_VARS.y, "50%");
  };

  // Reduced motion / disabled theme: pin the highlight at center, no listeners.
  if (prefersReducedMotion() || !isLiquid()) {
    resetLight();
    return resetLight;
  }

  const fine = window.matchMedia("(pointer: fine)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  // ---- Desktop: pointer drives the light (viewport %) ----
  const onPointerMove = (e: PointerEvent) => {
    if (!isLiquid()) return;
    setLight((e.clientX / window.innerWidth) * 100, (e.clientY / window.innerHeight) * 100);
  };

  // ---- Mobile: gyroscope tilt drives the light ----
  // gamma = left/right tilt [-90..90], beta = front/back [-180..180]. We map a
  // comfortable tilt range (~±35°) across the viewport so a gentle wrist turn
  // sweeps the highlight edge-to-edge.
  const TILT_RANGE = 35;
  const onOrient = (e: DeviceOrientationEvent) => {
    if (!isLiquid() || e.gamma == null || e.beta == null) return;
    const x = 50 + (e.gamma / TILT_RANGE) * 50;
    const y = 50 + ((e.beta - 45) / TILT_RANGE) * 50; // 45° = natural reading hold
    setLight(x, y);
  };

  let orientationAttached = false;
  const attachOrientation = () => {
    if (orientationAttached) return;
    orientationAttached = true;
    window.addEventListener("deviceorientation", onOrient, { passive: true });
  };

  // iOS 13+ requires a user-gesture permission grant before deviceorientation
  // fires. Request lazily on first touch; if denied/unavailable the light just
  // stays centered (the static sheen still looks good).
  type OrientationCtor = typeof DeviceOrientationEvent & {
    requestPermission?: () => Promise<"granted" | "denied">;
  };
  let onFirstTouch: ((e: TouchEvent) => void) | null = null;

  if (fine) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  } else if (coarse && typeof DeviceOrientationEvent !== "undefined") {
    const Ctor = DeviceOrientationEvent as OrientationCtor;
    if (typeof Ctor.requestPermission === "function") {
      onFirstTouch = () => {
        Ctor.requestPermission!()
          .then((state) => {
            if (state === "granted") attachOrientation();
          })
          .catch(() => {});
        if (onFirstTouch) window.removeEventListener("touchend", onFirstTouch);
        onFirstTouch = null;
      };
      window.addEventListener("touchend", onFirstTouch, { passive: true });
    } else {
      attachOrientation();
    }
  }

  return () => {
    if (frame) window.cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("deviceorientation", onOrient);
    if (onFirstTouch) window.removeEventListener("touchend", onFirstTouch);
    resetLight();
  };
}
