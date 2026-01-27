// src/components/marketing/PricingSection.js
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
  ${p => p.$themeId === 'video' && css`background: #FAF8F5;`}
  ${p => p.$themeId === 'editorial' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'botanical' && css`background: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'luxe' && css`background: #FAF9F7;`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f;`}
`;

const Container = styled.div`max-width: 1200px; margin: 0 auto;`;

const Header = styled.div`
  text-align: center; margin-bottom: 80px;
  opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'}); transition: all 0.8s ease;
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
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 300; margin-bottom: 20px;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff; font-weight: 700;`}
`;

const PricingGrid = styled.div`
  display: grid; 
  grid-template-columns: 1fr; 
  gap: 25px; 
  margin-bottom: 60px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 768px) { 
    grid-template-columns: repeat(3, 1fr); 
    max-width: none;
    gap: 30px; 
    margin-bottom: 80px; 
  }
`;

const PricingCard = styled.div`
  padding: 40px 25px; text-align: center; position: relative;
  opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'}) scale(${p => p.$popular && p.$visible ? 1.02 : 1});
  transition: all 0.6s ease ${p => p.$delay}s;
  @media (min-width: 768px) { padding: 50px 35px; }
  ${p => p.$themeId === 'video' && css`
    background: ${p.$popular ? 'rgba(184,151,106,0.05)' : '#FFFFFF'};
    border: 1px solid ${p.$popular ? 'rgba(184,151,106,0.4)' : 'rgba(184,151,106,0.15)'};
    &:hover { border-color: #B8976A; }
  `}
  ${p => p.$themeId === 'editorial' && css`
    background: #FFFFFF; border: 1px solid ${p.$popular ? '#1A1A1A' : '#E0E0E0'};
    ${p.$popular && css`border-width: 2px;`}
  `}
  ${p => p.$themeId === 'botanical' && css`
    background: #FFFFFF; border: 1px solid ${p.$popular ? '#8B9D83' : 'rgba(139,157,131,0.2)'}; border-radius: 20px;
  `}
  ${p => p.$themeId === 'contemporary' && css`
    background: #FFFFFF; border: 3px solid #0D0D0D;
    ${p.$popular && css`box-shadow: 6px 6px 0 #FF6B6B;`}
  `}
  ${p => p.$themeId === 'luxe' && css`
    background: #FFFFFF; border: 1px solid ${p.$popular ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.1)'};
  `}
  ${p => p.$themeId === 'neon' && css`
    background: rgba(255,255,255,0.02); border: 1px solid ${p.$popular ? '#00ffff' : 'rgba(0,255,255,0.2)'};
    ${p.$popular && css`box-shadow: 0 0 30px rgba(0,255,255,0.2);`}
  `}
`;

const PopularBadge = styled.div`
  position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
  font-size: 0.6rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; padding: 8px 20px;
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #B8976A, #D4AF37); background-size: 200% auto;
    animation: ${shimmer} 3s linear infinite; color: #0a0a0a;
  `}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; background: #1A1A1A; color: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; background: #8B9D83; color: #FFFFFF; border-radius: 0 0 10px 10px;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; background: #FF6B6B; color: #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; background: #D4AF37; color: #0a0a0a;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; background: #00ffff; color: #0a0a0f;`}
`;

const PlanName = styled.h3`
  font-size: 1.5rem; margin-bottom: 10px;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff;`}
`;

const Price = styled.div`
  font-size: 3rem; font-weight: 300; margin: 20px 0;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FF6B6B; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff; font-weight: 700;`}
  span { font-size: 1rem; }
`;

const Features = styled.ul`list-style: none; text-align: left; margin: 30px 0;`;

const Feature = styled.li`
  display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; font-size: 0.9rem;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: ${p.$highlight ? '#1A1A1A' : 'rgba(26,26,26,0.6)'};`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: ${p.$highlight ? '#1A1A1A' : '#666'};`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: ${p.$highlight ? '#2D3B2D' : '#5A6B5A'};`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: ${p.$highlight ? '#0D0D0D' : '#666'};`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: ${p.$highlight ? '#2A2A2A' : 'rgba(42,42,42,0.6)'};`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: ${p.$highlight ? '#ffffff' : 'rgba(255,255,255,0.5)'};`}
  &::before {
    content: '✓'; font-weight: 600;
    ${p => p.$themeId === 'video' && css`color: #B8976A;`}
    ${p => p.$themeId === 'editorial' && css`color: #1A1A1A;`}
    ${p => p.$themeId === 'botanical' && css`color: #8B9D83;`}
    ${p => p.$themeId === 'contemporary' && css`color: #FF6B6B;`}
    ${p => p.$themeId === 'luxe' && css`color: #D4AF37;`}
    ${p => p.$themeId === 'neon' && css`color: #00ffff;`}
  }
`;

const CTAButton = styled.a`
  display: inline-block; width: 100%; text-align: center; font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase; padding: 18px 30px; text-decoration: none; transition: all 0.3s ease;
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif;
    ${p.$primary ? css`background: #B8976A; color: #0a0a0a; &:hover { background: #D4AF37; }` 
                : css`background: transparent; color: #B8976A; border: 1px solid rgba(184,151,106,0.4); &:hover { border-color: #B8976A; }`}
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    ${p.$primary ? css`background: #1A1A1A; color: #FFFFFF; &:hover { background: #333; }` 
                : css`background: transparent; color: #1A1A1A; border: 1px solid #1A1A1A; &:hover { background: #1A1A1A; color: #FFFFFF; }`}
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif; border-radius: 30px;
    ${p.$primary ? css`background: #8B9D83; color: #FFFFFF; &:hover { background: #6B7D63; }` 
                : css`background: transparent; color: #2D3B2D; border: 2px solid #2D3B2D; &:hover { background: #2D3B2D; color: #F5F1EB; }`}
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif; font-weight: 700;
    ${p.$primary ? css`background: #FF6B6B; color: #FFFFFF; border: 3px solid #FF6B6B; &:hover { background: #E85555; }` 
                : css`background: transparent; color: #0D0D0D; border: 3px solid #0D0D0D; &:hover { background: #0D0D0D; color: #FFFFFF; }`}
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif; font-size: 0.7rem; letter-spacing: 0.2em;
    ${p.$primary ? css`background: #D4AF37; color: #0a0a0a; &:hover { background: #F4D03F; }` 
                : css`background: transparent; color: #D4AF37; border: 1px solid rgba(212,175,55,0.4); &:hover { border-color: #D4AF37; }`}
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    ${p.$primary ? css`background: #00ffff; color: #0a0a0f; box-shadow: 0 0 20px rgba(0,255,255,0.3); &:hover { box-shadow: 0 0 30px rgba(0,255,255,0.5); }` 
                : css`background: transparent; color: #00ffff; border: 1px solid rgba(0,255,255,0.4); &:hover { border-color: #00ffff; }`}
  `}
`;

const AddOnsSection = styled.div`margin-top: 60px;`;

const AddOnsTitle = styled.h3`
  text-align: center; font-size: 1.8rem; margin-bottom: 40px;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff;`}
`;

const AddOnsGrid = styled.div`
  display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  gap: 15px;
  @media (min-width: 600px) { grid-template-columns: repeat(3, 1fr); gap: 20px; }
  @media (min-width: 900px) { grid-template-columns: repeat(4, 1fr); }
`;

const AddOn = styled.div`
  padding: 25px; text-align: center;
  ${p => p.$themeId === 'video' && css`background: #FFFFFF; border: 1px solid rgba(184,151,106,0.15);`}
  ${p => p.$themeId === 'editorial' && css`background: #FFFFFF; border: 1px solid #E0E0E0;`}
  ${p => p.$themeId === 'botanical' && css`background: #FFFFFF; border: 1px solid rgba(139,157,131,0.2); border-radius: 12px;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FFFFFF; border: 2px solid #0D0D0D;`}
  ${p => p.$themeId === 'luxe' && css`background: #FFFFFF; border: 1px solid rgba(212,175,55,0.1);`}
  ${p => p.$themeId === 'neon' && css`background: rgba(255,255,255,0.02); border: 1px solid rgba(0,255,255,0.15);`}
`;

const AddOnName = styled.h4`
  font-size: 0.9rem; margin-bottom: 5px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 600;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #2A2A2A;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff;`}
`;

const AddOnPrice = styled.span`
  font-size: 1.1rem; font-weight: 600;
  ${p => p.$themeId === 'video' && css`color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`color: #00ffff;`}
`;

const AddOnNote = styled.span`
  display: block; font-size: 0.7rem; margin-top: 5px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(26,26,26,0.4);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #7D9D7C;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #999;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.4);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.3);`}
`;

const tiers = [
  { name: 'Klassik', price: '1.490', popular: false, features: [
    { text: '10 Komponenten', highlight: false },
    { text: '8 Monate Hosting', highlight: false },
    { text: '1× 30 Min Beratung', highlight: false },
    { text: 'Alle 6 Themes', highlight: false },
    { text: 'Mobile-optimiert', highlight: false },
    { text: 'Save-the-Date: +250€', highlight: false },
  ]},
  { name: 'Signature', price: '2.190', popular: true, features: [
    { text: '16 Komponenten', highlight: true },
    { text: '12 Monate Hosting', highlight: true },
    { text: '2× 30 Min Beratung', highlight: true },
    { text: 'Alle 6 Themes', highlight: false },
    { text: 'Save-the-Date: nur +125€', highlight: true },
    { text: 'Archivierung: +190€', highlight: false },
  ]},
  { name: 'Couture', price: '2.990', pricePlus: true, popular: false, features: [
    { text: 'Alle 18 Komponenten', highlight: true },
    { text: '12 Monate Hosting', highlight: false },
    { text: 'Unbegrenzte Beratung', highlight: true },
    { text: 'Save-the-Date inklusive', highlight: true },
    { text: '3 Monate Archiv inkl.', highlight: true },
    { text: 'Custom Design möglich', highlight: true },
  ]}
];

const addOns = [
  { name: 'Save-the-Date', price: 'ab 125€', note: '+1 Monat Hosting' },
  { name: 'Archivierung', price: '+190€', note: '3 Monate' },
  { name: 'Hosting-Verlängerung', price: '29€/Mon', note: 'Nach Ablauf' },
  { name: 'Zusätzliche Sprache', price: '+350€', note: 'Mehrsprachig' },
  { name: 'QR-Code Paket', price: '+120€', note: 'Print-Ready' },
  { name: 'Tischkarten-Design', price: '+290€', note: 'Passend zum Theme' },
  { name: 'Save-the-Date Digital', price: '+190€', note: 'Animierte Karte' },
  { name: 'Statischer Download', price: '49€', note: 'Nach Archivierung' },
];

function PricingSection() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="pricing">
      <Container>
        <Header $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>— Unsere Pakete —</Eyebrow>
          <Title $themeId={currentTheme}>Transparent & Fair</Title>
        </Header>
        
        <PricingGrid>
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} $themeId={currentTheme} $popular={tier.popular} $visible={isVisible} $delay={0.1 * i}>
              {tier.popular && <PopularBadge $themeId={currentTheme}>Bestseller</PopularBadge>}
              <PlanName $themeId={currentTheme}>{tier.name}</PlanName>
              <Price $themeId={currentTheme}>{tier.price}€{tier.pricePlus && <span>+</span>}</Price>
              <Features>
                {tier.features.map(f => (
                  <Feature key={f.text} $themeId={currentTheme} $highlight={f.highlight}>{f.text}</Feature>
                ))}
              </Features>
              <CTAButton href="#contact" $themeId={currentTheme} $primary={tier.popular}>
                {tier.popular ? 'Jetzt starten' : 'Anfragen'}
              </CTAButton>
            </PricingCard>
          ))}
        </PricingGrid>
        
        <AddOnsSection>
          <AddOnsTitle $themeId={currentTheme}>Optionale Add-ons</AddOnsTitle>
          <AddOnsGrid>
            {addOns.map(addon => (
              <AddOn key={addon.name} $themeId={currentTheme}>
                <AddOnName $themeId={currentTheme}>{addon.name}</AddOnName>
                <AddOnPrice $themeId={currentTheme}>{addon.price}</AddOnPrice>
                <AddOnNote $themeId={currentTheme}>{addon.note}</AddOnNote>
              </AddOn>
            ))}
          </AddOnsGrid>
        </AddOnsSection>
      </Container>
    </Section>
  );
}

export default PricingSection;
