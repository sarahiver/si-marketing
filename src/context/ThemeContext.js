// src/context/ThemeContext.js
// Theme Context für Marketing - 6 echte Themes aus si-wedding-themes
// Persistiert gewähltes Theme via localStorage über Routen und Sessions hinweg
import React, { createContext, useContext, useState } from 'react';
import { marketingThemes, themeOrder, isDarkTheme } from '../styles/marketingThemes';

const ThemeContext = createContext();

const STORAGE_KEY = 'si-wedding-theme';

// Gespeichertes Theme aus localStorage laden (mit Fallback)
const getSavedTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && marketingThemes[saved]) return saved;
  } catch (e) { /* localStorage nicht verfügbar */ }
  return 'classic';
};

// ============================================
// THEME PROVIDER
// ============================================
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentThemeState] = useState(getSavedTheme);
  const [isLoading, setIsLoading] = useState(false);
  
  // Aktuelles Theme-Objekt
  const theme = marketingThemes[currentTheme] || marketingThemes.classic;
  
  // Theme wechseln mit Loading-Animation + localStorage
  const setCurrentTheme = (newTheme) => {
    if (newTheme === currentTheme) return;
    if (!marketingThemes[newTheme]) return;
    
    setIsLoading(true);
    
    // Smooth scroll nach oben
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Kurze Verzögerung für Loading-Effekt
    setTimeout(() => {
      setCurrentThemeState(newTheme);
      try { localStorage.setItem(STORAGE_KEY, newTheme); } catch (e) {}
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, 400);
  };
  
  // Nächstes Theme im Switcher
  const nextTheme = () => {
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setCurrentTheme(themeOrder[nextIndex]);
  };
  
  // Vorheriges Theme im Switcher
  const prevTheme = () => {
    const currentIndex = themeOrder.indexOf(currentTheme);
    const prevIndex = (currentIndex - 1 + themeOrder.length) % themeOrder.length;
    setCurrentTheme(themeOrder[prevIndex]);
  };
  
  const value = {
    // Current state
    currentTheme,
    theme,
    isLoading,
    isDark: isDarkTheme(currentTheme),
    
    // Actions
    setCurrentTheme,
    switchTheme: setCurrentTheme, // Alias
    nextTheme,
    prevTheme,
    
    // All themes data
    themes: marketingThemes,
    themeOrder,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================
// HOOK
// ============================================
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
