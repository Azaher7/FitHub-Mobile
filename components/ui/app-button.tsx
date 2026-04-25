import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

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
    },
    primary: {
      backgroundColor: tokens.colors.accent,
      borderColor: tokens.colors.accent,
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
      color: '#062016',
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
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed]}>
      <Text style={[styles.label, styles[`${variant}Label`]]}>{children}</Text>
    </Pressable>
  );
}
