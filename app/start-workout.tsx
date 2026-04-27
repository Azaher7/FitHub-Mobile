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

const createSet = (previous?: { weight: string; reps: string }) => ({
  id: `${Date.now()}-${Math.random()}`,
  weight: previous?.weight ?? '',
  reps: previous?.reps ?? '',
  completed: false,
});

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
    lastSetText: { color: tokens.colors.textMuted, fontSize: 11, marginTop: 2 },
    removeExercise: { color: tokens.colors.danger, fontSize: 12, fontWeight: '700' },
    exerciseLogCard: {
      borderRadius: tokens.radius.md,
      padding: 10,
      gap: 6,
    },
    setTableHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 2,
      marginTop: 6,
    },
    setHeaderText: { color: tokens.colors.textMuted, fontSize: 10, fontWeight: '700' },
    setColSet: { width: 42 },
    setColWeight: { width: 82 },
    setColReps: { width: 70 },
    setColCheck: { width: 34, alignItems: 'center' },
    setCard: {
      borderRadius: tokens.radius.sm,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      paddingHorizontal: 6,
      paddingVertical: 5,
    },
    setRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    setRowDone: { opacity: 0.72 },
    setBadge: {
      width: 42,
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
      width: 82,
      textAlign: 'center',
    },
    repsInput: { width: 70 },
    checkToggle: {
      width: 30,
      height: 30,
      borderRadius: tokens.radius.sm,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.colors.surfaceElevated,
    },
    checkToggleDone: { borderColor: tokens.colors.accent, backgroundColor: tokens.colors.accentSoft },
    checkToggleText: { color: tokens.colors.textMuted, fontSize: 13, fontWeight: '800' },
    checkToggleTextDone: { color: tokens.colors.accent },
    setsList: { gap: 8, marginTop: 6 },
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
      backgroundColor: tokens.colors.accent,
      borderColor: tokens.colors.accentHover,
    },
    secondary: { backgroundColor: tokens.colors.input, borderColor: tokens.colors.borderSubtle },
    primaryText: { color: '#F5F7FF', fontWeight: '800', fontSize: 12 },
    secondaryText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 12 },
    disabledBtn: { opacity: 0.5 },
    disabledPrimary: { backgroundColor: tokens.colors.surfaceElevated, borderColor: tokens.colors.borderSubtle },
    disabledPrimaryText: { color: tokens.colors.textMuted },
    addSetTextBtn: { alignSelf: 'flex-start', paddingTop: 2, paddingBottom: 2 },
    addSetText: { color: tokens.colors.accent, fontSize: 12, fontWeight: '600' },
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

  const canFinishWorkout = totalSets > 0;

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
                <Pressable onPress={() => setExercisePickerOpen(true)} style={({ pressed }) => [styles.button, styles.secondary, { flex: 1 }, pressed && styles.pressed]}>
                  <Text style={styles.secondaryText}>+ Add Exercise</Text>
                </Pressable>
              </View>
              <Text style={styles.helper}>{exercises.length} exercises · {totalSets} sets</Text>
            </Card>

            {exercises.map((exercise) => (
              <Card key={exercise.id} style={styles.exerciseLogCard}>
                <View style={styles.exerciseHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.lastSetText}>
                      Last: {exercise.sets.length > 0 ? `${exercise.sets[exercise.sets.length - 1]?.weight || '--'} x ${exercise.sets[exercise.sets.length - 1]?.reps || '--'}` : '-- x --'}
                    </Text>
                  </View>
                  <Pressable onPress={() => setExercises((prev) => prev.filter((item) => item.id !== exercise.id))}><Text style={styles.removeExercise}>Remove</Text></Pressable>
                </View>

                <View style={styles.setTableHeader}>
                  <View style={styles.setColSet}><Text style={styles.setHeaderText}>SET</Text></View>
                  <View style={styles.setColWeight}><Text style={styles.setHeaderText}>WEIGHT</Text></View>
                  <View style={styles.setColReps}><Text style={styles.setHeaderText}>REPS</Text></View>
                  <View style={styles.setColCheck}><Text style={styles.setHeaderText}>CHECK</Text></View>
                </View>

                <View style={styles.setsList}>
                  {exercise.sets.map((set, index) => (
                    <View key={set.id} style={styles.setCard}>
                      <View style={[styles.setRow, set.completed && styles.setRowDone]}>
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
                          style={[styles.checkToggle, set.completed && styles.checkToggleDone]}
                          onPress={() =>
                            setExercises((prev) => prev.map((item) => item.id !== exercise.id ? item : {
                              ...item,
                              sets: item.sets.map((s) => (s.id === set.id ? { ...s, completed: !s.completed } : s)),
                            }))
                          }>
                          <Text style={[styles.checkToggleText, set.completed && styles.checkToggleTextDone]}>✓</Text>
                        </Pressable>
                      </View>
                    </View>
                  ))}
                </View>

                <Pressable
                  onPress={() =>
                    setExercises((prev) => prev.map((item) => {
                      if (item.id !== exercise.id) {
                        return item;
                      }

                      const previousSet = item.sets[item.sets.length - 1];

                      return {
                        ...item,
                        sets: [...item.sets, createSet(previousSet)],
                      };
                    }))
                  }
                  style={({ pressed }) => [styles.addSetTextBtn, pressed && styles.pressed]}>
                  <Text style={styles.addSetText}>+ Add Set</Text>
                </Pressable>
              </Card>
            ))}

            <Card>
              <View style={styles.rowActions}>
                <Pressable
                  onPress={() =>
                    canFinishWorkout && setSummary({
                      workoutName,
                      duration: '53 min',
                      exerciseCount: exercises.length,
                      totalSets,
                      estimatedVolume,
                    })
                  }
                  disabled={!canFinishWorkout}
                  style={({ pressed }) => [
                    styles.button,
                    styles.primary,
                    { flex: 1 },
                    !canFinishWorkout && styles.disabledPrimary,
                    !canFinishWorkout && styles.disabledBtn,
                    pressed && canFinishWorkout && styles.pressed,
                  ]}>
                  <Text style={[styles.primaryText, !canFinishWorkout && styles.disabledPrimaryText]}>Finish Workout</Text>
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
