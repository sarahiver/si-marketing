// src/components/marketing/FeaturesSection.js
// 1:1 basierend auf Design-Vorlagen - Editorial/Luxe: alternating layout, Contemporary: cards with shadows
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// Cloudinary Demo Images
const DEMO_IMAGES = [
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1769537648/siwedding/demo/hero/t4rsv6gjmwtow3k761d2.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1769608965/siwedding/demo/story/flowers_kl9qjr.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1769608965/siwedding/demo/story/rings_ab2def.jpg',
];

const FEATURES = [
  { num: '01', title: 'Responsive Design', desc: 'Perfekt auf Desktop, Tablet und Smartphone', image: DEMO_IMAGES[0] },
  { num: '02', title: '6 Einzigartige Themes', desc: 'Von elegant bis modern - für jeden Geschmack', image: DEMO_IMAGES[1] },
  { num: '03', title: 'RSVP & Gästebuch', desc: 'Digitale Zusagen und Glückwünsche sammeln', image: DEMO_IMAGES[2] },
];

const fadeInUp = keyframes`from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); }`;

// ============================================
// BASE STYLES
// ============================================
const Section = styled.section`padding: clamp(4rem, 10vh, 8rem) 0;`;
const Container = styled.div`max-width: 1400px; margin: 0 auto; padding: 0 clamp(1.5rem, 5vw, 4rem);`;
const Header = styled.div`text-align: center; margin-bottom: 4rem;`;

// ============================================
// EDITORIAL - Alternating Image/Text Rows (wie im Design)
// ============================================
const EditorialSection = styled(Section)`background: #FAFAFA;`;
const EditorialEyebrow = styled.p`font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #C41E3A; margin-bottom: 1rem;`;
const EditorialTitle = styled.h2`font-family: 'Oswald', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #0A0A0A;`;
const EditorialSubtitle = styled.p`font-family: 'Source Serif 4', serif; font-size: 1rem; font-style: italic; color: #666; max-width: 500px; margin: 1rem auto 0;`;

const EditorialStory = styled.div`display: flex; flex-direction: column; gap: 0;`;

const EditorialRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  
  ${p => p.$reverse && css`
    & > *:first-child { order: 2; }
    & > *:last-child { order: 1; }
    @media (max-width: 900px) {
      & > *:first-child { order: 1; }
      & > *:last-child { order: 2; }
    }
  `}
`;

const EditorialImage = styled.div`
  background: url(${p => p.$src}) center/cover no-repeat;
  min-height: 400px;
  
  @media (max-width: 900px) { min-height: 300px; }
`;

const EditorialText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2rem, 5vw, 4rem);
  background: ${p => p.$dark ? '#0A0A0A' : '#FAFAFA'};
`;

const EditorialNum = styled.span`
  font-family: 'Oswald', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
  line-height: 1;
  margin-bottom: 1rem;
`;

const EditorialItemTitle = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${p => p.$dark ? '#FAFAFA' : '#0A0A0A'};
  margin-bottom: 0.5rem;
`;

const EditorialItemDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.6)' : '#666'};
  line-height: 1.6;
`;

// ============================================
// CLASSIC - Alternating Image/Text Rows (warm, refined)
// ============================================
const ClassicSection = styled(Section)`background: #FDFCFA;`;
const ClassicEyebrow = styled.p`font-family: 'Josefin Sans', sans-serif; font-size: 0.65rem; font-weight: 400; letter-spacing: 0.3em; text-transform: uppercase; color: #999999; margin-bottom: 1rem;`;
const ClassicTitle = styled.h2`font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; line-height: 1.15; color: #1A1A1A;`;
const ClassicSubtitle = styled.p`font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1rem; font-style: italic; color: #555555; max-width: 500px; margin: 1rem auto 0;`;

const ClassicStory = styled.div`display: flex; flex-direction: column; gap: 0;`;

const ClassicRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  ${p => p.$reverse && css`
    & > *:first-child { order: 2; }
    & > *:last-child { order: 1; }
    @media (max-width: 900px) {
      & > *:first-child { order: 1; }
      & > *:last-child { order: 2; }
    }
  `}
`;

const ClassicImage = styled.div`
  background: url(${p => p.$src}) center/cover no-repeat;
  min-height: 400px;
  filter: grayscale(40%);

  @media (max-width: 900px) { min-height: 300px; }
`;

const ClassicText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2rem, 5vw, 4rem);
  background: ${p => p.$alt ? '#FDFCFA' : '#F5F0EB'};
`;

const ClassicNum = styled.span`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 4rem;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.04);
  line-height: 1;
  margin-bottom: 1rem;
`;

const ClassicItemTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
`;

const ClassicItemDesc = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: #555555;
  line-height: 1.6;
`;

// ============================================
// BOTANICAL - Glassmorphism Cards in Timeline
// ============================================
const BotanicalSection = styled(Section)`
  background: #040604;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(45, 90, 60, 0.1) 0%, transparent 50%);
  }
`;

const BotanicalEyebrow = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.55rem; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 1rem;`;
const BotanicalTitle = styled.h2`font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; color: rgba(255,255,255,0.95);`;

const BotanicalTimeline = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    left: 1rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255,255,255,0.1);
    
    @media (min-width: 600px) { left: 50%; transform: translateX(-50%); }
  }
`;

const BotanicalCard = styled.div`
  position: relative;
  width: 100%;
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-left: 2.5rem;
  
  @media (min-width: 600px) {
    width: calc(50% - 2rem);
    margin-left: 0;
    ${p => p.$align === 'left' ? 'margin-right: auto;' : 'margin-left: auto;'}
  }
  
  &::before {
    content: '▸';
    position: absolute;
    left: -1.5rem;
    top: 1.5rem;
    color: rgba(255,255,255,0.3);
    font-size: 0.75rem;
    
    @media (min-width: 600px) {
      ${p => p.$align === 'left' ? 'right: -1.5rem; left: auto; content: "◂";' : 'left: -1.5rem;'}
    }
  }
`;

const BotanicalCardTitle = styled.h3`font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: rgba(255,255,255,0.95); margin-bottom: 0.25rem;`;
const BotanicalCardDesc = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.8rem; color: rgba(255,255,255,0.6);`;

const BotanicalImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 1rem;
`;

// ============================================
// CONTEMPORARY - Neobrutalism Cards (wie im Design)
// ============================================
const ContemporarySection = styled(Section)`background: #FAFAFA;`;
const ContemporaryEyebrow = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #FF6B6B; margin-bottom: 1rem;`;
const ContemporaryTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #0D0D0D;`;

const ContemporaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const ContemporaryCard = styled.div`
  background: #fff;
  border: 3px solid #0D0D0D;
  box-shadow: 8px 8px 0 ${p => ['#FF6B6B', '#4ECDC4', '#FFE66D', '#9B5DE5'][p.$i % 4]};
  transition: all 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0 ${p => ['#FF6B6B', '#4ECDC4', '#FFE66D', '#9B5DE5'][p.$i % 4]};
  }

  @media (max-width: 768px) {
    flex: 0 0 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
  }
`;

const ContemporaryCardImage = styled.div`
  height: 200px;
  background: url(${p => p.$src}) center/cover no-repeat;
  position: relative;
  
  &::after {
    content: '${p => p.$num}';
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #FFE66D;
    border: 2px solid #0D0D0D;
    padding: 0.3rem 0.6rem;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
  }
`;

const ContemporaryCardBody = styled.div`padding: 1.5rem; border-top: 3px solid #0D0D0D;`;
const ContemporaryCardTitle = styled.h3`font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700; text-transform: uppercase; color: #0D0D0D; margin-bottom: 0.5rem;`;
const ContemporaryCardDesc = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; color: #525252;`;

// ============================================
// LUXE - Full-width Alternating Image/Text (wie im Design)
// ============================================
const LuxeSection = styled(Section)`background: #0A0A0A; padding: 0;`;
const LuxeHeader = styled(Header)`padding: clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem);`;
const LuxeEyebrow = styled.p`font-family: 'Outfit', sans-serif; font-size: 0.65rem; font-weight: 400; letter-spacing: 0.4em; text-transform: uppercase; color: #C9A962; margin-bottom: 1rem;`;
const LuxeTitle = styled.h2`font-family: 'Cormorant', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; font-style: italic; color: #F8F6F3;`;

const LuxeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  
  ${p => p.$reverse && css`
    & > *:first-child { order: 2; }
    & > *:last-child { order: 1; }
    @media (max-width: 900px) {
      & > *:first-child { order: 1; }
      & > *:last-child { order: 2; }
    }
  `}
`;

const LuxeImage = styled.div`
  background: url(${p => p.$src}) center/cover no-repeat;
  min-height: 400px;
  @media (max-width: 900px) { min-height: 300px; }
`;

const LuxeText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2rem, 5vw, 4rem);
  background: #0A0A0A;
`;

const LuxeItemTitle = styled.h3`
  font-family: 'Cormorant', serif;
  font-size: 1.5rem;
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
  margin-bottom: 1rem;
`;

const LuxeItemDesc = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  color: rgba(248,246,243,0.6);
  line-height: 1.7;
`;

// ============================================
// NEON - Cyber Cards
// ============================================
const NeonSection = styled(Section)`
  background: #0a0a0f;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 70%, rgba(255,0,255,0.05) 0%, transparent 50%);
  }
`;

const NeonEyebrow = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem; letter-spacing: 0.3em; text-transform: uppercase; color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5); margin-bottom: 1rem;`;
const NeonTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #fff;`;

const NeonGrid = styled.div`
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const NeonCard = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(0,255,255,0.2);
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0,255,255,0.2);
  }

  @media (max-width: 768px) {
    flex: 0 0 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
  }
`;

const NeonCardNum = styled.span`font-family: 'Space Grotesk', sans-serif; font-size: 0.7rem; color: #ff00ff; letter-spacing: 0.2em;`;
const NeonCardTitle = styled.h3`font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700; text-transform: uppercase; color: #fff; margin: 0.5rem 0;`;
const NeonCardDesc = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; color: rgba(255,255,255,0.6);`;

// ============================================
// VIDEO - Clean Minimal Cards
// ============================================
const VideoSection = styled(Section)`background: #0A0A0A;`;
const VideoEyebrow = styled.p`font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #6B8CAE; margin-bottom: 1rem;`;
const VideoTitle = styled.h2`font-family: 'Manrope', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; color: #fff;`;
const VideoSubtitle = styled.p`font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-style: italic; color: #B0B0B0; max-width: 500px; margin: 1rem auto 0;`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding-bottom: 0.5rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }
`;

const VideoCard = styled.div`
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 2rem;
  transition: border-color 0.3s ease;
  
  &:hover { border-color: #6B8CAE; }

  @media (max-width: 768px) {
    flex: 0 0 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
  }
`;

const VideoCardTitle = styled.h3`font-family: 'Manrope', sans-serif; font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;`;
const VideoCardDesc = styled.p`font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #B0B0B0; line-height: 1.6;`;

// ============================================
// MAIN COMPONENT
// ============================================
const FeaturesSection = () => {
  const { currentTheme } = useTheme();

  // CLASSIC
  if (currentTheme === 'classic') {
    return (
      <ClassicSection id="features">
        <Container>
          <Header>
            <ClassicEyebrow>Unsere Geschichte</ClassicEyebrow>
            <ClassicTitle>Unsere Geschichte</ClassicTitle>
            <ClassicSubtitle>Eine Liebe, die Geschichten schreibt</ClassicSubtitle>
          </Header>
        </Container>
        <ClassicStory>
          {FEATURES.map((f, i) => (
            <ClassicRow key={i} $reverse={i % 2 === 1}>
              <ClassicImage $src={f.image} />
              <ClassicText $alt={i % 2 === 0}>
                <ClassicNum>{f.num}</ClassicNum>
                <ClassicItemTitle>{f.title}</ClassicItemTitle>
                <ClassicItemDesc>{f.desc}</ClassicItemDesc>
              </ClassicText>
            </ClassicRow>
          ))}
        </ClassicStory>
      </ClassicSection>
    );
  }

  // EDITORIAL
  if (currentTheme === 'editorial') {
    return (
      <EditorialSection id="features">
        <Container>
          <Header>
            <EditorialEyebrow>Unsere Geschichte</EditorialEyebrow>
            <EditorialTitle>Unsere Geschichte</EditorialTitle>
            <EditorialSubtitle>Eine Liebe, die Geschichten schreibt</EditorialSubtitle>
          </Header>
        </Container>
        <EditorialStory>
          {FEATURES.map((f, i) => (
            <EditorialRow key={i} $reverse={i % 2 === 1}>
              <EditorialImage $src={f.image} />
              <EditorialText $dark={i % 2 === 0}>
                <EditorialNum $dark={i % 2 === 0}>{f.num}</EditorialNum>
                <EditorialItemTitle $dark={i % 2 === 0}>{f.title}</EditorialItemTitle>
                <EditorialItemDesc $dark={i % 2 === 0}>{f.desc}</EditorialItemDesc>
              </EditorialText>
            </EditorialRow>
          ))}
        </EditorialStory>
      </EditorialSection>
    );
  }

  // BOTANICAL
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="features">
        <Container style={{ position: 'relative', zIndex: 10 }}>
          <Header>
            <BotanicalEyebrow>Wie alles begann</BotanicalEyebrow>
            <BotanicalTitle>Unsere Geschichte</BotanicalTitle>
          </Header>
          <BotanicalTimeline>
            {FEATURES.map((f, i) => (
              <BotanicalCard key={i} $align={i % 2 === 0 ? 'left' : 'right'}>
                <BotanicalCardTitle>{f.title}</BotanicalCardTitle>
                <BotanicalCardDesc>{f.desc}</BotanicalCardDesc>
                <BotanicalImage src={f.image} alt={f.title} loading="lazy" />
              </BotanicalCard>
            ))}
          </BotanicalTimeline>
        </Container>
      </BotanicalSection>
    );
  }

  // CONTEMPORARY
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="features">
        <Container>
          <Header>
            <ContemporaryEyebrow>✨ Unsere Geschichte</ContemporaryEyebrow>
            <ContemporaryTitle>Unsere Geschichte</ContemporaryTitle>
          </Header>
          <ContemporaryGrid>
            {FEATURES.map((f, i) => (
              <ContemporaryCard key={i} $i={i}>
                <ContemporaryCardImage $src={f.image} $num={f.num} />
                <ContemporaryCardBody>
                  <ContemporaryCardTitle>{f.title}</ContemporaryCardTitle>
                  <ContemporaryCardDesc>{f.desc}</ContemporaryCardDesc>
                </ContemporaryCardBody>
              </ContemporaryCard>
            ))}
          </ContemporaryGrid>
        </Container>
      </ContemporarySection>
    );
  }

  // LUXE
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="features">
        <LuxeHeader>
          <LuxeEyebrow>Unsere Reise</LuxeEyebrow>
          <LuxeTitle>Unsere Geschichte</LuxeTitle>
        </LuxeHeader>
        {FEATURES.map((f, i) => (
          <LuxeRow key={i} $reverse={i % 2 === 1}>
            <LuxeImage $src={f.image} />
            <LuxeText>
              <LuxeItemTitle>{f.title}</LuxeItemTitle>
              <LuxeItemDesc>{f.desc}</LuxeItemDesc>
            </LuxeText>
          </LuxeRow>
        ))}
      </LuxeSection>
    );
  }

  // NEON
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="features">
        <Container style={{ position: 'relative', zIndex: 10 }}>
          <Header>
            <NeonEyebrow>// Story.load()</NeonEyebrow>
            <NeonTitle>Unsere Geschichte</NeonTitle>
          </Header>
          <NeonGrid>
            {FEATURES.map((f, i) => (
              <NeonCard key={i}>
                <NeonCardNum>{`> ${f.num}`}</NeonCardNum>
                <NeonCardTitle>{f.title}</NeonCardTitle>
                <NeonCardDesc>{f.desc}</NeonCardDesc>
              </NeonCard>
            ))}
          </NeonGrid>
        </Container>
      </NeonSection>
    );
  }

  // VIDEO (Default)
  return (
    <VideoSection id="features">
      <Container>
        <Header>
          <VideoEyebrow>Unsere Geschichte</VideoEyebrow>
          <VideoTitle>Unsere Geschichte</VideoTitle>
          <VideoSubtitle>Eine Liebe, die Geschichten schreibt</VideoSubtitle>
        </Header>
        <VideoGrid>
          {FEATURES.map((f, i) => (
            <VideoCard key={i}>
              <VideoCardTitle>{f.title}</VideoCardTitle>
              <VideoCardDesc>{f.desc}</VideoCardDesc>
            </VideoCard>
          ))}
        </VideoGrid>
      </Container>
    </VideoSection>
  );
};

export default FeaturesSection;
