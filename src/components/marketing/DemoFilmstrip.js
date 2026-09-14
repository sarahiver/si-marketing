// src/components/marketing/DemoFilmstrip.js
// PRODUKTIVE Theme-Sektion (#themes) — Gewinner des Varianten-Vergleichs (Jul 2026).
// Desktop: endlos laufender Filmstreifen mit Browser-Frames; Hover stoppt den
//   Streifen und scrollt die Demo-Seite im Frame durch.
// Mobile: natives Scroll-Snap-Carousel (kein Auto-Movement), Karten zeigen
//   4:3-Hero-Bilder (THEME_HEROES in demoData.js — Fallback: Crop aus Full-Page).
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  brand, font, type, leading, layout, motion,
  eyebrowStyle, buttonPrimary, scriptNote,
} from '../../styles/brand';
import { ALL_DEMOS, THEME_SCREENSHOTS, THEME_VIDEO_PREVIEWS, HORIZONTAL_THEMES, STYLE_WORDS, phoneCardUrl, demoUrl, trackDemoClick, trackStyleInquiry } from './demoData';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange);
    };
  }, []);
  return isMobile;
};


const Section = styled.section`
  position: relative;
  padding: ${layout.sectionY} 0;
  background: ${brand.ivory};
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
  max-width: ${layout.maxWidth};
  margin: 0 auto clamp(3rem, 6vh, 4.5rem);
  padding: 0 ${layout.gutter};
  text-align: center;
`;

// Handschriftliche Notiz rechts neben der Überschrift — wie im Mockup
const HeaderNote = styled.span`
  ${scriptNote}
  position: absolute;
  right: clamp(1rem, 6vw, 5rem);
  top: 2.5rem;
  color: ${brand.olive};

  @media (max-width: 1100px) { display: none; }
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

  em { font-style: italic; }
`;

const Sub = styled.p`
  font-family: ${font.sans};
  font-size: ${type.body};
  line-height: ${leading.body};
  color: ${brand.inkSoft};
  max-width: 52ch;
  margin: 1.25rem auto 0;
`;

// Desktop: Kollektions-Grid (4 × 2) statt Endlosstreifen — die acht Designs
// sollen als Sammlung lesbar sein, nicht als vorbeiziehendes Band.
// Mobile: der bestehende Swipe-Track bleibt, weil er dort besser funktioniert.
// Kollektions-Raster über 6 Spalten: die ersten beiden Designs bekommen
// halbe Breite (großes Preview), die übrigen sechs je ein Drittel.
// Alle acht bleiben sichtbar — sie müssen nur nicht gleich viel Gewicht haben.
const Grid = styled.div`
  max-width: ${layout.wide};
  margin: 0 auto;
  padding: 0 ${layout.gutter};
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: clamp(1.5rem, 2.4vw, 2.5rem);

  > *:nth-child(-n + 2) { grid-column: span 3; }
  > *:nth-child(n + 3)  { grid-column: span 2; }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    > *:nth-child(-n + 2), > *:nth-child(n + 3) { grid-column: span 1; }
  }
`;

const AllDemosRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: clamp(2.5rem, 5vh, 4rem);
`;

const AllDemosLink = styled.a`${buttonPrimary}`;

const Frame = styled.div`
  background: #FFFFFF;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(34, 34, 34, 0.14);
  border: 1px solid ${brand.lineSoft};
  transition: box-shadow ${motion.hover} ${motion.ease};

  ${'' /* Hover verstärkt die Tiefe, nicht die Skalierung */}
`;

const FrameBar = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 9px 12px;
  background: #F5F2EE;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.12);
  }
`;

const FrameUrl = styled.div`
  flex: 1;
  margin-left: 8px;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 3px 10px;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.05em;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FrameScreen = styled.div`
  /* 3:2 statt 4:3 — mehr Bildfläche je Karte */
  position: relative;
  aspect-ratio: 3/2;
  background-image: url(${p => p.$src});
  background-size: ${p => (p.$static ? 'cover' : p.$horizontal ? 'auto 100%' : '100% auto')};
  background-position: ${p => (p.$static ? 'center' : p.$horizontal ? 'left center' : 'top center')};
  background-repeat: no-repeat;
  background-color: #F5F2EE;
  transition: background-position 16s cubic-bezier(0.25, 0.1, 0.25, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.4rem;
  color: rgba(26, 26, 26, 0.3);
`;

const PreviewVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// ── Mobile: Handy-Frame statt Browser-Fenster ──
const Phone = styled.div`
  background: #1a1a1a;
  border-radius: 34px;
  padding: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.18);
`;

const PhoneScreen = styled.div`
  position: relative;
  aspect-ratio: 9 / 19;
  border-radius: 26px;
  overflow: hidden;
  background-image: url(${p => p.$src});
  background-size: cover;
  background-position: top center;
  background-color: #F5F2EE;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.2rem;
  color: rgba(26, 26, 26, 0.3);
`;

const PhoneNotch = styled.div`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 34%;
  height: 14px;
  background: #1a1a1a;
  border-radius: 99px;
  z-index: 2;
`;


const SwipeTrack = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-x: contain;
  padding: 1.5rem clamp(1.5rem, 6vw, 2.5rem) 2rem;
  scroll-padding-left: clamp(1.5rem, 6vw, 2.5rem);
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.a`
  display: block;
  text-decoration: none;
  width: 100%;
  transition: transform 0.35s ease;

  &:hover {
    transform: translateY(-8px) scale(1.02);
  }

  &:hover ${FrameScreen} {
    background-position: ${p => (p.$static ? 'center' : p.$horizontal ? 'right center' : 'bottom center')};
  }
`;

const SwipeCard = styled(Card)`
  &:hover {
    transform: none;
  }
`;

// Gruppe = Karte + Anfrage-CTA. Breite und Scroll-Snap liegen jetzt hier,
// damit der CTA dieselbe Spaltenbreite hat wie die Karte.
const CardGroup = styled.div`
  width: 100%;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  transition: box-shadow ${motion.hover} ${motion.ease},
              transform ${motion.hover} ${motion.ease};

  &:hover { transform: translateY(-6px); }
`;

const SwipeCardGroup = styled(CardGroup)`
  width: 78vw;
  max-width: 340px;
  flex-shrink: 0;
  scroll-snap-align: start;

  &:hover { transform: none; box-shadow: none; }
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1.1rem 0.1rem 0;
`;

const CardName = styled.span`
  font-family: ${font.serif};
  font-size: 1.3rem;
  color: ${brand.charcoal};
`;

const CardTag = styled.span`
  ${eyebrowStyle}
  color: ${brand.taupe};
  transition: color ${motion.hover} ${motion.ease};

  ${CardGroup}:hover & { color: ${brand.olive}; }
`;

const StyleWords = styled.span`
  display: block;
  margin-top: 0.25rem;
  font-family: ${font.sans};
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: ${brand.inkMuted};
`;

// Zweiter, leiserer CTA unter jeder Karte: der Weg von "gefällt mir"
// zur Anfrage, ohne dass die Demo selbst verlassen werden muss.
const StyleInquiry = styled.button`
  display: block;
  width: 100%;
  margin-top: 0.65rem;
  padding: 0.65rem 0;
  background: none;
  border: none;
  border-top: 1px solid ${brand.line};
  font-family: ${font.sans};
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${brand.inkMuted};
  cursor: pointer;
  transition: color ${motion.hover} ${motion.ease};

  &:hover { color: ${brand.olive}; }
  ${CardGroup}:hover & { color: ${brand.charcoal}; }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  ${eyebrowStyle}
  color: ${brand.inkMuted};
`;

// Einzelkarte — hält den Video-Ref, damit die Preview erst bei Hover abspielt
const DemoCard = ({ demo, isMobile, CardComp, onInquire }) => {
  const videoRef = useRef(null);
  const videoSrc = !isMobile && THEME_VIDEO_PREVIEWS[demo.id];

  const handleEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <CardComp
      href={demoUrl(demo.id, { placement: isMobile ? 'filmstrip_mobile' : 'filmstrip' })}
      target="_blank"
      rel="noopener noreferrer"
      $static={isMobile}
      $horizontal={HORIZONTAL_THEMES.includes(demo.id)}
      onMouseEnter={videoSrc ? handleEnter : undefined}
      onMouseLeave={videoSrc ? handleLeave : undefined}
      onClick={() => trackDemoClick(demo.id, demo.url, isMobile ? 'filmstrip_mobile' : 'filmstrip')}
      aria-label={`${demo.name} Live-Demo ansehen`}
    >
      {isMobile ? (
        <Phone>
          <PhoneNotch />
          <PhoneScreen $src={phoneCardUrl(demo.id)}>
            {!phoneCardUrl(demo.id) && demo.name}
          </PhoneScreen>
        </Phone>
      ) : (
        <Frame>
          <FrameBar>
            <span /><span /><span />
            <FrameUrl>siwedding.de/{demo.id}</FrameUrl>
          </FrameBar>
          <FrameScreen
            $src={videoSrc ? undefined : THEME_SCREENSHOTS[demo.id]}
            $horizontal={HORIZONTAL_THEMES.includes(demo.id)}
          >
            {videoSrc && (
              <PreviewVideo
                ref={videoRef}
                muted
                loop
                playsInline
                preload="metadata"
                src={videoSrc}
              />
            )}
            {!(videoSrc || THEME_SCREENSHOTS[demo.id]) && demo.name}
          </FrameScreen>
        </Frame>
      )}
      <CardMeta>
        <div>
          <CardName>{demo.name}</CardName>
          <StyleWords>{(STYLE_WORDS[demo.id] || []).join(' · ')}</StyleWords>
        </div>
        <CardTag>Demo →</CardTag>
      </CardMeta>
    </CardComp>
  );
};

// Karte + Anfrage-CTA als Einheit
const DemoCardGroup = ({ demo, isMobile, CardComp, Wrapper, onInquire }) => (
  <Wrapper>
    <DemoCard demo={demo} isMobile={isMobile} CardComp={CardComp} />
    <StyleInquiry
      type="button"
      onClick={() => onInquire(demo.id)}
      aria-label={`Stil ${demo.name} anfragen`}
    >
      Diesen Stil anfragen
    </StyleInquiry>
  </Wrapper>
);

const DemoFilmstrip = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Theme entdecken → Demo ansehen → Stil gefällt → diesen Stil anfragen
  const handleInquire = (themeId) => {
    trackStyleInquiry(themeId, isMobile ? 'filmstrip_mobile' : 'filmstrip');
    navigate(`/#contact?theme=${themeId}`);
  };

  // Desktop zeigt die Kollektion einmal im Grid, mobil bleibt der Swipe-Track
  const demos = ALL_DEMOS;
  const TrackComp = isMobile ? SwipeTrack : Grid;
  const CardComp = isMobile ? SwipeCard : Card;

  return (
    <Section id="themes" aria-label="Theme-Demos">
      <Header>
        <HeaderNote>Acht Stile.<br />Unzählige<br />Möglichkeiten.</HeaderNote>
        <Eyebrow>Findet euren Stil</Eyebrow>
        <Title>
          Nicht einfach eine Vorlage.<br /><em>Sondern euer Stil.</em>
        </Title>
        <Sub>
          Acht Designwelten. Von romantisch bis modern — jede davon eine
          vollständige Live-Demo mit RSVP, Gästebereich und Foto-Upload.
          Und jede individuell auf eure Hochzeit abgestimmt.
        </Sub>
      </Header>
      <TrackComp>
        {demos.map((demo, i) => (
          <DemoCardGroup
            key={`${demo.id}-${i}`}
            demo={demo}
            isMobile={isMobile}
            CardComp={CardComp}
            Wrapper={isMobile ? SwipeCardGroup : CardGroup}
            onInquire={handleInquire}
          />
        ))}
      </TrackComp>
      <AllDemosRow>
        <AllDemosLink
          href={demoUrl('classic', { placement: 'themes_all' })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackDemoClick('classic', demoUrl('classic', { placement: 'themes_all' }), 'themes_all')}
        >
          Alle Designs entdecken →
        </AllDemosLink>
      </AllDemosRow>
      <Footer>
        {isMobile ? 'Wischen zum Entdecken' : 'Klick öffnet die Live-Demo'}
      </Footer>
    </Section>
  );
};

export default DemoFilmstrip;
