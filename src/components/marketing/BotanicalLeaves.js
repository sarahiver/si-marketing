// src/components/marketing/BotanicalLeaves.js
// Fixierte Blätter für Botanical Theme mit Scroll-Animation
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const LEAVES = [
  'https://res.cloudinary.com/si-weddings/image/upload/w_600,q_auto,f_auto/v1769789868/pngwing.com_6_xo6v3t.png',
  'https://res.cloudinary.com/si-weddings/image/upload/w_600,q_auto,f_auto/v1769789866/pngwing.com_3_tz1fk6.png',
  'https://res.cloudinary.com/si-weddings/image/upload/w_600,q_auto,f_auto/v1769789866/pngwing.com_4_ugo8hl.png',
];

const LeafImage = styled.img`
  position: fixed;
  pointer-events: none;
  filter: brightness(0.7) contrast(1.1) saturate(0.9);
  opacity: 0.85;
  z-index: 1;
  transition: transform 0.3s ease-out, width 0.3s ease-out;
  will-change: transform, width;

  @media (max-width: 768px) {
    display: none;
  }
`;

const BotanicalLeaves = () => {
  const { currentTheme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setMaxScroll(document.documentElement.scrollHeight - window.innerHeight);
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (currentTheme !== 'botanical') return null;

  // Scroll-Fortschritt (0 bis 1)
  const progress = Math.min(scrollY / maxScroll, 1);

  // Sehr sanfte Sinus-Wellen für subtile organische Bewegung
  const wave1 = Math.sin(scrollY * 0.001) * 2;
  const wave2 = Math.sin(scrollY * 0.0008 + 1) * 1.5;
  const wave3 = Math.sin(scrollY * 0.0009 + 2) * 2;

  // Subtile Größenänderung: 100% bis 85%
  const sizeMultiplier = 1 - (progress * 0.15);

  // Responsive Skalierung basierend auf Viewport-Breite
  // Bei 1920px = 100%, bei 768px = 50%
  const viewportScale = Math.max(0.5, Math.min(1, (viewportWidth - 768) / (1920 - 768) * 0.5 + 0.5));

  // Basis-Größen (reduziert)
  const baseTopLeft = 280;
  const baseBottomLeft = 320;
  const baseBottomRight = 350;

  // Top-Left Blatt
  const topLeftStyle = {
    top: '-60px',
    left: '-80px',
    width: `${baseTopLeft * sizeMultiplier * viewportScale}px`,
    transform: `rotate(${135 + wave1}deg)`,
  };

  // Bottom-Left Blatt
  const bottomLeftStyle = {
    bottom: '-80px',
    left: '-100px',
    width: `${baseBottomLeft * sizeMultiplier * viewportScale}px`,
    transform: `rotate(${45 + wave2}deg)`,
  };

  // Bottom-Right Blatt
  const bottomRightStyle = {
    bottom: '-90px',
    right: '-110px',
    width: `${baseBottomRight * sizeMultiplier * viewportScale}px`,
    transform: `rotate(${-45 + wave3}deg) scaleX(-1)`,
  };

  return (
    <>
      <LeafImage src={LEAVES[0]} alt="" style={topLeftStyle} />
      <LeafImage src={LEAVES[1]} alt="" style={bottomLeftStyle} />
      <LeafImage src={LEAVES[2]} alt="" style={bottomRightStyle} />
    </>
  );
};

export default BotanicalLeaves;
