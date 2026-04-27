import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/providers/theme-provider';

type AppButtonProps = PropsWithChildren<{
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}>;

export function AppButton({ children, onPress, variant = 'primary' }: AppButtonProps) {
  const { tokens } = useAppTheme();

  const styles = StyleSheet.create({
    base: {
      minHeight: 40,
      borderRadius: tokens.radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      borderWidth: 1,
      overflow: 'hidden',
    },
    primary: {
      backgroundColor: '#329EFF',
      borderColor: '#56C3FF',
      shadowColor: tokens.colors.accentGlow,
      shadowOpacity: 0.4,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 7 },
      elevation: 5,
    },
    primaryUnderGlow: {
      position: 'absolute',
      width: '78%',
      height: 10,
      borderRadius: 999,
      bottom: -6,
      backgroundColor: 'rgba(66, 177, 255, 0.38)',
    },
    primaryTopGlow: {
      ...StyleSheet.absoluteFillObject,
      top: 0,
      bottom: '52%',
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    primaryBottomShade: {
      ...StyleSheet.absoluteFillObject,
      top: '52%',
      bottom: 0,
      backgroundColor: 'rgba(99, 84, 255, 0.2)',
    },
    secondary: {
      backgroundColor: tokens.colors.surfaceElevated,
      borderColor: tokens.colors.borderSubtle,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: tokens.colors.borderSubtle,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
    },
    primaryLabel: {
      color: '#F5F7FF',
      zIndex: 1,
    },
    secondaryLabel: {
      color: tokens.colors.textPrimary,
    },
    ghostLabel: {
      color: tokens.colors.textSecondary,
    },
    pressed: {
      opacity: 0.82,
    },
    pressedPrimary: {
      backgroundColor: tokens.colors.accentPressed,
      borderColor: tokens.colors.accentPressed,
    },
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, pressed && variant === 'primary' && styles.pressedPrimary]}>
      {variant === 'primary' ? <View pointerEvents="none" style={styles.primaryUnderGlow} /> : null}
      {variant === 'primary' ? <View pointerEvents="none" style={styles.primaryTopGlow} /> : null}
      {variant === 'primary' ? <View pointerEvents="none" style={styles.primaryBottomShade} /> : null}
      <Text style={[styles.label, styles[`${variant}Label`]]}>{children}</Text>
    </Pressable>
  );
}
