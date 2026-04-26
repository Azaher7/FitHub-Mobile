export const darkTokens = {
  colors: {
    background: '#0A0B0F',
    surface: '#12141B',
    surfaceElevated: '#171A24',
    border: '#252A36',
    borderSubtle: '#1A1F2B',
    textPrimary: '#F5F7FF',
    textSecondary: '#B2BACB',
    textMuted: '#818A9B',
    accent: '#42A5F5',
    accentSoft: 'rgba(66, 165, 245, 0.15)',
    success: '#22C55E',
    warning: '#F0B35A',
    danger: '#F06A6A',
    card: '#101720',
    cardAlt: '#111926',
    input: '#1A2232',
    navBackground: '#0D1016',
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
