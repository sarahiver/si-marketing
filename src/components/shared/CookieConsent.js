// src/components/shared/CookieConsent.js
// DSGVO-konformer Cookie-Banner mit Google Analytics Integration
// - Gleichwertige Buttons (Akzeptieren / Ablehnen)
// - Nachträglicher Widerruf über Floating-Button
// - Cookie-Details (Name, Dauer, Zweck)
// - Analytics über zentrales Modul
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { loadGoogleAnalytics, removeGoogleAnalytics, trackCookieConsent } from '../../utils/analytics';

// ============================================
// COOKIE CONSENT COMPONENT
// ============================================
const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showReopenHint, setShowReopenHint] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');

    if (consent === 'accepted') {
      loadGoogleAnalytics();
      setHasConsent(true);
    } else if (consent === 'declined') {
      removeGoogleAnalytics();
      setHasConsent(true);
    } else {
      // Kein Consent vorhanden → Banner zeigen
      const timer = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    loadGoogleAnalytics();
    trackCookieConsent('accepted');
    setShowBanner(false);
    setHasConsent(true);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    removeGoogleAnalytics();
    setShowBanner(false);
    setHasConsent(true);
  };

  const handleReset = () => {
    localStorage.removeItem('cookie_consent');
    localStorage.removeItem('cookie_consent_date');
    removeGoogleAnalytics();
    setShowBanner(true);
    setHasConsent(false);
  };

  return (
    <>
      {/* Banner */}
      {showBanner && (
        <Overlay>
          <BannerWrapper>
            <BannerContent>
              <BannerHeader>
                <CookieIcon>🍪</CookieIcon>
                <BannerTitle>Cookie-Einstellungen</BannerTitle>
              </BannerHeader>

              <BannerDescription>
                Wir nutzen Cookies, um unsere Website zu analysieren und zu verbessern.
                Du entscheidest, welche Cookies du zulässt. Deine Wahl kannst du jederzeit ändern.
              </BannerDescription>

              {/* Cookie-Details */}
              <DetailsToggle onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? '▾ Details ausblenden' : '▸ Cookie-Details anzeigen'}
              </DetailsToggle>

              {showDetails && (
                <DetailsBox>
                  <DetailCategory>
                    <DetailLabel>
                      <CheckIcon>✓</CheckIcon>
                      Notwendige Cookies
                      <RequiredBadge>Immer aktiv</RequiredBadge>
                    </DetailLabel>
                    <DetailInfo>
                      Speichern deine Cookie-Einstellung. Keine personenbezogenen Daten.
                    </DetailInfo>
                    <CookieTable>
                      <tbody>
                        <tr><td>cookie_consent</td><td>Unbegrenzt</td><td>Speichert deine Wahl</td></tr>
                        <tr><td>cookie_consent_date</td><td>Unbegrenzt</td><td>Zeitpunkt der Einwilligung</td></tr>
                      </tbody>
                    </CookieTable>
                  </DetailCategory>

                  <DetailCategory>
                    <DetailLabel>
                      <ToggleIcon>○</ToggleIcon>
                      Analyse-Cookies (Google Analytics)
                    </DetailLabel>
                    <DetailInfo>
                      Helfen uns zu verstehen, wie Besucher unsere Seite nutzen.
                      IP-Anonymisierung ist aktiviert. Daten werden an Google Ireland Ltd. übertragen.
                    </DetailInfo>
                    <CookieTable>
                      <tbody>
                        <tr><td>_ga</td><td>2 Jahre</td><td>Unterscheidet Nutzer</td></tr>
                        <tr><td>_ga_G9DKBTJRJJ</td><td>2 Jahre</td><td>Session-Zustand</td></tr>
                        <tr><td>_gid</td><td>24 Stunden</td><td>Unterscheidet Nutzer</td></tr>
                      </tbody>
                    </CookieTable>
                  </DetailCategory>
                </DetailsBox>
              )}

              {/* Gleichwertige Buttons — DSGVO-konform */}
              <ButtonRow>
                <ConsentButton $variant="decline" onClick={handleDecline}>
                  Nur notwendige
                </ConsentButton>
                <ConsentButton $variant="accept" onClick={handleAccept}>
                  Alle akzeptieren
                </ConsentButton>
              </ButtonRow>

              <FooterRow>
                <PrivacyLink href="/datenschutz" target="_blank" rel="noopener">
                  Datenschutzerklärung
                </PrivacyLink>
                <PrivacyLink href="/impressum" target="_blank" rel="noopener">
                  Impressum
                </PrivacyLink>
              </FooterRow>
            </BannerContent>
          </BannerWrapper>
        </Overlay>
      )}

      {/* Floating Cookie-Button zum Wiederöffnen */}
      {!showBanner && hasConsent && (
        <FloatingButton
          onClick={handleReset}
          onMouseEnter={() => setShowReopenHint(true)}
          onMouseLeave={() => setShowReopenHint(false)}
          aria-label="Cookie-Einstellungen ändern"
        >
          🍪
          {showReopenHint && <FloatingHint>Cookie-Einstellungen</FloatingHint>}
        </FloatingButton>
      )}
    </>
  );
};

export default CookieConsent;

// ============================================
// STYLED COMPONENTS
// ============================================
const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease;
  padding: 1rem;

  @media (min-width: 768px) {
    align-items: center;
  }
`;

const BannerWrapper = styled.div`
  width: 100%;
  max-width: 520px;
  animation: ${slideUp} 0.4s ease;
`;

const BannerContent = styled.div`
  background: #111;
  color: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const BannerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const CookieIcon = styled.span`
  font-size: 1.25rem;
`;

const BannerTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

const BannerDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.835rem;
  line-height: 1.55;
  color: #999;
  margin: 0 0 1rem 0;
`;

const DetailsToggle = styled.button`
  background: none;
  border: none;
  color: #777;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 0.75rem;
  transition: color 0.2s;

  &:hover {
    color: #bbb;
  }
`;

const DetailsBox = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailCategory = styled.div``;

const DetailLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #ddd;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.3rem;
`;

const CheckIcon = styled.span`
  color: #4ade80;
  font-size: 0.75rem;
`;

const ToggleIcon = styled.span`
  color: #888;
  font-size: 0.75rem;
`;

const RequiredBadge = styled.span`
  font-size: 0.65rem;
  font-weight: 500;
  color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  margin-left: 0.3rem;
`;

const DetailInfo = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #777;
  line-height: 1.45;
  margin: 0 0 0.5rem 0;
`;

const CookieTable = styled.table`
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: #666;
  border-collapse: collapse;

  td {
    padding: 0.25rem 0.5rem 0.25rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    &:first-child { color: #aaa; font-family: monospace; font-size: 0.68rem; }
  }
`;

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const ConsentButton = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.84rem;
  font-weight: 600;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${(p) => (p.$variant === 'accept' ? '#fff' : '#444')};
  background: ${(p) => (p.$variant === 'accept' ? '#fff' : 'transparent')};
  color: ${(p) => (p.$variant === 'accept' ? '#111' : '#ccc')};

  &:hover {
    background: ${(p) => (p.$variant === 'accept' ? '#e5e5e5' : '#222')};
    border-color: ${(p) => (p.$variant === 'accept' ? '#e5e5e5' : '#666')};
  }
`;

const FooterRow = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
`;

const PrivacyLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  color: #555;
  text-decoration: none;

  &:hover {
    color: #999;
    text-decoration: underline;
  }
`;

// Floating Cookie Button
const FloatingButton = styled.button`
  position: fixed;
  bottom: 1.25rem;
  left: 1.25rem;
  z-index: 9990;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1a1a1a;
  border: 1px solid #333;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const FloatingHint = styled.span`
  position: absolute;
  left: calc(100% + 0.5rem);
  white-space: nowrap;
  background: #1a1a1a;
  color: #ccc;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.2s ease;
`;
