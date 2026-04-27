import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useAppTheme } from '@/providers/theme-provider';

type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  tone?: 'default' | 'accent' | 'ai';
}>;

export function Card({ children, style, tone = 'default' }: CardProps) {
  const { tokens } = useAppTheme();
  const isGlowCard = tone !== 'default';

  const styles = StyleSheet.create({
    card: {
      backgroundColor: tokens.colors.card,
      borderColor: tokens.colors.borderSubtle,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.md,
      gap: 8,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
      overflow: 'hidden',
    },
    glowBorder: {
      borderColor: tone === 'ai' ? 'rgba(129, 121, 255, 0.45)' : 'rgba(88, 184, 255, 0.45)',
    },
    topAccent: {
      position: 'absolute',
      top: -22,
      left: -8,
      width: 164,
      height: 64,
      borderRadius: 999,
      backgroundColor: tone === 'ai' ? 'rgba(112, 93, 255, 0.24)' : 'rgba(64, 192, 255, 0.24)',
      opacity: 0.8,
    },
    cornerAccent: {
      position: 'absolute',
      width: 90,
      height: 90,
      borderRadius: 999,
      right: -35,
      bottom: -44,
      backgroundColor: tone === 'ai' ? 'rgba(105, 67, 255, 0.16)' : 'rgba(33, 212, 255, 0.12)',
    },
  });

  return (
    <View style={[styles.card, isGlowCard && styles.glowBorder, style]}>
      {isGlowCard ? <View pointerEvents="none" style={styles.topAccent} /> : null}
      {isGlowCard ? <View pointerEvents="none" style={styles.cornerAccent} /> : null}
      {children}
    </View>
  );
}
