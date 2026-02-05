// src/components/marketing/ContactSection.js
// Kontaktformular mit Brevo Transaktionsmail an wedding@sarahiver.de
// Spam-Schutz: hCaptcha + Honeypot + Zeitprüfung
// KEIN Double Opt-In nötig (Kontaktanfrage ≠ Newsletter)
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { supabase } from '../../config/supabase';

// ============================================
// THEME CONFIGURATIONS
// ============================================
const THEME_CONFIG = {
  editorial: {
    bg: '#0A0A0A',
    cardBg: 'transparent',
    text: '#FAFAFA',
    textMuted: 'rgba(255,255,255,0.6)',
    accent: '#C41E3A',
    inputBg: 'transparent',
    inputBorder: 'rgba(255,255,255,0.2)',
    inputFocusBorder: '#C41E3A',
    buttonBg: '#C41E3A',
    buttonText: '#FAFAFA',
    buttonHoverBg: '#a01830',
    headlineFont: "'Oswald', sans-serif",
    bodyFont: "'Inter', sans-serif",
    accentFont: "'Source Serif 4', serif",
    labelStyle: 'uppercase',
    inputStyle: 'border',
    borderRadius: '0',
  },
  botanical: {
    bg: '#040604',
    cardBg: 'rgba(255,255,255,0.06)',
    cardBlur: '40px',
    cardBorder: 'rgba(255,255,255,0.1)',
    text: 'rgba(255,255,255,0.95)',
    textMuted: 'rgba(255,255,255,0.5)',
    accent: 'rgba(255,255,255,0.95)',
    inputBg: 'rgba(255,255,255,0.05)',
    inputBorder: 'rgba(255,255,255,0.1)',
    inputFocusBorder: 'rgba(255,255,255,0.3)',
    buttonBg: 'rgba(255,255,255,0.95)',
    buttonText: '#040604',
    buttonHoverBg: '#fff',
    headlineFont: "'Cormorant Garamond', serif",
    bodyFont: "'Montserrat', sans-serif",
    labelStyle: 'uppercase',
    inputStyle: 'rounded',
    borderRadius: '12px',
    cardRadius: '24px',
  },
  contemporary: {
    bg: '#FFE66D',
    cardBg: '#FFFFFF',
    cardBorder: '#0D0D0D',
    cardShadow: '8px 8px 0 #0D0D0D',
    text: '#0D0D0D',
    textMuted: '#525252',
    accent: '#FF6B6B',
    inputBg: '#FAFAFA',
    inputBorder: '#0D0D0D',
    inputFocusBorder: '#0D0D0D',
    inputFocusShadow: '4px 4px 0 #4ECDC4',
    buttonBg: '#FF6B6B',
    buttonText: '#FAFAFA',
    buttonBorder: '#0D0D0D',
    buttonShadow: '6px 6px 0 #0D0D0D',
    buttonHoverTransform: 'translate(-3px, -3px)',
    buttonHoverShadow: '9px 9px 0 #0D0D0D',
    headlineFont: "'Space Grotesk', sans-serif",
    bodyFont: "'Space Grotesk', sans-serif",
    labelStyle: 'uppercase',
    inputStyle: 'brutalist',
    borderRadius: '0',
  },
  luxe: {
    bg: '#0A0A0A',
    cardBg: 'transparent',
    text: '#F8F6F3',
    textMuted: 'rgba(248,246,243,0.6)',
    accent: '#C9A962',
    inputBg: 'transparent',
    inputBorder: 'rgba(248,246,243,0.2)',
    inputFocusBorder: '#C9A962',
    buttonBg: '#C9A962',
    buttonText: '#0A0A0A',
    buttonHoverBg: '#d4b66f',
    headlineFont: "'Cormorant', serif",
    bodyFont: "'Outfit', sans-serif",
    labelStyle: 'uppercase',
    inputStyle: 'underline',
    borderRadius: '0',
  },
  neon: {
    bg: '#0a0a0f',
    cardBg: 'rgba(255,255,255,0.02)',
    cardBorder: 'rgba(0,255,255,0.2)',
    text: '#FFFFFF',
    textMuted: 'rgba(255,255,255,0.5)',
    accent: '#00ffff',
    accentAlt: '#ff00ff',
    inputBg: 'rgba(255,255,255,0.02)',
    inputBorder: 'rgba(0,255,255,0.2)',
    inputFocusBorder: '#00ffff',
    inputFocusShadow: '0 0 15px rgba(0,255,255,0.2)',
    buttonBg: 'transparent',
    buttonText: '#00ffff',
    buttonBorder: '#00ffff',
    buttonShadow: '0 0 15px rgba(0,255,255,0.3)',
    buttonHoverBg: 'rgba(0,255,255,0.1)',
    buttonHoverShadow: '0 0 25px rgba(0,255,255,0.5)',
    headlineFont: "'Space Grotesk', sans-serif",
    bodyFont: "'Space Grotesk', sans-serif",
    labelStyle: 'uppercase',
    inputStyle: 'glow',
    borderRadius: '0',
  },
  video: {
    bg: '#0A0A0A',
    cardBg: 'transparent',
    text: '#FFFFFF',
    textMuted: '#B0B0B0',
    accent: '#6B8CAE',
    inputBg: 'transparent',
    inputBorder: 'rgba(255,255,255,0.2)',
    inputFocusBorder: '#6B8CAE',
    buttonBg: '#6B8CAE',
    buttonText: '#FFFFFF',
    buttonHoverBg: '#7d9cba',
    headlineFont: "'Manrope', sans-serif",
    bodyFont: "'Inter', sans-serif",
    accentFont: "'Cormorant Garamond', serif",
    labelStyle: 'uppercase',
    inputStyle: 'underline',
    borderRadius: '0',
  },
};

// ============================================
// STYLED COMPONENTS
// ============================================
const Section = styled.section`
  padding: clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem);
  background: ${p => p.$config.bg};
  position: relative;
  
  ${p => p.$theme === 'botanical' && css`
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 50% 100%, rgba(45, 90, 60, 0.1) 0%, transparent 50%);
    }
  `}
  
  ${p => p.$theme === 'neon' && css`
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 50% 50%, rgba(0, 255, 255, 0.03) 0%, transparent 50%);
    }
  `}
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Eyebrow = styled.p`
  font-family: ${p => p.$config.bodyFont};
  font-size: ${p => p.$theme === 'botanical' ? '0.6rem' : p.$theme === 'luxe' ? '0.7rem' : '0.75rem'};
  font-weight: ${p => p.$theme === 'contemporary' ? '700' : p.$theme === 'luxe' ? '400' : '600'};
  letter-spacing: ${p => p.$theme === 'botanical' || p.$theme === 'luxe' ? '0.4em' : '0.2em'};
  text-transform: uppercase;
  color: ${p => p.$config.accent};
  margin-bottom: 1rem;
  
  ${p => p.$theme === 'neon' && css`
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  `}
`;

const Title = styled.h2`
  font-family: ${p => p.$config.headlineFont};
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: ${p => ['botanical', 'luxe'].includes(p.$theme) ? '300' : '700'};
  font-style: ${p => p.$theme === 'luxe' ? 'italic' : 'normal'};
  text-transform: ${p => ['editorial', 'contemporary', 'neon'].includes(p.$theme) ? 'uppercase' : 'none'};
  color: ${p => p.$config.text};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-family: ${p => p.$config.accentFont || p.$config.bodyFont};
  font-size: ${p => p.$theme === 'video' || p.$theme === 'editorial' ? '1.1rem' : '0.9rem'};
  font-style: ${p => ['editorial', 'video'].includes(p.$theme) ? 'italic' : 'normal'};
  color: ${p => p.$config.textMuted};
  max-width: 500px;
  margin: 0 auto;
`;

const FormCard = styled.div`
  background: ${p => p.$config.cardBg};
  border-radius: ${p => p.$config.cardRadius || p.$config.borderRadius};
  
  ${p => p.$config.cardBlur && css`
    backdrop-filter: blur(${p.$config.cardBlur});
    -webkit-backdrop-filter: blur(${p.$config.cardBlur});
  `}
  
  ${p => p.$config.cardBorder && css`
    border: ${p.$theme === 'contemporary' ? '3px' : '1px'} solid ${p.$config.cardBorder};
  `}
  
  ${p => p.$config.cardShadow && css`
    box-shadow: ${p.$config.cardShadow};
  `}
  
  ${p => (p.$theme === 'botanical' || p.$theme === 'contemporary' || p.$theme === 'neon') && css`
    padding: 2.5rem;
  `}
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div``;

const Label = styled.label`
  display: block;
  font-family: ${p => p.$config.bodyFont};
  font-size: ${p => p.$theme === 'botanical' ? '0.65rem' : p.$theme === 'luxe' ? '0.65rem' : '0.75rem'};
  font-weight: ${p => p.$theme === 'contemporary' ? '700' : p.$theme === 'luxe' ? '400' : '600'};
  letter-spacing: ${p => p.$theme === 'luxe' ? '0.2em' : p.$theme === 'botanical' ? '0.15em' : '0.1em'};
  text-transform: ${p => p.$config.labelStyle === 'uppercase' ? 'uppercase' : 'none'};
  color: ${p => p.$theme === 'neon' ? p.$config.accentAlt : p.$config.textMuted};
  margin-bottom: 0.5rem;
`;

const inputBaseStyles = css`
  width: 100%;
  padding: 1rem;
  font-family: ${p => p.$config.bodyFont};
  font-size: 1rem;
  color: ${p => p.$config.text};
  background: ${p => p.$config.inputBg};
  transition: all 0.3s ease;
  
  &::placeholder {
    color: ${p => p.$config.textMuted};
    opacity: 0.5;
  }
  
  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  ${inputBaseStyles}
  border-radius: ${p => p.$config.borderRadius};
  
  ${p => p.$config.inputStyle === 'border' && css`
    border: 1px solid ${p.$config.inputBorder};
    &:focus { border-color: ${p.$config.inputFocusBorder}; }
  `}
  
  ${p => p.$config.inputStyle === 'rounded' && css`
    border: 1px solid ${p.$config.inputBorder};
    border-radius: 12px;
    &:focus { 
      border-color: ${p.$config.inputFocusBorder}; 
      background: rgba(255,255,255,0.08);
    }
  `}
  
  ${p => p.$config.inputStyle === 'brutalist' && css`
    border: 2px solid ${p.$config.inputBorder};
    &:focus { box-shadow: ${p.$config.inputFocusShadow}; }
  `}
  
  ${p => p.$config.inputStyle === 'underline' && css`
    border: none;
    border-bottom: 1px solid ${p.$config.inputBorder};
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    &:focus { border-color: ${p.$config.inputFocusBorder}; }
  `}
  
  ${p => p.$config.inputStyle === 'glow' && css`
    border: 1px solid ${p.$config.inputBorder};
    &:focus { 
      border-color: ${p.$config.inputFocusBorder}; 
      box-shadow: ${p.$config.inputFocusShadow};
    }
  `}
`;

const Textarea = styled.textarea`
  ${inputBaseStyles}
  min-height: 150px;
  resize: vertical;
  border-radius: ${p => p.$config.borderRadius};
  
  ${p => p.$config.inputStyle === 'border' && css`
    border: 1px solid ${p.$config.inputBorder};
    &:focus { border-color: ${p.$config.inputFocusBorder}; }
  `}
  
  ${p => p.$config.inputStyle === 'rounded' && css`
    border: 1px solid ${p.$config.inputBorder};
    border-radius: 12px;
    &:focus { 
      border-color: ${p.$config.inputFocusBorder}; 
      background: rgba(255,255,255,0.08);
    }
  `}
  
  ${p => p.$config.inputStyle === 'brutalist' && css`
    border: 2px solid ${p.$config.inputBorder};
    &:focus { box-shadow: ${p.$config.inputFocusShadow}; }
  `}
  
  ${p => p.$config.inputStyle === 'underline' && css`
    border: none;
    border-bottom: 1px solid ${p.$config.inputBorder};
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    &:focus { border-color: ${p.$config.inputFocusBorder}; }
  `}
  
  ${p => p.$config.inputStyle === 'glow' && css`
    border: 1px solid ${p.$config.inputBorder};
    &:focus { 
      border-color: ${p.$config.inputFocusBorder}; 
      box-shadow: ${p.$config.inputFocusShadow};
    }
  `}
`;

const Select = styled.select`
  ${inputBaseStyles}
  border-radius: ${p => p.$config.borderRadius};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23888' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
  
  ${p => p.$config.inputStyle === 'border' && css`
    border: 1px solid ${p.$config.inputBorder};
    &:focus { border-color: ${p.$config.inputFocusBorder}; }
  `}
  
  ${p => p.$config.inputStyle === 'rounded' && css`
    border: 1px solid ${p.$config.inputBorder};
    border-radius: 12px;
    &:focus { 
      border-color: ${p.$config.inputFocusBorder}; 
      background-color: rgba(255,255,255,0.08);
    }
  `}
  
  ${p => p.$config.inputStyle === 'brutalist' && css`
    border: 2px solid ${p.$config.inputBorder};
    &:focus { box-shadow: ${p.$config.inputFocusShadow}; }
  `}
  
  ${p => p.$config.inputStyle === 'underline' && css`
    border: none;
    border-bottom: 1px solid ${p.$config.inputBorder};
    border-radius: 0;
    padding-left: 0;
    &:focus { border-color: ${p.$config.inputFocusBorder}; }
  `}
  
  ${p => p.$config.inputStyle === 'glow' && css`
    border: 1px solid ${p.$config.inputBorder};
    &:focus { 
      border-color: ${p.$config.inputFocusBorder}; 
      box-shadow: ${p.$config.inputFocusShadow};
    }
  `}
  
  option {
    background: #1a1a1a;
    color: #fff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1.25rem;
  font-family: ${p => p.$config.headlineFont};
  font-size: ${p => p.$theme === 'luxe' ? '0.7rem' : p.$theme === 'botanical' ? '0.7rem' : '0.9rem'};
  font-weight: ${p => ['editorial', 'contemporary', 'neon'].includes(p.$theme) ? '600' : '500'};
  letter-spacing: ${p => p.$theme === 'luxe' ? '0.25em' : p.$theme === 'botanical' ? '0.15em' : '0.1em'};
  text-transform: uppercase;
  color: ${p => p.$config.buttonText};
  background: ${p => p.$config.buttonBg};
  border: ${p => p.$config.buttonBorder ? `${p.$theme === 'contemporary' ? '3px' : '1px'} solid ${p.$config.buttonBorder}` : 'none'};
  border-radius: ${p => p.$theme === 'botanical' ? '50px' : p.$config.borderRadius};
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${p => p.$config.buttonShadow && css`
    box-shadow: ${p.$config.buttonShadow};
  `}
  
  &:hover {
    background: ${p => p.$config.buttonHoverBg || p.$config.buttonBg};
    ${p => p.$config.buttonHoverTransform && css`transform: ${p.$config.buttonHoverTransform};`}
    ${p => p.$config.buttonHoverShadow && css`box-shadow: ${p.$config.buttonHoverShadow};`}
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

// Honeypot (hidden from users, bots fill it)
const Honeypot = styled.input`
  position: absolute;
  left: -9999px;
  opacity: 0;
  height: 0;
  width: 0;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  
  h3 {
    font-family: ${p => p.$config.headlineFont};
    font-size: 1.8rem;
    font-weight: ${p => ['botanical', 'luxe'].includes(p.$theme) ? '300' : '700'};
    font-style: ${p => p.$theme === 'luxe' ? 'italic' : 'normal'};
    color: ${p => p.$config.text};
    margin-bottom: 1rem;
  }
  
  p {
    font-family: ${p => p.$config.bodyFont};
    font-size: 1rem;
    color: ${p => p.$config.textMuted};
    line-height: 1.7;
    margin-bottom: 0.5rem;
  }
  
  .highlight {
    color: ${p => p.$config.accent};
    font-weight: 600;
  }
`;

const ErrorMessage = styled.p`
  font-family: ${p => p.$config.bodyFont};
  font-size: 0.85rem;
  color: #FF6B6B;
  margin-top: 0.5rem;
`;

const PrivacyNote = styled.p`
  font-family: ${p => p.$config.bodyFont};
  font-size: 0.75rem;
  color: ${p => p.$config.textMuted};
  text-align: center;
  margin-top: 1rem;
  opacity: 0.7;
  
  a {
    color: ${p => p.$config.accent};
    text-decoration: underline;
  }
`;

// ============================================
// BREVO API CONFIG
// ============================================
const BREVO_API_KEY = process.env.REACT_APP_BREVO_API_KEY;
const BREVO_LIST_ID = parseInt(process.env.REACT_APP_BREVO_LIST_ID || '3');

// hCaptcha
const HCAPTCHA_SITE_KEY = process.env.REACT_APP_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001'; // Test key as fallback

// ============================================
// hCaptcha STYLED
// ============================================
const CaptchaWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
  min-height: 78px;
`;

// ============================================
// COMPONENT
// ============================================
const PACKAGES = [
  { id: '', label: 'Bitte wählen...' },
  { id: 'starter', label: 'Starter (€1.290)' },
  { id: 'standard', label: 'Standard (€1.490)' },
  { id: 'premium', label: 'Premium (€1.990)' },
];

const THEME_OPTIONS = [
  { id: '', label: 'Bitte wählen...' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'botanical', label: 'Botanical' },
  { id: 'contemporary', label: 'Contemporary' },
  { id: 'luxe', label: 'Luxe' },
  { id: 'neon', label: 'Neon' },
  { id: 'video', label: 'Video' },
];

const ContactSection = () => {
  const { currentTheme } = useTheme();
  const config = THEME_CONFIG[currentTheme] || THEME_CONFIG.video;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    interestedTheme: '',
    interestedPackage: '',
    message: '',
    honeypot: '', // Spam trap
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  
  // hCaptcha state
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  const captchaWidgetId = useRef(null);
  
  // Timing-based spam protection
  const formLoadTime = useRef(Date.now());
  const MIN_SUBMIT_TIME = 3000; // 3 seconds minimum

  // Load hCaptcha script
  useEffect(() => {
    if (document.querySelector('script[src*="hcaptcha"]')) return;
    
    const script = document.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    return () => {
      // Cleanup not needed - script stays loaded
    };
  }, []);

  // Render hCaptcha when script is loaded and container is ready
  const renderCaptcha = useCallback(() => {
    if (!captchaRef.current || captchaWidgetId.current !== null) return;
    if (!window.hcaptcha) return;

    try {
      captchaWidgetId.current = window.hcaptcha.render(captchaRef.current, {
        sitekey: HCAPTCHA_SITE_KEY,
        theme: ['editorial', 'botanical', 'luxe', 'neon', 'video'].includes(currentTheme) ? 'dark' : 'light',
        size: 'normal',
        callback: (token) => setCaptchaToken(token),
        'expired-callback': () => setCaptchaToken(null),
        'error-callback': () => setCaptchaToken(null),
      });
    } catch (e) {
      // Widget already rendered or error - ignore
    }
  }, [currentTheme]);

  useEffect(() => {
    // Poll for hCaptcha readiness (script loads async)
    const interval = setInterval(() => {
      if (window.hcaptcha && captchaRef.current && captchaWidgetId.current === null) {
        renderCaptcha();
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [renderCaptcha]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Spam Check 1: Honeypot
    if (formData.honeypot) {
      console.log('Honeypot triggered');
      setSubmitStatus('success'); // Fake success for bots
      return;
    }
    
    // Spam Check 2: Time-based (too fast = bot)
    const timeTaken = Date.now() - formLoadTime.current;
    if (timeTaken < MIN_SUBMIT_TIME) {
      console.log('Too fast submission:', timeTaken);
      setSubmitStatus('success'); // Fake success for bots
      return;
    }
    
    // Spam Check 3: hCaptcha
    if (!captchaToken) {
      setErrorMessage('Bitte bestätige, dass du kein Roboter bist.');
      return;
    }
    
    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Bitte gib deinen Namen ein.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Bitte schreibe uns eine Nachricht.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let contactId = null;
      
      // 1. Save to Supabase (if configured)
      if (supabase) {
        const { data: contactData, error: supabaseError } = await supabase
          .from('contact_requests')
          .insert([{
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim() || null,
            wedding_date: formData.weddingDate || null,
            interested_theme: formData.interestedTheme || null,
            interested_package: formData.interestedPackage || null,
            message: formData.message.trim(),
            source: 'website_contact',
            status: 'new',
            email_confirmed: true, // Kein DOI nötig bei Kontaktformular
          }])
          .select()
          .single();
        
        if (supabaseError) throw new Error(supabaseError.message);
        contactId = contactData?.id;
      }
      
      // 2. Benachrichtigungs-Mail an wedding@sarahiver.de via Brevo Transaktionsmail
      if (BREVO_API_KEY) {
        // a) Kontakt in Brevo anlegen/aktualisieren
        await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            attributes: {
              VORNAME: formData.name.split(' ')[0],
              NACHNAME: formData.name.split(' ').slice(1).join(' ') || '',
              TELEFON: formData.phone || '',
              HOCHZEITSDATUM: formData.weddingDate || '',
              QUELLE: 'Website Kontaktformular',
            },
            listIds: [BREVO_LIST_ID],
            updateEnabled: true,
          }),
        });
        
        // b) Transaktionsmail an wedding@sarahiver.de - Neue Anfrage!
        const notificationTemplateId = parseInt(process.env.REACT_APP_BREVO_NOTIFICATION_TEMPLATE_ID || '0');
        
        if (notificationTemplateId > 0) {
          // Via Brevo Template
          await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'api-key': BREVO_API_KEY,
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              to: [{ email: 'wedding@sarahiver.de', name: 'S&I Wedding' }],
              templateId: notificationTemplateId,
              params: {
                NAME: formData.name.trim(),
                EMAIL: formData.email.trim().toLowerCase(),
                TELEFON: formData.phone || '–',
                HOCHZEITSDATUM: formData.weddingDate || '–',
                THEME: formData.interestedTheme || '–',
                PAKET: formData.interestedPackage || '–',
                NACHRICHT: formData.message.trim(),
                ADMIN_LINK: 'https://admin.sarahiver.de',
                CONTACT_ID: contactId || '–',
              },
            }),
          });
        } else {
          // Fallback: Direkt-Mail ohne Template
          await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'api-key': BREVO_API_KEY,
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              to: [{ email: 'wedding@sarahiver.de', name: 'S&I Wedding' }],
              sender: { email: 'noreply@sarahiver.de', name: 'S&I. Website' },
              subject: `Neue Anfrage von ${formData.name.trim()}`,
              htmlContent: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                  <div style="background: #000; color: #fff; display: inline-block; padding: 8px 16px; font-weight: 700; font-size: 18px; letter-spacing: -0.06em; margin-bottom: 30px;">S&I.</div>
                  <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 24px; color: #1a1a1a;">Neue Kontaktanfrage</h1>
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                    <tr style="border-bottom: 1px solid #eee;">
                      <td style="padding: 12px 0; color: #888; width: 140px;">Name</td>
                      <td style="padding: 12px 0; color: #1a1a1a; font-weight: 500;">${formData.name.trim()}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                      <td style="padding: 12px 0; color: #888;">E-Mail</td>
                      <td style="padding: 12px 0;"><a href="mailto:${formData.email.trim().toLowerCase()}" style="color: #1a1a1a;">${formData.email.trim().toLowerCase()}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                      <td style="padding: 12px 0; color: #888;">Telefon</td>
                      <td style="padding: 12px 0; color: #1a1a1a;">${formData.phone || '–'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                      <td style="padding: 12px 0; color: #888;">Hochzeitsdatum</td>
                      <td style="padding: 12px 0; color: #1a1a1a;">${formData.weddingDate || '–'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                      <td style="padding: 12px 0; color: #888;">Theme</td>
                      <td style="padding: 12px 0; color: #1a1a1a;">${formData.interestedTheme || '–'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #eee;">
                      <td style="padding: 12px 0; color: #888;">Paket</td>
                      <td style="padding: 12px 0; color: #1a1a1a;">${formData.interestedPackage || '–'}</td>
                    </tr>
                  </table>
                  <div style="background: #f8f8f8; border-left: 3px solid #000; padding: 20px; margin-bottom: 30px;">
                    <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Nachricht</p>
                    <p style="color: #1a1a1a; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.message.trim()}</p>
                  </div>
                  <a href="https://admin.sarahiver.de" style="display: inline-block; background: #000; color: #fff; padding: 14px 28px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">ZUM ADMIN-BEREICH →</a>
                  <p style="color: #ccc; font-size: 12px; margin-top: 40px;">Automatische Benachrichtigung von siwedding.de</p>
                </div>
              `,
            }),
          });
        }
      }
      
      setSubmitStatus('success');
      
      // Reset captcha for next submission
      if (window.hcaptcha && captchaWidgetId.current !== null) {
        window.hcaptcha.reset(captchaWidgetId.current);
      }
      setCaptchaToken(null);
      
    } catch (error) {
      console.error('Contact form error:', error);
      setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Theme-specific content
  const getContent = () => {
    switch (currentTheme) {
      case 'contemporary':
        return {
          eyebrow: '📧 Let\'s Talk',
          title: 'Kontakt',
          subtitle: 'Schreibt uns - wir beißen nicht! 😄',
          button: 'Nachricht senden →',
        };
      case 'neon':
        return {
          eyebrow: '// Contact.init()',
          title: 'Send Message',
          subtitle: 'Initiating communication protocol...',
          button: 'Execute.send()',
        };
      case 'luxe':
        return {
          eyebrow: 'Kontakt',
          title: 'Sprechen wir',
          subtitle: 'Wir freuen uns auf Ihre Anfrage',
          button: 'Nachricht senden',
        };
      default:
        return {
          eyebrow: 'Kontakt',
          title: 'Schreibt uns',
          subtitle: 'Wir freuen uns auf eure Anfrage',
          button: 'Nachricht senden',
        };
    }
  };
  
  const content = getContent();

  return (
    <Section id="contact" $theme={currentTheme} $config={config}>
      <Container>
        <Header>
          <Eyebrow $theme={currentTheme} $config={config}>{content.eyebrow}</Eyebrow>
          <Title $theme={currentTheme} $config={config}>{content.title}</Title>
          <Subtitle $theme={currentTheme} $config={config}>{content.subtitle}</Subtitle>
        </Header>
        
        <FormCard $theme={currentTheme} $config={config}>
          {submitStatus === 'success' ? (
            <SuccessMessage $theme={currentTheme} $config={config}>
              <h3>✓ Vielen Dank!</h3>
              <p>
                Wir haben eure Anfrage erhalten und melden uns
                <span className="highlight"> innerhalb von 24 Stunden</span> bei euch.
              </p>
              <p>
                Wir freuen uns auf das Gespräch!
              </p>
              <p style={{ marginTop: '1.5rem', fontSize: '0.85rem' }}>
                Fragen? Schreibt uns direkt an{' '}
                <a href="mailto:wedding@sarahiver.de" style={{ color: config.accent }}>
                  wedding@sarahiver.de
                </a>
              </p>
            </SuccessMessage>
          ) : (
            <Form onSubmit={handleSubmit}>
              {/* Honeypot - invisible to users */}
              <Honeypot
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
              
              <FormRow>
                <FormGroup>
                  <Label $theme={currentTheme} $config={config}>Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Euer Name"
                    required
                    $theme={currentTheme}
                    $config={config}
                  />
                </FormGroup>
                <FormGroup>
                  <Label $theme={currentTheme} $config={config}>E-Mail *</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@beispiel.de"
                    required
                    $theme={currentTheme}
                    $config={config}
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label $theme={currentTheme} $config={config}>Telefon</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+49 123 456789"
                    $theme={currentTheme}
                    $config={config}
                  />
                </FormGroup>
                <FormGroup>
                  <Label $theme={currentTheme} $config={config}>Hochzeitsdatum</Label>
                  <Input
                    type="date"
                    name="weddingDate"
                    value={formData.weddingDate}
                    onChange={handleChange}
                    $theme={currentTheme}
                    $config={config}
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label $theme={currentTheme} $config={config}>Interesse an Theme</Label>
                  <Select
                    name="interestedTheme"
                    value={formData.interestedTheme}
                    onChange={handleChange}
                    $theme={currentTheme}
                    $config={config}
                  >
                    {THEME_OPTIONS.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label $theme={currentTheme} $config={config}>Interesse an Paket</Label>
                  <Select
                    name="interestedPackage"
                    value={formData.interestedPackage}
                    onChange={handleChange}
                    $theme={currentTheme}
                    $config={config}
                  >
                    {PACKAGES.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                  </Select>
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label $theme={currentTheme} $config={config}>Nachricht *</Label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Erzählt uns von eurer Hochzeit..."
                  required
                  $theme={currentTheme}
                  $config={config}
                />
              </FormGroup>
              
              {errorMessage && (
                <ErrorMessage $config={config}>{errorMessage}</ErrorMessage>
              )}
              
              <CaptchaWrapper>
                <div ref={captchaRef}></div>
              </CaptchaWrapper>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                $theme={currentTheme}
                $config={config}
              >
                {isSubmitting ? 'Wird gesendet...' : content.button}
              </Button>
              
              <PrivacyNote $config={config}>
                Mit dem Absenden stimmst du unserer{' '}
                <a href="/datenschutz">Datenschutzerklärung</a> zu.{' '}
                Wir melden uns innerhalb von 24 Stunden.
              </PrivacyNote>
            </Form>
          )}
        </FormCard>
      </Container>
    </Section>
  );
};

export default ContactSection;
