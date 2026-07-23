// src/components/marketing/MarketingNav.js
// Navigation + Mobile Burger Menu (Theme-Switcher entfernt Jul 2026 — Marketing fix im Classic Theme)
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';


// ============================================
// NAV STYLES
// ============================================
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem clamp(1.5rem, 5vw, 4rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s ease;

  /* Mobile: Immer Hintergrund für bessere Lesbarkeit */
  @media (max-width: 768px) {
    background: ${p => p.$theme === 'classic' ? 'transparent' : p.$theme === 'contemporary' || p.$theme === 'modern' ? 'rgba(253,252,250,0.97)' : 'rgba(10, 10, 10, 0.95)'};
    backdrop-filter: ${p => p.$theme === 'classic' ? 'none' : 'blur(10px)'};
    padding: 1rem 1.5rem;
  }

  ${p => p.$scrolled && p.$theme !== 'classic' && css`
    background: ${p.$theme === 'contemporary' || p.$theme === 'modern' ? 'rgba(253,252,250,0.97)' : 'rgba(10, 10, 10, 0.95)'};
    backdrop-filter: blur(10px);
    padding: 1rem clamp(1.5rem, 5vw, 4rem);
  `}
  
  ${p => p.$theme === 'botanical' && css`
    top: 1.5rem;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: auto;
    max-width: calc(100% - 3rem);
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    padding: 0.6rem 1.5rem;
    gap: 0.5rem;
    
    @media (max-width: 768px) {
      top: 0;
      left: 0;
      right: 0;
      transform: none;
      max-width: none;
      width: 100%;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(4, 10, 4, 0.95);
      padding: 1rem 1.5rem;
    }
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    padding: 10px clamp(1rem, 3vw, 5%);
    background: transparent;
  `}
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
  
  ${p => p.$scrolled && css`box-shadow: 6px 6px 0 #FF6B6B;`}
  
  @media (min-width: 600px) {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  @media (max-width: 768px) {
    height: 50px;
    padding: 0 15px;
  }
`;

// LOGO: S&I. - bold, white, Roboto, letter-spacing -0.06em
const Logo = styled.a`
  font-family: 'Roboto', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  text-decoration: none;
  color: #fff;
  background: #000;
  padding: 6px 12px;
  transition: all 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #0D0D0D;
    color: #fff;
  `}
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 5px 10px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.$theme === 'contemporary' || p.$theme === 'classic' || p.$theme === 'modern' ? '#1A1A1A' : 'rgba(255,255,255,0.7)'};
  text-decoration: none;
  transition: all 0.3s ease;
  ${p => p.$theme === 'classic' && `font-family: 'Josefin Sans', sans-serif; font-weight: 300;`}

  &:hover {
    color: ${p => p.$theme === 'classic' ? '#999999' : p.$theme === 'contemporary' ? '#FF6B6B' : '#fff'};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// Dauerhaft sichtbarer Anfrage-CTA (Desktop) — Mobile hat die Sticky-Bar
const NavCTA = styled.a`
  display: none;

  @media (min-width: 900px) {
    display: inline-block;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    background: #1A1A1A;
    color: #FDFCFA;
    padding: 0.65rem 1.3rem;
    border: 1px solid #1A1A1A;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: transparent;
      color: #1A1A1A;
    }
  }
`;

// ============================================
// THEME SWITCHER
// ============================================

const BurgerBtn = styled.button`
  background: transparent;
  border: none;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1300;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const BurgerLine = styled.span`
  display: block;
  width: 22px;
  height: 2px;
  background: ${p => p.$theme === 'contemporary' || p.$theme === 'classic' || p.$theme === 'modern' ? '#1A1A1A' : '#fff'};
  position: relative;
  transition: all 0.3s ease;

  ${p => p.$open && css`
    background: transparent;
  `}

  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 22px;
    height: 2px;
    background: ${p => p.$theme === 'contemporary' || p.$theme === 'classic' || p.$theme === 'modern' ? '#1A1A1A' : '#fff'};
    transition: all 0.3s ease;
  }
  
  &::before {
    top: -7px;
    ${p => p.$open && css`
      top: 0;
      transform: rotate(45deg);
    `}
  }
  
  &::after {
    top: 7px;
    ${p => p.$open && css`
      top: 0;
      transform: rotate(-45deg);
    `}
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1100;
  opacity: ${p => p.$open ? 1 : 0};
  visibility: ${p => p.$open ? 'visible' : 'hidden'};
  transition: all 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1200;
  padding: 100px 2rem 2rem;
  opacity: ${p => p.$open ? 1 : 0};
  visibility: ${p => p.$open ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;

  background-color: ${p => {
    switch(p.$theme) {
      case 'botanical': return '#040604';
      case 'contemporary': return '#FFFFFF';
      case 'classic': return '#FFFFFF';
      case 'modern': return '#FFFFFF';
      case 'luxe': return '#0A0A0A';
      case 'neon': return '#0a0a0f';
      case 'editorial': return '#0A0A0A';
      case 'video': return '#0A0A0A';
      default: return '#0A0A0A';
    }
  }};

  @media (min-width: 769px) {
    display: none !important;
  }
`;

const MobileCloseBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid ${p => p.$theme === 'contemporary' || p.$theme === 'classic' || p.$theme === 'modern' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'};
  border-radius: ${p => p.$theme === 'contemporary' ? '8px' : p.$theme === 'botanical' ? '50%' : '0'};
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  font-size: 1.25rem;
  line-height: 1;
  color: ${p => p.$theme === 'contemporary' || p.$theme === 'classic' || p.$theme === 'modern' ? '#0D0D0D' : p.$theme === 'neon' ? '#00ffff' : p.$theme === 'luxe' ? '#D4AF37' : 'rgba(255,255,255,0.8)'};
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  padding: 0;

  &:hover {
    border-color: ${p => {
      switch(p.$theme) {
        case 'contemporary': return '#FF6B6B';
        case 'neon': return '#FF006E';
        case 'luxe': return '#D4AF37';
        case 'editorial': return '#C41E3A';
        case 'classic': return '#999999';
        default: return 'rgba(255,255,255,0.4)';
      }
    }};
    color: ${p => {
      switch(p.$theme) {
        case 'contemporary': return '#FF6B6B';
        case 'neon': return '#FF006E';
        case 'luxe': return '#D4AF37';
        case 'editorial': return '#C41E3A';
        case 'classic': return '#999999';
        default: return '#fff';
      }
    }};
  }
`;

const MobileNavLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 1rem 0;
  border-bottom: 1px solid ${p => p.$theme === 'contemporary' || p.$theme === 'classic' || p.$theme === 'modern' ? '#E5E5E5' : 'rgba(255,255,255,0.1)'};
  transition: all 0.3s ease;

  color: ${p => p.$theme === 'contemporary' || p.$theme === 'classic' || p.$theme === 'modern' ? '#0D0D0D' : 'rgba(255,255,255,0.8)'};
  
  &:hover {
    color: ${p => {
      switch(p.$theme) {
        case 'contemporary': return '#FF6B6B';
        case 'neon': return '#00ffff';
        case 'luxe': return '#C9A962';
        default: return '#fff';
      }
    }};
  }
`;

// ============================================
const MarketingNav = () => {
  const { currentTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e, targetId, isRoute) => {
    e.preventDefault();
    setMenuOpen(false);
    
    // Modern theme: open modals instead of scrolling
    if (currentTheme === 'modern' && !isRoute) {
      const modalMap = { features: 'features', themes: 'designs', pricing: 'pricing', contact: 'contact' };
      const modalId = modalMap[targetId];
      if (modalId) {
        if (location.pathname === '/') {
          // Already on homepage — dispatch immediately
          window.dispatchEvent(new CustomEvent('modernOpenModal', { detail: { id: modalId } }));
        } else {
          // Navigate to homepage first, then open modal after ModernParallaxPage mounts
          navigate('/');
          const tryDispatch = (attempts = 0) => {
            if (attempts > 30) return; // give up after ~3s
            // Check if the ParallaxPage event listener is ready by looking for a title ref
            const titleEl = document.querySelector(`[data-title-id="${modalId}"]`);
            if (titleEl) {
              window.dispatchEvent(new CustomEvent('modernOpenModal', { detail: { id: modalId } }));
            } else {
              setTimeout(() => tryDispatch(attempts + 1), 100);
            }
          };
          setTimeout(tryDispatch, 200);
        }
        return;
      }
    }
    
    if (isRoute) {
      navigate(`/${targetId}`);
      window.scrollTo(0, 0);
      return;
    }
    
    // If we're on the homepage, just scroll
    if (location.pathname === '/') {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    // From subpage: navigate home, then scroll after page renders
    navigate('/');
    // Wait for homepage to mount, then scroll to section
    const scrollAfterNav = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Element not yet in DOM, retry
        requestAnimationFrame(scrollAfterNav);
      }
    };
    // Give React time to render the homepage
    setTimeout(scrollAfterNav, 150);
  };

  const navItems = [
    { id: 'features', label: 'Features' },
    { id: 'themes', label: 'Designs' },
    { id: 'pricing', label: 'Preise' },
    { id: 'blog', label: 'Ratgeber', isRoute: true },
    { id: 'contact', label: 'Kontakt' },
  ];


  const renderNavContent = () => (
    <>
      <Logo href="/" onClick={(e) => { e.preventDefault(); if (location.pathname !== '/') { navigate('/'); } else { handleLinkClick(e, 'hero'); } }} $theme={currentTheme}>
        S&I.
      </Logo>
      
      <NavLinks $theme={currentTheme}>
        {navItems.map(item => (
          <NavLink 
            key={item.id} 
            href={item.isRoute ? `/${item.id}` : `#${item.id}`} 
            onClick={(e) => handleLinkClick(e, item.id, item.isRoute)}
            $theme={currentTheme}
          >
            {item.label}
          </NavLink>
        ))}
      </NavLinks>
      
      <RightSection>
        <NavCTA href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>
          Unverbindlich anfragen
        </NavCTA>
        <BurgerBtn $theme={currentTheme} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menuOpen}>
          <BurgerLine $theme={currentTheme} $open={menuOpen} />
        </BurgerBtn>
      </RightSection>
    </>
  );

  const renderMobileMenu = () => (
    <>
      <MobileMenuOverlay $open={menuOpen} onClick={() => setMenuOpen(false)} />
      <MobileMenu $theme={currentTheme} $open={menuOpen}>
        <MobileCloseBtn $theme={currentTheme} onClick={() => setMenuOpen(false)}>✕</MobileCloseBtn>
        {navItems.map(item => (
          <MobileNavLink 
            key={item.id} 
            href={item.isRoute ? `/${item.id}` : `#${item.id}`} 
            onClick={(e) => handleLinkClick(e, item.id, item.isRoute)}
            $theme={currentTheme}
          >
            {item.label}
          </MobileNavLink>
        ))}
        
      </MobileMenu>
    </>
  );

  // Contemporary hat ein inneres Frame
  if (currentTheme === 'contemporary') {
    return (
      <>
        <Nav $theme={currentTheme} $scrolled={scrolled}>
          <ContemporaryInner $scrolled={scrolled}>
            {renderNavContent()}
          </ContemporaryInner>
        </Nav>
        {renderMobileMenu()}
      </>
    );
  }

  return (
    <>
      <Nav $theme={currentTheme} $scrolled={scrolled}>
        {renderNavContent()}
      </Nav>
      {renderMobileMenu()}
    </>
  );
};

export default MarketingNav;
