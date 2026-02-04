// src/components/marketing/FeaturesSection.js
// 1:1 Theme-Designs aus si-wedding-themes
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const FEATURES = [
  { icon: '📱', title: 'Responsive Design', desc: 'Perfekt auf allen Geräten - Desktop, Tablet & Smartphone' },
  { icon: '🎨', title: '6 Einzigartige Themes', desc: 'Von elegant bis modern - findet euren Stil' },
  { icon: '✉️', title: 'RSVP System', desc: 'Digitale Zusagen mit automatischer Gästeliste' },
  { icon: '📸', title: 'Fotogalerie', desc: 'Teilt eure schönsten Momente mit euren Gästen' },
  { icon: '🗓️', title: 'Countdown', desc: 'Zählt gemeinsam die Tage bis zum großen Tag' },
  { icon: '📖', title: 'Gästebuch', desc: 'Sammelt Glückwünsche und Erinnerungen' },
];

const Section = styled.section`padding: clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem);`;
const Container = styled.div`max-width: 1200px; margin: 0 auto;`;
const Header = styled.div`text-align: center; margin-bottom: 4rem;`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;`;

// EDITORIAL
const EditorialSection = styled(Section)`background: #0A0A0A;`;
const EditorialEyebrow = styled.p`font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #C41E3A; margin-bottom: 1rem;`;
const EditorialTitle = styled.h2`font-family: 'Oswald', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #FAFAFA; margin-bottom: 1rem;`;
const EditorialSubtitle = styled.p`font-family: 'Source Serif 4', serif; font-size: 1.1rem; font-style: italic; color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto;`;
const EditorialCard = styled.div`padding: 2rem; border-left: 3px solid #C41E3A; background: rgba(255,255,255,0.02); transition: all 0.3s; &:hover { background: rgba(255,255,255,0.05); transform: translateX(10px); }`;
const EditorialIcon = styled.div`font-size: 2rem; margin-bottom: 1rem;`;
const EditorialCardTitle = styled.h3`font-family: 'Oswald', sans-serif; font-size: 1.3rem; font-weight: 700; text-transform: uppercase; color: #FAFAFA; margin-bottom: 0.5rem;`;
const EditorialCardDesc = styled.p`font-family: 'Inter', sans-serif; font-size: 0.9rem; color: rgba(255,255,255,0.6); line-height: 1.6;`;

// BOTANICAL
const BotanicalSection = styled(Section)`background: #040604; position: relative; &::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 20%, rgba(45, 90, 60, 0.1) 0%, transparent 50%); }`;
const BotanicalEyebrow = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 1rem;`;
const BotanicalTitle = styled.h2`font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; color: rgba(255,255,255,0.95); margin-bottom: 1rem;`;
const BotanicalSubtitle = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.85rem; color: rgba(255,255,255,0.5); max-width: 600px; margin: 0 auto;`;
const BotanicalCard = styled.div`position: relative; z-index: 1; background: rgba(255,255,255,0.06); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 2rem; text-align: center; transition: all 0.4s; &:hover { background: rgba(255,255,255,0.1); transform: translateY(-5px); }`;
const BotanicalIcon = styled.div`font-size: 2.5rem; margin-bottom: 1.5rem;`;
const BotanicalCardTitle = styled.h3`font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: rgba(255,255,255,0.95); margin-bottom: 0.5rem;`;
const BotanicalCardDesc = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.8rem; color: rgba(255,255,255,0.6); line-height: 1.6;`;

// CONTEMPORARY
const ContemporarySection = styled(Section)`background: #FAFAFA;`;
const ContemporaryEyebrow = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #FF6B6B; margin-bottom: 1rem;`;
const ContemporaryTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #0D0D0D; margin-bottom: 1rem;`;
const ContemporarySubtitle = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 1rem; color: #737373; max-width: 600px; margin: 0 auto;`;
const ContemporaryCard = styled.div`background: #fff; border: 3px solid #0D0D0D; padding: 2rem; box-shadow: 6px 6px 0 ${p => ['#FF6B6B', '#4ECDC4', '#FFE66D', '#9B5DE5', '#FF6B6B', '#4ECDC4'][p.$i % 6]}; transition: all 0.3s; &:hover { transform: translate(-4px, -4px); box-shadow: 10px 10px 0 ${p => ['#FF6B6B', '#4ECDC4', '#FFE66D', '#9B5DE5', '#FF6B6B', '#4ECDC4'][p.$i % 6]}; }`;
const ContemporaryIcon = styled.div`font-size: 2.5rem; margin-bottom: 1rem;`;
const ContemporaryCardTitle = styled.h3`font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700; text-transform: uppercase; color: #0D0D0D; margin-bottom: 0.5rem;`;
const ContemporaryCardDesc = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem; color: #525252; line-height: 1.5;`;

// LUXE
const LuxeSection = styled(Section)`background: #0A0A0A;`;
const LuxeEyebrow = styled.p`font-family: 'Outfit', sans-serif; font-size: 0.7rem; letter-spacing: 0.4em; text-transform: uppercase; color: #C9A962; margin-bottom: 1rem;`;
const LuxeTitle = styled.h2`font-family: 'Cormorant', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; font-style: italic; color: #F8F6F3; margin-bottom: 1rem;`;
const LuxeSubtitle = styled.p`font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(248,246,243,0.6); max-width: 600px; margin: 0 auto;`;
const LuxeCard = styled.div`padding: 2.5rem; border: 1px solid rgba(248,246,243,0.1); text-align: center; transition: all 0.5s; &:hover { border-color: #C9A962; }`;
const LuxeIcon = styled.div`font-size: 2rem; margin-bottom: 1.5rem; opacity: 0.8;`;
const LuxeCardTitle = styled.h3`font-family: 'Cormorant', serif; font-size: 1.4rem; font-weight: 300; font-style: italic; color: #F8F6F3; margin-bottom: 0.75rem;`;
const LuxeCardDesc = styled.p`font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: rgba(248,246,243,0.5); line-height: 1.6;`;

// NEON
const NeonSection = styled(Section)`background: #0a0a0f; position: relative; &::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 70%, rgba(255,0,255,0.05) 0%, transparent 50%); }`;
const NeonEyebrow = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; letter-spacing: 0.3em; text-transform: uppercase; color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5); margin-bottom: 1rem;`;
const NeonTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 1rem;`;
const NeonSubtitle = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.5); max-width: 600px; margin: 0 auto;`;
const NeonCard = styled.div`position: relative; z-index: 1; background: rgba(255,255,255,0.02); border: 1px solid rgba(0,255,255,0.2); padding: 2rem; text-align: center; transition: all 0.3s; &:hover { border-color: #00ffff; box-shadow: 0 0 20px rgba(0,255,255,0.2); }`;
const NeonIcon = styled.div`font-size: 2.5rem; margin-bottom: 1rem; filter: drop-shadow(0 0 10px rgba(0,255,255,0.5));`;
const NeonCardTitle = styled.h3`font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 0.5rem;`;
const NeonCardDesc = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem; color: rgba(255,255,255,0.6); line-height: 1.5;`;

// VIDEO
const VideoSection = styled(Section)`background: #0A0A0A;`;
const VideoEyebrow = styled.p`font-family: 'Inter', sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6B8CAE; margin-bottom: 1rem;`;
const VideoTitle = styled.h2`font-family: 'Manrope', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; color: #fff; margin-bottom: 1rem;`;
const VideoSubtitle = styled.p`font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-style: italic; color: #B0B0B0; max-width: 600px; margin: 0 auto;`;
const VideoCard = styled.div`padding: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); transition: all 0.3s; &:hover { border-color: #6B8CAE; background: rgba(107,140,174,0.05); }`;
const VideoIcon = styled.div`font-size: 2rem; margin-bottom: 1rem;`;
const VideoCardTitle = styled.h3`font-family: 'Manrope', sans-serif; font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;`;
const VideoCardDesc = styled.p`font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #B0B0B0; line-height: 1.6;`;

const FeaturesSection = () => {
  const { currentTheme } = useTheme();

  if (currentTheme === 'editorial') return (
    <EditorialSection id="features"><Container><Header><EditorialEyebrow>Features</EditorialEyebrow><EditorialTitle>Alles was ihr braucht</EditorialTitle><EditorialSubtitle>Professionelle Funktionen für eure perfekte Hochzeitswebsite</EditorialSubtitle></Header><Grid>{FEATURES.map((f, i) => <EditorialCard key={i}><EditorialIcon>{f.icon}</EditorialIcon><EditorialCardTitle>{f.title}</EditorialCardTitle><EditorialCardDesc>{f.desc}</EditorialCardDesc></EditorialCard>)}</Grid></Container></EditorialSection>
  );

  if (currentTheme === 'botanical') return (
    <BotanicalSection id="features"><Container style={{ position: 'relative', zIndex: 1 }}><Header><BotanicalEyebrow>Features</BotanicalEyebrow><BotanicalTitle>Alles was ihr braucht</BotanicalTitle><BotanicalSubtitle>Professionelle Funktionen für eure perfekte Hochzeitswebsite</BotanicalSubtitle></Header><Grid>{FEATURES.map((f, i) => <BotanicalCard key={i}><BotanicalIcon>{f.icon}</BotanicalIcon><BotanicalCardTitle>{f.title}</BotanicalCardTitle><BotanicalCardDesc>{f.desc}</BotanicalCardDesc></BotanicalCard>)}</Grid></Container></BotanicalSection>
  );

  if (currentTheme === 'contemporary') return (
    <ContemporarySection id="features"><Container><Header><ContemporaryEyebrow>🚀 Features</ContemporaryEyebrow><ContemporaryTitle>Was ihr bekommt</ContemporaryTitle><ContemporarySubtitle>Alles für die perfekte digitale Hochzeitseinladung!</ContemporarySubtitle></Header><Grid>{FEATURES.map((f, i) => <ContemporaryCard key={i} $i={i}><ContemporaryIcon>{f.icon}</ContemporaryIcon><ContemporaryCardTitle>{f.title}</ContemporaryCardTitle><ContemporaryCardDesc>{f.desc}</ContemporaryCardDesc></ContemporaryCard>)}</Grid></Container></ContemporarySection>
  );

  if (currentTheme === 'luxe') return (
    <LuxeSection id="features"><Container><Header><LuxeEyebrow>Ausstattung</LuxeEyebrow><LuxeTitle>Exklusive Features</LuxeTitle><LuxeSubtitle>Erstklassige Funktionen für Ihren besonderen Anlass</LuxeSubtitle></Header><Grid>{FEATURES.map((f, i) => <LuxeCard key={i}><LuxeIcon>{f.icon}</LuxeIcon><LuxeCardTitle>{f.title}</LuxeCardTitle><LuxeCardDesc>{f.desc}</LuxeCardDesc></LuxeCard>)}</Grid></Container></LuxeSection>
  );

  if (currentTheme === 'neon') return (
    <NeonSection id="features"><Container style={{ position: 'relative', zIndex: 1 }}><Header><NeonEyebrow>// Features.load()</NeonEyebrow><NeonTitle>System Modules</NeonTitle><NeonSubtitle>Next-gen wedding website components</NeonSubtitle></Header><Grid>{FEATURES.map((f, i) => <NeonCard key={i}><NeonIcon>{f.icon}</NeonIcon><NeonCardTitle>{f.title}</NeonCardTitle><NeonCardDesc>{f.desc}</NeonCardDesc></NeonCard>)}</Grid></Container></NeonSection>
  );

  return (
    <VideoSection id="features"><Container><Header><VideoEyebrow>Features</VideoEyebrow><VideoTitle>Alles was ihr braucht</VideoTitle><VideoSubtitle>Professionelle Funktionen für eure perfekte Hochzeitswebsite</VideoSubtitle></Header><Grid>{FEATURES.map((f, i) => <VideoCard key={i}><VideoIcon>{f.icon}</VideoIcon><VideoCardTitle>{f.title}</VideoCardTitle><VideoCardDesc>{f.desc}</VideoCardDesc></VideoCard>)}</Grid></Container></VideoSection>
  );
};

export default FeaturesSection;
