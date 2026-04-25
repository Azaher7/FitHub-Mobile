import { StyleSheet, Text, View } from 'react-native';

import { tokens } from '@/constants/design-tokens';

type StatCardProps = {
  label: string;
  value: string;
  accent?: string;
};

export function StatCard({ label, value, accent = tokens.colors.accent }: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.accent, { backgroundColor: accent }]} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48.4%',
    borderRadius: tokens.radius.md,
    backgroundColor: '#131722',
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    padding: 12,
    gap: 5,
  },
  accent: {
    width: 22,
    height: 3,
    borderRadius: 999,
  },
  value: {
    color: tokens.colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  label: {
    color: tokens.colors.textSecondary,
    fontSize: 12,
  },
});
