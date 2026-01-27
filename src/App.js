// src/App.js
// S&I Marketing - Coming Soon & Marketing Mode (beide vollständig!)
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ErrorBoundary from './components/shared/ErrorBoundary';

// ============================================
// COMING SOON COMPONENTS (vollständig)
// ============================================
import CSNavigation from './components/coming-soon/Navigation';
import CSHeroSection from './components/coming-soon/HeroSection';
import CSCountdownSection from './components/coming-soon/CountdownSection';
import CSUSPsSection from './components/coming-soon/USPsSection';
import CSAboutSection from './components/coming-soon/AboutSection';
import CSWaitlistSection from './components/coming-soon/WaitlistSection';
import CSFooter from './components/coming-soon/Footer';

// ============================================
// MARKETING COMPONENTS (vollständig)
// ============================================
import MarketingNav from './components/marketing/MarketingNav';
import MarketingHero from './components/marketing/MarketingHero';
import MarketingFooter from './components/marketing/MarketingFooter';
import PricingSection from './components/marketing/PricingSection';
import ExamplesShowcase from './components/marketing/ExamplesShowcase';
import ComponentsShowcase from './components/marketing/ComponentsShowcase';
import ContactSection from './components/marketing/ContactSection';
import HowItWorksSection from './components/marketing/HowItWorksSection';
import FeaturesSection from './components/marketing/FeaturesSection';
import MAboutSection from './components/marketing/AboutSection';
import USPSection from './components/marketing/USPSection';
import ThemeShowcase from './components/marketing/ThemeShowcase';

// ============================================
// SHARED / STANDALONE PAGES
// ============================================
import ConfirmPage from './components/shared/ConfirmPage';
import UnsubscribePage from './components/shared/UnsubscribePage';
import ImpressumPage from './components/shared/ImpressumPage';
import DatenschutzPage from './components/shared/DatenschutzPage';

// ============================================
// PAGES
// ============================================
import DemoPage from './pages/DemoPage';

// ============================================
// SITE MODES
// ============================================
const SITE_MODES = {
  COMING_SOON: 'coming-soon',
  MARKETING: 'marketing',
};

const DEFAULT_MODE = SITE_MODES.COMING_SOON;

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
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background: #FFFFFF;
  }
  
  ::selection {
    background: #FF6B6B;
    color: #FFFFFF;
  }
`;

// ============================================
// COMING SOON PAGE (vollständig wie aktuell deployed)
// ============================================
function ComingSoonPage() {
  const { currentTheme, isLoading } = useTheme();
  
  useEffect(() => {
    document.title = 'S&I. wedding — Coming Soon';
  }, []);

  return (
    <AppWrapper>
      <LoadingOverlay $show={isLoading} $theme={currentTheme}>
        <LoadingLogo>S&I.</LoadingLogo>
        <LoadingText>Design wird geladen...</LoadingText>
      </LoadingOverlay>
      
      <CSNavigation />
      <CSHeroSection />
      <CSCountdownSection />
      <CSUSPsSection />
      <CSAboutSection />
      <CSWaitlistSection />
      <CSFooter />
    </AppWrapper>
  );
}

// ============================================
// MARKETING PAGE (vollständig mit allen Sections)
// ============================================
function MarketingPage() {
  const { currentTheme, isLoading } = useTheme();
  
  useEffect(() => {
    document.title = 'S&I. wedding — Einzigartige Hochzeitswebsites';
  }, []);

  return (
    <AppWrapper>
      <LoadingOverlay $show={isLoading} $theme={currentTheme}>
        <LoadingLogo>S&I.</LoadingLogo>
        <LoadingText>Laden...</LoadingText>
      </LoadingOverlay>
      
      <MarketingNav />
      <MarketingHero />
      <USPSection />
      <ThemeShowcase />
      <ExamplesShowcase />
      <HowItWorksSection />
      <ComponentsShowcase />
      <PricingSection />
      <MAboutSection />
      <ContactSection />
      <MarketingFooter />
    </AppWrapper>
  );
}

// ============================================
// ADMIN DASHBOARD - Mode Switch
// ============================================
function AdminDashboard() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('si_site_mode') || DEFAULT_MODE;
  });
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('si_admin_auth') === 'true';
  });
  
  const ADMIN_PASSWORD = 'siwedding2025';
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('si_admin_auth', 'true');
    } else {
      alert('Falsches Passwort');
    }
  };
  
  const handleModeChange = (newMode) => {
    setMode(newMode);
    localStorage.setItem('si_site_mode', newMode);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('si_admin_auth');
  };
  
  // Load fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  
  if (!isAuthenticated) {
    return (
      <AdminWrapper>
        <AdminCard>
          <AdminLogo>S&I.</AdminLogo>
          <AdminTitle>Admin Login</AdminTitle>
          <AdminForm onSubmit={handleLogin}>
            <AdminInput
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <AdminButton type="submit">Anmelden</AdminButton>
          </AdminForm>
        </AdminCard>
      </AdminWrapper>
    );
  }
  
  return (
    <AdminWrapper>
      <AdminCard>
        <AdminHeader>
          <AdminLogo>S&I.</AdminLogo>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </AdminHeader>
        
        <AdminTitle>Site Mode</AdminTitle>
        <AdminSubtitle>Wähle den aktiven Modus für sarahiver.de</AdminSubtitle>
        
        <ModeGrid>
          <ModeCard 
            $active={mode === SITE_MODES.COMING_SOON}
            onClick={() => handleModeChange(SITE_MODES.COMING_SOON)}
          >
            <ModeIcon>🚀</ModeIcon>
            <ModeLabel>Coming Soon</ModeLabel>
            <ModeDescription>
              Waitlist-Anmeldung, Countdown, Theme-Switcher, Social Links
            </ModeDescription>
            {mode === SITE_MODES.COMING_SOON && <ActiveBadge>Aktiv</ActiveBadge>}
          </ModeCard>
          
          <ModeCard 
            $active={mode === SITE_MODES.MARKETING}
            onClick={() => handleModeChange(SITE_MODES.MARKETING)}
          >
            <ModeIcon>🎨</ModeIcon>
            <ModeLabel>Marketing</ModeLabel>
            <ModeDescription>
              Theme-Demos, Preise, Kontaktformular, alle Features
            </ModeDescription>
            {mode === SITE_MODES.MARKETING && <ActiveBadge>Aktiv</ActiveBadge>}
          </ModeCard>
        </ModeGrid>
        
        <InfoBox>
          <strong>Aktueller Modus:</strong> {mode === SITE_MODES.COMING_SOON ? 'Coming Soon' : 'Marketing'}
          <br />
          <small>Änderungen werden sofort wirksam. Seite neu laden zum Testen.</small>
        </InfoBox>
        
        <LinksSection>
          <PreviewLink href="/" target="_blank">→ Startseite öffnen</PreviewLink>
          <PreviewLink href="/demo?theme=editorial" target="_blank">→ Demo-Seite öffnen</PreviewLink>
          <PreviewLink href="/impressum" target="_blank">→ Impressum</PreviewLink>
        </LinksSection>
      </AdminCard>
    </AdminWrapper>
  );
}

// ============================================
// MAIN PAGE ROUTER
// ============================================
function MainPageRouter() {
  const mode = localStorage.getItem('si_site_mode') || DEFAULT_MODE;
  
  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lato:wght@300;400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    };
  }, []);
  
  return (
    <ThemeProvider>
      {mode === SITE_MODES.MARKETING ? <MarketingPage /> : <ComingSoonPage />}
    </ThemeProvider>
  );
}

// ============================================
// DEMO PAGE WRAPPER (für Theme-iframes)
// ============================================
function DemoPageWrapper() {
  // Load fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lato:wght@300;400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  
  return (
    <ThemeProvider>
      <DemoPage />
    </ThemeProvider>
  );
}

// ============================================
// APP
// ============================================
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <GlobalStyles />
        <Routes>
          {/* Main Page */}
          <Route path="/" element={<MainPageRouter />} />
          
          {/* Demo Page (für iframes von siwedding.de) */}
          <Route path="/demo" element={<DemoPageWrapper />} />
          
          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Standalone Pages */}
          <Route path="/confirm" element={<ConfirmPage />} />
          <Route path="/unsubscribe" element={<UnsubscribePage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
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

// ============================================
// ADMIN STYLES
// ============================================
const AdminWrapper = styled.div`
  min-height: 100vh;
  background: #FAFAFA;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'Inter', -apple-system, sans-serif;
`;

const AdminCard = styled.div`
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  padding: 3rem;
  max-width: 550px;
  width: 100%;
`;

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const AdminLogo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  background: #000;
  color: #FFF;
  padding: 8px 16px;
`;

const LogoutButton = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover { color: #000; }
`;

const AdminTitle = styled.h1`
  font-family: 'Instrument Serif', serif;
  font-size: 2rem;
  font-weight: 400;
  color: #000;
  margin-bottom: 0.5rem;
`;

const AdminSubtitle = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 2rem;
`;

const AdminForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const AdminInput = styled.input`
  font-size: 1rem;
  padding: 1rem;
  border: 1px solid #E0E0E0;
  background: #FAFAFA;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const AdminButton = styled.button`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  background: #000;
  color: #FFF;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover { background: #333; }
`;

const ModeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const ModeCard = styled.div`
  padding: 1.5rem;
  border: 2px solid ${p => p.$active ? '#000' : '#E0E0E0'};
  background: ${p => p.$active ? '#FAFAFA' : '#FFF'};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover { border-color: #000; }
`;

const ModeIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ModeLabel = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 0.5rem;
`;

const ModeDescription = styled.p`
  font-size: 0.8rem;
  color: #666;
  line-height: 1.5;
`;

const ActiveBadge = styled.span`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: #000;
  color: #FFF;
  padding: 0.25rem 0.5rem;
`;

const InfoBox = styled.div`
  font-size: 0.85rem;
  color: #666;
  background: #F5F5F5;
  padding: 1rem;
  margin-bottom: 1.5rem;
  
  strong { color: #000; }
  
  small {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.75rem;
  }
`;

const LinksSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PreviewLink = styled.a`
  font-size: 0.8rem;
  color: #000;
  text-decoration: underline;
  
  &:hover { color: #666; }
`;
