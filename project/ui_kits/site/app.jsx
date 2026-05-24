/* App shell — view router with simple fade transitions, persists view + auth. */

const VIEWS = ["landing", "public", "login", "cv"];

const App = () => {
  const [view, setView] = React.useState(() => {
    const saved = localStorage.getItem("jj-view");
    return VIEWS.includes(saved) ? saved : "landing";
  });
  const [authed, setAuthed] = React.useState(() => localStorage.getItem("jj-authed") === "1");
  const [fade, setFade] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("jj-view", view);
  }, [view]);

  const go = (next) => {
    if (next === view) return;
    // Gate: cv requires auth
    if (next === "cv" && !authed) { setView("login"); return; }
    setFade(true);
    setTimeout(() => {
      setView(next);
      requestAnimationFrame(() => setFade(false));
    }, 180);
  };

  const onLoginSuccess = () => {
    setAuthed(true);
    localStorage.setItem("jj-authed", "1");
    // Bypass the gate in go() — we just authed but state hasn't flushed yet.
    setFade(true);
    setTimeout(() => {
      setView("cv");
      requestAnimationFrame(() => setFade(false));
    }, 180);
  };

  const signOut = () => {
    setAuthed(false);
    localStorage.removeItem("jj-authed");
    go("landing");
  };

  let screen;
  if (view === "landing") screen = <Landing go={go} />;
  else if (view === "public") screen = <PublicView go={go} />;
  else if (view === "login") screen = <LoginScreen go={go} onSuccess={onLoginSuccess} />;
  else if (view === "cv") screen = <PrivateCV go={go} signOut={signOut} />;

  return (
    <div
      className="jj"
      style={{
        opacity: fade ? 0 : 1,
        transition: "opacity 180ms var(--jj-ease)",
        minHeight: "100vh",
      }}
    >
      {screen}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
