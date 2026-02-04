// src/components/shared/ConfirmPage.js
// Double Opt-In Bestätigung für Waitlist UND Kontaktanfragen
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { supabase } from '../../config/supabase';

const BREVO_API_KEY = process.env.REACT_APP_BREVO_API_KEY;

const ConfirmPage = () => {
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error', 'already'
  const [message, setMessage] = useState('');
  const [confirmType, setConfirmType] = useState('waitlist'); // 'waitlist' or 'contact'

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    document.title = 'Bestätigung – S&I.';

    // Get params from URL
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const type = params.get('type') || 'waitlist';
    const contactId = params.get('id');
    
    setConfirmType(type);

    if (!email) {
      setStatus('error');
      setMessage('Ungültiger Bestätigungslink.');
      return;
    }

    const confirm = async () => {
      try {
        if (type === 'contact' && contactId) {
          // Confirm contact request
          const { data: existingContact, error: fetchError } = await supabase
            .from('contact_requests')
            .select('email_confirmed')
            .eq('id', contactId)
            .single();
          
          if (fetchError) throw new Error('Kontaktanfrage nicht gefunden.');
          
          if (existingContact?.email_confirmed) {
            setStatus('already');
            setMessage('Du hast deine E-Mail bereits bestätigt.');
            return;
          }
          
          // Update contact request
          const { error: updateError } = await supabase
            .from('contact_requests')
            .update({ 
              email_confirmed: true,
              confirmed_at: new Date().toISOString()
            })
            .eq('id', contactId);
          
          if (updateError) throw updateError;
          
          // Update Brevo contact attribute
          if (BREVO_API_KEY) {
            await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
              method: 'PUT',
              headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                attributes: {
                  EMAIL_BESTAETIGT: true,
                  BESTAETIGT_AM: new Date().toISOString(),
                },
              }),
            });
          }
          
          setStatus('success');
          setMessage('Deine Kontaktanfrage wurde bestätigt!');
          
        } else {
          // Original waitlist confirmation via API
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
        }
      } catch (error) {
        console.error('Confirm error:', error);
        setStatus('error');
        setMessage(error.message || 'Ein Fehler ist aufgetreten.');
      }
    };

    confirm();

    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const getSuccessContent = () => {
    if (confirmType === 'contact') {
      return {
        title: 'Vielen Dank!',
        text: 'Deine Kontaktanfrage wurde bestätigt. Wir melden uns innerhalb von 24 Stunden bei dir.',
        highlight: 'Wir freuen uns auf das Gespräch!',
      };
    }
    return {
      title: 'Wunderbar!',
      text: 'Du bist jetzt offiziell auf unserer Warteliste und erhältst einen exklusiven Rabatt, sobald wir starten.',
      highlight: 'Wir freuen uns auf dich!',
    };
  };

  const successContent = getSuccessContent();

  return (
    <PageWrapper>
      <Container>
        <LogoWrapper>
          <Logo>S&I.</Logo>
        </LogoWrapper>

        <Divider>
          <DividerLine />
          <DividerSymbol>✦</DividerSymbol>
          <DividerLine />
        </Divider>

        {status === 'loading' && (
          <Content>
            <Title>Einen Moment...</Title>
            <Text>Wir bestätigen deine {confirmType === 'contact' ? 'Anfrage' : 'Anmeldung'}.</Text>
          </Content>
        )}

        {status === 'success' && (
          <Content>
            <SuccessIcon>✓</SuccessIcon>
            <Title>{successContent.title}</Title>
            <Text>{successContent.text}</Text>
            <Highlight>{successContent.highlight}</Highlight>
          </Content>
        )}

        {status === 'already' && (
          <Content>
            <AlreadyIcon>✦</AlreadyIcon>
            <Title>Bereits bestätigt</Title>
            <Text>
              {confirmType === 'contact' 
                ? 'Du hast deine Kontaktanfrage bereits bestätigt. Wir melden uns bald bei dir!'
                : 'Du hast deine E-Mail-Adresse bereits bestätigt. Wir melden uns bei dir, sobald es losgeht!'
              }
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

        <Divider>
          <DividerLine />
          <DividerSymbol>✦</DividerSymbol>
          <DividerLine />
        </Divider>

        <BackLink href="/">
          Zurück zur Startseite
        </BackLink>

        <Signature>
          <SignatureName>Sarah & Iver</SignatureName>
          <SignatureRole>Gründer von S&I.</SignatureRole>
        </Signature>

        <Footer>
          <FooterLink href="mailto:wedding@sarahiver.de">wedding@sarahiver.de</FooterLink>
          <FooterCopy>© {new Date().getFullYear()} S&I.</FooterCopy>
        </Footer>
      </Container>
    </PageWrapper>
  );
};

export default ConfirmPage;

// ============================================
// STYLES
// ============================================
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
