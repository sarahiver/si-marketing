// src/components/shared/CookieConsent.js
// DSGVO-konformer Cookie-Banner mit Google Analytics Integration
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const GA_MEASUREMENT_ID = 'G-G9DKBTJRJJ';

// ============================================
// GOOGLE ANALYTICS FUNCTIONS
// ============================================

// Load Google Analytics Script
const loadGoogleAnalytics = () => {
  if (window.gtag) return; // Already loaded

  // Add gtag script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true, // DSGVO: IP anonymisieren
    cookie_flags: 'SameSite=None;Secure'
  });

  console.log('✅ Google Analytics geladen');
};

// Remove Google Analytics (for opt-out)
const removeGoogleAnalytics = () => {
  // Set opt-out cookie
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;

  // Remove cookies
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    if (name.startsWith('_ga') || name.startsWith('_gid')) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  });

  console.log('🚫 Google Analytics deaktiviert');
};

// ============================================
// COOKIE CONSENT COMPONENT
// ============================================
const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');

    if (consent === 'accepted') {
      loadGoogleAnalytics();
    } else if (consent === 'declined') {
      removeGoogleAnalytics();
    } else {
      // No decision yet - show banner after short delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    loadGoogleAnalytics();
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    removeGoogleAnalytics();
    setShowBanner(false);
  };

  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  if (!showBanner) return null;

  return (
    <BannerWrapper>
      <BannerContent>
        <BannerText>
          <BannerTitle>Cookie-Einstellungen</BannerTitle>
          <BannerDescription>
            Wir nutzen Cookies, um unsere Website zu verbessern und zu verstehen, wie sie genutzt wird.
            {showSettings && (
              <SettingsDetail>
                <strong>Google Analytics:</strong> Hilft uns zu verstehen, wie Besucher unsere Seite nutzen.
                Die Daten werden anonymisiert übertragen (IP-Anonymisierung aktiv).
              </SettingsDetail>
            )}
          </BannerDescription>
        </BannerText>

        <BannerActions>
          <SettingsButton onClick={handleSettings}>
            {showSettings ? 'Weniger' : 'Mehr erfahren'}
          </SettingsButton>
          <DeclineButton onClick={handleDecline}>
            Ablehnen
          </DeclineButton>
          <AcceptButton onClick={handleAccept}>
            Akzeptieren
          </AcceptButton>
        </BannerActions>

        <PrivacyLink href="/datenschutz" target="_blank">
          Datenschutzerklärung
        </PrivacyLink>
      </BannerContent>
    </BannerWrapper>
  );
};

export default CookieConsent;

// ============================================
// STYLED COMPONENTS
// ============================================
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const BannerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 1rem;
  animation: ${slideUp} 0.4s ease;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const BannerContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: #1a1a1a;
  color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const BannerText = styled.div`
  margin-bottom: 1.25rem;
`;

const BannerTitle = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const BannerDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #aaa;
`;

const SettingsDetail = styled.span`
  display: block;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #333;
  color: #888;
`;

const BannerActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.7rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
`;

const AcceptButton = styled(Button)`
  background: #C41E3A;
  color: #fff;
  flex: 1;
  min-width: 120px;

  &:hover {
    background: #a01830;
  }
`;

const DeclineButton = styled(Button)`
  background: transparent;
  color: #aaa;
  border: 1px solid #444;

  &:hover {
    background: #333;
    color: #fff;
  }
`;

const SettingsButton = styled(Button)`
  background: transparent;
  color: #666;
  padding: 0.7rem 0.5rem;

  &:hover {
    color: #aaa;
  }
`;

const PrivacyLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #666;
  text-decoration: underline;

  &:hover {
    color: #aaa;
  }
`;
