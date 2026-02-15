// src/components/marketing/ExamplesShowcase.js
import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled, { css, keyframes } from "styled-components"
import { useTheme } from "../../context/ThemeContext"

// ============================================
// KEYFRAME ANIMATIONS
// ============================================
const goldShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const botanicalFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(3deg); }
`

const neonFlicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.7; }
  94% { opacity: 1; }
  96% { opacity: 0.8; }
`

const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(0,255,255,0.3); }
  50% { box-shadow: 0 0 20px rgba(0,255,255,0.5), 0 0 30px rgba(255,0,255,0.3); }
`

const luxeReveal = keyframes`
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
`

// ============================================
// THEME DATA - Die 6 Demo-Themes
// ============================================
// Demo URLs zeigen auf echte Kunden-Seiten (werden später hinzugefügt)
// Struktur: siwedding.de/[slug] für jedes Theme
const DEMO_BASE_URL = 'https://siwedding.de';

const themeExamples = [
  {
    id: "editorial",
    name: "Editorial",
    tagline: "Magazine Bold — S/W mit Rot-Akzent",
    description: "Oswald Headlines, Source Serif Accents, S/W Bilder mit Hover-Farbe.",
    fonts: "Oswald + Source Serif 4 + Inter",
    colors: ["#FAFAFA", "#0A0A0A", "#C41E3A"],
    demoUrl: null, // TODO: Wird später mit echtem Kunden-Slug ersetzt
    externalUrl: null,
    comingSoon: true,
  },
  {
    id: "botanical",
    name: "Botanical",
    tagline: "Dark Glassmorphism — Tropisch elegant",
    description: "Apple-style Glass-Effekte auf dunklem Hintergrund.",
    fonts: "Cormorant Garamond + Montserrat",
    colors: ["#040604", "rgba(255,255,255,0.95)", "rgba(45,90,60,0.8)"],
    demoUrl: null,
    externalUrl: null,
    comingSoon: true,
  },
  {
    id: "contemporary",
    name: "Contemporary",
    tagline: "Neobrutalism — Playful & Bold",
    description: "Harte Schatten, bunte Palette, Space Grotesk überall.",
    fonts: "Space Grotesk",
    colors: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#9B5DE5"],
    demoUrl: null,
    externalUrl: null,
    comingSoon: true,
  },
  {
    id: "luxe",
    name: "Luxe",
    tagline: "Cinematic — Elegant & Timeless",
    description: "Langsame, cinematische Animationen mit Gold-Akzenten.",
    fonts: "Cormorant (italic) + Outfit",
    colors: ["#0A0A0A", "#F8F6F3", "#C9A962"],
    demoUrl: null,
    externalUrl: null,
    comingSoon: true,
  },
  {
    id: "neon",
    name: "Neon",
    tagline: "Cyberpunk — Glow & Glitch",
    description: "Neon-Glow, Scanlines, perspektivisches Grid.",
    fonts: "Space Grotesk",
    colors: ["#0a0a0f", "#00ffff", "#ff00ff", "#00ff88"],
    demoUrl: null,
    externalUrl: null,
    comingSoon: true,
  },
  {
    id: "video",
    name: "Video",
    tagline: "Cinematic S/W — Horizontal Scroll",
    description: "Horizontales Layout mit Dusty Blue Akzent und Grayscale-Bildern.",
    fonts: "Manrope + Cormorant Garamond + Inter",
    colors: ["#0A0A0A", "#FFFFFF", "#6B8CAE"],
    demoUrl: null,
    externalUrl: null,
    comingSoon: true,
  },
];

// ============================================
// MAIN SECTION STYLES
// ============================================
const Section = styled.section`
  padding: 140px 5%;
  position: relative;
  overflow: hidden;
  ${(p) => p.$themeId === "editorial" && css`background: #ffffff;`}
  ${(p) => p.$themeId === "classic" && css`background: #FFFFFF;`}
  ${(p) => p.$themeId === "video" && css`background: #0a0a0a;`}
  ${(p) => p.$themeId === "botanical" && css`background: #f8f6f0;`}
  ${(p) => p.$themeId === "contemporary" && css`background: #f5f5f5;`}
  ${(p) => p.$themeId === "luxe" && css`background: #faf9f7;`}
  ${(p) => p.$themeId === "neon" && css`background: #0a0a0f;`}
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`

const Header = styled.div`
  margin-bottom: 60px;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transform: translateY(${(p) => (p.$visible ? 0 : "40px")});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  ${(p) => p.$themeId === "editorial" && css`text-align: left; max-width: 600px;`}
  ${(p) => p.$themeId === "classic" && css`text-align: left; max-width: 600px;`}
  ${(p) => p.$themeId === "video" && css`text-align: center;`}
  ${(p) => p.$themeId === "botanical" && css`text-align: center;`}
  ${(p) => p.$themeId === "contemporary" && css`text-align: left;`}
  ${(p) => p.$themeId === "luxe" && css`text-align: center;`}
  ${(p) => p.$themeId === "neon" && css`text-align: center;`}
`

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 1rem;
  ${(p) => p.$themeId === "editorial" && css`
    font-family: "Inter", sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #999;
  `}
  ${(p) => p.$themeId === "classic" && css`
    font-family: "Josefin Sans", sans-serif;
    font-size: 0.7rem;
    font-weight: 300;
    letter-spacing: 0.2em;
    color: #999;
  `}
  ${(p) => p.$themeId === "video" && css`
    font-family: "Montserrat", sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #d4af37;
  `}
  ${(p) => p.$themeId === "botanical" && css`
    font-family: "Lato", sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #8b9d83;
  `}
  ${(p) => p.$themeId === "contemporary" && css`
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #ff6b6b;
  `}
  ${(p) => p.$themeId === "luxe" && css`
    font-family: "Montserrat", sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: #b4a08c;
  `}
  ${(p) => p.$themeId === "neon" && css`
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ff00ff;
  `}
`

const Title = styled.h2`
  margin: 0 0 1rem 0;
  ${(p) => p.$themeId === "editorial" && css`
    font-family: "Instrument Serif", Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 400;
    font-style: italic;
    color: #1a1a1a;
  `}
  ${(p) => p.$themeId === "classic" && css`
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    color: #1a1a1a;
  `}
  ${(p) => p.$themeId === "video" && css`
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    color: #ffffff;
  `}
  ${(p) => p.$themeId === "botanical" && css`
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 400;
    color: #2d3b2d;
  `}
  ${(p) => p.$themeId === "contemporary" && css`
    font-family: "Space Grotesk", sans-serif;
    font-size: clamp(3rem, 7vw, 5rem);
    font-weight: 700;
    color: #0d0d0d;
    text-transform: uppercase;
    line-height: 0.9;
  `}
  ${(p) => p.$themeId === "luxe" && css`
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 300;
    color: #2a2a2a;
  `}
  ${(p) => p.$themeId === "neon" && css`
    font-family: "Space Grotesk", sans-serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    color: #00ffff;
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  `}
`

const Subtitle = styled.p`
  line-height: 1.7;
  ${(p) => p.$themeId === "editorial" && css`font-family: "Inter", sans-serif; font-size: 1rem; color: #666; margin: 0;`}
  ${(p) => p.$themeId === "classic" && css`font-family: "Josefin Sans", sans-serif; font-size: 1rem; color: #555; margin: 0;`}
  ${(p) => p.$themeId === "video" && css`font-family: "Montserrat", sans-serif; font-size: 1rem; color: rgba(255, 255, 255, 0.5); max-width: 500px; margin: 0 auto;`}
  ${(p) => p.$themeId === "botanical" && css`font-family: "Lato", sans-serif; font-size: 1.05rem; color: #5a6b5a; max-width: 500px; margin: 0 auto;`}
  ${(p) => p.$themeId === "contemporary" && css`font-family: "Space Grotesk", sans-serif; font-size: 1rem; color: #666; margin: 0;`}
  ${(p) => p.$themeId === "luxe" && css`font-family: "Montserrat", sans-serif; font-size: 0.9rem; color: #888; max-width: 500px; margin: 0 auto;`}
  ${(p) => p.$themeId === "neon" && css`font-family: "Space Grotesk", sans-serif; font-size: 1rem; color: rgba(255, 255, 255, 0.6); max-width: 500px; margin: 0 auto;`}
`

// ============================================
// COLOR SWATCH COMPONENT
// ============================================
const ColorSwatches = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 15px;
`

const Swatch = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${p => p.$color};
  border: 1px solid rgba(0,0,0,0.1);
  ${p => (p.$color === '#FFFFFF' || p.$color === '#FAF8F5' || p.$color === '#F8F6F0' || p.$color === '#FAF9F7') && css`border: 1px solid #e0e0e0;`}
  ${p => p.$color === '#0A0A0F' && css`border: 1px solid rgba(255,255,255,0.2);`}
`

// ============================================
// EDITORIAL THEME LAYOUT
// ============================================
const EditorialGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: #e0e0e0;
  border: 1px solid #e0e0e0;

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
`

const EditorialCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 200px;
  align-items: center;
  padding: 35px 40px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #fafafa;
    padding-left: 50px;
  }
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  @media (max-width: 768px) {
    flex: 0 0 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
  }
`

const EditorialName = styled.div`
  font-family: "Instrument Serif", Georgia, serif;
  font-size: 1.8rem;
  font-style: italic;
  color: #1a1a1a;
  display: flex;
  align-items: center;
`

const EditorialTagline = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  color: #666;
`

const EditorialCTA = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1a1a1a;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  
  &::after {
    content: '→';
    transition: transform 0.3s ease;
  }
  
  ${EditorialCard}:hover &::after {
    transform: translateX(5px);
  }
`

// ============================================
// GOLD THEME LAYOUT
// ============================================
const GoldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  
  @media (max-width: 1000px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }

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
`

const GoldCard = styled.div`
  background: rgba(212, 175, 55, 0.03);
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 45px 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.05), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    border-color: rgba(212, 175, 55, 0.5);
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.15);
    &::before { left: 100%; }
  }

  @media (max-width: 768px) {
    flex: 0 0 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
  }
`

const GoldInitials = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 2.5rem;
  font-weight: 300;
  background: linear-gradient(135deg, #d4af37, #f4d03f, #d4af37);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${goldShimmer} 4s linear infinite;
  margin-bottom: 20px;
  letter-spacing: 0.1em;
`

const GoldName = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.4rem;
  color: #ffffff;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const GoldTagline = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  margin-bottom: 20px;
`

const GoldCTA = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #d4af37;
  padding-top: 20px;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
`

// ============================================
// BOTANICAL THEME LAYOUT
// ============================================
const BotanicalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 1000px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }

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
`

const BotanicalCard = styled.div`
  background: #ffffff;
  border-radius: 30px;
  padding: 45px 35px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 4px 20px rgba(45, 59, 45, 0.08);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(45, 59, 45, 0.15);
  }

  @media (max-width: 768px) {
    flex: 0 0 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
  }
`

const BotanicalEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  animation: ${botanicalFloat} 4s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay || "0s"};
`

const BotanicalName = styled.div`
  font-family: "Playfair Display", Georgia, serif;
  font-size: 1.5rem;
  color: #2d3b2d;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const BotanicalTagline = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 0.9rem;
  color: #8b9d83;
  margin-bottom: 20px;
`

const BotanicalCTA = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #2d3b2d;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 25px;
  background: #f5f1eb;
  border-radius: 50px;
  transition: all 0.3s ease;
  
  ${BotanicalCard}:hover & {
    background: #2d3b2d;
    color: #ffffff;
  }
`

// ============================================
// CONTEMPORARY THEME LAYOUT
// ============================================
const ContemporaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }

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
`

const ContemporaryCard = styled.div`
  background: linear-gradient(
    135deg,
    ${(p) => p.$index === 0 ? "#FF6B6B" : p.$index === 1 ? "#4ECDC4" : p.$index === 2 ? "#FFE66D" : p.$index === 3 ? "#95E1D3" : p.$index === 4 ? "#AA96DA" : "#B8976A"} 0%,
    ${(p) => p.$index === 0 ? "#FF8E8E" : p.$index === 1 ? "#7DE3D4" : p.$index === 2 ? "#FFF0A5" : p.$index === 3 ? "#B8F0E5" : p.$index === 4 ? "#C4B6E5" : "#D4AF37"} 100%
  );
  padding: 50px 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 4px solid #0d0d0d;
  box-shadow: 6px 6px 0 #0d0d0d;
  
  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 10px 10px 0 #0d0d0d;
  }

  @media (max-width: 768px) {
    flex: 0 0 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
  }
`

const ContemporaryNumber = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1;
  margin-bottom: 15px;
`

const ContemporaryName = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const ContemporaryTagline = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 25px;
`

const ContemporaryCTA = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0d0d0d;
  background: #ffffff;
  padding: 12px 25px;
  display: inline-block;
`

// ============================================
// LUXE THEME LAYOUT
// ============================================
const LuxeGrid = styled.div`
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
`

const LuxeCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 45px 0;
  border-bottom: 1px solid rgba(180, 160, 140, 0.2);
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:first-child { border-top: 1px solid rgba(180, 160, 140, 0.2); }
  &:hover { padding-left: 30px; }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  @media (max-width: 768px) {
    flex: 0 0 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
  }
`

const LuxeName = styled.div`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 2rem;
  font-weight: 300;
  color: #2a2a2a;
  animation: ${luxeReveal} 1s ease forwards;
  animation-delay: ${(p) => p.$delay || "0s"};
  display: flex;
  align-items: center;
  gap: 12px;
`

const LuxeCenter = styled.div`
  text-align: center;
  flex: 1;
  padding: 0 40px;
  @media (max-width: 768px) { text-align: left; padding: 0; }
`

const LuxeTagline = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #b4a08c;
`

const LuxeRight = styled.div`
  text-align: right;
  @media (max-width: 768px) { text-align: left; }
`

const LuxeCTA = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #2a2a2a;
  padding: 12px 25px;
  border: 1px solid #b4a08c;
  transition: all 0.3s ease;
  
  ${LuxeCard}:hover & {
    background: #2a2a2a;
    color: #ffffff;
    border-color: #2a2a2a;
  }
`

// ============================================
// NEON THEME LAYOUT
// ============================================
const NeonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 1000px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }

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
`

const NeonCard = styled.div`
  background: rgba(0, 255, 255, 0.02);
  border: 1px solid rgba(0, 255, 255, 0.2);
  padding: 40px 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #00ffff, #ff00ff, #00ffff);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    border-color: rgba(0, 255, 255, 0.5);
    animation: ${neonPulse} 2s ease-in-out infinite;
    &::before { transform: scaleX(1); }
  }

  @media (max-width: 768px) {
    flex: 0 0 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
  }
`

const NeonIndex = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.7rem;
  color: #ff00ff;
  margin-bottom: 15px;
`

const NeonName = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  animation: ${neonFlicker} 4s ease-in-out infinite;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const NeonTagline = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
`

const NeonCTA = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.65rem;
  color: #ff00ff;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 0, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before { content: '>'; }
`

// ============================================
// MAIN COMPONENT
// ============================================
function ExamplesShowcase() {
  const { currentTheme, switchTheme } = useTheme()
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleCardClick = (theme) => {
    // Wenn externe URL vorhanden, öffne in neuem Tab
    if (theme.externalUrl) {
      window.open(theme.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Wenn interne Demo-URL vorhanden
    if (theme.demoUrl && !theme.comingSoon) {
      window.open(theme.demoUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Fallback: Wechsle zum Theme für Vorschau
    if (switchTheme && theme.id) {
      switchTheme(theme.id);
    }
  }

  const themeEmojis = {
    editorial: "✒️",
    contemporary: "🎨",
    botanical: "🌿",
    luxe: "✨",
    neon: "⚡",
    video: "🎬"
  }

  const renderCards = () => {
    switch (currentTheme) {
      case "editorial":
        return (
          <EditorialGrid>
            {themeExamples.map((theme) => (
              <EditorialCard key={theme.id} onClick={() => handleCardClick(theme)}>
                <EditorialName>
                  {theme.name}
                </EditorialName>
                <EditorialTagline>{theme.tagline}</EditorialTagline>
                <EditorialCTA>Demo ansehen</EditorialCTA>
              </EditorialCard>
            ))}
          </EditorialGrid>
        )

      case "video":
        return (
          <GoldGrid>
            {themeExamples.map((theme) => (
              <GoldCard key={theme.id} onClick={() => handleCardClick(theme)}>
                <GoldInitials>{theme.name.substring(0, 2).toUpperCase()}</GoldInitials>
                <GoldName>
                  {theme.name}
                </GoldName>
                <GoldTagline>{theme.tagline}</GoldTagline>
                <ColorSwatches style={{ justifyContent: 'center' }}>
                  {theme.colors.map((color, i) => (<Swatch key={i} $color={color} />))}
                </ColorSwatches>
                <GoldCTA>Entdecken →</GoldCTA>
              </GoldCard>
            ))}
          </GoldGrid>
        )

      case "botanical":
        return (
          <BotanicalGrid>
            {themeExamples.map((theme, i) => (
              <BotanicalCard key={theme.id} onClick={() => handleCardClick(theme)}>
                <BotanicalEmoji $delay={`${i * 0.2}s`}>{themeEmojis[theme.id]}</BotanicalEmoji>
                <BotanicalName>
                  {theme.name}
                </BotanicalName>
                <BotanicalTagline>{theme.tagline}</BotanicalTagline>
                <BotanicalCTA>Ansehen</BotanicalCTA>
              </BotanicalCard>
            ))}
          </BotanicalGrid>
        )

      case "contemporary":
        return (
          <ContemporaryGrid>
            {themeExamples.map((theme, i) => (
              <ContemporaryCard key={theme.id} $index={i} onClick={() => handleCardClick(theme)}>
                <ContemporaryNumber>{String(i + 1).padStart(2, "0")}</ContemporaryNumber>
                <ContemporaryName>
                  {theme.name}
                </ContemporaryName>
                <ContemporaryTagline>{theme.tagline}</ContemporaryTagline>
                <ContemporaryCTA>View Demo →</ContemporaryCTA>
              </ContemporaryCard>
            ))}
          </ContemporaryGrid>
        )

      case "luxe":
        return (
          <LuxeGrid>
            {themeExamples.map((theme, i) => (
              <LuxeCard key={theme.id} onClick={() => handleCardClick(theme)}>
                <LuxeName $delay={`${i * 0.1}s`}>
                  {theme.name}
                </LuxeName>
                <LuxeCenter><LuxeTagline>{theme.tagline}</LuxeTagline></LuxeCenter>
                <LuxeRight><LuxeCTA>Ansehen</LuxeCTA></LuxeRight>
              </LuxeCard>
            ))}
          </LuxeGrid>
        )

      case "neon":
        return (
          <NeonGrid>
            {themeExamples.map((theme, i) => (
              <NeonCard key={theme.id} onClick={() => handleCardClick(theme)}>
                <NeonIndex>{"// "}{String(i + 1).padStart(2, "0")}</NeonIndex>
                <NeonName>
                  {theme.name}
                </NeonName>
                <NeonTagline>{theme.tagline}</NeonTagline>
                <NeonCTA>LAUNCH_DEMO()</NeonCTA>
              </NeonCard>
            ))}
          </NeonGrid>
        )

      default:
        return null
    }
  }

  const getTitles = () => {
    switch (currentTheme) {
      case "contemporary":
        return { eyebrow: "DESIGN SYSTEMS", title: "PICK YOUR VIBE", subtitle: "6 unique design worlds. Each one tells a different story." }
      case "neon":
        return { eyebrow: "// AVAILABLE_THEMES", title: "Design Modules", subtitle: "Select your preferred visual interface. Each module runs independently." }
      case "video":
        return { eyebrow: "Kollektion", title: "Unsere Design-Welten", subtitle: "Sechs einzigartige Ästhetiken. Welche erzählt eure Geschichte?" }
      case "botanical":
        return { eyebrow: "Inspirationen", title: "Unsere Themes", subtitle: "Entdeckt sechs verschiedene Design-Welten für eure Hochzeit." }
      case "luxe":
        return { eyebrow: "La Collection", title: "Design Ateliers", subtitle: "Six univers uniques pour votre célébration." }
      default:
        return { eyebrow: "Portfolio", title: "Unsere Design-Welten", subtitle: "Sechs einzigartige Themes – jedes eine eigene Welt." }
    }
  }

  const titles = getTitles()

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="examples">
      <Container>
        <Header $themeId={currentTheme} $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>{titles.eyebrow}</Eyebrow>
          <Title $themeId={currentTheme}>{titles.title}</Title>
          <Subtitle $themeId={currentTheme}>{titles.subtitle}</Subtitle>
        </Header>
        {renderCards()}
      </Container>
    </Section>
  )
}

export default ExamplesShowcase
