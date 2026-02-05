// src/lib/emailjs.js
// ⚠️ DEPRECATED – EmailJS wurde durch Brevo ersetzt.
// Diese Datei existiert nur noch als leerer Platzhalter,
// falls irgendwo noch ein Import existiert.
// Die Kontakt-Benachrichtigung läuft über /api/contact.js (Serverless Function).

export async function sendContactNotification() {
  console.warn("emailjs ist deaktiviert. Benachrichtigungen laufen über /api/contact.")
  return { success: false, error: "emailjs deaktiviert" }
}
