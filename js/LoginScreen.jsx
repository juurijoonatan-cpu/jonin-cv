/* LoginScreen — cloud face that follows cursor and shuts eyes on password. */

const LoginScreen = ({ go, onSuccess }) => {
  const isMobile = useIsMobile();
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(() => {
      if (name.trim().length > 0 && password === "Jonij140804!") {
        localStorage.setItem("jj-visitor-name", name.trim());
        onSuccess();
      } else {
        setError("Incorrect password.");
        setLoading(false);
      }
    }, 450);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "0 18px 24px", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%" }}>

        <Topbar />

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 6, minHeight: isMobile ? "auto" : "76vh" }}>

          {/* Left — dark statement with cloud face */}
          <section style={{
            background: "var(--jj-ink)",
            color: "var(--jj-paper-2)",
            borderRadius: 18,
            padding: isMobile ? "24px 20px" : "36px 40px 36px",
            display: isMobile ? "none" : "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Eyebrow tone="on-dark">
                <Asterisk size={14} /> &nbsp;Restricted access
              </Eyebrow>
              <div style={{
                width: 26, height: 26, border: "1px solid var(--jj-paper-2)",
                borderRadius: "50%", display: "grid", placeItems: "center",
              }}>
                <LockGlyph />
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <CloudFace typing={typing || password.length > 0} />
              <h2 style={{
                fontFamily: "var(--jj-display)",
                fontWeight: 700,
                fontSize: "clamp(30px, 4vw, 44px)",
                lineHeight: 0.94,
                letterSpacing: "-0.04em",
                margin: 0,
                maxWidth: "16ch",
                textAlign: "center",
              }}>
                Access
                <span style={{ color: "rgba(255,255,255,0.45)" }}> by invitation.</span>
              </h2>
              <p style={{
                marginTop: 18, fontSize: 12.5, lineHeight: 1.5,
                color: "rgba(255,255,255,0.75)", maxWidth: "44ch",
                margin: "18px auto 0", textAlign: "center",
              }}>
                Enter the password you were sent. To request access, write to{" "}
                <span style={{ color: "white" }}>joni@juuri.me</span>.
              </p>
            </div>

            <div style={{
              position: "relative", zIndex: 2,
              paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.18)",
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
            }}>
              <div>
                <div style={{ fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>Access for</div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>Boards, recruiters, former colleagues</div>
              </div>
              <div>
                <div style={{ fontSize: 8.5, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>Updated</div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>2026 · v.04</div>
              </div>
            </div>
          </section>

          {/* Right — form */}
          <section style={{
            background: "var(--jj-paper-2)",
            borderRadius: 18,
            padding: isMobile ? "28px 20px 24px" : "40px 40px 36px",
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Eyebrow muted>Sign in</Eyebrow>
              <div style={{ fontFamily: "var(--jj-display)", fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 32px)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>02</div>
            </div>

            <form onSubmit={handleSubmit} style={{ margin: "44px 0 0" }}>
              <h3 style={{
                fontFamily: "var(--jj-display)",
                fontWeight: 700,
                fontSize: 28,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                margin: "0 0 28px",
              }}>
                Sign in.
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <Field
                  label="Your name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Full name"
                  autoComplete="name"
                  autoFocus
                />
                <Field
                  label="Password"
                  type="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setTyping(true);
                    clearTimeout(window.__jj_typing);
                    window.__jj_typing = setTimeout(() => setTyping(false), 600);
                  }}
                  autoComplete="current-password"
                  error={error}
                  hint={null}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 32 }}>
                <Button type="submit" disabled={loading || !password || !name.trim()}>
                  {loading ? "Signing in…" : "Sign in"}
                </Button>
              </div>
            </form>

            <div style={{
              marginTop: "auto", paddingTop: 14, borderTop: "1px solid rgba(0,0,0,0.12)",
              fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--jj-muted)", textAlign: "center",
            }}>
              Encrypted connection
            </div>
          </section>
        </div>

        <div style={{ textAlign: "center", marginTop: 12, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--jj-muted)" }}>
          <Asterisk size={12} /> &nbsp; Joni Juuri · 2026
        </div>
      </div>
    </div>
  );
};

window.LoginScreen = LoginScreen;
