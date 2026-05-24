# Joni Juuri Design System

A design system for **Joni Juuri** — Chief Financial Officer, energy & critical-infrastructure executive. The system extends his existing single-page CV (`Joni_Juuri_CV.html`) into a small, well-mannered personal site with two views:

1. **Public view** — a welcoming, lightly biographical landing page (the "old view for everybody"); a CV preview that anyone can read.
2. **Private / closed CV** — a gated, full-fidelity executive CV behind an email + password screen. The same document, but with phone, full role detail, and contact strip.

The aesthetic is **editorial Swiss-modernist**: cream paper, ink black, one signature accent (the ✱ asterisk mark), tight Helvetica-Neue display type with negative tracking, and large rounded cards stacked vertically. No gradients, no drop shadows, no decorative iconography.

---

## Sources

- **GitHub repo:** [`juurijoonatan-cpu/jonin-cv`](https://github.com/juurijoonatan-cpu/jonin-cv) — original single-file CV at `Joni_Juuri_CV.html`. Explore the repo for the canonical content and copy.

The CV file itself is the entire source of truth for tone, copy, layout, and tokens. Everything in this system was derived from it.

---

## Index

| File | Purpose |
|---|---|
| `README.md` | This file — context, content + visual foundations, iconography. |
| `SKILL.md` | Agent Skill manifest. Read first when invoked as a skill. |
| `colors_and_type.css` | All design tokens — colors, type, spacing, radii, motion. |
| `Joni_Juuri_CV.html` | The original CV (imported from the source repo). |
| `ui_kits/site/` | The website UI kit — landing page + public CV + gated private CV. |
| `preview/` | Small design-system specimen cards (the ones you see in the Design System tab). |
| `assets/` | Logos, photo placeholders, brand marks. |

---

## Content fundamentals

### Voice
**Editorial, declarative, never marketing.** Sentences are confident, factual, and load-bearing — every line earns its place. The CV reads like a Monocle profile: "Strategic CFO with 15+ years…" then a specific scope, then a specific outcome. No filler, no clichés, no "passionate about X."

### Person
**Third person on the CV; first person sparingly elsewhere.** The CV refers to Joni in the third person ("Combines deep energy infrastructure knowledge…"). On a personal landing page it is fine to use first person ("I'm a CFO based in Espoo…"). Never address the reader as "you" — there is no sales here.

### Casing
- **Sentence case** for headings and titles ("Areas of expertise", "Education & programs").
- **UPPERCASE with tracking** for eyebrow labels, badges, and metadata ("LOCATION", "AVAILABILITY", "EXECUTIVE EDUCATION & CERTIFICATIONS"). The letter-spacing is `0.16em`–`0.22em`.
- **Title Case** is avoided.
- Trailing period on H2 phrases is intentional: "Executive summary." "Areas of expertise." It's a quiet stylistic tic, do keep it.

### Numbers, dates, money
- Money is **specific**: "€130M+", "€500M", "€1.3B", "approximately 30% of national electricity". Round numbers are fine; vagueness is not.
- Dates use en dashes: "2025 — Present", "2016 — 2025". Always a space on each side.
- Years stand alone as big editorial numerals where relevant ("2026").
- Use figure-space-style alignment by keeping numbers in the same column where possible.

### Emoji & ornaments
- **No emoji.** Anywhere.
- One ornament is permitted, and only one: **✱** (U+2731 HEAVY ASTERISK) used as the brand mark, before the name in the header and in footers. Never as a bullet, never decoratively.
- Bullet lists use a **short horizontal rule (`—`-style ::before)** instead of a dot.

### Examples (lift from CV verbatim)
- Eyebrow: `OPEN TO SENIOR INTERNATIONAL ROLES · THREE MONTHS' NOTICE.`
- H1: `Chief\nFinancial\nOfficer.`
- Lede: `Strategic CFO with 15+ years of senior finance leadership across the global energy sector.`
- Marquee stat label: `SIGNATURE ACCOUNTABILITY` → `€130M+` → one-sentence description.
- Closing line: `Available with three months' notice. Open to international relocation.`

---

## Visual foundations

### Colors
A two-tone foundation with one signal color.

| Token | Value | Role |
|---|---|---|
| `--jj-paper` | `#F4F2EE` | Page background — warm cream. Default surface. |
| `--jj-paper-2` | `#FFFFFF` | Card surface (light). |
| `--jj-paper-3` | `#DCD9D3` | Tertiary stone — middle-card emphasis only. |
| `--jj-warm` | `#E9E5DD` | Photo well, soft fills. |
| `--jj-ink` | `#0A0A0A` | Type, dark cards, borders. |
| `--jj-ink-2` | `#1A1A1A` | Secondary type. |
| `--jj-muted` | `#8A8A8A` | Metadata, eyebrow text. |
| `--jj-status-go` | `#6EE7B7` | The pulsing "open to roles" dot. Used **once** on the page; never anywhere else. |

The whole identity lives in the **paper-on-paper layering** — cream page, white cards, occasional ink-black card. No accent palette beyond that single mint dot.

### Type
- **Display + body: Helvetica Neue** (fallback Inter → Arial). Single family across the system; weight 400 for body, 700 for display.
- **Tight tracking** on display sizes: `-0.04em` for hero numerals, `-0.025em` for H2.
- **Eyebrow labels are uppercase** with `0.16em`–`0.22em` tracking and small (10px / 8.5px).
- Hero numerals: `clamp(60px, 9vw, 100px)`, line-height `0.82`. Big and editorial.
- Body sits at 11–12px. The CV is intentionally dense like a printed document — not a webpage.

> **Font note.** Helvetica Neue is the system request, but it is not on Google Fonts. The CSS falls back to **Inter** (loaded from Google Fonts in the UI kit) which carries the metrics well. If a licensed Helvetica Neue web font is available, swap it in and the design renders 1:1. *Flag this substitution to Joni.*

### Layout & spacing
- **Cards stack vertically** with 5–10px gaps. Each section is a rounded card (`18px` radius), padded `10px var(--pad) 12px` on desktop, `56px 32px` on mobile.
- Max width `1180px`, centered. Page padding `var(--pad-sm) = 18px`.
- A **two-column grid** (`0.32fr / 0.68fr`) handles most internal layouts — a slim left column for metadata + photo, a wide right column for the substance.
- Spacing scale is 4px-based: `4, 8, 12, 16, 24, 32, 40, 56, 64`.
- Section heads place a **big numeral** (01, 02…) flush right; H2 sits left. The numeral does the work icons would do elsewhere.

### Backgrounds
- **No images, no gradients, no patterns, no textures.** The page background is flat cream; cards are flat white or flat ink. Negative space is the texture.
- The single permitted illustration well is the **circular photo spot** (`64px` ⌀, 1px ink border, cream fallback fill).

### Borders & rules
- **Hairline rules** at `rgba(0,0,0,0.12)` separate rows inside cards (experience entries, education list). On dark cards: `rgba(255,255,255,0.18)`.
- **1px solid ink** borders on pill badges and the circle photo well.
- **Pill badges** (`border-radius: 999px`) — `1px` ink border, `4px 11px` padding, 9.5px uppercase tracked label. Used for "CV", "2026", year tags.

### Shadows & depth
- **There are no drop shadows.** Depth is achieved by cream-on-white card layering and by the occasional ink-black card creating optical recession. If a designer reaches for a shadow they are working against the system.

### Hover & press
- **Hover:** opacity `0.7` on links and buttons. No color shifts.
- **Press:** scale `0.98` over 100ms, ease-out. Cards being focused (e.g. an interactive expand) lift very slightly via a 1px translate-y — never a shadow.
- **Focus:** 2px ink outline at 2px offset on a 2px radius. Visible on keyboard nav.

### Corner radii
- Cards: `18px` (desktop), `28px` (mobile, more generous for touch).
- Stacked feature cards: `24px`.
- Marquee stat block: `8px` (intentionally tighter — it reads as a hard-edged callout).
- Pills: `999px`.
- Progress bars: `6px`.

### Transparency & blur
- Used **only** for text-on-dark hierarchy (`rgba(255,255,255,0.45 / 0.55 / 0.6 / 0.85)`). Never for background blur, never for glassmorphism.

### Animation
- Restrained, editorial. One animation lives on the page — the **pulsing green status dot** on the "open to roles" pill (2s `pulse` keyframes, box-shadow ripple).
- Page transitions: 240ms `cubic-bezier(0.2, 0.6, 0.2, 1)` opacity-only fades for view changes (public ↔ private). No slides, no scale-ins.
- No bounce, no spring, no scroll-triggered choreography.

### Imagery
- A single round headshot. **Cool, neutral, slightly warm-paper background.** No filters, no duotone, no grayscale crush. The image should sit comfortably on `--jj-warm`.
- No stock photography of skyscrapers, abstract energy, wind turbines, etc.

### Marquee stat block (a signature component)
The ink-black inline callout inside an experience entry. Format:
```
SIGNATURE ACCOUNTABILITY      ← eyebrow, mint or white-60% on ink
€130M+                        ← big display numeral, white
One sentence explaining the   ← 10px white-85% body
scope and outcome.
```
Use it sparingly — at most once per role.

### Layout rules to keep
- Fixed elements: **none** on the CV page. The header is in-flow, not sticky. The CV is a document, not an app.
- The website (landing page) **may** use a slim fixed top bar to switch between Public and Private views.

---

## Iconography

**The system uses no icon set.** No Lucide, no Heroicons, no emoji, no custom SVG flourishes.

The only graphical marks in the entire identity are:

| Mark | Glyph | Purpose |
|---|---|---|
| Brand asterisk | `✱` (U+2731) | The signature — beside the name, in the topbar, in footers. |
| Corner arrow | `↗` (U+2197) | A single rotated arrow inside a 24px ink-outlined circle, top-right of the hero card. Purely decorative wayfinder. |
| Arrow pill | `↗` (U+2197) | Same arrow inside small 22px ink circles next to section heads. |
| Em dash for bullets | a `1px × 8px` `::before` rule | Replaces dots in lists. Calmer, more editorial. |

If an icon truly cannot be avoided (e.g. mail, lock, eye on a password field), use **a single hairline-stroke SVG drawn at 1.5px stroke weight in `--jj-ink`**, the same weight as the pill borders. Tabler Icons (`outline` set, `1.5` stroke) on CDN is the closest off-the-shelf match — flag the use to Joni when introducing one.

---

## UI Kits

- **`ui_kits/site/`** — the personal website. Contains:
  - Landing screen ("Public view or private CV?")
  - Public view (lightly biographical, links to download/CV preview)
  - Login screen (email + password)
  - Private CV (full-fidelity, the original document)

See `ui_kits/site/README.md` for component list.

---

## Exploring further

The original CV repo is small but content-rich — every paragraph in it is a usable copy block. To do more (a cover-letter system, a board-deck template, an investor one-pager), the right move is to read `Joni_Juuri_CV.html` again and lift tone + structure verbatim before designing.
