// src/components/marketing/ComponentsShowcase.js
// "18 Komponenten" - 6 verschiedene Layout-Logiken:
// Editorial: Clean Liste mit Inklusive-Tags (wie im Mockup)
// Botanical: Kreisförmiges/Organisches Layout mit Hover-Expand
// Contemporary: Draggable/Scrollbare Chips mit Filter-Tabs
// Luxe: Elegantes 2-Spalten Layout mit Nummer-Badges
// Neon: Matrix/Grid mit Pulse-Animationen
// Video: Karussell mit großen Karten
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// COMPONENT DATA
// ============================================
const COMPONENTS = [
  { id: 'hero', icon: '🏠', name: 'Hero', desc: 'Der erste Moment, wenn eure Gäste die Seite öffnen', included: true },
  { id: 'lovestory', icon: '💕', name: 'Love Story', desc: 'Wie aus Fremden ein Wir wurde', included: true },
  { id: 'rsvp', icon: '💌', name: 'RSVP', desc: 'Zu- und Absagen ohne Gruppenchat-Drama', included: true },
  { id: 'countdown', icon: '🔔', name: 'Countdown', desc: 'Die Vorfreude wächst mit jedem Tag', included: true },
  { id: 'ablauf', icon: '📅', name: 'Ablauf', desc: 'Damit alle wissen, wann sie wo sein müssen', included: false },
  { id: 'timeline', icon: '⏰', name: 'Timeline', desc: 'Euer Tag — Stunde für Stunde', included: false },
  { id: 'location', icon: '📍', name: 'Location', desc: 'Mit Karte, damit sich niemand verfährt', included: false },
  { id: 'anfahrt', icon: '🚗', name: 'Anfahrt', desc: 'Navigation und Parktipps inklusive', included: false },
  { id: 'hotels', icon: '🏨', name: 'Hotels', desc: 'Die besten Betten in der Nähe', included: false },
  { id: 'dresscode', icon: '👗', name: 'Dresscode', desc: 'Damit alle wissen, wie schick es wird', included: false },
  { id: 'wunschliste', icon: '🎁', name: 'Wunschliste', desc: 'Wünsche, die von Herzen kommen', included: false },
  { id: 'galerie', icon: '📸', name: 'Galerie', desc: 'Bilder, die Gänsehaut machen', included: false },
  { id: 'guestphotos', icon: '🤳', name: 'Gäste-Fotos', desc: 'Wenn eure Gäste die Fotografen werden', included: false },
  { id: 'faq', icon: '❓', name: 'FAQ', desc: 'Damit keiner zweimal fragen muss', included: false },
  { id: 'music', icon: '🎵', name: 'Musikwünsche', desc: 'Die Playlist, die alle zum Tanzen bringt', included: false },
  { id: 'trauzeugen', icon: '👥', name: 'Trauzeugen', desc: 'Die wichtigsten Menschen — vorgestellt', included: false },
  { id: 'footer', icon: '💍', name: 'Footer', desc: 'Der schöne Abschluss', included: false },
  { id: 'impressum', icon: '📄', name: 'Impressum', desc: 'Muss sein — sieht aber gut aus', included: false },
];

const INCLUDED_COUNT = COMPONENTS.filter(c => c.included).length;

// ============================================
// ANIMATIONS
// ============================================
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(0,255,255,0.3); }
  50% { box-shadow: 0 0 20px rgba(0,255,255,0.6); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

// ============================================
// EDITORIAL - Magazin Grid Layout
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
  margin-bottom: 4rem;
`;

const EditorialStar = styled.div`
  font-size: 1.5rem;
  color: #C41E3A;
  margin-bottom: 1rem;
`;

const EditorialEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #C41E3A;
  margin-bottom: 1rem;
`;

const EditorialTitle = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
  margin-bottom: 1rem;
`;

const EditorialSubtitle = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1rem;
  font-style: italic;
  color: #666;
  line-height: 1.6;
`;

const EditorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  
  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding-bottom: 1rem;
    margin: 0 -1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const EditorialCard = styled.div`
  background: ${p => p.$included ? '#fff' : '#F5F5F5'};
  border: ${p => p.$included ? '2px solid #C41E3A' : '1px solid #E5E5E5'};
  padding: 1.5rem 1rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  
  @media (max-width: 600px) {
    flex: 0 0 140px;
    scroll-snap-align: start;
  }
  
  ${p => p.$included && css`
    &::after {
      content: 'INKLUSIVE';
      position: absolute;
      top: 8px;
      right: 8px;
      font-family: 'Oswald', sans-serif;
      font-size: 0.5rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      color: #C41E3A;
    }
  `}
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
`;

const EditorialIcon = styled.span`
  font-size: 2rem;
  display: block;
  margin-bottom: 0.75rem;
`;

const EditorialItemName = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #0A0A0A;
  margin-bottom: 0.25rem;
`;

const EditorialItemDesc = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 0.8rem;
  font-style: italic;
  color: #888;
`;

// ============================================
// BOTANICAL - Organisches Grid mit Hover
// ============================================
const BotanicalSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: transparent;
  position: relative;
  z-index: 10;
`;

const BotanicalContainer = styled.div`
  max-width: 1000px;
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
  margin-bottom: 1rem;
`;

const BotanicalSubtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
`;

const BotanicalGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: 600px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    scroll-snap-type: x mandatory;
    padding-bottom: 1rem;
    margin: 0 -1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const BotanicalChip = styled.div`
  background: ${p => p.$included ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${p => p.$included ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'};
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.4s ease;
  animation: ${float} ${p => 4 + (p.$i % 3)}s ease-in-out infinite;
  animation-delay: ${p => p.$i * 0.1}s;
  
  @media (max-width: 600px) {
    flex-shrink: 0;
    scroll-snap-align: start;
    animation: none;
  }
  
  &:hover {
    background: rgba(255,255,255,0.15);
    transform: scale(1.05);
    border-color: rgba(255,255,255,0.3);
  }
`;

const BotanicalChipIcon = styled.span`
  font-size: 1.2rem;
`;

const BotanicalChipName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255,255,255,0.9);
`;

const BotanicalIncluded = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
`;

// ============================================
// CONTEMPORARY - Filter Tabs + Chips
// ============================================
const ContemporarySection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #FAFAFA;
`;

const ContemporaryContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const ContemporaryHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
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

const ContemporaryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const ContemporaryTab = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.75rem 1.5rem;
  border: 3px solid #0D0D0D;
  background: ${p => p.$active ? '#FFE66D' : '#fff'};
  box-shadow: ${p => p.$active ? '4px 4px 0 #0D0D0D' : 'none'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #FFE66D;
  }
`;

const ContemporaryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: 600px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    scroll-snap-type: x mandatory;
    padding-bottom: 1rem;
    margin: 0 -1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const CHIP_COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#9B5DE5'];

const ContemporaryChip = styled.div`
  background: #fff;
  border: 3px solid #0D0D0D;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 4px 4px 0 ${p => CHIP_COLORS[p.$i % 4]};
  transition: all 0.2s ease;
  cursor: pointer;
  
  @media (max-width: 600px) {
    flex-shrink: 0;
    scroll-snap-align: start;
  }
  
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 ${p => CHIP_COLORS[p.$i % 4]};
  }
`;

const ContemporaryChipIcon = styled.span`
  font-size: 1.5rem;
`;

const ContemporaryChipContent = styled.div``;

const ContemporaryChipName = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
`;

const ContemporaryChipDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: #666;
`;

const ContemporaryIncluded = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  color: #fff;
  background: #FF6B6B;
  padding: 0.3rem 0.6rem;
  border: 2px solid #0D0D0D;
`;

// ============================================
// LUXE - 2-Spalten mit Nummern
// ============================================
const LuxeSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #0A0A0A;
`;

const LuxeContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const LuxeHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
`;

const LuxeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border: 1px solid rgba(201, 169, 98, 0.2);
  
  @media (max-width: 700px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    border: none;
    gap: 1rem;
    margin: 0 -1.5rem;
    padding: 0 1.5rem 1rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const LuxeItem = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(201, 169, 98, 0.1);
  border-right: 1px solid rgba(201, 169, 98, 0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.4s ease;
  
  &:nth-child(2n) { border-right: none; }
  
  @media (max-width: 700px) {
    flex: 0 0 200px;
    scroll-snap-align: start;
    border: 1px solid rgba(201, 169, 98, 0.2);
    flex-direction: column;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  
  &:hover {
    background: rgba(201, 169, 98, 0.05);
  }
`;

const LuxeNum = styled.span`
  font-family: 'Cormorant', serif;
  font-size: 1.5rem;
  font-weight: 300;
  font-style: italic;
  color: rgba(201, 169, 98, 0.3);
  min-width: 30px;
`;

const LuxeIcon = styled.span`
  font-size: 1.3rem;
`;

const LuxeItemContent = styled.div`
  flex: 1;
`;

const LuxeItemName = styled.h3`
  font-family: 'Cormorant', serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: #F8F6F3;
  margin-bottom: 0.25rem;
`;

const LuxeItemDesc = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 300;
  color: rgba(248,246,243,0.4);
`;

const LuxeIncluded = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 0.55rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #C9A962;
`;

// ============================================
// NEON - Matrix Grid
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
      radial-gradient(ellipse at 20% 50%, rgba(0,255,255,0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 50%, rgba(255,0,255,0.03) 0%, transparent 50%);
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

const NeonSubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  margin-top: 0.5rem;
`;

const NeonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 0.75rem;
    margin: 0 -1.5rem;
    padding: 0 1.5rem 1rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const NeonCell = styled.div`
  aspect-ratio: 1;
  background: rgba(255,255,255,0.02);
  border: 1px solid ${p => p.$included ? 'rgba(0,255,255,0.4)' : 'rgba(255,255,255,0.1)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 600px) {
    flex: 0 0 100px;
    scroll-snap-align: start;
    aspect-ratio: auto;
    height: 100px;
  }
  
  ${p => p.$included && css`
    animation: ${glow} 3s ease-in-out infinite;
    animation-delay: ${p.$i * 0.2}s;
  `}
  
  &:hover {
    background: rgba(0,255,255,0.1);
    border-color: #00ffff;
    transform: scale(1.05);
    z-index: 2;
  }
`;

const NeonCellIcon = styled.span`
  font-size: 1.5rem;
`;

const NeonCellName = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${p => p.$included ? '#00ffff' : 'rgba(255,255,255,0.5)'};
  text-align: center;
  text-shadow: ${p => p.$included ? '0 0 5px rgba(0,255,255,0.5)' : 'none'};
`;

// ============================================
// VIDEO - Karussell
// ============================================
const VideoSection = styled.section`
  padding: clamp(5rem, 12vh, 10rem) clamp(1.5rem, 5vw, 4rem);
  background: #0A0A0A;
`;

const VideoContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const VideoHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const VideoSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #888;
  margin-top: 0.5rem;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  
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

const VideoCard = styled.div`
  background: ${p => p.$included ? 'rgba(107, 140, 174, 0.1)' : 'rgba(255,255,255,0.02)'};
  border: 1px solid ${p => p.$included ? '#6B8CAE' : 'rgba(255,255,255,0.1)'};
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  
  @media (max-width: 600px) {
    flex: 0 0 150px;
    scroll-snap-align: start;
    padding: 1rem;
  }
  
  &:hover {
    border-color: #6B8CAE;
    transform: translateY(-3px);
  }
`;

const VideoCardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const VideoCardName = styled.h3`
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.25rem;
`;

const VideoCardDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #888;
`;

const VideoIncluded = styled.span`
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  color: #6B8CAE;
  margin-top: 0.75rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #6B8CAE;
`;

// ============================================
// MAIN COMPONENT
// ============================================
const ComponentsShowcase = () => {
  const { currentTheme } = useTheme();
  const [filter, setFilter] = useState('all');

  const filteredComponents = filter === 'all' 
    ? COMPONENTS 
    : filter === 'included' 
      ? COMPONENTS.filter(c => c.included)
      : COMPONENTS.filter(c => !c.included);

  // ==========================================
  // EDITORIAL - Magazin Grid
  // ==========================================
  if (currentTheme === 'editorial' || currentTheme === 'classic') {
    return (
      <EditorialSection id="components">
        <EditorialContainer>
          <EditorialHeader>
            <EditorialStar>✦</EditorialStar>
            <EditorialEyebrow>18 Komponenten</EditorialEyebrow>
            <EditorialTitle>Alles was ihr braucht</EditorialTitle>
            <EditorialSubtitle>
              Wählt aus 18 liebevoll gestalteten Komponenten – {INCLUDED_COUNT} davon immer inklusive.
            </EditorialSubtitle>
          </EditorialHeader>
          
          <EditorialGrid>
            {COMPONENTS.map((comp, i) => (
              <EditorialCard key={comp.id} $included={comp.included}>
                <EditorialIcon>{comp.icon}</EditorialIcon>
                <EditorialItemName>{comp.name}</EditorialItemName>
                <EditorialItemDesc>{comp.desc}</EditorialItemDesc>
              </EditorialCard>
            ))}
          </EditorialGrid>
        </EditorialContainer>
      </EditorialSection>
    );
  }

  // ==========================================
  // BOTANICAL - Organische Chips
  // ==========================================
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="components">
        <BotanicalContainer>
          <BotanicalHeader>
            <BotanicalEyebrow>18 Komponenten</BotanicalEyebrow>
            <BotanicalTitle>Alles was ihr braucht</BotanicalTitle>
            <BotanicalSubtitle>{INCLUDED_COUNT} davon immer inklusive</BotanicalSubtitle>
          </BotanicalHeader>
          
          <BotanicalGrid>
            {COMPONENTS.map((comp, i) => (
              <BotanicalChip key={comp.id} $i={i} $included={comp.included}>
                <BotanicalChipIcon>{comp.icon}</BotanicalChipIcon>
                <BotanicalChipName>{comp.name}</BotanicalChipName>
                {comp.included && <BotanicalIncluded>✓</BotanicalIncluded>}
              </BotanicalChip>
            ))}
          </BotanicalGrid>
        </BotanicalContainer>
      </BotanicalSection>
    );
  }

  // ==========================================
  // CONTEMPORARY - Filter + Chips
  // ==========================================
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="components">
        <ContemporaryContainer>
          <ContemporaryHeader>
            <ContemporaryEyebrow>🧩 18 Komponenten</ContemporaryEyebrow>
            <ContemporaryTitle>Pick & Mix</ContemporaryTitle>
          </ContemporaryHeader>
          
          <ContemporaryTabs>
            <ContemporaryTab $active={filter === 'all'} onClick={() => setFilter('all')}>
              Alle (18)
            </ContemporaryTab>
            <ContemporaryTab $active={filter === 'included'} onClick={() => setFilter('included')}>
              Inklusive ({INCLUDED_COUNT})
            </ContemporaryTab>
            <ContemporaryTab $active={filter === 'optional'} onClick={() => setFilter('optional')}>
              Optional ({18 - INCLUDED_COUNT})
            </ContemporaryTab>
          </ContemporaryTabs>
          
          <ContemporaryGrid>
            {filteredComponents.map((comp, i) => (
              <ContemporaryChip key={comp.id} $i={i}>
                <ContemporaryChipIcon>{comp.icon}</ContemporaryChipIcon>
                <ContemporaryChipContent>
                  <ContemporaryChipName>{comp.name}</ContemporaryChipName>
                  <ContemporaryChipDesc>{comp.desc}</ContemporaryChipDesc>
                </ContemporaryChipContent>
                {comp.included && <ContemporaryIncluded>✓</ContemporaryIncluded>}
              </ContemporaryChip>
            ))}
          </ContemporaryGrid>
        </ContemporaryContainer>
      </ContemporarySection>
    );
  }

  // ==========================================
  // LUXE - 2-Spalten Grid
  // ==========================================
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="components">
        <LuxeContainer>
          <LuxeHeader>
            <LuxeEyebrow>18 Komponenten</LuxeEyebrow>
            <LuxeTitle>Alles was ihr braucht</LuxeTitle>
          </LuxeHeader>
          
          <LuxeGrid>
            {COMPONENTS.map((comp, i) => (
              <LuxeItem key={comp.id}>
                <LuxeNum>{String(i + 1).padStart(2, '0')}</LuxeNum>
                <LuxeIcon>{comp.icon}</LuxeIcon>
                <LuxeItemContent>
                  <LuxeItemName>{comp.name}</LuxeItemName>
                  <LuxeItemDesc>{comp.desc}</LuxeItemDesc>
                </LuxeItemContent>
                {comp.included && <LuxeIncluded>Inklusive</LuxeIncluded>}
              </LuxeItem>
            ))}
          </LuxeGrid>
        </LuxeContainer>
      </LuxeSection>
    );
  }

  // ==========================================
  // NEON - Matrix Grid
  // ==========================================
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="components">
        <NeonContainer>
          <NeonHeader>
            <NeonEyebrow>// components.load(18)</NeonEyebrow>
            <NeonTitle>Module Library</NeonTitle>
            <NeonSubtitle>{INCLUDED_COUNT} modules included by default</NeonSubtitle>
          </NeonHeader>
          
          <NeonGrid>
            {COMPONENTS.map((comp, i) => (
              <NeonCell key={comp.id} $i={i} $included={comp.included}>
                <NeonCellIcon>{comp.icon}</NeonCellIcon>
                <NeonCellName $included={comp.included}>{comp.name}</NeonCellName>
              </NeonCell>
            ))}
          </NeonGrid>
        </NeonContainer>
      </NeonSection>
    );
  }

  // ==========================================
  // VIDEO - Karussell (Default)
  // ==========================================
  return (
    <VideoSection id="components">
      <VideoContainer>
        <VideoHeader>
          <VideoEyebrow>18 Komponenten</VideoEyebrow>
          <VideoTitle>Alles was ihr braucht</VideoTitle>
          <VideoSubtitle>{INCLUDED_COUNT} davon immer inklusive</VideoSubtitle>
        </VideoHeader>
        
        <VideoGrid>
          {COMPONENTS.map((comp, i) => (
            <VideoCard key={comp.id} $included={comp.included}>
              <VideoCardIcon>{comp.icon}</VideoCardIcon>
              <VideoCardName>{comp.name}</VideoCardName>
              <VideoCardDesc>{comp.desc}</VideoCardDesc>
              {comp.included && <VideoIncluded>Inklusive</VideoIncluded>}
            </VideoCard>
          ))}
        </VideoGrid>
      </VideoContainer>
    </VideoSection>
  );
};

export default ComponentsShowcase;
