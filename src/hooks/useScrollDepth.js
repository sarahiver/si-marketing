// src/hooks/useScrollDepth.js
// Misst Scroll-Tiefe und fired GA4-Events bei Meilensteinen (25%, 50%, 75%, 90%)
// Berücksichtigt den A/B-Test-Kontext

import { useEffect, useRef } from 'react';
import { useABTest } from '../context/ABTestContext';
import { useTheme } from '../context/ThemeContext';

const MILESTONES = [25, 50, 75, 90];

const useScrollDepth = () => {
  const { trackScrollDepth, variant } = useABTest();
  const { currentTheme } = useTheme();
  const reached = useRef(new Set());
  const themeRef = useRef(currentTheme);

  // Theme-Ref aktuell halten
  useEffect(() => { themeRef.current = currentTheme; }, [currentTheme]);
  
  // Bei Theme-Wechsel: Meilensteine zurücksetzen
  useEffect(() => { reached.current = new Set(); }, [currentTheme]);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / docHeight) * 100);

      for (const milestone of MILESTONES) {
        if (scrollPercent >= milestone && !reached.current.has(milestone)) {
          reached.current.add(milestone);
          trackScrollDepth(milestone, themeRef.current);
        }
      }
    };

    // Throttle: max einmal alle 200ms
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [trackScrollDepth, variant]);
};

export default useScrollDepth;
