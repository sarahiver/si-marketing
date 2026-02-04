// src/components/marketing/AboutSection.js
// 1:1 Theme-Designs aus si-wedding-themes
import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const Section = styled.section`padding: clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem);`;
const Container = styled.div`max-width: 900px; margin: 0 auto;`;
const Header = styled.div`text-align: center; margin-bottom: 3rem;`;

// EDITORIAL
const EditorialSection = styled(Section)`background: #FAFAFA;`;
const EditorialEyebrow = styled.p`font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #C41E3A; margin-bottom: 1rem;`;
const EditorialTitle = styled.h2`font-family: 'Oswald', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #0A0A0A; margin-bottom: 1rem;`;
const EditorialContent = styled.div`display: grid; gap: 2rem; @media (min-width: 768px) { grid-template-columns: 1fr 1fr; gap: 4rem; }`;
const EditorialText = styled.p`font-family: 'Inter', sans-serif; font-size: 1rem; color: #525252; line-height: 1.8;`;
const EditorialHighlight = styled.div`padding: 2rem; background: #0A0A0A; border-left: 4px solid #C41E3A;`;
const EditorialQuote = styled.p`font-family: 'Source Serif 4', serif; font-size: 1.2rem; font-style: italic; color: #FAFAFA; line-height: 1.6;`;

// BOTANICAL
const BotanicalSection = styled(Section)`background: #040604; position: relative; &::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, rgba(45, 90, 60, 0.08) 0%, transparent 50%); }`;
const BotanicalEyebrow = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 1rem;`;
const BotanicalTitle = styled.h2`font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; color: rgba(255,255,255,0.95); margin-bottom: 1rem;`;
const BotanicalCard = styled.div`position: relative; z-index: 1; background: rgba(255,255,255,0.06); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 3rem; text-align: center;`;
const BotanicalText = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.95rem; color: rgba(255,255,255,0.7); line-height: 1.8; margin-bottom: 2rem;`;
const BotanicalQuote = styled.p`font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-style: italic; color: rgba(255,255,255,0.95); line-height: 1.5;`;

// CONTEMPORARY
const ContemporarySection = styled(Section)`background: #4ECDC4;`;
const ContemporaryEyebrow = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #0D0D0D; margin-bottom: 1rem;`;
const ContemporaryTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #0D0D0D; margin-bottom: 1rem;`;
const ContemporaryCard = styled.div`background: #fff; border: 3px solid #0D0D0D; padding: 2.5rem; box-shadow: 8px 8px 0 #0D0D0D;`;
const ContemporaryText = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 1rem; color: #525252; line-height: 1.7; margin-bottom: 2rem;`;
const ContemporaryHighlight = styled.div`background: #FFE66D; border: 2px solid #0D0D0D; padding: 1.5rem; margin-top: 1.5rem;`;
const ContemporaryQuote = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 700; color: #0D0D0D;`;

// LUXE
const LuxeSection = styled(Section)`background: #0A0A0A;`;
const LuxeEyebrow = styled.p`font-family: 'Outfit', sans-serif; font-size: 0.7rem; letter-spacing: 0.4em; text-transform: uppercase; color: #C9A962; margin-bottom: 1rem;`;
const LuxeTitle = styled.h2`font-family: 'Cormorant', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; font-style: italic; color: #F8F6F3; margin-bottom: 1rem;`;
const LuxeDivider = styled.div`width: 80px; height: 1px; background: #C9A962; margin: 2rem auto;`;
const LuxeText = styled.p`font-family: 'Outfit', sans-serif; font-size: 0.95rem; color: rgba(248,246,243,0.7); line-height: 1.9; text-align: center;`;
const LuxeQuote = styled.p`font-family: 'Cormorant', serif; font-size: 1.4rem; font-style: italic; color: #F8F6F3; text-align: center; margin-top: 2rem;`;

// NEON
const NeonSection = styled(Section)`background: #0a0a0f; position: relative; &::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 30%, rgba(0,255,255,0.05) 0%, transparent 50%); }`;
const NeonEyebrow = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; letter-spacing: 0.3em; text-transform: uppercase; color: #ff00ff; text-shadow: 0 0 10px rgba(255,0,255,0.5); margin-bottom: 1rem;`;
const NeonTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 1rem;`;
const NeonCard = styled.div`position: relative; z-index: 1; background: rgba(255,255,255,0.02); border: 1px solid rgba(0,255,255,0.2); padding: 2.5rem;`;
const NeonText = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.7); line-height: 1.8; margin-bottom: 2rem;`;
const NeonQuote = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.3);`;

// VIDEO
const VideoSection = styled(Section)`background: #0A0A0A;`;
const VideoEyebrow = styled.p`font-family: 'Inter', sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6B8CAE; margin-bottom: 1rem;`;
const VideoTitle = styled.h2`font-family: 'Manrope', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; color: #fff; margin-bottom: 1rem;`;
const VideoDivider = styled.div`width: 80px; height: 1px; background: #6B8CAE; margin: 2rem auto;`;
const VideoText = styled.p`font-family: 'Inter', sans-serif; font-size: 1rem; color: #B0B0B0; line-height: 1.8; text-align: center;`;
const VideoQuote = styled.p`font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-style: italic; color: #fff; text-align: center; margin-top: 2rem;`;

const AboutSection = () => {
  const { currentTheme } = useTheme();

  const aboutText = "Wir sind ein kleines Team aus Hamburg mit der Leidenschaft für schöne Webdesigns und der Überzeugung, dass jede Hochzeit etwas Besonderes verdient. Unsere Mission ist es, Paaren eine digitale Plattform zu bieten, die genauso einzigartig ist wie ihre Liebe.";
  const quoteText = "\"Jede Liebesgeschichte verdient eine wunderschöne digitale Bühne.\"";

  if (currentTheme === 'editorial') return (
    <EditorialSection id="about"><Container><Header><EditorialEyebrow>Über uns</EditorialEyebrow><EditorialTitle>Wer wir sind</EditorialTitle></Header><EditorialContent><div><EditorialText>{aboutText}</EditorialText><EditorialText>Mit jahrelanger Erfahrung im Webdesign und einem Auge für Details erstellen wir Hochzeitswebsites, die nicht nur funktional, sondern auch ästhetisch überzeugen.</EditorialText></div><EditorialHighlight><EditorialQuote>{quoteText}</EditorialQuote></EditorialHighlight></EditorialContent></Container></EditorialSection>
  );

  if (currentTheme === 'botanical') return (
    <BotanicalSection id="about"><Container style={{ position: 'relative', zIndex: 1 }}><Header><BotanicalEyebrow>Über uns</BotanicalEyebrow><BotanicalTitle>Wer wir sind</BotanicalTitle></Header><BotanicalCard><BotanicalText>{aboutText}</BotanicalText><BotanicalQuote>{quoteText}</BotanicalQuote></BotanicalCard></Container></BotanicalSection>
  );

  if (currentTheme === 'contemporary') return (
    <ContemporarySection id="about"><Container><Header><ContemporaryEyebrow>👋 Hey!</ContemporaryEyebrow><ContemporaryTitle>Das sind wir</ContemporaryTitle></Header><ContemporaryCard><ContemporaryText>{aboutText}</ContemporaryText><ContemporaryText>Wir glauben daran, dass Hochzeitswebsites genauso viel Spaß machen sollten wie die Hochzeit selbst! 🎉</ContemporaryText><ContemporaryHighlight><ContemporaryQuote>Made with ❤️ in Hamburg</ContemporaryQuote></ContemporaryHighlight></ContemporaryCard></Container></ContemporarySection>
  );

  if (currentTheme === 'luxe') return (
    <LuxeSection id="about"><Container><Header><LuxeEyebrow>Über uns</LuxeEyebrow><LuxeTitle>Unsere Philosophie</LuxeTitle></Header><LuxeDivider /><LuxeText>{aboutText}</LuxeText><LuxeQuote>{quoteText}</LuxeQuote></Container></LuxeSection>
  );

  if (currentTheme === 'neon') return (
    <NeonSection id="about"><Container style={{ position: 'relative', zIndex: 1 }}><Header><NeonEyebrow>// About.info</NeonEyebrow><NeonTitle>Who We Are</NeonTitle></Header><NeonCard><NeonText>{aboutText}</NeonText><NeonQuote>{">"} Digitale Hochzeits-Experience der nächsten Generation</NeonQuote></NeonCard></Container></NeonSection>
  );

  return (
    <VideoSection id="about"><Container><Header><VideoEyebrow>Über uns</VideoEyebrow><VideoTitle>Wer wir sind</VideoTitle></Header><VideoDivider /><VideoText>{aboutText}</VideoText><VideoQuote>{quoteText}</VideoQuote></Container></VideoSection>
  );
};

export default AboutSection;
