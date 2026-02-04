// src/components/marketing/PricingSection.js - Simplified Version
import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const PACKAGES = [
  { id: 'starter', name: 'Starter', price: '1.290', duration: '6 Monate', features: ['4 Basis-Komponenten', 'Responsives Design', '1 Revision'], cta: 'Jetzt starten' },
  { id: 'standard', name: 'Standard', price: '1.490', duration: '8 Monate', popular: true, features: ['7 Komponenten', 'Alle 6 Themes', '2 Revisionen', 'RSVP & Gästebuch'], cta: 'Beliebteste Wahl' },
  { id: 'premium', name: 'Premium', price: '1.990', duration: '12 Monate', features: ['10 Komponenten', 'Save the Date', 'Archiv inklusive', 'Unbegrenzte Revisionen'], cta: 'Premium wählen' },
];

const Section = styled.section`padding: clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem);`;
const Container = styled.div`max-width: 1200px; margin: 0 auto;`;
const Header = styled.div`text-align: center; margin-bottom: 4rem;`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;`;

// EDITORIAL
const EditorialSection = styled(Section)`background: #FAFAFA;`;
const EditorialEyebrow = styled.p`font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #C41E3A; margin-bottom: 1rem;`;
const EditorialTitle = styled.h2`font-family: 'Oswald', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #0A0A0A; margin-bottom: 1rem;`;
const EditorialCard = styled.div`background: #fff; border: 1px solid ${p => p.$pop ? '#C41E3A' : '#E5E5E5'}; padding: 2.5rem; position: relative; transition: all 0.3s; ${p => p.$pop && css`border-width: 2px; &::before { content: 'Empfohlen'; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #C41E3A; color: #fff; font-family: 'Oswald', sans-serif; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.4rem 1rem; }`} &:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }`;
const EditorialCardName = styled.h3`font-family: 'Oswald', sans-serif; font-size: 1.5rem; font-weight: 700; text-transform: uppercase; color: #0A0A0A; margin-bottom: 0.5rem;`;
const EditorialCardPrice = styled.div`font-family: 'Oswald', sans-serif; font-size: 3rem; font-weight: 700; color: ${p => p.$pop ? '#C41E3A' : '#0A0A0A'}; margin-bottom: 0.25rem; span { font-size: 1.5rem; }`;
const EditorialCardDuration = styled.p`font-family: 'Inter', sans-serif; font-size: 0.8rem; color: #999; margin-bottom: 2rem;`;
const EditorialCardFeature = styled.li`font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #666; padding: 0.6rem 0; border-bottom: 1px solid #F0F0F0; display: flex; align-items: center; gap: 0.75rem; &::before { content: '✓'; color: #C41E3A; font-weight: bold; }`;
const EditorialCardCTA = styled.a`display: block; width: 100%; padding: 1rem; font-family: 'Oswald', sans-serif; font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; text-align: center; cursor: pointer; transition: all 0.3s; ${p => p.$pop ? css`background: #C41E3A; color: #fff; &:hover { background: #a01830; }` : css`background: transparent; color: #0A0A0A; border: 2px solid #0A0A0A; &:hover { background: #0A0A0A; color: #fff; }`}`;

// BOTANICAL
const BotanicalSection = styled(Section)`background: #040604; position: relative; &::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(45, 90, 60, 0.1) 0%, transparent 50%); }`;
const BotanicalEyebrow = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255, 255, 255, 0.5); margin-bottom: 1rem;`;
const BotanicalTitle = styled.h2`font-family: 'Cormorant Garamond', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; color: rgba(255, 255, 255, 0.95); margin-bottom: 1rem;`;
const BotanicalCard = styled.div`position: relative; z-index: 1; background: rgba(255, 255, 255, ${p => p.$pop ? '0.1' : '0.06'}); backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, ${p => p.$pop ? '0.3' : '0.1'}); border-radius: 24px; padding: 2.5rem; transition: all 0.4s; &:hover { background: rgba(255, 255, 255, 0.1); }`;
const BotanicalCardName = styled.h3`font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: rgba(255, 255, 255, 0.95); margin-bottom: 0.5rem;`;
const BotanicalCardPrice = styled.div`font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 300; color: rgba(255, 255, 255, 0.95); margin-bottom: 0.25rem; span { font-size: 1.5rem; color: rgba(255,255,255,0.6); }`;
const BotanicalCardDuration = styled.p`font-family: 'Montserrat', sans-serif; font-size: 0.7rem; color: rgba(255, 255, 255, 0.4); margin-bottom: 2rem;`;
const BotanicalCardFeature = styled.li`font-family: 'Montserrat', sans-serif; font-size: 0.85rem; color: rgba(255, 255, 255, 0.7); padding: 0.6rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); display: flex; gap: 0.75rem; &::before { content: '✓'; color: rgba(255, 255, 255, 0.5); }`;
const BotanicalCardCTA = styled.a`display: block; width: 100%; padding: 1rem; font-family: 'Montserrat', sans-serif; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; text-align: center; border-radius: 50px; cursor: pointer; transition: all 0.4s; ${p => p.$pop ? css`background: rgba(255, 255, 255, 0.95); color: #040604; &:hover { transform: translateY(-2px); }` : css`background: rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.9); border: 1px solid rgba(255, 255, 255, 0.2); &:hover { background: rgba(255, 255, 255, 0.15); }`}`;

// CONTEMPORARY
const ContemporarySection = styled(Section)`background: #FAFAFA;`;
const ContemporaryEyebrow = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #FF6B6B; margin-bottom: 1rem;`;
const ContemporaryTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #0D0D0D; margin-bottom: 1rem;`;
const ContemporaryCard = styled.div`background: #fff; border: 3px solid #0D0D0D; padding: 2rem; position: relative; transition: all 0.3s; box-shadow: ${p => p.$pop ? '8px 8px 0 #FF6B6B' : '6px 6px 0 #0D0D0D'}; ${p => p.$pop && css`&::before { content: '🔥 POPULAR'; position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #FFE66D; color: #0D0D0D; font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 700; padding: 0.4rem 1rem; border: 2px solid #0D0D0D; }`} &:hover { transform: translate(-4px, -4px); box-shadow: ${p => p.$pop ? '12px 12px 0 #FF6B6B' : '10px 10px 0 #0D0D0D'}; }`;
const ContemporaryCardName = styled.h3`font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; text-transform: uppercase; color: #0D0D0D; margin-bottom: 0.5rem;`;
const ContemporaryCardPrice = styled.div`font-family: 'Space Grotesk', sans-serif; font-size: 3rem; font-weight: 700; color: ${p => p.$pop ? '#FF6B6B' : '#0D0D0D'}; margin-bottom: 0.25rem; span { font-size: 1.5rem; }`;
const ContemporaryCardDuration = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; color: #A3A3A3; margin-bottom: 2rem;`;
const ContemporaryCardFeature = styled.li`font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem; color: #525252; padding: 0.6rem 0; border-bottom: 2px dashed #E5E5E5; display: flex; gap: 0.75rem; &::before { content: '→'; color: #4ECDC4; font-weight: bold; }`;
const ContemporaryCardCTA = styled.a`display: block; width: 100%; padding: 1rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; text-align: center; cursor: pointer; transition: all 0.3s; border: 3px solid #0D0D0D; ${p => p.$pop ? css`background: #FF6B6B; color: #fff; box-shadow: 4px 4px 0 #0D0D0D; &:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #0D0D0D; }` : css`background: transparent; color: #0D0D0D; &:hover { background: #4ECDC4; }`}`;

// LUXE
const LuxeSection = styled(Section)`background: #0A0A0A;`;
const LuxeEyebrow = styled.p`font-family: 'Outfit', sans-serif; font-size: 0.7rem; letter-spacing: 0.4em; text-transform: uppercase; color: #C9A962; margin-bottom: 1rem;`;
const LuxeTitle = styled.h2`font-family: 'Cormorant', serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 300; font-style: italic; color: #F8F6F3; margin-bottom: 1rem;`;
const LuxeCard = styled.div`background: ${p => p.$pop ? 'rgba(201, 169, 98, 0.05)' : 'transparent'}; border: 1px solid ${p => p.$pop ? '#C9A962' : 'rgba(248, 246, 243, 0.15)'}; padding: 2.5rem; position: relative; transition: all 0.5s; ${p => p.$pop && css`&::before { content: 'Empfohlen'; position: absolute; top: -1px; left: 50%; transform: translateX(-50%); background: #C9A962; color: #0A0A0A; font-family: 'Outfit', sans-serif; font-size: 0.6rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.5rem 1.5rem; }`}`;
const LuxeCardName = styled.h3`font-family: 'Cormorant', serif; font-size: 1.8rem; font-weight: 300; font-style: italic; color: #F8F6F3; margin-bottom: 0.5rem;`;
const LuxeCardPrice = styled.div`font-family: 'Cormorant', serif; font-size: 3rem; font-weight: 300; color: ${p => p.$pop ? '#C9A962' : '#F8F6F3'}; margin-bottom: 0.25rem; span { font-size: 1.5rem; color: #E8E6E1; opacity: 0.5; }`;
const LuxeCardDuration = styled.p`font-family: 'Outfit', sans-serif; font-size: 0.7rem; letter-spacing: 0.15em; color: rgba(248, 246, 243, 0.4); margin-bottom: 2rem;`;
const LuxeCardFeature = styled.li`font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: rgba(248, 246, 243, 0.7); padding: 0.6rem 0; border-bottom: 1px solid rgba(248, 246, 243, 0.08); display: flex; gap: 0.75rem; &::before { content: '—'; color: #C9A962; }`;
const LuxeCardCTA = styled.a`display: block; width: 100%; padding: 1rem; font-family: 'Outfit', sans-serif; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; text-align: center; cursor: pointer; transition: all 0.5s; ${p => p.$pop ? css`background: #C9A962; color: #0A0A0A; &:hover { background: #d4b66f; }` : css`background: transparent; color: #F8F6F3; border: 1px solid rgba(248, 246, 243, 0.3); &:hover { border-color: #C9A962; color: #C9A962; }`}`;

// NEON
const NeonSection = styled(Section)`background: #0a0a0f; position: relative; &::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 20% 20%, rgba(0, 255, 255, 0.05) 0%, transparent 50%); }`;
const NeonEyebrow = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; letter-spacing: 0.3em; text-transform: uppercase; color: #00ffff; text-shadow: 0 0 10px rgba(0, 255, 255, 0.5); margin-bottom: 1rem;`;
const NeonTitle = styled.h2`font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 1rem;`;
const NeonCard = styled.div`position: relative; z-index: 1; background: rgba(255, 255, 255, 0.02); border: 1px solid ${p => p.$pop ? '#00ffff' : 'rgba(0, 255, 255, 0.2)'}; padding: 2.5rem; transition: all 0.3s; ${p => p.$pop && css`box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);`} &:hover { border-color: #00ffff; box-shadow: 0 0 20px rgba(0, 255, 255, 0.2); }`;
const NeonCardName = styled.h3`font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; text-transform: uppercase; color: #fff; margin-bottom: 0.5rem;`;
const NeonCardPrice = styled.div`font-family: 'Space Grotesk', sans-serif; font-size: 3rem; font-weight: 700; color: ${p => p.$pop ? '#00ffff' : '#fff'}; text-shadow: ${p => p.$pop ? '0 0 20px rgba(0, 255, 255, 0.5)' : 'none'}; margin-bottom: 0.25rem; span { font-size: 1.5rem; color: rgba(255,255,255,0.4); }`;
const NeonCardDuration = styled.p`font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem; color: rgba(255, 255, 255, 0.4); margin-bottom: 2rem;`;
const NeonCardFeature = styled.li`font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem; color: rgba(255, 255, 255, 0.7); padding: 0.6rem 0; border-bottom: 1px solid rgba(0, 255, 255, 0.1); display: flex; gap: 0.75rem; &::before { content: '>'; color: #00ff88; }`;
const NeonCardCTA = styled.a`display: block; width: 100%; padding: 1rem; font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; text-align: center; cursor: pointer; transition: all 0.3s; ${p => p.$pop ? css`background: transparent; color: #00ffff; border: 1px solid #00ffff; box-shadow: 0 0 15px rgba(0, 255, 255, 0.3); &:hover { background: rgba(0, 255, 255, 0.1); box-shadow: 0 0 25px rgba(0, 255, 255, 0.5); }` : css`background: transparent; color: rgba(255, 255, 255, 0.7); border: 1px solid rgba(255, 255, 255, 0.2); &:hover { border-color: #ff00ff; color: #ff00ff; }`}`;

// VIDEO
const VideoSection = styled(Section)`background: #0A0A0A;`;
const VideoEyebrow = styled.p`font-family: 'Inter', sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6B8CAE; margin-bottom: 1rem;`;
const VideoTitle = styled.h2`font-family: 'Manrope', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight: 700; color: #fff; margin-bottom: 1rem;`;
const VideoCard = styled.div`background: ${p => p.$pop ? 'rgba(107, 140, 174, 0.05)' : 'transparent'}; border: 1px solid ${p => p.$pop ? '#6B8CAE' : 'rgba(255, 255, 255, 0.1)'}; padding: 2.5rem; position: relative; transition: all 0.4s; ${p => p.$pop && css`&::before { content: 'Empfohlen'; position: absolute; top: -1px; left: 50%; transform: translateX(-50%); background: #6B8CAE; color: #0A0A0A; font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.4rem 1rem; }`} &:hover { border-color: #6B8CAE; }`;
const VideoCardName = styled.h3`font-family: 'Manrope', sans-serif; font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;`;
const VideoCardPrice = styled.div`font-family: 'Manrope', sans-serif; font-size: 3rem; font-weight: 700; color: ${p => p.$pop ? '#6B8CAE' : '#fff'}; margin-bottom: 0.25rem; span { font-size: 1.5rem; color: #B0B0B0; }`;
const VideoCardDuration = styled.p`font-family: 'Inter', sans-serif; font-size: 0.8rem; color: rgba(255, 255, 255, 0.4); margin-bottom: 2rem;`;
const VideoCardFeature = styled.li`font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #B0B0B0; padding: 0.6rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); display: flex; gap: 0.75rem; &::before { content: '✓'; color: #6B8CAE; }`;
const VideoCardCTA = styled.a`display: block; width: 100%; padding: 1rem; font-family: 'Manrope', sans-serif; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; text-align: center; cursor: pointer; transition: all 0.3s; ${p => p.$pop ? css`background: #6B8CAE; color: #0A0A0A; &:hover { background: #7d9cba; }` : css`background: transparent; color: #fff; border: 1px solid rgba(255, 255, 255, 0.3); &:hover { border-color: #6B8CAE; color: #6B8CAE; }`}`;

const PricingSection = () => {
  const { currentTheme } = useTheme();
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  const renderCards = (Card, Name, Price, Duration, Feature, CTA) => (
    <Grid>
      {PACKAGES.map(pkg => (
        <Card key={pkg.id} $pop={pkg.popular}>
          <Name>{pkg.name}</Name>
          <Price $pop={pkg.popular}><span>€</span>{pkg.price}</Price>
          <Duration>{pkg.duration}</Duration>
          <ul style={{ marginBottom: '2rem' }}>{pkg.features.map((f, i) => <Feature key={i}>{f}</Feature>)}</ul>
          <CTA $pop={pkg.popular} onClick={scrollToContact}>{pkg.cta}</CTA>
        </Card>
      ))}
    </Grid>
  );

  if (currentTheme === 'editorial') return (
    <EditorialSection id="pricing"><Container><Header><EditorialEyebrow>Unsere Pakete</EditorialEyebrow><EditorialTitle>Preise</EditorialTitle></Header>{renderCards(EditorialCard, EditorialCardName, EditorialCardPrice, EditorialCardDuration, EditorialCardFeature, EditorialCardCTA)}</Container></EditorialSection>
  );

  if (currentTheme === 'botanical') return (
    <BotanicalSection id="pricing"><Container style={{ position: 'relative', zIndex: 1 }}><Header><BotanicalEyebrow>Unsere Pakete</BotanicalEyebrow><BotanicalTitle>Preise</BotanicalTitle></Header>{renderCards(BotanicalCard, BotanicalCardName, BotanicalCardPrice, BotanicalCardDuration, BotanicalCardFeature, BotanicalCardCTA)}</Container></BotanicalSection>
  );

  if (currentTheme === 'contemporary') return (
    <ContemporarySection id="pricing"><Container><Header><ContemporaryEyebrow>💰 Pricing</ContemporaryEyebrow><ContemporaryTitle>Was kostet's?</ContemporaryTitle></Header>{renderCards(ContemporaryCard, ContemporaryCardName, ContemporaryCardPrice, ContemporaryCardDuration, ContemporaryCardFeature, ContemporaryCardCTA)}</Container></ContemporarySection>
  );

  if (currentTheme === 'luxe') return (
    <LuxeSection id="pricing"><Container><Header><LuxeEyebrow>Investition</LuxeEyebrow><LuxeTitle>Unsere Pakete</LuxeTitle></Header>{renderCards(LuxeCard, LuxeCardName, LuxeCardPrice, LuxeCardDuration, LuxeCardFeature, LuxeCardCTA)}</Container></LuxeSection>
  );

  if (currentTheme === 'neon') return (
    <NeonSection id="pricing"><Container style={{ position: 'relative', zIndex: 1 }}><Header><NeonEyebrow>// Pricing.config</NeonEyebrow><NeonTitle>Select Package</NeonTitle></Header>{renderCards(NeonCard, NeonCardName, NeonCardPrice, NeonCardDuration, NeonCardFeature, NeonCardCTA)}</Container></NeonSection>
  );

  return (
    <VideoSection id="pricing"><Container><Header><VideoEyebrow>Unsere Pakete</VideoEyebrow><VideoTitle>Preise</VideoTitle></Header>{renderCards(VideoCard, VideoCardName, VideoCardPrice, VideoCardDuration, VideoCardFeature, VideoCardCTA)}</Container></VideoSection>
  );
};

export default PricingSection;
