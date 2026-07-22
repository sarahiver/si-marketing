// src/App.js
// S&I Wedding Marketing - Hauptseite für siwedding.de
import React, { useEffect, Suspense } from 'react';
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
import StickyDemoBar from './components/marketing/StickyDemoBar';

// Modern Theme
import ModernOverride from './components/marketing/ModernOverride';

// ============================================
// SHARED / STANDALONE PAGES
// ============================================
import CookieConsent from './components/shared/CookieConsent';
import { ABTestProvider } from './context/ABTestContext';
import useScrollDepth from './hooks/useScrollDepth';
import SEOHead from './components/shared/SEOHead';

// ============================================
// LAZY IMPORTS (must come after all regular imports)
// Blog & Legal Pages werden nur auf eigenen Routes gebraucht
// → Code-Splitting reduziert das Initial-Bundle der Homepage
// ============================================
const ModernParallaxPage = React.lazy(() => import('./components/marketing/ModernParallaxPage'));
const BlogPage = React.lazy(() => import('./components/blog/BlogPage'));
const BlogArticle = React.lazy(() => import('./components/blog/BlogArticle'));
const ImpressumPage = React.lazy(() => import('./components/shared/ImpressumPage'));
const DatenschutzPage = React.lazy(() => import('./components/shared/DatenschutzPage'));
const HochzeitsdatumFinder = React.lazy(() => import('./components/tools/HochzeitsdatumFinder'));
const BudgetRechner = React.lazy(() => import('./components/tools/BudgetRechner'));
const QuizGenerator = React.lazy(() => import('./components/tools/QuizGenerator'));

// ============================================
// GOOGLE FONTS - Alle Fonts für alle Themes (werden in Theme-Previews gebraucht)
// ============================================
// GOOGLE FONTS
// Fonts werden jetzt via public/index.html geladen
// (Critical Fonts blockierend, Theme-Fonts async)
// → siehe index.html für Details
// ============================================

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

  /* iOS-Zoom verhindern: Felder < 16px lassen Safari beim Fokus reinzoomen.
     Betrifft v.a. die Tool-Seiten (Quiz, Datum-Finder) mit 14–15px Inputs.
     !important schlägt die element-spezifischen styled-components-Klassen. */
  @media (max-width: 768px) {
    input:not([type='checkbox']):not([type='radio']):not([type='range']),
    textarea,
    select {
      font-size: 16px !important;
    }
  }

  /* Backstop gegen horizontales Auslaufen (zusätzlich zu body overflow-x) */
  html {
    overflow-x: hidden;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  svg {
    max-width: 100%;
  }

  /* Nutzer mit "Bewegung reduzieren" (OS-Einstellung): Animationen entschärfen.
     Ändert NICHT das Standardverhalten – nur für Leute, die es aktiv wünschen. */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

// ============================================
// MARKETING PAGE
// ============================================
function MarketingPage() {
  const { currentTheme, isLoading } = useTheme();
  
  // Scroll-Tiefe für A/B-Test tracken
  useScrollDepth();
  
  useEffect(() => {
    document.title = 'S&I. wedding — Premium Hochzeitswebsites';
  }, []);

  const isModern = currentTheme === 'modern';

  const productSchema = {
    '@type': 'Product',
    name: 'Premium Hochzeitswebsite von S&I.',
    description: 'Individuelle Hochzeitswebsite mit eigenem Design, eigener Domain, digitalem RSVP, Foto-Upload und Gästeverwaltung. Einzigartige Themes.',
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
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'DE',
          returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
          merchantReturnDays: 0,
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'EUR' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'DE' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 7, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'DAY' },
          },
        },
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
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'DE',
          returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
          merchantReturnDays: 0,
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'EUR' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'DE' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 7, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'DAY' },
          },
        },
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
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'DE',
          returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
          merchantReturnDays: 0,
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'EUR' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'DE' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 7, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'DAY' },
          },
        },
      },
    ],
  };

  return (
    <AppWrapper>
      <SEOHead
        title="S&I. — Premium Hochzeitswebsites ab 1.290 €"
        description="Individuelle Hochzeitswebsites mit eigenem Design, eigener Domain, digitalem RSVP und Foto-Upload. Einzigartige Themes. Ab 1.290 €. Aus Hamburg."
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

      {isModern ? (
        <Suspense fallback={<div style={{ height: '100vh', background: '#fff' }} />}>
          <ModernParallaxPage />
        </Suspense>
      ) : (
        <>
          <MarketingHero />
          <AnimatedSection>
            <ThemeShowcase />
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <USPSection />
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
          <StickyDemoBar />
        </>
      )}
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
        <ABTestProvider>
          <Router>
            <GlobalStyles />
            <Routes>
              {/* Main Marketing Page */}
              <Route path="/" element={<MainApp />} />

              {/* Lazy-loaded Routes (Code-Splitting für besseren Initial-Bundle) */}
              <Route path="/blog" element={
                <Suspense fallback={<div style={{ minHeight: '100vh', background: '#fff' }} />}>
                  <BlogPage />
                </Suspense>
              } />
              <Route path="/blog/:slug" element={
                <Suspense fallback={<div style={{ minHeight: '100vh', background: '#fff' }} />}>
                  <BlogArticle />
                </Suspense>
              } />

              {/* Kostenlose Tools (Linkable Assets) */}
              <Route path="/hochzeitsdatum-finder" element={
                <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FAF6EF' }} />}>
                  <HochzeitsdatumFinder />
                </Suspense>
              } />
              <Route path="/hochzeitsbudget-rechner" element={
                <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FAF6EF' }} />}>
                  <BudgetRechner />
                </Suspense>
              } />
              <Route path="/brautpaar-quiz" element={
                <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FAF6EF' }} />}>
                  <QuizGenerator />
                </Suspense>
              } />

              {/* Legal Pages */}
              <Route path="/impressum" element={
                <Suspense fallback={<div style={{ minHeight: '100vh', background: '#fff' }} />}>
                  <ImpressumPage />
                </Suspense>
              } />
              <Route path="/datenschutz" element={
                <Suspense fallback={<div style={{ minHeight: '100vh', background: '#fff' }} />}>
                  <DatenschutzPage />
                </Suspense>
              } />

              {/* Fallback - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
              {/* DSGVO Cookie Banner */}
              <CookieConsent />
            </Router>
          </ABTestProvider>
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
