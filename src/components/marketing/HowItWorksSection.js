// src/components/marketing/HowItWorksSection.js
// 1:1 Theme-Designs aus si-wedding-themes
import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const STEPS = [
  { num: '01', title: 'Theme wählen', desc: 'Wählt aus 6 einzigartigen Designs euren Favoriten' },
  { num: '02', title: 'Inhalte liefern', desc: 'Füllt unser einfaches Formular mit euren Infos & Fotos aus' },
  { num: '03', title: 'Wir gestalten', desc: 'Unser Team erstellt eure individuelle Hochzeitswebsite' },
  { num: '04', title: 'Online gehen', desc: 'Eure fertige Website geht live - bereit für eure Gäste!' },
];

const Section = styled.section`padding: clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem);`;
const Container = styled.div`max-width: 1000px; margin: 0 auto;`;
const Header = styled.div`text-align: center; margin-bottom: 4rem;`;
const Steps = styled.div`display: grid; gap: 2rem; @media (min-width: 768px) { grid-template-columns: repeat(4, 1fr); }`;

// EDITORIAL
const EditorialSection = styled(Section)`background: #0A0A0A;`;
const EditorialEyebrow = styled.p`font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #C41E3A; margin-bottom: 1rem;`;
const EditorialTitle = styled.h2`font-family: 'Oswald', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #FAFAFA; margin-bottom: 1rem;`;
const EditorialStep = styled.div`text-align: center; position: relative; &:not(:last-child)::after { content: ''; position: absolute; top: 2rem; right: -1rem; width: 2rem; height: 2px; background: #C41E3A; @media (max-width: 767px) { display: none; } }`;
const EditorialNum = styled.div`font-family: 'Oswald', sans-serif; font-size: 3rem; font-weight: 700; color: #C41E3A; margin-bottom: 1rem;`;
const EditorialStepTitle = styled.h3`font-family: 'Oswald', sans-serif; font-size: 1rem; font-weight: 700; text-transform: uppercase; color: #FAFAFA; margin-bottom: 0.5rem;`;
const EditorialStepDesc = styled.p`font-family: 'Inter', sans-serif; font-size: 0.85rem; color: rgba(255,255,255,0.6);`;

// BOTANICAL
const BotanicalSection = styled(Section)`background: #040604; position: relative; &::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 20% 80%, rgba(45, 90, 60, 0.1) 0%, transparent 50%); }`;
const BotanicalEyebrow = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 1rem;`;
const BotanicalTitle = styled.h2`font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; color: rgba(255,255,255,0.95); margin-bottom: 1rem;`;
const BotanicalStep = styled.div`position: relative; z-index: 1; background: rgba(255,255,255,0.06); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 2rem; text-align: center;`;
const BotanicalNum = styled.div`font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; font-weight: 300; color: rgba(255,255,255,0.95); margin-bottom: 1rem;`;
const BotanicalStepTitle = styled.h3`font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: rgba(255,255,255,0.95); margin-bottom: 0.5rem;`;
const BotanicalStepDesc = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.8rem; color: rgba(255,255,255,0.6);`;

// CONTEMPORARY
const ContemporarySection = styled(Section)`background: #FAFAFA;`;
const ContemporaryEyebrow = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #FF6B6B; margin-bottom: 1rem;`;
const ContemporaryTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #0D0D0D; margin-bottom: 1rem;`;
const ContemporaryStep = styled.div`background: #fff; border: 3px solid #0D0D0D; padding: 1.5rem; box-shadow: 6px 6px 0 ${p => ['#FF6B6B', '#4ECDC4', '#FFE66D', '#9B5DE5'][p.$i]}; text-align: center; transition: all 0.3s; &:hover { transform: translate(-3px, -3px); box-shadow: 9px 9px 0 ${p => ['#FF6B6B', '#4ECDC4', '#FFE66D', '#9B5DE5'][p.$i]}; }`;
const ContemporaryNum = styled.div`font-family: 'Space Grotesk', sans-serif; font-size: 2.5rem; font-weight: 700; color: #0D0D0D; margin-bottom: 0.5rem;`;
const ContemporaryStepTitle = styled.h3`font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 700; text-transform: uppercase; color: #0D0D0D; margin-bottom: 0.5rem;`;
const ContemporaryStepDesc = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; color: #525252;`;

// LUXE
const LuxeSection = styled(Section)`background: #0A0A0A;`;
const LuxeEyebrow = styled.p`font-family: 'Outfit', sans-serif; font-size: 0.7rem; letter-spacing: 0.4em; text-transform: uppercase; color: #C9A962; margin-bottom: 1rem;`;
const LuxeTitle = styled.h2`font-family: 'Cormorant', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; font-style: italic; color: #F8F6F3; margin-bottom: 1rem;`;
const LuxeStep = styled.div`text-align: center; padding: 2rem; border: 1px solid rgba(248,246,243,0.1); transition: all 0.5s; &:hover { border-color: #C9A962; }`;
const LuxeNum = styled.div`font-family: 'Cormorant', serif; font-size: 2.5rem; font-weight: 300; font-style: italic; color: #C9A962; margin-bottom: 1rem;`;
const LuxeStepTitle = styled.h3`font-family: 'Cormorant', serif; font-size: 1.2rem; font-weight: 300; font-style: italic; color: #F8F6F3; margin-bottom: 0.5rem;`;
const LuxeStepDesc = styled.p`font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: rgba(248,246,243,0.5);`;

// NEON
const NeonSection = styled(Section)`background: #0a0a0f; position: relative; &::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 20%, rgba(255,0,255,0.05) 0%, transparent 50%); }`;
const NeonEyebrow = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; letter-spacing: 0.3em; text-transform: uppercase; color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5); margin-bottom: 1rem;`;
const NeonTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 1rem;`;
const NeonStep = styled.div`position: relative; z-index: 1; background: rgba(255,255,255,0.02); border: 1px solid rgba(0,255,255,0.2); padding: 2rem; text-align: center; transition: all 0.3s; &:hover { border-color: #00ffff; box-shadow: 0 0 20px rgba(0,255,255,0.2); }`;
const NeonNum = styled.div`font-family: 'Space Grotesk', sans-serif; font-size: 2.5rem; font-weight: 700; color: #00ffff; text-shadow: 0 0 15px rgba(0,255,255,0.5); margin-bottom: 0.5rem;`;
const NeonStepTitle = styled.h3`font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 0.5rem;`;
const NeonStepDesc = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; color: rgba(255,255,255,0.6);`;

// VIDEO
const VideoSection = styled(Section)`background: #0A0A0A;`;
const VideoEyebrow = styled.p`font-family: 'Inter', sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6B8CAE; margin-bottom: 1rem;`;
const VideoTitle = styled.h2`font-family: 'Manrope', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; color: #fff; margin-bottom: 1rem;`;
const VideoStep = styled.div`text-align: center; padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); transition: all 0.3s; &:hover { border-color: #6B8CAE; }`;
const VideoNum = styled.div`font-family: 'Manrope', sans-serif; font-size: 2rem; font-weight: 700; color: #6B8CAE; margin-bottom: 0.5rem;`;
const VideoStepTitle = styled.h3`font-family: 'Manrope', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;`;
const VideoStepDesc = styled.p`font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #B0B0B0;`;

const HowItWorksSection = () => {
  const { currentTheme } = useTheme();

  if (currentTheme === 'editorial') return (
    <EditorialSection id="howitworks"><Container><Header><EditorialEyebrow>So funktioniert's</EditorialEyebrow><EditorialTitle>In 4 Schritten zur Website</EditorialTitle></Header><Steps>{STEPS.map((s, i) => <EditorialStep key={i}><EditorialNum>{s.num}</EditorialNum><EditorialStepTitle>{s.title}</EditorialStepTitle><EditorialStepDesc>{s.desc}</EditorialStepDesc></EditorialStep>)}</Steps></Container></EditorialSection>
  );

  if (currentTheme === 'botanical') return (
    <BotanicalSection id="howitworks"><Container style={{ position: 'relative', zIndex: 1 }}><Header><BotanicalEyebrow>So funktioniert's</BotanicalEyebrow><BotanicalTitle>In 4 Schritten zur Website</BotanicalTitle></Header><Steps>{STEPS.map((s, i) => <BotanicalStep key={i}><BotanicalNum>{s.num}</BotanicalNum><BotanicalStepTitle>{s.title}</BotanicalStepTitle><BotanicalStepDesc>{s.desc}</BotanicalStepDesc></BotanicalStep>)}</Steps></Container></BotanicalSection>
  );

  if (currentTheme === 'contemporary') return (
    <ContemporarySection id="howitworks"><Container><Header><ContemporaryEyebrow>🎯 So geht's</ContemporaryEyebrow><ContemporaryTitle>4 Easy Steps</ContemporaryTitle></Header><Steps>{STEPS.map((s, i) => <ContemporaryStep key={i} $i={i}><ContemporaryNum>{s.num}</ContemporaryNum><ContemporaryStepTitle>{s.title}</ContemporaryStepTitle><ContemporaryStepDesc>{s.desc}</ContemporaryStepDesc></ContemporaryStep>)}</Steps></Container></ContemporarySection>
  );

  if (currentTheme === 'luxe') return (
    <LuxeSection id="howitworks"><Container><Header><LuxeEyebrow>Der Prozess</LuxeEyebrow><LuxeTitle>Ihr Weg zur Website</LuxeTitle></Header><Steps>{STEPS.map((s, i) => <LuxeStep key={i}><LuxeNum>{s.num}</LuxeNum><LuxeStepTitle>{s.title}</LuxeStepTitle><LuxeStepDesc>{s.desc}</LuxeStepDesc></LuxeStep>)}</Steps></Container></LuxeSection>
  );

  if (currentTheme === 'neon') return (
    <NeonSection id="howitworks"><Container style={{ position: 'relative', zIndex: 1 }}><Header><NeonEyebrow>// Process.run()</NeonEyebrow><NeonTitle>Execute Steps</NeonTitle></Header><Steps>{STEPS.map((s, i) => <NeonStep key={i}><NeonNum>{s.num}</NeonNum><NeonStepTitle>{s.title}</NeonStepTitle><NeonStepDesc>{s.desc}</NeonStepDesc></NeonStep>)}</Steps></Container></NeonSection>
  );

  return (
    <VideoSection id="howitworks"><Container><Header><VideoEyebrow>So funktioniert's</VideoEyebrow><VideoTitle>In 4 Schritten zur Website</VideoTitle></Header><Steps>{STEPS.map((s, i) => <VideoStep key={i}><VideoNum>{s.num}</VideoNum><VideoStepTitle>{s.title}</VideoStepTitle><VideoStepDesc>{s.desc}</VideoStepDesc></VideoStep>)}</Steps></Container></VideoSection>
  );
};

export default HowItWorksSection;
