// src/components/marketing/ThemeShowcase.js
// 1:1 Theme-Designs aus si-wedding-themes
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const THEMES_DATA = [
  { id: 'editorial', name: 'Editorial', desc: 'Bold & Magazine-Style mit rotem Akzent', colors: ['#0A0A0A', '#C41E3A', '#FAFAFA'] },
  { id: 'botanical', name: 'Botanical', desc: 'Dunkle Eleganz mit Glassmorphism', colors: ['#040604', '#2D5A3C', 'rgba(255,255,255,0.1)'] },
  { id: 'contemporary', name: 'Contemporary', desc: 'Neobrutalism mit bunten Akzenten', colors: ['#FAFAFA', '#FF6B6B', '#4ECDC4'] },
  { id: 'luxe', name: 'Luxe', desc: 'Cinematische Eleganz in Gold & Schwarz', colors: ['#0A0A0A', '#C9A962', '#F8F6F3'] },
  { id: 'neon', name: 'Neon', desc: 'Cyberpunk mit Glow-Effekten', colors: ['#0a0a0f', '#00ffff', '#ff00ff'] },
  { id: 'video', name: 'Video', desc: 'Cinematisch mit Dusty Blue Akzent', colors: ['#0A0A0A', '#6B8CAE', '#FFFFFF'] },
];

const Section = styled.section`padding: clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem);`;
const Container = styled.div`max-width: 1200px; margin: 0 auto;`;
const Header = styled.div`text-align: center; margin-bottom: 4rem;`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;`;

// EDITORIAL
const EditorialSection = styled(Section)`background: #FAFAFA;`;
const EditorialEyebrow = styled.p`font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #C41E3A; margin-bottom: 1rem;`;
const EditorialTitle = styled.h2`font-family: 'Oswald', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #0A0A0A; margin-bottom: 1rem;`;
const EditorialCard = styled.div`background: #fff; border: 1px solid #E5E5E5; overflow: hidden; transition: all 0.3s; cursor: pointer; ${p => p.$active && css`border-color: #C41E3A; box-shadow: 0 20px 40px rgba(196,30,58,0.15);`} &:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }`;
const EditorialCardPreview = styled.div`height: 200px; background: ${p => p.$bg}; position: relative; display: flex; align-items: center; justify-content: center;`;
const EditorialCardColors = styled.div`display: flex; gap: 0.5rem;`;
const EditorialCardColor = styled.div`width: 30px; height: 30px; border-radius: 50%; background: ${p => p.$c}; border: 2px solid rgba(255,255,255,0.3);`;
const EditorialCardBody = styled.div`padding: 1.5rem;`;
const EditorialCardName = styled.h3`font-family: 'Oswald', sans-serif; font-size: 1.3rem; font-weight: 700; text-transform: uppercase; color: #0A0A0A; margin-bottom: 0.5rem;`;
const EditorialCardDesc = styled.p`font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #666;`;

// BOTANICAL
const BotanicalSection = styled(Section)`background: #040604; position: relative; &::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(45, 90, 60, 0.1) 0%, transparent 50%); }`;
const BotanicalEyebrow = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 1rem;`;
const BotanicalTitle = styled.h2`font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; color: rgba(255,255,255,0.95); margin-bottom: 1rem;`;
const BotanicalCard = styled.div`position: relative; z-index: 1; background: rgba(255,255,255,0.06); backdrop-filter: blur(40px); border: 1px solid ${p => p.$active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}; border-radius: 20px; overflow: hidden; transition: all 0.4s; cursor: pointer; &:hover { background: rgba(255,255,255,0.1); transform: translateY(-5px); }`;
const BotanicalCardPreview = styled.div`height: 200px; background: ${p => p.$bg}; display: flex; align-items: center; justify-content: center;`;
const BotanicalCardBody = styled.div`padding: 1.5rem; text-align: center;`;
const BotanicalCardName = styled.h3`font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: rgba(255,255,255,0.95); margin-bottom: 0.5rem;`;
const BotanicalCardDesc = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.8rem; color: rgba(255,255,255,0.6);`;

// CONTEMPORARY
const ContemporarySection = styled(Section)`background: #FFE66D;`;
const ContemporaryEyebrow = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #0D0D0D; margin-bottom: 1rem;`;
const ContemporaryTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #0D0D0D; margin-bottom: 1rem;`;
const ContemporaryCard = styled.div`background: #fff; border: 3px solid #0D0D0D; overflow: hidden; transition: all 0.3s; cursor: pointer; box-shadow: ${p => p.$active ? '8px 8px 0 #FF6B6B' : '6px 6px 0 #0D0D0D'}; &:hover { transform: translate(-4px, -4px); box-shadow: 10px 10px 0 ${p => p.$active ? '#FF6B6B' : '#0D0D0D'}; }`;
const ContemporaryCardPreview = styled.div`height: 200px; background: ${p => p.$bg}; display: flex; align-items: center; justify-content: center;`;
const ContemporaryCardBody = styled.div`padding: 1.5rem; border-top: 3px solid #0D0D0D;`;
const ContemporaryCardName = styled.h3`font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700; text-transform: uppercase; color: #0D0D0D; margin-bottom: 0.5rem;`;
const ContemporaryCardDesc = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; color: #525252;`;

// LUXE
const LuxeSection = styled(Section)`background: #0A0A0A;`;
const LuxeEyebrow = styled.p`font-family: 'Outfit', sans-serif; font-size: 0.7rem; letter-spacing: 0.4em; text-transform: uppercase; color: #C9A962; margin-bottom: 1rem;`;
const LuxeTitle = styled.h2`font-family: 'Cormorant', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; font-style: italic; color: #F8F6F3; margin-bottom: 1rem;`;
const LuxeCard = styled.div`border: 1px solid ${p => p.$active ? '#C9A962' : 'rgba(248,246,243,0.15)'}; overflow: hidden; transition: all 0.5s; cursor: pointer; &:hover { border-color: #C9A962; }`;
const LuxeCardPreview = styled.div`height: 200px; background: ${p => p.$bg}; display: flex; align-items: center; justify-content: center;`;
const LuxeCardBody = styled.div`padding: 1.5rem; text-align: center;`;
const LuxeCardName = styled.h3`font-family: 'Cormorant', serif; font-size: 1.4rem; font-weight: 300; font-style: italic; color: #F8F6F3; margin-bottom: 0.5rem;`;
const LuxeCardDesc = styled.p`font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: rgba(248,246,243,0.5);`;

// NEON
const NeonSection = styled(Section)`background: #0a0a0f; position: relative; &::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 20% 80%, rgba(255,0,255,0.05) 0%, transparent 50%); }`;
const NeonEyebrow = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; letter-spacing: 0.3em; text-transform: uppercase; color: #ff00ff; text-shadow: 0 0 10px rgba(255,0,255,0.5); margin-bottom: 1rem;`;
const NeonTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 1rem;`;
const NeonCard = styled.div`position: relative; z-index: 1; background: rgba(255,255,255,0.02); border: 1px solid ${p => p.$active ? '#00ffff' : 'rgba(0,255,255,0.2)'}; overflow: hidden; transition: all 0.3s; cursor: pointer; ${p => p.$active && css`box-shadow: 0 0 30px rgba(0,255,255,0.2);`} &:hover { border-color: #00ffff; box-shadow: 0 0 20px rgba(0,255,255,0.2); }`;
const NeonCardPreview = styled.div`height: 200px; background: ${p => p.$bg}; display: flex; align-items: center; justify-content: center;`;
const NeonCardBody = styled.div`padding: 1.5rem; text-align: center;`;
const NeonCardName = styled.h3`font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 0.5rem;`;
const NeonCardDesc = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; color: rgba(255,255,255,0.6);`;

// VIDEO
const VideoSection = styled(Section)`background: #0A0A0A;`;
const VideoEyebrow = styled.p`font-family: 'Inter', sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6B8CAE; margin-bottom: 1rem;`;
const VideoTitle = styled.h2`font-family: 'Manrope', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; color: #fff; margin-bottom: 1rem;`;
const VideoCard = styled.div`border: 1px solid ${p => p.$active ? '#6B8CAE' : 'rgba(255,255,255,0.1)'}; overflow: hidden; transition: all 0.3s; cursor: pointer; &:hover { border-color: #6B8CAE; }`;
const VideoCardPreview = styled.div`height: 200px; background: ${p => p.$bg}; display: flex; align-items: center; justify-content: center;`;
const VideoCardBody = styled.div`padding: 1.5rem; text-align: center;`;
const VideoCardName = styled.h3`font-family: 'Manrope', sans-serif; font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;`;
const VideoCardDesc = styled.p`font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #B0B0B0;`;

// Preview Mockups
const PreviewText = styled.div`color: ${p => p.$c || '#fff'}; font-size: 1.5rem; font-weight: 700; text-align: center;`;

const ThemeShowcase = () => {
  const { currentTheme, setCurrentTheme } = useTheme();

  const handleThemeClick = (themeId) => {
    setCurrentTheme(themeId);
  };

  const renderPreview = (theme) => (
    <PreviewText $c={theme.colors[2]}>{theme.name.charAt(0)}&{theme.name.charAt(theme.name.length-1)}</PreviewText>
  );

  if (currentTheme === 'editorial') return (
    <EditorialSection id="themes"><Container><Header><EditorialEyebrow>Unsere Designs</EditorialEyebrow><EditorialTitle>6 Einzigartige Themes</EditorialTitle></Header><Grid>{THEMES_DATA.map(t => <EditorialCard key={t.id} $active={currentTheme === t.id} onClick={() => handleThemeClick(t.id)}><EditorialCardPreview $bg={t.colors[0]}><EditorialCardColors>{t.colors.map((c,i) => <EditorialCardColor key={i} $c={c} />)}</EditorialCardColors></EditorialCardPreview><EditorialCardBody><EditorialCardName>{t.name}</EditorialCardName><EditorialCardDesc>{t.desc}</EditorialCardDesc></EditorialCardBody></EditorialCard>)}</Grid></Container></EditorialSection>
  );

  if (currentTheme === 'botanical') return (
    <BotanicalSection id="themes"><Container style={{ position: 'relative', zIndex: 1 }}><Header><BotanicalEyebrow>Unsere Designs</BotanicalEyebrow><BotanicalTitle>6 Einzigartige Themes</BotanicalTitle></Header><Grid>{THEMES_DATA.map(t => <BotanicalCard key={t.id} $active={currentTheme === t.id} onClick={() => handleThemeClick(t.id)}><BotanicalCardPreview $bg={t.colors[0]}>{renderPreview(t)}</BotanicalCardPreview><BotanicalCardBody><BotanicalCardName>{t.name}</BotanicalCardName><BotanicalCardDesc>{t.desc}</BotanicalCardDesc></BotanicalCardBody></BotanicalCard>)}</Grid></Container></BotanicalSection>
  );

  if (currentTheme === 'contemporary') return (
    <ContemporarySection id="themes"><Container><Header><ContemporaryEyebrow>🎨 Designs</ContemporaryEyebrow><ContemporaryTitle>Wählt euren Style!</ContemporaryTitle></Header><Grid>{THEMES_DATA.map(t => <ContemporaryCard key={t.id} $active={currentTheme === t.id} onClick={() => handleThemeClick(t.id)}><ContemporaryCardPreview $bg={t.colors[0]}>{renderPreview(t)}</ContemporaryCardPreview><ContemporaryCardBody><ContemporaryCardName>{t.name}</ContemporaryCardName><ContemporaryCardDesc>{t.desc}</ContemporaryCardDesc></ContemporaryCardBody></ContemporaryCard>)}</Grid></Container></ContemporarySection>
  );

  if (currentTheme === 'luxe') return (
    <LuxeSection id="themes"><Container><Header><LuxeEyebrow>Kollektion</LuxeEyebrow><LuxeTitle>Unsere Designs</LuxeTitle></Header><Grid>{THEMES_DATA.map(t => <LuxeCard key={t.id} $active={currentTheme === t.id} onClick={() => handleThemeClick(t.id)}><LuxeCardPreview $bg={t.colors[0]}>{renderPreview(t)}</LuxeCardPreview><LuxeCardBody><LuxeCardName>{t.name}</LuxeCardName><LuxeCardDesc>{t.desc}</LuxeCardDesc></LuxeCardBody></LuxeCard>)}</Grid></Container></LuxeSection>
  );

  if (currentTheme === 'neon') return (
    <NeonSection id="themes"><Container style={{ position: 'relative', zIndex: 1 }}><Header><NeonEyebrow>// Themes.select()</NeonEyebrow><NeonTitle>Choose Skin</NeonTitle></Header><Grid>{THEMES_DATA.map(t => <NeonCard key={t.id} $active={currentTheme === t.id} onClick={() => handleThemeClick(t.id)}><NeonCardPreview $bg={t.colors[0]}>{renderPreview(t)}</NeonCardPreview><NeonCardBody><NeonCardName>{t.name}</NeonCardName><NeonCardDesc>{t.desc}</NeonCardDesc></NeonCardBody></NeonCard>)}</Grid></Container></NeonSection>
  );

  return (
    <VideoSection id="themes"><Container><Header><VideoEyebrow>Unsere Designs</VideoEyebrow><VideoTitle>6 Einzigartige Themes</VideoTitle></Header><Grid>{THEMES_DATA.map(t => <VideoCard key={t.id} $active={currentTheme === t.id} onClick={() => handleThemeClick(t.id)}><VideoCardPreview $bg={t.colors[0]}>{renderPreview(t)}</VideoCardPreview><VideoCardBody><VideoCardName>{t.name}</VideoCardName><VideoCardDesc>{t.desc}</VideoCardDesc></VideoCardBody></VideoCard>)}</Grid></Container></VideoSection>
  );
};

export default ThemeShowcase;
