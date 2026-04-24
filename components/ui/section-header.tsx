import { StyleSheet, Text, View } from 'react-native';

import { tokens } from '@/constants/design-tokens';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  title: {
    color: tokens.colors.textPrimary,
    fontSize: tokens.typography.h3,
    fontWeight: '700',
  },
  subtitle: {
    color: tokens.colors.textMuted,
    fontSize: tokens.typography.caption,
  },
});
