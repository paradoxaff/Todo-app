'use client';

import { ThemeProvider as ThemeProviderComponent } from '../../contexts/ThemeContext';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProviderComponent>{children}</ThemeProviderComponent>;
}