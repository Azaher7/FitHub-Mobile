import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { tokens } from '@/constants/design-tokens';
import { cardioSessions, workouts } from '@/data/mock';

export default function TrainScreen() {
  return (
    <View style={{ flex: 1 }}>
      <AppScreen>
        <SectionHeader title="Train" subtitle="Workouts and cardio in one place" />

        <View style={styles.actions}>
          <ActionPill label="Start Workout" onPress={() => router.push('/start-workout')} />
          <ActionPill label="Start Cardio" onPress={() => {}} />
        </View>

        <SectionHeader title="Workout History" />
        {workouts.map((w) => (
          <Card key={w.id}>
            <Text style={styles.title}>{w.title}</Text>
            <Text style={styles.meta}>{w.focus}</Text>
            <Text style={styles.meta}>{w.date} · {w.duration} · {w.volume}</Text>
          </Card>
        ))}

        <SectionHeader title="Cardio History" />
        {cardioSessions.map((c) => (
          <Card key={c.id}>
            <Text style={styles.title}>{c.type}</Text>
            <Text style={styles.meta}>{c.distance} · {c.pace} · {c.duration}</Text>
            <Text style={styles.meta}>{c.date}</Text>
          </Card>
        ))}
      </AppScreen>
      <FloatingActionButton />
    </View>
  );
}

function ActionPill({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.pill, pressed && styles.pillPressed]}>
      <Text style={styles.pillText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: 'row', gap: 8 },
  pill: {
    flex: 1,
    minHeight: 42,
    borderRadius: tokens.radius.pill,
    backgroundColor: '#1A2234',
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillPressed: { transform: [{ scale: 0.98 }] },
  pillText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 13 },
  title: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '700' },
  meta: { color: tokens.colors.textSecondary, fontSize: 12 },
});
