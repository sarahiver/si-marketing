// src/components/marketing/ThemeShowcase.js
// Jedes Theme wird einzigartig präsentiert
import React, { useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// SHARED
// ============================================
const Section = styled.section`
  padding: clamp(5rem, 12vh, 8rem) clamp(1.5rem, 5vw, 4rem);
  overflow: hidden;
`;

// ============================================
// THEME PREVIEW IFRAME COMPONENT
// ============================================
const PreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${p => p.$aspect || '16/10'};
  overflow: hidden;
  background: ${p => p.$bg || '#0D0D0D'};
  ${p => p.$borderRadius ? `border-radius: ${p.$borderRadius};` : ''}
  ${p => p.$border ? `border: ${p.$border};` : ''}
  ${p => p.$boxShadow ? `box-shadow: ${p.$boxShadow};` : ''}
  ${p => p.$margin ? `margin: ${p.$margin};` : ''}

  @media (max-width: 768px) {
    display: none;
  }
`;

const PreviewIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 400%;
  height: 400%;
  transform: scale(0.25);
  transform-origin: top left;
  border: none;
  opacity: ${p => p.$loaded ? 1 : 0};
  transition: opacity 0.6s ease;
`;

const PreviewOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  cursor: ns-resize;
`;

const PreviewFallback = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${p => p.$fontFamily || "'Space Grotesk', sans-serif"};
  font-size: ${p => p.$fontSize || '2.5rem'};
  font-weight: ${p => p.$fontWeight || '700'};
  color: ${p => p.$color || 'rgba(255,255,255,0.15)'};
  ${p => p.$fontStyle ? `font-style: ${p.$fontStyle};` : ''}
  ${p => p.$textStroke ? `-webkit-text-stroke: ${p.$textStroke};` : ''}
  opacity: ${p => p.$loaded ? 0 : 1};
  transition: opacity 0.6s ease;
  pointer-events: none;
`;

const MobileFallback = styled.div`
  display: none;
  width: 100%;
  aspect-ratio: ${p => p.$aspect || '16/10'};
  background: ${p => p.$bg || '#0D0D0D'};
  ${p => p.$borderRadius ? `border-radius: ${p.$borderRadius};` : ''}
  ${p => p.$border ? `border: ${p.$border};` : ''}
  ${p => p.$boxShadow ? `box-shadow: ${p.$boxShadow};` : ''}
  ${p => p.$margin ? `margin: ${p.$margin};` : ''}
  align-items: center;
  justify-content: center;
  font-family: ${p => p.$fontFamily || "'Space Grotesk', sans-serif"};
  font-size: ${p => p.$fontSize || '2.5rem'};
  font-weight: ${p => p.$fontWeight || '700'};
  color: ${p => p.$color || 'rgba(255,255,255,0.15)'};
  ${p => p.$fontStyle ? `font-style: ${p.$fontStyle};` : ''}
  ${p => p.$textStroke ? `-webkit-text-stroke: ${p.$textStroke};` : ''}

  @media (max-width: 768px) {
    display: flex;
  }
`;

const ThemePreview = ({ url, fallbackText, aspect, bg, borderRadius, border, boxShadow, margin, fontFamily, fontSize, fontWeight, fontStyle, textStroke, color }) => {
  const [loaded, setLoaded] = useState(false);

  const handleWheel = useCallback((e) => {
    const wrapper = e.currentTarget.parentElement;
    const iframe = wrapper?.querySelector('iframe');
    if (iframe?.contentWindow) {
      iframe.contentWindow.scrollBy({ top: e.deltaY, behavior: 'auto' });
    }
    e.preventDefault();
  }, []);

  const fallbackProps = { $fontFamily: fontFamily, $fontSize: fontSize, $fontWeight: fontWeight, $fontStyle: fontStyle, $textStroke: textStroke, $color: color };
  const wrapperProps = { $aspect: aspect, $bg: bg, $borderRadius: borderRadius, $border: border, $boxShadow: boxShadow, $margin: margin };

  return (
    <>
      <PreviewWrapper {...wrapperProps}>
        <PreviewIframe
          src={url}
          title="Theme Preview"
          loading="lazy"
          sandbox="allow-same-origin"
          $loaded={loaded}
          onLoad={() => setLoaded(true)}
        />
        <PreviewOverlay onWheel={handleWheel} />
        <PreviewFallback {...fallbackProps} $loaded={loaded}>
          {fallbackText}
        </PreviewFallback>
      </PreviewWrapper>
      <MobileFallback {...wrapperProps} {...fallbackProps}>
        {fallbackText}
      </MobileFallback>
    </>
  );
};

// ============================================
// 1. EDITORIAL - Magazine Style Feature
// ============================================
const EditorialSection = styled(Section)`
  background: #FAFAFA;
`;

const EditorialContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const EditorialContent = styled.div``;

const EditorialLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #C41E3A;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #C41E3A;
    max-width: 60px;
  }
`;

const EditorialTitle = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
  line-height: 0.95;
  margin-bottom: 1.5rem;
`;

const EditorialDesc = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 2rem;
  max-width: 450px;
`;

const EditorialFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const EditorialFeature = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #0A0A0A;
  padding: 0.5rem 1rem;
  border: 1px solid #0A0A0A;
`;

const EditorialCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #fff;
  background: #C41E3A;
  padding: 1rem 2rem;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background: #A01830;
    transform: translateX(5px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const EditorialPreview = styled.div`
  position: relative;
`;


const EditorialAccent = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
  width: 100px;
  height: 100px;
  background: #C41E3A;

  @media (max-width: 900px) {
    display: none;
  }
`;

// ============================================
// 2. BOTANICAL - Glassmorphism Cards
// ============================================
const BotanicalSection = styled(Section)`
  background: #040604;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 20%, rgba(45, 90, 60, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(45, 90, 60, 0.1) 0%, transparent 40%);
  }
`;

const BotanicalContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  text-align: center;
`;

const BotanicalLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 1rem;
`;

const BotanicalTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  color: rgba(255,255,255,0.95);
  margin-bottom: 1rem;
`;

const BotanicalSubtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-style: italic;
  color: rgba(255,255,255,0.5);
  margin-bottom: 3rem;
`;

const BotanicalCard = styled.div`
  /* Exakt wie Theme: --glass-bg, --glass-blur, --glass-border, --glass-shadow */
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 28px;
  padding: 3rem;
  margin-bottom: 2rem;
  position: relative;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.05) inset,
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 10px 40px rgba(0, 0, 0, 0.25);
`;


const BotanicalFeatures = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const BotanicalFeature = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
`;

const BotanicalCTA = styled.a`
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.9);
  background: rgba(45, 90, 60, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 30px;
  padding: 1rem 2.5rem;
  text-decoration: none;
  transition: all 0.4s;

  &:hover {
    background: rgba(45, 90, 60, 0.6);
    border-color: rgba(255,255,255,0.4);
    transform: translateY(-3px);
  }
`;

// ============================================
// 3. CONTEMPORARY - Brutalist Layout
// ============================================
const ContemporarySection = styled(Section)`
  background: #FFE66D;
`;

const ContemporaryContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const ContemporaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 2rem;
`;

const ContemporaryTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  line-height: 0.9;
`;

const ContemporaryBadge = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  background: #FF6B6B;
  padding: 0.75rem 1.5rem;
  border: 3px solid #0D0D0D;
  box-shadow: 4px 4px 0 #0D0D0D;
  transform: rotate(-2deg);
`;

const ContemporaryGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContemporaryMainCard = styled.div`
  background: #fff;
  border: 3px solid #0D0D0D;
  box-shadow: 8px 8px 0 #0D0D0D;
  padding: 2rem;
`;


const ContemporaryDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const ContemporaryCTA = styled.a`
  display: inline-block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  background: #4ECDC4;
  border: 3px solid #0D0D0D;
  box-shadow: 4px 4px 0 #0D0D0D;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #0D0D0D;
    background: #FF6B6B;
    color: #fff;
  }
`;

const ContemporarySidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContemporaryFeatureBox = styled.div`
  background: ${p => p.$bg || '#fff'};
  border: 3px solid #0D0D0D;
  padding: 1.5rem;
  color: ${p => p.$color || '#0D0D0D'};

  h4 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  p {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
  }
`;

// ============================================
// 4. LUXE - Cinematic Full Width
// ============================================
const LuxeSection = styled(Section)`
  background: #0A0A0A;
  padding: 0;
`;

const LuxeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const LuxeVisual = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(201, 169, 98, 0.2);
    margin: 2rem;
  }
`;

const LuxeMonogram = styled.div`
  font-family: 'Cormorant', serif;
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 300;
  font-style: italic;
  color: transparent;
  -webkit-text-stroke: 1px rgba(201, 169, 98, 0.4);
  position: relative;
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.6s ease;
`;

const LuxePreviewFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 400%;
  height: 400%;
  transform: scale(0.25);
  transform-origin: top left;
  border: none;

  @media (max-width: 900px) {
    display: none;
  }
`;

const LuxePreviewOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;

  @media (max-width: 900px) {
    display: none;
  }
`;

const LuxeContent = styled.div`
  padding: clamp(3rem, 8vw, 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LuxeLabel = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #C9A962;
  margin-bottom: 2rem;
`;

const LuxeTitle = styled.h2`
  font-family: 'Cormorant', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
  line-height: 1.2;
  margin-bottom: 1.5rem;
`;

const LuxeDesc = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  line-height: 1.9;
  color: rgba(248,246,243,0.6);
  margin-bottom: 2.5rem;
  max-width: 400px;
`;

const LuxeFeatures = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const LuxeFeature = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(248,246,243,0.4);
`;

const LuxeCTA = styled.a`
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #C9A962;
  border: 1px solid rgba(201, 169, 98, 0.4);
  padding: 1rem 2.5rem;
  text-decoration: none;
  transition: all 0.5s;
  align-self: flex-start;

  &:hover {
    background: rgba(201, 169, 98, 0.1);
    border-color: #C9A962;
  }
`;

// ============================================
// 5. NEON - Terminal/Cyberpunk
// ============================================
const glowPulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const NeonSection = styled(Section)`
  background: #0a0a0f;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 10% 90%, rgba(255,0,255,0.08) 0%, transparent 40%),
      radial-gradient(ellipse at 90% 10%, rgba(0,255,255,0.08) 0%, transparent 40%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ffff, #ff00ff, transparent);
    animation: ${glowPulse} 3s ease-in-out infinite;
  }
`;

const NeonGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
`;

const NeonContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const NeonTerminal = styled.div`
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(0,255,255,0.3);
  box-shadow:
    0 0 30px rgba(0,255,255,0.1),
    inset 0 0 30px rgba(0,0,0,0.5);
`;

const NeonTerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(0,255,255,0.05);
  border-bottom: 1px solid rgba(0,255,255,0.2);
`;

const NeonDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${p => p.$color};
  box-shadow: 0 0 8px ${p => p.$color};
`;

const NeonTerminalTitle = styled.div`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.5);
  margin-left: auto;
`;

const NeonTerminalBody = styled.div`
  padding: 2rem;
`;

const NeonCommand = styled.div`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.85rem;
  color: #00ff88;
  margin-bottom: 1.5rem;

  span {
    color: rgba(255,255,255,0.4);
  }
`;

const NeonTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 0.5rem;

  span {
    color: #00ffff;
    text-shadow: 0 0 20px rgba(0,255,255,0.5);
  }
`;

const NeonSubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #ff00ff;
  text-shadow: 0 0 10px rgba(255,0,255,0.5);
  margin-bottom: 2rem;
`;

const NeonDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.6);
  margin-bottom: 2rem;
  max-width: 600px;
`;

const NeonFeatures = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const NeonFeature = styled.div`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.75rem;
  color: #00ffff;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0,255,255,0.3);
  background: rgba(0,255,255,0.05);

  &::before {
    content: '> ';
    color: #ff00ff;
  }
`;

const NeonCTA = styled.a`
  display: inline-block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #00ffff;
  background: transparent;
  border: 1px solid #00ffff;
  padding: 1rem 2rem;
  text-decoration: none;
  box-shadow:
    0 0 15px rgba(0,255,255,0.3),
    inset 0 0 15px rgba(0,255,255,0.1);
  transition: all 0.3s;

  &:hover {
    background: rgba(0,255,255,0.1);
    box-shadow:
      0 0 25px rgba(0,255,255,0.5),
      inset 0 0 20px rgba(0,255,255,0.2);
    text-shadow: 0 0 10px #00ffff;
  }
`;

// ============================================
// 6. VIDEO - Horizontal Scroll Tease
// ============================================
const VideoSection = styled(Section)`
  background: #0A0A0A;
`;

const VideoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const VideoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 2rem;
`;

const VideoTitleBlock = styled.div``;

const VideoLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #6B8CAE;
  margin-bottom: 1rem;
`;

const VideoTitle = styled.h2`
  font-family: 'Manrope', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #fff;
`;

const VideoCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fff;
  background: #6B8CAE;
  padding: 1rem 2rem;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background: #5A7A9C;
    transform: translateY(-2px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;


const VideoFeatures = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const VideoFeature = styled.div`
  h4 {
    font-family: 'Manrope', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: #6B8CAE;
    margin-bottom: 0.25rem;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.5);
  }
`;

// ============================================
// ARROW ICON
// ============================================
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ============================================
// ALL DEMOS DATA
// ============================================
const ALL_DEMOS = [
  { id: 'editorial', name: 'Editorial', url: 'https://siwedding.de/demo-editorial' },
  { id: 'botanical', name: 'Botanical', url: 'https://siwedding.de/demo-botanical' },
  { id: 'contemporary', name: 'Contemporary', url: 'https://siwedding.de/demo-contemporary' },
  { id: 'luxe', name: 'Luxe', url: 'https://siwedding.de/demo-luxe' },
  { id: 'neon', name: 'Neon', url: 'https://siwedding.de/demo-neon' },
  { id: 'video', name: 'Video', url: 'https://siwedding.de/demo-video' },
];

// ============================================
// ALL DEMOS SECTION - EDITORIAL STYLE
// ============================================
const EditorialAllDemos = styled.div`
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid #ddd;
`;

const EditorialAllDemosTitle = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #666;
  margin-bottom: 1.5rem;
`;

const EditorialDemoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const EditorialDemoLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${p => p.$active ? '#fff' : '#0A0A0A'};
  background: ${p => p.$active ? '#C41E3A' : 'transparent'};
  padding: 0.5rem 1rem;
  border: 1px solid ${p => p.$active ? '#C41E3A' : '#0A0A0A'};
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: ${p => p.$active ? '#A01830' : '#0A0A0A'};
    color: #fff;
    border-color: #0A0A0A;
  }
`;

// ============================================
// ALL DEMOS SECTION - BOTANICAL STYLE
// ============================================
const BotanicalAllDemos = styled.div`
  margin-top: 2rem;
`;

const BotanicalAllDemosTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 1rem;
`;

const BotanicalDemoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const BotanicalDemoLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${p => p.$active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'};
  background: ${p => p.$active ? 'rgba(45, 90, 60, 0.4)' : 'rgba(255,255,255,0.03)'};
  padding: 0.5rem 1rem;
  border: 1px solid ${p => p.$active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'};
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background: rgba(45, 90, 60, 0.3);
    border-color: rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.8);
  }
`;

// ============================================
// ALL DEMOS SECTION - CONTEMPORARY STYLE
// ============================================
const ContemporaryAllDemos = styled.div`
  margin-top: 2rem;
`;

const ContemporaryAllDemosTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 1rem;
`;

const ContemporaryDemoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ContemporaryDemoLink = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${p => p.$active ? '#fff' : '#0D0D0D'};
  background: ${p => p.$active ? '#FF6B6B' : '#fff'};
  padding: 0.5rem 1rem;
  border: 2px solid #0D0D0D;
  box-shadow: ${p => p.$active ? '3px 3px 0 #0D0D0D' : 'none'};
  text-decoration: none;
  transition: all 0.15s;

  &:hover {
    background: #4ECDC4;
    color: #0D0D0D;
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 #0D0D0D;
  }
`;

// ============================================
// ALL DEMOS SECTION - LUXE STYLE
// ============================================
const LuxeAllDemos = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(201, 169, 98, 0.2);
`;

const LuxeAllDemosTitle = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(248,246,243,0.3);
  margin-bottom: 1.5rem;
`;

const LuxeDemoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const LuxeDemoLink = styled.a`
  font-family: 'Outfit', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${p => p.$active ? '#C9A962' : 'rgba(248,246,243,0.4)'};
  border: 1px solid ${p => p.$active ? 'rgba(201, 169, 98, 0.5)' : 'rgba(248,246,243,0.1)'};
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: all 0.4s;

  &:hover {
    color: #C9A962;
    border-color: rgba(201, 169, 98, 0.4);
  }
`;

// ============================================
// ALL DEMOS SECTION - NEON STYLE
// ============================================
const NeonAllDemos = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0,255,255,0.1);
`;

const NeonAllDemosTitle = styled.h3`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.3);
  margin-bottom: 1rem;

  span { color: #00ff88; }
`;

const NeonDemoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const NeonDemoLink = styled.a`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.7rem;
  color: ${p => p.$active ? '#00ffff' : 'rgba(255,255,255,0.4)'};
  background: ${p => p.$active ? 'rgba(0,255,255,0.1)' : 'transparent'};
  border: 1px solid ${p => p.$active ? 'rgba(0,255,255,0.4)' : 'rgba(255,255,255,0.1)'};
  padding: 0.4rem 0.8rem;
  text-decoration: none;
  transition: all 0.2s;
  ${p => p.$active && 'box-shadow: 0 0 10px rgba(0,255,255,0.2);'}

  &:hover {
    color: #ff00ff;
    border-color: rgba(255,0,255,0.4);
    background: rgba(255,0,255,0.1);
  }
`;

// ============================================
// ALL DEMOS SECTION - VIDEO STYLE
// ============================================
const VideoAllDemos = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(107, 140, 174, 0.2);
`;

const VideoAllDemosTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 1.5rem;
`;

const VideoDemoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const VideoDemoLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.$active ? '#fff' : 'rgba(255,255,255,0.5)'};
  background: ${p => p.$active ? '#6B8CAE' : 'transparent'};
  border: 1px solid ${p => p.$active ? '#6B8CAE' : 'rgba(255,255,255,0.15)'};
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background: rgba(107, 140, 174, 0.2);
    border-color: #6B8CAE;
    color: #fff;
  }
`;

// ============================================
// MAIN COMPONENT
// ============================================
const ThemeShowcase = () => {
  const { currentTheme, setCurrentTheme } = useTheme();

  // EDITORIAL
  if (currentTheme === 'editorial') {
    return (
      <EditorialSection id="themes">
        <EditorialContainer>
          <EditorialContent>
            <EditorialLabel>Theme Spotlight</EditorialLabel>
            <EditorialTitle>Editorial</EditorialTitle>
            <EditorialDesc>
              Bold, magazine-inspired design with striking typography and a confident red accent.
              Perfect for couples who want their wedding website to make a statement.
            </EditorialDesc>
            <EditorialFeatures>
              <EditorialFeature>Bold Typography</EditorialFeature>
              <EditorialFeature>Magazine Layout</EditorialFeature>
              <EditorialFeature>Red Accent</EditorialFeature>
            </EditorialFeatures>
            <EditorialCTA href="https://siwedding.de/demo-editorial" target="_blank" rel="noopener noreferrer">
              Demo ansehen <ArrowIcon />
            </EditorialCTA>

            <EditorialAllDemos>
              <EditorialAllDemosTitle>Alle Themes ansehen</EditorialAllDemosTitle>
              <EditorialDemoGrid>
                {ALL_DEMOS.map(demo => (
                  <EditorialDemoLink
                    key={demo.id}
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    $active={demo.id === 'editorial'}
                  >
                    {demo.name}
                  </EditorialDemoLink>
                ))}
              </EditorialDemoGrid>
            </EditorialAllDemos>
          </EditorialContent>
          <EditorialPreview>
            <EditorialAccent />
            <ThemePreview
              url="https://siwedding.de/demo-editorial"
              fallbackText="E&L"
              aspect="3/4"
              bg="#0A0A0A"
              fontFamily="'Oswald', sans-serif"
              fontSize="4rem"
              color="#C41E3A"
            />
          </EditorialPreview>
        </EditorialContainer>
      </EditorialSection>
    );
  }

  // BOTANICAL
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="themes">
        <BotanicalContainer>
          <BotanicalLabel>Theme Collection</BotanicalLabel>
          <BotanicalTitle>Botanical</BotanicalTitle>
          <BotanicalSubtitle>Elegance meets nature</BotanicalSubtitle>

          <BotanicalCard>
            <ThemePreview
              url="https://siwedding.de/demo-botanical"
              fallbackText="E & L"
              aspect="16/9"
              bg="linear-gradient(135deg, rgba(45,90,60,0.3) 0%, rgba(20,40,30,0.5) 100%)"
              borderRadius="12px"
              margin="0 0 2rem 0"
              fontFamily="'Cormorant Garamond', serif"
              fontSize="2rem"
              color="rgba(255,255,255,0.8)"
            />
            <BotanicalFeatures>
              <BotanicalFeature>Glassmorphism</BotanicalFeature>
              <BotanicalFeature>Dark Elegance</BotanicalFeature>
              <BotanicalFeature>Organic Forms</BotanicalFeature>
              <BotanicalFeature>Subtle Animations</BotanicalFeature>
            </BotanicalFeatures>
            <BotanicalCTA href="https://siwedding.de/demo-botanical" target="_blank" rel="noopener noreferrer">
              Demo ansehen
            </BotanicalCTA>

            <BotanicalAllDemos>
              <BotanicalAllDemosTitle>Alle Themes</BotanicalAllDemosTitle>
              <BotanicalDemoGrid>
                {ALL_DEMOS.map(demo => (
                  <BotanicalDemoLink
                    key={demo.id}
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    $active={demo.id === 'botanical'}
                  >
                    {demo.name}
                  </BotanicalDemoLink>
                ))}
              </BotanicalDemoGrid>
            </BotanicalAllDemos>
          </BotanicalCard>
        </BotanicalContainer>
      </BotanicalSection>
    );
  }

  // CONTEMPORARY
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="themes">
        <ContemporaryContainer>
          <ContemporaryHeader>
            <ContemporaryTitle>Contemporary</ContemporaryTitle>
            <ContemporaryBadge>Neobrutalism!</ContemporaryBadge>
          </ContemporaryHeader>

          <ContemporaryGrid>
            <ContemporaryMainCard>
              <ThemePreview
                url="https://siwedding.de/demo-contemporary"
                fallbackText="Y & K"
                aspect="16/10"
                bg="#0D0D0D"
                margin="0 0 1.5rem 0"
                fontFamily="'Space Grotesk', sans-serif"
                fontSize="2.5rem"
                color="#4ECDC4"
              />
              <ContemporaryDesc>
                Bold borders, playful colors, and unapologetic design. For couples who dare to be different.
              </ContemporaryDesc>
              <ContemporaryCTA href="https://siwedding.de/demo-contemporary" target="_blank" rel="noopener noreferrer">
                Demo ansehen →
              </ContemporaryCTA>
            </ContemporaryMainCard>

            <ContemporarySidebar>
              <ContemporaryFeatureBox $bg="#FF6B6B" $color="#fff">
                <h4>Bold Colors</h4>
                <p>Coral, teal, yellow</p>
              </ContemporaryFeatureBox>
              <ContemporaryFeatureBox $bg="#4ECDC4" $color="#0D0D0D">
                <h4>Hard Shadows</h4>
                <p>Brutalist aesthetic</p>
              </ContemporaryFeatureBox>
              <ContemporaryFeatureBox>
                <h4>Fun Vibes</h4>
                <p>Playful & modern</p>
              </ContemporaryFeatureBox>
            </ContemporarySidebar>
          </ContemporaryGrid>

          <ContemporaryAllDemos>
            <ContemporaryAllDemosTitle>Alle Themes →</ContemporaryAllDemosTitle>
            <ContemporaryDemoGrid>
              {ALL_DEMOS.map(demo => (
                <ContemporaryDemoLink
                  key={demo.id}
                  href={demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  $active={demo.id === 'contemporary'}
                >
                  {demo.name}
                </ContemporaryDemoLink>
              ))}
            </ContemporaryDemoGrid>
          </ContemporaryAllDemos>
        </ContemporaryContainer>
      </ContemporarySection>
    );
  }

  // LUXE
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="themes">
        <LuxeContainer>
          <LuxeVisual>
            <LuxePreviewFrame
              src="https://siwedding.de/demo-luxe"
              title="Luxe Theme Preview"
              loading="lazy"
              sandbox="allow-same-origin"
            />
            <LuxePreviewOverlay />
            <LuxeMonogram>C&J</LuxeMonogram>
          </LuxeVisual>
          <LuxeContent>
            <LuxeLabel>Exclusive Collection</LuxeLabel>
            <LuxeTitle>Luxe</LuxeTitle>
            <LuxeDesc>
              Timeless elegance with gold accents and cinematic typography.
              A sophisticated choice for black-tie celebrations and grand venues.
            </LuxeDesc>
            <LuxeFeatures>
              <LuxeFeature>Gold Accents</LuxeFeature>
              <LuxeFeature>Cinematic Type</LuxeFeature>
              <LuxeFeature>Minimal Design</LuxeFeature>
            </LuxeFeatures>
            <LuxeCTA href="https://siwedding.de/demo-luxe" target="_blank" rel="noopener noreferrer">
              Demo ansehen
            </LuxeCTA>

            <LuxeAllDemos>
              <LuxeAllDemosTitle>Collection</LuxeAllDemosTitle>
              <LuxeDemoGrid>
                {ALL_DEMOS.map(demo => (
                  <LuxeDemoLink
                    key={demo.id}
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    $active={demo.id === 'luxe'}
                  >
                    {demo.name}
                  </LuxeDemoLink>
                ))}
              </LuxeDemoGrid>
            </LuxeAllDemos>
          </LuxeContent>
        </LuxeContainer>
      </LuxeSection>
    );
  }

  // NEON
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="themes">
        <NeonGrid />
        <NeonContainer>
          <NeonTerminal>
            <NeonTerminalHeader>
              <NeonDot $color="#ff5f56" />
              <NeonDot $color="#ffbd2e" />
              <NeonDot $color="#27ca40" />
              <NeonTerminalTitle>theme_preview.exe</NeonTerminalTitle>
            </NeonTerminalHeader>
            <NeonTerminalBody>
              <NeonCommand><span>$</span> load_theme --name="neon" --preview=true</NeonCommand>
              <NeonTitle><span>Neon</span> Theme</NeonTitle>
              <NeonSubtitle>// Cyberpunk Wedding Experience</NeonSubtitle>
              <NeonDesc>
                Glow effects, terminal aesthetics, and electric colors.
                For couples who want their wedding website to feel like stepping into the future.
              </NeonDesc>
              <NeonFeatures>
                <NeonFeature>Cyan Glow</NeonFeature>
                <NeonFeature>Magenta Accents</NeonFeature>
                <NeonFeature>Terminal UI</NeonFeature>
                <NeonFeature>Cyberpunk Vibes</NeonFeature>
              </NeonFeatures>
              <NeonCTA href="https://siwedding.de/demo-neon" target="_blank" rel="noopener noreferrer">
                [ DEMO STARTEN ]
              </NeonCTA>

              <NeonAllDemos>
                <NeonAllDemosTitle><span>$</span> ls ./themes/</NeonAllDemosTitle>
                <NeonDemoGrid>
                  {ALL_DEMOS.map(demo => (
                    <NeonDemoLink
                      key={demo.id}
                      href={demo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      $active={demo.id === 'neon'}
                    >
                      {demo.name}
                    </NeonDemoLink>
                  ))}
                </NeonDemoGrid>
              </NeonAllDemos>
            </NeonTerminalBody>
          </NeonTerminal>
        </NeonContainer>
      </NeonSection>
    );
  }

  // VIDEO (default)
  return (
    <VideoSection id="themes">
      <VideoContainer>
        <VideoHeader>
          <VideoTitleBlock>
            <VideoLabel>Cinematic Theme</VideoLabel>
            <VideoTitle>Video</VideoTitle>
          </VideoTitleBlock>
          <VideoCTA href="https://siwedding.de/demo-video" target="_blank" rel="noopener noreferrer">
            Demo ansehen <ArrowIcon />
          </VideoCTA>
        </VideoHeader>

        <ThemePreview
          url="https://siwedding.de/demo-video"
          fallbackText="M & C"
          aspect="21/9"
          bg="linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"
          border="1px solid rgba(107, 140, 174, 0.2)"
          fontFamily="'Manrope', sans-serif"
          fontSize="clamp(1.5rem, 4vw, 3rem)"
          fontWeight="700"
          color="rgba(255,255,255,0.1)"
        />

        <VideoFeatures>
          <VideoFeature>
            <h4>Video Background</h4>
            <p>Full-screen cinematic experience</p>
          </VideoFeature>
          <VideoFeature>
            <h4>Horizontal Scroll</h4>
            <p>Unique navigation on desktop</p>
          </VideoFeature>
          <VideoFeature>
            <h4>Dusty Blue</h4>
            <p>Elegant color accent</p>
          </VideoFeature>
        </VideoFeatures>

        <VideoAllDemos>
          <VideoAllDemosTitle>Alle Themes ansehen</VideoAllDemosTitle>
          <VideoDemoGrid>
            {ALL_DEMOS.map(demo => (
              <VideoDemoLink
                key={demo.id}
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                $active={demo.id === 'video'}
              >
                {demo.name}
              </VideoDemoLink>
            ))}
          </VideoDemoGrid>
        </VideoAllDemos>
      </VideoContainer>
    </VideoSection>
  );
};

export default ThemeShowcase;
