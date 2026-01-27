// Navigation mit Theme Switcher
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounceRight = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
`;

const Navigation = () => {
  const { currentTheme, setCurrentTheme, theme, themeOrder, themes } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav $scrolled={scrolled} $theme={currentTheme}>
      <NavContainer>
        <LogoLink onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo $theme={currentTheme}>S&I.</Logo>
        </LogoLink>
        
        <RightSection>
          {/* Design Hint mit Animation - Desktop */}
          <DesignHint $theme={currentTheme} onClick={() => setShowThemeMenu(true)}>
            <HintText $theme={currentTheme} $scrolled={scrolled}>Entdecke unsere Designbeispiele</HintText>
            <HintArrow $theme={currentTheme} $scrolled={scrolled}>→</HintArrow>
          </DesignHint>
          
          {/* Mobile Hint */}
          <MobileHint $theme={currentTheme} $scrolled={scrolled} onClick={() => setShowThemeMenu(true)}>
            Designs
            <MobileArrow>→</MobileArrow>
          </MobileHint>
          
          {/* Theme Switcher */}
          <ThemeSwitcher>
            <ThemeButton 
              onClick={() => setShowThemeMenu(!showThemeMenu)} 
              $theme={currentTheme}
            >
              <ThemeDot $color={theme.colors.accent} $inButton $theme={currentTheme} />
              <span>{themes[currentTheme].name}</span>
              <Arrow $open={showThemeMenu}>▾</Arrow>
            </ThemeButton>
            
            {showThemeMenu && (
              <>
                <ThemeDropdown $theme={currentTheme}>
                  <DropdownLabel $theme={currentTheme}>Design wählen</DropdownLabel>
                  {themeOrder.map((themeId) => (
                    <ThemeOption
                      key={themeId}
                      onClick={() => {
                        setCurrentTheme(themeId);
                        setShowThemeMenu(false);
                      }}
                      $active={currentTheme === themeId}
                      $theme={currentTheme}
                    >
                      <ThemeDot $color={themes[themeId].colors.accent} />
                      <span>{themes[themeId].name}</span>
                      {currentTheme === themeId && <Check>✓</Check>}
                    </ThemeOption>
                  ))}
                </ThemeDropdown>
                <Backdrop onClick={() => setShowThemeMenu(false)} />
              </>
            )}
          </ThemeSwitcher>
        </RightSection>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const DesignHint = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  
  @media (max-width: 600px) {
    display: none;
  }
`;

const MobileHint = styled.button`
  display: none;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  font-size: 0.75rem;
  font-weight: 600;
  
  font-family: ${p => {
    if (p.$theme === 'contemporary') return "'Space Grotesk', sans-serif";
    if (p.$theme === 'editorial') return "'Inter', sans-serif";
    if (p.$theme === 'video') return "'Montserrat', sans-serif";
    if (p.$theme === 'botanical') return "'Lato', sans-serif";
    if (p.$theme === 'luxe') return "'Montserrat', sans-serif";
    if (p.$theme === 'neon') return "'Space Grotesk', sans-serif";
    return "'Space Grotesk', sans-serif";
  }};
  
  color: ${p => {
    if (p.$theme === 'contemporary') return '#FF6B6B';
    if (p.$theme === 'editorial') return '#1A1A1A';
    if (p.$theme === 'video') return p.$scrolled ? '#1A1A1A' : '#FFFFFF';
    if (p.$theme === 'botanical') return '#4A7C59';
    if (p.$theme === 'luxe') return p.$scrolled ? '#1A1A1A' : '#FFFFFF';
    if (p.$theme === 'neon') return '#00ffff';
    return '#FF6B6B';
  }};
  
  @media (max-width: 600px) {
    display: flex;
  }
`;

const MobileArrow = styled.span`
  animation: ${bounceRight} 1.5s ease-in-out infinite;
`;

const HintText = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  transition: color 0.3s ease;
  
  font-family: ${p => {
    if (p.$theme === 'contemporary') return "'Space Grotesk', sans-serif";
    if (p.$theme === 'editorial') return "'Inter', sans-serif";
    if (p.$theme === 'video') return "'Montserrat', sans-serif";
    if (p.$theme === 'botanical') return "'Lato', sans-serif";
    if (p.$theme === 'luxe') return "'Montserrat', sans-serif";
    if (p.$theme === 'neon') return "'Space Grotesk', sans-serif";
    return "'Space Grotesk', sans-serif";
  }};
  
  color: ${p => {
    if (p.$theme === 'contemporary') return '#0D0D0D';
    if (p.$theme === 'editorial') return '#1A1A1A';
    if (p.$theme === 'video') return p.$scrolled ? '#1A1A1A' : '#FFFFFF';
    if (p.$theme === 'botanical') return '#2C3E2D';
    if (p.$theme === 'luxe') return p.$scrolled ? '#1A1A1A' : '#FFFFFF';
    if (p.$theme === 'neon') return p.$scrolled ? '#0a0a0f' : '#FFFFFF';
    return '#0D0D0D';
  }};
`;

const HintArrow = styled.span`
  font-size: 1rem;
  animation: ${bounceRight} 1.5s ease-in-out infinite;
  transition: color 0.3s ease;
  
  color: ${p => {
    if (p.$theme === 'contemporary') return '#FF6B6B';
    if (p.$theme === 'editorial') return '#1A1A1A';
    if (p.$theme === 'video') return p.$scrolled ? '#1A1A1A' : '#C9A962';
    if (p.$theme === 'botanical') return '#4A7C59';
    if (p.$theme === 'luxe') return p.$scrolled ? '#1A1A1A' : '#B8960B';
    if (p.$theme === 'neon') return '#00ffff';
    return '#FF6B6B';
  }};
`;

// Styles
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 5%;
  background: ${p => p.$scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(20px)' : 'none'};
  border-bottom: ${p => p.$scrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease;
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const Logo = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  background: #000000;
  color: #FFFFFF;
  padding: 6px 12px;
`;

const ThemeSwitcher = styled.div`
  position: relative;
`;

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    background: #1A1A1A;
    border: none;
    color: #FFFFFF;
    
    &:hover {
      background: #333;
    }
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    background: #0D0D0D;
    border: none;
    color: #FFFFFF;
    
    &:hover {
      background: #333;
    }
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    background: rgba(255, 255, 255, 0.95);
    border: none;
    color: #1A1814;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    
    &:hover {
      background: #FFFFFF;
    }
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    background: #2C3E2D;
    border: none;
    color: #FFFFFF;
    
    &:hover {
      background: #3A5039;
    }
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    background: rgba(255, 255, 255, 0.95);
    border: none;
    color: #1A1A1A;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    
    &:hover {
      background: #FFFFFF;
    }
  `}
  
  ${p => p.$theme === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    background: transparent;
    border: 2px solid #00ffff;
    color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
    
    &:hover {
      background: rgba(0, 255, 255, 0.1);
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    }
  `}
  
  @media (max-width: 500px) {
    span { display: none; }
    padding: 10px;
  }
`;

const ThemeDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p => p.$color};
  
  /* Bei Editorial im Button: weißer Dot statt schwarzer */
  ${p => p.$inButton && p.$theme === 'editorial' && css`
    background: #FFFFFF;
  `}
`;

const Arrow = styled.span`
  font-size: 0.7rem;
  transition: transform 0.2s ease;
  transform: rotate(${p => p.$open ? '180deg' : '0'});
  
  @media (max-width: 500px) {
    display: none;
  }
`;

const ThemeDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 100;
`;

const DropdownLabel = styled.div`
  padding: 12px 15px 8px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
  `}
`;

const ThemeOption = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 15px;
  background: ${p => p.$active ? 'rgba(0, 0, 0, 0.05)' : 'transparent'};
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: ${p => p.$active ? '600' : '400'};
  color: #0D0D0D;
  text-align: left;
  transition: background 0.2s ease;
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
  `}
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
  `}
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Check = styled.span`
  margin-left: auto;
  color: #4ECDC4;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99;
`;
