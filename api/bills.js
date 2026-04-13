// Utu Buster — unified API endpoint
// Routes: ?action=report | ?action=subscribe | ?action=unsub

const RESEND_KEY = process.env.UTU_RESEND_KEY || process.env.RESEND_API_KEY;
const DEFAULT_RECIPIENTS = [
  'info@bigrivercreative.org'
];

// ─── Email data (matches app) ────────────────────────────
const AVG_NZ_TOTAL = 420;

// Generic savings when user hasn't stored personal data
const DEFAULT_SAVINGS = [
  { cat: 'Mobile', action: 'Switch your phones to Kogan Mobile 365-day', save: 40, url: 'https://www.kogan.com/nz/kogan-mobile/' },
  { cat: 'Power', action: 'Switch power to Electric Kiwi Stay Ahead 200', save: 40, url: 'https://www.electrickiwi.co.nz/plans' },
  { cat: 'Internet', action: 'Switch broadband to Skinny Unlimited Fibre', save: 27, url: 'https://www.skinny.co.nz/broadband/' },
];

const TIPS = [
  { title: "Ring your power company and say you want to leave",
    body: "Don't actually leave. Just ring, say you're thinking about switching. They'll transfer you to retention, who can knock 15 to 25 percent off your rates on the spot. Have a competitor's quote ready. Takes 10 minutes, saves $300 to $500 a year.",
    source: "Electricity Authority NZ, Powerswitch data" },
  { title: "Sleep on it for three days before buying anything over $50",
    body: "Dan Ariely found this kills 60 to 70 percent of impulse purchases. After three days you usually realise you don't actually care. Most families would keep a couple of thousand a year just from this one habit.",
    source: "Dan Ariely, Predictably Irrational" },
  { title: "Auto-transfer $20 on payday",
    body: "Set up an auto-transfer to a separate account the day you get paid. Even $20. End of year that's $1,040, enough for Christmas, an emergency, or a weekend away. Richard Thaler won a Nobel Prize proving this works.",
    source: "Richard Thaler, Nudge" },
  { title: "Your library card is worth $50 a month",
    body: "Wellington City Libraries gives you free Libby (ebooks and audiobooks), Beamafilm (films), PressReader (newspapers and magazines), and Kanopy (documentaries). That's Netflix, Audible, and Apple News combined, for free.",
    source: "Wellington City Libraries" },
];

const BOOKS = [
  { title: 'The Barefoot Investor, Scott Pape',
    body: 'The most practical money book going. Written for normal people, not finance bros. The bucket system for organising your accounts is worth the read alone.',
    libraryUrl: 'https://www.wcl.govt.nz' },
  { title: 'Nudge, Richard Thaler & Cass Sunstein',
    body: 'Nobel Prize-winning research on how small changes to your defaults make huge differences to your money, health, and happiness. Accessible and practical.',
    libraryUrl: 'https://www.wcl.govt.nz' },
  { title: 'Your Money or Your Life, Vicki Robin',
    body: 'A classic. Teaches you to measure purchases in hours of your life instead of dollars. Changes how you think about every spending decision.',
    libraryUrl: 'https://www.wcl.govt.nz' },
];

// Hot deals — update each month before sending
// Format: { provider, deal, expires (ISO date), url }
const HOT_DEALS = [
  { provider: 'Electric Kiwi', deal: '$200 credit when you switch + first month free', expires: '2026-04-30', url: 'https://www.electrickiwi.co.nz' },
  { provider: 'Skinny', deal: 'Free $20 top-up for new customers', expires: '2026-04-30', url: 'https://www.skinny.co.nz' },
  { provider: 'Now Broadband', deal: 'No setup fee + first month half price on Naked Fibre 300', expires: '2026-04-30', url: 'https://www.now.co.nz' },
];

function getMonthlyTip() { return TIPS[new Date().getMonth() % TIPS.length]; }
function getMonthlyBook() { return BOOKS[new Date().getMonth() % BOOKS.length]; }

// ─── Email HTML builder ──────────────────────────────────
function buildEmailHTML(name = '') {
  const tip = getMonthlyTip();
  const book = getMonthlyBook();
  const displayName = name || 'whānau';
  const savings = DEFAULT_SAVINGS;
  const totalSaving = savings.reduce((s, x) => s + x.save, 0);

  const SECTION_PAD = '24px 24px';
  const LABEL_MB = '14px';
  const LBL_STYLE = 'font-size:9px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#5A8FA8';

  const saveCard = (s) => `
    <div style="background:#fff;border:1px solid #D8E6EF;border-left:4px solid #2D7A4F;border-radius:6px;padding:16px;margin:0 0 10px;">
      <div style="font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#2D7A4F;margin:0 0 6px;">${s.cat}</div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin:0 0 10px;">
        <div style="font-size:14px;font-weight:500;color:#1a1a2e;line-height:1.4;padding-right:12px;">${s.action}</div>
        <div style="font-size:16px;font-weight:500;color:#2D7A4F;white-space:nowrap;">Save $${s.save}/mo</div>
      </div>
      <a href="${s.url}" style="display:inline-block;padding:10px 16px;background:#2D7A4F;color:#fff;text-decoration:none;font-size:12px;font-weight:500;letter-spacing:0.5px;border-radius:6px;">Sign up →</a>
    </div>`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0F4F8;font-family:Roboto,'Helvetica Neue',Arial,sans-serif;color:#1a1a2e;">
<div style="max-width:600px;margin:0 auto;padding:20px;">

  <div style="background:#1a1a2e;color:#F0F4F8;padding:36px 20px 32px;text-align:center;border-radius:6px 6px 0 0;">
    <h1 style="font-size:32px;font-weight:500;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">Utu Buster</h1>
    <div style="font-size:12px;font-weight:400;color:#7EB8DA;letter-spacing:1.5px;text-transform:uppercase;">Save more + Stay informed</div>
  </div>

  <div style="background:#fff;padding:24px 24px 12px;border-left:1px solid #D8E6EF;border-right:1px solid #D8E6EF;">
    <div style="font-size:20px;font-weight:400;color:#1a1a2e;margin:0 0 ${LABEL_MB};">Kia ora ${displayName}</div>
    <div style="font-size:14px;font-weight:300;color:#1a1a2e;line-height:1.6;">Right now, the average NZ whānau is paying <strong style="font-weight:500;font-size:18px;">$${AVG_NZ_TOTAL} / mo</strong></div>
  </div>

  <div style="background:#fff;padding:12px 24px 24px;border-left:1px solid #D8E6EF;border-right:1px solid #D8E6EF;">
    <div style="${LBL_STYLE};margin:0 0 ${LABEL_MB};">Patua te utu, save more</div>
    ${savings.map(saveCard).join('')}
    <div style="background:#2D7A4F;border-radius:6px;padding:16px;margin:10px 0 0;display:flex;justify-content:space-between;align-items:baseline;">
      <div style="font-size:18px;font-weight:500;color:#fff;">Save $${totalSaving}/mo</div>
      <div style="font-size:13px;color:#fff;">$${totalSaving * 12}/year</div>
    </div>
  </div>

  <div style="background:#fff;padding:${SECTION_PAD};border-left:1px solid #D8E6EF;border-right:1px solid #D8E6EF;">
    <div style="${LBL_STYLE};margin:0 0 ${LABEL_MB};">Ngā hoko wera | Hot deals</div>
    ${HOT_DEALS.map(d => `
      <div style="background:#fff;border:1px solid #D8E6EF;border-left:4px solid #E8A87C;border-radius:6px;padding:14px;margin:0 0 8px;">
        <div style="font-size:9px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#E8A87C;margin:0 0 4px;">${d.provider}</div>
        <div style="font-size:13px;font-weight:400;color:#1a1a2e;line-height:1.5;margin:0 0 8px;">${d.deal}</div>
        <a href="${d.url}" style="display:inline-block;font-size:11px;font-weight:500;color:#5A8FA8;text-decoration:none;letter-spacing:0.5px;">View deal →</a>
      </div>
    `).join('')}
    <div style="font-size:10px;font-weight:300;color:#5A8FA8;text-align:center;margin:6px 0 0;">Always check the provider's site for full terms.</div>
  </div>

  <div style="background:#fff;padding:${SECTION_PAD};border-left:1px solid #D8E6EF;border-right:1px solid #D8E6EF;">
    <div style="${LBL_STYLE};margin:0 0 ${LABEL_MB};">Pānui pukapuka, read a book</div>
    <div style="background:#1a1a2e;border-radius:6px;padding:20px;">
      <div style="font-size:15px;font-weight:500;color:#F0F4F8;margin:0 0 8px;">${book.title}</div>
      <div style="font-size:13px;font-weight:300;color:#F0F4F8;line-height:1.6;margin:0 0 12px;">${book.body}</div>
      <a href="${book.libraryUrl}" style="display:inline-block;font-size:12px;font-weight:500;color:#7EB8DA;text-decoration:none;">Find it at your library →</a>
    </div>
  </div>

  <div style="background:#fff;padding:${SECTION_PAD};border-left:1px solid #D8E6EF;border-right:1px solid #D8E6EF;">
    <div style="${LBL_STYLE};margin:0 0 ${LABEL_MB};">Paku whakaaro, a thought</div>
    <div style="background:#EDF5FA;border:1px solid #C5D5E0;border-radius:6px;padding:16px;">
      <div style="font-size:15px;font-weight:500;color:#1a1a2e;margin:0 0 8px;line-height:1.4;">${tip.title}</div>
      <div style="font-size:13px;font-weight:300;color:#1a1a2e;line-height:1.6;margin:0 0 10px;">${tip.body}</div>
      <div style="font-size:11px;font-weight:300;color:#5A8FA8;">${tip.source}</div>
    </div>
  </div>

  <div style="background:#fff;padding:${SECTION_PAD};border-left:1px solid #D8E6EF;border-right:1px solid #D8E6EF;">
    <div style="${LBL_STYLE};margin:0 0 ${LABEL_MB};">Hurihia ngā utu? Bills changed?</div>
    <div style="background:#EDF5FA;border:1px solid #C5D5E0;border-radius:6px;padding:20px;text-align:center;">
      <div style="font-size:13px;font-weight:300;color:#1a1a2e;line-height:1.5;margin:0 0 16px;">Added a service, cancelled one? Update them in the app so next month's email shows your actual savings.</div>
      <a href="https://utu-buster.vercel.app" style="display:inline-block;padding:14px 28px;background:#1a1a2e;color:#F0F4F8;text-decoration:none;font-size:12px;font-weight:500;letter-spacing:1px;text-transform:uppercase;border-radius:6px;">Check your numbers →</a>
    </div>
  </div>

  <div style="background:#1a1a2e;color:#F0F4F8;padding:24px 20px;text-align:center;border-radius:0 0 6px 6px;">
    <div style="font-size:12px;font-weight:300;color:#F0F4F8;margin:0 0 8px;line-height:1.6;">Utu Buster, a free community app for whānau in Aotearoa.</div>
    <div style="font-size:11px;font-weight:300;color:#7EB8DA;margin:0 0 14px;">Made with aroha by <a href="https://www.bigrivercreative.org" style="color:#7EB8DA;text-decoration:none;">Big River Creative</a></div>
    <a href="https://utu-buster.vercel.app/api/bills?action=unsub&email={{EMAIL}}" style="font-size:10px;color:#7EB8DA;text-decoration:none;">Unsubscribe</a>
  </div>

</div>
</body>
</html>`;
}

function buildPlainText() {
  const tip = getMonthlyTip();
  const book = getMonthlyBook();
  const totalSaving = DEFAULT_SAVINGS.reduce((s, x) => s + x.save, 0);
  let text = `UTU BUSTER\nSave more + Stay informed\n\n`;
  text += `Kia ora,\n\nRight now the average NZ whānau is paying $${AVG_NZ_TOTAL}/mo.\n\n`;
  text += `── PATUA TE UTU, SAVE MORE ──\n`;
  for (const s of DEFAULT_SAVINGS) {
    text += `\n${s.cat}\n${s.action}\nSave $${s.save}/mo\n${s.url}\n`;
  }
  text += `\nSave $${totalSaving}/mo ($${totalSaving * 12}/year)\n\n`;
  text += `── NGĀ HOKO WERA | HOT DEALS ──\n`;
  for (const d of HOT_DEALS) {
    text += `\n${d.provider}\n${d.deal}\n${d.url}\n`;
  }
  text += `\n── PĀNUI PUKAPUKA, READ A BOOK ──\n${book.title}\n${book.body}\n${book.libraryUrl}\n\n`;
  text += `── PAKU WHAKAARO, A THOUGHT ──\n${tip.title}\n${tip.body}\n${tip.source}\n\n`;
  text += `── HURIHIA NGĀ UTU? BILLS CHANGED? ──\nAdded a service, cancelled one? Update them in the app.\nhttps://utu-buster.vercel.app\n\n`;
  text += `Made with aroha by Big River Creative\nbigrivercreative.org\n`;
  return text;
}

// ─── Helpers ─────────────────────────────────────────────
async function getSubscribers() {
  const audienceId = process.env.BILL_AUDIENCE_ID;
  if (!audienceId) return [];
  try {
    const r = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      headers: { Authorization: `Bearer ${RESEND_KEY}` }
    });
    if (!r.ok) return [];
    const data = await r.json();
    return (data.data || []).filter(c => !c.unsubscribed).map(c => ({ email: c.email, name: c.first_name || '' }));
  } catch { return []; }
}

// ─── Actions ─────────────────────────────────────────────
async function handleReport(req, res) {
  if (req.method === 'GET' && req.query.preview === '1') {
    res.setHeader('Content-Type', 'text/html');
    return res.send(buildEmailHTML(req.query.name || ''));
  }
  if (!RESEND_KEY) return res.status(500).json({ error: 'RESEND_API_KEY not set' });

  const text = buildPlainText();
  const subscribers = await getSubscribers();
  const defaults = DEFAULT_RECIPIENTS.map(email => ({ email, name: '' }));
  const seen = new Set();
  const allRecipients = [...defaults, ...subscribers].filter(r => {
    if (seen.has(r.email)) return false;
    seen.add(r.email);
    return true;
  });
  const results = [];

  for (const recipient of allRecipients) {
    const html = buildEmailHTML(recipient.name).replace('{{EMAIL}}', encodeURIComponent(recipient.email));
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Utu Buster <onboarding@resend.dev>',
          to: recipient.email,
          subject: `Utu Buster, are you paying too much?`,
          html, text
        })
      });
      const data = await r.json();
      results.push({ email: recipient.email, status: r.ok ? 'sent' : 'failed', id: data.id || data.message });
    } catch (err) {
      results.push({ email: recipient.email, status: 'error', error: err.message });
    }
  }
  res.json({ sent: results.filter(r => r.status === 'sent').length, total: allRecipients.length, results });
}

async function handleSubscribe(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const { email, name } = req.body || {};
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Please enter a valid email' });
  if (!RESEND_KEY) return res.status(500).json({ error: 'Email service temporarily unavailable' });

  let audienceId = process.env.BILL_AUDIENCE_ID;
  if (!audienceId) {
    try {
      const r = await fetch('https://api.resend.com/audiences', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Utu Buster Subscribers' })
      });
      const data = await r.json();
      audienceId = data.id;
    } catch { return res.status(500).json({ error: 'Failed to create audience' }); }
  }

  try {
    const body = { email, unsubscribed: false };
    if (name) body.first_name = name;
    const r = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await r.json();
    if (!r.ok) return res.status(400).json({ error: data.message || 'Couldn\'t subscribe, please try again' });
    return res.json({ ok: true, message: 'Subscribed' });
  } catch { return res.status(500).json({ error: 'Network error, please try again' }); }
}

async function handleUnsub(req, res) {
  const { email } = req.query || {};
  if (!email) return res.status(400).send('<html><body style="font-family:Roboto,sans-serif;padding:40px;text-align:center;"><h2>Missing email</h2></body></html>');

  const audienceId = process.env.BILL_AUDIENCE_ID;
  if (!audienceId || !RESEND_KEY) return res.status(500).send('<html><body style="font-family:Roboto,sans-serif;padding:40px;text-align:center;"><h2>Service not configured</h2></body></html>');

  try {
    const listRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      headers: { Authorization: `Bearer ${RESEND_KEY}` }
    });
    const listData = await listRes.json();
    const contact = (listData.data || []).find(c => c.email === decodeURIComponent(email));
    if (contact) {
      await fetch(`https://api.resend.com/audiences/${audienceId}/contacts/${contact.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ unsubscribed: true })
      });
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(`<!DOCTYPE html>
<html><body style="font-family:Roboto,'Helvetica Neue',sans-serif;background:#ECEAE4;margin:0;padding:60px 20px;text-align:center;">
  <div style="max-width:400px;margin:0 auto;">
    <div style="font-size:9px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#C77737;margin:0 0 12px;">Whānau Time</div>
    <h2 style="font-weight:300;font-size:20px;margin:0 0 12px;">Unsubscribed</h2>
    <p style="font-size:14px;font-weight:300;color:#666;line-height:1.6;">You won't receive any more quarterly bill comparisons.<br>Ka kite — see you around.</p>
  </div>
</body></html>`);
  } catch {
    res.status(500).send('<html><body style="font-family:Roboto,sans-serif;padding:40px;text-align:center;"><h2>Something went wrong</h2></body></html>');
  }
}

// ─── Router ──────────────────────────────────────────────
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action || (req.headers['x-vercel-cron'] ? 'report' : '');

  switch (action) {
    case 'report': return handleReport(req, res);
    case 'subscribe': return handleSubscribe(req, res);
    case 'unsub': return handleUnsub(req, res);
    default: return res.status(400).json({ error: 'Missing action param. Use: ?action=report|subscribe|unsub' });
  }
}
