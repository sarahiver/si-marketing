// src/components/marketing/HowItWorksSection.js
// Premium emotional Version - "In 4 Schritten zu eurer S&I. Premium Hochzeitswebsite"
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// CONTENT DATA
// ============================================
const STEPS = [
  {
    num: '01',
    tag: 'Der erste Eindruck zählt',
    title: 'Ihr verliebt euch',
    desc: 'Ihr entdeckt unsere Designs, spürt den Stil, seht die Qualität – und merkt: „Das fühlt sich nach uns an."',
    detail: 'Mit nur wenigen Klicks sendet ihr eure Anfrage. Unverbindlich. Einfach. Schnell.',
    highlight: '✨ Der erste Schritt zu einer Hochzeit mit digitalem Wow-Effekt.',
  },
  {
    num: '02',
    tag: 'Keine Baukästen. Keine Massenlösung.',
    title: 'Wir sprechen persönlich',
    desc: 'Wir melden uns persönlich bei euch. Gemeinsam besprechen wir eure Vision.',
    bullets: [
      'Welches Theme passt zu eurer Geschichte?',
      'Welche Komponenten braucht ihr wirklich?',
      'Welche Details machen eure Website einzigartig?',
    ],
    highlight: '🤍 Ihr trefft keine technische Entscheidung – wir führen euch stilvoll.',
  },
  {
    num: '03',
    tag: 'Einfach. Geführt. Entspannt.',
    title: 'Ihr liefert Inhalte. Wir übernehmen den Rest.',
    desc: 'Ihr erhaltet Zugang zu eurem persönlichen Admin-Dashboard.',
    bullets: [
      'Texte & Infos eintragen',
      'Bilder hochladen',
      'Inhalte final absenden',
    ],
    detail: 'Das technische Grundgerüst steht bereits – ihr müsst nichts bauen, nichts programmieren.',
    highlight: '🧩 Ihr teilt eure Geschichte – wir verwandeln sie in Design.',
  },
  {
    num: '04',
    tag: 'Der große Moment – auch digital.',
    title: 'Wir gestalten. Ihr geht live.',
    desc: 'Wir setzen eure Website professionell um, optimieren jedes Detail und informieren euch, sobald sie live ist.',
    bullets: [
      '✨ Feinschliff & Design-Revisionen',
      '🔁 Anpassungen nach eurem Feedback',
      '🚀 Finale Freigabe durch euch',
    ],
    highlight: '💍 Elegant. Emotional. Eindrucksvoll.',
  },
];

const CTA_TEXT = {
  headline: 'Bereit für eine Hochzeitswebsite, die so besonders ist wie eure Liebe?',
  button: 'Jetzt Anfrage senden',
  subline: '6 Premium-Themes · 18 liebevoll gestaltete Komponenten · Persönliche Betreuung',
};

// ============================================
// ANIMATIONS
// ============================================
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.3); }
  50% { box-shadow: 0 0 40px rgba(0,255,255,0.6); }
`;

// ============================================
// BASE STYLES
// ============================================
const Section = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: clamp(3rem, 8vh, 5rem);
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(3rem, 6vh, 5rem);
`;

const CTABox = styled.div`
  margin-top: clamp(4rem, 10vh, 6rem);
  text-align: center;
`;

// ============================================
// EDITORIAL THEME
// ============================================
const EditorialSection = styled(Section)`
  background: #0A0A0A;
`;

const EditorialEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #C41E3A;
  margin-bottom: 1.5rem;
`;

const EditorialTitle = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #FAFAFA;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  
  span {
    color: #C41E3A;
  }
`;

const EditorialSubtitle = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255,255,255,0.6);
  max-width: 600px;
  margin: 0 auto;
`;

const EditorialStep = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: start;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const EditorialNum = styled.div`
  font-family: 'Oswald', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  color: rgba(196, 30, 58, 0.3);
  line-height: 1;
  
  @media (max-width: 600px) {
    font-size: 3rem;
  }
`;

const EditorialStepContent = styled.div``;

const EditorialTag = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.5rem;
`;

const EditorialStepTitle = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #FAFAFA;
  margin-bottom: 1rem;
`;

const EditorialDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const EditorialBullets = styled.ul`
  list-style: none;
  margin: 1rem 0;
  
  li {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: rgba(255,255,255,0.6);
    padding: 0.4rem 0;
    padding-left: 1.5rem;
    position: relative;
    
    &::before {
      content: '—';
      position: absolute;
      left: 0;
      color: #C41E3A;
    }
  }
`;

const EditorialHighlight = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1rem;
  font-style: italic;
  color: #C41E3A;
  margin-top: 1.5rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(196, 30, 58, 0.3);
`;

const EditorialCTAHeadline = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1.3rem;
  font-style: italic;
  color: rgba(255,255,255,0.8);
  margin-bottom: 2rem;
`;

const EditorialCTAButton = styled.button`
  font-family: 'Oswald', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FAFAFA;
  background: #C41E3A;
  border: none;
  padding: 1.2rem 3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #a01830;
    transform: translateY(-2px);
  }
`;

const EditorialCTASubline = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  margin-top: 1.5rem;
  letter-spacing: 0.1em;
`;

// ============================================
// BOTANICAL THEME
// ============================================
const BotanicalSection = styled(Section)`
  background: transparent;
  position: relative;
  z-index: 10;
`;

const BotanicalEyebrow = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1.5rem;
`;

const BotanicalTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  color: rgba(255,255,255,0.95);
  line-height: 1.2;
  margin-bottom: 1.5rem;
`;

const BotanicalSubtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255,255,255,0.6);
  max-width: 600px;
  margin: 0 auto;
`;

const BotanicalStep = styled.div`
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: start;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const BotanicalNum = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3.5rem;
  font-weight: 300;
  color: rgba(255,255,255,0.2);
  line-height: 1;
`;

const BotanicalStepContent = styled.div``;

const BotanicalTag = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.5rem;
`;

const BotanicalStepTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(255,255,255,0.95);
  margin-bottom: 1rem;
`;

const BotanicalDesc = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
`;

const BotanicalBullets = styled.ul`
  list-style: none;
  margin: 1rem 0;
  
  li {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.6);
    padding: 0.4rem 0;
    padding-left: 1.2rem;
    position: relative;
    
    &::before {
      content: '·';
      position: absolute;
      left: 0;
      color: rgba(255,255,255,0.4);
    }
  }
`;

const BotanicalHighlight = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255,255,255,0.8);
  margin-top: 1.5rem;
`;

const BotanicalCTABox = styled(CTABox)`
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 3rem 2rem;
`;

const BotanicalCTAHeadline = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  color: rgba(255,255,255,0.9);
  margin-bottom: 2rem;
`;

const BotanicalCTAButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #040604;
  background: rgba(255,255,255,0.95);
  border: none;
  border-radius: 50px;
  padding: 1.2rem 3rem;
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(255,255,255,0.15);
  }
`;

const BotanicalCTASubline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  margin-top: 1.5rem;
`;

// ============================================
// CONTEMPORARY THEME
// ============================================
const ContemporarySection = styled(Section)`
  background: #4ECDC4;
`;

const ContemporaryEyebrow = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 1rem;
`;

const ContemporaryTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  line-height: 1.1;
  margin-bottom: 1rem;
`;

const ContemporarySubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: rgba(13,13,13,0.7);
  max-width: 600px;
  margin: 0 auto;
`;

const ContemporaryStep = styled.div`
  background: #fff;
  border: 3px solid #0D0D0D;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  box-shadow: 8px 8px 0 ${p => ['#FF6B6B', '#FFE66D', '#9B5DE5', '#0D0D0D'][p.$i % 4]};
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: start;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 ${p => ['#FF6B6B', '#FFE66D', '#9B5DE5', '#0D0D0D'][p.$i % 4]};
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ContemporaryNum = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: #0D0D0D;
  line-height: 1;
`;

const ContemporaryStepContent = styled.div``;

const ContemporaryTag = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #525252;
  margin-bottom: 0.5rem;
`;

const ContemporaryStepTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 1rem;
`;

const ContemporaryDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  color: #525252;
  line-height: 1.6;
`;

const ContemporaryBullets = styled.ul`
  list-style: none;
  margin: 1rem 0;
  
  li {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    color: #525252;
    padding: 0.4rem 0;
    padding-left: 1.5rem;
    position: relative;
    
    &::before {
      content: '→';
      position: absolute;
      left: 0;
      color: #FF6B6B;
      font-weight: 700;
    }
  }
`;

const ContemporaryHighlight = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #FF6B6B;
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background: #FFE66D;
  border: 2px solid #0D0D0D;
  display: inline-block;
`;

const ContemporaryCTABox = styled(CTABox)`
  background: #fff;
  border: 3px solid #0D0D0D;
  box-shadow: 8px 8px 0 #FF6B6B;
  padding: 3rem 2rem;
`;

const ContemporaryCTAHeadline = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #0D0D0D;
  margin-bottom: 2rem;
`;

const ContemporaryCTAButton = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FAFAFA;
  background: #FF6B6B;
  border: 3px solid #0D0D0D;
  padding: 1.2rem 3rem;
  box-shadow: 4px 4px 0 #0D0D0D;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #0D0D0D;
  }
`;

const ContemporaryCTASubline = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: #525252;
  margin-top: 1.5rem;
`;

// ============================================
// LUXE THEME
// ============================================
const LuxeSection = styled(Section)`
  background: #0A0A0A;
`;

const LuxeEyebrow = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #C9A962;
  margin-bottom: 1.5rem;
`;

const LuxeTitle = styled.h2`
  font-family: 'Cormorant', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
  line-height: 1.2;
  margin-bottom: 1.5rem;
`;

const LuxeSubtitle = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(248,246,243,0.5);
  max-width: 600px;
  margin: 0 auto;
`;

const LuxeStep = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2.5rem;
  align-items: start;
  padding: 2.5rem 0;
  border-bottom: 1px solid rgba(201, 169, 98, 0.15);
  
  &:last-child { border-bottom: none; }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const LuxeNum = styled.div`
  font-family: 'Cormorant', serif;
  font-size: 3.5rem;
  font-weight: 300;
  font-style: italic;
  color: #C9A962;
  line-height: 1;
`;

const LuxeStepContent = styled.div``;

const LuxeTag = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(248,246,243,0.4);
  margin-bottom: 0.5rem;
`;

const LuxeStepTitle = styled.h3`
  font-family: 'Cormorant', serif;
  font-size: 1.6rem;
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
  margin-bottom: 1rem;
`;

const LuxeDesc = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(248,246,243,0.6);
  line-height: 1.8;
`;

const LuxeBullets = styled.ul`
  list-style: none;
  margin: 1rem 0;
  
  li {
    font-family: 'Outfit', sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    color: rgba(248,246,243,0.5);
    padding: 0.4rem 0;
    padding-left: 1.2rem;
    position: relative;
    
    &::before {
      content: '·';
      position: absolute;
      left: 0;
      color: #C9A962;
    }
  }
`;

const LuxeHighlight = styled.p`
  font-family: 'Cormorant', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #C9A962;
  margin-top: 1.5rem;
`;

const LuxeCTAHeadline = styled.p`
  font-family: 'Cormorant', serif;
  font-size: 1.4rem;
  font-style: italic;
  color: rgba(248,246,243,0.8);
  margin-bottom: 2rem;
`;

const LuxeCTAButton = styled.button`
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #0A0A0A;
  background: #C9A962;
  border: none;
  padding: 1.2rem 3rem;
  cursor: pointer;
  transition: all 0.5s ease;
  
  &:hover {
    background: #d4b66f;
  }
`;

const LuxeCTASubline = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 300;
  color: rgba(248,246,243,0.4);
  margin-top: 1.5rem;
  letter-spacing: 0.1em;
`;

// ============================================
// NEON THEME
// ============================================
const NeonSection = styled(Section)`
  background: #0a0a0f;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 20% 30%, rgba(0,255,255,0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(255,0,255,0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const NeonEyebrow = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #ff00ff;
  text-shadow: 0 0 10px rgba(255,0,255,0.5);
  margin-bottom: 1rem;
`;

const NeonTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 1rem;
`;

const NeonSubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  max-width: 600px;
  margin: 0 auto;
`;

const NeonStep = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(0,255,255,0.2);
  padding: clamp(1.5rem, 4vw, 2.5rem);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: start;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0,255,255,0.15);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const NeonNum = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #00ffff;
  text-shadow: 0 0 20px rgba(0,255,255,0.5);
  line-height: 1;
`;

const NeonStepContent = styled.div``;

const NeonTag = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.5rem;
`;

const NeonStepTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 1rem;
`;

const NeonDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
`;

const NeonBullets = styled.ul`
  list-style: none;
  margin: 1rem 0;
  
  li {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.6);
    padding: 0.4rem 0;
    padding-left: 1.5rem;
    position: relative;
    
    &::before {
      content: '>';
      position: absolute;
      left: 0;
      color: #00ffff;
      text-shadow: 0 0 5px rgba(0,255,255,0.5);
    }
  }
`;

const NeonHighlight = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0,255,136,0.5);
  margin-top: 1.5rem;
`;

const NeonCTABox = styled(CTABox)`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(0,255,255,0.3);
  padding: 3rem 2rem;
`;

const NeonCTAHeadline = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.8);
  margin-bottom: 2rem;
`;

const NeonCTAButton = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #00ff88;
  background: transparent;
  border: 1px solid #00ff88;
  padding: 1.2rem 3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(0,255,136,0.3);
  
  &:hover {
    background: rgba(0,255,136,0.1);
    box-shadow: 0 0 30px rgba(0,255,136,0.5);
  }
`;

const NeonCTASubline = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  margin-top: 1.5rem;
`;

// ============================================
// VIDEO THEME
// ============================================
const VideoSection = styled(Section)`
  background: #0A0A0A;
`;

const VideoEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #6B8CAE;
  margin-bottom: 1.5rem;
`;

const VideoTitle = styled.h2`
  font-family: 'Manrope', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 1.5rem;
`;

const VideoSubtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #B0B0B0;
  max-width: 600px;
  margin: 0 auto;
`;

const VideoStep = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: start;
  padding: 2rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  
  &:last-child { border-bottom: none; }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const VideoNum = styled.div`
  font-family: 'Manrope', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #6B8CAE;
  line-height: 1;
`;

const VideoStepContent = styled.div``;

const VideoTag = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.5rem;
`;

const VideoStepTitle = styled.h3`
  font-family: 'Manrope', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1rem;
`;

const VideoDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #B0B0B0;
  line-height: 1.7;
`;

const VideoBullets = styled.ul`
  list-style: none;
  margin: 1rem 0;
  
  li {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #B0B0B0;
    padding: 0.4rem 0;
    padding-left: 1.2rem;
    position: relative;
    
    &::before {
      content: '—';
      position: absolute;
      left: 0;
      color: #6B8CAE;
    }
  }
`;

const VideoHighlight = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #6B8CAE;
  margin-top: 1.5rem;
`;

const VideoCTAHeadline = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-style: italic;
  color: rgba(255,255,255,0.8);
  margin-bottom: 2rem;
`;

const VideoCTAButton = styled.button`
  font-family: 'Manrope', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FFFFFF;
  background: transparent;
  border: 1px solid #6B8CAE;
  padding: 1.2rem 3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #6B8CAE;
  }
`;

const VideoCTASubline = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  margin-top: 1.5rem;
`;

// ============================================
// MAIN COMPONENT
// ============================================
const HowItWorksSection = () => {
  const { currentTheme } = useTheme();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // EDITORIAL
  if (currentTheme === 'editorial') {
    return (
      <EditorialSection id="howitworks">
        <Container>
          <Header>
            <EditorialEyebrow>In 4 Schritten zu eurer</EditorialEyebrow>
            <EditorialTitle>S&I. <span>Premium</span> Hochzeitswebsite</EditorialTitle>
            <EditorialSubtitle>Persönlich. Stilvoll. Stressfrei. So einfach wird aus eurer Vision eine Website, die eure Liebe widerspiegelt.</EditorialSubtitle>
          </Header>
          <StepsList>
            {STEPS.map((step, i) => (
              <EditorialStep key={i}>
                <EditorialNum>{step.num}</EditorialNum>
                <EditorialStepContent>
                  <EditorialTag>{step.tag}</EditorialTag>
                  <EditorialStepTitle>{step.title}</EditorialStepTitle>
                  <EditorialDesc>{step.desc}</EditorialDesc>
                  {step.bullets && (
                    <EditorialBullets>
                      {step.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </EditorialBullets>
                  )}
                  {step.detail && <EditorialDesc>{step.detail}</EditorialDesc>}
                  <EditorialHighlight>{step.highlight}</EditorialHighlight>
                </EditorialStepContent>
              </EditorialStep>
            ))}
          </StepsList>
          <CTABox>
            <EditorialCTAHeadline>{CTA_TEXT.headline}</EditorialCTAHeadline>
            <EditorialCTAButton onClick={scrollToContact}>{CTA_TEXT.button}</EditorialCTAButton>
            <EditorialCTASubline>{CTA_TEXT.subline}</EditorialCTASubline>
          </CTABox>
        </Container>
      </EditorialSection>
    );
  }

  // BOTANICAL
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="howitworks">
        <Container>
          <Header>
            <BotanicalEyebrow>In 4 Schritten zu eurer</BotanicalEyebrow>
            <BotanicalTitle>S&I. Premium Hochzeitswebsite</BotanicalTitle>
            <BotanicalSubtitle>Persönlich. Stilvoll. Stressfrei.</BotanicalSubtitle>
          </Header>
          <StepsList>
            {STEPS.map((step, i) => (
              <BotanicalStep key={i}>
                <BotanicalNum>{step.num}</BotanicalNum>
                <BotanicalStepContent>
                  <BotanicalTag>{step.tag}</BotanicalTag>
                  <BotanicalStepTitle>{step.title}</BotanicalStepTitle>
                  <BotanicalDesc>{step.desc}</BotanicalDesc>
                  {step.bullets && (
                    <BotanicalBullets>
                      {step.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </BotanicalBullets>
                  )}
                  {step.detail && <BotanicalDesc>{step.detail}</BotanicalDesc>}
                  <BotanicalHighlight>{step.highlight}</BotanicalHighlight>
                </BotanicalStepContent>
              </BotanicalStep>
            ))}
          </StepsList>
          <BotanicalCTABox>
            <BotanicalCTAHeadline>{CTA_TEXT.headline}</BotanicalCTAHeadline>
            <BotanicalCTAButton onClick={scrollToContact}>{CTA_TEXT.button}</BotanicalCTAButton>
            <BotanicalCTASubline>{CTA_TEXT.subline}</BotanicalCTASubline>
          </BotanicalCTABox>
        </Container>
      </BotanicalSection>
    );
  }

  // CONTEMPORARY
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="howitworks">
        <Container>
          <Header>
            <ContemporaryEyebrow>🚀 So geht's</ContemporaryEyebrow>
            <ContemporaryTitle>In 4 Schritten zur Website</ContemporaryTitle>
            <ContemporarySubtitle>Persönlich. Stilvoll. Stressfrei.</ContemporarySubtitle>
          </Header>
          <StepsList>
            {STEPS.map((step, i) => (
              <ContemporaryStep key={i} $i={i}>
                <ContemporaryNum>{step.num}</ContemporaryNum>
                <ContemporaryStepContent>
                  <ContemporaryTag>{step.tag}</ContemporaryTag>
                  <ContemporaryStepTitle>{step.title}</ContemporaryStepTitle>
                  <ContemporaryDesc>{step.desc}</ContemporaryDesc>
                  {step.bullets && (
                    <ContemporaryBullets>
                      {step.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ContemporaryBullets>
                  )}
                  {step.detail && <ContemporaryDesc>{step.detail}</ContemporaryDesc>}
                  <ContemporaryHighlight>{step.highlight}</ContemporaryHighlight>
                </ContemporaryStepContent>
              </ContemporaryStep>
            ))}
          </StepsList>
          <ContemporaryCTABox>
            <ContemporaryCTAHeadline>{CTA_TEXT.headline}</ContemporaryCTAHeadline>
            <ContemporaryCTAButton onClick={scrollToContact}>{CTA_TEXT.button} →</ContemporaryCTAButton>
            <ContemporaryCTASubline>{CTA_TEXT.subline}</ContemporaryCTASubline>
          </ContemporaryCTABox>
        </Container>
      </ContemporarySection>
    );
  }

  // LUXE
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="howitworks">
        <Container>
          <Header>
            <LuxeEyebrow>Der Weg zu eurer Website</LuxeEyebrow>
            <LuxeTitle>In 4 Schritten zur Perfektion</LuxeTitle>
            <LuxeSubtitle>Persönlich. Stilvoll. Stressfrei.</LuxeSubtitle>
          </Header>
          <StepsList>
            {STEPS.map((step, i) => (
              <LuxeStep key={i}>
                <LuxeNum>{step.num}</LuxeNum>
                <LuxeStepContent>
                  <LuxeTag>{step.tag}</LuxeTag>
                  <LuxeStepTitle>{step.title}</LuxeStepTitle>
                  <LuxeDesc>{step.desc}</LuxeDesc>
                  {step.bullets && (
                    <LuxeBullets>
                      {step.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </LuxeBullets>
                  )}
                  {step.detail && <LuxeDesc>{step.detail}</LuxeDesc>}
                  <LuxeHighlight>{step.highlight}</LuxeHighlight>
                </LuxeStepContent>
              </LuxeStep>
            ))}
          </StepsList>
          <CTABox>
            <LuxeCTAHeadline>{CTA_TEXT.headline}</LuxeCTAHeadline>
            <LuxeCTAButton onClick={scrollToContact}>{CTA_TEXT.button}</LuxeCTAButton>
            <LuxeCTASubline>{CTA_TEXT.subline}</LuxeCTASubline>
          </CTABox>
        </Container>
      </LuxeSection>
    );
  }

  // NEON
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="howitworks">
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Header>
            <NeonEyebrow>// Process.init()</NeonEyebrow>
            <NeonTitle>Execute: Website Launch</NeonTitle>
            <NeonSubtitle>4 steps to digital perfection</NeonSubtitle>
          </Header>
          <StepsList>
            {STEPS.map((step, i) => (
              <NeonStep key={i}>
                <NeonNum>{step.num}</NeonNum>
                <NeonStepContent>
                  <NeonTag>{step.tag}</NeonTag>
                  <NeonStepTitle>{step.title}</NeonStepTitle>
                  <NeonDesc>{step.desc}</NeonDesc>
                  {step.bullets && (
                    <NeonBullets>
                      {step.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </NeonBullets>
                  )}
                  {step.detail && <NeonDesc>{step.detail}</NeonDesc>}
                  <NeonHighlight>{step.highlight}</NeonHighlight>
                </NeonStepContent>
              </NeonStep>
            ))}
          </StepsList>
          <NeonCTABox>
            <NeonCTAHeadline>{CTA_TEXT.headline}</NeonCTAHeadline>
            <NeonCTAButton onClick={scrollToContact}>Execute.send() →</NeonCTAButton>
            <NeonCTASubline>{CTA_TEXT.subline}</NeonCTASubline>
          </NeonCTABox>
        </Container>
      </NeonSection>
    );
  }

  // VIDEO (Default)
  return (
    <VideoSection id="howitworks">
      <Container>
        <Header>
          <VideoEyebrow>In 4 Schritten zu eurer</VideoEyebrow>
          <VideoTitle>S&I. Premium Hochzeitswebsite</VideoTitle>
          <VideoSubtitle>Persönlich. Stilvoll. Stressfrei.</VideoSubtitle>
        </Header>
        <StepsList>
          {STEPS.map((step, i) => (
            <VideoStep key={i}>
              <VideoNum>{step.num}</VideoNum>
              <VideoStepContent>
                <VideoTag>{step.tag}</VideoTag>
                <VideoStepTitle>{step.title}</VideoStepTitle>
                <VideoDesc>{step.desc}</VideoDesc>
                {step.bullets && (
                  <VideoBullets>
                    {step.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </VideoBullets>
                )}
                {step.detail && <VideoDesc>{step.detail}</VideoDesc>}
                <VideoHighlight>{step.highlight}</VideoHighlight>
              </VideoStepContent>
            </VideoStep>
          ))}
        </StepsList>
        <CTABox>
          <VideoCTAHeadline>{CTA_TEXT.headline}</VideoCTAHeadline>
          <VideoCTAButton onClick={scrollToContact}>{CTA_TEXT.button}</VideoCTAButton>
          <VideoCTASubline>{CTA_TEXT.subline}</VideoCTASubline>
        </CTABox>
      </Container>
    </VideoSection>
  );
};

export default HowItWorksSection;
