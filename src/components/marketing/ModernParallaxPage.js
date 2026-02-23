// src/components/marketing/ModernParallaxPage.js
// Komplette Marketing-Seite im Parallax-Stil:
// - Three.js Canvas mit schwebenden Demo-Screenshots
// - Scattered Headlines mit individuellem Parallax + weißem Background
// - Click → Modal von rechts (schwarzer Content-Panel)
// - Minimaler Content auf der Seite, alles in Modals

import React, { Suspense, useRef, useEffect, useState, useCallback, Component } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import styled from 'styled-components';

// ============================================
// ERROR BOUNDARY
// ============================================
class CanvasErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err) { console.warn('Modern Canvas error:', err); }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// ============================================
// CLOUDINARY IMAGES (Demo Screenshots)
// ============================================
const FLOAT_IMAGES = [
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771510436/siwedding/demo-parallax/hero/qtcokh2opdtikmaxe8ov.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771510335/siwedding/demo-parallax/gallery/yfmq6n2hijlwl0fg2zbx.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771510336/siwedding/demo-parallax/gallery/g2aep3i71jaoaai0dcbg.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771510330/siwedding/demo-parallax/gallery/zy3kvru0kw3f02nrxkeg.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771510331/siwedding/demo-parallax/gallery/vli5nx0ndgn11ka70lqd.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771510337/siwedding/demo-parallax/gallery/ivmucfauc3opjui51d8i.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771510339/siwedding/demo-parallax/gallery/np1oj8v4j2zwafjtqj2q.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771510327/siwedding/demo-parallax/gallery/tulcytyfqy60vrpxqihj.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771510340/siwedding/demo-parallax/gallery/cr0y8rl7dlappqmk44kq.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771512249/siwedding/demo-parallax/locations/yimhskdjd9w3eimktpv0.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771510327/siwedding/demo-parallax/gallery/tulcytyfqy60vrpxqihj.jpg',
  'https://res.cloudinary.com/si-weddings/image/upload/q_auto,f_auto,w_800/v1771326063/siwedding/demo-luxe/lovestory/xx5ldbmgslwugjnj7wa7.jpg',
];

// ============================================
// THREE.JS SCENE — Scroll-only parallax, no auto-float
// Each image has its own scroll speed for layered depth
// ============================================
function ParallaxImg({ url, basePos, scaleArr, speed, scrollY, pageHeight, zoom }) {
  const ref = useRef();
  const baseScale = useRef(scaleArr);

  useFrame(() => {
    if (!ref.current) return;
    const scrollFactor = (scrollY.current / pageHeight) || 0;
    const drift = scrollFactor * speed;
    ref.current.position.y = basePos[1] + drift;

    // Zoom: scale pulses based on scroll position
    if (zoom) {
      // zoom > 0 = zoom in, zoom < 0 = zoom out
      const zoomAmount = 1 + scrollFactor * zoom * 0.4;
      ref.current.scale.x = baseScale.current[0] * zoomAmount;
      ref.current.scale.y = baseScale.current[1] * zoomAmount;
    }
  });

  return (
    <Image
      ref={ref}
      url={url}
      position={basePos}
      scale={scaleArr}
      transparent
      opacity={1}
    />
  );
}

// Image config: bigger, more overlap, constrained to ~80vw (-0.4 to +0.4 x)
// zoom: positive = zoom in on scroll, negative = zoom out
const IMG_CONFIG = [
  // #1 Hero links — Hochformat schmal, groß
  { x: -0.3, y: 0.05, z: -2, w: 0.24, h: 0.65, speed: 0.8, img: 0 },
  // #2 Hero rechts — Querformat breit, ZOOM IN
  { x: 0.25, y: -0.08, z: 1, w: 0.48, h: 0.28, speed: 1.4, img: 1, zoom: 0.6 },
  // #3 Obere Mitte — Hochformat
  { x: 0.0, y: -0.45, z: 0, w: 0.22, h: 0.58, speed: 1.1, img: 2 },
  // #4 Mid rechts — Querformat breit
  { x: 0.25, y: -0.65, z: -1, w: 0.46, h: 0.3, speed: 0.6, img: 3 },
  // #5 Mid links — Quadratisch groß, ZOOM OUT
  { x: -0.25, y: -0.9, z: 2, w: 0.34, h: 0.34, speed: 1.5, img: 4, zoom: -0.5 },
  // #6 Untere Mitte — Hochformat
  { x: 0.12, y: -1.1, z: -2, w: 0.22, h: 0.6, speed: 0.9, img: 5 },
  // #7 Links — Querformat Panorama, groß
  { x: -0.2, y: -1.4, z: 1, w: 0.52, h: 0.26, speed: 1.3, img: 6 },
  // #8 Rechts — Hochformat schmal, ZOOM IN
  { x: 0.3, y: -1.6, z: 0, w: 0.2, h: 0.55, speed: 0.7, img: 7, zoom: 0.5 },
  // #9 Links — Querformat breit
  { x: -0.15, y: -1.85, z: -1, w: 0.44, h: 0.28, speed: 1.45, img: 8 },
  // #10 Rechts — Hochformat groß, ZOOM OUT
  { x: 0.22, y: -2.05, z: 2, w: 0.26, h: 0.62, speed: 0.85, img: 9, zoom: -0.4 },
  // #11 Mitte — Querformat extra breit
  { x: -0.02, y: -2.35, z: -2, w: 0.56, h: 0.24, speed: 1.2, img: 10 },
  // #12 Rechts — Hochformat schmal
  { x: 0.18, y: -2.55, z: 1, w: 0.18, h: 0.5, speed: 1.0, img: 11 },
];

function ParallaxScene({ scrollY }) {
  const { viewport } = useThree();
  const w = viewport.width;
  const h = viewport.height;
  const isMobile = w < 5;
  // Mobile: images much bigger to fill the narrow viewport
  const s = isMobile ? 1.5 : 1;
  // Mobile: compress x-range tightly so images overlap and stay visible
  const xMul = isMobile ? 0.55 : 1;
  const pageHeight = typeof document !== 'undefined'
    ? (document.documentElement.scrollHeight - window.innerHeight) || 1
    : 1;

  return (
    <group>
      {IMG_CONFIG.map((cfg, i) => (
        <ParallaxImg
          key={i}
          url={FLOAT_IMAGES[cfg.img]}
          basePos={[w * cfg.x * xMul, h * cfg.y, cfg.z]}
          scaleArr={[w * cfg.w * s, h * cfg.h * s, 1]}
          speed={h * cfg.speed * (isMobile ? 0.6 : 1)}
          scrollY={scrollY}
          pageHeight={pageHeight}
          zoom={cfg.zoom || 0}
        />
      ))}
    </group>
  );
}

// ============================================
// SCATTERED TITLES DATA
// ============================================
const TITLES = [
  { id: 'features', text: 'Features', left: '3%', mLeft: '4%', top: 105, mTop: 75, speed: 0.7, mSpeed: 0.3, size: 'clamp(2.8rem, 7vw, 6rem)', mSize: 'clamp(2.5rem, 12vw, 3.5rem)' },
  { id: 'designs', text: 'Designs', left: '55%', mLeft: '25%', top: 118, mTop: 88, speed: 1.35, mSpeed: 0.35, size: 'clamp(3.2rem, 8vw, 7rem)', mSize: 'clamp(2.8rem, 13vw, 4rem)' },
  { id: 'howItWorks', text: 'So funktioniert\'s', left: '22%', mLeft: '4%', top: 140, mTop: 102, speed: 0.75, mSpeed: 0.3, size: 'clamp(1.8rem, 4.5vw, 3.5rem)', mSize: 'clamp(1.5rem, 7vw, 2.2rem)' },
  { id: 'components', text: 'Komponenten', left: '58%', mLeft: '8%', top: 156, mTop: 114, speed: 1.4, mSpeed: 0.4, size: 'clamp(2rem, 5vw, 4.5rem)', mSize: 'clamp(1.7rem, 8vw, 2.5rem)' },
  { id: 'pricing', text: 'Preise', left: '8%', mLeft: '6%', top: 178, mTop: 128, speed: 0.65, mSpeed: 0.3, size: 'clamp(3.5rem, 9vw, 8rem)', mSize: 'clamp(2.8rem, 13vw, 4rem)' },
  { id: 'about', text: 'Sarah & Iver', left: '42%', mLeft: '20%', top: 196, mTop: 142, speed: 1.3, mSpeed: 0.35, size: 'clamp(2.2rem, 5.5vw, 4.5rem)', mSize: 'clamp(1.8rem, 9vw, 2.8rem)' },
  { id: 'whyUs', text: 'Warum wir', left: '18%', mLeft: '5%', top: 216, mTop: 155, speed: 0.72, mSpeed: 0.3, size: 'clamp(2.2rem, 7vw, 6rem)', mSize: 'clamp(2rem, 10vw, 3rem)' },
  { id: 'cooperation', text: 'Kooperationen', left: '52%', mLeft: '8%', top: 234, mTop: 167, speed: 1.25, mSpeed: 0.35, size: 'clamp(2rem, 5vw, 4rem)', mSize: 'clamp(1.5rem, 7vw, 2.2rem)' },
  { id: 'contact', text: 'Kontakt', left: '6%', mLeft: '4%', top: 255, mTop: 180, speed: 0.68, mSpeed: 0.3, size: 'clamp(3rem, 7.5vw, 6.5rem)', mSize: 'clamp(2.5rem, 12vw, 3.5rem)' },
];

// ============================================
// MODAL CONTENT — with parallax effects
// ============================================

// Decorative background glyph that drifts slowly
function DecoGlyph({ char, scrollTop, top, left, size, speed }) {
  return (
    <span style={{
      position: 'absolute', top, left,
      fontFamily: "'DM Sans', sans-serif", fontSize: size || 'clamp(8rem, 20vw, 16rem)',
      fontWeight: 800, color: 'rgba(255,255,255,0.03)', lineHeight: 1,
      pointerEvents: 'none', zIndex: 0, whiteSpace: 'nowrap',
      transform: `translateY(${scrollTop * (speed || -0.15)}px)`,
    }}>{char}</span>
  );
}

// Staggered reveal wrapper — each child fades in with delay
function Stagger({ children, delay = 0, scrollTop, speed = 0.3, driftX = 0 }) {
  return (
    <div style={{
      opacity: 1,
      animation: `modalStaggerIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both`,
      transform: `translateY(${scrollTop * (speed - 0.5) * 1.2}px) translateX(${scrollTop * driftX}px)`,
    }}>
      {children}
    </div>
  );
}

// Expanding divider line
function ExpandDivider({ scrollTop, delay = 0 }) {
  return (
    <div style={{ overflow: 'hidden', padding: '0', height: '1px' }}>
      <div style={{
        height: '1px', background: 'rgba(255,255,255,0.08)',
        animation: `expandLine 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both`,
      }} />
    </div>
  );
}

// Modal title that scales down on scroll
function ScalingTitle({ children, scrollTop }) {
  const scale = Math.max(0.75, 1 - scrollTop * 0.0008);
  return (
    <ModalTitle style={{
      transform: `scale(${scale})`,
      transformOrigin: 'left top',
      transition: 'transform 0.1s ease-out',
    }}>{children}</ModalTitle>
  );
}

function ModalContent({ id, onClose, onOpenContact }) {
  const [scrollTop, setScrollTop] = useState(0);
  const px = (speed) => scrollTop * (speed - 0.5) * 1.2;

  switch (id) {
    case 'features': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner style={{ position: 'relative', overflow: 'hidden' }}>
          <DecoGlyph char="✦" scrollTop={scrollTop} top="5rem" left="75%" speed={-0.12} />
          <DecoGlyph char="S&I" scrollTop={scrollTop} top="60%" left="-5%" size="clamp(6rem, 15vw, 12rem)" speed={-0.08} />
          <Stagger delay={0.1} scrollTop={scrollTop} speed={0.15}>
            <ModalHeader>
              <ModalLabel>WARUM S&I.</ModalLabel>
              <ScalingTitle scrollTop={scrollTop}>Was uns besonders macht</ScalingTitle>
            </ModalHeader>
          </Stagger>
          {[
            { n: '01', t: 'Kein Paar ist wie das andere', d: 'Jede Website ein Unikat — handgemacht, nicht von der Stange. Bereits Dutzende Paare haben ihre Liebesgeschichte mit uns digital verewigt.' },
            { n: '02', t: 'eurenamen.de', d: 'Eure Liebe hat eine eigene Adresse. Keine Subdomain, kein Baukasten-Link. Professionell eingerichtet, sofort startklar.' },
            { n: '03', t: 'Designwelten', d: 'Ob elegant, modern oder verspielt: Wir passen jedes Design individuell an eure Farben, Fotos und Geschichte an.' },
            { n: '04', t: 'Direkter Kontakt', d: 'Ihr sprecht mit echten Menschen — Sarah & Iver. Keine Hotline, kein Bot, kein Ticketsystem.' },
            { n: '05', t: 'So wenig Aufwand wie möglich', d: 'Wir übernehmen den Rest. Ihr schickt uns Texte & Fotos.' },
            { n: '06', t: 'In 7 Tagen live', d: 'Die meisten Websites gehen innerhalb einer Woche online — inklusive Korrekturschleife.' },
          ].map((item, i) => (
            <Stagger key={i} delay={0.2 + i * 0.08} scrollTop={scrollTop} speed={0.25 + i * 0.06} driftX={0}>
              <ExpandDivider scrollTop={scrollTop} delay={0.2 + i * 0.08} />
              <ModalItem style={{ borderBottom: 'none' }}>
                <ModalItemNum style={{ transform: `translateX(${scrollTop * -0.03}px)` }}>{item.n}</ModalItemNum>
                <ModalItemTitle style={{ transform: `translateX(${scrollTop * 0.015}px)` }}>{item.t}</ModalItemTitle>
                <ModalItemDesc>{item.d}</ModalItemDesc>
              </ModalItem>
            </Stagger>
          ))}
        </ModalInner>
      </ModalScroll>
    );

    case 'designs': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner style={{ position: 'relative', overflow: 'hidden' }}>
          <DecoGlyph char="8" scrollTop={scrollTop} top="3rem" left="70%" size="clamp(10rem, 25vw, 20rem)" speed={-0.1} />
          <Stagger delay={0.1} scrollTop={scrollTop} speed={0.15}>
            <ModalHeader>
              <ModalLabel>THEMES</ModalLabel>
              <ScalingTitle scrollTop={scrollTop}>Eure Designwelt</ScalingTitle>
            </ModalHeader>
          </Stagger>
          <Stagger delay={0.2} scrollTop={scrollTop} speed={0.25}>
            <ModalBody>
              Jedes Theme erzählt eure Geschichte anders. Von minimalistisch-elegant über cinematic-luxuriös bis hin zu modern-interaktiv mit 3D-Effekten.
            </ModalBody>
          </Stagger>
          {['Classic', 'Botanical', 'Contemporary', 'Editorial', 'Luxe', 'Modern', 'Neon', 'Video'].map((name, i) => {
            const slug = name === 'Modern' ? 'parallax' : name.toLowerCase();
            return (
            <Stagger key={i} delay={0.25 + i * 0.06} scrollTop={scrollTop} speed={0.3 + i * 0.04} driftX={i % 2 === 0 ? 0.01 : -0.01}>
              <ExpandDivider scrollTop={scrollTop} delay={0.25 + i * 0.06} />
              <ModalItem style={{ borderBottom: 'none' }}>
                <ModalItemTitle style={{ transform: `translateX(${scrollTop * 0.012}px)` }}>{name}</ModalItemTitle>
                <ModalItemDesc>
                  <a href={`https://siwedding.de/demo-${slug}`} target="_blank" rel="noopener noreferrer"
                    style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '3px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Demo ansehen →
                  </a>
                </ModalItemDesc>
              </ModalItem>
            </Stagger>
            );
          })}
        </ModalInner>
      </ModalScroll>
    );

    case 'howItWorks': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner style={{ position: 'relative', overflow: 'hidden' }}>
          <DecoGlyph char="→" scrollTop={scrollTop} top="4rem" left="72%" size="clamp(8rem, 18vw, 14rem)" speed={-0.14} />
          <Stagger delay={0.1} scrollTop={scrollTop} speed={0.15}>
            <ModalHeader>
              <ModalLabel>EUER WEG</ModalLabel>
              <ScalingTitle scrollTop={scrollTop}>4 einfache Schritte</ScalingTitle>
            </ModalHeader>
          </Stagger>
          {[
            { n: '01', t: 'Ihr entdeckt uns', d: 'Schreibt uns — unverbindlich, ohne Haken. Wir melden uns persönlich, meistens noch am selben Tag.' },
            { n: '02', t: 'Wir lernen euch kennen', d: 'In einem persönlichen Gespräch erfahren wir, wer ihr seid. Was euch wichtig ist. Wie eure Hochzeit sich anfühlen soll.' },
            { n: '03', t: 'Ihr erzählt eure Geschichte', d: 'Über ein einfaches Dashboard tragt ihr Texte ein, ladet Fotos hoch. Kein technisches Wissen nötig.' },
            { n: '04', t: 'Eure Website geht live', d: 'Wir bauen, optimieren und schicken euch die fertige Seite zur Freigabe. In der Regel in 7 Tagen.' },
          ].map((step, i) => (
            <Stagger key={i} delay={0.2 + i * 0.1} scrollTop={scrollTop} speed={0.25 + i * 0.08} driftX={0}>
              <ExpandDivider scrollTop={scrollTop} delay={0.2 + i * 0.1} />
              <ModalItem style={{ borderBottom: 'none' }}>
                <ModalItemNum style={{ transform: `translateX(${scrollTop * -0.04}px)`, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'rgba(255,255,255,0.06)' }}>{step.n}</ModalItemNum>
                <ModalItemTitle style={{ transform: `translateX(${scrollTop * 0.018}px)` }}>{step.t}</ModalItemTitle>
                <ModalItemDesc>{step.d}</ModalItemDesc>
              </ModalItem>
            </Stagger>
          ))}
        </ModalInner>
      </ModalScroll>
    );

    case 'components': {
      const COMPS = [
        { emoji: '🏠', name: 'Hero', desc: 'Der erste Moment — der Bildschirm, der alles sagt.' },
        { emoji: '💕', name: 'Love Story', desc: 'Wie aus Fremden ein Wir wurde.' },
        { emoji: '💌', name: 'RSVP', desc: 'Zu- und Absagen digital sammeln.' },
        { emoji: '🔔', name: 'Countdown', desc: 'Die Vorfreude bis zum großen Tag.' },
        { emoji: '📅', name: 'Ablauf', desc: 'Wann, wo, was — auf einen Blick.' },
        { emoji: '⏰', name: 'Timeline', desc: 'Euer Tag, Stunde für Stunde.' },
        { emoji: '📍', name: 'Location', desc: 'Mit Karte, damit niemand sucht.' },
        { emoji: '🚗', name: 'Anfahrt', desc: 'Navigation, Parken, ÖPNV.' },
        { emoji: '🏨', name: 'Hotels', desc: 'Die besten Betten in der Nähe.' },
        { emoji: '👗', name: 'Dresscode', desc: 'Damit alle wissen, wie schick.' },
        { emoji: '🎁', name: 'Wunschliste', desc: 'Wünsche, die von Herzen kommen.' },
        { emoji: '📸', name: 'Galerie', desc: 'Bilder, die Gänsehaut machen.' },
        { emoji: '🤳', name: 'Gäste-Fotos', desc: 'Eure Gäste als Fotografen.' },
        { emoji: '❓', name: 'FAQ', desc: 'Damit keiner zweimal fragen muss.' },
        { emoji: '🎵', name: 'Musikwünsche', desc: 'Die Playlist für die Party.' },
        { emoji: '👥', name: 'Trauzeugen', desc: 'Die wichtigsten Menschen vorstellen.' },
        { emoji: '💍', name: 'Footer', desc: 'Der liebevolle Abschluss.' },
        { emoji: '📄', name: 'Impressum', desc: 'Muss sein — sieht trotzdem gut aus.' },
      ];
      // Each card has its own scroll speed based on position
      const speeds = [0.18, 0.28, 0.14, 0.32, 0.2, 0.26, 0.16, 0.3, 0.22, 0.34, 0.12, 0.28, 0.24, 0.16, 0.3, 0.2, 0.26, 0.14];
      return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner style={{ position: 'relative', overflow: 'hidden' }}>
          <DecoGlyph char="18" scrollTop={scrollTop} top="2rem" left="65%" size="clamp(8rem, 20vw, 16rem)" speed={-0.1} />
          <Stagger delay={0.1} scrollTop={scrollTop} speed={0.15}>
            <ModalHeader>
              <ModalLabel>EURE WEBSITE</ModalLabel>
              <ScalingTitle scrollTop={scrollTop}>18 Komponenten</ScalingTitle>
              <ModalBody style={{ marginTop: '0.5rem' }}>Wählt die Bausteine, die zu eurer Hochzeit passen.</ModalBody>
            </ModalHeader>
          </Stagger>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
            {COMPS.map((comp, i) => {
              const drift = scrollTop * speeds[i];
              const isLeft = i % 2 === 0;
              return (
              <div key={i} style={{
                background: 'rgba(0,0,0,0.92)', padding: '2rem 1.5rem',
                animation: `modalStaggerIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.05}s both`,
                transform: `translateY(${drift}px) translateX(${scrollTop * (isLeft ? -0.008 : 0.008)}px)`,
                transition: 'transform 0.12s ease-out',
              }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem' }}>{comp.emoji}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 800, color: '#fff', display: 'block', marginBottom: '0.4rem' }}>{comp.name}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, display: 'block' }}>{comp.desc}</span>
              </div>
              );
            })}
          </div>
        </ModalInner>
      </ModalScroll>
      );
    }

    case 'pricing': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner style={{ position: 'relative', overflow: 'hidden' }}>
          <DecoGlyph char="€" scrollTop={scrollTop} top="6rem" left="68%" size="clamp(10rem, 25vw, 18rem)" speed={-0.12} />
          <Stagger delay={0.1} scrollTop={scrollTop} speed={0.15}>
            <ModalHeader>
              <ModalLabel>PAKETE</ModalLabel>
              <ScalingTitle scrollTop={scrollTop}>Preise</ScalingTitle>
            </ModalHeader>
          </Stagger>
          {[
            { name: 'Starter', price: '1.290', duration: '6 Monate', features: ['Eigene Domain', '4 Basis-Komponenten', '6 Monate Hosting', '1 Revision'] },
            { name: 'Standard', price: '1.490', duration: '8 Monate', popular: true, features: ['Eigene Domain', '4 Basis + 3 Extra', '8 Monate Hosting', '2 Revisionen'] },
            { name: 'Premium', price: '1.990', duration: '12 Monate', features: ['Eigene Domain', '4 Basis + 6 Extra', 'Save the Date + Archiv', 'Unbegrenzte Revisionen'] },
          ].map((pkg, i) => (
            <Stagger key={i} delay={0.2 + i * 0.12} scrollTop={scrollTop} speed={0.25 + i * 0.08} driftX={0}>
              <ExpandDivider scrollTop={scrollTop} delay={0.2 + i * 0.12} />
              <div style={{ padding: '2rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <ModalItemTitle style={{ marginBottom: 0, transform: `translateX(${scrollTop * 0.015}px)` }}>
                    {pkg.name}
                    {pkg.popular && <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginLeft: '0.75rem', textTransform: 'uppercase' }}>BELIEBT</span>}
                  </ModalItemTitle>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff', transform: `translateX(${scrollTop * -0.02}px)` }}>
                    <span style={{ fontSize: '0.5em', opacity: 0.4 }}>€</span>{pkg.price}
                  </span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', marginBottom: '1rem', textTransform: 'uppercase' }}>{pkg.duration}</p>
                {pkg.features.map((f, fi) => (
                  <p key={fi} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', padding: '0.3rem 0' }}>{f}</p>
                ))}
              </div>
            </Stagger>
          ))}
          <Stagger delay={0.6} scrollTop={scrollTop} speed={0.5}>
            <div style={{ marginTop: '1rem' }}>
              <button onClick={() => { onClose(); setTimeout(() => onOpenContact(), 600); }}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', background: '#fff', padding: '1rem 2rem', border: 'none', cursor: 'pointer', display: 'inline-block' }}>
                Jetzt anfragen →
              </button>
            </div>
          </Stagger>
        </ModalInner>
      </ModalScroll>
    );

    case 'about': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner style={{ position: 'relative', overflow: 'hidden' }}>
          <DecoGlyph char="&" scrollTop={scrollTop} top="8rem" left="65%" size="clamp(12rem, 28vw, 22rem)" speed={-0.1} />
          <Stagger delay={0.1} scrollTop={scrollTop} speed={0.15}>
            <ModalHeader>
              <ModalLabel>ÜBER UNS</ModalLabel>
              <ScalingTitle scrollTop={scrollTop}>Sarah & Iver</ScalingTitle>
            </ModalHeader>
          </Stagger>
          <Stagger delay={0.2} scrollTop={scrollTop} speed={0.25}>
            <ModalBody>
              Wir sind kein Startup, keine Agentur. Wir sind ein Paar, das Hochzeitswebsites baut — weil wir wissen, wie es sich anfühlt.
            </ModalBody>
          </Stagger>
          {[
            { emoji: '🎨', name: 'Sarah', role: 'Herz, Design & Gefühl', desc: 'Sarah sorgt dafür, dass jede Website nicht nur schön aussieht, sondern sich richtig anfühlt. Farben, Typografie, Bildsprache — alles wird mit Liebe zum Detail gestaltet.' },
            { emoji: '🧑‍💻', name: 'Iver', role: 'Technik & Begleitung', desc: 'Iver kümmert sich um Technik, Umsetzung und Betreuung. Vom ersten Gespräch bis zur fertigen Website — ein echter Ansprechpartner, keine Massenabfertigung.' },
          ].map((person, i) => (
            <Stagger key={i} delay={0.3 + i * 0.15} scrollTop={scrollTop} speed={0.3 + i * 0.1} driftX={i === 0 ? -0.008 : 0.008}>
              <ExpandDivider scrollTop={scrollTop} delay={0.3 + i * 0.15} />
              <ModalItem style={{ borderBottom: 'none' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem' }}>{person.emoji}</span>
                <ModalItemTitle style={{ transform: `translateX(${scrollTop * 0.012}px)` }}>{person.name}</ModalItemTitle>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>{person.role}</p>
                <ModalItemDesc>{person.desc}</ModalItemDesc>
              </ModalItem>
            </Stagger>
          ))}
        </ModalInner>
      </ModalScroll>
    );

    case 'whyUs': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner style={{ position: 'relative', overflow: 'hidden' }}>
          <DecoGlyph char="≠" scrollTop={scrollTop} top="5rem" left="70%" size="clamp(10rem, 22vw, 18rem)" speed={-0.13} />
          <Stagger delay={0.1} scrollTop={scrollTop} speed={0.15}>
            <ModalHeader>
              <ModalLabel>WARUM S&I.</ModalLabel>
              <ScalingTitle scrollTop={scrollTop}>Weil eure Hochzeit zu wichtig ist.</ScalingTitle>
            </ModalHeader>
          </Stagger>
          {[
            { icon: '💼', label: 'Statt Agentur', problem: 'Oft teuer, langsam und anonym.', solution: 'Boutique statt Massenbetrieb.' },
            { icon: '🤖', label: 'Statt KI-Tools', problem: 'Schnell — aber ohne Herz.', solution: 'Menschen, Geschmack & Feingefühl.' },
            { icon: '🛠️', label: 'Statt selber machen', problem: 'Günstig — aber auf Kosten eurer Zeit.', solution: 'Ihr gebt Inhalte — wir den Rest.' },
          ].map((card, i) => (
            <Stagger key={i} delay={0.2 + i * 0.12} scrollTop={scrollTop} speed={0.25 + i * 0.1} driftX={i % 2 === 0 ? 0.01 : -0.01}>
              <ExpandDivider scrollTop={scrollTop} delay={0.2 + i * 0.12} />
              <ModalItem style={{ borderBottom: 'none' }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{card.icon}</span>
                <ModalItemTitle style={{ transform: `translateX(${scrollTop * 0.015}px)` }}>{card.label}</ModalItemTitle>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', marginBottom: '0.5rem' }}>{card.problem}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{card.solution}</p>
              </ModalItem>
            </Stagger>
          ))}
        </ModalInner>
      </ModalScroll>
    );

    case 'cooperation': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner style={{ position: 'relative', overflow: 'hidden' }}>
          <DecoGlyph char="∞" scrollTop={scrollTop} top="5rem" left="68%" size="clamp(8rem, 18vw, 14rem)" speed={-0.11} />
          <Stagger delay={0.1} scrollTop={scrollTop} speed={0.15}>
            <ModalHeader>
              <ModalLabel>ZUSAMMENARBEIT</ModalLabel>
              <ScalingTitle scrollTop={scrollTop}>Kooperationen</ScalingTitle>
            </ModalHeader>
          </Stagger>
          <Stagger delay={0.2} scrollTop={scrollTop} speed={0.25}>
            <ModalBody>
              Ob Hochzeitsplaner, Fotografen, Locations oder andere Dienstleister — wir freuen uns über Kooperationsanfragen.
            </ModalBody>
          </Stagger>
          {[
            { icon: '📸', t: 'Fotografen', d: 'Empfehlt uns euren Paaren — wir bauen Websites, die eure Bilder perfekt in Szene setzen.' },
            { icon: '💐', t: 'Wedding Planner', d: 'Bietet euren Kunden eine Premium-Website als Teil eures Pakets an.' },
            { icon: '🏰', t: 'Locations', d: 'Zeigt euren Paaren, wie ihre Hochzeitswebsite aussehen könnte — mit eurer Location als Highlight.' },
          ].map((item, i) => (
            <Stagger key={i} delay={0.3 + i * 0.1} scrollTop={scrollTop} speed={0.3 + i * 0.1} driftX={0}>
              <ExpandDivider scrollTop={scrollTop} delay={0.3 + i * 0.1} />
              <ModalItem style={{ borderBottom: 'none' }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{item.icon}</span>
                <ModalItemTitle style={{ transform: `translateX(${scrollTop * 0.012}px)` }}>{item.t}</ModalItemTitle>
                <ModalItemDesc>{item.d}</ModalItemDesc>
              </ModalItem>
            </Stagger>
          ))}
          <Stagger delay={0.6} scrollTop={scrollTop} speed={0.5}>
            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={() => { onClose(); setTimeout(() => onOpenContact(), 600); }}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 800,
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000',
                  background: '#fff', padding: '1rem 2rem', border: 'none', cursor: 'pointer',
                }}>
                Jetzt anfragen →
              </button>
            </div>
          </Stagger>
        </ModalInner>
      </ModalScroll>
    );

    case 'contact': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner style={{ position: 'relative', overflow: 'hidden' }}>
          <DecoGlyph char="✉" scrollTop={scrollTop} top="6rem" left="70%" size="clamp(8rem, 18vw, 14rem)" speed={-0.1} />
          <Stagger delay={0.1} scrollTop={scrollTop} speed={0.15}>
            <ModalHeader>
              <ModalLabel>DER ERSTE SCHRITT</ModalLabel>
              <ScalingTitle scrollTop={scrollTop}>Erzählt uns von euch</ScalingTitle>
            </ModalHeader>
          </Stagger>
          <Stagger delay={0.2} scrollTop={scrollTop} speed={0.25}>
            <ModalBody>
              Unverbindlich, ohne Haken. Wir freuen uns auf eure Geschichte.
            </ModalBody>
          </Stagger>
          <Stagger delay={0.3} scrollTop={scrollTop} speed={0.3}>
            <ContactModalForm onClose={onClose} />
          </Stagger>
          <Stagger delay={0.45} scrollTop={scrollTop} speed={0.4}>
            <ExpandDivider scrollTop={scrollTop} delay={0.45} />
            <div style={{ paddingTop: '2rem' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Oder direkt per E-Mail</p>
              <a href="mailto:wedding@sarahiver.de" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.1rem', fontWeight: 800, color: '#fff', textDecoration: 'none' }}>wedding@sarahiver.de</a>
            </div>
          </Stagger>
        </ModalInner>
      </ModalScroll>
    );

    default: return null;
  }
}

const HCAPTCHA_SITE_KEY = process.env.REACT_APP_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001';

const PACKAGES = [
  { id: '', label: 'Bitte wählen...' },
  { id: 'starter', label: 'Starter (€1.290)' },
  { id: 'standard', label: 'Standard (€1.490)' },
  { id: 'premium', label: 'Premium (€1.990)' },
];

const THEME_OPTIONS = [
  { id: '', label: 'Bitte wählen...' },
  { id: 'classic', label: 'Classic' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'botanical', label: 'Botanical' },
  { id: 'contemporary', label: 'Contemporary' },
  { id: 'luxe', label: 'Luxe' },
  { id: 'neon', label: 'Neon' },
  { id: 'video', label: 'Video' },
  { id: 'modern', label: 'Modern' },
];

function ContactModalForm({ onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', weddingDate: '',
    interestedTheme: 'modern', interestedPackage: '', message: '', honeypot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  const captchaWidgetId = useRef(null);
  const formLoadTime = useRef(Date.now());

  // Lazy-load hCaptcha on first interaction
  const captchaLoading = useRef(false);
  const loadCaptcha = useCallback(() => {
    if (captchaLoading.current || document.querySelector('script[src*="hcaptcha"]')) {
      // Script already present → try render
      if (window.hcaptcha && captchaRef.current && captchaWidgetId.current === null) {
        try {
          captchaWidgetId.current = window.hcaptcha.render(captchaRef.current, {
            sitekey: HCAPTCHA_SITE_KEY, theme: 'dark', size: 'normal',
            callback: (t) => setCaptchaToken(t),
            'expired-callback': () => setCaptchaToken(null),
            'error-callback': () => setCaptchaToken(null),
          });
        } catch (e) { /* already rendered */ }
      }
      return;
    }
    captchaLoading.current = true;
    const script = document.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!captchaRef.current || captchaWidgetId.current !== null || !window.hcaptcha) return;
      try {
        captchaWidgetId.current = window.hcaptcha.render(captchaRef.current, {
          sitekey: HCAPTCHA_SITE_KEY, theme: 'dark', size: 'normal',
          callback: (t) => setCaptchaToken(t),
          'expired-callback': () => setCaptchaToken(null),
          'error-callback': () => setCaptchaToken(null),
        });
      } catch (e) { /* already rendered */ }
    };
    document.head.appendChild(script);
  }, []);

  // Try render if script already loaded
  useEffect(() => {
    if (window.hcaptcha && captchaRef.current && captchaWidgetId.current === null) {
      try {
        captchaWidgetId.current = window.hcaptcha.render(captchaRef.current, {
          sitekey: HCAPTCHA_SITE_KEY, theme: 'dark', size: 'normal',
          callback: (t) => setCaptchaToken(t),
          'expired-callback': () => setCaptchaToken(null),
          'error-callback': () => setCaptchaToken(null),
        });
      } catch (e) { /* already rendered */ }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Spam checks
    if (form.honeypot) { setSubmitStatus('success'); return; }
    if (Date.now() - formLoadTime.current < 3000) { setSubmitStatus('success'); return; }
    if (!captchaToken) { setErrorMessage('Bitte bestätige, dass du kein Roboter bist.'); return; }

    // Validation
    if (!form.name.trim()) { setErrorMessage('Bitte gib deinen Namen ein.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein.'); return; }
    if (!form.message.trim()) { setErrorMessage('Bitte schreibe uns eine Nachricht.'); return; }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          weddingDate: form.weddingDate,
          interestedTheme: form.interestedTheme,
          interestedPackage: form.interestedPackage,
          message: form.message.trim(),
          captchaToken,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Ein Fehler ist aufgetreten.');
      setSubmitStatus('success');
      if (window.hcaptcha && captchaWidgetId.current !== null) {
        window.hcaptcha.reset(captchaWidgetId.current);
      }
      setCaptchaToken(null);
    } catch (err) {
      setErrorMessage(err.message || 'Ein Fehler ist aufgetreten.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1rem', border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 0, fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 500,
    color: '#fff', background: 'transparent', outline: 'none', boxSizing: 'border-box',
  };
  const selectStyle = {
    ...inputStyle, appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.5)' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center',
  };
  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700,
    letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '0.3rem',
  };

  if (submitStatus === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>Danke! 💛</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
          Eure Nachricht ist bei uns angekommen. Wir melden uns innerhalb von 24 Stunden persönlich bei euch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onClick={loadCaptcha} onFocus={loadCaptcha}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Honeypot — hidden from users */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <input name="website" value={form.honeypot} onChange={e => setForm(s => ({ ...s, honeypot: e.target.value }))} tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <p style={labelStyle}>Eure Namen *</p>
        <input style={inputStyle} type="text" placeholder="z.B. Sarah & Iver" value={form.name}
          onChange={e => setForm(s => ({ ...s, name: e.target.value }))} required />
      </div>

      <div>
        <p style={labelStyle}>E-Mail *</p>
        <input style={inputStyle} type="email" placeholder="eure@email.de" value={form.email}
          onChange={e => setForm(s => ({ ...s, email: e.target.value }))} required />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <p style={labelStyle}>Telefon</p>
          <input style={inputStyle} type="tel" placeholder="Optional" value={form.phone}
            onChange={e => setForm(s => ({ ...s, phone: e.target.value }))} />
        </div>
        <div>
          <p style={labelStyle}>Hochzeitsdatum</p>
          <input style={{ ...inputStyle, colorScheme: 'dark' }} type="date" value={form.weddingDate}
            onChange={e => setForm(s => ({ ...s, weddingDate: e.target.value }))} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <p style={labelStyle}>Wunsch-Theme</p>
          <select style={selectStyle} value={form.interestedTheme}
            onChange={e => setForm(s => ({ ...s, interestedTheme: e.target.value }))}>
            {THEME_OPTIONS.map(t => <option key={t.id} value={t.id} style={{ background: '#1a1a1a' }}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <p style={labelStyle}>Paket</p>
          <select style={selectStyle} value={form.interestedPackage}
            onChange={e => setForm(s => ({ ...s, interestedPackage: e.target.value }))}>
            {PACKAGES.map(p => <option key={p.id} value={p.id} style={{ background: '#1a1a1a' }}>{p.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <p style={labelStyle}>Eure Nachricht *</p>
        <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
          placeholder="Erzählt uns von eurer Hochzeit..."
          value={form.message} onChange={e => setForm(s => ({ ...s, message: e.target.value }))} required />
      </div>

      {/* hCaptcha */}
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: '78px' }}>
        <div ref={captchaRef} />
      </div>

      {errorMessage && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: '#ff6b6b', margin: 0 }}>{errorMessage}</p>
      )}

      <button type="submit" disabled={isSubmitting} style={{
        padding: '1rem 2rem', border: 'none', background: isSubmitting ? 'rgba(255,255,255,0.5)' : '#fff',
        color: '#000', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 800,
        letterSpacing: '0.1em', cursor: isSubmitting ? 'wait' : 'pointer', textTransform: 'uppercase',
        alignSelf: 'flex-start', transition: 'opacity 0.2s',
      }}>
        {isSubmitting ? '⏳ Wird gesendet...' : 'Nachricht senden'}
      </button>
    </form>
  );
}

// ============================================
// MODAL STYLED COMPONENTS
// ============================================
const ModalScroll = styled.div`
  overflow-y: auto;
  height: 100vh;
  -webkit-overflow-scrolling: touch;
  flex: 1;
`;

const ModalInner = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ModalHeader = styled.div`
  padding: 6rem 0 3rem;
`;

const ModalLabel = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 0.5rem;
`;

const ModalTitle = styled.h2`
  font-family: 'DM Sans', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1;
  letter-spacing: -0.02em;
`;

const ModalBody = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255,255,255,0.55);
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const ModalItem = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
`;

const ModalItemNum = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.2);
  display: block;
  margin-bottom: 0.5rem;
`;

const ModalItemTitle = styled.h3`
  font-family: 'DM Sans', sans-serif;
  font-size: 1.3rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

const ModalItemDesc = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;
`;

// ============================================
// ANIMATIONS — injected as global <style> so they work in inline styles
// ============================================
const MODAL_STYLE_ID = 'modern-modal-keyframes';
function ensureModalKeyframes() {
  if (document.getElementById(MODAL_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = MODAL_STYLE_ID;
  style.textContent = `
    @keyframes modernLetterSpin {
      0% { transform: translate(-50%, -50%) translateX(0) rotate(0deg); font-size: 0.8rem; opacity: 1; color: #000; }
      25% { color: #fff; }
      60% { transform: translate(-50%, -50%) translateX(var(--spread)) rotate(480deg); font-size: clamp(2.5rem, 8vw, 5rem); opacity: 1; color: #fff; }
      100% { transform: translate(-50%, -50%) translateX(var(--spread-far)) rotate(720deg); font-size: clamp(4rem, 12vw, 8rem); opacity: 0; color: #fff; }
    }
    @keyframes modernFadeToBlack {
      from { background: rgba(0,0,0,0); }
      to { background: rgba(0,0,0,0.45); }
    }
    @keyframes modernContentAppear {
      from { opacity: 0; transform: translateX(60px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes modernFadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    @keyframes modernSpinIn {
      from { transform: rotate(0deg) scale(0); opacity: 0; }
      to { transform: rotate(360deg) scale(1); opacity: 1; }
    }
    @keyframes modalStaggerIn {
      from { opacity: 0; transform: translateY(25px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes expandLine {
      from { width: 0%; }
      to { width: 100%; }
    }
    @keyframes letterBounce {
      0% { transform: translateY(0); }
      30% { transform: translateY(-0.25em); }
      50% { transform: translateY(0.04em); }
      70% { transform: translateY(-0.06em); }
      100% { transform: translateY(0); }
    }
    @keyframes hintFadeInOut {
      0% { opacity: 0; transform: translateY(8px); }
      15% { opacity: 1; transform: translateY(0); }
      75% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-5px); }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ModernParallaxPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [modalPhase, setModalPhase] = useState(null);
  const scrollY = useRef(0);
  const titleRefs = useRef({});

  // Inject keyframes on mount
  useEffect(() => { ensureModalKeyframes(); }, []);

  // Track scroll
  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Parallax titles on scroll
  useEffect(() => {
    let raf;
    const update = () => {
      const sy = scrollY.current;
      Object.entries(titleRefs.current).forEach(([id, el]) => {
        if (!el) return;
        const speed = parseFloat(el.dataset.speed || 1);
        const drift = sy * (speed - 1) * 0.35;
        el.style.transform = `translateY(${drift}px)`;
      });
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Open modal
  const openModal = useCallback((id, el) => {
    const rect = el?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const title = TITLES.find(t => t.id === id);
    setActiveModal({ id, origin, label: title?.text || '' });
    setModalPhase('letters');
    setTimeout(() => setModalPhase('open'), 1100);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    if (modalPhase === 'closing') return;
    setModalPhase('closing');
    setTimeout(() => {
      setModalPhase(null);
      setActiveModal(null);
    }, 500);
  }, [modalPhase]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (activeModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

  // ESC to close
  useEffect(() => {
    if (!activeModal) return;
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeModal, closeModal]);

  // Listen for nav menu modal opens
  useEffect(() => {
    const handleNavOpen = (e) => {
      const { id } = e.detail;
      const titleEl = titleRefs.current[id];
      if (titleEl) openModal(id, titleEl);
    };
    window.addEventListener('modernOpenModal', handleNavOpen);
    return () => window.removeEventListener('modernOpenModal', handleNavOpen);
  }, [openModal]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      {/* ── THREE.JS CANVAS BACKGROUND ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <CanvasErrorBoundary>
          <Canvas
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 10], fov: 25 }}
          >
            <Suspense fallback={null}>
              <ParallaxScene scrollY={scrollY} />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      {/* ── HERO ── */}
      <div style={{
        position: 'relative', zIndex: 2, height: '100vh', minHeight: '600px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 1.5rem',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)',
          marginBottom: '1.5rem', background: '#fff', padding: '0.3em 0.6em',
        }}>PREMIUM HOCHZEITSWEBSITES</p>
        <h1 style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(3.5rem, 9vw, 8rem)',
          fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#000', margin: 0,
          background: '#fff', padding: '0.1em 0.3em',
        }}>
          Eure Liebe.<br />Handgemacht<br />erzählt.
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)',
          marginTop: '2rem', background: '#fff', padding: '0.3em 0.6em',
        }}>AB 1.290 € · IN 7 TAGEN LIVE</p>
      </div>

      {/* ── SCATTERED TITLES ── */}
      <div style={{ position: 'relative', zIndex: 2, minHeight: isMobile ? '210vh' : '310vh' }}>
        {TITLES.map((t, idx) => {
          const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
          return (
          <h2
            key={t.id}
            id={t.id === 'contact' ? 'modern-contact-title' : undefined}
            data-title-id={t.id}
            ref={el => { titleRefs.current[t.id] = el; }}
            data-speed={mobile ? (t.mSpeed || t.speed * 0.4) : t.speed}
            onClick={(e) => openModal(t.id, e.currentTarget)}
            onMouseEnter={(e) => {
              const spans = e.currentTarget.querySelectorAll('.bounce-letter');
              spans.forEach((span, i) => {
                span.style.animation = `letterBounce 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.03}s both`;
              });
            }}
            onMouseLeave={(e) => {
              const spans = e.currentTarget.querySelectorAll('.bounce-letter');
              spans.forEach(span => { span.style.animation = 'none'; });
            }}
            style={{
              position: 'absolute',
              top: `${mobile ? (t.mTop || t.top) : t.top}vh`,
              left: mobile ? t.mLeft : t.left,
              fontSize: mobile ? t.mSize : t.size,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              color: '#000',
              background: '#fff',
              padding: '0.1em 0.35em',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
              cursor: 'pointer',
              zIndex: 2,
              maxWidth: '85vw',
              whiteSpace: 'nowrap',
              transition: 'transform 0.1s ease-out',
              userSelect: 'none',
            }}
          >
            {t.text.split('').map((char, i) => (
              <span
                key={i}
                className="bounce-letter"
                style={{
                  display: 'inline-block',
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                  // Auto-wink: first title plays bounce once on load (desktop + mobile)
                  ...(idx === 0 ? {
                    animation: `letterBounce 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${2.5 + i * 0.03}s both`,
                  } : {}),
                }}
              >
                {char}
              </span>
            ))}
          </h2>
          );
        })}

        {/* ── MOBILE TAP HINT ── */}
        {isMobile && (
          <div style={{
            position: 'absolute',
            top: '82vh',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            animation: 'hintFadeInOut 4s ease 3.5s both',
            pointerEvents: 'none',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.35)',
              background: '#fff',
              padding: '0.5em 1em',
              display: 'inline-block',
            }}>↑ Tippe auf eine Headline</p>
          </div>
        )}

        {/* ── FOOTER ── */}
        <div style={{
          position: 'absolute', top: isMobile ? '195vh' : '290vh', left: 0, width: '100vw',
          background: '#000', padding: 'clamp(3rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem)',
          zIndex: 2,
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.06em', marginBottom: '0.5rem' }}>S&I.</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 400, color: 'rgba(255,255,255,0.3)' }}>Premium Hochzeitswebsites</p>
            </div>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <a href="mailto:wedding@sarahiver.de" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>wedding@sarahiver.de</a>
              <a href="/impressum" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Impressum</a>
              <a href="/datenschutz" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Datenschutz</a>
            </div>
          </div>
          <p style={{ maxWidth: '1200px', margin: '2rem auto 0', fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.15)', textAlign: 'center' }}>
            © {new Date().getFullYear()} S&I Wedding. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>

      {/* ── MODAL ── */}
      {activeModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          animation: modalPhase === 'closing' ? 'modernFadeOut 0.5s ease forwards' : 'none',
        }}>
          {/* Backdrop */}
          <div
            onClick={closeModal}
            style={{
              position: 'absolute', inset: 0,
              background: modalPhase === 'letters' ? undefined : 'rgba(0,0,0,0.45)',
              animation: modalPhase === 'letters' ? 'modernFadeToBlack 0.9s ease forwards' : 'none',
            }}
          />

          {/* Letter Animation */}
          {modalPhase === 'letters' && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
              {activeModal.label.split('').map((char, i) => {
                const centerOffset = i - (activeModal.label.length - 1) / 2;
                const spread = centerOffset * 40;
                const spreadFar = centerOffset * 120;
                return (
                  <span key={i} style={{
                    position: 'absolute', left: `${activeModal.origin.x}px`, top: `${activeModal.origin.y}px`,
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: '0.8rem',
                    pointerEvents: 'none', willChange: 'transform, font-size, opacity',
                    '--spread': `${spread}px`,
                    '--spread-far': `${spreadFar}px`,
                    animation: `modernLetterSpin 1.1s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.05}s forwards`,
                  }}>{char}</span>
                );
              })}
            </div>
          )}

          {/* Close Button */}
          {modalPhase === 'open' && (
            <button onClick={closeModal} style={{
              position: 'fixed', top: '1.2rem', right: '1.5rem', zIndex: 10002,
              background: 'none', border: 'none', fontSize: '1.5rem', fontWeight: 800,
              color: '#fff', cursor: 'pointer', width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'DM Sans', sans-serif",
              animation: 'modernSpinIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
            }}>✕</button>
          )}

          {/* Content Panel */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute', right: 0, top: 0,
              width: isMobile ? '100vw' : '66vw', height: '100vh',
              background: '#000', display: 'flex', flexDirection: 'column', zIndex: 1,
              opacity: modalPhase === 'open' ? 1 : 0,
              transform: modalPhase === 'open' ? 'translateX(0)' : 'translateX(60px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              pointerEvents: modalPhase === 'open' ? 'auto' : 'none',
            }}
          >
            {modalPhase === 'open' && <ModalContent id={activeModal.id} onClose={closeModal} onOpenContact={() => {
              const contactEl = titleRefs.current['contact'];
              if (contactEl) openModal('contact', contactEl);
            }} />}
          </div>
        </div>
      )}
    </>
  );
}
