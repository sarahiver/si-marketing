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

// Blog posts — dynamisch aus src/content/blog/blogPosts.js gelesen,
// damit Titles/Descriptions im statischen HTML NIE wieder von den
// Runtime-Daten abweichen. (Vorher war die Liste hier hart kodiert:
// 11 Artikel fehlten komplett und mehrere Titles waren veraltet —
// Google bekam andere Snippets als die Seite selbst zeigte.)
const blogPosts = (() => {
  const src = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'content', 'blog', 'blogPosts.js'),
    'utf8'
  );
  const posts = [];
  const re = /slug:\s*'((?:[^'\\]|\\.)*)'[\s\S]*?title:\s*'((?:[^'\\]|\\.)*)'[\s\S]*?description:\s*'((?:[^'\\]|\\.)*)'/g;
  let match;
  while ((match = re.exec(src)) !== null) {
    const unesc = (str) => str.replace(/\\'/g, "'");
    posts.push({ slug: unesc(match[1]), title: unesc(match[2]), description: unesc(match[3]) });
  }
  if (posts.length === 0) {
    throw new Error('prerender: keine Blog-Posts aus blogPosts.js extrahiert — Regex prüfen!');
  }
  console.log(`   ${posts.length} Blog-Artikel aus blogPosts.js extrahiert`);
  return posts;
})();

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
