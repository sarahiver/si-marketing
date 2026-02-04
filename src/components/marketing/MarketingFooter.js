// src/components/marketing/MarketingFooter.js
// 1:1 Theme-Designs aus si-wedding-themes
import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// BASE FOOTER
// ============================================
const FooterBase = styled.footer`
  padding: clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem);
  transition: all 0.3s ease;
`;

// Einheitliches Logo für alle Themes: S&I. - Roboto, bold, weiß auf schwarz
const UnifiedLogo = styled.a`
  font-family: 'Roboto', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  color: #fff;
  background: #000;
  padding: 6px 12px;
  display: inline-block;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover { opacity: 0.8; }
`;

// ============================================
// EDITORIAL FOOTER
// ============================================
const EditorialFooter = styled(FooterBase)`
  background: #0A0A0A;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const EditorialInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const EditorialBrand = styled.div``;

const EditorialLogo = styled.a`
  font-family: 'Oswald', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #FAFAFA;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  display: inline-block;
  margin-bottom: 1rem;
  
  &:hover { color: #C41E3A; }
`;

const EditorialTagline = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
  max-width: 300px;
`;

const EditorialColumn = styled.div``;

const EditorialColumnTitle = styled.h4`
  font-family: 'Oswald', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #C41E3A;
  margin-bottom: 1.5rem;
`;

const EditorialLink = styled.a`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.75rem;
  transition: all 0.2s ease;
  
  &:hover { color: #FAFAFA; padding-left: 0.5rem; }
`;

const EditorialBottom = styled.div`
  max-width: 1400px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const EditorialCopy = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
`;

const EditorialLegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const EditorialLegalLink = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  &:hover { color: #C41E3A; }
`;

// ============================================
// BOTANICAL FOOTER
// ============================================
const BotanicalFooter = styled(FooterBase)`
  background: #030503;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 20% 80%, rgba(45, 90, 60, 0.1) 0%, transparent 50%);
  }
`;

const BotanicalInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const BotanicalLogo = styled.a`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.95);
  display: inline-block;
  margin-bottom: 1.5rem;
`;

const BotanicalTagline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 2rem;
`;

const BotanicalLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const BotanicalLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s ease;
  
  &:hover { color: rgba(255, 255, 255, 0.95); }
`;

const BotanicalDivider = styled.div`
  width: 60px;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin: 0 auto 2rem;
`;

const BotanicalCopy = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
`;

const BotanicalLegalLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const BotanicalLegalLink = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.3);
  &:hover { color: rgba(255, 255, 255, 0.6); }
`;

// ============================================
// CONTEMPORARY FOOTER
// ============================================
const ContemporaryFooter = styled(FooterBase)`
  background: #FAFAFA;
  border-top: 3px solid #0D0D0D;
`;

const ContemporaryInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ContemporaryTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
  padding-bottom: 3rem;
  border-bottom: 3px solid #0D0D0D;
`;

const ContemporaryBrand = styled.div``;

const ContemporaryLogo = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #0D0D0D;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 1rem;
  
  &:hover { color: #FF6B6B; }
`;

const ContemporaryTagline = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #737373;
  max-width: 300px;
`;

const ContemporaryLinks = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
`;

const ContemporaryColumn = styled.div``;

const ContemporaryColumnTitle = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #FF6B6B;
  display: inline-block;
`;

const ContemporaryLink = styled.a`
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: #737373;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover { color: #FF6B6B; transform: translateX(5px); }
`;

const ContemporaryBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ContemporaryCopy = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: #A3A3A3;
`;

const ContemporaryLegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const ContemporaryLegalLink = styled(Link)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: #A3A3A3;
  padding: 0.25rem 0.5rem;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  
  &:hover { 
    color: #0D0D0D; 
    border-color: #0D0D0D;
    background: #FFE66D;
  }
`;

// ============================================
// LUXE FOOTER
// ============================================
const LuxeFooter = styled(FooterBase)`
  background: #0A0A0A;
  border-top: 1px solid rgba(201, 169, 98, 0.2);
`;

const LuxeInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const LuxeLogo = styled.a`
  font-family: 'Cormorant', serif;
  font-size: 3rem;
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
  display: inline-block;
  margin-bottom: 1.5rem;
  
  &:hover { color: #C9A962; }
`;

const LuxeTagline = styled.p`
  font-family: 'Cormorant', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(248, 246, 243, 0.6);
  margin-bottom: 3rem;
`;

const LuxeDivider = styled.div`
  width: 80px;
  height: 1px;
  background: #C9A962;
  margin: 0 auto 3rem;
`;

const LuxeLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const LuxeLink = styled.a`
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(248, 246, 243, 0.5);
  transition: color 0.3s ease;
  
  &:hover { color: #C9A962; }
`;

const LuxeCopy = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: rgba(248, 246, 243, 0.3);
  margin-bottom: 1rem;
`;

const LuxeLegalLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const LuxeLegalLink = styled(Link)`
  font-family: 'Outfit', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgba(248, 246, 243, 0.3);
  &:hover { color: #C9A962; }
`;

// ============================================
// NEON FOOTER
// ============================================
const NeonFooter = styled(FooterBase)`
  background: #0a0a0f;
  border-top: 1px solid rgba(0, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00ffff, #ff00ff, transparent);
  }
`;

const NeonInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const NeonBrand = styled.div``;

const NeonLogo = styled.a`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  display: inline-block;
  margin-bottom: 1rem;
  
  &:hover { text-shadow: 0 0 20px rgba(0, 255, 255, 0.8); }
`;

const NeonTagline = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  max-width: 300px;
`;

const NeonColumn = styled.div``;

const NeonColumnTitle = styled.h4`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ff00ff;
  margin-bottom: 1.5rem;
`;

const NeonLink = styled.a`
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.75rem;
  transition: all 0.2s ease;
  
  &:hover { color: #00ffff; text-shadow: 0 0 10px rgba(0, 255, 255, 0.3); }
`;

const NeonBottom = styled.div`
  max-width: 1200px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const NeonCopy = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
`;

const NeonLegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NeonLegalLink = styled(Link)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  &:hover { color: #00ff88; }
`;

// ============================================
// VIDEO FOOTER
// ============================================
const VideoFooter = styled(FooterBase)`
  background: #0A0A0A;
  border-top: 1px solid rgba(107, 140, 174, 0.2);
`;

const VideoInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const VideoLogo = styled.a`
  font-family: 'Manrope', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #FFFFFF;
  display: inline-block;
  margin-bottom: 1rem;
  
  &:hover { color: #6B8CAE; }
`;

const VideoTagline = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #B0B0B0;
  margin-bottom: 3rem;
`;

const VideoLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
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

const VideoDivider = styled.div`
  width: 80px;
  height: 1px;
  background: #6B8CAE;
  margin: 0 auto 2rem;
`;

const VideoCopy = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1rem;
`;

const VideoLegalLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const VideoLegalLink = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
  &:hover { color: #6B8CAE; }
`;

// ============================================
// MAIN COMPONENT
// ============================================
const MarketingFooter = () => {
  const { currentTheme } = useTheme();
  const year = new Date().getFullYear();

  const navItems = [
    { id: 'features', label: 'Features' },
    { id: 'themes', label: 'Designs' },
    { id: 'pricing', label: 'Preise' },
    { id: 'about', label: 'Über uns' },
    { id: 'contact', label: 'Kontakt' },
  ];

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // EDITORIAL
  if (currentTheme === 'editorial') {
    return (
      <EditorialFooter>
        <EditorialInner>
          <EditorialBrand>
            <UnifiedLogo href="#">S&I.</UnifiedLogo>
            <EditorialTagline>Premium Hochzeitswebsites für unvergessliche Momente.</EditorialTagline>
          </EditorialBrand>
          <EditorialColumn>
            <EditorialColumnTitle>Navigation</EditorialColumnTitle>
            {navItems.map(item => (
              <EditorialLink key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
                {item.label}
              </EditorialLink>
            ))}
          </EditorialColumn>
          <EditorialColumn>
            <EditorialColumnTitle>Kontakt</EditorialColumnTitle>
            <EditorialLink href="mailto:hello@siwedding.de">hello@siwedding.de</EditorialLink>
            <EditorialLink href="#">Hamburg, Deutschland</EditorialLink>
          </EditorialColumn>
        </EditorialInner>
        <EditorialBottom>
          <EditorialCopy>© {year} S&I Wedding. Alle Rechte vorbehalten.</EditorialCopy>
          <EditorialLegalLinks>
            <EditorialLegalLink to="/impressum">Impressum</EditorialLegalLink>
            <EditorialLegalLink to="/datenschutz">Datenschutz</EditorialLegalLink>
          </EditorialLegalLinks>
        </EditorialBottom>
      </EditorialFooter>
    );
  }

  // BOTANICAL
  if (currentTheme === 'botanical') {
    return (
      <BotanicalFooter>
        <BotanicalInner>
          <UnifiedLogo href="#">S&I.</UnifiedLogo>
          <BotanicalTagline>Premium Hochzeitswebsites</BotanicalTagline>
          <BotanicalLinks>
            {navItems.map(item => (
              <BotanicalLink key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
                {item.label}
              </BotanicalLink>
            ))}
          </BotanicalLinks>
          <BotanicalDivider />
          <BotanicalCopy>© {year} S&I Wedding</BotanicalCopy>
          <BotanicalLegalLinks>
            <BotanicalLegalLink to="/impressum">Impressum</BotanicalLegalLink>
            <BotanicalLegalLink to="/datenschutz">Datenschutz</BotanicalLegalLink>
          </BotanicalLegalLinks>
        </BotanicalInner>
      </BotanicalFooter>
    );
  }

  // CONTEMPORARY
  if (currentTheme === 'contemporary') {
    return (
      <ContemporaryFooter>
        <ContemporaryInner>
          <ContemporaryTop>
            <ContemporaryBrand>
              <UnifiedLogo href="#">S&I.</UnifiedLogo>
              <ContemporaryTagline>Hochzeitswebsites die rocken! 🎉</ContemporaryTagline>
            </ContemporaryBrand>
            <ContemporaryLinks>
              <ContemporaryColumn>
                <ContemporaryColumnTitle>Navigation</ContemporaryColumnTitle>
                {navItems.map(item => (
                  <ContemporaryLink key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
                    {item.label}
                  </ContemporaryLink>
                ))}
              </ContemporaryColumn>
            </ContemporaryLinks>
          </ContemporaryTop>
          <ContemporaryBottom>
            <ContemporaryCopy>© {year} S&I Wedding</ContemporaryCopy>
            <ContemporaryLegalLinks>
              <ContemporaryLegalLink to="/impressum">Impressum</ContemporaryLegalLink>
              <ContemporaryLegalLink to="/datenschutz">Datenschutz</ContemporaryLegalLink>
            </ContemporaryLegalLinks>
          </ContemporaryBottom>
        </ContemporaryInner>
      </ContemporaryFooter>
    );
  }

  // LUXE
  if (currentTheme === 'luxe') {
    return (
      <LuxeFooter>
        <LuxeInner>
          <UnifiedLogo href="#">S&I.</UnifiedLogo>
          <LuxeTagline>Zeitlose Eleganz für Ihren besonderen Tag</LuxeTagline>
          <LuxeDivider />
          <LuxeLinks>
            {navItems.map(item => (
              <LuxeLink key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
                {item.label}
              </LuxeLink>
            ))}
          </LuxeLinks>
          <LuxeCopy>© {year} S&I Wedding</LuxeCopy>
          <LuxeLegalLinks>
            <LuxeLegalLink to="/impressum">Impressum</LuxeLegalLink>
            <LuxeLegalLink to="/datenschutz">Datenschutz</LuxeLegalLink>
          </LuxeLegalLinks>
        </LuxeInner>
      </LuxeFooter>
    );
  }

  // NEON
  if (currentTheme === 'neon') {
    return (
      <NeonFooter>
        <NeonInner>
          <NeonBrand>
            <UnifiedLogo href="#">S&I.</UnifiedLogo>
            <NeonTagline>Next-Level Wedding Websites</NeonTagline>
          </NeonBrand>
          <NeonColumn>
            <NeonColumnTitle>// Navigation</NeonColumnTitle>
            {navItems.map(item => (
              <NeonLink key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
                {item.label}
              </NeonLink>
            ))}
          </NeonColumn>
          <NeonColumn>
            <NeonColumnTitle>// Connect</NeonColumnTitle>
            <NeonLink href="mailto:hello@siwedding.de">hello@siwedding.de</NeonLink>
          </NeonColumn>
        </NeonInner>
        <NeonBottom>
          <NeonCopy>© {year} S&I Wedding // All rights reserved</NeonCopy>
          <NeonLegalLinks>
            <NeonLegalLink to="/impressum">Impressum</NeonLegalLink>
            <NeonLegalLink to="/datenschutz">Datenschutz</NeonLegalLink>
          </NeonLegalLinks>
        </NeonBottom>
      </NeonFooter>
    );
  }

  // VIDEO (Default)
  return (
    <VideoFooter>
      <VideoInner>
        <UnifiedLogo href="#">S&I.</UnifiedLogo>
        <VideoTagline>Eure Geschichte, cinematisch erzählt</VideoTagline>
        <VideoLinks>
          {navItems.map(item => (
            <VideoLink key={item.id} href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
              {item.label}
            </VideoLink>
          ))}
        </VideoLinks>
        <VideoDivider />
        <VideoCopy>© {year} S&I Wedding</VideoCopy>
        <VideoLegalLinks>
          <VideoLegalLink to="/impressum">Impressum</VideoLegalLink>
          <VideoLegalLink to="/datenschutz">Datenschutz</VideoLegalLink>
        </VideoLegalLinks>
      </VideoInner>
    </VideoFooter>
  );
};

export default MarketingFooter;
