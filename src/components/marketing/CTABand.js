// src/components/marketing/CTABand.js
// Schlankes CTA-Band für den Conversion-Rhythmus zwischen Sektionen
// (Review-Empfehlung: alle 1–2 Bildschirmhöhen eine Handlungsmöglichkeit).
// Rendert nur im Classic Theme.
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const Band = styled.div`
  background: #1a1a1a;
  padding: clamp(1.8rem, 4vh, 2.6rem) clamp(1.5rem, 5vw, 4rem);
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem 2rem;
  text-align: center;
`;

const Line = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.15rem, 2.5vw, 1.5rem);
  font-weight: 400;
  color: #fdfcfa;

  em {
    font-style: italic;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
`;

const Primary = styled.button`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: #fdfcfa;
  color: #1a1a1a;
  border: 1px solid #fdfcfa;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: transparent;
    color: #fdfcfa;
  }
`;

const Secondary = styled.button`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: transparent;
  color: #fdfcfa;
  border: 1px solid rgba(253, 252, 250, 0.45);
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #fdfcfa;
  }
`;

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const CTABand = ({ line }) => {
  const { currentTheme } = useTheme();
  if (currentTheme !== 'classic') return null;

  return (
    <Band>
      <Inner>
        <Line>{line || <>Neugierig, wie <em>eure</em> Seite aussehen könnte?</>}</Line>
        <Buttons>
          <Secondary onClick={() => scrollTo('themes')}>Beispiele ansehen</Secondary>
          <Primary onClick={() => scrollTo('contact')}>Unverbindlich anfragen</Primary>
        </Buttons>
      </Inner>
    </Band>
  );
};

export default CTABand;
