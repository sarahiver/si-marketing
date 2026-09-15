// src/components/marketing/DemoFilmstrip.js
// PRODUKTIVE Theme-Sektion (#themes) — Gewinner des Varianten-Vergleichs (Jul 2026).
// Desktop: endlos laufender Filmstreifen mit Browser-Frames; Hover stoppt den
//   Streifen und scrollt die Demo-Seite im Frame durch.
// Mobile: natives Scroll-Snap-Carousel (kein Auto-Movement), Karten zeigen
//   4:3-Hero-Bilder (THEME_HEROES in demoData.js — Fallback: Crop aus Full-Page).
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  brand, font, type, leading, layout, motion,
  eyebrowStyle, scriptNote,
} from '../../styles/brand';
import {
  ALL_DEMOS, THEME_SCREENSHOTS, THEME_HEROES, THEME_VIDEO_PREVIEWS,
  HORIZONTAL_THEMES, STYLE_WORDS, phoneCardUrl, demoUrl, videoPosterUrl,
  setStyleChoice, trackDemoClick,
} from './demoData';

// Poster = Standbild aus demselben Video. So zeigen Ruhezustand und Hover
// dieselbe Demo; die älteren THEME_SCREENSHOTS dienen nur noch als Fallback
// (und THEME_HEROES für 'modern', wo kein Desktop-Screenshot existiert).
const posterFor = (id) =>
  videoPosterUrl(id) || THEME_SCREENSHOTS[id] || THEME_HEROES[id];

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
  /* bewusst kompakter als der Standard-Sectionabstand: die Collection soll
     direkt nach dem Hero greifen, nicht durch Leerraum getrennt sein */
  padding: clamp(3rem, 7vh, 5.5rem) 0 clamp(3.5rem, 8vh, 6rem);
  background: ${brand.ivory};
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
  max-width: ${layout.maxWidth};
  margin: 0 auto clamp(2.25rem, 4.5vh, 3.25rem);
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
  max-width: ${layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${layout.gutter};
  display: grid;
  /* Kompakte Kollektion: acht gleichwertige Karten in 4 × 2.
     Bewusst kleiner als im vorigen Stand — die Collection soll als Ganzes
     lesbar sein, der WOW-Moment passiert in der Demo, nicht in der Kachel. */
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1.25rem, 2vw, 2rem);

  @media (max-width: 1000px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
`;



// Leichtes Card-UI: dezenter Rand, kleine Rundung, sehr weicher Schatten.
// Die Website-Preview ist der Star, nicht der Rahmen.
const Frame = styled.div`
  background: #FFFFFF;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(34, 34, 34, 0.07);
  border: 1px solid ${brand.lineSoft};
  transition: box-shadow 260ms ${motion.ease};

  ${'' /* Hover-Schatten wird unten über CardGroup gesetzt */}
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
  transition: transform 300ms ${p => p.theme?.ease || 'cubic-bezier(0.22, 1, 0.36, 1)'};
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

// Blendet über dem Screenshot auf — dadurch ist die Karte auch ohne
// geladenes Video vollständig, und es lädt erst bei Hover (preload="none").
const PreviewVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${p => (p.$visible ? 1 : 0)};
  transition: opacity 320ms ease;

  @media (prefers-reduced-motion: reduce) { display: none; }
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
  transition: transform 260ms ${motion.ease};

  &:hover {
    transform: translateY(-4px);
    ${Frame} { box-shadow: 0 16px 40px rgba(34, 34, 34, 0.13); }
    ${FrameScreen} { transform: scale(1.015); }
  }

  /* Fokus sichtbar halten — die Karte ist ein Link */
  &:focus-within { transform: translateY(-4px); }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover, &:focus-within { transform: none; }
  }
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
  font-size: 1.25rem;
  color: ${brand.charcoal};
`;

const CardTag = styled.span`
  ${eyebrowStyle}
  font-size: 0.75rem;
  color: ${brand.charcoal};
  transition: color 260ms ease;

  ${CardGroup}:hover &, ${CardGroup}:focus-within & { color: ${brand.olive}; }
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


// Einzelkarte — hält den Video-Ref, damit die Preview erst bei Hover abspielt
const DemoCard = ({ demo, isMobile, CardComp }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  // Mobile lädt bewusst kein Video: acht gleichzeitig wären reine Datenlast.
  const videoSrc = !isMobile && THEME_VIDEO_PREVIEWS[demo.id];

  const handleEnter = () => {
    setPlaying(true);
    if (videoRef.current) {
      // immer von vorn: sonst läuft das Video dort weiter, wo es beim
      // letzten Hover stehengeblieben ist, und der Hero fehlt
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
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
      onClick={() => {
        const placement = isMobile ? 'filmstrip_mobile' : 'filmstrip';
        // merkt den Stil in der Session: kommt das Paar aus der Demo zurück,
        // ist er im Anfrageformular vorausgewählt
        setStyleChoice(demo.id, placement);
        trackDemoClick(demo.id, demoUrl(demo.id, { placement }), placement);
      }}
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
            $src={posterFor(demo.id)}
            $horizontal={HORIZONTAL_THEMES.includes(demo.id)}
          >
            {videoSrc && (
              <PreviewVideo
                ref={videoRef}
                muted
                loop
                playsInline
                preload="none"
                poster={posterFor(demo.id)}
                src={videoSrc}
                $visible={playing}
                aria-hidden="true"
              />
            )}
            {!posterFor(demo.id) && !videoSrc && demo.name}
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

const DemoCardGroup = ({ demo, isMobile, CardComp, Wrapper }) => (
  <Wrapper>
    <DemoCard demo={demo} isMobile={isMobile} CardComp={CardComp} />
  </Wrapper>
);

const DemoFilmstrip = () => {
  const isMobile = useIsMobile();


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
          Acht Designwelten — von zeitlos bis modern. Findet den Stil,
          der zu euch passt.
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
          />
        ))}
      </TrackComp>
    </Section>
  );
};

export default DemoFilmstrip;
