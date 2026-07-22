// src/components/marketing/demoData.js
// Zentrale Daten für alle Demo-Darstellungen (Filmstreifen, andere Theme-Branches).
//
// THEME_SCREENSHOTS: Full-Page-Screenshots (hoch!) — für den Desktop-Hover-Effekt,
//   bei dem die Seite im Frame durchscrollt.
// THEME_HEROES: 4:3-Hero-Ausschnitte — für Mobile, wo es kein Hover gibt und das
//   statische Bild allein verkaufen muss. Sobald ein Hero-Bild eingetragen ist,
//   wird es mobil genutzt; fehlt es, wird automatisch ein Crop aus dem
//   Full-Page-Screenshot erzeugt (Fallback).

export const ALL_DEMOS = [
  { id: 'classic', name: 'Classic', url: 'https://siwedding.de/demo-classic' },
  { id: 'botanical', name: 'Botanical', url: 'https://siwedding.de/demo-botanical' },
  { id: 'contemporary', name: 'Contemporary', url: 'https://siwedding.de/demo-contemporary' },
  { id: 'editorial', name: 'Editorial', url: 'https://siwedding.de/demo-editorial' },
  { id: 'luxe', name: 'Luxe', url: 'https://siwedding.de/demo-luxe' },
  { id: 'modern', name: 'Modern', url: 'https://siwedding.de/demo-parallax' },
  { id: 'neon', name: 'Neon', url: 'https://siwedding.de/demo-neon' },
  { id: 'video', name: 'Video', url: 'https://siwedding.de/demo-video' },
];

export const TAGLINES = {
  classic: 'Zeitlos in Schwarz-Weiß',
  botanical: 'Grün, organisch, glasklar',
  contemporary: 'Verspielt & farbstark',
  editorial: 'Magazin-Look mit Statement',
  luxe: 'Gold, Ruhe, Eleganz',
  modern: 'Minimalistisch mit Parallax',
  neon: 'Mutig, digital, laut',
  video: 'Cinematisch mit Bewegtbild',
};

// Full-page screenshots hosted on Cloudinary
// Naming: {theme}_demoShowcase_{cloudinarySlug}.jpg
// HINWEIS (Jul 2026): editorial + neon liefern aktuell 400 von Cloudinary
// (Assets fehlen/gelöscht) — neu hochladen und URLs hier aktualisieren.
export const THEME_SCREENSHOTS = {
  editorial: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1770290063/editorial_demoShowcase_gmxabx.jpg',
  botanical: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1770727740/botanical_demoShowcase_optimized_cd6i9j.jpg',
  contemporary: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1770297629/coontemporary_demoShowcase_wiicti.jpg',
  luxe: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1770727740/luxe_demoShowcase_optimized_u31jnq.jpg',
  neon: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1770727741/neon_demoShowcase_optimized_ppdbp4.jpg',
  video: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1770727740/video_demoShowcase_optimized_jrlsoh.jpg',
  classic: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1771224839/Bildschirmfoto_16-2-2026_75342_www.siwedding.de_gbf6ps.jpg',
};

// 4:3-Hero-Bilder für Mobile — HIER die neuen Cloudinary-URLs eintragen.
// Empfehlung: 1600×1200 Screenshot des jeweiligen Demo-Heros (ohne Browser-Chrome),
// Upload nach Cloudinary, dann q_auto,f_auto,w_800 in die URL.
export const THEME_HEROES = {
  // classic: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/vXXXX/classic_hero.jpg',
};

// Themes, deren Demo horizontal scrollt — die Desktop-Preview scrollt dann
// von links nach rechts statt von oben nach unten. Der Full-Page-Screenshot
// muss dafür QUER sein (ein hoher, breiter Streifen der ganzen Seite).
export const HORIZONTAL_THEMES = ['video'];

// Thumbnail-Crop vom oberen Seitenbereich (für Grids/Karten)
export const thumbUrl = (url) =>
  url ? url.replace('/upload/q_auto,f_auto,w_1200/', '/upload/q_auto,f_auto,c_fill,g_north,w_600,h_450/') : undefined;

// 4:3-Hero-Fallback aus dem Full-Page-Screenshot, solange kein echtes Hero-Bild existiert.
// Vertikale Seiten: Crop von oben (g_north); horizontale Seiten: Crop von links (g_west).
export const heroFallbackUrl = (url, horizontal = false) =>
  url ? url.replace('/upload/q_auto,f_auto,w_1200/', `/upload/q_auto,f_auto,c_fill,${horizontal ? 'g_west' : 'g_north'},w_800,h_600/`) : undefined;

// Bestes verfügbares Mobile-Bild für eine Demo
export const mobileCardUrl = (id) =>
  THEME_HEROES[id] || heroFallbackUrl(THEME_SCREENSHOTS[id], HORIZONTAL_THEMES.includes(id));

export const trackDemoClick = (label, url, source) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'demo_click', {
      event_category: 'engagement',
      event_label: label,
      demo_url: url,
      source,
    });
  }
};
