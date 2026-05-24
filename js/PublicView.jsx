/* PublicView — the about / get-to-know page.
   Business-tilted but warm. World map shows the abroad-with-family
   journey (CPH → AMS → GVA → Espoo). Casual photo lives bottom-right
   of the hero. */

const PublicView = ({ go }) => {
  const isMobile = useIsMobile();
  return (
    <div style={{ minHeight: "100vh", padding: "0 18px 24px", position: "relative" }}>
      <Toast />

      <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%" }}>

        <Topbar
          right={
            <div style={{ display: "flex", gap: 8 }}>
              <Pill onClick={() => go("landing")}>← Back</Pill>
              <Pill tone="filled" onClick={() => go("login")}>The CV →</Pill>
            </div>
          }
        />

        {/* ============ HERO ============ */}
        <section style={{
          background: "var(--jj-paper-2)",
          borderRadius: 18,
          padding: isMobile ? "36px 20px 36px" : "56px 40px 56px",
          marginBottom: 6,
          position: "relative",
          overflow: "hidden",
          minHeight: isMobile ? "auto" : 420,
        }}>
          {/* Hero copy block — constrained to ~70% so the photo on the right has room */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: isMobile ? "100%" : "70%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <Eyebrow style={{ fontWeight: 600 }}>
                <Asterisk size={14} /> &nbsp;About me
              </Eyebrow>
            </div>

            <h1 style={{
              fontFamily: "var(--jj-display)",
              fontWeight: 700,
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 0.93,
              letterSpacing: "-0.04em",
              margin: 0,
              maxWidth: "16ch",
            }}>
              <span style={{ animation: "jj-fade 700ms var(--jj-ease) both" }}>Hi, I'm Joni.</span><br />
              <span style={{
                color: "var(--jj-muted)",
                animation: "jj-fade 1000ms var(--jj-ease) both",
                animationDelay: "400ms",
                display: "inline-block",
              }}>
                CFO in energy.<br />International by habit.
              </span>
            </h1>

            <p style={{
              fontSize: 14, lineHeight: 1.55, color: "var(--jj-ink-2)",
              maxWidth: "52ch", marginTop: 26,
              animation: "jj-fade 800ms var(--jj-ease) both", animationDelay: "700ms",
            }}>
              Seven years of senior finance work across <strong>Denmark, the Netherlands and Switzerland</strong> —
              Siemens Wind, then Neste. A year travelling the world before that.
              Back in Espoo since 2020, now CFO at TVO. Long-horizon capital programmes,
              green finance, transformations measured in years, not quarters.
            </p>

            <div style={{
              marginTop: 30,
              display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center",
              animation: "jj-fade 800ms var(--jj-ease) both", animationDelay: "900ms",
            }}>
              <Button onClick={() => { const el = document.getElementById('jj-book'); if (el) window.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' }); }}>
                Book a call
              </Button>
              <Button variant="ghost" onClick={() => { const el = document.getElementById('jj-touch'); if (el) window.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' }); }}>
                Drop a note
              </Button>
              <span style={{ marginLeft: 10, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--jj-muted)" }}>
                or just scroll
              </span>
            </div>
          </div>

          {/* Casual photo, bottom-right corner */}
          <div style={{
            display: isMobile ? "none" : "block",
            position: "absolute",
            right: 32,
            bottom: 28,
            width: "clamp(140px, 18vw, 220px)",
            aspectRatio: "0.86 / 1",
            borderRadius: 18,
            overflow: "hidden",
            zIndex: 1,
            transform: "rotate(2.2deg)",
            border: "1px solid var(--jj-ink)",
            background: "var(--jj-warm)",
            animation: "jj-fade 1100ms var(--jj-ease) both",
            animationDelay: "600ms",
          }}>
            <img
              src="assets/joni-casual.jpg"
              alt="Joni, off the clock"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", bottom: 8, left: 10,
              fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase",
              color: "var(--jj-paper-2)",
              background: "rgba(10,10,10,0.55)",
              padding: "3px 7px",
              borderRadius: 4,
              backdropFilter: "blur(2px)",
            }}>
              Off the clock
            </div>
          </div>
        </section>

        {/* ============ COMPANY STRIP ============ */}
        <CompanyStrip />

        {/* ============ WHERE I AM NOW ============ */}
        <section style={{ background: "var(--jj-paper-2)", borderRadius: 18, padding: isMobile ? "24px 20px 28px" : "28px 40px 32px", marginBottom: 6 }}>
          <SectionHead num="01" />
          <H2 soft="now.">Where I am</H2>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.32fr 0.68fr", gap: 28, marginTop: 18, alignItems: "start" }}>
            <div>
              <Eyebrow muted style={{ display: "block", marginBottom: 8 }}>Role</Eyebrow>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Chief Financial Officer</div>
              <div style={{ fontSize: 11, color: "var(--jj-muted)" }}>TVO, Teollisuuden Voima Oyj</div>

              <Eyebrow muted style={{ display: "block", marginTop: 24, marginBottom: 8 }}>Based</Eyebrow>
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                Espoo, Finland. On an island you can drive onto.
              </div>
            </div>

            <div>
              <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0 }}>
                I lead finance for a company that generates roughly{" "}
                <strong style={{ fontWeight: 600 }}>30% of Finland's electricity</strong>.
                Before this, nine years at Neste across Switzerland and the Netherlands;
                before that, offshore wind in Denmark at Siemens, and a longer run at Fortum back home.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--jj-ink-2)", marginTop: 14 }}>
                The work is long-horizon. Capital programmes measured in billions,
                payback measured in decades, business cases that have to stay
                honest through three rounds of political weather. I like that.
              </p>
            </div>
          </div>
        </section>

        {/* ============ WORLD MAP ============ */}
        <section style={{
          background: "var(--jj-ink)",
          color: "var(--jj-paper-2)",
          borderRadius: 18,
          padding: isMobile ? "24px 20px 28px" : "32px 40px 36px",
          marginBottom: 6,
          overflow: "hidden",
          position: "relative",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <Eyebrow tone="on-dark">A working life on the map</Eyebrow>
            <div style={{ fontFamily: "var(--jj-display)", fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 32px)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>02</div>
          </div>
          <H2 dark soft="and home.">Seven years abroad</H2>

          <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "rgba(255,255,255,0.75)", margin: "12px 0 24px", maxWidth: "66ch" }}>
            <strong style={{ color: "white", fontWeight: 600 }}>Billund → Rotterdam → Geneva.</strong>{" "}
            Siemens Wind in Billund. Then Neste in Rotterdam — we lived in Kijkduin and I biked in.
            Then Neste in Geneva, with a one-week IMD stint in Lausanne while we were there.
            Home to Espoo in 2020.
          </p>

          <WorldMap />

          {/* Journey legend — chronological legs */}
          <div style={{
            marginTop: 24,
            display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12,
          }}>
            {window.JJ_JOURNEY.map((leg, i) => (
              <div key={i} style={{
                paddingTop: 12,
                borderTop: "1px solid rgba(255,255,255,0.18)",
              }}>
                <div style={{
                  fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)", marginBottom: 6,
                }}>
                  Leg {String(i + 1).padStart(2, "0")} · {leg.years}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.015em" }}>
                  {leg.from} → {leg.to}
                </div>
              </div>
            ))}
          </div>

          {/* Elsewhere — short stints off-map */}
          <div style={{ marginTop: 26 }}>
            <Eyebrow tone="on-dark" style={{ display: "block", marginBottom: 12 }}>
              Elsewhere · short stints, off-map
            </Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3, 1fr)", gap: 12 }}>
              {window.JJ_ELSEWHERE.map((e, i) => (
                <div key={i} style={{
                  padding: "12px 14px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 12,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>
                    {e.name}, {e.country}
                  </div>
                  <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>
                    {e.label}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 14, fontSize: 11.5, lineHeight: 1.55, color: "rgba(255,255,255,0.6)", maxWidth: "66ch" }}>
              Plus a year on the road — a family trip around the world before settling abroad for work.
            </p>
          </div>
        </section>

        {/* ============ WHAT I WORK ON ============ */}
        <section style={{ background: "var(--jj-paper-2)", borderRadius: 18, padding: isMobile ? "24px 20px 28px" : "28px 40px 32px", marginBottom: 6 }}>
          <SectionHead num="03" />
          <H2 soft="on.">What I work</H2>
          <Lede style={{ marginTop: 4, marginBottom: 22 }}>
            Three things take most of my attention right now.
          </Lede>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 16 }}>
            {[
              { num: "01", title: "Green finance",            body: "TVO's European Green Bond programme — the sector's first EUGBS-aligned bond (€500M, 2025). The 2026 framework adds green bank loans.", photo: "assets/photos/green-finance.jpg", photoPos: "center 35%" },
              { num: "02", title: "Enterprise transformation", body: "An ops + finance + IT programme designed to land €130M+ in recurring annual value. Mine to deliver.",                                                                                  photo: "assets/photos/transformation.jpg", photoPos: "center center" },
              { num: "03", title: "Capital planning",          body: "Multi-billion-euro capital programmes — business cases that survive long-horizon energy-asset economics.",                                                                            photo: "assets/photos/capital.jpg",        photoPos: "center 40%" },
            ].map(c => (
              <div key={c.num} style={{
                borderRadius: 24,
                aspectRatio: isMobile ? "1.6 / 1" : "0.68 / 1",
                position: "relative",
                overflow: "hidden",
                background: "#0A0A0A",
                color: "var(--jj-paper-2)",
              }}>
                <img
                  src={c.photo}
                  alt=""
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    objectPosition: c.photoPos,
                    opacity: 0.85,
                  }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 45%, rgba(10,10,10,0.85) 100%)",
                }} />
                <div style={{
                  position: "absolute", top: 22, right: 22,
                  width: 22, height: 22,
                  border: "1px solid rgba(255,255,255,0.9)",
                  borderRadius: "50%",
                  display: "grid", placeItems: "center",
                  fontSize: 10,
                  color: "var(--jj-paper-2)",
                  background: "rgba(10,10,10,0.35)",
                }}>↗</div>
                <div style={{
                  position: "absolute", inset: 0,
                  padding: "24px 22px 26px",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}>
                  <div style={{
                    fontFamily: "var(--jj-display)", fontWeight: 700, fontSize: isMobile ? 32 : 56,
                    letterSpacing: "-0.04em", lineHeight: 1,
                    color: "var(--jj-paper-2)",
                    textShadow: "0 1px 14px rgba(0,0,0,0.4)",
                  }}>{c.num}</div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>{c.title}</div>
                    <p style={{ fontSize: 11, lineHeight: 1.5, color: "rgba(255,255,255,0.85)", margin: 0 }}>{c.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ TIMELINE — clean, no green dots ============ */}
        <section style={{ background: "var(--jj-paper-2)", borderRadius: 18, padding: isMobile ? "24px 20px 28px" : "28px 40px 32px", marginBottom: 6 }}>
          <SectionHead num="04" />
          <H2 soft="been.">Where I've</H2>
          <Lede style={{ marginTop: 4, marginBottom: 22 }}>
            Fifteen years of senior finance leadership across power, renewables, wind, and clean tech.
          </Lede>

          <div>
            {[
              ["2025 — Now",   "Chief Financial Officer",                          "TVO. Finland."],
              ["2020 — 2025",  "VP Business Finance",                              "Neste. Finland."],
              ["2016 — 2020",  "VP Business Finance / General Manager",            "Neste. Switzerland, Netherlands."],
              ["2015 — 2016",  "Head of Performance Control & Business Partner",   "Siemens Wind Power. Denmark."],
              ["2010 — 2015",  "Head of Planning & Reporting",                     "Fortum Power and Heat. Finland."],
              ["Pre-2010",     "Earlier roles — controller, analyst",              "WinWind. Nokia / NSN."],
            ].map(([when, what, where], i) => (
              isMobile ? (
                <div key={i} style={{ padding: "10px 0", borderTop: i === 0 ? "0" : "1px solid rgba(0,0,0,0.12)" }}>
                  <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.06em", color: "var(--jj-muted)", marginBottom: 3 }}>{when}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "-0.015em", marginBottom: 1 }}>{what}</div>
                  <div style={{ fontSize: 11, color: "var(--jj-muted)" }}>{where}</div>
                </div>
              ) : (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "140px 1fr auto",
                  gap: 16, alignItems: "baseline",
                  padding: "10px 0",
                  borderTop: i === 0 ? "0" : "1px solid rgba(0,0,0,0.12)",
                }}>
                  <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.04em" }}>{when}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.015em" }}>{what}</span>
                  <span style={{ fontSize: 11, color: "var(--jj-muted)", textAlign: "right" }}>{where}</span>
                </div>
              )
            ))}
          </div>

        </section>

        {/* ============ BOOK A CALL ============ */}
        <div id="jj-book"><BookACall /></div>

        {/* ============ GET IN TOUCH ============ */}
        <div id="jj-touch"><GetInTouch /></div>

        {/* ============ CLOSING ============ */}
        <section style={{
          background: "var(--jj-ink)",
          color: "var(--jj-paper-2)",
          borderRadius: 18,
          padding: isMobile ? "24px 20px 28px" : "30px 40px 32px",
          marginBottom: 6,
        }}>
          <SectionHead num="07" dark />
          <H2 dark soft="hello.">Say</H2>
          <p style={{ fontSize: 14, color: "var(--jj-paper-2)", margin: "16px 0 22px", maxWidth: "56ch", lineHeight: 1.5 }}>
            Boards, recruiters, ex-colleagues, founders building in energy — I read every email.
            Slowest reply is about a week.
          </p>

          <div style={{
            display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 12,
            paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.18)",
          }}>
            {[
              ["Email", "joni@juuri.me"],
              ["LinkedIn", "/in/joni-juuri-4431334"],
              ["Location", "Espoo, Finland"],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ textAlign: "center", marginTop: 12, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--jj-muted)" }}>
          <Asterisk size={12} /> &nbsp; Joni Juuri · 2026
        </div>
      </div>
    </div>
  );
};

window.PublicView = PublicView;
