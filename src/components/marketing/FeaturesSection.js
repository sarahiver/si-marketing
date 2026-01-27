// src/components/marketing/FeaturesSection.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const Section = styled.section`
  padding: 140px 5%;
  position: relative;
  overflow: hidden;
  
  ${p => p.$themeId === 'editorial' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'video' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'botanical' && css`background: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'neon' && css`
    background: #0a0a0f;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 80% 20%, rgba(0,255,255,0.03) 0%, transparent 30%);
    }
  `}
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  margin-bottom: 80px;
  text-align: center;
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
`;

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 1rem;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #999;
  `}
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #D4AF37;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #8B9D83;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: #FF6B6B;
    &::before { content: '→ '; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.5);
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0,255,255,0.5);
  `}
`;

const Title = styled.h2`
  margin: 0 0 1rem 0;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 400;
    font-style: italic;
    color: #1A1A1A;
  `}
  ${p => p.$themeId === 'video' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    color: #FFFFFF;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 400;
    color: #2D3B2D;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(3rem, 7vw, 5rem);
    font-weight: 700;
    color: #0D0D0D;
    text-transform: uppercase;
    line-height: 0.9;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    font-style: italic;
    color: #E8DDD4;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    color: #FFFFFF;
  `}
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const FeatureCard = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${p => p.$delay}s;
  
  ${p => p.$themeId === 'editorial' && css`
    padding: 40px 30px;
    border: 1px solid #E0E0E0;
    text-align: center;
    &:hover { border-color: #1A1A1A; }
  `}
  ${p => p.$themeId === 'video' && css`
    padding: 40px 30px;
    border: 1px solid rgba(212,175,55,0.15);
    background: rgba(212,175,55,0.02);
    text-align: center;
    &:hover { border-color: rgba(212,175,55,0.4); }
  `}
  ${p => p.$themeId === 'botanical' && css`
    padding: 35px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    &:hover { transform: translateY(-5px); }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    padding: 30px;
    border: 2px solid #0D0D0D;
    &:hover { background: #0D0D0D; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    padding: 40px 30px;
    border: 1px solid rgba(212,175,55,0.1);
    text-align: center;
    &:hover { border-color: rgba(212,175,55,0.25); }
  `}
  ${p => p.$themeId === 'neon' && css`
    padding: 35px;
    border: 1px solid rgba(0,255,255,0.15);
    background: rgba(0,255,255,0.02);
    &:hover { border-color: rgba(0,255,255,0.4); box-shadow: 0 0 20px rgba(0,255,255,0.1); }
  `}
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 20px;
  
  ${p => p.$themeId === 'neon' && css`
    filter: drop-shadow(0 0 5px rgba(0,255,255,0.5));
  `}
`;

const FeatureTitle = styled.h3`
  margin: 0 0 12px 0;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 600; color: #1A1A1A;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.2rem; font-weight: 500; color: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; font-size: 1.1rem; font-weight: 500; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 700; color: #0D0D0D; text-transform: uppercase;
    ${FeatureCard}:hover & { color: #FFFFFF; }
  `}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.2rem; font-weight: 400; color: #E8DDD4;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 600; color: #00ffff;`}
`;

const FeatureDescription = styled.p`
  margin: 0;
  line-height: 1.6;
  
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #666;`}
  ${p => p.$themeId === 'video' && css`font-family: 'Montserrat', sans-serif; font-size: 0.8rem; color: rgba(255,255,255,0.5);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; font-size: 0.9rem; color: #5A6B5A;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; color: #666;
    ${FeatureCard}:hover & { color: rgba(255,255,255,0.7); }
  `}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; font-size: 0.8rem; color: rgba(255,255,255,0.4);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; color: rgba(255,255,255,0.5);`}
`;

const features = [
  { icon: '🎨', title: 'Individuelles Design', description: 'Maßgeschneidert für euren einzigartigen Stil.' },
  { icon: '📱', title: 'Responsive', description: 'Perfekt auf jedem Gerät – Handy, Tablet, Desktop.' },
  { icon: '✉️', title: 'RSVP System', description: 'Einfache Zu- und Absagen für eure Gäste.' },
  { icon: '📸', title: 'Fotogalerie', description: 'Präsentiert eure schönsten Momente.' },
  { icon: '📍', title: 'Location Maps', description: 'Interaktive Karten für alle Veranstaltungsorte.' },
  { icon: '📝', title: 'Gästebuch', description: 'Glückwünsche und Nachrichten sammeln.' },
  { icon: '🕐', title: 'Timeline', description: 'Der Ablauf eures großen Tages auf einen Blick.' },
  { icon: '🔒', title: 'DSGVO-konform', description: 'Datenschutz nach deutschen Standards.' }
];

function FeaturesSection() {
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

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="features">
      <Container>
        <Header $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>Features</Eyebrow>
          <Title $themeId={currentTheme}>Alles was ihr braucht</Title>
        </Header>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              $themeId={currentTheme}
              $visible={isVisible}
              $delay={0.1 + index * 0.05}
            >
              <FeatureIcon $themeId={currentTheme}>{feature.icon}</FeatureIcon>
              <FeatureTitle $themeId={currentTheme}>{feature.title}</FeatureTitle>
              <FeatureDescription $themeId={currentTheme}>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </Section>
  );
}

export default FeaturesSection;
