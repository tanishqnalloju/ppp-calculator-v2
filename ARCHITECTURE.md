# PPP Calculator v2 — Architecture Sketch (Implement Phase)

Design-phase only. No implementation in this folder beyond optional tokens.  
**Freeze:** never write to `/workspace/ppp-calculator` (v1) or deploy/replace Worker `ppp-calculator` / apex domain.

---

## 1. Goals

- New repo `ppp-calculator-v2`: same math/params as v1; redesigned UI per `DESIGN.md`.  
- Worker name: **`ppp-calculator-v2`**.  
- Custom domain: **`v2.ppp.tanishqnalloju.com`**.  
- Stack stays tiny static HTML / CSS / JS + Wrangler assets (no React rewrite unless later decided).

---

## 2. Proposed repo layout

```
ppp-calculator-v2/
  index.html                 # markup + SEO (noindex while staging)
  app.js                     # sections below; same compute as v1
  styles/
    tokens.css               # CSS variables (light/dark)
    base.css                 # reset, type, a11y, layout shell
    components.css           # inputs, dual, cost, commodities, faq, footer
  # OR single styles.css that @imports the above — implementer choice
  data/
    countries.json           # copy from v1 (or regenerate via scripts)
    commodities.json         # copy from v1
  scripts/
    fetch_wdi.py             # copy from v1
    fetch_commodities.py     # copy from v1
  public/                    # sync target for Wrangler assets
  src/
    worker.js                # passthrough ASSETS.fetch
  favicon.svg
  robots.txt                 # Disallow or Allow + rely on meta noindex
  sitemap.xml                # omit v2 URLs while noindex; or empty/absent
  wrangler.jsonc             # name: ppp-calculator-v2; custom domain v2
  package.json
  README.md
  skills/taste/
    redesign/SKILL.md
    taste/SKILL.md
    minimalist/SKILL.md
  DESIGN.md                  # copy from this design pack
  AUDIT.md
  ARCHITECTURE.md
```

Design-pack path today: `/workspace/ppp-calculator-v2-design/` (docs only; not the git repo yet).

---

## 3. File modules

### `index.html`

- Boot theme script (`ppp-calc-v2-theme`).  
- Meta: title/description without em-dash; **robots `noindex, follow`**; canonical → `https://ppp.tanishqnalloju.com/` until cutover.  
- OG/Twitter; stub or real `og:image`.  
- JSON-LD WebApplication + FAQPage (URLs may note v2 for debugging; canonical/robots protect v1).  
- IA order: skip → header → tagline → inputs → status → dual → cost → commodities → FAQ → methodology → footer.  
- IDs preserved where useful for JS parity: `income`, `itype`, `home`/`homeInput`/`homeList`, `dest`/`destInput`/`destList`, `pppValue`, `fxValue`, etc.

### `styles/tokens.css`

- All color / radius / font / focus variables (see sketch in this design pack).  
- `[data-theme="light"|"dark"]` + optional system via absence + boot script.

### `app.js` sections (sketch, not code)

| Section | Responsibility |
|---------|----------------|
| `math` | `isReliablePli`, `compute`, `costVsHome` — **byte-for-byte logic parity with v1** |
| `format` | `parseIncome`, `fmtMoney`, `fmtIncomeLead`, locales |
| `data` | fetch `countries.json` / `commodities.json`, `byIso`, sort |
| `picker` | home/dest combobox |
| `url` | read/write `income` `home` `type` `dest`; KingIndex link |
| `render` | dual hero, cost line, commodities, status, empty/error |
| `theme` | light / dark / system |
| `share` | copy current URL; live region feedback |
| `init` | wire events; default IND/USA/800000 |

### Data / copy strategy

- **Copy** `data/countries.json` and `data/commodities.json` from v1 at repo create (or re-run fetch scripts).  
- **Do not** invent prices or alter PPP/FX fields.  
- UI copy: redesign labels per `DESIGN.md`; keep methodology formulas identical.  
- FAQ answers stay factually aligned with JSON-LD.

---

## 4. Worker, assets, domain

| Item | v1 (frozen) | v2 |
|------|-------------|-----|
| Worker name | `ppp-calculator` | `ppp-calculator-v2` |
| Domain | `ppp.tanishqnalloju.com` | `v2.ppp.tanishqnalloju.com` |
| Assets dir | `./public` | `./public` |
| Entry | `src/worker.js` → `ASSETS.fetch` | same pattern |
| Deploy | never overwrite from v2 work | `wrangler deploy` to v2 Worker only |

`wrangler.jsonc` sketch:

```jsonc
{
  "name": "ppp-calculator-v2",
  "main": "src/worker.js",
  "compatibility_date": "2026-09-01",
  "workers_dev": true,
  "routes": [
    { "pattern": "v2.ppp.tanishqnalloju.com", "custom_domain": true }
  ],
  "assets": {
    "directory": "./public",
    "binding": "ASSETS",
    "run_worker_first": true,
    "not_found_handling": "single-page-application",
    "html_handling": "auto-trailing-slash"
  }
}
```

Attach custom domain in Cloudflare dashboard; do not touch v1 route.

`package.json` scripts: mirror v1 `sync-assets` / `deploy` / `dev`, copying new CSS paths into `public/`.

---

## 5. Copied from v1 vs redesigned

| Asset | Action |
|-------|--------|
| `compute` / reliability / URL params / KingIndex link | **Copy logic** (parity) |
| `data/*.json`, fetch scripts | **Copy** |
| `src/worker.js` passthrough | **Copy** pattern |
| `index.html` structure / SEO | **Redesign** markup + staging robots; keep FAQ crawlable |
| `styles.css` | **Replace** with tokens + minimalist components |
| Theme key | **New** `ppp-calc-v2-theme` |
| Favicon | Refresh colors to v2 tokens |
| Share control | **New** |
| Worked-example aside | Optional trim / fold into lead or methodology |
| v1 paths under `/workspace/ppp-calculator` | **Never written** |

---

## 6. Verification predicates (implement phase)

1. **IND → BGD number parity:** for `income=800000&home=IND&type=net&dest=BGD`, PPP equivalent, FX amount, cost %, and PLI match v1 within rounding already used by `fmtMoney` / `Math.round`.  
2. **No NaN / Infinity** in DOM for unreliable pairs; status message shown; values show safe empty.  
3. **SEO tags present:** title, description, canonical, robots (`noindex, follow` on v2), OG basics, FAQPage + WebApplication JSON-LD, crawlable FAQ `<details>`.  
4. **A11y:** skip-to-content visible on focus; `:focus-visible` rings; tabular nums on money; `aria-live` on results.  
5. **Theme:** light default; dark; system; no FOUC flash worse than v1.  
6. **Share:** copy link includes current query params.  
7. **Lighthouse notes (targets, not gates yet):**  
   - Perf: self-hosted fonts, no Google `@import`, LCP text/hero < 2.5s on cable.  
   - A11y: contrast AA on body and accent-on-soft.  
   - SEO: meta present; staging noindex expected (SEO score may warn on noindex — acceptable until cutover).  
   - Best practices: HTTPS, no console errors on happy path.  
8. **Isolation:** deploy only Worker `ppp-calculator-v2`; curl apex still serves v1; no edits under `/workspace/ppp-calculator`.

---

## 7. Explicit non-goals (this phase)

- No full `index.html` / `app.js` implementation in the design pack.  
- No GitHub repo create, no deploy, no DNS changes.  
- No feature merge with KingIndex (medians, scatter, crowns).  
- No tax modeling.

---

## 8. Implement-phase checklist (future)

- [ ] Create repo `ppp-calculator-v2` from this design pack + copied data/scripts  
- [ ] Implement tokens → base → components; build HTML shell  
- [ ] Port `app.js` with parity tests IND→BGD  
- [ ] Add share + theme System  
- [ ] Wrangler project + custom domain v2  
- [ ] Confirm v1 untouched  
- [ ] Cutover plan: prefer shipping UI to apex later; keep v2 noindex until then
