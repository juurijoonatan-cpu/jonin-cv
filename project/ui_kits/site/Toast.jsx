/* Toast — soft "Open to senior international roles" notification that
   slides in from the top-right after a delay. Dismissible. */

const Toast = ({ delay = 1400 }) => {
  const [visible, setVisible] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(() => sessionStorage.getItem("jj-toast-dismissed") === "1");

  React.useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay, dismissed]);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => {
      setDismissed(true);
      sessionStorage.setItem("jj-toast-dismissed", "1");
    }, 240);
  };

  if (dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        top: 18,
        right: 18,
        zIndex: 80,
        background: "var(--jj-ink)",
        color: "var(--jj-paper-2)",
        borderRadius: 16,
        padding: "14px 14px 14px 16px",
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        maxWidth: 360,
        boxShadow: "0 12px 40px -20px rgba(0,0,0,0.45)",
        transform: visible ? "translateY(0)" : "translateY(-120%)",
        opacity: visible ? 1 : 0,
        transition: "transform 480ms var(--jj-ease-out), opacity 240ms var(--jj-ease)",
        fontFamily: "var(--jj-body)",
      }}
    >
      <div style={{ marginTop: 5 }}>
        <span
          className="jj-pulse-dot"
          style={{
            display: "block",
            width: 10, height: 10,
            borderRadius: "50%",
            background: "var(--jj-status-go)",
          }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          marginBottom: 5,
        }}>
          Status · just in
        </div>
        <div style={{
          fontSize: 12.5,
          lineHeight: 1.4,
          fontWeight: 500,
        }}>
          Open to senior international roles.
          <span style={{ color: "rgba(255,255,255,0.65)", fontWeight: 400 }}>
            {" "}Three months' notice.
          </span>
        </div>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss notification"
        style={{
          background: "transparent",
          border: 0,
          color: "rgba(255,255,255,0.65)",
          cursor: "pointer",
          padding: 4,
          marginTop: 1,
          fontSize: 14,
          lineHeight: 1,
          fontFamily: "inherit",
        }}
      >
        ×
      </button>
    </div>
  );
};

window.Toast = Toast;
