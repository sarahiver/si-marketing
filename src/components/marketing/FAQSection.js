// src/components/marketing/FAQSection.js
// FAQ direkt vor dem Kontaktformular: räumt die häufigsten Einwände aus,
// bevor sie zur Absprung-Ursache werden (Conversion-Review Jul 2026).
// Rendert nur im Classic Theme.
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const FAQS = [
  {
    q: 'Was kostet eine Hochzeitswebsite bei euch?',
    a: 'Unsere Pakete starten bei 1.290 € — einmalig, kein Abo. Domain, individuelle Einrichtung, RSVP, Gästemanagement und Hosting für eure gesamte Planungszeit sind inklusive. Alle Details findet ihr oben in der Preisübersicht.',
  },
  {
    q: 'Wie lange dauert es, bis unsere Website live ist?',
    a: 'In der Regel 7 Tage, nachdem wir eure Texte und Fotos haben — inklusive Korrekturschleife. Wenn es bei uns einmal länger dauert, sagen wir euch das ehrlich vorher.',
  },
  {
    q: 'Was müssen wir selbst tun?',
    a: 'So wenig wie möglich: Ihr liefert Texte und Fotos, wir übernehmen den Rest — Design-Anpassung, Einrichtung, Technik, Feinschliff. Kein Baukasten, keine Bastelabende.',
  },
  {
    q: 'Was ist, wenn uns das Design am Ende nicht gefällt?',
    a: 'Ihr wählt euer Design vorab anhand echter Live-Demos — ihr wisst also genau, was ihr bekommt. Farben, Fotos und Details passen wir individuell an euch an, Revisionen sind in jedem Paket enthalten.',
  },
  {
    q: 'Bekommen wir eine eigene Domain?',
    a: 'Ja. Eure Website läuft unter eurer persönlichen Adresse (z.B. euer-name.de) — keine Subdomain, kein Baukasten-Link. Wir richten alles für euch ein.',
  },
  {
    q: 'Sind unsere Inhalte und Fotos privat?',
    a: 'Auf Wunsch schützen wir eure Website mit einem Passwort — dann sehen nur eure Gäste eure Inhalte. Eure Fotos und Gästedaten gehören euch und werden nicht weitergegeben.',
  },
];

const Section = styled.section`
  background: #ffffff;
  padding: clamp(3.5rem, 8vh, 6.5rem) clamp(1.5rem, 5vw, 4rem);
`;

const Inner = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #999;
  text-align: center;
  margin-bottom: 0.75rem;
`;

const Title = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Item = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Question = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background: none;
  border: none;
  padding: 1.15rem 0;
  cursor: pointer;
  text-align: left;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: #1a1a1a;

  span {
    flex-shrink: 0;
    font-size: 1.1rem;
    color: #999;
    transition: transform 0.3s ease;
    transform: rotate(${p => (p.$open ? '45deg' : '0deg')});
  }
`;

const Answer = styled.div`
  max-height: ${p => (p.$open ? '300px' : '0')};
  overflow: hidden;
  transition: max-height 0.35s ease;

  p {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    color: #555;
    line-height: 1.7;
    padding-bottom: 1.15rem;
  }
`;

const FootLine = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 300;
  color: #999;
  text-align: center;
  margin-top: 2rem;

  a {
    color: #1a1a1a;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }
`;

const FAQSection = () => {
  const { currentTheme } = useTheme();
  const [openIdx, setOpenIdx] = useState(0);

  if (currentTheme !== 'classic') return null;

  return (
    <Section id="faq" aria-label="Häufige Fragen">
      <Inner>
        <Eyebrow>Bevor ihr fragt</Eyebrow>
        <Title>Die häufigsten Fragen</Title>
        {FAQS.map((f, i) => (
          <Item key={i}>
            <Question
              $open={openIdx === i}
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              aria-expanded={openIdx === i}
            >
              {f.q}
              <span>+</span>
            </Question>
            <Answer $open={openIdx === i}>
              <p>{f.a}</p>
            </Answer>
          </Item>
        ))}
        <FootLine>
          Eure Frage ist nicht dabei?{' '}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Schreibt uns einfach
          </a>{' '}
          — Antwort innerhalb von 24 Stunden.
        </FootLine>
      </Inner>
    </Section>
  );
};

export default FAQSection;
