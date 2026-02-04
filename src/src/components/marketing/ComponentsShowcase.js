// src/components/marketing/ComponentsShowcase.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// Animations
const leafFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(3deg); }
`;

const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(0,255,255,0.3), inset 0 0 5px rgba(0,255,255,0.1); }
  50% { box-shadow: 0 0 20px rgba(0,255,255,0.5), inset 0 0 10px rgba(0,255,255,0.2); }
`;

const scrollTrack = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

// Components Data
const components = [
  { icon: '🏠', name: 'Hero', desc: 'Der erste Eindruck', included: true },
  { icon: '💕', name: 'Love Story', desc: 'Eure Geschichte', included: true },
  { icon: '💌', name: 'RSVP', desc: 'Digitale Zusagen', included: true },
  { icon: '🔔', name: 'Countdown', desc: 'Tage bis zum Ja', included: true },
  { icon: '📅', name: 'Ablauf', desc: 'Der Tagesplan', included: false },
  { icon: '⏰', name: 'Timeline', desc: 'Zeitlicher Ablauf', included: false },
  { icon: '📍', name: 'Location', desc: 'Mit Karte & Infos', included: false },
  { icon: '🧭', name: 'Anfahrt', desc: 'Navigation & Tipps', included: false },
  { icon: '✏️', name: 'Gästebuch', desc: 'Wünsche sammeln', included: false },
  { icon: '🏨', name: 'Unterkünfte', desc: 'Hotels & Tipps', included: false },
  { icon: '👗', name: 'Dresscode', desc: 'Was anziehen?', included: false },
  { icon: '🎁', name: 'Wunschliste', desc: 'Geschenkideen', included: false },
  { icon: '🎵', name: 'Musikwünsche', desc: 'Playlist gestalten', included: false },
  { icon: '❓', name: 'FAQ', desc: 'Häufige Fragen', included: false },
  { icon: '🖼️', name: 'Galerie', desc: 'Eure Bilder', included: false },
  { icon: '📸', name: 'Foto Upload', desc: 'Gäste-Fotos', included: false },
  { icon: '📞', name: 'Kontakt', desc: 'Trauzeugen etc.', included: false },
  { icon: '📖', name: 'Wedding ABC', desc: 'Von A bis Z', included: false },
];

function ComponentsShowcase() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const renderContent = () => {
    switch(currentTheme) {
      case 'editorial': return <EditorialLayout components={components} isVisible={isVisible} />;
      case 'contemporary': return <ContemporaryLayout components={components} isVisible={isVisible} />;
      case 'botanical': return <BotanicalLayout components={components} isVisible={isVisible} />;
      case 'neon': return <NeonLayout components={components} isVisible={isVisible} />;
      case 'video': return <VideoLayout components={components} isVisible={isVisible} />;
      case 'luxe': return <LuxeLayout components={components} isVisible={isVisible} />;
      default: return <EditorialLayout components={components} isVisible={isVisible} />;
    }
  };

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="features">
      {renderContent()}
    </Section>
  );
}

// EDITORIAL LAYOUT
const EditorialLayout = ({ components, isVisible }) => (
  <EditorialContainer>
    <EditorialHeader $visible={isVisible}>
      <EditorialEyebrow>— 18 Komponenten —</EditorialEyebrow>
      <EditorialTitle>Alles was ihr braucht</EditorialTitle>
      <EditorialSubtitle>Wählt aus 18 liebevoll gestalteten Komponenten – 4 davon immer inklusive.</EditorialSubtitle>
    </EditorialHeader>
    <EditorialLine $visible={isVisible} $delay="0.3s" />
    <EditorialGrid>
      {components.slice(0, 9).map((comp, i) => (
        <EditorialCard key={comp.name} $visible={isVisible} $delay={0.1 + i * 0.05}>
          <EditorialIcon>{comp.icon}</EditorialIcon>
          <EditorialCardContent>
            <EditorialCardName>{comp.name}</EditorialCardName>
            <EditorialCardLine />
            <EditorialCardDesc>{comp.desc}</EditorialCardDesc>
            {comp.included && <EditorialBadge>Inklusive</EditorialBadge>}
          </EditorialCardContent>
        </EditorialCard>
      ))}
    </EditorialGrid>
    <EditorialLine $visible={isVisible} $delay="0.6s" />
    <EditorialGrid>
      {components.slice(9).map((comp, i) => (
        <EditorialCard key={comp.name} $visible={isVisible} $delay={0.7 + i * 0.05}>
          <EditorialIcon>{comp.icon}</EditorialIcon>
          <EditorialCardContent>
            <EditorialCardName>{comp.name}</EditorialCardName>
            <EditorialCardLine />
            <EditorialCardDesc>{comp.desc}</EditorialCardDesc>
          </EditorialCardContent>
        </EditorialCard>
      ))}
    </EditorialGrid>
  </EditorialContainer>
);

// CONTEMPORARY LAYOUT
const ContemporaryLayout = ({ components, isVisible }) => (
  <ContemporaryContainer>
    <ContemporaryHeader $visible={isVisible}>
      <ContemporaryBadge>18 KOMPONENTEN</ContemporaryBadge>
      <ContemporaryTitle>ALLES WAS IHR BRAUCHT.</ContemporaryTitle>
      <ContemporarySubtitle>Wählt aus 18 liebevoll gestalteten Komponenten – 4 davon immer inklusive.</ContemporarySubtitle>
    </ContemporaryHeader>
    <ContemporaryShapes>
      <ContemporaryCircle $top="10%" $left="5%" $size="60px" $color="#FF6B6B" />
      <ContemporaryCircle $top="40%" $right="8%" $size="40px" $color="#4ECDC4" />
      <ContemporarySquare $bottom="20%" $left="3%" $size="30px" $color="#FFE66D" />
    </ContemporaryShapes>
    <ContemporaryStack>
      {components.map((comp, i) => (
        <ContemporaryCard key={comp.name} $visible={isVisible} $delay={0.1 + i * 0.03} $align={i % 2 === 0 ? 'left' : 'right'}>
          <ContemporaryCardInner>
            <ContemporaryCardIcon>{comp.icon}</ContemporaryCardIcon>
            <ContemporaryCardContent>
              <ContemporaryCardName>{comp.name}</ContemporaryCardName>
              <ContemporaryCardDesc>{comp.desc}</ContemporaryCardDesc>
            </ContemporaryCardContent>
            {comp.included && <ContemporaryIncluded>✓</ContemporaryIncluded>}
          </ContemporaryCardInner>
        </ContemporaryCard>
      ))}
    </ContemporaryStack>
  </ContemporaryContainer>
);

// BOTANICAL LAYOUT
const BotanicalLayout = ({ components, isVisible }) => (
  <BotanicalContainer>
    <BotanicalLeaf $top="5%" $left="3%" $delay="0s">🌿</BotanicalLeaf>
    <BotanicalLeaf $top="15%" $right="5%" $delay="0.5s">🍃</BotanicalLeaf>
    <BotanicalLeaf $bottom="20%" $left="8%" $delay="1s">🌱</BotanicalLeaf>
    <BotanicalLeaf $bottom="10%" $right="3%" $delay="1.5s">🌸</BotanicalLeaf>
    <BotanicalHeader $visible={isVisible}>
      <BotanicalEyebrow>✿ 18 Komponenten ✿</BotanicalEyebrow>
      <BotanicalTitle>Alles was ihr braucht</BotanicalTitle>
      <BotanicalSubtitle>Wählt aus 18 liebevoll gestalteten Komponenten – 4 davon immer inklusive.</BotanicalSubtitle>
    </BotanicalHeader>
    <BotanicalMasonry>
      {components.map((comp, i) => (
        <BotanicalCard key={comp.name} $visible={isVisible} $delay={0.1 + i * 0.04} $size={comp.included ? 'large' : 'normal'}>
          <BotanicalCardIcon>{comp.icon}</BotanicalCardIcon>
          <BotanicalCardName>{comp.name}</BotanicalCardName>
          <BotanicalCardDesc>{comp.desc}</BotanicalCardDesc>
          {comp.included && <BotanicalBadge>Inklusive</BotanicalBadge>}
        </BotanicalCard>
      ))}
    </BotanicalMasonry>
  </BotanicalContainer>
);

// NEON LAYOUT
const NeonLayout = ({ components, isVisible }) => (
  <NeonContainer>
    <NeonFrame $visible={isVisible}>
      <NeonFrameCorner $position="top-left" />
      <NeonFrameCorner $position="top-right" />
      <NeonFrameCorner $position="bottom-left" />
      <NeonFrameCorner $position="bottom-right" />
      <NeonHeader $visible={isVisible}>
        <NeonEyebrow><span>//</span> 18 KOMPONENTEN <span>//</span></NeonEyebrow>
        <NeonTitle>SYSTEM_COMPONENTS</NeonTitle>
        <NeonSubtitle>&gt; Wählt aus 18 Modulen – 4 davon immer inklusive_</NeonSubtitle>
      </NeonHeader>
      <NeonGrid>
        {components.map((comp, i) => (
          <NeonCard key={comp.name} $visible={isVisible} $delay={0.1 + i * 0.03}>
            <NeonCardHeader>
              <NeonCardIcon>{comp.icon}</NeonCardIcon>
              <NeonCardName>&gt; {comp.name}_</NeonCardName>
            </NeonCardHeader>
            <NeonCardDesc>{comp.desc}</NeonCardDesc>
            {comp.included && <NeonBadge>[INCLUDED]</NeonBadge>}
            <NeonCardLine />
          </NeonCard>
        ))}
      </NeonGrid>
    </NeonFrame>
    <NeonFloatingSquare $top="10%" $left="5%" $delay="0s" />
    <NeonFloatingCircle $bottom="15%" $right="8%" $delay="0.5s" />
  </NeonContainer>
);

// VIDEO LAYOUT - Auto-Scroll Carousel mit eleganten Karten
const VideoLayout = ({ components, isVisible }) => (
  <VideoContainer>
    <VideoHeader $visible={isVisible}>
      <VideoEyebrow>— 18 Komponenten —</VideoEyebrow>
      <VideoTitle>Alles was ihr braucht</VideoTitle>
      <VideoSubtitle>Wählt aus 18 liebevoll gestalteten Komponenten – 4 davon immer inklusive.</VideoSubtitle>
    </VideoHeader>
    <VideoCarouselWrapper>
      <VideoCarouselTrack $visible={isVisible}>
        {/* Dupliziere für seamless loop */}
        {[...components, ...components].map((comp, i) => (
          <VideoCard key={`${comp.name}-${i}`}>
            <VideoCardIcon>{comp.icon}</VideoCardIcon>
            <VideoCardName>{comp.name}</VideoCardName>
            <VideoCardDesc>{comp.desc}</VideoCardDesc>
            {comp.included && <VideoCardBadge>Inklusive</VideoCardBadge>}
          </VideoCard>
        ))}
      </VideoCarouselTrack>
    </VideoCarouselWrapper>
    <VideoGoldLine $visible={isVisible} />
  </VideoContainer>
);

// LUXE LAYOUT
const LuxeLayout = ({ components, isVisible }) => (
  <LuxeContainer>
    <LuxeHeader $visible={isVisible}>
      <LuxeDiamond>✦</LuxeDiamond>
      <LuxeEyebrow>18 KOMPONENTEN</LuxeEyebrow>
      <LuxeTitle>Alles was ihr braucht</LuxeTitle>
      <LuxeSubtitle>Wählt aus 18 liebevoll gestalteten Komponenten – 4 davon immer inklusive.</LuxeSubtitle>
    </LuxeHeader>
    <LuxeList>
      {components.map((comp, i) => (
        <React.Fragment key={comp.name}>
          <LuxeDivider $visible={isVisible} $delay={0.1 + i * 0.05} />
          <LuxeItem $visible={isVisible} $delay={0.15 + i * 0.05}>
            <LuxeItemIcon>{comp.icon}</LuxeItemIcon>
            <LuxeItemContent>
              <LuxeItemName>{comp.name}</LuxeItemName>
              <LuxeItemDesc>{comp.desc}</LuxeItemDesc>
            </LuxeItemContent>
            {comp.included && <LuxeBadge>Inklusive</LuxeBadge>}
          </LuxeItem>
        </React.Fragment>
      ))}
      <LuxeDivider $visible={isVisible} $delay={1.2} />
    </LuxeList>
    <LuxeFooterDiamond $visible={isVisible}>✦</LuxeFooterDiamond>
  </LuxeContainer>
);

export default ComponentsShowcase;

// STYLES
const Section = styled.section`
  padding: 100px 20px;
  position: relative;
  overflow: hidden;
  
  @media (min-width: 600px) {
    padding: 140px 5%;
  }
  
  ${p => p.$themeId === 'video' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'editorial' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`background: linear-gradient(180deg, #FAF9F6 0%, #F0EDE5 100%);`}
  ${p => p.$themeId === 'contemporary' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'luxe' && css`background: #FAF9F7;`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f;`}
`;

// EDITORIAL STYLES
const EditorialContainer = styled.div`max-width: 1100px; margin: 0 auto;`;
const EditorialHeader = styled.div`text-align: center; margin-bottom: 60px; opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'}); transition: all 0.8s ease;`;
const EditorialEyebrow = styled.span`display: block; font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.3em; color: #999; margin-bottom: 20px;`;
const EditorialTitle = styled.h2`font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 400; font-style: italic; color: #1A1A1A; margin-bottom: 20px;`;
const EditorialSubtitle = styled.p`font-family: 'Inter', sans-serif; font-size: 1rem; color: #666; max-width: 500px; margin: 0 auto; line-height: 1.8;`;
const EditorialLine = styled.div`height: 1px; background: #E0E0E0; margin: 50px 0; width: ${p => p.$visible ? '100%' : '0'}; transition: width 1s ease; transition-delay: ${p => p.$delay || '0s'};`;
const EditorialGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 30px;`;
const EditorialCard = styled.div`display: flex; align-items: flex-start; gap: 15px; padding: 20px 0; opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '20px'}); transition: all 0.6s ease; transition-delay: ${p => p.$delay}s; &:hover .card-line { background: #1A1A1A; width: 40px; }`;
const EditorialIcon = styled.div`font-size: 1.8rem; flex-shrink: 0;`;
const EditorialCardContent = styled.div`flex: 1;`;
const EditorialCardName = styled.h3`font-family: 'Inter', sans-serif; font-size: 0.95rem; font-weight: 500; color: #1A1A1A; margin-bottom: 8px;`;
const EditorialCardLine = styled.div.attrs({ className: 'card-line' })`width: 25px; height: 1px; background: #CCC; margin-bottom: 8px; transition: all 0.3s ease;`;
const EditorialCardDesc = styled.p`font-family: 'Inter', sans-serif; font-size: 0.8rem; color: #999; margin: 0;`;
const EditorialBadge = styled.span`display: inline-block; font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #1A1A1A; background: #F0F0F0; padding: 4px 8px; margin-top: 10px;`;

// CONTEMPORARY STYLES
const ContemporaryContainer = styled.div`max-width: 1000px; margin: 0 auto; position: relative;`;
const ContemporaryHeader = styled.div`text-align: center; margin-bottom: 60px; opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'}); transition: all 0.8s ease;`;
const ContemporaryBadge = styled.div`display: inline-block; font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; color: #FFFFFF; background: #FF6B6B; padding: 10px 20px; margin-bottom: 25px;`;
const ContemporaryTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; color: #0D0D0D; margin-bottom: 20px;`;
const ContemporarySubtitle = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 1rem; color: #666; max-width: 500px; margin: 0 auto;`;
const ContemporaryShapes = styled.div`position: absolute; inset: 0; pointer-events: none; z-index: 0;`;
const ContemporaryCircle = styled.div`position: absolute; width: ${p => p.$size}; height: ${p => p.$size}; border-radius: 50%; background: ${p => p.$color}; top: ${p => p.$top || 'auto'}; bottom: ${p => p.$bottom || 'auto'}; left: ${p => p.$left || 'auto'}; right: ${p => p.$right || 'auto'}; opacity: 0.6;`;
const ContemporarySquare = styled.div`position: absolute; width: ${p => p.$size}; height: ${p => p.$size}; background: ${p => p.$color}; top: ${p => p.$top || 'auto'}; bottom: ${p => p.$bottom || 'auto'}; left: ${p => p.$left || 'auto'}; right: ${p => p.$right || 'auto'}; transform: rotate(12deg);`;
const ContemporaryStack = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; position: relative; z-index: 1;`;
const ContemporaryCard = styled.div`opacity: ${p => p.$visible ? 1 : 0}; transform: ${p => p.$visible ? 'translateX(0)' : p.$align === 'left' ? 'translateX(-30px)' : 'translateX(30px)'}; transition: all 0.6s ease; transition-delay: ${p => p.$delay}s;`;
const ContemporaryCardInner = styled.div`display: flex; align-items: center; gap: 15px; padding: 20px; background: #FFFFFF; border: 3px solid #0D0D0D; transition: all 0.3s ease; &:hover { box-shadow: 6px 6px 0 #FF6B6B; transform: translate(-3px, -3px); }`;
const ContemporaryCardIcon = styled.div`font-size: 2rem; flex-shrink: 0;`;
const ContemporaryCardContent = styled.div`flex: 1;`;
const ContemporaryCardName = styled.h3`font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 700; color: #0D0D0D; margin-bottom: 4px;`;
const ContemporaryCardDesc = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem; color: #999; margin: 0;`;
const ContemporaryIncluded = styled.div`width: 28px; height: 28px; background: #4ECDC4; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; flex-shrink: 0;`;

// BOTANICAL STYLES
const BotanicalContainer = styled.div`max-width: 1200px; margin: 0 auto; position: relative;`;
const BotanicalLeaf = styled.div`position: absolute; font-size: 2.5rem; opacity: 0.2; animation: ${leafFloat} 4s ease-in-out infinite; animation-delay: ${p => p.$delay}; top: ${p => p.$top || 'auto'}; bottom: ${p => p.$bottom || 'auto'}; left: ${p => p.$left || 'auto'}; right: ${p => p.$right || 'auto'}; z-index: 0;`;
const BotanicalHeader = styled.div`text-align: center; margin-bottom: 60px; position: relative; z-index: 1; opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'}); transition: all 0.8s ease;`;
const BotanicalEyebrow = styled.span`display: block; font-family: 'Lato', sans-serif; font-size: 0.75rem; font-weight: 400; letter-spacing: 0.4em; color: #7A9972; margin-bottom: 20px;`;
const BotanicalTitle = styled.h2`font-family: 'Playfair Display', Georgia, serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 400; font-style: italic; color: #2C3E2D; margin-bottom: 20px;`;
const BotanicalSubtitle = styled.p`font-family: 'Lato', sans-serif; font-size: 1rem; color: #6B7B6C; max-width: 500px; margin: 0 auto; line-height: 1.8;`;
const BotanicalMasonry = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; position: relative; z-index: 1;`;
const BotanicalCard = styled.div`background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); border-radius: 20px; padding: ${p => p.$size === 'large' ? '30px 25px' : '25px 20px'}; text-align: center; border: 1px solid rgba(122, 153, 114, 0.15); opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '20px'}) scale(${p => p.$visible ? 1 : 0.95}); transition: all 0.6s ease; transition-delay: ${p => p.$delay}s; &:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 15px 40px rgba(122, 153, 114, 0.15); border-color: #7A9972; }`;
const BotanicalCardIcon = styled.div`font-size: 2.2rem; margin-bottom: 12px;`;
const BotanicalCardName = styled.h3`font-family: 'Playfair Display', Georgia, serif; font-size: 1.1rem; font-weight: 500; color: #2C3E2D; margin-bottom: 6px;`;
const BotanicalCardDesc = styled.p`font-family: 'Lato', sans-serif; font-size: 0.8rem; color: #6B7B6C; margin: 0;`;
const BotanicalBadge = styled.span`display: inline-block; font-family: 'Lato', sans-serif; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #7A9972; background: rgba(122, 153, 114, 0.15); padding: 5px 12px; border-radius: 20px; margin-top: 12px;`;

// NEON STYLES
const NeonContainer = styled.div`max-width: 1200px; margin: 0 auto; position: relative;`;
const NeonFrame = styled.div`position: relative; border: 1px solid rgba(0, 255, 255, 0.2); padding: 60px 40px; opacity: ${p => p.$visible ? 1 : 0}; transition: opacity 0.8s ease; @media (max-width: 600px) { padding: 40px 20px; }`;
const NeonFrameCorner = styled.div`position: absolute; width: 20px; height: 20px; border-color: #00ffff; border-style: solid; ${p => p.$position === 'top-left' && css`top: -1px; left: -1px; border-width: 2px 0 0 2px;`} ${p => p.$position === 'top-right' && css`top: -1px; right: -1px; border-width: 2px 2px 0 0;`} ${p => p.$position === 'bottom-left' && css`bottom: -1px; left: -1px; border-width: 0 0 2px 2px;`} ${p => p.$position === 'bottom-right' && css`bottom: -1px; right: -1px; border-width: 0 2px 2px 0;`}`;
const NeonHeader = styled.div`text-align: center; margin-bottom: 50px; opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'}); transition: all 0.8s ease;`;
const NeonEyebrow = styled.span`display: block; font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.4em; color: #00ffff; margin-bottom: 20px; span { color: #ff00ff; }`;
const NeonTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; color: #FFFFFF; margin-bottom: 15px; letter-spacing: 0.05em;`;
const NeonSubtitle = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.95rem; color: rgba(255, 255, 255, 0.5); max-width: 500px; margin: 0 auto;`;
const NeonGrid = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;`;
const NeonCard = styled.div`background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(0, 255, 255, 0.15); padding: 20px; opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '20px'}); transition: all 0.5s ease; transition-delay: ${p => p.$delay}s; &:hover { border-color: #00ffff; animation: ${neonPulse} 1.5s ease-in-out infinite; }`;
const NeonCardHeader = styled.div`display: flex; align-items: center; gap: 12px; margin-bottom: 10px;`;
const NeonCardIcon = styled.div`font-size: 1.5rem;`;
const NeonCardName = styled.h3`font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem; font-weight: 600; color: #FFFFFF;`;
const NeonCardDesc = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; color: rgba(255, 255, 255, 0.4); margin: 0 0 10px 0;`;
const NeonBadge = styled.span`display: inline-block; font-family: 'Space Grotesk', sans-serif; font-size: 0.55rem; font-weight: 600; letter-spacing: 0.1em; color: #00ffff; margin-bottom: 10px;`;
const NeonCardLine = styled.div`height: 1px; background: linear-gradient(90deg, #00ffff, transparent); opacity: 0.3;`;
const NeonFloatingSquare = styled.div`position: absolute; width: 50px; height: 50px; border: 2px solid rgba(0, 255, 255, 0.3); top: ${p => p.$top || 'auto'}; bottom: ${p => p.$bottom || 'auto'}; left: ${p => p.$left || 'auto'}; right: ${p => p.$right || 'auto'}; animation: ${neonPulse} 3s ease-in-out infinite; animation-delay: ${p => p.$delay};`;
const NeonFloatingCircle = styled.div`position: absolute; width: 60px; height: 60px; border: 2px solid rgba(255, 0, 255, 0.3); border-radius: 50%; top: ${p => p.$top || 'auto'}; bottom: ${p => p.$bottom || 'auto'}; left: ${p => p.$left || 'auto'}; right: ${p => p.$right || 'auto'}; animation: ${neonPulse} 4s ease-in-out infinite; animation-delay: ${p => p.$delay};`;

// VIDEO STYLES - Auto-Scroll Carousel
const VideoContainer = styled.div`max-width: 100%; margin: 0 auto;`;
const VideoHeader = styled.div`text-align: center; margin-bottom: 60px; padding: 0 5%; opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'}); transition: all 0.8s ease;`;
const VideoEyebrow = styled.span`display: block; font-family: 'Montserrat', sans-serif; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.3em; color: #B8976A; margin-bottom: 20px;`;
const VideoTitle = styled.h2`font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; font-style: italic; color: #1A1A1A; margin-bottom: 20px;`;
const VideoSubtitle = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.95rem; color: rgba(26, 26, 26, 0.6); max-width: 550px; margin: 0 auto; line-height: 1.8;`;

const VideoCarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 20px 0;
`;

const VideoCarouselTrack = styled.div`
  display: flex;
  gap: 25px;
  width: fit-content;
  animation: ${scrollTrack} 40s linear infinite;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.8s ease;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const VideoCard = styled.div`
  flex-shrink: 0;
  width: 200px;
  text-align: center; 
  padding: 35px 20px; 
  background: #FFFFFF;
  border: 1px solid rgba(184, 151, 106, 0.15);
  transition: all 0.3s ease;
  
  &:hover { 
    border-color: #B8976A; 
    box-shadow: 0 15px 40px rgba(184, 151, 106, 0.15);
    transform: translateY(-5px);
  }
`;

const VideoCardIcon = styled.div`font-size: 2.2rem; margin-bottom: 15px;`;
const VideoCardName = styled.h3`font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.2rem; font-weight: 500; font-style: italic; color: #1A1A1A; margin-bottom: 8px;`;
const VideoCardDesc = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.75rem; color: rgba(26, 26, 26, 0.5); margin: 0;`;
const VideoCardBadge = styled.span`display: inline-block; font-family: 'Montserrat', sans-serif; font-size: 0.55rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #B8976A; border: 1px solid rgba(184, 151, 106, 0.3); padding: 5px 12px; margin-top: 15px;`;

const VideoGoldLine = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(184, 151, 106, 0.4), transparent);
  margin: 40px 5% 0;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 1s ease;
  transition-delay: 0.5s;
`;

// LUXE STYLES
const LuxeContainer = styled.div`max-width: 800px; margin: 0 auto; text-align: center;`;
const LuxeHeader = styled.div`margin-bottom: 60px; opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'}); transition: all 0.8s ease;`;
const LuxeDiamond = styled.div`font-size: 1.5rem; color: #D4AF37; margin-bottom: 25px;`;
const LuxeEyebrow = styled.span`display: block; font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 400; letter-spacing: 0.4em; color: #D4AF37; margin-bottom: 20px;`;
const LuxeTitle = styled.h2`font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; font-style: italic; color: #2A2A2A; margin-bottom: 20px;`;
const LuxeSubtitle = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.9rem; color: rgba(42, 42, 42, 0.6); max-width: 450px; margin: 0 auto; line-height: 1.9;`;
const LuxeList = styled.div`text-align: left;`;
const LuxeDivider = styled.div`height: 1px; background: linear-gradient(90deg, transparent, #D4AF37, transparent); opacity: ${p => p.$visible ? 0.3 : 0}; transition: opacity 0.8s ease; transition-delay: ${p => p.$delay}s;`;
const LuxeItem = styled.div`display: flex; align-items: center; gap: 25px; padding: 25px 0; opacity: ${p => p.$visible ? 1 : 0}; transform: translateX(${p => p.$visible ? 0 : '-20px'}); transition: all 0.6s ease; transition-delay: ${p => p.$delay}s; &:hover .luxe-name { color: #D4AF37; }`;
const LuxeItemIcon = styled.div`font-size: 1.8rem; flex-shrink: 0;`;
const LuxeItemContent = styled.div`flex: 1;`;
const LuxeItemName = styled.h3.attrs({ className: 'luxe-name' })`font-family: 'Montserrat', sans-serif; font-size: 0.85rem; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: #2A2A2A; margin-bottom: 5px; transition: color 0.3s ease;`;
const LuxeItemDesc = styled.p`font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1rem; font-style: italic; color: rgba(42, 42, 42, 0.5); margin: 0;`;
const LuxeBadge = styled.span`font-family: 'Montserrat', sans-serif; font-size: 0.55rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #D4AF37; border: 1px solid rgba(212, 175, 55, 0.3); padding: 6px 12px; flex-shrink: 0;`;
const LuxeFooterDiamond = styled.div`font-size: 1.5rem; color: #D4AF37; margin-top: 40px; opacity: ${p => p.$visible ? 1 : 0}; transition: opacity 0.8s ease; transition-delay: 1.5s;`;
