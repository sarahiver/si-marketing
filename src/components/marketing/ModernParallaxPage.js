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
function ParallaxImg({ url, basePos, scaleArr, speed, scrollY, pageHeight }) {
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;
    const scrollFactor = (scrollY.current / pageHeight) || 0;
    // Each image drifts at its own speed relative to the base group scroll
    const drift = scrollFactor * speed;
    ref.current.position.y = basePos[1] + drift;
  });

  return (
    <Image
      ref={ref}
      url={url}
      position={basePos}
      scale={scaleArr}
      transparent
      opacity={0.8}
    />
  );
}

// Image config: each maps to FLOAT_IMAGES index, format matches the photo
const IMG_CONFIG = [
  // #1 Hero links — Hochformat schmal
  { x: -0.32, y: 0, z: -2, w: 0.18, h: 0.55, speed: 0.8, img: 0 },
  // #2 Hero rechts — Querformat breit
  { x: 0.28, y: -0.12, z: 1, w: 0.4, h: 0.22, speed: 1.4, img: 1 },
  // #3 Obere Mitte — Hochformat schmal
  { x: -0.05, y: -0.65, z: 0, w: 0.16, h: 0.48, speed: 1.1, img: 2 },
  // #4 Mid rechts — Querformat breit
  { x: 0.3, y: -0.85, z: -1, w: 0.38, h: 0.24, speed: 0.6, img: 3 },
  // #5 Mid links — Quadratisch
  { x: -0.3, y: -1.15, z: 2, w: 0.26, h: 0.26, speed: 1.5, img: 4 },
  // #6 Untere Mitte — Hochformat schmal
  { x: 0.1, y: -1.4, z: -2, w: 0.17, h: 0.5, speed: 0.9, img: 5 },
  // #7 Unterer links — Querformat breit (Panorama)
  { x: -0.24, y: -1.75, z: 1, w: 0.44, h: 0.2, speed: 1.3, img: 6 },
  // #8 Unterer rechts — Hochformat schmal
  { x: 0.3, y: -2.0, z: 0, w: 0.15, h: 0.44, speed: 0.7, img: 7 },
  // #9 Boden links — Querformat breit
  { x: -0.18, y: -2.35, z: -1, w: 0.36, h: 0.22, speed: 1.45, img: 8 },
  // #10 Boden rechts — Hochformat
  { x: 0.25, y: -2.6, z: 2, w: 0.2, h: 0.52, speed: 0.85, img: 9 },
  // #11 Zusatz Mitte — Querformat extra breit (Overlay)
  { x: -0.05, y: -2.9, z: -2, w: 0.48, h: 0.18, speed: 1.2, img: 10 },
  // #12 Zusatz — Hochformat schmal (Tiefe)
  { x: 0.2, y: -3.2, z: 1, w: 0.14, h: 0.42, speed: 1.0, img: 11 },
];

function ParallaxScene({ scrollY }) {
  const { viewport } = useThree();
  const w = viewport.width;
  const h = viewport.height;
  const isMobile = w < 5;
  const s = isMobile ? 0.55 : 1;
  const pageHeight = typeof document !== 'undefined'
    ? (document.documentElement.scrollHeight - window.innerHeight) || 1
    : 1;

  return (
    <group>
      {IMG_CONFIG.map((cfg, i) => (
        <ParallaxImg
          key={i}
          url={FLOAT_IMAGES[cfg.img]}
          basePos={[w * cfg.x, h * cfg.y, cfg.z]}
          scaleArr={[w * cfg.w * s, h * cfg.h * s, 1]}
          speed={h * cfg.speed}
          scrollY={scrollY}
          pageHeight={pageHeight}
        />
      ))}
    </group>
  );
}

// ============================================
// SCATTERED TITLES DATA
// ============================================
const TITLES = [
  { id: 'features', text: 'Features', left: '3%', mLeft: '4%', top: 105, speed: 0.7, size: 'clamp(2.8rem, 7vw, 6rem)', mSize: 'clamp(2.2rem, 10vw, 3rem)' },
  { id: 'designs', text: 'Designs', left: '55%', mLeft: '30%', top: 118, speed: 1.35, size: 'clamp(3.2rem, 8vw, 7rem)', mSize: 'clamp(2.5rem, 11vw, 3.5rem)' },
  { id: 'howItWorks', text: 'So funktioniert\'s', left: '22%', mLeft: '3%', top: 140, speed: 0.75, size: 'clamp(1.8rem, 4.5vw, 3.5rem)', mSize: 'clamp(1.5rem, 7vw, 2.2rem)' },
  { id: 'components', text: '18 Komponenten', left: '58%', mLeft: '15%', top: 156, speed: 1.4, size: 'clamp(2rem, 5vw, 4.5rem)', mSize: 'clamp(1.5rem, 7vw, 2.2rem)' },
  { id: 'pricing', text: 'Preise', left: '8%', mLeft: '5%', top: 178, speed: 0.65, size: 'clamp(3.5rem, 9vw, 8rem)', mSize: 'clamp(2.8rem, 12vw, 4rem)' },
  { id: 'about', text: 'Sarah & Iver', left: '42%', mLeft: '25%', top: 196, speed: 1.3, size: 'clamp(2.2rem, 5.5vw, 4.5rem)', mSize: 'clamp(1.8rem, 8vw, 2.5rem)' },
  { id: 'whyUs', text: 'Warum wir', left: '18%', mLeft: '8%', top: 216, speed: 0.72, size: 'clamp(2.8rem, 7vw, 6rem)', mSize: 'clamp(2rem, 9vw, 3rem)' },
  { id: 'cooperation', text: 'Kooperationen', left: '52%', mLeft: '12%', top: 234, speed: 1.25, size: 'clamp(2rem, 5vw, 4rem)', mSize: 'clamp(1.5rem, 7vw, 2.2rem)' },
  { id: 'contact', text: 'Kontakt', left: '6%', mLeft: '5%', top: 255, speed: 0.68, size: 'clamp(3rem, 7.5vw, 6.5rem)', mSize: 'clamp(2.2rem, 10vw, 3.2rem)' },
];

// ============================================
// MODAL CONTENT
// ============================================
function ModalContent({ id, onClose, onOpenContact }) {
  const [scrollTop, setScrollTop] = useState(0);
  const px = (speed) => scrollTop * (speed - 0.5) * 1.2;

  switch (id) {
    case 'features': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner>
          <ModalHeader style={{ transform: `translateY(${px(0.15)}px)` }}>
            <ModalLabel>WARUM S&I.</ModalLabel>
            <ModalTitle>Was uns besonders macht</ModalTitle>
          </ModalHeader>
          {[
            { n: '01', t: 'Kein Paar ist wie das andere', d: 'Jede Website ein Unikat — handgemacht, nicht von der Stange. Bereits Dutzende Paare haben ihre Liebesgeschichte mit uns digital verewigt.' },
            { n: '02', t: 'sarah-und-max.de', d: 'Eure Liebe hat eine eigene Adresse. Keine Subdomain, kein Baukasten-Link. Professionell eingerichtet, sofort startklar.' },
            { n: '03', t: 'Designwelten', d: 'Ob elegant, modern oder verspielt: Wir passen jedes Design individuell an eure Farben, Fotos und Geschichte an.' },
            { n: '04', t: 'Direkter Kontakt', d: 'Ihr sprecht mit echten Menschen — Sarah & Iver. Keine Hotline, kein Bot, kein Ticketsystem.' },
            { n: '05', t: 'So wenig Aufwand wie möglich', d: 'Wir übernehmen den Rest. Ihr schickt uns Texte & Fotos.' },
            { n: '06', t: 'In 7 Tagen live', d: 'Die meisten Websites gehen innerhalb einer Woche online — inklusive Korrekturschleife.' },
          ].map((item, i) => (
            <ModalItem key={i} style={{ transform: `translateY(${px(0.25 + i * 0.06)}px)` }}>
              <ModalItemNum>{item.n}</ModalItemNum>
              <ModalItemTitle>{item.t}</ModalItemTitle>
              <ModalItemDesc>{item.d}</ModalItemDesc>
            </ModalItem>
          ))}
        </ModalInner>
      </ModalScroll>
    );

    case 'designs': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner>
          <ModalHeader style={{ transform: `translateY(${px(0.15)}px)` }}>
            <ModalLabel>8 THEMES</ModalLabel>
            <ModalTitle>Eure Designwelt</ModalTitle>
          </ModalHeader>
          <ModalBody style={{ transform: `translateY(${px(0.25)}px)` }}>
            Jedes Theme erzählt eure Geschichte anders. Von minimalistisch-elegant über cinematic-luxuriös bis hin zu modern-interaktiv mit 3D-Effekten.
          </ModalBody>
          {['Classic', 'Botanical', 'Contemporary', 'Editorial', 'Luxe', 'Modern', 'Neon', 'Video'].map((name, i) => {
            const slug = name === 'Modern' ? 'parallax' : name.toLowerCase();
            return (
            <ModalItem key={i} style={{ transform: `translateY(${px(0.3 + i * 0.04)}px)` }}>
              <ModalItemTitle>{name}</ModalItemTitle>
              <ModalItemDesc>
                <a href={`https://siwedding.de/demo-${slug}`} target="_blank" rel="noopener noreferrer"
                  style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: '3px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Demo ansehen →
                </a>
              </ModalItemDesc>
            </ModalItem>
            );
          })}
        </ModalInner>
      </ModalScroll>
    );

    case 'howItWorks': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner>
          <ModalHeader style={{ transform: `translateY(${px(0.15)}px)` }}>
            <ModalLabel>EUER WEG</ModalLabel>
            <ModalTitle>4 einfache Schritte</ModalTitle>
          </ModalHeader>
          {[
            { n: '01', t: 'Ihr entdeckt uns', d: 'Schreibt uns — unverbindlich, ohne Haken. Wir melden uns persönlich, meistens noch am selben Tag.' },
            { n: '02', t: 'Wir lernen euch kennen', d: 'In einem persönlichen Gespräch erfahren wir, wer ihr seid. Was euch wichtig ist. Wie eure Hochzeit sich anfühlen soll.' },
            { n: '03', t: 'Ihr erzählt eure Geschichte', d: 'Über ein einfaches Dashboard tragt ihr Texte ein, ladet Fotos hoch. Kein technisches Wissen nötig.' },
            { n: '04', t: 'Eure Website geht live', d: 'Wir bauen, optimieren und schicken euch die fertige Seite zur Freigabe. In der Regel in 7 Tagen.' },
          ].map((step, i) => (
            <ModalItem key={i} style={{ transform: `translateY(${px(0.25 + i * 0.08)}px)` }}>
              <ModalItemNum>{step.n}</ModalItemNum>
              <ModalItemTitle>{step.t}</ModalItemTitle>
              <ModalItemDesc>{step.d}</ModalItemDesc>
            </ModalItem>
          ))}
        </ModalInner>
      </ModalScroll>
    );

    case 'components': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner style={{ maxWidth: 'none', padding: '0 1.5rem' }}>
          <ModalHeader style={{ transform: `translateY(${px(0.15)}px)`, padding: '0 0.5rem' }}>
            <ModalLabel>BAUKASTEN</ModalLabel>
            <ModalTitle>18 Komponenten</ModalTitle>
          </ModalHeader>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.08)', transform: `translateY(${px(0.25)}px)` }}>
            {[
              '🏠 Hero', '💕 Love Story', '💌 RSVP', '🔔 Countdown', '📅 Ablauf', '⏰ Timeline',
              '📍 Location', '🚗 Anfahrt', '🏨 Hotels', '👗 Dresscode', '🎁 Wunschliste',
              '📸 Galerie', '🤳 Gäste-Fotos', '❓ FAQ', '🎵 Musikwünsche', '👥 Trauzeugen',
              '💍 Footer', '📄 Impressum',
            ].map((comp, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.9)', padding: '1.2rem 1rem', textAlign: 'center' }}>
                <span style={{ fontSize: '1.3rem', display: 'block', marginBottom: '0.4rem' }}>{comp.split(' ')[0]}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>{comp.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </ModalInner>
      </ModalScroll>
    );

    case 'pricing': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner>
          <ModalHeader style={{ transform: `translateY(${px(0.15)}px)` }}>
            <ModalLabel>PAKETE</ModalLabel>
            <ModalTitle>Preise</ModalTitle>
          </ModalHeader>
          {[
            { name: 'Starter', price: '1.290', duration: '6 Monate', features: ['Eigene Domain', '4 Basis-Komponenten', '6 Monate Hosting', '1 Revision'] },
            { name: 'Standard', price: '1.490', duration: '8 Monate', popular: true, features: ['Eigene Domain', '4 Basis + 3 Extra', '8 Monate Hosting', '2 Revisionen'] },
            { name: 'Premium', price: '1.990', duration: '12 Monate', features: ['Eigene Domain', '4 Basis + 6 Extra', 'Save the Date + Archiv', 'Unbegrenzte Revisionen'] },
          ].map((pkg, i) => (
            <div key={i} style={{
              padding: '2rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              transform: `translateY(${px(0.25 + i * 0.08)}px)`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <ModalItemTitle style={{ marginBottom: 0 }}>
                  {pkg.name}
                  {pkg.popular && <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginLeft: '0.75rem', textTransform: 'uppercase' }}>BELIEBT</span>}
                </ModalItemTitle>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff' }}>
                  <span style={{ fontSize: '0.5em', opacity: 0.4 }}>€</span>{pkg.price}
                </span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', marginBottom: '1rem', textTransform: 'uppercase' }}>{pkg.duration}</p>
              {pkg.features.map((f, fi) => (
                <p key={fi} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)', padding: '0.3rem 0' }}>{f}</p>
              ))}
            </div>
          ))}
          <div style={{ marginTop: '2rem', transform: `translateY(${px(0.5)}px)` }}>
            <button onClick={() => { onClose(); setTimeout(() => onOpenContact(), 600); }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', background: '#fff', padding: '1rem 2rem', border: 'none', cursor: 'pointer', display: 'inline-block' }}>
              Jetzt anfragen →
            </button>
          </div>
        </ModalInner>
      </ModalScroll>
    );

    case 'about': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner>
          <ModalHeader style={{ transform: `translateY(${px(0.15)}px)` }}>
            <ModalLabel>ÜBER UNS</ModalLabel>
            <ModalTitle>Sarah & Iver</ModalTitle>
          </ModalHeader>
          <ModalBody style={{ transform: `translateY(${px(0.25)}px)` }}>
            Wir sind kein Startup, keine Agentur. Wir sind ein Paar, das Hochzeitswebsites baut — weil wir wissen, wie es sich anfühlt.
          </ModalBody>
          {[
            { emoji: '🎨', name: 'Sarah', role: 'Herz, Design & Gefühl', desc: 'Sarah sorgt dafür, dass jede Website nicht nur schön aussieht, sondern sich richtig anfühlt. Farben, Typografie, Bildsprache — alles wird mit Liebe zum Detail gestaltet.' },
            { emoji: '🧑‍💻', name: 'Iver', role: 'Technik & Begleitung', desc: 'Iver kümmert sich um Technik, Umsetzung und Betreuung. Vom ersten Gespräch bis zur fertigen Website — ein echter Ansprechpartner, keine Massenabfertigung.' },
          ].map((person, i) => (
            <ModalItem key={i} style={{ transform: `translateY(${px(0.3 + i * 0.1)}px)` }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.75rem' }}>{person.emoji}</span>
              <ModalItemTitle>{person.name}</ModalItemTitle>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>{person.role}</p>
              <ModalItemDesc>{person.desc}</ModalItemDesc>
            </ModalItem>
          ))}
        </ModalInner>
      </ModalScroll>
    );

    case 'whyUs': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner>
          <ModalHeader style={{ transform: `translateY(${px(0.15)}px)` }}>
            <ModalLabel>WARUM S&I.</ModalLabel>
            <ModalTitle>Weil eure Hochzeit zu wichtig ist.</ModalTitle>
          </ModalHeader>
          {[
            { icon: '💼', label: 'Statt Agentur', problem: 'Oft teuer, langsam und anonym.', solution: 'Boutique statt Massenbetrieb.' },
            { icon: '🤖', label: 'Statt KI-Tools', problem: 'Schnell — aber ohne Herz.', solution: 'Menschen, Geschmack & Feingefühl.' },
            { icon: '🛠️', label: 'Statt selber machen', problem: 'Günstig — aber auf Kosten eurer Zeit.', solution: 'Ihr gebt Inhalte — wir den Rest.' },
          ].map((card, i) => (
            <ModalItem key={i} style={{ transform: `translateY(${px(0.25 + i * 0.1)}px)` }}>
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{card.icon}</span>
              <ModalItemTitle>{card.label}</ModalItemTitle>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', marginBottom: '0.5rem' }}>{card.problem}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{card.solution}</p>
            </ModalItem>
          ))}
        </ModalInner>
      </ModalScroll>
    );

    case 'cooperation': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner>
          <ModalHeader style={{ transform: `translateY(${px(0.15)}px)` }}>
            <ModalLabel>ZUSAMMENARBEIT</ModalLabel>
            <ModalTitle>Kooperationen</ModalTitle>
          </ModalHeader>
          <ModalBody style={{ transform: `translateY(${px(0.25)}px)` }}>
            Ob Hochzeitsplaner, Fotografen, Locations oder andere Dienstleister — wir freuen uns über Kooperationsanfragen.
          </ModalBody>
          {[
            { icon: '📸', t: 'Fotografen', d: 'Empfehlt uns euren Paaren — wir bauen Websites, die eure Bilder perfekt in Szene setzen.' },
            { icon: '💐', t: 'Wedding Planner', d: 'Bietet euren Kunden eine Premium-Website als Teil eures Pakets an.' },
            { icon: '🏰', t: 'Locations', d: 'Zeigt euren Paaren, wie ihre Hochzeitswebsite aussehen könnte — mit eurer Location als Highlight.' },
          ].map((item, i) => (
            <ModalItem key={i} style={{ transform: `translateY(${px(0.3 + i * 0.1)}px)` }}>
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{item.icon}</span>
              <ModalItemTitle>{item.t}</ModalItemTitle>
              <ModalItemDesc>{item.d}</ModalItemDesc>
            </ModalItem>
          ))}
          <div style={{ marginTop: '2rem', transform: `translateY(${px(0.5)}px)` }}>
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
        </ModalInner>
      </ModalScroll>
    );

    case 'contact': return (
      <ModalScroll onScroll={e => setScrollTop(e.target.scrollTop)}>
        <ModalInner>
          <ModalHeader style={{ transform: `translateY(${px(0.15)}px)` }}>
            <ModalLabel>DER ERSTE SCHRITT</ModalLabel>
            <ModalTitle>Erzählt uns von euch</ModalTitle>
          </ModalHeader>
          <ModalBody style={{ transform: `translateY(${px(0.25)}px)` }}>
            Unverbindlich, ohne Haken. Wir freuen uns auf eure Geschichte.
          </ModalBody>
          <div style={{ transform: `translateY(${px(0.3)}px)` }}>
            <ContactModalForm onClose={onClose} />
          </div>
          <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', transform: `translateY(${px(0.4)}px)` }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Oder direkt per E-Mail</p>
            <a href="mailto:wedding@sarahiver.de" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.1rem', fontWeight: 800, color: '#fff', textDecoration: 'none' }}>wedding@sarahiver.de</a>
          </div>
        </ModalInner>
      </ModalScroll>
    );

    default: return null;
  }
}

function ContactModalForm({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Anfrage von ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nE-Mail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:wedding@sarahiver.de?subject=${subject}&body=${body}`;
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1rem', border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 0, fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 500,
    color: '#fff', background: 'transparent', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input style={inputStyle} type="text" placeholder="Eure Namen" value={form.name} onChange={e => setForm(s => ({ ...s, name: e.target.value }))} required />
      <input style={inputStyle} type="email" placeholder="E-Mail" value={form.email} onChange={e => setForm(s => ({ ...s, email: e.target.value }))} required />
      <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} placeholder="Erzählt uns von eurer Hochzeit..." value={form.message} onChange={e => setForm(s => ({ ...s, message: e.target.value }))} />
      <button type="submit" style={{
        padding: '1rem 2rem', border: 'none', background: '#fff', color: '#000',
        fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 800,
        letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase', alignSelf: 'flex-start',
      }}>
        Nachricht senden
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

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      {/* ── THREE.JS CANVAS BACKGROUND ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.85 }}>
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
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)',
          marginBottom: '1.5rem',
        }}>PREMIUM HOCHZEITSWEBSITES</p>
        <h1 style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(3.5rem, 9vw, 8rem)',
          fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em', color: '#000', margin: 0,
          background: '#fff', padding: '0.1em 0.3em',
        }}>
          Eure<br />Geschichte.<br />Immersiv<br />erzählt.
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.2)',
          marginTop: '2rem',
        }}>HANDGEMACHT · IN 7 TAGEN LIVE</p>
      </div>

      {/* ── SCATTERED TITLES ── */}
      <div style={{ position: 'relative', zIndex: 2, minHeight: '310vh' }}>
        {TITLES.map(t => {
          const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
          return (
          <h2
            key={t.id}
            id={t.id === 'contact' ? 'modern-contact-title' : undefined}
            data-title-id={t.id}
            ref={el => { titleRefs.current[t.id] = el; }}
            data-speed={t.speed}
            onClick={(e) => openModal(t.id, e.currentTarget)}
            style={{
              position: 'absolute',
              top: `${t.top}vh`,
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
              maxWidth: '80%',
              transition: 'transform 0.1s ease-out',
              userSelect: 'none',
            }}
          >
            {t.text}
          </h2>
          );
        })}

        {/* ── FOOTER ── */}
        <div style={{
          position: 'absolute', top: '290vh', left: 0, width: '100vw',
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
