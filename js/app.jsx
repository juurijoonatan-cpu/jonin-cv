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

/* localStorage throws in some privacy modes. Nothing here may depend on it
   working, or a shared link would dead-end on exactly the browsers people tend
   to have when they open a link out of a message. */
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch (_) { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch (_) {} },
  remove(key) { try { localStorage.removeItem(key); } catch (_) {} },
};

const consumeInviteLink = () => {
  let matched = false;
  try {
    const params = new URLSearchParams(window.location.search);
    matched = params.get("k") === INVITE_KEY;
    if (!matched) return false;
    params.delete("k");
    const qs = params.toString();
    window.history.replaceState({}, "", window.location.pathname + (qs ? "?" + qs : ""));
  } catch (_) {
    /* URL or history API misbehaving must not cost the visitor their access. */
  }
  /* Remembering the visit is a convenience. Access for this page load is not
     conditional on it, so a blocked store still lets the link through. */
  if (matched) storage.set("jj-authed", "1");
  return matched;
};

/* Checked once, before the first render, so an invited visitor never sees the gate. */
const ARRIVED_BY_INVITE = consumeInviteLink();

const App = () => {
  const [view, setView] = React.useState(() => {
    if (ARRIVED_BY_INVITE) return "public";
    if (storage.get("jj-authed") === "1") {
      const saved = storage.get("jj-view");
      return VIEWS.includes(saved) ? saved : "public";
    }
    return "login";
  });
  const [authed, setAuthed] = React.useState(() => ARRIVED_BY_INVITE || storage.get("jj-authed") === "1");

  /* Tell Joni someone opened a shared link, the same way a password sign-in does. */
  React.useEffect(() => {
    if (ARRIVED_BY_INVITE && window.notifyLogin) window.notifyLogin("Shared link");
  }, []);
  const [fade, setFade] = React.useState(false);

  React.useEffect(() => {
    storage.set("jj-view", view);
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
    storage.set("jj-authed", "1");
    setFade(true);
    setTimeout(() => {
      setView("public");
      requestAnimationFrame(() => setFade(false));
    }, 180);
  };

  const signOut = () => {
    setAuthed(false);
    storage.remove("jj-authed");
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

/* One place builds the link, so the token can never drift between files. */
window.JJ_SHARE_LINK = (() => {
  try {
    return window.location.origin + window.location.pathname + "?k=" + INVITE_KEY;
  } catch (_) {
    return "https://juuri.me/?k=" + INVITE_KEY;
  }
})();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
