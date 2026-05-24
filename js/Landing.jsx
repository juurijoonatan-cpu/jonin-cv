/* Landing — the gate. Two large choice cards. Reframed: the second card is
   an "invitation-only CV" not a feature-behind-locks. No drifting paths. */

const Landing = ({ go }) => {
  const isMobile = useIsMobile();

  return (
    <div style={{ minHeight: "100vh", padding: "0 18px 24px", position: "relative" }}>
      <Toast />

      <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%" }}>

        <Topbar right={<Pill>2026</Pill>} />

        {/* Hero band — calm + faint background paths on the right side only */}
        <section style={{
          background: "var(--jj-paper-2)",
          borderRadius: 18,
          padding: isMobile ? "40px 20px 40px" : "70px 40px 60px",
          marginBottom: 6,
          position: "relative",
          overflow: "hidden",
          minHeight: 360,
        }}>
          {/* Subtle background paths — only on the right 45%, very low opacity */}
          <div style={{
            position: "absolute",
            top: 0, right: 0, bottom: 0,
            width: "45%",
            pointerEvents: "none",
            WebkitMaskImage: "linear-gradient(to left, black 40%, transparent 100%)",
                    maskImage: "linear-gradient(to left, black 40%, transparent 100%)",
          }} aria-hidden>
            <BackgroundPathsLayer opacity={0.32} />
          </div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <Eyebrow muted style={{ display: "block", marginBottom: 18 }}>
              Joni Juuri · Personal site
            </Eyebrow>

            <h1 style={{
              fontFamily: "var(--jj-display)",
              fontWeight: 700,
              fontSize: "clamp(44px, 7vw, 96px)",
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
              margin: 0,
              maxWidth: "14ch",
            }}>
              <span style={{
                display: "inline-block",
                animation: "jj-fade 700ms var(--jj-ease) both",
              }}>
                Hello —
              </span>
              <br />
              <span style={{
                display: "inline-block",
                animation: "jj-rise 800ms var(--jj-ease-out) both",
                animationDelay: "180ms",
              }}>I'm Joni.</span>
              <br />
              <span style={{
                color: "var(--jj-muted)",
                animation: "jj-fade 1000ms var(--jj-ease) both",
                animationDelay: "500ms",
                display: "inline-block",
              }}>
                Come in.
              </span>
            </h1>

            <p style={{
              fontSize: 14,
              color: "var(--jj-ink-2)",
              marginTop: 22,
              maxWidth: "60ch",
              lineHeight: 1.5,
              animation: "jj-fade 800ms var(--jj-ease) both",
              animationDelay: "900ms",
            }}>
              A small site for friends, recruiters and boards. Two doors.
              One opens to a quick get-to-know-me, the other to the full CV — by invitation only.
              Either is fine.
            </p>
          </div>

          <div style={{
            position: "absolute", top: 18, right: 18, zIndex: 2,
            width: 26, height: 26,
            border: "1px solid var(--jj-ink)", borderRadius: "50%",
            display: "grid", placeItems: "center", fontSize: 12,
            transform: "rotate(135deg)",
            background: "var(--jj-paper-2)",
          }}>↗</div>
        </section>

        {/* Two choice cards */}
        <section style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 6 }}>
          <ChoiceCard
            eyebrow="01 · Get to know"
            title="The about."
            body="A few notes on where I'm from, where I've worked, what I'm working on now, and how to reach me. Open to anyone."
            footnote="Public · come in"
            onClick={() => go("public")}
            style={{ animation: "jj-fade 800ms var(--jj-ease) both", animationDelay: "1100ms" }}
          />
          <ChoiceCard
            dark
            eyebrow="02 · By invitation"
            title="The CV."
            body="Full executive CV. Phone, role detail, marquee numbers, board positions. For people I've sent an invitation to — or who write and ask."
            footnote="Invitation only"
            onClick={() => go("cv")}
            style={{ animation: "jj-fade 800ms var(--jj-ease) both", animationDelay: "1300ms" }}
          />
        </section>

        {/* Quick contact strip */}
        <section style={{
          background: "var(--jj-paper-2)",
          borderRadius: 18,
          padding: isMobile ? "16px 20px 18px" : "18px 40px 20px",
          marginTop: 6,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 10 }}>
            {[
              ["Based in", "Espoo, Finland"],
              ["At", "TVO · CFO"],
              ["Reach", "joni@juuri.me"],
              ["Or", "Book a call"],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--jj-muted)", marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ textAlign: "center", marginTop: 12, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--jj-muted)" }}>
          <Asterisk size={12} /> &nbsp; Joni Juuri · 2026 · All rights reserved
        </div>
      </div>
    </div>
  );
};

window.Landing = Landing;
