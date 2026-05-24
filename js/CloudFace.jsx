/* CloudFace — friendly cloud with eyes that follow the cursor and close
   when the password field is focused. Adapted from the pasted reference,
   drawn in pure SVG so it inherits the cream/ink palette. */

const CloudFace = ({ typing }) => {
  const wrapRef = React.useRef(null);
  const [pupil, setPupil] = React.useState({ x: 0, y: 0 });
  const [blink, setBlink] = React.useState(false);

  // Track cursor relative to wrapper
  React.useEffect(() => {
    const onMove = (e) => {
      if (!wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / Math.max(rect.width, 1);
      const dy = (e.clientY - cy) / Math.max(rect.height, 1);
      // Clamp pupil offset to a small range
      setPupil({
        x: Math.max(-4, Math.min(4, dx * 14)),
        y: Math.max(-3, Math.min(3, dy * 10)),
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Random blink
  React.useEffect(() => {
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const eyesClosed = typing || blink;
  const eyeHeight = eyesClosed ? 1.5 : 14;

  return (
    <div
      ref={wrapRef}
      style={{ width: "100%", maxWidth: 360, margin: "0 auto 18px", position: "relative" }}
      aria-hidden
    >
      <svg viewBox="0 0 320 180" style={{ width: "100%", display: "block" }}>
        {/* Cloud body — a few overlapping circles in cream/white */}
        <defs>
          <radialGradient id="jj-cloud" cx="42%" cy="35%" r="80%">
            <stop offset="0%"  stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#F4F2EE" />
            <stop offset="100%" stopColor="#E9E5DD" />
          </radialGradient>
        </defs>

        <g>
          <ellipse cx="160" cy="115" rx="135" ry="48" fill="url(#jj-cloud)" stroke="var(--jj-ink)" strokeWidth="1.2" />
          <circle cx="88"  cy="90"  r="38"  fill="url(#jj-cloud)" stroke="var(--jj-ink)" strokeWidth="1.2" />
          <circle cx="160" cy="68"  r="48"  fill="url(#jj-cloud)" stroke="var(--jj-ink)" strokeWidth="1.2" />
          <circle cx="230" cy="80"  r="42"  fill="url(#jj-cloud)" stroke="var(--jj-ink)" strokeWidth="1.2" />
          {/* Overpaint the inside seams so the outline reads as one shape */}
          <ellipse cx="160" cy="115" rx="130" ry="44" fill="url(#jj-cloud)" />
          <circle cx="88"  cy="90"  r="35"  fill="url(#jj-cloud)" />
          <circle cx="160" cy="68"  r="45"  fill="url(#jj-cloud)" />
          <circle cx="230" cy="80"  r="39"  fill="url(#jj-cloud)" />
        </g>

        {/* Eyes — wells (whites) + pupils. Eyes "close" by collapsing to a line. */}
        {[
          { cx: 132 },
          { cx: 188 },
        ].map((eye, i) => (
          <g key={i} transform={`translate(${eye.cx}, 92)`}>
            {/* White */}
            <rect
              x={-11}
              y={-eyeHeight / 2}
              width={22}
              height={eyeHeight}
              rx={eyesClosed ? 1 : 11}
              ry={eyesClosed ? 1 : 9}
              fill={eyesClosed ? "var(--jj-ink)" : "#FFFFFF"}
              stroke="var(--jj-ink)"
              strokeWidth="1.2"
              style={{ transition: "all 160ms var(--jj-ease)" }}
            />
            {/* Pupil (only when open) */}
            {!eyesClosed && (
              <circle
                cx={pupil.x}
                cy={Math.min(3, pupil.y + 2)}
                r={5}
                fill="var(--jj-ink)"
                style={{ transition: "cx 80ms linear, cy 80ms linear" }}
              />
            )}
          </g>
        ))}

        {/* Tiny mouth — barely-there smile */}
        <path
          d={typing ? "M150 122 Q160 122 170 122" : "M150 122 Q160 130 170 122"}
          stroke="var(--jj-ink)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          style={{ transition: "d 200ms var(--jj-ease)" }}
        />

        {/* Cheek dots */}
        <circle cx={108} cy={102} r={2.2} fill="rgba(110,231,183,0.45)" />
        <circle cx={212} cy={102} r={2.2} fill="rgba(110,231,183,0.45)" />
      </svg>

      <div style={{
        textAlign: "center",
        fontSize: 9.5,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--jj-muted)",
        marginTop: 8,
      }}>
        {typing
          ? "Eyes shut — your password is safe"
          : "Hi. I won't peek."}
      </div>
    </div>
  );
};

window.CloudFace = CloudFace;
