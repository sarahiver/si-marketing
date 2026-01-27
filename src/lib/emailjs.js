// src/lib/emailjs.js
import emailjs from "@emailjs/browser"

// ============================================
// EMAILJS KONFIGURATION
// ============================================
//
// 1. Account erstellen: https://www.emailjs.com/
// 2. Email Service hinzufügen (Gmail empfohlen)
// 3. Email Template erstellen (siehe unten)
// 4. Keys hier eintragen oder in .env
//
// ============================================

// EmailJS Credentials (später in .env verschieben)

const EMAILJS_SERVICE_ID =
  process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_8ge968t"
const EMAILJS_TEMPLATE_ID =
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_g1gei5u"
const EMAILJS_PUBLIC_KEY =
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "ME2poBnMRMUKod-o7"

// Initialisieren
emailjs.init(EMAILJS_PUBLIC_KEY)

/**
 * Sendet E-Mail-Benachrichtigung bei neuer Kontaktanfrage
 */
export async function sendContactNotification(data) {
  try {
    // Template-Parameter vorbereiten
    const templateParams = {
      // Empfänger
      to_email: "wedding@sarahiver.de",

      // Anfrage-Details
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || "Nicht angegeben",
      wedding_date: data.weddingDate
        ? new Date(data.weddingDate).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "Nicht angegeben",
      guest_count: data.guestCount || "Nicht angegeben",
      interested_theme: formatTheme(data.interestedTheme),
      interested_package: formatPackage(data.interestedPackage),
      message: data.message || "Keine Nachricht",

      // Zeitstempel
      submitted_at: new Date().toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
    )

    console.log("Email sent successfully:", response)
    return { success: true, response }
  } catch (error) {
    console.error("Email send error:", error)
    // Fehler nicht werfen - E-Mail ist nice-to-have, nicht kritisch
    return { success: false, error: error.message }
  }
}

// Helper: Theme formatieren
function formatTheme(theme) {
  const themes = {
    editorial: "Editorial – Minimalistisch",
    gold: "Gold – Klassisch Elegant",
    botanical: "Botanical – Natürlich",
    contemporary: "Contemporary – Modern Bold",
    luxe: "Luxe – Zeitlos Edel",
    neon: "Neon – Ausgefallen",
  }
  return themes[theme] || "Noch offen"
}

// Helper: Paket formatieren
function formatPackage(pkg) {
  const packages = {
    essential: "Essential – ab 1.890€",
    premium: "Premium – ab 2.490€",
    luxe: "Luxe – ab 3.290€",
    individual: "Individual – auf Anfrage",
  }
  return packages[pkg] || "Noch offen"
}
