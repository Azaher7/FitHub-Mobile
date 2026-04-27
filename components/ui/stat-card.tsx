import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/providers/theme-provider';

type StatCardProps = {
  label: string;
  value: string;
  accent?: string;
};

export function StatCard({ label, value, accent }: StatCardProps) {
  const { tokens } = useAppTheme();

  const styles = StyleSheet.create({
    card: {
      width: '48.4%',
      borderRadius: tokens.radius.md,
      backgroundColor: tokens.colors.cardAlt,
      borderWidth: 1,
      borderColor: 'rgba(81, 153, 255, 0.34)',
      padding: 12,
      gap: 5,
      overflow: 'hidden',
    },
    glow: {
      position: 'absolute',
      width: 110,
      height: 48,
      borderRadius: 999,
      top: -20,
      right: -22,
      backgroundColor: 'rgba(62, 200, 255, 0.14)',
    },
    bar: {
      width: 22,
      height: 3,
      borderRadius: 999,
      backgroundColor: accent ?? tokens.colors.accent,
    },
    value: {
      color: tokens.colors.textPrimary,
      fontSize: 22,
      fontWeight: '800',
    },
    labelStyle: {
      color: tokens.colors.textSecondary,
      fontSize: 12,
    },
  });

  return (
    <View style={styles.card}>
      <View pointerEvents="none" style={styles.glow} />
      <View style={styles.bar} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.labelStyle}>{label}</Text>
    </View>
  );
}
