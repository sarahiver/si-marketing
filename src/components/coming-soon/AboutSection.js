// About Section - Multi-Theme (Contemporary, Editorial & Video)
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

// Cloudinary About Image - für alle Themes
const ABOUT_IMAGE_URL = 'https://res.cloudinary.com/si-weddings/image/upload/v1769078167/si_comming_soon_about_pbqwny.jpg';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const values = [
  { 
    title: 'PERSÖNLICH', 
    icon: '💬', 
    text: 'Ihr seid nicht eine Nummer. Sarah & Iver beraten euch persönlich von der ersten Idee bis zum Go-Live.',
    color: '#FF6B6B'
  },
  { 
    title: 'INDIVIDUELL', 
    icon: '✨', 
    text: 'Jede Website ist ein Unikat. Wir designen nicht für die Masse, sondern für eure einzigartige Geschichte.',
    color: '#FFE66D'
  },
  { 
    title: 'LEIDENSCHAFT', 
    icon: '❤️', 
    text: 'Wir lieben was wir tun. Diese Begeisterung steckt in jedem Pixel eurer Hochzeitswebsite.',
    color: '#4ECDC4'
  },
];

const AboutSection = () => {
  const { currentTheme } = useTheme();

  if (currentTheme === 'luxe') {
    return <LuxeAbout />;
  }

  if (currentTheme === 'botanical') {
    return <BotanicalAbout />;
  }

  if (currentTheme === 'video') {
    return <VideoAbout />;
  }

  if (currentTheme === 'editorial') {
    return <EditorialAbout />;
  }

  if (currentTheme === 'neon') {
    return <NeonAbout />;
  }

  return <ContemporaryAbout />;
};

// ============================================
// CONTEMPORARY ABOUT
// ============================================
const ContemporaryAbout = () => (
  <Section id="about" $theme="contemporary">
    <BackgroundText>S&I.</BackgroundText>
    
    <Container>
      <Badge $theme="contemporary">★ ABOUT US</Badge>
      
      <ContemporaryAboutImage style={{ backgroundImage: `url(${ABOUT_IMAGE_URL})` }} />
      
      <TitleGroup>
        <TitleLine $theme="contemporary">WE ARE</TitleLine>
        <TitleAccent $theme="contemporary">SARAH & IVER</TitleAccent>
      </TitleGroup>
      
      <Subtitle $theme="contemporary">
        Keine Agentur. Keine Templates. Nur wir – und unsere 
        <br />
        Mission, eure Liebe digital unvergesslich zu machen.
      </Subtitle>
      
      <ValuesGrid $theme="contemporary">
        {values.map((value, index) => (
          <ContemporaryCard key={value.title} $color={value.color} $delay={index * 0.15}>
            <CardIcon>{value.icon}</CardIcon>
            <CardTitle $theme="contemporary">{value.title}</CardTitle>
            <CardText $theme="contemporary">{value.text}</CardText>
          </ContemporaryCard>
        ))}
      </ValuesGrid>
      
      <LogoSection $theme="contemporary">
        <LogoText $theme="contemporary">S & I</LogoText>
        <LogoTagline $theme="contemporary">REAL PEOPLE. REAL CONNECTION.</LogoTagline>
      </LogoSection>
    </Container>
  </Section>
);

// ============================================
// EDITORIAL ABOUT
// ============================================
const EditorialAbout = () => (
  <Section id="about" $theme="editorial">
    <EditorialContainer>
      {/* Left Side - Image */}
      <EditorialImageSection>
        <AboutImageContainer style={{ backgroundImage: `url(${ABOUT_IMAGE_URL})` }} />
        <EditorialQuote>
          „Wir glauben, dass eure Hochzeitswebsite genauso einzigartig sein sollte wie eure Liebe."
        </EditorialQuote>
        <QuoteAuthor>— SARAH & IVER</QuoteAuthor>
      </EditorialImageSection>
      
      {/* Right Side - Content */}
      <EditorialContentSection>
        <Badge $theme="editorial">ÜBER UNS</Badge>
        <EditorialTitle>Wir sind <em>Sarah & Iver</em></EditorialTitle>
        
        <EditorialText>
          Als wir unsere eigene Hochzeit geplant haben, standen wir vor dem gleichen Problem wie ihr: Unzählige Template-Websites, die alle gleich aussahen. Unpersönlich. Austauschbar.
        </EditorialText>
        
        <EditorialText>
          Das wollten wir ändern. Deshalb haben wir S&I. gegründet – mit einer klaren Mission: <strong>Jedes Paar verdient eine Website, die so einzigartig ist wie ihre Geschichte.</strong>
        </EditorialText>
        
        <EditorialText>
          Bei uns bekommt ihr keine anonyme Massenware. Ihr bekommt uns – als eure persönlichen Ansprechpartner, von der ersten Idee bis zum großen Tag.
        </EditorialText>
        
        <EditorialSignature>Sarah & Iver</EditorialSignature>
        <SignatureSubtext>GRÜNDER VON S&I.</SignatureSubtext>
      </EditorialContentSection>
    </EditorialContainer>
  </Section>
);

// ============================================
// VIDEO ABOUT - Timeline Style
// ============================================
const VideoAbout = () => (
  <VideoSection id="about">
    <VideoContainer>
      <VideoHeader>
        <VideoBadge>— ÜBER UNS —</VideoBadge>
        <VideoTitle>
          Wir sind <em>Sarah & Iver</em>
        </VideoTitle>
      </VideoHeader>
      
      <VideoAboutGrid>
        <VideoAboutImageWrapper>
          <VideoAboutImage style={{ backgroundImage: `url(${ABOUT_IMAGE_URL})` }} />
        </VideoAboutImageWrapper>
        
        <VideoTimeline>
          <TimelineItem>
            <TimelineYear>01</TimelineYear>
            <TimelineContent>
              <TimelineTitle>Die Idee</TimelineTitle>
              <TimelineText>
                Als wir unsere eigene Hochzeit geplant haben, standen wir vor dem gleichen Problem wie ihr: Unzählige Template-Websites, die alle gleich aussahen.
              </TimelineText>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineYear>02</TimelineYear>
            <TimelineContent>
              <TimelineTitle>Die Mission</TimelineTitle>
              <TimelineText>
                Jedes Paar verdient eine Website, die so einzigartig ist wie ihre Geschichte. Das ist unsere Mission mit S&I.
              </TimelineText>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineYear>03</TimelineYear>
            <TimelineContent>
              <TimelineTitle>Das Versprechen</TimelineTitle>
              <TimelineText>
                Bei uns bekommt ihr keine anonyme Massenware. Ihr bekommt uns – als eure persönlichen Ansprechpartner, von der ersten Idee bis zum großen Tag.
              </TimelineText>
            </TimelineContent>
          </TimelineItem>
        </VideoTimeline>
      </VideoAboutGrid>
      
      <VideoQuoteBox>
        <VideoQuote>
          „Wir glauben, dass eure Hochzeitswebsite genauso einzigartig sein sollte wie eure Liebe."
        </VideoQuote>
        <VideoQuoteAuthor>— Sarah & Iver</VideoQuoteAuthor>
      </VideoQuoteBox>
      
      <VideoSignature>
        <SignatureLogo>S&I.</SignatureLogo>
        <SignatureTagline>REAL PEOPLE. REAL CONNECTION.</SignatureTagline>
      </VideoSignature>
    </VideoContainer>
  </VideoSection>
);

// ============================================
// BOTANICAL ABOUT - Split Layout with Image
// ============================================
const BotanicalAbout = () => (
  <BotanicalAboutSection id="about">
    <BotanicalAboutContainer>
      {/* Header */}
      <BotanicalAboutHeader>
        <BotanicalAboutBadge>✦ ÜBER UNS ✦</BotanicalAboutBadge>
        <BotanicalAboutTitle>
          Hallo, wir sind <em>Sarah & Iver</em>
        </BotanicalAboutTitle>
      </BotanicalAboutHeader>
      
      {/* Content Grid */}
      <BotanicalAboutGrid>
        {/* Left - Text */}
        <BotanicalAboutText>
          <p>
            Wir glauben an echte Verbindungen – nicht nur zwischen euch als Paar, sondern auch zwischen uns und euch. Deshalb haben wir S&I. gegründet.
          </p>
          <p>
            Als wir selbst geheiratet haben, war uns eines besonders wichtig: Authentizität. Keine 08/15-Lösung, sondern etwas, das wirklich unsere Geschichte erzählt.
          </p>
        </BotanicalAboutText>
        
        {/* Right - Image + Quote */}
        <BotanicalAboutVisual>
          <BotanicalAboutImage style={{ backgroundImage: `url(${ABOUT_IMAGE_URL})` }} />
          
          <BotanicalQuoteSmall>
            „Persönlich bedeutet für uns: Wir kennen eure Namen, eure Geschichte, eure Wünsche."
          </BotanicalQuoteSmall>
        </BotanicalAboutVisual>
      </BotanicalAboutGrid>
      
      {/* Promise Box */}
      <BotanicalPromiseBox>
        <BotanicalPromiseIcon>💚</BotanicalPromiseIcon>
        <BotanicalPromiseTitle>Unser Versprechen</BotanicalPromiseTitle>
        <BotanicalPromiseText>
          Bei uns seid ihr keine Nummer. Wir begleiten euch persönlich durch den gesamten Prozess – mit Herz, Zeit und voller Aufmerksamkeit.
        </BotanicalPromiseText>
        <BotanicalSignatureBox>
          <BotanicalSignatureName>Sarah & Iver</BotanicalSignatureName>
          <BotanicalSignatureRole>Gründer von S&I.</BotanicalSignatureRole>
        </BotanicalSignatureBox>
      </BotanicalPromiseBox>
    </BotanicalAboutContainer>
  </BotanicalAboutSection>
);

// ============================================
// LUXE ABOUT - Classic White Space Design
// ============================================

const LuxeAbout = () => (
  <LuxeAboutSection id="about">
    <LuxeAboutContainer>
      <LuxeAboutGrid>
        {/* Image Side */}
        <LuxeAboutImageWrapper>
          <LuxeAboutImage style={{ backgroundImage: `url(${ABOUT_IMAGE_URL})` }} />
        </LuxeAboutImageWrapper>
        
        {/* Content Side */}
        <LuxeAboutContent>
          <LuxeAboutBadge>ÜBER UNS</LuxeAboutBadge>
          
          <LuxeAboutTitle>
            <em>Hallo, wir sind Sarah & Iver</em>
          </LuxeAboutTitle>
          
          <LuxeAboutText>
            Wir glauben an echte Verbindungen – nicht nur zwischen euch als Paar, sondern auch zwischen uns und euch.
          </LuxeAboutText>
          
          <LuxeAboutText>
            Als wir selbst geheiratet haben, war uns eines besonders wichtig: Authentizität. Keine 08/15-Lösung, sondern etwas, das wirklich unsere Geschichte erzählt.
          </LuxeAboutText>
          
          <LuxeAboutQuote>
            „Jedes Paar verdient eine Website, die so einzigartig ist wie ihre Geschichte."
          </LuxeAboutQuote>
          
          <LuxeAboutSignature>
            <LuxeSignatureLogo>S&I.</LuxeSignatureLogo>
            <LuxeSignatureText>Gründer von S&I.</LuxeSignatureText>
          </LuxeAboutSignature>
        </LuxeAboutContent>
      </LuxeAboutGrid>
    </LuxeAboutContainer>
  </LuxeAboutSection>
);

export default AboutSection;

// ============================================
// STYLES
// ============================================
const Section = styled.section`
  padding: 120px 5%;
  position: relative;
  overflow: hidden;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #FFFFFF;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    background: #FFFFFF;
  `}
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const BackgroundText = styled.div`
  position: absolute;
  top: 50%;
  right: -5%;
  transform: translateY(-50%);
  font-family: 'Roboto', sans-serif;
  font-size: clamp(15rem, 40vw, 35rem);
  font-weight: 700;
  letter-spacing: -0.06em;
  color: #000000;
  opacity: 0.03;
  pointer-events: none;
  user-select: none;
  z-index: 1;
  line-height: 0.8;
`;

const Badge = styled.div`
  display: inline-block;
  margin-bottom: 30px;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #FF6B6B;
    color: #FFFFFF;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    padding: 8px 18px;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.3em;
    color: #999;
  `}
`;

// Shared About Image für alle Themes
const AboutImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  background-size: cover;
  background-position: center;
  margin-bottom: 30px;
`;

const ContemporaryAboutImage = styled.div`
  width: 100%;
  max-width: 500px;
  aspect-ratio: 4/3;
  background-size: cover;
  background-position: center;
  margin: 0 auto 40px;
  border: 4px solid #0D0D0D;
`;

const TitleGroup = styled.div`
  margin-bottom: 25px;
`;

const TitleLine = styled.h2`
  line-height: 1.1;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    color: #0D0D0D;
    letter-spacing: -0.02em;
  `}
`;

const TitleAccent = styled.span`
  display: block;
  line-height: 1;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.5rem, 7vw, 5rem);
    font-weight: 700;
    color: #FF6B6B;
    letter-spacing: -0.02em;
  `}
`;

const Subtitle = styled.p`
  margin-bottom: 60px;
  line-height: 1.7;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    color: rgba(13, 13, 13, 0.6);
  `}
`;

const ValuesGrid = styled.div`
  display: grid;
  gap: 25px;
  margin-bottom: 80px;
  
  ${p => p.$theme === 'contemporary' && css`
    grid-template-columns: repeat(3, 1fr);
    
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
  `}
`;

const ContemporaryCard = styled.div`
  background: ${p => p.$color};
  padding: 40px 30px;
  text-align: left;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards, ${float} 5s ease-in-out infinite;
  animation-delay: ${p => p.$delay}s, ${p => p.$delay + 1}s;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  margin-bottom: 12px;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #0D0D0D;
    letter-spacing: 0.05em;
  `}
`;

const CardText = styled.p`
  line-height: 1.6;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    color: rgba(13, 13, 13, 0.7);
  `}
`;

const LogoSection = styled.div`
  padding-top: 40px;
  border-top: 1px solid rgba(13, 13, 13, 0.1);
`;

const LogoText = styled.div`
  margin-bottom: 10px;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #0D0D0D;
    letter-spacing: 0.1em;
  `}
`;

const LogoTagline = styled.p`
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: #FF6B6B;
    letter-spacing: 0.2em;
  `}
`;

// Editorial Styles
const EditorialContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

const EditorialImageSection = styled.div`
  @media (max-width: 900px) {
    order: 2;
  }
`;

const ImagePlaceholder = styled.div`
  aspect-ratio: 4/5;
  background: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  border: 1px solid #E0E0E0;
`;

const PlaceholderLogo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  color: #FFFFFF;
  background: #000000;
  padding: 15px 25px;
  display: inline-block;
`;

const EditorialQuote = styled.blockquote`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #1A1A1A;
  line-height: 1.7;
  padding: 25px;
  background: #FAFAFA;
  border-left: 2px solid #1A1A1A;
  margin: 0;
`;

const QuoteAuthor = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #999;
  margin-top: 15px;
  padding-left: 25px;
`;

const EditorialContentSection = styled.div`
  @media (max-width: 900px) {
    order: 1;
    text-align: center;
  }
`;

const EditorialTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 30px;
  
  em {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
  }
`;

const EditorialText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
  
  strong {
    color: #1A1A1A;
    font-weight: 500;
  }
  
  @media (max-width: 900px) {
    text-align: left;
  }
`;

const EditorialSignature = styled.div`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.8rem;
  font-style: italic;
  color: #1A1A1A;
  margin-top: 40px;
  margin-bottom: 5px;
`;

const SignatureSubtext = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #999;
`;

// ============================================
// VIDEO THEME STYLES
// ============================================
const VideoSection = styled.section`
  padding: 120px 5%;
  background: #F8F6F0;
  position: relative;
`;

const VideoContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const VideoHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const VideoBadge = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8B7355;
  margin-bottom: 25px;
`;

const VideoTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #1A1814;
  
  em {
    font-style: italic;
  }
`;

const VideoAboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  margin-bottom: 60px;
  
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const VideoAboutImageWrapper = styled.div`
  position: relative;
`;

const VideoAboutImage = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  background-size: cover;
  background-position: center;
  filter: sepia(20%) contrast(1.1);
`;

const VideoTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 60px;
`;

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 30px;
  padding: 40px 0;
  border-bottom: 1px solid rgba(139, 115, 85, 0.2);
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  
  &:first-child {
    border-top: 1px solid rgba(139, 115, 85, 0.2);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 50px 1fr;
    gap: 20px;
    padding: 30px 0;
  }
`;

const TimelineYear = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 300;
  color: #8B7355;
  line-height: 1;
  
  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

const TimelineContent = styled.div``;

const TimelineTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #1A1814;
  margin-bottom: 12px;
`;

const TimelineText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #666;
  line-height: 1.8;
`;

const VideoQuoteBox = styled.div`
  background: #1A1814;
  padding: 50px 40px;
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 600px) {
    padding: 35px 25px;
  }
`;

const VideoQuote = styled.blockquote`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-style: italic;
  color: #FFFFFF;
  line-height: 1.7;
  margin: 0 0 20px;
`;

const VideoQuoteAuthor = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #8B7355;
`;

const VideoSignature = styled.div`
  text-align: center;
`;

const SignatureLogo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  color: #FFFFFF;
  background: #000000;
  padding: 8px 16px;
  display: inline-block;
  margin-bottom: 10px;
`;

const SignatureTagline = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #8B7355;
`;

// ============================================
// BOTANICAL THEME STYLES
// ============================================
const BotanicalAboutSection = styled.section`
  padding: 120px 5%;
  background: linear-gradient(180deg, #FAF9F6 0%, #F5F1EB 100%);
`;

const BotanicalAboutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const BotanicalAboutHeader = styled.div`
  margin-bottom: 50px;
`;

const BotanicalAboutBadge = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #4A7C59;
  margin-bottom: 20px;
`;

const BotanicalAboutTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #2C3E2D;
  
  em {
    font-style: italic;
  }
`;

const BotanicalAboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-bottom: 50px;
  
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const BotanicalAboutText = styled.div`
  p {
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    color: #6B7B6C;
    line-height: 1.9;
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const BotanicalAboutVisual = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BotanicalAboutImage = styled.div`
  aspect-ratio: 4/3;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
`;

const BotanicalImagePlaceholder = styled.div`
  aspect-ratio: 4/3;
  background: #EDE8DF;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const PlaceholderContent = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  color: #FFFFFF;
  background: #000000;
  padding: 12px 20px;
`;

const BotanicalQuoteSmall = styled.p`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 0.95rem;
  font-style: italic;
  color: #4A7C59;
  line-height: 1.7;
  padding-left: 20px;
  border-left: 2px solid #4A7C59;
`;

const BotanicalPromiseBox = styled.div`
  background: #EDE8DF;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
`;

const BotanicalPromiseIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const BotanicalPromiseTitle = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 500;
  color: #2C3E2D;
  margin-bottom: 15px;
`;

const BotanicalPromiseText = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
  color: #6B7B6C;
  line-height: 1.8;
  max-width: 500px;
  margin: 0 auto 25px;
`;

const BotanicalSignatureBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const BotanicalSignatureName = styled.span`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #2C3E2D;
`;

const BotanicalSignatureRole = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #6B7B6C;
  text-transform: uppercase;
`;

// ============================================
// LUXE THEME STYLES
// ============================================
const LuxeAboutSection = styled.section`
  padding: 120px 5%;
  background: #FFFFFF;
`;

const LuxeAboutContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const LuxeAboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const LuxeAboutImageWrapper = styled.div`
  aspect-ratio: 3/4;
  
  @media (max-width: 900px) {
    max-width: 400px;
    margin: 0 auto;
  }
`;

const LuxeAboutImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: grayscale(100%);
`;

const LuxeAboutImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #E5E5E5 0%, #F5F5F5 50%, #E5E5E5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.3em;
    color: rgba(0,0,0,0.15);
  }
`;

const LuxeAboutContent = styled.div`
  
`;

const LuxeAboutBadge = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #B8960B;
  margin-bottom: 25px;
`;

const LuxeAboutTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 300;
  color: #1A1A1A;
  margin-bottom: 30px;
  
  em {
    font-style: italic;
  }
`;

const LuxeAboutText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: #666;
  line-height: 1.9;
  margin-bottom: 20px;
`;

const LuxeAboutQuote = styled.blockquote`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.2rem;
  font-style: italic;
  color: #1A1A1A;
  padding: 25px 0;
  border-top: 1px solid #E5E5E5;
  border-bottom: 1px solid #E5E5E5;
  margin: 30px 0;
`;

const LuxeAboutSignature = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LuxeSignatureLogo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  color: #FFFFFF;
  background: #000000;
  padding: 6px 12px;
`;

const LuxeSignatureText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: #888;
  text-transform: uppercase;
`;

// ============================================
// NEON ABOUT
// ============================================

const codeBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const NeonAbout = () => (
  <NeonAboutSection id="about">
    <NeonAboutGrid />
    <NeonAboutContainer>
      <NeonAboutLayout>
        {/* Left Side - Content */}
        <NeonAboutContent>
          <NeonAboutBadge>// ABOUT_US.EXE</NeonAboutBadge>
          <NeonAboutTitle>SARAH & IVER</NeonAboutTitle>
          
          <NeonAboutText>
            Wir sind keine anonyme Agentur. Wir sind <NeonHighlight>zwei Menschen</NeonHighlight>, die glauben,
            dass eure Hochzeitswebsite mehr verdient als ein 08/15-Template.
          </NeonAboutText>
          
          <NeonAboutText>
            Bei uns gibt es keine Ticket-Nummern und keine automatischen
            Antworten. Ihr bekommt <NeonHighlight>uns</NeonHighlight> – mit voller Aufmerksamkeit und
            Leidenschaft für Design.
          </NeonAboutText>
          
          <NeonAboutText>
            Eure Geschichte ist einzigartig. Zeit, dass eure Website das auch ist.
          </NeonAboutText>
          
          <NeonAboutDivider />
          
          <NeonAboutSignature>
            <NeonSignatureLogo>S&I</NeonSignatureLogo>
            <NeonSignatureText>// Human connection in a digital world</NeonSignatureText>
          </NeonAboutSignature>
        </NeonAboutContent>
        
        {/* Right Side - JSON Terminal */}
        <NeonAboutTerminal>
          <NeonTerminalHeader>
            <NeonTerminalDots>
              <span style={{background: '#ff5f56'}} />
              <span style={{background: '#ffbd2e'}} />
              <span style={{background: '#27ca40'}} />
            </NeonTerminalDots>
            <NeonTerminalTitle>founders.json</NeonTerminalTitle>
          </NeonTerminalHeader>
          <NeonTerminalBody>
            <NeonCodeLine><NeonCodeComment>// Das sind wir</NeonCodeComment></NeonCodeLine>
            <NeonCodeLine>{'{'}</NeonCodeLine>
            <NeonCodeLine indent>
              <NeonCodeKey>"names"</NeonCodeKey>: <NeonCodeString>"Sarah & Iver"</NeonCodeString>,
            </NeonCodeLine>
            <NeonCodeLine indent>
              <NeonCodeKey>"mission"</NeonCodeKey>: <NeonCodeString>"Einzigartige Websites"</NeonCodeString>,
            </NeonCodeLine>
            <NeonCodeLine indent>
              <NeonCodeKey>"approach"</NeonCodeKey>: <NeonCodeString>"100% persönlich"</NeonCodeString>,
            </NeonCodeLine>
            <NeonCodeLine indent>
              <NeonCodeKey>"templates"</NeonCodeKey>: <NeonCodeBool>false</NeonCodeBool>,
            </NeonCodeLine>
            <NeonCodeLine indent>
              <NeonCodeKey>"chatbots"</NeonCodeKey>: <NeonCodeBool>false</NeonCodeBool>,
            </NeonCodeLine>
            <NeonCodeLine indent>
              <NeonCodeKey>"callbacks"</NeonCodeKey>: <NeonCodeBool>false</NeonCodeBool>,
            </NeonCodeLine>
            <NeonCodeLine indent>
              <NeonCodeKey>"passion"</NeonCodeKey>: <NeonCodeBool>true</NeonCodeBool>,
            </NeonCodeLine>
            <NeonCodeLine indent>
              <NeonCodeKey>"love"</NeonCodeKey>: <NeonCodeString>Infinity</NeonCodeString>
            </NeonCodeLine>
            <NeonCodeLine>{'}'}<NeonCursor /></NeonCodeLine>
          </NeonTerminalBody>
        </NeonAboutTerminal>
      </NeonAboutLayout>
    </NeonAboutContainer>
  </NeonAboutSection>
);

const NeonAboutSection = styled.section`
  position: relative;
  padding: 120px 5%;
  background: #0a0a0f;
  overflow: hidden;
`;

const NeonAboutGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
`;

const NeonAboutContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
`;

const NeonAboutLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const NeonAboutContent = styled.div`
  animation: ${fadeInUp} 0.8s ease;
`;

const NeonAboutBadge = styled.div`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #00ff88;
  margin-bottom: 20px;
`;

const NeonAboutTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  background: linear-gradient(90deg, #ff00ff, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 30px;
`;

const NeonAboutText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 20px;
`;

const NeonHighlight = styled.span`
  color: #ff00ff;
  text-decoration: underline;
  text-decoration-color: rgba(255, 0, 255, 0.3);
  text-underline-offset: 3px;
`;

const NeonAboutDivider = styled.div`
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #00ffff, transparent);
  margin: 30px 0;
`;

const NeonAboutSignature = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NeonSignatureLogo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  color: #00ffff;
  background: transparent;
  border: 2px solid #00ffff;
  padding: 6px 12px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;

const NeonSignatureText = styled.span`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
`;

const NeonAboutTerminal = styled.div`
  background: rgba(10, 10, 15, 0.9);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 255, 255, 0.1);
  animation: ${fadeInUp} 0.8s ease 0.2s both;
`;

const NeonTerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
`;

const NeonTerminalDots = styled.div`
  display: flex;
  gap: 6px;
  
  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
`;

const NeonTerminalTitle = styled.span`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
`;

const NeonTerminalBody = styled.div`
  padding: 25px;
  font-family: 'Space Grotesk', monospace;
  font-size: 0.9rem;
  line-height: 1.8;
`;

const NeonCodeLine = styled.div`
  padding-left: ${p => p.indent ? '25px' : '0'};
  color: #FFFFFF;
`;

const NeonCodeComment = styled.span`
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
`;

const NeonCodeKey = styled.span`
  color: #ff00ff;
`;

const NeonCodeString = styled.span`
  color: #00ff88;
`;

const NeonCodeBool = styled.span`
  color: #00ffff;
`;

const NeonCursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1em;
  background: #00ffff;
  margin-left: 5px;
  animation: ${codeBlink} 1s infinite;
`;
