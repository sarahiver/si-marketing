// src/components/marketing/FinalCTA.js
// Emotionaler Abschluss vor dem Footer — der zweite große Conversion-Moment
// der Seite. Full-width Bildfläche, zwei klare Aktionen, sonst nichts.
// Rendert nur im Classic Theme (Marketing ist auf Classic eingefroren).
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { demoUrl, trackDemoClick } from './demoData';
import {
  brand, font, type, leading, layout, motion,
  eyebrowStyle, scriptNote, images,
} from '../../styles/brand';

const Section = styled.section`
  position: relative;
  min-height: clamp(520px, 72vh, 820px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background: ${brand.charcoal};
`;

const Media = styled.div`
  position: absolute;
  inset: 0;
  background: url(${images.finalCta}) center 55% / cover no-repeat;
  transform: scale(1.02);
  transition: transform 1200ms ${motion.ease};

  ${Section}:hover & { transform: scale(1.05); }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    /* Dunkler zur Mitte hin — die Headline braucht Kontrast, das Motiv Luft */
    background: radial-gradient(
      ellipse at center,
      rgba(34, 34, 34, 0.48) 0%,
      rgba(34, 34, 34, 0.26) 55%,
      rgba(34, 34, 34, 0.40) 100%
    );
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  max-width: ${layout.narrow};
  padding: ${layout.sectionY} ${layout.gutter};
`;

const Eyebrow = styled.p`
  ${eyebrowStyle}
  color: ${brand.onDarkMuted};
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-family: ${font.serif};
  font-weight: 400;
  font-size: ${type.h2};
  line-height: ${leading.h2};
  letter-spacing: -0.01em;
  color: ${brand.onDark};
  margin: 0 0 2.5rem;

  em { font-style: italic; }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 520px) {
    flex-direction: column;
    a, button { width: 100%; justify-content: center; }
  }
`;

// Auf dunklem Grund invertiert: hell gefüllt = primär, Outline = sekundär
const Primary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2.1rem;
  font-family: ${font.sans};
  font-size: ${type.button};
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: none;
  border-radius: 2px;
  background: ${brand.ivory};
  color: ${brand.charcoal};
  border: 1px solid ${brand.ivory};
  cursor: pointer;
  transition: all ${motion.hover} ${motion.ease};

  &:hover { background: ${brand.taupe}; border-color: ${brand.taupe}; }
`;

const Secondary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 2.1rem;
  font-family: ${font.sans};
  font-size: ${type.button};
  font-weight: 500;
  letter-spacing: 0.04em;
  border-radius: 2px;
  background: transparent;
  color: ${brand.onDark};
  border: 1px solid rgba(250, 249, 246, 0.42);
  cursor: pointer;
  transition: all ${motion.hover} ${motion.ease};

  &:hover { border-color: ${brand.onDark}; }
`;

const Note = styled.span`
  ${scriptNote}
  position: absolute;
  right: clamp(2rem, 9vw, 8rem);
  bottom: clamp(3rem, 10vh, 6rem);
  z-index: 2;
  color: ${brand.onDarkSoft};
  opacity: 0.75;

  @media (max-width: 1100px) { display: none; }
`;

const FinalCTA = () => {
  const { currentTheme } = useTheme();
  if (currentTheme !== 'classic') return null;

  const scrollToContact = () => {
    if (window.gtag) {
      window.gtag('event', 'inquiry_click', {
        event_category: 'conversion',
        event_label: 'final_cta',
        cta_placement: 'final_cta',
        source_page: window.location.pathname,
      });
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const href = demoUrl('classic', { placement: 'final_cta' });

  return (
    <Section aria-label="Bereit für eure Hochzeitswebsite">
      <Media aria-hidden="true" />
      <Note>Der erste Schritt<br />zu eurer Website.</Note>
      <Inner>
        <Eyebrow>Bereit für eure Hochzeitswebsite?</Eyebrow>
        <Title>
          Lasst uns eure <em>Geschichte</em> erzählen.
        </Title>
        <Actions>
          <Primary
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDemoClick('classic', href, 'final_cta')}
          >
            Demo ansehen →
          </Primary>
          <Secondary type="button" onClick={scrollToContact}>
            Anfrage starten
          </Secondary>
        </Actions>
      </Inner>
    </Section>
  );
};

export default FinalCTA;
