// Waitlist Section - Multi-Theme (Contemporary, Editorial & Video)
import React, { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const WaitlistSection = () => {
  const { currentTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  
  // Honeypot - verstecktes Feld das Bots ausfüllen
  const [website, setWebsite] = useState('');
  
  // Timing-Check - speichert wann Komponente geladen wurde
  const loadTime = useRef(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot Check - wenn ausgefüllt, ist es ein Bot
    if (website) {
      console.log('Honeypot triggered - bot detected');
      setStatus({ type: 'success', message: '🎉 Perfekt! Du bist auf der Warteliste.' });
      setEmail('');
      return;
    }
    
    // Timing Check - wenn weniger als 3 Sekunden vergangen sind, ist es verdächtig
    const timeSinceLoad = Date.now() - loadTime.current;
    if (timeSinceLoad < 3000) {
      console.log('Timing check failed - too fast:', timeSinceLoad, 'ms');
      setStatus({ type: 'success', message: '🎉 Perfekt! Du bist auf der Warteliste.' });
      setEmail('');
      return;
    }
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: 'error', message: 'Bitte gib eine gültige E-Mail-Adresse ein.' });
      return;
    }
    
    if (!privacyAccepted) {
      setStatus({ type: 'error', message: 'Bitte akzeptiere die Datenschutzerklärung.' });
      return;
    }
    
    setLoading(true);
    try {
      // Brevo API - Kontakt erstellen + Opt-In Mail senden
      const response = await fetch('/api/brevo-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          themePreference: currentTheme,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setStatus({ 
          type: 'success', 
          message: '📧 Fast geschafft! Bitte bestätige deine E-Mail-Adresse über den Link in deinem Postfach.' 
        });
        setEmail('');
        setPrivacyAccepted(false);
      } else {
        setStatus({ 
          type: 'error', 
          message: data.error || 'Etwas ist schiefgelaufen. Versuch es später noch einmal.' 
        });
      }
    } catch (err) {
      console.error('Waitlist error:', err);
      setStatus({ type: 'error', message: 'Etwas ist schiefgelaufen. Versuch es später noch einmal.' });
    }
    setLoading(false);
  };

  const commonProps = {
    email,
    setEmail,
    status,
    loading,
    handleSubmit,
    privacyAccepted,
    setPrivacyAccepted,
    showPrivacyModal,
    setShowPrivacyModal,
    // Honeypot
    website,
    setWebsite,
  };

  if (currentTheme === 'luxe') {
    return <LuxeWaitlist {...commonProps} />;
  }

  if (currentTheme === 'botanical') {
    return <BotanicalWaitlist {...commonProps} />;
  }

  if (currentTheme === 'video') {
    return <VideoWaitlist {...commonProps} />;
  }

  if (currentTheme === 'editorial') {
    return <EditorialWaitlist {...commonProps} />;
  }

  if (currentTheme === 'neon') {
    return <NeonWaitlist {...commonProps} />;
  }

  return <ContemporaryWaitlist {...commonProps} />;
};

// ============================================
// PRIVACY MODAL COMPONENT
// ============================================
const PrivacyModal = ({ show, onClose, $theme }) => {
  if (!show) return null;
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()} $theme={$theme}>
        <ModalHeader $theme={$theme}>
          <ModalTitle $theme={$theme}>Datenschutzerklärung</ModalTitle>
          <CloseButton onClick={onClose} $theme={$theme}>×</CloseButton>
        </ModalHeader>
        <ModalBody $theme={$theme}>
          <h3>1. Verantwortlicher</h3>
          <p>Sarah & Iver Bohnes<br />
          E-Mail: wedding@sarahiver.de</p>
          
          <h3>2. Erhobene Daten</h3>
          <p>Bei der Anmeldung zur Warteliste erheben wir:</p>
          <ul>
            <li>E-Mail-Adresse</li>
            <li>Bevorzugtes Design-Theme</li>
            <li>Zeitpunkt der Anmeldung</li>
          </ul>
          
          <h3>3. Zweck der Datenverarbeitung</h3>
          <p>Wir verwenden deine Daten ausschließlich, um:</p>
          <ul>
            <li>Dich über den Launch unserer Plattform zu informieren</li>
            <li>Dir deinen exklusiven Launch-Rabatt zuzusenden</li>
          </ul>
          
          <h3>4. Rechtsgrundlage</h3>
          <p>Die Verarbeitung erfolgt auf Grundlage deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</p>
          
          <h3>5. Speicherdauer</h3>
          <p>Deine Daten werden gelöscht, sobald du dich von der Warteliste abmeldest oder der Zweck der Speicherung entfällt.</p>
          
          <h3>6. Deine Rechte</h3>
          <p>Du hast das Recht auf Auskunft, Berichtigung, Löschung und Widerspruch. Kontaktiere uns jederzeit unter wedding@sarahiver.de.</p>
          
          <h3>7. Widerruf</h3>
          <p>Du kannst deine Einwilligung jederzeit widerrufen, indem du uns eine E-Mail sendest.</p>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

// ============================================
// CONTEMPORARY WAITLIST
// ============================================
const ContemporaryWaitlist = ({ email, setEmail, status, loading, handleSubmit, privacyAccepted, setPrivacyAccepted, showPrivacyModal, setShowPrivacyModal }) => (
  <Section id="waitlist" $theme="contemporary">
    <Container>
      <Badge $theme="contemporary">★ BE PART OF IT</Badge>
      
      <TitleGroup>
        <TitleLine $theme="contemporary">JOIN THE</TitleLine>
        <TitleAccent $theme="contemporary">WAITLIST</TitleAccent>
      </TitleGroup>
      
      <Subtitle $theme="contemporary">
        Trag dich ein und sichere dir deinen exklusiven Launch-Rabatt.
      </Subtitle>
      
      <FormWrapper $theme="contemporary">
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            $theme="contemporary"
          />
          <SubmitButton type="submit" disabled={loading} $theme="contemporary">
            {loading ? 'WIRD EINGETRAGEN...' : 'JETZT EINTRAGEN →'}
          </SubmitButton>
        </Form>
        
        <CheckboxWrapper $theme="contemporary">
          <Checkbox
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            id="privacy-contemporary"
          />
          <CheckboxLabel htmlFor="privacy-contemporary" $theme="contemporary">
            Ich akzeptiere die{' '}
            <PrivacyLink onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }} $theme="contemporary">
              Datenschutzerklärung
            </PrivacyLink>
          </CheckboxLabel>
        </CheckboxWrapper>
        
        {status.message && (
          <Message $success={status.type === 'success'} $theme="contemporary">
            {status.message}
          </Message>
        )}
      </FormWrapper>
      
      <RabattHinweis $theme="contemporary">
        💰 Wartelisten-Mitglieder erhalten einen exklusiven Rabatt zum Launch!
      </RabattHinweis>
    </Container>
    
    <PrivacyModal show={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} $theme="contemporary" />
  </Section>
);

// ============================================
// EDITORIAL WAITLIST
// ============================================
const EditorialWaitlist = ({ email, setEmail, status, loading, handleSubmit, privacyAccepted, setPrivacyAccepted, showPrivacyModal, setShowPrivacyModal }) => (
  <Section id="waitlist" $theme="editorial">
    <Container>
      <EditorialTitle>Sichere dir deinen <em>Launch-Rabatt</em></EditorialTitle>
      
      <Subtitle $theme="editorial">
        Trag dich auf unsere Warteliste ein und erhalte einen exklusiven Rabatt zum Launch.
      </Subtitle>
      
      <FormWrapper $theme="editorial">
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            $theme="editorial"
          />
          <SubmitButton type="submit" disabled={loading} $theme="editorial">
            {loading ? 'Wird eingetragen...' : 'Eintragen'}
          </SubmitButton>
        </Form>
        
        <CheckboxWrapper $theme="editorial">
          <Checkbox
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            id="privacy-editorial"
          />
          <CheckboxLabel htmlFor="privacy-editorial" $theme="editorial">
            Ich akzeptiere die{' '}
            <PrivacyLink onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }} $theme="editorial">
              Datenschutzerklärung
            </PrivacyLink>
          </CheckboxLabel>
        </CheckboxWrapper>
        
        {status.message && (
          <Message $success={status.type === 'success'} $theme="editorial">
            {status.message}
          </Message>
        )}
      </FormWrapper>
    </Container>
    
    <PrivacyModal show={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} $theme="editorial" />
  </Section>
);

// ============================================
// VIDEO WAITLIST - Cinematic Dark Style
// ============================================
const VideoWaitlist = ({ email, setEmail, status, loading, handleSubmit, privacyAccepted, setPrivacyAccepted, showPrivacyModal, setShowPrivacyModal }) => (
  <VideoSection id="waitlist">
    <VideoContainer>
      <VideoBadge>— SEI DABEI —</VideoBadge>
      
      <VideoTitle>
        Sichere dir deinen <em>Launch-Rabatt</em>
      </VideoTitle>
      
      <VideoSubtitle>
        Trag dich auf unsere Warteliste ein und erhalte einen exklusiven Rabatt zum Launch.
      </VideoSubtitle>
      
      <VideoFormWrapper>
        <VideoForm onSubmit={handleSubmit}>
          <VideoInput
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <VideoSubmitButton type="submit" disabled={loading}>
            {loading ? 'Wird eingetragen...' : 'Eintragen →'}
          </VideoSubmitButton>
        </VideoForm>
        
        <VideoCheckboxWrapper>
          <Checkbox
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            id="privacy-video"
          />
          <VideoCheckboxLabel htmlFor="privacy-video">
            Ich akzeptiere die{' '}
            <VideoPrivacyLink onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }}>
              Datenschutzerklärung
            </VideoPrivacyLink>
          </VideoCheckboxLabel>
        </VideoCheckboxWrapper>
        
        {status.message && (
          <VideoMessage $success={status.type === 'success'}>
            {status.message}
          </VideoMessage>
        )}
      </VideoFormWrapper>
      
      <VideoRabattHinweis>
        ✦ Wartelisten-Mitglieder erhalten einen exklusiven Rabatt zum Launch
      </VideoRabattHinweis>
    </VideoContainer>
    
    <PrivacyModal show={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} $theme="video" />
  </VideoSection>
);

// ============================================
// BOTANICAL WAITLIST - Nature-inspired Form
// ============================================
const BotanicalWaitlist = ({ email, setEmail, status, loading, handleSubmit, privacyAccepted, setPrivacyAccepted, showPrivacyModal, setShowPrivacyModal }) => (
  <BotanicalWaitlistSection id="waitlist">
    <BotanicalWaitlistContainer>
      <BotanicalWaitlistBadge>✦ SEI DABEI ✦</BotanicalWaitlistBadge>
      
      <BotanicalWaitlistTitle>
        Sichere dir deinen <em>Launch-Rabatt</em>
      </BotanicalWaitlistTitle>
      
      <BotanicalWaitlistSubtitle>
        Trag dich auf unsere Warteliste ein und erhalte einen exklusiven Rabatt zum Launch.
      </BotanicalWaitlistSubtitle>
      
      <BotanicalFormBox>
        <BotanicalForm onSubmit={handleSubmit}>
          <BotanicalInput
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <BotanicalSubmitButton type="submit" disabled={loading}>
            {loading ? 'Wird eingetragen...' : 'Eintragen →'}
          </BotanicalSubmitButton>
        </BotanicalForm>
        
        <BotanicalCheckboxWrapper>
          <Checkbox
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            id="privacy-botanical"
          />
          <BotanicalCheckboxLabel htmlFor="privacy-botanical">
            Ich akzeptiere die{' '}
            <BotanicalPrivacyLink onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }}>
              Datenschutzerklärung
            </BotanicalPrivacyLink>
          </BotanicalCheckboxLabel>
        </BotanicalCheckboxWrapper>
        
        {status.message && (
          <BotanicalFormMessage $success={status.type === 'success'}>
            {status.message}
          </BotanicalFormMessage>
        )}
      </BotanicalFormBox>
      
      <BotanicalRabattHinweis>
        🌿 Wartelisten-Mitglieder erhalten einen exklusiven Rabatt zum Launch
      </BotanicalRabattHinweis>
    </BotanicalWaitlistContainer>
    
    <PrivacyModal show={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} $theme="botanical" />
  </BotanicalWaitlistSection>
);

// ============================================
// LUXE WAITLIST - Elegant Minimal Style
// ============================================
const LuxeWaitlist = ({ email, setEmail, status, loading, handleSubmit, privacyAccepted, setPrivacyAccepted, showPrivacyModal, setShowPrivacyModal }) => (
  <LuxeWaitlistSection id="waitlist">
    <LuxeWaitlistContainer>
      <LuxeWaitlistBadge>SEI DABEI</LuxeWaitlistBadge>
      
      <LuxeWaitlistTitle>
        <em>Sichere dir deinen Launch-Rabatt</em>
      </LuxeWaitlistTitle>
      
      <LuxeWaitlistSubtitle>
        Trag dich auf unsere Warteliste ein und erhalte einen exklusiven Rabatt zum Launch.
      </LuxeWaitlistSubtitle>
      
      <LuxeFormWrapper>
        <LuxeForm onSubmit={handleSubmit}>
          <LuxeInput
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <LuxeSubmitButton type="submit" disabled={loading}>
            {loading ? '...' : '→'}
          </LuxeSubmitButton>
        </LuxeForm>
        
        <LuxeCheckboxWrapper>
          <Checkbox
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            id="privacy-luxe"
          />
          <LuxeCheckboxLabel htmlFor="privacy-luxe">
            Ich akzeptiere die{' '}
            <LuxePrivacyLink onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }}>
              Datenschutzerklärung
            </LuxePrivacyLink>
          </LuxeCheckboxLabel>
        </LuxeCheckboxWrapper>
        
        {status.message && (
          <LuxeFormMessage $success={status.type === 'success'}>
            {status.message}
          </LuxeFormMessage>
        )}
      </LuxeFormWrapper>
    </LuxeWaitlistContainer>
    
    <PrivacyModal show={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} $theme="luxe" />
  </LuxeWaitlistSection>
);

export default WaitlistSection;

// ============================================
// STYLES
// ============================================
const Section = styled.section`
  padding: 100px 5%;
  text-align: center;
  
  ${p => p.$theme === 'contemporary' && css`
    background: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%);
    padding: 120px 5%;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    background: #FAFAFA;
  `}
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Badge = styled.div`
  display: inline-block;
  margin-bottom: 30px;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #0D0D0D;
    color: #FFFFFF;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    padding: 8px 18px;
  `}
`;

const TitleGroup = styled.div`
  margin-bottom: 20px;
`;

const TitleLine = styled.h2`
  line-height: 1.1;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    color: #0D0D0D;
    letter-spacing: -0.02em;
  `}
`;

const TitleAccent = styled.span`
  display: block;
  line-height: 1;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(3rem, 10vw, 6rem);
    font-weight: 700;
    color: #0D0D0D;
    letter-spacing: -0.06em;
  `}
`;

const EditorialTitle = styled.h2`
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #1A1A1A;
  margin-bottom: 20px;
  
  em {
    font-style: italic;
  }
`;

const Subtitle = styled.p`
  max-width: 550px;
  margin: 0 auto 40px;
  line-height: 1.7;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.15rem;
    color: rgba(13, 13, 13, 0.8);
    margin-bottom: 50px;
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    color: #666;
  `}
`;

const FormWrapper = styled.div`
  animation: ${fadeInUp} 0.6s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #FFFFFF;
    padding: 50px 40px;
    margin-bottom: 50px;
    
    @media (max-width: 600px) {
      padding: 35px 25px;
    }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    max-width: 500px;
    margin: 0 auto;
  `}
`;

const Form = styled.form`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  transition: all 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    padding: 18px 20px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    background: #F5F5F5;
    border: 2px solid transparent;
    color: #0D0D0D;
    
    &:focus {
      outline: none;
      border-color: #0D0D0D;
      background: #FFFFFF;
    }
    
    &::placeholder {
      color: rgba(13, 13, 13, 0.4);
    }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    padding: 16px 20px;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    color: #1A1A1A;
    
    &:focus {
      outline: none;
      border-color: #1A1A1A;
    }
    
    &::placeholder {
      color: #999;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 18px 35px;
    background: #0D0D0D;
    color: #FFFFFF;
    border: 2px solid #0D0D0D;
    
    &:hover:not(:disabled) {
      background: #FF6B6B;
      border-color: #FF6B6B;
      transform: translateY(-2px);
    }
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 16px 30px;
    background: #1A1A1A;
    color: #FFFFFF;
    border: none;
    
    &:hover:not(:disabled) {
      background: #333;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 15px 20px;
  margin-bottom: 15px;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    background: ${p.$success ? 'rgba(76, 205, 196, 0.1)' : 'rgba(255, 107, 107, 0.1)'};
    color: ${p.$success ? '#0D0D0D' : '#FF6B6B'};
    border: 2px solid ${p.$success ? '#4ECDC4' : '#FF6B6B'};
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    background: ${p.$success ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 0, 0, 0.05)'};
    color: ${p.$success ? '#1A1A1A' : '#D32F2F'};
    border: 1px solid ${p.$success ? '#E0E0E0' : '#D32F2F'};
  `}
`;

const Privacy = styled.p`
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem;
    color: rgba(13, 13, 13, 0.5);
  `}
  
  ${p => p.$theme === 'editorial' && css`
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: #999;
    margin-top: 20px;
  `}
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Benefit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease;
  
  ${p => p.$theme === 'contemporary' && css`
    background: #FFFFFF;
    padding: 25px 20px;
    
    &:hover {
      transform: translateY(-5px);
    }
  `}
`;

const BenefitIcon = styled.span`
  font-size: 1.8rem;
`;

const BenefitText = styled.span`
  text-align: center;
  
  ${p => p.$theme === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: #0D0D0D;
  `}
`;

// ============================================
// VIDEO THEME STYLES
// ============================================
const VideoSection = styled.section`
  padding: 120px 5%;
  background: #1A1814;
  text-align: center;
`;

const VideoContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const VideoBadge = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8B7355;
  margin-bottom: 25px;
`;

const VideoTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #FFFFFF;
  margin-bottom: 20px;
  
  em {
    font-style: italic;
  }
`;

const VideoSubtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 50px;
`;

const VideoFormWrapper = styled.div`
  margin-bottom: 50px;
`;

const VideoForm = styled.form`
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  border: 1px solid rgba(139, 115, 85, 0.3);
  
  @media (max-width: 600px) {
    flex-direction: column;
    border: none;
  }
`;

const VideoInput = styled.input`
  flex: 1;
  padding: 20px 25px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #FFFFFF;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
  }
  
  @media (max-width: 600px) {
    border: 1px solid rgba(139, 115, 85, 0.3);
    margin-bottom: 10px;
  }
`;

const VideoSubmitButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 20px 35px;
  background: #8B7355;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background: #6B5A45;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const VideoMessage = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  padding: 15px 20px;
  margin-bottom: 15px;
  background: ${p => p.$success ? 'rgba(139, 115, 85, 0.2)' : 'rgba(255, 100, 100, 0.1)'};
  color: ${p => p.$success ? '#C4A87C' : '#FF6B6B'};
  border: 1px solid ${p => p.$success ? 'rgba(139, 115, 85, 0.3)' : 'rgba(255, 100, 100, 0.3)'};
`;

const VideoPrivacy = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
`;

const VideoBenefits = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const VideoBenefit = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VideoBenefitIcon = styled.span`
  color: #8B7355;
  font-size: 0.8rem;
`;

const VideoBenefitText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
`;

const VideoBenefitDivider = styled.span`
  color: rgba(255, 255, 255, 0.2);
  
  @media (max-width: 500px) {
    display: none;
  }
`;

// ============================================
// BOTANICAL THEME STYLES
// ============================================
const BotanicalWaitlistSection = styled.section`
  padding: 120px 5%;
  background: #2C3E2D;
  text-align: center;
`;

const BotanicalWaitlistContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const BotanicalWaitlistBadge = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #7BA889;
  margin-bottom: 25px;
`;

const BotanicalWaitlistTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 400;
  color: #FAF9F6;
  margin-bottom: 15px;
  
  em {
    font-style: italic;
    color: #7BA889;
  }
`;

const BotanicalWaitlistSubtitle = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: rgba(250, 249, 246, 0.7);
  line-height: 1.7;
  margin-bottom: 40px;
`;

const BotanicalFormBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 40px;
  border: 1px solid rgba(123, 168, 137, 0.3);
  border-radius: 20px;
  margin-bottom: 40px;
`;

const BotanicalForm = styled.form`
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const BotanicalInput = styled.input`
  flex: 1;
  padding: 18px 20px;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(123, 168, 137, 0.3);
  border-right: none;
  border-radius: 30px 0 0 30px;
  color: #FAF9F6;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #7BA889;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(250, 249, 246, 0.5);
  }
  
  &:disabled {
    opacity: 0.6;
  }
  
  @media (max-width: 500px) {
    border-radius: 30px;
    border-right: 1px solid rgba(123, 168, 137, 0.3);
  }
`;

const BotanicalSubmitButton = styled.button`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 18px 30px;
  background: #4A7C59;
  color: #FFFFFF;
  border: none;
  border-radius: 0 30px 30px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background: #3A6249;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 500px) {
    border-radius: 30px;
    width: 100%;
  }
`;

const BotanicalFormMessage = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  padding: 15px 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  background: ${p => p.$success ? 'rgba(123, 168, 137, 0.2)' : 'rgba(255, 100, 100, 0.1)'};
  color: ${p => p.$success ? '#7BA889' : '#FF6B6B'};
  border: 1px solid ${p => p.$success ? 'rgba(123, 168, 137, 0.4)' : 'rgba(255, 100, 100, 0.3)'};
`;

const BotanicalPrivacy = styled.p`
  font-family: 'Lato', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(250, 249, 246, 0.5);
`;

const BotanicalBenefitsList = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const BotanicalBenefitItem = styled.span`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(250, 249, 246, 0.8);
`;

// ============================================
// LUXE THEME STYLES
// ============================================
const LuxeWaitlistSection = styled.section`
  padding: 120px 5%;
  background: #FAFAFA;
  text-align: center;
`;

const LuxeWaitlistContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const LuxeWaitlistBadge = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #B8960B;
  margin-bottom: 20px;
`;

const LuxeWaitlistTitle = styled.h2`
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 300;
  color: #1A1A1A;
  margin-bottom: 15px;
  
  em {
    font-style: italic;
  }
`;

const LuxeWaitlistSubtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: #888;
  line-height: 1.7;
  margin-bottom: 40px;
`;

const LuxeFormWrapper = styled.div`
  margin-bottom: 40px;
`;

const LuxeForm = styled.form`
  display: flex;
  border: 1px solid #E5E5E5;
  background: #FFFFFF;
  margin-bottom: 15px;
`;

const LuxeInput = styled.input`
  flex: 1;
  padding: 18px 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  background: transparent;
  border: none;
  color: #1A1A1A;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #888;
  }
  
  &:disabled {
    opacity: 0.6;
  }
`;

const LuxeSubmitButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  padding: 18px 25px;
  background: #1A1A1A;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: #B8960B;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LuxeFormMessage = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  padding: 12px;
  color: ${p => p.$success ? '#1A1A1A' : '#FF6B6B'};
  font-style: italic;
`;

const LuxeBenefitsList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const LuxeBenefitItem = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #888;
`;

const LuxeBenefitDivider = styled.span`
  color: #E5E5E5;
  
  @media (max-width: 400px) {
    display: none;
  }
`;

// ============================================
// MODAL STYLES
// ============================================
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: ${p => (p.$theme === 'video' || p.$theme === 'luxe') ? '#1A1A1A' : '#FFFFFF'};
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: ${p => p.$theme === 'botanical' ? '20px' : '0'};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  border-bottom: 1px solid ${p => (p.$theme === 'video' || p.$theme === 'luxe') ? 'rgba(255,255,255,0.1)' : '#E5E5E5'};
`;

const ModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${p => (p.$theme === 'video' || p.$theme === 'luxe') ? '#FFFFFF' : '#1A1A1A'};
  
  ${p => p.$theme === 'contemporary' && `font-family: 'Space Grotesk', sans-serif;`}
  ${p => p.$theme === 'editorial' && `font-family: 'Inter', sans-serif;`}
  ${p => p.$theme === 'video' && `font-family: 'Montserrat', sans-serif;`}
  ${p => p.$theme === 'botanical' && `font-family: 'Lato', sans-serif;`}
  ${p => p.$theme === 'luxe' && `font-family: 'Montserrat', sans-serif;`}
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: ${p => (p.$theme === 'video' || p.$theme === 'luxe') ? '#FFFFFF' : '#1A1A1A'};
  line-height: 1;
  
  &:hover {
    opacity: 0.7;
  }
`;

const ModalBody = styled.div`
  padding: 30px;
  color: ${p => (p.$theme === 'video' || p.$theme === 'luxe') ? 'rgba(255,255,255,0.8)' : '#333'};
  font-size: 0.9rem;
  line-height: 1.7;
  
  ${p => p.$theme === 'contemporary' && `font-family: 'Space Grotesk', sans-serif;`}
  ${p => p.$theme === 'editorial' && `font-family: 'Inter', sans-serif;`}
  ${p => p.$theme === 'video' && `font-family: 'Montserrat', sans-serif;`}
  ${p => p.$theme === 'botanical' && `font-family: 'Lato', sans-serif;`}
  ${p => p.$theme === 'luxe' && `font-family: 'Montserrat', sans-serif;`}
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 25px 0 10px;
    color: ${p => (p.$theme === 'video' || p.$theme === 'luxe') ? '#FFFFFF' : '#1A1A1A'};
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  ul {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 5px 0;
  }
`;

// ============================================
// CHECKBOX STYLES
// ============================================
const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #FF6B6B;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 15px;
  text-align: left;
  
  ${p => p.$theme === 'contemporary' && `
    justify-content: center;
  `}
  
  ${p => p.$theme === 'editorial' && `
    justify-content: center;
  `}
`;

const CheckboxLabel = styled.label`
  font-size: 0.85rem;
  cursor: pointer;
  
  ${p => p.$theme === 'contemporary' && `
    font-family: 'Space Grotesk', sans-serif;
    color: #0D0D0D;
  `}
  
  ${p => p.$theme === 'editorial' && `
    font-family: 'Inter', sans-serif;
    color: #666;
  `}
`;

const PrivacyLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  
  ${p => p.$theme === 'contemporary' && `
    font-family: 'Space Grotesk', sans-serif;
    color: #0D0D0D;
    font-weight: 600;
  `}
  
  ${p => p.$theme === 'editorial' && `
    font-family: 'Inter', sans-serif;
    color: #1A1A1A;
  `}
  
  &:hover {
    opacity: 0.7;
  }
`;

const RabattHinweis = styled.p`
  margin-top: 40px;
  
  ${p => p.$theme === 'contemporary' && `
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: #0D0D0D;
  `}
`;

// Video Checkbox Styles
const VideoCheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

const VideoCheckboxLabel = styled.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
`;

const VideoPrivacyLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: #C9A962;
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const VideoRabattHinweis = styled.p`
  margin-top: 40px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #C9A962;
  letter-spacing: 0.05em;
`;

// Botanical Checkbox Styles
const BotanicalCheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

const BotanicalCheckboxLabel = styled.label`
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  color: #5A6B5D;
  cursor: pointer;
`;

const BotanicalPrivacyLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: 'Lato', sans-serif;
  font-size: 0.85rem;
  color: #4A7C59;
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const BotanicalRabattHinweis = styled.p`
  margin-top: 40px;
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  color: #4A7C59;
  font-weight: 500;
`;

// Luxe Checkbox Styles
const LuxeCheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const LuxeCheckboxLabel = styled.label`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: #888;
  cursor: pointer;
`;

const LuxePrivacyLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: #B8960B;
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

// ============================================
// NEON WAITLIST
// ============================================

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.5); }
`;

const NeonWaitlist = ({ email, setEmail, status, loading, handleSubmit, privacyAccepted, setPrivacyAccepted, showPrivacyModal, setShowPrivacyModal }) => (
  <NeonWaitlistSection id="waitlist">
    <NeonWaitlistGrid />
    
    {/* Geometric decorations */}
    <NeonWaitlistDecor>
      <NeonDecorLine style={{ top: '20%', left: '5%', width: '100px' }} />
      <NeonDecorLine style={{ bottom: '30%', right: '5%', width: '150px' }} $vertical />
      <NeonDecorCorner style={{ top: '10%', right: '10%' }} />
      <NeonDecorCorner style={{ bottom: '15%', left: '8%' }} $flip />
    </NeonWaitlistDecor>
    
    <NeonWaitlistContainer>
      <NeonWaitlistContent>
        <NeonWaitlistBadge>// JOIN_WAITLIST</NeonWaitlistBadge>
        <NeonWaitlistTitle>
          BE <NeonWaitlistHighlight>FIRST</NeonWaitlistHighlight> IN LINE
        </NeonWaitlistTitle>
        <NeonWaitlistSubtitle>
          Sichere dir jetzt deinen Platz auf unserer exklusiven Warteliste 
          und erhalte als Erster Zugang zu unseren einzigartigen Hochzeitswebsites.
        </NeonWaitlistSubtitle>
        
        <NeonWaitlistForm onSubmit={handleSubmit}>
          <NeonInputWrapper>
            <NeonInputIcon>@</NeonInputIcon>
            <NeonInput
              type="email"
              placeholder="deine@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </NeonInputWrapper>
          
          <NeonCheckboxWrapper>
            <NeonCheckbox
              type="checkbox"
              id="neon-privacy"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
            />
            <NeonCheckboxLabel htmlFor="neon-privacy">
              Ich akzeptiere die{' '}
              <NeonPrivacyLink type="button" onClick={() => setShowPrivacyModal(true)}>
                Datenschutzerklärung
              </NeonPrivacyLink>
            </NeonCheckboxLabel>
          </NeonCheckboxWrapper>
          
          <NeonSubmitButton type="submit" disabled={loading}>
            {loading ? (
              <>PROCESSING<NeonLoadingDots>...</NeonLoadingDots></>
            ) : (
              <>INITIALIZE<NeonButtonArrow>→</NeonButtonArrow></>
            )}
          </NeonSubmitButton>
          
          {status.message && (
            <NeonStatusMessage $type={status.type}>
              {status.type === 'success' ? '✓' : '!'} {status.message}
            </NeonStatusMessage>
          )}
        </NeonWaitlistForm>
        
        <NeonWaitlistBonus>
          <NeonBonusIcon>🎁</NeonBonusIcon>
          <NeonBonusText>
            <strong>EARLY_ACCESS_BONUS:</strong> 15% Launch-Rabatt für alle Wartelisten-Member
          </NeonBonusText>
        </NeonWaitlistBonus>
      </NeonWaitlistContent>
    </NeonWaitlistContainer>
    
    <PrivacyModal 
      show={showPrivacyModal} 
      onClose={() => setShowPrivacyModal(false)} 
      $theme="neon" 
    />
  </NeonWaitlistSection>
);

const NeonWaitlistSection = styled.section`
  position: relative;
  padding: 120px 5%;
  background: linear-gradient(180deg, #0a0a0f 0%, #0f0a18 50%, #0a0a0f 100%);
  overflow: hidden;
`;

const NeonWaitlistGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 0, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
`;

const NeonWaitlistDecor = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
`;

const NeonDecorLine = styled.div`
  position: absolute;
  height: ${p => p.$vertical ? '100px' : '2px'};
  width: ${p => p.$vertical ? '2px' : '100px'};
  background: linear-gradient(${p => p.$vertical ? '180deg' : '90deg'}, #00ffff, transparent);
  opacity: 0.3;
`;

const NeonDecorCorner = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(0, 255, 255, 0.2);
  border-right: none;
  border-bottom: none;
  transform: ${p => p.$flip ? 'rotate(180deg)' : 'none'};
`;

const NeonWaitlistContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 600px;
  margin: 0 auto;
`;

const NeonWaitlistContent = styled.div`
  text-align: center;
  animation: ${fadeInUp} 0.8s ease;
`;

const NeonWaitlistBadge = styled.div`
  font-family: 'Space Grotesk', monospace;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #00ff88;
  margin-bottom: 20px;
`;

const NeonWaitlistTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 20px;
`;

const NeonWaitlistHighlight = styled.span`
  color: #00ffff;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
`;

const NeonWaitlistSubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 40px;
`;

const NeonWaitlistForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const NeonInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const NeonInputIcon = styled.span`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #00ffff;
`;

const NeonInput = styled.input`
  width: 100%;
  padding: 18px 20px 18px 50px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(0, 255, 255, 0.3);
  color: #FFFFFF;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  
  &:focus {
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  }
`;

const NeonCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NeonCheckbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #00ffff;
  cursor: pointer;
`;

const NeonCheckboxLabel = styled.label`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
`;

const NeonPrivacyLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: #00ffff;
  text-decoration: underline;
  cursor: pointer;
  
  &:hover {
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
`;

const NeonSubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 50px;
  background: transparent;
  border: 2px solid #ff00ff;
  color: #ff00ff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: rgba(255, 0, 255, 0.1);
    box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NeonLoadingDots = styled.span`
  animation: ${keyframes`
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  `} 1s infinite;
`;

const NeonButtonArrow = styled.span`
  transition: transform 0.3s ease;
  
  ${NeonSubmitButton}:hover:not(:disabled) & {
    transform: translateX(5px);
  }
`;

const NeonStatusMessage = styled.div`
  padding: 15px 25px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  background: ${p => p.$type === 'success' 
    ? 'rgba(0, 255, 136, 0.1)' 
    : 'rgba(255, 0, 100, 0.1)'};
  border: 1px solid ${p => p.$type === 'success' 
    ? 'rgba(0, 255, 136, 0.3)' 
    : 'rgba(255, 0, 100, 0.3)'};
  color: ${p => p.$type === 'success' ? '#00ff88' : '#ff0064'};
`;

const NeonWaitlistBonus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
  padding: 20px;
  background: rgba(0, 255, 255, 0.05);
  border: 1px dashed rgba(0, 255, 255, 0.2);
`;

const NeonBonusIcon = styled.span`
  font-size: 1.5rem;
`;

const NeonBonusText = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  
  strong {
    color: #00ffff;
  }
`;
