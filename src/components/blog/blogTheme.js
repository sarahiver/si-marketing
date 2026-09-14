// src/components/blog/blogTheme.js
// Theme-Helfer für Blog-Ansichten (Artikel, Übersicht, CTA-Komponenten).
//
// Diese Getter lagen bisher doppelt in BlogPage.js und BlogArticle.js.
// Sie liegen jetzt hier, damit auch WeddingWebsiteCTA exakt die gleichen
// Farben/Fonts benutzt und kein Designbruch entstehen kann.
// Werte sind unverändert aus BlogArticle.js übernommen.

export const getBackground = (t) => ({ editorial: '#FAFAFA', botanical: '#040604', contemporary: '#FAFAFA', luxe: '#0A0A0A', neon: '#0a0a0f', video: '#0A0A0A', classic: '#FDFCFA', modern: '#FAFAFA' }[t] || '#FAFAFA');

export const getTextColor = (t) => ['botanical', 'luxe', 'neon', 'video'].includes(t) ? '#FFFFFF' : '#0A0A0A';

export const getSecondaryText = (t) => ({ editorial: '#666666', botanical: 'rgba(255,255,255,0.55)', contemporary: '#737373', luxe: 'rgba(248,246,243,0.5)', neon: 'rgba(255,255,255,0.6)', video: '#B0B0B0', classic: '#555555', modern: 'rgba(0,0,0,0.45)' }[t] || '#666666');

export const getAccent = (t) => ({ editorial: '#C41E3A', botanical: 'rgba(45,90,60,0.8)', contemporary: '#FF6B6B', luxe: '#C9A962', neon: '#00ffff', video: '#6B8CAE', classic: '#999999', modern: '#000000' }[t] || '#C41E3A');

export const getCardBg = (t) => ({ editorial: '#FFFFFF', botanical: 'rgba(255,255,255,0.08)', contemporary: '#FFFFFF', luxe: '#1A1A1D', neon: 'rgba(255,255,255,0.05)', video: '#252525', classic: '#FFFFFF', modern: '#FFFFFF' }[t] || '#FFFFFF');

export const getCardBorder = (t) => ({ editorial: '#E5E5E5', botanical: 'rgba(255,255,255,0.15)', contemporary: '#0D0D0D', luxe: 'rgba(201,169,98,0.25)', neon: 'rgba(0,255,255,0.3)', video: 'rgba(107,140,174,0.3)', classic: 'rgba(0,0,0,0.06)', modern: 'rgba(0,0,0,0.1)' }[t] || '#E5E5E5');

export const getHeadlineFont = (t) => ({ editorial: "'Oswald', sans-serif", botanical: "'Cormorant Garamond', serif", contemporary: "'Space Grotesk', sans-serif", luxe: "'Cormorant', serif", neon: "'Space Grotesk', sans-serif", video: "'Manrope', sans-serif", classic: "'Cormorant Garamond', serif", modern: "'DM Sans', sans-serif" }[t] || "'Oswald', sans-serif");

export const getBodyFont = (t) => ({ editorial: "'Inter', sans-serif", botanical: "'Montserrat', sans-serif", contemporary: "'Space Grotesk', sans-serif", luxe: "'Outfit', sans-serif", neon: "'Space Grotesk', sans-serif", video: "'Inter', sans-serif", classic: "'Josefin Sans', sans-serif", modern: "'DM Sans', sans-serif" }[t] || "'Inter', sans-serif");
