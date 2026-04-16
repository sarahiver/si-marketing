// src/components/marketing/AboutSection.js
// "Über uns" - 6 verschiedene Layout-Logiken:
// Editorial: Split-Screen Magazin Layout
// Botanical: Story-Cards mit Parallax-Bild
// Contemporary: Comic/Storyboard Style mit Panels
// Luxe: Cinematischer Vollbild-Scroll
// Neon: Terminal-Interview Format
// Video: Timeline mit aufklappbaren Abschnitten
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// CLOUDINARY IMAGE - Sarah & Iver
// ============================================
const SARAH_IVER_IMAGE = 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1769863906/iverlasting/demo/hero/v8il9fyd1u6dhj6se3tz.jpg';
const SARAH_IVER_CLASSIC = 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771225849/foto3_fn6ovc.jpg';

// ============================================
// CONTENT DATA
// ============================================
const STORY_SECTIONS = [
  {
    id: 'origin',
    title: 'Es begann mit unserer eigenen Hochzeit',
    content: 'Als wir unsere Hochzeit planten, suchten wir eine Website, die sich nach uns anfühlt. Stilvoll. Modern. Emotional. Etwas, das wir stolz an unsere Gäste schicken können.',
  },
  {
    id: 'problem',
    title: 'Was wir fanden, hat uns enttäuscht',
    content: 'Baukästen ohne Seele. Designs, die aussahen wie jede andere Hochzeit. Komplizierte Tools, für die man einen Informatik-Abschluss braucht. Oder teure Agenturen, die monatelang brauchen.',
  },
  {
    id: 'solution',
    title: 'Also haben wir es selbst gebaut',
    content: 'Erst für uns. Dann für Freunde, die fragten: „Könnt ihr das auch für uns machen?" Und dann wurde aus einer Idee ein Versprechen: Jedes Paar verdient eine Website, die sich anfühlt wie der schönste Tag.',
  },
  {
    id: 'vision',
    title: 'Das steckt hinter jedem Pixel',
    content: 'Sarah sorgt dafür, dass jede Website nicht nur schön aussieht — sondern sich richtig anfühlt. Iver baut die Technik, damit alles fließt. Zusammen sind wir S&I. — und wir geben nicht ab, bevor es perfekt ist.',
  },
];

const TEAM = {
  sarah: {
    name: 'Sarah',
    role: 'Herz, Design & Gefühl',
    emoji: '🎨',
    desc: 'Sarah sorgt dafür, dass jede Website nicht nur schön aussieht, sondern sich richtig anfühlt. Farben, Typografie, Bildsprache — alles wird mit Liebe zum Detail gestaltet.',
  },
  iver: {
    name: 'Iver',
    role: 'Technik & persönliche Begleitung',
    emoji: '🧑‍💻',
    desc: 'Iver kümmert sich um Technik, Umsetzung und Betreuung. Vom ersten Gespräch bis zur fertigen Website — ein echter Ansprechpartner, keine Massenabfertigung.',
  },
};

const CTA = {
  headline: 'Eure Hochzeit ist besonders. Eure Website sollte es auch sein.',
  button: 'Erzählt uns eure Geschichte',
  tagline: 'S&I. — Handgemachte Hochzeitswebsites für Paare mit Anspruch.',
};

// ============================================
// ANIMATIONS
// ============================================
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// ============================================
// EDITORIAL - Split-Screen Magazin
// ============================================
const EditorialSection = styled.section`
  background: #FAFAFA;
`;

const EditorialHero = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const EditorialImage = styled.div`
  background: url(${SARAH_IVER_IMAGE}) center/cover no-repeat;
  min-height: 400px;
  
  @media (max-width: 900px) {
    min-height: 50vh;
  }
`;

const EditorialContent = styled.div`
  padding: clamp(3rem, 8vw, 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
  margin-bottom: 0.5rem;
`;

const EditorialSubtitle = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1.2rem;
  font-style: italic;
  color: #666;
  margin-bottom: 2rem;
`;

const EditorialText = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1rem;
  color: #333;
  line-height: 1.9;
  margin-bottom: 1.5rem;
`;

const EditorialQuote = styled.blockquote`
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #C41E3A;
  margin: 2rem 0;
  padding-left: 1.5rem;
  border-left: 4px solid #C41E3A;
`;

const EditorialTeam = styled.div`
  padding: clamp(3rem, 8vw, 6rem);
  background: #0A0A0A;
`;

const EditorialTeamGrid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 3rem;
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

const EditorialTeamMember = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    flex: 0 0 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
  }
`;

const EditorialTeamEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EditorialTeamName = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #FAFAFA;
  margin-bottom: 0.25rem;
`;

const EditorialTeamRole = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1rem;
  font-style: italic;
  color: #C41E3A;
  margin-bottom: 1rem;
`;

const EditorialTeamDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
`;

const EditorialCTA = styled.div`
  padding: clamp(3rem, 8vw, 5rem);
  text-align: center;
  background: #FAFAFA;
`;

// ============================================
// CLASSIC - Elegant Warm Layout
// ============================================
const ClassicSection = styled.section`
  background: #FFFFFF;
`;

const ClassicHero = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const ClassicImage = styled.div`
  background: url(${SARAH_IVER_CLASSIC}) center/cover no-repeat;
  min-height: 400px;
  /* filter removed */

  @media (max-width: 900px) {
    min-height: 50vh;
  }
`;

const ClassicContent = styled.div`
  padding: clamp(3rem, 8vw, 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ClassicEyebrow = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: #999999;
  margin-bottom: 1rem;
`;

const ClassicTitle = styled.h2`
  font-family: 'Mrs Saint Delafield', cursive;
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
`;

const ClassicSubtitle = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 300;
  color: #555;
  margin-bottom: 2rem;
`;

const ClassicText = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #555;
  line-height: 1.9;
  margin-bottom: 1.5rem;
`;

const ClassicQuote = styled.blockquote`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 300;
  font-style: italic;
  color: #1A1A1A;
  margin: 2rem 0;
  padding-left: 1.5rem;
  border-left: 4px solid rgba(0,0,0,0.1);
`;

const ClassicTeam = styled.div`
  padding: clamp(3rem, 8vw, 6rem);
  background: #FFFFFF;
`;

const ClassicTeamGrid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 3rem;
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

const ClassicTeamCard = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    flex: 0 0 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
  }
`;

const ClassicTeamEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ClassicTeamName = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 300;
  color: #1A1A1A;
  margin-bottom: 0.25rem;
`;

const ClassicTeamRole = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  color: #999999;
  margin-bottom: 1rem;
`;

const ClassicTeamDesc = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: #555;
  line-height: 1.7;
`;

const ClassicCTA = styled.div`
  padding: clamp(3rem, 8vw, 5rem);
  text-align: center;
  background: #FFFFFF;
`;

// ============================================
// BOTANICAL - Story Cards mit Parallax
// ============================================
const BotanicalSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: transparent;
  position: relative;
  z-index: 10;
`;

const BotanicalContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const BotanicalImageCard = styled.div`
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 3rem;
`;

const BotanicalImg = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const BotanicalImageCaption = styled.div`
  padding: 2rem;
  text-align: center;
`;

const BotanicalEyebrow = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-bottom: 0.5rem;
`;

const BotanicalTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: rgba(255,255,255,0.95);
`;

const BotanicalStory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BotanicalStoryCard = styled.div`
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:hover {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.15);
  }
`;

const BotanicalStoryTitle = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 500;
  color: rgba(255,255,255,0.95);
  margin-bottom: 0.75rem;
`;

const BotanicalStoryText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.8;
`;

const BotanicalTeamSection = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const BotanicalTeamCard = styled.div`
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
`;

// ============================================
// CONTEMPORARY - Comic Panels
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

const ContemporaryTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
`;

const ContemporaryComic = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const PANEL_COLORS = ['#FF6B6B', '#4ECDC4', '#9B5DE5', '#0D0D0D'];

const ContemporaryPanel = styled.div`
  background: #fff;
  border: 3px solid #0D0D0D;
  padding: 1.5rem;
  box-shadow: 6px 6px 0 ${p => PANEL_COLORS[p.$i % 4]};
  
  ${p => p.$large && css`
    grid-column: span 2;
    
    @media (max-width: 500px) {
      grid-column: span 1;
    }
  `}
`;

const ContemporaryPanelNum = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  background: #0D0D0D;
  padding: 0.25rem 0.5rem;
  display: inline-block;
  margin-bottom: 0.75rem;
`;

const ContemporaryPanelTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 0.5rem;
`;

const ContemporaryPanelText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: #525252;
  line-height: 1.6;
`;

const ContemporaryImagePanel = styled.div`
  background: url(${SARAH_IVER_IMAGE}) center/cover no-repeat;
  border: 3px solid #0D0D0D;
  min-height: 250px;
  grid-row: span 2;
  box-shadow: 6px 6px 0 #FF6B6B;
  position: relative;
  
  &::after {
    content: 'SARAH & IVER';
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: #fff;
    background: #0D0D0D;
    padding: 0.5rem 1rem;
  }
  
  @media (max-width: 800px) {
    grid-row: span 1;
    min-height: 300px;
  }
`;

const ContemporaryTeam = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ContemporaryTeamCard = styled.div`
  background: #fff;
  border: 3px solid #0D0D0D;
  padding: 1.5rem;
  box-shadow: 5px 5px 0 ${p => p.$color || '#4ECDC4'};
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const ContemporaryTeamEmoji = styled.span`
  font-size: 2rem;
`;

const ContemporaryTeamContent = styled.div``;

const ContemporaryTeamName = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
`;

const ContemporaryTeamRole = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: #FF6B6B;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ContemporaryTeamDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: #666;
  line-height: 1.5;
`;

// ============================================
// LUXE - Cinematisch
// ============================================
const LuxeSection = styled.section`
  background: #0A0A0A;
`;

const LuxeHero = styled.div`
  position: relative;
  height: 70vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url(${SARAH_IVER_IMAGE}) center/cover no-repeat;
    filter: brightness(0.4);
  }
`;

const LuxeHeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
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
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
`;

const LuxeContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem);
`;

const LuxeText = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(248,246,243,0.7);
  line-height: 2;
  margin-bottom: 2rem;
  text-align: center;
`;

const LuxeQuote = styled.blockquote`
  font-family: 'Cormorant', serif;
  font-size: 1.8rem;
  font-style: italic;
  color: #C9A962;
  text-align: center;
  margin: 3rem 0;
  padding: 2rem 0;
  border-top: 1px solid rgba(201, 169, 98, 0.2);
  border-bottom: 1px solid rgba(201, 169, 98, 0.2);
`;

const LuxeTeamSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: rgba(201, 169, 98, 0.2);
  margin-top: 4rem;
  
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const LuxeTeamCard = styled.div`
  background: #0A0A0A;
  padding: 3rem;
  text-align: center;
`;

const LuxeTeamEmoji = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const LuxeTeamName = styled.h3`
  font-family: 'Cormorant', serif;
  font-size: 1.5rem;
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
  margin-bottom: 0.25rem;
`;

const LuxeTeamRole = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #C9A962;
  margin-bottom: 1rem;
`;

const LuxeTeamDesc = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: rgba(248,246,243,0.5);
  line-height: 1.8;
`;

// ============================================
// NEON - Terminal Interview
// ============================================
const NeonSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #0a0a0f;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(255,0,255,0.05) 0%, transparent 50%);
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
  padding: 2rem;
`;

const NeonLine = styled.div`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  
  &:last-child { margin-bottom: 0; }
`;

const NeonPrompt = styled.span`
  color: #00ffff;
`;

const NeonCommand = styled.span`
  color: #00ff88;
`;

const NeonOutput = styled.div`
  color: rgba(255,255,255,0.8);
  margin-top: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(0,255,255,0.2);
  line-height: 1.8;
`;

const NeonHighlight = styled.span`
  color: #ff00ff;
`;

const NeonImage = styled.div`
  margin: 2rem 0;
  border: 1px solid rgba(0,255,255,0.3);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    filter: saturate(0.8) brightness(0.9);
  }
`;

const NeonTeamGrid = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 600px) {
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

const NeonTeamCard = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(0,255,255,0.2);
  padding: 1.5rem;

  @media (max-width: 768px) {
    flex: 0 0 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
  }
`;

const NeonTeamName = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0,255,255,0.5);
  margin-bottom: 0.25rem;
`;

const NeonTeamRole = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: #ff00ff;
  margin-bottom: 0.75rem;
`;

const NeonTeamDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
`;

// ============================================
// VIDEO - Timeline mit Akkordeon
// ============================================
const VideoSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #0A0A0A;
`;

const VideoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const VideoHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  align-items: center;
  
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const VideoImage = styled.img`
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  
  @media (max-width: 700px) {
    max-height: 400px;
  }
`;

const VideoHeaderContent = styled.div``;

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
  font-size: clamp(2rem, 5vw, 2.5rem);
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1rem;
`;

const VideoSubtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #888;
`;

const VideoTimeline = styled.div`
  position: relative;
  padding-left: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #6B8CAE 0%, rgba(107,140,174,0.2) 100%);
  }
`;

const VideoTimelineItem = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  
  &::before {
    content: '';
    position: absolute;
    left: -2rem;
    top: 1.25rem;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${p => p.$open ? '#6B8CAE' : '#333'};
    border: 2px solid #6B8CAE;
    transition: all 0.3s ease;
  }
`;

const VideoTimelineHeader = styled.button`
  width: 100%;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1.25rem 1.5rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(107, 140, 174, 0.1);
    border-color: rgba(107, 140, 174, 0.3);
  }
`;

const VideoTimelineTitle = styled.h3`
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
`;

const VideoTimelineArrow = styled.span`
  color: #6B8CAE;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  transform: rotate(${p => p.$open ? '90deg' : '0'});
`;

const VideoTimelineContent = styled.div`
  max-height: ${p => p.$open ? '300px' : '0'};
  opacity: ${p => p.$open ? 1 : 0};
  overflow: hidden;
  transition: all 0.3s ease;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-top: none;
`;

const VideoTimelineText = styled.p`
  padding: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #B0B0B0;
  line-height: 1.8;
`;

const VideoTeamSection = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const VideoTeamCard = styled.div`
  border: 1px solid rgba(107, 140, 174, 0.3);
  padding: 2rem;
  text-align: center;
`;

const VideoTeamEmoji = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const VideoTeamName = styled.h3`
  font-family: 'Manrope', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.25rem;
`;

const VideoTeamRole = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #6B8CAE;
  margin-bottom: 1rem;
`;

const VideoTeamDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #888;
  line-height: 1.7;
`;

// ============================================
// SHARED CTA
// ============================================
const CTABox = styled.div`
  margin-top: clamp(3rem, 8vh, 5rem);
  text-align: center;
  padding: 2rem;
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

const CTATagline = styled.p`
  font-size: 0.75rem;
  margin-top: 1.5rem;
`;

// ============================================
// MAIN COMPONENT
// ============================================
const AboutSection = () => {
  const { currentTheme } = useTheme();
  const [openSection, setOpenSection] = useState(0);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ==========================================
  // CLASSIC - Elegant Warm
  // ==========================================
  if (currentTheme === 'classic') {
    return (
      <ClassicSection id="about">
        <ClassicHero>
          <ClassicImage />
          <ClassicContent>
            <ClassicEyebrow>Über uns</ClassicEyebrow>
            <ClassicTitle>Sarah & Iver</ClassicTitle>
            <ClassicSubtitle>Warum es S&I. überhaupt gibt</ClassicSubtitle>
            <ClassicText>
              S&I. ist aus unserer eigenen Hochzeitsreise entstanden. Als wir unsere Hochzeit planten,
              wollten wir eine Website, die unsere Geschichte widerspiegelt – stilvoll, modern, emotional.
            </ClassicText>
            <ClassicQuote>
              „Unsere Hochzeit verdient etwas Besonderes – warum gibt es das nicht?"
            </ClassicQuote>
            <ClassicText>
              Also haben wir es selbst gebaut. Aus einer Idee wurde Leidenschaft.
              Aus Leidenschaft wurde S&I. Premium Hochzeitswebsites.
            </ClassicText>
          </ClassicContent>
        </ClassicHero>

        <ClassicTeam>
          <ClassicTeamGrid>
            <ClassicTeamCard>
              <ClassicTeamEmoji>{TEAM.sarah.emoji}</ClassicTeamEmoji>
              <ClassicTeamName>{TEAM.sarah.name}</ClassicTeamName>
              <ClassicTeamRole>{TEAM.sarah.role}</ClassicTeamRole>
              <ClassicTeamDesc>{TEAM.sarah.desc}</ClassicTeamDesc>
            </ClassicTeamCard>
            <ClassicTeamCard>
              <ClassicTeamEmoji>{TEAM.iver.emoji}</ClassicTeamEmoji>
              <ClassicTeamName>{TEAM.iver.name}</ClassicTeamName>
              <ClassicTeamRole>{TEAM.iver.role}</ClassicTeamRole>
              <ClassicTeamDesc>{TEAM.iver.desc}</ClassicTeamDesc>
            </ClassicTeamCard>
          </ClassicTeamGrid>
        </ClassicTeam>

        <ClassicCTA>
          <CTAHeadline style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, color: '#555' }}>
            {CTA.headline}
          </CTAHeadline>
          <CTAButton
            onClick={scrollToContact}
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#FFFFFF', background: '#1A1A1A', border: 'none' }}
          >
            {CTA.button}
          </CTAButton>
          <CTATagline style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#999' }}>
            {CTA.tagline}
          </CTATagline>
        </ClassicCTA>
      </ClassicSection>
    );
  }

  // ==========================================
  // EDITORIAL - Split Screen
  // ==========================================
  if (currentTheme === 'editorial') {
    return (
      <EditorialSection id="about">
        <EditorialHero>
          <EditorialImage />
          <EditorialContent>
            <EditorialEyebrow>Über uns</EditorialEyebrow>
            <EditorialTitle>Sarah & Iver</EditorialTitle>
            <EditorialSubtitle>Warum es S&I. überhaupt gibt</EditorialSubtitle>
            <EditorialText>
              S&I. ist aus unserer eigenen Hochzeitsreise entstanden. Als wir unsere Hochzeit planten, 
              wollten wir eine Website, die unsere Geschichte widerspiegelt – stilvoll, modern, emotional.
            </EditorialText>
            <EditorialQuote>
              „Unsere Hochzeit verdient etwas Besonderes – warum gibt es das nicht?"
            </EditorialQuote>
            <EditorialText>
              Also haben wir es selbst gebaut. Aus einer Idee wurde Leidenschaft. 
              Aus Leidenschaft wurde S&I. Premium Hochzeitswebsites.
            </EditorialText>
          </EditorialContent>
        </EditorialHero>
        
        <EditorialTeam>
          <EditorialTeamGrid>
            <EditorialTeamMember>
              <EditorialTeamEmoji>{TEAM.sarah.emoji}</EditorialTeamEmoji>
              <EditorialTeamName>{TEAM.sarah.name}</EditorialTeamName>
              <EditorialTeamRole>{TEAM.sarah.role}</EditorialTeamRole>
              <EditorialTeamDesc>{TEAM.sarah.desc}</EditorialTeamDesc>
            </EditorialTeamMember>
            <EditorialTeamMember>
              <EditorialTeamEmoji>{TEAM.iver.emoji}</EditorialTeamEmoji>
              <EditorialTeamName>{TEAM.iver.name}</EditorialTeamName>
              <EditorialTeamRole>{TEAM.iver.role}</EditorialTeamRole>
              <EditorialTeamDesc>{TEAM.iver.desc}</EditorialTeamDesc>
            </EditorialTeamMember>
          </EditorialTeamGrid>
        </EditorialTeam>
        
        <EditorialCTA>
          <CTAHeadline style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', color: '#525252' }}>
            {CTA.headline}
          </CTAHeadline>
          <CTAButton 
            onClick={scrollToContact}
            style={{ fontFamily: "'Oswald', sans-serif", color: '#FAFAFA', background: '#C41E3A', border: 'none' }}
          >
            {CTA.button}
          </CTAButton>
          <CTATagline style={{ fontFamily: "'Inter', sans-serif", color: '#999' }}>
            {CTA.tagline}
          </CTATagline>
        </EditorialCTA>
      </EditorialSection>
    );
  }

  // ==========================================
  // BOTANICAL - Story Cards
  // ==========================================
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="about">
        <BotanicalContainer>
          <BotanicalImageCard>
            <BotanicalImg src={SARAH_IVER_IMAGE} alt="Sarah und Iver – Gründer von S&I. Premium Hochzeitswebsites" loading="lazy" />
            <BotanicalImageCaption>
              <BotanicalEyebrow>Über uns</BotanicalEyebrow>
              <BotanicalTitle>Sarah & Iver</BotanicalTitle>
            </BotanicalImageCaption>
          </BotanicalImageCard>
          
          <BotanicalStory>
            {STORY_SECTIONS.map((section) => (
              <BotanicalStoryCard key={section.id}>
                <BotanicalStoryTitle>{section.title}</BotanicalStoryTitle>
                <BotanicalStoryText>{section.content}</BotanicalStoryText>
              </BotanicalStoryCard>
            ))}
          </BotanicalStory>
          
          <BotanicalTeamSection>
            <BotanicalTeamCard>
              <BotanicalStoryTitle>{TEAM.sarah.emoji} {TEAM.sarah.name}</BotanicalStoryTitle>
              <BotanicalEyebrow style={{ marginBottom: '0.75rem' }}>{TEAM.sarah.role}</BotanicalEyebrow>
              <BotanicalStoryText>{TEAM.sarah.desc}</BotanicalStoryText>
            </BotanicalTeamCard>
            <BotanicalTeamCard>
              <BotanicalStoryTitle>{TEAM.iver.emoji} {TEAM.iver.name}</BotanicalStoryTitle>
              <BotanicalEyebrow style={{ marginBottom: '0.75rem' }}>{TEAM.iver.role}</BotanicalEyebrow>
              <BotanicalStoryText>{TEAM.iver.desc}</BotanicalStoryText>
            </BotanicalTeamCard>
          </BotanicalTeamSection>
          
          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.8)' }}>
              {CTA.headline}
            </CTAHeadline>
            <CTAButton 
              onClick={scrollToContact}
              style={{ fontFamily: "'Montserrat', sans-serif", color: '#040604', background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '50px' }}
            >
              {CTA.button}
            </CTAButton>
          </CTABox>
        </BotanicalContainer>
      </BotanicalSection>
    );
  }

  // ==========================================
  // CONTEMPORARY - Comic Panels
  // ==========================================
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="about">
        <ContemporaryContainer>
          <ContemporaryHeader>
            <ContemporaryTitle>👋 Unsere Story</ContemporaryTitle>
          </ContemporaryHeader>
          
          <ContemporaryComic>
            <ContemporaryImagePanel />
            {STORY_SECTIONS.map((section, i) => (
              <ContemporaryPanel key={section.id} $i={i} $large={i === 2}>
                <ContemporaryPanelNum>{i + 1}</ContemporaryPanelNum>
                <ContemporaryPanelTitle>{section.title}</ContemporaryPanelTitle>
                <ContemporaryPanelText>{section.content}</ContemporaryPanelText>
              </ContemporaryPanel>
            ))}
          </ContemporaryComic>
          
          <ContemporaryTeam>
            <ContemporaryTeamCard $color="#FF6B6B">
              <ContemporaryTeamEmoji>{TEAM.sarah.emoji}</ContemporaryTeamEmoji>
              <ContemporaryTeamContent>
                <ContemporaryTeamName>{TEAM.sarah.name}</ContemporaryTeamName>
                <ContemporaryTeamRole>{TEAM.sarah.role}</ContemporaryTeamRole>
                <ContemporaryTeamDesc>{TEAM.sarah.desc}</ContemporaryTeamDesc>
              </ContemporaryTeamContent>
            </ContemporaryTeamCard>
            <ContemporaryTeamCard $color="#4ECDC4">
              <ContemporaryTeamEmoji>{TEAM.iver.emoji}</ContemporaryTeamEmoji>
              <ContemporaryTeamContent>
                <ContemporaryTeamName>{TEAM.iver.name}</ContemporaryTeamName>
                <ContemporaryTeamRole>{TEAM.iver.role}</ContemporaryTeamRole>
                <ContemporaryTeamDesc>{TEAM.iver.desc}</ContemporaryTeamDesc>
              </ContemporaryTeamContent>
            </ContemporaryTeamCard>
          </ContemporaryTeam>
          
          <CTABox>
            <CTAButton 
              onClick={scrollToContact}
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#FAFAFA', background: '#FF6B6B', border: '3px solid #0D0D0D', boxShadow: '4px 4px 0 #0D0D0D' }}
            >
              {CTA.button} →
            </CTAButton>
          </CTABox>
        </ContemporaryContainer>
      </ContemporarySection>
    );
  }

  // ==========================================
  // LUXE - Cinematisch
  // ==========================================
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="about">
        <LuxeHero>
          <LuxeHeroContent>
            <LuxeEyebrow>Über uns</LuxeEyebrow>
            <LuxeTitle>Sarah & Iver</LuxeTitle>
          </LuxeHeroContent>
        </LuxeHero>
        
        <LuxeContent>
          <LuxeText>
            S&I. ist aus unserer eigenen Hochzeitsreise entstanden. Als wir unsere Hochzeit planten, 
            wollten wir eine Website, die unsere Geschichte widerspiegelt – stilvoll, modern, emotional.
          </LuxeText>
          
          <LuxeQuote>
            „Unsere Hochzeit verdient etwas Besonderes – warum gibt es das nicht?"
          </LuxeQuote>
          
          <LuxeText>
            Wir erschaffen ein digitales Zuhause für eure Hochzeit: für eure Geschichte, 
            eure Gäste, eure Erinnerungen und euren großen Tag.
          </LuxeText>
          
          <LuxeTeamSection>
            <LuxeTeamCard>
              <LuxeTeamEmoji>{TEAM.sarah.emoji}</LuxeTeamEmoji>
              <LuxeTeamName>{TEAM.sarah.name}</LuxeTeamName>
              <LuxeTeamRole>{TEAM.sarah.role}</LuxeTeamRole>
              <LuxeTeamDesc>{TEAM.sarah.desc}</LuxeTeamDesc>
            </LuxeTeamCard>
            <LuxeTeamCard>
              <LuxeTeamEmoji>{TEAM.iver.emoji}</LuxeTeamEmoji>
              <LuxeTeamName>{TEAM.iver.name}</LuxeTeamName>
              <LuxeTeamRole>{TEAM.iver.role}</LuxeTeamRole>
              <LuxeTeamDesc>{TEAM.iver.desc}</LuxeTeamDesc>
            </LuxeTeamCard>
          </LuxeTeamSection>
          
          <CTABox>
            <CTAHeadline style={{ fontFamily: "'Cormorant', serif", fontStyle: 'italic', color: 'rgba(248,246,243,0.8)' }}>
              {CTA.headline}
            </CTAHeadline>
            <CTAButton 
              onClick={scrollToContact}
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, letterSpacing: '0.3em', color: '#0A0A0A', background: '#C9A962', border: 'none' }}
            >
              {CTA.button}
            </CTAButton>
          </CTABox>
        </LuxeContent>
      </LuxeSection>
    );
  }

  // ==========================================
  // NEON - Terminal Interview
  // ==========================================
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="about">
        <NeonContainer>
          <NeonTerminal>
            <NeonTerminalHeader>
              <NeonDot $c="#ff5f56" />
              <NeonDot $c="#ffbd2e" />
              <NeonDot $c="#27c93f" />
              <NeonTerminalTitle>about_si.interview</NeonTerminalTitle>
            </NeonTerminalHeader>
            
            <NeonTerminalBody>
              <NeonImage>
                <img src={SARAH_IVER_IMAGE} alt="Sarah und Iver – Das Paar hinter S&I. Hochzeitswebsites" loading="lazy" />
              </NeonImage>
              
              <NeonLine>
                <NeonPrompt>$</NeonPrompt> <NeonCommand>who --founders</NeonCommand>
                <NeonOutput>
                  <NeonHighlight>Sarah & Iver</NeonHighlight> - Die Köpfe hinter S&I. Premium Hochzeitswebsites
                </NeonOutput>
              </NeonLine>
              
              <NeonLine>
                <NeonPrompt>$</NeonPrompt> <NeonCommand>cat origin_story.txt</NeonCommand>
                <NeonOutput>
                  S&I. ist aus unserer eigenen Hochzeitsreise entstanden. Wir wollten eine Website, 
                  die unsere Geschichte widerspiegelt. Was wir fanden: Baukästen ohne Gefühl.
                </NeonOutput>
              </NeonLine>
              
              <NeonLine>
                <NeonPrompt>$</NeonPrompt> <NeonCommand>echo $MISSION</NeonCommand>
                <NeonOutput>
                  <NeonHighlight>"Unsere Hochzeit verdient etwas Besonderes – warum gibt es das nicht?"</NeonHighlight>
                </NeonOutput>
              </NeonLine>
              
              <NeonTeamGrid>
                <NeonTeamCard>
                  <NeonTeamName>{TEAM.sarah.emoji} {TEAM.sarah.name}</NeonTeamName>
                  <NeonTeamRole>{TEAM.sarah.role}</NeonTeamRole>
                  <NeonTeamDesc>{TEAM.sarah.desc}</NeonTeamDesc>
                </NeonTeamCard>
                <NeonTeamCard>
                  <NeonTeamName>{TEAM.iver.emoji} {TEAM.iver.name}</NeonTeamName>
                  <NeonTeamRole>{TEAM.iver.role}</NeonTeamRole>
                  <NeonTeamDesc>{TEAM.iver.desc}</NeonTeamDesc>
                </NeonTeamCard>
              </NeonTeamGrid>
            </NeonTerminalBody>
          </NeonTerminal>
          
          <CTABox>
            <CTAButton 
              onClick={scrollToContact}
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#00ff88', background: 'transparent', border: '1px solid #00ff88', boxShadow: '0 0 15px rgba(0,255,136,0.3)' }}
            >
              contact.send()
            </CTAButton>
          </CTABox>
        </NeonContainer>
      </NeonSection>
    );
  }

  // ==========================================
  // VIDEO - Timeline Akkordeon (Default)
  // ==========================================
  return (
    <VideoSection id="about">
      <VideoContainer>
        <VideoHeader>
          <VideoImage src={SARAH_IVER_IMAGE} alt="Sarah und Iver – Unsere Geschichte als Gründerpaar" loading="lazy" />
          <VideoHeaderContent>
            <VideoEyebrow>Über uns</VideoEyebrow>
            <VideoTitle>Sarah & Iver</VideoTitle>
            <VideoSubtitle>Warum es S&I. überhaupt gibt</VideoSubtitle>
          </VideoHeaderContent>
        </VideoHeader>
        
        <VideoTimeline>
          {STORY_SECTIONS.map((section, i) => (
            <VideoTimelineItem key={section.id} $open={openSection === i}>
              <VideoTimelineHeader onClick={() => setOpenSection(openSection === i ? -1 : i)}>
                <VideoTimelineTitle>{section.title}</VideoTimelineTitle>
                <VideoTimelineArrow $open={openSection === i}>→</VideoTimelineArrow>
              </VideoTimelineHeader>
              <VideoTimelineContent $open={openSection === i}>
                <VideoTimelineText>{section.content}</VideoTimelineText>
              </VideoTimelineContent>
            </VideoTimelineItem>
          ))}
        </VideoTimeline>
        
        <VideoTeamSection>
          <VideoTeamCard>
            <VideoTeamEmoji>{TEAM.sarah.emoji}</VideoTeamEmoji>
            <VideoTeamName>{TEAM.sarah.name}</VideoTeamName>
            <VideoTeamRole>{TEAM.sarah.role}</VideoTeamRole>
            <VideoTeamDesc>{TEAM.sarah.desc}</VideoTeamDesc>
          </VideoTeamCard>
          <VideoTeamCard>
            <VideoTeamEmoji>{TEAM.iver.emoji}</VideoTeamEmoji>
            <VideoTeamName>{TEAM.iver.name}</VideoTeamName>
            <VideoTeamRole>{TEAM.iver.role}</VideoTeamRole>
            <VideoTeamDesc>{TEAM.iver.desc}</VideoTeamDesc>
          </VideoTeamCard>
        </VideoTeamSection>
        
        <CTABox>
          <CTAHeadline style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>
            {CTA.headline}
          </CTAHeadline>
          <CTAButton 
            onClick={scrollToContact}
            style={{ fontFamily: "'Manrope', sans-serif", color: '#FFFFFF', background: 'transparent', border: '1px solid #6B8CAE' }}
          >
            {CTA.button}
          </CTAButton>
        </CTABox>
      </VideoContainer>
    </VideoSection>
  );
};

export default AboutSection;
