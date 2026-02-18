// src/components/marketing/WhyUsSection.js
// "Warum S&I." - Vergleichssektion: S&I vs Agentur, KI, DIY
// Theme-Varianten mit jeweils passendem Design
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// CONTENT DATA
// ============================================
const CARDS = [
  {
    icon: '💼',
    label: 'Statt Agentur',
    quote: 'Schön — aber oft unpersönlich & teuer.',
    problem: 'Agenturen sind gut — aber oft teuer, langsam und anonym. Ihr zahlt für Meetings, Overhead und Präsentationen. Und am Ende fühlt sich eure Website trotzdem nicht wirklich nach euch an.',
    solution: 'Boutique statt Massenbetrieb. Persönlich, schnell und mit echtem Gefühl für Paare.',
  },
  {
    icon: '🤖',
    label: 'Statt KI-Tools',
    quote: 'Schnell — aber ohne Herz.',
    problem: 'KI kann Texte generieren. Aber sie kennt eure Geschichte nicht. Sie spürt nicht, wie ihr euch kennengelernt habt. Und sie weiß nicht, wie sich eure Hochzeit anfühlen soll.',
    solution: 'Menschen, Geschmack & Feingefühl — plus Technik im Hintergrund.',
  },
  {
    icon: '🛠️',
    label: 'Statt selber machen',
    quote: 'Günstig — aber auf Kosten eurer Zeit.',
    problem: 'Natürlich könnt ihr es selbst bauen. Aber wollt ihr eure Abende mit Layouts, Bugs und Mobile-Optimierung verbringen — oder mit Vorfreude auf euren großen Tag?',
    solution: 'Ihr gebt Inhalte — wir kümmern uns um den Rest.',
  },
];

const CONTENT = {
  eyebrow: 'Warum S&I.',
  headline: 'Weil eure Hochzeit zu wichtig ist für Experimente.',
  subline: 'Ihr könnt eine Agentur beauftragen. Ihr könnt es mit KI versuchen. Oder ihr könnt euch durch Baukästen kämpfen. Oder ihr entscheidet euch für eine Lösung, die sich einfach richtig anfühlt.',
  closingHeadline: 'Ihr plant einen der wichtigsten Tage eures Lebens.',
  closingText: 'Warum solltet ihr euch mit „okay" zufriedengeben? Wir bauen Hochzeitswebsites für Paare, die Stil, Qualität und Ruhe wollen — statt Stress, Bastellösungen oder anonyme Agenturprozesse.',
  ctaPrimary: 'Unsere Designs entdecken',
  ctaSecondary: 'Unverbindlich anfragen',
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

const glitch = keyframes`
  0%, 100% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
  25% { text-shadow: -2px 2px #ff00ff, 2px -2px #00ffff; }
  50% { text-shadow: 2px -2px #00ffff, -2px 2px #ff00ff; }
  75% { text-shadow: -2px -2px #ff00ff, 2px 2px #00ffff; }
`;

// ============================================
// EDITORIAL THEME — Magazine/Minimalist
// ============================================
const EditorialSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 6rem);
  background: #0A0A0A;
  color: #FAFAFA;
  position: relative;
  overflow: hidden;
`;

const EditorialEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 1.5rem;
`;

const EditorialHeadline = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.05;
  color: #FAFAFA;
  margin-bottom: 1.25rem;
  max-width: 700px;

  span { color: #C41E3A; }
`;

const EditorialSubline = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  line-height: 1.7;
  color: rgba(255,255,255,0.6);
  max-width: 600px;
  margin-bottom: 4rem;
`;

const EditorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const EditorialCard = styled.div`
  border-left: 2px solid #C41E3A;
  padding-left: 2rem;
`;

const EditorialCardIcon = styled.span`
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.75rem;
`;

const EditorialCardLabel = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #FAFAFA;
  margin-bottom: 0.5rem;
`;

const EditorialCardQuote = styled.p`
  font-family: 'Source Serif 4', serif;
  font-style: italic;
  font-size: 0.95rem;
  color: #C41E3A;
  margin-bottom: 1rem;
`;

const EditorialCardProblem = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1rem;
`;

const EditorialCardSolution = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  line-height: 1.5;

  &::before {
    content: 'Bei uns: ';
    color: #C41E3A;
    font-weight: 700;
  }
`;

const EditorialClosing = styled.div`
  text-align: center;
  max-width: 650px;
  margin: 0 auto;
`;

const EditorialClosingHeadline = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: clamp(1.3rem, 3vw, 2rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #FAFAFA;
  margin-bottom: 1rem;
`;

const EditorialClosingText = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.6);
  margin-bottom: 2.5rem;
`;

const EditorialCTAs = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const EditorialCTA = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  border: 1px solid ${p => p.$primary ? '#C41E3A' : 'rgba(255,255,255,0.3)'};
  background: ${p => p.$primary ? '#C41E3A' : 'transparent'};
  color: #FAFAFA;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${p => p.$primary ? '#a01830' : 'rgba(255,255,255,0.1)'};
    border-color: ${p => p.$primary ? '#a01830' : 'rgba(255,255,255,0.5)'};
  }
`;

// ============================================
// BOTANICAL THEME — Organic/Glass
// ============================================
const BotanicalSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: transparent;
  position: relative;
`;

const BotanicalInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const BotanicalEyebrow = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  margin-bottom: 1rem;
`;

const BotanicalHeadline = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 4.5vw, 3rem);
  font-weight: 400;
  color: rgba(255,255,255,0.95);
  line-height: 1.2;
  margin-bottom: 1rem;
`;

const BotanicalSubline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.5);
  max-width: 550px;
  margin: 0 auto 4rem;
`;

const BotanicalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BotanicalCard = styled.div`
  background: rgba(10,20,15,0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 2rem 1.75rem;
  text-align: left;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.3);
  }
`;

const BotanicalCardIcon = styled.span`
  font-size: 1.8rem;
  display: block;
  margin-bottom: 1rem;
`;

const BotanicalCardLabel = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(255,255,255,0.95);
  margin-bottom: 0.5rem;
`;

const BotanicalCardQuote = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 0.95rem;
  color: #90C9A8;
  margin-bottom: 1rem;
`;

const BotanicalCardProblem = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.55);
  margin-bottom: 1rem;
`;

const BotanicalCardSolution = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  line-height: 1.5;

  &::before {
    content: 'Bei uns: ';
    color: #90C9A8;
    font-weight: 700;
  }
`;

const BotanicalClosing = styled.div`
  text-align: center;
  max-width: 550px;
  margin: 0 auto;
`;

const BotanicalClosingHeadline = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: 500;
  color: rgba(255,255,255,0.95);
  margin-bottom: 1rem;
`;

const BotanicalClosingText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.5);
  margin-bottom: 2.5rem;
`;

const BotanicalCTAs = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const BotanicalCTA = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  border-radius: 30px;
  border: 1.5px solid ${p => p.$primary ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)'};
  background: ${p => p.$primary ? 'rgba(255,255,255,0.15)' : 'transparent'};
  color: rgba(255,255,255,0.9);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);

  &:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-2px);
  }
`;

// ============================================
// CONTEMPORARY THEME — Bold/Geometric
// ============================================
const ContemporarySection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #FAFAFA;
  position: relative;
`;

const ContemporaryInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const ContemporaryEyebrow = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FF6B6B;
  margin-bottom: 1rem;
`;

const ContemporaryHeadline = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  color: #0D0D0D;
  line-height: 1.1;
  margin-bottom: 1rem;
  max-width: 600px;
`;

const ContemporarySubline = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #525252;
  max-width: 550px;
  margin-bottom: 4rem;
`;

const ContemporaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ContemporaryCard = styled.div`
  background: #FFFFFF;
  border: 2px solid #0D0D0D;
  border-radius: 12px;
  padding: 2rem 1.75rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px) rotate(-0.5deg);
    box-shadow: 6px 6px 0 #FF6B6B;
  }
`;

const ContemporaryCardIcon = styled.span`
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
`;

const ContemporaryCardLabel = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #0D0D0D;
  margin-bottom: 0.5rem;
`;

const ContemporaryCardQuote = styled.p`
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-size: 0.85rem;
  color: #FF6B6B;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ContemporaryCardProblem = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  line-height: 1.6;
  color: #757575;
  margin-bottom: 1rem;
`;

const ContemporaryCardSolution = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: #0D0D0D;
  line-height: 1.5;
  padding-top: 0.75rem;
  border-top: 2px dashed rgba(0,0,0,0.1);

  &::before {
    content: 'Bei uns → ';
    color: #FF6B6B;
    font-weight: 700;
  }
`;

const ContemporaryClosing = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const ContemporaryClosingHeadline = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: 700;
  color: #0D0D0D;
  margin-bottom: 1rem;
`;

const ContemporaryClosingText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.7;
  color: #525252;
  margin-bottom: 2.5rem;
`;

const ContemporaryCTAs = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ContemporaryCTA = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 8px;
  border: 2px solid #0D0D0D;
  background: ${p => p.$primary ? '#0D0D0D' : '#FFFFFF'};
  color: ${p => p.$primary ? '#FFFFFF' : '#0D0D0D'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 4px 4px 0 #FF6B6B;
  }
`;

// ============================================
// LUXE THEME — Elegant/Dark/Gold
// ============================================
const LuxeSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 6rem);
  background: #0A0A0A;
  position: relative;
  overflow: hidden;
`;

const LuxeInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const LuxeEyebrow = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 1.5rem;
`;

const LuxeHeadline = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 300;
  color: #F8F6F3;
  line-height: 1.15;
  margin-bottom: 1.25rem;
`;

const LuxeSubline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(248,246,243,0.5);
  max-width: 520px;
  margin: 0 auto 4rem;
`;

const LuxeDivider = styled.div`
  width: 60px;
  height: 1px;
  background: #D4AF37;
  margin: 0 auto 4rem;
`;

const LuxeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 5rem;
  text-align: left;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const LuxeCard = styled.div`
  border: 1px solid rgba(212,175,55,0.2);
  padding: 2.5rem 2rem;
  position: relative;
  transition: all 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    border-color: rgba(212,175,55,0.4);
    &::before { opacity: 1; }
  }
`;

const LuxeCardIcon = styled.span`
  font-size: 1.3rem;
  display: block;
  margin-bottom: 1rem;
`;

const LuxeCardLabel = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 500;
  color: #F8F6F3;
  margin-bottom: 0.5rem;
`;

const LuxeCardQuote = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 0.9rem;
  color: #D4AF37;
  margin-bottom: 1.25rem;
`;

const LuxeCardProblem = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.78rem;
  line-height: 1.65;
  color: rgba(248,246,243,0.45);
  margin-bottom: 1.25rem;
`;

const LuxeCardSolution = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(248,246,243,0.85);
  line-height: 1.5;

  &::before {
    content: 'Bei uns: ';
    color: #D4AF37;
    font-weight: 700;
  }
`;

const LuxeClosing = styled.div`
  text-align: center;
  max-width: 550px;
  margin: 0 auto;
`;

const LuxeClosingHeadline = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: 400;
  color: #F8F6F3;
  margin-bottom: 1rem;
`;

const LuxeClosingText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.82rem;
  line-height: 1.7;
  color: rgba(248,246,243,0.5);
  margin-bottom: 2.5rem;
`;

const LuxeCTAs = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const LuxeCTA = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  border: 1px solid ${p => p.$primary ? '#D4AF37' : 'rgba(248,246,243,0.2)'};
  background: ${p => p.$primary ? '#D4AF37' : 'transparent'};
  color: ${p => p.$primary ? '#0A0A0A' : '#F8F6F3'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${p => p.$primary ? '#c4a030' : 'rgba(248,246,243,0.05)'};
  }
`;

// ============================================
// NEON THEME — Cyber/Terminal
// ============================================
const NeonSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #0a0a0f;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 20% 50%, rgba(255,0,110,0.06) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 50%, rgba(0,255,255,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const NeonInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const NeonEyebrow = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #FF006E;
  opacity: 0.7;
  margin-bottom: 1rem;
`;

const NeonHeadline = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 1rem;
  max-width: 600px;

  span {
    color: #FF006E;
    animation: ${glitch} 4s ease-in-out infinite;
  }
`;

const NeonSubline = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.4);
  max-width: 550px;
  margin-bottom: 4rem;
`;

const NeonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const NeonCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,0,110,0.15);
  border-radius: 4px;
  padding: 2rem 1.75rem;
  position: relative;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #FF006E, #00FFFF);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(255,0,110,0.05);
    border-color: rgba(255,0,110,0.3);
    &::before { opacity: 1; }
  }
`;

const NeonCardIcon = styled.span`
  font-size: 1.5rem;
  display: block;
  margin-bottom: 1rem;
`;

const NeonCardLabel = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
`;

const NeonCardQuote = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.82rem;
  color: #FF006E;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const NeonCardProblem = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.35);
  margin-bottom: 1rem;
`;

const NeonCardSolution = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
  line-height: 1.5;

  &::before {
    content: '> ';
    color: #00FFFF;
    font-weight: 700;
  }
`;

const NeonClosing = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const NeonClosingHeadline = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1rem;
`;

const NeonClosingText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.4);
  margin-bottom: 2.5rem;
`;

const NeonCTAs = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const NeonCTA = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border: 1px solid ${p => p.$primary ? '#FF006E' : 'rgba(255,255,255,0.15)'};
  background: ${p => p.$primary ? '#FF006E' : 'transparent'};
  color: ${p => p.$primary ? '#FFFFFF' : 'rgba(255,255,255,0.7)'};
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;

  &:hover {
    box-shadow: 0 0 20px ${p => p.$primary ? 'rgba(255,0,110,0.4)' : 'rgba(255,255,255,0.1)'};
  }
`;

// ============================================
// VIDEO THEME — Cinematic/Dark Minimal
// ============================================
const VideoSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #0A0A0A;
`;

const VideoInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const VideoEyebrow = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 1.5rem;
`;

const VideoHeadline = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: #FFFFFF;
  line-height: 1.15;
  margin-bottom: 1.25rem;
`;

const VideoSubline = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.4);
  max-width: 520px;
  margin: 0 auto 4rem;
`;

const VideoDivider = styled.div`
  width: 40px;
  height: 1px;
  background: rgba(255,255,255,0.2);
  margin: 0 auto 4rem;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;
  text-align: left;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const VideoCard = styled.div`
  padding: 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding-bottom: 2rem;
`;

const VideoCardIcon = styled.span`
  font-size: 1.5rem;
  display: block;
  margin-bottom: 1rem;
`;

const VideoCardLabel = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
`;

const VideoCardQuote = styled.p`
  font-family: 'Outfit', sans-serif;
  font-style: italic;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1rem;
`;

const VideoCardProblem = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.82rem;
  line-height: 1.6;
  color: rgba(255,255,255,0.3);
  margin-bottom: 1rem;
`;

const VideoCardSolution = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: rgba(255,255,255,0.8);
  line-height: 1.5;

  &::before {
    content: 'Bei uns: ';
    color: rgba(255,255,255,0.5);
    font-weight: 300;
  }
`;

const VideoClosing = styled.div`
  text-align: center;
  max-width: 550px;
  margin: 0 auto;
`;

const VideoClosingHeadline = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-weight: 400;
  color: #FFFFFF;
  margin-bottom: 1rem;
`;

const VideoClosingText = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.4);
  margin-bottom: 2.5rem;
`;

const VideoCTAs = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const VideoCTA = styled.button`
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  padding: 1rem 2.5rem;
  border: 1px solid ${p => p.$primary ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)'};
  background: ${p => p.$primary ? '#FFFFFF' : 'transparent'};
  color: ${p => p.$primary ? '#0A0A0A' : 'rgba(255,255,255,0.6)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${p => p.$primary ? '#e0e0e0' : 'rgba(255,255,255,0.05)'};
  }
`;

// ============================================
// CLASSIC THEME — Timeless/Warm/Elegant
// ============================================
const ClassicSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 6rem);
  background: #FFFFFF;
  position: relative;
  overflow: hidden;
`;

const ClassicContainer = styled.div`
  max-width: 1060px;
  margin: 0 auto;
`;

const ClassicHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const ClassicEyebrow = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999999;
  margin-bottom: 1.25rem;
`;

const ClassicTitle = styled.h2`
  font-family: 'Mrs Saint Delafield', cursive;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 400;
  color: #1A1A1A;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ClassicSubline = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: clamp(0.9rem, 1.3vw, 1.05rem);
  font-weight: 300;
  line-height: 1.75;
  color: #555;
  max-width: 580px;
  margin: 0 auto;
`;

// TODO: Replace with actual image
const ClassicPanorama = styled.img`
  width: calc(100% + clamp(3rem, 10vw, 12rem));
  margin-left: calc(-1 * clamp(1.5rem, 5vw, 6rem));
  height: clamp(140px, 18vh, 200px);
  object-fit: cover;
  display: block;
  margin-bottom: clamp(3rem, 6vh, 5rem);
  /* filter removed */
`;

const ClassicScrollWrapper = styled.div`
  @media (max-width: 900px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    margin-left: calc(-1 * clamp(1.5rem, 5vw, 6rem));
    margin-right: calc(-1 * clamp(1.5rem, 5vw, 6rem));
    padding-left: clamp(1.5rem, 5vw, 6rem);
    padding-right: clamp(1.5rem, 5vw, 6rem);
    padding-bottom: 1rem;
    /* scrollbar styling */
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.15) transparent;
    &::-webkit-scrollbar { height: 4px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 2px; }
  }
`;

const ClassicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 80vw);
    gap: 1.25rem;
    margin-bottom: 0;
    padding-right: clamp(1.5rem, 5vw, 6rem);
  }
`;

const ClassicCard = styled.div`
  background: #FFFFFF;
  border-left: 2px solid rgba(0,0,0,0.1);
  padding: 2.25rem 2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  transition: all 0.35s ease;

  @media (max-width: 900px) {
    scroll-snap-align: start;
    flex-shrink: 0;
  }

  &:hover {
    box-shadow: 0 6px 24px rgba(0,0,0,0.07);
    transform: translateY(-3px);
  }
`;

const ClassicCardIcon = styled.span`
  font-size: 1.4rem;
  display: block;
  margin-bottom: 0.85rem;
`;

const ClassicCardLabel = styled.h3`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #999999;
  margin-bottom: 0.6rem;
`;

const ClassicCardQuote = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: 1.05rem;
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const ClassicCardProblem = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 300;
  line-height: 1.65;
  color: #555;
  margin-bottom: 1rem;
`;

const ClassicCardSolution = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.82rem;
  font-weight: 400;
  color: #1A1A1A;
  line-height: 1.55;

  &::before {
    content: 'Bei uns: ';
    color: #999999;
    font-weight: 600;
  }
`;

const ClassicScrollHint = styled.p`
  display: none;
  @media (max-width: 900px) {
    display: block;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: #bbbbbb;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 3rem;
  }
`;

const ClassicClosing = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const ClassicClosingHeadline = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.3rem, 3vw, 1.9rem);
  font-weight: 300;
  color: #1A1A1A;
  margin-bottom: 1rem;
`;

const ClassicClosingText = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.75;
  color: #555;
  margin-bottom: 2.5rem;
`;

const ClassicCTAs = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ClassicCTA = styled.button`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  padding: 0.95rem 2.25rem;
  border: 1.5px solid ${p => p.$primary ? '#1A1A1A' : '#1A1A1A'};
  background: ${p => p.$primary ? '#1A1A1A' : 'transparent'};
  color: ${p => p.$primary ? '#FFFFFF' : '#1A1A1A'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${p => p.$primary ? '#333333' : 'rgba(0,0,0,0.04)'};
    border-color: ${p => p.$primary ? '#333333' : '#333333'};
  }
`;

// ============================================
// MAIN COMPONENT
// ============================================
const WhyUsSection = () => {
  const { currentTheme } = useTheme();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ---- CLASSIC ----
  if (currentTheme === 'classic') {
    return (
      <ClassicSection id="why-us">
        <ClassicContainer>
          <ClassicHeader>
            <ClassicEyebrow>{CONTENT.eyebrow}</ClassicEyebrow>
            <ClassicTitle>{CONTENT.headline}</ClassicTitle>
            <ClassicSubline>{CONTENT.subline}</ClassicSubline>
          </ClassicHeader>
          <ClassicPanorama
            src="https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1920/v1771173517/WhyUS_azpejd.jpg"
            alt=""
            loading="lazy"
          />
          <ClassicScrollWrapper>
            <ClassicGrid>
              {CARDS.map((card, i) => (
                <ClassicCard key={i}>
                  <ClassicCardIcon>{card.icon}</ClassicCardIcon>
                  <ClassicCardLabel>{card.label}</ClassicCardLabel>
                  <ClassicCardQuote>{card.quote}</ClassicCardQuote>
                  <ClassicCardProblem>{card.problem}</ClassicCardProblem>
                  <ClassicCardSolution>{card.solution}</ClassicCardSolution>
                </ClassicCard>
              ))}
            </ClassicGrid>
          </ClassicScrollWrapper>
          <ClassicScrollHint>← wischen →</ClassicScrollHint>
          <ClassicClosing>
            <ClassicClosingHeadline>{CONTENT.closingHeadline}</ClassicClosingHeadline>
            <ClassicClosingText>{CONTENT.closingText}</ClassicClosingText>
            <ClassicCTAs>
              <ClassicCTA $primary onClick={() => scrollTo('themes')}>{CONTENT.ctaPrimary}</ClassicCTA>
              <ClassicCTA onClick={() => scrollTo('contact')}>{CONTENT.ctaSecondary}</ClassicCTA>
            </ClassicCTAs>
          </ClassicClosing>
        </ClassicContainer>
      </ClassicSection>
    );
  }

  // ---- EDITORIAL ----
  if (currentTheme === 'editorial') {
    return (
      <EditorialSection id="why-us">
        <EditorialEyebrow>{CONTENT.eyebrow}</EditorialEyebrow>
        <EditorialHeadline>
          Weil eure Hochzeit zu wichtig ist<br/>für <span>Experimente.</span>
        </EditorialHeadline>
        <EditorialSubline>{CONTENT.subline}</EditorialSubline>
        <EditorialGrid>
          {CARDS.map((card, i) => (
            <EditorialCard key={i}>
              <EditorialCardIcon>{card.icon}</EditorialCardIcon>
              <EditorialCardLabel>{card.label}</EditorialCardLabel>
              <EditorialCardQuote>{card.quote}</EditorialCardQuote>
              <EditorialCardProblem>{card.problem}</EditorialCardProblem>
              <EditorialCardSolution>{card.solution}</EditorialCardSolution>
            </EditorialCard>
          ))}
        </EditorialGrid>
        <EditorialClosing>
          <EditorialClosingHeadline>{CONTENT.closingHeadline}</EditorialClosingHeadline>
          <EditorialClosingText>{CONTENT.closingText}</EditorialClosingText>
          <EditorialCTAs>
            <EditorialCTA $primary onClick={() => scrollTo('themes')}>{CONTENT.ctaPrimary}</EditorialCTA>
            <EditorialCTA onClick={() => scrollTo('contact')}>{CONTENT.ctaSecondary}</EditorialCTA>
          </EditorialCTAs>
        </EditorialClosing>
      </EditorialSection>
    );
  }

  // ---- BOTANICAL ----
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="why-us">
        <BotanicalInner>
          <BotanicalEyebrow>{CONTENT.eyebrow}</BotanicalEyebrow>
          <BotanicalHeadline>{CONTENT.headline}</BotanicalHeadline>
          <BotanicalSubline>{CONTENT.subline}</BotanicalSubline>
          <BotanicalGrid>
            {CARDS.map((card, i) => (
              <BotanicalCard key={i}>
                <BotanicalCardIcon>{card.icon}</BotanicalCardIcon>
                <BotanicalCardLabel>{card.label}</BotanicalCardLabel>
                <BotanicalCardQuote>{card.quote}</BotanicalCardQuote>
                <BotanicalCardProblem>{card.problem}</BotanicalCardProblem>
                <BotanicalCardSolution>{card.solution}</BotanicalCardSolution>
              </BotanicalCard>
            ))}
          </BotanicalGrid>
          <BotanicalClosing>
            <BotanicalClosingHeadline>{CONTENT.closingHeadline}</BotanicalClosingHeadline>
            <BotanicalClosingText>{CONTENT.closingText}</BotanicalClosingText>
            <BotanicalCTAs>
              <BotanicalCTA $primary onClick={() => scrollTo('themes')}>{CONTENT.ctaPrimary}</BotanicalCTA>
              <BotanicalCTA onClick={() => scrollTo('contact')}>{CONTENT.ctaSecondary}</BotanicalCTA>
            </BotanicalCTAs>
          </BotanicalClosing>
        </BotanicalInner>
      </BotanicalSection>
    );
  }

  // ---- CONTEMPORARY ----
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="why-us">
        <ContemporaryInner>
          <ContemporaryEyebrow>⚡ {CONTENT.eyebrow}</ContemporaryEyebrow>
          <ContemporaryHeadline>{CONTENT.headline}</ContemporaryHeadline>
          <ContemporarySubline>{CONTENT.subline}</ContemporarySubline>
          <ContemporaryGrid>
            {CARDS.map((card, i) => (
              <ContemporaryCard key={i}>
                <ContemporaryCardIcon>{card.icon}</ContemporaryCardIcon>
                <ContemporaryCardLabel>{card.label}</ContemporaryCardLabel>
                <ContemporaryCardQuote>{card.quote}</ContemporaryCardQuote>
                <ContemporaryCardProblem>{card.problem}</ContemporaryCardProblem>
                <ContemporaryCardSolution>{card.solution}</ContemporaryCardSolution>
              </ContemporaryCard>
            ))}
          </ContemporaryGrid>
          <ContemporaryClosing>
            <ContemporaryClosingHeadline>{CONTENT.closingHeadline}</ContemporaryClosingHeadline>
            <ContemporaryClosingText>{CONTENT.closingText}</ContemporaryClosingText>
            <ContemporaryCTAs>
              <ContemporaryCTA $primary onClick={() => scrollTo('themes')}>{CONTENT.ctaPrimary}</ContemporaryCTA>
              <ContemporaryCTA onClick={() => scrollTo('contact')}>{CONTENT.ctaSecondary}</ContemporaryCTA>
            </ContemporaryCTAs>
          </ContemporaryClosing>
        </ContemporaryInner>
      </ContemporarySection>
    );
  }

  // ---- LUXE ----
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="why-us">
        <LuxeInner>
          <LuxeEyebrow>{CONTENT.eyebrow}</LuxeEyebrow>
          <LuxeHeadline>{CONTENT.headline}</LuxeHeadline>
          <LuxeSubline>{CONTENT.subline}</LuxeSubline>
          <LuxeDivider />
          <LuxeGrid>
            {CARDS.map((card, i) => (
              <LuxeCard key={i}>
                <LuxeCardIcon>{card.icon}</LuxeCardIcon>
                <LuxeCardLabel>{card.label}</LuxeCardLabel>
                <LuxeCardQuote>{card.quote}</LuxeCardQuote>
                <LuxeCardProblem>{card.problem}</LuxeCardProblem>
                <LuxeCardSolution>{card.solution}</LuxeCardSolution>
              </LuxeCard>
            ))}
          </LuxeGrid>
          <LuxeClosing>
            <LuxeClosingHeadline>{CONTENT.closingHeadline}</LuxeClosingHeadline>
            <LuxeClosingText>{CONTENT.closingText}</LuxeClosingText>
            <LuxeCTAs>
              <LuxeCTA $primary onClick={() => scrollTo('themes')}>{CONTENT.ctaPrimary}</LuxeCTA>
              <LuxeCTA onClick={() => scrollTo('contact')}>{CONTENT.ctaSecondary}</LuxeCTA>
            </LuxeCTAs>
          </LuxeClosing>
        </LuxeInner>
      </LuxeSection>
    );
  }

  // ---- NEON ----
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="why-us">
        <NeonInner>
          <NeonEyebrow>// why_us.compare()</NeonEyebrow>
          <NeonHeadline>
            Weil eure Hochzeit zu wichtig ist für <span>Experimente.</span>
          </NeonHeadline>
          <NeonSubline>{CONTENT.subline}</NeonSubline>
          <NeonGrid>
            {CARDS.map((card, i) => (
              <NeonCard key={i}>
                <NeonCardIcon>{card.icon}</NeonCardIcon>
                <NeonCardLabel>{card.label}</NeonCardLabel>
                <NeonCardQuote>"{card.quote}"</NeonCardQuote>
                <NeonCardProblem>{card.problem}</NeonCardProblem>
                <NeonCardSolution>{card.solution}</NeonCardSolution>
              </NeonCard>
            ))}
          </NeonGrid>
          <NeonClosing>
            <NeonClosingHeadline>{CONTENT.closingHeadline}</NeonClosingHeadline>
            <NeonClosingText>{CONTENT.closingText}</NeonClosingText>
            <NeonCTAs>
              <NeonCTA $primary onClick={() => scrollTo('themes')}>{CONTENT.ctaPrimary}</NeonCTA>
              <NeonCTA onClick={() => scrollTo('contact')}>{CONTENT.ctaSecondary}</NeonCTA>
            </NeonCTAs>
          </NeonClosing>
        </NeonInner>
      </NeonSection>
    );
  }

  // ---- VIDEO (Default) ----
  return (
    <VideoSection id="why-us">
      <VideoInner>
        <VideoEyebrow>{CONTENT.eyebrow}</VideoEyebrow>
        <VideoHeadline>{CONTENT.headline}</VideoHeadline>
        <VideoSubline>{CONTENT.subline}</VideoSubline>
        <VideoDivider />
        <VideoGrid>
          {CARDS.map((card, i) => (
            <VideoCard key={i}>
              <VideoCardIcon>{card.icon}</VideoCardIcon>
              <VideoCardLabel>{card.label}</VideoCardLabel>
              <VideoCardQuote>{card.quote}</VideoCardQuote>
              <VideoCardProblem>{card.problem}</VideoCardProblem>
              <VideoCardSolution>{card.solution}</VideoCardSolution>
            </VideoCard>
          ))}
        </VideoGrid>
        <VideoClosing>
          <VideoClosingHeadline>{CONTENT.closingHeadline}</VideoClosingHeadline>
          <VideoClosingText>{CONTENT.closingText}</VideoClosingText>
          <VideoCTAs>
            <VideoCTA $primary onClick={() => scrollTo('themes')}>{CONTENT.ctaPrimary}</VideoCTA>
            <VideoCTA onClick={() => scrollTo('contact')}>{CONTENT.ctaSecondary}</VideoCTA>
          </VideoCTAs>
        </VideoClosing>
      </VideoInner>
    </VideoSection>
  );
};

export default WhyUsSection;
