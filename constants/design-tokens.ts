export const darkTokens = {
  colors: {
    background: '#000000',
    surface: '#070A12',
    surfaceElevated: '#0B1020',
    border: '#1B2638',
    borderSubtle: '#121A29',
    textPrimary: '#F5F7FF',
    textSecondary: '#B2BACB',
    textMuted: '#818A9B',
    accent: '#42A5F5',
    accentHover: '#1E88E5',
    accentPressed: '#1565C0',
    accentGlow: 'rgba(66, 165, 245, 0.24)',
    accentSoft: 'rgba(66, 165, 245, 0.12)',
    success: '#22C55E',
    warning: '#F0B35A',
    danger: '#F06A6A',
    card: '#0A0F1C',
    cardAlt: '#0D1423',
    input: '#101A2C',
    navBackground: '#000000',
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 20,
    pill: 999,
  },
  typography: {
    h1: 28,
    h2: 22,
    h3: 18,
    body: 15,
    caption: 13,
  },
} as const;

export const lightTokens: typeof darkTokens = {
  ...darkTokens,
  colors: {
    background: '#F4F6FB',
    surface: '#FFFFFF',
    surfaceElevated: '#F8FAFF',
    border: '#D9E0EF',
    borderSubtle: '#E4EAF5',
    textPrimary: '#141A27',
    textSecondary: '#42506A',
    textMuted: '#70809E',
    accent: '#42A5F5',
    accentHover: '#1E88E5',
    accentPressed: '#1565C0',
    accentGlow: 'rgba(66, 165, 245, 0.25)',
    accentSoft: 'rgba(66, 165, 245, 0.12)',
    success: '#22C55E',
    warning: '#B9781A',
    danger: '#C43B3B',
    card: '#FFFFFF',
    cardAlt: '#F8FAFF',
    input: '#EEF3FC',
    navBackground: '#FFFFFF',
  },
};

export const tokens = darkTokens;

export type TokenSet = typeof darkTokens;
