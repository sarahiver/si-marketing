// src/components/marketing/HowItWorksSection.js
// 6 verschiedene Layout-Logiken pro Theme:
// Editorial: Horizontale Timeline mit Connector-Lines
// Botanical: Akkordeon/FAQ-Style (aufklappbar)
// Contemporary: Karten-Grid mit Hover-Effekten
// Luxe: Großflächig untereinander (Full-Width Sections)
// Neon: Terminal/CLI Style mit "typing" Effekt
// Video: Vertikale Stepper-Timeline links
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// CONTENT DATA
// ============================================
const STEPS = [
  {
    num: '01',
    tag: 'Der Anfang von etwas Besonderem',
    title: 'Ihr entdeckt uns',
    desc: 'Ihr scrollt durch unsere Designs und denkt: „Das fühlt sich richtig an." Schreibt uns — unverbindlich, ohne Haken. Wir freuen uns auf jede Nachricht.',
    detail: 'Eine kurze Anfrage genügt. Wir melden uns persönlich bei euch — meistens noch am selben Tag.',
    highlight: '✨ Der erste Schritt zu einer Hochzeitswebsite, die eure Gäste begeistert.',
    icon: '💕',
  },
  {
    num: '02',
    tag: 'Kein Fragebogen. Ein echtes Gespräch.',
    title: 'Wir lernen euch kennen',
    desc: 'In einem persönlichen Gespräch erfahren wir, wer ihr seid. Was euch wichtig ist. Wie eure Hochzeit sich anfühlen soll.',
    bullets: [
      'Welches Design passt zu eurer Geschichte?',
      'Welche Funktionen braucht ihr wirklich?',
      'Was macht eure Hochzeit einzigartig?',
    ],
    highlight: '🤍 Ihr trefft keine technische Entscheidung — wir beraten euch persönlich.',
    icon: '💬',
  },
  {
    num: '03',
    tag: 'So einfach wie möglich für euch.',
    title: 'Ihr erzählt eure Geschichte',
    desc: 'Über ein einfaches Dashboard tragt ihr Texte ein, ladet Fotos hoch, wählt Musik. Kein technisches Wissen nötig — das haben wir extra so gebaut.',
    bullets: [
      'Texte & Infos eintragen',
      'Bilder hochladen',
      'Fertig — den Rest machen wir',
    ],
    detail: 'Das Grundgerüst steht bereits. Ihr müsst nichts bauen und nichts programmieren.',
    highlight: '🧩 Ihr teilt eure Geschichte — wir verwandeln sie in Design.',
    icon: '📝',
  },
  {
    num: '04',
    tag: 'Der Moment, für den wir das hier machen.',
    title: 'Der Moment',
    desc: 'Wir schicken euch den Link. Ihr öffnet eure Website zum ersten Mal. Und dann wisst ihr: „Genau so soll es sein."',
    bullets: [
      'Feinschliff & Design-Revisionen',
      'Anpassungen nach eurem Feedback',
      'Finale Freigabe durch euch',
    ],
    highlight: '💍 Elegant. Emotional. Eindrucksvoll. Eure Website.',
    icon: '🚀',
  },
];

const CTA_TEXT = {
  headline: 'Bereit für eine Hochzeitswebsite, die eure Gäste begeistert?',
  button: 'Erzählt uns eure Geschichte',
  subline: 'Handgemacht · Persönlich betreut · In 7 Tagen live',
};

// ============================================
// ANIMATIONS
// ============================================
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideDown = keyframes`
  from { opacity: 0; max-height: 0; }
  to { opacity: 1; max-height: 500px; }
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

// ============================================
// EDITORIAL - Horizontale Timeline
// ============================================
const EditorialSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #0A0A0A;
  overflow: hidden;
`;

const EditorialContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const EditorialHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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
  color: #FAFAFA;
  
  span { color: #C41E3A; }
`;

const EditorialTimeline = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 12.5%;
    right: 12.5%;
    height: 2px;
    background: linear-gradient(90deg, #C41E3A 0%, rgba(196,30,58,0.3) 100%);
  }
  
  @media (max-width: 900px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    margin: 0 -1.5rem;
    padding: 0 1.5rem 1rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
    
    &::before {
      display: none;
    }
  }
`;

const EditorialStep = styled.div`
  text-align: center;
  position: relative;
  padding: 0 1rem;
  
  @media (max-width: 900px) {
    flex: 0 0 250px;
    scroll-snap-align: start;
    padding: 0;
  }
`;

const EditorialDot = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #0A0A0A;
  border: 2px solid #C41E3A;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  position: relative;
  z-index: 2;
  
  span {
    font-family: 'Oswald', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #C41E3A;
  }
`;

const EditorialStepTitle = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #FAFAFA;
  margin-bottom: 0.75rem;
`;

const EditorialStepDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
`;

const EditorialHighlight = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 0.85rem;
  font-style: italic;
  color: #C41E3A;
  margin-top: 1rem;
`;

// ============================================
// BOTANICAL - Akkordeon/FAQ Style
// ============================================
const BotanicalSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: transparent;
  position: relative;
  z-index: 10;
`;

const BotanicalContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BotanicalHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const BotanicalAccordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BotanicalItem = styled.div`
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid ${p => p.$open ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s ease;
`;

const BotanicalItemHeader = styled.button`
  width: 100%;
  padding: 1.5rem 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  text-align: left;
`;

const BotanicalNum = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 300;
  color: rgba(255,255,255,0.3);
  min-width: 50px;
`;

const BotanicalItemTitle = styled.span`
  flex: 1;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  color: rgba(255,255,255,0.95);
`;

const BotanicalToggle = styled.span`
  font-size: 1.5rem;
  color: rgba(255,255,255,0.5);
  transition: transform 0.3s ease;
  transform: rotate(${p => p.$open ? '45deg' : '0'});
`;

const BotanicalItemContent = styled.div`
  max-height: ${p => p.$open ? '400px' : '0'};
  opacity: ${p => p.$open ? 1 : 0};
  overflow: hidden;
  transition: all 0.4s ease;
  padding: ${p => p.$open ? '0 2rem 2rem 5.5rem' : '0 2rem 0 5.5rem'};
`;

const BotanicalDesc = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const BotanicalHighlight = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  color: rgba(255,255,255,0.8);
`;

// ============================================
// CONTEMPORARY - Karten-Grid mit Hover
// ============================================
const ContemporarySection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #FFE66D;
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
  color: #0D0D0D;
  margin-bottom: 0.5rem;
`;

const ContemporaryTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
`;

const ContemporaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 700px) {
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

const CARD_COLORS = ['#FF6B6B', '#4ECDC4', '#9B5DE5', '#0D0D0D'];

const ContemporaryCard = styled.div`
  background: #fff;
  border: 3px solid #0D0D0D;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 6px 6px 0 ${p => CARD_COLORS[p.$i % 4]};
  
  @media (max-width: 700px) {
    flex: 0 0 280px;
    scroll-snap-align: start;
    padding: 1.5rem;
  }
  
  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 10px 10px 0 ${p => CARD_COLORS[p.$i % 4]};
  }
`;

const ContemporaryCardNum = styled.div`
  position: absolute;
  top: -15px;
  right: 20px;
  background: ${p => CARD_COLORS[p.$i % 4]};
  color: ${p => p.$i === 3 ? '#fff' : '#0D0D0D'};
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.4rem 1rem;
  border: 2px solid #0D0D0D;
`;

const ContemporaryCardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ContemporaryCardTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 0.75rem;
`;

const ContemporaryCardDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: #525252;
  line-height: 1.6;
`;

const ContemporaryCardHighlight = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #FF6B6B;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px dashed #E5E5E5;
`;

// ============================================
// LUXE - Full-Width Sections untereinander
// ============================================
const LuxeSection = styled.section`
  background: #0A0A0A;
`;

const LuxeHeader = styled.div`
  text-align: center;
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem) 4rem;
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

const LuxeStep = styled.div`
  display: grid;
  grid-template-columns: ${p => p.$reverse ? '1fr 1fr' : '1fr 1fr'};
  min-height: 50vh;
  
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

const LuxeStepContent = styled.div`
  padding: clamp(3rem, 8vw, 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  order: ${p => p.$reverse ? 2 : 1};
  
  @media (max-width: 768px) {
    order: 2;
  }
`;

const LuxeStepVisual = styled.div`
  background: ${p => p.$bg || '#111'};
  display: flex;
  align-items: center;
  justify-content: center;
  order: ${p => p.$reverse ? 1 : 2};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(201,169,98,0.1) 0%, transparent 70%);
  }
  
  @media (max-width: 768px) {
    order: 1;
    min-height: 200px;
  }
`;

const LuxeStepNum = styled.span`
  font-family: 'Cormorant', serif;
  font-size: 8rem;
  font-weight: 300;
  font-style: italic;
  color: rgba(201,169,98,0.2);
`;

const LuxeStepTag = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #C9A962;
  margin-bottom: 0.5rem;
`;

const LuxeStepTitle = styled.h3`
  font-family: 'Cormorant', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
  margin-bottom: 1.5rem;
`;

const LuxeStepDesc = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(248,246,243,0.6);
  line-height: 1.9;
  margin-bottom: 1.5rem;
`;

const LuxeStepHighlight = styled.p`
  font-family: 'Cormorant', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #C9A962;
`;

// ============================================
// NEON - Terminal/CLI Style
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
      radial-gradient(ellipse at 20% 30%, rgba(0,255,255,0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(255,0,255,0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const NeonContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const NeonTerminal = styled.div`
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(0,255,255,0.3);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0,255,255,0.1);
`;

const NeonTerminalHeader = styled.div`
  background: rgba(0,255,255,0.1);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(0,255,255,0.2);
`;

const NeonDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${p => p.$c};
`;

const NeonTerminalTitle = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.5);
  margin-left: 0.5rem;
`;

const NeonTerminalBody = styled.div`
  padding: 1.5rem;
`;

const NeonLine = styled.div`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  
  &:last-child { margin-bottom: 0; }
`;

const NeonPrompt = styled.span`
  color: #00ffff;
  margin-right: 0.5rem;
`;

const NeonCommand = styled.span`
  color: #00ff88;
`;

const NeonOutput = styled.div`
  color: rgba(255,255,255,0.7);
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  line-height: 1.8;
  border-left: 2px solid rgba(0,255,255,0.2);
`;

const NeonHighlight = styled.span`
  color: #ff00ff;
  text-shadow: 0 0 10px rgba(255,0,255,0.5);
`;

const NeonComment = styled.span`
  color: rgba(255,255,255,0.3);
  font-style: italic;
`;

// ============================================
// VIDEO - Vertikale Stepper-Timeline
// ============================================
const VideoSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #0A0A0A;
`;

const VideoContainer = styled.div`
  max-width: 700px;
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

const VideoTimeline = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 24px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #6B8CAE 0%, rgba(107,140,174,0.2) 100%);
  }
`;

const VideoStep = styled.div`
  display: flex;
  gap: 2rem;
  padding-bottom: 3rem;
  
  &:last-child { padding-bottom: 0; }
`;

const VideoStepMarker = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #0A0A0A;
  border: 2px solid #6B8CAE;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  
  span {
    font-family: 'Manrope', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #6B8CAE;
  }
`;

const VideoStepContent = styled.div`
  flex: 1;
  padding-top: 0.5rem;
`;

const VideoStepTag = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.25rem;
`;

const VideoStepTitle = styled.h3`
  font-family: 'Manrope', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.75rem;
`;

const VideoStepDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #B0B0B0;
  line-height: 1.7;
`;

const VideoStepHighlight = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  color: #6B8CAE;
  margin-top: 1rem;
`;

// ============================================
// CLASSIC - Alternierend mit Bildern (organisch)
// ============================================

const CLASSIC_STEP_IMAGES = [
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1771173517/HowItWorks01_ggf1jp.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1771173517/HowItWorks02_sgdpjk.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1771173518/HowItWorks03_gkuv1v.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1771173517/HowItWorks04_gbjx3o.jpg',
];

// Organische Offsets pro Schritt — kein starres Grid
const CLASSIC_STEP_LAYOUT = [
  { reverse: false, imgAspect: '4/5', textPt: '1.5rem', shiftX: '0' },
  { reverse: true, imgAspect: '3/4', textPt: '3rem', shiftX: '5%' },
  { reverse: false, imgAspect: '1/1', textPt: '0.5rem', shiftX: '-3%' },
  { reverse: true, imgAspect: '4/5', textPt: '2.5rem', shiftX: '7%' },
];

const ClassicSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #FFFFFF;
`;

const ClassicContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const ClassicHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(3rem, 8vh, 5rem);
`;

const ClassicEyebrow = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #999999;
  margin-bottom: 1rem;
`;

const ClassicTitle = styled.h2`
  font-family: 'Mrs Saint Delafield', cursive;
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 400;
  line-height: 1.15;
  color: #1A1A1A;
`;

const ClassicSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 7vh, 5rem);
`;

const ClassicStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: clamp(2rem, 4vw, 3.5rem);
  flex-direction: ${p => p.$reverse ? 'row-reverse' : 'row'};
  margin-left: ${p => p.$shiftX || '0'};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-left: 0;
  }
`;

const ClassicStepImage = styled.div`
  width: clamp(160px, 22vw, 260px);
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: ${p => p.$aspect || '4/5'};
    object-fit: cover;
    display: block;
    /* filter removed */
  }

  @media (max-width: 768px) {
    width: clamp(180px, 50vw, 240px);
  }
`;

const ClassicStepContent = styled.div`
  flex: 1;
  padding-top: ${p => p.$pt || '0'};
  max-width: 480px;

  @media (max-width: 768px) {
    text-align: center;
    padding-top: 0;
  }
`;

const ClassicStepNum = styled.span`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 0.85rem;
  font-weight: 400;
  color: #999999;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.75rem;
`;

const ClassicStepTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.3rem, 2.5vw, 1.6rem);
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 0.75rem;
`;

const ClassicStepDesc = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: #555;
  line-height: 1.7;
`;

const ClassicStepHighlight = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  color: #999999;
  margin-top: 1rem;
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
  font-size: 0.7rem;
  margin-top: 1.5rem;
  opacity: 0.5;
`;

// ============================================
// MAIN COMPONENT
// ============================================
const HowItWorksSection = () => {
  const { currentTheme } = useTheme();
  const [openAccordion, setOpenAccordion] = useState(0);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ==========================================
  // CLASSIC - Vertikale Timeline (elegant)
  // ==========================================
  if (currentTheme === 'classic') {
    return (
      <ClassicSection id="howitworks">
        <ClassicContainer>
          <ClassicHeader>
            <ClassicEyebrow>Euer Weg zur Website</ClassicEyebrow>
            <ClassicTitle>In 4 einfachen Schritten</ClassicTitle>
          </ClassicHeader>
          <ClassicSteps>
            {STEPS.map((step, i) => {
              const layout = CLASSIC_STEP_LAYOUT[i];
              return (
                <ClassicStep key={i} $reverse={layout.reverse} $shiftX={layout.shiftX}>
                  <ClassicStepImage $aspect={layout.imgAspect}>
                    <img src={CLASSIC_STEP_IMAGES[i]} alt="" loading="lazy" />
                  </ClassicStepImage>
                  <ClassicStepContent $pt={layout.textPt}>
                    <ClassicStepNum>{step.num}</ClassicStepNum>
                    <ClassicStepTitle>{step.title}</ClassicStepTitle>
                    <ClassicStepDesc>{step.desc}</ClassicStepDesc>
                    <ClassicStepHighlight>{step.highlight}</ClassicStepHighlight>
                  </ClassicStepContent>
                </ClassicStep>
              );
            })}
          </ClassicSteps>
          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: '#1A1A1A' }}>
              {CTA_TEXT.headline}
            </CTAHeadline>
            <CTAButton
              onClick={scrollToContact}
              style={{ fontFamily: "'Josefin Sans', sans-serif", color: '#FFFFFF', background: '#1A1A1A', border: 'none' }}
            >
              {CTA_TEXT.button}
            </CTAButton>
            <CTASubline style={{ fontFamily: "'Josefin Sans', sans-serif", color: '#999' }}>
              {CTA_TEXT.subline}
            </CTASubline>
          </CTABox>
        </ClassicContainer>
      </ClassicSection>
    );
  }

  // ==========================================
  // EDITORIAL - Horizontale Timeline
  // ==========================================
  if (currentTheme === 'editorial') {
    return (
      <EditorialSection id="howitworks">
        <EditorialContainer>
          <EditorialHeader>
            <EditorialEyebrow>In 4 Schritten zu eurer</EditorialEyebrow>
            <EditorialTitle>S&I. <span>Premium</span> Website</EditorialTitle>
          </EditorialHeader>
          
          <EditorialTimeline>
            {STEPS.map((step, i) => (
              <EditorialStep key={i}>
                <EditorialDot><span>{step.num}</span></EditorialDot>
                <EditorialStepTitle>{step.title}</EditorialStepTitle>
                <EditorialStepDesc>{step.desc}</EditorialStepDesc>
                <EditorialHighlight>{step.highlight}</EditorialHighlight>
              </EditorialStep>
            ))}
          </EditorialTimeline>
          
          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>
              {CTA_TEXT.headline}
            </CTAHeadline>
            <CTAButton 
              onClick={scrollToContact}
              style={{ 
                fontFamily: "'Oswald', sans-serif", 
                color: '#FAFAFA', 
                background: '#C41E3A', 
                border: 'none' 
              }}
            >
              {CTA_TEXT.button}
            </CTAButton>
            <CTASubline style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.4)' }}>
              {CTA_TEXT.subline}
            </CTASubline>
          </CTABox>
        </EditorialContainer>
      </EditorialSection>
    );
  }

  // ==========================================
  // BOTANICAL - Akkordeon/FAQ Style
  // ==========================================
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="howitworks">
        <BotanicalContainer>
          <BotanicalHeader>
            <BotanicalEyebrow>Euer Weg zur Website</BotanicalEyebrow>
            <BotanicalTitle>In 4 einfachen Schritten</BotanicalTitle>
          </BotanicalHeader>
          
          <BotanicalAccordion>
            {STEPS.map((step, i) => (
              <BotanicalItem key={i} $open={openAccordion === i}>
                <BotanicalItemHeader onClick={() => setOpenAccordion(openAccordion === i ? -1 : i)}>
                  <BotanicalNum>{step.num}</BotanicalNum>
                  <BotanicalItemTitle>{step.title}</BotanicalItemTitle>
                  <BotanicalToggle $open={openAccordion === i}>+</BotanicalToggle>
                </BotanicalItemHeader>
                <BotanicalItemContent $open={openAccordion === i}>
                  <BotanicalDesc>{step.desc}</BotanicalDesc>
                  {step.detail && <BotanicalDesc>{step.detail}</BotanicalDesc>}
                  <BotanicalHighlight>{step.highlight}</BotanicalHighlight>
                </BotanicalItemContent>
              </BotanicalItem>
            ))}
          </BotanicalAccordion>
          
          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.8)' }}>
              {CTA_TEXT.headline}
            </CTAHeadline>
            <CTAButton 
              onClick={scrollToContact}
              style={{ 
                fontFamily: "'Montserrat', sans-serif", 
                color: '#040604', 
                background: 'rgba(255,255,255,0.95)', 
                border: 'none',
                borderRadius: '50px'
              }}
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
  // CONTEMPORARY - Karten-Grid
  // ==========================================
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="howitworks">
        <ContemporaryContainer>
          <ContemporaryHeader>
            <ContemporaryEyebrow>🚀 So geht's</ContemporaryEyebrow>
            <ContemporaryTitle>4 Steps to Go Live</ContemporaryTitle>
          </ContemporaryHeader>
          
          <ContemporaryGrid>
            {STEPS.map((step, i) => (
              <ContemporaryCard key={i} $i={i}>
                <ContemporaryCardNum $i={i}>{step.num}</ContemporaryCardNum>
                <ContemporaryCardIcon>{step.icon}</ContemporaryCardIcon>
                <ContemporaryCardTitle>{step.title}</ContemporaryCardTitle>
                <ContemporaryCardDesc>{step.desc}</ContemporaryCardDesc>
                <ContemporaryCardHighlight>{step.highlight}</ContemporaryCardHighlight>
              </ContemporaryCard>
            ))}
          </ContemporaryGrid>
          
          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: '#0D0D0D' }}>
              {CTA_TEXT.headline}
            </CTAHeadline>
            <CTAButton 
              onClick={scrollToContact}
              style={{ 
                fontFamily: "'Space Grotesk', sans-serif", 
                color: '#FAFAFA', 
                background: '#FF6B6B', 
                border: '3px solid #0D0D0D',
                boxShadow: '4px 4px 0 #0D0D0D'
              }}
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
  // LUXE - Full-Width Sections
  // ==========================================
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="howitworks">
        <LuxeHeader>
          <LuxeEyebrow>Der Weg zur Perfektion</LuxeEyebrow>
          <LuxeTitle>Vier Schritte zu eurer Website</LuxeTitle>
        </LuxeHeader>
        
        {STEPS.map((step, i) => (
          <LuxeStep key={i} $reverse={i % 2 === 1}>
            <LuxeStepContent $reverse={i % 2 === 1}>
              <LuxeStepTag>{step.tag}</LuxeStepTag>
              <LuxeStepTitle>{step.title}</LuxeStepTitle>
              <LuxeStepDesc>{step.desc}</LuxeStepDesc>
              {step.detail && <LuxeStepDesc>{step.detail}</LuxeStepDesc>}
              <LuxeStepHighlight>{step.highlight}</LuxeStepHighlight>
            </LuxeStepContent>
            <LuxeStepVisual $reverse={i % 2 === 1}>
              <LuxeStepNum>{step.num}</LuxeStepNum>
            </LuxeStepVisual>
          </LuxeStep>
        ))}
        
        <CTABox style={{ padding: '4rem 2rem' }}>
          <CTAHeadline style={{ fontFamily: "'Cormorant', serif", fontStyle: 'italic', color: 'rgba(248,246,243,0.8)' }}>
            {CTA_TEXT.headline}
          </CTAHeadline>
          <CTAButton 
            onClick={scrollToContact}
            style={{ 
              fontFamily: "'Outfit', sans-serif", 
              fontWeight: 400,
              letterSpacing: '0.3em',
              color: '#0A0A0A', 
              background: '#C9A962', 
              border: 'none'
            }}
          >
            {CTA_TEXT.button}
          </CTAButton>
          <CTASubline style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(248,246,243,0.4)' }}>
            {CTA_TEXT.subline}
          </CTASubline>
        </CTABox>
      </LuxeSection>
    );
  }

  // ==========================================
  // NEON - Terminal Style
  // ==========================================
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="howitworks">
        <NeonContainer>
          <NeonTerminal>
            <NeonTerminalHeader>
              <NeonDot $c="#ff5f56" />
              <NeonDot $c="#ffbd2e" />
              <NeonDot $c="#27c93f" />
              <NeonTerminalTitle>wedding_process.sh</NeonTerminalTitle>
            </NeonTerminalHeader>
            <NeonTerminalBody>
              <NeonLine>
                <NeonPrompt>$</NeonPrompt>
                <NeonCommand>./init_wedding_website.sh</NeonCommand>
              </NeonLine>
              
              {STEPS.map((step, i) => (
                <NeonLine key={i}>
                  <NeonPrompt>[{step.num}]</NeonPrompt>
                  <NeonHighlight>{step.title}</NeonHighlight>
                  <NeonOutput>
                    <NeonComment>// {step.tag}</NeonComment><br />
                    {step.desc}<br />
                    <span style={{ color: '#00ff88' }}>{step.highlight}</span>
                  </NeonOutput>
                </NeonLine>
              ))}
              
              <NeonLine style={{ marginTop: '2rem' }}>
                <NeonPrompt>$</NeonPrompt>
                <NeonCommand>echo "Process complete. Website ready."</NeonCommand>
              </NeonLine>
            </NeonTerminalBody>
          </NeonTerminal>
          
          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.8)' }}>
              {CTA_TEXT.headline}
            </CTAHeadline>
            <CTAButton 
              onClick={scrollToContact}
              style={{ 
                fontFamily: "'Space Grotesk', sans-serif", 
                color: '#00ff88', 
                background: 'transparent', 
                border: '1px solid #00ff88',
                boxShadow: '0 0 15px rgba(0,255,136,0.3)'
              }}
            >
              execute.contact()
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
  // VIDEO - Vertikale Stepper-Timeline (Default)
  // ==========================================
  return (
    <VideoSection id="howitworks">
      <VideoContainer>
        <VideoHeader>
          <VideoEyebrow>Euer Weg zur Website</VideoEyebrow>
          <VideoTitle>In 4 Schritten live</VideoTitle>
        </VideoHeader>
        
        <VideoTimeline>
          {STEPS.map((step, i) => (
            <VideoStep key={i}>
              <VideoStepMarker><span>{step.num}</span></VideoStepMarker>
              <VideoStepContent>
                <VideoStepTag>{step.tag}</VideoStepTag>
                <VideoStepTitle>{step.title}</VideoStepTitle>
                <VideoStepDesc>{step.desc}</VideoStepDesc>
                <VideoStepHighlight>{step.highlight}</VideoStepHighlight>
              </VideoStepContent>
            </VideoStep>
          ))}
        </VideoTimeline>
        
        <CTABox>
          <CTAHeadline style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>
            {CTA_TEXT.headline}
          </CTAHeadline>
          <CTAButton 
            onClick={scrollToContact}
            style={{ 
              fontFamily: "'Manrope', sans-serif", 
              color: '#FFFFFF', 
              background: 'transparent', 
              border: '1px solid #6B8CAE'
            }}
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

export default HowItWorksSection;
