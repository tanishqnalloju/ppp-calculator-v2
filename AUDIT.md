# PPP Calculator v1 — Redesign Audit

**Source (read-only):** `/workspace/ppp-calculator/{index.html,styles.css,app.js,README.md}`  
**Mode:** Redesign — overhaul visuals; preserve math, IA, params, and crawlable FAQ.  
**Dial reading of existing site:** VARIANCE ~4 (mostly centered single column), MOTION ~1 (static + theme toggle), DENSITY ~5 (tool-dense for a one-pager).  
**Target dials (locked):** VARIANCE 6 / MOTION 3 / DENSITY 3.

---

## 1. Typography

| Finding | Severity | Notes |
|--------|----------|-------|
| Google Fonts linked via `@import` in CSS | Medium | Render-blocking; CLS risk; taste prefers self-host / `font-display: swap` without CSS `@import`. |
| Display numbers use serif (`Newsreader`) without tabular figures | High | Money values jump width when recalculating; only commodity `.card .row b` has `tabular-nums`. Dual-answer hero lacks mono/tabular stack. |
| All-caps micro-labels everywhere (fields, metric labels, theme toggle) | Medium | Uppercase + wide tracking on every label is an AI/editorial tell when overused; at DENSITY 3, sentence-case field labels read calmer. |
| Body measure is good (`--content: 42rem`) | Keep | Preserve narrow editorial column. |
| Only 400/500/600/700 of Instrument Sans; no dedicated mono family | Medium | Numbers and codes need a mono or `tabular-nums` system font stack for optical stability. |
| Em-dashes in title, OG, and empty metric placeholders (`—`) | Medium | Taste anti-slop bans em-dash as design flourish; use hyphen or en-less empty glyph (`–` also discouraged; prefer `-` or a mid-dot / blank state word). |
| Skip-link is `.sr-only` with no `:focus` / `:focus-visible` reveal | High (a11y) | Keyboard users cannot see or land the skip control. |

## 2. Color and surfaces

| Finding | Severity | Notes |
|--------|----------|-------|
| Warm bone palette + forest green accent is coherent | Keep / refine | Aligns with warm monochrome + one muted accent; desaturate slightly for Linear/Notion calm. |
| Dual metrics both sit in bordered cards with soft shadow | Medium | Card chrome competes with the dual-answer hero; primary uses tinted fill + accent border, secondary is equal weight except color. Comparison is not optically obvious enough. |
| Shadow tokens present in light; `none` in dark | Low | Fine; v2 should prefer hairline borders over elevation (minimalist / flat). |
| Pure-ish near-blacks avoided (`#1c1915`, `#12140f`) | Keep | Good; continue off-black / warm charcoal. |
| Accent saturation in dark (`#5fbf9a`) is brighter than light | Low | Lock one muted accent family; keep dark accent desaturated for eye comfort. |
| Fact rows use soft panel + border (mini-cards) | Medium | Cost/PLI feel like a second dashboard strip; at DENSITY 3 they should be a single quiet cost line. |

## 3. Layout

| Finding | Severity | Notes |
|--------|----------|-------|
| Single centered column, everything stacked symmetrically | Medium | VARIANCE 6 allows slight asymmetry: left-weighted dual answer (PPP larger / primary optical weight), cost line as full-bleed hairline text, not boxed. |
| Inputs in a bordered panel card | Medium | Notion/Linear tools often use open fields with bottom borders or subtle surface, not a boxed form card. |
| Worked example as left-border callout | Low | Useful content; competes with FAQ; consider folding into methodology or a one-line lead under dual answer. |
| Commodity strip as auto-fill card grid | Medium | Cards make commodities feel like a second product; should be a quiet evidence strip (rows or compact cells, lower contrast). |
| Methodology in a bordered `<details>` box; FAQ as separate hairline list | Low | Keep FAQ crawlable; strip methodology box chrome; align both to hairline dividers. |
| Footer is simple and good | Keep | Avoid link-farm expansion. |
| `min-height: 100vh` on body | Low | Prefer `min-height: 100dvh` for mobile chrome stability. |

## 4. Interactivity and states

| Finding | Severity | Notes |
|--------|----------|-------|
| Theme toggle is sun/moon-adjacent glyph (`◐`) + uppercase label | Medium | Generic toggle pattern; prefer Light / Dark / System text control or compact segmented control. |
| Focus rings exist (`:focus-visible`) | Keep | Strengthen contrast on inputs; do not remove. |
| No share control despite shareable URL params | Medium | Missing component; add quiet “Copy link” that uses current query string. |
| Country pickers have keyboard arrows / Escape | Keep | Preserve; improve active option contrast and listbox a11y (`aria-activedescendant` optional). |
| Empty / error states exist (status banner, em-dash values) | Medium | Replace alert-style warn box with inline, calm status; empty money → soft placeholder text, not em-dash row. |
| No loading skeleton while JSON fetches | Low | Brief delay possible; quiet “Loading countries…” or skeleton for dual values. |
| Hover on buttons / picker options only; almost no motion | OK for MOTION 3 | Keep transform/opacity only if any; honor `prefers-reduced-motion` (already present — keep). |
| `:focus { outline: none }` then `:focus-visible` | Keep with care | Correct pattern; ensure mouse users still get hover affordance. |

## 5. Content

| Finding | Severity | Notes |
|--------|----------|-------|
| Tagline “Same money. Different prices.” is clear and specific | Keep | Preserve voice. |
| Dual labels are long uppercase sentences | Medium | Shorten for optical scan: “PPP equivalent” / “FX / wire”; put explanation in `.sub`. |
| Worked example duplicates lead + FAQ | Low | Trim or merge. |
| FAQ HTML is crawlable (`<details>` in DOM, not JS-only) | Keep | Critical for AEO; preserve + keep FAQPage JSON-LD. |
| Title / OG use em-dash | Medium | Rewrite titles without `—`. |
| No privacy / terms | Low | Optional for personal tool; footer can stay minimal unless jurisdiction requires. |

## 6. SEO / AEO gaps

| Finding | Severity | Notes |
|--------|----------|-------|
| Strong baseline: canonical, robots index, OG, Twitter, WebApplication + FAQPage JSON-LD | Keep for v1 | Do not regress on cutover. |
| `og:image` missing | Medium | Add a simple OG image for share cards (summary_large_image optional). |
| Twitter card is `summary` only | Low | Upgrade when OG image exists. |
| Sitemap + robots point only at apex | Keep | Correct for v1 freeze. |
| No `theme-color` / apple touch | Low | Nice-to-have. |
| v2 host not yet defined in meta | Implement phase | Must not dilute v1 — see DESIGN.md SEO recommendation. |

## 7. Accessibility

| Finding | Severity | Notes |
|--------|----------|-------|
| Skip-to-content present but not focus-visible | High | Fix: show on focus, solid background, above header. |
| Semantic landmarks mostly good (`main`, `header`, `footer`, FAQ `section`) | Keep | Prefer `<header>` / `<footer>` without relying on class-only structure. |
| Income input is `type="text"` + `inputmode="decimal"` | Keep | Fine; associate errors with `aria-invalid` / `aria-describedby` when invalid. |
| Metric values lack `font-variant-numeric: tabular-nums` | High | Money columns misalign; screen readers OK but visual a11y for comparison suffers. |
| Color-only primary emphasis on PPP metric | Medium | Also use weight / size hierarchy so comparison survives monochrome / deuteranopia. |
| Picker listbox missing `aria-activedescendant` | Low | Works with arrow + active class; improve if touching picker. |

## 8. Component / code patterns

| Finding | Severity | Notes |
|--------|----------|-------|
| Inline style on type hint (`style="align-self:end…"`) | Low | Move to CSS. |
| Commodity cards injected as HTML strings | Keep pattern | Escape preserved; OK for static tool. |
| Google Fonts dependency | Medium | Self-host subset WOFF2 for Newsreader + sans + mono. |
| Favicon exists (SVG) | Keep / refresh | Align colors to new tokens. |
| No share, no system theme option in toggle | Medium | Theme: light / dark / system; Share: copy URL. |

## 9. Patterns to preserve (do not regress)

- Math: `incomeLocal / home.ppp * dest.ppp`, FX cross rate, `costPct`, PLI display, reliability gates (no NaN/Infinity).
- Params: `income`, `home`, `type`, `dest` (KingIndex-compatible).
- Defaults: IND home, USA dest (or URL override); demo income 800000.
- Crawlable FAQ + FAQPage JSON-LD + WebApplication schema.
- Commodity strip as illustrative evidence with dated meta and null gaps.
- Light default + dark via `data-theme` + localStorage + prefers-color-scheme boot script.
- Static HTML/CSS/JS (no React rewrite required).
- Worker assets deploy model; freeze v1 Worker `ppp-calculator` and apex domain.

## 10. Patterns to retire

- Em-dash titles and empty states as design default.
- Equal dual cards with dashboard chrome.
- Boxed input panel + soft drop shadows as primary structure.
- All-caps label spam; `◐` theme glyph as sole control.
- Commodity “product cards” visual weight.
- CSS `@import` Google Fonts.
- Skip-link that never appears on focus.

## Top 8 findings (priority)

1. **Dual answer is not optically heroic** — two similar cards; PPP vs FX comparison needs size/weight/position hierarchy without dashboard chrome.
2. **Money figures lack tabular/mono treatment** on the hero values (only commodities have tabular-nums).
3. **Skip-to-content is invisible on keyboard focus** — a11y defect.
4. **Card + shadow chrome everywhere** (panel, metrics, facts, method) fights minimalist / Linear density 3.
5. **Commodities read as a second product** (card grid) instead of quiet evidence.
6. **Typography delivery via Google `@import`** — perf / control; no dedicated mono stack.
7. **SEO share gap:** no `og:image`; titles use em-dash; v2 robots strategy unset.
8. **Missing share control** despite URL-state design; theme control is a generic glyph toggle without System.
