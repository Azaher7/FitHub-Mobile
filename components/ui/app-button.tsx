import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { tokens } from '@/constants/design-tokens';

type AppButtonProps = PropsWithChildren<{
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
}>;

export function AppButton({ children, onPress, variant = 'primary' }: AppButtonProps) {
  const secondary = variant === 'secondary';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        secondary ? styles.secondary : styles.primary,
        pressed && styles.pressed,
      ]}>
      <Text style={[styles.label, secondary ? styles.secondaryLabel : styles.primaryLabel]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    borderRadius: tokens.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.md,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: tokens.colors.accent,
    borderColor: tokens.colors.accent,
  },
  secondary: {
    backgroundColor: tokens.colors.accentSoft,
    borderColor: tokens.colors.border,
  },
  label: {
    fontSize: tokens.typography.body,
    fontWeight: '700',
  },
  primaryLabel: {
    color: tokens.colors.textPrimary,
  },
  secondaryLabel: {
    color: tokens.colors.textSecondary,
  },
  pressed: {
    opacity: 0.9,
  },
});
