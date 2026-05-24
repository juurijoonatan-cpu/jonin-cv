/* CompanyStrip — logos only, infinite scroll, no mouse interaction. */

const LOGOS = [
  { src: "assets/logos/tvo.png",       alt: "TVO" },
  { src: "assets/logos/neste.png",     alt: "Neste" },
  { src: "assets/logos/siemens.png",   alt: "Siemens" },
  { src: "assets/logos/fortum.png",    alt: "Fortum" },
  { src: "assets/logos/winwind.png",   alt: "WinWind" },
  { src: "assets/logos/nokia.png",     alt: "Nokia" },
  { src: "assets/logos/posiva.png",    alt: "Posiva Solutions" },
  { src: "assets/logos/harvard.png",   alt: "Harvard Business School" },
  { src: "assets/logos/imd.png",       alt: "IMD" },
  { src: "assets/logos/uhelsinki.png", alt: "University of Helsinki" },
];

const CompanyStrip = () => {
  const items = [...LOGOS, ...LOGOS]; // duplicate for seamless loop
  return (
    <div style={{
      background: "var(--jj-paper-2)",
      borderRadius: 18,
      padding: "30px 0",
      marginBottom: 6,
      overflow: "hidden",
      position: "relative",
    }}>
      <div
        className="jj-marquee jj-marquee--locked"
        style={{
          display: "flex",
          gap: 80,
          alignItems: "center",
          animation: "jj-marquee 55s linear infinite",
          width: "max-content",
          paddingLeft: 40,
        }}
      >
        {items.map((c, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 56,
            flexShrink: 0,
          }}>
            <img
              src={c.src}
              alt={c.alt}
              draggable={false}
              style={{
                height: 44,
                width: "auto",
                maxWidth: 200,
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
        position: "absolute", top: 0, bottom: 0, left: 0, width: 80,
        background: "linear-gradient(90deg, var(--jj-paper-2), transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: 80,
        background: "linear-gradient(270deg, var(--jj-paper-2), transparent)",
        pointerEvents: "none",
      }} />
    </div>
  );
};

window.CompanyStrip = CompanyStrip;
