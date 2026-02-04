// src/context/ThemeContext.js
// Theme Context für Marketing - 6 echte Themes aus si-wedding-themes
import React, { createContext, useContext, useState } from 'react';
import { marketingThemes, themeOrder, isDarkTheme } from '../styles/marketingThemes';

const ThemeContext = createContext();

// ============================================
// THEME PROVIDER
// ============================================
export const ThemeProvider = ({ children }) => {
  // Default Theme: Editorial
  const [currentTheme, setCurrentThemeState] = useState('editorial');
  const [isLoading, setIsLoading] = useState(false);
  
  // Aktuelles Theme-Objekt
  const theme = marketingThemes[currentTheme] || marketingThemes.editorial;
  
  // Theme wechseln mit Loading-Animation
  const setCurrentTheme = (newTheme) => {
    if (newTheme === currentTheme) return;
    if (!marketingThemes[newTheme]) return;
    
    setIsLoading(true);
    
    // Smooth scroll nach oben
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Kurze Verzögerung für Loading-Effekt
    setTimeout(() => {
      setCurrentThemeState(newTheme);
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
