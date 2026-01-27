// Eleganter Theme Switcher - Premium Design
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { themes, themeOrder, isDarkTheme } from '../themes/themeDefinitions';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = themes[currentTheme];
  const isDark = isDarkTheme(currentTheme);

  return (
    <Container $isDark={isDark}>
      <CurrentTheme onClick={() => setIsOpen(!isOpen)} $isDark={isDark} $isOpen={isOpen}>
        <ThemeIndicator $color={current.colors.accent} />
        <ThemeName $isDark={isDark}>{current.name}</ThemeName>
        <Arrow $isOpen={isOpen} $isDark={isDark}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </Arrow>
      </CurrentTheme>
      
      {isOpen && (
        <Dropdown $isDark={isDark}>
          <DropdownLabel $isDark={isDark}>Design wählen</DropdownLabel>
          {themeOrder.map((themeId) => {
            const theme = themes[themeId];
            const isActive = currentTheme === themeId;
            
            return (
              <ThemeOption
                key={themeId}
                onClick={() => {
                  onThemeChange(themeId);
                  setIsOpen(false);
                }}
                $isActive={isActive}
                $isDark={isDark}
                $accentColor={theme.colors.accent}
              >
                <OptionIndicator $color={theme.colors.accent} $isActive={isActive} />
                <OptionContent>
                  <OptionName $isDark={isDark} $isActive={isActive}>{theme.name}</OptionName>
                  <OptionDesc $isDark={isDark}>{theme.description}</OptionDesc>
                </OptionContent>
                {isActive && (
                  <CheckIcon $color={theme.colors.accent}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </CheckIcon>
                )}
              </ThemeOption>
            );
          })}
        </Dropdown>
      )}
      
      {isOpen && <Backdrop onClick={() => setIsOpen(false)} />}
    </Container>
  );
};

export default ThemeSwitcher;

// Styles
const Container = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  font-family: 'Inter', -apple-system, sans-serif;
`;

const CurrentTheme = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: ${p => p.$isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${p => p.$isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
  border-radius: ${p => p.$isOpen ? '12px 12px 0 0' : '12px'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${p => p.$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'};
  }
`;

const ThemeIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${p => p.$color};
  box-shadow: 0 0 10px ${p => p.$color}40;
`;

const ThemeName = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'};
  letter-spacing: 0.02em;
`;

const Arrow = styled.span`
  display: flex;
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'};
  transform: rotate(${p => p.$isOpen ? '180deg' : '0'});
  transition: transform 0.2s ease;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 240px;
  background: ${p => p.$isDark ? 'rgba(20,20,25,0.98)' : 'rgba(255,255,255,0.98)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${p => p.$isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
  border-top: none;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
  animation: ${fadeIn} 0.2s ease;
`;

const DropdownLabel = styled.div`
  padding: 12px 16px 8px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
`;

const ThemeOption = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: ${p => p.$isActive 
    ? (p.$isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)') 
    : 'transparent'};
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
  
  &:hover {
    background: ${p => p.$isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'};
  }
  
  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

const OptionIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p => p.$color};
  box-shadow: ${p => p.$isActive ? `0 0 12px ${p.$color}60` : 'none'};
  transition: box-shadow 0.2s ease;
`;

const OptionContent = styled.div`
  flex: 1;
`;

const OptionName = styled.div`
  font-size: 0.9rem;
  font-weight: ${p => p.$isActive ? '600' : '500'};
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)'};
  margin-bottom: 2px;
`;

const OptionDesc = styled.div`
  font-size: 0.75rem;
  color: ${p => p.$isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)'};
`;

const CheckIcon = styled.span`
  color: ${p => p.$color};
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
`;
