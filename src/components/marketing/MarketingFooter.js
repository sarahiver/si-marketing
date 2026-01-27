// src/components/marketing/MarketingFooter.js
import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const Footer = styled.footer`
  padding: 60px 20px 40px;
  overflow: hidden;
  @media (min-width: 600px) { padding: 80px 5% 40px; }
  ${p => p.$themeId === 'video' && css`background: #0A0A0A; border-top: 1px solid rgba(184,151,106,0.1);`}
  ${p => p.$themeId === 'editorial' && css`background: #1A1A1A; border-top: 1px solid #333;`}
  ${p => p.$themeId === 'botanical' && css`background: #2D3B2D; border-top: 1px solid rgba(139,157,131,0.2);`}
  ${p => p.$themeId === 'contemporary' && css`background: #0D0D0D; border-top: 3px solid #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`background: #0A0A0A; border-top: 1px solid rgba(212,175,55,0.1);`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f; border-top: 1px solid rgba(0,255,255,0.2);`}
`;

const Container = styled.div`max-width: 1200px; margin: 0 auto; width: 100%;`;

const TopSection = styled.div`
  display: grid; 
  grid-template-columns: 1fr; 
  gap: 30px; 
  margin-bottom: 40px;
  @media (min-width: 500px) { grid-template-columns: 1fr 1fr; gap: 40px; }
  @media (min-width: 900px) { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 60px; }
`;

const BrandCol = styled.div``;

const Logo = styled.div`
  font-size: 1.8rem; margin-bottom: 20px;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5);`}
`;

const BrandDesc = styled.p`
  font-size: 0.9rem; line-height: 1.7; max-width: 300px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.4);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.5);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: rgba(245,241,235,0.5);`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.5);`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(255,255,255,0.3);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.4);`}
`;

const Column = styled.div``;

const ColTitle = styled.h4`
  font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 25px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FFFFFF;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #FEFEFE;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff;`}
`;

const Links = styled.ul`list-style: none; display: flex; flex-direction: column; gap: 12px;`;

const LinkItem = styled.li`
  a {
    font-size: 0.9rem; text-decoration: none; transition: all 0.3s ease;
    ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.4); &:hover { color: #B8976A; }`}
    ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.5); &:hover { color: #FFFFFF; }`}
    ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: rgba(245,241,235,0.5); &:hover { color: #8B9D83; }`}
    ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.5); &:hover { color: #FF6B6B; }`}
    ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(255,255,255,0.3); &:hover { color: #D4AF37; }`}
    ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.4); &:hover { color: #00ffff; }`}
  }
`;

const BottomSection = styled.div`
  display: flex; justify-content: space-between; align-items: center; padding-top: 40px;
  border-top: 1px solid rgba(255,255,255,0.1);
  @media (max-width: 600px) { flex-direction: column; gap: 20px; text-align: center; }
`;

const Copyright = styled.p`
  font-size: 0.8rem;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.3);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.4);`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: rgba(245,241,235,0.4);`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.4);`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(255,255,255,0.2);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.3);`}
`;

const SocialLinks = styled.div`display: flex; gap: 20px;`;

const SocialLink = styled.a`
  font-size: 1.2rem; text-decoration: none; transition: all 0.3s ease;
  ${p => p.$themeId === 'video' && css`color: rgba(255,255,255,0.4); &:hover { color: #B8976A; }`}
  ${p => p.$themeId === 'editorial' && css`color: rgba(255,255,255,0.5); &:hover { color: #FFFFFF; }`}
  ${p => p.$themeId === 'botanical' && css`color: rgba(245,241,235,0.5); &:hover { color: #8B9D83; }`}
  ${p => p.$themeId === 'contemporary' && css`color: rgba(255,255,255,0.5); &:hover { color: #FF6B6B; }`}
  ${p => p.$themeId === 'luxe' && css`color: rgba(255,255,255,0.3); &:hover { color: #D4AF37; }`}
  ${p => p.$themeId === 'neon' && css`color: rgba(255,255,255,0.4); &:hover { color: #00ffff; text-shadow: 0 0 10px rgba(0,255,255,0.5); }`}
`;

function MarketingFooter() {
  const { currentTheme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <Footer $themeId={currentTheme}>
      <Container>
        <TopSection>
          <BrandCol>
            <Logo $themeId={currentTheme}>S & I</Logo>
            <BrandDesc $themeId={currentTheme}>
              Premium Hochzeitswebsites, die so einzigartig sind wie eure Liebe. Handgemacht in Hamburg.
            </BrandDesc>
          </BrandCol>
          
          <Column>
            <ColTitle $themeId={currentTheme}>Navigation</ColTitle>
            <Links>
              <LinkItem $themeId={currentTheme}><a href="#features">Features</a></LinkItem>
              <LinkItem $themeId={currentTheme}><a href="#designs">Designs</a></LinkItem>
              <LinkItem $themeId={currentTheme}><a href="#pricing">Preise</a></LinkItem>
              <LinkItem $themeId={currentTheme}><a href="#about">Über uns</a></LinkItem>
              <LinkItem $themeId={currentTheme}><a href="#contact">Kontakt</a></LinkItem>
            </Links>
          </Column>
          
          <Column>
            <ColTitle $themeId={currentTheme}>Rechtliches</ColTitle>
            <Links>
              <LinkItem $themeId={currentTheme}><a href="/impressum">Impressum</a></LinkItem>
              <LinkItem $themeId={currentTheme}><a href="/datenschutz">Datenschutz</a></LinkItem>
              <LinkItem $themeId={currentTheme}><a href="/agb">AGB</a></LinkItem>
            </Links>
          </Column>
          
          <Column>
            <ColTitle $themeId={currentTheme}>Admin</ColTitle>
            <Links>
              <LinkItem $themeId={currentTheme}><a href="/admin">Dashboard</a></LinkItem>
            </Links>
          </Column>
        </TopSection>
        
        <BottomSection>
          <Copyright $themeId={currentTheme}>© {year} S&I Wedding. Alle Rechte vorbehalten.</Copyright>
          <SocialLinks>
            <SocialLink href="https://instagram.com/sarah.iver.wedding" target="_blank" rel="noopener noreferrer" $themeId={currentTheme}>📷</SocialLink>
            <SocialLink href="https://pinterest.de/sandiwedding" target="_blank" rel="noopener noreferrer" $themeId={currentTheme}>📌</SocialLink>
            <SocialLink href="mailto:wedding@sarahiver.de" $themeId={currentTheme}>✉️</SocialLink>
          </SocialLinks>
        </BottomSection>
      </Container>
    </Footer>
  );
}

export default MarketingFooter;
