/* App shell — view router with simple fade transitions, persists view + auth.

   Signing in lands straight on the personal profile. There used to be a
   Landing screen in between that did nothing but offer a choice of two
   pages; the CV is now reachable from the profile's top bar instead. */

const VIEWS = ["public", "login", "cv"];

const App = () => {
  const [view, setView] = React.useState(() => {
    const isAuthed = localStorage.getItem("jj-authed") === "1";
    if (isAuthed) {
      const saved = localStorage.getItem("jj-view");
      return VIEWS.includes(saved) ? saved : "public";
    }
    return "login";
  });
  const [authed, setAuthed] = React.useState(() => localStorage.getItem("jj-authed") === "1");
  const [fade, setFade] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("jj-view", view);
  }, [view]);

  const go = (next) => {
    if (next === view) return;
    setFade(true);
    setTimeout(() => {
      setView(next);
      requestAnimationFrame(() => setFade(false));
    }, 180);
  };

  const onLoginSuccess = () => {
    setAuthed(true);
    localStorage.setItem("jj-authed", "1");
    setFade(true);
    setTimeout(() => {
      setView("public");
      requestAnimationFrame(() => setFade(false));
    }, 180);
  };

  const signOut = () => {
    setAuthed(false);
    localStorage.removeItem("jj-authed");
    go("login");
  };

  let screen;
  if (view === "public") screen = <PublicView go={go} />;
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
