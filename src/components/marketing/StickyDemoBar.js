// src/components/marketing/StickyDemoBar.js
// Mobile Sticky-CTA: "Live-Demo ansehen" öffnet eine Theme-Auswahl (Bottom-Sheet),
// aus der die gewünschte Demo gestartet wird.
// Erscheint erst nach dem Hero (600px Scroll), verschwindet, sobald die
// Kontakt-Sektion sichtbar ist. Nur auf Mobile (<768px) sichtbar.
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ALL_DEMOS, TAGLINES, trackDemoClick } from './demoData';

const SHOW_AFTER_PX = 600;

const Wrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 890;
  background: rgba(0, 0, 0, 0.45);
  opacity: ${p => (p.$open ? 1 : 0)};
  pointer-events: ${p => (p.$open ? 'auto' : 'none')};
  transition: opacity 0.25s ease;
`;

const Sheet = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
  background: #1a1a1a;
  border-top: 1px solid rgba(253, 252, 250, 0.1);
  border-radius: 14px 14px 0 0;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  transform: translateY(${p => (p.$visible ? '0' : '110%')});
  transition: transform 0.3s ease;
`;

const SheetList = styled.div`
  max-height: ${p => (p.$open ? '60vh' : '0')};
  overflow-y: auto;
  transition: max-height 0.3s ease;
`;

const SheetHeader = styled.div`
  display: ${p => (p.$open ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem 0.5rem;
`;

const SheetTitle = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem;
  color: #fdfcfa;
`;

const SheetClose = styled.button`
  background: transparent;
  border: none;
  color: rgba(253, 252, 250, 0.6);
  font-size: 1rem;
  padding: 0.3rem;
  cursor: pointer;
`;

const ThemeRow = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  padding: 0.85rem 1.2rem;
  text-decoration: none;
  border-top: 1px solid rgba(253, 252, 250, 0.08);

  &:active {
    background: rgba(253, 252, 250, 0.06);
  }
`;

const ThemeRowName = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fdfcfa;
`;

const ThemeRowTag = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 300;
  color: rgba(253, 252, 250, 0.5);
  text-align: right;
`;

const BarRow = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.6rem 1rem;
`;

const MainButton = styled.button`
  display: block;
  width: 100%;
  max-width: 420px;
  text-align: center;
  background: #fdfcfa;
  color: #1a1a1a;
  border: none;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.9rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
`;

const StickyDemoBar = () => {
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [open, setOpen] = useState(false);
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

  const visible = scrolledEnough && !contactVisible;

  // Sheet schließen, wenn die Bar verschwindet (z.B. beim Scrollen zum Kontakt)
  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  const handleSelect = (demo) => {
    trackDemoClick(demo.id, demo.url, 'sticky_bar');
    setOpen(false);
  };

  return (
    <Wrapper>
      <Backdrop $open={open} onClick={() => setOpen(false)} />
      <Sheet $visible={visible}>
        <SheetHeader $open={open}>
          <SheetTitle>Welches Design möchtet ihr sehen?</SheetTitle>
          <SheetClose onClick={() => setOpen(false)} aria-label="Auswahl schließen">✕</SheetClose>
        </SheetHeader>
        <SheetList $open={open}>
          {ALL_DEMOS.map(demo => (
            <ThemeRow
              key={demo.id}
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSelect(demo)}
            >
              <ThemeRowName>{demo.name}</ThemeRowName>
              <ThemeRowTag>{TAGLINES[demo.id]}</ThemeRowTag>
            </ThemeRow>
          ))}
        </SheetList>
        <BarRow>
          <MainButton
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-haspopup="true"
          >
            {open ? 'Auswahl schließen' : 'Live-Demo ansehen'}
          </MainButton>
        </BarRow>
      </Sheet>
    </Wrapper>
  );
};

export default StickyDemoBar;
