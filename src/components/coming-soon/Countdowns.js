// Countdown Komponenten - EXAKT wie in den Wedding Website Themes
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useCountdown, formatNumber } from '../hooks/useCountdown';

// ============================================
// SHARED KEYFRAMES
// ============================================
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const goldPulse = keyframes`
  0%, 100% { border-color: rgba(212, 175, 55, 0.2); }
  50% { border-color: rgba(212, 175, 55, 0.5); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

const neonFlicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 10px rgba(0,255,255,0.8), 0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.3);
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
`;

const holographicShift = keyframes`
  0%, 100% { 
    text-shadow: 0 0 10px rgba(0,255,255,0.8), 0 0 20px rgba(0,255,255,0.5);
  }
  50% { 
    text-shadow: 0 0 20px rgba(255,0,255,0.8), 0 0 40px rgba(255,0,255,0.5);
  }
`;

// ============================================
// EDITORIAL COUNTDOWN
// Instrument Serif + Inter, Schwarz/Weiß, Clean minimal boxes
// ============================================
const EditorialSection = styled.section`
  padding: 120px 5%;
  background: #FFFFFF;
  text-align: center;
`;

const EditorialContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const EditorialEyebrow = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 20px;
`;

const EditorialTitle = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 60px;
  
  span {
    font-style: italic;
  }
`;

const EditorialGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const EditorialUnit = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
`;

const EditorialBox = styled.div`
  min-width: 120px;
  padding: 35px 30px;
  border: 1px solid #E0E0E0;
  background: #FFFFFF;
  
  @media (max-width: 600px) {
    min-width: 80px;
    padding: 25px 20px;
  }
`;

const EditorialNumber = styled.span`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-style: italic;
  color: #1A1A1A;
  line-height: 1;
  display: block;
`;

const EditorialLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #999;
  margin-top: 15px;
  display: block;
`;

const EditorialDate = styled.p`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #666;
`;

export const EditorialCountdown = () => {
  const time = useCountdown();
  const units = [
    { value: time.days, label: 'Tage' },
    { value: time.hours, label: 'Stunden' },
    { value: time.minutes, label: 'Minuten' },
    { value: time.seconds, label: 'Sekunden' },
  ];
  
  return (
    <EditorialSection>
      <EditorialContainer>
        <EditorialEyebrow>Coming Soon</EditorialEyebrow>
        <EditorialTitle>Der große <span>Tag</span> naht</EditorialTitle>
        <EditorialGrid>
          {units.map((unit, i) => (
            <EditorialUnit key={i} $delay={i * 0.1}>
              <EditorialBox>
                <EditorialNumber>{formatNumber(unit.value)}</EditorialNumber>
              </EditorialBox>
              <EditorialLabel>{unit.label}</EditorialLabel>
            </EditorialUnit>
          ))}
        </EditorialGrid>
        <EditorialDate>1. Oktober 2026</EditorialDate>
      </EditorialContainer>
    </EditorialSection>
  );
};

// ============================================
// GOLD COUNTDOWN
// Cormorant Garamond + Montserrat, Gold gradient shimmer, Flip cards
// ============================================
const GoldSection = styled.section`
  padding: 120px 5%;
  background: linear-gradient(180deg, #0A0A0A 0%, #151510 100%);
  text-align: center;
  position: relative;
`;

const GoldContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const GoldDivider = styled.div`
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  margin: 0 auto 30px;
  position: relative;

  &::before {
    content: '◆';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #D4AF37;
    font-size: 8px;
    background: #0A0A0A;
    padding: 0 10px;
  }
`;

const GoldEyebrow = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 20px;
`;

const GoldTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  color: #FFFFFF;
  margin-bottom: 60px;
  
  span {
    background: linear-gradient(90deg, #B8960C, #D4AF37, #F5E6C8, #D4AF37, #B8960C);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 4s linear infinite;
  }
`;

const GoldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 900px;
  margin: 0 auto 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 400px;
  }
`;

const GoldUnit = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease forwards;
  animation-delay: ${p => p.$delay}s;
`;

const GoldBox = styled.div`
  position: relative;
  background: linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%);
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 40px 20px;
  animation: ${goldPulse} 3s ease-in-out infinite;
  animation-delay: ${p => p.$delay}s;
  transition: all 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(180deg, rgba(212, 175, 55, 0.05) 0%, transparent 100%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
    background: rgba(212, 175, 55, 0.1);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(212, 175, 55, 0.2);
    border-color: rgba(212, 175, 55, 0.5);
  }

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const GoldNumber = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 300;
  line-height: 1;
  background: linear-gradient(180deg, #F5E6C8 0%, #D4AF37 50%, #B8960C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const GoldLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-top: 20px;
`;

const GoldDate = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.2rem;
  font-style: italic;
  color: rgba(255,255,255,0.5);
`;

export const GoldCountdown = () => {
  const time = useCountdown();
  const units = [
    { value: time.days, label: 'Tage' },
    { value: time.hours, label: 'Stunden' },
    { value: time.minutes, label: 'Minuten' },
    { value: time.seconds, label: 'Sekunden' },
  ];
  
  return (
    <GoldSection>
      <GoldContainer>
        <GoldDivider />
        <GoldEyebrow>Der große Tag</GoldEyebrow>
        <GoldTitle>Noch <span>{time.days}</span> Tage</GoldTitle>
        <GoldGrid>
          {units.map((unit, i) => (
            <GoldUnit key={i} $delay={i * 0.15}>
              <GoldBox $delay={i * 0.5}>
                <GoldNumber>{formatNumber(unit.value)}</GoldNumber>
              </GoldBox>
              <GoldLabel>{unit.label}</GoldLabel>
            </GoldUnit>
          ))}
        </GoldGrid>
        <GoldDate>1. Oktober 2026</GoldDate>
        <GoldDivider style={{ marginTop: '40px' }} />
      </GoldContainer>
    </GoldSection>
  );
};

// ============================================
// BOTANICAL COUNTDOWN
// Playfair Display + Lato, Sage Green, Kreisförmige Zähler
// ============================================
const BotanicalSection = styled.section`
  padding: 120px 5%;
  background: #F5F1EB;
  text-align: center;
  position: relative;
`;

const BotanicalLeaf = styled.div`
  position: absolute;
  font-size: 5rem;
  opacity: 0.08;
  color: #2D3B2D;
  
  &:nth-child(1) { top: 10%; left: 3%; transform: rotate(-30deg); }
  &:nth-child(2) { top: 15%; right: 3%; transform: rotate(30deg) scaleX(-1); }
  &:nth-child(3) { bottom: 10%; left: 8%; transform: rotate(-15deg); }
`;

const BotanicalContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const BotanicalEyebrow = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8B9D83;
  margin-bottom: 15px;
`;

const BotanicalTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  font-style: italic;
  color: #2D3B2D;
  margin-bottom: 60px;
  
  span {
    color: #8B9D83;
  }
`;

const BotanicalGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const BotanicalUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
`;

const BotanicalCircle = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 2px solid #8B9D83;
  background: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: ${pulse} 4s ease-in-out infinite;
  animation-delay: ${p => p.$delay}s;
  
  /* Decorative dashed ring */
  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    border: 1px dashed rgba(139, 157, 131, 0.3);
    border-radius: 50%;
  }
  
  @media (max-width: 600px) {
    width: 90px;
    height: 90px;
  }
`;

const BotanicalNumber = styled.span`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 500;
  color: #2D3B2D;
`;

const BotanicalLabel = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  font-style: italic;
  color: #8B9D83;
  margin-top: 15px;
  text-transform: lowercase;
`;

const BotanicalDate = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 15px;
  padding: 15px 30px;
  background: rgba(139, 157, 131, 0.1);
  border-radius: 50px;
  
  span {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1rem;
    color: #2D3B2D;
  }
`;

export const BotanicalCountdown = () => {
  const time = useCountdown();
  const units = [
    { value: time.days, label: 'tage' },
    { value: time.hours, label: 'stunden' },
    { value: time.minutes, label: 'minuten' },
    { value: time.seconds, label: 'sekunden' },
  ];
  
  return (
    <BotanicalSection>
      <BotanicalLeaf>🌿</BotanicalLeaf>
      <BotanicalLeaf>🌿</BotanicalLeaf>
      <BotanicalLeaf>🌿</BotanicalLeaf>
      <BotanicalContainer>
        <BotanicalEyebrow>Coming Soon</BotanicalEyebrow>
        <BotanicalTitle>Noch so viele <span>Momente</span></BotanicalTitle>
        <BotanicalGrid>
          {units.map((unit, i) => (
            <BotanicalUnit key={i} $delay={i * 0.1}>
              <BotanicalCircle $delay={i * 0.5}>
                <BotanicalNumber>{formatNumber(unit.value)}</BotanicalNumber>
              </BotanicalCircle>
              <BotanicalLabel>{unit.label}</BotanicalLabel>
            </BotanicalUnit>
          ))}
        </BotanicalGrid>
        <BotanicalDate>
          <span>🌱</span>
          <span>1. Oktober 2026</span>
          <span>🌱</span>
        </BotanicalDate>
      </BotanicalContainer>
    </BotanicalSection>
  );
};

// ============================================
// CONTEMPORARY COUNTDOWN
// Space Grotesk, Bold colors (Coral, Teal, Yellow), Heavy boxes
// ============================================
const ContemporarySection = styled.section`
  padding: 120px 5%;
  background: #FFFFFF;
  text-align: center;
`;

const ContemporaryContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const ContemporaryEyebrow = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FF6B6B;
  margin-bottom: 15px;
`;

const ContemporaryTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 700;
  color: #0D0D0D;
  margin-bottom: 60px;
  text-transform: uppercase;
  
  span {
    color: #FF6B6B;
  }
`;

const ContemporaryGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const contemporaryColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A855F7'];

const ContemporaryUnit = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${p => p.$delay}s;
`;

const ContemporaryBox = styled.div`
  min-width: 100px;
  padding: 30px 25px;
  background: #0D0D0D;
  border: 3px solid #0D0D0D;
  box-shadow: 6px 6px 0 ${p => p.$color};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 10px 10px 0 ${p => p.$color};
  }
  
  @media (max-width: 600px) {
    min-width: 75px;
    padding: 22px 18px;
  }
`;

const ContemporaryNumber = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 7vw, 4rem);
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1;
  display: block;
`;

const ContemporaryLabel = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.$color};
  margin-top: 15px;
  display: block;
`;

const ContemporaryDate = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background: #0D0D0D;
  color: #FFFFFF;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 600;
`;

export const ContemporaryCountdown = () => {
  const time = useCountdown();
  const units = [
    { value: time.days, label: 'Tage' },
    { value: time.hours, label: 'Stunden' },
    { value: time.minutes, label: 'Minuten' },
    { value: time.seconds, label: 'Sekunden' },
  ];
  
  return (
    <ContemporarySection>
      <ContemporaryContainer>
        <ContemporaryEyebrow>Coming Soon</ContemporaryEyebrow>
        <ContemporaryTitle>Time is <span>ticking</span></ContemporaryTitle>
        <ContemporaryGrid>
          {units.map((unit, i) => (
            <ContemporaryUnit key={i} $delay={i * 0.1}>
              <ContemporaryBox $color={contemporaryColors[i]}>
                <ContemporaryNumber>{formatNumber(unit.value)}</ContemporaryNumber>
              </ContemporaryBox>
              <ContemporaryLabel $color={contemporaryColors[i]}>{unit.label}</ContemporaryLabel>
            </ContemporaryUnit>
          ))}
        </ContemporaryGrid>
        <ContemporaryDate>
          <span>🚀</span>
          <span>1. Oktober 2026</span>
        </ContemporaryDate>
      </ContemporaryContainer>
    </ContemporarySection>
  );
};

// ============================================
// LUXE COUNTDOWN
// Cormorant Garamond + Montserrat, Dramatic numbers, Grid layout
// ============================================
const LuxeSection = styled.section`
  padding: 120px 5%;
  background: #0A0A0A;
  text-align: center;
  position: relative;
`;

const LuxeCorner = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  
  &.tl { top: 40px; left: 40px; border-right: none; border-bottom: none; }
  &.tr { top: 40px; right: 40px; border-left: none; border-bottom: none; }
  &.bl { bottom: 40px; left: 40px; border-right: none; border-top: none; }
  &.br { bottom: 40px; right: 40px; border-left: none; border-top: none; }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    &.tl, &.tr, &.bl, &.br { top: 20px; bottom: 20px; left: 20px; right: 20px; }
  }
`;

const LuxeContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const LuxeEyebrow = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: #D4AF37;
  margin-bottom: 25px;
`;

const LuxeTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 300;
  font-style: italic;
  color: #FFFFFF;
  margin-bottom: 60px;
`;

const LuxeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(212, 175, 55, 0.15);
  max-width: 900px;
  margin: 0 auto 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 400px;
  }
`;

const LuxeUnit = styled.div`
  background: #0A0A0A;
  padding: 50px 25px;
  opacity: 0;
  animation: ${fadeInUp} 0.8s ease forwards;
  animation-delay: ${p => p.$delay}s;
`;

const LuxeNumber = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(3.5rem, 10vw, 6rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1;
  background: linear-gradient(180deg, #FFFFFF 0%, #D4AF37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LuxeLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-top: 20px;
`;

const LuxeDate = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.3rem;
  font-style: italic;
  color: rgba(255,255,255,0.5);
  
  span {
    color: #D4AF37;
  }
`;

export const LuxeCountdown = () => {
  const time = useCountdown();
  const units = [
    { value: time.days, label: 'Tage' },
    { value: time.hours, label: 'Stunden' },
    { value: time.minutes, label: 'Minuten' },
    { value: time.seconds, label: 'Sekunden' },
  ];
  
  return (
    <LuxeSection>
      <LuxeCorner className="tl" />
      <LuxeCorner className="tr" />
      <LuxeCorner className="bl" />
      <LuxeCorner className="br" />
      <LuxeContainer>
        <LuxeEyebrow>Until Forever Begins</LuxeEyebrow>
        <LuxeTitle>The Countdown</LuxeTitle>
        <LuxeGrid>
          {units.map((unit, i) => (
            <LuxeUnit key={i} $delay={i * 0.15}>
              <LuxeNumber>{formatNumber(unit.value)}</LuxeNumber>
              <LuxeLabel>{unit.label}</LuxeLabel>
            </LuxeUnit>
          ))}
        </LuxeGrid>
        <LuxeDate><span>1.</span> Oktober <span>2026</span></LuxeDate>
      </LuxeContainer>
    </LuxeSection>
  );
};

// ============================================
// NEON COUNTDOWN
// Space Grotesk, Cyan/Magenta, Holographic glow, Grid background
// ============================================
const NeonSection = styled.section`
  padding: 120px 5%;
  background: #0a0a0f;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const NeonGridBg = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
`;

const NeonGlow = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  
  &:nth-child(1) { background: #00ffff; top: 0; left: 10%; }
  &:nth-child(2) { background: #ff00ff; bottom: 0; right: 10%; }
`;

const NeonContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const NeonEyebrow = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #ff00ff;
  margin-bottom: 20px;
  
  &::before { content: '[ '; color: rgba(255,255,255,0.3); }
  &::after { content: ' ]'; color: rgba(255,255,255,0.3); }
`;

const NeonTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 60px;
  text-transform: uppercase;
  
  span {
    color: #00ffff;
    text-shadow: 0 0 20px rgba(0,255,255,0.5);
  }
`;

const NeonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
  max-width: 900px;
  margin: 0 auto 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 350px;
  }
`;

const NeonUnit = styled.div`
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
`;

const NeonBox = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(0,255,255,0.3);
  padding: 35px 20px;
  position: relative;
  
  /* Scanline effect at top */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ffff, transparent);
    opacity: 0.6;
  }
  
  &:hover {
    border-color: rgba(0,255,255,0.6);
    box-shadow: 0 0 30px rgba(0,255,255,0.15);
  }
`;

const NeonNumber = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 700;
  color: #00ffff;
  line-height: 1;
  animation: ${holographicShift} 3s ease-in-out infinite;
  animation-delay: ${p => p.$delay}s;
`;

const NeonLabel = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-top: 15px;
`;

const NeonDate = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 15px;
  padding: 12px 25px;
  border: 1px solid rgba(255,0,255,0.3);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #ff00ff;
  
  span { color: rgba(255,255,255,0.6); }
`;

export const NeonCountdown = () => {
  const time = useCountdown();
  const units = [
    { value: time.days, label: 'DAYS' },
    { value: time.hours, label: 'HRS' },
    { value: time.minutes, label: 'MIN' },
    { value: time.seconds, label: 'SEC' },
  ];
  
  return (
    <NeonSection>
      <NeonGridBg />
      <NeonGlow />
      <NeonGlow />
      <NeonContainer>
        <NeonEyebrow>SYSTEM LAUNCH</NeonEyebrow>
        <NeonTitle>THE <span>COUNTDOWN</span></NeonTitle>
        <NeonGrid>
          {units.map((unit, i) => (
            <NeonUnit key={i} $delay={i * 0.1}>
              <NeonBox>
                <NeonNumber $delay={i * 0.5}>{formatNumber(unit.value)}</NeonNumber>
              </NeonBox>
              <NeonLabel>{unit.label}</NeonLabel>
            </NeonUnit>
          ))}
        </NeonGrid>
        <NeonDate>
          <span>&gt;</span> 01.10.2026 <span>&lt;</span>
        </NeonDate>
      </NeonContainer>
    </NeonSection>
  );
};

// ============================================
// EXPORT MAP
// ============================================
export const countdownComponents = {
  editorial: EditorialCountdown,
  gold: GoldCountdown,
  botanical: BotanicalCountdown,
  contemporary: ContemporaryCountdown,
  luxe: LuxeCountdown,
  neon: NeonCountdown,
};
