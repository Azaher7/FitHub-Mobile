import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { tokens } from '@/constants/design-tokens';
import { cardioSessions, workoutPlans, workouts } from '@/data/mock';

export default function TrainScreen() {
  return (
    <View style={{ flex: 1 }}>
      <AppScreen>
        <SectionHeader title="Train" subtitle="Workouts, cardio, and plans" />

        <View style={styles.actions}>
          <ActionPill label="Start Workout" onPress={() => router.push('/start-workout')} />
          <ActionPill label="Start Cardio" onPress={() => {}} />
        </View>

        <Card>
          <SectionHeader title="Create New Plan" subtitle="Name your split" />
          <View style={styles.splitRow}>
            <SplitChip label="Upper / Lower" />
            <SplitChip label="Push Pull Legs" />
            <SplitChip label="Arnold Split" />
          </View>
          <Pressable style={({ pressed }) => [styles.createBtn, pressed && styles.pressed]}>
            <Text style={styles.createText}>+ Create Plan</Text>
          </Pressable>
        </Card>

        <SectionHeader title="Workout Plans" />
        {workoutPlans.map((plan) => (
          <Card key={plan.id}>
            <Text style={styles.planName}>{plan.name}</Text>
            {plan.workouts.map((workout) => (
              <View key={workout.id} style={styles.workoutBlock}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                {workout.exercises.map((exercise) => (
                  <Text key={exercise} style={styles.exerciseRow}>• {exercise}</Text>
                ))}
              </View>
            ))}
          </Card>
        ))}

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
    <Pressable onPress={onPress} style={({ pressed }) => [styles.pill, pressed && styles.pressed]}>
      <Text style={styles.pillText}>{label}</Text>
    </Pressable>
  );
}

function SplitChip({ label }: { label: string }) {
  return (
    <View style={styles.splitChip}>
      <Text style={styles.splitChipText}>{label}</Text>
    </View>
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
  pressed: { transform: [{ scale: 0.98 }] },
  pillText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 13 },
  splitRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  splitChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: tokens.radius.pill,
    backgroundColor: '#1A2233',
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
  },
  splitChipText: { color: tokens.colors.textSecondary, fontSize: 12 },
  createBtn: {
    marginTop: 8,
    minHeight: 40,
    borderRadius: tokens.radius.pill,
    backgroundColor: '#6BFFB0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createText: { color: '#07110C', fontWeight: '800' },
  planName: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '700' },
  workoutBlock: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.borderSubtle,
    paddingTop: 8,
    gap: 4,
  },
  workoutName: { color: '#8FD4FF', fontWeight: '700' },
  exerciseRow: { color: tokens.colors.textSecondary, fontSize: 12 },
  title: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '700' },
  meta: { color: tokens.colors.textSecondary, fontSize: 12 },
});
