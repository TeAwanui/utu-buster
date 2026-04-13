/**
 * api/subscribe-push.js
 * Stores a Web Push subscription from the browser.
 *
 * POST /api/subscribe-push
 *   body: { subscription, lat, lng, suburb }
 *
 * Subscriptions are stored in Vercel Blob as push-subscriptions.json.
 * Each entry includes the browser's push subscription object plus location
 * so we can geo-filter when sending new event notifications.
 */

import { getPushSubscriptions, savePushSubscriptions } from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { subscription, lat, lng, suburb } = req.body || {};

    if (!subscription?.endpoint) {
      return res.status(400).json({ error: 'Missing push subscription' });
    }

    const data = await getPushSubscriptions();

    // Deduplicate by endpoint
    const existing = data.subscriptions.findIndex(
      s => s.subscription.endpoint === subscription.endpoint
    );

    const entry = {
      id:           subscription.endpoint.slice(-32), // stable short id
      subscription,
      lat:          lat  ?? null,
      lng:          lng  ?? null,
      suburb:       suburb || null,
      updatedAt:    new Date().toISOString(),
    };

    if (existing !== -1) {
      data.subscriptions[existing] = entry;
    } else {
      data.subscriptions.push(entry);
    }

    await savePushSubscriptions(data);

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[subscribe-push]', err);
    res.status(500).json({ error: err.message });
  }
}
