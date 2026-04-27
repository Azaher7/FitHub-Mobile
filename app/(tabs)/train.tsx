import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { cardioSessions, exerciseLibrary, mockPr, workoutPlans as mockWorkoutPlans, workouts } from '@/data/mock';
import { createWorkoutPlan, fetchWorkoutPlans, WorkoutPlanRow } from '@/lib/supabase-rest';
import { useAuth } from '@/providers/auth-provider';
import { useAppTheme } from '@/providers/theme-provider';

type TrainMode = 'exercise-library' | 'cardio';
type CardioMode = 'timed' | 'gps';
const splitOptions = ['Upper / Lower', 'Push Pull Legs', 'Arnold Split'] as const;

export default function TrainScreen() {
  const { tokens } = useAppTheme();
  const { session } = useAuth();
  const [trainMode, setTrainMode] = useState<TrainMode>('exercise-library');
  const [cardioMode, setCardioMode] = useState<CardioMode>('timed');
  const [isGpsLive, setIsGpsLive] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [showPrToast, setShowPrToast] = useState(false);
  const [plans, setPlans] = useState<WorkoutPlanRow[]>([]);
  const [planLoading, setPlanLoading] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const [selectedSplit, setSelectedSplit] = useState<string>(splitOptions[0]);

  const [customName, setCustomName] = useState('');
  const [customMuscleGroup, setCustomMuscleGroup] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  const selectedExercise = useMemo(
    () => exerciseLibrary.find((exercise) => exercise.id === selectedExerciseId) ?? null,
    [selectedExerciseId],
  );

  useEffect(() => {
    const loadPlans = async () => {
      if (!session) return;

      setPlanLoading(true);
      setPlanError(null);
      try {
        const rows = await fetchWorkoutPlans(session.access_token, session.user.id);
        setPlans(rows);
      } catch (err) {
        setPlanError(err instanceof Error ? err.message : 'Unable to load plans');
      } finally {
        setPlanLoading(false);
      }
    };

    loadPlans();
  }, [session]);

  const onCreatePlan = async () => {
    if (!session) {
      setPlanError('Log in to sync workout plans with Supabase.');
      return;
    }

    setPlanLoading(true);
    setPlanError(null);
    try {
      const created = await createWorkoutPlan(session.access_token, {
        user_id: session.user.id,
        name: `${selectedSplit} Plan`,
        split: selectedSplit,
      });
      setPlans((prev) => [created, ...prev]);
    } catch (err) {
      setPlanError(err instanceof Error ? err.message : 'Unable to create plan');
    } finally {
      setPlanLoading(false);
    }
  };

  const mergedPlans = plans.length > 0 ? plans : mockWorkoutPlans.map((p) => ({ id: p.id, name: p.name, split: p.name }));

  const styles = StyleSheet.create({
    actions: { flexDirection: 'row', gap: 8 },
    pill: {
      flex: 1,
      minHeight: 42,
      borderRadius: tokens.radius.pill,
      backgroundColor: tokens.colors.input,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pillActive: { backgroundColor: tokens.colors.accentSoft, borderColor: tokens.colors.accent },
    pressed: { transform: [{ scale: 0.98 }] },
    pillText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 13 },
    helper: { color: tokens.colors.textMuted, fontSize: 12, marginTop: 6 },
    title: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '700' },
    meta: { color: tokens.colors.textSecondary, fontSize: 12 },
    exerciseRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
    thumb: {
      width: 52,
      height: 52,
      borderRadius: tokens.radius.md,
      backgroundColor: tokens.colors.input,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      alignItems: 'center',
      justifyContent: 'center',
    },
    thumbText: { color: tokens.colors.textMuted, fontSize: 10, fontWeight: '700' },
    rowActions: { flexDirection: 'row', gap: 8, marginTop: 8 },
    actionBtn: {
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      paddingHorizontal: 12,
      paddingVertical: 7,
      backgroundColor: tokens.colors.input,
    },
    actionPrimary: {
      backgroundColor: tokens.colors.accent,
      borderColor: '#1E88E5',
      shadowColor: 'rgba(66, 165, 245, 0.25)',
      shadowOpacity: 0.32,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    actionBtnText: { color: tokens.colors.textSecondary, fontWeight: '700', fontSize: 12 },
    actionPrimaryText: { color: '#F5F7FF' },
    input: {
      minHeight: 42,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      paddingHorizontal: 12,
      color: tokens.colors.textPrimary,
      textAlignVertical: 'top',
    },
    gpsMapPlaceholder: {
      minHeight: 180,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      borderStyle: 'dashed',
      backgroundColor: tokens.colors.input,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
    },
    gpsStats: { flexDirection: 'row', gap: 8 },
    stat: {
      flex: 1,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      padding: 10,
      backgroundColor: tokens.colors.input,
    },
    statLabel: { color: tokens.colors.textMuted, fontSize: 11 },
    statValue: { color: tokens.colors.textPrimary, fontWeight: '700', marginTop: 2 },
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.58)', justifyContent: 'center', padding: 18 },
    modalCard: {
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.surface,
      padding: 16,
      gap: 10,
    },
    largeVisual: {
      minHeight: 160,
      borderRadius: tokens.radius.md,
      backgroundColor: tokens.colors.input,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
    },
    largeVisualText: { color: tokens.colors.textMuted, fontSize: 12 },
    prToast: {
      borderRadius: tokens.radius.md,
      backgroundColor: tokens.colors.accentSoft,
      borderWidth: 1,
      borderColor: tokens.colors.accent,
      padding: 12,
      gap: 2,
    },
    prLabel: { color: tokens.colors.accent, fontWeight: '800', fontSize: 12 },
    prText: { color: tokens.colors.textPrimary, fontSize: 14, fontWeight: '700' },
    splitRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    splitChip: {
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      paddingHorizontal: 12,
      paddingVertical: 7,
      backgroundColor: tokens.colors.input,
    },
    splitChipActive: {
      borderColor: tokens.colors.accent,
      backgroundColor: tokens.colors.accentSoft,
    },
    splitChipText: { color: tokens.colors.textSecondary, fontSize: 12, fontWeight: '600' },
    splitChipTextActive: { color: tokens.colors.accent, fontWeight: '800' },
    error: { color: tokens.colors.danger, fontSize: 12, marginTop: 6 },
  });

  return (
    <View style={{ flex: 1 }}>
      <AppScreen>
        <SectionHeader title="Train" subtitle="Exercise library, cardio flow, and PR moments" />

        <Card>
          <SectionHeader title="Workout Plans" subtitle="Supabase-backed Phase 2 foundation" />
          <View style={styles.splitRow}>
            {splitOptions.map((split) => (
              <Pressable
                key={split}
                onPress={() => setSelectedSplit(split)}
                style={({ pressed }) => [styles.splitChip, selectedSplit === split && styles.splitChipActive, pressed && styles.pressed]}>
                <Text style={[styles.splitChipText, selectedSplit === split && styles.splitChipTextActive]}>{split}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable onPress={onCreatePlan} style={({ pressed }) => [styles.actionBtn, styles.actionPrimary, pressed && styles.pressed]}>
            <Text style={[styles.actionBtnText, styles.actionPrimaryText]}>{planLoading ? 'Saving...' : 'Create Plan'}</Text>
          </Pressable>
          {planLoading ? <Text style={styles.helper}>Syncing plans...</Text> : null}
          {planError ? <Text style={styles.error}>{planError}</Text> : null}
          {mergedPlans.map((plan) => (
            <View key={plan.id}>
              <Text style={styles.title}>{plan.name}</Text>
              <Text style={styles.meta}>{plan.split ?? 'No split set'}</Text>
            </View>
          ))}
        </Card>

        <View style={styles.actions}>
          <ModeChip label="Exercise Library" active={trainMode === 'exercise-library'} onPress={() => setTrainMode('exercise-library')} />
          <ModeChip label="Cardio" active={trainMode === 'cardio'} onPress={() => setTrainMode('cardio')} />
        </View>

        {showPrToast ? (
          <Card>
            <View style={styles.prToast}>
              <Text style={styles.prLabel}>NEW PR</Text>
              <Text style={styles.prText}>{mockPr.exercise}</Text>
              <Text style={styles.meta}>{mockPr.result}</Text>
            </View>
          </Card>
        ) : null}

        {trainMode === 'exercise-library' ? (
          <>
            <SectionHeader title="Exercise Picker" subtitle="Choose movements to add to workouts" />
            {exerciseLibrary.map((exercise) => (
              <Card key={exercise.id}>
                <View style={styles.exerciseRow}>
                  <View style={styles.thumb}><Text style={styles.thumbText}>PREVIEW</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{exercise.name}</Text>
                    <Text style={styles.meta}>{exercise.muscleGroup}</Text>
                  </View>
                </View>
                <View style={styles.rowActions}>
                  <Pressable style={({ pressed }) => [styles.actionBtn, styles.actionPrimary, pressed && styles.pressed]} onPress={() => setShowPrToast(true)}>
                    <Text style={[styles.actionBtnText, styles.actionPrimaryText]}>Add</Text>
                  </Pressable>
                  <Pressable style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]} onPress={() => setSelectedExerciseId(exercise.id)}>
                    <Text style={styles.actionBtnText}>View</Text>
                  </Pressable>
                </View>
              </Card>
            ))}

            <Card>
              <SectionHeader title="Create custom exercise" subtitle="Mock local input only" />
              <TextInput value={customName} onChangeText={setCustomName} placeholder="Exercise name" placeholderTextColor={tokens.colors.textMuted} style={styles.input} />
              <TextInput value={customMuscleGroup} onChangeText={setCustomMuscleGroup} placeholder="Muscle group" placeholderTextColor={tokens.colors.textMuted} style={styles.input} />
              <TextInput
                value={customNotes}
                onChangeText={setCustomNotes}
                placeholder="Notes"
                placeholderTextColor={tokens.colors.textMuted}
                style={[styles.input, { minHeight: 86, paddingTop: 12 }]}
                multiline
              />
              <Pressable style={({ pressed }) => [styles.actionBtn, styles.actionPrimary, pressed && styles.pressed]}>
                <Text style={[styles.actionBtnText, styles.actionPrimaryText]}>Save (Mock)</Text>
              </Pressable>
            </Card>
          </>
        ) : (
          <>
            <SectionHeader title="Cardio Flow" subtitle="Timed sessions now, live GPS tracking later" />
            <View style={styles.actions}>
              <ModeChip label="Timed cardio" active={cardioMode === 'timed'} onPress={() => setCardioMode('timed')} />
              <ModeChip label="Outdoor GPS" active={cardioMode === 'gps'} onPress={() => setCardioMode('gps')} />
            </View>

            {cardioMode === 'timed' ? (
              <Card>
                <Text style={styles.title}>Timed Cardio</Text>
                <Text style={styles.meta}>Start a simple timer-based run, ride, or walk session.</Text>
                <View style={styles.rowActions}>
                  <Pressable style={({ pressed }) => [styles.actionBtn, styles.actionPrimary, pressed && styles.pressed]}>
                    <Text style={[styles.actionBtnText, styles.actionPrimaryText]}>Start Timer</Text>
                  </Pressable>
                </View>
              </Card>
            ) : (
              <Card>
                <Text style={styles.title}>Outdoor GPS Tracking (Coming Soon)</Text>
                <Text style={styles.meta}>UI-only preview. Live location and map tracking will be enabled in a future phase.</Text>
                <View style={styles.gpsMapPlaceholder}>
                  <Text style={styles.largeVisualText}>Map Placeholder</Text>
                  <Text style={styles.helper}>Future live tracking view</Text>
                </View>
                <View style={styles.gpsStats}>
                  <View style={styles.stat}><Text style={styles.statLabel}>Distance</Text><Text style={styles.statValue}>1.84 mi</Text></View>
                  <View style={styles.stat}><Text style={styles.statLabel}>Pace</Text><Text style={styles.statValue}>8:44 /mi</Text></View>
                  <View style={styles.stat}><Text style={styles.statLabel}>Time</Text><Text style={styles.statValue}>16:05</Text></View>
                </View>
                <View style={styles.rowActions}>
                  <Pressable style={({ pressed }) => [styles.actionBtn, styles.actionPrimary, pressed && styles.pressed]} onPress={() => setIsGpsLive(true)}>
                    <Text style={[styles.actionBtnText, styles.actionPrimaryText]}>Start</Text>
                  </Pressable>
                  <Pressable style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]}>
                    <Text style={styles.actionBtnText}>{isGpsLive ? 'Pause' : 'Pause (disabled)'}</Text>
                  </Pressable>
                  <Pressable style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]} onPress={() => setIsGpsLive(false)}>
                    <Text style={styles.actionBtnText}>Stop</Text>
                  </Pressable>
                </View>
              </Card>
            )}

            <SectionHeader title="Cardio History" />
            {cardioSessions.map((c) => (
              <Card key={c.id}>
                <Text style={styles.title}>{c.type}</Text>
                <Text style={styles.meta}>{c.distance} · {c.pace} · {c.duration}</Text>
                <Text style={styles.meta}>{c.date}</Text>
              </Card>
            ))}
          </>
        )}

        <SectionHeader title="Workout History" />
        {workouts.map((w) => (
          <Card key={w.id}>
            <Text style={styles.title}>{w.title}</Text>
            <Text style={styles.meta}>{w.focus}</Text>
            <Text style={styles.meta}>{w.date} · {w.duration} · {w.volume}</Text>
          </Card>
        ))}
      </AppScreen>
      <FloatingActionButton />

      <Modal visible={Boolean(selectedExercise)} transparent animationType="fade" onRequestClose={() => setSelectedExerciseId(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <SectionHeader title={selectedExercise?.name ?? ''} subtitle={selectedExercise?.muscleGroup} />
            <View style={styles.largeVisual}><Text style={styles.largeVisualText}>Animated Demo Placeholder</Text></View>
            <Text style={styles.meta}>Target muscles: {selectedExercise?.targetMuscles}</Text>
            <Text style={styles.meta}>{selectedExercise?.instructions}</Text>
            <View style={styles.rowActions}>
              <Pressable style={({ pressed }) => [styles.actionBtn, styles.actionPrimary, pressed && styles.pressed]} onPress={() => setShowPrToast(true)}>
                <Text style={[styles.actionBtnText, styles.actionPrimaryText]}>Add to Workout</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]} onPress={() => setSelectedExerciseId(null)}>
                <Text style={styles.actionBtnText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

  function ModeChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.pill, active && styles.pillActive, pressed && styles.pressed]}>
        <Text style={styles.pillText}>{label}</Text>
      </Pressable>
    );
  }
}
