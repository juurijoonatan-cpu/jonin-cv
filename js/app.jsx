/* App shell — view router with simple fade transitions, persists view + auth.

   Signing in lands straight on the personal profile. There used to be a
   Landing screen in between that did nothing but offer a choice of two
   pages; the CV is now reachable from the profile's top bar instead. */

const VIEWS = ["public", "login", "cv"];

/* Share link. Opening juuri.me/?k=<INVITE_KEY> signs the visitor straight in,
   so Joni can send the link on its own without also passing the password
   around. The token is then dropped from the address bar and the session is
   remembered like any other, which keeps it out of screenshots and browser
   history entries people might paste somewhere.

   This is convenience, not security: anyone holding the link is in. That is
   the intent, and it is the same trust assumption as sharing the password. */
const INVITE_KEY = "SDR0oTrk5jD7";

const consumeInviteLink = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("k") !== INVITE_KEY) return false;
    localStorage.setItem("jj-authed", "1");
    params.delete("k");
    const qs = params.toString();
    window.history.replaceState({}, "", window.location.pathname + (qs ? "?" + qs : ""));
    return true;
  } catch (_) {
    return false;
  }
};

/* Checked once, before the first render, so an invited visitor never sees the gate. */
const ARRIVED_BY_INVITE = consumeInviteLink();

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

  /* Tell Joni someone opened a shared link, the same way a password sign-in does. */
  React.useEffect(() => {
    if (ARRIVED_BY_INVITE && window.notifyLogin) window.notifyLogin("Shared link");
  }, []);
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
