import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { WorkoutSummaryCard } from '@/components/workout/workout-summary-card';
import { LoggerExercise, workoutPickerExercises } from '@/data/workout-logging';
import { useAppTheme } from '@/providers/theme-provider';

type WorkoutSummary = {
  workoutName: string;
  duration: string;
  exerciseCount: number;
  totalSets: number;
  estimatedVolume: number;
};

const createSet = () => ({ id: `${Date.now()}-${Math.random()}`, weight: '', reps: '', completed: false });

export default function StartWorkoutScreen() {
  const params = useLocalSearchParams<{ workout?: string; split?: string }>();
  const { tokens } = useAppTheme();
  const initialWorkoutName = typeof params.workout === 'string' ? params.workout : 'Custom Session';
  const [workoutName, setWorkoutName] = useState(initialWorkoutName);
  const [exercisePickerOpen, setExercisePickerOpen] = useState(false);
  const [exercises, setExercises] = useState<LoggerExercise[]>([]);
  const [summary, setSummary] = useState<WorkoutSummary | null>(null);

  const styles = StyleSheet.create({
    input: {
      minHeight: 44,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      paddingHorizontal: 12,
      color: tokens.colors.textPrimary,
    },
    helper: { color: tokens.colors.textMuted, fontSize: 12, marginTop: 6 },
    exerciseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
    exerciseName: { color: tokens.colors.textPrimary, fontSize: 15, fontWeight: '800', flex: 1 },
    removeExercise: { color: tokens.colors.danger, fontSize: 12, fontWeight: '700' },
    setCard: {
      marginTop: 6,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      paddingHorizontal: 8,
      paddingVertical: 6,
    },
    setRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    setBadge: {
      minWidth: 30,
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      paddingVertical: 3,
      alignItems: 'center',
    },
    setBadgeText: { color: tokens.colors.textMuted, fontSize: 10, fontWeight: '700' },
    miniInput: {
      minHeight: 34,
      borderRadius: tokens.radius.sm,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.surfaceElevated,
      paddingHorizontal: 8,
      color: tokens.colors.textPrimary,
      width: 78,
    },
    repsInput: { width: 66 },
    completeToggle: {
      width: 30,
      height: 30,
      borderRadius: tokens.radius.sm,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.colors.surfaceElevated,
    },
    completeToggleDone: { backgroundColor: '#22C55E', borderColor: '#22C55E' },
    completeText: { color: tokens.colors.textPrimary, fontSize: 12, fontWeight: '800' },
    completeTextDone: { color: '#07110C' },
    removeSetBtn: {
      minHeight: 30,
      borderRadius: tokens.radius.sm,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      paddingHorizontal: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.colors.surfaceElevated,
    },
    removeSet: { color: tokens.colors.textMuted, fontSize: 10, fontWeight: '700' },
    rowActions: { flexDirection: 'row', gap: 8, marginTop: 8 },
    button: {
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 6,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 36,
    },
    primary: {
      backgroundColor: '#42A5F5',
      borderColor: tokens.colors.accentHover,
      shadowColor: tokens.colors.accentGlow,
      shadowOpacity: 0.32,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    primaryTopGlow: {
      ...StyleSheet.absoluteFillObject,
      top: 0,
      bottom: '52%',
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    primaryBottomShade: {
      ...StyleSheet.absoluteFillObject,
      top: '52%',
      bottom: 0,
      backgroundColor: 'rgba(30, 136, 229, 0.18)',
    },
    secondary: { backgroundColor: tokens.colors.input, borderColor: tokens.colors.borderSubtle },
    primaryText: { color: '#F5F7FF', fontWeight: '800', fontSize: 12, zIndex: 1 },
    secondaryText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 12 },
    compactSecondary: {
      minHeight: 32,
      borderRadius: tokens.radius.sm,
      paddingHorizontal: 10,
      paddingVertical: 4,
      alignSelf: 'flex-start',
    },
    pressed: { transform: [{ scale: 0.98 }], opacity: 0.94 },
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    pickerSheet: {
      borderTopLeftRadius: tokens.radius.lg,
      borderTopRightRadius: tokens.radius.lg,
      backgroundColor: tokens.colors.surface,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      padding: 14,
      gap: 8,
      maxHeight: '72%',
    },
    pickerTitle: { color: tokens.colors.textPrimary, fontWeight: '800', fontSize: 16 },
    pickerItem: {
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      paddingVertical: 11,
      paddingHorizontal: 12,
    },
    pickerItemText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 13 },
  });

  const totalSets = useMemo(() => exercises.reduce((sum, exercise) => sum + exercise.sets.length, 0), [exercises]);

  const estimatedVolume = useMemo(
    () => exercises.reduce((sum, exercise) => sum + exercise.sets.reduce((setSum, set) => setSum + (Number(set.weight) || 0) * (Number(set.reps) || 0), 0), 0),
    [exercises],
  );

  const addExercise = (name: string) => {
    setExercises((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, name, sets: [createSet()] }]);
    setExercisePickerOpen(false);
  };

  return (
    <>
      <AppScreen>
        <SectionHeader title="Start Workout" subtitle="Fast, simple logging" />

        {summary ? (
          <WorkoutSummaryCard
            workoutName={summary.workoutName}
            duration={summary.duration}
            exerciseCount={summary.exerciseCount}
            totalSets={summary.totalSets}
            estimatedVolume={summary.estimatedVolume}
            onDone={() => router.back()}
            onShare={() => {}}
          />
        ) : (
          <>
            <Card>
              <Text style={styles.helper}>Workout name</Text>
              <TextInput value={workoutName} onChangeText={setWorkoutName} style={styles.input} placeholder="Workout name" placeholderTextColor={tokens.colors.textMuted} />
              {typeof params.split === 'string' ? <Text style={styles.helper}>Split: {params.split}</Text> : null}
            </Card>

            <Card>
              <View style={styles.rowActions}>
                <Pressable onPress={() => setExercisePickerOpen(true)} style={({ pressed }) => [styles.button, styles.primary, { flex: 1 }, pressed && styles.pressed]}>
                  <View pointerEvents="none" style={styles.primaryTopGlow} />
                  <View pointerEvents="none" style={styles.primaryBottomShade} />
                  <Text style={styles.primaryText}>Add Exercise</Text>
                </Pressable>
              </View>
              <Text style={styles.helper}>{exercises.length} exercises · {totalSets} sets</Text>
            </Card>

            {exercises.map((exercise) => (
              <Card key={exercise.id}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Pressable onPress={() => setExercises((prev) => prev.filter((item) => item.id !== exercise.id))}>
                    <Text style={styles.removeExercise}>Remove</Text>
                  </Pressable>
                </View>

                {exercise.sets.map((set, index) => (
                  <View key={set.id} style={styles.setCard}>
                    <View style={styles.setRow}>
                      <View style={styles.setBadge}><Text style={styles.setBadgeText}>SET {index + 1}</Text></View>
                      <TextInput
                        style={styles.miniInput}
                        value={set.weight}
                        onChangeText={(value) =>
                          setExercises((prev) => prev.map((item) => item.id !== exercise.id ? item : {
                            ...item,
                            sets: item.sets.map((s) => (s.id === set.id ? { ...s, weight: value } : s)),
                          }))
                        }
                        keyboardType="numeric"
                        placeholder="Weight"
                        placeholderTextColor={tokens.colors.textMuted}
                      />
                      <TextInput
                        style={[styles.miniInput, styles.repsInput]}
                        value={set.reps}
                        onChangeText={(value) =>
                          setExercises((prev) => prev.map((item) => item.id !== exercise.id ? item : {
                            ...item,
                            sets: item.sets.map((s) => (s.id === set.id ? { ...s, reps: value } : s)),
                          }))
                        }
                        keyboardType="numeric"
                        placeholder="Reps"
                        placeholderTextColor={tokens.colors.textMuted}
                      />
                      <Pressable
                        style={[styles.completeToggle, set.completed && styles.completeToggleDone]}
                        onPress={() =>
                          setExercises((prev) => prev.map((item) => item.id !== exercise.id ? item : {
                            ...item,
                            sets: item.sets.map((s) => (s.id === set.id ? { ...s, completed: !s.completed } : s)),
                          }))
                        }>
                        <Text style={[styles.completeText, set.completed && styles.completeTextDone]}>✓</Text>
                      </Pressable>
                      <Pressable
                        style={styles.removeSetBtn}
                        onPress={() =>
                          setExercises((prev) => prev.map((item) => item.id !== exercise.id ? item : {
                            ...item,
                            sets: item.sets.filter((s) => s.id !== set.id),
                          }))
                        }>
                        <Text style={styles.removeSet}>Remove</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}

                <View style={styles.rowActions}>
                  <Pressable
                    onPress={() =>
                      setExercises((prev) => prev.map((item) => item.id !== exercise.id ? item : { ...item, sets: [...item.sets, createSet()] }))
                    }
                    style={({ pressed }) => [styles.button, styles.secondary, styles.compactSecondary, pressed && styles.pressed]}>
                    <Text style={styles.secondaryText}>+ Add Set</Text>
                  </Pressable>
                </View>
              </Card>
            ))}

            <Card>
              <View style={styles.rowActions}>
                <Pressable
                  onPress={() =>
                    setSummary({
                      workoutName,
                      duration: '53 min',
                      exerciseCount: exercises.length,
                      totalSets,
                      estimatedVolume,
                    })
                  }
                  style={({ pressed }) => [styles.button, styles.primary, { flex: 1 }, pressed && styles.pressed]}>
                  <View pointerEvents="none" style={styles.primaryTopGlow} />
                  <View pointerEvents="none" style={styles.primaryBottomShade} />
                  <Text style={styles.primaryText}>Finish Workout</Text>
                </Pressable>
              </View>
            </Card>
          </>
        )}
      </AppScreen>

      <Modal transparent visible={exercisePickerOpen} animationType="slide" onRequestClose={() => setExercisePickerOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.pickerSheet}>
            <Text style={styles.pickerTitle}>Select Exercise</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {workoutPickerExercises.map((exercise) => (
                <Pressable key={exercise} onPress={() => addExercise(exercise)} style={({ pressed }) => [styles.pickerItem, pressed && styles.pressed]}>
                  <Text style={styles.pickerItemText}>{exercise}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable onPress={() => setExercisePickerOpen(false)} style={({ pressed }) => [styles.button, styles.secondary, pressed && styles.pressed]}>
              <Text style={styles.secondaryText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
