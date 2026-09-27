# PPP Calculator v2

**Staging host:** https://v2.ppp.tanishqnalloju.com  
**Production (v1, frozen):** https://ppp.tanishqnalloju.com  

Same money. Different prices. Minimalist redesign of the PPP salary calculator.

## Stack

Static HTML / CSS / JS + Cloudflare Worker assets (`ppp-calculator-v2`).

## Develop

```bash
npm install
npm run sync-assets
npm run parity   # IND→BGD number check
npm run dev
```

## Deploy

```bash
npm run deploy   # Worker name: ppp-calculator-v2 only
```

Do **not** deploy to Worker `ppp-calculator` or change apex DNS.

## SEO (staging)

`robots` meta: `noindex, follow`. Canonical → apex. `robots.txt` Disallows `/`.

## License

MIT. Fonts: Geist (OFL), Newsreader (OFL). See `fonts/`.
