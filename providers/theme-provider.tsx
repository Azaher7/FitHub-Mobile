import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { darkTokens, lightTokens, TokenSet } from '@/constants/design-tokens';

type ThemeMode = 'dark' | 'light';

type ThemeContextValue = {
  mode: ThemeMode;
  tokens: TokenSet;
  isDark: boolean;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ThemeMode>('dark');

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark: mode === 'dark',
      tokens: mode === 'dark' ? darkTokens : lightTokens,
      toggleMode: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within AppThemeProvider');
  }

  return context;
}
