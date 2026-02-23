// src/utils/analytics.js
// Zentrales Analytics-Modul für S&I Marketing
// Alle Event-Tracking-Funktionen an einem Ort
//
// GA4 Events werden nur gefeuert, wenn der User Cookies akzeptiert hat.
// Alle Funktionen prüfen ob gtag verfügbar ist, bevor sie feuern.

const GA_MEASUREMENT_ID = 'G-G9DKBTJRJJ';

// ============================================
// HELPER
// ============================================
const isAnalyticsReady = () => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

const trackEvent = (eventName, params = {}) => {
  if (!isAnalyticsReady()) return;
  window.gtag('event', eventName, params);
};

// ============================================
// LOAD / REMOVE GA
// ============================================
export const loadGoogleAnalytics = () => {
  if (typeof window === 'undefined') return;
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
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
    // Enhanced pageview tracking for SPA
    send_page_view: true,
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
