import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cardioSessions, workouts } from '@/data/mock';
import { workoutSplits } from '@/data/workout-logging';
  const [selectedSplitId, setSelectedSplitId] = useState(workoutSplits[0]?.id ?? '');
  const selectedSplit = useMemo(() => workoutSplits.find((split) => split.id === selectedSplitId) ?? workoutSplits[0], [selectedSplitId]);
    screen: { flex: 1 },
    title: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '800' },
    helper: { color: tokens.colors.textMuted, fontSize: 12, marginTop: 6 },
    splitRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    splitChip: {
      backgroundColor: tokens.colors.input,
    splitChipActive: { borderColor: tokens.colors.accent, backgroundColor: tokens.colors.accentSoft },
    splitChipText: { color: tokens.colors.textSecondary, fontSize: 12, fontWeight: '700' },
    splitChipTextActive: { color: tokens.colors.accent, fontWeight: '800' },
    workoutCard: {
      padding: 10,
      gap: 6,
      marginTop: 6,
    workoutCardPressed: {
      transform: [{ scale: 0.99 }],
      opacity: 0.95,
    },
    workoutRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8,
    startHint: {
      color: tokens.colors.accent,
      fontSize: 11,
      fontWeight: '800',
    badge: {
      borderRadius: tokens.radius.pill,
      backgroundColor: tokens.colors.surfaceElevated,
      paddingHorizontal: 8,
      paddingVertical: 3,
      alignSelf: 'flex-start',
    badgeText: { color: tokens.colors.textMuted, fontSize: 10, fontWeight: '700' },
    actionBtn: {
      minHeight: 42,
      height: 42,
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      paddingHorizontal: 14,
    actionSecondary: { backgroundColor: tokens.colors.surfaceElevated, borderColor: tokens.colors.border },
    actionSecondaryText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 12 },
    pressed: { transform: [{ scale: 0.98 }], opacity: 0.94 },
    row: { flexDirection: 'row', gap: 8 },
    entryCard: {
      flex: 1,
      minHeight: 156,
      padding: 12,
      justifyContent: 'space-between',
    entryBody: { gap: 6 },
    <View style={styles.screen}>
        <SectionHeader title="Train" subtitle="Select a split, open a workout, and start logging" />
          <SectionHeader title="Workout Splits" subtitle="Your training plans and workout rotation" />
            {workoutSplits.map((split) => (
                key={split.id}
                onPress={() => setSelectedSplitId(split.id)}
                style={({ pressed }) => [styles.splitChip, selectedSplit?.id === split.id && styles.splitChipActive, pressed && styles.pressed]}>
                <Text style={[styles.splitChipText, selectedSplit?.id === split.id && styles.splitChipTextActive]}>{split.name}</Text>
          <Text style={styles.helper}>{selectedSplit?.description}</Text>
        <Card>
          <SectionHeader title={selectedSplit ? `${selectedSplit.name} Workouts` : 'Workouts'} subtitle="Pick your next session in this split" />
          {selectedSplit?.workouts.map((workout) => (
            <Pressable
              key={workout.id}
              onPress={() => router.push({ pathname: '/start-workout', params: { workout: workout.name, split: selectedSplit.name } })}
              style={({ pressed }) => [styles.workoutCard, pressed && styles.workoutCardPressed]}>
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
            <View style={styles.entryCard}>
              <View style={styles.entryBody}>
                <Text style={styles.title}>Cardio Entry</Text>
                <Text style={styles.meta}>Track run/walk/ride sessions (local placeholder).</Text>
              </View>
              <Pressable style={({ pressed }) => [styles.actionBtn, styles.actionSecondary, pressed && styles.pressed]}>
                <Text style={styles.actionSecondaryText}>Log Cardio</Text>
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
