/**
 * Hidden SVG filter defs for the Liquid Glass theme. Rendered once (in
 * LayoutWrapper) so `backdrop-filter: url(#lg-lens-*)` resolves. The filters are
 * only *applied* by CSS under `html[data-ui="liquid"][data-refraction="on"]`
 * (Chromium only — see ThemeContext); Safari/Firefox get the clean frosted
 * fallback.
 *
 * ── Why an edge-lens instead of noise ──────────────────────────────────────
 * The old filter displaced the backdrop with `feTurbulence` everywhere, so
 * content *wobbled* across the whole panel. Real iOS-26 glass behaves like a
 * lens: the center is clear and the backdrop bends/magnifies only at the
 * rounded edges. We model that with a displacement MAP image whose red channel
 * is a horizontal ramp and green a vertical ramp, both held flat (128 = no
 * displacement) across the middle and ramping to the extremes only near the
 * border. `feDisplacementMap` then samples from just outside the panel at the
 * rim (magnification) and leaves the center untouched. A whisper of low-scale
 * turbulence is chained on top purely for organic shimmer.
 */

/**
 * Build the displacement-map data-URI. `flat` is the half-width (0–0.5) of the
 * undistorted center band: larger = clearer middle, lensing squeezed to the
 * edge. Red carries the X ramp, green the Y ramp (matches the channel selectors
 * below). Encoded because the inline `url(#…)` gradient refs contain `#`.
 */
function lensMap(flat: number): string {
  const a = flat.toFixed(3);
  const b = (1 - flat).toFixed(3);
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>` +
    `<defs>` +
    `<linearGradient id='h' x1='0' y1='0' x2='1' y2='0'>` +
    `<stop offset='0' stop-color='rgb(0,0,0)'/>` +
    `<stop offset='${a}' stop-color='rgb(128,0,0)'/>` +
    `<stop offset='${b}' stop-color='rgb(128,0,0)'/>` +
    `<stop offset='1' stop-color='rgb(255,0,0)'/>` +
    `</linearGradient>` +
    `<linearGradient id='v' x1='0' y1='0' x2='0' y2='1'>` +
    `<stop offset='0' stop-color='rgb(0,0,0)'/>` +
    `<stop offset='${a}' stop-color='rgb(0,128,0)'/>` +
    `<stop offset='${b}' stop-color='rgb(0,128,0)'/>` +
    `<stop offset='1' stop-color='rgb(0,255,0)'/>` +
    `</linearGradient>` +
    `</defs>` +
    `<rect width='100' height='100' fill='rgb(0,0,0)'/>` +
    `<rect width='100' height='100' fill='url(#h)' style='mix-blend-mode:screen'/>` +
    `<rect width='100' height='100' fill='url(#v)' style='mix-blend-mode:screen'/>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Cards/bars: wide clear center, lensing in the outer band. Pills are small and
// very rounded, so the ramp covers more of them and the displacement is gentler.
const CARD_MAP = lensMap(0.32);
const PILL_MAP = lensMap(0.2);

function LensFilter({ id, map, scale }: { id: string; map: string; scale: number }) {
  // Region slightly larger than the element so edge samples don't clip to a
  // hard transparent fringe. The map spans the same region.
  const region = { x: "-6%", y: "-6%", width: "112%", height: "112%" } as const;
  return (
    <filter id={id} {...region} colorInterpolationFilters="sRGB">
      <feImage
        href={map}
        {...region}
        preserveAspectRatio="none"
        result="map"
      />
      {/* Edge lensing: bend the backdrop using the ramp map. */}
      <feDisplacementMap
        in="SourceGraphic"
        in2="map"
        scale={scale}
        xChannelSelector="R"
        yChannelSelector="G"
        result="lensed"
      />
      {/* Faint organic shimmer on top of the lensed result. */}
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.008 0.011"
        numOctaves={1}
        seed={7}
        result="noise"
      />
      <feGaussianBlur in="noise" stdDeviation={2} result="softNoise" />
      <feDisplacementMap
        in="lensed"
        in2="softNoise"
        scale={4}
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  );
}

export default function GlassFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
    >
      <defs>
        <LensFilter id="lg-lens-card" map={CARD_MAP} scale={16} />
        <LensFilter id="lg-lens-pill" map={PILL_MAP} scale={9} />
      </defs>
    </svg>
  );
}
