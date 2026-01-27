// src/components/marketing/ContactSection.js
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const Section = styled.section`
  padding: 100px 20px;
  overflow: hidden;
  @media (min-width: 600px) { padding: 140px 5%; }
  ${p => p.$themeId === 'video' && css`background: #FAF8F5;`}
  ${p => p.$themeId === 'editorial' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'botanical' && css`background: #F5F1EB;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FAFAFA;`}
  ${p => p.$themeId === 'luxe' && css`background: #FAF9F7;`}
  ${p => p.$themeId === 'neon' && css`background: #0a0a0f;`}
`;

const Container = styled.div`max-width: 600px; margin: 0 auto; width: 100%;`;

const Header = styled.div`
  text-align: center; margin-bottom: 50px;
  opacity: ${p => p.$visible ? 1 : 0}; transform: translateY(${p => p.$visible ? 0 : '30px'}); transition: all 0.8s ease;
`;

const Eyebrow = styled.span`
  display: block; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 20px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: #B8976A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #999;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #8B9D83;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #FF6B6B;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: #D4AF37;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #00ffff;`}
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 300; margin-bottom: 15px;
  ${p => p.$themeId === 'video' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Instrument Serif', Georgia, serif; color: #1A1A1A;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Playfair Display', Georgia, serif; color: #2D3B2D;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #0D0D0D; font-weight: 700;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Cormorant Garamond', Georgia, serif; color: #2A2A2A; font-style: italic;`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: #ffffff; font-weight: 700;`}
`;

const Subtitle = styled.p`
  font-size: 1rem; max-width: 450px; margin: 0 auto; line-height: 1.7;
  ${p => p.$themeId === 'video' && css`font-family: 'Montserrat', sans-serif; color: rgba(26,26,26,0.6);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #666;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #6B7B6C;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #666;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.6);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.5);`}
`;

const Form = styled.form`
  opacity: ${p => p.$visible ? 1 : 0}; 
  transform: translateY(${p => p.$visible ? 0 : '30px'}); 
  transition: all 0.8s ease 0.2s;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 20px;
  @media (min-width: 500px) { grid-template-columns: 1fr 1fr; }
`;

const Field = styled.div`margin-bottom: 20px;`;

const Label = styled.label`
  display: block; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; color: rgba(26,26,26,0.6);`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; color: #666;`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; color: #5A6B5A;`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; color: #666;`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; color: rgba(42,42,42,0.6);`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; color: rgba(255,255,255,0.5);`}
`;

const inputStyles = css`
  padding: 16px 18px; font-size: 1rem; transition: all 0.3s ease; width: 100%;
  ${p => p.$themeId === 'video' && css`
    font-family: 'Inter', sans-serif; background: #FFFFFF; color: #1A1A1A;
    border: 1px solid rgba(184,151,106,0.2);
    &:focus { outline: none; border-color: #B8976A; }
  `}
  ${p => p.$themeId === 'editorial' && css`
    font-family: 'Inter', sans-serif; background: #FFFFFF; color: #1A1A1A; border: 1px solid #E0E0E0;
    &:focus { outline: none; border-color: #1A1A1A; }
  `}
  ${p => p.$themeId === 'botanical' && css`
    font-family: 'Lato', sans-serif; background: #FFFFFF; color: #2D3B2D;
    border: 1px solid rgba(139,157,131,0.3); border-radius: 12px;
    &:focus { outline: none; border-color: #8B9D83; }
  `}
  ${p => p.$themeId === 'contemporary' && css`
    font-family: 'Space Grotesk', sans-serif; background: #FFFFFF; color: #0D0D0D; border: 3px solid #0D0D0D;
    &:focus { outline: none; box-shadow: 4px 4px 0 #FF6B6B; }
  `}
  ${p => p.$themeId === 'luxe' && css`
    font-family: 'Montserrat', sans-serif; background: #FFFFFF; color: #2A2A2A;
    border: 1px solid rgba(212,175,55,0.2);
    &:focus { outline: none; border-color: #D4AF37; }
  `}
  ${p => p.$themeId === 'neon' && css`
    font-family: 'Space Grotesk', sans-serif; background: rgba(255,255,255,0.05); color: #ffffff;
    border: 1px solid rgba(0,255,255,0.3);
    &:focus { outline: none; border-color: #00ffff; box-shadow: 0 0 15px rgba(0,255,255,0.2); }
  `}
  ${p => p.$error && css`border-color: #FF6B6B !important;`}
`;

const Input = styled.input`${inputStyles}`;
const Textarea = styled.textarea`${inputStyles} min-height: 120px; resize: vertical;`;
const ErrorText = styled.span`font-size: 0.7rem; color: #FF6B6B; margin-top: 5px; display: block;`;

const SubmitButton = styled.button`
  width: 100%; padding: 18px 30px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
  cursor: pointer; transition: all 0.3s ease; border: none; margin-top: 10px;
  ${p => p.$themeId === 'video' && css`font-family: 'Inter', sans-serif; background: #B8976A; color: #0a0a0a; &:hover { background: #D4AF37; }`}
  ${p => p.$themeId === 'editorial' && css`font-family: 'Inter', sans-serif; background: #1A1A1A; color: #FFFFFF; &:hover { background: #333; }`}
  ${p => p.$themeId === 'botanical' && css`font-family: 'Lato', sans-serif; background: #8B9D83; color: #FFFFFF; border-radius: 30px; &:hover { background: #6B7D63; }`}
  ${p => p.$themeId === 'contemporary' && css`font-family: 'Space Grotesk', sans-serif; background: #FF6B6B; color: #FFFFFF; &:hover { background: #E85555; }`}
  ${p => p.$themeId === 'luxe' && css`font-family: 'Montserrat', sans-serif; background: #D4AF37; color: #0a0a0a; &:hover { background: #F4D03F; }`}
  ${p => p.$themeId === 'neon' && css`font-family: 'Space Grotesk', sans-serif; background: #00ffff; color: #0a0a0f; box-shadow: 0 0 20px rgba(0,255,255,0.3); &:hover { box-shadow: 0 0 30px rgba(0,255,255,0.5); }`}
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const SuccessMessage = styled.div`
  text-align: center; padding: 50px 30px;
  ${p => p.$themeId === 'video' && css`background: rgba(184,151,106,0.1); border: 1px solid rgba(184,151,106,0.3);`}
  ${p => p.$themeId === 'editorial' && css`background: #F5F5F5; border: 1px solid #E0E0E0;`}
  ${p => p.$themeId === 'botanical' && css`background: rgba(139,157,131,0.1); border: 1px solid rgba(139,157,131,0.2); border-radius: 16px;`}
  ${p => p.$themeId === 'contemporary' && css`background: #FFFFFF; border: 3px solid #0D0D0D;`}
  ${p => p.$themeId === 'luxe' && css`background: rgba(212,175,55,0.05); border: 1px solid rgba(212,175,55,0.2);`}
  ${p => p.$themeId === 'neon' && css`background: rgba(0,255,255,0.05); border: 1px solid rgba(0,255,255,0.3);`}
  h3 { font-size: 1.8rem; margin-bottom: 10px; }
  p { font-size: 0.95rem; opacity: 0.7; }
`;

function ContactSection() {
  const { currentTheme } = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', weddingDate: '', message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Min date: today + 2 months
  const getMinDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2);
    return date.toISOString().split('T')[0];
  };

  const validateDate = (dateStr) => {
    if (!dateStr) return 'Bitte Datum wählen';
    const selected = new Date(dateStr);
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() + 2);
    if (selected < minDate) return 'Datum muss mind. 2 Monate in der Zukunft liegen';
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Bitte Name eingeben';
    if (!formData.email) newErrors.email = 'Bitte E-Mail eingeben';
    const dateError = validateDate(formData.weddingDate);
    if (dateError) newErrors.weddingDate = dateError;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section $themeId={currentTheme} id="contact">
        <Container>
          <SuccessMessage $themeId={currentTheme}>
            <h3>Vielen Dank! 💕</h3>
            <p>Wir melden uns innerhalb von 24 Stunden bei euch.</p>
          </SuccessMessage>
        </Container>
      </Section>
    );
  }

  return (
    <Section ref={sectionRef} $themeId={currentTheme} id="contact">
      <Container>
        <Header $visible={isVisible}>
          <Eyebrow $themeId={currentTheme}>— Kontakt —</Eyebrow>
          <Title $themeId={currentTheme}>Lasst uns starten</Title>
          <Subtitle $themeId={currentTheme}>
            Erzählt uns von eurer Hochzeit - wir melden uns innerhalb von 24 Stunden!
          </Subtitle>
        </Header>
        
        <Form $visible={isVisible} onSubmit={handleSubmit}>
          <Field>
            <Label $themeId={currentTheme}>Eure Namen *</Label>
            <Input 
              $themeId={currentTheme} 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              $error={errors.name} 
              placeholder="Anna & Max" 
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </Field>
          
          <Row>
            <Field style={{ marginBottom: 0 }}>
              <Label $themeId={currentTheme}>E-Mail *</Label>
              <Input 
                $themeId={currentTheme} 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                $error={errors.email} 
                placeholder="eure@email.de" 
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </Field>
            <Field style={{ marginBottom: 0 }}>
              <Label $themeId={currentTheme}>Handynummer (optional)</Label>
              <Input 
                $themeId={currentTheme} 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="+49 170 ..." 
              />
            </Field>
          </Row>
          
          <Field>
            <Label $themeId={currentTheme}>Hochzeitsdatum *</Label>
            <Input 
              $themeId={currentTheme} 
              type="date" 
              name="weddingDate" 
              value={formData.weddingDate} 
              onChange={handleChange} 
              min={getMinDate()} 
              $error={errors.weddingDate} 
            />
            {errors.weddingDate && <ErrorText>{errors.weddingDate}</ErrorText>}
          </Field>
          
          <Field>
            <Label $themeId={currentTheme}>Eure Nachricht (optional)</Label>
            <Textarea 
              $themeId={currentTheme} 
              name="message" 
              value={formData.message} 
              onChange={handleChange}
              placeholder="Erzählt uns von eurer Hochzeit, welches Paket euch interessiert..." 
            />
          </Field>
          
          <SubmitButton type="submit" $themeId={currentTheme}>Anfrage senden</SubmitButton>
        </Form>
      </Container>
    </Section>
  );
}

export default ContactSection;
