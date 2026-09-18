/* GetInTouch — the collapsible message form.

   No chrome and no toggle button of its own: both live with the contact
   section in PublicView, so the toggle can sit on the same row as the other
   action instead of being pushed onto its own line by this wrapper. */

/* Same Web3Forms key used for the login-notification email in LoginScreen. */
const WEB3FORMS_KEY_TOUCH = "02d289c3-66d9-4b55-9f91-5dd2b00b7f1e";

const GetInTouch = ({ open, dark }) => {
  const isMobile = useIsMobile();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [reason, setReason] = React.useState("general");
  const [msg, setMsg] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState("");

  const reasons = [
    { id: "general",   label: "General enquiry"     },
    { id: "role",      label: "Executive search"    },
    { id: "board",     label: "Board or advisory"   },
    { id: "press",     label: "Press"               },
  ];

  const line  = dark ? "rgba(255,255,255,0.45)" : "var(--jj-ink)";
  const label = dark ? "rgba(255,255,255,0.55)" : "var(--jj-muted)";
  const ink   = dark ? "var(--jj-paper-2)" : "var(--jj-ink)";

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY_TOUCH,
          subject: `[juuri.me] ${reasons.find(r => r.id === reason)?.label || reason}`,
          from_name: "juuri.me contact form",
          name,
          email,
          message: msg,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || `Request failed (${res.status})`);
      }
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setName(""); setEmail(""); setMsg(""); setReason("general");
    } catch (err) {
      setSending(false);
      setError(err.message || "Could not send. Email joni@juuri.me directly.");
    }
  };

  return (
      <div className={`jj-collapse${open ? " jj-collapse--open" : ""}`}>
      <div>
      <form onSubmit={onSubmit} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 22 : 28, paddingTop: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Field dark={dark} label="Your name" value={name} onChange={e => setName(e.target.value)} />
          <Field dark={dark} label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />

          <div>
            <div style={{
              fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
              color: label, marginBottom: 10,
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
                      border: `1px solid ${dark ? "var(--jj-paper-2)" : "var(--jj-ink)"}`,
                      background: active ? (dark ? "var(--jj-paper-2)" : "var(--jj-ink)") : "transparent",
                      color: active ? (dark ? "var(--jj-ink)" : "var(--jj-paper-2)") : ink,
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
            color: label, marginBottom: 10,
          }}>
            Message
          </div>
          <textarea
            value={msg}
            onChange={e => setMsg(e.target.value)}
            rows={isMobile ? 5 : 7}
            placeholder="Brief is fine."
            style={{
              border: 0,
              borderBottom: `1px solid ${line}`,
              background: "transparent",
              padding: "8px 0",
              fontSize: 14,
              fontFamily: "var(--jj-body)",
              color: ink,
              outline: "none",
              resize: "vertical",
              lineHeight: 1.5,
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, gap: 12 }}>
            <span style={{
              fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
              color: error ? "#E08585" : sent ? "#6EE7B7" : label,
              transition: "color 240ms var(--jj-ease)",
              maxWidth: "60%",
            }}>
              {error ? error : sent ? "Sent." : "Encrypted in transit"}
            </span>
            <Button type="submit" variant={dark ? "onDark" : "primary"} disabled={sending || !name || !email || !msg}>
              {sending ? "Sending…" : "Send"}
            </Button>
          </div>
        </div>
      </form>
      </div>
      </div>
  );
};

window.GetInTouch = GetInTouch;
