// src/components/marketing/MarketingNav.js
// 1:1 Theme-Designs aus si-wedding-themes
import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const THEMES = ['editorial', 'botanical', 'contemporary', 'luxe', 'neon', 'video'];

// ============================================
// ANIMATIONS
// ============================================
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatNav = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

// ============================================
// SHARED STYLES
// ============================================
const BaseNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.4s ease;
`;

// ============================================
// EDITORIAL NAV - Burger Menu Only
// ============================================
const EditorialNav = styled(BaseNav)`
  padding: 1.5rem clamp(1.5rem, 5vw, 4rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  ${p => p.$scrolled && css`
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem clamp(1.5rem, 5vw, 4rem);
  `}
`;

const EditorialLogo = styled.a`
  font-family: 'Oswald', sans-serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FAFAFA;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease forwards 0.3s;
  
  &:hover { color: #C41E3A; }
`;

const EditorialMenuBtn = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
  opacity: 0;
  animation: ${fadeIn} 0.6s ease forwards 0.5s;
  
  &:hover span { background: #C41E3A; }
`;

const EditorialMenuLine = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: #FAFAFA;
  transition: all 0.3s ease;
  
  &:nth-child(1) { top: 12px; ${p => p.$open && css`top: 19px; transform: translateX(-50%) rotate(45deg);`} }
  &:nth-child(2) { top: 19px; ${p => p.$open && css`opacity: 0;`} }
  &:nth-child(3) { top: 26px; ${p => p.$open && css`top: 19px; transform: translateX(-50%) rotate(-45deg);`} }
`;

const EditorialMenuLabel = styled.span`
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FAFAFA;
  ${p => p.$open && css`opacity: 0;`}
  @media (max-width: 768px) { display: none; }
`;

const EditorialOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  ${p => p.$open && css`opacity: 1; visibility: visible;`}
`;

const EditorialPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: min(400px, 85vw);
  height: 100vh;
  background: #0A0A0A;
  z-index: 1000;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  ${p => p.$open && css`transform: translateX(0);`}
`;

const EditorialPanelContent = styled.div`
  padding: 6rem 2.5rem 3rem;
`;

const EditorialMenuLink = styled.a`
  display: block;
  font-family: 'Oswald', sans-serif;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #FAFAFA;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  
  &:hover { color: #C41E3A; padding-left: 1rem; }
`;

// ============================================
// BOTANICAL NAV - Floating Pill Glassmorphism
// ============================================
const BotanicalPill = styled(BaseNav)`
  top: 1.5rem;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  width: auto;
  
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  animation: ${fadeInDown} 0.8s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const BotanicalLink = styled.a`
  padding: 0.6rem 1rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 30px;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    color: rgba(255, 255, 255, 1);
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) { display: none; }
`;

const BotanicalCTA = styled.a`
  padding: 0.6rem 1.25rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #040604;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 30px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #fff;
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) { display: none; }
`;

const BotanicalMenuBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { background: rgba(255, 255, 255, 0.1); }
`;

const BotanicalMenuIcon = styled.div`
  width: 18px;
  height: 14px;
  position: relative;
  
  span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 1px;
    transition: all 0.3s ease;
    
    &:nth-child(1) { top: 0; ${p => p.$open && css`top: 6px; transform: rotate(45deg);`} }
    &:nth-child(2) { top: 6px; ${p => p.$open && css`opacity: 0;`} }
    &:nth-child(3) { top: 12px; ${p => p.$open && css`top: 6px; transform: rotate(-45deg);`} }
  }
`;

const BotanicalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(4, 6, 4, 0.95);
  backdrop-filter: blur(30px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  ${p => p.$open && css`opacity: 1; visibility: visible;`}
`;

const BotanicalMenuCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 32px;
  padding: 2.5rem;
  min-width: 280px;
`;

const BotanicalMenuLink = styled.a`
  display: block;
  padding: 1rem 1.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }
`;

// ============================================
// CONTEMPORARY NAV - Neobrutalism Frame
// ============================================
const ContemporaryNav = styled(BaseNav)`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  
  @media (min-width: 600px) {
    padding: 10px 5%;
  }
`;

const ContemporaryInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background: #FFFFFF;
  border: 3px solid #0D0D0D;
  padding: 0 20px;
  transition: all 0.3s ease;
  
  ${p => p.$scrolled && css`
    box-shadow: 6px 6px 0 #FF6B6B;
  `}
  
  @media (min-width: 600px) {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const ContemporaryLogo = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #0D0D0D;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  
  &:hover { color: #FF6B6B; }
`;

const ContemporaryLinks = styled.div`
  display: none;
  gap: 0.5rem;
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

const ContemporaryLink = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #0D0D0D;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  transition: all 0.2s ease;
  
  &:hover {
    color: #FF6B6B;
  }
`;

const ContemporaryCTA = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #FAFAFA;
  background: #FF6B6B;
  border: 2px solid #0D0D0D;
  padding: 0.6rem 1.2rem;
  text-transform: uppercase;
  box-shadow: 3px 3px 0 #0D0D0D;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 #0D0D0D;
  }
  
  @media (max-width: 500px) { display: none; }
`;

const ContemporaryMenuBtn = styled.button`
  width: 40px;
  height: 40px;
  background: #FFE66D;
  border: 2px solid #0D0D0D;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 0 #0D0D0D;
  
  @media (min-width: 768px) { display: none; }
  
  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0 #0D0D0D;
  }
`;

// ============================================
// LUXE NAV - Minimal Cinematic
// ============================================
const LuxeNav = styled(BaseNav)`
  padding: 2rem clamp(1.5rem, 5vw, 4rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  ${p => p.$scrolled && css`
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
    padding: 1.25rem clamp(1.5rem, 5vw, 4rem);
  `}
`;

const LuxeLogo = styled.a`
  font-family: 'Cormorant', serif;
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-weight: 300;
  font-style: italic;
  letter-spacing: 0.05em;
  color: #F8F6F3;
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards 0.5s;
  
  &:hover { color: #C9A962; }
`;

const LuxeLinks = styled.div`
  display: none;
  gap: 2.5rem;
  
  @media (min-width: 768px) { display: flex; }
`;

const LuxeLink = styled.a`
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #E8E6E1;
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards;
  animation-delay: ${p => 0.7 + p.$i * 0.1}s;
  transition: color 0.3s ease;
  
  &:hover { color: #C9A962; }
`;

const LuxeMenuBtn = styled.button`
  width: 50px;
  height: 50px;
  background: transparent;
  border: 1px solid rgba(248, 246, 243, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: ${fadeIn} 1s ease forwards 1s;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #C9A962;
  }
  
  @media (min-width: 768px) { display: none; }
`;

const LuxeMenuIcon = styled.div`
  width: 20px;
  height: 12px;
  position: relative;
  
  span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background: #F8F6F3;
    transition: all 0.3s ease;
    
    &:nth-child(1) { top: 0; }
    &:nth-child(2) { top: 5.5px; }
    &:nth-child(3) { bottom: 0; }
  }
`;

// ============================================
// NEON NAV - Cyberpunk Glow
// ============================================
const NeonNav = styled(BaseNav)`
  padding: 1.5rem clamp(1.5rem, 5vw, 4rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  ${p => p.$scrolled && css`
    background: rgba(10, 10, 15, 0.95);
    border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  `}
`;

const NeonLogo = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #00ffff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  
  &:hover {
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
  }
`;

const NeonLinks = styled.div`
  display: none;
  gap: 2rem;
  
  @media (min-width: 768px) { display: flex; }
`;

const NeonLink = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  
  &:hover {
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
`;

const NeonCTA = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: #00ff88;
  border: 1px solid rgba(0, 255, 136, 0.3);
  padding: 0.6rem 1.2rem;
  text-transform: uppercase;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 136, 0.1);
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
  }
  
  @media (max-width: 500px) { display: none; }
`;

const NeonMenuBtn = styled.button`
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1px solid rgba(0, 255, 255, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
  
  @media (min-width: 768px) { display: none; }
`;

// ============================================
// VIDEO NAV - Cinematic Minimal with Dusty Blue
// ============================================
const VideoNav = styled(BaseNav)`
  padding: 1.5rem clamp(1.5rem, 5vw, 4rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  ${p => p.$scrolled && css`
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
  `}
`;

const VideoLogo = styled.a`
  font-family: 'Manrope', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -0.02em;
  
  &:hover { color: #6B8CAE; }
`;

const VideoLinks = styled.div`
  display: none;
  gap: 2rem;
  
  @media (min-width: 768px) { display: flex; }
`;

const VideoLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #B0B0B0;
  transition: color 0.3s ease;
  
  &:hover { color: #6B8CAE; }
`;

const VideoCTA = styled.a`
  font-family: 'Manrope', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: #FFFFFF;
  border: 1px solid #6B8CAE;
  padding: 0.6rem 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  
  &:hover {
    background: #6B8CAE;
  }
  
  @media (max-width: 500px) { display: none; }
`;

const VideoMenuBtn = styled.button`
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (min-width: 768px) { display: none; }
  
  &:hover { border-color: #6B8CAE; }
`;

// ============================================
// THEME SWITCHER (Shared)
// ============================================
const ThemeSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid ${p => {
    if (p.$theme === 'editorial') return 'rgba(255,255,255,0.2)';
    if (p.$theme === 'botanical') return 'rgba(255,255,255,0.15)';
    if (p.$theme === 'contemporary') return '#0D0D0D';
    if (p.$theme === 'luxe') return 'rgba(248,246,243,0.2)';
    if (p.$theme === 'neon') return 'rgba(0,255,255,0.2)';
    return 'rgba(255,255,255,0.2)';
  }};
  
  @media (max-width: 600px) {
    display: none;
  }
`;

const ThemeDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid ${p => p.$active ? '#fff' : 'transparent'};
  background: ${p => {
    if (p.$t === 'editorial') return '#C41E3A';
    if (p.$t === 'botanical') return '#2D5A3C';
    if (p.$t === 'contemporary') return '#FF6B6B';
    if (p.$t === 'luxe') return '#C9A962';
    if (p.$t === 'neon') return '#00ffff';
    if (p.$t === 'video') return '#6B8CAE';
    return '#888';
  }};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

// ============================================
// MAIN COMPONENT
// ============================================
const MarketingNav = () => {
  const { currentTheme, setCurrentTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'features', label: 'Features' },
    { id: 'themes', label: 'Designs' },
    { id: 'pricing', label: 'Preise' },
    { id: 'about', label: 'Über uns' },
    { id: 'contact', label: 'Kontakt' },
  ];

  const renderThemeSwitcher = () => (
    <ThemeSwitcher $theme={currentTheme}>
      {THEMES.map(t => (
        <ThemeDot 
          key={t} 
          $t={t} 
          $active={currentTheme === t}
          onClick={() => setCurrentTheme(t)}
          title={t.charAt(0).toUpperCase() + t.slice(1)}
        />
      ))}
    </ThemeSwitcher>
  );

  // EDITORIAL
  if (currentTheme === 'editorial') {
    return (
      <>
        <EditorialNav $scrolled={scrolled}>
          <EditorialLogo href="#" onClick={(e) => handleLinkClick(e, 'hero')}>S&I.</EditorialLogo>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {renderThemeSwitcher()}
            <EditorialMenuBtn onClick={() => setMenuOpen(!menuOpen)}>
              <EditorialMenuLabel $open={menuOpen}>Menü</EditorialMenuLabel>
              <EditorialMenuLine $open={menuOpen} />
              <EditorialMenuLine $open={menuOpen} />
              <EditorialMenuLine $open={menuOpen} />
            </EditorialMenuBtn>
          </div>
        </EditorialNav>
        <EditorialOverlay $open={menuOpen} onClick={() => setMenuOpen(false)} />
        <EditorialPanel $open={menuOpen}>
          <EditorialPanelContent>
            {navItems.map(item => (
              <EditorialMenuLink key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
                {item.label}
              </EditorialMenuLink>
            ))}
          </EditorialPanelContent>
        </EditorialPanel>
      </>
    );
  }

  // BOTANICAL
  if (currentTheme === 'botanical') {
    return (
      <>
        <BotanicalPill>
          {navItems.slice(0, 3).map(item => (
            <BotanicalLink key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
              {item.label}
            </BotanicalLink>
          ))}
          <BotanicalCTA href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Kontakt</BotanicalCTA>
          {renderThemeSwitcher()}
          <BotanicalMenuBtn onClick={() => setMenuOpen(!menuOpen)}>
            <BotanicalMenuIcon $open={menuOpen}>
              <span /><span /><span />
            </BotanicalMenuIcon>
          </BotanicalMenuBtn>
        </BotanicalPill>
        <BotanicalOverlay $open={menuOpen} onClick={() => setMenuOpen(false)}>
          <BotanicalMenuCard onClick={e => e.stopPropagation()}>
            {navItems.map(item => (
              <BotanicalMenuLink key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
                {item.label}
              </BotanicalMenuLink>
            ))}
          </BotanicalMenuCard>
        </BotanicalOverlay>
      </>
    );
  }

  // CONTEMPORARY
  if (currentTheme === 'contemporary') {
    return (
      <ContemporaryNav>
        <ContemporaryInner $scrolled={scrolled}>
          <ContemporaryLogo href="#" onClick={(e) => handleLinkClick(e, 'hero')}>S&I.</ContemporaryLogo>
          <ContemporaryLinks>
            {navItems.map(item => (
              <ContemporaryLink key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
                {item.label}
              </ContemporaryLink>
            ))}
          </ContemporaryLinks>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ContemporaryCTA href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Anfragen</ContemporaryCTA>
            {renderThemeSwitcher()}
            <ContemporaryMenuBtn onClick={() => setMenuOpen(!menuOpen)}>☰</ContemporaryMenuBtn>
          </div>
        </ContemporaryInner>
      </ContemporaryNav>
    );
  }

  // LUXE
  if (currentTheme === 'luxe') {
    return (
      <LuxeNav $scrolled={scrolled}>
        <LuxeLogo href="#" onClick={(e) => handleLinkClick(e, 'hero')}>S&I.</LuxeLogo>
        <LuxeLinks>
          {navItems.map((item, i) => (
            <LuxeLink key={item.id} $i={i} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
              {item.label}
            </LuxeLink>
          ))}
        </LuxeLinks>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {renderThemeSwitcher()}
          <LuxeMenuBtn onClick={() => setMenuOpen(!menuOpen)}>
            <LuxeMenuIcon><span /><span /><span /></LuxeMenuIcon>
          </LuxeMenuBtn>
        </div>
      </LuxeNav>
    );
  }

  // NEON
  if (currentTheme === 'neon') {
    return (
      <NeonNav $scrolled={scrolled}>
        <NeonLogo href="#" onClick={(e) => handleLinkClick(e, 'hero')}>S&I_</NeonLogo>
        <NeonLinks>
          {navItems.map(item => (
            <NeonLink key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
              {item.label}
            </NeonLink>
          ))}
        </NeonLinks>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <NeonCTA href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Start.exe</NeonCTA>
          {renderThemeSwitcher()}
          <NeonMenuBtn onClick={() => setMenuOpen(!menuOpen)}>☰</NeonMenuBtn>
        </div>
      </NeonNav>
    );
  }

  // VIDEO (Default)
  return (
    <VideoNav $scrolled={scrolled}>
      <VideoLogo href="#" onClick={(e) => handleLinkClick(e, 'hero')}>S&I.</VideoLogo>
      <VideoLinks>
        {navItems.map(item => (
          <VideoLink key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
            {item.label}
          </VideoLink>
        ))}
      </VideoLinks>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <VideoCTA href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Anfragen</VideoCTA>
        {renderThemeSwitcher()}
        <VideoMenuBtn onClick={() => setMenuOpen(!menuOpen)}>☰</VideoMenuBtn>
      </div>
    </VideoNav>
  );
};

export default MarketingNav;
