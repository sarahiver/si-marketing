// src/components/marketing/USPSection.js
// "Warum S&I." - 6 verschiedene Layout-Logiken:
// Editorial: Magazin-Style mit großen Nummern und alternierenden Spalten
// Botanical: Schwebende Glassmorphism-Karten mit Parallax-Effekt
// Contemporary: Masonry/Bento-Grid mit unterschiedlichen Kartengrößen
// Luxe: Elegante horizontale Scroll-Cards (Carousel-artig)
// Neon: Cyber-Dashboard mit Stats und Glitch-Effekten
// Video: Minimalistische Icon-Liste mit Hover-Reveal
import React, { useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// CONTENT DATA
// ============================================
const USPS = [
  {
    icon: '✨',
    title: 'Kein Paar ist wie das andere',
    desc: 'Deshalb ist keine Website wie die andere. Jede Hochzeit, die wir umsetzen, ist ein Unikat. Bereits Dutzende Paare haben ihre Liebesgeschichte mit uns digital verewigt — handgemacht, nicht von der Stange.',
    short: 'Jede Website ein Unikat',
    image: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1771177763/_4b4bda8b-648e-46e7-8fba-a71164e792c3_xpup8j.jpg',
  },
  {
    icon: '🌐',
    title: 'eurenamen.de',
    desc: 'Eure Liebe hat eine eigene Adresse. Keine Subdomain, kein Baukasten-Link. Ihr bekommt eure persönliche Domain — professionell eingerichtet, sofort startklar.',
    short: 'Eigene Domain inklusive',
    image: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1771177760/_be3646f6-0ef9-424c-990f-3215044a3917_oybnqr.jpg',
  },
  {
    icon: '🎨',
    title: 'Designwelten — angepasst an euren Stil',
    desc: 'Ob elegant, modern oder verspielt: Wir passen jedes Design individuell an eure Farben, Fotos und Geschichte an. Kein Theme bleibt „Standard".',
    short: 'Themes, individuell angepasst',
    image: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1771177759/_2ae91726-85c5-4bf1-a06c-a12df9457df4_l5awwk.jpg',
  },
  {
    icon: '💬',
    title: 'Direkter Kontakt statt Support-Tickets',
    desc: 'Ihr sprecht mit echten Menschen — Sarah & Iver. Keine Hotline, kein Bot, kein Ticketsystem. Persönlich, schnell, erreichbar.',
    short: 'Sarah & Iver persönlich',
    image: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1771177759/_39729c08-0893-4079-ab7e-ab4e31e99b01_j2pqsg.jpg',
  },
  {
    icon: '🕊️',
    title: 'So wenig Aufwand wie möglich',
    desc: 'Wir übernehmen den Rest. Ihr schickt uns Texte & Fotos. Wir bauen eure Website, optimieren Design & Technik und kümmern uns um den Feinschliff.',
    short: 'Ihr liefert Inhalte, wir den Rest',
    image: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1771177760/_e16d2f97-8669-403a-af3a-96ff1bb6320d_okgyyq.jpg',
  },
  {
    icon: '⚡',
    title: 'In 7 Tagen live',
    desc: 'Oder wir sagen ehrlich warum nicht. Keine monatelangen Wartezeiten. Die meisten Websites gehen innerhalb einer Woche online — inklusive Korrekturschleife.',
    short: 'In einer Woche online',
    image: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1771177759/_32d7e2d5-591c-407d-9803-0d5ffece587b_fbbaoi.jpg',
  },
];

const RSVP_FEATURE = {
  icon: '📋',
  title: 'Alle Zusagen an einem Ort — ohne WhatsApp-Stress',
  desc: 'Gäste sagen direkt über eure Website zu. Ihr erhaltet eine übersichtliche Gästeliste, inklusive Essenswünschen & Begleitpersonen. Exportierbar als Excel für Catering, Sitzplan oder Einlasskontrolle.',
  short: 'RSVP, Gästeliste, Excel-Export',
  image: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1771177759/_3e7500cb-db46-4166-8f90-0d5ad7e18c3f_twzsjs.jpg',
};

const CTA_TEXT = {
  headline: 'Bereit für eine Hochzeitswebsite, die eure Gäste begeistert?',
  button: 'Erzählt uns eure Geschichte',
  subline: 'S&I. — Handgemachte Hochzeitswebsites für Paare mit Anspruch.',
};

// ============================================
// ANIMATIONS
// ============================================
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const glitch = keyframes`
  0%, 90%, 100% { transform: translate(0); }
  92% { transform: translate(-2px, 1px); }
  94% { transform: translate(2px, -1px); }
  96% { transform: translate(-1px, 2px); }
  98% { transform: translate(1px, -2px); }
`;

const scanline = keyframes`
  0% { top: -100%; }
  100% { top: 100%; }
`;

// ============================================
// EDITORIAL - Magazin-Style mit großen Nummern
// ============================================
const EditorialSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #FAFAFA;
`;

const EditorialContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const EditorialHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const EditorialEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #C41E3A;
  margin-bottom: 1rem;
`;

const EditorialTitle = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
`;

const EditorialGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const EditorialRow = styled.div`
  display: grid;
  grid-template-columns: ${p => p.$reverse ? '1fr 100px' : '100px 1fr'};
  gap: 3rem;
  padding: 3rem 0;
  border-bottom: 1px solid #E5E5E5;
  align-items: start;
  
  &:last-child { border-bottom: none; }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const EditorialNum = styled.div`
  font-family: 'Oswald', sans-serif;
  font-size: 5rem;
  font-weight: 700;
  color: rgba(196, 30, 58, 0.15);
  line-height: 1;
  text-align: ${p => p.$reverse ? 'left' : 'right'};
  order: ${p => p.$reverse ? 2 : 1};
  
  @media (max-width: 600px) {
    font-size: 3rem;
    text-align: left;
    order: 1;
  }
`;

const EditorialContent = styled.div`
  order: ${p => p.$reverse ? 1 : 2};
  
  @media (max-width: 600px) {
    order: 2;
  }
`;

const EditorialIcon = styled.span`
  font-size: 1.5rem;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const EditorialItemTitle = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
  margin-bottom: 0.75rem;
`;

const EditorialItemDesc = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1rem;
  color: #525252;
  line-height: 1.8;
`;

const EditorialRSVP = styled.div`
  margin-top: 4rem;
  padding: 3rem;
  background: #0A0A0A;
  text-align: center;
`;

const EditorialRSVPTitle = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #C41E3A;
  margin-bottom: 1rem;
`;

const EditorialRSVPDesc = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto;
`;

// ============================================
// CLASSIC - Elegante Magazin-Ästhetik mit warmem Gold
// ============================================
const ClassicSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #FFFFFF;
`;

const ClassicContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const ClassicHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const ClassicEyebrow = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.25em;
  color: #999999;
  margin-bottom: 1rem;
`;

const ClassicTitle = styled.h2`
  font-family: 'Mrs Saint Delafield', cursive;
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 400;
  color: #1A1A1A;
`;

const ClassicCarouselRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 700px) {
    display: none;
  }
`;

const ClassicCarousel = styled.div`
  position: relative;
  flex: 1;
  height: clamp(320px, 36vw, 420px);
  overflow: visible;
`;

const ClassicCard = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: ${p => (p.$reverse ? 'row-reverse' : 'row')};
  background: #FFFFFF;
  box-shadow: 0 2px 16px rgba(0, 0, 0, ${p => (p.$offset === 0 ? 0.10 : 0.06)});
  border-radius: 3px;
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1),
              opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1),
              filter 0.6s ease;
  transform-origin: center bottom;
  transform: ${p =>
    p.$offset === 0
      ? 'translateY(0) scale(1)'
      : p.$offset > 0
        ? `translateY(${p.$offset * -20}px) scale(${1 - p.$offset * 0.03})`
        : 'translateY(20px) scale(1.01)'};
  opacity: ${p => (p.$offset < 0 ? 0 : p.$offset > 4 ? 0 : 1)};
  z-index: ${p => (p.$offset < 0 ? 0 : 100 - p.$offset)};
  pointer-events: ${p => (p.$offset === 0 ? 'auto' : 'none')};
  filter: ${p => (p.$offset === 0 ? 'none' : `brightness(${1 - p.$offset * 0.04})`)};
`;

/* ---- Mobile-only Karussell ---- */
const ClassicMobileCarousel = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: block;
    margin-bottom: 3rem;
  }
`;

const ClassicMobileSlide = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  border-radius: 3px;
  overflow: hidden;
`;

const ClassicMobileImage = styled.div`
  width: 100%;
  height: 200px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ClassicMobileBody = styled.div`
  padding: 1.5rem;
`;

const ClassicMobileNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.25rem;
`;

const ClassicMobileBtn = styled.button`
  width: 44px;
  height: 44px;
  border: 1.5px solid rgba(0,0,0,0.15);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  color: #1A1A1A;
  transition: all 0.2s ease;

  &:disabled { opacity: 0.25; cursor: default; }
  &:not(:disabled):hover { border-color: #1A1A1A; }
`;

const ClassicMobileCounter = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: #999;
`;

const ClassicCardImage = styled.div`
  flex: 0 0 64%;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 5px solid #FFFFFF;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
    /* filter removed */
    transition: filter 0.5s ease, transform 0.5s ease;
  }

  ${ClassicCard}[data-active="true"] & img {
    /* filter removed */
  }

  ${ClassicCard}[data-active="true"]:hover & img {
    transform: scale(1.02);
  }

  @media (max-width: 600px) {
    flex: 0 0 55%;
  }
`;

const ClassicCardBody = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 600px) {
    padding: 1.25rem 1rem;
  }
`;

const ClassicCardNum = styled.span`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: #BBBBBB;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.75rem;
`;

const ClassicCardTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.1rem, 1.6vw, 1.4rem);
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 0.75rem;
  line-height: 1.35;
`;

const ClassicCardDesc = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: clamp(0.8rem, 1vw, 0.9rem);
  font-weight: 300;
  color: #555;
  line-height: 1.75;
`;

const ClassicDots = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex-shrink: 0;
`;

const ClassicDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid #CCCCCC;
  background: ${p => (p.$active ? '#1A1A1A' : 'transparent')};
  cursor: pointer;
  padding: 0;
  transition: background 0.3s ease;

  &:hover {
    background: ${p => (p.$active ? '#1A1A1A' : '#DDDDDD')};
  }
`;

// ============================================
// BOTANICAL - Schwebende Glassmorphism-Karten
// ============================================
const BotanicalSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: transparent;
  position: relative;
  z-index: 10;
`;

const BotanicalContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BotanicalHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const BotanicalEyebrow = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1rem;
`;

const BotanicalTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: rgba(255,255,255,0.95);
`;

const BotanicalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    margin: 0 -1.5rem;
    padding: 0 1.5rem 1rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const BotanicalCard = styled.div`
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 24px;
  padding: 2rem;
  transition: all 0.5s ease;
  animation: ${float} ${p => 6 + p.$i * 0.5}s ease-in-out infinite;
  animation-delay: ${p => p.$i * 0.2}s;
  
  @media (max-width: 600px) {
    flex: 0 0 280px;
    scroll-snap-align: start;
    animation: none;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    background: rgba(0,0,0,0.55);
    border-color: rgba(255,255,255,0.2);
  }
`;

const BotanicalCardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const BotanicalCardTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(255,255,255,0.95);
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const BotanicalCardDesc = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
`;

const BotanicalRSVP = styled.div`
  margin-top: 3rem;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 24px;
  padding: 2.5rem;
  text-align: center;
`;

// ============================================
// CONTEMPORARY - Bento/Masonry Grid
// ============================================
const ContemporarySection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #FAFAFA;
`;

const ContemporaryContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const ContemporaryHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ContemporaryEyebrow = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FF6B6B;
  margin-bottom: 0.5rem;
`;

const ContemporaryTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
`;

const BENTO_COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#9B5DE5', '#0D0D0D', '#FF6B6B', '#4ECDC4'];

const ContemporaryBento = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 1rem;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const ContemporaryCard = styled.div`
  background: #fff;
  border: 3px solid #0D0D0D;
  padding: 1.5rem;
  box-shadow: 5px 5px 0 ${p => BENTO_COLORS[p.$i % 6]};
  transition: all 0.3s ease;
  
  grid-column: ${p => {
    if (p.$i === 0) return 'span 2';
    if (p.$i === 4) return 'span 2';
    if (p.$i === 6) return '1 / -1';
    return 'span 1';
  }};
  
  @media (max-width: 768px) {
    min-width: 75vw;
    flex-shrink: 0;
    scroll-snap-align: start;
    grid-column: span 1;
  }

  @media (max-width: 500px) {
    grid-column: span 1;
  }
  
  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 8px 8px 0 ${p => BENTO_COLORS[p.$i % 6]};
  }
`;

const ContemporaryCardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ContemporaryCardTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 0.5rem;
`;

const ContemporaryCardDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: #525252;
  line-height: 1.6;
`;

const ContemporaryRSVP = styled.div`
  margin-top: 2rem;
  background: #0D0D0D;
  border: 3px solid #0D0D0D;
  padding: 2rem;
  box-shadow: 6px 6px 0 #FFE66D;
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ContemporaryRSVPIcon = styled.div`
  font-size: 3rem;
  flex-shrink: 0;
`;

const ContemporaryRSVPContent = styled.div`
  flex: 1;
`;

const ContemporaryRSVPTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #FFE66D;
  margin-bottom: 0.5rem;
`;

const ContemporaryRSVPDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.6;
`;

// ============================================
// LUXE - Elegantes 2-Spalten Layout mit großen Nummern
// ============================================
const LuxeSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #0A0A0A;
`;

const LuxeContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const LuxeHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const LuxeEyebrow = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #C9A962;
  margin-bottom: 1rem;
`;

const LuxeTitle = styled.h2`
  font-family: 'Cormorant', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
`;

const LuxeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const LuxeCard = styled.div`
  padding: 3rem;
  border: 1px solid rgba(201, 169, 98, 0.1);
  position: relative;
  transition: all 0.5s ease;
  
  &:nth-child(odd) {
    border-right: 1px solid rgba(201, 169, 98, 0.15);
  }
  
  &:nth-child(-n+2) {
    border-bottom: 1px solid rgba(201, 169, 98, 0.15);
  }
  
  &:nth-child(3), &:nth-child(4) {
    border-bottom: 1px solid rgba(201, 169, 98, 0.15);
  }

  &:nth-child(5), &:nth-child(6) {
    border-bottom: 1px solid rgba(201, 169, 98, 0.15);
  }

  &:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    text-align: center;
    border-right: none;
  }
  
  @media (max-width: 768px) {
    border-right: none !important;
    border-bottom: 1px solid rgba(201, 169, 98, 0.15);
    
    &:last-child {
      border-bottom: none;
    }
    
    &:last-child:nth-child(odd) {
      grid-column: auto;
      text-align: left;
    }
  }
  
  &:hover {
    background: rgba(201, 169, 98, 0.03);
  }

  @media (max-width: 768px) {
    flex: 0 0 75vw;
    max-width: 75vw;
    scroll-snap-align: center;
  }
`;

const LuxeCardNum = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-family: 'Cormorant', serif;
  font-size: 3rem;
  font-weight: 300;
  font-style: italic;
  color: rgba(201, 169, 98, 0.15);
  line-height: 1;
`;

const LuxeCardIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const LuxeCardTitle = styled.h3`
  font-family: 'Cormorant', serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #F8F6F3;
  margin-bottom: 1rem;
  line-height: 1.4;
  padding-right: 2rem;
`;

const LuxeCardDesc = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: rgba(248,246,243,0.5);
  line-height: 1.8;
`;

const LuxeRSVP = styled.div`
  margin-top: 4rem;
  padding: 3rem;
  border: 1px solid rgba(201, 169, 98, 0.3);
  text-align: center;
`;

const LuxeRSVPTitle = styled.h3`
  font-family: 'Cormorant', serif;
  font-size: 1.5rem;
  font-weight: 300;
  font-style: italic;
  color: #C9A962;
  margin-bottom: 1rem;
`;

const LuxeRSVPDesc = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(248,246,243,0.6);
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto;
`;

// ============================================
// NEON - Cyber Dashboard
// ============================================
const NeonSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #0a0a0f;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 10% 20%, rgba(0,255,255,0.05) 0%, transparent 40%),
      radial-gradient(ellipse at 90% 80%, rgba(255,0,255,0.05) 0%, transparent 40%);
    pointer-events: none;
  }
`;

const NeonContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const NeonHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const NeonEyebrow = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #ff00ff;
  text-shadow: 0 0 10px rgba(255,0,255,0.5);
  margin-bottom: 0.5rem;
`;

const NeonTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
`;

const NeonDashboard = styled.div`
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(0,255,255,0.3);
  border-radius: 8px;
  overflow: hidden;
`;

const NeonDashboardHeader = styled.div`
  background: rgba(0,255,255,0.1);
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid rgba(0,255,255,0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NeonDashboardTitle = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: #00ffff;
  letter-spacing: 0.1em;
`;

const NeonDashboardStatus = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.65rem;
  color: #00ff88;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #00ff88;
    border-radius: 50%;
    box-shadow: 0 0 10px #00ff88;
  }
`;

const NeonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const NeonCell = styled.div`
  padding: 1.5rem;
  border-right: 1px solid rgba(0,255,255,0.1);
  border-bottom: 1px solid rgba(0,255,255,0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:nth-child(3n) { border-right: none; }
  
  @media (max-width: 800px) {
    &:nth-child(3n) { border-right: 1px solid rgba(0,255,255,0.1); }
    &:nth-child(2n) { border-right: none; }
  }
  
  @media (max-width: 500px) {
    border-right: none;
  }
  
  &:hover {
    background: rgba(0,255,255,0.05);
    
    &::after {
      content: '';
      position: absolute;
      top: -100%;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(transparent, rgba(0,255,255,0.1), transparent);
      animation: ${scanline} 1s ease-out;
    }
  }
`;

const NeonCellIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const NeonCellTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #00ffff;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 5px rgba(0,255,255,0.5);
`;

const NeonCellDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.6;
`;

const NeonRSVP = styled.div`
  padding: 1.5rem;
  background: rgba(255,0,255,0.05);
  border-top: 1px solid rgba(255,0,255,0.2);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

const NeonRSVPIcon = styled.div`
  font-size: 2.5rem;
  animation: ${glitch} 3s ease-in-out infinite;
`;

const NeonRSVPContent = styled.div`
  flex: 1;
`;

const NeonRSVPTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #ff00ff;
  text-shadow: 0 0 10px rgba(255,0,255,0.5);
  margin-bottom: 0.5rem;
`;

const NeonRSVPDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
`;

// ============================================
// VIDEO - Icon-Liste mit Hover-Reveal
// ============================================
const VideoSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #0A0A0A;
`;

const VideoContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const VideoHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const VideoEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #6B8CAE;
  margin-bottom: 1rem;
`;

const VideoTitle = styled.h2`
  font-family: 'Manrope', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #FFFFFF;
`;

const VideoList = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoItem = styled.div`
  border-bottom: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(107, 140, 174, 0.05);
  }
`;

const VideoItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
`;

const VideoItemIcon = styled.div`
  font-size: 1.5rem;
  width: 50px;
  text-align: center;
  flex-shrink: 0;
`;

const VideoItemTitle = styled.h3`
  font-family: 'Manrope', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #FFFFFF;
  flex: 1;
`;

const VideoItemArrow = styled.span`
  font-size: 1.2rem;
  color: #6B8CAE;
  transition: transform 0.3s ease;
  transform: rotate(${p => p.$open ? '90deg' : '0'});
`;

const VideoItemContent = styled.div`
  max-height: ${p => p.$open ? '200px' : '0'};
  opacity: ${p => p.$open ? 1 : 0};
  overflow: hidden;
  transition: all 0.3s ease;
  padding: ${p => p.$open ? '0 0 1.5rem 4.5rem' : '0 0 0 4.5rem'};
`;

const VideoItemDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #B0B0B0;
  line-height: 1.7;
`;

const VideoRSVP = styled.div`
  margin-top: 3rem;
  padding: 2.5rem;
  border: 1px solid rgba(107, 140, 174, 0.3);
  text-align: center;
`;

const VideoRSVPTitle = styled.h3`
  font-family: 'Manrope', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #6B8CAE;
  margin-bottom: 1rem;
`;

const VideoRSVPDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #B0B0B0;
  line-height: 1.7;
`;

// ============================================
// SHARED CTA
// ============================================
const CTABox = styled.div`
  margin-top: clamp(4rem, 10vh, 6rem);
  text-align: center;
  padding: 0 1rem;
`;

const CTAHeadline = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

const CTAButton = styled.button`
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const CTASubline = styled.p`
  font-size: 0.75rem;
  margin-top: 1.5rem;
`;

// ============================================
// MAIN COMPONENT
// ============================================
const USPSection = () => {
  const { currentTheme } = useTheme();
  const [openItem, setOpenItem] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const carouselRef = useRef(null);
  const wheelLock = useRef(false);
  const touchStartX = useRef(null);

  const CLASSIC_ALL_CARDS = [...USPS, RSVP_FEATURE];
  const cardCount = CLASSIC_ALL_CARDS.length;

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) setActiveCard(prev => Math.min(prev + 1, cardCount - 1));
      else setActiveCard(prev => Math.max(prev - 1, 0));
    }
    touchStartX.current = null;
  };

  const scrollToThemes = () => {
    document.getElementById('themes')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Wheel → nächste/vorherige Karte im Tiefenkarussell (mit Schwelle)
  const wheelDelta = useRef(0);
  const WHEEL_THRESHOLD = 80;

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || currentTheme !== 'classic') return;
    const onWheel = (e) => {
      if (wheelLock.current) { e.preventDefault(); return; }
      const goNext = e.deltaY > 0;
      const atEnd = goNext && activeCard >= cardCount - 1;
      const atStart = !goNext && activeCard <= 0;
      if (atStart || atEnd) { wheelDelta.current = 0; return; }
      e.preventDefault();
      wheelDelta.current += e.deltaY;
      if (Math.abs(wheelDelta.current) < WHEEL_THRESHOLD) return;
      const direction = wheelDelta.current > 0 ? 1 : -1;
      wheelDelta.current = 0;
      wheelLock.current = true;
      setActiveCard(prev => Math.min(Math.max(prev + direction, 0), cardCount - 1));
      setTimeout(() => { wheelLock.current = false; }, 700);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [currentTheme, activeCard, cardCount]);

  // ==========================================
  // CLASSIC - Elegante Magazin-Ästhetik
  // ==========================================
  if (currentTheme === 'classic' || currentTheme === 'modern') {
    return (
      <ClassicSection id="features">
        <ClassicContainer>
          <ClassicHeader>
            <ClassicEyebrow>Warum S&I.</ClassicEyebrow>
            <ClassicTitle>Was uns besonders macht</ClassicTitle>
          </ClassicHeader>

          <ClassicCarouselRow>
            <ClassicCarousel ref={carouselRef}>
              {CLASSIC_ALL_CARDS.map((item, i) => {
                const offset = i - activeCard;
                const reverse = i % 2 === 1;
                return (
                  <ClassicCard key={i} $offset={offset} $reverse={reverse} data-active={offset === 0}>
                    <ClassicCardImage>
                      <img src={item.image} alt={item.title} loading="lazy" />
                    </ClassicCardImage>
                    <ClassicCardBody>
                      <ClassicCardNum>0{i + 1}</ClassicCardNum>
                      <ClassicCardTitle>{item.title}</ClassicCardTitle>
                      <ClassicCardDesc>{item.desc}</ClassicCardDesc>
                    </ClassicCardBody>
                  </ClassicCard>
                );
              })}
            </ClassicCarousel>

            <ClassicDots>
              {CLASSIC_ALL_CARDS.map((_, i) => (
                <ClassicDot key={i} $active={i === activeCard} onClick={() => setActiveCard(i)} />
              ))}
            </ClassicDots>
          </ClassicCarouselRow>

          {/* Mobile: Touch-Karussell (einfach, fullwidth, vertikal) */}
          <ClassicMobileCarousel>
            <ClassicMobileSlide
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <ClassicMobileImage>
                <img src={CLASSIC_ALL_CARDS[activeCard].image} alt={CLASSIC_ALL_CARDS[activeCard].title} loading="lazy" />
              </ClassicMobileImage>
              <ClassicMobileBody>
                <ClassicCardNum>0{activeCard + 1}</ClassicCardNum>
                <ClassicCardTitle>{CLASSIC_ALL_CARDS[activeCard].title}</ClassicCardTitle>
                <ClassicCardDesc>{CLASSIC_ALL_CARDS[activeCard].desc}</ClassicCardDesc>
              </ClassicMobileBody>
            </ClassicMobileSlide>
            <ClassicMobileNav>
              <ClassicMobileBtn
                onClick={() => setActiveCard(prev => Math.max(prev - 1, 0))}
                disabled={activeCard === 0}
                aria-label="Vorherige"
              >←</ClassicMobileBtn>
              <ClassicMobileCounter>{activeCard + 1} / {cardCount}</ClassicMobileCounter>
              <ClassicMobileBtn
                onClick={() => setActiveCard(prev => Math.min(prev + 1, cardCount - 1))}
                disabled={activeCard === cardCount - 1}
                aria-label="Nächste"
              >→</ClassicMobileBtn>
            </ClassicMobileNav>
          </ClassicMobileCarousel>

          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, color: '#555' }}>
              {CTA_TEXT.headline}
            </CTAHeadline>
            <CTAButton
              onClick={scrollToThemes}
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, letterSpacing: '0.2em', color: '#FFFFFF', background: '#1A1A1A', border: 'none' }}
            >
              {CTA_TEXT.button}
            </CTAButton>
            <CTASubline style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#999' }}>
              {CTA_TEXT.subline}
            </CTASubline>
          </CTABox>
        </ClassicContainer>
      </ClassicSection>
    );
  }

  // ==========================================
  // EDITORIAL - Magazin-Style
  // ==========================================
  if (currentTheme === 'editorial') {
    return (
      <EditorialSection id="features">
        <EditorialContainer>
          <EditorialHeader>
            <EditorialEyebrow>— Warum S&I. —</EditorialEyebrow>
            <EditorialTitle>Was uns besonders macht</EditorialTitle>
          </EditorialHeader>
          
          <EditorialGrid>
            {USPS.map((usp, i) => (
              <EditorialRow key={i} $reverse={i % 2 === 1}>
                <EditorialNum $reverse={i % 2 === 1}>0{i + 1}</EditorialNum>
                <EditorialContent $reverse={i % 2 === 1}>
                  <EditorialIcon>{usp.icon}</EditorialIcon>
                  <EditorialItemTitle>{usp.title}</EditorialItemTitle>
                  <EditorialItemDesc>{usp.desc}</EditorialItemDesc>
                </EditorialContent>
              </EditorialRow>
            ))}
          </EditorialGrid>
          
          <EditorialRSVP>
            <EditorialRSVPTitle>{RSVP_FEATURE.icon} {RSVP_FEATURE.title}</EditorialRSVPTitle>
            <EditorialRSVPDesc>{RSVP_FEATURE.desc}</EditorialRSVPDesc>
          </EditorialRSVP>
          
          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', color: '#525252' }}>
              {CTA_TEXT.headline}
            </CTAHeadline>
            <CTAButton 
              onClick={scrollToThemes}
              style={{ fontFamily: "'Oswald', sans-serif", color: '#FAFAFA', background: '#C41E3A', border: 'none' }}
            >
              {CTA_TEXT.button}
            </CTAButton>
            <CTASubline style={{ fontFamily: "'Inter', sans-serif", color: '#999' }}>
              {CTA_TEXT.subline}
            </CTASubline>
          </CTABox>
        </EditorialContainer>
      </EditorialSection>
    );
  }

  // ==========================================
  // BOTANICAL - Schwebende Karten
  // ==========================================
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="features">
        <BotanicalContainer>
          <BotanicalHeader>
            <BotanicalEyebrow>Warum S&I.</BotanicalEyebrow>
            <BotanicalTitle>Was uns besonders macht</BotanicalTitle>
          </BotanicalHeader>
          
          <BotanicalGrid>
            {USPS.map((usp, i) => (
              <BotanicalCard key={i} $i={i}>
                <BotanicalCardIcon>{usp.icon}</BotanicalCardIcon>
                <BotanicalCardTitle>{usp.title}</BotanicalCardTitle>
                <BotanicalCardDesc>{usp.desc}</BotanicalCardDesc>
              </BotanicalCard>
            ))}
          </BotanicalGrid>
          
          <BotanicalRSVP>
            <BotanicalCardIcon style={{ marginBottom: '1rem' }}>{RSVP_FEATURE.icon}</BotanicalCardIcon>
            <BotanicalCardTitle style={{ textAlign: 'center' }}>{RSVP_FEATURE.title}</BotanicalCardTitle>
            <BotanicalCardDesc style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>{RSVP_FEATURE.desc}</BotanicalCardDesc>
          </BotanicalRSVP>
          
          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.8)' }}>
              {CTA_TEXT.headline}
            </CTAHeadline>
            <CTAButton 
              onClick={scrollToThemes}
              style={{ fontFamily: "'Montserrat', sans-serif", color: '#040604', background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '50px' }}
            >
              {CTA_TEXT.button}
            </CTAButton>
            <CTASubline style={{ fontFamily: "'Montserrat', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
              {CTA_TEXT.subline}
            </CTASubline>
          </CTABox>
        </BotanicalContainer>
      </BotanicalSection>
    );
  }

  // ==========================================
  // CONTEMPORARY - Bento Grid
  // ==========================================
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="features">
        <ContemporaryContainer>
          <ContemporaryHeader>
            <ContemporaryEyebrow>💎 Warum S&I.</ContemporaryEyebrow>
            <ContemporaryTitle>Das macht uns aus</ContemporaryTitle>
          </ContemporaryHeader>
          
          <ContemporaryBento>
            {USPS.map((usp, i) => (
              <ContemporaryCard key={i} $i={i}>
                <ContemporaryCardIcon>{usp.icon}</ContemporaryCardIcon>
                <ContemporaryCardTitle>{usp.short}</ContemporaryCardTitle>
                <ContemporaryCardDesc>{usp.desc}</ContemporaryCardDesc>
              </ContemporaryCard>
            ))}
          </ContemporaryBento>
          
          <ContemporaryRSVP>
            <ContemporaryRSVPIcon>{RSVP_FEATURE.icon}</ContemporaryRSVPIcon>
            <ContemporaryRSVPContent>
              <ContemporaryRSVPTitle>{RSVP_FEATURE.title}</ContemporaryRSVPTitle>
              <ContemporaryRSVPDesc>{RSVP_FEATURE.desc}</ContemporaryRSVPDesc>
            </ContemporaryRSVPContent>
          </ContemporaryRSVP>
          
          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: '#0D0D0D' }}>
              {CTA_TEXT.headline}
            </CTAHeadline>
            <CTAButton 
              onClick={scrollToThemes}
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FAFAFA', background: '#FF6B6B', border: '3px solid #0D0D0D', boxShadow: '4px 4px 0 #0D0D0D' }}
            >
              {CTA_TEXT.button} →
            </CTAButton>
            <CTASubline style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#525252' }}>
              {CTA_TEXT.subline}
            </CTASubline>
          </CTABox>
        </ContemporaryContainer>
      </ContemporarySection>
    );
  }

  // ==========================================
  // LUXE - Elegantes 2-Spalten Grid
  // ==========================================
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="features">
        <LuxeContainer>
          <LuxeHeader>
            <LuxeEyebrow>Warum S&I.</LuxeEyebrow>
            <LuxeTitle>Was uns auszeichnet</LuxeTitle>
          </LuxeHeader>
          
          <LuxeGrid>
            {USPS.map((usp, i) => (
              <LuxeCard key={i}>
                <LuxeCardNum>0{i + 1}</LuxeCardNum>
                <LuxeCardIcon>{usp.icon}</LuxeCardIcon>
                <LuxeCardTitle>{usp.title}</LuxeCardTitle>
                <LuxeCardDesc>{usp.desc}</LuxeCardDesc>
              </LuxeCard>
            ))}
          </LuxeGrid>
          
          <LuxeRSVP>
            <LuxeRSVPTitle>{RSVP_FEATURE.icon} {RSVP_FEATURE.title}</LuxeRSVPTitle>
            <LuxeRSVPDesc>{RSVP_FEATURE.desc}</LuxeRSVPDesc>
          </LuxeRSVP>
          
          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Cormorant', serif", fontStyle: 'italic', color: 'rgba(248,246,243,0.8)' }}>
              {CTA_TEXT.headline}
            </CTAHeadline>
            <CTAButton 
              onClick={scrollToThemes}
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, letterSpacing: '0.3em', color: '#0A0A0A', background: '#C9A962', border: 'none' }}
            >
              {CTA_TEXT.button}
            </CTAButton>
            <CTASubline style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(248,246,243,0.4)' }}>
              {CTA_TEXT.subline}
            </CTASubline>
          </CTABox>
        </LuxeContainer>
      </LuxeSection>
    );
  }

  // ==========================================
  // NEON - Cyber Dashboard
  // ==========================================
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="features">
        <NeonContainer>
          <NeonHeader>
            <NeonEyebrow>// features.list()</NeonEyebrow>
            <NeonTitle>System Capabilities</NeonTitle>
          </NeonHeader>
          
          <NeonDashboard>
            <NeonDashboardHeader>
              <NeonDashboardTitle>S&I_FEATURES.dashboard</NeonDashboardTitle>
              <NeonDashboardStatus>ACTIVE</NeonDashboardStatus>
            </NeonDashboardHeader>
            
            <NeonGrid>
              {USPS.map((usp, i) => (
                <NeonCell key={i}>
                  <NeonCellIcon>{usp.icon}</NeonCellIcon>
                  <NeonCellTitle>{usp.short}</NeonCellTitle>
                  <NeonCellDesc>{usp.desc}</NeonCellDesc>
                </NeonCell>
              ))}
            </NeonGrid>
            
            <NeonRSVP>
              <NeonRSVPIcon>{RSVP_FEATURE.icon}</NeonRSVPIcon>
              <NeonRSVPContent>
                <NeonRSVPTitle>{RSVP_FEATURE.title}</NeonRSVPTitle>
                <NeonRSVPDesc>{RSVP_FEATURE.desc}</NeonRSVPDesc>
              </NeonRSVPContent>
            </NeonRSVP>
          </NeonDashboard>
          
          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.8)' }}>
              {CTA_TEXT.headline}
            </CTAHeadline>
            <CTAButton 
              onClick={scrollToThemes}
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#00ff88', background: 'transparent', border: '1px solid #00ff88', boxShadow: '0 0 15px rgba(0,255,136,0.3)' }}
            >
              select.theme()
            </CTAButton>
            <CTASubline style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
              {CTA_TEXT.subline}
            </CTASubline>
          </CTABox>
        </NeonContainer>
      </NeonSection>
    );
  }

  // ==========================================
  // VIDEO - Icon-Liste mit Hover-Reveal (Default)
  // ==========================================
  return (
    <VideoSection id="features">
      <VideoContainer>
        <VideoHeader>
          <VideoEyebrow>Warum S&I.</VideoEyebrow>
          <VideoTitle>Was uns besonders macht</VideoTitle>
        </VideoHeader>
        
        <VideoList>
          {USPS.map((usp, i) => (
            <VideoItem key={i} onClick={() => setOpenItem(openItem === i ? -1 : i)}>
              <VideoItemHeader>
                <VideoItemIcon>{usp.icon}</VideoItemIcon>
                <VideoItemTitle>{usp.title}</VideoItemTitle>
                <VideoItemArrow $open={openItem === i}>→</VideoItemArrow>
              </VideoItemHeader>
              <VideoItemContent $open={openItem === i}>
                <VideoItemDesc>{usp.desc}</VideoItemDesc>
              </VideoItemContent>
            </VideoItem>
          ))}
        </VideoList>
        
        <VideoRSVP>
          <VideoRSVPTitle>{RSVP_FEATURE.icon} {RSVP_FEATURE.title}</VideoRSVPTitle>
          <VideoRSVPDesc>{RSVP_FEATURE.desc}</VideoRSVPDesc>
        </VideoRSVP>
        
        <CTABox>
          <CTAHeadline style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>
            {CTA_TEXT.headline}
          </CTAHeadline>
          <CTAButton 
            onClick={scrollToThemes}
            style={{ fontFamily: "'Manrope', sans-serif", color: '#FFFFFF', background: 'transparent', border: '1px solid #6B8CAE' }}
          >
            {CTA_TEXT.button}
          </CTAButton>
          <CTASubline style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
            {CTA_TEXT.subline}
          </CTASubline>
        </CTABox>
      </VideoContainer>
    </VideoSection>
  );
};

export default USPSection;
