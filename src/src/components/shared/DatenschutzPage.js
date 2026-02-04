// Datenschutz Page - Editorial Style
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DatenschutzPage = () => {
  useEffect(() => {
    document.title = 'Datenschutz – S&I.';
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <Container>
        {/* Header */}
        <Header>
          <LogoLink href="/">
            <Logo>S&I.</Logo>
          </LogoLink>
          
          <Divider>
            <DividerLine />
            <DividerSymbol>✦</DividerSymbol>
            <DividerLine />
          </Divider>
          
          <PageTitle>Datenschutzerklärung</PageTitle>
        </Header>

        {/* Content */}
        <Content>
          <Section>
            <SectionTitle>1. Datenschutz auf einen Blick</SectionTitle>
            
            <SubTitle>Allgemeine Hinweise</SubTitle>
            <Text>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen 
              personenbezogenen Daten passiert, wenn du diese Website besuchst. Personenbezogene 
              Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst.
            </Text>
            
            <SubTitle>Datenerfassung auf dieser Website</SubTitle>
            <Text>
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
              Die Kontaktdaten findest du im Abschnitt „Verantwortliche Stelle" dieser Datenschutzerklärung.
            </Text>
            <Text>
              <strong>Wie erfassen wir deine Daten?</strong><br />
              Deine Daten werden zum einen dadurch erhoben, dass du uns diese mitteilst. 
              Hierbei kann es sich z.B. um Daten handeln, die du in unser Wartelisten-Formular eingibst.
            </Text>
            <Text>
              Andere Daten werden automatisch oder nach deiner Einwilligung beim Besuch der Website 
              durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, 
              Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </Text>
            <Text>
              <strong>Wofür nutzen wir deine Daten?</strong><br />
              Die Daten werden erhoben, um dich über den Launch unserer Plattform zu informieren 
              und dir deinen exklusiven Rabatt zuzusenden.
            </Text>
          </Section>

          <Section>
            <SectionTitle>2. Verantwortliche Stelle</SectionTitle>
            <Text>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </Text>
            <Text>
              S&I. wedding<br />
              Sarah & Iver Bohnes<br />
              Große Freiheit 82<br />
              22767 Hamburg<br /><br />
              E-Mail: <EmailLink href="mailto:wedding@sarahiver.de">wedding@sarahiver.de</EmailLink>
            </Text>
            <Text>
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder 
              gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen 
              Daten entscheidet.
            </Text>
          </Section>

          <Section>
            <SectionTitle>3. Hosting</SectionTitle>
            <Text>
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </Text>
            
            <SubTitle>Vercel</SubTitle>
            <Text>
              Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA 
              (nachfolgend „Vercel").
            </Text>
            <Text>
              Wenn du unsere Website besuchst, erfasst Vercel verschiedene Logfiles inklusive 
              deiner IP-Adresse. Details entnimmst du der Datenschutzerklärung von Vercel:{' '}
              <ExternalLink href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                https://vercel.com/legal/privacy-policy
              </ExternalLink>
            </Text>
            <Text>
              Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. 
              Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung 
              unserer Website.
            </Text>
          </Section>

          <Section>
            <SectionTitle>4. Warteliste / Newsletter</SectionTitle>
            
            <SubTitle>Anmeldung zur Warteliste</SubTitle>
            <Text>
              Auf unserer Website kannst du dich für unsere Warteliste anmelden. 
              Hierfür benötigen wir deine E-Mail-Adresse. Zusätzlich speichern wir das von dir 
              gewählte Design-Theme und den Zeitpunkt der Anmeldung.
            </Text>
            <Text>
              Wir verwenden das sogenannte Double-Opt-In-Verfahren. Das bedeutet, dass wir dir 
              nach deiner Anmeldung eine E-Mail an die angegebene E-Mail-Adresse senden, in der 
              wir dich um Bestätigung bitten. Wenn du deine Anmeldung nicht bestätigst, werden 
              deine Daten nicht gespeichert.
            </Text>
            <Text>
              <strong>Zweck der Verarbeitung:</strong><br />
              Information über den Launch unserer Plattform sowie Zusendung deines exklusiven Launch-Rabatts.
            </Text>
            <Text>
              <strong>Rechtsgrundlage:</strong><br />
              Die Verarbeitung erfolgt auf Grundlage deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). 
              Diese Einwilligung kannst du jederzeit widerrufen.
            </Text>
            <Text>
              <strong>Speicherdauer:</strong><br />
              Deine Daten werden gelöscht, sobald du dich von der Warteliste abmeldest oder 
              der Zweck der Speicherung entfällt.
            </Text>
          </Section>

          <Section>
            <SectionTitle>5. Externe Dienste</SectionTitle>
            
            <SubTitle>Supabase (Datenbank)</SubTitle>
            <Text>
              Wir nutzen Supabase zur Speicherung der Wartelisten-Daten. Anbieter ist die 
              Supabase Inc., 970 Toa Payoh North #07-04, Singapore 318992.
            </Text>
            <Text>
              Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. 
              Weitere Informationen:{' '}
              <ExternalLink href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
                https://supabase.com/privacy
              </ExternalLink>
            </Text>
            
            <SubTitle>EmailJS (E-Mail-Versand)</SubTitle>
            <Text>
              Für den Versand von Bestätigungs-E-Mails nutzen wir EmailJS. Anbieter ist 
              EmailJS, 8 The Green #4334, Dover, DE 19901, USA.
            </Text>
            <Text>
              Beim Versand wird deine E-Mail-Adresse an EmailJS übermittelt. 
              Weitere Informationen:{' '}
              <ExternalLink href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
                https://www.emailjs.com/legal/privacy-policy/
              </ExternalLink>
            </Text>
            
            <SubTitle>Cloudinary (Bildhosting)</SubTitle>
            <Text>
              Für das Hosting von Bildern nutzen wir Cloudinary. Anbieter ist Cloudinary Ltd., 
              111 W Evelyn Ave, Suite 206, Sunnyvale, CA 94086, USA.
            </Text>
            <Text>
              Weitere Informationen:{' '}
              <ExternalLink href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer">
                https://cloudinary.com/privacy
              </ExternalLink>
            </Text>
          </Section>

          <Section>
            <SectionTitle>6. Cookies</SectionTitle>
            <Text>
              Diese Website verwendet keine Cookies zu Tracking- oder Analysezwecken.
            </Text>
            <Text>
              Es werden ausschließlich technisch notwendige Funktionen verwendet, die keine 
              Cookies setzen, die einer Einwilligung bedürfen.
            </Text>
          </Section>

          <Section>
            <SectionTitle>7. Deine Rechte</SectionTitle>
            <Text>
              Du hast jederzeit das Recht:
            </Text>
            <List>
              <ListItem>Auskunft über deine bei uns gespeicherten Daten zu erhalten (Art. 15 DSGVO)</ListItem>
              <ListItem>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</ListItem>
              <ListItem>Löschung deiner Daten zu verlangen (Art. 17 DSGVO)</ListItem>
              <ListItem>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</ListItem>
              <ListItem>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</ListItem>
              <ListItem>Der Verarbeitung zu widersprechen (Art. 21 DSGVO)</ListItem>
              <ListItem>Deine Einwilligung jederzeit zu widerrufen (Art. 7 Abs. 3 DSGVO)</ListItem>
            </List>
            <Text>
              Zur Ausübung deiner Rechte kontaktiere uns unter:{' '}
              <EmailLink href="mailto:wedding@sarahiver.de">wedding@sarahiver.de</EmailLink>
            </Text>
          </Section>

          <Section>
            <SectionTitle>8. Beschwerderecht</SectionTitle>
            <Text>
              Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung 
              deiner personenbezogenen Daten durch uns zu beschweren.
            </Text>
            <Text>
              Die für uns zuständige Aufsichtsbehörde ist:<br /><br />
              Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit<br />
              Ludwig-Erhard-Str. 22, 7. OG<br />
              20459 Hamburg<br />
              <ExternalLink href="https://datenschutz-hamburg.de" target="_blank" rel="noopener noreferrer">
                https://datenschutz-hamburg.de
              </ExternalLink>
            </Text>
          </Section>

          <Section>
            <SectionTitle>9. Änderungen</SectionTitle>
            <Text>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den 
              aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen 
              umzusetzen. Für deinen erneuten Besuch gilt dann die neue Datenschutzerklärung.
            </Text>
            <Text>
              Stand: Januar 2025
            </Text>
          </Section>
        </Content>

        {/* Footer */}
        <Footer>
          <Divider>
            <DividerLine />
            <DividerSymbol>✦</DividerSymbol>
            <DividerLine />
          </Divider>
          
          <FooterLinks>
            <FooterLink href="/">Startseite</FooterLink>
            <FooterDivider>·</FooterDivider>
            <FooterLink href="/impressum">Impressum</FooterLink>
          </FooterLinks>
          
          <Copyright>© 2025 S&I.</Copyright>
        </Footer>
      </Container>
    </PageWrapper>
  );
};

export default DatenschutzPage;

// ============================================
// STYLES - Editorial Theme
// ============================================

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #FFFFFF;
  padding: 60px 20px;
`;

const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
  animation: ${fadeIn} 0.8s ease;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 60px;
`;

const LogoLink = styled.a`
  text-decoration: none;
`;

const Logo = styled.span`
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.06em;
  color: #FFFFFF;
  background: #000000;
  padding: 10px 18px;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 40px 0;
`;

const DividerLine = styled.div`
  width: 60px;
  height: 1px;
  background: #E5E5E5;
`;

const DividerSymbol = styled.span`
  font-size: 12px;
  color: #CCCCCC;
`;

const PageTitle = styled.h1`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 400;
  font-style: italic;
  color: #1A1A1A;
  margin: 0;
  
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const Content = styled.main``;

const Section = styled.section`
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1A1A1A;
  margin: 0 0 25px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #E5E5E5;
`;

const SubTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1A1A1A;
  margin: 25px 0 10px 0;
`;

const Text = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.8;
  color: #666666;
  margin: 0 0 15px 0;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  strong {
    color: #1A1A1A;
    font-weight: 500;
  }
`;

const List = styled.ul`
  margin: 15px 0;
  padding-left: 20px;
`;

const ListItem = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  line-height: 1.8;
  color: #666666;
  margin-bottom: 8px;
`;

const EmailLink = styled.a`
  color: #1A1A1A;
  text-decoration: none;
  border-bottom: 1px solid #1A1A1A;
  
  &:hover {
    opacity: 0.7;
  }
`;

const ExternalLink = styled.a`
  color: #1A1A1A;
  text-decoration: none;
  border-bottom: 1px solid #1A1A1A;
  word-break: break-all;
  
  &:hover {
    opacity: 0.7;
  }
`;

const Footer = styled.footer`
  margin-top: 80px;
  text-align: center;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const FooterLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #666666;
  text-decoration: none;
  
  &:hover {
    color: #1A1A1A;
  }
`;

const FooterDivider = styled.span`
  color: #CCCCCC;
`;

const Copyright = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #AAAAAA;
  margin: 0;
`;
