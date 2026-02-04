// src/components/marketing/AnimatedSection.js
// Theme-spezifische Scroll-Animationen
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTheme } from '../../context/ThemeContext';

// ============================================
// ANIMATION KEYFRAMES
// ============================================

// Editorial - Clean fade up
const editorialFadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Botanical - Soft organic fade
const botanicalFade = keyframes`
  from { opacity: 0; transform: scale(0.97); filter: blur(10px); }
  to { opacity: 1; transform: scale(1); filter: blur(0); }
`;

// Contemporary - Bouncy slide
const contemporarySlide = keyframes`
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
`;

// Luxe - Elegant reveal
const luxeReveal = keyframes`
  from { opacity: 0; clip-path: inset(0 100% 0 0); }
  to { opacity: 1; clip-path: inset(0 0 0 0); }
`;

// Neon - Glitch fade
const neonGlitch = keyframes`
  0% { opacity: 0; transform: translateY(20px); text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; }
  50% { opacity: 0.5; text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
  100% { opacity: 1; transform: translateY(0); text-shadow: none; }
`;

// Video - Cinematic fade
const videoFade = keyframes`
  from { opacity: 0; transform: translateY(30px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

// ============================================
// ANIMATED WRAPPER
// ============================================
const AnimatedWrapper = styled.div`
  opacity: 0;
  
  ${p => p.$visible && p.$theme === 'editorial' && css`
    animation: ${editorialFadeUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: ${p.$delay || 0}ms;
  `}
  
  ${p => p.$visible && p.$theme === 'botanical' && css`
    animation: ${botanicalFade} 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: ${p.$delay || 0}ms;
  `}
  
  ${p => p.$visible && p.$theme === 'contemporary' && css`
    animation: ${contemporarySlide} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: ${p.$delay || 0}ms;
  `}
  
  ${p => p.$visible && p.$theme === 'luxe' && css`
    animation: ${luxeReveal} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: ${p.$delay || 0}ms;
  `}
  
  ${p => p.$visible && p.$theme === 'neon' && css`
    animation: ${neonGlitch} 0.5s ease forwards;
    animation-delay: ${p.$delay || 0}ms;
  `}
  
  ${p => p.$visible && p.$theme === 'video' && css`
    animation: ${videoFade} 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: ${p.$delay || 0}ms;
  `}
`;

// ============================================
// COMPONENT
// ============================================
const AnimatedSection = ({ children, delay = 0, threshold = 0.15, className }) => {
  const { currentTheme } = useTheme();
  const [ref, isVisible] = useScrollAnimation(threshold);

  return (
    <AnimatedWrapper 
      ref={ref} 
      $visible={isVisible} 
      $theme={currentTheme}
      $delay={delay}
      className={className}
    >
      {children}
    </AnimatedWrapper>
  );
};

export default AnimatedSection;
