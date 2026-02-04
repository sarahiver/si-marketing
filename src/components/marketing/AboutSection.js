// src/components/marketing/AboutSection.js
// SEO-optimierte About Section mit Sarah & Iver Bild
// Keywords: Premium Hochzeitswebsite, Wedding Website, Hochzeitsseite erstellen, RSVP, Hamburg
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// CLOUDINARY IMAGE - Sarah & Iver
// ============================================
const SARAH_IVER_IMAGE = 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1769863906/iverlasting/demo/hero/v8il9fyd1u6dhj6se3tz.jpg';

// ============================================
// ANIMATIONS
// ============================================
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
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
  max-width: 900px;
  margin: 0 auto;
`;

const HeroArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  margin-bottom: clamp(3rem, 8vh, 5rem);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ContentArea = styled.div`
  margin-bottom: clamp(3rem, 6vh, 4rem);
`;

const TeamSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: clamp(2rem, 5vh, 3rem) 0;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CTABox = styled.div`
  margin-top: clamp(3rem, 8vh, 5rem);
  text-align: center;
`;

// ============================================
// EDITORIAL THEME
// ============================================
const EditorialSection = styled(Section)`
  background: #FAFAFA;
`;

const EditorialImage = styled.img`
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  filter: grayscale(20%);
  
  @media (max-width: 768px) {
    max-width: 400px;
    margin: 0 auto;
  }
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
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
  line-height: 1.1;
  margin-bottom: 1rem;
`;

const EditorialSubtitle = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #525252;
`;

const EditorialH3 = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
  margin: 2rem 0 1rem;
`;

const EditorialQuote = styled.blockquote`
  font-family: 'Source Serif 4', serif;
  font-size: 1.3rem;
  font-style: italic;
  color: #C41E3A;
  padding: 1.5rem 0;
  margin: 1.5rem 0;
  border-left: 3px solid #C41E3A;
  padding-left: 1.5rem;
`;

const EditorialText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #333;
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const EditorialList = styled.ul`
  list-style: none;
  margin: 1rem 0;
  
  li {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: #333;
    padding: 0.5rem 0;
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

const EditorialTeamCard = styled.article`
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #E5E5E5;
`;

const EditorialTeamEmoji = styled.span`
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
`;

const EditorialTeamName = styled.h4`
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
  margin-bottom: 0.5rem;
`;

const EditorialTeamDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #666;
  line-height: 1.7;
`;

const EditorialCTAText = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1.2rem;
  font-style: italic;
  color: #333;
  margin-bottom: 1.5rem;
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
  padding: 1rem 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #a01830;
    transform: translateY(-2px);
  }
`;

const EditorialTagline = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  margin-top: 2rem;
`;

// ============================================
// BOTANICAL THEME
// ============================================
const BotanicalSection = styled(Section)`
  background: transparent;
  position: relative;
  z-index: 10;
`;

const BotanicalCard = styled.div`
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: clamp(2rem, 5vw, 3rem);
`;

const BotanicalImage = styled.img`
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  border-radius: 16px;
  
  @media (max-width: 768px) {
    max-width: 350px;
    margin: 0 auto;
  }
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
  line-height: 1.2;
  margin-bottom: 1rem;
`;

const BotanicalSubtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255,255,255,0.6);
`;

const BotanicalH3 = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: rgba(255,255,255,0.95);
  margin: 2rem 0 1rem;
`;

const BotanicalQuote = styled.blockquote`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-style: italic;
  color: rgba(255,255,255,0.8);
  padding: 1.5rem 0;
  margin: 1.5rem 0;
  text-align: center;
`;

const BotanicalText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const BotanicalList = styled.ul`
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

const BotanicalTeamCard = styled.article`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1.5rem;
`;

const BotanicalTeamEmoji = styled.span`
  font-size: 1.8rem;
  display: block;
  margin-bottom: 1rem;
`;

const BotanicalTeamName = styled.h4`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  color: rgba(255,255,255,0.95);
  margin-bottom: 0.5rem;
`;

const BotanicalTeamDesc = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
`;

const BotanicalCTAText = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  color: rgba(255,255,255,0.8);
  margin-bottom: 1.5rem;
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
  padding: 1rem 2.5rem;
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(255,255,255,0.15);
  }
`;

const BotanicalTagline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  margin-top: 2rem;
`;

// ============================================
// CONTEMPORARY THEME
// ============================================
const ContemporarySection = styled(Section)`
  background: #FAFAFA;
`;

const ContemporaryCard = styled.div`
  background: #fff;
  border: 3px solid #0D0D0D;
  box-shadow: 8px 8px 0 #FF6B6B;
  padding: clamp(2rem, 5vw, 3rem);
`;

const ContemporaryImage = styled.img`
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  border: 3px solid #0D0D0D;
  box-shadow: 6px 6px 0 #4ECDC4;
  
  @media (max-width: 768px) {
    max-width: 350px;
    margin: 0 auto;
  }
`;

const ContemporaryEyebrow = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FF6B6B;
  margin-bottom: 1rem;
`;

const ContemporaryTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  line-height: 1.1;
  margin-bottom: 1rem;
`;

const ContemporarySubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #525252;
`;

const ContemporaryH3 = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin: 2rem 0 1rem;
`;

const ContemporaryQuote = styled.blockquote`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #0D0D0D;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  background: #FFE66D;
  border: 2px solid #0D0D0D;
`;

const ContemporaryText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  color: #525252;
  line-height: 1.7;
  margin-bottom: 1rem;
`;

const ContemporaryList = styled.ul`
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

const ContemporaryTeamCard = styled.article`
  background: #fff;
  border: 3px solid #0D0D0D;
  padding: 1.5rem;
  box-shadow: 4px 4px 0 ${p => p.$color || '#FFE66D'};
`;

const ContemporaryTeamEmoji = styled.span`
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
`;

const ContemporaryTeamName = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 0.5rem;
`;

const ContemporaryTeamDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: #525252;
  line-height: 1.6;
`;

const ContemporaryCTAText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #0D0D0D;
  margin-bottom: 1.5rem;
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
  padding: 1rem 2.5rem;
  box-shadow: 4px 4px 0 #0D0D0D;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #0D0D0D;
  }
`;

const ContemporaryTagline = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #525252;
  margin-top: 2rem;
`;

// ============================================
// LUXE THEME
// ============================================
const LuxeSection = styled(Section)`
  background: #0A0A0A;
`;

const LuxeImage = styled.img`
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  filter: brightness(0.95);
  
  @media (max-width: 768px) {
    max-width: 350px;
    margin: 0 auto;
  }
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
  line-height: 1.2;
  margin-bottom: 1rem;
`;

const LuxeSubtitle = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(248,246,243,0.5);
`;

const LuxeH3 = styled.h3`
  font-family: 'Cormorant', serif;
  font-size: 1.4rem;
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
  margin: 2rem 0 1rem;
`;

const LuxeQuote = styled.blockquote`
  font-family: 'Cormorant', serif;
  font-size: 1.4rem;
  font-style: italic;
  color: #C9A962;
  padding: 1.5rem 0;
  margin: 1.5rem 0;
  text-align: center;
`;

const LuxeText = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(248,246,243,0.6);
  line-height: 1.9;
  margin-bottom: 1rem;
`;

const LuxeList = styled.ul`
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

const LuxeTeamCard = styled.article`
  padding: 1.5rem;
  border: 1px solid rgba(201, 169, 98, 0.2);
`;

const LuxeTeamEmoji = styled.span`
  font-size: 1.8rem;
  display: block;
  margin-bottom: 1rem;
`;

const LuxeTeamName = styled.h4`
  font-family: 'Cormorant', serif;
  font-size: 1.2rem;
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
  margin-bottom: 0.5rem;
`;

const LuxeTeamDesc = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(248,246,243,0.5);
  line-height: 1.7;
`;

const LuxeCTAText = styled.p`
  font-family: 'Cormorant', serif;
  font-size: 1.3rem;
  font-style: italic;
  color: rgba(248,246,243,0.8);
  margin-bottom: 1.5rem;
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
  padding: 1rem 2.5rem;
  cursor: pointer;
  transition: all 0.5s ease;
  
  &:hover {
    background: #d4b66f;
  }
`;

const LuxeTagline = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: rgba(248,246,243,0.4);
  margin-top: 2rem;
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
    background: radial-gradient(ellipse at 30% 70%, rgba(255,0,255,0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const NeonCard = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(0,255,255,0.2);
  padding: clamp(2rem, 5vw, 3rem);
`;

const NeonImage = styled.img`
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  border: 1px solid rgba(0,255,255,0.3);
  box-shadow: 0 0 30px rgba(0,255,255,0.2);
  
  @media (max-width: 768px) {
    max-width: 350px;
    margin: 0 auto;
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
  font-size: clamp(2rem, 5vw, 3rem);
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
`;

const NeonH3 = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0,255,255,0.5);
  margin: 2rem 0 1rem;
`;

const NeonQuote = styled.blockquote`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0,255,136,0.5);
  padding: 1.5rem 0;
  margin: 1.5rem 0;
  text-align: center;
`;

const NeonText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const NeonList = styled.ul`
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

const NeonTeamCard = styled.article`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(0,255,255,0.15);
  padding: 1.5rem;
`;

const NeonTeamEmoji = styled.span`
  font-size: 1.8rem;
  display: block;
  margin-bottom: 1rem;
`;

const NeonTeamName = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const NeonTeamDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
`;

const NeonCTAText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.8);
  margin-bottom: 1.5rem;
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
  padding: 1rem 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(0,255,136,0.3);
  
  &:hover {
    background: rgba(0,255,136,0.1);
    box-shadow: 0 0 30px rgba(0,255,136,0.5);
  }
`;

const NeonTagline = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  margin-top: 2rem;
`;

// ============================================
// VIDEO THEME
// ============================================
const VideoSection = styled(Section)`
  background: #0A0A0A;
`;

const VideoImage = styled.img`
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  
  @media (max-width: 768px) {
    max-width: 350px;
    margin: 0 auto;
  }
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
  line-height: 1.1;
  margin-bottom: 1rem;
`;

const VideoSubtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #B0B0B0;
`;

const VideoH3 = styled.h3`
  font-family: 'Manrope', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 2rem 0 1rem;
`;

const VideoQuote = styled.blockquote`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-style: italic;
  color: #6B8CAE;
  padding: 1.5rem 0;
  margin: 1.5rem 0;
  text-align: center;
`;

const VideoText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #B0B0B0;
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const VideoList = styled.ul`
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

const VideoTeamCard = styled.article`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
`;

const VideoTeamEmoji = styled.span`
  font-size: 1.8rem;
  display: block;
  margin-bottom: 1rem;
`;

const VideoTeamName = styled.h4`
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
`;

const VideoTeamDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #B0B0B0;
  line-height: 1.7;
`;

const VideoCTAText = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-style: italic;
  color: rgba(255,255,255,0.8);
  margin-bottom: 1.5rem;
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
  padding: 1rem 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #6B8CAE;
  }
`;

const VideoTagline = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  margin-top: 2rem;
`;

// ============================================
// CONTENT - SEO OPTIMIZED
// ============================================
const CONTENT = {
  eyebrow: 'Über uns',
  title: 'Sarah & Iver',
  subtitle: 'Warum es S&I. überhaupt gibt',
  intro: 'S&I. ist aus unserer eigenen Hochzeitsreise entstanden.',
  story: `Als wir unsere eigene Hochzeit geplant haben, wollten wir eine Hochzeitswebsite, die unsere Geschichte widerspiegelt – stilvoll, modern, emotional. Doch was wir fanden, war ernüchternd: Baukästen, die unpersönlich wirkten. Designs ohne Gefühl. Lösungen, die entweder kompliziert, zeitintensiv oder schlicht unschön waren.`,
  quote: '„Unsere Hochzeit verdient etwas Besonderes – warum gibt es das nicht?"',
  result: 'Also haben wir es selbst gebaut. Aus einer Idee wurde Leidenschaft. Aus Leidenschaft wurde ein Produkt. Und daraus entstand S&I. Premium Hochzeitswebsites.',
  visionTitle: 'Unsere Vision: Ein digitales Zuhause für eure Hochzeit',
  visionText: 'Wir glauben, dass eine Hochzeitswebsite mehr sein sollte als eine Informationsseite. Sie sollte sich anfühlen wie ein Zuhause für eure Liebe – ein Ort für eure Geschichte, eure Gäste, eure Erinnerungen und euren großen Tag.',
  visionList: [
    'Emotionen transportiert',
    'eure Persönlichkeit widerspiegelt',
    'Organisation erleichtert',
    'Gästen Orientierung gibt',
    'und euch Zeit, Stress und Nerven spart'
  ],
  visionTagline: 'So individuell wie eure Liebe. So einfach wie möglich für euch. So hochwertig wie euer großer Tag.',
  teamTitle: 'Wer wir sind – und warum wir so arbeiten',
  sarah: {
    emoji: '🎨',
    name: 'Sarah – Herz, Design & Gefühl',
    desc: 'Sarah sorgt dafür, dass jede Hochzeitswebsite nicht nur schön aussieht, sondern sich richtig anfühlt. Farben, Typografie, Bildsprache und Details – alles wird mit viel Liebe gestaltet, damit eure Website emotional berührt und stilistisch perfekt zu euch passt.'
  },
  iver: {
    emoji: '🧑‍💻',
    name: 'Iver – Technik, Umsetzung & persönliche Begleitung',
    desc: 'Iver kümmert sich um die Technik, Umsetzung und persönliche Betreuung. Vom ersten Gespräch bis zur fertigen Website habt ihr einen echten Ansprechpartner – kein anonymes System, keinen Support-Chat, keine Massenabfertigung.'
  },
  personalTitle: 'Warum wir immer persönlich mit euch sprechen',
  personalText: 'Jede Liebesgeschichte ist anders. Deshalb glauben wir nicht an Standardlösungen. Bevor wir starten, möchten wir euch wirklich kennenlernen:',
  personalList: [
    'Was macht euch als Paar aus?',
    'Wie soll sich eure Hochzeit anfühlen?',
    'Elegant, modern, verspielt, minimalistisch?',
    'Welche Details sind euch wichtig?'
  ],
  personalResult: 'Erst danach gestalten wir eure individuelle Hochzeitswebsite – maßgeschneidert, persönlich und mit dem Anspruch, nicht nur zu funktionieren, sondern zu begeistern.',
  seoTitle: 'Für Paare, die mehr wollen als eine „normale" Hochzeitswebsite',
  seoList: [
    'Premium Hochzeitswebsite erstellen lassen',
    'moderne Wedding Website mit Persönlichkeit bekommen',
    'emotionale Hochzeitsseite statt Baukasten nutzen',
    'Website mit RSVP, Galerie, Gäste-Fotos, Ablauf, Wunschliste & mehr haben',
    'digitales Erlebnis schaffen, das Gäste beeindruckt'
  ],
  ctaText: 'Wenn eure Hochzeit besonders ist, sollte eure Website es auch sein.',
  ctaButton: 'Schreibt uns',
  tagline: 'S&I. – Premium Hochzeitswebsites für eure Liebesgeschichte mit Anspruch.'
};

// ============================================
// MAIN COMPONENT
// ============================================
const AboutSection = () => {
  const { currentTheme } = useTheme();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // EDITORIAL
  if (currentTheme === 'editorial') {
    return (
      <EditorialSection id="about">
        <Container>
          <HeroArea>
            <EditorialImage 
              src={SARAH_IVER_IMAGE} 
              alt="Sarah und Iver - Gründer von S&I. Premium Hochzeitswebsites"
              loading="lazy"
            />
            <div>
              <EditorialEyebrow>{CONTENT.eyebrow}</EditorialEyebrow>
              <EditorialTitle>{CONTENT.title}</EditorialTitle>
              <EditorialSubtitle>{CONTENT.subtitle}</EditorialSubtitle>
            </div>
          </HeroArea>
          
          <ContentArea>
            <EditorialText><strong>{CONTENT.intro}</strong></EditorialText>
            <EditorialText>{CONTENT.story}</EditorialText>
            <EditorialQuote>{CONTENT.quote}</EditorialQuote>
            <EditorialText>{CONTENT.result}</EditorialText>
            
            <EditorialH3>{CONTENT.visionTitle}</EditorialH3>
            <EditorialText>{CONTENT.visionText}</EditorialText>
            <EditorialText>Eine Website, die:</EditorialText>
            <EditorialList>
              {CONTENT.visionList.map((item, i) => <li key={i}>{item}</li>)}
            </EditorialList>
            <EditorialText><em>{CONTENT.visionTagline}</em></EditorialText>
            
            <EditorialH3>{CONTENT.teamTitle}</EditorialH3>
            <TeamSection>
              <EditorialTeamCard>
                <EditorialTeamEmoji>{CONTENT.sarah.emoji}</EditorialTeamEmoji>
                <EditorialTeamName>{CONTENT.sarah.name}</EditorialTeamName>
                <EditorialTeamDesc>{CONTENT.sarah.desc}</EditorialTeamDesc>
              </EditorialTeamCard>
              <EditorialTeamCard>
                <EditorialTeamEmoji>{CONTENT.iver.emoji}</EditorialTeamEmoji>
                <EditorialTeamName>{CONTENT.iver.name}</EditorialTeamName>
                <EditorialTeamDesc>{CONTENT.iver.desc}</EditorialTeamDesc>
              </EditorialTeamCard>
            </TeamSection>
            
            <EditorialH3>{CONTENT.personalTitle}</EditorialH3>
            <EditorialText>{CONTENT.personalText}</EditorialText>
            <EditorialList>
              {CONTENT.personalList.map((item, i) => <li key={i}>{item}</li>)}
            </EditorialList>
            <EditorialText>{CONTENT.personalResult}</EditorialText>
            
            <EditorialH3>{CONTENT.seoTitle}</EditorialH3>
            <EditorialText>Wir helfen Paaren:</EditorialText>
            <EditorialList>
              {CONTENT.seoList.map((item, i) => <li key={i}>{item}</li>)}
            </EditorialList>
          </ContentArea>
          
          <CTABox>
            <EditorialCTAText>{CONTENT.ctaText}</EditorialCTAText>
            <EditorialCTAButton onClick={scrollToContact}>{CONTENT.ctaButton}</EditorialCTAButton>
            <EditorialTagline>{CONTENT.tagline}</EditorialTagline>
          </CTABox>
        </Container>
      </EditorialSection>
    );
  }

  // BOTANICAL
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="about">
        <Container>
          <BotanicalCard>
            <HeroArea>
              <BotanicalImage 
                src={SARAH_IVER_IMAGE} 
                alt="Sarah und Iver - Gründer von S&I. Premium Hochzeitswebsites"
                loading="lazy"
              />
              <div>
                <BotanicalEyebrow>{CONTENT.eyebrow}</BotanicalEyebrow>
                <BotanicalTitle>{CONTENT.title}</BotanicalTitle>
                <BotanicalSubtitle>{CONTENT.subtitle}</BotanicalSubtitle>
              </div>
            </HeroArea>
            
            <ContentArea>
              <BotanicalText><strong>{CONTENT.intro}</strong></BotanicalText>
              <BotanicalText>{CONTENT.story}</BotanicalText>
              <BotanicalQuote>{CONTENT.quote}</BotanicalQuote>
              <BotanicalText>{CONTENT.result}</BotanicalText>
              
              <BotanicalH3>{CONTENT.visionTitle}</BotanicalH3>
              <BotanicalText>{CONTENT.visionText}</BotanicalText>
              <BotanicalList>
                {CONTENT.visionList.map((item, i) => <li key={i}>{item}</li>)}
              </BotanicalList>
              <BotanicalText><em>{CONTENT.visionTagline}</em></BotanicalText>
              
              <BotanicalH3>{CONTENT.teamTitle}</BotanicalH3>
              <TeamSection>
                <BotanicalTeamCard>
                  <BotanicalTeamEmoji>{CONTENT.sarah.emoji}</BotanicalTeamEmoji>
                  <BotanicalTeamName>{CONTENT.sarah.name}</BotanicalTeamName>
                  <BotanicalTeamDesc>{CONTENT.sarah.desc}</BotanicalTeamDesc>
                </BotanicalTeamCard>
                <BotanicalTeamCard>
                  <BotanicalTeamEmoji>{CONTENT.iver.emoji}</BotanicalTeamEmoji>
                  <BotanicalTeamName>{CONTENT.iver.name}</BotanicalTeamName>
                  <BotanicalTeamDesc>{CONTENT.iver.desc}</BotanicalTeamDesc>
                </BotanicalTeamCard>
              </TeamSection>
              
              <BotanicalH3>{CONTENT.personalTitle}</BotanicalH3>
              <BotanicalText>{CONTENT.personalText}</BotanicalText>
              <BotanicalList>
                {CONTENT.personalList.map((item, i) => <li key={i}>{item}</li>)}
              </BotanicalList>
              <BotanicalText>{CONTENT.personalResult}</BotanicalText>
              
              <BotanicalH3>{CONTENT.seoTitle}</BotanicalH3>
              <BotanicalList>
                {CONTENT.seoList.map((item, i) => <li key={i}>{item}</li>)}
              </BotanicalList>
            </ContentArea>
            
            <CTABox>
              <BotanicalCTAText>{CONTENT.ctaText}</BotanicalCTAText>
              <BotanicalCTAButton onClick={scrollToContact}>{CONTENT.ctaButton}</BotanicalCTAButton>
              <BotanicalTagline>{CONTENT.tagline}</BotanicalTagline>
            </CTABox>
          </BotanicalCard>
        </Container>
      </BotanicalSection>
    );
  }

  // CONTEMPORARY
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="about">
        <Container>
          <ContemporaryCard>
            <HeroArea>
              <ContemporaryImage 
                src={SARAH_IVER_IMAGE} 
                alt="Sarah und Iver - Gründer von S&I. Premium Hochzeitswebsites"
                loading="lazy"
              />
              <div>
                <ContemporaryEyebrow>👋 {CONTENT.eyebrow}</ContemporaryEyebrow>
                <ContemporaryTitle>{CONTENT.title}</ContemporaryTitle>
                <ContemporarySubtitle>{CONTENT.subtitle}</ContemporarySubtitle>
              </div>
            </HeroArea>
            
            <ContentArea>
              <ContemporaryText><strong>{CONTENT.intro}</strong></ContemporaryText>
              <ContemporaryText>{CONTENT.story}</ContemporaryText>
              <ContemporaryQuote>{CONTENT.quote}</ContemporaryQuote>
              <ContemporaryText>{CONTENT.result}</ContemporaryText>
              
              <ContemporaryH3>🏠 {CONTENT.visionTitle}</ContemporaryH3>
              <ContemporaryText>{CONTENT.visionText}</ContemporaryText>
              <ContemporaryList>
                {CONTENT.visionList.map((item, i) => <li key={i}>{item}</li>)}
              </ContemporaryList>
              <ContemporaryText><strong>{CONTENT.visionTagline}</strong></ContemporaryText>
              
              <ContemporaryH3>🤝 {CONTENT.teamTitle}</ContemporaryH3>
              <TeamSection>
                <ContemporaryTeamCard $color="#FF6B6B">
                  <ContemporaryTeamEmoji>{CONTENT.sarah.emoji}</ContemporaryTeamEmoji>
                  <ContemporaryTeamName>{CONTENT.sarah.name}</ContemporaryTeamName>
                  <ContemporaryTeamDesc>{CONTENT.sarah.desc}</ContemporaryTeamDesc>
                </ContemporaryTeamCard>
                <ContemporaryTeamCard $color="#4ECDC4">
                  <ContemporaryTeamEmoji>{CONTENT.iver.emoji}</ContemporaryTeamEmoji>
                  <ContemporaryTeamName>{CONTENT.iver.name}</ContemporaryTeamName>
                  <ContemporaryTeamDesc>{CONTENT.iver.desc}</ContemporaryTeamDesc>
                </ContemporaryTeamCard>
              </TeamSection>
              
              <ContemporaryH3>💬 {CONTENT.personalTitle}</ContemporaryH3>
              <ContemporaryText>{CONTENT.personalText}</ContemporaryText>
              <ContemporaryList>
                {CONTENT.personalList.map((item, i) => <li key={i}>{item}</li>)}
              </ContemporaryList>
              <ContemporaryText>{CONTENT.personalResult}</ContemporaryText>
              
              <ContemporaryH3>💎 {CONTENT.seoTitle}</ContemporaryH3>
              <ContemporaryList>
                {CONTENT.seoList.map((item, i) => <li key={i}>{item}</li>)}
              </ContemporaryList>
            </ContentArea>
            
            <CTABox>
              <ContemporaryCTAText>{CONTENT.ctaText}</ContemporaryCTAText>
              <ContemporaryCTAButton onClick={scrollToContact}>{CONTENT.ctaButton} →</ContemporaryCTAButton>
              <ContemporaryTagline>{CONTENT.tagline}</ContemporaryTagline>
            </CTABox>
          </ContemporaryCard>
        </Container>
      </ContemporarySection>
    );
  }

  // LUXE
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="about">
        <Container>
          <HeroArea>
            <LuxeImage 
              src={SARAH_IVER_IMAGE} 
              alt="Sarah und Iver - Gründer von S&I. Premium Hochzeitswebsites"
              loading="lazy"
            />
            <div>
              <LuxeEyebrow>{CONTENT.eyebrow}</LuxeEyebrow>
              <LuxeTitle>{CONTENT.title}</LuxeTitle>
              <LuxeSubtitle>{CONTENT.subtitle}</LuxeSubtitle>
            </div>
          </HeroArea>
          
          <ContentArea>
            <LuxeText><strong>{CONTENT.intro}</strong></LuxeText>
            <LuxeText>{CONTENT.story}</LuxeText>
            <LuxeQuote>{CONTENT.quote}</LuxeQuote>
            <LuxeText>{CONTENT.result}</LuxeText>
            
            <LuxeH3>{CONTENT.visionTitle}</LuxeH3>
            <LuxeText>{CONTENT.visionText}</LuxeText>
            <LuxeList>
              {CONTENT.visionList.map((item, i) => <li key={i}>{item}</li>)}
            </LuxeList>
            <LuxeText><em>{CONTENT.visionTagline}</em></LuxeText>
            
            <LuxeH3>{CONTENT.teamTitle}</LuxeH3>
            <TeamSection>
              <LuxeTeamCard>
                <LuxeTeamEmoji>{CONTENT.sarah.emoji}</LuxeTeamEmoji>
                <LuxeTeamName>{CONTENT.sarah.name}</LuxeTeamName>
                <LuxeTeamDesc>{CONTENT.sarah.desc}</LuxeTeamDesc>
              </LuxeTeamCard>
              <LuxeTeamCard>
                <LuxeTeamEmoji>{CONTENT.iver.emoji}</LuxeTeamEmoji>
                <LuxeTeamName>{CONTENT.iver.name}</LuxeTeamName>
                <LuxeTeamDesc>{CONTENT.iver.desc}</LuxeTeamDesc>
              </LuxeTeamCard>
            </TeamSection>
            
            <LuxeH3>{CONTENT.personalTitle}</LuxeH3>
            <LuxeText>{CONTENT.personalText}</LuxeText>
            <LuxeList>
              {CONTENT.personalList.map((item, i) => <li key={i}>{item}</li>)}
            </LuxeList>
            <LuxeText>{CONTENT.personalResult}</LuxeText>
            
            <LuxeH3>{CONTENT.seoTitle}</LuxeH3>
            <LuxeList>
              {CONTENT.seoList.map((item, i) => <li key={i}>{item}</li>)}
            </LuxeList>
          </ContentArea>
          
          <CTABox>
            <LuxeCTAText>{CONTENT.ctaText}</LuxeCTAText>
            <LuxeCTAButton onClick={scrollToContact}>{CONTENT.ctaButton}</LuxeCTAButton>
            <LuxeTagline>{CONTENT.tagline}</LuxeTagline>
          </CTABox>
        </Container>
      </LuxeSection>
    );
  }

  // NEON
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="about">
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <NeonCard>
            <HeroArea>
              <NeonImage 
                src={SARAH_IVER_IMAGE} 
                alt="Sarah und Iver - Gründer von S&I. Premium Hochzeitswebsites"
                loading="lazy"
              />
              <div>
                <NeonEyebrow>// about.init()</NeonEyebrow>
                <NeonTitle>{CONTENT.title}</NeonTitle>
                <NeonSubtitle>{CONTENT.subtitle}</NeonSubtitle>
              </div>
            </HeroArea>
            
            <ContentArea>
              <NeonText><strong>{CONTENT.intro}</strong></NeonText>
              <NeonText>{CONTENT.story}</NeonText>
              <NeonQuote>{CONTENT.quote}</NeonQuote>
              <NeonText>{CONTENT.result}</NeonText>
              
              <NeonH3>// vision</NeonH3>
              <NeonText>{CONTENT.visionText}</NeonText>
              <NeonList>
                {CONTENT.visionList.map((item, i) => <li key={i}>{item}</li>)}
              </NeonList>
              <NeonText><em>{CONTENT.visionTagline}</em></NeonText>
              
              <NeonH3>// team</NeonH3>
              <TeamSection>
                <NeonTeamCard>
                  <NeonTeamEmoji>{CONTENT.sarah.emoji}</NeonTeamEmoji>
                  <NeonTeamName>{CONTENT.sarah.name}</NeonTeamName>
                  <NeonTeamDesc>{CONTENT.sarah.desc}</NeonTeamDesc>
                </NeonTeamCard>
                <NeonTeamCard>
                  <NeonTeamEmoji>{CONTENT.iver.emoji}</NeonTeamEmoji>
                  <NeonTeamName>{CONTENT.iver.name}</NeonTeamName>
                  <NeonTeamDesc>{CONTENT.iver.desc}</NeonTeamDesc>
                </NeonTeamCard>
              </TeamSection>
              
              <NeonH3>// personal.approach</NeonH3>
              <NeonText>{CONTENT.personalText}</NeonText>
              <NeonList>
                {CONTENT.personalList.map((item, i) => <li key={i}>{item}</li>)}
              </NeonList>
              <NeonText>{CONTENT.personalResult}</NeonText>
              
              <NeonH3>// premium.features</NeonH3>
              <NeonList>
                {CONTENT.seoList.map((item, i) => <li key={i}>{item}</li>)}
              </NeonList>
            </ContentArea>
            
            <CTABox>
              <NeonCTAText>{CONTENT.ctaText}</NeonCTAText>
              <NeonCTAButton onClick={scrollToContact}>contact.send()</NeonCTAButton>
              <NeonTagline>{CONTENT.tagline}</NeonTagline>
            </CTABox>
          </NeonCard>
        </Container>
      </NeonSection>
    );
  }

  // VIDEO (Default)
  return (
    <VideoSection id="about">
      <Container>
        <HeroArea>
          <VideoImage 
            src={SARAH_IVER_IMAGE} 
            alt="Sarah und Iver - Gründer von S&I. Premium Hochzeitswebsites"
            loading="lazy"
          />
          <div>
            <VideoEyebrow>{CONTENT.eyebrow}</VideoEyebrow>
            <VideoTitle>{CONTENT.title}</VideoTitle>
            <VideoSubtitle>{CONTENT.subtitle}</VideoSubtitle>
          </div>
        </HeroArea>
        
        <ContentArea>
          <VideoText><strong>{CONTENT.intro}</strong></VideoText>
          <VideoText>{CONTENT.story}</VideoText>
          <VideoQuote>{CONTENT.quote}</VideoQuote>
          <VideoText>{CONTENT.result}</VideoText>
          
          <VideoH3>{CONTENT.visionTitle}</VideoH3>
          <VideoText>{CONTENT.visionText}</VideoText>
          <VideoList>
            {CONTENT.visionList.map((item, i) => <li key={i}>{item}</li>)}
          </VideoList>
          <VideoText><em>{CONTENT.visionTagline}</em></VideoText>
          
          <VideoH3>{CONTENT.teamTitle}</VideoH3>
          <TeamSection>
            <VideoTeamCard>
              <VideoTeamEmoji>{CONTENT.sarah.emoji}</VideoTeamEmoji>
              <VideoTeamName>{CONTENT.sarah.name}</VideoTeamName>
              <VideoTeamDesc>{CONTENT.sarah.desc}</VideoTeamDesc>
            </VideoTeamCard>
            <VideoTeamCard>
              <VideoTeamEmoji>{CONTENT.iver.emoji}</VideoTeamEmoji>
              <VideoTeamName>{CONTENT.iver.name}</VideoTeamName>
              <VideoTeamDesc>{CONTENT.iver.desc}</VideoTeamDesc>
            </VideoTeamCard>
          </TeamSection>
          
          <VideoH3>{CONTENT.personalTitle}</VideoH3>
          <VideoText>{CONTENT.personalText}</VideoText>
          <VideoList>
            {CONTENT.personalList.map((item, i) => <li key={i}>{item}</li>)}
          </VideoList>
          <VideoText>{CONTENT.personalResult}</VideoText>
          
          <VideoH3>{CONTENT.seoTitle}</VideoH3>
          <VideoList>
            {CONTENT.seoList.map((item, i) => <li key={i}>{item}</li>)}
          </VideoList>
        </ContentArea>
        
        <CTABox>
          <VideoCTAText>{CONTENT.ctaText}</VideoCTAText>
          <VideoCTAButton onClick={scrollToContact}>{CONTENT.ctaButton}</VideoCTAButton>
          <VideoTagline>{CONTENT.tagline}</VideoTagline>
        </CTABox>
      </Container>
    </VideoSection>
  );
};

export default AboutSection;
