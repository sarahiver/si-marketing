// src/components/marketing/ThemeShowcase.js
import { useEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { useTheme } from "../../context/ThemeContext"

// ============================================
// KEYFRAME ANIMATIONS
// ============================================

// Editorial - Moving text lines
const editorialScroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`

// Gold - Shimmer effect
const goldShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`

const goldSparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`

// Botanical - Floating elements
const botanicalFloat1 = keyframes`
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
  25% { transform: translateY(-15px) translateX(5px) rotate(3deg); }
  50% { transform: translateY(-8px) translateX(-3px) rotate(-2deg); }
  75% { transform: translateY(-20px) translateX(8px) rotate(5deg); }
`

const botanicalFloat2 = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-18px) rotate(-5deg); }
`

// Contemporary - Gradient shift
const contemporaryGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

// Luxe - Subtle line animation
const luxeLineExpand = keyframes`
  0% { width: 0; }
  100% { width: 40px; }
`

// Neon - Flicker and glow
const neonFlicker = keyframes`
  0%, 100% { opacity: 1; text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor; }
  92% { opacity: 1; }
  93% { opacity: 0.8; text-shadow: none; }
  94% { opacity: 1; text-shadow: 0 0 5px currentColor, 0 0 10px currentColor; }
  96% { opacity: 0.9; text-shadow: 0 0 3px currentColor; }
  97% { opacity: 1; text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor; }
`

const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(0,255,255,0.3), 0 0 20px rgba(255,0,255,0.2); }
  50% { box-shadow: 0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(255,0,255,0.3); }
`

const neonScan = keyframes`
  0% { top: 0; opacity: 1; }
  100% { top: 100%; opacity: 0; }
`

// ============================================
// MAIN SECTION STYLES
// ============================================

const Section = styled.section`
  padding: 140px 5%;
  position: relative;
  overflow: hidden;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #fafafa;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      background: #0a0a0a;
      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(
          ellipse at 50% 100%,
          rgba(212, 175, 55, 0.05) 0%,
          transparent 50%
        );
      }
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: #f5f1eb;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: #faf9f7;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: #0a0a0f;
      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(
          circle at 50% 50%,
          rgba(0, 255, 255, 0.03) 0%,
          transparent 50%
        );
      }
    `}
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

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      text-align: left;
      max-width: 600px;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      text-align: center;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      text-align: center;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      text-align: left;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      text-align: center;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      text-align: center;
    `}
`

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 1rem;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #999;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.75rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #d4af37;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 0.8rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #8b9d83;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.8rem;
      font-weight: 700;
      color: #ff6b6b;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.6rem;
      letter-spacing: 0.5em;
      text-transform: uppercase;
      color: #b4a08c;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #00ffff;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    `}
`

const Title = styled.h2`
  margin: 0 0 1rem 0;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Instrument Serif", Georgia, serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 400;
      font-style: italic;
      color: #1a1a1a;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 300;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Playfair Display", Georgia, serif;
      font-size: clamp(2.2rem, 4vw, 3.5rem);
      font-weight: 400;
      color: #2d3b2d;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: clamp(3rem, 7vw, 5rem);
      font-weight: 700;
      color: #0d0d0d;
      text-transform: uppercase;
      line-height: 0.9;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 300;
      color: #2a2a2a;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      color: #ffffff;
    `}
`

const Subtitle = styled.p`
  line-height: 1.7;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 1rem;
      color: #666;
      margin: 0;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.5);
      max-width: 500px;
      margin: 0 auto;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 1.05rem;
      color: #5a6b5a;
      max-width: 500px;
      margin: 0 auto;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      color: rgba(0, 0, 0, 0.5);
      margin: 0;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.9rem;
      color: #888;
      max-width: 500px;
      margin: 0 auto;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.5);
      max-width: 500px;
      margin: 0 auto;
    `}
`

// ============================================
// CARDS GRID
// ============================================

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transform: translateY(${(p) => (p.$visible ? 0 : "30px")});
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: 0.2s;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`

const ThemeCard = styled.div`
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      background: #ffffff;
      border: 1px solid ${p.$active ? "#1A1A1A" : "#E0E0E0"};
      ${p.$active &&
      css`
        border-width: 2px;
      `}
      &:hover {
        border-color: #1a1a1a;
        transform: translateY(-8px);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
      }
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      background: rgba(212, 175, 55, 0.02);
      border: 1px solid ${p.$active ? "#D4AF37" : "rgba(212,175,55,0.15)"};
      ${p.$active &&
      css`
        box-shadow: 0 0 40px rgba(212, 175, 55, 0.25);
      `}
      &:hover {
        border-color: rgba(212, 175, 55, 0.5);
        box-shadow: 0 0 30px rgba(212, 175, 55, 0.15);
      }
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: #ffffff;
      border-radius: 24px;
      border: 2px solid ${p.$active ? "#8B9D83" : "transparent"};
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 25px 60px rgba(45, 59, 45, 0.15);
      }
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #ffffff;
      border: 4px solid ${p.$active ? "#FF6B6B" : "#0D0D0D"};
      box-shadow: ${p.$active ? "8px 8px 0 #FF6B6B" : "6px 6px 0 #0D0D0D"};
      &:hover {
        transform: translate(-4px, -4px);
        box-shadow: 10px 10px 0 ${p.$active ? "#FF6B6B" : "#0D0D0D"};
      }
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      background: #ffffff;
      border: 1px solid ${p.$active ? "#B4A08C" : "#E8E4DE"};
      &:hover {
        border-color: #b4a08c;
      }
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      background: rgba(0, 255, 255, 0.02);
      border: 1px solid ${p.$active ? "#00ffff" : "rgba(0,255,255,0.2)"};
      ${p.$active &&
      css`
        animation: ${neonPulse} 2s ease-in-out infinite;
      `}
      &:hover {
        border-color: rgba(0, 255, 255, 0.5);
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.1);
      }
    `}
`

const ActiveBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 6px 12px;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      background: #1a1a1a;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      font-family: "Montserrat", sans-serif;
      background: linear-gradient(135deg, #d4af37, #f4d03f);
      color: #0a0a0a;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      background: #8b9d83;
      color: #ffffff;
      border-radius: 20px;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      background: #ff6b6b;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      background: transparent;
      border: 1px solid #b4a08c;
      color: #b4a08c;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      background: #00ffff;
      color: #0a0a0f;
      box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
    `}
`

// ============================================
// MINI HERO PREVIEW CONTAINER
// ============================================

const PreviewContainer = styled.div`
  aspect-ratio: 16/10;
  overflow: hidden;
  position: relative;
  pointer-events: none;

  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      border-radius: 22px 22px 0 0;
    `}
`

const PreviewScaler = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 300%;
  height: 300%;
  transform: scale(0.333);
  transform-origin: top left;
`

// ============================================
// MINI HERO - EDITORIAL
// ============================================

const EditorialHero = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`

const EditorialBg = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.04;
  overflow: hidden;
`

const EditorialTextLine = styled.div`
  position: absolute;
  white-space: nowrap;
  font-family: "Instrument Serif", Georgia, serif;
  font-size: 80px;
  font-style: italic;
  color: #000;
  animation: ${editorialScroll} 20s linear infinite;

  &:nth-child(1) {
    top: 10%;
  }
  &:nth-child(2) {
    top: 35%;
    animation-direction: reverse;
  }
  &:nth-child(3) {
    top: 60%;
  }
  &:nth-child(4) {
    top: 85%;
    animation-direction: reverse;
  }
`

const EditorialContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 50%;
`

const EditorialEyebrow = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 20px;
`

const EditorialTitle = styled.h1`
  font-family: "Instrument Serif", Georgia, serif;
  font-size: 72px;
  font-weight: 400;
  font-style: italic;
  color: #1a1a1a;
  line-height: 1.1;
  margin: 0 0 20px 0;
`

const EditorialSubtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 30px 0;
`

const EditorialButton = styled.div`
  display: inline-block;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: #1a1a1a;
  padding: 18px 40px;
`

const EditorialImage = styled.div`
  width: 40%;
  aspect-ratio: 4/5;
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`

// ============================================
// MINI HERO - GOLD
// ============================================

const GoldHero = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1510 50%, #0a0a0a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const GoldGlow = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      ellipse at 30% 20%,
      rgba(212, 175, 55, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      ellipse at 70% 80%,
      rgba(212, 175, 55, 0.1) 0%,
      transparent 50%
    );
`

const GoldSparkle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #d4af37;
  border-radius: 50%;
  box-shadow: 0 0 10px #d4af37;
  animation: ${goldSparkle} 3s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay || "0s"};
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
`

const GoldEyebrow = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  background: linear-gradient(90deg, #d4af37, #f4d03f, #d4af37);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${goldShimmer} 3s linear infinite;
  margin-bottom: 25px;
  position: relative;
  z-index: 2;
`

const GoldTitle = styled.h1`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 100px;
  font-weight: 300;
  color: #ffffff;
  line-height: 1;
  margin: 0 0 10px 0;
  position: relative;
  z-index: 2;

  span {
    display: block;
    background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${goldShimmer} 4s linear infinite;
  }
`

const GoldSubtitle = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  margin: 20px 0 35px 0;
  position: relative;
  z-index: 2;
`

const GoldButton = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #0a0a0a;
  background: linear-gradient(135deg, #d4af37, #f4d03f);
  padding: 20px 50px;
  position: relative;
  z-index: 2;
`

// ============================================
// MINI HERO - BOTANICAL
// ============================================

const BotanicalHero = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #f8f6f0 0%, #ebe7de 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const FloatingPlant = styled.div`
  position: absolute;
  font-size: ${(p) => p.$size || "50px"};
  opacity: ${(p) => p.$opacity || 0.5};
  animation: ${(p) => (p.$anim === 1 ? botanicalFloat1 : botanicalFloat2)}
    ${(p) => p.$duration || "10s"} ease-in-out infinite;
  animation-delay: ${(p) => p.$delay || "0s"};
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
  bottom: ${(p) => p.$bottom};
  filter: ${(p) => (p.$blur ? `blur(${p.$blur})` : "none")};
`

const BotanicalEyebrow = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 14px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #8b9d83;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 15px;

  &::before,
  &::after {
    content: "✿";
    font-size: 12px;
  }
`

const BotanicalTitle = styled.h1`
  font-family: "Playfair Display", Georgia, serif;
  font-size: 80px;
  font-weight: 400;
  color: #2d3b2d;
  line-height: 1.1;
  margin: 0 0 20px 0;
  text-align: center;
  position: relative;
  z-index: 2;
`

const BotanicalSubtitle = styled.p`
  font-family: "Lato", sans-serif;
  font-size: 18px;
  color: #5a6b5a;
  margin: 0 0 35px 0;
  text-align: center;
  position: relative;
  z-index: 2;
`

const BotanicalButton = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: #8b9d83;
  padding: 18px 45px;
  border-radius: 50px;
  position: relative;
  z-index: 2;
`

// ============================================
// MINI HERO - CONTEMPORARY
// ============================================

const ContemporaryHero = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #ffe66d 100%);
  background-size: 200% 200%;
  animation: ${contemporaryGradient} 8s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const ContemporaryBgText = styled.div`
  position: absolute;
  font-family: "Space Grotesk", sans-serif;
  font-size: 200px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.08);
  text-transform: uppercase;
  white-space: nowrap;
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
`

const ContemporaryShape = styled.div`
  position: absolute;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: ${(p) => (p.$round ? "50%" : "0")};
  width: ${(p) => p.$size};
  height: ${(p) => p.$size};
  top: ${(p) => p.$top};
  left: ${(p) => p.$left};
  right: ${(p) => p.$right};
`

const ContemporaryEyebrow = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 25px;
  margin-bottom: 25px;
  position: relative;
  z-index: 2;
`

const ContemporaryTitle = styled.h1`
  font-family: "Space Grotesk", sans-serif;
  font-size: 140px;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  line-height: 0.9;
  margin: 0 0 20px 0;
  text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  z-index: 2;
`

const ContemporarySubtitle = styled.p`
  font-family: "Space Grotesk", sans-serif;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 35px 0;
  text-align: center;
  position: relative;
  z-index: 2;
`

const ContemporaryButton = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  color: #0d0d0d;
  background: #ffffff;
  padding: 20px 50px;
  border: 4px solid #0d0d0d;
  box-shadow: 6px 6px 0 #0d0d0d;
  position: relative;
  z-index: 2;
`

// ============================================
// MINI HERO - LUXE
// ============================================

const LuxeHero = styled.div`
  width: 100%;
  height: 100%;
  background: #faf9f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const LuxeLine = styled.div`
  position: absolute;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(180, 160, 140, 0.2),
    transparent
  );
  left: 0;
  right: 0;
  top: ${(p) => p.$top};
`

const LuxeEyebrow = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #b4a08c;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 1px;
    background: #b4a08c;
    margin: 15px auto 0;
    animation: ${luxeLineExpand} 2s ease-out forwards;
  }
`

const LuxeTitle = styled.h1`
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 70px;
  font-weight: 300;
  color: #2a2a2a;
  line-height: 1.2;
  letter-spacing: 0.02em;
  margin: 0 0 20px 0;
  text-align: center;
  position: relative;
  z-index: 2;
`

const LuxeSubtitle = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  line-height: 2;
  color: #888;
  letter-spacing: 0.03em;
  margin: 0 0 35px 0;
  text-align: center;
  max-width: 400px;
  position: relative;
  z-index: 2;
`

const LuxeButton = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #2a2a2a;
  background: transparent;
  padding: 20px 50px;
  border: 1px solid #2a2a2a;
  position: relative;
  z-index: 2;
`

// ============================================
// MINI HERO - NEON
// ============================================

const NeonHero = styled.div`
  width: 100%;
  height: 100%;
  background: #0a0a0f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const NeonGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
`

const NeonGlow = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;

  &:nth-child(1) {
    background: #00ffff;
    top: -100px;
    left: -50px;
  }

  &:nth-child(2) {
    background: #ff00ff;
    bottom: -100px;
    right: -50px;
  }
`

const NeonScanLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 255, 255, 0.5),
    transparent
  );
  animation: ${neonScan} 4s linear infinite;
`

const NeonEyebrow = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #ff00ff;
  animation: ${neonFlicker} 4s ease-in-out infinite;
  margin-bottom: 25px;
  position: relative;
  z-index: 2;
`

const NeonTitle = styled.h1`
  font-family: "Space Grotesk", sans-serif;
  font-size: 100px;
  font-weight: 700;
  color: #00ffff;
  line-height: 1;
  margin: 0 0 20px 0;
  text-shadow:
    0 0 10px #00ffff,
    0 0 20px #00ffff,
    0 0 40px #00ffff;
  animation: ${neonFlicker} 5s ease-in-out infinite;
  text-align: center;
  position: relative;
  z-index: 2;
`

const NeonSubtitle = styled.p`
  font-family: "Space Grotesk", sans-serif;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 35px 0;
  text-align: center;
  position: relative;
  z-index: 2;
`

const NeonButton = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #0a0a0f;
  background: #00ffff;
  padding: 18px 45px;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  position: relative;
  z-index: 2;
`

// ============================================
// CARD INFO
// ============================================

const CardInfo = styled.div`
  padding: 20px;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      border-top: 1px solid #e0e0e0;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      background: #fafaf8;
      border-radius: 0 0 22px 22px;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      background: #0d0d0d;
      padding: 15px 20px;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      border-top: 1px solid #e8e4de;
    `}
`

const ThemeName = styled.h3`
  margin: 0 0 5px 0;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      color: #1a1a1a;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.2rem;
      color: #ffffff;
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Playfair Display", Georgia, serif;
      font-size: 1.1rem;
      color: #2d3b2d;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: #ffffff;
      text-transform: uppercase;
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Cormorant Garamond", Georgia, serif;
      font-size: 1.1rem;
      color: #2a2a2a;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: #ffffff;
    `}
`

const ThemeDescription = styled.p`
  margin: 0;

  ${(p) =>
    p.$themeId === "editorial" &&
    css`
      font-family: "Inter", sans-serif;
      font-size: 0.8rem;
      color: #999;
    `}
  ${(p) =>
    p.$themeId === "gold" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.4);
    `}
  ${(p) =>
    p.$themeId === "botanical" &&
    css`
      font-family: "Lato", sans-serif;
      font-size: 0.85rem;
      color: #8b9d83;
    `}
  ${(p) =>
    p.$themeId === "contemporary" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.5);
    `}
  ${(p) =>
    p.$themeId === "luxe" &&
    css`
      font-family: "Montserrat", sans-serif;
      font-size: 0.75rem;
      color: #999;
    `}
  ${(p) =>
    p.$themeId === "neon" &&
    css`
      font-family: "Space Grotesk", sans-serif;
      font-size: 0.8rem;
      color: #00ffff;
      opacity: 0.7;
    `}
`

// ============================================
// THEME CONFIGS
// ============================================

const themeConfigs = [
  {
    id: "editorial",
    name: "Editorial",
    description: "Minimalistisch & Modern",
  },
  { id: "gold", name: "Gold", description: "Luxuriös & Opulent" },
  { id: "botanical", name: "Botanical", description: "Natürlich & Organisch" },
  { id: "contemporary", name: "Contemporary", description: "Bold & Playful" },
  { id: "luxe", name: "Luxe", description: "Raffiniert & Zeitlos" },
  { id: "neon", name: "Neon", description: "Futuristisch & Elektrisierend" },
]

// ============================================
// MINI HERO RENDERER
// ============================================

const MiniHeroPreview = ({ themeId }) => {
  switch (themeId) {
    case "editorial":
      return (
        <EditorialHero>
          <EditorialBg>
            <EditorialTextLine>
              Wedding • Love • Forever • Together • Wedding • Love • Forever •
              Together •
            </EditorialTextLine>
            <EditorialTextLine>
              Digital Couture • Premium Design • Digital Couture • Premium
              Design •
            </EditorialTextLine>
            <EditorialTextLine>
              S&I • Wedding Websites • S&I • Wedding Websites •
            </EditorialTextLine>
            <EditorialTextLine>
              Timeless • Romantic • Beautiful • Timeless • Romantic • Beautiful
              •
            </EditorialTextLine>
          </EditorialBg>
          <EditorialContent>
            <EditorialEyebrow>Premium Wedding Websites</EditorialEyebrow>
            <EditorialTitle>Eure Geschichte, digital erzählt.</EditorialTitle>
            <EditorialSubtitle>
              Wir gestalten einzigartige Hochzeitswebsites.
            </EditorialSubtitle>
            <EditorialButton>Jetzt starten</EditorialButton>
          </EditorialContent>
          <EditorialImage />
        </EditorialHero>
      )

    case "gold":
      return (
        <GoldHero>
          <GoldGlow />
          <GoldSparkle $top='15%' $left='20%' $delay='0s' />
          <GoldSparkle $top='25%' $left='75%' $delay='1s' />
          <GoldSparkle $top='70%' $left='30%' $delay='2s' />
          <GoldSparkle $top='60%' $left='80%' $delay='0.5s' />
          <GoldSparkle $top='40%' $left='10%' $delay='1.5s' />
          <GoldEyebrow>✦ Exklusiv & Elegant ✦</GoldEyebrow>
          <GoldTitle>
            <span>Zeitlose</span> Eleganz
          </GoldTitle>
          <GoldSubtitle>
            Luxuriöse Hochzeitswebsites für Paare mit Anspruch.
          </GoldSubtitle>
          <GoldButton>Jetzt starten</GoldButton>
        </GoldHero>
      )

    case "botanical":
      return (
        <BotanicalHero>
          <FloatingPlant
            $top='8%'
            $left='5%'
            $size='60px'
            $anim={1}
            $duration='12s'
            $opacity={0.4}
          >
            🌿
          </FloatingPlant>
          <FloatingPlant
            $top='15%'
            $right='8%'
            $size='45px'
            $anim={2}
            $duration='10s'
            $delay='1s'
            $opacity={0.5}
          >
            🍃
          </FloatingPlant>
          <FloatingPlant
            $top='55%'
            $left='6%'
            $size='35px'
            $anim={2}
            $duration='14s'
            $delay='2s'
            $opacity={0.3}
            $blur='2px'
          >
            🌸
          </FloatingPlant>
          <FloatingPlant
            $top='65%'
            $right='10%'
            $size='50px'
            $anim={1}
            $duration='11s'
            $delay='0.5s'
            $opacity={0.45}
          >
            🌺
          </FloatingPlant>
          <FloatingPlant
            $bottom='12%'
            $left='15%'
            $size='40px'
            $anim={2}
            $duration='9s'
            $delay='1.5s'
            $opacity={0.35}
          >
            🍀
          </FloatingPlant>
          <FloatingPlant
            $bottom='20%'
            $right='5%'
            $size='55px'
            $anim={1}
            $duration='11s'
            $opacity={0.4}
          >
            🌾
          </FloatingPlant>
          <BotanicalEyebrow>Natürlich Schön</BotanicalEyebrow>
          <BotanicalTitle>Wo Liebe erblüht</BotanicalTitle>
          <BotanicalSubtitle>
            Organisch schön, liebevoll gestaltet.
          </BotanicalSubtitle>
          <BotanicalButton>Jetzt starten</BotanicalButton>
        </BotanicalHero>
      )

    case "contemporary":
      return (
        <ContemporaryHero>
          <ContemporaryBgText $top='5%' $left='-5%'>
            WOW
          </ContemporaryBgText>
          <ContemporaryBgText $top='55%' $left='40%'>
            LOVE
          </ContemporaryBgText>
          <ContemporaryShape $round $size='250px' $top='-80px' $right='-80px' />
          <ContemporaryShape $size='180px' $top='60%' $left='5%' />
          <ContemporaryEyebrow>Bold & Beautiful</ContemporaryEyebrow>
          <ContemporaryTitle>
            MAKE IT
            <br />
            COUNT
          </ContemporaryTitle>
          <ContemporarySubtitle>
            Keine langweiligen Templates. Nur pure Kreativität.
          </ContemporarySubtitle>
          <ContemporaryButton>Jetzt starten</ContemporaryButton>
        </ContemporaryHero>
      )

    case "luxe":
      return (
        <LuxeHero>
          <LuxeLine $top='25%' />
          <LuxeLine $top='50%' />
          <LuxeLine $top='75%' />
          <LuxeEyebrow>Maßgeschneidert</LuxeEyebrow>
          <LuxeTitle>
            Die Kunst der
            <br />
            Einfachheit
          </LuxeTitle>
          <LuxeSubtitle>
            Weniger ist mehr. Entdeckt die Schönheit des Wesentlichen.
          </LuxeSubtitle>
          <LuxeButton>Beratung anfragen</LuxeButton>
        </LuxeHero>
      )

    case "neon":
      return (
        <NeonHero>
          <NeonGlow />
          <NeonGlow />
          <NeonGrid />
          <NeonScanLine />
          <NeonEyebrow>{"// DIGITAL LOVE //"}</NeonEyebrow>
          <NeonTitle>
            NEXT LEVEL
            <br />
            WEDDING
          </NeonTitle>
          <NeonSubtitle>
            Digitale Hochzeits-Experience der nächsten Generation.
          </NeonSubtitle>
          <NeonButton>Jetzt starten</NeonButton>
        </NeonHero>
      )

    default:
      return null
  }
}

// ============================================
// MAIN COMPONENT
// ============================================

function ThemeShowcase() {
  const { currentTheme, switchTheme } = useTheme()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id='themes'>
      <Container>
        <Header $themeId={currentTheme} $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>Design Kollektion</Eyebrow>
          <Title $themeId={currentTheme}>
            {currentTheme === "contemporary"
              ? "PICK YOUR STYLE"
              : "Wähle deinen Stil"}
          </Title>
          <Subtitle $themeId={currentTheme}>
            Klicke auf ein Theme um die gesamte Seite in diesem Stil zu erleben.
          </Subtitle>
        </Header>

        <CardsGrid $themeId={currentTheme} $visible={isVisible}>
          {themeConfigs.map((config, index) => (
            <ThemeCard
              key={config.id}
              $themeId={currentTheme}
              $active={currentTheme === config.id}
              onClick={() => switchTheme(config.id)}
              style={{ transitionDelay: `${0.1 + index * 0.05}s` }}
            >
              {currentTheme === config.id && (
                <ActiveBadge $themeId={currentTheme}>AKTIV</ActiveBadge>
              )}

              <PreviewContainer $themeId={currentTheme}>
                <PreviewScaler>
                  <MiniHeroPreview themeId={config.id} />
                </PreviewScaler>
              </PreviewContainer>

              <CardInfo $themeId={currentTheme}>
                <ThemeName $themeId={currentTheme}>{config.name}</ThemeName>
                <ThemeDescription $themeId={currentTheme}>
                  {config.description}
                </ThemeDescription>
              </CardInfo>
            </ThemeCard>
          ))}
        </CardsGrid>
      </Container>
    </Section>
  )
}

export default ThemeShowcase
