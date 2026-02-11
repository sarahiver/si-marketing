// src/utils/constants.js

export const THEMES = {
  editorial: {
    id: "editorial",
    name: "Editorial",
    description: "Minimalistisch modern in Schwarz/Weiß",
    color: "#1A1A1A",
  },
  gold: {
    id: "gold",
    name: "Gold Luxury",
    description: "Klassisch elegant mit Gold-Akzenten",
    color: "#D4AF37",
  },
  botanical: {
    id: "botanical",
    name: "Botanical",
    description: "Natürlich organisch mit Grüntönen",
    color: "#5C7C5C",
  },
  contemporary: {
    id: "contemporary",
    name: "Contemporary",
    description: "Modern & clean mit klaren Linien",
    color: "#2D3748",
  },
  luxe: {
    id: "luxe",
    name: "Luxe",
    description: "Opulent & raffiniert mit dunklen Tönen",
    color: "#E8D5B7",
  },
  intimate: {
    id: "intimate",
    name: "Intimate",
    description: "Warm & romantisch in sanften Farben",
    color: "#8B6F5C",
  },
  timeless: {
    id: "timeless",
    name: "Timeless",
    description: "Zeitlos klassisch mit Serifenschriften",
    color: "#2C2C2C",
  },
  neon: {
    id: "neon",
    name: "Neon",
    description: "Mutig & modern mit leuchtenden Akzenten",
    color: "#FF00FF",
  },
}

export const PACKAGES = {
  essential: {
    id: "essential",
    name: "Essential",
    price: 1890,
    description: "Perfekter Einstieg",
    features: [
      "5 Komponenten nach Wahl",
      "1 Premium-Theme",
      "1 Feedback-Runde",
      "E-Mail Support",
      "Hosting bis 1 Monat nach Hochzeit",
    ],
    maxComponents: 5,
  },
  signature: {
    id: "signature",
    name: "Signature",
    price: 2490,
    description: "Unser Bestseller",
    features: [
      "8 Komponenten nach Wahl",
      "Alle Premium-Themes",
      "2 Feedback-Runden",
      "Kick-off Call (60 Min.)",
      "Hosting bis 3 Monate nach Hochzeit",
    ],
    maxComponents: 8,
    popular: true,
  },
  luxe: {
    id: "luxe",
    name: "Luxe",
    price: 2990,
    description: "Full-Service Erlebnis",
    features: [
      "12 Komponenten nach Wahl",
      "Alle Premium-Themes",
      "Unlimited Feedback-Runden",
      "2 persönliche Meetings (je 90 Min.)",
      "Hosting bis 6 Monate nach Hochzeit",
      "Priority Support",
    ],
    maxComponents: 12,
  },
  individual: {
    id: "individual",
    name: "Individual",
    price: 3890,
    description: "Vollständig maßgeschneidert",
    features: [
      "Unbegrenzte Komponenten",
      "Custom Design-Entwicklung",
      "Unbegrenzte Meetings",
      "Content-Creation Support",
      "Hosting bis 12 Monate nach Hochzeit",
      "Dedicated Account Manager",
    ],
    maxComponents: 999,
  },
}

export const STANDARD_COMPONENTS = [
  { id: "navigation", name: "Navigation", alwaysEnabled: true },
  { id: "hero", name: "Hero-Section", alwaysEnabled: true },
  { id: "footer", name: "Footer", alwaysEnabled: true },
]

export const OPTIONAL_COMPONENTS = [
  {
    id: "countdown",
    name: "Countdown",
    description: "Animierter Countdown bis zur Hochzeit",
  },
  {
    id: "ueberUns",
    name: "Über Uns",
    description: "Eure Liebesgeschichte & Kennenlern-Story",
  },
  {
    id: "ablauf",
    name: "Tagesablauf",
    description: "Timeline mit allen Events des Tages",
  },
  {
    id: "locations",
    name: "Locations",
    description: "Karten, Adressen & Wegbeschreibungen",
  },
  {
    id: "rsvp",
    name: "RSVP",
    description: "Online-Zusage mit Gästeverwaltung",
  },
  {
    id: "galerie",
    name: "Galerie",
    description: "Bildergalerie mit euren schönsten Fotos",
  },
  {
    id: "geschenke",
    name: "Geschenkeliste",
    description: "Digitale Wunschliste für eure Gäste",
  },
  {
    id: "faq",
    name: "FAQ",
    description: "Antworten auf häufige Fragen",
  },
  {
    id: "abc",
    name: "Hochzeits-ABC",
    description: "Alphabetischer Guide von A-Z",
  },
  {
    id: "unterkunft",
    name: "Unterkünfte",
    description: "Hotel-Empfehlungen für eure Gäste",
  },
  {
    id: "dresscode",
    name: "Dresscode",
    description: "Styling-Guide für eure Gäste",
  },
  {
    id: "musik",
    name: "Musikwünsche",
    description: "Gäste können Songs vorschlagen",
  },
  {
    id: "gaestebuch",
    name: "Gästebuch",
    description: "Digitale Glückwünsche sammeln",
  },
  {
    id: "trauzeugen",
    name: "Trauzeugen & Team",
    description: "Vorstellung eurer wichtigsten Personen",
  },
  {
    id: "kontakt",
    name: "Kontakt",
    description: "Kontaktmöglichkeit für Rückfragen",
  },
]

export const PROJECT_STATUS = {
  draft: "Entwurf",
  form_sent: "Formular gesendet",
  form_completed: "Formular ausgefüllt",
  in_progress: "In Bearbeitung",
  review: "Zur Abnahme",
  live: "Live",
  archived: "Archiviert",
}

// Theme-Vorschau-Styles für Admin
export const THEME_PREVIEWS = {
  editorial: {
    background: "linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)",
    color: "#1A1A1A",
    border: "#E0E0E0",
    fontFamily: "'Playfair Display', serif",
    text: "S & I",
  },
  gold: {
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    color: "#D4AF37",
    fontFamily: "'Cormorant Garamond', serif",
    text: "S & I",
  },
  botanical: {
    background: "linear-gradient(135deg, #FAF7F0 0%, #FEFDF8 100%)",
    color: "#5C7C5C",
    fontFamily: "'Libre Baskerville', serif",
    text: "S & I 🌿",
  },
  contemporary: {
    background: "linear-gradient(135deg, #F8F8F8 0%, #FFFFFF 100%)",
    color: "#2D3748",
    fontFamily: "'DM Sans', sans-serif",
    text: "S & I",
  },
  luxe: {
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    color: "#E8D5B7",
    fontFamily: "'Didot', 'Playfair Display', serif",
    text: "S & I",
  },
  intimate: {
    background: "linear-gradient(135deg, #FDF8F5 0%, #FAF0EB 100%)",
    color: "#8B6F5C",
    fontFamily: "'Lora', serif",
    text: "S & I",
  },
  timeless: {
    background: "linear-gradient(135deg, #FFFEF9 0%, #FBF9F3 100%)",
    color: "#2C2C2C",
    fontFamily: "'Cormorant', serif",
    text: "S & I",
  },
  neon: {
    background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)",
    color: "#FF00FF",
    fontFamily: "'Space Grotesk', sans-serif",
    text: "S & I",
  },
}
