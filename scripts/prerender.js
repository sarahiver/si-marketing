#!/usr/bin/env node
/**
 * prerender.js — Post-build script for S&I Marketing
 * 
 * Problem: As a React SPA, all routes serve the same index.html.
 * Google sees this as a redirect error because every URL returns identical content.
 * 
 * Solution: After `react-scripts build`, this script creates individual HTML files
 * for each route with the correct <title>, <meta description>, <canonical>, and 
 * Open Graph tags baked into the HTML. Google can then crawl each page correctly.
 * 
 * The JavaScript app still hydrates normally on top of this static HTML.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.sarahiver.com';
const OG_IMAGE = 'https://res.cloudinary.com/si-weddings/image/upload/v1770798416/si_og_image_nx5blq.png';
const BUILD_DIR = path.join(__dirname, '..', 'build');

// ============================================
// ROUTE DEFINITIONS with SEO metadata
// ============================================
const routes = [
  // Homepage (already has index.html, but we update meta tags)
  {
    path: '/',
    title: 'S&I. — Premium Hochzeitswebsites',
    description: 'S&I. — Premium Hochzeitswebsites mit eigenem Design, eigener Domain, digitalem RSVP und Foto-Upload. 6 einzigartige Themes. Ab 1.290€. Aus Hamburg.',
  },
  // Blog overview
  {
    path: '/blog',
    title: 'Hochzeitswebsite Ratgeber & Tipps | S&I. Blog',
    description: 'Alles rund um Hochzeitswebsites: Tipps, Trends, Checklisten und Inspiration. Der S&I. Ratgeber hilft euch bei der Planung eures großen Tages.',
  },
  // Static pages
  {
    path: '/impressum',
    title: 'Impressum | S&I.',
    description: 'Impressum von S&I. — Premium Hochzeitswebsites aus Hamburg.',
    noIndex: true,
  },
  {
    path: '/datenschutz',
    title: 'Datenschutzerklärung | S&I.',
    description: 'Datenschutzerklärung von S&I. — Informationen zum Umgang mit Ihren Daten.',
    noIndex: true,
  },
];

// Blog posts — extracted from blogPosts.js
const blogPosts = [
  { slug: 'warum-hochzeitswebsite', title: 'Warum eine Hochzeitswebsite? 7 Gründe, die jedes Brautpaar überzeugen', description: 'Erfahre, warum immer mehr Paare auf eine eigene Hochzeitswebsite setzen – und wie sie Hochzeitsplanung, Gästemanagement und Kommunikation enorm erleichtert.' },
  { slug: 'digitales-rsvp-hochzeit', title: 'Digitales RSVP: So organisiert ihr die Zusagen für eure Hochzeit stressfrei', description: 'Digitale Zusagen per RSVP-Formular auf der Hochzeitswebsite – alles über Vorteile, Umsetzung und Erinnerungsmails für Brautpaare.' },
  { slug: 'hochzeitswebsite-vergleich-2026', title: 'Hochzeitswebsite Vergleich 2026: Alle Anbieter ehrlich bewertet – und warum S&I. gewinnt', description: 'Wix, Squarespace, Joy, Zankyou oder S&I.? Wir vergleichen die besten Hochzeitswebsite-Anbieter 2026 – ehrlich, detailliert und mit klarer Empfehlung.' },
  { slug: 'hochzeitswebsite-inhalt-checkliste', title: 'Was muss auf eine Hochzeitswebsite? Die ultimative Checkliste für Brautpaare', description: 'Alles was auf eure Hochzeitswebsite gehört: Location, Ablauf, RSVP, Dresscode, Hotels – die komplette Checkliste für Brautpaare.' },
  { slug: 'hochzeitswebsite-kosten-was-kostet', title: 'Was kostet eine Hochzeitswebsite? Preise, Optionen und was sich wirklich lohnt', description: 'Hochzeitswebsite Kosten im Überblick: Von kostenlos bis Premium. Was ihr für euer Budget bekommt und worauf es wirklich ankommt.' },
  { slug: 'hochzeitswebsite-qr-code-einladung', title: 'Hochzeitseinladung mit QR-Code: So verknüpft ihr Print und eure Hochzeitswebsite', description: 'QR-Code auf der Hochzeitseinladung: Wie ihr eure gedruckte Einladung mit der digitalen Hochzeitswebsite verbindet – inkl. Tipps und Design-Ideen.' },
  { slug: 'hochzeitswebsite-eigene-domain-passwortschutz', title: 'Eigene Domain und Passwortschutz: So wird eure Hochzeitswebsite persönlich und sicher', description: 'Eigene Domain und Passwortschutz für eure Hochzeitswebsite – wie ihr sie einrichtet und warum beides einen großen Unterschied macht.' },
  { slug: 'hochzeitswebsite-design-beispiele-inspiration', title: 'Hochzeitswebsite Beispiele 2026: 7 echte Designs zum Anklicken und Erleben', description: 'Entdeckt 7 echte Hochzeitswebsite-Designs von S&I. – von elegant bis modern. Mit Live-Demos zum Anklicken und Inspiration für euren eigenen Stil.' },
  { slug: 'hochzeitswebsite-musikwuensche-playlist', title: 'Musikwünsche auf der Hochzeitswebsite: So entsteht die Playlist, zu der alle tanzen', description: 'Musikwünsche der Gäste über die Hochzeitswebsite sammeln – wie ihr eine unvergessliche Playlist für eure Feier zusammenstellt.' },
  { slug: 'hochzeitswebsite-gaestebuch-digital', title: 'Digitales Gästebuch: Warum die schönsten Worte nicht auf Papier stehen müssen', description: 'Ein digitales Gästebuch auf eurer Hochzeitswebsite: Wie es funktioniert, warum es besser ist als Papier und wie ihr es einrichtet.' },
  { slug: 'hochzeitswebsite-geschenke-wunschliste', title: 'Geschenke und Wunschliste auf der Hochzeitswebsite: So bekommt ihr, was euch wirklich glücklich macht', description: 'Wunschliste und Geschenke auf der Hochzeitswebsite: Wie ihr elegant kommuniziert, was ihr euch wünscht – ohne peinlich zu werden.' },
  { slug: 'hochzeitswebsite-location-anfahrt-karte', title: 'Location und Anfahrt auf der Hochzeitswebsite: Damit sich niemand verfährt', description: 'Location und Anfahrt auf der Hochzeitswebsite: Mit interaktiver Karte, Routenplaner und allen Details, damit eure Gäste stressfrei ankommen.' },
  { slug: 'hochzeitswebsite-hotels-uebernachtung', title: 'Hotels und Übernachtung: So fühlen sich eure Gäste von Anfang bis Ende willkommen', description: 'Hotelempfehlungen auf der Hochzeitswebsite: Wie ihr euren Gästen die besten Unterkünfte vorschlagt und die Buchung erleichtert.' },
  { slug: 'hochzeitswebsite-hochzeits-abc', title: 'Das Hochzeits-ABC: Die kreativste Art, euren Gästen alles Wichtige zu verraten', description: 'Ein Hochzeits-ABC auf eurer Website: Von A wie Anfahrt bis Z wie Zeitplan – kreativ, informativ und unvergesslich.' },
  { slug: 'hochzeitswebsite-faq-haeufige-fragen', title: 'FAQ auf der Hochzeitswebsite: 15 Fragen, die eure Gäste garantiert haben', description: 'FAQ-Seite für die Hochzeitswebsite: Die 15 häufigsten Gästefragen und wie ihr sie elegant auf eurer Website beantwortet.' },
  { slug: 'hochzeitswebsite-foto-upload-gaeste', title: 'Foto-Upload für Hochzeitsgäste: Alle Perspektiven eures schönsten Tages an einem Ort', description: 'Foto-Upload auf der Hochzeitswebsite: Wie eure Gäste Bilder hochladen und ihr alle Fotos des Tages an einem Ort sammelt.' },
  { slug: 'hochzeitswebsite-premium-funktionen', title: 'Das kann sonst keiner: Die Premium-Funktionen von S&I. im Detail', description: 'S&I. Premium-Funktionen im Detail: Admin Dashboard, Foto-Upload, RSVP-System, Gästeliste und mehr – was unsere Hochzeitswebsites einzigartig macht.' },
  { slug: 'hochzeitswebsite-admin-dashboard', title: 'Euer Hochzeits-Cockpit: So funktioniert das S&I. Admin Dashboard', description: 'Das S&I. Admin Dashboard: Gästeliste, RSVP, Fotos, Inhalte – alles an einem Ort verwalten. So funktioniert euer Hochzeits-Cockpit.' },
  { slug: 'hochzeitswebsite-ablauf-customer-journey', title: 'Von der Verlobung bis zum Danke: Eure Reise mit S&I.', description: 'Von der ersten Anfrage bis zur fertigen Hochzeitswebsite: So sieht eure Reise mit S&I. aus – transparent, persönlich und stressfrei.' },
  { slug: 'hochzeitsfotos-teilen-fotoupload-archiv', title: 'Hochzeitsfotos teilen: Vom Gäste-Upload bis zur Archivseite', description: 'Hochzeitsfotos teilen und sammeln: Vom Gäste-Upload während der Feier bis zum permanenten Fotoarchiv – so verpasst ihr kein einziges Bild.' },
  { slug: 'gaesteliste-rsvp-erinnerungsmail-export', title: 'Gästeliste, Erinnerungsmails & Export: So behaltet ihr den Überblick', description: 'Gästeliste verwalten, RSVP-Erinnerungsmails versenden und alles als Excel exportieren – das S&I. Gästemanagement im Detail.' },
];

// Add blog posts to routes
blogPosts.forEach(post => {
  routes.push({
    path: `/blog/${post.slug}`,
    title: `${post.title} | S&I. Ratgeber`,
    description: post.description,
    type: 'article',
  });
});

// ============================================
// HTML GENERATION
// ============================================
function generateHtml(template, route) {
  let html = template;
  const canonicalUrl = `${BASE_URL}${route.path}`;
  const ogType = route.type || 'website';

  // Replace <title>
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(route.description)}"`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonicalUrl}"`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeHtml(route.title)}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(route.description)}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonicalUrl}"`
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="${ogType}"`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}"`
  );

  // Add noindex if needed
  if (route.noIndex) {
    html = html.replace(
      '</head>',
      '    <meta name="robots" content="noindex, nofollow" />\n  </head>'
    );
  }

  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ============================================
// MAIN
// ============================================
function main() {
  const indexPath = path.join(BUILD_DIR, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ build/index.html not found! Run `npm run build` first.');
    process.exit(1);
  }

  const template = fs.readFileSync(indexPath, 'utf-8');
  let created = 0;

  routes.forEach(route => {
    if (route.path === '/') {
      // Update the root index.html in place (already correct meta from CRA)
      const html = generateHtml(template, route);
      fs.writeFileSync(indexPath, html, 'utf-8');
      console.log(`  ✅ / (updated index.html)`);
      created++;
      return;
    }

    // Create directory structure: /blog/slug/index.html
    const dirPath = path.join(BUILD_DIR, route.path);
    fs.mkdirSync(dirPath, { recursive: true });
    
    const html = generateHtml(template, route);
    const filePath = path.join(dirPath, 'index.html');
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`  ✅ ${route.path}`);
    created++;
  });

  console.log(`\n🎉 Prerendered ${created} routes successfully!`);
  console.log('   Each route now has its own index.html with correct meta tags.');
  console.log('   Google will see unique content for each URL.\n');
}

main();
