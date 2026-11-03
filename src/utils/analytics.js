// src/utils/analytics.js
import { getPackage } from '../lib/pricing';
// Zentrales Analytics-Modul für S&I Marketing
// Alle Event-Tracking-Funktionen an einem Ort
//
// GA4 (und das Google-Ads-Tag) werden erst NACH Einwilligung geladen.
// Vorher existiert kein gtag — alle track*-Funktionen sind dann wirkungslos,
// es gehen keinerlei Anfragen an Google (auch keine cookielosen Pings).
//
// DEV-MODUS: ?notrack=1 an die URL hängen → GA4 + Vercel Analytics deaktiviert.
// Merkt sich die Einstellung per localStorage. Aufheben mit ?notrack=0

const GA_MEASUREMENT_ID = 'G-G9DKBTJRJJ';
// Google Ads — vorher als festes Snippet in public/index.html, jetzt hier,
// damit es hinter dem Consent-Default läuft
const GOOGLE_ADS_ID = 'AW-18486364190';
const NOTRACK_KEY = 'si_notrack';

// ============================================
// NOTRACK CHECK
// ============================================
const initNotrack = () => {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  if (params.has('notrack')) {
    const val = params.get('notrack');
    if (val === '0') {
      localStorage.removeItem(NOTRACK_KEY);
      return false;
    }
    localStorage.setItem(NOTRACK_KEY, '1');
    // URL aufräumen – Parameter entfernen damit er nicht sichtbar bleibt
    params.delete('notrack');
    const clean = params.toString();
    const newUrl = window.location.pathname + (clean ? '?' + clean : '') + window.location.hash;
    window.history.replaceState({}, '', newUrl);
    return true;
  }
  return localStorage.getItem(NOTRACK_KEY) === '1';
};

export const isNotrack = initNotrack();

// Wiederkehrende Besucher mit gespeicherter Einwilligung: GA sofort starten
// (nach der Modul-Auswertung, damit initConsentMode definiert ist).
// Ohne Einwilligung passiert hier nichts.
if (typeof window !== 'undefined') {
  setTimeout(() => { try { initConsentMode(); } catch { /* noop */ } }, 0);
}

// Vercel Analytics blockieren wenn notrack aktiv
if (isNotrack && typeof window !== 'undefined') {
  window.va = function() {}; // Stub Vercel Analytics
  window.vaq = []; // Stub Vercel Analytics queue
}

// ============================================
// HELPER
// ============================================
const isAnalyticsReady = () => {
  if (isNotrack) return false;
  // Nur mit Einwilligung: gtag kann auch von einem fremden Snippet stammen
  return typeof window !== 'undefined' && typeof window.gtag === 'function' && !!window.__siConsentGranted;
};

const hasStoredConsent = () => {
  try { return localStorage.getItem('cookie_consent') === 'accepted'; } catch { return false; }
};

export const trackEvent = (eventName, params = {}) => {
  if (!isAnalyticsReady()) return;
  // engagement_time_msec > 0 signalisiert GA4, dass die Session engaged ist
  // Das löst das 100% Bounce-Rate-Problem bei interagierenden Usern
  window.gtag('event', eventName, {
    ...params,
    engagement_time_msec: 100,
  });
};

// ============================================
// LOAD / REMOVE GA — erst nach Einwilligung (Consent Mode "basic")
// ============================================
// Vorher (bis Nov 2026) lud GA für ALLE Besucher sofort im Modus
// analytics_storage: 'denied' und schickte cookielose Pings. Das widerspricht
// der Vorgabe "keine GA4-Anfragen ohne Einwilligung" — und brachte für die
// Berichte nichts: Ohne Einwilligung gesendete Ereignisse erscheinen in GA4
// erst ab ~1.000 Ereignissen/Tag (Verhaltensmodellierung), also bei uns nie.
//
// Jetzt: gtag.js wird erst geladen, wenn eine Einwilligung vorliegt
// (gespeichert oder per Klick im Banner). Der erste page_view geht beim
// config-Aufruf raus — zum Zeitpunkt der Einwilligung, nicht rückdatiert.
// Google Ads (ad_storage) bleibt verweigert: Der Banner fragt nur nach
// Analyse-Cookies. Lead-Conversions kommen über den GA4-Import nach Ads.

const injectGtag = () => {
  window.dataLayer = window.dataLayer || [];
  // Vorhandenes gtag (z. B. von einem fremden Snippet) weiterverwenden —
  // beide schreiben in denselben dataLayer
  if (typeof window.gtag !== 'function') {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }
  if (!document.querySelector(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);
  }
};

// Startet GA genau einmal — und nur mit Einwilligung.
export const initConsentMode = () => {
  if (typeof window === 'undefined') return;
  if (isNotrack) return; // Dev-Modus: nichts laden
  if (!hasStoredConsent()) return; // ohne Einwilligung: gar nichts laden
  // Eigenes Merkmal statt "gibt es window.gtag?": Ein fremdes Snippet könnte
  // gtag schon angelegt haben — GA4 muss trotzdem konfiguriert werden.
  if (window.__siGtagInit) return;
  window.__siGtagInit = true;

  injectGtag();
  // Reihenfolge wichtig: consent → js → config
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('set', 'ads_data_redaction', true);
  window['ga-disable-' + GA_MEASUREMENT_ID] = false;
  window.__siConsentGranted = true;
  configGA();
};

// Wird von CookieConsent bei "Akzeptieren" (und beim Laden mit gespeicherter
// Einwilligung) aufgerufen. Der Banner speichert die Einwilligung VOR dem
// Aufruf; initConsentMode startet GA dann einmalig — inklusive page_view.
export const loadGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;
  if (isNotrack) return;
  if (!window.__siGtagInit) {
    initConsentMode();
    return;
  }
  // GA lief schon (z. B. Widerruf und erneute Zustimmung im selben Aufruf)
  window['ga-disable-' + GA_MEASUREMENT_ID] = false;
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.__siConsentGranted = true;
};

const configGA = () => {
  window.gtag('js', new Date());
  // Der A/B-Test (Theme-Modal) ist beendet: keine ab_variant-Nutzereigenschaft
  // mehr, und die alten Zuteilungen werden aus dem Browser entfernt.
  try {
    localStorage.removeItem('si_ab_variant');
    localStorage.removeItem('si_ab_modal_shown');
    sessionStorage.removeItem('si_ab_tracked');
  } catch { /* Storage nicht verfügbar */ }

  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
    send_page_view: true,
  });

  // Google Ads im selben Tag. ad_storage bleibt "denied" (Default oben) —
  // der Cookie-Banner fragt nur nach Analyse-Cookies, nicht nach Werbung.
  window.gtag('config', GOOGLE_ADS_ID);
};

// Bei "Ablehnen"/Widerruf: GA sofort stummschalten (keine weiteren Anfragen)
// und vorhandene GA-Cookies aufräumen. Wurde GA nie geladen, gibt es nichts
// zu tun.
export const removeGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;
  window.__siConsentGranted = false;
  window['ga-disable-' + GA_MEASUREMENT_ID] = true;
  if (window.__siGtagInit && window.gtag) {
    window.gtag('consent', 'update', { analytics_storage: 'denied' });
  }

  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (name.startsWith('_ga') || name.startsWith('_gid')) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });
};

// ============================================
// PAGEVIEW (für SPA-Navigation)
// ============================================
export const trackPageView = (path, title) => {
  if (!isAnalyticsReady()) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
    anonymize_ip: true,
  });
};

// ============================================
// BLOG-HERKUNFT (Funnel-Attribution)
// ============================================
// Merkt sich in der Session, über welchen Artikel/CTA der Besucher in den
// Produkt-Funnel eingestiegen ist. Wird beim Anfrage-Start und beim Absenden
// als Event-Parameter mitgeschickt — dadurch ist sichtbar:
// „Dieser Lead kam vom Artikel Brautpaar-Quiz."
//
// WICHTIG: bewusst KEINE utm_*-Parameter für den Sprung nach siwedding.de.
// Die beiden Domains sind in GA4 als Cross-Domain verknüpft; ein utm_source
// würde dort eine NEUE Session/Attribution starten und den Funnel zerreißen.
// Stattdessen: lesbare ?src/&article-Parameter (landen in page_location)
// plus Event-Parameter auf dieser Seite.
const ORIGIN_KEY = 'si_blog_origin';

export const setFunnelOrigin = (origin = {}) => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(ORIGIN_KEY, JSON.stringify({ ...origin, ts: Date.now() }));
  } catch { /* sessionStorage nicht verfügbar */ }
};

export const getFunnelOrigin = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(ORIGIN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

// Flache Parameter für GA4 (keine verschachtelten Objekte erlaubt)
const originParams = () => {
  const o = getFunnelOrigin();
  if (!o) return { source_article: 'none' };
  return {
    source_article: o.article || 'none',
    cta_variant: o.variant || 'none',
    cta_placement: o.placement || 'none',
  };
};

// ============================================
// WEDDING-WEBSITE-CTA EVENTS (SEO → Demo → Anfrage)
// ============================================
// Interner Wechsel von einem Artikel zu einem kaufnahen Inhalt oder zur
// Produktseite. Zeigt in GA4, welcher Blogartikel tatsächlich in Richtung
// Angebot weiterleitet — bisher endete die Messung am CTA-Block.
export const trackProductIntentClick = ({ sourcePath, destinationPath, placement = 'article_body', intentType = 'commercial' }) => {
  trackEvent('product_intent_click', {
    event_category: 'navigation',
    event_label: destinationPath,
    source_path: sourcePath,
    destination_path: destinationPath,
    placement,
    intent_type: intentType,
  });
};

export const trackWeddingCTAView = ({ article, variant, placement }) => {
  trackEvent('wedding_cta_view', {
    event_category: 'conversion',
    event_label: `${variant}_${placement}`,
    article: article || 'unknown',
    cta_variant: variant || 'unknown',
    cta_placement: placement || 'unknown',
  });
};

export const trackWeddingCTAClick = ({ article, variant, placement, target }) => {
  trackEvent('wedding_cta_click', {
    event_category: 'conversion',
    event_label: `${variant}_${placement}`,
    source_page: typeof window !== 'undefined' ? window.location.pathname : '',
    article: article || 'unknown',
    cta_variant: variant || 'unknown',
    cta_placement: placement || 'unknown',
    target: target || 'unknown',
  });
};

export const trackInquiryClick = ({ article, variant, placement } = {}) => {
  trackEvent('inquiry_click', {
    event_category: 'conversion',
    event_label: article || 'site',
    source_page: typeof window !== 'undefined' ? window.location.pathname : '',
    article: article || 'none',
    cta_variant: variant || 'none',
    cta_placement: placement || 'none',
  });
};

export const trackInquirySubmit = (theme, selectedPackage) => {
  trackEvent('inquiry_submit', {
    event_category: 'conversion',
    event_label: 'contact_form_submit',
    theme: theme || 'unknown',
    package: selectedPackage || 'unknown',
    ...originParams(),
  });
};

// ============================================
// CONTACT FORM EVENTS
// ============================================
export const trackFormStart = () => {
  trackEvent('form_start', {
    event_category: 'contact',
    event_label: 'contact_form_interaction',
    ...originParams(),
  });
};

// GA4-Conversion-Wert: Paketpreis ohne Add-ons, 0 bei unbekannter Auswahl
const leadValue = (selectedPackage) => {
  if (!selectedPackage) return 0;
  const pkg = getPackage(String(selectedPackage).toLowerCase());
  return pkg?.price || 0;
};

export const trackFormSubmit = (theme, selectedPackage) => {
  trackEvent('generate_lead', {
    event_category: 'contact',
    event_label: 'contact_form_submit',
    theme: theme || 'unknown',
    package: selectedPackage || 'unknown',
    currency: 'EUR',
    // Wert aus der zentralen Preisliste statt einer vierten Hardcode-Liste
    value: leadValue(selectedPackage),
    ...originParams(),
  });
};

export const trackFormError = (errorType) => {
  trackEvent('form_error', {
    event_category: 'contact',
    event_label: errorType,
  });
};

// ============================================
// PRICING EVENTS
// ============================================
export const trackPricingClick = (packageName) => {
  trackEvent('select_item', {
    event_category: 'pricing',
    event_label: packageName,
    items: [{ item_name: packageName }],
  });
};

// ============================================
// THEME EVENTS
// ============================================
export const trackThemeSwitch = (fromTheme, toTheme) => {
  trackEvent('theme_switch', {
    event_category: 'engagement',
    event_label: toTheme,
    from_theme: fromTheme,
    to_theme: toTheme,
  });
};

// ============================================
// DEMO / OUTBOUND LINK EVENTS
// ============================================
// ACHTUNG: Der Parameter darf NICHT 'source' heißen — GA4 interpretiert
// 'source'/'medium'/'campaign' auf JEDEM Event als manuelle Sitzungsquelle.
// Genau dadurch tauchten im Report Quellen wie "filmstrip / (not set)" auf
// und haben Sitzungen von google/organic abgezogen.
export const trackDemoClick = (themeName, demoUrl, placement, article) => {
  trackEvent('demo_click', {
    event_category: 'engagement',
    event_label: themeName,
    demo_url: demoUrl,
    demo: themeName,
    cta_placement: placement || 'unknown',
    source_page: typeof window !== 'undefined' ? window.location.pathname : '',
    article: article || 'none',
  });
};

export const trackOutboundLink = (url, label) => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: label || url,
    link_url: url,
  });
};

// ============================================
// BLOG EVENTS
// ============================================
export const trackBlogArticleView = (slug, title) => {
  trackEvent('view_item', {
    event_category: 'blog',
    event_label: title,
    content_id: slug,
  });
};

export const trackBlogScrollDepth = (slug, percent) => {
  trackEvent('scroll', {
    event_category: 'blog',
    event_label: slug,
    percent_scrolled: percent,
  });
};

export const trackBlogCTAClick = (slug, ctaType) => {
  trackEvent('cta_click', {
    event_category: 'blog',
    event_label: `${ctaType}_${slug}`,
    content_id: slug,
    cta_type: ctaType,
  });
};

// ============================================
// COOKIE CONSENT EVENT
// ============================================
export const trackCookieConsent = (decision) => {
  // This fires immediately after consent, so GA may just have loaded
  setTimeout(() => {
    trackEvent('cookie_consent', {
      event_category: 'consent',
      event_label: decision, // 'accepted' or 'declined'
    });
  }, 500);
};

// ============================================
// SCROLL-TO-SECTION EVENTS
// ============================================
export const trackSectionView = (sectionName) => {
  trackEvent('section_view', {
    event_category: 'engagement',
    event_label: sectionName,
  });
};


export default {
  trackPageView,
  trackFormStart,
  trackFormSubmit,
  trackFormError,
  trackPricingClick,
  trackThemeSwitch,
  trackDemoClick,
  trackOutboundLink,
  trackBlogArticleView,
  trackBlogScrollDepth,
  trackBlogCTAClick,
  trackWeddingCTAView,
  trackWeddingCTAClick,
  trackInquiryClick,
  trackInquirySubmit,
  setFunnelOrigin,
  getFunnelOrigin,
  trackCookieConsent,
  trackSectionView,
  loadGoogleAnalytics,
  removeGoogleAnalytics,
};
