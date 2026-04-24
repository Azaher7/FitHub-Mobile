export const tokens = {
  colors: {
    background: '#0A0B0F',
    surface: '#11131A',
    surfaceElevated: '#171A24',
    border: '#252A36',
    textPrimary: '#F5F7FF',
    textSecondary: '#A7AFBF',
    textMuted: '#7D8596',
    accent: '#5E7BFF',
    accentSoft: '#202B57',
    success: '#4CD09B',
    warning: '#F0B35A',
    danger: '#F06A6A',
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 20,
    xl: 28,
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
