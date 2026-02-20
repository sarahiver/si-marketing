// src/App.js
// S&I Wedding Marketing - Hauptseite für siwedding.de
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ErrorBoundary from './components/shared/ErrorBoundary';

// ============================================
// MARKETING COMPONENTS
// ============================================
import MarketingNav from './components/marketing/MarketingNav';
import MarketingHero from './components/marketing/MarketingHero';
import MarketingFooter from './components/marketing/MarketingFooter';
import PricingSection from './components/marketing/PricingSection';
import ThemeShowcase from './components/marketing/ThemeShowcase';
import ComponentsShowcase from './components/marketing/ComponentsShowcase';
import ContactSection from './components/marketing/ContactSection';
import HowItWorksSection from './components/marketing/HowItWorksSection';
import AboutSection from './components/marketing/AboutSection';
import WhyUsSection from './components/marketing/WhyUsSection';
import USPSection from './components/marketing/USPSection';
import CooperationSection from './components/marketing/CooperationSection';
import PromoBanner from './components/marketing/PromoBanner';
import BotanicalLeaves from './components/marketing/BotanicalLeaves';
import AnimatedSection from './components/marketing/AnimatedSection';

// ============================================
// SHARED / STANDALONE PAGES
// ============================================
import ImpressumPage from './components/shared/ImpressumPage';
import DatenschutzPage from './components/shared/DatenschutzPage';
import CookieConsent from './components/shared/CookieConsent';
import SEOHead from './components/shared/SEOHead';

// ============================================
// BLOG PAGES
// ============================================
import BlogPage from './components/blog/BlogPage';
import BlogArticle from './components/blog/BlogArticle';

// ============================================
// GOOGLE FONTS - Alle Fonts für alle Themes (werden in Theme-Previews gebraucht)
// ============================================
const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Oswald:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&family=Outfit:wght@200;300;400;500&family=Manrope:wght@300;400;500;600;700;800&family=Josefin+Sans:wght@300;400;600&family=Mrs+Saint+Delafield&display=swap';

// ============================================
// GLOBAL STYLES
// ============================================
const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background: #FFFFFF;
  }
  
  ::selection {
    background: #C41E3A;
    color: #FFFFFF;
  }
  
  /* Scroll margin for anchor links */
  [id] {
    scroll-margin-top: 100px;
  }

  /* Mobile: Reduce section padding to minimize scrolling */
  @media (max-width: 768px) {
    section {
      padding-top: clamp(2.5rem, 6vh, 4rem) !important;
      padding-bottom: clamp(2.5rem, 6vh, 4rem) !important;
    }
  }
`;

// ============================================
// MARKETING PAGE
// ============================================
function MarketingPage() {
  const { currentTheme, isLoading } = useTheme();
  
  useEffect(() => {
    document.title = 'S&I. wedding — Premium Hochzeitswebsites';
  }, []);

  const productSchema = {
    '@type': 'Product',
    name: 'Premium Hochzeitswebsite von S&I.',
    description: 'Individuelle Hochzeitswebsite mit eigenem Design, eigener Domain, digitalem RSVP, Foto-Upload und Gästeverwaltung. 6 einzigartige Themes.',
    brand: { '@type': 'Brand', name: 'S&I.' },
    url: 'https://www.sarahiver.com',
    image: 'https://res.cloudinary.com/si-weddings/image/upload/v1770798416/si_og_image_nx5blq.png',
    offers: [
      {
        '@type': 'Offer',
        name: 'Starter Paket',
        price: '1290',
        priceCurrency: 'EUR',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://www.sarahiver.com/#preise',
        seller: { '@type': 'Organization', name: 'S&I.' },
      },
      {
        '@type': 'Offer',
        name: 'Standard Paket',
        price: '1590',
        priceCurrency: 'EUR',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://www.sarahiver.com/#preise',
        seller: { '@type': 'Organization', name: 'S&I.' },
      },
      {
        '@type': 'Offer',
        name: 'Premium Paket',
        price: '1990',
        priceCurrency: 'EUR',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://www.sarahiver.com/#preise',
        seller: { '@type': 'Organization', name: 'S&I.' },
      },
    ],
  };

  return (
    <AppWrapper>
      <SEOHead
        title="S&I. — Premium Hochzeitswebsites ab 1.290 €"
        description="Individuelle Hochzeitswebsites mit eigenem Design, eigener Domain, digitalem RSVP und Foto-Upload. 6 einzigartige Themes. Ab 1.290 €. Aus Hamburg."
        path="/"
        schema={productSchema}
        keywords={['Hochzeitswebsite', 'Hochzeitswebsite erstellen', 'Wedding Website', 'digitale Hochzeitseinladung', 'RSVP Hochzeit', 'Premium Hochzeitswebsite', 'Hochzeitswebsite Hamburg']}
      />
      <LoadingOverlay $show={isLoading} $theme={currentTheme}>
        <LoadingLogo>S&I.</LoadingLogo>
        <LoadingText>Laden...</LoadingText>
      </LoadingOverlay>
      
      <BotanicalLeaves />
      <MarketingNav />
      <MarketingHero />
      <AnimatedSection>
        <USPSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <ThemeShowcase />
      </AnimatedSection>
      {/* ExamplesShowcase - wird später mit echten Kunden-URLs eingebunden */}
      <AnimatedSection delay={100}>
        <HowItWorksSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <ComponentsShowcase />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <PromoBanner />
        <PricingSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <WhyUsSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <ContactSection />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <CooperationSection />
      </AnimatedSection>
      <MarketingFooter />
    </AppWrapper>
  );
}

// ============================================
// MAIN APP WITH THEME PROVIDER
// ============================================
function MainApp() {
  // Fonts werden statisch in index.html geladen (kein JS-Overhead)
  return (
    <MarketingPage />
  );
}

// ============================================
// APP WITH ROUTER
// ============================================
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <GlobalStyles />
          <Routes>
            {/* Main Marketing Page */}
            <Route path="/" element={<MainApp />} />

            {/* Blog Pages */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />

            {/* Legal Pages */}
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />

            {/* Fallback - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {/* DSGVO Cookie Banner */}
          <CookieConsent />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

// ============================================
// STYLED COMPONENTS
// ============================================
const AppWrapper = styled.div`
  min-height: 100vh;
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${p => p.$show ? 1 : 0};
  visibility: ${p => p.$show ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  background: ${p => p.$theme === 'neon' ? '#0a0a0f' : '#FFFFFF'};
`;

const LoadingLogo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  background: #000000;
  color: #FFFFFF;
  padding: 12px 24px;
  margin-bottom: 30px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingText = styled.p`
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  color: rgba(0,0,0,0.5);
  font-family: 'Inter', sans-serif;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;
