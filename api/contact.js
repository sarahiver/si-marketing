// api/contact.js
// Vercel Serverless Function — Kontaktformular Backend
// Alle Secrets serverseitig: Brevo API-Key, hCaptcha Secret, Supabase Service Key
// Frontend schickt nur Formulardaten + Captcha-Token

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET;
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || '3');
const BREVO_NOTIFICATION_TEMPLATE_ID = parseInt(process.env.BREVO_NOTIFICATION_TEMPLATE_ID || '0');

// Supabase via REST API (kein npm-Paket nötig in serverless function)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY; // Service Role Key, NICHT anon key

// Allowed origin
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
// VALIDATION
// ============================================
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str, maxLen = 500) {
  if (!str) return '';
  return String(str).trim().substring(0, maxLen);
}

// ============================================
// hCAPTCHA VERIFICATION
// ============================================
async function verifyCaptcha(token) {
  if (!HCAPTCHA_SECRET) {
    console.warn('hCaptcha secret not configured — skipping verification');
    return true;
  }

  const response = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `response=${encodeURIComponent(token)}&secret=${encodeURIComponent(HCAPTCHA_SECRET)}`,
  });

  const data = await response.json();
  return data.success === true;
}

// ============================================
// SUPABASE INSERT (via REST API)
// ============================================
async function saveToSupabase(contactData) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.warn('Supabase not configured — skipping save');
    return null;
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Supabase error: ${error}`);
  }

  const data = await response.json();
  return data[0] || null;
}

// ============================================
// BREVO: CONTACT + NOTIFICATION EMAIL
// ============================================
async function addBrevoContact(formData) {
  if (!BREVO_API_KEY) return;

  await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: formData.email,
      attributes: {
        VORNAME: formData.name.split(' ')[0],
        NACHNAME: formData.name.split(' ').slice(1).join(' ') || '',
        TELEFON: formData.phone || '',
        HOCHZEITSDATUM: formData.weddingDate || '',
        QUELLE: 'Website Kontaktformular',
      },
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    }),
  });
}

async function sendNotificationEmail(formData, contactId) {
  if (!BREVO_API_KEY) return;

  if (BREVO_NOTIFICATION_TEMPLATE_ID > 0) {
    // Via Brevo Template
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        to: [{ email: 'wedding@sarahiver.de', name: 'S&I Wedding' }],
        templateId: BREVO_NOTIFICATION_TEMPLATE_ID,
        params: {
          NAME: formData.name,
          EMAIL: formData.email,
          TELEFON: formData.phone || '–',
          HOCHZEITSDATUM: formData.weddingDate || '–',
          THEME: formData.interestedTheme || '–',
          PAKET: formData.interestedPackage || '–',
          NACHRICHT: formData.message,
          ADMIN_LINK: 'https://admin.sarahiver.de',
          CONTACT_ID: contactId || '–',
        },
      }),
    });
  } else {
    // Fallback: Inline HTML
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        to: [{ email: 'wedding@sarahiver.de', name: 'S&I Wedding' }],
        sender: { email: 'wedding@sarahiver.de', name: 'S&I. Website' },
        subject: `Neue Anfrage von ${formData.name}`,
        htmlContent: buildNotificationHtml(formData, contactId),
      }),
    });
  }
}

function buildNotificationHtml(formData, contactId) {
  // Escape HTML to prevent injection
  const esc = (s) => String(s || '–').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="background: #000; color: #fff; display: inline-block; padding: 8px 16px; font-weight: 700; font-size: 18px; letter-spacing: -0.06em; margin-bottom: 30px;">S&amp;I.</div>
      <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 24px; color: #1a1a1a;">Neue Kontaktanfrage</h1>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #888; width: 140px;">Name</td>
          <td style="padding: 12px 0; color: #1a1a1a; font-weight: 500;">${esc(formData.name)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #888;">E-Mail</td>
          <td style="padding: 12px 0;"><a href="mailto:${esc(formData.email)}" style="color: #1a1a1a;">${esc(formData.email)}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #888;">Telefon</td>
          <td style="padding: 12px 0; color: #1a1a1a;">${esc(formData.phone)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #888;">Hochzeitsdatum</td>
          <td style="padding: 12px 0; color: #1a1a1a;">${esc(formData.weddingDate)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #888;">Theme</td>
          <td style="padding: 12px 0; color: #1a1a1a;">${esc(formData.interestedTheme)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #888;">Paket</td>
          <td style="padding: 12px 0; color: #1a1a1a;">${esc(formData.interestedPackage)}</td>
        </tr>
      </table>
      <div style="background: #f8f8f8; border-left: 3px solid #000; padding: 20px; margin-bottom: 30px;">
        <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Nachricht</p>
        <p style="color: #1a1a1a; line-height: 1.6; margin: 0; white-space: pre-wrap;">${esc(formData.message)}</p>
      </div>
      <a href="https://admin.sarahiver.de" style="display: inline-block; background: #000; color: #fff; padding: 14px 28px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">ZUM ADMIN-BEREICH →</a>
      <p style="color: #ccc; font-size: 12px; margin-top: 40px;">Automatische Benachrichtigung von siwedding.de</p>
    </div>
  `;
}

// ============================================
// RATE LIMITING (simple in-memory, resets on cold start)
// ============================================
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 submissions per minute per IP

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

// ============================================
// HANDLER
// ============================================
export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const corsHeaders = getCorsHeaders(origin);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).end();
  }

  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;

    // Rate limiting
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(clientIp)) {
      return res.status(429).json({ error: 'Zu viele Anfragen. Bitte warte einen Moment.' });
    }

    // 1. Validate captcha
    const { captchaToken } = body;
    if (!captchaToken) {
      return res.status(400).json({ error: 'Captcha fehlt.' });
    }

    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return res.status(400).json({ error: 'Captcha ungültig. Bitte versuche es erneut.' });
    }

    // 2. Validate + sanitize form data
    const formData = {
      name: sanitize(body.name, 200),
      email: sanitize(body.email, 254).toLowerCase(),
      phone: sanitize(body.phone, 30),
      weddingDate: sanitize(body.weddingDate, 20),
      interestedTheme: sanitize(body.interestedTheme, 50),
      interestedPackage: sanitize(body.interestedPackage, 50),
      message: sanitize(body.message, 2000),
    };

    if (!formData.name) {
      return res.status(400).json({ error: 'Name ist erforderlich.' });
    }
    if (!validateEmail(formData.email)) {
      return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
    }
    if (!formData.message) {
      return res.status(400).json({ error: 'Nachricht ist erforderlich.' });
    }

    // 3. Save to Supabase
    let contactId = null;
    const savedContact = await saveToSupabase({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      wedding_date: formData.weddingDate || null,
      interested_theme: formData.interestedTheme || null,
      interested_package: formData.interestedPackage || null,
      message: formData.message,
      source: 'website_contact',
      status: 'new',
      email_confirmed: true,
    });
    contactId = savedContact?.id || null;

    // 4. Brevo: Add contact + send notification
    await addBrevoContact(formData);
    await sendNotificationEmail(formData, contactId);

    return res.status(200).json({ success: true, message: 'Anfrage erfolgreich gesendet.' });

  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.' });
  }
}
