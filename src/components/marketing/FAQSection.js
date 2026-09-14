// src/components/marketing/FAQSection.js
// FAQ vor dem Kontaktformular: räumt Einwände aus, bevor sie zum Absprung
// führen. Visuelles Redesign Sep 2026 — zweispaltig, editorial, keine Cards.
// Rendert nur im Classic Theme (Marketing ist auf Classic eingefroren).
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import {
  brand, font, type, leading, layout, motion,
  eyebrowStyle, buttonPrimary,
} from '../../styles/brand';

// Nur Fragen, die das Produkt tatsächlich beantwortet — sortiert nach dem,
// was Paare vor einer Anfrage wirklich wissen wollen.
const FAQS = [
  {
    q: 'Wann sollten wir unsere Hochzeitswebsite erstellen?',
    a: 'Sobald Datum und Location stehen — meist 9 bis 12 Monate vor der Hochzeit. Dann könnt ihr die Adresse schon auf die Save-the-Date-Karten drucken und eure Gäste finden von Anfang an alles an einem Ort.',
  },
  {
    q: 'Was ist der Unterschied zwischen Website und All In?',
    a: 'Der Funktionsumfang ist identisch — alle Komponenten sind in beiden Paketen enthalten. Der Unterschied ist die Arbeit: Bei Website (990 €) pflegt ihr eure Inhalte selbst über euer Dashboard ein, wir prüfen und machen den Feinschliff. Bei All In (1.490 €) liefert ihr uns Texte und Bilder, wir bauen die komplette Website, ihr prüft nur noch das Ergebnis.',
  },
  {
    q: 'Was müssen wir selbst liefern?',
    a: 'Eure Texte und Fotos. Bei All In bekommt ihr dafür eine strukturierte Vorlage, in der ihr einmal alles einträgt — Namen, Datum, Ablauf, Location, Hotels, FAQ. Um Technik, Einrichtung und Hosting müsst ihr euch in keinem Fall kümmern.',
  },
  {
    q: 'Können wir Design und Farben selbst bestimmen?',
    a: 'Ja. Ihr wählt aus acht Designwelten, die alle als vollständige Live-Demo klickbar sind — ihr wisst also vorher genau, was ihr bekommt. Farben, Schriften und Aufbau stimmen wir anschließend gemeinsam auf eure Hochzeit ab.',
  },
  {
    q: 'Was passiert nach unserer Anfrage?',
    a: 'Wir melden uns innerhalb von 24 Stunden persönlich bei euch. Dann sprechen wir über eure Hochzeit, euren Stil und das passende Paket — unverbindlich. Erst danach entscheidet ihr.',
  },
  {
    q: 'Können wir die Website später noch ändern?',
    a: 'Ja. Beim Website-Paket jederzeit selbst über euer Dashboard. Beim All-In-Paket sagt ihr uns Bescheid und wir übernehmen die Änderung für euch.',
  },
  {
    q: 'Wie lange bleibt die Website online?',
    a: 'Bis drei Monate nach eurer Hochzeit. Das deckt die gesamte Planungsphase ab und gibt euren Gästen danach noch Zeit, ihre Fotos hochzuladen.',
  },
  {
    q: 'Was passiert nach der Hochzeit?',
    a: 'Mit dem Wedding Archive wird eure Seite zur Erinnerungsseite: Danke-Text, Galerie und der Foto-Upload eurer Gäste bleiben erhalten. Bei All In ist das enthalten, beim Website-Paket kostet es 150 €. Danach werden alle Daten gelöscht — einen Export bekommt ihr auf Wunsch vorher.',
  },
];

const Section = styled.section`
  background: #FFFFFF;
  padding: ${layout.sectionY} 0;
`;

// Zweispaltig: links ruhige Überschrift, rechts das Akkordeon. Dadurch
// entsteht keine schmale Textsäule mit leeren Flanken.
const Inner = styled.div`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${layout.gutter};
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(2.5rem, 6vw, 6rem);
  align-items: start;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const Eyebrow = styled.p`
  ${eyebrowStyle}
  color: ${brand.olive};
  margin-bottom: 1.25rem;
`;

const Title = styled.h2`
  font-family: ${font.serif};
  font-weight: 400;
  font-size: ${type.h2};
  line-height: ${leading.h2};
  letter-spacing: -0.01em;
  color: ${brand.charcoal};
  margin: 0 0 1.5rem;
`;

const Intro = styled.p`
  font-family: ${font.sans};
  font-size: ${type.body};
  line-height: ${leading.body};
  color: ${brand.inkSoft};
  max-width: 34ch;
  margin: 0 0 2rem;
`;

const AskCTA = styled.a`${buttonPrimary}`;

const List = styled.div`
  border-top: 1px solid ${brand.line};
`;

const Item = styled.div`
  border-bottom: 1px solid ${brand.line};
`;

const Question = styled.button`
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.5rem 0;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;

  font-family: ${font.sans};
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  font-weight: 500;
  line-height: 1.4;
  color: ${p => (p.$open ? brand.charcoal : brand.ink)};
  transition: color ${motion.hover} ${motion.ease};

  &:hover { color: ${brand.olive}; }

  span {
    flex-shrink: 0;
    font-size: 1.3rem;
    font-weight: 300;
    color: ${brand.taupe};
    transform: rotate(${p => (p.$open ? '45deg' : '0')});
    transition: transform ${motion.hover} ${motion.ease};
  }
`;

// grid-template-rows 0fr → 1fr: weiche Höhe ohne feste Pixelwerte,
// dadurch kein Layout-Sprung und keine JS-Messung nötig.
const Answer = styled.div`
  display: grid;
  grid-template-rows: ${p => (p.$open ? '1fr' : '0fr')};
  opacity: ${p => (p.$open ? 1 : 0)};
  transition: grid-template-rows ${motion.reveal} ${motion.ease},
              opacity ${motion.hover} ${motion.ease};

  > div { overflow: hidden; }

  p {
    font-family: ${font.sans};
    font-size: 1rem;
    line-height: 1.75;
    color: ${brand.inkSoft};
    margin: 0;
    padding-bottom: 1.75rem;
    max-width: 62ch;
  }
`;

const FAQSection = () => {
  const { currentTheme } = useTheme();
  const [openIdx, setOpenIdx] = useState(0);

  if (currentTheme !== 'classic') return null;

  const toContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="faq" aria-label="Häufige Fragen">
      <Inner>
        <div>
          <Eyebrow>Häufige Fragen</Eyebrow>
          <Title>Noch Fragen?</Title>
          <Intro>
            Hier findet ihr die wichtigsten Antworten. Alles Weitere besprechen
            wir gerne persönlich mit euch.
          </Intro>
          <AskCTA href="#contact" onClick={toContact}>
            Frage stellen →
          </AskCTA>
        </div>

        <List>
          {FAQS.map((f, i) => (
            <Item key={f.q}>
              <Question
                type="button"
                $open={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                aria-expanded={openIdx === i}
              >
                {f.q}
                <span>+</span>
              </Question>
              <Answer $open={openIdx === i}>
                <div><p>{f.a}</p></div>
              </Answer>
            </Item>
          ))}
        </List>
      </Inner>
    </Section>
  );
};

export default FAQSection;
