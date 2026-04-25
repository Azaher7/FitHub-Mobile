export const tokens = {
  colors: {
    background: '#0A0B0F',
    surface: '#12141B',
    surfaceElevated: '#171A24',
    border: '#252A36',
    borderSubtle: '#1A1F2B',
    textPrimary: '#F5F7FF',
    textSecondary: '#B2BACB',
    textMuted: '#818A9B',
    accent: '#5E7BFF',
    accentSoft: '#1A2347',
    success: '#4CD09B',
    warning: '#F0B35A',
    danger: '#F06A6A',
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

export type TokenSet = typeof tokens;
