import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { addToWaitlist } from '../config/supabase';

const WaitlistForm = ({ currentTheme }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: 'error', message: 'Bitte gib eine gültige E-Mail-Adresse ein.' });
      setLoading(false);
      return;
    }

    try {
      const result = await addToWaitlist(email, currentTheme);
      
      if (result.success) {
        setStatus({ 
          type: 'success', 
          message: 'Perfekt! Du bist auf der Warteliste. Wir melden uns bald!' 
        });
        setEmail('');
      } else {
        setStatus({ 
          type: 'error', 
          message: result.error || 'Etwas ist schiefgelaufen. Bitte versuche es erneut.' 
        });
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.' 
      });
    }
    
    setLoading(false);
  };

  return (
    <Container>
      <Title>Sei dabei von Anfang an</Title>
      <Subtitle>
        Trag dich auf unsere Warteliste ein und erhalte exklusiven Zugang 
        zum Launch sowie besondere Angebote für Early Birds.
      </Subtitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="deine@email.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          aria-label="E-Mail-Adresse"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Wird eingetragen...' : 'Eintragen'}
        </Button>
      </Form>
      {status.message && (
        <Message $success={status.type === 'success'}>
          {status.type === 'success' ? '✓ ' : '✗ '}{status.message}
        </Message>
      )}
      <PrivacyNote>
        Deine Daten sind bei uns sicher. Kein Spam, versprochen.
      </PrivacyNote>
    </Container>
  );
};

export default WaitlistForm;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styles
const Container = styled.section`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: ${props => props.theme.style === 'magazine' || props.theme.style === 'luxury' ? '400' : '600'};
  font-style: ${props => props.theme.style === 'magazine' || props.theme.style === 'luxury' ? 'italic' : 'normal'};
  color: ${props => props.theme.colors.primary};
  text-align: center;
  max-width: 500px;
`;

const Subtitle = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: ${props => props.theme.colors.textMuted};
  text-align: center;
  max-width: 450px;
  line-height: 1.7;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem 1.25rem;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  background: ${props => props.theme.colors.cardBg};
  border: 2px solid ${props => props.theme.colors.primary}40;
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.colors.glow !== 'none' ? props.theme.colors.glow : 'none'};
  }
  
  &:disabled {
    opacity: 0.6;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-family: ${props => props.theme.fonts.heading};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: ${props => props.theme.colors.primary};
  color: ${props => {
    const style = props.theme.style;
    return ['botanical', 'editorial', 'contemporary'].includes(style) 
      ? '#ffffff' 
      : props.theme.colors.background;
  }};
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.colors.glow !== 'none' ? props.theme.colors.glow : '0 4px 20px rgba(0,0,0,0.2)'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;
  padding: 1rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius};
  text-align: center;
  background: ${props => props.$success 
    ? 'rgba(76, 175, 80, 0.1)' 
    : 'rgba(244, 67, 54, 0.1)'
  };
  color: ${props => props.$success ? '#4CAF50' : '#f44336'};
  border: 1px solid ${props => props.$success ? '#4CAF50' : '#f44336'};
  animation: ${fadeIn} 0.3s ease-out;
`;

const PrivacyNote = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textMuted};
  text-align: center;
  max-width: 350px;
`;
