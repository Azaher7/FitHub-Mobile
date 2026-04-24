import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { tokens } from '@/constants/design-tokens';

export function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.borderSubtle,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: 8,
  },
});
