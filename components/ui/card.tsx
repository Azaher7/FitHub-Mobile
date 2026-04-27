import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useAppTheme } from '@/providers/theme-provider';

type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  tone?: 'default' | 'featured' | 'ai';
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
      borderColor: tone === 'ai' ? 'rgba(86, 196, 255, 0.46)' : 'rgba(88, 184, 255, 0.48)',
      shadowColor: '#48B9FF',
      shadowOpacity: tone === 'featured' ? 0.24 : 0.18,
      shadowRadius: tone === 'featured' ? 14 : 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: tone === 'featured' ? 6 : 4,
    },
    topAccent: {
      position: 'absolute',
      top: -14,
      left: 0,
      width: 190,
      height: 56,
      borderRadius: 999,
      backgroundColor: tone === 'ai' ? 'rgba(76, 209, 255, 0.18)' : 'rgba(64, 192, 255, 0.16)',
      opacity: 0.74,
    },
    bottomAccent: {
      position: 'absolute',
      width: 118,
      height: 44,
      borderRadius: 999,
      right: -36,
      bottom: -18,
      backgroundColor: tone === 'ai' ? 'rgba(56, 188, 255, 0.14)' : 'rgba(33, 212, 255, 0.1)',
    },
  });

  return (
    <View style={[styles.card, isGlowCard && styles.glowBorder, style]}>
      {isGlowCard ? <View pointerEvents="none" style={styles.topAccent} /> : null}
      {isGlowCard ? <View pointerEvents="none" style={styles.bottomAccent} /> : null}
      {children}
    </View>
  );
}
