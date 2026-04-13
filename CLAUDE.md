# Utu Buster
## Claude Code Brief

---

### What this is

A free bill comparison tool for whānau in Aotearoa. Enter what you pay, see where you can save. No account, no password, no fuss.

Standalone app extracted from the Whānau Time project.

---

### Design system

**Principle**: Dieter Rams — less but better. Every element earns its place. Nothing decorative.

**Typography**: Roboto only.
- 300 Light — hero quotes, display text, body descriptions, italic attributions
- 400 Regular — event names, card body text, insight text
- 500 Medium — labels, badges, tab names, section headers

**Type scale** (strict — do not deviate):
- Column headers (Bill Buster form): 12px / 500 / 2px letter-spacing / uppercase / `#1a1a2e` — largest label, anchors the form. Provider + Amount.
- Section labels: 9px / **500** / 2.5px letter-spacing / uppercase — applies to ALL section labels everywhere.
- Tab labels: 9px / 500 / 1.8px letter-spacing / uppercase / 1.5 line-height
- Sub-labels: 11px / 300 / 0.3px letter-spacing
- Body text: 12-15px / 300-400 / 1.65-1.75 line-height
- Secondary meta text: 12px / 400 / 1.5 line-height
- Feature display numbers: 52px / 300 / -2px letter-spacing
- Source attributions: 10px / 300 or 400 / italic where appropriate

**Palette**:
- App background: `#F0F4F8`
- Header + dark surfaces: `#1a1a2e`
- Accent blue: `#5A8FA8`, `#7EB8DA`
- Green (savings): `#2D7A4F`
- Amber (warnings/deals): `#E8A87C`, `#C77737`
- Borders: `#D8E6EF`, `#C5D5E0`
- Muted text: `#999`, `#888`, `#555`

**Rules**: 1px horizontal rules divide sections. No card borders on light background.
**Interactions**: Opacity transitions only (0.15-0.2s). No shadows. No gradients (except header). No animations (except header shift).
**Buttons**: ALL buttons app-wide use the same size — 11px / 500 / 0.5px letter-spacing / uppercase / 9px vertical padding.

---

### Three tabs

| Tab | Purpose |
|---|---|
| What I Pay | Enter current providers and amounts |
| Bust It | See savings score, best picks, full breakdown |
| Tips | Weekly rotating money tips, book recs, free help links |

---

### Data

All provider data is inline in index.html (fallback) with live price updates fetched from Vercel Blob (`bill-prices.json`).

Categories: Power, Gas, Solar, Broadband, Mobile, Streaming, Music, Insurance, AI + Tech.

Each provider entry includes: name, plan, monthly price, note, url, features array, and optional badges (local, pick).

---

### API (api/bills.js)

Single unified endpoint with `?action=` routing:
- `?action=report` — Send quarterly email to all subscribers (cron or manual)
- `?action=report&preview=1` — Preview email HTML in browser
- `?action=subscribe` — POST to add email to Resend audience
- `?action=unsub&email=x` — Unsubscribe link handler

**Environment variables needed**:
- `UTU_RESEND_KEY` or `RESEND_API_KEY` — Resend API key for sending emails
- `BILL_AUDIENCE_ID` — Resend audience ID for subscriber list

---

### Quarterly email (cron)

Vercel cron runs `0 9 1 1,4,7,10 *` — 9am on the 1st of Jan, Apr, Jul, Oct.
Sends personalised HTML email with:
- Current NZ average bill stats
- Top 3 savings recommendations with sign-up links
- Hot deals section (update monthly before send)
- Book recommendation (rotates monthly)
- Money tip (rotates monthly)

---

### Tone of voice

Like a trusted local friend — not a council website, not a tech product.

- Welcome: "This is a free wee tool for whanau in Aotearoa to save a bit of money on the bills."
- Score good: "Ka pai — you're getting a good deal."
- Score high: "Here are better options below."

Te reo Maori used naturally throughout. Bilingual labels standard. Never tokenistic.

**Bilingual label format (non-negotiable)**: Always `Te Reo | English` with the pipe character. Te reo leads, English follows as equal partner.

**Vocabulary lock-ins** (use these exact terms, do not substitute):
- **Hot deals** -> `Nga hoko wera`
- **Bills** -> `Nga utu`
- **Save more / bust the price** -> `Patua te utu`
- **Bills changed?** -> `Hurihia nga utu?`
- **Newsletter / quarterly update** -> `Panui`

---

### File structure

```
utu-buster/
  index.html          <- single-page app
  welcome-bg.mp4      <- welcome screen background video
  sw.js               <- service worker (cache-first for shell, network-first for API)
  vercel.json         <- cron config for quarterly bill report
  api/
    bills.js          <- unified API endpoint (report/subscribe/unsub)
    bill-data.js      <- quarterly provider pricing data
    subscribe-push.js <- web push subscription handler
  CLAUDE.md
```

---

### Production TODO

- [ ] Set up Vercel project and deploy
- [ ] Set environment variables: UTU_RESEND_KEY, BILL_AUDIENCE_ID
- [ ] Add PWA manifest + icons for mobile home screen install
- [ ] Connect bill-scan cron to update live prices in Vercel Blob
- [ ] Fix subscribe-push.js dependency on lib/db.js (needs Vercel Blob helper)
- [ ] Add custom domain
- [ ] Update bill-data.js quarterly with fresh provider pricing
- [ ] Update HOT_DEALS in api/bills.js monthly before quarterly send
