// src/components/marketing/AboutSection.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const ABOUT_IMAGE = 'https://res.cloudinary.com/si-weddings/image/upload/v1769078167/si_comming_soon_about_pbqwny.jpg';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const leafFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(5deg); }
`;

const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.3); }
  50% { box-shadow: 0 0 40px rgba(0,255,255,0.5), 0 0 60px rgba(0,255,255,0.2); }
`;

const goldShimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const drawLine = keyframes`
  from { width: 0; }
  to { width: 60px; }
`;

// About Content
const aboutContent = {
  eyebrow: 'Über uns',
  title: 'Sarah & Iver',
  text1: 'Hinter S&I stecken wir – Sarah und Iver. Wir haben 2024 selbst geheiratet und wissen genau, wie viel Arbeit in der Planung einer Hochzeit steckt. Die Suche nach der perfekten Hochzeitswebsite war frustrierend: Entweder langweilige Templates oder unbezahlbare Agenturen.',
  text2: 'Also haben wir kurzerhand unsere eigene Website gebaut – und die Reaktionen unserer Gäste waren überwältigend. Daraus entstand die Idee zu S&I Wedding: Premium-Hochzeitswebsites, die so einzigartig sind wie eure Liebe, aber bezahlbar bleiben.',
  text3: 'Jede Website wird von uns persönlich gestaltet. Keine Templates, keine Massenware – nur eure Geschichte, eure Vision, euer Design.',
  signature: '— Sarah & Iver'
};

function AboutSection() {
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
      case 'editorial': return <EditorialLayout content={aboutContent} isVisible={isVisible} />;
      case 'contemporary': return <ContemporaryLayout content={aboutContent} isVisible={isVisible} />;
      case 'botanical': return <BotanicalLayout content={aboutContent} isVisible={isVisible} />;
      case 'neon': return <NeonLayout content={aboutContent} isVisible={isVisible} />;
      case 'video': return <VideoLayout content={aboutContent} isVisible={isVisible} />;
      case 'luxe': return <LuxeLayout content={aboutContent} isVisible={isVisible} />;
      default: return <EditorialLayout content={aboutContent} isVisible={isVisible} />;
    }
  };

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="about">
      {renderContent()}
    </Section>
  );
}

// ============================================
// EDITORIAL LAYOUT - Magazine Style
// ============================================
const EditorialLayout = ({ content, isVisible }) => (
  <EditorialContainer>
    <EditorialGrid>
      <EditorialImageCol $visible={isVisible}>
        <EditorialImage src={ABOUT_IMAGE} alt="Sarah & Iver" />
        <EditorialImageCaption>Sarah & Iver, Hamburg 2024</EditorialImageCaption>
      </EditorialImageCol>
      <EditorialContentCol $visible={isVisible}>
        <EditorialEyebrow>
          <span>—</span> {content.eyebrow} <span>—</span>
        </EditorialEyebrow>
        <EditorialTitle>{content.title}</EditorialTitle>
        <EditorialLine $visible={isVisible} />
        <EditorialDropCap>{content.text1.charAt(0)}</EditorialDropCap>
        <EditorialText>{content.text1.substring(1)}</EditorialText>
        <EditorialText>{content.text2}</EditorialText>
        <EditorialText>{content.text3}</EditorialText>
        <EditorialSignature>{content.signature}</EditorialSignature>
      </EditorialContentCol>
    </EditorialGrid>
    <EditorialPageNumber>05</EditorialPageNumber>
  </EditorialContainer>
);

// ============================================
// CONTEMPORARY LAYOUT - Split with Gradient
// ============================================
const ContemporaryLayout = ({ content, isVisible }) => (
  <ContemporaryContainer>
    <ContemporaryLeft $visible={isVisible}>
      <ContemporaryShapes>
        <ContemporaryCircle $top="10%" $left="5%" $size="60px" $color="#FF6B6B" />
        <ContemporaryCircle $bottom="20%" $left="15%" $size="40px" $color="#4ECDC4" />
        <ContemporarySquare $top="40%" $right="10%" $size="30px" $color="#FFE66D" />
      </ContemporaryShapes>
      <ContemporaryBadge>ÜBER UNS</ContemporaryBadge>
      <ContemporaryTitle>
        <span className="line1">WIR SIND</span>
        <span className="line2">SARAH</span>
        <span className="amp">&</span>
        <span className="line3">IVER.</span>
      </ContemporaryTitle>
      <ContemporaryTextBox>
        <p>{content.text1}</p>
        <p>{content.text2}</p>
      </ContemporaryTextBox>
    </ContemporaryLeft>
    <ContemporaryRight $visible={isVisible}>
      <ContemporaryGradient />
      <ContemporaryImage src={ABOUT_IMAGE} alt="Sarah & Iver" />
      <ContemporaryImageBorder />
    </ContemporaryRight>
  </ContemporaryContainer>
);

// ============================================
// BOTANICAL LAYOUT - Organic with Leaves
// ============================================
const BotanicalLayout = ({ content, isVisible }) => (
  <BotanicalContainer>
    <BotanicalLeaves>
      <BotanicalLeaf $top="5%" $left="3%" $delay="0s">🌿</BotanicalLeaf>
      <BotanicalLeaf $top="20%" $right="5%" $delay="0.5s">🍃</BotanicalLeaf>
      <BotanicalLeaf $bottom="30%" $left="8%" $delay="1s">🌱</BotanicalLeaf>
      <BotanicalLeaf $bottom="10%" $right="10%" $delay="1.5s">🌸</BotanicalLeaf>
    </BotanicalLeaves>
    <BotanicalInner>
      <BotanicalImageWrapper $visible={isVisible}>
        <BotanicalImage src={ABOUT_IMAGE} alt="Sarah & Iver" />
        <BotanicalImageFrame />
      </BotanicalImageWrapper>
      <BotanicalContent $visible={isVisible}>
        <BotanicalEyebrow>✿ {content.eyebrow} ✿</BotanicalEyebrow>
        <BotanicalTitle>{content.title}</BotanicalTitle>
        <BotanicalText>{content.text1}</BotanicalText>
        <BotanicalText>{content.text2}</BotanicalText>
        <BotanicalSignature>{content.signature}</BotanicalSignature>
      </BotanicalContent>
    </BotanicalInner>
  </BotanicalContainer>
);

// ============================================
// NEON LAYOUT - Cyber Profile Card
// ============================================
const NeonLayout = ({ content, isVisible }) => (
  <NeonContainer>
    <NeonFrame $visible={isVisible}>
      <NeonCorner $pos="tl" />
      <NeonCorner $pos="tr" />
      <NeonCorner $pos="bl" />
      <NeonCorner $pos="br" />
      <NeonGrid>
        <NeonImageSection>
          <NeonImageFrame>
            <NeonImage src={ABOUT_IMAGE} alt="Sarah & Iver" />
            <NeonScanline />
          </NeonImageFrame>
          <NeonImageLabel>&gt; FOUNDERS_PROFILE.jpg</NeonImageLabel>
        </NeonImageSection>
        <NeonContentSection>
          <NeonHeader>
            <NeonEyebrow><span>//</span> {content.eyebrow.toUpperCase()} <span>//</span></NeonEyebrow>
            <NeonTitle>SARAH & IVER</NeonTitle>
            <NeonSubtitle>&gt; Founders of S&I Wedding_</NeonSubtitle>
          </NeonHeader>
          <NeonTextBlock>
            <NeonText>{content.text1}</NeonText>
            <NeonText>{content.text2}</NeonText>
          </NeonTextBlock>
          <NeonSignature>
            <span className="bracket">[</span>
            {content.signature}
            <span className="bracket">]</span>
          </NeonSignature>
        </NeonContentSection>
      </NeonGrid>
    </NeonFrame>
  </NeonContainer>
);

// ============================================
// VIDEO LAYOUT - Elegant Split (Hell)
// ============================================
const VideoLayout = ({ content, isVisible }) => (
  <VideoContainer>
    <VideoGrid>
      <VideoImageCol $visible={isVisible}>
        <VideoImage src={ABOUT_IMAGE} alt="Sarah & Iver" />
      </VideoImageCol>
      <VideoContentCol $visible={isVisible}>
        <VideoEyebrow>— {content.eyebrow} —</VideoEyebrow>
        <VideoTitle>{content.title}</VideoTitle>
        <VideoLine $visible={isVisible} />
        <VideoText>{content.text1}</VideoText>
        <VideoText>{content.text2}</VideoText>
        <VideoText>{content.text3}</VideoText>
        <VideoSignature>{content.signature}</VideoSignature>
      </VideoContentCol>
    </VideoGrid>
  </VideoContainer>
);

// ============================================
// LUXE LAYOUT - Black & Gold Elegance
// ============================================
const LuxeLayout = ({ content, isVisible }) => (
  <LuxeContainer>
    <LuxeHeader $visible={isVisible}>
      <LuxeDiamond>✦</LuxeDiamond>
      <LuxeEyebrow>{content.eyebrow.toUpperCase()}</LuxeEyebrow>
    </LuxeHeader>
    <LuxeGrid>
      <LuxeImageCol $visible={isVisible}>
        <LuxeImageFrame>
          <LuxeImage src={ABOUT_IMAGE} alt="Sarah & Iver" />
          <LuxeImageOverlay />
        </LuxeImageFrame>
      </LuxeImageCol>
      <LuxeContentCol $visible={isVisible}>
        <LuxeTitle>{content.title}</LuxeTitle>
        <LuxeDivider $visible={isVisible} />
        <LuxeText>{content.text1}</LuxeText>
        <LuxeText>{content.text2}</LuxeText>
        <LuxeText>{content.text3}</LuxeText>
        <LuxeSignature>
          <span>✦</span> {content.signature} <span>✦</span>
        </LuxeSignature>
      </LuxeContentCol>
    </LuxeGrid>
    <LuxeFooterDiamond $visible={isVisible}>✦</LuxeFooterDiamond>
  </LuxeContainer>
);

export default AboutSection;

// ============================================
// STYLES
// ============================================
const Section = styled.section`
  padding: 100px 20px;
  @media (min-width: 600px) { padding: 140px 5%; }
  position: relative;
  overflow: hidden;
  ${p => p.$themeId === 'editorial' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'botanical' && css`background: linear-gradient(180deg, #F0EDE5 0%, #FAF9F6 100%);`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f;`}
  ${p => p.$themeId === 'video' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`background: #0A0A0A;`}
`;

// ============================================
// EDITORIAL STYLES - Magazine
// ============================================
const EditorialContainer = styled.div`max-width: 1200px; margin: 0 auto; position: relative;`;
const EditorialGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 50px; }
`;
const EditorialImageCol = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s ease;
`;
const EditorialImage = styled.img`
  width: 100%; height: auto; display: block;
  filter: grayscale(20%);
`;
const EditorialImageCaption = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem; letter-spacing: 0.15em; color: #999;
  margin-top: 15px; text-transform: uppercase;
`;
const EditorialContentCol = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s ease 0.2s;
`;
const EditorialEyebrow = styled.span`
  display: block; font-family: 'Inter', sans-serif;
  font-size: 0.65rem; letter-spacing: 0.4em; color: #999; margin-bottom: 25px;
  span { color: #CCC; }
`;
const EditorialTitle = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(3rem, 6vw, 5rem); font-weight: 400; font-style: italic;
  color: #1A1A1A; margin-bottom: 20px; line-height: 1;
`;
const EditorialLine = styled.div`
  height: 1px; background: #1A1A1A; margin-bottom: 30px;
  width: ${p => p.$visible ? '60px' : '0'};
  transition: width 0.8s ease 0.4s;
`;
const EditorialDropCap = styled.span`
  float: left; font-family: 'Instrument Serif', Georgia, serif;
  font-size: 4.5rem; font-style: italic; color: #1A1A1A;
  line-height: 0.8; margin-right: 10px; margin-top: 5px;
`;
const EditorialText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem; color: #555; line-height: 1.9; margin-bottom: 20px;
  &:first-of-type { text-indent: 0; }
`;
const EditorialSignature = styled.div`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.3rem; font-style: italic; color: #1A1A1A; margin-top: 40px;
`;
const EditorialPageNumber = styled.div`
  position: absolute; right: 0; top: 50%;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem; letter-spacing: 0.2em; color: #CCC;
  writing-mode: vertical-rl;
  @media (max-width: 900px) { display: none; }
`;

// ============================================
// CONTEMPORARY STYLES - Split Gradient
// ============================================
const ContemporaryContainer = styled.div`
  max-width: 100%; margin: 0; display: flex; min-height: 500px;
  @media (max-width: 900px) { flex-direction: column; min-height: auto; }
`;
const ContemporaryLeft = styled.div`
  flex: 1; padding: 60px 30px; position: relative;
  display: flex; flex-direction: column; justify-content: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '-40px'});
  transition: all 0.9s ease;
  @media (min-width: 600px) { padding: 80px 60px; }
`;
const ContemporaryShapes = styled.div`position: absolute; inset: 0; pointer-events: none; z-index: 0;`;
const ContemporaryCircle = styled.div`
  position: absolute; border-radius: 50%; opacity: 0.4;
  width: ${p => p.$size}; height: ${p => p.$size}; background: ${p => p.$color};
  top: ${p => p.$top || 'auto'}; bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'}; right: ${p => p.$right || 'auto'};
  animation: ${float} 5s ease-in-out infinite;
`;
const ContemporarySquare = styled.div`
  position: absolute; transform: rotate(12deg); opacity: 0.4;
  width: ${p => p.$size}; height: ${p => p.$size}; background: ${p => p.$color};
  top: ${p => p.$top || 'auto'}; bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'}; right: ${p => p.$right || 'auto'};
  animation: ${float} 6s ease-in-out infinite reverse;
`;
const ContemporaryBadge = styled.div`
  display: inline-block; font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em;
  color: #FFFFFF; background: #0D0D0D; padding: 8px 16px; margin-bottom: 30px;
  align-self: flex-start; position: relative; z-index: 1;
`;
const ContemporaryTitle = styled.div`
  font-family: 'Space Grotesk', sans-serif; position: relative; z-index: 1;
  .line1 { display: block; font-size: 1rem; font-weight: 500; color: #999; letter-spacing: 0.1em; margin-bottom: 10px; }
  .line2 { display: block; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; color: #FF6B6B; line-height: 1; }
  .amp { display: block; font-size: 1.5rem; font-style: italic; color: #999; margin: 5px 0; }
  .line3 { display: block; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; color: #0D0D0D; line-height: 1; margin-bottom: 30px; }
`;
const ContemporaryTextBox = styled.div`
  font-family: 'Space Grotesk', sans-serif; position: relative; z-index: 1;
  p { font-size: 0.95rem; color: #666; line-height: 1.8; margin-bottom: 15px; }
`;
const ContemporaryRight = styled.div`
  flex: 1; position: relative; min-height: 350px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s ease 0.2s;
  @media (min-width: 600px) { min-height: 400px; }
  @media (min-width: 900px) { min-height: 500px; }
`;
const ContemporaryGradient = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(160deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%);
`;
const ContemporaryImage = styled.img`
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 70%; height: 80%; object-fit: cover;
  @media (max-width: 900px) { width: 80%; height: 85%; }
`;
const ContemporaryImageBorder = styled.div`
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 72%; height: 82%; border: 4px solid #FFFFFF;
  pointer-events: none;
  @media (max-width: 900px) { width: 82%; height: 87%; }
`;

// ============================================
// BOTANICAL STYLES - Organic
// ============================================
const BotanicalContainer = styled.div`max-width: 1100px; margin: 0 auto; position: relative;`;
const BotanicalLeaves = styled.div`position: absolute; inset: 0; pointer-events: none; z-index: 0;`;
const BotanicalLeaf = styled.div`
  position: absolute; font-size: 2.5rem; opacity: 0.2;
  animation: ${leafFloat} 5s ease-in-out infinite;
  animation-delay: ${p => p.$delay};
  top: ${p => p.$top || 'auto'}; bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'}; right: ${p => p.$right || 'auto'};
`;
const BotanicalInner = styled.div`
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: center;
  position: relative; z-index: 1;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
`;
const BotanicalImageWrapper = styled.div`
  position: relative;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s ease;
`;
const BotanicalImage = styled.img`
  width: 100%; height: auto; display: block; border-radius: 30px;
`;
const BotanicalImageFrame = styled.div`
  position: absolute; inset: -15px; border: 2px solid rgba(122, 153, 114, 0.3);
  border-radius: 40px; pointer-events: none;
`;
const BotanicalContent = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s ease 0.2s;
`;
const BotanicalEyebrow = styled.span`
  display: block; font-family: 'Lato', sans-serif;
  font-size: 0.75rem; letter-spacing: 0.4em; color: #7A9972; margin-bottom: 20px;
`;
const BotanicalTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 400; font-style: italic;
  color: #2C3E2D; margin-bottom: 30px;
`;
const BotanicalText = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 1rem; color: #5A6B5C; line-height: 1.9; margin-bottom: 20px;
`;
const BotanicalSignature = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.3rem; font-style: italic; color: #7A9972; margin-top: 40px;
`;

// ============================================
// NEON STYLES - Cyber Profile
// ============================================
const NeonContainer = styled.div`max-width: 1100px; margin: 0 auto;`;
const NeonFrame = styled.div`
  position: relative; border: 1px solid rgba(0, 255, 255, 0.3);
  padding: 50px; background: rgba(13, 13, 18, 0.8);
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
  @media (max-width: 600px) { padding: 30px 20px; }
`;
const NeonCorner = styled.div`
  position: absolute; width: 25px; height: 25px;
  border-color: #00ffff; border-style: solid;
  ${p => p.$pos === 'tl' && css`top: -1px; left: -1px; border-width: 2px 0 0 2px;`}
  ${p => p.$pos === 'tr' && css`top: -1px; right: -1px; border-width: 2px 2px 0 0;`}
  ${p => p.$pos === 'bl' && css`bottom: -1px; left: -1px; border-width: 0 0 2px 2px;`}
  ${p => p.$pos === 'br' && css`bottom: -1px; right: -1px; border-width: 0 2px 2px 0;`}
`;
const NeonGrid = styled.div`
  display: grid; grid-template-columns: 350px 1fr; gap: 50px; align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
`;
const NeonImageSection = styled.div``;
const NeonImageFrame = styled.div`
  position: relative; border: 1px solid rgba(0, 255, 255, 0.3);
  padding: 10px; overflow: hidden;
  animation: ${neonPulse} 3s ease-in-out infinite;
`;
const NeonImage = styled.img`
  width: 100%; height: auto; display: block;
  filter: saturate(0.8) contrast(1.1);
`;
const NeonScanline = styled.div`
  position: absolute; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, rgba(0,255,255,0.5), transparent);
  animation: scanMove 3s linear infinite;
  @keyframes scanMove { 0% { top: -10%; } 100% { top: 110%; } }
`;
const NeonImageLabel = styled.p`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.7rem; color: rgba(0, 255, 255, 0.6); margin-top: 10px;
`;
const NeonContentSection = styled.div``;
const NeonHeader = styled.div`margin-bottom: 30px;`;
const NeonEyebrow = styled.span`
  display: block; font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem; letter-spacing: 0.3em; color: #ff00ff; margin-bottom: 15px;
  span { color: #00ffff; }
`;
const NeonTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: #FFFFFF;
  margin-bottom: 10px; letter-spacing: 0.05em;
`;
const NeonSubtitle = styled.p`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.85rem; color: #00ffff;
`;
const NeonTextBlock = styled.div`margin-bottom: 30px;`;
const NeonText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem; color: rgba(255, 255, 255, 0.6); line-height: 1.8; margin-bottom: 15px;
`;
const NeonSignature = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem; color: #00ffff;
  .bracket { color: #ff00ff; }
`;

// ============================================
// VIDEO STYLES - Elegant Split (Hell)
// ============================================
const VideoContainer = styled.div`max-width: 1100px; margin: 0 auto;`;
const VideoGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 50px; }
`;
const VideoImageCol = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '-40px'});
  transition: all 0.9s ease;
`;
const VideoImage = styled.img`
  width: 100%; height: auto; display: block;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
`;
const VideoContentCol = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateX(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s ease 0.2s;
`;
const VideoEyebrow = styled.span`
  display: block; font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem; letter-spacing: 0.3em; color: #B8976A; margin-bottom: 20px;
`;
const VideoTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; font-style: italic;
  color: #1A1A1A; margin-bottom: 20px;
`;
const VideoLine = styled.div`
  height: 1px; background: #B8976A; margin-bottom: 30px;
  width: ${p => p.$visible ? '60px' : '0'};
  transition: width 0.8s ease 0.4s;
`;
const VideoText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem; color: rgba(26, 26, 26, 0.7); line-height: 1.9; margin-bottom: 20px;
`;
const VideoSignature = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.4rem; font-style: italic; color: #B8976A; margin-top: 40px;
`;

// ============================================
// LUXE STYLES - Black & Gold
// ============================================
const LuxeContainer = styled.div`max-width: 1100px; margin: 0 auto; text-align: center;`;
const LuxeHeader = styled.div`
  margin-bottom: 60px;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.8s ease;
`;
const LuxeDiamond = styled.div`font-size: 1.5rem; color: #D4AF37; margin-bottom: 20px;`;
const LuxeEyebrow = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem; letter-spacing: 0.5em; color: #D4AF37;
`;
const LuxeGrid = styled.div`
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center; text-align: left;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 50px; text-align: center; }
`;
const LuxeImageCol = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s ease 0.1s;
`;
const LuxeImageFrame = styled.div`position: relative;`;
const LuxeImage = styled.img`
  width: 100%; height: auto; display: block;
`;
const LuxeImageOverlay = styled.div`
  position: absolute; inset: 0;
  border: 1px solid rgba(212, 175, 55, 0.3);
  pointer-events: none;
`;
const LuxeContentCol = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s ease 0.3s;
`;
const LuxeTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; font-style: italic;
  color: #D4AF37; margin-bottom: 20px;
`;
const LuxeDivider = styled.div`
  height: 1px; margin-bottom: 30px;
  background: linear-gradient(90deg, #D4AF37, transparent);
  width: ${p => p.$visible ? '80px' : '0'};
  transition: width 0.8s ease 0.5s;
  @media (max-width: 900px) { margin: 0 auto 30px; background: linear-gradient(90deg, transparent, #D4AF37, transparent); }
`;
const LuxeText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem; color: rgba(255, 255, 255, 0.6); line-height: 1.9; margin-bottom: 20px;
`;
const LuxeSignature = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.4rem; font-style: italic; color: #D4AF37; margin-top: 40px;
  span { font-size: 0.8rem; margin: 0 10px; }
`;
const LuxeFooterDiamond = styled.div`
  font-size: 1.5rem; color: #D4AF37; margin-top: 80px;
  opacity: ${p => p.$visible ? 1 : 0};
  transition: opacity 0.8s ease 0.8s;
`;
