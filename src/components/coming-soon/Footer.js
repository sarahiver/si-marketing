// Footer mit Social Links und Legal Modals - Multi-Theme
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Footer = () => {
  const { currentTheme } = useTheme();
  const [activeModal, setActiveModal] = useState(null); // 'impressum' | 'datenschutz' | null

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <FooterSection $theme={currentTheme}>
        <Container>
          <Logo $theme={currentTheme}>S&I.</Logo>
          
          <SocialLinks>
            <SocialLink 
              href="https://instagram.com/sarah.iver.wedding" 
              target="_blank" 
              rel="noopener noreferrer"
              $theme={currentTheme}
            >
              <InstagramIcon />
              <span>Instagram</span>
            </SocialLink>
            <SocialDivider $theme={currentTheme}>•</SocialDivider>
            <SocialLink 
              href="https://pinterest.com/sarahiverwedding" 
              target="_blank" 
              rel="noopener noreferrer"
              $theme={currentTheme}
            >
              <PinterestIcon />
              <span>Pinterest</span>
            </SocialLink>
          </SocialLinks>
          
          <Copyright $theme={currentTheme}>
            © 2025 S&I. wedding — Digitale Hochzeitserlebnisse
          </Copyright>
          
          <LegalLinks>
            <LegalLink onClick={() => setActiveModal('impressum')} $theme={currentTheme}>
              Impressum
            </LegalLink>
            <LegalDivider $theme={currentTheme}>|</LegalDivider>
            <LegalLink onClick={() => setActiveModal('datenschutz')} $theme={currentTheme}>
              Datenschutz
            </LegalLink>
          </LegalLinks>
        </Container>
      </FooterSection>

      {/* Impressum Modal */}
      {activeModal === 'impressum' && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()} $theme={currentTheme}>
            <ModalHeader $theme={currentTheme}>
              <ModalTitle $theme={currentTheme}>Impressum</ModalTitle>
              <CloseButton onClick={closeModal} $theme={currentTheme}>✕</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <ModalSection>
                <SectionTitle $theme={currentTheme}>Angaben gemäß § 5 TMG</SectionTitle>
                <SectionText $theme={currentTheme}>
                  <strong>S&I. wedding</strong><br />
                  Sarah & Iver Bohnes<br />
                  Große Freiheit 82<br />
                  22767 Hamburg<br />
                  Deutschland
                </SectionText>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>Kontakt</SectionTitle>
                <SectionText $theme={currentTheme}>
                  E-Mail: wedding@sarahiver.de
                </SectionText>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>Umsatzsteuer-ID</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  [wird nach Gewerbeanmeldung ergänzt]
                </SectionText>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Sarah & Iver Bohnes<br />
                  Große Freiheit 82<br />
                  22767 Hamburg
                </SectionText>
              </ModalSection>
              
              <Divider $theme={currentTheme} />
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>EU-Streitschlichtung</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  https://ec.europa.eu/consumers/odr/<br /><br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </SectionText>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>Verbraucherstreitbeilegung</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </SectionText>
              </ModalSection>
              
              <Divider $theme={currentTheme} />
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>Haftung für Inhalte</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                  nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                  Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                  Tätigkeit hinweisen.
                </SectionText>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>Haftung für Links</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                </SectionText>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>Urheberrecht</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
                  deutschen Urheberrecht. Downloads und Kopien dieser Seite sind nur für den privaten, nicht 
                  kommerziellen Gebrauch gestattet.
                </SectionText>
              </ModalSection>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Datenschutz Modal */}
      {activeModal === 'datenschutz' && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()} $theme={currentTheme}>
            <ModalHeader $theme={currentTheme}>
              <ModalTitle $theme={currentTheme}>Datenschutzerklärung</ModalTitle>
              <CloseButton onClick={closeModal} $theme={currentTheme}>✕</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <ModalSection>
                <SectionTitle $theme={currentTheme}>1. Datenschutz auf einen Blick</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen 
                  personenbezogenen Daten passiert, wenn du diese Website besuchst.
                </SectionText>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>2. Verantwortliche Stelle</SectionTitle>
                <SectionText $theme={currentTheme}>
                  <strong>S&I. wedding</strong><br />
                  Sarah & Iver Bohnes<br />
                  Große Freiheit 82<br />
                  22767 Hamburg<br /><br />
                  E-Mail: wedding@sarahiver.de
                </SectionText>
              </ModalSection>
              
              <Divider $theme={currentTheme} />
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>3. Hosting</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Wir hosten die Inhalte unserer Website bei Vercel Inc., 340 S Lemon Ave #4133, 
                  Walnut, CA 91789, USA. Wenn du unsere Website besuchst, erfasst Vercel verschiedene 
                  Logfiles inklusive deiner IP-Adresse.<br /><br />
                  Datenschutzerklärung: https://vercel.com/legal/privacy-policy
                </SectionText>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>4. Warteliste / Newsletter</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Auf unserer Website kannst du dich für unsere Warteliste anmelden. 
                  Hierfür benötigen wir deine E-Mail-Adresse. Zusätzlich speichern wir das von dir 
                  gewählte Design-Theme und den Zeitpunkt der Anmeldung.<br /><br />
                  Wir verwenden das Double-Opt-In-Verfahren. Das bedeutet, dass wir dir 
                  nach deiner Anmeldung eine E-Mail senden, in der wir dich um Bestätigung bitten.<br /><br />
                  <strong>Zweck:</strong> Information über den Launch sowie Zusendung deines exklusiven Launch-Rabatts.<br /><br />
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).<br /><br />
                  <strong>Speicherdauer:</strong> Bis zur Abmeldung oder Zweckentfall.
                </SectionText>
              </ModalSection>
              
              <Divider $theme={currentTheme} />
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>5. Externe Dienste</SectionTitle>
                <SectionText $theme={currentTheme}>
                  <strong>Supabase (Datenbank)</strong><br />
                  Anbieter: Supabase Inc., Singapore.<br />
                  Datenschutz: https://supabase.com/privacy<br /><br />
                  
                  <strong>Resend (E-Mail-Versand)</strong><br />
                  Anbieter: Resend Inc., San Francisco, CA, USA.<br />
                  Für den Versand der Double-Opt-In Bestätigungsmail nutzen wir Resend. 
                  Dabei wird deine E-Mail-Adresse an Resend übermittelt.<br />
                  Datenschutz: https://resend.com/legal/privacy-policy<br /><br />
                  
                  <strong>Cloudinary (Bildhosting)</strong><br />
                  Anbieter: Cloudinary Ltd., Sunnyvale, CA, USA.<br />
                  Datenschutz: https://cloudinary.com/privacy
                </SectionText>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>6. Cookies</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Diese Website verwendet keine Cookies zu Tracking- oder Analysezwecken.
                  Es werden ausschließlich technisch notwendige Funktionen verwendet.
                </SectionText>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>7. Webanalyse</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Wir nutzen Vercel Web Analytics zur anonymisierten Auswertung der Websitenutzung. 
                  Es werden keine Cookies gesetzt und keine personenbezogenen Daten gespeichert. 
                  Die Analyse erfolgt auf Basis aggregierter, nicht personenbeziehbarer Daten.<br /><br />
                  <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).<br /><br />
                  Datenschutz: https://vercel.com/legal/privacy-policy
                </SectionText>
              </ModalSection>
              
              <Divider $theme={currentTheme} />
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>8. Deine Rechte</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Du hast jederzeit das Recht auf:<br /><br />
                  • Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)<br />
                  • Berichtigung unrichtiger Daten (Art. 16 DSGVO)<br />
                  • Löschung deiner Daten (Art. 17 DSGVO)<br />
                  • Einschränkung der Verarbeitung (Art. 18 DSGVO)<br />
                  • Datenübertragbarkeit (Art. 20 DSGVO)<br />
                  • Widerspruch (Art. 21 DSGVO)<br />
                  • Widerruf deiner Einwilligung (Art. 7 Abs. 3 DSGVO)<br /><br />
                  Kontakt: wedding@sarahiver.de
                </SectionText>
              </ModalSection>
              
              <ModalSection>
                <SectionTitle $theme={currentTheme}>9. Beschwerderecht</SectionTitle>
                <SectionText $theme={currentTheme}>
                  Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.<br /><br />
                  <strong>Zuständige Behörde:</strong><br />
                  Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit<br />
                  Ludwig-Erhard-Str. 22, 7. OG<br />
                  20459 Hamburg<br />
                  https://datenschutz-hamburg.de
                </SectionText>
              </ModalSection>
              
              <ModalSection>
                <SectionText $theme={currentTheme}>
                  <em>Stand: Januar 2025</em>
                </SectionText>
              </ModalSection>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Footer;

// Icons
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const PinterestIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4"/>
    <path d="M9 18l1.5-6"/>
  </svg>
);

// Styles
const FooterSection = styled.footer`
  padding: 60px 5%;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #0D0D0D;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    background: #1A1A1A;
  `}
  
  ${p => p.$theme === 'video' && css`
    background: #0A0A08;
  `}
  
  ${p => p.$theme === 'botanical' && css`
    background: #1E2E1F;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    background: #1A1A1A;
  `}
  
  ${p => p.$theme === 'neon' && css`
    background: #05050a;
  `}
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Logo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  color: #FFFFFF;
  background: #000000;
  display: inline-block;
  padding: 8px 16px;
  margin-bottom: 25px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.7);
    &:hover { color: #FF6B6B; }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: rgba(255, 255, 255, 0.6);
    &:hover { color: #FFFFFF; }
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.5);
    &:hover { color: #C4A87C; }
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: rgba(250, 249, 246, 0.6);
    &:hover { color: #7BA889; }
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.5);
    &:hover { color: #B8960B; }
  `}
  
  ${p => p.$theme === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.5);
    &:hover { color: #00ffff; text-shadow: 0 0 10px rgba(0, 255, 255, 0.5); }
  `}
  
  span {
    @media (max-width: 400px) { display: none; }
  }
`;

const SocialDivider = styled.span`
  color: rgba(255, 255, 255, 0.3);
`;

const Copyright = styled.p`
  font-size: 0.85rem;
  margin-bottom: 20px;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.5);
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: rgba(255, 255, 255, 0.4);
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.4);
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: rgba(250, 249, 246, 0.5);
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.4);
  `}
  
  ${p => p.$theme === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.4);
  `}
`;

const LegalLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const LegalLink = styled.button`
  font-size: 0.75rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.4);
    &:hover { color: #FF6B6B; }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    color: rgba(255, 255, 255, 0.3);
    &:hover { color: #FFFFFF; }
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.3);
    &:hover { color: #C4A87C; }
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    color: rgba(250, 249, 246, 0.4);
    &:hover { color: #7BA889; }
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    color: rgba(255, 255, 255, 0.3);
    &:hover { color: #B8960B; }
  `}
  
  ${p => p.$theme === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(255, 255, 255, 0.3);
    &:hover { color: #ff00ff; text-shadow: 0 0 10px rgba(255, 0, 255, 0.5); }
  `}
`;

const LegalDivider = styled.span`
  color: rgba(255, 255, 255, 0.2);
  font-size: 0.75rem;
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  animation: ${fadeIn} 0.2s ease;
`;

const ModalContent = styled.div`
  background: #FFFFFF;
  max-width: 650px;
  max-height: 85vh;
  width: 100%;
  overflow-y: auto;
  animation: ${slideUp} 0.3s ease;
  border-radius: 4px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  position: sticky;
  top: 0;
  background: #FFFFFF;
  z-index: 1;
  
  ${p => p.$theme === 'contemporary' && css`
    border-bottom: 2px solid #0D0D0D;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    border-bottom: 1px solid #E0E0E0;
  `}
  
  ${p => p.$theme === 'video' && css`
    border-bottom: 1px solid rgba(139, 115, 85, 0.3);
  `}
  
  ${p => p.$theme === 'botanical' && css`
    border-bottom: 1px solid #D4CFC4;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    border-bottom: 1px solid #E5E5E5;
  `}
`;

const ModalTitle = styled.h2`
  margin: 0;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #0D0D0D;
    letter-spacing: 0.05em;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 400;
    font-style: italic;
    color: #1A1A1A;
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 500;
    color: #1A1814;
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 500;
    color: #2C3E2D;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 400;
    font-style: italic;
    color: #1A1A1A;
  `}
`;

const CloseButton = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
  transition: color 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    color: #0D0D0D;
    &:hover { color: #FF6B6B; }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    color: #1A1A1A;
    &:hover { color: #666; }
  `}
  
  ${p => p.$theme === 'video' && css`
    color: #1A1814;
    &:hover { color: #8B7355; }
  `}
  
  ${p => p.$theme === 'botanical' && css`
    color: #2C3E2D;
    &:hover { color: #4A7C59; }
  `}
  
  ${p => p.$theme === 'luxe' && css`
    color: #1A1A1A;
    &:hover { color: #B8960B; }
  `}
`;

const ModalBody = styled.div`
  padding: 30px;
`;

const ModalSection = styled.div`
  margin-bottom: 25px;
  
  &:last-child { margin-bottom: 0; }
`;

const SectionTitle = styled.h3`
  margin: 0 0 12px 0;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: #FF6B6B;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: #999;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    color: #8B7355;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    color: #4A7C59;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    color: #B8960B;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  `}
`;

const SectionText = styled.p`
  margin: 0;
  line-height: 1.7;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    color: #0D0D0D;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #444;
  `}
  
  ${p => p.$theme === 'video' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    color: #1A1814;
  `}
  
  ${p => p.$theme === 'botanical' && css`
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    color: #2C3E2D;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
    color: #1A1A1A;
  `}
  
  strong { font-weight: 700; }
  em { font-style: italic; color: #888; }
`;

const Divider = styled.hr`
  border: none;
  margin: 25px 0;
  
  ${p => p.$theme === 'contemporary' && css`
    height: 2px;
    background: #F0F0F0;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    height: 1px;
    background: #E5E5E5;
  `}
  
  ${p => p.$theme === 'video' && css`
    height: 1px;
    background: rgba(139, 115, 85, 0.2);
  `}
  
  ${p => p.$theme === 'botanical' && css`
    height: 1px;
    background: #D4CFC4;
  `}
  
  ${p => p.$theme === 'luxe' && css`
    height: 1px;
    background: #E5E5E5;
  `}
`;
