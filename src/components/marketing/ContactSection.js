// src/components/marketing/ContactSection.js
// Kontaktformular mit Brevo Transaktionsmail an wedding@sarahiver.de
// Spam-Schutz: hCaptcha + Honeypot + Zeitprüfung
// KEIN Double Opt-In nötig (Kontaktanfrage ≠ Newsletter)
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

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
  classic: {
    bg: '#FDFCFA',
    cardBg: 'transparent',
    text: '#1A1A1A',
    textMuted: '#999999',
    accent: '#999999',
    inputBg: 'transparent',
    inputBorder: 'rgba(0,0,0,0.1)',
    inputFocusBorder: '#999999',
    buttonBg: '#1A1A1A',
    buttonText: '#FFFFFF',
    buttonHoverBg: '#333333',
    headlineFont: "'Cormorant Garamond', serif",
    bodyFont: "'Josefin Sans', sans-serif",
    accentFont: "'Mrs Saint Delafield', cursive",
    labelStyle: 'uppercase',
    inputStyle: 'border',
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
  font-weight: ${p => ['botanical', 'luxe', 'classic'].includes(p.$theme) ? '300' : '700'};
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
// API ENDPOINT (Vercel Serverless Function — alle Secrets serverseitig)
// ============================================

// hCaptcha (Site Key ist öffentlich — das ist korrekt so)
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
  const sectionRef = useRef(null);

  // --- hCaptcha lazy loading: only load when user interacts with form ---
  const captchaLoading = useRef(false);

  const loadCaptchaScript = useCallback(() => {
    if (captchaLoading.current || document.querySelector('script[src*="hcaptcha"]')) return;
    captchaLoading.current = true;

    const script = document.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Script loaded → render widget
      if (!captchaRef.current || captchaWidgetId.current !== null || !window.hcaptcha) return;
      try {
        captchaWidgetId.current = window.hcaptcha.render(captchaRef.current, {
          sitekey: HCAPTCHA_SITE_KEY,
          theme: ['editorial', 'botanical', 'luxe', 'neon', 'video'].includes(currentTheme) ? 'dark' : 'light',
          size: 'normal',
          callback: (token) => setCaptchaToken(token),
          'expired-callback': () => setCaptchaToken(null),
          'error-callback': () => setCaptchaToken(null),
        });
      } catch (e) { /* Widget already rendered */ }
    };
    document.head.appendChild(script);
  }, [currentTheme]);

  // Trigger hCaptcha load on first form interaction (focus, click, touch)
  const handleFormInteraction = useCallback(() => {
    loadCaptchaScript();
  }, [loadCaptchaScript]);

  // Also render captcha if script was already loaded (e.g. navigated back)
  useEffect(() => {
    if (window.hcaptcha && captchaRef.current && captchaWidgetId.current === null) {
      try {
        captchaWidgetId.current = window.hcaptcha.render(captchaRef.current, {
          sitekey: HCAPTCHA_SITE_KEY,
          theme: ['editorial', 'botanical', 'luxe', 'neon', 'video'].includes(currentTheme) ? 'dark' : 'light',
          size: 'normal',
          callback: (token) => setCaptchaToken(token),
          'expired-callback': () => setCaptchaToken(null),
          'error-callback': () => setCaptchaToken(null),
        });
      } catch (e) { /* already rendered */ }
    }
  }, [currentTheme]);

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
      setSubmitStatus('success'); // Fake success for bots
      return;
    }
    
    // Spam Check 2: Time-based (too fast = bot)
    const timeTaken = Date.now() - formLoadTime.current;
    if (timeTaken < MIN_SUBMIT_TIME) {
      setSubmitStatus('success'); // Fake success for bots
      return;
    }
    
    // Spam Check 3: hCaptcha
    if (!captchaToken) {
      setErrorMessage('Bitte bestätige, dass du kein Roboter bist.');
      return;
    }
    
    // Client-side validation
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
      // Einziger Call: an unsere eigene Serverless Function
      // Kein Brevo-Key, kein Supabase-Key im Frontend!
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          weddingDate: formData.weddingDate,
          interestedTheme: formData.interestedTheme,
          interestedPackage: formData.interestedPackage,
          message: formData.message.trim(),
          captchaToken,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Ein Fehler ist aufgetreten.');
      }
      
      setSubmitStatus('success');
      
      // Reset captcha
      if (window.hcaptcha && captchaWidgetId.current !== null) {
        window.hcaptcha.reset(captchaWidgetId.current);
      }
      setCaptchaToken(null);
      
    } catch (error) {
      console.error('Contact form error:', error);
      setErrorMessage(error.message || 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
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
          eyebrow: '💌 Der erste Schritt',
          title: 'Erzählt uns von euch',
          subtitle: 'Kein Verkaufsgespräch. Nur ein ehrliches Kennenlernen.',
          button: 'Nachricht schreiben →',
        };
      case 'neon':
        return {
          eyebrow: '// contact.init(your_story)',
          title: 'Erzählt uns von euch',
          subtitle: 'Keine Bots. Keine Formulare. Echte Menschen.',
          button: 'Message.send() →',
        };
      case 'luxe':
        return {
          eyebrow: 'Der erste Schritt',
          title: 'Erzählt uns von euch',
          subtitle: 'Wir melden uns persönlich — versprochen.',
          button: 'Nachricht schreiben',
        };
      default:
        return {
          eyebrow: 'Der erste Schritt',
          title: 'Erzählt uns von euch',
          subtitle: 'Kein Verkaufsgespräch. Nur ein ehrliches Kennenlernen. Ihr schreibt direkt an Sarah & Iver.',
          button: 'Nachricht schreiben',
        };
    }
  };
  
  const content = getContent();

  return (
    <Section id="contact" ref={sectionRef} $theme={currentTheme} $config={config}>
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
            <Form onSubmit={handleSubmit} onFocus={handleFormInteraction} onClick={handleFormInteraction} onTouchStart={handleFormInteraction}>
              {/* Honeypot - invisible to users */}
              <Honeypot
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                aria-label="Nicht ausfüllen"
              />
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="contact-name" $theme={currentTheme} $config={config}>Name *</Label>
                  <Input
                    id="contact-name"
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
                  <Label htmlFor="contact-email" $theme={currentTheme} $config={config}>E-Mail *</Label>
                  <Input
                    id="contact-email"
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
                  <Label htmlFor="contact-phone" $theme={currentTheme} $config={config}>Telefon</Label>
                  <Input
                    id="contact-phone"
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
                  <Label htmlFor="contact-weddingDate" $theme={currentTheme} $config={config}>Hochzeitsdatum</Label>
                  <Input
                    id="contact-weddingDate"
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
                  <Label htmlFor="contact-theme" $theme={currentTheme} $config={config}>Interesse an Theme</Label>
                  <Select
                    id="contact-theme"
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
                  <Label htmlFor="contact-package" $theme={currentTheme} $config={config}>Interesse an Paket</Label>
                  <Select
                    id="contact-package"
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
                <Label htmlFor="contact-message" $theme={currentTheme} $config={config}>Nachricht *</Label>
                <Textarea
                  id="contact-message"
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
