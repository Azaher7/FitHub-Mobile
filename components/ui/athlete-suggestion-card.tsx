import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tokens } from '@/constants/design-tokens';
import { AthleteSuggestion } from '@/data/mock';

type AthleteSuggestionCardProps = {
  athlete: AthleteSuggestion;
};

export function AthleteSuggestionCard({ athlete }: AthleteSuggestionCardProps) {
  return (
    <View style={styles.card}>
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

const styles = StyleSheet.create({
  card: {
    minWidth: 220,
    borderRadius: tokens.radius.lg,
    backgroundColor: '#111926',
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    padding: 12,
    gap: 10,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#273041' },
  name: { color: tokens.colors.textPrimary, fontSize: 15, fontWeight: '700' },
  subtitle: { color: tokens.colors.textSecondary, fontSize: 12 },
  actions: { flexDirection: 'row', gap: 8 },
  followBtn: {
    flex: 1,
    minHeight: 34,
    borderRadius: tokens.radius.pill,
    backgroundColor: '#6BFFB0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  followText: { color: '#07110C', fontWeight: '800', fontSize: 12 },
  viewBtn: {
    flex: 1,
    minHeight: 34,
    borderRadius: tokens.radius.pill,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A2232',
  },
  viewText: { color: tokens.colors.textPrimary, fontWeight: '600', fontSize: 12 },
  pressed: { transform: [{ scale: 0.98 }] },
});
