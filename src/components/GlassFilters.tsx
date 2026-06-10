/**
 * Hidden SVG filter defs for the Liquid Glass theme. Rendered once (in
 * LayoutWrapper) so `backdrop-filter: url(#lg-refraction)` resolves. The filter
 * itself is only *applied* by CSS under
 * `html[data-ui="liquid"][data-refraction="on"]` (Chromium only — see
 * ThemeContext). `feDisplacementMap` bends the backdrop at the edges to mimic
 * iOS 26 lensing; `scale` is the one cheaply-animatable knob.
 */
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
        <filter
          id="lg-refraction"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.010 0.014"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation={2.5} result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale={22}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
