// api/partner-pdf.js
// Passwortgeschützter Zugang zur Partner-PDF
// URL: sarahiver.com/partner.pdf?pw=Partner2026

import { readFileSync } from 'fs';
import { join } from 'path';

const PASSWORD = process.env.PARTNER_PDF_PASSWORD || 'Partner2026';

export default function handler(req, res) {
  // CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Passwort prüfen (Query-Parameter oder Basic Auth)
  const queryPw = req.query.pw || req.query.password;
  let authorized = queryPw === PASSWORD;

  // Basic Auth fallback
  if (!authorized) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Basic ')) {
      const decoded = Buffer.from(authHeader.slice(6), 'base64').toString();
      const [, pw] = decoded.split(':');
      authorized = pw === PASSWORD;
    }
  }

  if (!authorized) {
    // Zeige eine simple Login-Seite
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(`<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>S&I. Partner-Programm</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F5F5F5; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .card { background: #fff; max-width: 400px; width: 90%; }
    .header { background: #0A0A0A; padding: 24px 32px; }
    .logo { color: #fff; font-size: 22px; font-weight: 700; letter-spacing: -0.06em; }
    .body { padding: 32px; }
    h2 { font-size: 18px; font-weight: 600; margin-bottom: 8px; color: #0A0A0A; }
    p { font-size: 14px; color: #666; margin-bottom: 24px; }
    input { width: 100%; padding: 12px 16px; border: 1px solid #E5E5E5; font-size: 14px; margin-bottom: 16px; outline: none; }
    input:focus { border-color: #0A0A0A; }
    button { width: 100%; padding: 12px; background: #0A0A0A; color: #fff; border: none; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; }
    button:hover { background: #333; }
    .error { color: #C41E3A; font-size: 13px; margin-bottom: 12px; display: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header"><span class="logo">S & I .</span></div>
    <div class="body">
      <h2>Partner-Programm</h2>
      <p>Bitte Passwort eingeben, um die Übersicht herunterzuladen.</p>
      <div class="error" id="err">Falsches Passwort.</div>
      <form onsubmit="go(event)">
        <input type="password" id="pw" placeholder="Passwort" autofocus>
        <button type="submit">PDF öffnen</button>
      </form>
    </div>
  </div>
  <script>
    function go(e) {
      e.preventDefault();
      const pw = document.getElementById('pw').value;
      if (!pw) return;
      window.location.href = '/partner.pdf?pw=' + encodeURIComponent(pw);
    }
    // Show error if redirected back (wrong pw)
    if (new URLSearchParams(window.location.search).has('error')) {
      document.getElementById('err').style.display = 'block';
    }
  </script>
</body>
</html>`);
  }

  // Autorisiert → PDF ausliefern
  try {
    const pdfPath = join(process.cwd(), 'public', 'partner.pdf');
    const pdf = readFileSync(pdfPath);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="SI-Partner-Programm-2026.pdf"');
    res.setHeader('Cache-Control', 'private, no-cache');
    return res.status(200).send(pdf);
  } catch (err) {
    console.error('Partner PDF error:', err);
    return res.status(500).send('PDF nicht gefunden.');
  }
}
