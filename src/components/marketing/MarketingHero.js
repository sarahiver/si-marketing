// src/components/marketing/MarketingHero.js
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// MEDIA URLS
// ============================================
const VIDEO_URL = 'https://res.cloudinary.com/si-weddings/video/upload/v1769070616/si_comming_soon_video_hero_xga2ia.mp4';
const LUXE_BG_URL = 'https://res.cloudinary.com/si-weddings/image/upload/v1769072318/si_cooming_soon_luxe_hero_wowu9v.jpg';

// ============================================
// ANIMATIONS
// ============================================
const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -15px) rotate(5deg); }
  50% { transform: translate(-5px, -25px) rotate(-3deg); }
  75% { transform: translate(-15px, -10px) rotate(2deg); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-20px, 15px) rotate(-8deg); }
  66% { transform: translate(15px, -10px) rotate(5deg); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(10px, 20px) scale(1.1); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scrollBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
`;

const leafFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
`;

const textReveal = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px);
    filter: blur(10px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
    filter: blur(0);
  }
`;

const drawLine = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const drawLineVertical = keyframes`
  from { height: 0; }
  to { height: 100%; }
`;

// Neon animations
const glitch = keyframes`
  0%, 100% { 
    transform: translate(0);
    text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
  }
  20% { 
    transform: translate(-2px, 2px);
    text-shadow: 4px 0 #ff00ff, -4px 0 #00ffff;
  }
  40% { 
    transform: translate(-2px, -2px);
    text-shadow: 2px 0 #00ffff, -2px 0 #ff00ff;
  }
  60% { 
    transform: translate(2px, 2px);
    text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff;
  }
  80% { 
    transform: translate(2px, -2px);
    text-shadow: 4px 0 #00ffff, -4px 0 #ff00ff;
  }
`;

const neonWobble = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.02) rotate(0.5deg); }
  50% { transform: scale(0.98) rotate(-0.5deg); }
  75% { transform: scale(1.01) rotate(0.3deg); }
`;

const geometricFloat = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, -30px) rotate(90deg); }
  50% { transform: translate(-10px, -50px) rotate(180deg); }
  75% { transform: translate(-30px, -20px) rotate(270deg); }
`;

const geometricFloat2 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-40px, 20px) rotate(-120deg); }
  66% { transform: translate(30px, -40px) rotate(120deg); }
`;

const scanlineMove = keyframes`
  0% { top: -10%; }
  100% { top: 110%; }
`;

const neonPulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
`;

// ============================================
// MAIN COMPONENT
// ============================================
const MarketingHero = () => {
  const { currentTheme } = useTheme();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDesigns = () => {
    document.getElementById('designs')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentTheme === 'luxe') return <LuxeHero scrollToContact={scrollToContact} scrollToDesigns={scrollToDesigns} />;
  if (currentTheme === 'botanical') return <BotanicalHero scrollToContact={scrollToContact} scrollToDesigns={scrollToDesigns} />;
  if (currentTheme === 'video') return <VideoHero scrollToContact={scrollToContact} scrollToDesigns={scrollToDesigns} />;
  if (currentTheme === 'editorial') return <EditorialHero scrollToContact={scrollToContact} scrollToDesigns={scrollToDesigns} />;
  if (currentTheme === 'neon') return <NeonHero scrollToContact={scrollToContact} scrollToDesigns={scrollToDesigns} />;
  return <ContemporaryHero scrollToContact={scrollToContact} scrollToDesigns={scrollToDesigns} />;
};

// ============================================
// EDITORIAL HERO - Mit hellgrauen Linien
// ============================================
const EditorialHero = ({ scrollToContact, scrollToDesigns }) => (
  <EditorialSection>
    {/* Hellgraue Linien im Hintergrund */}
    <EditorialLines>
      <HLine $top="12%" $delay="0.3s" />
      <HLine $top="88%" $delay="0.5s" />
      <VLine $left="8%" $delay="0.4s" />
      <VLine $right="8%" $delay="0.6s" />
      <VLine $left="50%" $delay="0.7s" />
    </EditorialLines>
    
    <EditorialContainer>
      <EditorialEyebrow>PREMIUM WEDDING WEBSITES</EditorialEyebrow>
      
      <EditorialMainTagline>
        Individuelle Hochzeitswebsites
      </EditorialMainTagline>
      
      <EditorialTagline>
        <em>die so einzigartig sind wie eure Liebe</em>
      </EditorialTagline>
      
      <EditorialDivider />
      
      <EditorialDate>6 einzigartige Designs</EditorialDate>
      <EditorialLocation>SIWEDDING.DE</EditorialLocation>
      
      <EditorialButtonGroup>
        <EditorialPrimaryBtn onClick={scrollToContact}>Jetzt anfragen</EditorialPrimaryBtn>
        <EditorialSecondaryBtn onClick={scrollToDesigns}>Designs entdecken</EditorialSecondaryBtn>
      </EditorialButtonGroup>
    </EditorialContainer>

    <EditorialScrollIndicator onClick={scrollToDesigns}>
      <span>SCROLL</span>
      <EditorialScrollArrow>↓</EditorialScrollArrow>
    </EditorialScrollIndicator>
  </EditorialSection>
);

// ============================================
// BOTANICAL HERO - Coming Soon Design mit Text-Animation
// ============================================
const BotanicalHero = ({ scrollToContact, scrollToDesigns }) => (
  <BotanicalSection>
    {/* Floating Leaves - wie Coming Soon */}
    <BotanicalLeaf $position="top-left" style={{fontSize: '4rem'}}>🌿</BotanicalLeaf>
    <BotanicalLeaf $position="top-right" style={{fontSize: '3rem'}}>🍃</BotanicalLeaf>
    <BotanicalLeaf $position="top-center" style={{fontSize: '2.5rem', top: '8%', left: '30%'}}>🌱</BotanicalLeaf>
    <BotanicalLeaf $position="mid-right" style={{fontSize: '3.5rem', top: '25%', right: '5%'}}>🌿</BotanicalLeaf>
    <BotanicalLeaf $position="bottom-left" style={{fontSize: '5rem'}}>🌸</BotanicalLeaf>
    <BotanicalLeaf $position="bottom-right" style={{fontSize: '3rem'}}>🌿</BotanicalLeaf>
    
    <BotanicalContent>
      <BotanicalEyebrow $delay="0s">✿ NATÜRLICH SCHÖN ✿</BotanicalEyebrow>
      
      <BotanicalMainTagline $delay="0.2s">
        Wo Liebe erblüht
      </BotanicalMainTagline>
      
      <BotanicalTagline $delay="0.4s">
        Organisch schön, liebevoll gestaltet. Hochzeitswebsites,<br/>
        die sich anfühlen wie ein Spaziergang durch einen blühenden Garten.
      </BotanicalTagline>
      
      <BotanicalButtonGroup $delay="0.6s">
        <BotanicalPrimaryBtn onClick={scrollToContact}>Jetzt Starten</BotanicalPrimaryBtn>
        <BotanicalSecondaryBtn onClick={scrollToDesigns}>Designs Entdecken</BotanicalSecondaryBtn>
      </BotanicalButtonGroup>
    </BotanicalContent>

    <BotanicalScrollIndicator onClick={scrollToDesigns}>
      <BotanicalScrollDot />
      <span>SCROLL TO EXPLORE</span>
    </BotanicalScrollIndicator>
  </BotanicalSection>
);

// ============================================
// CONTEMPORARY HERO - 2-Spalten mit Gradient
// ============================================
const ContemporaryHero = ({ scrollToContact, scrollToDesigns }) => (
  <ContemporaryWrapper>
    {/* Linke Seite - Content */}
    <ContemporaryLeft>
      {/* Floating Shapes auf linker Seite */}
      <ContemporaryShapesLeft>
        <ContemporaryCircle $top="8%" $left="40%" $size="70px" $color="#FF6B6B" $delay="0s" />
        <ContemporaryCircle $top="55%" $left="45%" $size="25px" $color="#FFE66D" $delay="0.5s" />
        <ContemporarySquareOutline $bottom="18%" $left="50%" $size="35px" $delay="1s" />
        <ContemporaryDiamond $bottom="25%" $left="0%" $size="40px" $color="#4ECDC4" $delay="0.3s" />
      </ContemporaryShapesLeft>
      
      <ContemporaryLeftContent>
        <ContemporaryEyebrow>WE'RE GETTING MARRIED ————</ContemporaryEyebrow>
        
        <ContemporaryNames>
          <ContemporaryName1>SOPHIE</ContemporaryName1>
          <ContemporaryNameRow>
            <ContemporaryAmpersand>&</ContemporaryAmpersand>
            <ContemporaryName2>MAX</ContemporaryName2>
          </ContemporaryNameRow>
        </ContemporaryNames>
        
        <ContemporaryLocation>
          <span>📍</span> Schloss Heidelberg
        </ContemporaryLocation>
        
        <ContemporaryButtonGroup>
          <ContemporaryPrimaryBtn onClick={scrollToContact}>JETZT ZUSAGEN →</ContemporaryPrimaryBtn>
          <ContemporarySecondaryBtn onClick={scrollToDesigns}>UNSERE STORY</ContemporarySecondaryBtn>
        </ContemporaryButtonGroup>
      </ContemporaryLeftContent>
      
      <ContemporaryScrollIndicator onClick={scrollToDesigns}>
        <ContemporaryScrollDot />
        <span>SCROLL TO EXPLORE</span>
      </ContemporaryScrollIndicator>
    </ContemporaryLeft>
    
    {/* Rechte Seite - Gradient */}
    <ContemporaryRight>
      <ContemporaryGradientOverlay />
      <ContemporaryDateBox>15. AUGUST 2025</ContemporaryDateBox>
      <ContemporarySquareOutline $bottom="15%" $right="15%" $size="40px" $delay="0.8s" style={{position: 'absolute'}} />
    </ContemporaryRight>
  </ContemporaryWrapper>
);

// ============================================
// NEON HERO - Wabernde Schrift, bewegende Elemente
// ============================================
const NeonHero = ({ scrollToContact, scrollToDesigns }) => (
  <NeonWrapper>
    {/* Scanline von oben nach unten */}
    <NeonScanline />
    
    {/* Grid Background */}
    <NeonGrid />
    
    {/* Horizontale Linien */}
    <NeonHorizontalLine $top="30%" />
    <NeonHorizontalLine $bottom="25%" />
    
    {/* Neon Frame */}
    <NeonFrame />
    
    {/* Bewegende geometrische Elemente */}
    <NeonGeometricElements>
      <NeonSquare $top="8%" $left="3%" $size="60px" $delay="0s" />
      <NeonSquare $top="15%" $right="8%" $size="80px" $delay="0.5s" $color="#ff00ff" />
      <NeonCircle $bottom="18%" $left="5%" $size="90px" $delay="1s" />
      <NeonTriangle $bottom="22%" $right="12%" $delay="0.7s" />
    </NeonGeometricElements>
    
    <NeonContent>
      <NeonBadge>
        <span>//</span> COMING SOON <span>//</span>
      </NeonBadge>
      
      {/* Waberndes Logo mit Glitch */}
      <NeonTitleWrapper>
        <NeonTitle>S&I.</NeonTitle>
        <NeonTitleGlitch>S&I.</NeonTitleGlitch>
        <NeonTitleGlitch2>S&I.</NeonTitleGlitch2>
      </NeonTitleWrapper>
      
      <NeonSubtitle>Individuelle Hochzeitswebsites</NeonSubtitle>
      <NeonSubtitleSmall>die so einzigartig sind wie eure Liebe</NeonSubtitleSmall>
      
      <NeonDateBadge>
        <NeonDateLine />
        <NeonDate>01. OKTOBER 2026</NeonDate>
        <NeonDateLine />
      </NeonDateBadge>
      
      <NeonCTA onClick={scrollToContact}>
        Let's make it epic
        <span>→</span>
      </NeonCTA>
    </NeonContent>
    
    <NeonScrollIndicator onClick={scrollToDesigns}>
      <span>SCROLL TO EXPLORE</span>
      <NeonScrollArrow>↓</NeonScrollArrow>
    </NeonScrollIndicator>
  </NeonWrapper>
);

// ============================================
// VIDEO HERO - Unverändert
// ============================================
const VideoHero = ({ scrollToContact, scrollToDesigns }) => (
  <VideoSection>
    <VideoBackground>
      <video autoPlay muted loop playsInline>
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <VideoOverlay />
    </VideoBackground>

    <VideoContent>
      <VideoEyebrow>PREMIUM WEDDING WEBSITES</VideoEyebrow>
      <VideoMainTagline>Individuelle Hochzeitswebsites</VideoMainTagline>
      <VideoTagline><em>die so einzigartig sind wie eure Liebe</em></VideoTagline>
      
      <VideoButtonGroup>
        <VideoPrimaryBtn onClick={scrollToContact}>Jetzt anfragen</VideoPrimaryBtn>
        <VideoSecondaryBtn onClick={scrollToDesigns}>Designs entdecken</VideoSecondaryBtn>
      </VideoButtonGroup>
    </VideoContent>

    <VideoScrollIndicator onClick={scrollToDesigns}>
      <span>ENTDECKEN</span>
      <VideoScrollArrow>∨</VideoScrollArrow>
    </VideoScrollIndicator>
  </VideoSection>
);

// ============================================
// LUXE HERO - Unverändert
// ============================================
const LuxeHero = ({ scrollToContact, scrollToDesigns }) => (
  <LuxeSection>
    <LuxeBgImage style={{ backgroundImage: `url(${LUXE_BG_URL})` }} />
    <LuxeOverlay />
    
    <LuxeContent>
      <LuxeEyebrow>PREMIUM WEDDING WEBSITES</LuxeEyebrow>
      <LuxeMainTagline>Individuelle Hochzeitswebsites</LuxeMainTagline>
      <LuxeTagline>die so einzigartig sind wie eure Liebe</LuxeTagline>
      
      <LuxeButtonGroup>
        <LuxePrimaryBtn onClick={scrollToContact}>Jetzt anfragen</LuxePrimaryBtn>
        <LuxeSecondaryBtn onClick={scrollToDesigns}>Designs entdecken</LuxeSecondaryBtn>
      </LuxeButtonGroup>
    </LuxeContent>

    <LuxeScrollIndicator onClick={scrollToDesigns}>
      <span>ENTDECKEN</span>
      <LuxeScrollArrow>↓</LuxeScrollArrow>
    </LuxeScrollIndicator>
  </LuxeSection>
);

export default MarketingHero;

// ============================================
// EDITORIAL STYLES
// ============================================
const EditorialSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 100px 5% 60px;
  background: #FFFFFF;
`;

const EditorialLines = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
`;

const HLine = styled.div`
  position: absolute;
  left: 0;
  height: 1px;
  background: #E8E8E8;
  animation: ${drawLine} 2s ease forwards;
  animation-delay: ${p => p.$delay || '0s'};
  width: 0;
  top: ${p => p.$top || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
`;

const VLine = styled.div`
  position: absolute;
  top: 0;
  width: 1px;
  background: #E8E8E8;
  animation: ${drawLineVertical} 2s ease forwards;
  animation-delay: ${p => p.$delay || '0s'};
  height: 0;
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
`;

const EditorialContainer = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 1s ease-out;
`;

const EditorialEyebrow = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #999;
  margin-bottom: 80px;
`;

const EditorialMainTagline = styled.h1`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 400;
  font-style: italic;
  color: #1A1A1A;
  line-height: 1.1;
  margin-bottom: 20px;
`;

const EditorialTagline = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 400;
  color: #666;
  line-height: 1.8;
  margin-bottom: 40px;
  
  em {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
    color: #1A1A1A;
  }
`;

const EditorialDivider = styled.div`
  width: 40px;
  height: 1px;
  background: #1A1A1A;
  margin: 0 auto 25px;
`;

const EditorialDate = styled.div`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-style: italic;
  color: #1A1A1A;
  margin-bottom: 8px;
`;

const EditorialLocation = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #999;
  margin-bottom: 60px;
`;

const EditorialButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const EditorialPrimaryBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: #1A1A1A;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { background: #333; }
`;

const EditorialSecondaryBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: transparent;
  color: #1A1A1A;
  border: 1px solid #1A1A1A;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { background: #1A1A1A; color: #FFFFFF; }
`;

const EditorialScrollIndicator = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  span {
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: #999;
  }
`;

const EditorialScrollArrow = styled.span`
  font-size: 1rem;
  color: #999;
  animation: ${scrollBounce} 1.5s ease-in-out infinite;
`;

// ============================================
// BOTANICAL STYLES
// ============================================
const BotanicalSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 100px 5% 60px;
  background: linear-gradient(180deg, #FAF9F6 0%, #F0EDE5 100%);
`;

const BotanicalLeaf = styled.div`
  position: absolute;
  opacity: 0.25;
  animation: ${leafFloat} 5s ease-in-out infinite;
  z-index: 0;
  
  ${p => p.$position === 'top-left' && css`top: 8%; left: 3%; animation-delay: 0s;`}
  ${p => p.$position === 'top-right' && css`top: 12%; right: 10%; animation-delay: 1s;`}
  ${p => p.$position === 'bottom-left' && css`bottom: 15%; left: 8%; animation-delay: 0.5s;`}
  ${p => p.$position === 'bottom-right' && css`bottom: 20%; right: 5%; animation-delay: 1.5s;`}
`;

const BotanicalContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
`;

const BotanicalEyebrow = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.4em;
  color: #7A9972;
  margin-bottom: 25px;
  animation: ${textReveal} 0.8s ease forwards;
  animation-delay: ${p => p.$delay || '0s'};
  opacity: 0;
`;

const BotanicalMainTagline = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 400;
  color: #2C3E2D;
  line-height: 1.2;
  margin-bottom: 25px;
  animation: ${textReveal} 0.8s ease forwards;
  animation-delay: ${p => p.$delay || '0s'};
  opacity: 0;
`;

const BotanicalTagline = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: clamp(1rem, 2vw, 1.15rem);
  font-weight: 300;
  color: #6B7B6C;
  line-height: 1.9;
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  animation: ${textReveal} 0.8s ease forwards;
  animation-delay: ${p => p.$delay || '0s'};
  opacity: 0;
`;

const BotanicalButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${textReveal} 0.8s ease forwards;
  animation-delay: ${p => p.$delay || '0s'};
  opacity: 0;
`;

const BotanicalPrimaryBtn = styled.button`
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 18px 45px;
  background: #7A9972;
  color: #FFFFFF;
  border: none;
  border-radius: 35px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { background: #5A7952; transform: translateY(-2px); }
`;

const BotanicalSecondaryBtn = styled.button`
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 18px 45px;
  background: transparent;
  color: #2C3E2D;
  border: 1.5px solid #2C3E2D;
  border-radius: 35px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { background: #2C3E2D; color: #FFFFFF; }
`;

const BotanicalScrollIndicator = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  span {
    font-family: 'Lato', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    color: #7A9972;
  }
`;

const BotanicalScrollDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #7A9972;
  animation: ${scrollBounce} 1.5s ease-in-out infinite;
`;

// ============================================
// CONTEMPORARY STYLES
// ============================================
const ContemporaryWrapper = styled.section`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ContemporaryLeft = styled.div`
  position: relative;
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px 5% 60px 8%;
`;

const ContemporaryShapesLeft = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
`;

const ContemporaryCircle = styled.div`
  position: absolute;
  width: ${p => p.$size || '60px'};
  height: ${p => p.$size || '60px'};
  border-radius: 50%;
  background: ${p => p.$color || '#FF6B6B'};
  top: ${p => p.$top || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  animation: ${float1} 8s ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
`;

const ContemporarySquareOutline = styled.div`
  position: absolute;
  width: ${p => p.$size || '35px'};
  height: ${p => p.$size || '35px'};
  border: 2px solid #1A1A1A;
  background: transparent;
  top: ${p => p.$top || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  animation: ${float3} 7s ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
`;

const ContemporaryDiamond = styled.div`
  position: absolute;
  width: ${p => p.$size || '40px'};
  height: ${p => p.$size || '40px'};
  background: ${p => p.$color || '#4ECDC4'};
  transform: rotate(45deg);
  top: ${p => p.$top || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  animation: ${float2} 9s ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
`;

const ContemporaryLeftContent = styled.div`
  position: relative;
  z-index: 1;
  animation: ${fadeInUp} 1s ease;
`;

const ContemporaryEyebrow = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: #999;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  
  &::after {
    content: '';
    width: 50px;
    height: 1px;
    background: #999;
  }
`;

const ContemporaryNames = styled.div`
  margin-bottom: 30px;
`;

const ContemporaryName1 = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3.5rem, 10vw, 6rem);
  font-weight: 700;
  color: #FF6B6B;
  line-height: 1;
  letter-spacing: -0.02em;
`;

const ContemporaryNameRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
`;

const ContemporaryAmpersand = styled.span`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-style: italic;
  color: #CCC;
  line-height: 1.2;
`;

const ContemporaryName2 = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(3.5rem, 10vw, 6rem);
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1;
  letter-spacing: -0.02em;
`;

const ContemporaryLocation = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 25px;
  background: #FFE66D;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 35px;
`;

const ContemporaryButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ContemporaryPrimaryBtn = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 16px 32px;
  background: #FF6B6B;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  
  &:hover { background: #E85555; transform: translateY(-2px); }
`;

const ContemporarySecondaryBtn = styled.button`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 16px 32px;
  background: transparent;
  color: #1A1A1A;
  border: 2px solid #1A1A1A;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  
  &:hover { background: #1A1A1A; color: #FFFFFF; }
`;

const ContemporaryScrollIndicator = styled.button`
  position: absolute;
  bottom: 40px;
  left: 8%;
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  span {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: #666;
  }
`;

const ContemporaryScrollDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #FF6B6B;
  animation: ${scrollBounce} 1.5s ease-in-out infinite;
`;

const ContemporaryRight = styled.div`
  position: relative;
  background: linear-gradient(160deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  @media (max-width: 900px) {
    min-height: 300px;
  }
`;

const ContemporaryGradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: 
    repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px),
    repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px);
`;

const ContemporaryDateBox = styled.div`
  position: absolute;
  left: -5%;
  padding: 20px 50px;
  background: #1A1A1A;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #FFFFFF;
  z-index: 2;
`;

// ============================================
// NEON STYLES
// ============================================
const NeonWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0f;
  overflow: hidden;
`;

const NeonScanline = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5), transparent);
  animation: ${scanlineMove} 4s linear infinite;
  z-index: 5;
  pointer-events: none;
`;

const NeonGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 0;
`;

const NeonHorizontalLine = styled.div`
  position: absolute;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00ffff, transparent);
  opacity: 0.5;
  top: ${p => p.$top || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  z-index: 1;
`;

const NeonFrame = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  max-width: 800px;
  height: 60%;
  border: 1px solid rgba(0, 255, 255, 0.2);
  z-index: 1;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    border-color: #00ffff;
    border-style: solid;
  }
  
  &::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
  &::after { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
`;

const NeonGeometricElements = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
`;

const NeonSquare = styled.div`
  position: absolute;
  width: ${p => p.$size || '60px'};
  height: ${p => p.$size || '60px'};
  border: 2px solid ${p => p.$color || '#00ffff'};
  opacity: 0.4;
  animation: ${geometricFloat} 20s ease-in-out infinite, ${neonPulse} 3s ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
  top: ${p => p.$top || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  
  &::after {
    content: '';
    position: absolute;
    inset: 5px;
    border: 1px solid rgba(255, 0, 255, 0.4);
  }
`;

const NeonCircle = styled.div`
  position: absolute;
  width: ${p => p.$size || '80px'};
  height: ${p => p.$size || '80px'};
  border: 2px solid #ff00ff;
  border-radius: 50%;
  opacity: 0.4;
  animation: ${geometricFloat2} 25s ease-in-out infinite, ${neonPulse} 4s ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
  top: ${p => p.$top || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
`;

const NeonTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 35px solid transparent;
  border-right: 35px solid transparent;
  border-bottom: 60px solid rgba(0, 255, 136, 0.3);
  opacity: 0.5;
  animation: ${geometricFloat} 18s ease-in-out infinite reverse, ${neonPulse} 3.5s ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};
  top: ${p => p.$top || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
`;

const NeonContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 20px;
`;

const NeonBadge = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  color: #00ffff;
  margin-bottom: 30px;
  animation: ${fadeIn} 1s ease;
  
  span { color: #ff00ff; }
`;

const NeonTitleWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
  animation: ${neonWobble} 4s ease-in-out infinite;
`;

const NeonTitle = styled.h1`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(4rem, 15vw, 10rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  line-height: 1;
  position: relative;
  animation: ${fadeInUp} 1s ease;
`;

const NeonTitleGlitch = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(4rem, 15vw, 10rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #00ffff;
  line-height: 1;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  animation: ${glitch} 3s infinite;
  opacity: 0.8;
`;

const NeonTitleGlitch2 = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(4rem, 15vw, 10rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #ff00ff;
  line-height: 1;
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  animation: ${glitch} 3s infinite reverse;
  animation-delay: 0.1s;
  opacity: 0.8;
`;

const NeonSubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #FFFFFF;
  margin-bottom: 8px;
  animation: ${fadeInUp} 1s ease 0.2s both;
`;

const NeonSubtitleSmall = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
  animation: ${fadeInUp} 1s ease 0.3s both;
`;

const NeonDateBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
  animation: ${fadeInUp} 1s ease 0.4s both;
`;

const NeonDateLine = styled.div`
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00ffff, transparent);
`;

const NeonDate = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #00ffff;
`;

const NeonCTA = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 40px;
  background: transparent;
  border: 2px solid #00ffff;
  color: #00ffff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 1s ease 0.5s both;
  
  span { transition: transform 0.3s ease; }
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 255, 255, 0.1);
    
    span { transform: translateX(5px); }
  }
`;

const NeonScrollIndicator = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  span {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.3em;
    color: rgba(255, 255, 255, 0.4);
  }
`;

const NeonScrollArrow = styled.span`
  font-size: 1.2rem;
  color: #00ffff;
  animation: ${scrollBounce} 1.5s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;

// ============================================
// VIDEO STYLES (unverändert)
// ============================================
const VideoSection = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const VideoBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  
  video { width: 100%; height: 100%; object-fit: cover; }
`;

const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.5) 100%);
`;

const VideoContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 20px;
  animation: ${fadeIn} 1.5s ease;
`;

const VideoEyebrow = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
`;

const VideoMainTagline = styled.h1`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 300;
  font-style: italic;
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 20px;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
`;

const VideoTagline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  margin-bottom: 50px;
  
  em {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-style: italic;
    font-size: 1.1em;
    color: #C4A87C;
  }
`;

const VideoButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const VideoPrimaryBtn = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: rgba(139, 115, 85, 0.9);
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover { background: #C4A87C; }
`;

const VideoSecondaryBtn = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: transparent;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { border-color: #FFFFFF; background: rgba(255, 255, 255, 0.1); }
`;

const VideoScrollIndicator = styled.button`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.3em;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const VideoScrollArrow = styled.span`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  animation: ${scrollBounce} 1.5s ease-in-out infinite;
`;

// ============================================
// LUXE STYLES (unverändert)
// ============================================
const LuxeSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #000;
`;

const LuxeBgImage = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: grayscale(100%);
`;

const LuxeOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const LuxeContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
  animation: ${fadeInUp} 1s ease;
`;

const LuxeEyebrow = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.4em;
  color: #B8960B;
  margin-bottom: 30px;
`;

const LuxeMainTagline = styled.h1`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 300;
  font-style: italic;
  color: #FFFFFF;
  line-height: 1.1;
  margin-bottom: 20px;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
`;

const LuxeTagline = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 300;
  font-style: italic;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  margin-bottom: 50px;
`;

const LuxeButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const LuxePrimaryBtn = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: #B8960B;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { background: #D4AF37; }
`;

const LuxeSecondaryBtn = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 18px 40px;
  background: transparent;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { border-color: #B8960B; color: #B8960B; }
`;

const LuxeScrollIndicator = styled.button`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.3em;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const LuxeScrollArrow = styled.span`
  font-size: 1rem;
  color: #B8960B;
  animation: ${scrollBounce} 1.5s ease-in-out infinite;
`;
