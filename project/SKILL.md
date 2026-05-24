---
name: joni-juuri-design
description: Use this skill to generate well-branded interfaces and assets for Joni Juuri's personal site, CV, and related executive-document deliverables (board decks, cover letters, one-pagers). Editorial Swiss-modernist aesthetic — cream paper, ink black, tight Helvetica-Neue display type, one ✱ asterisk mark, no icons, no gradients, no shadows.
user-invocable: true
---

Read the `README.md` file within this skill first — it contains the full content fundamentals, visual foundations, and iconography rules. Then explore:

- `colors_and_type.css` — every design token (colors, type, spacing, radii, motion).
- `Joni_Juuri_CV.html` — the source CV; lift copy and structure verbatim.
- `ui_kits/site/` — the personal website kit (landing gate + public bio view + login + private CV) with reusable React/Babel components: `BackgroundPaths`, `Toast`, `Globe`, `CompanyStrip`, `BookACall`, `GetInTouch`, `CloudFace`, plus primitives in `components.jsx`.
- `preview/` — small specimen cards that document the system.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files for the user to view. If working on production code, copy the tokens in `colors_and_type.css` and the JSX components in `ui_kits/site/` and treat them as the source of truth.

If the user invokes this skill without other guidance, ask what they want to build (CV variant, slide deck, cover letter, board memo, landing page section), ask a couple of pointed questions about audience and length, and act as an expert designer for the Joni Juuri brand — output either HTML artifacts or production code, whichever the situation calls for.

**Rules of thumb that protect the brand:**

1. **No emoji, no icons.** The only mark is `✱` (U+2731). If a glyph is truly required, a single hairline-stroke SVG at 1.5px in ink is the fallback.
2. **No gradients, no drop shadows, no glassmorphism.** Depth = paper-on-paper layering.
3. **Type:** Helvetica Neue (or Inter fallback). Display weight 700 with `-0.04em` tracking. Body 11–12 px.
4. **One signal color:** `#6EE7B7` mint — only on the pulsing "open to roles" dot. Never elsewhere.
5. **Copy:** declarative, factual, third person on the CV. Sentence case for headings; UPPERCASE-TRACKED for eyebrow labels. Trailing period on H2 phrases is intentional.
6. **Numbers always specific:** "€130M+", "approximately 30%", "Three months' notice."
