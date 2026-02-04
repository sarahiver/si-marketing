// src/components/marketing/MarketingNav.js
// Mit Theme Switcher Dropdown (MENÜ + farbige Dots)
import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const THEMES = [
  { id: 'editorial', name: 'Editorial', color: '#C41E3A' },
  { id: 'botanical', name: 'Botanical', color: '#2D5A3C' },
  { id: 'contemporary', name: 'Contemporary', color: '#FF6B6B' },
  { id: 'luxe', name: 'Luxe', color: '#C9A962' },
  { id: 'neon', name: 'Neon', color: '#00ffff' },
  { id: 'video', name: 'Video', color: '#6B8CAE' },
];

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

// ============================================
// THEME CONFIG
// ============================================
const THEME_STYLES = {
  editorial: { bg: '#0A0A0A', text: '#FAFAFA', accent: '#C41E3A', font: "'Oswald', sans-serif" },
  botanical: { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.9)', accent: '#fff', font: "'Montserrat', sans-serif" },
  contemporary: { bg: '#FFFFFF', text: '#0D0D0D', accent: '#FF6B6B', font: "'Space Grotesk', sans-serif" },
  luxe: { bg: 'transparent', text: '#F8F6F3', accent: '#C9A962', font: "'Cormorant', serif" },
  neon: { bg: 'transparent', text: '#fff', accent: '#00ffff', font: "'Space Grotesk', sans-serif" },
  video: { bg: 'transparent', text: '#FFFFFF', accent: '#6B8CAE', font: "'Manrope', sans-serif" },
};

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
  
  ${p => p.$scrolled && css`
    background: ${p.$theme === 'contemporary' ? 'rgba(255,255,255,0.95)' : 'rgba(10, 10, 10, 0.95)'};
    backdrop-filter: blur(10px);
    padding: 1rem clamp(1.5rem, 5vw, 4rem);
  `}
  
  ${p => p.$theme === 'botanical' && css`
    top: 1.5rem;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: auto;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 50px;
    padding: 0.5rem 1.5rem;
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
`;

const Logo = styled.a`
  font-family: ${p => THEME_STYLES[p.$theme]?.font || "'Inter', sans-serif"};
  font-size: ${p => p.$theme === 'luxe' ? '1.4rem' : '1.2rem'};
  font-weight: ${p => p.$theme === 'luxe' ? '300' : '700'};
  font-style: ${p => p.$theme === 'luxe' ? 'italic' : 'normal'};
  color: ${p => THEME_STYLES[p.$theme]?.text || '#fff'};
  text-decoration: none;
  letter-spacing: ${p => p.$theme === 'editorial' ? '0.1em' : '-0.02em'};
  text-transform: ${p => p.$theme === 'editorial' ? 'uppercase' : 'none'};
  
  ${p => p.$theme === 'neon' && css`
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  `}
  
  &:hover { color: ${p => THEME_STYLES[p.$theme]?.accent}; }
`;

const NavLinks = styled.div`
  display: none;
  gap: ${p => p.$theme === 'luxe' ? '2.5rem' : '2rem'};
  
  @media (min-width: 768px) { display: flex; }
`;

const NavLink = styled.a`
  font-family: ${p => p.$theme === 'luxe' ? "'Outfit', sans-serif" : p.$theme === 'contemporary' ? "'Space Grotesk', sans-serif" : "'Inter', sans-serif"};
  font-size: ${p => p.$theme === 'luxe' ? '0.7rem' : '0.75rem'};
  font-weight: ${p => p.$theme === 'contemporary' ? '600' : '500'};
  letter-spacing: ${p => p.$theme === 'luxe' ? '0.2em' : '0.1em'};
  text-transform: uppercase;
  color: ${p => p.$theme === 'contemporary' ? '#0D0D0D' : 'rgba(255,255,255,0.7)'};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover { 
    color: ${p => THEME_STYLES[p.$theme]?.accent || '#fff'}; 
    ${p => p.$theme === 'neon' && css`text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);`}
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// ============================================
// THEME SWITCHER (mit Dropdown!)
// ============================================
const ThemeSwitcherWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 1rem;
  border-left: 1px solid ${p => p.$theme === 'contemporary' ? '#0D0D0D' : 'rgba(255,255,255,0.2)'};
  
  @media (max-width: 500px) { display: none; }
`;

const ThemeDots = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const ThemeDot = styled.button`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid ${p => p.$active ? '#fff' : 'transparent'};
  background: ${p => p.$color};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover { transform: scale(1.15); }
`;

const MenuLabel = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${p => p.$theme === 'contemporary' ? '#0D0D0D' : '#fff'};
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  
  &::after {
    content: '▼';
    font-size: 0.5rem;
    transition: transform 0.2s ease;
    ${p => p.$open && css`transform: rotate(180deg);`}
  }
  
  &:hover { opacity: 0.8; }
`;

const ThemeDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: ${p => p.$theme === 'contemporary' ? '#fff' : 'rgba(10,10,10,0.95)'};
  border: ${p => p.$theme === 'contemporary' ? '3px solid #0D0D0D' : '1px solid rgba(255,255,255,0.1)'};
  ${p => p.$theme === 'contemporary' && css`box-shadow: 4px 4px 0 #0D0D0D;`}
  border-radius: ${p => p.$theme === 'contemporary' ? '0' : '12px'};
  padding: 0.5rem;
  min-width: 160px;
  opacity: ${p => p.$open ? 1 : 0};
  visibility: ${p => p.$open ? 'visible' : 'hidden'};
  transform: translateY(${p => p.$open ? '0' : '-10px'});
  transition: all 0.2s ease;
  z-index: 100;
`;

const ThemeOption = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.6rem 0.75rem;
  background: ${p => p.$active ? (p.$theme === 'contemporary' ? '#FFE66D' : 'rgba(255,255,255,0.1)') : 'transparent'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${p => p.$theme === 'contemporary' ? '#FFE66D' : 'rgba(255,255,255,0.1)'};
  }
`;

const ThemeOptionDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${p => p.$color};
`;

const ThemeOptionName = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${p => p.$theme === 'contemporary' ? '#0D0D0D' : '#fff'};
`;

const BurgerBtn = styled.button`
  width: 44px;
  height: 44px;
  background: ${p => p.$theme === 'contemporary' ? '#FFE66D' : 'transparent'};
  border: ${p => p.$theme === 'contemporary' ? '2px solid #0D0D0D' : '1px solid rgba(255,255,255,0.2)'};
  ${p => p.$theme === 'contemporary' && css`box-shadow: 2px 2px 0 #0D0D0D;`}
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${p => p.$theme === 'contemporary' ? '#0D0D0D' : '#fff'};
  
  @media (min-width: 768px) { display: none; }
  
  &:hover { 
    border-color: ${p => THEME_STYLES[p.$theme]?.accent}; 
    ${p => p.$theme === 'contemporary' && css`
      transform: translate(-2px, -2px);
      box-shadow: 4px 4px 0 #0D0D0D;
    `}
  }
`;

// ============================================
// MAIN COMPONENT
// ============================================
const MarketingNav = () => {
  const { currentTheme, setCurrentTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'features', label: 'Features' },
    { id: 'themes', label: 'Designs' },
    { id: 'pricing', label: 'Preise' },
    { id: 'contact', label: 'Kontakt' },
  ];

  const renderContent = () => (
    <>
      <Logo href="#" onClick={(e) => handleLinkClick(e, 'hero')} $theme={currentTheme}>
        S&I.
      </Logo>
      
      <NavLinks $theme={currentTheme}>
        {navItems.map(item => (
          <NavLink 
            key={item.id} 
            href={`#${item.id}`} 
            onClick={(e) => handleLinkClick(e, item.id)}
            $theme={currentTheme}
          >
            {item.label}
          </NavLink>
        ))}
      </NavLinks>
      
      <RightSection>
        <ThemeSwitcherWrapper $theme={currentTheme} ref={dropdownRef}>
          <ThemeDots>
            {THEMES.map(t => (
              <ThemeDot 
                key={t.id} 
                $color={t.color}
                $active={currentTheme === t.id}
                onClick={() => setCurrentTheme(t.id)}
                title={t.name}
              />
            ))}
          </ThemeDots>
          <MenuLabel 
            $theme={currentTheme} 
            $open={dropdownOpen}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Menü
          </MenuLabel>
          <ThemeDropdown $theme={currentTheme} $open={dropdownOpen}>
            {THEMES.map(t => (
              <ThemeOption 
                key={t.id}
                $active={currentTheme === t.id}
                $theme={currentTheme}
                onClick={() => { setCurrentTheme(t.id); setDropdownOpen(false); }}
              >
                <ThemeOptionDot $color={t.color} />
                <ThemeOptionName $theme={currentTheme}>{t.name}</ThemeOptionName>
              </ThemeOption>
            ))}
          </ThemeDropdown>
        </ThemeSwitcherWrapper>
        <BurgerBtn $theme={currentTheme} onClick={() => setMenuOpen(!menuOpen)}>☰</BurgerBtn>
      </RightSection>
    </>
  );

  // Contemporary hat ein inneres Frame
  if (currentTheme === 'contemporary') {
    return (
      <Nav $theme={currentTheme} $scrolled={scrolled}>
        <ContemporaryInner $scrolled={scrolled}>
          {renderContent()}
        </ContemporaryInner>
      </Nav>
    );
  }

  return (
    <Nav $theme={currentTheme} $scrolled={scrolled}>
      {renderContent()}
    </Nav>
  );
};

export default MarketingNav;
