// Tests für das Consent-Gating von GA4 (Audit Nov 2026)
// Keine echten Anfragen: Es wird nur geprüft, ob gtag.js eingebunden wird
// und was im dataLayer landet.

const GA = 'G-G9DKBTJRJJ';
const gtagScript = () => document.querySelector(`script[src*="gtag/js?id=${GA}"]`);
const commands = () => (window.dataLayer || []).map((a) => Array.from(a));

const freshModule = () => {
  let mod;
  jest.isolateModules(() => { mod = require('../analytics'); });
  return mod;
};

beforeEach(() => {
  jest.useFakeTimers();
  localStorage.clear();
  document.head.innerHTML = '';
  delete window.gtag;
  delete window.dataLayer;
  delete window.__siGtagInit;
  delete window.__siConsentGranted;
  delete window[`ga-disable-${GA}`];
});
afterEach(() => jest.useRealTimers());

test('ohne Einwilligung: kein gtag.js, keine Events', () => {
  const a = freshModule();
  jest.runAllTimers();
  a.trackDemoClick('classic', 'https://siwedding.de/demo-classic?src=hero', 'hero');
  a.trackFormStart();
  expect(gtagScript()).toBeNull();
  expect(window.dataLayer).toBeUndefined();
});

test('gespeicherte Einwilligung: GA startet einmal mit consent → js → config', () => {
  localStorage.setItem('cookie_consent', 'accepted');
  const a = freshModule();
  jest.runAllTimers();
  a.loadGoogleAnalytics(); // CookieConsent ruft das zusätzlich auf
  expect(gtagScript()).not.toBeNull();
  const c = commands();
  expect(c[0][0]).toBe('consent');
  expect(c[0][2].analytics_storage).toBe('granted');
  expect(c[0][2].ad_storage).toBe('denied');
  const configs = c.filter((x) => x[0] === 'config' && x[1] === GA);
  expect(configs).toHaveLength(1); // kein doppelter page_view
  expect(configs[0][2].send_page_view).toBe(true);
});

test('Zustimmung im Banner: GA startet erst dann', () => {
  const a = freshModule();
  jest.runAllTimers();
  expect(gtagScript()).toBeNull();
  localStorage.setItem('cookie_consent', 'accepted'); // Banner speichert zuerst
  a.loadGoogleAnalytics();
  expect(gtagScript()).not.toBeNull();
  a.trackDemoClick('editorial', 'https://siwedding.de/demo-editorial?src=filmstrip', 'filmstrip');
  const ev = commands().find((x) => x[0] === 'event' && x[1] === 'demo_click');
  expect(ev[2]).toMatchObject({ demo: 'editorial', cta_placement: 'filmstrip' });
  expect(ev[2].source).toBeUndefined(); // 'source' würde die Sitzungsquelle überschreiben
});

test('Widerruf: GA wird stummgeschaltet, Events gehen nicht mehr raus', () => {
  localStorage.setItem('cookie_consent', 'accepted');
  const a = freshModule();
  jest.runAllTimers();
  const before = commands().length;
  a.removeGoogleAnalytics();
  expect(window[`ga-disable-${GA}`]).toBe(true);
  a.trackFormStart();
  const after = commands().slice(before);
  expect(after.find((x) => x[0] === 'event')).toBeUndefined();
});

test('Formular: Start und erfolgreicher Submit sind getrennte Events mit Design', () => {
  localStorage.setItem('cookie_consent', 'accepted');
  const a = freshModule();
  jest.runAllTimers();
  a.trackFormStart();
  a.trackFormSubmit('editorial', 'website');
  const names = commands().filter((x) => x[0] === 'event').map((x) => x[1]);
  expect(names).toEqual(['form_start', 'generate_lead']);
  const lead = commands().find((x) => x[1] === 'generate_lead')[2];
  expect(lead).toMatchObject({ theme: 'editorial', package: 'website', currency: 'EUR' });
  expect(lead.value).toBeGreaterThan(0);
});
