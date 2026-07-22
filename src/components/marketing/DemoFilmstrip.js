// src/components/marketing/DemoFilmstrip.js
// PRODUKTIVE Theme-Sektion (#themes) — Gewinner des Varianten-Vergleichs (Jul 2026).
// Desktop: endlos laufender Filmstreifen mit Browser-Frames; Hover stoppt den
//   Streifen und scrollt die Demo-Seite im Frame durch.
// Mobile: natives Scroll-Snap-Carousel (kein Auto-Movement), Karten zeigen
//   4:3-Hero-Bilder (THEME_HEROES in demoData.js — Fallback: Crop aus Full-Page).
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ALL_DEMOS, THEME_SCREENSHOTS, HORIZONTAL_THEMES, mobileCardUrl, trackDemoClick } from './demoData';

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
  padding: clamp(5rem, 12vh, 8rem) 0;
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
  width: clamp(240px, 26vw, 340px);
  flex-shrink: 0;
  transition: transform 0.35s ease;

  &:hover {
    transform: translateY(-8px) scale(1.02);
  }

  &:hover ${FrameScreen} {
    background-position: ${p => (p.$static ? 'center' : p.$horizontal ? 'right center' : 'bottom center')};
  }
`;

const SwipeCard = styled(Card)`
  width: 78vw;
  max-width: 340px;
  scroll-snap-align: start;

  &:hover {
    transform: none;
  }
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

const Footer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #999;
`;

const DemoFilmstrip = () => {
  const isMobile = useIsMobile();
  const demos = isMobile ? ALL_DEMOS : [...ALL_DEMOS, ...ALL_DEMOS];
  const TrackComp = isMobile ? SwipeTrack : Track;
  const CardComp = isMobile ? SwipeCard : Card;

  return (
    <Section id="themes" aria-label="Theme-Demos">
      <Header>
        <Eyebrow>8 Designs · Live klickbar</Eyebrow>
        <Title>
          Echte Hochzeitswebsites.<br /><em>Keine Mockups.</em>
        </Title>
        <Sub>
          {isMobile
            ? 'Jede Karte ist eine vollständige Demo mit RSVP, Gästebereich und Foto-Upload. Wischt euch durch und tippt euch rein.'
            : 'Jede Karte ist eine vollständige Demo mit RSVP, Gästebereich und Foto-Upload. Anhalten mit dem Mauszeiger, klicken zum Erkunden.'}
        </Sub>
      </Header>
      <TrackComp>
        {demos.map((demo, i) => (
          <CardComp
            key={`${demo.id}-${i}`}
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            $static={isMobile}
            $horizontal={HORIZONTAL_THEMES.includes(demo.id)}
            onClick={() => trackDemoClick(demo.id, demo.url, isMobile ? 'filmstrip_mobile' : 'filmstrip')}
            aria-label={`${demo.name} Live-Demo ansehen`}
          >
            <Frame>
              <FrameBar>
                <span /><span /><span />
                <FrameUrl>siwedding.de/{demo.id}</FrameUrl>
              </FrameBar>
              <FrameScreen
                $src={isMobile ? mobileCardUrl(demo.id) : THEME_SCREENSHOTS[demo.id]}
                $static={isMobile}
                $horizontal={HORIZONTAL_THEMES.includes(demo.id)}
              >
                {!(isMobile ? mobileCardUrl(demo.id) : THEME_SCREENSHOTS[demo.id]) && demo.name}
              </FrameScreen>
            </Frame>
            <CardMeta>
              <CardName>{demo.name}</CardName>
              <CardTag>Demo →</CardTag>
            </CardMeta>
          </CardComp>
        ))}
      </TrackComp>
      <Footer>
        {isMobile
          ? 'Wischen zum Entdecken · Tippen = Live-Demo'
          : 'Hover = Seite scrollt durch · Klick = Live-Demo'}
      </Footer>
    </Section>
  );
};

export default DemoFilmstrip;
