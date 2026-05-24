# Joni Juuri — Site UI Kit

Personal website with a public landing page, a public biographical view, and a gated private CV behind email + password.

## Flow

```
Landing (gate)
  ├── "The story" ──→ Public view (always accessible)
  └── "The CV"    ──→ Login screen ──→ Private CV (full document)
                                         └── Sign out → Landing
```

## Files

- `index.html` — single-page app shell. Loads React + Babel and all components.
- `components.jsx` — shared primitives (`Topbar`, `Card`, `Pill`, `Asterisk`, `Eyebrow`, `MarqueeStat`, `Field`, `Button`).
- `Landing.jsx` — gate screen with two large choice cards.
- `PublicView.jsx` — the public biographical page. Same visual vocabulary as the CV but lighter on detail and personal in voice.
- `LoginScreen.jsx` — email + password card. `joni@juuri.me` / `juuri2026` (demo).
- `PrivateCV.jsx` — full-fidelity CV (lifted from `Joni_Juuri_CV.html`).
- `app.jsx` — view router + view-fade transitions, persists current view in `localStorage`.

## Demo credentials

```
email:    joni@juuri.me
password: juuri2026
```

These are hardcoded in `LoginScreen.jsx` for prototype use only. Wire up real auth before shipping.
