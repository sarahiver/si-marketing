// src/utils/analytics.js
// Zentrales Analytics-Modul für S&I Marketing
// Alle Event-Tracking-Funktionen an einem Ort
//
// GA4 Events werden nur gefeuert, wenn der User Cookies akzeptiert hat.
// Alle Funktionen prüfen ob gtag verfügbar ist, bevor sie feuern.
//
// DEV-MODUS: ?notrack=1 an die URL hängen → GA4 + Vercel Analytics deaktiviert.
// Merkt sich die Einstellung per localStorage. Aufheben mit ?notrack=0

const GA_MEASUREMENT_ID = 'G-G9DKBTJRJJ';
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
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
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
// LOAD / REMOVE GA
// ============================================
export const loadGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;
  if (isNotrack) return; // Dev-Modus: nichts laden
  if (window.gtag) return; // Already loaded

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // A/B-Test Variante als Custom Dimension setzen
  // Diese muss in GA4 unter Admin > Custom Definitions angelegt werden:
  // Name: ab_variant, Scope: User, Parameter: ab_variant
  const abVariant = (() => { try { return localStorage.getItem('si_ab_variant') || 'unknown'; } catch { return 'unknown'; } })();
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
    send_page_view: true,
    // Custom User Properties für A/B-Segmentierung
    user_properties: {
      ab_variant: abVariant,
    },
  });
};

export const removeGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

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
// CONTACT FORM EVENTS
// ============================================
export const trackFormStart = () => {
  trackEvent('form_start', {
    event_category: 'contact',
    event_label: 'contact_form_interaction',
  });
};

export const trackFormSubmit = (theme, selectedPackage) => {
  trackEvent('generate_lead', {
    event_category: 'contact',
    event_label: 'contact_form_submit',
    theme: theme || 'unknown',
    package: selectedPackage || 'unknown',
    currency: 'EUR',
    value: selectedPackage === 'Premium' ? 2490 : selectedPackage === 'Standard' ? 1790 : 1290,
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
export const trackDemoClick = (themeName, demoUrl) => {
  trackEvent('demo_click', {
    event_category: 'engagement',
    event_label: themeName,
    demo_url: demoUrl,
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


// ============================================
// A/B TEST EVENTS
// ============================================
export const trackABConversion = (variant, theme, packageName) => {
  trackEvent('ab_conversion', {
    event_category: 'ab_test',
    ab_variant: variant,
    theme: theme || 'unknown',
    package: packageName || 'unknown',
  });
};

export const trackEngagementScrollDepth = (percent, variant, theme) => {
  // Nur bei 25%, 50%, 75%, 90% feuern
  const milestones = [25, 50, 75, 90];
  if (!milestones.includes(percent)) return;
  trackEvent('scroll_depth_milestone', {
    event_category: 'engagement',
    ab_variant: variant,
    percent_scrolled: percent,
    theme: theme || 'unknown',
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
  trackCookieConsent,
  trackSectionView,
  loadGoogleAnalytics,
  removeGoogleAnalytics,
};
