// Confirm Page - Double Opt-In Bestätigung (Editorial Style)
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ConfirmPage = () => {
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error', 'already'
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    document.title = 'Bestätigung – S&I.';

    // Get email from URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');

    if (!email) {
      setStatus('error');
      setMessage('Ungültiger Bestätigungslink.');
      return;
    }

    // Confirm via Brevo API
    const confirm = async () => {
      try {
        const response = await fetch('/api/brevo-confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          if (data.alreadyConfirmed) {
            setStatus('already');
            setMessage('Du hast deine E-Mail bereits bestätigt.');
          } else {
            setStatus('success');
            setMessage('Deine E-Mail wurde erfolgreich bestätigt!');
          }
        } else {
          setStatus('error');
          setMessage(data.error || 'Ein Fehler ist aufgetreten.');
        }
      } catch (error) {
        console.error('Confirm error:', error);
        setStatus('error');
        setMessage('Ein Fehler ist aufgetreten.');
      }
    };

    confirm();

    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <PageWrapper>
      <Container>
        {/* Logo */}
        <LogoWrapper>
          <Logo>S&I.</Logo>
        </LogoWrapper>

        {/* Elegant Divider */}
        <Divider>
          <DividerLine />
          <DividerSymbol>✦</DividerSymbol>
          <DividerLine />
        </Divider>

        {/* Content based on status */}
        {status === 'loading' && (
          <Content>
            <Title>Einen Moment...</Title>
            <Text>Wir bestätigen deine Anmeldung.</Text>
          </Content>
        )}

        {status === 'success' && (
          <Content>
            <SuccessIcon>✓</SuccessIcon>
            <Title>Wunderbar!</Title>
            <Text>
              Du bist jetzt offiziell auf unserer Warteliste und erhältst 
              einen exklusiven Rabatt, sobald wir starten.
            </Text>
            <Highlight>Wir freuen uns auf dich!</Highlight>
          </Content>
        )}

        {status === 'already' && (
          <Content>
            <AlreadyIcon>✦</AlreadyIcon>
            <Title>Bereits bestätigt</Title>
            <Text>
              Du hast deine E-Mail-Adresse bereits bestätigt. 
              Wir melden uns bei dir, sobald es losgeht!
            </Text>
          </Content>
        )}

        {status === 'error' && (
          <Content>
            <ErrorIcon>✕</ErrorIcon>
            <Title>Etwas stimmt nicht</Title>
            <Text>{message}</Text>
            <ErrorHint>
              Falls das Problem weiterhin besteht, kontaktiere uns unter{' '}
              <EmailLink href="mailto:wedding@sarahiver.de">wedding@sarahiver.de</EmailLink>
            </ErrorHint>
          </Content>
        )}

        {/* Divider */}
        <Divider>
          <DividerLine />
          <DividerSymbol>✦</DividerSymbol>
          <DividerLine />
        </Divider>

        {/* Back Link */}
        <BackLink href="/">
          Zurück zur Startseite
        </BackLink>

        {/* Signature */}
        <Signature>
          <SignatureName>Sarah & Iver</SignatureName>
          <SignatureRole>Gründer von S&I.</SignatureRole>
        </Signature>

        {/* Footer */}
        <Footer>
          <FooterLink href="mailto:wedding@sarahiver.de">wedding@sarahiver.de</FooterLink>
          <FooterCopy>© 2026 S&I.</FooterCopy>
        </Footer>
      </Container>
    </PageWrapper>
  );
};

export default ConfirmPage;

// ============================================
// STYLES - Editorial Theme
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

const Highlight = styled.p`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.2rem;
  font-style: italic;
  color: #1A1A1A;
  margin: 30px 0 0 0;
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

const AlreadyIcon = styled.div`
  font-size: 2rem;
  color: #CCCCCC;
  margin-bottom: 25px;
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

const ErrorHint = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #999999;
  margin-top: 25px;
`;

const EmailLink = styled.a`
  color: #1A1A1A;
  text-decoration: underline;
  
  &:hover {
    opacity: 0.7;
  }
`;

const BackLink = styled.a`
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1A1A1A;
  text-decoration: none;
  padding: 14px 35px;
  border: 1px solid #1A1A1A;
  transition: all 0.3s ease;
  margin-bottom: 50px;
  
  &:hover {
    background: #1A1A1A;
    color: #FFFFFF;
  }
`;

const Signature = styled.div`
  margin-bottom: 40px;
`;

const SignatureName = styled.p`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.2rem;
  font-style: italic;
  color: #1A1A1A;
  margin: 0 0 5px 0;
`;

const SignatureRole = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #AAAAAA;
  margin: 0;
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
