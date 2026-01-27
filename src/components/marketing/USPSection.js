// src/components/marketing/USPSection.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const leafFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
`;

const drawLine = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const drawLineGold = keyframes`
  from { width: 0; }
  to { width: 80px; }
`;

const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(0,255,255,0.3); }
  50% { box-shadow: 0 0 20px rgba(0,255,255,0.6), 0 0 40px rgba(0,255,255,0.3); }
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const progressFill = keyframes`
  from { width: 0; }
  to { width: var(--progress); }
`;

const goldShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const bounce = keyframes`
  0% { transform: translateY(30px) scale(0.9); opacity: 0; }
  60% { transform: translateY(-5px) scale(1.02); }
  100% { transform: translateY(0) scale(1); opacity: 1; }
`;

// USP Data
const usps = [
  { icon: '✨', title: 'Handgemacht mit Liebe', desc: 'Jede Website wird individuell für euch erstellt – keine Templates, nur einzigartiges Design.', progress: 95 },
  { icon: '📱', title: 'Perfekt auf allen Geräten', desc: 'Responsive Design, das auf Desktop, Tablet und Smartphone gleichermaßen beeindruckt.', progress: 100 },
  { icon: '🎨', title: '6 einzigartige Themes', desc: 'Von minimalistisch bis dramatisch – findet den Stil, der zu euch passt.', progress: 92 },
  { icon: '🔒', title: 'DSGVO-konform', desc: 'Sichere Datenverarbeitung, gehostet in Deutschland. Eure Daten sind geschützt.', progress: 100 },
  { icon: '💬', title: 'Persönlicher Support', desc: 'Direkter Kontakt zu uns – keine Callcenter, echte Menschen die helfen.', progress: 98 },
  { icon: '⚡', title: 'Schnell online', desc: 'In der Regel ist eure Website innerhalb von 5-7 Werktagen fertig und online.', progress: 88 }
];

function USPSection() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const renderContent = () => {
    switch(currentTheme) {
      case 'editorial': return <EditorialLayout usps={usps} isVisible={isVisible} />;
      case 'contemporary': return <ContemporaryLayout usps={usps} isVisible={isVisible} />;
      case 'botanical': return <BotanicalLayout usps={usps} isVisible={isVisible} />;
      case 'neon': return <NeonLayout usps={usps} isVisible={isVisible} />;
      case 'video': return <VideoLayout usps={usps} isVisible={isVisible} />;
      case 'luxe': return <LuxeLayout usps={usps} isVisible={isVisible} />;
      default: return <EditorialLayout usps={usps} isVisible={isVisible} />;
    }
  };

  return (
    <Section ref={sectionRef} $themeId={currentTheme}>
      {renderContent()}
    </Section>
  );
}

// ============================================
// EDITORIAL LAYOUT - Horizontal Lines Reveal
// ============================================
const EditorialLayout = ({ usps, isVisible }) => (
  <EditorialContainer>
    <EditorialHeader $visible={isVisible}>
      <EditorialEyebrow>— Warum S&I —</EditorialEyebrow>
      <EditorialTitle>Was uns besonders macht</EditorialTitle>
    </EditorialHeader>
    <EditorialList>
      {usps.map((usp, i) => (
        <EditorialItem key={usp.title} $visible={isVisible} $delay={0.2 + i * 0.1}>
          <EditorialItemIcon>{usp.icon}</EditorialItemIcon>
          <EditorialItemContent>
            <EditorialItemTitle>{usp.title}</EditorialItemTitle>
            <EditorialItemLine $visible={isVisible} $delay={0.4 + i * 0.1} />
            <EditorialItemDesc>{usp.desc}</EditorialItemDesc>
          </EditorialItemContent>
        </EditorialItem>
      ))}
    </EditorialList>
  </EditorialContainer>
);

// ============================================
// CONTEMPORARY LAYOUT - Bouncy Staggered Grid
// ============================================
const ContemporaryLayout = ({ usps, isVisible }) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF6B6B', '#4ECDC4', '#FFE66D'];
  return (
    <ContemporaryContainer>
      <ContemporaryShapes>
        <ContemporaryCircle $top="5%" $left="3%" $size="80px" $color="#FF6B6B" />
        <ContemporaryCircle $top="40%" $right="5%" $size="50px" $color="#4ECDC4" />
        <ContemporaryDiamond $bottom="20%" $left="8%" $size="40px" $color="#FFE66D" />
        <ContemporarySquare $bottom="10%" $right="10%" $size="35px" />
      </ContemporaryShapes>
      <ContemporaryHeader $visible={isVisible}>
        <ContemporaryBadge>WARUM WIR?</ContemporaryBadge>
        <ContemporaryTitle>WAS UNS BESONDERS MACHT.</ContemporaryTitle>
      </ContemporaryHeader>
      <ContemporaryGrid>
        {usps.map((usp, i) => (
          <ContemporaryCard key={usp.title} $visible={isVisible} $delay={0.1 + i * 0.08} $color={colors[i]}>
            <ContemporaryCardIcon>{usp.icon}</ContemporaryCardIcon>
            <ContemporaryCardTitle>{usp.title}</ContemporaryCardTitle>
            <ContemporaryCardLine $color={colors[i]} />
            <ContemporaryCardDesc>{usp.desc}</ContemporaryCardDesc>
          </ContemporaryCard>
        ))}
      </ContemporaryGrid>
    </ContemporaryContainer>
  );
};

// ============================================
// BOTANICAL LAYOUT - Floating Cards with Parallax Leaves
// ============================================
const BotanicalLayout = ({ usps, isVisible }) => (
  <BotanicalContainer>
    <BotanicalLeaves>
      <BotanicalLeaf $top="0%" $left="5%" $delay="0s" $size="3rem">🌿</BotanicalLeaf>
      <BotanicalLeaf $top="20%" $right="3%" $delay="0.5s" $size="2.5rem">🍃</BotanicalLeaf>
      <BotanicalLeaf $top="50%" $left="2%" $delay="1s" $size="2rem">🌱</BotanicalLeaf>
      <BotanicalLeaf $bottom="30%" $right="8%" $delay="1.5s" $size="2.8rem">🌸</BotanicalLeaf>
      <BotanicalLeaf $bottom="10%" $left="10%" $delay="2s" $size="2.2rem">🍃</BotanicalLeaf>
      <BotanicalLeaf $bottom="5%" $right="15%" $delay="0.8s" $size="1.8rem">🌿</BotanicalLeaf>
    </BotanicalLeaves>
    <BotanicalHeader $visible={isVisible}>
      <BotanicalEyebrow>✿ Warum S&I ✿</BotanicalEyebrow>
      <BotanicalTitle>Was uns besonders macht</BotanicalTitle>
    </BotanicalHeader>
    <BotanicalGrid>
      {usps.map((usp, i) => (
        <BotanicalCard key={usp.title} $visible={isVisible} $delay={0.15 + i * 0.1} $float={i % 2 === 0}>
          <BotanicalCardIcon>{usp.icon}</BotanicalCardIcon>
          <BotanicalCardTitle>{usp.title}</BotanicalCardTitle>
          <BotanicalCardDesc>{usp.desc}</BotanicalCardDesc>
        </BotanicalCard>
      ))}
    </BotanicalGrid>
  </BotanicalContainer>
);

// ============================================
// NEON LAYOUT - Terminal with Progress Bars
// ============================================
const NeonLayout = ({ usps, isVisible }) => (
  <NeonContainer>
    <NeonTerminal $visible={isVisible}>
      <NeonTerminalHeader>
        <NeonDot $color="#ff5f56" />
        <NeonDot $color="#ffbd2e" />
        <NeonDot $color="#27ca40" />
        <NeonTerminalTitle>system_benefits.exe</NeonTerminalTitle>
      </NeonTerminalHeader>
      <NeonTerminalBody>
        <NeonTypingLine $visible={isVisible} $delay="0.3s">
          <span>&gt;</span> SCANNING SYSTEM FEATURES...
        </NeonTypingLine>
        <NeonTypingLine $visible={isVisible} $delay="0.8s">
          <span>&gt;</span> ANALYZING BENEFITS...
        </NeonTypingLine>
        
        <NeonFeatureList>
          {usps.map((usp, i) => (
            <NeonFeature key={usp.title} $visible={isVisible} $delay={1.2 + i * 0.25}>
              <NeonFeatureHeader>
                <NeonFeatureIndex>[0{i + 1}]</NeonFeatureIndex>
                <NeonFeatureTitle>{usp.title.toUpperCase().replace(/ /g, '_')}</NeonFeatureTitle>
              </NeonFeatureHeader>
              <NeonProgressContainer>
                <NeonProgressBar $visible={isVisible} $delay={1.4 + i * 0.25} $progress={usp.progress} />
                <NeonProgressValue>{usp.progress}%</NeonProgressValue>
              </NeonProgressContainer>
              <NeonFeatureDesc>&gt; {usp.desc}</NeonFeatureDesc>
            </NeonFeature>
          ))}
        </NeonFeatureList>
        
        <NeonTypingLine $visible={isVisible} $delay="3.5s">
          <span>&gt;</span> ALL SYSTEMS OPTIMAL. READY FOR WEDDING_MODE<NeonCursor>_</NeonCursor>
        </NeonTypingLine>
      </NeonTerminalBody>
    </NeonTerminal>
  </NeonContainer>
);

// ============================================
// VIDEO LAYOUT - Elegant Horizontal Cards with Gold Lines
// ============================================
const VideoLayout = ({ usps, isVisible }) => (
  <VideoContainer>
    <VideoHeader $visible={isVisible}>
      <VideoEyebrow>— Warum S&I —</VideoEyebrow>
      <VideoTitle>Was uns besonders macht</VideoTitle>
    </VideoHeader>
    <VideoList>
      {usps.map((usp, i) => (
        <VideoCard key={usp.title} $visible={isVisible} $delay={0.2 + i * 0.12}>
          <VideoCardIcon>{usp.icon}</VideoCardIcon>
          <VideoCardContent>
            <VideoCardTitle>{usp.title}</VideoCardTitle>
            <VideoCardLine $visible={isVisible} $delay={0.4 + i * 0.12} />
            <VideoCardDesc>{usp.desc}</VideoCardDesc>
          </VideoCardContent>
        </VideoCard>
      ))}
    </VideoList>
    <VideoFooterLine $visible={isVisible} />
  </VideoContainer>
);

// ============================================
// LUXE LAYOUT - Gold Shimmer Accordion
// ============================================
const LuxeLayout = ({ usps, isVisible }) => {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  return (
    <LuxeContainer>
      <LuxeHeader $visible={isVisible}>
        <LuxeDiamond>✦</LuxeDiamond>
        <LuxeEyebrow>WARUM S&I</LuxeEyebrow>
        <LuxeTitle>Was uns besonders macht</LuxeTitle>
      </LuxeHeader>
      <LuxeList>
        {usps.map((usp, i) => (
          <React.Fragment key={usp.title}>
            <LuxeDivider $visible={isVisible} $delay={0.2 + i * 0.1} />
            <LuxeItem $visible={isVisible} $delay={0.3 + i * 0.1}>
              <LuxeItemNumber>
                <span>✦</span> {romanNumerals[i]} <span>✦</span>
              </LuxeItemNumber>
              <LuxeItemIcon>{usp.icon}</LuxeItemIcon>
              <LuxeItemContent>
                <LuxeItemTitle>{usp.title.toUpperCase()}</LuxeItemTitle>
                <LuxeItemDesc>{usp.desc}</LuxeItemDesc>
              </LuxeItemContent>
            </LuxeItem>
          </React.Fragment>
        ))}
        <LuxeDivider $visible={isVisible} $delay={1} />
      </LuxeList>
      <LuxeFooterDiamond $visible={isVisible}>✦</LuxeFooterDiamond>
    </LuxeContainer>
  );
};

export default USPSection;

// ============================================
// STYLES
// ============================================
const Section = styled.section`
  padding: 100px 20px;
  @media (min-width: 600px) { padding: 140px 5%; }
  position: relative;
  overflow: hidden;
  ${p => p.$themeId === 'editorial' && css`background: #1A1A1A;`}
  ${p => p.$themeId === 'contemporary' && css`background: #0D0D0D;`}
  ${p => p.$themeId === 'botanical' && css`background: #2C3E2D;`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f;`}
  ${p => p.$themeId === 'video' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'luxe' && css`background: #0A0A0A;`}
`;

// ============================================
// EDITORIAL STYLES
// ============================================
const EditorialContainer = styled.div`max-width: 900px; margin: 0 auto;`;
const EditorialHeader = styled.div`
  text-align: center; margin-bottom: 80px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;
const EditorialEyebrow = styled.span`
  display: block; font-family: 'Inter', sans-serif;
  font-size: 0.7rem; letter-spacing: 0.3em; color: #666; margin-bottom: 20px;
`;
const EditorialTitle = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 400; font-style: italic; color: #FFFFFF;
`;
const EditorialList = styled.div`display: flex; flex-direction: column; gap: 40px;`;
const EditorialItem = styled.div`
  display: flex; align-items: flex-start; gap: 30px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '-40px'});
  transition: all 0.6s ease;
  transition-delay: ${p => p.$delay}s;
  @media (max-width: 600px) { gap: 20px; }
`;
const EditorialItemIcon = styled.div`
  font-size: 2.5rem; flex-shrink: 0;
  @media (max-width: 600px) { font-size: 2rem; }
`;
const EditorialItemContent = styled.div`flex: 1;`;
const EditorialItemTitle = styled.h3`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.4rem; font-style: italic; color: #FFFFFF; margin-bottom: 10px;
`;
const EditorialItemLine = styled.div`
  height: 1px; background: #444; margin-bottom: 12px;
  width: ${p => p.$visible ? '100%' : '0'};
  transition: width 0.8s ease;
  transition-delay: ${p => p.$delay}s;
`;
const EditorialItemDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem; color: rgba(255,255,255,0.6); line-height: 1.8;
`;

// ============================================
// CONTEMPORARY STYLES
// ============================================
const ContemporaryContainer = styled.div`max-width: 1100px; margin: 0 auto; position: relative;`;
const ContemporaryShapes = styled.div`position: absolute; inset: 0; pointer-events: none; z-index: 0;`;
const ContemporaryCircle = styled.div`
  position: absolute; border-radius: 50%; opacity: 0.5;
  width: ${p => p.$size}; height: ${p => p.$size}; background: ${p => p.$color};
  top: ${p => p.$top || 'auto'}; bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'}; right: ${p => p.$right || 'auto'};
  animation: ${float} 6s ease-in-out infinite;
`;
const ContemporaryDiamond = styled.div`
  position: absolute; transform: rotate(45deg); opacity: 0.5;
  width: ${p => p.$size}; height: ${p => p.$size}; background: ${p => p.$color};
  top: ${p => p.$top || 'auto'}; bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'}; right: ${p => p.$right || 'auto'};
  animation: ${float} 7s ease-in-out infinite reverse;
`;
const ContemporarySquare = styled.div`
  position: absolute; border: 3px solid #FFFFFF; opacity: 0.2;
  width: ${p => p.$size}; height: ${p => p.$size};
  top: ${p => p.$top || 'auto'}; bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'}; right: ${p => p.$right || 'auto'};
  animation: ${float} 8s ease-in-out infinite;
`;
const ContemporaryHeader = styled.div`
  text-align: center; margin-bottom: 60px; position: relative; z-index: 1;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;
const ContemporaryBadge = styled.div`
  display: inline-block; font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;
  color: #0D0D0D; background: #FFE66D; padding: 10px 20px; margin-bottom: 25px;
`;
const ContemporaryTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; color: #FFFFFF;
`;
const ContemporaryGrid = styled.div`
  display: grid; 
  grid-template-columns: 1fr; 
  gap: 20px;
  position: relative; z-index: 1;
  @media (min-width: 600px) { grid-template-columns: repeat(2, 1fr); gap: 25px; }
  @media (min-width: 900px) { grid-template-columns: repeat(3, 1fr); }
`;
const ContemporaryCard = styled.div`
  background: #FFFFFF; border: 3px solid #FFFFFF; padding: 30px 20px;
  opacity: ${p => p.$visible ? 1 : 0};
  animation: ${p => p.$visible ? css`${bounce} 0.6s ease forwards` : 'none'};
  animation-delay: ${p => p.$delay}s;
  transition: all 0.3s ease;
  @media (min-width: 600px) { padding: 35px 25px; }
  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: 8px 8px 0 ${p => p.$color};
  }
`;
const ContemporaryCardIcon = styled.div`font-size: 2.5rem; margin-bottom: 20px;`;
const ContemporaryCardTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem; font-weight: 700; color: #0D0D0D; margin-bottom: 12px;
`;
const ContemporaryCardLine = styled.div`
  width: 40px; height: 4px; background: ${p => p.$color}; margin-bottom: 15px;
`;
const ContemporaryCardDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem; color: #666; line-height: 1.7;
`;

// ============================================
// BOTANICAL STYLES
// ============================================
const BotanicalContainer = styled.div`max-width: 1100px; margin: 0 auto; position: relative;`;
const BotanicalLeaves = styled.div`position: absolute; inset: 0; pointer-events: none; z-index: 0;`;
const BotanicalLeaf = styled.div`
  position: absolute; font-size: ${p => p.$size}; opacity: 0.15;
  animation: ${leafFloat} 5s ease-in-out infinite;
  animation-delay: ${p => p.$delay};
  top: ${p => p.$top || 'auto'}; bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'}; right: ${p => p.$right || 'auto'};
`;
const BotanicalHeader = styled.div`
  text-align: center; margin-bottom: 60px; position: relative; z-index: 1;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;
const BotanicalEyebrow = styled.span`
  display: block; font-family: 'Lato', sans-serif;
  font-size: 0.75rem; letter-spacing: 0.4em; color: #8B9D83; margin-bottom: 20px;
`;
const BotanicalTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 400; font-style: italic; color: #F5F1EB;
`;
const BotanicalGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px;
  position: relative; z-index: 1;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;
const BotanicalCard = styled.div`
  background: rgba(255,255,255,0.08); backdrop-filter: blur(10px);
  border-radius: 20px; padding: 35px 25px; text-align: center;
  border: 1px solid rgba(139, 157, 131, 0.2);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.6s ease;
  transition-delay: ${p => p.$delay}s;
  animation: ${p => p.$visible && p.$float ? css`${float} 4s ease-in-out infinite` : 'none'};
  animation-delay: ${p => p.$delay}s;
  &:hover {
    transform: translateY(-8px);
    background: rgba(255,255,255,0.12);
    border-color: #8B9D83;
  }
`;
const BotanicalCardIcon = styled.div`font-size: 2.5rem; margin-bottom: 20px;`;
const BotanicalCardTitle = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.3rem; font-style: italic; color: #F5F1EB; margin-bottom: 12px;
`;
const BotanicalCardDesc = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem; color: rgba(245, 241, 235, 0.6); line-height: 1.7;
`;

// ============================================
// NEON STYLES
// ============================================
const NeonContainer = styled.div`max-width: 900px; margin: 0 auto;`;
const NeonTerminal = styled.div`
  background: #0D0D12; border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px; overflow: hidden;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;
const NeonTerminalHeader = styled.div`
  display: flex; align-items: center; gap: 8px;
  padding: 15px 20px; background: #1A1A22;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
`;
const NeonDot = styled.div`width: 12px; height: 12px; border-radius: 50%; background: ${p => p.$color};`;
const NeonTerminalTitle = styled.span`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.8rem; color: rgba(255, 255, 255, 0.5); margin-left: 15px;
`;
const NeonTerminalBody = styled.div`padding: 30px;`;
const NeonTypingLine = styled.div`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.85rem; color: #00ffff; margin-bottom: 20px;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.5s ease;
  transition-delay: ${p => p.$delay};
  span { color: #ff00ff; }
`;
const NeonCursor = styled.span`animation: ${blink} 1s infinite;`;
const NeonFeatureList = styled.div`display: flex; flex-direction: column; gap: 25px; margin: 30px 0;`;
const NeonFeature = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '-20px'});
  transition: all 0.5s ease;
  transition-delay: ${p => p.$delay}s;
`;
const NeonFeatureHeader = styled.div`display: flex; align-items: center; gap: 15px; margin-bottom: 8px;`;
const NeonFeatureIndex = styled.span`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.85rem; color: #ff00ff;
`;
const NeonFeatureTitle = styled.span`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.95rem; color: #FFFFFF; font-weight: 600;
`;
const NeonProgressContainer = styled.div`display: flex; align-items: center; gap: 15px; margin-bottom: 8px;`;
const NeonProgressBar = styled.div`
  flex: 1; height: 6px; background: rgba(0, 255, 255, 0.1); border-radius: 3px;
  position: relative; overflow: hidden;
  &::after {
    content: '';
    position: absolute; left: 0; top: 0; height: 100%;
    background: linear-gradient(90deg, #00ffff, #ff00ff);
    border-radius: 3px;
    width: ${p => p.$visible ? `${p.$progress}%` : '0'};
    transition: width 1s ease;
    transition-delay: ${p => p.$delay}s;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
`;
const NeonProgressValue = styled.span`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.8rem; color: #00ffff; min-width: 45px;
`;
const NeonFeatureDesc = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem; color: rgba(255, 255, 255, 0.4);
  padding-left: 55px; line-height: 1.6;
`;

// ============================================
// VIDEO STYLES - Elegant with Gold Lines
// ============================================
const VideoContainer = styled.div`max-width: 900px; margin: 0 auto;`;
const VideoHeader = styled.div`
  text-align: center; margin-bottom: 80px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;
const VideoEyebrow = styled.span`
  display: block; font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem; letter-spacing: 0.3em; color: #B8976A; margin-bottom: 20px;
`;
const VideoTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; font-style: italic; color: #1A1A1A;
`;
const VideoList = styled.div`display: flex; flex-direction: column; gap: 30px;`;
const VideoCard = styled.div`
  display: flex; align-items: flex-start; gap: 30px;
  padding: 30px; background: #FFFFFF;
  border: 1px solid rgba(184, 151, 106, 0.15);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.6s ease;
  transition-delay: ${p => p.$delay}s;
  &:hover {
    border-color: #B8976A;
    box-shadow: 0 10px 40px rgba(184, 151, 106, 0.1);
  }
  @media (max-width: 600px) { gap: 20px; padding: 25px 20px; }
`;
const VideoCardIcon = styled.div`
  font-size: 2.5rem; flex-shrink: 0;
  @media (max-width: 600px) { font-size: 2rem; }
`;
const VideoCardContent = styled.div`flex: 1;`;
const VideoCardTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.4rem; font-weight: 500; font-style: italic; color: #1A1A1A; margin-bottom: 12px;
`;
const VideoCardLine = styled.div`
  height: 1px; background: #B8976A; margin-bottom: 15px;
  width: ${p => p.$visible ? '80px' : '0'};
  transition: width 0.8s ease;
  transition-delay: ${p => p.$delay}s;
`;
const VideoCardDesc = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem; color: rgba(26, 26, 26, 0.6); line-height: 1.8;
`;
const VideoFooterLine = styled.div`
  height: 1px; margin-top: 60px;
  background: linear-gradient(90deg, transparent, rgba(184, 151, 106, 0.4), transparent);
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 1s ease;
  transition-delay: 1.2s;
`;

// ============================================
// LUXE STYLES
// ============================================
const LuxeContainer = styled.div`max-width: 800px; margin: 0 auto; text-align: center;`;
const LuxeHeader = styled.div`
  margin-bottom: 60px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;
const LuxeDiamond = styled.div`font-size: 1.5rem; color: #D4AF37; margin-bottom: 25px;`;
const LuxeEyebrow = styled.span`
  display: block; font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem; letter-spacing: 0.4em; color: #D4AF37; margin-bottom: 20px;
`;
const LuxeTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; font-style: italic; color: #FEFEFE;
`;
const LuxeList = styled.div`text-align: left;`;
const LuxeDivider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  opacity: ${p => p.$visible ? 0.3 : 0};
  transition: opacity 0.8s ease;
  transition-delay: ${p => p.$delay}s;
`;
const LuxeItem = styled.div`
  display: flex; align-items: flex-start; gap: 25px; padding: 35px 0;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '20px'});
  transition: all 0.6s ease;
  transition-delay: ${p => p.$delay}s;
  @media (max-width: 600px) { flex-wrap: wrap; gap: 15px; }
`;
const LuxeItemNumber = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1rem; font-style: italic; color: #D4AF37;
  min-width: 80px; flex-shrink: 0;
  span { font-size: 0.7rem; }
  @media (max-width: 600px) { min-width: auto; }
`;
const LuxeItemIcon = styled.div`font-size: 2rem; flex-shrink: 0;`;
const LuxeItemContent = styled.div`flex: 1;`;
const LuxeItemTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem; font-weight: 400; letter-spacing: 0.2em;
  color: #FEFEFE; margin-bottom: 10px;
`;
const LuxeItemDesc = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.05rem; font-style: italic; color: rgba(255, 255, 255, 0.5); line-height: 1.8;
`;
const LuxeFooterDiamond = styled.div`
  font-size: 1.5rem; color: #D4AF37; margin-top: 40px;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.8s ease;
  transition-delay: 1.2s;
`;
