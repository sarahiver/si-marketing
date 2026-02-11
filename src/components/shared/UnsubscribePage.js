// Unsubscribe Page - Abmeldung von der Warteliste
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const UnsubscribePage = () => {
  const [status, setStatus] = useState('confirm'); // 'confirm', 'loading', 'success', 'error'
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    document.title = 'Abmelden – S&I.';

    // Get email from URL
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    } else {
      setStatus('error');
    }

    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const handleUnsubscribe = async () => {
    if (!email) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/brevo-unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
      setStatus('error');
    }
  };

  return (
    <PageWrapper>
      <Container>
        {/* Logo */}
        <LogoWrapper>
          <Logo>S&I.</Logo>
        </LogoWrapper>

        {/* Divider */}
        <Divider>
          <DividerLine />
          <DividerSymbol>✦</DividerSymbol>
          <DividerLine />
        </Divider>

        {/* Confirm */}
        {status === 'confirm' && (
          <Content>
            <Title>Abmelden?</Title>
            <Text>
              Möchtest du dich wirklich von unserer Warteliste abmelden?
              Du verpasst dann unseren exklusiven Launch-Rabatt.
            </Text>
            {email && (
              <EmailDisplay>{email}</EmailDisplay>
            )}
            <ButtonGroup>
              <UnsubscribeButton onClick={handleUnsubscribe}>
                Ja, abmelden
              </UnsubscribeButton>
              <BackLink href="/">
                Nein, zurück zur Startseite
              </BackLink>
            </ButtonGroup>
          </Content>
        )}

        {/* Loading */}
        {status === 'loading' && (
          <Content>
            <Title>Einen Moment...</Title>
            <Text>Wir bearbeiten deine Anfrage.</Text>
          </Content>
        )}

        {/* Success */}
        {status === 'success' && (
          <Content>
            <SuccessIcon>✓</SuccessIcon>
            <Title>Abgemeldet</Title>
            <Text>
              Du wurdest erfolgreich von der Warteliste entfernt.
              Falls du es dir anders überlegst, kannst du dich jederzeit wieder anmelden.
            </Text>
            <BackLinkButton href="/">
              Zurück zur Startseite
            </BackLinkButton>
          </Content>
        )}

        {/* Error */}
        {status === 'error' && (
          <Content>
            <ErrorIcon>✕</ErrorIcon>
            <Title>Etwas stimmt nicht</Title>
            <Text>
              Die Abmeldung konnte nicht durchgeführt werden.
              Bitte kontaktiere uns direkt.
            </Text>
            <ContactLink href="mailto:wedding@sarahiver.de">wedding@sarahiver.de</ContactLink>
            <BackLinkButton href="/">
              Zurück zur Startseite
            </BackLinkButton>
          </Content>
        )}

        {/* Divider */}
        <Divider>
          <DividerLine />
          <DividerSymbol>✦</DividerSymbol>
          <DividerLine />
        </Divider>

        {/* Footer */}
        <Footer>
          <FooterLink href="mailto:wedding@sarahiver.de">wedding@sarahiver.de</FooterLink>
          <FooterCopy>© 2026 S&I.</FooterCopy>
        </Footer>
      </Container>
    </PageWrapper>
  );
};

export default UnsubscribePage;

// ============================================
// STYLES
// ============================================

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  text-align: center;
  animation: ${fadeIn} 0.8s ease;
`;

const LogoWrapper = styled.div`
  margin-bottom: 50px;
`;

const Logo = styled.span`
  display: inline-block;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -1px;
  color: #FFFFFF;
  background: #000000;
  padding: 10px 18px;
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

const Content = styled.div`
  padding: 20px 0;
`;

const Title = styled.h1`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 400;
  font-style: italic;
  color: #1A1A1A;
  margin: 0 0 25px 0;
  line-height: 1.2;
  
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const Text = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.8;
  color: #666666;
  margin: 0 0 20px 0;
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;
`;

const EmailDisplay = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #1A1A1A;
  background: #F5F5F5;
  padding: 12px 20px;
  border-radius: 4px;
  margin: 25px auto;
  display: inline-block;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-top: 35px;
`;

const UnsubscribeButton = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #FFFFFF;
  background: #1A1A1A;
  padding: 16px 40px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #333333;
  }
`;

const BackLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #999999;
  text-decoration: none;
  
  &:hover {
    color: #1A1A1A;
  }
`;

const BackLinkButton = styled.a`
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1A1A1A;
  text-decoration: none;
  padding: 16px 40px;
  border: 1px solid #1A1A1A;
  transition: all 0.3s ease;
  margin-top: 30px;
  
  &:hover {
    background: #1A1A1A;
    color: #FFFFFF;
  }
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid #1A1A1A;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #1A1A1A;
  margin: 0 auto 30px;
`;

const ErrorIcon = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid #FF6B6B;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #FF6B6B;
  margin: 0 auto 30px;
`;

const ContactLink = styled.a`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #1A1A1A;
  text-decoration: underline;
  margin: 20px 0;
  
  &:hover {
    opacity: 0.7;
  }
`;

const Footer = styled.div`
  padding-top: 30px;
  border-top: 1px solid #F0F0F0;
`;

const FooterLink = styled.a`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #999999;
  text-decoration: none;
  margin-bottom: 8px;
  
  &:hover {
    color: #1A1A1A;
  }
`;

const FooterCopy = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #CCCCCC;
  margin: 0;
`;
