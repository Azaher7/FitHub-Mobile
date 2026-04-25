import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { tokens } from '@/constants/design-tokens';
import { cardioSessions, workoutPlans as mockWorkoutPlans, workouts } from '@/data/mock';
import { WorkoutPlanRow, createWorkoutPlan, fetchWorkoutPlans } from '@/lib/supabase-rest';
import { useAuth } from '@/providers/auth-provider';

const splitOptions = ['Upper / Lower', 'Push Pull Legs', 'Arnold Split'] as const;

export default function TrainScreen() {
  const { session } = useAuth();
  const [plans, setPlans] = useState<WorkoutPlanRow[]>([]);
  const [selectedSplit, setSelectedSplit] = useState<string>(splitOptions[0]);
  const [planLoading, setPlanLoading] = useState(true);
  const [planError, setPlanError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!session) return;

      setPlanLoading(true);
      setPlanError(null);
      try {
        const rows = await fetchWorkoutPlans(session.access_token, session.user.id);
        setPlans(rows);
      } catch (err) {
        setPlanError(err instanceof Error ? err.message : 'Unable to load workout plans');
      } finally {
        setPlanLoading(false);
      }
    };

    load();
  }, [session]);

  const planList = useMemo(() => {
    if (plans.length > 0) return plans;
    return mockWorkoutPlans.map((plan) => ({ id: plan.id, name: plan.name, split: plan.name }));
  }, [plans]);

  const onCreatePlan = async () => {
    if (!session) return;

    try {
      setPlanError(null);
      const created = await createWorkoutPlan(session.access_token, {
        user_id: session.user.id,
        name: `${selectedSplit} Plan`,
        split: selectedSplit,
      });

      setPlans((prev) => [created, ...prev]);
    } catch (err) {
      setPlanError(err instanceof Error ? err.message : 'Unable to create plan');
    }
  };

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
            {splitOptions.map((split) => (
              <Pressable
                key={split}
                onPress={() => setSelectedSplit(split)}
                style={[styles.splitChip, selectedSplit === split && styles.splitChipActive]}>
                <Text style={[styles.splitChipText, selectedSplit === split && styles.splitChipTextActive]}>{split}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable onPress={onCreatePlan} style={({ pressed }) => [styles.createBtn, pressed && styles.pressed]}>
            <Text style={styles.createText}>+ Create Plan</Text>
          </Pressable>
          {planLoading ? <Text style={styles.helper}>Loading plans...</Text> : null}
          {planError ? <Text style={styles.error}>{planError}</Text> : null}
        </Card>

        <SectionHeader title="Workout Plans" />
        {planList.map((plan) => (
          <Card key={plan.id}>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.helper}>{plan.split ?? 'Split not set'}</Text>
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
  splitChipActive: { backgroundColor: '#6BFFB0', borderColor: '#6BFFB0' },
  splitChipText: { color: tokens.colors.textSecondary, fontSize: 12 },
  splitChipTextActive: { color: '#07110C', fontWeight: '700' },
  createBtn: {
    marginTop: 8,
    minHeight: 40,
    borderRadius: tokens.radius.pill,
    backgroundColor: '#6BFFB0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createText: { color: '#07110C', fontWeight: '800' },
  helper: { color: tokens.colors.textMuted, fontSize: 12, marginTop: 6 },
  error: { color: tokens.colors.danger, fontSize: 12, marginTop: 6 },
  planName: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '700' },
  title: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '700' },
  meta: { color: tokens.colors.textSecondary, fontSize: 12 },
});
