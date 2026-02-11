// src/components/marketing/MarketingHero.js
// 1:1 basierend auf Design-Vorlagen
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// CLOUDINARY URLS
// ============================================
const VIDEO_URL = 'https://res.cloudinary.com/si-weddings/video/upload/v1769070616/si_comming_soon_video_hero_xga2ia.mp4';
const HERO_BG = 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1920/v1769072318/si_cooming_soon_luxe_hero_wowu9v.jpg';
const FOREST_BG = 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1920/v1769793086/forest-6761846_1920_dumcnj.jpg';

// Botanical Leaves - nur 3 große Blätter
const LEAVES = [
  'https://res.cloudinary.com/si-weddings/image/upload/w_600,q_auto,f_auto/v1769789868/pngwing.com_6_xo6v3t.png',
  'https://res.cloudinary.com/si-weddings/image/upload/w_600,q_auto,f_auto/v1769789866/pngwing.com_3_tz1fk6.png',
  'https://res.cloudinary.com/si-weddings/image/upload/w_600,q_auto,f_auto/v1769789866/pngwing.com_4_ugo8hl.png',
];

// ============================================
// ANIMATIONS
// ============================================
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const fadeInUp = keyframes`from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); }`;
const scrollBounce = keyframes`0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); }`;
const float1 = keyframes`0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(10px, -15px) rotate(3deg); }`;
const float2 = keyframes`0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-8px, 10px); }`;
const glitch = keyframes`
  0%, 100% { transform: translate(0); text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
  20% { transform: translate(-2px, 2px); text-shadow: 4px 0 #ff00ff, -4px 0 #00ffff; }
  40% { transform: translate(-2px, -2px); text-shadow: 2px 0 #00ffff, -2px 0 #ff00ff; }
  60% { transform: translate(2px, 2px); text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
  80% { transform: translate(2px, -2px); text-shadow: 4px 0 #00ffff, -4px 0 #ff00ff; }
`;
const scanline = keyframes`0% { top: -10%; } 100% { top: 110%; }`;
const geometricFloat = keyframes`0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(20px, -30px) rotate(90deg); }`;

// ============================================
// SHARED HERO COMPONENTS
// ============================================
const TrustLine = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 400;
  color: ${p => p.$light ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
  margin-top: 1.5rem;
  letter-spacing: 0.01em;
  animation: ${fadeInUp} 0.8s ease 0.9s both;
  ${p => p.$neon && `
    color: rgba(255,0,110,0.4);
    font-family: 'Space Grotesk', sans-serif;
  `}
`;

const HeroCTAs = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  animation: ${fadeInUp} 0.8s ease 0.6s both;
  
  .primary {
    background: #C41E3A;
    border-color: #C41E3A;
  }
`;

// ============================================
// EDITORIAL HERO - Magazine Style
// ============================================
const EditorialSection = styled.section`
  min-height: 100vh;
  background: #0A0A0A;
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
`;

const EditorialBg = styled.div`
  position: absolute;
  inset: 0;
  background: url(${HERO_BG}) center/cover no-repeat;
  filter: grayscale(100%) brightness(0.7);
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.8) 100%);
  }
`;

const EditorialContent = styled.div`
  position: relative;
  z-index: 10;
  padding: 0 clamp(2rem, 5vw, 6rem);
  padding-bottom: clamp(4rem, 10vh, 8rem);
  width: 100%;
`;

const EditorialEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1.5rem;
  animation: ${fadeInUp} 0.8s ease both;
`;

const EditorialTitle = styled.h1`
  font-family: 'Oswald', sans-serif;
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 0.95;
  color: #FAFAFA;
  margin-bottom: 0.5rem;
  animation: ${fadeInUp} 0.8s ease 0.2s both;
  
  span {
    color: #C41E3A;
  }
`;

const EditorialDate = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-top: 1.5rem;
  animation: ${fadeInUp} 0.8s ease 0.4s both;
`;

const EditorialCTA = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FAFAFA;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 1rem 2.5rem;
  margin-top: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease 0.6s both;
  
  &:hover {
    background: #C41E3A;
    border-color: #C41E3A;
  }
`;

const EditorialScrollHint = styled.div`
  position: absolute;
  bottom: 2rem;
  right: clamp(2rem, 5vw, 6rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.4);
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  animation: ${fadeIn} 1s ease 1s both;
  
  &::after {
    content: '';
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
    animation: ${scrollBounce} 2s ease infinite;
  }
`;

// ============================================
// BOTANICAL HERO - Forest with Leaves
// ============================================
const BotanicalSection = styled.section`
  min-height: 100vh;
  background: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BotanicalBg = styled.div`
  position: fixed;
  inset: 0;
  background: url(${FOREST_BG}) center/cover no-repeat;
  filter: brightness(0.3) saturate(0.85);
  z-index: -10;
`;

const BotanicalLeaf = styled.img`
  position: absolute;
  pointer-events: none;
  filter: brightness(0.65) contrast(1.1) saturate(0.85);
  opacity: 0.9;
  z-index: 5;
  
  /* Oben links - großes Blatt in der Ecke */
  &.top-left {
    top: -80px;
    left: -100px;
    width: 400px;
    transform: rotate(135deg);
  }
  
  /* Unten links - großes Blatt am Rand */
  &.bottom-left {
    bottom: -100px;
    left: -120px;
    width: 500px;
    transform: rotate(45deg);
  }
  
  /* Unten rechts - großes Blatt am Rand */
  &.bottom-right {
    bottom: -120px;
    right: -150px;
    width: 550px;
    transform: rotate(-45deg) scaleX(-1);
  }
  
  @media (max-width: 768px) {
    &.top-left { width: 220px; top: -40px; left: -60px; }
    &.bottom-left { width: 280px; bottom: -60px; left: -80px; }
    &.bottom-right { width: 300px; bottom: -70px; right: -90px; }
  }
`;

const BotanicalCard = styled.div`
  position: relative;
  z-index: 50;
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 28px;
  padding: clamp(2rem, 4vw, 3rem) clamp(2rem, 5vw, 4rem);
  text-align: center;
  max-width: 480px;
  width: calc(100% - 3rem);
  margin: 0 auto;
  animation: ${fadeIn} 1s ease both;
  box-shadow: 0 25px 80px rgba(0,0,0,0.4);
`;

const BotanicalEyebrow = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1.25rem;
`;

const BotanicalTitle = styled.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  font-weight: 300;
  color: rgba(255,255,255,0.95);
  line-height: 1.15;
`;

const BotanicalSubtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 300;
  font-style: italic;
  color: rgba(255,255,255,0.6);
  margin-top: 1.25rem;
  line-height: 1.4;
`;

const BotanicalCTA = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #020802;
  background: rgba(255,255,255,0.95);
  border: none;
  border-radius: 50px;
  padding: 0.9rem 2rem;
  margin-top: 1.75rem;
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255,255,255,0.15);
  }
`;

const BotanicalScroll = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.4);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  z-index: 60;
  animation: ${fadeIn} 1s ease 0.5s both;
  
  &::after {
    content: '↓';
    animation: ${scrollBounce} 2s ease infinite;
  }
`;

// ============================================
// CONTEMPORARY HERO - Neobrutalism Split
// ============================================
const ContemporarySection = styled.section`
  min-height: 100vh;
  background: #FAFAFA;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const ContemporaryLeft = styled.div`
  padding: clamp(2rem, 5vw, 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 10;
`;

const ContemporaryRight = styled.div`
  position: relative;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(255,107,107,0.4) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(78,205,196,0.4) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(255,230,109,0.3) 0%, transparent 50%);
  }
`;

const ContemporaryShape = styled.div`
  position: absolute;
  border-radius: 50%;
  z-index: 5;
  
  &.circle1 {
    width: 80px;
    height: 80px;
    background: #FF6B6B;
    top: 5%;
    left: 5%;
    animation: ${float1} 6s ease-in-out infinite;
  }
  
  &.square1 {
    width: 50px;
    height: 50px;
    background: #FFE66D;
    border-radius: 0;
    top: 10%;
    left: 40%;
    animation: ${geometricFloat} 8s ease-in-out infinite;
  }
  
  &.circle2 {
    width: 60px;
    height: 60px;
    border: 3px solid #FF6B6B;
    background: transparent;
    bottom: 30%;
    left: 50%;
    animation: ${float2} 7s ease-in-out infinite;
  }
  
  &.square2 {
    width: 40px;
    height: 40px;
    background: #9B5DE5;
    border-radius: 0;
    bottom: 10%;
    right: 45%;
    animation: ${geometricFloat} 9s ease-in-out infinite reverse;
  }
  
  @media (max-width: 768px) {
    &.circle1 { width: 50px; height: 50px; }
    &.square1 { width: 35px; height: 35px; }
    &.circle2 { width: 40px; height: 40px; }
    &.square2 { width: 30px; height: 30px; }
  }
`;

const ContemporaryEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #525252;
  margin-bottom: 1rem;
  
  &::before {
    content: '';
    width: 40px;
    height: 3px;
    background: #FF6B6B;
  }
`;

const ContemporaryTitle = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.2rem, 7vw, 4.5rem);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 0.95;
  color: #0D0D0D;

  span.name2 {
    color: #FF6B6B;
  }
`;

const ContemporaryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const ContemporaryTag = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid #0D0D0D;
  background: ${p => p.$filled ? '#FFE66D' : 'transparent'};
`;

const ContemporaryCTAs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
`;

const ContemporaryCTA = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 1rem 1.5rem;
  border: 3px solid #0D0D0D;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${p => p.$primary ? css`
    background: #FF6B6B;
    color: #FAFAFA;
    box-shadow: 4px 4px 0 #0D0D0D;
    
    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0 #0D0D0D;
    }
  ` : css`
    background: transparent;
    color: #0D0D0D;
    
    &:hover {
      background: #4ECDC4;
    }
  `}
`;

const ContemporaryScroll = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #525252;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  z-index: 20;
  
  &::after {
    content: '↓';
    animation: ${scrollBounce} 2s ease infinite;
  }
`;

// ============================================
// LUXE HERO - Cinematic Elegant
// ============================================
const LuxeSection = styled.section`
  min-height: 100vh;
  background: #0A0A0A;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const LuxeBg = styled.div`
  position: absolute;
  inset: 0;
  background: url(${HERO_BG}) center/cover no-repeat;
  filter: brightness(0.4) saturate(0.8);
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.7) 100%);
  }
`;

const LuxeContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 2rem;
  animation: ${fadeIn} 1.5s ease both;
`;

const LuxeEyebrow = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #C9A962;
  margin-bottom: 2rem;
`;

const LuxeTitle = styled.h1`
  font-family: 'Cormorant', serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
  line-height: 1.1;
`;

const LuxeDate = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.3em;
  color: rgba(248,246,243,0.6);
  margin-top: 2.5rem;
`;

const LuxeDivider = styled.div`
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, transparent, #C9A962, transparent);
  margin: 2rem auto;
`;

const LuxeCTA = styled.button`
  font-family: 'Outfit', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(248,246,243,0.8);
  background: transparent;
  border: 1px solid rgba(248,246,243,0.3);
  padding: 1rem 2.5rem;
  cursor: pointer;
  transition: all 0.5s ease;
  
  &:hover {
    border-color: #C9A962;
    color: #C9A962;
  }
`;

const LuxeScroll = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 20;
  
  span {
    font-family: 'Outfit', sans-serif;
    font-size: 0.55rem;
    font-weight: 400;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(248,246,243,0.4);
  }
  
  &::after {
    content: '';
    width: 1px;
    height: 50px;
    background: linear-gradient(to bottom, rgba(248,246,243,0.3), transparent);
    animation: ${scrollBounce} 2s ease infinite;
  }
`;

// ============================================
// NEON HERO - Cyberpunk Glitch
// ============================================
const NeonSection = styled.section`
  min-height: 100vh;
  background: #0a0a0f;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const NeonGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 20%, rgba(0,255,255,0.1) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(255,0,255,0.1) 0%, transparent 50%);
  }
`;

const NeonScanline = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, transparent, rgba(0,255,255,0.3), transparent);
  animation: ${scanline} 4s linear infinite;
  pointer-events: none;
`;

const NeonContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 2rem;
`;

const NeonEyebrow = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #ff00ff;
  text-shadow: 0 0 10px rgba(255,0,255,0.5);
  margin-bottom: 1.5rem;
`;

const NeonTitle = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 10vw, 6rem);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 0.95;
  color: #fff;
  animation: ${glitch} 3s ease-in-out infinite;
`;

const NeonSubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.5);
  margin-top: 2rem;
`;

const NeonCTA = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #00ff88;
  background: transparent;
  border: 1px solid #00ff88;
  padding: 1rem 2.5rem;
  margin-top: 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(0,255,136,0.3);
  
  &:hover {
    background: rgba(0,255,136,0.1);
    box-shadow: 0 0 30px rgba(0,255,136,0.5);
  }
`;

const NeonScroll = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(0,255,255,0.5);
  z-index: 20;
  
  &::after {
    content: '↓';
    display: block;
    text-align: center;
    margin-top: 0.5rem;
    animation: ${scrollBounce} 2s ease infinite;
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0,255,255,0.5);
  }
`;

// ============================================
// VIDEO HERO - Fullscreen Cinematic
// ============================================
const VideoSection = styled.section`
  min-height: 100vh;
  background: #0A0A0A;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const VideoBg = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6) saturate(0.9);
`;

const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 100%);
`;

const VideoContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 2rem;
  animation: ${fadeIn} 1.5s ease both;
`;

const VideoEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #6B8CAE;
  margin-bottom: 1.5rem;
`;

const VideoTitle = styled.h1`
  font-family: 'Manrope', sans-serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1;
`;

const VideoDivider = styled.div`
  width: 60px;
  height: 2px;
  background: #6B8CAE;
  margin: 2rem auto;
`;

const VideoDate = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: rgba(255,255,255,0.8);
`;

const VideoLocation = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-top: 0.5rem;
`;

const VideoNav = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  z-index: 20;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }
`;

const VideoNavItem = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: color 0.3s ease;
  white-space: nowrap;
  
  &:hover, &.active {
    color: #FFFFFF;
  }
  
  &.active {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

// ============================================
// MAIN COMPONENT
// ============================================
const MarketingHero = () => {
  const { currentTheme } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect for Botanical leaves
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // EDITORIAL
  if (currentTheme === 'editorial') {
    return (
      <EditorialSection id="hero">
        <EditorialBg />
        <EditorialContent>
          <EditorialEyebrow>Von Paaren. Für Paare.</EditorialEyebrow>
          <EditorialTitle>
            Die Hochzeits-<br/>website, bei der<br/>eure Gäste<br/><span>„WOW"</span> sagen.
          </EditorialTitle>
          <EditorialDate>Handgemacht. Persönlich. In 7 Tagen live.</EditorialDate>
          <HeroCTAs>
            <EditorialCTA onClick={() => scrollToSection('themes')}>Beispiel-Hochzeit ansehen</EditorialCTA>
            <EditorialCTA onClick={() => scrollToSection('contact')} className="primary">Erzählt uns eure Geschichte</EditorialCTA>
          </HeroCTAs>
          <TrustLine $light>Bereits von modernen Paaren in ganz Deutschland genutzt — individuell, hochwertig, stressfrei.</TrustLine>
        </EditorialContent>
        <EditorialScrollHint>Scroll</EditorialScrollHint>
      </EditorialSection>
    );
  }

  // BOTANICAL
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="hero">
        <BotanicalBg />
        <BotanicalCard>
          <BotanicalEyebrow>Von Paaren. Für Paare.</BotanicalEyebrow>
          <BotanicalTitle>
            Die Hochzeitswebsite,<br/>
            bei der eure Gäste „WOW" sagen.
          </BotanicalTitle>
          <BotanicalSubtitle>
            Handgemacht. Persönlich. In 7 Tagen live.<br />
            Für Paare, die mehr wollen als ein Template.
          </BotanicalSubtitle>
          <BotanicalCTA onClick={() => scrollToSection('contact')}>Erzählt uns eure Geschichte</BotanicalCTA>
          <TrustLine $light>Bereits von modernen Paaren in ganz Deutschland genutzt.</TrustLine>
        </BotanicalCard>
        <BotanicalScroll>Entdecken</BotanicalScroll>
      </BotanicalSection>
    );
  }

  // CONTEMPORARY
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="hero">
        <ContemporaryShape className="circle1" />
        <ContemporaryShape className="square1" />
        <ContemporaryShape className="circle2" />
        <ContemporaryShape className="square2" />
        <ContemporaryLeft>
          <ContemporaryEyebrow>Von Paaren. Für Paare.</ContemporaryEyebrow>
          <ContemporaryTitle>
            Die Website,<br/>
            <span className="name2">bei der eure<br/>Gäste „WOW"<br/>sagen.</span>
          </ContemporaryTitle>
          <ContemporaryTags>
            <ContemporaryTag>✨ Handgemacht</ContemporaryTag>
            <ContemporaryTag $filled>⚡ In 7 Tagen live</ContemporaryTag>
          </ContemporaryTags>
          <ContemporaryCTAs>
            <ContemporaryCTA $primary onClick={() => scrollToSection('contact')}>Erzählt uns eure Geschichte →</ContemporaryCTA>
            <ContemporaryCTA onClick={() => scrollToSection('themes')}>Beispiele ansehen</ContemporaryCTA>
          </ContemporaryCTAs>
          <TrustLine $light>Bereits von modernen Paaren in ganz Deutschland genutzt.</TrustLine>
        </ContemporaryLeft>
        <ContemporaryRight />
        <ContemporaryScroll>Scroll</ContemporaryScroll>
      </ContemporarySection>
    );
  }

  // LUXE
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="hero">
        <LuxeBg />
        <LuxeContent>
          <LuxeEyebrow>Von Paaren. Für Paare.</LuxeEyebrow>
          <LuxeTitle>
            Die Hochzeitswebsite, bei der<br/>
            eure Gäste „WOW" sagen.
          </LuxeTitle>
          <LuxeDate>Handgemacht. Persönlich. In 7 Tagen live.</LuxeDate>
          <LuxeDivider />
          <LuxeCTA onClick={() => scrollToSection('contact')}>Erzählt uns eure Geschichte</LuxeCTA>
          <TrustLine $light>Bereits von modernen Paaren in ganz Deutschland genutzt.</TrustLine>
        </LuxeContent>
        <LuxeScroll>
          <span>Scroll</span>
        </LuxeScroll>
      </LuxeSection>
    );
  }

  // NEON
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="hero">
        <NeonGrid />
        <NeonScanline />
        <NeonContent>
          <NeonEyebrow>// built_by_a_couple_who_gave_a_damn</NeonEyebrow>
          <NeonTitle>
            Die Website,<br/>
            bei der eure<br/>
            Gäste „WOW"<br/>
            sagen.
          </NeonTitle>
          <NeonSubtitle>Handgemacht. Persönlich. In 7 Tagen live.</NeonSubtitle>
          <NeonCTA onClick={() => scrollToSection('contact')}>Erzählt uns eure Geschichte →</NeonCTA>
          <TrustLine $light $neon>Von modernen Paaren in Deutschland genutzt — kein Template, kein Baukasten.</TrustLine>
        </NeonContent>
        <NeonScroll>Scroll.down</NeonScroll>
      </NeonSection>
    );
  }

  // VIDEO (Default)
  return (
    <VideoSection id="hero">
      <VideoBg autoPlay muted loop playsInline>
        <source src={VIDEO_URL} type="video/mp4" />
      </VideoBg>
      <VideoOverlay />
      <VideoContent>
        <VideoEyebrow>Von Paaren. Für Paare.</VideoEyebrow>
        <VideoTitle>
          Die Hochzeitswebsite, bei der<br/>
          eure Gäste „WOW" sagen.
        </VideoTitle>
        <VideoDivider />
        <VideoDate>Handgemacht. Persönlich. In 7 Tagen live.</VideoDate>
        <TrustLine $light>Bereits von modernen Paaren in ganz Deutschland genutzt.</TrustLine>
      </VideoContent>
    </VideoSection>
  );
};

export default MarketingHero;
