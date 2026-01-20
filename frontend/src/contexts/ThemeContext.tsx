'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Initialize theme after component mounts
    const savedTheme = localStorage.getItem('darkMode');
    let initialDarkMode = false;

    if (savedTheme !== null) {
      initialDarkMode = JSON.parse(savedTheme);
    } else {
      // Check system preference only in the browser
      if (typeof window !== 'undefined' && window.matchMedia) {
        initialDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }

    setDarkMode(initialDarkMode);
    setInitialized(true);

    // Apply the theme class to the document element
    if (typeof document !== 'undefined') {
      if (initialDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  useEffect(() => {
    // Update theme class and save to localStorage when darkMode changes
    if (!initialized) return;

    if (typeof document !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }
  }, [darkMode, initialized]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};