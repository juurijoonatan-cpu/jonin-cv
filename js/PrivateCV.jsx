/* PrivateCV — the CV itself.
   This page is the on-screen twin of assets/Joni_Juuri_CV.pdf: same content,
   same order, same document furniture. It is set as one sheet of paper with
   sections divided by rules, not as a stack of themed cards, because a CV
   has to read as a document rather than as another page of the site. */

/* ---------- Document furniture ---------- */

/* A section: a heavy rule, then the heading, then the content. */
const CvSection = ({ title, soft, children, first, whole }) => (
  <section className={"jj-sec" + (whole ? " jj-sec--whole" : "")} style={{
    borderTop: first ? 0 : "1.5px solid var(--jj-ink)",
    marginTop: first ? 0 : 26,
    paddingTop: first ? 0 : 16,
  }}>
    <H2 soft={soft} style={{ marginBottom: 0 }}>{title}</H2>
    {children}
  </section>
);

/* Uppercase micro-label. Set once here so every label on the sheet tracks
   and sizes identically. */
const Micro = ({ children, style }) => {
  const m = useIsMobile();
  return (
    <div style={{
      fontSize: m ? 9.5 : 8.5,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--jj-muted)",
      ...style,
    }}>
      {children}
    </div>
  );
};

/* The figure that carries a role. Outlined, not filled: a CV with four solid
   black blocks down it prints badly and reads as marketing. */
const StatBox = ({ value, desc }) => {
  const m = useIsMobile();
  return (
    <div className="jj-stat" style={{
      border: "1px solid var(--jj-ink)",
      borderRadius: 10,
      padding: m ? "12px 14px 13px" : "13px 16px 14px",
      margin: "10px 0 12px",
    }}>
      <div style={{
        fontFamily: "var(--jj-display)",
        fontWeight: 700,
        fontSize: m ? 18 : 20,
        lineHeight: 1.1,
        letterSpacing: "-0.03em",
        marginBottom: 5,
      }}>
        {value}
      </div>
      <div className="jj-stat-desc" style={{
        fontSize: m ? 12 : 11.5,
        lineHeight: 1.45,
        color: "var(--jj-ink-2)",
      }}>
        {desc}
      </div>
    </div>
  );
};

const Bullets = ({ items }) => {
  const m = useIsMobile();
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((b, i) => (
        <li key={i} style={{
          position: "relative",
          paddingLeft: 16,
          fontSize: m ? 12 : 11.5,
          lineHeight: 1.5,
          color: "var(--jj-ink-2)",
        }}>
          <span aria-hidden style={{ position: "absolute", left: 0, color: "var(--jj-muted)" }}>–</span>
          {b}
        </li>
      ))}
    </ul>
  );
};

/* One role, or one board seat. Dates in the left column on a laptop, above
   the title on a phone. */
const Role = ({ dates, title, title2, company, stat, bullets, first }) => {
  const m = useIsMobile();
  return (
    <div className="jj-role" style={{
      display: "grid",
      gridTemplateColumns: m ? "1fr" : "112px 1fr",
      gap: m ? 4 : 18,
      padding: "12px 0 14px",
      borderTop: first ? 0 : "1px solid var(--jj-hairline)",
    }}>
      <div style={{
        fontSize: m ? 10 : 9.5,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        fontWeight: 600,
        color: "var(--jj-ink-2)",
        paddingTop: m ? 0 : 2,
      }}>
        {dates}
      </div>

      <div>
        <h3 style={{
          fontFamily: "var(--jj-display)",
          fontWeight: 700,
          fontSize: m ? 14 : 14.5,
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          margin: 0,
        }}>
          {title}
        </h3>
        {title2 && (
          <h3 style={{
            fontFamily: "var(--jj-display)",
            fontWeight: 700,
            fontSize: m ? 14 : 14.5,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            margin: 0,
          }}>
            {title2}
          </h3>
        )}
        {company && (
          <p style={{
            fontSize: m ? 12 : 11.5,
            lineHeight: 1.4,
            color: "var(--jj-muted)",
            margin: "3px 0 0",
          }}>
            {company}
          </p>
        )}

        {stat && <StatBox value={stat.value} desc={stat.desc} />}
        {bullets && <div style={{ marginTop: stat ? 0 : 8 }}><Bullets items={bullets} /></div>}
      </div>
    </div>
  );
};

/* A qualification: short key, what it is, where it was. */
const QualRow = ({ k, title, meta, first }) => {
  const m = useIsMobile();
  return (
    <div className="jj-row" style={{
      display: "grid",
      gridTemplateColumns: m ? "52px 1fr" : "52px 1fr auto",
      gap: m ? 10 : 12,
      alignItems: "baseline",
      padding: "9px 0",
      borderTop: first ? 0 : "1px solid var(--jj-hairline)",
    }}>
      <span style={{
        fontFamily: "var(--jj-display)",
        fontWeight: 600,
        fontSize: m ? 11 : 10.5,
        letterSpacing: "0.04em",
        color: "var(--jj-muted)",
      }}>{k}</span>
      <div>
        <div style={{ fontSize: m ? 12.5 : 12, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.35 }}>
          {title}
        </div>
        {m && meta && (
          <div style={{ fontSize: 11, color: "var(--jj-muted)", marginTop: 2, lineHeight: 1.35 }}>{meta}</div>
        )}
      </div>
      {!m && (
        <span style={{ fontSize: 11, color: "var(--jj-muted)", textAlign: "right", lineHeight: 1.35 }}>
          {meta}
        </span>
      )}
    </div>
  );
};

/* ---------- Share link ---------- */

const ShareLinkButton = () => {
  const [copied, setCopied] = React.useState(false);
  const link = (typeof window !== "undefined" && window.JJ_SHARE_LINK) || "";

  const copy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        /* Older browsers, and any page not served over https. */
        const ta = document.createElement("textarea");
        ta.value = link;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (_) {
      /* If copying is refused, show the link so it can be selected by hand. */
      window.prompt("Share link", link);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      style={{
        background: "transparent",
        border: "1px solid var(--jj-ink)",
        borderRadius: 999,
        padding: "8px 16px",
        fontSize: 9.5,
        fontWeight: 500,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: copied ? "var(--jj-ink)" : "var(--jj-ink)",
        opacity: copied ? 0.6 : 1,
        cursor: "pointer",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "Link copied" : "Copy share link"}
    </button>
  );
};

/* ---------- Content ---------- */

const EXPERTISE = [
  "Nuclear & Energy Infrastructure Finance",
  "Capital Projects & Project Finance",
  "Debt, Bonds & Treasury",
  "Capital Allocation & Investment Decisions",
  "M&A, Joint Ventures & Commercial Agreements",
  "Planning, Forecasting & Performance",
  "Board, Owner & Lender Relations",
  "IFRS, Audit & Internal Control",
  "Financial Risk Management",
  "Finance, Data & AI Transformation",
];

const PROJECTS = [
  {
    label: "TVO",
    title: "€5.5B debt portfolio",
    body: "Treasury, bonds and bank funding for the nuclear fleet, including the sector's first green bond under the EU Green Bond Standard.",
  },
  {
    label: "TVO & Posiva",
    title: "Nuclear life extension",
    body: "Member of the committee for the plant lifetime extension of OL1 and OL2. Owner oversight of Posiva, the world's first final repository for spent nuclear fuel.",
  },
  {
    label: "Neste",
    title: "Two new refineries",
    body: "Capital projects for two new renewable refineries, alongside M&A and a joint venture in the US.",
  },
  {
    label: "Siemens Wind",
    title: "Multi-billion SPV projects",
    body: "Offshore wind projects of €0.5 to 1.3B each, delivered to SPV project companies under EPC and supply contracts.",
  },
];

const CONTACT = [
  ["Location", "Espoo, Finland"],
  ["Phone", "+358 40 338 0559"],
  ["Email", "joni@juuri.me"],
  ["LinkedIn", "/in/joni-juuri-4431334"],
];

/* ---------- The page ---------- */

const PrivateCV = ({ go, signOut }) => {
  const m = useIsMobile();

  return (
    <div className="jj-sheet" style={{ padding: m ? "0 14px 24px" : "0 18px 28px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", width: "100%" }}>

        {/* Site chrome. Prints away. */}
        <div className="jj-chrome" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          padding: "14px 0 10px",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600,
            whiteSpace: "nowrap",
          }}>
            <Asterisk />
            <span>Joni Juuri</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <Pill as="a" className="jj-nudge" href="assets/Joni_Juuri_CV.pdf" download="Joni_Juuri_CV.pdf" style={{ whiteSpace: "nowrap" }}>
              {m ? "PDF" : "Download CV (PDF)"}
            </Pill>
            <Pill onClick={() => go("public")} style={{ whiteSpace: "nowrap" }}>← Back</Pill>
          </div>
        </div>

        {/* The document */}
        <article className="jj-doc" style={{
          background: "var(--jj-paper-2)",
          borderRadius: 18,
          padding: m ? "26px 20px 28px" : "40px 48px 44px",
        }}>

          {/* ---- Masthead ---- */}
          <header>
            <p style={{ fontSize: m ? 13 : 13.5, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: m ? 8 : 10 }}>
              Joni Juuri
            </p>

            <div style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: m ? 16 : 32,
            }}>
              <div style={{ minWidth: 0 }}>
                <h1 style={{
                  fontFamily: "var(--jj-display)",
                  fontWeight: 700,
                  fontSize: m ? "clamp(32px, 11vw, 44px)" : "clamp(38px, 4.6vw, 50px)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.04em",
                  margin: "0 0 12px",
                }}>
                  Chief<br />Financial<br />Officer.
                </h1>

                <p style={{ fontSize: m ? 12.5 : 12.5, lineHeight: 1.45, color: "var(--jj-ink-2)" }}>
                  Nuclear Energy &amp; Critical Infrastructure.
                </p>
                <p style={{ fontSize: m ? 12.5 : 12.5, lineHeight: 1.45, color: "var(--jj-ink-2)" }}>
                  Capital Projects, Life Extension &amp; Project Finance.
                </p>
              </div>

              {/* Portrait, and under it the one thing a reader wants next:
                  when he can start. */}
              <div style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: m ? 10 : 16,
              }}>
                <div style={{
                  width: m ? 78 : 112,
                  height: m ? 78 : 112,
                  borderRadius: "50%",
                  border: "1px solid var(--jj-ink)",
                  background: "var(--jj-warm)",
                  overflow: "hidden",
                }}>
                  <img
                    src="assets/joni-headshot.png"
                    alt="Joni Juuri"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                  />
                </div>
                {!m && (
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "-0.01em" }}>Three months' notice.</p>
                    <p style={{ fontSize: 12.5, color: "var(--jj-muted)" }}>Open to immediate international relocation.</p>
                  </div>
                )}
              </div>
            </div>

            {m && (
              <div style={{ marginTop: 14 }}>
                <p style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "-0.01em" }}>Three months' notice.</p>
                <p style={{ fontSize: 12.5, color: "var(--jj-muted)" }}>Open to immediate international relocation.</p>
              </div>
            )}

            {/* Contact strip, ruled above and below like the PDF. */}
            <div style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: m ? "12px 14px" : 14,
              marginTop: m ? 18 : 24,
              padding: m ? "12px 0" : "13px 0",
              borderTop: "1px solid var(--jj-ink)",
              borderBottom: "1px solid var(--jj-ink)",
            }}>
              {CONTACT.map(([k, v]) => (
                <div key={k}>
                  <Micro style={{ marginBottom: 4 }}>{k}</Micro>
                  <span style={{ fontSize: m ? 12.5 : 12.5, fontWeight: 500, letterSpacing: "-0.005em" }}>{v}</span>
                </div>
              ))}
            </div>
          </header>

          {/* ---- Executive summary ---- */}
          <section className="jj-sec" style={{ marginTop: m ? 22 : 26 }}>
            <H2 soft="summary." style={{ marginBottom: 0 }}>Executive</H2>
            <p style={{
              fontSize: m ? 14 : 14.5,
              fontWeight: 600,
              letterSpacing: "-0.015em",
              lineHeight: 1.35,
              margin: "12px 0 8px",
            }}>
              A heavyweight CFO for capital-intensive energy, ready for the next step.
            </p>
            <p style={{ fontSize: m ? 12.5 : 12.5, lineHeight: 1.6, color: "var(--jj-ink-2)", maxWidth: "76ch" }}>
              Twenty years of financing and running large assets and projects, from offshore wind
              and renewable refineries to nuclear. Curious by nature and driven by continuous
              improvement. I build AI-native finance and processes that make operations safer and
              create lasting value for owners.
            </p>
          </section>

          {/* ---- Projects & financing ---- */}
          <CvSection whole title="Projects &" soft="financing.">
            <div style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "1fr 1fr",
              gap: m ? 10 : 12,
              marginTop: 14,
            }}>
              {PROJECTS.map(p => (
                <div key={p.title} className="jj-proj" style={{
                  border: "1px solid var(--jj-hairline)",
                  borderRadius: 10,
                  padding: m ? "13px 15px 15px" : "14px 18px 16px",
                }}>
                  <Micro style={{ marginBottom: 7 }}>{p.label}</Micro>
                  <div style={{
                    fontFamily: "var(--jj-display)",
                    fontWeight: 700,
                    fontSize: m ? 14.5 : 15,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.2,
                    marginBottom: 6,
                  }}>
                    {p.title}
                  </div>
                  <p style={{ fontSize: m ? 12 : 11.5, lineHeight: 1.5, color: "var(--jj-ink-2)" }}>{p.body}</p>
                </div>
              ))}
            </div>
          </CvSection>

          {/* ---- Areas of expertise ---- */}
          <CvSection title="Areas of" soft="expertise.">
            <div style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "1fr 1fr",
              columnGap: m ? 0 : 36,
              marginTop: 12,
            }}>
              {EXPERTISE.map((label, i) => (
                <div key={label} style={{
                  padding: "8px 0",
                  borderTop: (m ? i === 0 : i < 2) ? 0 : "1px solid var(--jj-hairline)",
                  display: "flex", alignItems: "baseline", gap: 12,
                }}>
                  <span style={{
                    fontFamily: "var(--jj-display)", fontWeight: 600, fontSize: 10,
                    letterSpacing: "0.04em", color: "var(--jj-muted)", minWidth: 20,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: m ? 12.5 : 12, fontWeight: 500, letterSpacing: "-0.015em", lineHeight: 1.35 }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </CvSection>

          {/* ---- Professional experience ---- */}
          <CvSection title="Professional" soft="experience.">
            <div style={{ marginTop: 10 }}>
              <Role
                first
                dates="2025–present"
                title="Chief Financial Officer"
                company="TVO, Teollisuuden Voima Oyj. Finland."
                stat={{
                  value: "€130M additional owner value",
                  desc: "Created and now hold full accountability for an enterprise transformation programme delivering roughly €130M in additional recurring owner value per year across operations, finance and IT.",
                }}
                bullets={[
                  "Responsible for finance, treasury, risk, commercial and procurement, and data and digital. Close partner to the CEO and the Board.",
                  "In 2025 TVO issued a €500M bond aligned with the European Green Bond Standard, with 99.8% of turnover and 100% of taxonomy-relevant CapEx and OpEx aligned. In 2026 the framework was extended to green bank loans.",
                  "Stage-gated investment decisions and business cases for long-term operation, generator modernisation and uprates.",
                  "Finance side of the Mankala cost-price model, where the owners take the electricity at cost. Reporting to the Board, owners and lenders, and funding oversight of Posiva.",
                  "Took Microsoft Copilot Cowork from 0 to 100% coverage across TVO, with a clear ROI.",
                ]}
              />
              <Role
                dates="2016–2025"
                title="Vice President, Business Finance"
                title2="General Manager / Managing Director, Neste Switzerland"
                company="Neste. Switzerland, Netherlands and Finland. €11B trading position and crude oil supply."
                stat={{
                  value: "Neste NEXT",
                  desc: "Senior finance leadership role in the group-wide Neste NEXT transformation, reshaping operating model, capital allocation discipline, and performance frameworks across business units.",
                }}
                bullets={[
                  "Business cases, project control and financing for the two refinery investments, and finance work on the M&A and the US joint venture.",
                  "Led financial operations and planning through nine years of international growth, building a finance organisation of about 80 Business Controllers and Finance Directors in several countries.",
                  "Led finance transformation with a new FP&A platform, management reporting and decision support. Statutory and IFRS compliance through international expansion. Owned Board and Executive Committee communications.",
                ]}
              />
              <Role
                dates="2015–2016"
                title="Head of Performance Control & Business Partner"
                company="Siemens Wind. Denmark."
                stat={{
                  value: "Profit recovery",
                  desc: "Senior finance leader in the Siemens Wind profit recovery programme, restoring margins across the offshore project portfolio.",
                }}
                bullets={[
                  "Led cross-regional teams in performance control, cost management and business-case validation for offshore wind projects sold to SPV project companies.",
                  "Improved project profitability, financial modelling and capital allocation through stricter stress-testing of business cases.",
                ]}
              />
              <Role
                dates="2010–2014"
                title="Head of Planning & Reporting"
                company="Fortum Power and Heat Oy. Finland."
                bullets={[
                  "Finance for several CHP plant projects globally, including net working capital and cash flow management.",
                  "Standardised planning and reporting across several countries for a €7B group, with new BI tools and better data governance.",
                ]}
              />
              <Role
                dates="Pre-2010"
                title="Senior Business Controller. Demand Fulfilment Analyst. Business Analyst."
                company="WinWind. Nokia Oyj / Nokia Siemens Networks. Finland."
              />
            </div>
          </CvSection>

          {/* ---- Education & programs ---- */}
          <CvSection whole title="Education &" soft="programs.">
            <div style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "1fr 1fr",
              gap: m ? 24 : 40,
              marginTop: 14,
              alignItems: "start",
            }}>
              <div>
                <Micro style={{ marginBottom: 8 }}>Education</Micro>
                <QualRow first k="M.Sc." title={<>Master of Social Sciences,<br />Economics</>} meta={<>University of Helsinki<br />Finland</>} />
                <QualRow k="P.G." title={<>Postgraduate Certificate<br />in Distribution Logistics</>} meta={<>Universidad de Valencia<br />Spain</>} />
                <QualRow k="Exch." title={<>Economics,<br />Erasmus exchange</>} meta={<>University of Essex<br />United Kingdom</>} />
              </div>
              <div>
                <Micro style={{ marginBottom: 8 }}>Executive education &amp; certifications</Micro>
                <QualRow first k="2026" title="Effective Boards Program"  meta="Harvard Business School" />
                <QualRow k="2025" title="CFO Program"                     meta="Harvard Business School" />
                <QualRow k="2023" title="Positive Psychology Coach"       meta="PPC Certification" />
                <QualRow k="2017" title="Future is Now Leadership"        meta="IMD Lausanne" />
              </div>
            </div>
          </CvSection>

          {/* ---- Board & affiliations ---- */}
          <CvSection whole title="Board &" soft="affiliations.">
            <div style={{ marginTop: 10 }}>
              <Role first dates="2026–present" title="Board Member" company="Posiva Solutions Oy. Finland." />
              <Role
                dates="2009–2022"
                title="Chairman of the Board / Founder"
                company="New Energy Finland Oy. Investment and advisory firm focused on clean technology."
                bullets={[
                  "Founded and chaired the firm. Led portfolio development and exits, including the IPO and exit from Nightingale Health (2021).",
                ]}
              />
              <Role dates="2016–2020" title="Member of the Boards" company="Neste Switzerland, Neste Netherlands and Neste Belgium." />
              <Role dates="2017–2018" title="Board Member & Treasurer" company="Finnish-Dutch Chamber of Commerce." />
            </div>
          </CvSection>

          {/* ---- Tools & languages ---- */}
          <CvSection whole title="Tools &" soft="languages.">
            <div style={{
              display: "grid",
              gridTemplateColumns: m ? "1fr" : "1fr 1fr",
              gap: m ? 20 : 40,
              marginTop: 14,
              alignItems: "start",
            }}>
              <div>
                <Micro style={{ marginBottom: 6 }}>Systems &amp; tools</Micro>
                <p style={{ fontSize: m ? 12.5 : 12, lineHeight: 1.5, color: "var(--jj-ink-2)" }}>
                  Hyperion (HFM), SmartView, Anaplan, SAP, IFS, Procountor, Microsoft 365 and Fabric,
                  BI tooling, applied AI.
                </p>
                <Micro style={{ margin: "14px 0 6px" }}>Methodologies</Micro>
                <p style={{ fontSize: m ? 12.5 : 12, lineHeight: 1.5, color: "var(--jj-ink-2)" }}>
                  Executive coaching, strategy methodologies, change management.
                </p>
              </div>
              <div>
                <Micro style={{ marginBottom: 6 }}>Languages</Micro>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "7px 24px", fontSize: m ? 12.5 : 12,
                }}>
                  <div><strong style={{ fontWeight: 600 }}>Finnish</strong> <span style={{ color: "var(--jj-muted)" }}>native</span></div>
                  <div><strong style={{ fontWeight: 600 }}>English</strong> <span style={{ color: "var(--jj-muted)" }}>fluent</span></div>
                  <div><strong style={{ fontWeight: 600 }}>Swedish</strong> <span style={{ color: "var(--jj-muted)" }}>working</span></div>
                  <div><strong style={{ fontWeight: 600 }}>Spanish</strong> <span style={{ color: "var(--jj-muted)" }}>basic</span></div>
                </div>
              </div>
            </div>
          </CvSection>
        </article>

        {/* Site chrome again: the two ways to pass this on. Outside the
            document, because neither belongs in a CV someone forwards. */}
        <div className="jj-chrome" style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 14,
          padding: m ? "0 4px" : "0 6px",
        }}>
          <p style={{ fontSize: 11.5, color: "var(--jj-muted)", margin: 0 }}>
            Pass this on with a link that needs no password, or send the PDF.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <ShareLinkButton />
            <Pill as="a" href="assets/Joni_Juuri_CV.pdf" download="Joni_Juuri_CV.pdf" style={{ whiteSpace: "nowrap" }}>
              Download CV (PDF)
            </Pill>
          </div>
        </div>
      </div>
    </div>
  );
};

window.PrivateCV = PrivateCV;
