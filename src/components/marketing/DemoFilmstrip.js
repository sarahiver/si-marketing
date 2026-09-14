// src/components/marketing/DemoFilmstrip.js
// PRODUKTIVE Theme-Sektion (#themes) — Gewinner des Varianten-Vergleichs (Jul 2026).
// Desktop: endlos laufender Filmstreifen mit Browser-Frames; Hover stoppt den
//   Streifen und scrollt die Demo-Seite im Frame durch.
// Mobile: natives Scroll-Snap-Carousel (kein Auto-Movement), Karten zeigen
//   4:3-Hero-Bilder (THEME_HEROES in demoData.js — Fallback: Crop aus Full-Page).
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
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

const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const Section = styled.section`
  padding: clamp(3.5rem, 8vh, 6rem) 0;
  background: #FDFCFA;
  overflow: hidden;
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
  text-align: center;
`;

const Eyebrow = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  color: #1A1A1A;
  line-height: 1.15;

  em {
    font-style: italic;
  }
`;

const Sub = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
  color: #555;
  margin-top: 1rem;
`;

const Frame = styled.div`
  background: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.06);
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
  position: relative;
  aspect-ratio: 4/3;
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

const Track = styled.div`
  display: flex;
  gap: clamp(1.2rem, 2.5vw, 2rem);
  width: max-content;
  animation: ${marquee} 55s linear infinite;
  padding: 1.5rem 0 2.5rem;

  &:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    overflow-x: auto;
    max-width: 100vw;
  }
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
  width: clamp(240px, 26vw, 340px);
  flex-shrink: 0;
`;

const SwipeCardGroup = styled(CardGroup)`
  width: 62vw;
  max-width: 260px;
  scroll-snap-align: start;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.7rem 0.2rem 0;
`;

const CardName = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  color: #1A1A1A;
`;

const CardTag = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
`;

const StyleWords = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #B0A89F;
  display: block;
  margin-top: 0.15rem;
`;

// Zweiter, leiserer CTA unter jeder Karte: der Weg von "gefällt mir"
// zur Anfrage, ohne dass die Demo selbst verlassen werden muss.
const StyleInquiry = styled.button`
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  background: none;
  border: none;
  border-top: 1px solid rgba(0,0,0,0.08);
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #1A1A1A;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover { color: #C41E3A; }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #999;
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

  const demos = isMobile ? ALL_DEMOS : [...ALL_DEMOS, ...ALL_DEMOS];
  const TrackComp = isMobile ? SwipeTrack : Track;
  const CardComp = isMobile ? SwipeCard : Card;

  return (
    <Section id="themes" aria-label="Theme-Demos">
      <Header>
        <Eyebrow>Acht Stilwelten · Echte Beispiele, live klickbar</Eyebrow>
        <Title>
          Findet euren Stil.<br /><em>Nicht euer Template.</em>
        </Title>
        <Sub>
          {isMobile
            ? 'Jede Karte ist eine vollständige Demo mit RSVP, Gästebereich und Foto-Upload. Wischt euch durch und tippt euch rein.'
            : 'Jede Karte ist eine vollständige Demo mit RSVP, Gästebereich und Foto-Upload. Anhalten mit dem Mauszeiger, klicken zum Erkunden.'}
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
      <Footer>
        {isMobile
          ? 'Wischen zum Entdecken · Tippen öffnet die Live-Demo'
          : 'Mauszeiger hält den Streifen an · Klick öffnet die Live-Demo'}
      </Footer>
    </Section>
  );
};

export default DemoFilmstrip;
