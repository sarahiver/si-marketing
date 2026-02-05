// src/components/marketing/PromoBanner.js
// Editierbarer Promo-Störer oberhalb der Pricing Section
// Theme-spezifisches Styling
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { supabase } from '../../lib/supabase';

// ============================================
// ANIMATIONS
// ============================================
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0,255,255,0.3); }
  50% { box-shadow: 0 0 40px rgba(0,255,255,0.6); }
`;

const shake = keyframes`
  0%, 100% { transform: rotate(-1deg); }
  50% { transform: rotate(1deg); }
`;

// ============================================
// BASE STYLES
// ============================================
const BannerWrapper = styled.div`
  padding: 0 clamp(1.5rem, 5vw, 4rem);
  margin-bottom: -2rem;
  position: relative;
  z-index: 5;
`;

const BannerInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

// ============================================
// EDITORIAL THEME
// ============================================
const EditorialBanner = styled(BannerInner)`
  background: #C41E3A;
  color: #fff;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #0A0A0A;
  }
`;

const EditorialTitle = styled.div`
  font-family: 'Oswald', sans-serif;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const EditorialText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const EditorialBadge = styled.span`
  display: inline-block;
  background: #0A0A0A;
  color: #fff;
  font-family: 'Oswald', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.3rem 0.8rem;
  margin-left: 0.75rem;
  vertical-align: middle;
`;

// ============================================
// BOTANICAL THEME
// ============================================
const BotanicalBanner = styled(BannerInner)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.95);
`;

const BotanicalTitle = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

const BotanicalText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
`;

const BotanicalBadge = styled.span`
  display: inline-block;
  background: rgba(45, 90, 60, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.3rem 0.8rem;
  margin-left: 0.75rem;
  vertical-align: middle;
`;

// ============================================
// CONTEMPORARY THEME
// ============================================
const ContemporaryBanner = styled(BannerInner)`
  background: #FF6B6B;
  border: 3px solid #0D0D0D;
  box-shadow: 6px 6px 0 #0D0D0D;
  color: #fff;
  animation: ${shake} 3s ease-in-out infinite;

  &:hover {
    animation: none;
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0 #0D0D0D;
  }
`;

const ContemporaryTitle = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const ContemporaryText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
`;

const ContemporaryBadge = styled.span`
  display: inline-block;
  background: #FFE66D;
  color: #0D0D0D;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border: 2px solid #0D0D0D;
  margin-left: 0.75rem;
  vertical-align: middle;
`;

// ============================================
// LUXE THEME
// ============================================
const LuxeBanner = styled(BannerInner)`
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.15) 0%, rgba(201, 169, 98, 0.05) 100%);
  border: 1px solid rgba(201, 169, 98, 0.4);
  color: #F8F6F3;
`;

const LuxeTitle = styled.div`
  font-family: 'Cormorant', serif;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: 300;
  font-style: italic;
  margin-bottom: 0.5rem;
`;

const LuxeText = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: rgba(248, 246, 243, 0.7);
`;

const LuxeBadge = styled.span`
  display: inline-block;
  background: #C9A962;
  color: #0A0A0A;
  font-family: 'Outfit', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 0.3rem 0.8rem;
  margin-left: 0.75rem;
  vertical-align: middle;
`;

// ============================================
// NEON THEME
// ============================================
const NeonBanner = styled(BannerInner)`
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #00ffff;
  color: #fff;
  animation: ${glow} 2s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #00ffff, #ff00ff, #00ffff);
  }
`;

const NeonTitle = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #00ffff;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  margin-bottom: 0.5rem;
`;

const NeonText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
`;

const NeonBadge = styled.span`
  display: inline-block;
  background: transparent;
  border: 1px solid #ff00ff;
  color: #ff00ff;
  font-family: 'Space Grotesk', monospace;
  font-size: 0.7rem;
  padding: 0.3rem 0.8rem;
  margin-left: 0.75rem;
  vertical-align: middle;
  text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.3);
`;

// ============================================
// VIDEO THEME
// ============================================
const VideoBanner = styled(BannerInner)`
  background: linear-gradient(135deg, rgba(107, 140, 174, 0.2) 0%, rgba(107, 140, 174, 0.05) 100%);
  border: 1px solid rgba(107, 140, 174, 0.4);
  color: #fff;
`;

const VideoTitle = styled.div`
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const VideoText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
`;

const VideoBadge = styled.span`
  display: inline-block;
  background: #6B8CAE;
  color: #0A0A0A;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.8rem;
  margin-left: 0.75rem;
  vertical-align: middle;
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
        // Fallback wenn keine Supabase-Verbindung
        setPromo({
          active: true,
          title: 'Frühbucher-Rabatt',
          text: 'Bucht jetzt und spart 10% auf alle Pakete!',
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
        // Fallback
        setPromo({
          active: true,
          title: 'Frühbucher-Rabatt',
          text: 'Bucht jetzt und spart 10% auf alle Pakete!',
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
      <Text>{promo.text}</Text>
    </>
  );

  // EDITORIAL
  if (currentTheme === 'editorial') {
    return (
      <BannerWrapper>
        <EditorialBanner>
          {renderContent(EditorialTitle, EditorialText, EditorialBadge)}
        </EditorialBanner>
      </BannerWrapper>
    );
  }

  // BOTANICAL
  if (currentTheme === 'botanical') {
    return (
      <BannerWrapper>
        <BotanicalBanner>
          {renderContent(BotanicalTitle, BotanicalText, BotanicalBadge)}
        </BotanicalBanner>
      </BannerWrapper>
    );
  }

  // CONTEMPORARY
  if (currentTheme === 'contemporary') {
    return (
      <BannerWrapper>
        <ContemporaryBanner>
          {renderContent(ContemporaryTitle, ContemporaryText, ContemporaryBadge)}
        </ContemporaryBanner>
      </BannerWrapper>
    );
  }

  // LUXE
  if (currentTheme === 'luxe') {
    return (
      <BannerWrapper>
        <LuxeBanner>
          {renderContent(LuxeTitle, LuxeText, LuxeBadge)}
        </LuxeBanner>
      </BannerWrapper>
    );
  }

  // NEON
  if (currentTheme === 'neon') {
    return (
      <BannerWrapper>
        <NeonBanner>
          {renderContent(NeonTitle, NeonText, NeonBadge)}
        </NeonBanner>
      </BannerWrapper>
    );
  }

  // VIDEO (Default)
  return (
    <BannerWrapper>
      <VideoBanner>
        {renderContent(VideoTitle, VideoText, VideoBadge)}
      </VideoBanner>
    </BannerWrapper>
  );
};

export default PromoBanner;
