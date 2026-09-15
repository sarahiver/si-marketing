// src/components/marketing/CaseStudy.js
// „Echte Geschichten" — Vertrauensanker nach dem Pricing.
// Ersetzt FoundersIntro, AboutSection und WhyUsSection auf der Homepage:
// Sarah & Iver erscheinen hier als kleine Zeile, nicht als eigene Section.
//
// ════════════════════════════════════════════════════════════════════════
// INHALT PFLEGEN: alles steht in CASE_STUDY unten.
// Sobald echte Fotos und ein echtes Zitat vorliegen, dort eintragen.
// quote: null  →  die Sektion rendert die Projektgeschichte ohne Zitat.
// Niemals ein erfundenes Zitat oder einen erfundenen Namen eintragen.
// ════════════════════════════════════════════════════════════════════════
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import { demoUrl, trackDemoClick, phoneCardUrl } from './demoData';
import {
  brand, font, type, leading, layout, motion,
  eyebrowStyle, buttonPrimary, buttonSecondary, scriptNote,
} from '../../styles/brand';

const CASE_STUDY = {
  // Großes Hochzeitsfoto links. Später durch ein eigenes Bild ersetzen —
  // eine Zeile, der Rest des Layouts bleibt unverändert.
  image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1600',
  imageAlt: 'Hochzeitspaar bei der Trauung',

  eyebrow: 'Echte Geschichten',
  title: 'Eine Website, die genauso persönlich ist wie der Tag selbst.',
  story:
    'Jede S&I. Hochzeitswebsite entsteht im Gespräch: Wir sprechen über euren Stil, eure Farben und darüber, was eure Gäste wirklich brauchen. Daraus wird eine Seite, die sich nach eurer Hochzeit anfühlt — und nicht nach einer Vorlage.',

  // Theme, dessen Mockup rechts neben dem Foto erscheint
  previewTheme: 'editorial',

  // ── ECHTES TESTIMONIAL ──────────────────────────────────────────────
  // Solange null, wird kein Zitat angezeigt. Beispiel für später:
  // quote: { text: '…', couple: 'Sarah & Iver', detail: 'Hochzeit in Hamburg, Juni 2026' }
  quote: null,
};

const Section = styled.section`
  background: #FFFFFF;
  padding: ${layout.sectionY} 0;
`;

// Split: Bildfläche links läuft bis zum Rand, Text rechts im Raster.
const Split = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  align-items: stretch;
  gap: 0;

  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

const Media = styled.div`
  position: relative;
  min-height: clamp(380px, 62vh, 700px);
  background: url(${p => p.$src}) center / cover no-repeat ${brand.sand};
  overflow: hidden;

  @media (max-width: 980px) { min-height: 58vh; }
`;

// Phone-Mockup überlappt die Bildkante — Hochzeit und Website in einem Bild
const Overlay = styled.img`
  position: absolute;
  right: clamp(-2.5rem, -3vw, -1rem);
  bottom: clamp(2rem, 6vh, 4rem);
  width: clamp(130px, 15vw, 210px);
  aspect-ratio: 9 / 19;
  object-fit: cover;
  object-position: top center;
  border-radius: 20px;
  border: 6px solid #0d0d0d;
  box-shadow: 0 30px 70px rgba(34, 34, 34, 0.35);
  transform: rotate(-3deg);
  transition: transform ${motion.hover} ${motion.ease};

  ${Media}:hover & { transform: rotate(-1deg) translateY(-6px); }

  @media (max-width: 980px) {
    right: 1.5rem;
    width: 120px;
  }
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2.5rem, 6vw, 5.5rem);
  position: relative;
`;

const Note = styled.span`
  ${scriptNote}
  position: absolute;
  top: clamp(1.5rem, 4vh, 3rem);
  right: clamp(2rem, 5vw, 4rem);
  color: ${brand.olive};

  @media (max-width: 1200px) { display: none; }
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

const Story = styled.p`
  font-family: ${font.sans};
  font-size: ${type.body};
  line-height: ${leading.body};
  color: ${brand.inkSoft};
  max-width: 46ch;
  margin: 0 0 2.25rem;
`;

const Quote = styled.blockquote`
  margin: 0 0 2rem;
  padding-left: 1.5rem;
  border-left: 2px solid ${brand.taupe};

  p {
    font-family: ${font.serif};
    font-style: italic;
    font-size: clamp(1.35rem, 2vw, 1.85rem);
    line-height: 1.35;
    color: ${brand.charcoal};
    margin: 0 0 1rem;
  }

  footer {
    font-family: ${font.sans};
    font-size: 0.85rem;
    color: ${brand.inkMuted};

    strong { display: block; color: ${brand.ink}; font-weight: 600; }
  }
`;

// Sarah & Iver: eine Zeile, keine eigene Section
const Founders = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 2.25rem;
  padding-top: 1.75rem;
  border-top: 1px solid ${brand.line};

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }

  p {
    font-family: ${font.sans};
    font-size: 0.9rem;
    line-height: 1.5;
    color: ${brand.inkSoft};
    margin: 0;

    strong { color: ${brand.charcoal}; font-weight: 600; }
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    a, button { width: 100%; justify-content: center; }
  }
`;

const Primary = styled.a`${buttonPrimary}`;
const Secondary = styled.button`${buttonSecondary} border-color: ${brand.charcoal};`;

// Echtes Portrait aus dem Projekt (bisher in FoundersIntro verwendet)
const FOUNDER_IMAGE =
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_160/v1784625220/S_I_29_ns6jvg.jpg';

const CaseStudy = () => {
  const { currentTheme } = useTheme();
  if (currentTheme !== 'classic') return null;

  const c = CASE_STUDY;
  const href = demoUrl(c.previewTheme, { placement: 'case_study' });

  const toContact = () => {
    if (window.gtag) {
      window.gtag('event', 'inquiry_click', {
        event_category: 'conversion',
        event_label: 'case_study',
        cta_placement: 'case_study',
        source_page: window.location.pathname,
      });
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="stories" aria-label="Echte Geschichten">
      <Split>
        <Media $src={c.image} role="img" aria-label={c.imageAlt}>
          {phoneCardUrl(c.previewTheme) && (
            <Overlay
              src={phoneCardUrl(c.previewTheme)}
              alt={`S&I. Hochzeitswebsite im Stil ${c.previewTheme}`}
              loading="lazy"
            />
          )}
        </Media>

        <Copy>
          <Note>Echte Paare.<br />Echte Geschichten.</Note>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <Title>{c.title}</Title>

          {c.quote ? (
            <Quote>
              <p>„{c.quote.text}"</p>
              <footer>
                <strong>{c.quote.couple}</strong>
                {c.quote.detail}
              </footer>
            </Quote>
          ) : (
            <Story>{c.story}</Story>
          )}

          <Founders>
            <img src={FOUNDER_IMAGE} alt="Sarah und Iver" loading="lazy" />
            <p>
              <strong>Sarah & Iver</strong>
              Persönlich begleitet — von der ersten Idee bis zum Go Live.
            </p>
          </Founders>

          <Actions>
            <Primary
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDemoClick(c.previewTheme, href, 'case_study')}
            >
              Diese Website ansehen →
            </Primary>
            <Secondary type="button" onClick={toContact}>
              Anfrage starten
            </Secondary>
          </Actions>
        </Copy>
      </Split>
    </Section>
  );
};

export default CaseStudy;
