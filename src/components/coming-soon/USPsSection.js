// USPs Section - Multi-Theme (Contemporary, Editorial & Video)
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(1deg); }
`;

const usps = [
  { num: '01', title: 'Eure eigene Domain', subtitle: 'SARAH-UND-THOMAS.DE', text: 'Keine kryptischen URLs – eure Hochzeitswebsite läuft auf eurer persönlichen Domain, die ihr behaltet.', icon: '🌐', color: '#4ECDC4' },
  { num: '02', title: '100% individuelles Design', subtitle: 'KEIN TEMPLATE', text: 'Jede Website wird von Grund auf für euch gestaltet. Keine zwei Paare haben die gleiche Seite.', icon: '✨', color: '#FFE66D' },
  { num: '03', title: 'Persönliche Beratung', subtitle: 'KEIN CHATBOT', text: 'Direkter Kontakt zu euren Designern. Wir verstehen eure Vision und setzen sie perfekt um.', icon: '💬', color: '#FF6B6B' },
  { num: '04', title: 'Passwortgeschützt', subtitle: 'NUR FÜR EURE GÄSTE', text: 'Eure Hochzeitsdetails bleiben privat. Nur eingeladene Gäste haben Zugang zur Website.', icon: '🔒', color: '#A855F7' },
  { num: '05', title: 'DSGVO-konform', subtitle: 'DEUTSCHE SERVER', text: 'Hosting in Deutschland, volle Datenschutz-Konformität. Eure Gästedaten sind sicher.', icon: '🇩🇪', color: '#4ECDC4' },
  { num: '06', title: 'Unbegrenzte Gäste', subtitle: 'KEINE LIMITS', text: 'Ob 50 oder 500 Gäste – keine künstlichen Beschränkungen, keine versteckten Kosten.', icon: '👥', color: '#FFE66D' },
  { num: '07', title: 'Mehrsprachig', subtitle: 'FÜR INTERNATIONALE GÄSTE', text: 'Automatische Sprachumschaltung für Gäste aus aller Welt. DE, EN, FR und mehr.', icon: '🌍', color: '#FF6B6B' },
  { num: '08', title: 'Perfekt auf jedem Gerät', subtitle: 'MOBILE-FIRST DESIGN', text: 'Responsive Design, das auf Smartphone, Tablet und Desktop gleichermaßen beeindruckt.', icon: '📱', color: '#A855F7' },
  { num: '09', title: 'Blitzschnelles Hosting', subtitle: 'PREMIUM PERFORMANCE', text: 'Enterprise-Hosting für Ladezeiten unter 2 Sekunden. Auch bei vielen gleichzeitigen Besuchern.', icon: '⚡', color: '#4ECDC4' },
  { num: '10', title: 'Support bis nach der Hochzeit', subtitle: 'LIFETIME CARE', text: 'Wir begleiten euch vom ersten Entwurf bis nach dem großen Tag. Änderungen jederzeit möglich.', icon: '💝', color: '#FFE66D' },
];

const USPsSection = () => {
  const { currentTheme } = useTheme();

  if (currentTheme === 'luxe') {
    return <LuxeUSPs />;
  }

  if (currentTheme === 'botanical') {
    return <BotanicalUSPs />;
  }

  if (currentTheme === 'video') {
    return <VideoUSPs />;
  }

  if (currentTheme === 'editorial') {
    return <EditorialUSPs />;
  }

  if (currentTheme === 'neon') {
    return <NeonUSPs />;
  }

  return <ContemporaryUSPs />;
};

// ============================================
// CONTEMPORARY USPs
// ============================================
const ContemporaryUSPs = () => (
  <Section id="usps" $theme="contemporary">
    <Container>
      <Header>
        <Badge $theme="contemporary">★ FEATURES</Badge>
        <Title $theme="contemporary">WAS WIR EUCH BIETEN</Title>
        <Subtitle $theme="contemporary">Alles was ihr für eure perfekte Hochzeitswebsite braucht</Subtitle>
      </Header>
      
      <ContemporaryGrid>
        {usps.map((usp, index) => (
          <ContemporaryCard key={usp.num} $color={usp.color} $delay={index * 0.05}>
            <CardNumber $color={usp.color}>{usp.num}</CardNumber>
            <CardTitle $theme="contemporary">{usp.title.toUpperCase()}</CardTitle>
            <CardText $theme="contemporary">{usp.text}</CardText>
          </ContemporaryCard>
        ))}
      </ContemporaryGrid>
      
      <DomainSection $theme="contemporary">
        <DomainIcon>🌐</DomainIcon>
        <DomainTitle $theme="contemporary">YOUR OWN DOMAIN</DomainTitle>
        <DomainExample $theme="contemporary">
          <span>www.sarah-und-thomas.de</span>
        </DomainExample>
        <DomainSubtext $theme="contemporary">
          Keine kryptischen URLs. Eure Hochzeitswebsite unter eurer eigenen Domain – Setup und erstes Jahr inklusive.
        </DomainSubtext>
      </DomainSection>
    </Container>
  </Section>
);

// ============================================
// EDITORIAL USPs
// ============================================
const EditorialUSPs = () => (
  <Section id="usps" $theme="editorial">
    <Container>
      <Header>
        <Badge $theme="editorial">WARUM S&I.</Badge>
        <EditorialMainTitle>Was uns <em>auszeichnet</em></EditorialMainTitle>
        <Subtitle $theme="editorial">
          Premium-Features für Paare, die keine Kompromisse eingehen. Jede Website ist ein Unikat.
        </Subtitle>
      </Header>
      
      <EditorialGrid>
        {usps.map((usp, index) => (
          <EditorialCard key={usp.num} $delay={index * 0.05}>
            <EditorialCardIcon>{usp.icon}</EditorialCardIcon>
            <EditorialCardContent>
              <EditorialCardTitle>{usp.title}</EditorialCardTitle>
              <EditorialCardSubtitle>{usp.subtitle}</EditorialCardSubtitle>
              <CardText $theme="editorial">{usp.text}</CardText>
            </EditorialCardContent>
            <EditorialCardNumber>{usp.num}</EditorialCardNumber>
          </EditorialCard>
        ))}
      </EditorialGrid>
      
      <DomainSection $theme="editorial">
        <DomainIcon>🌐</DomainIcon>
        <EditorialDomainTitle>Eure eigene Domain – <em>inklusive</em></EditorialDomainTitle>
        <DomainExample $theme="editorial">
          <span>www.sarah-und-thomas.de</span>
        </DomainExample>
        <DomainSubtext $theme="editorial">
          Keine kryptischen URLs. Eure Hochzeitswebsite, eure Domain. Setup und erstes Jahr inklusive.
        </DomainSubtext>
      </DomainSection>
    </Container>
  </Section>
);

// ============================================
// VIDEO USPs - Interactive Accordion
// ============================================
const VideoUSPs = () => {
  const [activeIndex, setActiveIndex] = useState(null); // Alle geschlossen am Anfang
  
  const handleClick = (index) => {
    // Toggle: wenn schon offen, schließen; sonst öffnen
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <VideoSection id="usps">
      <VideoContainer>
        <VideoHeader>
          <VideoBadge>— WAS WIR BIETEN —</VideoBadge>
          <VideoTitle>
            Premium <em>Features</em>
          </VideoTitle>
          <VideoSubtitle>
            Alles was ihr für eure perfekte Hochzeitswebsite braucht
          </VideoSubtitle>
        </VideoHeader>
        
        <VideoAccordion>
          {usps.map((usp, index) => (
            <VideoAccordionItem 
              key={usp.num}
              $active={activeIndex === index}
              onClick={() => handleClick(index)}
            >
              <VideoAccordionHeader $active={activeIndex === index}>
                <VideoAccordionNumber>{usp.num}</VideoAccordionNumber>
                <VideoAccordionTitle>{usp.title}</VideoAccordionTitle>
                <VideoAccordionIcon $active={activeIndex === index}>
                  {activeIndex === index ? '−' : '+'}
                </VideoAccordionIcon>
              </VideoAccordionHeader>
              
              {activeIndex === index && (
                <VideoAccordionContent>
                  <VideoAccordionSubtitle>{usp.subtitle}</VideoAccordionSubtitle>
                  <VideoAccordionText>{usp.text}</VideoAccordionText>
                </VideoAccordionContent>
              )}
            </VideoAccordionItem>
          ))}
        </VideoAccordion>
        
        <VideoDomainSection>
          <DomainIcon>🌐</DomainIcon>
          <VideoDomainTitle>Eure eigene Domain – <em>inklusive</em></VideoDomainTitle>
          <VideoDomainExample>www.sarah-und-thomas.de</VideoDomainExample>
          <VideoDomainSubtext>
            Keine kryptischen URLs. Eure Hochzeitswebsite, eure Domain.
          </VideoDomainSubtext>
        </VideoDomainSection>
      </VideoContainer>
    </VideoSection>
  );
};

// ============================================
// BOTANICAL USPs - Grid with Plant Elements
// ============================================
const BotanicalUSPs = () => (
  <BotanicalUSPSection id="usps">
    <BotanicalUSPContainer>
      <BotanicalUSPHeader>
        <BotanicalUSPBadge>✦ WARUM S&I. ✦</BotanicalUSPBadge>
        <BotanicalUSPTitle>Was uns <em>auszeichnet</em></BotanicalUSPTitle>
        <BotanicalUSPSubtitle>
          Premium-Features für Paare, die keine Kompromisse eingehen. Jede Website ist ein Unikat.
        </BotanicalUSPSubtitle>
      </BotanicalUSPHeader>
      
      <BotanicalUSPGrid>
        {usps.map((usp, index) => (
          <BotanicalUSPCard key={usp.num} $delay={index * 0.05}>
            <BotanicalUSPIcon>{usp.icon}</BotanicalUSPIcon>
            <BotanicalUSPCardTitle>{usp.title}</BotanicalUSPCardTitle>
            <BotanicalUSPCardText>{usp.text}</BotanicalUSPCardText>
            <BotanicalUSPTag>{usp.subtitle}</BotanicalUSPTag>
          </BotanicalUSPCard>
        ))}
      </BotanicalUSPGrid>
      
      <BotanicalDomainBox>
        <DomainIcon>🌐</DomainIcon>
        <BotanicalDomainTitle>Eure eigene Domain – <em>inklusive</em></BotanicalDomainTitle>
        <BotanicalDomainExample>www.sarah-und-thomas.de</BotanicalDomainExample>
        <BotanicalDomainSubtext>
          Keine kryptischen URLs. Eure Hochzeitswebsite, eure Domain. Setup und erstes Jahr inklusive.
        </BotanicalDomainSubtext>
      </BotanicalDomainBox>
    </BotanicalUSPContainer>
  </BotanicalUSPSection>
);

// ============================================
// LUXE USPs - Masonry-style Grid
// ============================================
const LuxeUSPs = () => {
  // Pattern für unterschiedliche Kartengrößen
  const sizePattern = ['large', 'small', 'small', 'medium', 'small', 'large', 'small', 'medium', 'small', 'small'];
  
  return (
    <LuxeUSPSection id="usps">
      <LuxeUSPContainer>
        <LuxeUSPHeader>
          <LuxeUSPBadge>WARUM S&I.</LuxeUSPBadge>
          <LuxeUSPTitle>
            <em>Was uns auszeichnet</em>
          </LuxeUSPTitle>
        </LuxeUSPHeader>
        
        <LuxeUSPGrid>
          {usps.map((usp, index) => (
            <LuxeUSPCard key={usp.num} $size={sizePattern[index]} $delay={index * 0.05}>
              <LuxeUSPIcon>{usp.icon}</LuxeUSPIcon>
              <LuxeUSPCardTitle>{usp.title}</LuxeUSPCardTitle>
              <LuxeUSPCardText>{usp.text}</LuxeUSPCardText>
            </LuxeUSPCard>
          ))}
        </LuxeUSPGrid>
        
        <LuxeDomainBox>
          <LuxeDomainTitle>Eure eigene Domain – <em>inklusive</em></LuxeDomainTitle>
          <LuxeDomainExample>www.sarah-und-thomas.de</LuxeDomainExample>
        </LuxeDomainBox>
      </LuxeUSPContainer>
    </LuxeUSPSection>
  );
};

export default USPsSection;

// ============================================
// STYLES
// ============================================
const Section = styled.section`
  padding: 120px 5%;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #FFFFFF;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    background: #FFFFFF;
  `}
`;

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const Badge = styled.div`
  display: inline-block;
  margin-bottom: 25px;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #0D0D0D;
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
  margin-bottom: 15px;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    color: #0D0D0D;
    letter-spacing: -0.02em;
  `}
`;

const EditorialMainTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 20px;
  
  em {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
  }
`;

const Subtitle = styled.p`
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    color: rgba(13, 13, 13, 0.6);
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    color: #666;
  `}
`;

// Contemporary Grid
const ContemporaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 80px;
  
  @media (max-width: 1200px) { grid-template-columns: repeat(4, 1fr); }
  @media (max-width: 900px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 650px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 400px) { grid-template-columns: 1fr; }
`;

const ContemporaryCard = styled.div`
  background: ${p => p.$color};
  padding: 30px 25px;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards, ${float} 6s ease-in-out infinite;
  animation-delay: ${p => p.$delay}s, ${p => p.$delay + 1}s;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px) rotate(1deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardNumber = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.15);
  line-height: 1;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  margin-bottom: 10px;
  line-height: 1.3;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #0D0D0D;
    letter-spacing: 0.05em;
  `}
`;

const CardText = styled.p`
  line-height: 1.5;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    color: rgba(13, 13, 13, 0.7);
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #666;
  `}
`;

// Editorial Grid
const EditorialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  margin-bottom: 80px;
  border-top: 1px solid #E0E0E0;
  
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const EditorialCard = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  padding: 35px 30px;
  border-bottom: 1px solid #E0E0E0;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
  transition: background 0.3s ease;
  
  &:nth-child(odd) {
    border-right: 1px solid #E0E0E0;
    
    @media (max-width: 700px) {
      border-right: none;
    }
  }
  
  &:hover {
    background: #FAFAFA;
  }
`;

const EditorialCardIcon = styled.div`
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F5F5F5;
  border-radius: 8px;
`;

const EditorialCardContent = styled.div`
  flex: 1;
`;

const EditorialCardTitle = styled.h3`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.15rem;
  font-style: italic;
  color: #1A1A1A;
  margin-bottom: 4px;
`;

const EditorialCardSubtitle = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: #999;
  display: block;
  margin-bottom: 10px;
`;

const EditorialCardNumber = styled.div`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 2.5rem;
  font-style: italic;
  color: #E0E0E0;
  line-height: 1;
`;

// Domain Section
const DomainSection = styled.div`
  text-align: center;
  padding: 60px 40px;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #0D0D0D;
    max-width: 700px;
    margin: 0 auto;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    background: #1A1A1A;
  `}
`;

const DomainIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const DomainTitle = styled.h3`
  margin-bottom: 25px;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: 0.1em;
  `}
`;

const EditorialDomainTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: #FFFFFF;
  margin-bottom: 25px;
  
  em {
    font-family: 'Instrument Serif', Georgia, serif;
    font-style: italic;
  }
`;

const DomainExample = styled.div`
  display: inline-block;
  margin-bottom: 20px;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #FFFFFF;
    padding: 3px;
    
    span {
      display: block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      color: #0D0D0D;
      padding: 12px 25px;
      border: 1px dashed rgba(13, 13, 13, 0.3);
    }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 12px 25px;
    
    span {
      font-family: 'Inter', sans-serif;
      font-size: 0.95rem;
      color: #FFFFFF;
    }
  `}
`;

const DomainSubtext = styled.p`
  max-width: 450px;
  margin: 0 auto;
  line-height: 1.6;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
  `}
`;

// ============================================
// VIDEO THEME STYLES
// ============================================
const VideoSection = styled.section`
  padding: 120px 5%;
  background: #0A0A0A;
`;

const VideoContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const VideoHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
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
  color: #FFFFFF;
  margin-bottom: 15px;
  
  em {
    font-style: italic;
  }
`;

const VideoSubtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
`;

const VideoAccordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 60px;
`;

const VideoAccordionItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  ${p => p.$active && css`
    background: rgba(139, 115, 85, 0.1);
  `}
`;

const VideoAccordionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
  
  ${p => p.$active && css`
    border-bottom: 1px solid rgba(139, 115, 85, 0.3);
  `}
`;

const VideoAccordionNumber = styled.span`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 300;
  color: #8B7355;
  min-width: 40px;
`;

const VideoAccordionTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: #FFFFFF;
  flex: 1;
`;

const VideoAccordionIcon = styled.span`
  font-size: 1.5rem;
  color: ${p => p.$active ? '#8B7355' : 'rgba(255, 255, 255, 0.3)'};
  transition: color 0.3s ease;
`;

const VideoAccordionContent = styled.div`
  padding: 20px 20px 25px 80px;
  animation: ${fadeInUp} 0.3s ease;
  
  @media (max-width: 600px) {
    padding-left: 20px;
    padding-top: 15px;
  }
`;

const VideoAccordionSubtitle = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #8B7355;
  margin-bottom: 12px;
`;

const VideoAccordionText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
`;

const VideoDomainSection = styled.div`
  text-align: center;
  padding: 50px 30px;
  background: rgba(139, 115, 85, 0.1);
  border: 1px solid rgba(139, 115, 85, 0.2);
`;

const VideoDomainTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #FFFFFF;
  margin-bottom: 20px;
  
  em {
    font-style: italic;
    color: #C4A87C;
  }
`;

const VideoDomainExample = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #C4A87C;
  padding: 15px 25px;
  border: 1px dashed rgba(196, 168, 124, 0.4);
  display: inline-block;
  margin-bottom: 15px;
`;

const VideoDomainSubtext = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
`;

// ============================================
// BOTANICAL THEME STYLES
// ============================================
const BotanicalUSPSection = styled.section`
  padding: 120px 5%;
  background: #FAF9F6;
`;

const BotanicalUSPContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BotanicalUSPHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const BotanicalUSPBadge = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #4A7C59;
  margin-bottom: 20px;
`;

const BotanicalUSPTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #2C3E2D;
  margin-bottom: 15px;
  
  em {
    font-style: italic;
  }
`;

const BotanicalUSPSubtitle = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  font-style: italic;
  color: #6B7B6C;
  max-width: 600px;
  margin: 0 auto;
`;

const BotanicalUSPGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 60px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const BotanicalUSPCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E0D8;
  padding: 30px 25px;
  text-align: center;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(74, 124, 89, 0.1);
    border-color: #4A7C59;
  }
`;

const BotanicalUSPIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const BotanicalUSPCardTitle = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: #2C3E2D;
  margin-bottom: 12px;
`;

const BotanicalUSPCardText = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: #6B7B6C;
  line-height: 1.7;
  margin-bottom: 15px;
`;

const BotanicalUSPTag = styled.span`
  display: inline-block;
  font-family: 'Lato', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #FFFFFF;
  background: #4A7C59;
  padding: 6px 12px;
  border-radius: 20px;
`;

const BotanicalDomainBox = styled.div`
  text-align: center;
  padding: 50px 30px;
  background: #2C3E2D;
  border-radius: 0;
`;

const BotanicalDomainTitle = styled.h3`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #FAF9F6;
  margin-bottom: 20px;
  
  em {
    font-style: italic;
    color: #7BA889;
  }
`;

const BotanicalDomainExample = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: #7BA889;
  padding: 12px 25px;
  border: 1px dashed rgba(123, 168, 137, 0.5);
  display: inline-block;
  margin-bottom: 15px;
`;

const BotanicalDomainSubtext = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: rgba(250, 249, 246, 0.6);
`;

// ============================================
// LUXE THEME STYLES
// ============================================
const LuxeUSPSection = styled.section`
  padding: 120px 5%;
  background: #FAFAFA;
`;

const LuxeUSPContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const LuxeUSPHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const LuxeUSPBadge = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #B8960B;
  margin-bottom: 20px;
`;

const LuxeUSPTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: #1A1A1A;
  
  em {
    font-style: italic;
  }
`;

const LuxeUSPGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 60px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const LuxeUSPCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  padding: ${p => p.$size === 'large' ? '40px 30px' : p.$size === 'medium' ? '30px 25px' : '25px 20px'};
  text-align: center;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
  
  ${p => p.$size === 'large' && css`
    grid-row: span 2;
  `}
  
  &:hover {
    border-color: #B8960B;
    transform: translateY(-3px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  }
  
  @media (max-width: 900px) {
    grid-row: span 1;
    padding: 25px 20px;
  }
`;

const LuxeUSPIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const LuxeUSPCardTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.1rem;
  font-weight: 500;
  font-style: italic;
  color: #1A1A1A;
  margin-bottom: 12px;
`;

const LuxeUSPCardText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: #888;
  line-height: 1.7;
`;

const LuxeDomainBox = styled.div`
  text-align: center;
  padding: 50px 30px;
  border: 1px solid #E5E5E5;
  background: #FFFFFF;
`;

const LuxeDomainTitle = styled.h3`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 300;
  color: #1A1A1A;
  margin-bottom: 20px;
  
  em {
    font-style: italic;
    color: #B8960B;
  }
`;

const LuxeDomainExample = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: #888;
  padding: 12px 25px;
  border: 1px dashed #E5E5E5;
  display: inline-block;
`;

// ============================================
// NEON USPs
// ============================================

const terminalBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const typeIn = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const NeonUSPs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  return (
    <NeonUSPsSection id="usps">
      <NeonUSPsGrid />
      <NeonUSPsContainer>
        {/* Header */}
        <NeonUSPsHeader>
          <NeonUSPsBadge>// WARUM S&I //</NeonUSPsBadge>
          <NeonUSPsTitle>10 REASONS TO CHOOSE US</NeonUSPsTitle>
          <NeonUSPsSubtitle>
            Premium-Features für Paare, die keine Kompromisse eingehen. Jede Website ist ein Unikat.
          </NeonUSPsSubtitle>
        </NeonUSPsHeader>
        
        {/* Terminal Style Feature Grid */}
        <NeonTerminalWindow>
          <NeonTerminalHeader>
            <NeonTerminalDots>
              <span style={{background: '#ff5f56'}} />
              <span style={{background: '#ffbd2e'}} />
              <span style={{background: '#27ca40'}} />
            </NeonTerminalDots>
            <NeonTerminalTitle>usp_features.exe — 10 modules loaded</NeonTerminalTitle>
          </NeonTerminalHeader>
          
          <NeonTerminalBody>
            <NeonUSPsGridLayout>
              {usps.map((usp, index) => (
                <NeonUSPCard 
                  key={usp.num}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  $isHovered={hoveredIndex === index}
                  $delay={index * 0.05}
                >
                  <NeonUSPCardHeader>
                    <NeonUSPNum>//MODULE_{usp.num}</NeonUSPNum>
                  </NeonUSPCardHeader>
                  <NeonUSPTitle $color={usp.color}>{usp.title}</NeonUSPTitle>
                  <NeonUSPText>{usp.text}</NeonUSPText>
                  <NeonUSPButton $color={usp.color}>{usp.subtitle}</NeonUSPButton>
                </NeonUSPCard>
              ))}
            </NeonUSPsGridLayout>
          </NeonTerminalBody>
        </NeonTerminalWindow>
        
        {/* Domain Highlight */}
        <NeonDomainBox>
          <NeonDomainIcon>🌐</NeonDomainIcon>
          <NeonDomainTitle>Eure eigene Domain – inklusive</NeonDomainTitle>
          <NeonDomainExample>www.sarah-und-thomas.de</NeonDomainExample>
          <NeonDomainText>Keine kryptischen URLs. Eure Hochzeitswebsite, eure Domain. Setup und erstes Jahr inklusive.</NeonDomainText>
        </NeonDomainBox>
      </NeonUSPsContainer>
    </NeonUSPsSection>
  );
};

const NeonUSPsSection = styled.section`
  position: relative;
  padding: 120px 5%;
  background: #0a0a0f;
  overflow: hidden;
`;

const NeonUSPsGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
`;

const NeonUSPsContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
`;

const NeonUSPsHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const NeonUSPsBadge = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #ff00ff;
  margin-bottom: 20px;
`;

const NeonUSPsTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #00ffff;
  text-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  margin-bottom: 20px;
`;

const NeonUSPsSubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;
`;

const NeonTerminalWindow = styled.div`
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 255, 255, 0.1);
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
  padding: 30px;
`;

const NeonUSPsGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NeonUSPCard = styled.div`
  padding: 25px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${p => p.$delay}s;
  opacity: 0;
  
  &:hover {
    background: rgba(0, 255, 255, 0.05);
    border-color: rgba(0, 255, 255, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 255, 255, 0.1);
  }
`;

const NeonUSPCardHeader = styled.div`
  margin-bottom: 15px;
`;

const NeonUSPNum = styled.span`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.7rem;
  color: #00ff88;
`;

const NeonUSPTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${p => p.$color || '#00ffff'};
  margin-bottom: 10px;
`;

const NeonUSPText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin-bottom: 15px;
`;

const NeonUSPButton = styled.span`
  display: inline-block;
  padding: 6px 12px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: ${p => p.$color || '#00ffff'};
  border: 1px solid ${p => p.$color || '#00ffff'};
  cursor: default;
`;

const NeonDomainBox = styled.div`
  margin-top: 60px;
  padding: 50px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.2);
`;

const NeonDomainIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const NeonDomainTitle = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #00ffff;
  margin-bottom: 20px;
`;

const NeonDomainExample = styled.div`
  display: inline-block;
  padding: 12px 25px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #FFFFFF;
  background: rgba(0, 255, 255, 0.1);
  border: 1px dashed rgba(0, 255, 255, 0.3);
  margin-bottom: 20px;
`;

const NeonDomainText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  max-width: 500px;
  margin: 0 auto;
`;
