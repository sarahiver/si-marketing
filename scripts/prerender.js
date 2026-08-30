#!/usr/bin/env node
/**
 * prerender.js — Post-build script for S&I Marketing
 *
 * Problem: Als React-SPA liefern alle Routen dasselbe leere index.html.
 * Crawler ohne JavaScript (Bing, AI-Crawler, SEO-Tools) sehen: kein H1,
 * keinen Inhalt, keine internen Links. Google muss jede Seite erst rendern,
 * was Indexierung verzögert ("Discovered - currently not indexed").
 *
 * Lösung: Nach `react-scripts build` erzeugt dieses Script pro Route eine
 * eigene HTML-Datei mit korrektem <title>, Meta-Tags, Canonical, JSON-LD
 * UND — für Blog-Artikel und die Blog-Übersicht — dem vollständigen
 * Artikelinhalt als statisches HTML in <div id="root">.
 *
 * React (createRoot().render) ersetzt den statischen Inhalt beim Laden
 * vollständig — kein Hydration-Konflikt, keine sichtbare Änderung für User
 * mit JavaScript. Crawler sehen sofort echten Inhalt und echte Links.
 *
 * Datenquelle: src/content/blog/blogPosts.js wird als ES-Modul importiert
 * (kein Regex-Parsing mehr) — Titles, Descriptions, Content und das
 * optionale Feld `seoTitle` bleiben damit immer synchron zur Runtime.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const BASE_URL = 'https://www.sarahiver.com';
const BUILD_DIR = path.join(__dirname, '..', 'build');
const TITLE_SUFFIX = ' | S&I.';

// ============================================
// HELPERS
// ============================================
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Inline-Markdown → HTML (gleiches Feature-Set wie renderMarkdown in BlogArticle.js)
function inlineMd(text) {
  return escapeHtml(text)
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

// Block-Markdown → HTML (Headings, Listen, Tabellen, Bilder, Absätze —
// exakt die Syntax, die der React-Renderer unterstützt)
function renderMarkdownToHtml(content) {
  if (!content) return '';
  const lines = content.trim().split('\n');
  const out = [];
  let i = 0;
  let tableRows = [];
  let inTable = false;

  const flushTable = () => {
    if (!tableRows.length) return;
    const [head, ...body] = tableRows;
    out.push('<table><thead><tr>' + head.map(c => `<th>${inlineMd(c)}</th>`).join('') + '</tr></thead>');
    out.push('<tbody>' + body.map(r => '<tr>' + r.map(c => `<td>${inlineMd(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table>');
    tableRows = [];
    inTable = false;
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) { flushTable(); i++; continue; }

    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      flushTable();
      out.push(`<img src="${escapeHtml(imgMatch[2])}" alt="${escapeHtml(imgMatch[1])}" loading="lazy" style="max-width:100%;height:auto;border-radius:8px;" />`);
      i++; continue;
    }

    if (line.startsWith('|') && line.endsWith('|')) {
      if (line.match(/^\|[\s\-:|]+\|$/)) { i++; continue; }
      tableRows.push(line.split('|').filter(Boolean).map(c => c.trim()));
      inTable = true;
      i++; continue;
    } else if (inTable) {
      flushTable();
    }

    if (line.startsWith('### ')) {
      out.push(`<h3>${inlineMd(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      out.push(`<h2>${inlineMd(line.slice(3))}</h2>`);
    } else if (line.startsWith('- ')) {
      const items = [line.slice(2)];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('- ')) {
        i++;
        items.push(lines[i].trim().slice(2));
      }
      out.push('<ul>' + items.map(it => `<li>${inlineMd(it)}</li>`).join('') + '</ul>');
    } else {
      out.push(`<p>${inlineMd(line)}</p>`);
    }
    i++;
  }
  flushTable();
  return out.join('\n');
}

// Related Posts: gleiche Logik wie in BlogArticle.js (Kategorie +3, geteilte Tags +1)
function getRelatedPosts(post, allPosts) {
  return allPosts
    .filter(p => p.slug !== post.slug)
    .map(p => {
      let score = 0;
      if (p.category === post.category) score += 3;
      const sharedTags = (p.tags || []).filter(t => (post.tags || []).includes(t));
      score += sharedTags.length;
      return { ...p, _score: score };
    })
    .sort((a, b) => b._score - a._score || new Date(b.date) - new Date(a.date))
    .slice(0, 3);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ============================================
// STATIC BODY GENERATION (in <div id="root">)
// ============================================
const ROOT_STYLE = 'max-width:720px;margin:0 auto;padding:40px 20px;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;line-height:1.7;color:#1a1a1a;';

function articleBodyHtml(post, allPosts) {
  const related = getRelatedPosts(post, allPosts);
  const relatedHtml = related.length
    ? `<nav aria-label="Verwandte Artikel">
        <h2>Das könnte euch auch interessieren</h2>
        <ul>
          ${related.map(p => `<li><a href="/blog/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a></li>`).join('\n          ')}
        </ul>
      </nav>`
    : '';

  return `
    <div style="${ROOT_STYLE}">
      <nav aria-label="Breadcrumb">
        <a href="/">S&amp;I. — Premium Hochzeitswebsites</a> · <a href="/blog">Ratgeber</a>
      </nav>
      <article>
        <p>${escapeHtml(post.category || 'Ratgeber')} · ${escapeHtml(formatDate(post.date))}${post.readTime ? ' · ' + escapeHtml(post.readTime) : ''}</p>
        <h1>${escapeHtml(post.title)}</h1>
        ${post.image ? `<img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt || post.title)}" style="max-width:100%;height:auto;border-radius:8px;" />` : ''}
        ${renderMarkdownToHtml(post.content)}
      </article>
      <p><a href="/#themes">Unsere Hochzeitswebsite-Themes ansehen</a> · <a href="/blog">Alle Ratgeber-Artikel</a></p>
      ${relatedHtml}
    </div>`;
}

function blogIndexBodyHtml(allPosts) {
  const sorted = [...allPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  return `
    <div style="${ROOT_STYLE}">
      <nav aria-label="Breadcrumb"><a href="/">S&amp;I. — Premium Hochzeitswebsites</a></nav>
      <h1>Hochzeitswebsite Ratgeber &amp; Tipps</h1>
      <p>Alles rund um Hochzeitswebsites: Tipps, Trends, Checklisten und Inspiration für eure Hochzeitsplanung.</p>
      ${sorted.map(p => `
      <article>
        <h2><a href="/blog/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a></h2>
        <p>${escapeHtml(p.description)}</p>
      </article>`).join('\n')}
      <p><a href="/#themes">Unsere Hochzeitswebsite-Themes ansehen</a></p>
    </div>`;
}

function homeBodyHtml(allPosts) {
  const latest = [...allPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  return `
    <div style="${ROOT_STYLE}">
      <h1>S&amp;I. — Premium Hochzeitswebsites</h1>
      <p>Premium Hochzeitswebsites mit eigenem Design, eigener Domain, digitalem RSVP und Foto-Upload. Einzigartige Themes. Ab 1.290&nbsp;€. Aus Hamburg.</p>
      <nav aria-label="Hauptnavigation">
        <ul>
          <li><a href="/blog">Hochzeitswebsite Ratgeber</a></li>
        </ul>
      </nav>
      <h2>Neueste Ratgeber-Artikel</h2>
      <ul>
        ${latest.map(p => `<li><a href="/blog/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a></li>`).join('\n        ')}
      </ul>
    </div>`;
}

function toolBodyHtml({ h1, text, links }) {
  return `
    <div style="${ROOT_STYLE}">
      <nav aria-label="Breadcrumb"><a href="/">S&amp;I. — Premium Hochzeitswebsites</a></nav>
      <h1>${escapeHtml(h1)}</h1>
      <p>${escapeHtml(text)}</p>
      <ul>
        ${links.map(([href, label]) => `<li><a href="${escapeHtml(href)}">${escapeHtml(label)}</a></li>`).join('\n        ')}
      </ul>
    </div>`;
}

// ============================================
// HTML GENERATION (head + body)
// ============================================
function generateHtml(template, route) {
  let html = template;
  const canonicalUrl = `${BASE_URL}${route.path === '/' ? '/' : route.path}`;
  const ogType = route.type || 'website';

  html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeHtml(route.description)}"`);
  html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonicalUrl}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeHtml(route.title)}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeHtml(route.description)}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`);
  html = html.replace(/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="${ogType}"`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escapeHtml(route.title)}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${escapeHtml(route.description)}"`);

  if (route.image) {
    html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${escapeHtml(route.image)}"`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${escapeHtml(route.image)}"`);
  }

  if (route.noIndex) {
    html = html.replace('</head>', '    <meta name="robots" content="noindex, nofollow" />\n  </head>');
  }

  // JSON-LD Schema (Artikel)
  if (route.schema) {
    const schemaJson = JSON.stringify(route.schema).replace(/</g, '\\u003c');
    html = html.replace('</head>', `    <script type="application/ld+json">${schemaJson}</script>\n  </head>`);
  }

  // Statischer Inhalt in <div id="root"> — React ersetzt ihn beim Mount.
  if (route.bodyHtml) {
    html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${route.bodyHtml}</div>`);
  }

  return html;
}

// ============================================
// MAIN
// ============================================
async function main() {
  // blogPosts.js als ES-Modul laden (Datei ist reine Daten ohne JSX):
  // Kopie als .mjs in ein Temp-Verzeichnis, dann dynamischer Import.
  const srcPath = path.join(__dirname, '..', 'src', 'content', 'blog', 'blogPosts.js');
  const tmpPath = path.join(os.tmpdir(), `blogPosts-${Date.now()}.mjs`);
  fs.copyFileSync(srcPath, tmpPath);
  let allPosts;
  try {
    const mod = await import('file://' + tmpPath);
    allPosts = mod.default;
  } finally {
    fs.unlinkSync(tmpPath);
  }
  if (!Array.isArray(allPosts) || allPosts.length === 0) {
    throw new Error('prerender: keine Blog-Posts aus blogPosts.js importiert!');
  }
  console.log(`   ${allPosts.length} Blog-Artikel aus blogPosts.js importiert`);

  const routes = [
    {
      path: '/',
      title: 'S&I. — Premium Hochzeitswebsites',
      description: 'S&I. — Premium Hochzeitswebsites mit eigenem Design, eigener Domain, digitalem RSVP und Foto-Upload. 6 einzigartige Themes. Ab 1.290€. Aus Hamburg.',
      bodyHtml: homeBodyHtml(allPosts),
    },
    {
      path: '/blog',
      title: 'Hochzeitswebsite Ratgeber & Tipps | S&I. Blog',
      description: 'Alles rund um Hochzeitswebsites: Tipps, Trends, Checklisten und Inspiration. Der S&I. Ratgeber hilft euch bei der Planung eures großen Tages.',
      bodyHtml: blogIndexBodyHtml(allPosts),
    },
    // Kostenlose Tools (Linkable Assets) — mit statischem Inhalt fürs Crawling
    {
      path: '/hochzeitsbudget-rechner',
      title: 'Hochzeitsbudget-Rechner: Was kostet eure Hochzeit wirklich?',
      description: 'Gästezahl wählen, 8 kurze Fragen beantworten – realistische Kostenschätzung erhalten. Vom DIY-Gartenfest bis zur Premium-Hochzeit. Kostenlos, ohne Anmeldung.',
      bodyHtml: toolBodyHtml({
        h1: 'Der Hochzeitsbudget-Rechner',
        text: 'Beantwortet 8 kurze Fragen zu eurer Feier und erhaltet einen realistischen Kosten-Richtwert – vom selbst organisierten Gartenfest bis zur Premium-Hochzeit. Basierend auf DACH-Erfahrungswerten, Stand 2026. Kostenlos und ohne Anmeldung.',
        links: [
          ['/blog/hochzeit-2027-planen-checkliste', 'Hochzeit 2027 planen: Die komplette Checkliste'],
          ['/blog/hochzeitswebsite-kosten-was-kostet', 'Hochzeitswebsite Kosten: Alle Preismodelle'],
          ['/hochzeitsdatum-finder', 'Zum Hochzeitsdatum-Finder'],
        ],
      }),
    },
    {
      path: '/hochzeitsdatum-finder',
      title: 'Hochzeitsdatum-Finder 2027 & 2028: Schnapszahlen, Feiertage & Brückentage',
      description: 'Findet euer perfektes Hochzeitsdatum: Alle Schnapszahl-Termine, langen Wochenenden und Brückentage 2027 & 2028 – kostenlos, für jedes Bundesland, Österreich und die Schweiz.',
      bodyHtml: toolBodyHtml({
        h1: 'Der Hochzeitsdatum-Finder',
        text: 'Alle Schnapszahl-Termine, langen Wochenenden und Brückentage für 2027 und 2028 – für jedes Bundesland, Österreich und die Schweiz. Kostenlos und ohne Anmeldung.',
        links: [
          ['/blog/hochzeitsdatum-2027', 'Hochzeitsdatum 2027: Die besten Termine'],
          ['/blog/hochzeit-unter-der-woche', 'Hochzeit unter der Woche: Warum der Mittwoch boomt'],
          ['/hochzeitsbudget-rechner', 'Zum Hochzeitsbudget-Rechner'],
        ],
      }),
    },
    {
      path: '/brautpaar-quiz',
      title: 'Brautpaar-Quiz-Generator: Fragen für Polterabend, JGA & Hochzeit',
      description: 'Erstellt euer persönliches Brautpaar-Quiz in 2 Minuten: 50 Fragen nach Kategorien, eigene Fragen ergänzen, drucken oder im Präsentationsmodus an die Wand werfen. Kostenlos.',
      bodyHtml: toolBodyHtml({
        h1: 'Der Brautpaar-Quiz-Generator',
        text: 'Stellt euer persönliches Brautpaar-Quiz in 2 Minuten zusammen: 50 Fragen nach Kategorien, eigene Fragen ergänzen, drucken oder im Präsentationsmodus zeigen. Kostenlos und ohne Anmeldung.',
        links: [
          ['/blog/hochzeitsquiz-fragen-vorlage', 'Hochzeitsquiz: Die 40 besten Fragen für eure Gäste'],
          ['/blog/uebereinstimmungsspiel-hochzeit-fragen', 'Übereinstimmungsspiel: 35 Fragen & Anleitung'],
          ['/blog/brautpaar-quiz-polterabend', 'Brautpaar-Quiz: 30 Fragen für den Polterabend'],
        ],
      }),
    },
    // Embed-Varianten: noindex (laufen nur im iframe auf fremden Seiten)
    {
      path: '/embed/hochzeitsbudget-rechner',
      title: 'Hochzeitsbudget-Rechner (Embed)',
      description: 'Einbettbare Version des Hochzeitsbudget-Rechners von S&I.',
      noIndex: true,
    },
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

  allPosts.forEach(post => {
    routes.push({
      path: `/blog/${post.slug}`,
      // seoTitle (optional, ≤53 Zeichen empfohlen) überschreibt den langen Titel
      title: `${post.seoTitle || post.title}${TITLE_SUFFIX}`,
      description: post.description,
      type: 'article',
      image: post.image || null,
      schema: post.schema
        ? {
            ...post.schema,
            '@context': 'https://schema.org',
            url: `${BASE_URL}/blog/${post.slug}`,
            image: post.image,
            dateModified: post.date,
          }
        : null,
      bodyHtml: articleBodyHtml(post, allPosts),
    });
  });

  const indexPath = path.join(BUILD_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ build/index.html not found! Run `npm run build` first.');
    process.exit(1);
  }

  const template = fs.readFileSync(indexPath, 'utf-8');

  // Guard: Template muss ein LEERES #root haben (frischer CRA-Build).
  // Verhindert, dass ein zweiter Lauf ohne Rebuild bereits injizierten
  // Inhalt als Template weiterverwendet.
  if (!/<div id="root">\s*<\/div>/.test(template)) {
    console.error('\u274c build/index.html enth\u00e4lt bereits injizierten Inhalt.');
    console.error('   Erst `react-scripts build` ausf\u00fchren, dann prerender.js (macht `npm run build` automatisch).');
    process.exit(1);
  }
  let created = 0;

  routes.forEach(route => {
    const html = generateHtml(template, route);
    if (route.path === '/') {
      fs.writeFileSync(indexPath, html, 'utf-8');
      console.log('  ✅ / (updated index.html)');
    } else {
      const dirPath = path.join(BUILD_DIR, route.path);
      fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf-8');
      console.log(`  ✅ ${route.path}`);
    }
    created++;
  });

  console.log(`\n🎉 Prerendered ${created} routes (Head-Metas + statischer Inhalt).`);
  console.log('   Crawler sehen jetzt H1, Artikeltext und interne Links ohne JavaScript.\n');
}

main().catch(err => {
  console.error('❌ prerender failed:', err);
  process.exit(1);
});
