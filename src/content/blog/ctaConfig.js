// src/content/blog/ctaConfig.js
// Konfiguration des Conversion-Layers für die Blog-Artikel.
//
// Idee: EINE CTA-Komponente (WeddingWebsiteCTA), vier inhaltliche Varianten.
// Welcher Artikel welche Variante bekommt, steht hier — nicht im Artikel-Code.
// Neue Artikel brauchen also nur eine Zeile in ARTICLE_VARIANTS (oder gar
// nichts, dann greift die Heuristik in resolveVariant()).
//
// Varianten:
//   inspiration  – Trends/Farben/Inspiration → „so könnte eure Seite aussehen"
//   planning     – Planung/Checklisten       → „alle Infos an einem Ort"
//   high_intent  – Vergleich/Kosten/Anbieter → Produkt direkt zeigen + Anfrage
//   playful      – Quiz/Spiele/JGA           → weicher, emotionaler Übergang

// ============================================
// ZIEL-DEFINITIONEN
// ============================================
// 'themes'  → interne Theme-Galerie (/#themes, DemoFilmstrip) — dort liegen
//             die Elemente, die laut Report bereits geklickt werden.
// 'demo'    → direkte Live-Demo auf siwedding.de (neuer Tab)
// 'contact' → Anfrageformular (/#contact)

export const CTA_VARIANTS = {
  inspiration: {
    id: 'inspiration',
    eyebrow: 'S&I. Hochzeitswebsites',
    title: 'Eure Hochzeit darf genauso besonders aussehen.',
    text: 'Entdeckt unsere Premium-Hochzeitswebsites und seht, wie eure eigene Hochzeitsseite aussehen könnte.',
    primary: { label: 'Hochzeitswebsites entdecken', target: 'themes' },
    secondary: { label: 'Live-Demo ansehen', target: 'demo' },
    demoTheme: 'editorial',
    // Kurzer, unaufdringlicher Hinweis nach dem ersten Abschnitt.
    hint: {
      text: 'Alles, was ihr hier plant, landet später auf einer Seite:',
      label: 'acht echte Hochzeitswebsites ansehen',
      target: 'themes',
    },
  },

  planning: {
    id: 'planning',
    eyebrow: 'Alles an einem Ort',
    title: 'Eine Hochzeit. Ein Ort für alle wichtigen Infos.',
    text: 'Save-the-Date, Ablauf, Location, Anfahrt, Unterkunft, RSVP und mehr – alles an einem Ort, den eure Gäste jederzeit aufrufen können.',
    primary: { label: 'Live-Demo ansehen', target: 'demo' },
    secondary: { label: 'Alle acht Designs ansehen', target: 'themes' },
    demoTheme: 'classic',
    hint: {
      text: 'Ihr müsst euch das nicht vorstellen –',
      label: 'schaut euch eine fertige Hochzeitswebsite an',
      target: 'demo',
    },
  },

  high_intent: {
    id: 'high_intent',
    eyebrow: 'S&I. Hochzeitswebsites',
    title: 'Ihr sucht gerade nach einer Hochzeitswebsite?',
    text: 'Schaut euch an, wie eine individuell gestaltete S&I. Hochzeitswebsite aussehen kann – acht Designs, alle live zum Durchklicken, mit RSVP, Galerie und Gästebereich.',
    primary: { label: 'Beispiele ansehen', target: 'themes' },
    secondary: { label: 'Anfrage starten', target: 'contact' },
    demoTheme: 'classic',
    hint: {
      text: 'Ihr vergleicht gerade Anbieter?',
      label: 'Acht S&I. Designs live ansehen',
      target: 'themes',
    },
  },

  playful: {
    id: 'playful',
    eyebrow: 'Nach dem Spiel',
    title: 'Und eure Hochzeit?',
    text: 'Aus all den Ideen, Spielen und Plänen wird irgendwann euer großer Tag. Eine eigene Hochzeitswebsite bringt alles zusammen – vom Save-the-Date bis zu den Fotos danach.',
    primary: { label: 'Hochzeitswebsite entdecken', target: 'themes' },
    secondary: null,
    demoTheme: 'contemporary',
    // Bewusst kein Früh-Hinweis: Quiz-Leser sind noch nicht im Kaufmodus.
    hint: null,
  },
};

// ============================================
// ARTIKEL → VARIANTE
// ============================================
// Priorisiert sind die 10 stärksten organischen Einstiegsseiten (GSC, Sep 2026).
export const ARTICLE_VARIANTS = {
  // --- Top 10 organische Einstiege ---
  'brautpaar-quiz-polterabend': 'playful',
  'hochzeitstrends-2027': 'inspiration',
  'uebereinstimmungsspiel-hochzeit-fragen': 'playful',
  'hochzeitsquiz-fragen-vorlage': 'playful',
  'hochzeitswebsite-vergleich-2026': 'high_intent',
  'hochzeitsfarben-2027': 'inspiration',
  'hochzeit-2027-planen-checkliste': 'planning',
  'hochzeitswebsite-kosten-was-kostet': 'high_intent',
  'hochzeitswebsite-inhalt-checkliste': 'planning',
  'wann-hochzeitswebsite-erstellen-zeitpunkt': 'planning',

  // --- weitere Artikel mit klarer Intention ---
  'hochzeitswebsite-erstellen-lassen': 'high_intent',
  'kostenlose-hochzeitswebsite-haken': 'high_intent',
  'hochzeitswebsite-ki-baukasten-oder-persoenlich': 'high_intent',
  'hochzeits-app-vs-hochzeitswebsite': 'high_intent',
  'warum-hochzeitswebsite': 'high_intent',
  'hochzeitswebsite-design-beispiele-inspiration': 'inspiration',
  'hochzeitsdatum-2027': 'planning',
  'kleine-hochzeit-2027-micro-wedding': 'inspiration',
};

// ============================================
// HEURISTIK (Fallback für alle nicht gelisteten Artikel)
// ============================================
const HIGH_INTENT_HINTS = ['vergleich', 'kosten', 'anbieter', 'erstellen-lassen', 'baukasten', 'kostenlose', 'preis'];
const PLAYFUL_HINTS = ['quiz', 'spiel', 'jga', 'polterabend', 'fragen'];
const INSPIRATION_HINTS = ['trend', 'farben', 'design', 'inspiration', 'beispiele', 'micro'];

export const resolveVariantId = (slug = '') => {
  if (ARTICLE_VARIANTS[slug]) return ARTICLE_VARIANTS[slug];
  const s = String(slug).toLowerCase();
  if (PLAYFUL_HINTS.some(h => s.includes(h))) return 'playful';
  if (HIGH_INTENT_HINTS.some(h => s.includes(h))) return 'high_intent';
  if (INSPIRATION_HINTS.some(h => s.includes(h))) return 'inspiration';
  return 'planning';
};

export const getCTAVariant = (slug) => CTA_VARIANTS[resolveVariantId(slug)] || CTA_VARIANTS.planning;

// ============================================
// INTERNE KONTEXT-LINKS (§12)
// ============================================
// Wenige, inhaltlich sinnvolle Links — keine Link-Farm. Werden am Artikelende
// über der Conversion-Box ausgegeben, wenn für den Slug etwas hinterlegt ist.
export const CONTEXT_LINKS = {
  playful: [
    { to: '/blog/hochzeitswebsite-inhalt-checkliste', label: 'Was auf eure Hochzeitswebsite gehört' },
    { to: '/brautpaar-quiz', label: 'Brautpaar-Quiz-Generator (kostenlos)' },
  ],
  planning: [
    { to: '/blog/wann-hochzeitswebsite-erstellen-zeitpunkt', label: 'Wann ihr die Hochzeitswebsite erstellen solltet' },
    { to: '/hochzeitsbudget-rechner', label: 'Hochzeitsbudget-Rechner (kostenlos)' },
  ],
  inspiration: [
    { to: '/blog/hochzeitswebsite-design-beispiele-inspiration', label: 'Design-Beispiele für Hochzeitswebsites' },
    { to: '/blog/hochzeit-2027-planen-checkliste', label: 'Checkliste: Hochzeit 2027 planen' },
  ],
  high_intent: [
    { to: '/blog/hochzeitswebsite-kosten-was-kostet', label: 'Was eine Hochzeitswebsite kostet' },
    { to: '/blog/hochzeitswebsite-inhalt-checkliste', label: 'Inhalte-Checkliste für eure Hochzeitswebsite' },
  ],
};

// Verhindert, dass ein Artikel auf sich selbst verlinkt.
export const getContextLinks = (slug) =>
  (CONTEXT_LINKS[resolveVariantId(slug)] || []).filter(l => l.to !== `/blog/${slug}`);
