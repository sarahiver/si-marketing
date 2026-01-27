// Countdown Section - Multi-Theme (Contemporary, Editorial & Video)
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { useCountdown, formatNumber } from '../hooks/useCountdown';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.06; }
`;

const slideRight = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const CountdownSection = () => {
  const { currentTheme } = useTheme();
  const timeLeft = useCountdown();

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentTheme === 'luxe') {
    return <LuxeCountdown timeLeft={timeLeft} scrollToWaitlist={scrollToWaitlist} />;
  }

  if (currentTheme === 'botanical') {
    return <BotanicalCountdown timeLeft={timeLeft} scrollToWaitlist={scrollToWaitlist} />;
  }

  if (currentTheme === 'video') {
    return <VideoCountdown timeLeft={timeLeft} scrollToWaitlist={scrollToWaitlist} />;
  }

  if (currentTheme === 'editorial') {
    return <EditorialCountdown timeLeft={timeLeft} scrollToWaitlist={scrollToWaitlist} />;
  }

  if (currentTheme === 'neon') {
    return <NeonCountdown timeLeft={timeLeft} scrollToWaitlist={scrollToWaitlist} />;
  }

  return <ContemporaryCountdown timeLeft={timeLeft} scrollToWaitlist={scrollToWaitlist} />;
};

// ============================================
// CONTEMPORARY COUNTDOWN
// ============================================
const ContemporaryCountdown = ({ timeLeft, scrollToWaitlist }) => {
  const units = [
    { value: timeLeft.days, label: 'TAGE' },
    { value: timeLeft.hours, label: 'STUNDEN' },
    { value: timeLeft.minutes, label: 'MINUTEN' },
    { value: timeLeft.seconds, label: 'SEKUNDEN' },
  ];

  return (
    <Section id="countdown" $theme="contemporary">
      <BackgroundNumber>00</BackgroundNumber>
      
      <Container>
        <Badge $theme="contemporary">★ COUNTDOWN</Badge>
        <Title $theme="contemporary">TIME IS TICKING</Title>
        
        <ContemporaryGrid>
          {units.map((unit, index) => (
            <ContemporaryRow key={unit.label} $delay={index * 0.1}>
              <ContemporaryLabel>{unit.label}</ContemporaryLabel>
              <ContemporaryDivider />
              <ContemporaryNumber>{formatNumber(unit.value)}</ContemporaryNumber>
            </ContemporaryRow>
          ))}
        </ContemporaryGrid>
        
        <CTAButton onClick={scrollToWaitlist} $theme="contemporary">
          LET'S MAKE IT EPIC →
        </CTAButton>
      </Container>
      
      <ScrollHint $theme="contemporary">
        <ScrollDot />
        <span>UNSERE BENEFITS</span>
      </ScrollHint>
    </Section>
  );
};

// ============================================
// EDITORIAL COUNTDOWN
// ============================================
const EditorialCountdown = ({ timeLeft, scrollToWaitlist }) => {
  const units = [
    { value: timeLeft.days, label: 'TAGE' },
    { value: timeLeft.hours, label: 'STUNDEN' },
    { value: timeLeft.minutes, label: 'MINUTEN' },
    { value: timeLeft.seconds, label: 'SEKUNDEN' },
  ];

  return (
    <Section id="countdown" $theme="editorial">
      <Container>
        <Badge $theme="editorial">COUNTDOWN</Badge>
        <EditorialTitle>
          Noch <em>so lange</em>
        </EditorialTitle>
        
        <EditorialGrid>
          {units.map((unit, index) => (
            <EditorialUnit key={unit.label} $delay={index * 0.1}>
              <EditorialNumber>{formatNumber(unit.value)}</EditorialNumber>
              <EditorialLabel>{unit.label}</EditorialLabel>
            </EditorialUnit>
          ))}
        </EditorialGrid>
        
        <EditorialDivider />
        
        <EditorialMessage>
          Wir können es kaum erwarten, diesen besonderen Tag mit euch zu teilen.
        </EditorialMessage>
        
        <CTAButton onClick={scrollToWaitlist} $theme="editorial">
          Jetzt eintragen →
        </CTAButton>
      </Container>
    </Section>
  );
};

// ============================================
// VIDEO COUNTDOWN - Elegant Gold Style
// ============================================
const VideoCountdown = ({ timeLeft, scrollToWaitlist }) => {
  const units = [
    { value: timeLeft.days, label: 'TAGE' },
    { value: timeLeft.hours, label: 'STUNDEN' },
    { value: timeLeft.minutes, label: 'MINUTEN' },
    { value: timeLeft.seconds, label: 'SEKUNDEN' },
  ];

  return (
    <VideoSection id="countdown">
      {/* Background Date Text */}
      <VideoBackgroundText>01.10.26</VideoBackgroundText>
      
      <VideoContainer>
        <VideoBadge>— COUNTDOWN —</VideoBadge>
        
        <VideoTitle>
          Der große <em>Moment</em>
        </VideoTitle>
        
        <VideoSubtitle>
          Donnerstag, 1. Oktober 2026 · siwedding.de
        </VideoSubtitle>
        
        <VideoGrid>
          {units.map((unit, index) => (
            <VideoUnit key={unit.label} $delay={index * 0.1}>
              <VideoNumber>{formatNumber(unit.value)}</VideoNumber>
              <VideoLabel>{unit.label}</VideoLabel>
            </VideoUnit>
          ))}
        </VideoGrid>
        
        <VideoCTA onClick={scrollToWaitlist}>
          Jetzt eintragen →
        </VideoCTA>
      </VideoContainer>
    </VideoSection>
  );
};

// ============================================
// BOTANICAL COUNTDOWN - Organic Nature Style
// ============================================
const BotanicalCountdown = ({ timeLeft, scrollToWaitlist }) => {
  const units = [
    { value: timeLeft.days, label: 'Tage' },
    { value: timeLeft.hours, label: 'Stunden' },
    { value: timeLeft.minutes, label: 'Minuten' },
    { value: timeLeft.seconds, label: 'Sekunden' },
  ];

  return (
    <BotanicalSection id="countdown">
      <BotanicalContainer>
        <BotanicalBadge>✦ COUNTDOWN ✦</BotanicalBadge>
        
        <BotanicalTitle>
          Es wird <em>Zeit</em>
        </BotanicalTitle>
        
        <BotanicalSubtitle>
          Jeder Moment bringt uns unserem großen Tag näher
        </BotanicalSubtitle>
        
        <BotanicalGrid>
          {units.map((unit, index) => (
            <BotanicalUnit key={unit.label} $delay={index * 0.1}>
              <BotanicalNumber>{formatNumber(unit.value)}</BotanicalNumber>
              <BotanicalLabel>{unit.label}</BotanicalLabel>
            </BotanicalUnit>
          ))}
        </BotanicalGrid>
        
        <BotanicalMessage>
          🌸 Bald beginnt unser gemeinsames Abenteuer – und wir können es kaum erwarten, es mit euch zu teilen. 🌿
        </BotanicalMessage>
        
        <BotanicalCTA onClick={scrollToWaitlist}>
          Jetzt eintragen →
        </BotanicalCTA>
      </BotanicalContainer>
    </BotanicalSection>
  );
};

// ============================================
// LUXE COUNTDOWN - Classic with Timeline
// ============================================
const LuxeCountdown = ({ timeLeft, scrollToWaitlist }) => {
  const units = [
    { value: timeLeft.days, label: 'TAGE' },
    { value: timeLeft.hours, label: 'STUNDEN' },
    { value: timeLeft.minutes, label: 'MINUTEN' },
    { value: timeLeft.seconds, label: 'SEKUNDEN' },
  ];

  // Calculate progress percentage (Jan 1, 2026 to Oct 1, 2026)
  const startDate = new Date('2026-01-01');
  const endDate = new Date('2026-10-01');
  const now = new Date();
  const totalDuration = endDate - startDate;
  const elapsed = now - startDate;
  const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

  return (
    <LuxeSection id="countdown">
      <LuxeContainer>
        <LuxeBadge>DIE REISE</LuxeBadge>
        
        <LuxeTitle>
          <em>Bis zum großen Tag</em>
        </LuxeTitle>
        
        {/* Timeline */}
        <LuxeTimeline>
          <LuxeTimelineStart>
            <span>JANUAR 2026</span>
            <small>Beginn</small>
          </LuxeTimelineStart>
          
          <LuxeTimelineTrack>
            <LuxeTimelineProgress style={{ width: `${progress}%` }} />
            <LuxeTimelineDot style={{ left: `${progress}%` }}>
              <LuxeTimelineLabel>
                <span>HEUTE</span>
                <small>{new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })}</small>
              </LuxeTimelineLabel>
            </LuxeTimelineDot>
          </LuxeTimelineTrack>
          
          <LuxeTimelineEnd>
            <span>01. OKTOBER 2026</span>
            <small>Hochzeit</small>
          </LuxeTimelineEnd>
        </LuxeTimeline>
        
        {/* Countdown Numbers */}
        <LuxeGrid>
          {units.map((unit, index) => (
            <LuxeUnit key={unit.label} $delay={index * 0.1}>
              <LuxeNumber>{formatNumber(unit.value)}</LuxeNumber>
              <LuxeLabel>{unit.label}</LuxeLabel>
            </LuxeUnit>
          ))}
        </LuxeGrid>
        
        <LuxeMessage>
          Jeder Tag bringt uns näher zusammen
        </LuxeMessage>
        
        <LuxeCTA onClick={scrollToWaitlist}>
          Jetzt eintragen →
        </LuxeCTA>
      </LuxeContainer>
    </LuxeSection>
  );
};

export default CountdownSection;

// ============================================
// SHARED STYLES
// ============================================
const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 100px 5%;
  overflow: hidden;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #0D0D0D;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    background: #FAFAFA;
  `}
`;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const Badge = styled.div`
  display: inline-block;
  margin-bottom: 25px;
  
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

const Title = styled.h2`
  margin-bottom: 60px;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.5rem, 7vw, 4.5rem);
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: -0.02em;
  `}
`;

const CTAButton = styled.button`
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding: 18px 40px;
    background: transparent;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    
    &:hover {
      background: #FF6B6B;
      border-color: #FF6B6B;
      transform: translateY(-3px);
    }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 16px 35px;
    background: #1A1A1A;
    color: #FFFFFF;
    border: none;
    
    &:hover {
      background: #333;
      transform: translateY(-2px);
    }
  `}
`;

// Contemporary Styles
const BackgroundNumber = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(20rem, 50vw, 50rem);
  font-weight: 700;
  color: #FFFFFF;
  opacity: 0.03;
  animation: ${pulse} 4s ease-in-out infinite;
  pointer-events: none;
  user-select: none;
  z-index: 1;
`;

const ContemporaryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 50px;
`;

const ContemporaryRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
  
  &:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 500px) {
    grid-template-columns: 80px 1fr auto;
    padding: 20px 0;
  }
`;

const ContemporaryLabel = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
  text-align: left;
  
  @media (max-width: 500px) {
    font-size: 0.7rem;
  }
`;

const ContemporaryDivider = styled.div`
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 30px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #FF6B6B, #4ECDC4, transparent);
    animation: ${slideRight} 2s ease-in-out infinite;
  }
  
  @media (max-width: 500px) {
    margin: 0 15px;
  }
`;

const ContemporaryNumber = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
  color: #FF6B6B;
  line-height: 1;
  min-width: 100px;
  text-align: right;
  
  @media (max-width: 500px) {
    min-width: 70px;
  }
`;

const ScrollHint = styled.div`
  position: absolute;
  bottom: 40px;
  left: 5%;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 10;
  
  span {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ScrollDot = styled.div`
  width: 8px;
  height: 8px;
  background: #FF6B6B;
  border-radius: 50%;
`;

// Editorial Styles
const EditorialTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 60px;
  
  em {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
  }
`;

const EditorialGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 50px;
  
  @media (max-width: 600px) {
    gap: 25px;
  }
  
  @media (max-width: 400px) {
    flex-wrap: wrap;
    gap: 30px 40px;
  }
`;

const EditorialUnit = styled.div`
  text-align: center;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
`;

const EditorialNumber = styled.div`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(3rem, 10vw, 5rem);
  font-weight: 400;
  color: #1A1A1A;
  line-height: 1;
  margin-bottom: 10px;
`;

const EditorialLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #999;
  text-transform: uppercase;
`;

const EditorialDivider = styled.div`
  width: 40px;
  height: 1px;
  background: #1A1A1A;
  margin: 0 auto 30px;
`;

const EditorialMessage = styled.p`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #666;
  max-width: 450px;
  margin: 0 auto 40px;
  line-height: 1.7;
`;

// ============================================
// VIDEO THEME STYLES
// ============================================
const VideoSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 100px 5%;
  overflow: hidden;
  background: #F8F6F3;
`;

const VideoBackgroundText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(15rem, 40vw, 35rem);
  font-weight: 300;
  color: rgba(139, 115, 85, 0.05);
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
`;

const VideoContainer = styled.div`
  max-width: 900px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
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
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 15px;
  
  em {
    font-style: italic;
  }
`;

const VideoSubtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 400;
  color: #8B7355;
  margin-bottom: 60px;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-bottom: 50px;
  background: #FFFFFF;
  border: 1px solid rgba(139, 115, 85, 0.2);
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const VideoUnit = styled.div`
  padding: 40px 20px;
  text-align: center;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
  border-right: 1px solid rgba(139, 115, 85, 0.15);
  
  &:last-child {
    border-right: none;
  }
  
  @media (max-width: 600px) {
    padding: 30px 15px;
    
    &:nth-child(2) {
      border-right: none;
    }
    
    &:nth-child(1), &:nth-child(2) {
      border-bottom: 1px solid rgba(139, 115, 85, 0.15);
    }
  }
`;

const VideoNumber = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 300;
  color: #1A1A1A;
  line-height: 1;
  margin-bottom: 12px;
`;

const VideoLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #8B7355;
  text-transform: uppercase;
`;

const VideoCTA = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 18px 40px;
  background: #8B7355;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
  
  &:hover {
    background: #6B5A45;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 115, 85, 0.3);
  }
`;

// ============================================
// BOTANICAL THEME STYLES
// ============================================
const BotanicalSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 100px 5%;
  overflow: hidden;
  background: linear-gradient(180deg, #F5F1EB 0%, #EDE8DF 100%);
`;

const BotanicalContainer = styled.div`
  max-width: 900px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const BotanicalBadge = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #4A7C59;
  margin-bottom: 25px;
`;

const BotanicalTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  color: #2C3E2D;
  margin-bottom: 15px;
  
  em {
    font-style: italic;
  }
`;

const BotanicalSubtitle = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
  font-style: italic;
  color: #6B7B6C;
  margin-bottom: 50px;
`;

const BotanicalGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 600px) {
    gap: 10px;
    flex-wrap: wrap;
  }
`;

const BotanicalUnit = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid #D4CFC4;
  padding: 30px 25px;
  min-width: 100px;
  text-align: center;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
  transition: all 0.3s ease;
  
  &:hover {
    background: #FFFFFF;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(74, 124, 89, 0.1);
  }
  
  @media (max-width: 600px) {
    padding: 20px 15px;
    min-width: 70px;
  }
`;

const BotanicalNumber = styled.div`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #2C3E2D;
  line-height: 1;
  margin-bottom: 8px;
`;

const BotanicalLabel = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: #6B7B6C;
  text-transform: uppercase;
`;

const BotanicalMessage = styled.p`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  color: #4A7C59;
  background: rgba(74, 124, 89, 0.1);
  padding: 20px 30px;
  border-radius: 30px;
  display: inline-block;
  margin-bottom: 40px;
  max-width: 500px;
`;

const BotanicalCTA = styled.button`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 16px 35px;
  background: #4A7C59;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
  
  &:hover {
    background: #3A6249;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(74, 124, 89, 0.3);
  }
`;

// ============================================
// LUXE THEME STYLES
// ============================================
const LuxeSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 120px 5%;
  overflow: hidden;
  background: #FFFFFF;
`;

const LuxeContainer = styled.div`
  max-width: 900px;
  width: 100%;
  text-align: center;
`;

const LuxeBadge = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #B8960B;
  margin-bottom: 20px;
`;

const LuxeTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  color: #1A1A1A;
  margin-bottom: 60px;
  
  em {
    font-style: italic;
  }
`;

const LuxeTimeline = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 60px;
  padding: 0 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
`;

const LuxeTimelineStart = styled.div`
  text-align: left;
  min-width: 100px;
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: #1A1A1A;
    display: block;
  }
  
  small {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 0.8rem;
    font-style: italic;
    color: #888;
  }
  
  @media (max-width: 600px) {
    text-align: center;
  }
`;

const LuxeTimelineEnd = styled.div`
  text-align: right;
  min-width: 120px;
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: #1A1A1A;
    display: block;
  }
  
  small {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 0.8rem;
    font-style: italic;
    color: #B8960B;
  }
  
  @media (max-width: 600px) {
    text-align: center;
  }
`;

const LuxeTimelineTrack = styled.div`
  flex: 1;
  height: 2px;
  background: #E5E5E5;
  position: relative;
  margin-top: 8px;
  
  @media (max-width: 600px) {
    height: 60px;
    width: 2px;
    margin: 0 auto;
  }
`;

const LuxeTimelineProgress = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(90deg, #B8960B 0%, #D4AF37 100%);
  
  @media (max-width: 600px) {
    width: 100% !important;
    height: auto;
    top: 0;
    bottom: auto;
  }
`;

const LuxeTimelineDot = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background: #B8960B;
  border-radius: 50%;
  border: 3px solid #FFFFFF;
  box-shadow: 0 0 0 2px #B8960B;
  
  @media (max-width: 600px) {
    top: auto;
    left: 50% !important;
    transform: translate(-50%, 0);
  }
`;

const LuxeTimelineLabel = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  white-space: nowrap;
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: #B8960B;
    display: block;
  }
  
  small {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 0.75rem;
    font-style: italic;
    color: #888;
  }
  
  @media (max-width: 600px) {
    top: auto;
    left: 30px;
    transform: none;
  }
`;

const LuxeGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 40px;
  
  @media (max-width: 600px) {
    gap: 20px;
    flex-wrap: wrap;
  }
`;

const LuxeUnit = styled.div`
  text-align: center;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
`;

const LuxeNumber = styled.div`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 300;
  font-style: italic;
  color: #1A1A1A;
  line-height: 1;
  margin-bottom: 10px;
`;

const LuxeLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.55rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: #888;
`;

const LuxeMessage = styled.p`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  color: #888;
  margin-bottom: 40px;
`;

const LuxeCTA = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  padding: 16px 40px;
  background: transparent;
  color: #1A1A1A;
  border: 1px solid #1A1A1A;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.1em;
  
  &:hover {
    background: #1A1A1A;
    color: #FFFFFF;
  }
`;

// ============================================
// NEON COUNTDOWN
// ============================================

const neonGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
  50% { filter: drop-shadow(0 0 15px currentColor); }
`;

const rotateCircle = keyframes`
  from { transform: rotate(-90deg); }
  to { transform: rotate(270deg); }
`;

// Berechnet den Fortschritt der Tage seit Start (01.01.2026) bis Ende (01.10.2026)
const calculateDaysProgress = (daysLeft) => {
  const totalDays = 274; // Tage von 01.01.2026 bis 01.10.2026
  const daysElapsed = totalDays - daysLeft;
  return Math.min(Math.max(daysElapsed / totalDays, 0), 1);
};

const NeonCountdown = ({ timeLeft, scrollToWaitlist }) => {
  // Berechne Progress für jeden Ring (0-1)
  const secondsProgress = timeLeft.seconds / 60;
  const minutesProgress = timeLeft.minutes / 60;
  const hoursProgress = timeLeft.hours / 24;
  const daysProgress = calculateDaysProgress(timeLeft.days);
  
  // SVG Circle Eigenschaften
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  
  const units = [
    { value: timeLeft.days, label: 'Days', progress: daysProgress, color: '#00ffff' },
    { value: timeLeft.hours, label: 'Hours', progress: hoursProgress, color: '#ff00ff' },
    { value: timeLeft.minutes, label: 'Minutes', progress: minutesProgress, color: '#00ff88' },
    { value: timeLeft.seconds, label: 'Seconds', progress: secondsProgress, color: '#00ffff' },
  ];

  return (
    <NeonSection id="countdown">
      <NeonGrid />
      <NeonContainer>
        <NeonCountdownGrid>
          {units.map((unit, index) => (
            <NeonCountdownItem key={unit.label} $delay={index * 0.1}>
              <NeonCircleSVG viewBox="0 0 100 100">
                {/* Background Circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                />
                {/* Progress Circle */}
                <NeonProgressCircle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={unit.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  $circumference={circumference}
                  $progress={unit.progress}
                  $color={unit.color}
                />
              </NeonCircleSVG>
              <NeonCountdownValue $color={unit.color}>
                {formatNumber(unit.value)}
              </NeonCountdownValue>
              <NeonCountdownLabel>{unit.label}</NeonCountdownLabel>
            </NeonCountdownItem>
          ))}
        </NeonCountdownGrid>
        
        <NeonCTAButton onClick={scrollToWaitlist}>
          LET'S MAKE IT EPIC
          <NeonCTAArrow>→</NeonCTAArrow>
        </NeonCTAButton>
      </NeonContainer>
    </NeonSection>
  );
};

const NeonSection = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 5%;
  background: #0a0a0f;
  overflow: hidden;
`;

const NeonGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
`;

const NeonContainer = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 900px;
  width: 100%;
`;

const NeonCountdownGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 60px;
  
  @media (max-width: 600px) {
    gap: 15px;
    flex-wrap: wrap;
  }
`;

const NeonCountdownItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInUp} 0.8s ease forwards;
  animation-delay: ${p => p.$delay}s;
  opacity: 0;
`;

const NeonCircleSVG = styled.svg`
  width: 120px;
  height: 120px;
  transform: rotate(-90deg);
  
  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
`;

const NeonProgressCircle = styled.circle`
  stroke-dasharray: ${p => p.$circumference};
  stroke-dashoffset: ${p => p.$circumference * (1 - p.$progress)};
  transition: stroke-dashoffset 0.5s ease;
  filter: drop-shadow(0 0 8px ${p => p.$color});
`;

const NeonCountdownValue = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${p => p.$color};
  text-shadow: 0 0 10px ${p => p.$color};
  
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const NeonCountdownLabel = styled.div`
  margin-top: 15px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
`;

const NeonCTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 50px;
  background: transparent;
  border: 2px solid #00ffff;
  color: #00ffff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    box-shadow: 
      0 0 30px rgba(0, 255, 255, 0.3),
      inset 0 0 30px rgba(0, 255, 255, 0.1);
    
    &::before {
      left: 100%;
    }
  }
`;

const NeonCTAArrow = styled.span`
  transition: transform 0.3s ease;
  
  ${NeonCTAButton}:hover & {
    transform: translateX(5px);
  }
`;
