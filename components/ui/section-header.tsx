import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/providers/theme-provider';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const { tokens } = useAppTheme();

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
