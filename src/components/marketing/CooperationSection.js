// src/components/marketing/CooperationSection.js
// "Kooperationen" - 6 verschiedene Layout-Logiken:
// Editorial: Magazin-Style mit rotem Akzent
// Botanical: Glassmorphism-Card mit sanftem Blur
// Contemporary: Brutalist Box mit farbigem Schatten
// Luxe: Eleganter goldener Rahmen
// Neon: Terminal/Cyber Style
// Video: Minimalistisch mit blauem Akzent (Default)
import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// CONTENT DATA
// ============================================
const CONTENT = {
  eyebrow: 'Zusammenarbeit',
  title: 'Kooperationen',
  subtitle: 'Andere Projekte im Kopf? Wir sind offen für spannende Zusammenarbeiten.',
  text: 'Ob Hochzeitsplaner, Fotografen, Locations oder andere Dienstleister – wir freuen uns über Kooperationsanfragen. Meldet euch einfach über unser Kontaktformular.',
  button: 'Kontakt aufnehmen',
};

// ============================================
// EDITORIAL - Magazin Style
// ============================================
const EditorialSection = styled.section`
  padding: clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem);
  background: #FAFAFA;
`;

const EditorialContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
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
  margin-bottom: 1rem;
`;

const EditorialSubtitle = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1.2rem;
  font-style: italic;
  color: #525252;
  margin-bottom: 1.5rem;
`;

const EditorialText = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const EditorialButton = styled.button`
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  color: #FAFAFA;
  background: #C41E3A;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #a01830;
  }
`;

// ============================================
// CLASSIC - Warm Elegant Card
// ============================================
const ClassicSection = styled.section`
  padding: clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem);
  background: #FDFCFA;
`;

const ClassicContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const ClassicEyebrow = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.25em;
  color: #C4A87C;
  margin-bottom: 1rem;
`;

const ClassicTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: #1A1A1A;
  margin-bottom: 1rem;
`;

const ClassicSubtitle = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 300;
  color: #555;
  margin-bottom: 1.5rem;
`;

const ClassicText = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #555;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ClassicButton = styled.button`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.15em;
  padding: 1rem 2.5rem;
  color: #FDFCFA;
  background: #C4A87C;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #b0956a;
  }
`;

// ============================================
// BOTANICAL - Glassmorphism Card
// ============================================
const BotanicalSection = styled.section`
  padding: clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem);
  background: transparent;
  position: relative;
  z-index: 10;
`;

const BotanicalContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const BotanicalCard = styled.div`
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
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
  font-size: clamp(2rem, 5vw, 2.5rem);
  font-weight: 300;
  color: rgba(255,255,255,0.95);
  margin-bottom: 1rem;
`;

const BotanicalSubtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(255,255,255,0.7);
  margin-bottom: 1.5rem;
`;

const BotanicalText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const BotanicalButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  color: #040604;
  background: rgba(255,255,255,0.95);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    transform: translateY(-2px);
  }
`;

// ============================================
// CONTEMPORARY - Brutalist Box
// ============================================
const ContemporarySection = styled.section`
  padding: clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem);
  background: #FAFAFA;
`;

const ContemporaryContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const ContemporaryCard = styled.div`
  background: #FFE66D;
  border: 3px solid #0D0D0D;
  padding: clamp(2rem, 5vw, 3rem);
  box-shadow: 8px 8px 0 #9B5DE5;
  text-align: center;
`;

const ContemporaryTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 0.75rem;
`;

const ContemporarySubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: #525252;
  margin-bottom: 1.25rem;
`;

const ContemporaryText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  color: #525252;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const ContemporaryButton = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  color: #FAFAFA;
  background: #4ECDC4;
  border: 3px solid #0D0D0D;
  box-shadow: 5px 5px 0 #0D0D0D;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 8px 8px 0 #0D0D0D;
  }
`;

// ============================================
// LUXE - Elegant Gold Frame
// ============================================
const LuxeSection = styled.section`
  padding: clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem);
  background: #0A0A0A;
`;

const LuxeContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const LuxeCard = styled.div`
  border: 1px solid rgba(201, 169, 98, 0.3);
  padding: clamp(2.5rem, 6vw, 4rem);
  text-align: center;
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
  margin-bottom: 1rem;
`;

const LuxeSubtitle = styled.p`
  font-family: 'Cormorant', serif;
  font-size: 1.15rem;
  font-weight: 400;
  font-style: italic;
  color: rgba(248,246,243,0.7);
  margin-bottom: 1.5rem;
`;

const LuxeText = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(248,246,243,0.5);
  line-height: 1.9;
  margin-bottom: 2.5rem;
`;

const LuxeButton = styled.button`
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  color: #0A0A0A;
  background: #C9A962;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #d4b66f;
  }
`;

// ============================================
// NEON - Terminal/Cyber Style
// ============================================
const NeonSection = styled.section`
  padding: clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem);
  background: #0a0a0f;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 50%, rgba(0,255,255,0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const NeonContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const NeonCard = styled.div`
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,0,255,0.3);
  border-radius: 8px;
  padding: clamp(2rem, 5vw, 3rem);
  text-align: center;
`;

const NeonTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #ff00ff;
  text-shadow: 0 0 20px rgba(255,0,255,0.5);
  margin-bottom: 0.75rem;
`;

const NeonSubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: rgba(255,255,255,0.7);
  margin-bottom: 1.25rem;
`;

const NeonText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const NeonButton = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 1rem 2rem;
  color: #00ffff;
  background: transparent;
  border: 1px solid #00ffff;
  box-shadow: 0 0 15px rgba(0,255,255,0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0,255,255,0.1);
    box-shadow: 0 0 25px rgba(0,255,255,0.5);
  }
`;

// ============================================
// VIDEO - Minimalist Blue Accent (Default)
// ============================================
const VideoSection = styled.section`
  padding: clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem);
  background: #0A0A0A;
`;

const VideoContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const VideoCard = styled.div`
  border: 1px solid rgba(107, 140, 174, 0.3);
  padding: clamp(2.5rem, 6vw, 4rem);
  text-align: center;
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
  margin-bottom: 1.5rem;
`;

const VideoText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #B0B0B0;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const VideoButton = styled.button`
  font-family: 'Manrope', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  color: #FFFFFF;
  background: transparent;
  border: 1px solid #6B8CAE;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(107, 140, 174, 0.1);
    border-color: #8FACC4;
  }
`;

// ============================================
// MAIN COMPONENT
// ============================================
const CooperationSection = () => {
  const { currentTheme } = useTheme();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ==========================================
  // CLASSIC
  // ==========================================
  if (currentTheme === 'classic') {
    return (
      <ClassicSection id="cooperation">
        <ClassicContainer>
          <ClassicEyebrow>{CONTENT.eyebrow}</ClassicEyebrow>
          <ClassicTitle>{CONTENT.title}</ClassicTitle>
          <ClassicSubtitle>{CONTENT.subtitle}</ClassicSubtitle>
          <ClassicText>{CONTENT.text}</ClassicText>
          <ClassicButton onClick={scrollToContact}>
            {CONTENT.button}
          </ClassicButton>
        </ClassicContainer>
      </ClassicSection>
    );
  }

  // ==========================================
  // EDITORIAL
  // ==========================================
  if (currentTheme === 'editorial') {
    return (
      <EditorialSection id="cooperation">
        <EditorialContainer>
          <EditorialEyebrow>{CONTENT.eyebrow}</EditorialEyebrow>
          <EditorialTitle>{CONTENT.title}</EditorialTitle>
          <EditorialSubtitle>{CONTENT.subtitle}</EditorialSubtitle>
          <EditorialText>{CONTENT.text}</EditorialText>
          <EditorialButton onClick={scrollToContact}>
            {CONTENT.button}
          </EditorialButton>
        </EditorialContainer>
      </EditorialSection>
    );
  }

  // ==========================================
  // BOTANICAL
  // ==========================================
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="cooperation">
        <BotanicalContainer>
          <BotanicalCard>
            <BotanicalEyebrow>{CONTENT.eyebrow}</BotanicalEyebrow>
            <BotanicalTitle>{CONTENT.title}</BotanicalTitle>
            <BotanicalSubtitle>{CONTENT.subtitle}</BotanicalSubtitle>
            <BotanicalText>{CONTENT.text}</BotanicalText>
            <BotanicalButton onClick={scrollToContact}>
              {CONTENT.button}
            </BotanicalButton>
          </BotanicalCard>
        </BotanicalContainer>
      </BotanicalSection>
    );
  }

  // ==========================================
  // CONTEMPORARY
  // ==========================================
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="cooperation">
        <ContemporaryContainer>
          <ContemporaryCard>
            <ContemporaryTitle>{CONTENT.title}</ContemporaryTitle>
            <ContemporarySubtitle>{CONTENT.subtitle}</ContemporarySubtitle>
            <ContemporaryText>{CONTENT.text}</ContemporaryText>
            <ContemporaryButton onClick={scrollToContact}>
              {CONTENT.button} &rarr;
            </ContemporaryButton>
          </ContemporaryCard>
        </ContemporaryContainer>
      </ContemporarySection>
    );
  }

  // ==========================================
  // LUXE
  // ==========================================
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="cooperation">
        <LuxeContainer>
          <LuxeCard>
            <LuxeEyebrow>{CONTENT.eyebrow}</LuxeEyebrow>
            <LuxeTitle>{CONTENT.title}</LuxeTitle>
            <LuxeSubtitle>{CONTENT.subtitle}</LuxeSubtitle>
            <LuxeText>{CONTENT.text}</LuxeText>
            <LuxeButton onClick={scrollToContact}>
              {CONTENT.button}
            </LuxeButton>
          </LuxeCard>
        </LuxeContainer>
      </LuxeSection>
    );
  }

  // ==========================================
  // NEON
  // ==========================================
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="cooperation">
        <NeonContainer>
          <NeonCard>
            <NeonTitle>// {CONTENT.title}</NeonTitle>
            <NeonSubtitle>{CONTENT.subtitle}</NeonSubtitle>
            <NeonText>{CONTENT.text}</NeonText>
            <NeonButton onClick={scrollToContact}>
              contact.open()
            </NeonButton>
          </NeonCard>
        </NeonContainer>
      </NeonSection>
    );
  }

  // ==========================================
  // VIDEO (Default)
  // ==========================================
  return (
    <VideoSection id="cooperation">
      <VideoContainer>
        <VideoCard>
          <VideoEyebrow>{CONTENT.eyebrow}</VideoEyebrow>
          <VideoTitle>{CONTENT.title}</VideoTitle>
          <VideoSubtitle>{CONTENT.subtitle}</VideoSubtitle>
          <VideoText>{CONTENT.text}</VideoText>
          <VideoButton onClick={scrollToContact}>
            {CONTENT.button}
          </VideoButton>
        </VideoCard>
      </VideoContainer>
    </VideoSection>
  );
};

export default CooperationSection;
