// api/confirm.js
// Vercel Serverless Function — Double Opt-In Bestätigung
// Ersetzt den direkten Brevo-API-Call aus dem Frontend (ConfirmPage.js)
// Alle Secrets bleiben serverseitig

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const ALLOWED_ORIGINS = [
  'https://siwedding.de',
  'https://www.siwedding.de',
  'https://si-marketing.vercel.app',
  'http://localhost:3000',
];

function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// ============================================
// SUPABASE HELPERS (via REST API)
// ============================================
async function supabaseGet(table, filters = {}) {
  let url = `${SUPABASE_URL}/rest/v1/${table}?`;
  const params = Object.entries(filters).map(([key, val]) => `${key}=eq.${val}`);
  url += params.join('&');

  const response = await fetch(url, {
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Supabase GET error: ${err}`);
  }

  return response.json();
}

async function supabaseUpdate(table, id, data) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Supabase UPDATE error: ${err}`);
  }

  return response.json();
}

// ============================================
// BREVO: Update contact attributes
// ============================================
async function updateBrevoContact(email, attributes) {
  if (!BREVO_API_KEY) {
    console.warn('⚠️ BREVO_API_KEY not set — skipping Brevo update');
    return;
  }

  try {
    const resp = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ attributes }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      console.error('Brevo update error:', resp.status, err);
    } else {
      console.log('✅ Brevo contact updated:', email);
    }
  } catch (err) {
    console.error('Brevo update fetch error:', err);
  }
}

// ============================================
// HANDLER
// ============================================
export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(200).end();
  }

  Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, type, id } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'E-Mail fehlt.' });
    }

    // ─── CONTACT CONFIRMATION ───
    if (type === 'contact' && id) {
      if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
        return res.status(500).json({ error: 'Server nicht konfiguriert.' });
      }

      // 1. Check if already confirmed
      const rows = await supabaseGet('contact_requests', { id });
      const contact = rows[0];

      if (!contact) {
        return res.status(404).json({ error: 'Kontaktanfrage nicht gefunden.' });
      }

      if (contact.email_confirmed) {
        return res.status(200).json({ success: true, alreadyConfirmed: true });
      }

      // 2. Update Supabase
      await supabaseUpdate('contact_requests', id, {
        email_confirmed: true,
        confirmed_at: new Date().toISOString(),
      });

      // 3. Update Brevo
      await updateBrevoContact(email, {
        EMAIL_BESTAETIGT: true,
        BESTAETIGT_AM: new Date().toISOString(),
      });

      return res.status(200).json({ success: true, alreadyConfirmed: false });
    }

    // ─── WAITLIST CONFIRMATION ───
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return res.status(500).json({ error: 'Server nicht konfiguriert.' });
    }

    // 1. Find waitlist entry
    const rows = await supabaseGet('waitlist', { email: email.toLowerCase() });
    const entry = rows[0];

    if (!entry) {
      return res.status(404).json({ error: 'Eintrag nicht gefunden.' });
    }

    if (entry.confirmed) {
      return res.status(200).json({ success: true, alreadyConfirmed: true });
    }

    // 2. Confirm
    await supabaseUpdate('waitlist', entry.id, { confirmed: true });

    // 3. Update Brevo
    await updateBrevoContact(email, {
      EMAIL_BESTAETIGT: true,
      BESTAETIGT_AM: new Date().toISOString(),
    });

    return res.status(200).json({ success: true, alreadyConfirmed: false });

  } catch (error) {
    console.error('❌ Confirm API error:', error);
    return res.status(500).json({ error: 'Ein Fehler ist aufgetreten.' });
  }
}
