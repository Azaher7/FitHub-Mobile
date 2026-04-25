import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { tokens } from '@/constants/design-tokens';

const defaultExercises = ['Bench Press', 'Romanian Deadlift'];

export default function StartWorkoutScreen() {
  const [exercises, setExercises] = useState<string[]>(defaultExercises);

  return (
    <AppScreen>
      <SectionHeader title="Start Workout" subtitle="Build your session" />

      <Card>
        <Text style={styles.heading}>Workout Name</Text>
        <Text style={styles.value}>Custom Session</Text>
      </Card>

      <Card>
        <Text style={styles.heading}>Exercises</Text>
        {exercises.map((exercise, index) => (
          <View key={exercise} style={styles.exerciseRow}>
            <Text style={styles.value}>{index + 1}. {exercise}</Text>
            <Text style={styles.muted}>3 sets · 8-12 reps</Text>
          </View>
        ))}
        <Pressable
          onPress={() => setExercises((prev) => [...prev, `Exercise ${prev.length + 1}`])}
          style={({ pressed }) => [styles.addExerciseBtn, pressed && styles.pressed]}>
          <Text style={styles.addExerciseText}>+ Add Exercise</Text>
        </Pressable>
      </Card>

      <AppButton>Save Workout (Placeholder)</AppButton>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heading: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '700' },
  value: { color: tokens.colors.textSecondary, marginTop: 4 },
  muted: { color: tokens.colors.textMuted, fontSize: tokens.typography.caption },
  exerciseRow: { gap: 4, paddingVertical: 4 },
  addExerciseBtn: {
    marginTop: 10,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    backgroundColor: '#161D2B',
    paddingVertical: 10,
    alignItems: 'center',
  },
  pressed: { transform: [{ scale: 0.98 }] },
  addExerciseText: { color: tokens.colors.textPrimary, fontWeight: '700' },
});
