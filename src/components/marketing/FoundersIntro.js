// src/components/marketing/FoundersIntro.js
// Kompakte "Wer dahinter steckt"-Sektion direkt nach dem Filmstrip.
// Ersetzt (ehrlich) den fehlenden Social Proof in der frühen Phase:
// Gesicht + persönliches Versprechen statt erfundener Kennzahlen.
// Rendert nur im Classic Theme (Marketing ist auf Classic eingefroren).
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const PORTRAIT =
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_700/v1784625220/S_I_29_ns6jvg.jpg';

const Section = styled.section`
  background: #f5f2ee;
  padding: clamp(3.5rem, 8vh, 6rem) clamp(1.5rem, 5vw, 4rem);
`;

const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
  }
`;

const Portrait = styled.div`
  width: 200px;
  aspect-ratio: 3 / 4;
  background: url(${PORTRAIT}) center 20% / cover no-repeat #e8e4de;
`;

const Eyebrow = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.75rem;
`;

const Title = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  color: #1a1a1a;
  line-height: 1.2;
  margin-bottom: 0.9rem;

  em {
    font-style: italic;
  }
`;

const Text = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
  color: #555;
  line-height: 1.7;
  margin-bottom: 1.1rem;
`;

const Promise = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1a1a1a;
`;

const FoundersIntro = () => {
  const { currentTheme } = useTheme();
  if (currentTheme !== 'classic') return null;

  return (
    <Section aria-label="Wer hinter S&I. steckt">
      <Inner>
        <Portrait role="img" aria-label="Sarah und Iver" />
        <div>
          <Eyebrow>Wer dahinter steckt</Eyebrow>
          <Title>
            Wir sind Sarah &amp; Iver — <em>und wir bauen eure Website selbst.</em>
          </Title>
          <Text>
            Keine Agentur, kein anonymes Tool: Bei uns landet eure Anfrage nicht in
            einem Ticketsystem, sondern bei den beiden Menschen, die eure Website
            gestalten, einrichten und bis zur Hochzeit begleiten.
          </Text>
          <Promise>Ihr schreibt direkt mit uns — Antwort innerhalb von 24 Stunden.</Promise>
        </div>
      </Inner>
    </Section>
  );
};

export default FoundersIntro;
