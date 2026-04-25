import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useAppTheme } from '@/providers/theme-provider';

type CardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export function Card({ children, style }: CardProps) {
  const { tokens } = useAppTheme();

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
    },
  });

  return <View style={[styles.card, style]}>{children}</View>;
}
