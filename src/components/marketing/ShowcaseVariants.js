// src/components/marketing/ShowcaseVariants.js
// ZWEI ALTERNATIVE DARSTELLUNGEN der Theme-Demos — zum Vergleich auf dem Branch.
// Variante B: "Filmstreifen" — endlos laufender Marquee mit Browser-Frames
// Variante C: "Scroll-Story" — sticky Preview links, Themes wechseln beim Scrollen
//
// Beide nutzen dieselben Daten + dasselbe demo_click-Tracking wie die Hauptsektion.
// VOR PRODUCTION: Gewinner behalten, Verlierer + VariantBadge entfernen.
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { ALL_DEMOS, THEME_SCREENSHOTS, thumbUrl } from './ThemeShowcase';

const TAGLINES = {
  classic: 'Zeitlos in Schwarz-Weiß',
  botanical: 'Grün, organisch, glasklar',
  contemporary: 'Verspielt & farbstark',
  editorial: 'Magazin-Look mit Statement',
  luxe: 'Gold, Ruhe, Eleganz',
  modern: 'Minimalistisch mit Parallax',
  neon: 'Mutig, digital, laut',
  video: 'Cinematisch mit Bewegtbild',
};

// Mobile-Detection: auf Touch/Schmal wird der Marquee zum Scroll-Snap-Carousel
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

const track = (label, url, source) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'demo_click', {
      event_category: 'engagement',
      event_label: label,
      demo_url: url,
      source,
    });
  }
};

// ============================================
// DEV-BADGE (nur für den Branch-Vergleich)
// ============================================
export const VariantBadge = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem clamp(1.5rem, 5vw, 4rem);
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #C41E3A;
`;

// ============================================
// SHARED: Browser-Frame
// ============================================
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
  aspect-ratio: ${p => p.$aspect || '4/3'};
  background-image: url(${p => p.$src});
  background-size: 100% auto;
  background-position: top center;
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

// ============================================
// VARIANTE B — FILMSTREIFEN (Marquee)
// ============================================
const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const BSection = styled.section`
  padding: clamp(5rem, 12vh, 8rem) 0;
  background: #FDFCFA;
  overflow: hidden;
`;

const BHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
  text-align: center;
`;

const BEyebrow = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 1rem;
`;

const BTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  color: #1A1A1A;
  line-height: 1.15;

  em {
    font-style: italic;
  }
`;

const BSub = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 300;
  color: #555;
  margin-top: 1rem;
`;

const BTrack = styled.div`
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

// Mobile: natives Swipe-Carousel mit Scroll-Snap statt Auto-Animation.
// Die naechste Karte lugt am Rand hervor — das ist die Swipe-Affordance.
const BSwipeTrack = styled.div`
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


const BCard = styled.a`
  display: block;
  text-decoration: none;
  width: clamp(240px, 26vw, 340px);
  flex-shrink: 0;
  transition: transform 0.35s ease;

  &:hover {
    transform: translateY(-8px) scale(1.02);
  }

  &:hover ${FrameScreen} {
    background-position: bottom center;
  }
`;
const BSwipeCard = styled(BCard)`
  width: 78vw;
  max-width: 340px;
  scroll-snap-align: start;

  &:hover {
    transform: none;
  }
`;


const BCardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.7rem 0.2rem 0;
`;

const BCardName = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  color: #1A1A1A;
`;

const BCardTag = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
`;

const BFooter = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #999;
`;

export const ShowcaseVariantMarquee = () => {
  const isMobile = useIsMobile();
  const doubled = isMobile ? ALL_DEMOS : [...ALL_DEMOS, ...ALL_DEMOS];
  const Track = isMobile ? BSwipeTrack : BTrack;
  const Card = isMobile ? BSwipeCard : BCard;
  return (
    <>
      <VariantBadge>Variante B — Filmstreifen</VariantBadge>
      <BSection aria-label="Theme-Demos als laufender Filmstreifen">
        <BHeader>
          <BEyebrow>8 Designs · Live klickbar</BEyebrow>
          <BTitle>
            Echte Hochzeitswebsites.<br /><em>Keine Mockups.</em>
          </BTitle>
          <BSub>
            Jede Karte ist eine vollständige Demo mit RSVP, Gästebereich und Foto-Upload. Anhalten mit dem Mauszeiger, klicken zum Erkunden.
          </BSub>
        </BHeader>
        <Track>
          {doubled.map((demo, i) => (
            <Card
              key={`${demo.id}-${i}`}
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(demo.id, demo.url, 'variant_b_marquee')}
              aria-label={`${demo.name} Live-Demo ansehen`}
            >
              <Frame>
                <FrameBar>
                  <span /><span /><span />
                  <FrameUrl>siwedding.de/{demo.id}</FrameUrl>
                </FrameBar>
                <FrameScreen $src={THEME_SCREENSHOTS[demo.id]} $aspect="4/3">
                  {!THEME_SCREENSHOTS[demo.id] && demo.name}
                </FrameScreen>
              </Frame>
              <BCardMeta>
                <BCardName>{demo.name}</BCardName>
                <BCardTag>Demo →</BCardTag>
              </BCardMeta>
            </Card>
          ))}
        </Track>
        <BFooter>{isMobile ? 'Wischen zum Entdecken · Tippen = Live-Demo' : 'Hover = Seite scrollt durch · Klick = Live-Demo'}</BFooter>
      </BSection>
    </>
  );
};

// ============================================
// VARIANTE C — SCROLL-STORY (Sticky Preview)
// ============================================
const CSection = styled.section`
  background: #1A1A1A;
  padding: clamp(5rem, 12vh, 8rem) clamp(1.5rem, 5vw, 4rem);
`;

const CContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(3rem, 6vw, 6rem);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const CSticky = styled.div`
  position: sticky;
  top: clamp(80px, 12vh, 140px);

  @media (max-width: 900px) {
    position: relative;
    top: 0;
  }
`;

const CPreviewStack = styled.a`
  display: block;
  position: relative;
  aspect-ratio: 3/4;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: #2A2A2A;
`;

const CPreviewImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${p => p.$src});
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat;
  opacity: ${p => (p.$active ? 1 : 0)};
  transition: opacity 0.5s ease, background-position 18s cubic-bezier(0.25, 0.1, 0.25, 1);

  ${CPreviewStack}:hover & {
    background-position: bottom center;
  }
`;

const CPreviewFallback = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 2rem;
  color: rgba(253, 252, 250, 0.3);
  opacity: ${p => (p.$active ? 1 : 0)};
  transition: opacity 0.5s ease;
`;

const CPreviewCaption = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const CPreviewName = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  color: #FDFCFA;
`;

const CPreviewHint = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(253, 252, 250, 0.45);
`;

const CHeader = styled.div`
  margin-bottom: 2.5rem;
`;

const CEyebrow = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(253, 252, 250, 0.45);
  margin-bottom: 1rem;
`;

const CTitle = styled.h2`
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(2rem, 4.5vw, 3rem);
  color: #FDFCFA;
  line-height: 1.15;
`;

const CRow = styled.a`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: baseline;
  gap: 1.2rem;
  padding: clamp(1.4rem, 4vh, 2.2rem) 0;
  text-decoration: none;
  border-bottom: 1px solid rgba(253, 252, 250, 0.12);
  transition: opacity 0.3s ease;
  opacity: ${p => (p.$active ? 1 : 0.35)};

  &:hover {
    opacity: 1;
  }
`;

const CRowNum = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: rgba(253, 252, 250, 0.45);
`;

const CRowBody = styled.span`
  display: block;
`;

const CRowName = styled.span`
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: #FDFCFA;
  line-height: 1.1;
`;

const CRowTag = styled.span`
  display: block;
  margin-top: 0.35rem;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(253, 252, 250, 0.55);
`;

const CRowArrow = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(253, 252, 250, 0.45);
  white-space: nowrap;

  ${CRow}:hover & {
    color: #FDFCFA;
  }
`;

export const ShowcaseVariantScrollStory = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const rowRefs = useRef([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            if (!Number.isNaN(idx)) setActiveIdx(idx);
          }
        });
      },
      // Aktiv ist die Zeile in der vertikalen Bildschirmmitte
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    rowRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const active = ALL_DEMOS[activeIdx];

  return (
    <>
      <VariantBadge>Variante C — Scroll-Story</VariantBadge>
      <CSection aria-label="Theme-Demos als Scroll-Story">
        <CContainer>
          <CSticky>
            <CPreviewStack
              href={active.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(active.id, active.url, 'variant_c_scroll')}
              aria-label={`${active.name} Live-Demo ansehen`}
            >
              {ALL_DEMOS.map((demo, i) => (
                THEME_SCREENSHOTS[demo.id]
                  ? <CPreviewImage key={demo.id} $src={THEME_SCREENSHOTS[demo.id]} $active={i === activeIdx} />
                  : <CPreviewFallback key={demo.id} $active={i === activeIdx}>{demo.name}</CPreviewFallback>
              ))}
            </CPreviewStack>
            <CPreviewCaption>
              <CPreviewName>{active.name}</CPreviewName>
              <CPreviewHint>Klick = Live-Demo</CPreviewHint>
            </CPreviewCaption>
          </CSticky>

          <div>
            <CHeader>
              <CEyebrow>8 Designs zur Auswahl</CEyebrow>
              <CTitle>Scrollt euch durch — die Vorschau wandert mit.</CTitle>
            </CHeader>
            {ALL_DEMOS.map((demo, i) => (
              <CRow
                key={demo.id}
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                data-idx={i}
                ref={el => { rowRefs.current[i] = el; }}
                $active={i === activeIdx}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => track(demo.id, demo.url, 'variant_c_scroll')}
              >
                <CRowNum>{String(i + 1).padStart(2, '0')}</CRowNum>
                <CRowBody>
                  <CRowName>{demo.name}</CRowName>
                  <CRowTag>{TAGLINES[demo.id]}</CRowTag>
                </CRowBody>
                <CRowArrow>Demo →</CRowArrow>
              </CRow>
            ))}
          </div>
        </CContainer>
      </CSection>
    </>
  );
};

// thumbUrl wird hier nicht direkt gebraucht, bleibt aber importierbar für spätere Varianten
export { thumbUrl };
