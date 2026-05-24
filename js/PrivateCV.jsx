/* PrivateCV — full-fidelity CV, ported from Joni_Juuri_CV.html.
   Adds a thin signed-in top bar with sign-out + download. */

const Role = ({ dates, sub, title, company, stat, bullets, dark }) => {
  const isMobile = useIsMobile();
  return (
  <div style={{
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "120px 1fr",
    gap: isMobile ? 6 : 16,
    padding: "10px 0",
    borderTop: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
  }}>
    <div style={{
      fontSize: 9.5,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,0.6)" : "var(--jj-muted)",
    }}>
      <span style={{ fontWeight: 600, color: dark ? "var(--jj-paper-2)" : "var(--jj-ink)", display: "block", marginBottom: 2, fontSize: 11 }}>{dates}</span>
      {sub}
    </div>
    <div>
      <h3 style={{
        fontFamily: "var(--jj-display)",
        fontWeight: 700,
        fontSize: 13.5,
        lineHeight: 1.2,
        letterSpacing: "-0.015em",
        margin: "0 0 2px",
        color: dark ? "var(--jj-paper-2)" : "var(--jj-ink)",
      }}>{title}</h3>
      <p style={{
        fontSize: 10.5,
        color: dark ? "rgba(255,255,255,0.6)" : "var(--jj-muted)",
        margin: "0 0 6px",
      }}>{company}</p>

      {stat && (
        <div style={{ marginTop: 6, marginBottom: 4 }}>
          <div style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: dark ? "rgba(255,255,255,0.5)" : "var(--jj-muted)", marginBottom: 5 }}>
            {stat.label}
          </div>
          <MarqueeStat value={stat.value} desc={stat.desc} />
        </div>
      )}

      {bullets && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 3 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{
              position: "relative",
              paddingLeft: 14,
              fontSize: 10.5,
              lineHeight: 1.4,
              color: dark ? "var(--jj-paper-2)" : "var(--jj-ink-2)",
            }}>
              <span style={{
                position: "absolute",
                left: 0, top: "0.6em",
                width: 8, height: 1,
                background: dark ? "var(--jj-paper-2)" : "var(--jj-ink)",
              }} />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  );
};

const ListRow = ({ year, title, meta, dark }) => {
  const isMobile = useIsMobile();
  return (
  <div style={{
    display: "grid",
    gridTemplateColumns: isMobile ? "48px 1fr" : "48px 1fr auto",
    gap: 12,
    alignItems: "baseline",
    padding: "8px 0",
    borderTop: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
  }}>
    <span style={{
      fontFamily: "var(--jj-display)",
      fontWeight: 600,
      fontSize: 10.5,
      letterSpacing: "0.04em",
      color: dark ? "rgba(255,255,255,0.55)" : "var(--jj-muted)",
    }}>{year}</span>
    <div>
      <div style={{
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: "-0.015em",
        lineHeight: 1.25,
        color: dark ? "var(--jj-paper-2)" : "var(--jj-ink)",
      }}>{title}</div>
      {isMobile && meta && (
        <div style={{ fontSize: 10, letterSpacing: "0.04em", color: dark ? "rgba(255,255,255,0.55)" : "var(--jj-muted)", marginTop: 2 }}>{meta}</div>
      )}
    </div>
    {!isMobile && (
      <span style={{
        fontSize: 10,
        letterSpacing: "0.04em",
        color: dark ? "rgba(255,255,255,0.55)" : "var(--jj-muted)",
        textAlign: "right",
      }}>{meta}</span>
    )}
  </div>
  );
};

const PrivateCV = ({ go, signOut }) => {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: "0 18px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%" }}>

        {/* Signed-in chrome */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 0 10px",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600,
          }}>
            <Asterisk />
            <span>Joni Juuri</span>
            <span style={{
              marginLeft: 8,
              fontSize: 9,
              padding: "3px 8px",
              border: "1px solid var(--jj-status-go)",
              color: "#1F8A5B",
              borderRadius: 999,
              letterSpacing: "0.18em",
              fontWeight: 500,
            }}>
              Signed in
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Pill as="a" href="assets/Joni_Juuri_CV.pdf" download="Joni_Juuri_CV.pdf">Download CV (PDF)</Pill>
            <Pill onClick={() => go("landing")}>← Back</Pill>
          </div>
        </div>

        {/* HERO */}
        <section style={{
          background: "var(--jj-paper-2)",
          borderRadius: 18,
          padding: isMobile ? "16px 20px 18px" : "16px 40px 18px",
          position: "relative",
          overflow: "hidden",
          marginBottom: 5,
        }}>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600 }}>
              <Asterisk />
              <span>Joni Juuri</span>
            </div>
            <div style={{ border: "1px solid var(--jj-ink)", padding: "6px 14px", borderRadius: 999 }}>2026</div>
          </div>

          <h1 style={{
            fontFamily: "var(--jj-display)",
            fontWeight: 700,
            fontSize: "clamp(30px, 4.6vw, 44px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            margin: "0 0 10px",
          }}>
            Chief<br />Financial<br />Officer.
          </h1>

          <p style={{ fontSize: 11.5, color: "var(--jj-ink-2)", marginBottom: 1, letterSpacing: "-0.005em" }}>Energy &amp; Critical Infrastructure.</p>
          <p style={{ fontSize: 11.5, color: "var(--jj-ink-2)", marginBottom: 1, letterSpacing: "-0.005em" }}>Transformation &amp; Sustainable Business Cases.</p>

          <div style={{
            marginTop: 12,
            display: "inline-flex", alignItems: "center", gap: 16,
            background: "var(--jj-ink)", color: "var(--jj-paper-2)",
            borderRadius: 999, padding: "7px 18px 7px 14px",
            fontSize: 11.5, fontWeight: 500, letterSpacing: "-0.005em",
          }}>
            <span className="jj-pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--jj-status-go)" }} />
            <span><strong style={{ fontWeight: 600 }}>Open to senior international roles.</strong> &nbsp;·&nbsp; Three months' notice.</span>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 10,
            paddingTop: 12, borderTop: "1px solid var(--jj-ink)", marginTop: 14,
          }}>
            {[
              ["Location", "Espoo, Finland"],
              ["Phone", "+358 40 338 0559"],
              ["Email", "joni@juuri.me"],
              ["LinkedIn", "/in/joni-juuri-4431334"],
            ].map(([k, v]) => (
              <div key={k}>
                <span style={{ fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--jj-muted)", marginBottom: 3, display: "block" }}>{k}</span>
                <span style={{ fontSize: 11.5, color: "var(--jj-ink)", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 01 — Executive Summary */}
        <Card>
          <SectionHead num="01" />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.32fr 0.68fr", gap: 18, alignItems: "start" }}>
            <div>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                border: "1px solid var(--jj-ink)",
                background: "var(--jj-warm)",
                overflow: "hidden",
              }}>
                <img
                  src="assets/joni-headshot.png"
                  alt="Joni Juuri"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <p style={{ marginTop: 14, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--jj-muted)" }}>Availability</p>
              <p style={{ fontSize: 12, fontWeight: 500, marginTop: 4 }}>Three months' notice.</p>
              <p style={{ fontSize: 12, fontWeight: 500 }}>Open to international relocation.</p>
            </div>
            <div>
              <H2 soft="summary.">Executive</H2>
              <Lede style={{ marginTop: 6 }}>
                Strategic CFO with 15+ years of senior finance leadership across the global energy sector.
                Currently steering finance, strategy, and transformation for one of Finland's largest power
                producers, generating approximately 30% of national electricity.
              </Lede>
              <Lede style={{ marginTop: 4 }}>
                Combines deep energy infrastructure and large-scale capital-asset knowledge with a proven record of leading
                multi-jurisdictional finance transformations and constructing sustainable, decision-ready
                business cases for multi-billion-euro capital programs. Trusted board, owner, and investor
                partner experienced in IFRS, public-company readiness, project finance, and long-horizon capital planning.
              </Lede>
            </div>
          </div>
        </Card>

        {/* 02 — Competencies */}
        <Card>
          <SectionHead num="02" />
          <H2 soft="expertise.">Areas of</H2>
          <Lede style={{ marginTop: 3, marginBottom: 8 }}>
            Ten focus areas where I create durable value for shareholders, boards, and operators.
          </Lede>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {[
              "Energy & Infrastructure Finance",
              "Sustainable Business Case Development",
              "Capital Planning & Project Finance",
              "Finance & Digital Transformation",
              "Strategic Finance & Corporate Growth",
              "P&L Management & Forecasting",
              "Board, Investor & Stakeholder Relations",
              "IFRS, Compliance & Public-Company Readiness",
              "Risk Management & Due Diligence",
              "International & Cross-Functional Leadership",
            ].map((label, i) => (
              <div key={i} style={{
                padding: "4px 0",
                borderTop: i < 2 ? 0 : "1px solid rgba(0,0,0,0.12)",
                display: "flex", alignItems: "baseline", gap: 10,
              }}>
                <span style={{ fontFamily: "var(--jj-display)", fontWeight: 600, fontSize: 10, color: "var(--jj-muted)", minWidth: 22 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "-0.01em" }}>{label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 03 — Experience */}
        <Card>
          <SectionHead num="03" />
          <H2 soft="experience.">Professional</H2>
          <Lede style={{ marginTop: 10, marginBottom: 24 }}>
            Fifteen years of senior finance leadership across power generation, renewables, wind, and clean technology.
          </Lede>

          <Role
            dates="2025 — Present"
            sub="Current"
            title="Chief Financial Officer"
            company="TVO, Teollisuuden Voima Oyj. Finland."
            stat={{
              label: "Signature accountability",
              value: "€130M+",
              desc: "Created and now hold full accountability for an enterprise transformation programme delivering €130M+ in recurring annual value across operations, finance, and IT.",
            }}
            bullets={[
              "Lead financial strategy, operations, finance transformation, and IT for one of Finland's largest power producers, generating ~30% of national electricity. Full P&L responsibility, anchored in long-horizon energy-asset economics.",
              "Drive capital planning and infrastructure project-finance for multi-billion-euro programmes, building sustainable business cases that align operational, regulatory, and corporate-growth horizons.",
              "Hold CFO accountability for TVO's Green Finance programme: in 2025, TVO became the sector's first issuer of a European Green Bond Standard-aligned bond (€500M), with 99.8% of group turnover and 100% of taxonomy-relevant CapEx and OpEx aligned. The 2026 framework update extended sustainable financing to green bank loans. Serve as primary financial liaison to Board, owners, and key stakeholders.",
            ]}
          />
          <Role
            dates="2016 — 2025"
            sub="Nine years"
            title="Vice President, Business Finance / General Manager"
            company="Neste. Switzerland, Netherlands and Finland."
            stat={{
              label: "Signature accountability",
              value: "Neste NEXT",
              desc: "Senior finance leadership role in the group-wide Neste NEXT transformation, reshaping operating model, capital allocation discipline, and performance frameworks across business units.",
            }}
            bullets={[
              "Led financial operations and strategic planning for a global leader in renewable fuels and circular solutions through nine years of accelerated international growth.",
              "Built and led a finance organisation of approximately 80 Business Controllers and Finance Directors across multiple countries, partnering with the business to construct sustainable business cases for renewable-fuel growth investments.",
              "Led finance transformation across business units (advanced FP&A platform, redesigned management reporting, performance frameworks, decision-support tooling) and ensured statutory and IFRS compliance through significant international expansion. Owned Board and Executive Committee communications.",
            ]}
          />
          <Role
            dates="2015 — 2016"
            sub="Offshore wind"
            title="Head of Performance Control & Business Partner"
            company="Siemens Wind Power A/S. Denmark."
            stat={{
              label: "Signature accountability",
              value: "Profit recovery",
              desc: "Senior finance leader in the Siemens Wind Power profit recovery programme, restoring margins across offshore project portfolios valued at €500M to €1.3B.",
            }}
            bullets={[
              "Directed cross-regional teams in performance control, cost management, and business-case validation for large-scale offshore wind projects valued at €500M to €1.3B.",
              "Strengthened project profitability, financial modelling, and capital-allocation discipline through stricter business-case stress-testing. Provided senior counsel on resource planning, internal valuation, and project-controlling systems.",
            ]}
          />
          <Role
            dates="2010 — 2015"
            sub="Clean energy"
            title="Head of Planning & Reporting"
            company="Fortum Power and Heat Oy. Finland."
            bullets={[
              "Led the integration of advanced BI tools and the standardisation of financial reporting across multiple jurisdictions in the clean and low-carbon energy sector.",
              "Designed and implemented financial systems and processes, materially improving data governance and management reporting for a €7B group. Partnered with regional Finance Directors and executive leadership on strategic finance initiatives.",
            ]}
          />
          <Role
            dates="Pre-2010"
            sub="Early career"
            title="Senior Business Controller. Demand Fulfilment Analyst. Business Analyst."
            company="WinWind. Nokia Oyj / Nokia Siemens Networks. Finland."
          />
        </Card>

        {/* 04 — Education (dark) */}
        <Card dark>
          <SectionHead num="04" dark />
          <H2 dark soft="programs.">Education &amp;</H2>
          <Lede dark style={{ marginTop: 10, marginBottom: 24 }}>
            Formal education and a deliberate, ongoing investment in executive development.
          </Lede>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 28 : 40, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 14 }}>Education</p>
              <ListRow dark year="M.Sc." title={<>Master of Social Sciences,<br/>Economics</>} meta={<>University of Helsinki<br/>Finland</>} />
              <ListRow dark year="P.G." title={<>Postgraduate Certificate in<br/>Distribution Logistics</>} meta={<>Universidad de Valencia<br/>Spain</>} />
            </div>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 14 }}>Executive Education &amp; Certifications</p>
              <ListRow dark year="2026" title="Effective Boards Program"     meta="Harvard Business School" />
              <ListRow dark year="2025" title="CFO Program"                  meta="Harvard Business School" />
              <ListRow dark year="2023" title="Positive Psychology Coach"    meta="PPC Certification" />
              <ListRow dark year="2017" title="Future is Now Leadership"     meta="IMD Lausanne" />
            </div>
          </div>
        </Card>

        {/* 05 — Boards */}
        <Card>
          <SectionHead num="05" />
          <H2 soft="affiliations.">Board &amp;</H2>
          <Lede style={{ marginTop: 10, marginBottom: 18 }}>
            Governance roles across energy, clean technology, and bilateral commerce.
          </Lede>

          <Role dates="2026 — Present" sub="Current" title="Board Member" company="Posiva Solutions Oy. Finland." />
          <Role
            dates="2011 — 2023" sub="Founder"
            title="Chairman of the Board / Founder"
            company="New Energy Finland Oy. Investment and advisory firm focused on clean technology."
            bullets={[
              "Founded and chaired a clean-technology investment and advisory firm. Led portfolio development and exits, including the IPO and exit from Nightingale Health (2021).",
            ]}
          />
          <Role dates="2016 — 2020" sub="Subsidiary boards" title="Member of the Boards" company="Neste Switzerland, Neste Netherlands, and Neste Belgium." />
          <Role dates="2016 — 2018" sub="Treasurer" title="Board Member & Treasurer" company="Finnish-Dutch Chamber of Commerce." />
        </Card>

        {/* 06 — Tools & Languages */}
        <Card>
          <SectionHead num="06" />
          <H2 soft="languages.">Tools &amp;</H2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 6, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--jj-muted)", marginBottom: 3 }}>Systems &amp; tools</p>
              <p style={{ fontSize: 11, lineHeight: 1.45, color: "var(--jj-ink-2)" }}>
                Hyperion (HFM), SmartView, Anaplan, SAP, IFS, Procountor, Microsoft 365 and Fabric, BI tooling, applied AI.
              </p>
              <p style={{ fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--jj-muted)", margin: "10px 0 3px" }}>Methodologies</p>
              <p style={{ fontSize: 11, lineHeight: 1.45, color: "var(--jj-ink-2)" }}>
                Executive coaching, strategy methodologies, change management.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 9.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--jj-muted)", marginBottom: 6 }}>Languages</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 24px", fontSize: 11 }}>
                <div><strong>Finnish</strong> <span style={{ color: "var(--jj-muted)" }}>native</span></div>
                <div><strong>English</strong> <span style={{ color: "var(--jj-muted)" }}>fluent</span></div>
                <div><strong>Swedish</strong> <span style={{ color: "var(--jj-muted)" }}>working</span></div>
                <div><strong>Spanish</strong> <span style={{ color: "var(--jj-muted)" }}>basic</span></div>
              </div>
            </div>
          </div>
        </Card>

        {/* 07 — Closing dark */}
        <Card dark>
          <SectionHead num="07" dark />
          <H2 dark style={{ fontSize: 16, lineHeight: 1.15, marginBottom: 0 }}>
            Available with three months' notice.{" "}
            <span style={{ color: "rgba(255,255,255,0.45)" }}>Open to international relocation.</span>
          </H2>
          <div style={{
            display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12,
            marginTop: 14, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.18)",
          }}>
            {[
              ["Phone", "+358 40 338 0559"],
              ["Email", "joni@juuri.me"],
              ["LinkedIn", "/in/joni-juuri-4431334"],
              ["Location", "Espoo, Finland"],
            ].map(([k, v]) => (
              <div key={k}>
                <p style={{ fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 3 }}>{k}</p>
                <p style={{ fontSize: 11, fontWeight: 500, color: "var(--jj-paper-2)" }}>{v}</p>
              </div>
            ))}
          </div>
        </Card>

        <div style={{
          textAlign: "center", marginTop: 12, fontSize: 9,
          letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--jj-muted)",
        }}>
          Joni Juuri · The CV · 2026 · All Rights Reserved
        </div>
        <div style={{ textAlign: "center", marginTop: 6, fontSize: 8.5, letterSpacing: "0.12em", color: "var(--jj-muted)", opacity: 0.7 }}>
          Made with{" "}
          <a href="https://puuhapatet.fi/it" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}>
            Puuhapatet.fi/it
          </a>
          {" "}· Joonatan Juuri
        </div>
      </div>
    </div>
  );
};

window.PrivateCV = PrivateCV;
