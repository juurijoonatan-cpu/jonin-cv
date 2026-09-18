/* CompanyStrip — logos only, infinite scroll, no mouse interaction.
   The track is two identical copies of LOGOS end to end; the keyframe moves
   exactly -50% so the seam is invisible. Spacing between logos is a
   marginRight on every item, not a flex `gap` on the container — `gap`
   only inserts space BETWEEN items (n-1 gaps for n items), so duplicating
   the list and moving -50% lands you half a gap short every cycle and the
   strip visibly jumps once per 55s loop. A trailing margin on every item
   (including the last) makes each 10-logo set an identical, self-contained
   width, so two of them really are exactly double and -50% is exact. */

/* One flat height across all ten made the compact marks look tiny. Two
   separate causes, both now dealt with:

   1. The source files carried very different amounts of built-in whitespace —
      TVO's mark filled 40% of its canvas height and Harvard's 50%, against
      100% for Nokia and Fortum. At a shared 44px, TVO drew a 26px mark next
      to Nokia's 44px one. The PNGs are now cropped to their artwork, so a
      given height means the same thing for every logo.
   2. Aspect still runs 2.0 (TVO) to 6.1 (Siemens), so `h` below is set per
      logo to even out the optical AREA of the mark rather than its height.
      Rendered areas land within ~10% of each other. */
const LOGOS = [
  { src: "assets/logos/tvo.png",       alt: "TVO",                     h: 58 },
  { src: "assets/logos/neste.png",     alt: "Neste",                   h: 35 },
  { src: "assets/logos/siemens.png",   alt: "Siemens",                 h: 34 },
  { src: "assets/logos/fortum.png",    alt: "Fortum",                  h: 40 },
  { src: "assets/logos/winwind.png",   alt: "WinWind",                 h: 47 },
  { src: "assets/logos/nokia.png",     alt: "Nokia",                   h: 34 },
  { src: "assets/logos/posiva.png",    alt: "Posiva Solutions",        h: 54 },
  { src: "assets/logos/harvard.png",   alt: "Harvard Business School", h: 45 },
  { src: "assets/logos/imd.png",       alt: "IMD",                     h: 50 },
  { src: "assets/logos/uhelsinki.png", alt: "University of Helsinki",  h: 46 },
];

const CompanyStrip = () => {
  const isMobile = useIsMobile();
  const gap = isMobile ? 40 : 76;
  const hScale = isMobile ? 0.64 : 1;
  const items = [...LOGOS, ...LOGOS]; // duplicate for seamless loop
  return (
    <div style={{
      background: "var(--jj-paper-2)",
      borderRadius: 18,
      padding: isMobile ? "20px 0" : "30px 0",
      marginBottom: 6,
      overflow: "hidden",
      position: "relative",
      contain: "layout paint",
    }}>
      <div
        className="jj-marquee jj-marquee--locked"
        style={{
          display: "flex",
          alignItems: "center",
          animation: "jj-marquee 55s linear infinite",
          width: "max-content",
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {items.map((c, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: isMobile ? 44 : 66,
            flexShrink: 0,
            marginRight: gap,
          }}>
            <img
              src={c.src}
              alt={c.alt}
              draggable={false}
              style={{
                height: Math.round(c.h * hScale),
                width: "auto",
                maxWidth: isMobile ? 150 : 215,
                objectFit: "contain",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          </div>
        ))}
      </div>

      {/* Soft fade edges */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, width: isMobile ? 40 : 80,
        background: "linear-gradient(90deg, var(--jj-paper-2), transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: isMobile ? 40 : 80,
        background: "linear-gradient(270deg, var(--jj-paper-2), transparent)",
        pointerEvents: "none",
      }} />
    </div>
  );
};

window.CompanyStrip = CompanyStrip;
