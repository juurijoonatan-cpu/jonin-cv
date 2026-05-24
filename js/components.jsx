/* Shared primitives for the Joni Juuri site UI kit. */

const Asterisk = ({ size = 18, style }) => (
  <span className="jj-star" style={{ fontSize: size, lineHeight: 1, ...style }}>✱</span>
);

const Eyebrow = ({ children, muted, tone, style, className }) => (
  <span
    className={"jj-eyebrow " + (className || "")}
    style={{
      fontSize: 10,
      fontWeight: 500,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: tone === "on-dark"
        ? "rgba(255,255,255,0.55)"
        : muted ? "var(--jj-muted)" : "var(--jj-ink)",
      ...style,
    }}
  >
    {children}
  </span>
);

const Pill = ({ children, tone = "ink", as = "div", onClick, style, ...rest }) => {
  const Tag = as;
  const isInk = tone === "ink";
  const isFilled = tone === "filled";
  return (
    <Tag
      onClick={onClick}
      className="jj-pill"
      style={{
        border: isFilled ? "1px solid var(--jj-ink)" : `1px solid ${isInk ? "var(--jj-ink)" : "var(--jj-paper-2)"}`,
        background: isFilled ? "var(--jj-ink)" : "transparent",
        color: isFilled ? "var(--jj-paper-2)" : (isInk ? "var(--jj-ink)" : "var(--jj-paper-2)"),
        padding: "6px 14px",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: onClick ? "pointer" : "default",
        transition: "opacity 140ms var(--jj-ease)",
        textDecoration: "none",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const Card = ({ dark, children, style, className = "", id }) => (
  <section
    id={id}
    className={"jj-card " + className}
    style={{
      background: dark ? "var(--jj-ink)" : "var(--jj-paper-2)",
      color: dark ? "var(--jj-paper-2)" : "var(--jj-ink)",
      borderRadius: 18,
      padding: "20px 40px 22px",
      marginBottom: 6,
      position: "relative",
      ...style,
    }}
  >
    {children}
  </section>
);

const SectionHead = ({ num, dark }) => (
  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
    <div
      style={{
        fontFamily: "var(--jj-display)",
        fontWeight: 700,
        fontSize: "clamp(22px, 2.8vw, 32px)",
        lineHeight: 0.9,
        letterSpacing: "-0.04em",
        color: dark ? "var(--jj-paper-2)" : "var(--jj-ink)",
      }}
    >
      {num}
    </div>
  </div>
);

const H2 = ({ children, soft, dark, style }) => (
  <h2
    style={{
      fontFamily: "var(--jj-display)",
      fontWeight: 700,
      fontSize: "clamp(17px, 2.2vw, 22px)",
      lineHeight: 1,
      letterSpacing: "-0.025em",
      marginBottom: 3,
      color: dark ? "var(--jj-paper-2)" : "var(--jj-ink)",
      ...style,
    }}
  >
    {children}
    {soft && (
      <span style={{ color: dark ? "rgba(255,255,255,0.45)" : "var(--jj-muted)", fontWeight: 700 }}>
        {" "}{soft}
      </span>
    )}
  </h2>
);

const Lede = ({ children, dark, style }) => (
  <p
    style={{
      fontSize: 11,
      lineHeight: 1.4,
      color: dark ? "rgba(255,255,255,0.75)" : "var(--jj-ink-2)",
      maxWidth: "72ch",
      ...style,
    }}
  >
    {children}
  </p>
);

const MarqueeStat = ({ label, value, desc }) => (
  <div
    style={{
      background: "var(--jj-ink)",
      color: "var(--jj-paper-2)",
      borderRadius: 8,
      padding: "6px 12px 7px",
      margin: "3px 0 4px",
    }}
  >
    <div style={{ fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>
      {label}
    </div>
    <div style={{
      fontFamily: "var(--jj-display)",
      fontWeight: 700,
      fontSize: "clamp(22px, 2.8vw, 28px)",
      lineHeight: 1,
      letterSpacing: "-0.04em",
      marginBottom: 3,
    }}>
      {value}
    </div>
    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.85)", lineHeight: 1.38 }}>
      {desc}
    </div>
  </div>
);

const Topbar = ({ right }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 0 10px",
      fontSize: 10,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--jj-ink)",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600 }}>
      <Asterisk />
      <span>Joni Juuri</span>
    </div>
    <div>{right}</div>
  </div>
);

const Button = ({ children, onClick, variant = "primary", disabled, type = "button", style, ...rest }) => {
  const base = {
    fontFamily: "var(--jj-body)",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    padding: "12px 20px",
    borderRadius: 999,
    border: "1px solid var(--jj-ink)",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "opacity 140ms var(--jj-ease), transform 100ms var(--jj-ease)",
    opacity: disabled ? 0.4 : 1,
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
  };
  const variants = {
    primary: { background: "var(--jj-ink)", color: "var(--jj-paper-2)" },
    ghost:   { background: "transparent",   color: "var(--jj-ink)" },
    onDark:  { background: "var(--jj-paper-2)", color: "var(--jj-ink)", border: "1px solid var(--jj-paper-2)" },
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
};

const Field = ({ label, type = "text", value, onChange, placeholder, autoFocus, autoComplete, error, hint }) => (
  <label style={{ display: "block" }}>
    <div style={{
      fontSize: 9,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "var(--jj-muted)",
      marginBottom: 8,
    }}>
      {label}
    </div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      style={{
        width: "100%",
        background: "transparent",
        border: 0,
        borderBottom: error ? "1px solid #C84343" : "1px solid var(--jj-ink)",
        padding: "8px 0 10px",
        fontFamily: "var(--jj-body)",
        fontSize: 16,
        color: "var(--jj-ink)",
        outline: "none",
        letterSpacing: "-0.005em",
      }}
    />
    {hint && (
      <div style={{ fontSize: 10, color: "var(--jj-muted)", marginTop: 8, letterSpacing: "0.04em" }}>
        {hint}
      </div>
    )}
    {error && (
      <div style={{ fontSize: 10, color: "#C84343", marginTop: 8, letterSpacing: "0.04em" }}>
        {error}
      </div>
    )}
  </label>
);

const ChoiceCard = ({ eyebrow, title, soft, body, footnote, locked, onClick, dark, style }) => (
  <button
    onClick={onClick}
    className="jj-choice"
    style={{
      textAlign: "left",
      background: dark ? "var(--jj-ink)" : "var(--jj-paper-2)",
      color: dark ? "var(--jj-paper-2)" : "var(--jj-ink)",
      border: 0,
      borderRadius: 18,
      padding: "28px 32px 28px",
      cursor: "pointer",
      transition: "transform 240ms var(--jj-ease-out), opacity 140ms var(--jj-ease)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: 360,
      fontFamily: "var(--jj-body)",
      ...style,
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <Eyebrow tone={dark ? "on-dark" : undefined}>{eyebrow}</Eyebrow>
      <div
        style={{
          width: 28, height: 28,
          border: `1px solid ${dark ? "var(--jj-paper-2)" : "var(--jj-ink)"}`,
          borderRadius: "50%",
          display: "grid", placeItems: "center",
          fontSize: 12,
          color: dark ? "var(--jj-paper-2)" : "var(--jj-ink)",
          transform: locked ? "none" : "rotate(0deg)",
        }}
        aria-hidden
      >
        {locked ? <LockGlyph /> : "↗"}
      </div>
    </div>

    <div style={{ marginTop: 60 }}>
      <h3 style={{
        fontFamily: "var(--jj-display)",
        fontWeight: 700,
        fontSize: "clamp(32px, 4.2vw, 52px)",
        lineHeight: 0.92,
        letterSpacing: "-0.04em",
        margin: 0,
      }}>
        {title}
        {soft && (
          <span style={{ color: dark ? "rgba(255,255,255,0.45)" : "var(--jj-muted)" }}>{soft}</span>
        )}
      </h3>
      <p style={{
        marginTop: 18,
        fontSize: 12,
        lineHeight: 1.45,
        color: dark ? "rgba(255,255,255,0.75)" : "var(--jj-ink-2)",
        maxWidth: "32ch",
      }}>
        {body}
      </p>
    </div>

    <div style={{
      marginTop: 32,
      paddingTop: 14,
      borderTop: `1px solid ${dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)"}`,
      fontSize: 9.5,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,0.55)" : "var(--jj-muted)",
      display: "flex",
      justifyContent: "space-between",
    }}>
      <span>{footnote}</span>
      <span>{locked ? "Login required" : "Open"}</span>
    </div>
  </button>
);

const LockGlyph = () => (
  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="0.75" y="5.75" width="9.5" height="6.5" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M2.5 5.5V3.5C2.5 1.84315 3.84315 0.5 5.5 0.5C7.15685 0.5 8.5 1.84315 8.5 3.5V5.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const ArrowGlyph = ({ direction = "right" }) => {
  const rotation = { right: 0, up: -90, left: 180, down: 90, "up-right": -45 }[direction] || 0;
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: `rotate(${rotation}deg)` }} aria-hidden>
      <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
};

Object.assign(window, {
  Asterisk, Eyebrow, Pill, Card, SectionHead, H2, Lede, MarqueeStat,
  Topbar, Button, Field, ChoiceCard, LockGlyph, ArrowGlyph,
});
