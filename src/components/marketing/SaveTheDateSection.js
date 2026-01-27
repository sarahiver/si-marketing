// src/components/marketing/SaveTheDateSection.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const Section = styled.section`
  padding: 100px 20px;
  @media (min-width: 600px) { padding: 140px 5%; }
  ${p => p.$themeId === 'video' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'editorial' && css`background: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`background: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`background: #0D0D0D;`}
  ${p => p.$themeId === 'luxe' && css`background: #0A0A0A;`}
  ${p => p.$themeId === 'neon' && css`background: #12121a;`}
`;

const Container = styled.div`
  max-width: 1100px; margin: 0 auto; width: 100%;
  display: grid; grid-template-columns: 1fr; gap: 50px; align-items: center;
  @media (min-width: 900px) { grid-template-columns: 1fr 1fr; gap: 80px; }
`;

const Content = styled.div`
  opacity: ${p => p.$visible ? 1 : 0}; 
  transform: translateY(${p => p.$visible ? 0 : '30px'}); 
  transition: all 0.9s ease;
`;

const Eyebrow = styled.span`
  display: block; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 20px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 300; margin-bottom: 20px; line-height: 1.2;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #FEFEFE; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff; font-weight: 700;`}
`;

const Desc = styled.p`
  font-size: 1rem; line-height: 1.8; margin-bottom: 30px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.6);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.7);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: rgba(245,241,235,0.7);`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.7);`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(255,255,255,0.5);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.6);`}
`;

const Features = styled.div`display: flex; flex-direction: column; gap: 12px;`;

const Feature = styled.div`
  display: flex; align-items: center; gap: 12px; font-size: 0.9rem;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #FEFEFE;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff;`}
  &::before {
    content: '✓'; font-weight: 600;
    ${p => p.$themeId === 'video' && css`color: #B8976A;`}
    ${p => p.$themeId === 'editorial' && css`color: #FFFFFF;`}
    ${p => p.$themeId === 'botanical' && css`color: #8B9D83;`}
    ${p => p.$themeId === 'contemporary' && css`color: #FF6B6B;`}
    ${p => p.$themeId === 'luxe' && css`color: #D4AF37;`}
    ${p => p.$themeId === 'neon' && css`color: #00ffff;`}
  }
`;

const Preview = styled.div`
  opacity: ${p => p.$visible ? 1 : 0}; transform: translateX(${p => p.$visible ? 0 : '40px'}); transition: all 0.9s ease 0.2s;
`;

const PhoneMockups = styled.div`
  display: flex; gap: 20px; align-items: flex-start; justify-content: center; position: relative;
  @media (max-width: 500px) { flex-direction: column; align-items: center; }
`;

const Phone = styled.div`
  width: 160px; height: 320px; border-radius: 25px; padding: 8px; position: relative;
  ${p => p.$themeId === 'video' && css`background: #1a1a1a; box-shadow: 0 30px 60px rgba(0,0,0,0.4);`}
  ${p => p.$themeId === 'editorial' && css`background: #333; box-shadow: 0 30px 60px rgba(0,0,0,0.3);`}
  ${p => p.$themeId === 'botanical' && css`background: #1a2a1a; box-shadow: 0 30px 60px rgba(0,0,0,0.3);`}
  ${p => p.$themeId === 'contemporary' && css`background: #1a1a1a; box-shadow: 6px 6px 0 #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`background: #1a1a1a; box-shadow: 0 30px 60px rgba(212,175,55,0.1);`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f; box-shadow: 0 0 40px rgba(0,255,255,0.2);`}
  &:nth-child(2) { margin-top: 40px; }
  &::before { content: ''; position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 50px; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; }
`;

const Screen = styled.div`
  width: 100%; height: 100%; border-radius: 18px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 25px 12px; text-align: center;
  ${p => p.$dark && css`
    ${p.$themeId === 'video' && css`background: #0a0a0a;`}
    ${p.$themeId === 'editorial' && css`background: #1A1A1A;`}
    ${p.$themeId === 'botanical' && css`background: #2D3B2D;`}
    ${p.$themeId === 'contemporary' && css`background: #0D0D0D;`}
    ${p.$themeId === 'luxe' && css`background: #0a0a0a;`}
    ${p.$themeId === 'neon' && css`background: #0a0a0f;`}
  `}
  ${p => !p.$dark && css`
    ${p.$themeId === 'video' && css`background: #FAF8F5;`}
    ${p.$themeId === 'editorial' && css`background: #FFFFFF;`}
    ${p.$themeId === 'botanical' && css`background: #F5F1EB;`}
    ${p.$themeId === 'contemporary' && css`background: #FAFAFA;`}
    ${p.$themeId === 'luxe' && css`background: #FAF9F7;`}
    ${p.$themeId === 'neon' && css`background: #12121a;`}
  `}
`;

const ScreenEyebrow = styled.div`font-size: 0.35rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 8px; color: ${p => p.$accent};`;
const ScreenTitle = styled.div`
  font-size: 1.1rem; font-weight: 300; margin-bottom: 5px;
  background: linear-gradient(135deg, ${p => p.$accent}, ${p => p.$accentAlt});
  background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; animation: ${shimmer} 4s linear infinite;
`;
const ScreenDate = styled.div`font-size: 0.4rem; color: ${p => p.$muted}; margin-bottom: 10px;`;
const ScreenDivider = styled.div`width: 30px; height: 1px; background: ${p => p.$accent}; opacity: 0.4; margin-bottom: 10px;`;
const ScreenText = styled.div`font-size: 0.35rem; color: ${p => p.$muted}; line-height: 1.5;`;

const Arrow = styled.div`
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem;
  ${p => p.$themeId === 'video' && css`color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`color: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5);`}
  @media (max-width: 500px) { transform: rotate(90deg); position: relative; top: auto; left: auto; }
`;

const Label = styled.div`
  font-size: 0.55rem; letter-spacing: 0.1em; text-transform: uppercase; text-align: center; margin-top: 12px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.4);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.5);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: rgba(245,241,235,0.5);`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.5);`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(255,255,255,0.3);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.4);`}
`;

const themeAccents = {
  video: { accent: '#B8976A', accentAlt: '#D4AF37', muted: 'rgba(255,255,255,0.4)' },
  editorial: { accent: '#1A1A1A', accentAlt: '#666', muted: '#999' },
  botanical: { accent: '#8B9D83', accentAlt: '#A8B8A0', muted: '#7D9D7C' },
  contemporary: { accent: '#FF6B6B', accentAlt: '#4ECDC4', muted: '#999' },
  luxe: { accent: '#D4AF37', accentAlt: '#F4D03F', muted: 'rgba(255,255,255,0.3)' },
  neon: { accent: '#00ffff', accentAlt: '#ff00ff', muted: 'rgba(255,255,255,0.4)' }
};

function SaveTheDateSection() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const colors = themeAccents[currentTheme];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} $themeId={currentTheme}>
      <Container>
        <Content $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>— Save the Date —</Eyebrow>
          <Title $themeId={currentTheme}>Eine URL, zwei Erlebnisse</Title>
          <Desc $themeId={currentTheme}>
            Eure Gäste besuchen die gleiche Website – zuerst sehen sie die elegante Save-the-Date Ankündigung. 
            Zur Hochzeit schaltet ihr einfach auf die vollständige Wedding-Page um.
          </Desc>
          <Features>
            <Feature $themeId={currentTheme}>Gleiche URL für Save-the-Date & Wedding</Feature>
            <Feature $themeId={currentTheme}>Nahtloser Übergang per Klick im Admin</Feature>
            <Feature $themeId={currentTheme}>Countdown bis zur Hochzeit</Feature>
            <Feature $themeId={currentTheme}>Bei Couture inklusive</Feature>
          </Features>
        </Content>
        
        <Preview $visible={isVisible}>
          <PhoneMockups>
            <div>
              <Phone $themeId={currentTheme}>
                <Screen $dark $themeId={currentTheme}>
                  <ScreenEyebrow $accent={colors.accent}>— Save the Date —</ScreenEyebrow>
                  <ScreenTitle $accent={colors.accent} $accentAlt={colors.accentAlt}>Sarah & Iver</ScreenTitle>
                  <ScreenDate $muted={colors.muted}>15. August 2026</ScreenDate>
                  <ScreenDivider $accent={colors.accent} />
                  <ScreenText $muted={colors.muted}>Wir heiraten!<br/>Einladung folgt</ScreenText>
                </Screen>
              </Phone>
              <Label $themeId={currentTheme}>Save the Date</Label>
            </div>
            
            <Arrow $themeId={currentTheme}>→</Arrow>
            
            <div>
              <Phone $themeId={currentTheme}>
                <Screen $themeId={currentTheme}>
                  <ScreenEyebrow $accent={colors.accent}>— Willkommen —</ScreenEyebrow>
                  <ScreenTitle $accent={colors.accent} $accentAlt={colors.accentAlt}>Sarah & Iver</ScreenTitle>
                  <ScreenDate $muted={colors.muted}>15. August 2026 • Hamburg</ScreenDate>
                  <ScreenDivider $accent={colors.accent} />
                  <ScreenText $muted={colors.muted}>Ablauf • Location<br/>RSVP • Galerie</ScreenText>
                </Screen>
              </Phone>
              <Label $themeId={currentTheme}>Wedding Page</Label>
            </div>
          </PhoneMockups>
        </Preview>
      </Container>
    </Section>
  );
}

export default SaveTheDateSection;
