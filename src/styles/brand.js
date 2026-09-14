// src/styles/brand.js
// ════════════════════════════════════════════════════════════════════════
// S&I. BRAND ART DIRECTION — Marketing-Seite
// ════════════════════════════════════════════════════════════════════════
// Eigene Brand-Ästhetik der Marketingseite, inspiriert vom Classic-Theme:
// warm, ruhig, editorial. Bewusst NICHT identisch mit der Classic-Demo —
// die acht Produktdesigns bleiben davon unberührt.
//
// Alles, was hier steht, ist an einer Stelle änderbar. Farben, Schriftgrößen
// und Bilder nie direkt in den Sektionen hardcoden.

// ── FARBEN ──────────────────────────────────────────────────────────────
export const brand = {
  ivory: '#FAF9F6',
  sand: '#E8E1D9',
  taupe: '#C9B8A7',
  olive: '#686F5C',
  charcoal: '#222222',

  // Abstufungen für Text und Linien
  ink: '#222222',
  inkSoft: 'rgba(34, 34, 34, 0.68)',
  inkMuted: 'rgba(34, 34, 34, 0.45)',
  line: 'rgba(34, 34, 34, 0.10)',
  lineSoft: 'rgba(34, 34, 34, 0.06)',

  onDark: '#FAF9F6',
  onDarkSoft: 'rgba(250, 249, 246, 0.78)',
  onDarkMuted: 'rgba(250, 249, 246, 0.55)',
};

// ── SCHRIFTEN ───────────────────────────────────────────────────────────
// Playfair Display wird in public/index.html nachgeladen.
// Mrs Saint Delafield war bereits im Projekt — für die handschriftlichen
// Notizen aus dem Referenz-Mockup.
export const font = {
  serif: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  script: "'Mrs Saint Delafield', cursive",
};

// ── TYPO-SKALA ──────────────────────────────────────────────────────────
// clamp(mobil, fluid, desktop) — ein Wert pro Ebene, nie pro Sektion neu.
export const type = {
  h1: 'clamp(2.65rem, 5.6vw, 4.75rem)',   // 42 → 76px
  h2: 'clamp(2.25rem, 4vw, 3.5rem)',      // 36 → 56px
  h3: 'clamp(1.4rem, 2vw, 2rem)',         // 22 → 32px
  body: 'clamp(1rem, 1.1vw, 1.125rem)',   // 16 → 18px
  small: '0.875rem',
  eyebrow: '0.7rem',
  button: '0.875rem',
};

export const leading = {
  h1: '1.0',
  h2: '1.08',
  h3: '1.25',
  body: '1.65',
};

// ── LAYOUT ──────────────────────────────────────────────────────────────
export const layout = {
  maxWidth: '1340px',
  narrow: '780px',
  gutter: 'clamp(1.5rem, 5vw, 4.5rem)',
  sectionY: 'clamp(4.5rem, 11vh, 9rem)',
};

// ── BEWEGUNG ────────────────────────────────────────────────────────────
export const motion = {
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
  reveal: '600ms',
  hover: '450ms',
};

// ── BILDER ──────────────────────────────────────────────────────────────
// Zentral, damit ein Motiv später ohne Code-Eingriff getauscht werden kann.
// Bestehende Cloudinary-Assets zuerst; Unsplash nur dort, wo im Projekt
// kein passendes Motiv vorhanden war (Editorial Wedding, natürliches Licht).
const cld = (id, w) =>
  `https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_${w}/${id}`;

export const images = {
  // vorhandenes Asset, bisher schon im Hero
  heroDesktop: cld('v1769072318/si_cooming_soon_luxe_hero_wowu9v.jpg', 2000),
  heroTablet: cld('v1769072318/si_cooming_soon_luxe_hero_wowu9v.jpg', 1200),
  heroMobile: cld('v1769072318/si_cooming_soon_luxe_hero_wowu9v.jpg', 800),

  // Abschluss-CTA — ruhiges Detailmotiv statt Brautpaar-Porträt
  finalCta: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000',
};

// ── HELFER ──────────────────────────────────────────────────────────────
export const eyebrowStyle = `
  font-family: ${font.sans};
  font-size: ${type.eyebrow};
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`;

// Primärer Button: gefüllt, dunkel. Für "Demo ansehen" / "Anfrage starten".
export const buttonPrimary = `
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.9rem;
  font-family: ${font.sans};
  font-size: ${type.button};
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: none;
  border: 1px solid ${brand.charcoal};
  background: ${brand.charcoal};
  color: ${brand.ivory};
  border-radius: 2px;
  cursor: pointer;
  transition: all ${motion.hover} ${motion.ease};

  &:hover {
    background: ${brand.olive};
    border-color: ${brand.olive};
  }
`;

// Sekundär: Outline. Nie zwei gefüllte Buttons nebeneinander.
export const buttonSecondary = `
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.95rem 1.9rem;
  font-family: ${font.sans};
  font-size: ${type.button};
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: none;
  border: 1px solid ${brand.line};
  background: transparent;
  color: ${brand.charcoal};
  border-radius: 2px;
  cursor: pointer;
  transition: all ${motion.hover} ${motion.ease};

  &:hover {
    border-color: ${brand.charcoal};
  }
`;

// Handschriftliche Notiz — sparsam, nie informationstragend
export const scriptNote = `
  font-family: ${font.script};
  font-size: clamp(1.4rem, 2.2vw, 2rem);
  line-height: 1.15;
  color: ${brand.inkMuted};
  transform: rotate(-4deg);
  pointer-events: none;
  user-select: none;
`;

const brandTokens = { brand, font, type, leading, layout, motion, images };
export default brandTokens;
