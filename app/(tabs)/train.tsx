import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { cardioSessions, workouts } from '@/data/mock';
import { workoutSplits } from '@/data/workout-logging';
import { useAppTheme } from '@/providers/theme-provider';

export default function TrainScreen() {
  const { tokens } = useAppTheme();
  const [selectedSplitId, setSelectedSplitId] = useState(workoutSplits[0]?.id ?? '');
  const selectedSplit = useMemo(() => workoutSplits.find((split) => split.id === selectedSplitId) ?? workoutSplits[0], [selectedSplitId]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(workoutSplits[0]?.workouts[0]?.id ?? '');

  const styles = StyleSheet.create({
    screen: { flex: 1 },
    title: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '800' },
    meta: { color: tokens.colors.textSecondary, fontSize: 12 },
    helper: { color: tokens.colors.textMuted, fontSize: 12, marginTop: 6 },
    splitRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    splitChip: {
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    splitChipActive: { borderColor: tokens.colors.accent, backgroundColor: tokens.colors.accentSoft },
    splitChipText: { color: tokens.colors.textSecondary, fontSize: 11, fontWeight: '700' },
    splitChipTextActive: { color: tokens.colors.accent, fontWeight: '800' },
    workoutCard: {
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      padding: 10,
      gap: 6,
      marginTop: 6,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    workoutCardActive: {
      borderColor: tokens.colors.accent,
      shadowColor: tokens.colors.accentGlow,
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    workoutCardPressed: {
      transform: [{ scale: 0.99 }],
      opacity: 0.95,
    },
    workoutRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    startHint: {
      color: tokens.colors.accent,
      fontSize: 11,
      fontWeight: '800',
    },
    badge: {
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: 'transparent',
      paddingHorizontal: 6,
      paddingVertical: 2,
      alignSelf: 'flex-start',
      opacity: 0.72,
    },
    badgeText: { color: tokens.colors.textMuted, fontSize: 9, fontWeight: '700' },
    actionBtn: {
      minHeight: 38,
      height: 38,
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12,
    },
    actionSecondary: { backgroundColor: tokens.colors.input, borderColor: tokens.colors.borderSubtle },
    actionSecondaryText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 12 },
    pressed: { transform: [{ scale: 0.98 }], opacity: 0.94 },
    row: { flexDirection: 'row', gap: 8 },
    entryCard: {
      flex: 1,
      minHeight: 156,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      padding: 12,
      justifyContent: 'space-between',
    },
    entryBody: { gap: 6 },
  });

  return (
    <View style={styles.screen}>
      <AppScreen>
        <SectionHeader title="Train" subtitle="Select a split, open a workout, and start logging" />

        <Card>
          <SectionHeader title="Workout Splits" subtitle="Your training plans and workout rotation" />
          <View style={styles.splitRow}>
            {workoutSplits.map((split) => (
              <Pressable
                key={split.id}
                onPress={() => {
                  setSelectedSplitId(split.id);
                  setSelectedWorkoutId(split.workouts[0]?.id ?? '');
                }}
                style={({ pressed }) => [styles.splitChip, selectedSplit?.id === split.id && styles.splitChipActive, pressed && styles.pressed]}>
                <Text style={[styles.splitChipText, selectedSplit?.id === split.id && styles.splitChipTextActive]}>{split.name}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.helper}>{selectedSplit?.description}</Text>
        </Card>

        <Card>
          <SectionHeader title={selectedSplit ? `${selectedSplit.name} Workouts` : 'Workouts'} subtitle="Pick your next session in this split" />
          {selectedSplit?.workouts.map((workout) => (
            <Pressable
              key={workout.id}
              onPress={() => {
                setSelectedWorkoutId(workout.id);
                router.push({ pathname: '/start-workout', params: { workout: workout.name, split: selectedSplit.name } });
              }}
              style={({ pressed }) => [styles.workoutCard, selectedWorkoutId === workout.id && styles.workoutCardActive, pressed && styles.workoutCardPressed]}>
              <View style={styles.workoutRow}>
                <Text style={styles.title}>{workout.name}</Text>
                <Text style={styles.startHint}>Start →</Text>
              </View>
              <Text style={styles.meta}>{workout.exercises.length} exercises</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>LOCAL MOCK</Text></View>
            </Pressable>
          ))}
        </Card>

        <Card>
          <SectionHeader title="Quick Entries" subtitle="Exercise and cardio tools" />
          <View style={styles.row}>
            <View style={styles.entryCard}>
              <View style={styles.entryBody}>
                <Text style={styles.title}>Exercise Library</Text>
                <Text style={styles.meta}>Browse and add default or custom exercises.</Text>
              </View>
              <Pressable onPress={() => router.push('/start-workout')} style={({ pressed }) => [styles.actionBtn, styles.actionSecondary, pressed && styles.pressed]}>
                <Text style={styles.actionSecondaryText}>Open Library</Text>
              </Pressable>
            </View>
            <View style={styles.entryCard}>
              <View style={styles.entryBody}>
                <Text style={styles.title}>Cardio Entry</Text>
                <Text style={styles.meta}>Track run/walk/ride sessions (local placeholder).</Text>
              </View>
              <Pressable style={({ pressed }) => [styles.actionBtn, styles.actionSecondary, pressed && styles.pressed]}>
                <Text style={styles.actionSecondaryText}>Log Cardio</Text>
              </Pressable>
            </View>
          </View>
        </Card>

        <SectionHeader title="Recent Workouts" subtitle="Your latest sessions" />
        {workouts.map((workout) => (
          <Card key={workout.id}>
            <Text style={styles.title}>{workout.title}</Text>
            <Text style={styles.meta}>{workout.focus}</Text>
            <Text style={styles.meta}>{workout.date} · {workout.duration} · {workout.volume}</Text>
          </Card>
        ))}

        <SectionHeader title="Recent Cardio" />
        {cardioSessions.map((cardio) => (
          <Card key={cardio.id}>
            <Text style={styles.title}>{cardio.type}</Text>
            <Text style={styles.meta}>{cardio.distance} · {cardio.pace} · {cardio.duration}</Text>
            <Text style={styles.meta}>{cardio.date}</Text>
          </Card>
        ))}
      </AppScreen>
      <FloatingActionButton />
    </View>
  );
}
