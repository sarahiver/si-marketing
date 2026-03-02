// src/components/marketing/ThemeOnboardingModal.js
// Variante A: Vorgelagerter Theme-Wähler beim ersten Besuch
// Zeigt alle Themes als scrollbare Karten mit Screenshot + Name
// User wählt ein Theme → Modal schließt → Seite lädt gewähltes Theme

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { useABTest } from '../../context/ABTestContext';

// ============================================
// THEME DATA (Screenshots + Demo URLs)
// ============================================
const THEMES = [
  {
    id: 'classic',
    name: 'Classic',
    tagline: 'Zeitlos & elegant',
    screenshot: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1771224839/Bildschirmfoto_16-2-2026_75342_www.siwedding.de_gbf6ps.jpg',
    accentColor: '#8B7355',
    bgColor: '#FFFFFF',
    textColor: '#1A1A1A',
  },
  {
    id: 'botanical',
    name: 'Botanical',
    tagline: 'Natürlich & romantisch',
    screenshot: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1770727740/botanical_demoShowcase_optimized_cd6i9j.jpg',
    accentColor: '#4A7C59',
    bgColor: '#040604',
    textColor: '#FFFFFF',
  },
  {
    id: 'editorial',
    name: 'Editorial',
    tagline: 'Bold & modern',
    screenshot: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1770290063/editorial_demoShowcase_gmxabx.jpg',
    accentColor: '#C41E3A',
    bgColor: '#0A0A0A',
    textColor: '#FAFAFA',
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    tagline: 'Frisch & verspielt',
    screenshot: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1770297629/coontemporary_demoShowcase_wiicti.jpg',
    accentColor: '#FF6B6B',
    bgColor: '#FFFFFF',
    textColor: '#0D0D0D',
  },
  {
    id: 'luxe',
    name: 'Luxe',
    tagline: 'Luxuriös & intim',
    screenshot: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1770727740/luxe_demoShowcase_optimized_u31jnq.jpg',
    accentColor: '#C9A962',
    bgColor: '#0A0A0A',
    textColor: '#F8F6F3',
  },
  {
    id: 'neon',
    name: 'Neon',
    tagline: 'Energetisch & unvergesslich',
    screenshot: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1770727741/neon_demoShowcase_optimized_ppdbp4.jpg',
    accentColor: '#00FFFF',
    bgColor: '#0a0a0f',
    textColor: '#FFFFFF',
  },
  {
    id: 'video',
    name: 'Video',
    tagline: 'Cineastisch & dramatisch',
    screenshot: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1770727740/video_demoShowcase_optimized_jrlsoh.jpg',
    accentColor: '#6B8CAE',
    bgColor: '#0A0A0A',
    textColor: '#FFFFFF',
  },
];

// ============================================
// ANIMATIONS
// ============================================
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideUp = keyframes`from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); }`;
const shimmer = keyframes`0% { background-position: -200% 0; } 100% { background-position: 200% 0; }`;

// ============================================
// STYLED COMPONENTS
// ============================================
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${fadeIn} 0.4s ease both;
  
  @media (max-width: 600px) {
    align-items: flex-end;
    padding: 0;
  }
`;

const Modal = styled.div`
  background: #111111;
  border: 1px solid rgba(255,255,255,0.1);
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.1s;
  overflow: hidden;
  
  @media (max-width: 600px) {
    max-height: 92vh;
    border-radius: 20px 20px 0 0;
    border-bottom: none;
  }
`;

const ModalHeader = styled.div`
  padding: 2rem 2rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem 1rem;
  }
`;

const ModalEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 0.5rem;
`;

const ModalTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.3;
`;

const ModalSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.45);
  margin-top: 0.4rem;
`;

const SkipButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.3);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  min-height: 44px;
  min-width: 44px;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.2s ease;
  
  &:hover { color: rgba(255,255,255,0.6); }
`;

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  padding: 1.5rem 2rem 2rem;
  overflow-y: auto;
  flex: 1;
  -webkit-overflow-scrolling: touch;
  
  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
    padding: 1rem 1rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
    padding: 1rem 0.75rem 2rem;
  }
`;

const ThemeCard = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #1A1A1A;
  border: 2px solid ${p => p.$selected ? p.$accent : 'transparent'};
  cursor: pointer;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: border-color 0.2s ease, transform 0.15s ease;
  text-align: left;
  
  &:hover {
    border-color: ${p => p.$accent};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${p => p.$selected && css`
    &::after {
      content: '✓';
      position: absolute;
      top: 0.4rem;
      right: 0.4rem;
      width: 22px;
      height: 22px;
      background: ${p.$accent};
      color: ${p.$textOnAccent || '#fff'};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.65rem;
      font-weight: 700;
      z-index: 2;
    }
  `}
`;

const CardImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 9/16;
  overflow: hidden;
  background: ${p => p.$bg || '#111'};
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.4s ease;
  
  ${ThemeCard}:hover & {
    transform: scale(1.03);
  }
`;

const ImageSkeleton = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 25%,
    rgba(255,255,255,0.08) 50%,
    rgba(255,255,255,0.03) 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const CardInfo = styled.div`
  padding: 0.6rem 0.75rem 0.75rem;
  background: #1A1A1A;
  border-top: 1px solid rgba(255,255,255,0.06);
`;

const CardName = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 0.15rem;
`;

const CardTagline = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.4);
  line-height: 1.3;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const AccentDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${p => p.$color};
  margin-right: 0.4rem;
  vertical-align: middle;
  margin-bottom: 1px;
`;

const ModalFooter = styled.div`
  padding: 1rem 2rem 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    padding: 0.75rem 1rem 1.25rem;
    flex-direction: column;
    align-items: stretch;
  }
`;

const FooterNote = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.3);
  line-height: 1.4;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const ConfirmButton = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #000;
  background: #FFFFFF;
  border: none;
  padding: 0.9rem 2rem;
  cursor: pointer;
  min-height: 44px;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: all 0.2s ease;
  white-space: nowrap;
  opacity: ${p => p.$disabled ? 0.4 : 1};
  pointer-events: ${p => p.$disabled ? 'none' : 'auto'};
  
  &:hover {
    background: #F0F0F0;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

// ============================================
// COMPONENT
// ============================================
const ThemeOnboardingModal = () => {
  const { setCurrentTheme } = useTheme();
  const { showModal, closeModal, trackModalThemeSelect } = useABTest();
  const [selected, setSelected] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const gridRef = useRef(null);

  // Prevent body scroll while modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  // Preload first 4 images immediately
  useEffect(() => {
    if (!showModal) return;
    THEMES.slice(0, 4).forEach(theme => {
      const img = new Image();
      img.src = theme.screenshot;
    });
  }, [showModal]);

  const handleSelect = (themeId) => {
    setSelected(themeId);
    trackModalThemeSelect(themeId);
  };

  const handleConfirm = () => {
    if (!selected) return;
    closeModal(selected);
    setCurrentTheme(selected);
  };

  const handleSkip = () => {
    closeModal('skipped');
    // Bleibt bei Classic (default)
  };

  const handleImageLoad = (themeId) => {
    setImagesLoaded(prev => ({ ...prev, [themeId]: true }));
  };

  if (!showModal) return null;

  return (
    <Backdrop onClick={(e) => e.target === e.currentTarget && handleSkip()}>
      <Modal role="dialog" aria-modal="true" aria-label="Design auswählen">
        <SkipButton onClick={handleSkip} aria-label="Überspringen">
          Überspringen
        </SkipButton>

        <ModalHeader>
          <ModalEyebrow>S&I. Wedding</ModalEyebrow>
          <ModalTitle>Welcher Stil passt zu eurer Hochzeit?</ModalTitle>
          <ModalSubtitle>Wähle ein Design — du kannst es jederzeit wechseln.</ModalSubtitle>
        </ModalHeader>

        <ThemeGrid ref={gridRef}>
          {THEMES.map((theme) => (
            <ThemeCard
              key={theme.id}
              $accent={theme.accentColor}
              $selected={selected === theme.id}
              $textOnAccent={theme.bgColor === '#FFFFFF' ? '#000' : '#fff'}
              onClick={() => handleSelect(theme.id)}
              aria-label={`${theme.name} wählen`}
              aria-pressed={selected === theme.id}
            >
              <CardImageWrapper $bg={theme.bgColor}>
                {!imagesLoaded[theme.id] && <ImageSkeleton />}
                <CardImage
                  src={theme.screenshot}
                  alt={`${theme.name} Theme Vorschau`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(theme.id)}
                />
              </CardImageWrapper>
              <CardInfo>
                <CardName>
                  <AccentDot $color={theme.accentColor} />
                  {theme.name}
                </CardName>
                <CardTagline>{theme.tagline}</CardTagline>
              </CardInfo>
            </ThemeCard>
          ))}
        </ThemeGrid>

        <ModalFooter>
          <FooterNote>
            Du kannst das Design jederzeit oben rechts wechseln.
          </FooterNote>
          <ConfirmButton
            onClick={handleConfirm}
            $disabled={!selected}
            aria-disabled={!selected}
          >
            {selected
              ? `${THEMES.find(t => t.id === selected)?.name} ansehen →`
              : 'Bitte wählen'}
          </ConfirmButton>
        </ModalFooter>
      </Modal>
    </Backdrop>
  );
};

export default ThemeOnboardingModal;
