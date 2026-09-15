// src/components/marketing/DemoWedding.js
// „Demo-Hochzeit — Lea & Ben" · Section nach dem Pricing.
//
// WICHTIG: Lea & Ben sind unser Demo-Paar, keine Kunden. Die Section darf
// deshalb kein Testimonial, keine Bewertung und keine erfundene Aussage
// enthalten — und der Hinweis darauf bleibt sichtbar. Sobald ein echtes
// Projekt vorliegt, wird nur das Objekt DEMO_WEDDING unten ersetzt:
// Namen, Datum, zwei Bilder, Theme, optional ein echtes Zitat.
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';
import {
  ALL_DEMOS, THEME_MOBILE_SCREENS, demoUrl, setStyleChoice, trackDemoClick,
} from './demoData';
import {
  brand, font, type, leading, layout, motion,
  eyebrowStyle, buttonPrimary,
} from '../../styles/brand';

// ── INHALT ──────────────────────────────────────────────────────────────
const DEMO_WEDDING = {
  eyebrow: 'Demo-Hochzeit',
  couple: 'Lea & Ben',
  date: '25. Juni 2027',
  headline: 'Eine Hochzeit. Ein ganz eigener Stil.',
  text:
    'Lea & Ben stehen stellvertretend für ein Paar, das seine Hochzeit persönlich, modern und mit viel Liebe zum Detail plant. Vom ersten Stilgefühl bis zur fertigen Website lässt sich alles auf das Paar abstimmen — von Farben und Bildern bis zu Struktur und Inhalten.',
  // Verbindung zurück zur Theme Collection darüber
  bridge: 'Eine Geschichte. Acht Möglichkeiten, sie zu erzählen.',
  // Bewusst Alltagsbilder statt Hochzeitsszene: die Hochzeit kommt noch.
  photoMain: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_1400/v1789471183/lea-ben-park_jxbsrm.jpg',
  photoMainAlt: 'Lea und Ben im Park',
  photoSecond: 'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_600/v1789471181/lea-ben-berge_cnionc.jpg',
  photoSecondAlt: 'Lea und Ben in den Bergen',
  // Theme, dessen Demo der CTA öffnet und dessen Vorschau rechts erscheint
  theme: 'editorial',
  note: 'Lea & Ben sind unser Demo-Paar — ihre Hochzeit steht noch bevor.',
  cta: 'Lea & Ben ansehen',
};

// ── LAYOUT ──────────────────────────────────────────────────────────────
const Section = styled.section`
  background: ${brand.ivory};
  padding: clamp(4rem, 9vh, 7rem) 0;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: ${layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${layout.gutter};
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: clamp(2.5rem, 6vw, 6rem);
  align-items: center;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

// Bildgruppe: großes Hauptbild, kleines Foto überlappend wie ein Abzug
const Photos = styled.div`
  position: relative;
  padding-bottom: clamp(2.5rem, 6vw, 4.5rem);
  padding-right: clamp(2rem, 5vw, 4rem);

  opacity: 0;
  transform: translateY(26px);
  transition: opacity 700ms ${motion.ease}, transform 700ms ${motion.ease};
  ${p => p.$visible && 'opacity: 1; transform: translateY(0);'}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

const MainPhoto = styled.div`
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 26px 64px rgba(34, 34, 34, 0.16);

  img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    transition: transform 900ms ${motion.ease};
  }

  &:hover img { transform: scale(1.015); }

  @media (prefers-reduced-motion: reduce) {
    &:hover img { transform: none; }
  }
`;

// Wie ein loser Abzug: weißer Rand, leichte Drehung
const SecondPhoto = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: clamp(130px, 34%, 250px);
  padding: 8px 8px 22px;
  background: #FFFFFF;
  border-radius: 2px;
  box-shadow: 0 18px 44px rgba(34, 34, 34, 0.20);
  transform: rotate(3deg);

  opacity: 0;
  transition: opacity 700ms ${motion.ease} 220ms,
              transform 700ms ${motion.ease} 220ms;
  ${p => p.$visible && 'opacity: 1; transform: rotate(3deg) translateY(0);'}

  img {
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  @media (prefers-reduced-motion: reduce) { opacity: 1; transition: none; }
`;

// ── TEXT ────────────────────────────────────────────────────────────────
const Copy = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 700ms ${motion.ease} 140ms,
              transform 700ms ${motion.ease} 140ms;
  ${p => p.$visible && 'opacity: 1; transform: translateY(0);'}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

const Eyebrow = styled.p`
  ${eyebrowStyle}
  color: ${brand.olive};
  margin-bottom: 1rem;
`;

const Couple = styled.p`
  font-family: ${font.serif};
  font-size: clamp(1.5rem, 2vw, 1.9rem);
  color: ${brand.charcoal};
  margin: 0 0 0.35rem;

  span {
    display: block;
    margin-top: 0.35rem;
    font-family: ${font.sans};
    font-size: 0.82rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${brand.inkMuted};
  }
`;

const Headline = styled.h2`
  font-family: ${font.serif};
  font-weight: 400;
  font-size: ${type.h2};
  line-height: ${leading.h2};
  letter-spacing: -0.01em;
  color: ${brand.charcoal};
  margin: 1.75rem 0 1.5rem;
`;

const Text = styled.p`
  font-family: ${font.sans};
  font-size: ${type.body};
  line-height: ${leading.body};
  color: ${brand.inkSoft};
  max-width: 44ch;
  margin: 0 0 2rem;
`;

// Kleiner Produktbezug: Ausschnitt der Demo-Website, kein großes Mockup
const Preview = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 0 1.75rem;
  border-top: 1px solid ${brand.line};
  border-bottom: 1px solid ${brand.line};
  margin-bottom: 2rem;
  padding-top: 1.5rem;

  img {
    width: 74px;
    flex-shrink: 0;
    aspect-ratio: 9 / 16;
    object-fit: cover;
    object-position: top center;
    border-radius: 6px;
    border: 1px solid ${brand.line};
  }

  p {
    font-family: ${font.sans};
    font-size: 0.9rem;
    line-height: 1.55;
    color: ${brand.inkSoft};
    margin: 0;

    strong {
      display: block;
      font-family: ${font.serif};
      font-size: 1.1rem;
      font-weight: 400;
      color: ${brand.charcoal};
      margin-bottom: 0.3rem;
    }
  }
`;

const ThemeLine = styled.p`
  font-family: ${font.sans};
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: ${brand.inkMuted};
  margin: 0 0 2rem;
`;

const CTA = styled.a`${buttonPrimary}`;

// Transparenzhinweis — bleibt sichtbar, solange Lea & Ben ein Demo-Paar sind
const Note = styled.p`
  margin: 1.5rem 0 0;
  font-family: ${font.sans};
  font-size: 0.78rem;
  font-style: italic;
  line-height: 1.5;
  color: ${brand.inkMuted};
`;

const DemoWedding = () => {
  const { currentTheme } = useTheme();
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setVisible(true); return undefined; }
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (currentTheme !== 'classic') return null;

  const d = DEMO_WEDDING;
  const href = demoUrl(d.theme, { placement: 'demo_wedding' });

  const openDemo = () => {
    setStyleChoice(d.theme, 'demo_wedding');
    trackDemoClick(d.theme, href, 'demo_wedding');
  };

  return (
    <Section id="demo-wedding" ref={ref} aria-label="Demo-Hochzeit Lea und Ben">
      <Inner>
        <Photos $visible={visible}>
          <MainPhoto>
            <img src={d.photoMain} alt={d.photoMainAlt} loading="lazy" />
          </MainPhoto>
          <SecondPhoto $visible={visible}>
            <img src={d.photoSecond} alt={d.photoSecondAlt} loading="lazy" />
          </SecondPhoto>
        </Photos>

        <Copy $visible={visible}>
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <Couple>
            {d.couple}
            <span>{d.date}</span>
          </Couple>
          <Headline>{d.headline}</Headline>
          <Text>{d.text}</Text>

          <Preview>
            <img
              src={THEME_MOBILE_SCREENS[d.theme]}
              alt={`Ausschnitt der Demo-Website von ${d.couple}`}
              loading="lazy"
            />
            <p>
              <strong>{d.bridge}</strong>
              Dieselbe Hochzeit, gezeigt in acht Designwelten — von romantisch
              bis modern.
            </p>
          </Preview>

          <ThemeLine>
            {ALL_DEMOS.map(t => t.name).join(' · ')}
          </ThemeLine>

          <CTA
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openDemo}
          >
            {d.cta} →
          </CTA>

          <Note>{d.note}</Note>
        </Copy>
      </Inner>
    </Section>
  );
};

export default DemoWedding;
