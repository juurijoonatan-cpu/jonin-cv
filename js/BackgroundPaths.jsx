/* BackgroundPaths — animated wireframe paths that drift behind the hero.
   Lifted from the user's reference component; rebuilt in plain CSS+SVG
   (no framer-motion) to stay light. */

const BackgroundPaths = ({ position = 1, color = "var(--jj-ink)", count = 36, opacity = 1 }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    // Wait one frame so the initial 0-opacity render commits before we fade in.
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const paths = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}` +
         `C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}` +
         `C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      width: 0.5 + i * 0.03,
      duration: 20 + (i % 7) * 1.4,
      delay: (i % 9) * 0.6,
    }));
  }, [position, count]);

  return (
    <div
      className="jj-paths"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: mounted ? opacity : 0,
        transition: "opacity 1200ms var(--jj-ease)",
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block", color }}
        fill="none"
      >
        {paths.map(p => (
          <path
            key={p.id}
            d={p.d}
            stroke="currentColor"
            strokeWidth={p.width}
            strokeOpacity={0.08 + p.id * 0.02}
            strokeLinecap="round"
            style={{
              strokeDasharray: 1400,
              strokeDashoffset: 0,
              animation: `jj-path-drift ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const BackgroundPathsLayer = ({ inverted, opacity = 1 }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      opacity: mounted ? opacity : 0,
      transition: "opacity 900ms var(--jj-ease)",
      pointerEvents: "none",
    }}>
      <BackgroundPaths position={1}  color={inverted ? "var(--jj-paper-2)" : "var(--jj-ink)"} />
      <BackgroundPaths position={-1} color={inverted ? "var(--jj-paper-2)" : "var(--jj-ink)"} />
    </div>
  );
};

window.BackgroundPaths = BackgroundPaths;
window.BackgroundPathsLayer = BackgroundPathsLayer;
