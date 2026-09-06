/* BackgroundPaths — animated wireframe paths that drift behind the hero.
   Lifted from the user's reference component; rebuilt in plain CSS+SVG
   (no framer-motion) to stay light.

   The strokes themselves are static. Motion comes from a transform on the
   wrapping .jj-paths-drift div, which the compositor owns outright.

   These lines used to flow via `stroke-dashoffset`, which is a paint
   property: it dirtied and re-rasterised the whole layer on every frame.
   Measured on the landing page, that was ~900ms of raster work per 5s and
   a repaint on all 300 frames — the stutter that kept being reported.
   Drifting a transform instead costs no repaint at all, so it stays smooth
   no matter what else the page is doing. */
const BackgroundPaths = ({ position = 1, color = "var(--jj-ink)", count = 12, opacity = 1 }) => {

  /* Geometry, width and opacity are all normalised across `count` rather than
     driven by the raw loop index. The original fan was tuned for 36 lines, so
     indexing directly meant a smaller count silently drew only the first few
     lines — the faintest, thinnest ones, bunched into a narrow band. Mapping
     i onto 0..1 and back onto the original 36-line span keeps the fan the same
     size and the same brightness range at any count. */
  const paths = React.useMemo(() => {
    const span = Math.max(count - 1, 1);
    return Array.from({ length: count }, (_, i) => {
      const t = i / span;          // 0..1 across however many lines we draw
      const k = t * 35;            // remapped onto the original 36-line geometry
      const n = (v) => v.toFixed(1);
      return {
        id: i,
        d: `M-${n(380 - k * 5 * position)} -${n(189 + k * 6)}` +
           `C-${n(380 - k * 5 * position)} -${n(189 + k * 6)} -${n(312 - k * 5 * position)} ${n(216 - k * 6)} ${n(152 - k * 5 * position)} ${n(343 - k * 6)}` +
           `C${n(616 - k * 5 * position)} ${n(470 - k * 6)} ${n(684 - k * 5 * position)} ${n(875 - k * 6)} ${n(684 - k * 5 * position)} ${n(875 - k * 6)}`,
        width: 0.5 + t * 1.05,
        strokeOpacity: 0.10 + t * 0.62,
      };
    });
  }, [position, count]);

  return (
    <div
      className="jj-paths"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        overflow: "hidden",
      }}
      aria-hidden
    >
      <div className="jj-paths-drift">
      <svg
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block", color }}
        fill="none"
        shapeRendering="optimizeSpeed"
      >
        {paths.map(p => (
          <path
            key={p.id}
            d={p.d}
            stroke="currentColor"
            strokeWidth={p.width}
            strokeOpacity={p.strokeOpacity}
            strokeLinecap="round"
          />
        ))}
      </svg>
      </div>
    </div>
  );
};

/* This and BackgroundPaths both used to hold the layer at opacity:0 until a
   `mounted` state was flipped inside requestAnimationFrame, purely to avoid a
   flash before a fade-in transition. If that frame never lands, the layer is
   stuck invisible for good — which is exactly what was happening, and every
   earlier screenshot check missed it because the test harness forces
   opacity:1 when it disables animations. Swapping the JS gate for a CSS
   keyframe hit the same class of problem from the other side (an animation
   that never advances leaves it at the 0 of its `from` state).

   So there is no reveal gate at all now: the layer just renders at its target
   opacity. These are slow-drifting decorative lines at 0.32 opacity behind
   hero copy that does its own fade-in — nothing here needs to be sequenced,
   and this way there is no state, no timing, and no way for it to end up
   invisible. */
const BackgroundPathsLayer = ({ inverted, opacity = 1 }) => (
  <div style={{
    position: "absolute",
    inset: 0,
    opacity,
    pointerEvents: "none",
    contain: "layout paint",
  }}>
    <BackgroundPaths position={1}  color={inverted ? "var(--jj-paper-2)" : "var(--jj-ink)"} />
    <BackgroundPaths position={-1} color={inverted ? "var(--jj-paper-2)" : "var(--jj-ink)"} />
  </div>
);

window.BackgroundPaths = BackgroundPaths;
window.BackgroundPathsLayer = BackgroundPathsLayer;
