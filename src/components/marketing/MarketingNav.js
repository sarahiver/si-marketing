// src/components/marketing/MarketingNav.js
// Theme Switcher: Aktuelles Theme mit Dropdown für andere
import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const THEMES = [
  { id: 'editorial', name: 'Editorial' },
  { id: 'botanical', name: 'Botanical' },
  { id: 'contemporary', name: 'Contemporary' },
  { id: 'luxe', name: 'Luxe' },
  { id: 'neon', name: 'Neon' },
  { id: 'video', name: 'Video' },
];

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

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
    max-width: calc(100% - 3rem);
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    padding: 0.6rem 1.5rem;
    gap: 0.5rem;
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

// LOGO: S&I. - bold, white, Roboto, letter-spacing -0.06em
const Logo = styled.a`
  font-family: 'Roboto', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  color: ${p => p.$theme === 'contemporary' ? '#0D0D0D' : '#FFFFFF'};
  text-decoration: none;
  
  &:hover { 
    opacity: 0.8;
  }
`;

const NavLinks = styled.div`
  display: none;
  gap: 2rem;
  
  @media (min-width: 768px) { display: flex; }
`;

const NavLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.$theme === 'contemporary' ? '#0D0D0D' : 'rgba(255,255,255,0.7)'};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover { 
    color: ${p => p.$theme === 'contemporary' ? '#FF6B6B' : '#fff'}; 
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// ============================================
// THEME SWITCHER - Aktuelles Theme + Dropdown
// ============================================
const ThemeSwitcherWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  border-left: 1px solid ${p => p.$theme === 'contemporary' ? '#0D0D0D' : 'rgba(255,255,255,0.2)'};
  
  @media (max-width: 500px) { display: none; }
`;

const CurrentThemeBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
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
  ${p => p.$theme !== 'contemporary' && css`backdrop-filter: blur(20px);`}
  border-radius: ${p => p.$theme === 'contemporary' ? '0' : '12px'};
  padding: 0.5rem;
  min-width: 150px;
  opacity: ${p => p.$open ? 1 : 0};
  visibility: ${p => p.$open ? 'visible' : 'hidden'};
  transform: translateY(${p => p.$open ? '0' : '-10px'});
  transition: all 0.2s ease;
  z-index: 100;
`;

const ThemeOption = styled.button`
  display: block;
  width: 100%;
  padding: 0.6rem 0.75rem;
  background: ${p => p.$active ? (p.$theme === 'contemporary' ? '#FFE66D' : 'rgba(255,255,255,0.1)') : 'transparent'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: ${p => p.$active ? '600' : '500'};
  color: ${p => p.$theme === 'contemporary' ? '#0D0D0D' : '#fff'};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${p => p.$theme === 'contemporary' ? '#FFE66D' : 'rgba(255,255,255,0.1)'};
  }
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
    border-color: ${p => p.$theme === 'contemporary' ? '#0D0D0D' : 'rgba(255,255,255,0.5)'};
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

  const currentThemeData = THEMES.find(t => t.id === currentTheme);

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
          <CurrentThemeBtn 
            $theme={currentTheme} 
            $open={dropdownOpen}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {currentThemeData?.name || 'Theme'}
          </CurrentThemeBtn>
          <ThemeDropdown $theme={currentTheme} $open={dropdownOpen}>
            {THEMES.filter(t => t.id !== currentTheme).map(t => (
              <ThemeOption 
                key={t.id}
                $active={false}
                $theme={currentTheme}
                onClick={() => { setCurrentTheme(t.id); setDropdownOpen(false); }}
              >
                {t.name}
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
