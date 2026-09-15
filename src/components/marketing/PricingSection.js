// src/components/marketing/PricingSection.js
// Erweiterte Pricing Section mit Addons/Zusatzoptionen
// Theme-spezifische Layouts
import React from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { PUBLIC_PACKAGES, ADDON_LIST, isFeatureIncluded } from '../../lib/pricing';
import {
  brand, font, type, leading, layout, images,
  eyebrowStyle, buttonPrimary, buttonSecondary, scriptNote,
} from '../../styles/brand';

// ============================================
// PRICING DATA
// ============================================
// Preise, Pakete und Add-ons kommen aus lib/pricing.js (Spiegel der
// zentralen Definition in si-superadmin). Hier wird nur noch in die
// Darstellungsform der bestehenden Theme-Layouts übersetzt — keine
// zweite Preisquelle mehr.
//
// Der Unterschied zwischen den Paketen ist der Betreuungsgrad,
// nicht die Anzahl der Funktionen.

const de = (n) => new Intl.NumberFormat('de-DE').format(n);

const PACKAGES = PUBLIC_PACKAGES.map(pkg => ({
  id: pkg.id,
  name: pkg.name,
  tagline: pkg.tagline,
  price: de(pkg.price),
  duration: pkg.hosting,
  popular: pkg.id === 'all_in',
  features: pkg.deliverables,
  addons: ADDON_LIST.reduce((acc, addon) => {
    const included = isFeatureIncluded(pkg.id, addon.id);
    acc[addon.id] = { price: addon.price, included };
    return acc;
  }, {}),
  cta: pkg.id === 'all_in' ? 'All In anfragen' : 'Website anfragen',
}));

const ADDONS = ADDON_LIST.map(a => ({
  id: a.id,
  name: a.name,
  desc: a.description,
}));

// ============================================
// BASE STYLES
// ============================================
const Section = styled.section`
  padding: clamp(3.5rem, 8vh, 6.5rem) clamp(1.5rem, 5vw, 4rem);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  align-items: stretch;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    gap: 2rem;
  }
`;

const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardBottom = styled.div`
  margin-top: auto;
`;

const AddonsSection = styled.div`
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(255,255,255,0.1);
`;

const AddonsTitle = styled.h3`
  margin-bottom: 1.5rem;
`;

const AddonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

// ============================================
// ON REQUEST BOX - Auf Anfrage
// ============================================
const OnRequestBox = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  text-align: center;
  border-radius: 12px;
`;

const OnRequestTitle = styled.h3`
  margin-bottom: 0.75rem;
`;

const OnRequestItems = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const OnRequestNote = styled.p`
  font-style: italic;
`;

// ON REQUEST DATA
const ON_REQUEST_ITEMS = [
  'Mehrsprachigkeit',
  'Individuelles Design',
  'Designanpassungen',
  'Passwortschutz',
];

// ============================================
// EDITORIAL THEME
// ============================================
const EditorialSection = styled(Section)`
  background: #FAFAFA;
`;

const EditorialEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #C41E3A;
  margin-bottom: 1rem;
`;

const EditorialTitle = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
`;

const EditorialCard = styled.div`
  background: #fff;
  border: ${p => p.$pop ? '2px solid #C41E3A' : '1px solid #E5E5E5'};
  padding: 2.5rem;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  ${p => p.$pop && css`
    &::before {
      content: 'Empfohlen';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #C41E3A;
      color: #fff;
      font-family: 'Oswald', sans-serif;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 0.4rem 1rem;
    }
  `}
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
`;

const PkgTagline = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  font-style: italic;
  color: #888;
  margin-bottom: 0.75rem;
  margin-top: -0.25rem;
`;

const EditorialCardName = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
  margin-bottom: 0.5rem;
`;

const EditorialCardPrice = styled.div`
  font-family: 'Oswald', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${p => p.$pop ? '#C41E3A' : '#0A0A0A'};
  margin-bottom: 0.25rem;
  
  span { font-size: 1.2rem; }
`;

const EditorialCardDuration = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 1.5rem;
`;

const EditorialFeatureList = styled.ul`
  margin-bottom: 1.5rem;
  flex: 1;
`;

const EditorialFeature = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #555;
  padding: 0.5rem 0;
  border-bottom: 1px solid #F0F0F0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  &::before {
    content: '✓';
    color: #C41E3A;
    font-weight: bold;
    flex-shrink: 0;
  }
`;

const EditorialAddonsTitle = styled(AddonsTitle)`
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
  letter-spacing: 0.05em;
  margin-top: auto;
  padding-top: 1.5rem;
`;

const EditorialAddon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: ${p => p.$included ? 'rgba(196, 30, 58, 0.05)' : '#F5F5F5'};
  border: 1px solid ${p => p.$included ? '#C41E3A' : '#E5E5E5'};
`;

const EditorialAddonInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const EditorialAddonCheck = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid ${p => p.$included ? '#C41E3A' : '#CCC'};
  background: ${p => p.$included ? '#C41E3A' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #fff;
`;

const EditorialAddonName = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
`;

const EditorialAddonPrice = styled.span`
  font-family: 'Oswald', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${p => p.$included ? '#C41E3A' : '#666'};
`;

const EditorialCTA = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  font-family: 'Oswald', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  ${p => p.$pop ? css`
    background: #C41E3A;
    color: #fff;
    &:hover { background: #a01830; }
  ` : css`
    background: transparent;
    color: #0A0A0A;
    border: 2px solid #0A0A0A;
    &:hover { background: #0A0A0A; color: #fff; }
  `}
`;

// ============================================
// CLASSIC THEME
// ============================================



















// ============================================
// BOTANICAL THEME
// ============================================
const BotanicalSection = styled(Section)`
  background: transparent;
  position: relative;
  z-index: 10;
`;

const BotanicalEyebrow = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.55rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1rem;
`;

const BotanicalTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: rgba(255,255,255,0.95);
`;

const BotanicalCard = styled.div`
  background: rgba(255,255,255,${p => p.$pop ? '0.1' : '0.06'});
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255,255,255,${p => p.$pop ? '0.25' : '0.1'});
  border-radius: 24px;
  padding: 2.5rem;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const BotanicalCardName = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: rgba(255,255,255,0.95);
  margin-bottom: 0.5rem;
`;

const BotanicalCardPrice = styled.div`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 300;
  color: rgba(255,255,255,0.95);
  margin-bottom: 0.25rem;
  
  span { font-size: 1.2rem; color: rgba(255,255,255,0.5); }
`;

const BotanicalCardDuration = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 1.5rem;
`;

const BotanicalFeatureList = styled.ul`
  margin-bottom: 1.5rem;
  flex: 1;
`;

const BotanicalFeature = styled.li`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  padding: 0.4rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  &::before {
    content: '·';
    color: rgba(255,255,255,0.4);
    flex-shrink: 0;
  }
`;

const BotanicalAddonsTitle = styled(AddonsTitle)`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  color: rgba(255,255,255,0.8);
  margin-top: auto;
  padding-top: 1.5rem;
`;

const BotanicalAddon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
`;

const BotanicalAddonInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const BotanicalAddonCheck = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid ${p => p.$included ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'};
  border-radius: 50%;
  background: ${p => p.$included ? 'rgba(255,255,255,0.2)' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: rgba(255,255,255,0.8);
`;

const BotanicalAddonName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.7);
`;

const BotanicalAddonPrice = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: ${p => p.$included ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.6)'};
`;

const BotanicalCTA = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  border: none;
  
  ${p => p.$pop ? css`
    background: rgba(255,255,255,0.95);
    color: #040604;
    &:hover { transform: translateY(-2px); }
  ` : css`
    background: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.9);
    border: 1px solid rgba(255,255,255,0.2);
    &:hover { background: rgba(255,255,255,0.15); }
  `}
`;

// ============================================
// CONTEMPORARY THEME
// ============================================
const ContemporarySection = styled(Section)`
  background: #FFE66D;
`;

const ContemporaryEyebrow = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 0.5rem;
`;

const ContemporaryTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
`;

const ContemporaryCard = styled.div`
  background: #fff;
  border: 3px solid #0D0D0D;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: ${p => p.$pop ? '8px 8px 0 #FF6B6B' : '6px 6px 0 #0D0D0D'};
  display: flex;
  flex-direction: column;
  
  ${p => p.$pop && css`
    &::before {
      content: '🔥 POPULAR';
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      background: #FF6B6B;
      color: #fff;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.4rem 1rem;
      border: 2px solid #0D0D0D;
    }
  `}
  
  &:hover {
    transform: translate(-4px, -4px);
    box-shadow: ${p => p.$pop ? '12px 12px 0 #FF6B6B' : '10px 10px 0 #0D0D0D'};
  }
`;

const ContemporaryCardName = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 0.5rem;
`;

const ContemporaryCardPrice = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${p => p.$pop ? '#FF6B6B' : '#0D0D0D'};
  margin-bottom: 0.25rem;
  
  span { font-size: 1.2rem; }
`;

const ContemporaryCardDuration = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const ContemporaryFeatureList = styled.ul`
  margin-bottom: 1.5rem;
  flex: 1;
`;

const ContemporaryFeature = styled.li`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: #444;
  padding: 0.4rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  &::before {
    content: '→';
    color: #4ECDC4;
    font-weight: bold;
    flex-shrink: 0;
  }
`;

const ContemporaryAddonsTitle = styled(AddonsTitle)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-top: auto;
  padding-top: 1.5rem;
`;

const ContemporaryAddon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.75rem;
  background: ${p => p.$included ? 'rgba(78, 205, 196, 0.15)' : '#F5F5F5'};
  border: 2px solid ${p => p.$included ? '#4ECDC4' : '#E5E5E5'};
`;

const ContemporaryAddonInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ContemporaryAddonCheck = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid ${p => p.$included ? '#4ECDC4' : '#999'};
  background: ${p => p.$included ? '#4ECDC4' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #fff;
`;

const ContemporaryAddonName = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
`;

const ContemporaryAddonPrice = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: ${p => p.$included ? '#4ECDC4' : '#666'};
`;

const ContemporaryCTA = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid #0D0D0D;
  
  ${p => p.$pop ? css`
    background: #FF6B6B;
    color: #fff;
    box-shadow: 4px 4px 0 #0D0D0D;
    &:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #0D0D0D; }
  ` : css`
    background: transparent;
    color: #0D0D0D;
    &:hover { background: #4ECDC4; }
  `}
`;

// ============================================
// LUXE THEME
// ============================================
const LuxeSection = styled(Section)`
  background: #0A0A0A;
`;

const LuxeEyebrow = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #C9A962;
  margin-bottom: 1rem;
`;

const LuxeTitle = styled.h2`
  font-family: 'Cormorant', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
`;

const LuxeCard = styled.div`
  background: ${p => p.$pop ? 'rgba(201, 169, 98, 0.05)' : 'transparent'};
  border: 1px solid ${p => p.$pop ? '#C9A962' : 'rgba(248, 246, 243, 0.15)'};
  padding: 2.5rem;
  position: relative;
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;
  
  ${p => p.$pop && css`
    &::before {
      content: 'Empfohlen';
      position: absolute;
      top: -1px;
      left: 50%;
      transform: translateX(-50%);
      background: #C9A962;
      color: #0A0A0A;
      font-family: 'Outfit', sans-serif;
      font-size: 0.6rem;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      padding: 0.5rem 1.5rem;
    }
  `}
`;

const LuxeCardName = styled.h3`
  font-family: 'Cormorant', serif;
  font-size: 1.6rem;
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
  margin-bottom: 0.5rem;
`;

const LuxeCardPrice = styled.div`
  font-family: 'Cormorant', serif;
  font-size: 2.5rem;
  font-weight: 300;
  color: ${p => p.$pop ? '#C9A962' : '#F8F6F3'};
  margin-bottom: 0.25rem;
  
  span { font-size: 1.2rem; color: rgba(248,246,243,0.5); }
`;

const LuxeCardDuration = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: rgba(248, 246, 243, 0.4);
  margin-bottom: 1.5rem;
`;

const LuxeFeatureList = styled.ul`
  margin-bottom: 1.5rem;
  flex: 1;
`;

const LuxeFeature = styled.li`
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(248, 246, 243, 0.6);
  padding: 0.4rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  &::before {
    content: '—';
    color: #C9A962;
    flex-shrink: 0;
  }
`;

const LuxeAddonsTitle = styled(AddonsTitle)`
  font-family: 'Cormorant', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(248, 246, 243, 0.7);
  margin-top: auto;
  padding-top: 1.5rem;
`;

const LuxeAddon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(248, 246, 243, 0.08);
`;

const LuxeAddonInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LuxeAddonCheck = styled.div`
  width: 14px;
  height: 14px;
  border: 1px solid ${p => p.$included ? '#C9A962' : 'rgba(248, 246, 243, 0.3)'};
  background: ${p => p.$included ? '#C9A962' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.55rem;
  color: #0A0A0A;
`;

const LuxeAddonName = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(248, 246, 243, 0.6);
`;

const LuxeAddonPrice = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  color: ${p => p.$included ? '#C9A962' : 'rgba(248, 246, 243, 0.5)'};
`;

const LuxeCTA = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.5s ease;
  border: none;
  
  ${p => p.$pop ? css`
    background: #C9A962;
    color: #0A0A0A;
    &:hover { background: #d4b66f; }
  ` : css`
    background: transparent;
    color: #F8F6F3;
    border: 1px solid rgba(248, 246, 243, 0.3);
    &:hover { border-color: #C9A962; color: #C9A962; }
  `}
`;

// ============================================
// NEON THEME
// ============================================
const NeonSection = styled(Section)`
  background: #0a0a0f;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 20% 20%, rgba(0,255,255,0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const NeonEyebrow = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0,255,255,0.5);
  margin-bottom: 0.5rem;
`;

const NeonTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
`;

const NeonCard = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid ${p => p.$pop ? '#00ffff' : 'rgba(0,255,255,0.2)'};
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  ${p => p.$pop && css`
    box-shadow: 0 0 30px rgba(0,255,255,0.2);
  `}
  
  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0,255,255,0.2);
  }
`;

const NeonCardName = styled.h3`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const NeonCardPrice = styled.div`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${p => p.$pop ? '#00ffff' : '#fff'};
  text-shadow: ${p => p.$pop ? '0 0 20px rgba(0,255,255,0.5)' : 'none'};
  margin-bottom: 0.25rem;
  
  span { font-size: 1.2rem; color: rgba(255,255,255,0.4); }
`;

const NeonCardDuration = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 1.5rem;
`;

const NeonFeatureList = styled.ul`
  margin-bottom: 1.5rem;
  flex: 1;
`;

const NeonFeature = styled.li`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  padding: 0.4rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  &::before {
    content: '>';
    color: #00ff88;
    flex-shrink: 0;
  }
`;

const NeonAddonsTitle = styled(AddonsTitle)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #ff00ff;
  text-shadow: 0 0 10px rgba(255,0,255,0.5);
  margin-top: auto;
  padding-top: 1.5rem;
`;

const NeonAddon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0,255,255,0.1);
`;

const NeonAddonInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const NeonAddonCheck = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid ${p => p.$included ? '#00ff88' : 'rgba(255,255,255,0.3)'};
  background: ${p => p.$included ? 'rgba(0,255,136,0.2)' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: #00ff88;
  box-shadow: ${p => p.$included ? '0 0 10px rgba(0,255,136,0.3)' : 'none'};
`;

const NeonAddonName = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
`;

const NeonAddonPrice = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: ${p => p.$included ? '#00ff88' : 'rgba(255,255,255,0.5)'};
  text-shadow: ${p => p.$included ? '0 0 5px rgba(0,255,136,0.5)' : 'none'};
`;

const NeonCTA = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  ${p => p.$pop ? css`
    background: transparent;
    color: #00ffff;
    border: 1px solid #00ffff;
    box-shadow: 0 0 15px rgba(0,255,255,0.3);
    &:hover { background: rgba(0,255,255,0.1); box-shadow: 0 0 25px rgba(0,255,255,0.5); }
  ` : css`
    background: transparent;
    color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.2);
    &:hover { border-color: #ff00ff; color: #ff00ff; }
  `}
`;

// ============================================
// VIDEO THEME
// ============================================
const VideoSection = styled(Section)`
  background: #0A0A0A;
`;

const VideoEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #6B8CAE;
  margin-bottom: 1rem;
`;

const VideoTitle = styled.h2`
  font-family: 'Manrope', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #fff;
`;

const VideoCard = styled.div`
  background: ${p => p.$pop ? 'rgba(107, 140, 174, 0.05)' : 'transparent'};
  border: 1px solid ${p => p.$pop ? '#6B8CAE' : 'rgba(255,255,255,0.1)'};
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  ${p => p.$pop && css`
    &::before {
      content: 'Empfohlen';
      position: absolute;
      top: -1px;
      left: 50%;
      transform: translateX(-50%);
      background: #6B8CAE;
      color: #0A0A0A;
      font-family: 'Inter', sans-serif;
      font-size: 0.6rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      padding: 0.4rem 1rem;
    }
  `}
  
  &:hover {
    border-color: #6B8CAE;
  }
`;

const VideoCardName = styled.h3`
  font-family: 'Manrope', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const VideoCardPrice = styled.div`
  font-family: 'Manrope', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${p => p.$pop ? '#6B8CAE' : '#fff'};
  margin-bottom: 0.25rem;
  
  span { font-size: 1.2rem; color: #888; }
`;

const VideoCardDuration = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 1.5rem;
`;

const VideoFeatureList = styled.ul`
  margin-bottom: 1.5rem;
  flex: 1;
`;

const VideoFeature = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #B0B0B0;
  padding: 0.4rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  &::before {
    content: '✓';
    color: #6B8CAE;
    flex-shrink: 0;
  }
`;

const VideoAddonsTitle = styled(AddonsTitle)`
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(255,255,255,0.7);
  margin-top: auto;
  padding-top: 1.5rem;
`;

const VideoAddon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
`;

const VideoAddonInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const VideoAddonCheck = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid ${p => p.$included ? '#6B8CAE' : 'rgba(255,255,255,0.3)'};
  background: ${p => p.$included ? '#6B8CAE' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: #0A0A0A;
`;

const VideoAddonName = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #B0B0B0;
`;

const VideoAddonPrice = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: ${p => p.$included ? '#6B8CAE' : 'rgba(255,255,255,0.5)'};
`;

const VideoCTA = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  
  ${p => p.$pop ? css`
    background: #6B8CAE;
    color: #0A0A0A;
    &:hover { background: #7d9cba; }
  ` : css`
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255,255,255,0.3);
    &:hover { border-color: #6B8CAE; color: #6B8CAE; }
  `}
`;

// ============================================
// MAIN COMPONENT
// ============================================
// ════════════════════════════════════════════════════════════════════════
// BRAND PRICING (Classic-Basis) — Editorial Pricing Sheet, kein SaaS-Grid
// Warme Sandfläche, große Zahlen, zwei Wege statt Feature-Matrix.
// ════════════════════════════════════════════════════════════════════════
// Die Sandfläche ist eine eigene, abgerundete Karte im Ivory — nicht mehr
// eine randlose Vollflächen-Section. Links läuft ein warmes Detailmotiv ein.
const BrandPricingSection = styled.section`
  position: relative;
  padding: clamp(2rem, 5vh, 4rem) ${layout.gutter};
  background: ${brand.ivory};
`;

const Sheet = styled.div`
  position: relative;
  max-width: ${layout.wide};
  margin: 0 auto;
  padding: clamp(2.5rem, 6vh, 5rem) clamp(1.5rem, 4vw, 4rem);
  background: ${brand.sand};
  border-radius: 20px;
  overflow: hidden;

  /* Hochzeitsmotiv links, weich in die Sandfläche auslaufend */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: clamp(220px, 26%, 420px);
    /* rechter Bildausschnitt: links liegt im Motiv nur Beiwerk */
    background: url(${images.pricingDetail}) right center / cover no-repeat;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: clamp(280px, 46%, 720px);
    /* Fade beginnt erst spät: das Motiv läuft weit hinter die Karten */
    background: linear-gradient(
      to right,
      rgba(232, 225, 217, 0) 0%,
      rgba(232, 225, 217, 0.18) 58%,
      rgba(232, 225, 217, 0.72) 84%,
      ${brand.sand} 100%
    );
  }

  > * { position: relative; z-index: 2; }

  @media (max-width: 860px) {
    padding-top: clamp(11rem, 26vh, 15rem);

    &::before, &::after {
      right: 0;
      bottom: auto;
      width: auto;
      height: clamp(9rem, 22vh, 13rem);
    }
    &::after {
      background: linear-gradient(
        to bottom,
        rgba(232, 225, 217, 0) 40%,
        ${brand.sand} 100%
      );
    }
  }
`;

const BrandContainer = styled.div`
  position: relative;
  max-width: ${layout.wide};
  margin: 0 auto;
  padding: 0 ${layout.gutter};
`;

const BrandHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(3rem, 6vh, 4.5rem);
`;

const BrandEyebrow = styled.p`
  ${eyebrowStyle}
  color: ${brand.olive};
  margin-bottom: 1.25rem;
`;

const BrandH2 = styled.h2`
  font-family: ${font.serif};
  font-weight: 400;
  font-size: ${type.h2};
  line-height: ${leading.h2};
  letter-spacing: -0.01em;
  color: ${brand.charcoal};
  margin: 0;
`;

const BrandSub = styled.p`
  font-family: ${font.sans};
  font-size: ${type.body};
  line-height: ${leading.body};
  color: ${brand.inkSoft};
  max-width: 48ch;
  margin: 1.25rem auto 0;
`;

// Zwei Pakete + schmale Add-on-Spalte — bewusst ungleich gewichtet
const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.72fr;
  gap: clamp(1.25rem, 2.2vw, 2rem);
  /* stretch statt start: alle drei Spalten gleich hoch. Der Reiter der
     All-In-Karte sitzt darüber, deshalb bekommen alle denselben Abstand
     nach oben — sonst startet die hervorgehobene Karte tiefer. */
  align-items: stretch;
  padding-top: 1.4rem;

  @media (max-width: 1100px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 760px)  { grid-template-columns: 1fr; }
`;

const BrandCard = styled.div`
  position: relative;
  background: ${p => (p.$pop ? '#FFFFFF' : 'rgba(255,255,255,0.72)')};
  border: 1px solid ${p => (p.$pop ? 'rgba(104,111,92,0.45)' : brand.line)};
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  padding: clamp(2.5rem, 4vw, 3.75rem) clamp(1.75rem, 3vw, 3rem)
           clamp(2.5rem, 4vw, 3.25rem);
  ${p => p.$pop && `box-shadow: 0 24px 60px rgba(34,34,34,0.10);`}
`;

// Reiter, der oben aus der Karte herauswächst — wie im Mockup
const PopBadge = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  padding: 0.45rem 1.4rem;
  background: ${brand.olive};
  color: ${brand.ivory};
  border-radius: 10px 10px 0 0;
  ${eyebrowStyle}
  font-size: 0.62rem;
  white-space: nowrap;
`;

const BrandPkgName = styled.h3`
  ${eyebrowStyle}
  font-size: 0.75rem;
  color: ${brand.inkMuted};
  margin: 0 0 1rem;
`;

const BrandPrice = styled.div`
  font-family: ${font.serif};
  font-weight: 400;
  font-size: clamp(3rem, 5.5vw, 5rem);
  line-height: 1;
  color: ${brand.charcoal};
  margin-bottom: 1.1rem;
`;

const BrandPitch = styled.p`
  font-family: ${font.sans};
  font-size: 1.05rem;
  line-height: 1.55;
  color: ${brand.inkSoft};
  margin: 0 0 1.75rem;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid ${brand.line};
`;

const BrandList = styled.ul`
  list-style: none;
  /* auto schiebt den CTA an den unteren Kartenrand — dadurch stehen beide
     Buttons trotz unterschiedlich langer Listen auf einer Linie */
  margin: 0 0 auto;
  padding: 0 0 2rem;
`;

const BrandListItem = styled.li`
  position: relative;
  padding-left: 1.6rem;
  margin-bottom: 0.7rem;
  font-family: ${font.sans};
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${brand.ink};

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${brand.olive};
    font-size: 0.85rem;
  }
`;

const BrandCardCTA = styled.button`
  ${p => (p.$pop ? buttonPrimary : buttonSecondary)}
  width: 100%;
  justify-content: center;
  border-radius: 999px;
  ${p => (p.$pop
    ? `background: ${brand.olive}; border-color: ${brand.olive};
       &:hover { background: ${brand.charcoal}; border-color: ${brand.charcoal}; }`
    : `border-color: ${brand.charcoal};`)}
`;

// Add-ons: dritte, ruhigere Spalte — nie die Hauptaufmerksamkeit
const AddonPanel = styled.aside`
  align-self: start;
  background: rgba(255,255,255,0.55);
  border: 1px solid ${brand.line};
  border-radius: 18px;
  padding: clamp(1.5rem, 2.2vw, 2rem);

  @media (max-width: 1100px) { grid-column: 1 / -1; }
`;

const AddonPanelTitle = styled.p`
  ${eyebrowStyle}
  font-size: 0.68rem;
  color: ${brand.inkMuted};
  margin-bottom: 1.5rem;
`;

const AddonRowItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid ${brand.lineSoft};

  &:last-child { border-bottom: none; }

  .name {
    font-family: ${font.sans};
    font-size: 0.9rem;
    color: ${brand.ink};
  }
  .desc {
    display: block;
    font-size: 0.75rem;
    color: ${brand.inkMuted};
    margin-top: 0.15rem;
  }
  .price {
    font-family: ${font.serif};
    font-size: 1.15rem;
    color: ${brand.charcoal};
    white-space: nowrap;
  }
`;

const PricingNote = styled.span`
  ${scriptNote}
  position: absolute;
  left: clamp(1rem, 4vw, 3rem);
  top: -1.5rem;
  color: ${brand.olive};

  @media (max-width: 1200px) { display: none; }
`;

const PricingSection = () => {
  const { currentTheme } = useTheme();
  
  const scrollToContact = (packageId) => {
    if (packageId) {
      // Set hash so ContactSection can pick it up
      window.history.replaceState(null, '', `#contact?package=${packageId}`);
      // Dispatch custom event for ContactSection to listen to
      window.dispatchEvent(new CustomEvent('selectPackage', { detail: packageId }));
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderAddon = (addon, pkgAddons, AddonRow, AddonInfo, AddonCheck, AddonName, AddonPrice) => {
    const addonData = pkgAddons[addon.id];
    return (
      <AddonRow key={addon.id} $included={addonData.included}>
        <AddonInfo>
          <AddonCheck $included={addonData.included}>
            {addonData.included && '✓'}
          </AddonCheck>
          <AddonName>{addon.name}</AddonName>
        </AddonInfo>
        <AddonPrice $included={addonData.included}>
          {addonData.included ? 'Im Paket' : `+${addonData.price}€`}
        </AddonPrice>
      </AddonRow>
    );
  };

  // Theme-spezifische OnRequest Box Styles
  const getOnRequestStyles = () => {
    switch(currentTheme) {
      case 'editorial':
        return {
          box: { background: '#fff', border: '1px solid #E5E5E5' },
          title: { fontFamily: "'Oswald', sans-serif", fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', color: '#0A0A0A' },
          items: { fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#666' },
          note: { fontFamily: "'Source Serif 4', serif", fontSize: '0.95rem', color: '#C41E3A' }
        };
      case 'classic':
        return {
          box: { background: '#fff', border: '1px solid rgba(0,0,0,0.08)' },
          title: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 300, color: '#1A1A1A' },
          items: { fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.9rem', fontWeight: 300, color: '#555' },
          note: { fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', fontStyle: 'italic', color: '#999999' }
        };
      case 'botanical':
        return {
          box: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px' },
          title: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 400, color: 'rgba(255,255,255,0.9)' },
          items: { fontFamily: "'Montserrat', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' },
          note: { fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: 'rgba(255,255,255,0.7)' }
        };
      case 'contemporary':
        return {
          box: { background: '#fff', border: '3px solid #0D0D0D', boxShadow: '6px 6px 0 #4ECDC4' },
          title: { fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', color: '#0D0D0D' },
          items: { fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: '#525252' },
          note: { fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 600, color: '#FF6B6B' }
        };
      case 'luxe':
        return {
          box: { background: 'rgba(201,169,98,0.05)', border: '1px solid rgba(201,169,98,0.3)' },
          title: { fontFamily: "'Cormorant', serif", fontSize: '1.3rem', fontWeight: 300, fontStyle: 'italic', color: '#F8F6F3' },
          items: { fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 300, color: 'rgba(248,246,243,0.6)' },
          note: { fontFamily: "'Cormorant', serif", fontSize: '1rem', fontStyle: 'italic', color: '#C9A962' }
        };
      case 'neon':
        return {
          box: { background: 'rgba(0,255,255,0.02)', border: '1px solid rgba(0,255,255,0.2)' },
          title: { fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 600, textTransform: 'uppercase', color: '#00ffff', textShadow: '0 0 10px rgba(0,255,255,0.5)' },
          items: { fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' },
          note: { fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: '#ff00ff', textShadow: '0 0 10px rgba(255,0,255,0.5)' }
        };
      default: // video
        return {
          box: { background: 'rgba(107,140,174,0.05)', border: '1px solid rgba(255,255,255,0.1)' },
          title: { fontFamily: "'Manrope', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#fff' },
          items: { fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#B0B0B0' },
          note: { fontFamily: "'Manrope', sans-serif", fontSize: '0.9rem', color: '#6B8CAE' }
        };
    }
  };

  const renderOnRequest = () => {
    const styles = getOnRequestStyles();
    return (
      <OnRequestBox style={styles.box}>
        <OnRequestTitle style={styles.title}>Auf Anfrage</OnRequestTitle>
        <OnRequestItems style={styles.items}>
          {ON_REQUEST_ITEMS.join(' · ')}
        </OnRequestItems>
        <OnRequestNote style={styles.note}>
          Preislich finden wir da sicher zusammen ;)
        </OnRequestNote>
      </OnRequestBox>
    );
  };

  const renderVoucher = () => {
    const isDark = ['botanical', 'luxe', 'neon', 'video'].includes(currentTheme);
    const isContemporary = currentTheme === 'contemporary';
    return (
      <div style={{
        marginTop: '1.5rem',
        padding: '1.25rem 1.75rem',
        background: isDark ? 'rgba(245, 158, 11, 0.08)' : isContemporary ? '#fff' : '#FFF9F0',
        border: isContemporary ? '3px solid #F59E0B' : `2px solid ${isDark ? 'rgba(245,158,11,0.4)' : '#F59E0B'}`,
        borderRadius: isContemporary ? '0' : '4px',
        boxShadow: isContemporary ? '4px 4px 0 #F59E0B' : 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        flexWrap: 'wrap',
      }}>
        <div style={{ fontSize: '1.75rem', flexShrink: 0 }}>🎁</div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <p style={{
            margin: '0 0 4px 0',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: isDark ? 'rgba(245,158,11,0.7)' : '#92400E',
          }}>Exklusiv für alle Pakete</p>
          <p style={{
            margin: '0 0 6px 0',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: isDark ? '#fff' : '#1A1A1A',
          }}>15 € Gutschein auf Karten – ohne Mindestbestellwert</p>
          <p style={{
            margin: 0,
            fontSize: '0.8rem',
            color: isDark ? 'rgba(255,255,255,0.55)' : '#666',
            lineHeight: 1.5,
          }}>
            Einlösbar bei{' '}
            <a
              href="https://www.hochzeitsplaza.de"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: isDark ? '#F59E0B' : '#D97706', fontWeight: 600, textDecoration: 'underline' }}
            >
              hochzeitsplaza.de
            </a>
            {' '}– euer persönlicher Code kommt mit der Willkommensmail.
          </p>
        </div>
      </div>
    );
  };

  // CLASSIC
  // CLASSIC — Brand Pricing Sheet (visuelles Redesign Sep 2026).
  // Die Frage lautet nicht "welche Funktionen", sondern "wie viel übernehmt
  // ihr selbst". Deshalb zwei Wege statt Feature-Matrix, Add-ons daneben.
  if (currentTheme === 'classic') {
    const pitches = {
      website: 'Ihr macht den Inhalt.\nWir machen den Feinschliff.',
      all_in: 'Ihr liefert Material.\nWir machen den Rest.',
    };
    const highlights = {
      website: [
        'Alle Komponenten inklusive',
        'Gemeinsame Design-Abstimmung',
        'Ihr pflegt eure Inhalte ein',
        'Wir prüfen & verfeinern',
        'QR-Code inklusive',
      ],
      all_in: [
        'Alle Komponenten inklusive',
        'Wir übernehmen den kompletten Aufbau',
        'Save the Date inklusive',
        'Wedding Archive inklusive',
        'QR-Code inklusive',
      ],
    };

    return (
      <BrandPricingSection id="pricing">
        <Sheet>
        <BrandContainer>
          <PricingNote>Zwei Wege.<br />Ein Ergebnis.</PricingNote>
          <BrandHeader>
            <BrandEyebrow>Unsere Pakete</BrandEyebrow>
            <BrandH2>Wie viel möchtet ihr selbst übernehmen?</BrandH2>
            <BrandSub>
              Zwei Wege. Das gleiche Ziel: eine Hochzeitswebsite, die wirklich
              zu euch passt. Der Unterschied ist die Arbeit, nicht der
              Funktionsumfang.
            </BrandSub>
          </BrandHeader>

          <BrandGrid>
            {PACKAGES.map(pkg => (
              <BrandCard key={pkg.id} $pop={pkg.popular}>
                {pkg.popular && <PopBadge>Beliebteste Wahl</PopBadge>}
                <BrandPkgName>{pkg.name}</BrandPkgName>
                <BrandPrice>{pkg.price} €</BrandPrice>
                <BrandPitch>
                  {(pitches[pkg.id] || pkg.tagline || '').split('\n').map((line, i) => (
                    <React.Fragment key={i}>{line}<br /></React.Fragment>
                  ))}
                </BrandPitch>
                <BrandList>
                  {(highlights[pkg.id] || pkg.features.slice(0, 5)).map((f, i) => (
                    <BrandListItem key={i}>{f}</BrandListItem>
                  ))}
                </BrandList>
                <BrandCardCTA
                  type="button"
                  $pop={pkg.popular}
                  onClick={() => scrollToContact(pkg.id)}
                >
                  {pkg.cta} →
                </BrandCardCTA>
              </BrandCard>
            ))}

            <AddonPanel>
              <AddonPanelTitle>Optional zubuchbar</AddonPanelTitle>
              {ADDONS.map(addon => {
                // Preis aus der zentralen Preislogik, nicht doppelt gepflegt
                const priced = PACKAGES.find(p => p.addons[addon.id] && !p.addons[addon.id].included);
                const price = priced ? priced.addons[addon.id].price : null;
                return (
                  <AddonRowItem key={addon.id}>
                    <span className="name">
                      {addon.name}
                      <span className="desc">{addon.desc}</span>
                    </span>
                    {price !== null && <span className="price">{price} €</span>}
                  </AddonRowItem>
                );
              })}
            </AddonPanel>
          </BrandGrid>

          {renderVoucher()}
        </BrandContainer>
        </Sheet>
      </BrandPricingSection>
    );
  }

  if (currentTheme === 'editorial') {
    return (
      <EditorialSection id="pricing">
        <Container>
          <Header>
            <EditorialEyebrow>Preise</EditorialEyebrow>
            <EditorialTitle>Findet euer Paket</EditorialTitle>
          </Header>
          <Grid>
            {PACKAGES.map(pkg => (
              <EditorialCard key={pkg.id} $pop={pkg.popular}>
                <EditorialCardName>{pkg.name}</EditorialCardName>
                {pkg.tagline && <PkgTagline>{pkg.tagline}</PkgTagline>}
                <EditorialCardPrice $pop={pkg.popular}>
                  <span>€</span>{pkg.price}
                </EditorialCardPrice>
                <EditorialCardDuration>{pkg.duration}</EditorialCardDuration>
                <EditorialFeatureList>
                  {pkg.features.map((f, i) => <EditorialFeature key={i}>{f}</EditorialFeature>)}
                </EditorialFeatureList>
                <EditorialAddonsTitle>Zusatzoptionen</EditorialAddonsTitle>
                <AddonsList>
                  {ADDONS.map(addon => renderAddon(addon, pkg.addons, EditorialAddon, EditorialAddonInfo, EditorialAddonCheck, EditorialAddonName, EditorialAddonPrice))}
                </AddonsList>
                <EditorialCTA $pop={pkg.popular} onClick={() => scrollToContact(pkg.id)}>{pkg.cta}</EditorialCTA>
              </EditorialCard>
            ))}
          </Grid>
          {renderOnRequest()}
          {renderVoucher()}
        </Container>
      </EditorialSection>
    );
  }

  // BOTANICAL
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="pricing">
        <Container>
          <Header>
            <BotanicalEyebrow>Preise</BotanicalEyebrow>
            <BotanicalTitle>Findet euer Paket</BotanicalTitle>
          </Header>
          <Grid>
            {PACKAGES.map(pkg => (
              <BotanicalCard key={pkg.id} $pop={pkg.popular}>
                <BotanicalCardName>{pkg.name}</BotanicalCardName>
                {pkg.tagline && <PkgTagline>{pkg.tagline}</PkgTagline>}
                <BotanicalCardPrice $pop={pkg.popular}>
                  <span>€</span>{pkg.price}
                </BotanicalCardPrice>
                <BotanicalCardDuration>{pkg.duration}</BotanicalCardDuration>
                <BotanicalFeatureList>
                  {pkg.features.map((f, i) => <BotanicalFeature key={i}>{f}</BotanicalFeature>)}
                </BotanicalFeatureList>
                <BotanicalAddonsTitle>Zusatzoptionen</BotanicalAddonsTitle>
                <AddonsList>
                  {ADDONS.map(addon => renderAddon(addon, pkg.addons, BotanicalAddon, BotanicalAddonInfo, BotanicalAddonCheck, BotanicalAddonName, BotanicalAddonPrice))}
                </AddonsList>
                <BotanicalCTA $pop={pkg.popular} onClick={() => scrollToContact(pkg.id)}>{pkg.cta}</BotanicalCTA>
              </BotanicalCard>
            ))}
          </Grid>
          {renderOnRequest()}
          {renderVoucher()}
        </Container>
      </BotanicalSection>
    );
  }

  // CONTEMPORARY
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="pricing">
        <Container>
          <Header>
            <ContemporaryEyebrow>💰 Preise</ContemporaryEyebrow>
            <ContemporaryTitle>Pick your Plan</ContemporaryTitle>
          </Header>
          <Grid>
            {PACKAGES.map(pkg => (
              <ContemporaryCard key={pkg.id} $pop={pkg.popular}>
                <ContemporaryCardName>{pkg.name}</ContemporaryCardName>
                {pkg.tagline && <PkgTagline>{pkg.tagline}</PkgTagline>}
                <ContemporaryCardPrice $pop={pkg.popular}>
                  <span>€</span>{pkg.price}
                </ContemporaryCardPrice>
                <ContemporaryCardDuration>{pkg.duration}</ContemporaryCardDuration>
                <ContemporaryFeatureList>
                  {pkg.features.map((f, i) => <ContemporaryFeature key={i}>{f}</ContemporaryFeature>)}
                </ContemporaryFeatureList>
                <ContemporaryAddonsTitle>Add-ons</ContemporaryAddonsTitle>
                <AddonsList>
                  {ADDONS.map(addon => renderAddon(addon, pkg.addons, ContemporaryAddon, ContemporaryAddonInfo, ContemporaryAddonCheck, ContemporaryAddonName, ContemporaryAddonPrice))}
                </AddonsList>
                <ContemporaryCTA $pop={pkg.popular} onClick={() => scrollToContact(pkg.id)}>{pkg.cta}</ContemporaryCTA>
              </ContemporaryCard>
            ))}
          </Grid>
          {renderOnRequest()}
          {renderVoucher()}
        </Container>
      </ContemporarySection>
    );
  }

  // LUXE
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="pricing">
        <Container>
          <Header>
            <LuxeEyebrow>Preise</LuxeEyebrow>
            <LuxeTitle>Findet euer Paket</LuxeTitle>
          </Header>
          <Grid>
            {PACKAGES.map(pkg => (
              <LuxeCard key={pkg.id} $pop={pkg.popular}>
                <LuxeCardName>{pkg.name}</LuxeCardName>
                {pkg.tagline && <PkgTagline>{pkg.tagline}</PkgTagline>}
                <LuxeCardPrice $pop={pkg.popular}>
                  <span>€</span>{pkg.price}
                </LuxeCardPrice>
                <LuxeCardDuration>{pkg.duration}</LuxeCardDuration>
                <LuxeFeatureList>
                  {pkg.features.map((f, i) => <LuxeFeature key={i}>{f}</LuxeFeature>)}
                </LuxeFeatureList>
                <LuxeAddonsTitle>Zusatzoptionen</LuxeAddonsTitle>
                <AddonsList>
                  {ADDONS.map(addon => renderAddon(addon, pkg.addons, LuxeAddon, LuxeAddonInfo, LuxeAddonCheck, LuxeAddonName, LuxeAddonPrice))}
                </AddonsList>
                <LuxeCTA $pop={pkg.popular} onClick={() => scrollToContact(pkg.id)}>{pkg.cta}</LuxeCTA>
              </LuxeCard>
            ))}
          </Grid>
          {renderOnRequest()}
          {renderVoucher()}
        </Container>
      </LuxeSection>
    );
  }

  // NEON
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="pricing">
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Header>
            <NeonEyebrow>// pricing.plans</NeonEyebrow>
            <NeonTitle>Select Package</NeonTitle>
          </Header>
          <Grid>
            {PACKAGES.map(pkg => (
              <NeonCard key={pkg.id} $pop={pkg.popular}>
                <NeonCardName>{pkg.name}</NeonCardName>
                {pkg.tagline && <PkgTagline>{pkg.tagline}</PkgTagline>}
                <NeonCardPrice $pop={pkg.popular}>
                  <span>€</span>{pkg.price}
                </NeonCardPrice>
                <NeonCardDuration>{pkg.duration}</NeonCardDuration>
                <NeonFeatureList>
                  {pkg.features.map((f, i) => <NeonFeature key={i}>{f}</NeonFeature>)}
                </NeonFeatureList>
                <NeonAddonsTitle>// add-ons</NeonAddonsTitle>
                <AddonsList>
                  {ADDONS.map(addon => renderAddon(addon, pkg.addons, NeonAddon, NeonAddonInfo, NeonAddonCheck, NeonAddonName, NeonAddonPrice))}
                </AddonsList>
                <NeonCTA $pop={pkg.popular} onClick={() => scrollToContact(pkg.id)}>{pkg.cta}</NeonCTA>
              </NeonCard>
            ))}
          </Grid>
          {renderOnRequest()}
          {renderVoucher()}
        </Container>
      </NeonSection>
    );
  }

  // VIDEO (Default)
  return (
    <VideoSection id="pricing">
      <Container>
        <Header>
          <VideoEyebrow>Preise</VideoEyebrow>
          <VideoTitle>Findet euer Paket</VideoTitle>
        </Header>
        <Grid>
          {PACKAGES.map(pkg => (
            <VideoCard key={pkg.id} $pop={pkg.popular}>
              <VideoCardName>{pkg.name}</VideoCardName>
              {pkg.tagline && <PkgTagline>{pkg.tagline}</PkgTagline>}
              <VideoCardPrice $pop={pkg.popular}>
                <span>€</span>{pkg.price}
              </VideoCardPrice>
              <VideoCardDuration>{pkg.duration}</VideoCardDuration>
              <VideoFeatureList>
                {pkg.features.map((f, i) => <VideoFeature key={i}>{f}</VideoFeature>)}
              </VideoFeatureList>
              <VideoAddonsTitle>Zusatzoptionen</VideoAddonsTitle>
              <AddonsList>
                {ADDONS.map(addon => renderAddon(addon, pkg.addons, VideoAddon, VideoAddonInfo, VideoAddonCheck, VideoAddonName, VideoAddonPrice))}
              </AddonsList>
              <VideoCTA $pop={pkg.popular} onClick={() => scrollToContact(pkg.id)}>{pkg.cta}</VideoCTA>
            </VideoCard>
          ))}
        </Grid>
        {renderOnRequest()}
          {renderVoucher()}
      </Container>
    </VideoSection>
  );
};

export default PricingSection;
