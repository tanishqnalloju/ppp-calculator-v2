# PPP Calculator v2 — Design Source of Truth

**Host (locked):** https://v2.ppp.tanishqnalloju.com  
**Repo (later):** ppp-calculator-v2  
**Dials (locked):** `DESIGN_VARIANCE 6` · `MOTION_INTENSITY 3` · `VISUAL_DENSITY 3`  
**Page kind:** tool page (not marketing landing). Brief inference below.

---

## Design Read

Reading this as: a personal finance **tool page** for travelers and remote workers comparing salary across countries, with a **Linear / Notion / editorial minimalist** language, leaning toward **warm monochrome + one muted accent**, serif display + geometric sans UI + tabular numbers, low motion, airy density.

---

## Visual theme and atmosphere

- Document-like calculator: calm paper surface, hairline structure, typographic hierarchy does the work.
- Dual answer (PPP vs FX) is the **hero moment** — optically obvious comparison without charts, sidebars, or dashboard chrome.
- Commodities are **quiet evidence** under the fold: lower contrast, smaller type, no competing CTA.
- Light is default; dark is a first-class twin (same hierarchy, same accent role).
- Macro whitespace between major blocks (inputs → dual answer → cost line → commodities → FAQ/methodology → footer). Section padding roughly `py-10`–`py-16` equivalent; content max ~40–44rem.

---

## Color palette and roles

Warm monochrome family only (no cool slate mixing). One muted accent. No gradients, no neon, no glassmorphism, no pure `#000` / `#fff` as large fields if avoidable (off-white / off-black OK).

### Light (default)

| Token | Hex | Role |
|-------|-----|------|
| `--bg` | `#F7F6F3` | Page canvas (warm bone) |
| `--bg-elevated` | `#FFFFFF` | Optional subtle lift for inputs only if needed |
| `--surface` | `#FBFBFA` | Soft wells (picker open, code chips) |
| `--border` | `#E8E6E1` | Hairlines |
| `--border-strong` | `#D4D1CA` | Hover / active borders |
| `--text` | `#1C1B19` | Primary text |
| `--text-secondary` | `#6F6B63` | Muted body / hints |
| `--text-tertiary` | `#9A958C` | Meta, timestamps |
| `--accent` | `#2F5D50` | Muted forest — primary emphasis, links, PPP hero value |
| `--accent-soft` | `#E8F0ED` | Soft PPP well (optional, low opacity use) |
| `--accent-hover` | `#244A40` | Link / button hover |
| `--warn` | `#8A6A1F` | Status text |
| `--warn-bg` | `#F5EFE0` | Status well |
| `--danger` | `#8F3A3A` | Rare errors |
| `--focus-ring` | `#2F5D50` | 2px focus-visible |

### Dark

| Token | Hex | Role |
|-------|-----|------|
| `--bg` | `#141311` | Warm charcoal canvas |
| `--bg-elevated` | `#1C1B18` | Elevated surface |
| `--surface` | `#22211E` | Wells |
| `--border` | `#2E2C28` | Hairlines |
| `--border-strong` | `#45423C` | Strong edges |
| `--text` | `#ECEAE4` | Primary |
| `--text-secondary` | `#A39E94` | Muted |
| `--text-tertiary` | `#7A756C` | Meta |
| `--accent` | `#7AAD9A` | Desaturated sage (same family as light) |
| `--accent-soft` | `#1E2E28` | Soft PPP well |
| `--accent-hover` | `#96C4B4` | Hover |
| `--warn` | `#D4B56A` | Status |
| `--warn-bg` | `#2A2618` | Status well |
| `--danger` | `#D08888` | Errors |
| `--focus-ring` | `#7AAD9A` | Focus |

**Rules:** one accent locked page-wide. No second brand color on CTAs or badges. Shadows ≤ `rgba(28,27,25,0.04)` or prefer borders only.

---

## Typography rules

**Banned:** Inter, Roboto, Open Sans, Fraunces, Instrument Serif (LLM-default serifs).  
**Stack:**

| Role | Family | Notes |
|------|--------|-------|
| Display / H1 / dual values | **Newsreader** (opsz) | Editorial serif justified for tool-as-document; already brand-adjacent from v1. Tracking `-0.02em` to `-0.03em`; leading ≥ 1.1 for italics. |
| UI / body / labels | **Geist Sans** or **Switzer** (fallback: `ui-sans-serif`, system-ui) | Not Inter. Weights 400 / 500 / 600. |
| Numbers / money / codes | **Geist Mono** or `ui-monospace` + `font-variant-numeric: tabular-nums` | Mandatory on PPP value, FX value, cost %, PLI, commodity prices. |

**Scale (approx):**

- H1 / product name: `clamp(1.75rem, 3.5vw, 2.125rem)` serif 600  
- Dual hero value: `clamp(1.75rem, 4vw, 2.35rem)` serif or mono tabular 600 — PPP slightly larger than FX  
- Lead sentence: `1.125–1.25rem` serif or sans 400  
- Body: `1rem` / `1.6` leading; max ~65ch for prose  
- Labels: sentence case, `0.8125rem`, weight 500, secondary color (no all-caps spam)  
- Meta / footer: `0.8125rem` secondary  

**Copy hygiene:** no em-dashes (`—`) in UI strings, titles, or OG. Use periods, commas, or hyphens. Empty money state: soft “Enter income” / `-` not a decorative em-dash wall.

Self-host WOFF2 subsets; `font-display: swap`. No CSS `@import` from Google.

---

## Component stylings

### Inputs

- Label above control, sentence case, secondary color.  
- Helper under field (currency hint). Errors under field, not `alert()`.  
- Fields: full width of content column; `border: 1px solid var(--border)`; radius `6px`; bg `--bg` or elevated; padding `0.6rem 0.75rem`.  
- Hover → `--border-strong`; focus-visible → accent ring.  
- Type select: same chrome as text; no pill containers.  
- Country pickers: keep combobox pattern; open list hairline + surface; active option `--accent-soft` + accent text.

### Dual-answer hero

- Not two equal dashboard cards.  
- Structure: one lead line (`₹800,000 net in India → Bangladesh`), then a **split comparison**:
  - Left / primary: PPP equivalent — larger type, accent color on value, short label “PPP equivalent”, sub “to live the same”.
  - Right / secondary: FX / wire — slightly smaller or lighter weight, muted value color, label “FX / wire”, sub “if you convert cash”.
- Optical cue: vertical hairline between columns on ≥520px, or stacked with PPP first and a subtle “vs” meta on mobile.  
- Optional soft accent wash behind PPP only (not a heavy card). Prefer padding + hairline over box-shadow.  
- Both values always `tabular-nums` / mono so digits do not dance.

### Cost line

- Single quiet line under dual answer (not two fact cards):  
  **Same lifestyle costs 42% less than at home.** · Price level vs US: 37  
- Hairline top border; no panel fill. PLI tertiary.

### Commodity strip

- Heading + one-line intro (dated, illustrative disclaimer).  
- Compact grid or horizontal rows: name, unit, home price, dest price.  
- Lower contrast than hero; radius ≤ 8px; 1px border only; no shadows.  
- Gaps stay honest (“—” avoided; use “n/a” or leave blank with note).

### FAQ

- Crawlable HTML `<details>` / `<summary>` in the document (not JS-injected).  
- Hairline dividers only; no accordion card chrome.  
- Keep FAQPage JSON-LD in sync with visible Q&A.  
- Prefer `+` / `-` or plain disclosure triangle in accent, not emoji.

### Methodology

- Collapsed `<details>` after or beside FAQ; same hairline language.  
- Formulas in mono/`<code>` chips with `--surface` bg.

### Theme control

- Compact text control: **Light | Dark | System** (segmented or small select), not sun/moon glyph alone.  
- Persist `localStorage` key `ppp-calc-v2-theme` (new key so v1 preference is undisturbed).  
- Boot script in `<head>` sets `data-theme` before paint (same FOUC pattern as v1).

### Share

- Quiet text button: “Copy link”.  
- Copies current URL (pathname + `income`/`home`/`type`/`dest` query).  
- Feedback: “Copied” for ~2s via `aria-live`, no toast library, no exclamation marks.

### Skip link

- First focusable element; visually hidden until `:focus-visible`; solid `--bg-elevated`, accent text, clear outline; scrolls to `#main`.

### Footer

- Product · author · KingIndex deep link (preserve query passthrough) · Source. No link farm.

---

## Layout principles (IA)

```
[skip]
[header: title + theme]
[tagline]

[inputs]          annual income, type, home, dest
[status]          inline if needed
[dual answer]     HERO — PPP vs FX
[cost line]       cost % + PLI
[commodities]     quiet evidence
[FAQ]             crawlable
[methodology]     details
[footer]
```

- Max content width ~42rem; horizontal padding ~1.15–1.5rem.  
- VARIANCE 6: PPP column optically heavier; avoid perfect twin cards.  
- Mobile: single column; PPP stacked above FX; cost line wraps naturally.  
- No left sidebar, no bento marketing grids, no three equal feature cards.

---

## Motion and interaction

`MOTION_INTENSITY 3` → almost static.

- Allowed: `:hover` border/color, `:active` `scale(0.98)` on buttons, 150–200ms opacity/color transitions.  
- Banned: scroll hijack, marquees, parallax, layout animations on width/height/top/left.  
- Animate only `transform` / `opacity` if anything fades in.  
- `@media (prefers-reduced-motion: reduce)` collapses transitions (keep v1 hard cut pattern).

---

## Anti-patterns banned

- Inter / Roboto / Open Sans; Fraunces / Instrument Serif  
- AI purple / neon / gradients / glassmorphism / heavy shadows  
- Em-dashes in UI, titles, OG  
- Three equal feature cards; dashboard sidebars; pill primary buttons for large CTAs  
- Lucide-only icon soup; emoji in UI  
- Commodities as loud product cards  
- JS-only FAQ  
- Pure `#000` canvas; oversaturated accents  
- “Elevate / Seamless / Unleash” copy  
- Section-number eyebrows; scroll cues; locale weather strips  

---

## SEO / AEO requirements

### Preserve / improve on cutover (apex)

- Unique title + meta description (no em-dash).  
- `canonical` → production host.  
- `robots`: `index,follow` on production.  
- OG + Twitter with title, description, url, site_name; add **`og:image`** (1200×630 static SVG/PNG).  
- JSON-LD: `WebApplication` + `FAQPage` matching visible FAQ.  
- Crawlable FAQ in HTML.  
- `sitemap.xml` + `robots.txt` for production only.  
- Semantic landmarks; skip link; focus rings; tabular money.

### v2 vs v1 SEO recommendation (locked for staging)

**Recommend: `noindex, follow` on https://v2.ppp.tanishqnalloju.com until cutover.**

**Justify:**

1. v2 is a preview host (`v2.ppp…`). Indexing it creates near-duplicate competition with frozen apex `ppp.tanishqnalloju.com` and dilutes ranking signals.  
2. `canonical` → v1 alone still allows some crawlers to discover and occasionally surface the preview URL; `noindex` is the reliable “do not rank” signal for staging.  
3. `follow` keeps link equity paths discoverable for QA without ranking the page.  
4. Do **not** list v2 in any sitemap; do **not** change v1 `robots.txt` / sitemap.  
5. At cutover (preferred): ship the redesigned assets to the **apex** Worker/domain so rankings stay on `https://ppp.tanishqnalloju.com/`. Then either delete v2 custom domain or keep it `noindex` as a staging alias. Alternative: 301 apex → v2 only if product decision moves the permanent URL (not preferred).

Staging meta sketch:

```html
<link rel="canonical" href="https://ppp.tanishqnalloju.com/" />
<meta name="robots" content="noindex, follow" />
<!-- og:url may still describe v2 for debuggers, but canonical + robots protect v1 -->
```

Alternative considered: self-canonical + noindex. Also fine; consolidating canonical to v1 makes intent explicit that apex remains the indexed product during freeze.

---

## Content voice (unchanged intent)

- Tagline: **Same money. Different prices.**  
- Plain, specific language. Net/gross = label only.  
- KingIndex remains the × median / local-class product; do not merge features.
