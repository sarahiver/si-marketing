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
export const THEME_SCREENSHOTS = {
  editorial: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1784712397/Editorial_full_rs21tn.jpg',
  botanical: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1770727740/botanical_demoShowcase_optimized_cd6i9j.jpg',
  contemporary: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1770297629/coontemporary_demoShowcase_wiicti.jpg',
  luxe: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1784712397/Luxe_full_saacqv.jpg',
  neon: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1784712397/Neon_full_uwsn2f.jpg',
  video: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1770727740/video_demoShowcase_optimized_jrlsoh.jpg',
  classic: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1200/v1771224839/Bildschirmfoto_16-2-2026_75342_www.siwedding.de_gbf6ps.jpg',
};

// 4:3-Hero-Bilder für Mobile (vollständig seit Jul 2026).
// Format: Screenshot des jeweiligen Demo-Heros, ausgeliefert mit q_auto,f_auto,w_800.
export const THEME_HEROES = {
  classic: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1784713089/classic_mobile_jq0bhr.png',
  botanical: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1784713088/botanical_mobile_tyjoee.png',
  contemporary: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1784713088/contemporary_mobile_fnaa4n.png',
  editorial: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1784713088/editorial_mobile_m78tat.png',
  luxe: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1784713088/luxe_mobile_a5ltpq.png',
  modern: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1784713087/modern_mobile_bfzthy.png',
  neon: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1784713087/neon_mobile_aylnsv.png',
  video: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1784713087/video_mobile_tpvlju.png',
};

// Mobile-Screenshots (Hochkant, ~9:19) für die Handy-Frames im mobilen
// Filmstrip. Aufnahme: DevTools Device-Toolbar (iPhone-Viewport 390px),
// dann Screenshot. HIER URLs eintragen; Fallback ist ein Hochkant-Crop
// aus dem Full-Page-Screenshot (zeigt dann allerdings das Desktop-Layout).
export const THEME_MOBILE_SCREENS = {
  // classic: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_450/vXXXX/classic_phone.png',
};

// Hochkant-Fallback aus dem Full-Page-Screenshot für den Handy-Frame
export const phoneFallbackUrl = (url, horizontal = false) =>
  url ? url.replace('/upload/q_auto,f_auto,w_1200/', `/upload/q_auto,f_auto,c_fill,${horizontal ? 'g_west' : 'g_north'},w_450,h_950/`) : undefined;

// Bestes verfügbares Bild für den mobilen Handy-Frame
export const phoneCardUrl = (id) =>
  THEME_MOBILE_SCREENS[id] || phoneFallbackUrl(THEME_SCREENSHOTS[id], HORIZONTAL_THEMES.includes(id));

// Video-Previews für Themes, die sich nicht als Full-Page-Screenshot erfassen
// lassen (z.B. Modern/Parallax). Desktop zeigt dann eine loopende
// Bildschirmaufnahme statt des Scroll-Effekts. MP4 von Cloudinary,
// URL-Muster: .../video/upload/q_auto/vXXXX/datei.mp4
export const THEME_VIDEO_PREVIEWS = {
  modern: 'https://res.cloudinary.com/si-weddings/video/upload/q_auto/v1784712419/Modern_full_mdxizl.mp4',
  video: 'https://res.cloudinary.com/si-weddings/video/upload/q_auto/v1784712439/Video_full_ns28th.mp4',
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
