// src/components/marketing/HowItWorksSection.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const Section = styled.section`
  padding: 140px 5%;
  position: relative;
  overflow: hidden;
  
  ${p => p.$themeId === 'editorial' && css`background: #FFFFFF;`}
  ${p => p.$themeId === 'video' && css`
    background: #0A0A0A;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 50%);
    }
  `}
  ${p => p.$themeId === 'botanical' && css`background: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`
    background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
  `}
  ${p => p.$themeId === 'luxe' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'neon' && css`
    background: #0a0a0f;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(0,255,255,0.05) 0%, transparent 30%),
        radial-gradient(circle at 80% 50%, rgba(255,0,255,0.05) 0%, transparent 30%);
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
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '40px'});
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${p => p.$themeId === 'editorial' && css`text-align: left; max-width: 600px;`}
  ${p => p.$themeId === 'video' && css`text-align: center;`}
  ${p => p.$themeId === 'botanical' && css`text-align: center;`}
  ${p => p.$themeId === 'contemporary' && css`text-align: center;`}
  ${p => p.$themeId === 'luxe' && css`text-align: center;`}
  ${p => p.$themeId === 'neon' && css`text-align: center;`}
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
    font-size: 0.9rem;
    font-weight: 700;
    color: #FFFFFF;
    background: rgba(0,0,0,0.2);
    padding: 8px 16px;
    display: inline-block;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.6);
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
  margin: 0 0 1.5rem 0;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 400;
    font-style: italic;
    color: #1A1A1A;
    line-height: 1.1;
  `}
  ${p => p.$themeId === 'video' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    color: #FFFFFF;
    letter-spacing: 0.05em;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 400;
    color: #2D3B2D;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    color: #FFFFFF;
    text-transform: uppercase;
    line-height: 0.9;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    font-style: italic;
    color: #E8DDD4;
    letter-spacing: 0.02em;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    color: #FFFFFF;
    text-shadow: 0 0 30px rgba(255,255,255,0.3);
  `}
`;

const Subtitle = styled.p`
  line-height: 1.7;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    color: #666;
    margin: 0;
  `}
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    color: rgba(255,255,255,0.6);
    max-width: 500px;
    margin: 0 auto;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 1.1rem;
    color: #5A6B5A;
    max-width: 550px;
    margin: 0 auto;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.2rem;
    color: rgba(255,255,255,0.8);
    max-width: 500px;
    margin: 0 auto;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    color: rgba(255,255,255,0.4);
    max-width: 500px;
    margin: 0 auto;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    color: rgba(255,255,255,0.6);
    max-width: 500px;
    margin: 0 auto;
  `}
`;

const StepsContainer = styled.div`
  ${p => p.$themeId === 'editorial' && css`
    display: flex;
    gap: 60px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 25px;
      left: 0;
      right: 0;
      height: 1px;
      background: #E0E0E0;
    }
  `}
  ${p => p.$themeId === 'video' && css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
    @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 500px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    max-width: 900px;
    margin: 0 auto;
    @media (max-width: 600px) { grid-template-columns: 1fr; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding-bottom: 20px;
    &::-webkit-scrollbar { height: 4px; }
    &::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); }
    &::-webkit-scrollbar-thumb { background: #FFFFFF; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    display: flex;
    justify-content: center;
    gap: 80px;
    @media (max-width: 900px) { 
      flex-wrap: wrap;
      gap: 40px;
    }
  `}
  ${p => p.$themeId === 'neon' && css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
    @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 500px) { grid-template-columns: 1fr; }
  `}
`;

const Step = styled.div`
  opacity: ${p => p.$visible ? 1 : 0};
  transform: translateY(${p => p.$visible ? 0 : '30px'});
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: ${p => p.$delay}s;
  
  ${p => p.$themeId === 'editorial' && css`
    flex: 1;
    text-align: left;
  `}
  ${p => p.$themeId === 'video' && css`
    text-align: center;
    padding: 30px 20px;
    &:hover {
      transform: translateY(-5px);
    }
  `}
  ${p => p.$themeId === 'botanical' && css`
    background: #FFFFFF;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  `}
  ${p => p.$themeId === 'contemporary' && css`
    flex: 0 0 280px;
    background: #FFFFFF;
    padding: 30px;
    border: 3px solid #0D0D0D;
    &:hover {
      transform: translate(-5px, -5px);
      box-shadow: 8px 8px 0 #0D0D0D;
    }
  `}
  ${p => p.$themeId === 'luxe' && css`
    text-align: center;
    max-width: 200px;
  `}
  ${p => p.$themeId === 'neon' && css`
    padding: 30px;
    border: 1px solid rgba(0,255,255,0.2);
    background: rgba(0,255,255,0.02);
    &:hover {
      border-color: rgba(0,255,255,0.5);
      box-shadow: 0 0 30px rgba(0,255,255,0.1);
    }
  `}
`;

const StepNumber = styled.div`
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Instrument Serif', Georgia, serif;
    font-size: 3rem;
    font-style: italic;
    color: #1A1A1A;
    line-height: 1;
    margin-bottom: 20px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 40px;
      width: 8px;
      height: 8px;
      background: #1A1A1A;
      border-radius: 50%;
    }
  `}
  ${p => p.$themeId === 'video' && css`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid #D4AF37;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 25px;
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.5rem;
    color: #D4AF37;
  `}
  ${p => p.$themeId === 'botanical' && css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #8B9D83;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 20px;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 4rem;
    font-weight: 700;
    color: #FF6B6B;
    line-height: 1;
    margin-bottom: 15px;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 4rem;
    font-weight: 300;
    color: rgba(212,175,55,0.3);
    line-height: 1;
    margin-bottom: 15px;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #00ffff;
    text-shadow: 0 0 20px rgba(0,255,255,0.5);
    margin-bottom: 15px;
  `}
`;

const StepTitle = styled.h3`
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #1A1A1A;
    margin: 0 0 10px 0;
  `}
  ${p => p.$themeId === 'video' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.3rem;
    font-weight: 500;
    color: #FFFFFF;
    margin: 0 0 15px 0;
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.2rem;
    font-weight: 500;
    color: #2D3B2D;
    margin: 0 0 10px 0;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #0D0D0D;
    text-transform: uppercase;
    margin: 0 0 10px 0;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.3rem;
    font-weight: 400;
    font-style: italic;
    color: #E8DDD4;
    margin: 0 0 10px 0;
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #FFFFFF;
    margin: 0 0 10px 0;
  `}
`;

const StepDescription = styled.p`
  margin: 0;
  line-height: 1.6;
  
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: #666;
  `}
  ${p => p.$themeId === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.5);
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.95rem;
    color: #5A6B5A;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    color: #666;
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.4);
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.5);
  `}
`;

const steps = [
  { number: '01', title: 'Beratung', description: 'Wir lernen euch und eure Wünsche kennen.' },
  { number: '02', title: 'Design', description: 'Wir gestalten eure individuelle Website.' },
  { number: '03', title: 'Inhalte', description: 'Ihr liefert Texte und Fotos – wir setzen um.' },
  { number: '04', title: 'Launch', description: 'Eure Website geht online!' }
];

function HowItWorksSection() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="how-it-works">
      <Container>
        <Header $themeId={currentTheme} $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>So funktioniert's</Eyebrow>
          <Title $themeId={currentTheme}>In 4 Schritten zu eurer Traumwebsite</Title>
          <Subtitle $themeId={currentTheme}>
            Einfach, persönlich und stressfrei – wir begleiten euch von der ersten Idee bis zum großen Tag.
          </Subtitle>
        </Header>

        <StepsContainer $themeId={currentTheme}>
          {steps.map((step, index) => (
            <Step 
              key={step.number} 
              $themeId={currentTheme}
              $visible={isVisible}
              $delay={0.1 + index * 0.1}
            >
              <StepNumber $themeId={currentTheme}>{step.number}</StepNumber>
              <StepTitle $themeId={currentTheme}>{step.title}</StepTitle>
              <StepDescription $themeId={currentTheme}>{step.description}</StepDescription>
            </Step>
          ))}
        </StepsContainer>
      </Container>
    </Section>
  );
}

export default HowItWorksSection;
