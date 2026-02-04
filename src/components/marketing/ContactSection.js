// src/components/marketing/ContactSection.js
// 1:1 Theme-Designs aus si-wedding-themes
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// BASE STYLES
// ============================================
const Section = styled.section`
  padding: clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem);
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

// ============================================
// EDITORIAL THEME
// ============================================
const EditorialSection = styled(Section)`
  background: #0A0A0A;
`;

const EditorialEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #C41E3A;
  margin-bottom: 1rem;
`;

const EditorialTitle = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #FAFAFA;
  margin-bottom: 1rem;
`;

const EditorialSubtitle = styled.p`
  font-family: 'Source Serif 4', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.6);
`;

const EditorialForm = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const EditorialFormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const EditorialLabel = styled.label`
  display: block;
  font-family: 'Oswald', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
`;

const EditorialInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #FAFAFA;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #C41E3A;
  }
  
  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const EditorialTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #FAFAFA;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #C41E3A;
  }
  
  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const EditorialButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FAFAFA;
  background: #C41E3A;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { background: #a01830; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// ============================================
// BOTANICAL THEME
// ============================================
const BotanicalSection = styled(Section)`
  background: #040604;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 100%, rgba(45, 90, 60, 0.1) 0%, transparent 50%);
  }
`;

const BotanicalEyebrow = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
`;

const BotanicalTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1rem;
`;

const BotanicalSubtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
`;

const BotanicalFormCard = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
`;

const BotanicalLabel = styled.label`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
`;

const BotanicalInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.95);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const BotanicalTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.95);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const BotanicalButton = styled.button`
  width: 100%;
  padding: 1.1rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #040604;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:hover { background: #fff; transform: translateY(-2px); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// ============================================
// CONTEMPORARY THEME
// ============================================
const ContemporarySection = styled(Section)`
  background: #FFE66D;
`;

const ContemporaryEyebrow = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #FF6B6B;
  margin-bottom: 1rem;
`;

const ContemporaryTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 1rem;
`;

const ContemporarySubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #525252;
`;

const ContemporaryFormCard = styled.div`
  background: #FFFFFF;
  border: 3px solid #0D0D0D;
  padding: 2rem;
  box-shadow: 8px 8px 0 #0D0D0D;
`;

const ContemporaryLabel = styled.label`
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #0D0D0D;
  margin-bottom: 0.5rem;
`;

const ContemporaryInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #0D0D0D;
  background: #FAFAFA;
  border: 2px solid #0D0D0D;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    box-shadow: 4px 4px 0 #4ECDC4;
  }
  
  &::placeholder { color: #A3A3A3; }
`;

const ContemporaryTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #0D0D0D;
  background: #FAFAFA;
  border: 2px solid #0D0D0D;
  min-height: 150px;
  resize: vertical;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    box-shadow: 4px 4px 0 #4ECDC4;
  }
  
  &::placeholder { color: #A3A3A3; }
`;

const ContemporaryButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #FAFAFA;
  background: #FF6B6B;
  border: 3px solid #0D0D0D;
  box-shadow: 6px 6px 0 #0D0D0D;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover { transform: translate(-3px, -3px); box-shadow: 9px 9px 0 #0D0D0D; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// ============================================
// LUXE THEME
// ============================================
const LuxeSection = styled(Section)`
  background: #0A0A0A;
`;

const LuxeEyebrow = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: #C9A962;
  margin-bottom: 1rem;
`;

const LuxeTitle = styled.h2`
  font-family: 'Cormorant', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 300;
  font-style: italic;
  color: #F8F6F3;
  margin-bottom: 1rem;
`;

const LuxeSubtitle = styled.p`
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  color: rgba(248, 246, 243, 0.6);
`;

const LuxeLabel = styled.label`
  display: block;
  font-family: 'Outfit', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(248, 246, 243, 0.5);
  margin-bottom: 0.5rem;
`;

const LuxeInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  color: #F8F6F3;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(248, 246, 243, 0.2);
  transition: all 0.4s ease;
  
  &:focus {
    outline: none;
    border-color: #C9A962;
  }
  
  &::placeholder { color: rgba(248, 246, 243, 0.3); }
`;

const LuxeTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  color: #F8F6F3;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(248, 246, 243, 0.2);
  min-height: 150px;
  resize: vertical;
  transition: all 0.4s ease;
  
  &:focus {
    outline: none;
    border-color: #C9A962;
  }
  
  &::placeholder { color: rgba(248, 246, 243, 0.3); }
`;

const LuxeButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  font-family: 'Outfit', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #0A0A0A;
  background: #C9A962;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  
  &:hover { background: #d4b66f; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// ============================================
// NEON THEME
// ============================================
const NeonSection = styled(Section)`
  background: #0a0a0f;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 50%, rgba(0, 255, 255, 0.03) 0%, transparent 50%);
  }
`;

const NeonEyebrow = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  margin-bottom: 1rem;
`;

const NeonTitle = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 1rem;
`;

const NeonSubtitle = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
`;

const NeonFormCard = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(0, 255, 255, 0.2);
  padding: 2.5rem;
`;

const NeonLabel = styled.label`
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ff00ff;
  margin-bottom: 0.5rem;
`;

const NeonInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
  }
  
  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const NeonTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(0, 255, 255, 0.2);
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
  }
  
  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const NeonButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #00ffff;
  background: transparent;
  border: 1px solid #00ffff;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { 
    background: rgba(0, 255, 255, 0.1);
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.5);
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// ============================================
// VIDEO THEME
// ============================================
const VideoSection = styled(Section)`
  background: #0A0A0A;
`;

const VideoEyebrow = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #6B8CAE;
  margin-bottom: 1rem;
`;

const VideoTitle = styled.h2`
  font-family: 'Manrope', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 1rem;
`;

const VideoSubtitle = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #B0B0B0;
`;

const VideoLabel = styled.label`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
`;

const VideoInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #FFFFFF;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #6B8CAE;
  }
  
  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const VideoTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #FFFFFF;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #6B8CAE;
  }
  
  &::placeholder { color: rgba(255, 255, 255, 0.3); }
`;

const VideoButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FFFFFF;
  background: #6B8CAE;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { background: #7d9cba; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

// ============================================
// SUCCESS MESSAGE
// ============================================
const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    opacity: 0.7;
  }
`;

// ============================================
// MAIN COMPONENT
// ============================================
const ContactSection = () => {
  const { currentTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  const renderForm = (InputComp, TextareaComp, LabelComp, ButtonComp, FormWrapper = 'form') => {
    if (isSuccess) {
      return (
        <SuccessMessage>
          <h3>✓ Nachricht gesendet!</h3>
          <p>Wir melden uns innerhalb von 24 Stunden bei euch.</p>
        </SuccessMessage>
      );
    }

    const formContent = (
      <>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <LabelComp>Name</LabelComp>
              <InputComp name="name" value={formData.name} onChange={handleChange} placeholder="Euer Name" required />
            </div>
            <div>
              <LabelComp>E-Mail</LabelComp>
              <InputComp type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@beispiel.de" required />
            </div>
          </div>
          <div>
            <LabelComp>Hochzeitsdatum (optional)</LabelComp>
            <InputComp type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>
          <div>
            <LabelComp>Nachricht</LabelComp>
            <TextareaComp name="message" value={formData.message} onChange={handleChange} placeholder="Erzählt uns von eurer Hochzeit..." required />
          </div>
          <ButtonComp type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
          </ButtonComp>
        </div>
      </>
    );

    if (FormWrapper === 'form') {
      return <form onSubmit={handleSubmit}>{formContent}</form>;
    }
    return <FormWrapper as="form" onSubmit={handleSubmit}>{formContent}</FormWrapper>;
  };

  // EDITORIAL
  if (currentTheme === 'editorial') {
    return (
      <EditorialSection id="contact">
        <Container>
          <Header>
            <EditorialEyebrow>Kontakt</EditorialEyebrow>
            <EditorialTitle>Schreibt uns</EditorialTitle>
            <EditorialSubtitle>Wir freuen uns auf eure Anfrage</EditorialSubtitle>
          </Header>
          {renderForm(EditorialInput, EditorialTextarea, EditorialLabel, EditorialButton)}
        </Container>
      </EditorialSection>
    );
  }

  // BOTANICAL
  if (currentTheme === 'botanical') {
    return (
      <BotanicalSection id="contact">
        <Container>
          <Header>
            <BotanicalEyebrow>Kontakt</BotanicalEyebrow>
            <BotanicalTitle>Schreibt uns</BotanicalTitle>
            <BotanicalSubtitle>Wir freuen uns auf eure Anfrage</BotanicalSubtitle>
          </Header>
          <BotanicalFormCard>
            {renderForm(BotanicalInput, BotanicalTextarea, BotanicalLabel, BotanicalButton)}
          </BotanicalFormCard>
        </Container>
      </BotanicalSection>
    );
  }

  // CONTEMPORARY
  if (currentTheme === 'contemporary') {
    return (
      <ContemporarySection id="contact">
        <Container>
          <Header>
            <ContemporaryEyebrow>📧 Let's Talk</ContemporaryEyebrow>
            <ContemporaryTitle>Kontakt</ContemporaryTitle>
            <ContemporarySubtitle>Schreibt uns - wir beißen nicht! 😄</ContemporarySubtitle>
          </Header>
          <ContemporaryFormCard>
            {renderForm(ContemporaryInput, ContemporaryTextarea, ContemporaryLabel, ContemporaryButton)}
          </ContemporaryFormCard>
        </Container>
      </ContemporarySection>
    );
  }

  // LUXE
  if (currentTheme === 'luxe') {
    return (
      <LuxeSection id="contact">
        <Container>
          <Header>
            <LuxeEyebrow>Kontakt</LuxeEyebrow>
            <LuxeTitle>Sprechen wir</LuxeTitle>
            <LuxeSubtitle>Wir freuen uns auf Ihre Anfrage</LuxeSubtitle>
          </Header>
          {renderForm(LuxeInput, LuxeTextarea, LuxeLabel, LuxeButton)}
        </Container>
      </LuxeSection>
    );
  }

  // NEON
  if (currentTheme === 'neon') {
    return (
      <NeonSection id="contact">
        <Container>
          <Header>
            <NeonEyebrow>// Contact.init()</NeonEyebrow>
            <NeonTitle>Send Message</NeonTitle>
            <NeonSubtitle>Initiating communication protocol...</NeonSubtitle>
          </Header>
          <NeonFormCard>
            {renderForm(NeonInput, NeonTextarea, NeonLabel, NeonButton)}
          </NeonFormCard>
        </Container>
      </NeonSection>
    );
  }

  // VIDEO (Default)
  return (
    <VideoSection id="contact">
      <Container>
        <Header>
          <VideoEyebrow>Kontakt</VideoEyebrow>
          <VideoTitle>Schreibt uns</VideoTitle>
          <VideoSubtitle>Wir freuen uns auf eure Anfrage</VideoSubtitle>
        </Header>
        {renderForm(VideoInput, VideoTextarea, VideoLabel, VideoButton)}
      </Container>
    </VideoSection>
  );
};

export default ContactSection;
