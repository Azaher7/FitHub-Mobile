import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AthleteSuggestion } from '@/data/mock';
import { useAppTheme } from '@/providers/theme-provider';

type AthleteSuggestionCardProps = {
  athlete: AthleteSuggestion;
};

export function AthleteSuggestionCard({ athlete }: AthleteSuggestionCardProps) {
  const { tokens } = useAppTheme();

  const styles = StyleSheet.create({
    card: {
      minWidth: 236,
      borderRadius: tokens.radius.lg,
      backgroundColor: tokens.colors.cardAlt,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      padding: 14,
      gap: 12,
      overflow: 'hidden',
    },
    accentBlobTop: {
      position: 'absolute',
      width: 92,
      height: 92,
      borderRadius: 999,
      top: -40,
      right: -34,
      backgroundColor: 'rgba(54, 189, 255, 0.16)',
    },
    accentBlobBottom: {
      position: 'absolute',
      width: 80,
      height: 80,
      borderRadius: 999,
      bottom: -38,
      left: -34,
      backgroundColor: 'rgba(118, 90, 255, 0.12)',
    },
    profileRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: tokens.colors.input },
    name: { color: tokens.colors.textPrimary, fontSize: 15, fontWeight: '700' },
    subtitle: { color: tokens.colors.textSecondary, fontSize: 12, marginTop: 2 },
    actions: { flexDirection: 'row', gap: 8 },
    followBtn: {
      flex: 1,
      minHeight: 34,
      borderRadius: tokens.radius.pill,
      backgroundColor: 'rgba(42, 134, 255, 0.16)',
      borderWidth: 1,
      borderColor: '#63C8FF',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#53B7FF',
      shadowOpacity: 0.24,
      shadowRadius: 7,
      shadowOffset: { width: 0, height: 3 },
    },
    followText: { color: '#B7EBFF', fontWeight: '800', fontSize: 12 },
    viewBtn: {
      flex: 1,
      minHeight: 34,
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.colors.input,
    },
    viewText: { color: tokens.colors.textPrimary, fontWeight: '600', fontSize: 12 },
    pressed: { transform: [{ scale: 0.98 }] },
  });

  return (
    <View style={styles.card}>
      <View pointerEvents="none" style={styles.accentBlobTop} />
      <View pointerEvents="none" style={styles.accentBlobBottom} />
      <View style={styles.profileRow}>
        <View style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{athlete.name}</Text>
          <Text style={styles.subtitle}>{athlete.subtitle}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={({ pressed }) => [styles.followBtn, pressed && styles.pressed]}>
          <Text style={styles.followText}>Follow</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.viewBtn, pressed && styles.pressed]}>
          <Text style={styles.viewText}>View Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}
