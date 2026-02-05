// src/components/marketing/PromoBanner.js
// Promo-STÖRER - auffällig, schräg, überlappend
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { supabase } from '../../lib/supabase';

// ============================================
// ANIMATIONS
// ============================================
const bounce = keyframes`
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-5px) rotate(-2deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.4), 0 8px 32px rgba(0,0,0,0.3); }
  50% { box-shadow: 0 0 40px rgba(0,255,255,0.7), 0 8px 32px rgba(0,0,0,0.3); }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(-3deg) scale(1); }
  25% { transform: rotate(-1deg) scale(1.02); }
  75% { transform: rotate(-4deg) scale(1.02); }
`;

const pulse = keyframes`
  0%, 100% { transform: rotate(-2deg) scale(1); }
  50% { transform: rotate(-2deg) scale(1.03); }
`;

// ============================================
// THEME BACKGROUNDS (matching PricingSection)
// ============================================
const THEME_BACKGROUNDS = {
  editorial: '#FAFAFA',
  botanical: 'transparent',
  contemporary: '#FFE66D',
  luxe: '#0A0A0A',
  neon: '#0a0a0f',
  video: '#0A0A0A'
};

// ============================================
// BASE - STÖRER WRAPPER
// ============================================
const StoererWrapper = styled.div`
  position: relative;
  z-index: 50;
  display: flex;
  justify-content: center;
  padding: 2rem 1rem 5rem;
  pointer-events: none;
  background: ${p => THEME_BACKGROUNDS[p.$theme] || '#FAFAFA'};

  @media (max-width: 600px) {
    padding: 1.5rem 1rem 4rem;
  }
`;

const StoererBadge = styled.div`
  pointer-events: auto;
  cursor: default;
  position: relative;
  padding: 1rem 2.5rem;
  text-align: center;
  transform: rotate(-2deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(0deg) scale(1.05);
  }

  @media (max-width: 600px) {
    padding: 0.75rem 1.5rem;
  }
`;

// ============================================
// EDITORIAL - Roter Störer mit schwarzem Akzent
// ============================================
const EditorialStoerer = styled(StoererBadge)`
  background: #C41E3A;
  color: #fff;
  box-shadow: 8px 8px 0 #0A0A0A, 0 10px 40px rgba(0,0,0,0.2);
  animation: ${wiggle} 3s ease-in-out infinite;

  &::before {
    content: '★';
    position: absolute;
    top: -10px;
    left: -10px;
    font-size: 1.5rem;
    color: #0A0A0A;
  }

  &::after {
    content: '★';
    position: absolute;
    bottom: -10px;
    right: -10px;
    font-size: 1.5rem;
    color: #0A0A0A;
  }
`;

const EditorialTitle = styled.div`
  font-family: 'Oswald', sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const EditorialBadge = styled.span`
  display: inline-block;
  background: #0A0A0A;
  color: #fff;
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  margin-left: 0.5rem;
  vertical-align: middle;
`;

const EditorialText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  opacity: 0.9;
`;

// ============================================
// BOTANICAL - Eleganter Glass-Störer
// ============================================
const BotanicalStoerer = styled(StoererBadge)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: ${pulse} 4s ease-in-out infinite;
`;

const BotanicalTitle = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: 500;
`;

const BotanicalBadge = styled.span`
  display: inline-block;
  background: rgba(45, 90, 60, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  padding: 0.2rem 0.5rem;
  margin-left: 0.5rem;
  vertical-align: middle;
`;

const BotanicalText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: rgba(255, 255, 255, 0.7);
`;

// ============================================
// CONTEMPORARY - Brutalist Störer
// ============================================
const ContemporaryStoerer = styled(StoererBadge)`
  background: #FF6B6B;
  color: #fff;
  border: 4px solid #0D0D0D;
  box-shadow: 10px 10px 0 #0D0D0D;
  animation: ${bounce} 2s ease-in-out infinite;
  transform: rotate(-3deg);

  &:hover {
    transform: rotate(2deg) scale(1.1);
    box-shadow: 14px 14px 0 #0D0D0D;
  }
`;

const ContemporaryTitle = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 700;
  text-transform: uppercase;
`;

const ContemporaryBadge = styled.span`
  display: inline-block;
  background: #FFE66D;
  color: #0D0D0D;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border: 2px solid #0D0D0D;
  margin-left: 0.5rem;
  vertical-align: middle;
`;

const ContemporaryText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

// ============================================
// LUXE - Eleganter Gold-Störer
// ============================================
const LuxeStoerer = styled(StoererBadge)`
  background: linear-gradient(135deg, #C9A962 0%, #E8D5A3 50%, #C9A962 100%);
  color: #0A0A0A;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  animation: ${pulse} 4s ease-in-out infinite;
`;

const LuxeTitle = styled.div`
  font-family: 'Cormorant', serif;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: 500;
  font-style: italic;
`;

const LuxeBadge = styled.span`
  display: inline-block;
  background: #0A0A0A;
  color: #C9A962;
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  padding: 0.2rem 0.6rem;
  margin-left: 0.5rem;
  vertical-align: middle;
`;

const LuxeText = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-weight: 300;
`;

// ============================================
// NEON - Cyberpunk Glowing Störer
// ============================================
const NeonStoerer = styled(StoererBadge)`
  background: rgba(0, 0, 0, 0.8);
  color: #00ffff;
  border: 2px solid #00ffff;
  animation: ${glow} 2s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ff00ff, #00ffff, transparent);
  }
`;

const NeonTitle = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  font-weight: 700;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;

const NeonBadge = styled.span`
  display: inline-block;
  background: transparent;
  border: 1px solid #ff00ff;
  color: #ff00ff;
  font-family: 'Space Grotesk', monospace;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  margin-left: 0.5rem;
  vertical-align: middle;
  text-shadow: 0 0 8px rgba(255, 0, 255, 0.5);
`;

const NeonText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: rgba(255, 255, 255, 0.6);
`;

// ============================================
// VIDEO - Clean Störer
// ============================================
const VideoStoerer = styled(StoererBadge)`
  background: #6B8CAE;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: ${pulse} 4s ease-in-out infinite;
`;

const VideoTitle = styled.div`
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 700;
`;

const VideoBadge = styled.span`
  display: inline-block;
  background: #0A0A0A;
  color: #6B8CAE;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  margin-left: 0.5rem;
  vertical-align: middle;
  border-radius: 2px;
`;

const VideoText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  opacity: 0.9;
`;

// ============================================
// MAIN COMPONENT
// ============================================
const PromoBanner = () => {
  const { currentTheme } = useTheme();
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromo = async () => {
      if (!supabase) {
        setPromo({
          active: true,
          title: 'Frühbucher-Rabatt',
          text: 'Jetzt buchen & sparen!',
          badge: '-10%'
        });
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'promo_banner')
          .single();

        if (error) throw error;
        if (data?.value) {
          setPromo(data.value);
        }
      } catch (err) {
        console.log('Promo banner not configured');
        setPromo({
          active: true,
          title: 'Frühbucher-Rabatt',
          text: 'Jetzt buchen & sparen!',
          badge: '-10%'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPromo();
  }, []);

  if (loading || !promo?.active) return null;

  const renderContent = (Title, Text, Badge) => (
    <>
      <Title>
        {promo.title}
        {promo.badge && <Badge>{promo.badge}</Badge>}
      </Title>
      {promo.text && <Text>{promo.text}</Text>}
    </>
  );

  // EDITORIAL
  if (currentTheme === 'editorial') {
    return (
      <StoererWrapper $theme={currentTheme}>
        <EditorialStoerer>
          {renderContent(EditorialTitle, EditorialText, EditorialBadge)}
        </EditorialStoerer>
      </StoererWrapper>
    );
  }

  // BOTANICAL
  if (currentTheme === 'botanical') {
    return (
      <StoererWrapper $theme={currentTheme}>
        <BotanicalStoerer>
          {renderContent(BotanicalTitle, BotanicalText, BotanicalBadge)}
        </BotanicalStoerer>
      </StoererWrapper>
    );
  }

  // CONTEMPORARY
  if (currentTheme === 'contemporary') {
    return (
      <StoererWrapper $theme={currentTheme}>
        <ContemporaryStoerer>
          {renderContent(ContemporaryTitle, ContemporaryText, ContemporaryBadge)}
        </ContemporaryStoerer>
      </StoererWrapper>
    );
  }

  // LUXE
  if (currentTheme === 'luxe') {
    return (
      <StoererWrapper $theme={currentTheme}>
        <LuxeStoerer>
          {renderContent(LuxeTitle, LuxeText, LuxeBadge)}
        </LuxeStoerer>
      </StoererWrapper>
    );
  }

  // NEON
  if (currentTheme === 'neon') {
    return (
      <StoererWrapper $theme={currentTheme}>
        <NeonStoerer>
          {renderContent(NeonTitle, NeonText, NeonBadge)}
        </NeonStoerer>
      </StoererWrapper>
    );
  }

  // VIDEO (Default)
  return (
    <StoererWrapper $theme={currentTheme}>
      <VideoStoerer>
        {renderContent(VideoTitle, VideoText, VideoBadge)}
      </VideoStoerer>
    </StoererWrapper>
  );
};

export default PromoBanner;
