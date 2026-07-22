// src/components/marketing/StickyDemoBar.js
// Mobile Sticky-CTA: "Live-Demo ansehen" — immer erreichbar beim Scrollen.
// Erscheint erst nach dem Hero (600px Scroll), verschwindet, sobald die
// Kontakt-Sektion sichtbar ist (damit der Submit-Button nicht verdeckt wird).
// Nur auf Mobile (<768px) sichtbar. Trackt demo_click mit source: 'sticky_bar'.
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const DEMO_URL = 'https://siwedding.de/demo-classic';
const SHOW_AFTER_PX = 600;

const Bar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 900;
    justify-content: center;
    padding: 0.6rem 1rem calc(0.6rem + env(safe-area-inset-bottom, 0px));
    background: rgba(26, 26, 26, 0.97);
    border-top: 1px solid rgba(253, 252, 250, 0.1);
    transform: translateY(${p => (p.$visible ? '0' : '110%')});
    transition: transform 0.3s ease;
  }
`;

const DemoLink = styled.a`
  display: block;
  width: 100%;
  max-width: 420px;
  text-align: center;
  background: #fdfcfa;
  color: #1a1a1a;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.9rem 1.5rem;
  border-radius: 4px;
`;

const StickyDemoBar = () => {
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolledEnough(window.scrollY > SHOW_AFTER_PX);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const contactEl = document.getElementById('contact');
    if (!contactEl || typeof IntersectionObserver === 'undefined') return;
    observerRef.current = new IntersectionObserver(
      entries => setContactVisible(entries[0]?.isIntersecting || false),
      { threshold: 0.1 }
    );
    observerRef.current.observe(contactEl);
    return () => observerRef.current?.disconnect();
  }, []);

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'demo_click', {
        event_category: 'engagement',
        event_label: 'classic',
        demo_url: DEMO_URL,
        source: 'sticky_bar',
      });
    }
  };

  return (
    <Bar $visible={scrolledEnough && !contactVisible}>
      <DemoLink
        href={DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        Live-Demo ansehen
      </DemoLink>
    </Bar>
  );
};

export default StickyDemoBar;
