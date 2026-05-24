/* GetInTouch — minimal form, in the same understated underline-only style. */

/* Same Web3Forms key as BookACall — paste it once in both files. */
const WEB3FORMS_KEY_TOUCH = "YOUR_KEY_HERE";

const GetInTouch = () => {
  const isMobile = useIsMobile();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [reason, setReason] = React.useState("hello");
  const [msg, setMsg] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    if (WEB3FORMS_KEY_TOUCH && WEB3FORMS_KEY_TOUCH !== "YOUR_KEY_HERE") {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY_TOUCH,
            subject: `[juuri.me] ${reasons.find(r => r.id === reason)?.label || reason}`,
            name,
            email,
            message: msg,
          }),
        });
      } catch (_) {}
    }
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setName(""); setEmail(""); setMsg(""); setReason("hello");
  };

  const reasons = [
    { id: "hello",     label: "Just saying hello"   },
    { id: "role",      label: "About a role"        },
    { id: "board",     label: "Board / advisory"    },
    { id: "press",     label: "Press / podcast"     },
  ];

  return (
    <section style={{
      background: "var(--jj-paper-2)",
      borderRadius: 18,
      padding: isMobile ? "24px 20px 28px" : "28px 40px 32px",
      marginBottom: 6,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <Eyebrow muted>Get in touch</Eyebrow>
        <div style={{ fontFamily: "var(--jj-display)", fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 32px)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>06</div>
      </div>
      <H2 soft="a note.">Drop me</H2>
      <Lede style={{ marginTop: 6, marginBottom: 22 }}>
        Or email directly: <strong>joni@juuri.me</strong>. Slowest reply is about a week.
      </Lede>

      <form onSubmit={onSubmit} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 22 : 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Field label="Your name" value={name} onChange={e => setName(e.target.value)} />
          <Field label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />

          <div>
            <div style={{
              fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
              color: "var(--jj-muted)", marginBottom: 10,
            }}>
              Topic
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {reasons.map(r => {
                const active = reason === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setReason(r.id)}
                    style={{
                      border: "1px solid var(--jj-ink)",
                      background: active ? "var(--jj-ink)" : "transparent",
                      color: active ? "var(--jj-paper-2)" : "var(--jj-ink)",
                      padding: "6px 12px",
                      borderRadius: 999,
                      fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
                      fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                      transition: "background 140ms var(--jj-ease)",
                    }}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{
            fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--jj-muted)", marginBottom: 10,
          }}>
            Message
          </div>
          <textarea
            value={msg}
            onChange={e => setMsg(e.target.value)}
            rows={isMobile ? 5 : 7}
            placeholder="Two sentences is plenty."
            style={{
              border: 0,
              borderBottom: "1px solid var(--jj-ink)",
              background: "transparent",
              padding: "8px 0",
              fontSize: 14,
              fontFamily: "var(--jj-body)",
              color: "var(--jj-ink)",
              outline: "none",
              resize: "vertical",
              lineHeight: 1.5,
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 }}>
            <span style={{
              fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
              color: sent ? "#1F8A5B" : "var(--jj-muted)",
              transition: "color 240ms var(--jj-ease)",
            }}>
              {sent ? "✓ Sent · I'll reply within a week" : "Encrypted in transit"}
            </span>
            <Button type="submit" disabled={sending || !name || !email || !msg}>
              {sending ? "Sending…" : <> Send <ArrowGlyph /></>}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

window.GetInTouch = GetInTouch;
