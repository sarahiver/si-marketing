// Impressum Page - Editorial Style
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ImpressumPage = () => {
  useEffect(() => {
    document.title = 'Impressum – S&I.';
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
          
          <PageTitle>Impressum</PageTitle>
        </Header>

        {/* Content */}
        <Content>
          <Section>
            <SectionTitle>Angaben gemäß § 5 TMG</SectionTitle>
            <Text>
              S&I. wedding<br />
              Sarah & Iver Bohnes<br />
              Große Freiheit 82<br />
              22767 Hamburg
            </Text>
          </Section>

          <Section>
            <SectionTitle>Kontakt</SectionTitle>
            <Text>
              E-Mail: <EmailLink href="mailto:wedding@sarahiver.de">wedding@sarahiver.de</EmailLink>
            </Text>
          </Section>

          <Section>
            <SectionTitle>Umsatzsteuer-ID</SectionTitle>
            <Text>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              [wird nach Gewerbeanmeldung ergänzt]
            </Text>
          </Section>

          <Section>
            <SectionTitle>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</SectionTitle>
            <Text>
              Sarah & Iver Bohnes<br />
              Große Freiheit 82<br />
              22767 Hamburg
            </Text>
          </Section>

          <Section>
            <SectionTitle>EU-Streitschlichtung</SectionTitle>
            <Text>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <ExternalLink href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr/
              </ExternalLink>
            </Text>
            <Text>
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </Text>
          </Section>

          <Section>
            <SectionTitle>Verbraucherstreitbeilegung / Universalschlichtungsstelle</SectionTitle>
            <Text>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </Text>
          </Section>

          <Section>
            <SectionTitle>Haftung für Inhalte</SectionTitle>
            <Text>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
              Tätigkeit hinweisen.
            </Text>
            <Text>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
              erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei 
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </Text>
          </Section>

          <Section>
            <SectionTitle>Haftung für Links</SectionTitle>
            <Text>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
              Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche 
              Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </Text>
            <Text>
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete 
              Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen 
              werden wir derartige Links umgehend entfernen.
            </Text>
          </Section>

          <Section>
            <SectionTitle>Urheberrecht</SectionTitle>
            <Text>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
              deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der 
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung 
              des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den 
              privaten, nicht kommerziellen Gebrauch gestattet.
            </Text>
            <Text>
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die 
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. 
              Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen 
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte 
              umgehend entfernen.
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
            <FooterLink href="/datenschutz">Datenschutz</FooterLink>
          </FooterLinks>
          
          <Copyright>© 2025 S&I.</Copyright>
        </Footer>
      </Container>
    </PageWrapper>
  );
};

export default ImpressumPage;

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
`;

const Content = styled.main``;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1A1A1A;
  margin: 0 0 15px 0;
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
