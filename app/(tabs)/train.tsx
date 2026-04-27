import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { cardioSessions, workouts } from '@/data/mock';
import { starterPlans } from '@/data/workout-logging';
import { useAppTheme } from '@/providers/theme-provider';

export default function TrainScreen() {
  const { tokens } = useAppTheme();

  const styles = StyleSheet.create({
    screen: { flex: 1 },
    row: { flexDirection: 'row', gap: 8 },
    title: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '800' },
    meta: { color: tokens.colors.textSecondary, fontSize: 12 },
    helper: { color: tokens.colors.textMuted, fontSize: 12, marginTop: 6 },
    planCard: {
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      padding: 12,
      gap: 3,
      marginTop: 8,
    },
    badge: {
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      borderColor: tokens.colors.accent,
      backgroundColor: tokens.colors.accentSoft,
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignSelf: 'flex-start',
      marginTop: 8,
    },
    badgeText: { color: tokens.colors.accent, fontSize: 11, fontWeight: '800' },
    entryCard: {
      flex: 1,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      padding: 12,
      gap: 6,
    },
    actionBtn: {
      minHeight: 42,
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 14,
    },
    actionPrimary: {
      backgroundColor: '#42A5F5',
      borderColor: tokens.colors.accentHover,
      shadowColor: tokens.colors.accentGlow,
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    actionSecondary: {
      backgroundColor: tokens.colors.input,
      borderColor: tokens.colors.borderSubtle,
    },
    actionPrimaryText: { color: '#F5F7FF', fontWeight: '800', fontSize: 12 },
    actionSecondaryText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 12 },
    pressed: { transform: [{ scale: 0.98 }], opacity: 0.94 },
  });

  return (
    <View style={styles.screen}>
      <AppScreen>
        <SectionHeader title="Train" subtitle="Workout plans, logging, and exercise tools" />

        <Card>
          <SectionHeader title="Start Workout" subtitle="Jump into a new training session" />
          <Pressable onPress={() => router.push('/start-workout')} style={({ pressed }) => [styles.actionBtn, styles.actionPrimary, pressed && styles.pressed]}>
            <Text style={styles.actionPrimaryText}>Start Workout</Text>
          </Pressable>
          <Text style={styles.helper}>Log sets, reps, and weight with one streamlined flow.</Text>
        </Card>

        <Card>
          <SectionHeader title="Workout Plans" subtitle="Pick a structure and train with intent" />
          {starterPlans.map((plan) => (
            <View key={plan.id} style={styles.planCard}>
              <Text style={styles.title}>{plan.name}</Text>
              <Text style={styles.meta}>{plan.split}</Text>
              <Text style={styles.meta}>{plan.exercises} exercises</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>LOCAL MOCK</Text></View>
            </View>
          ))}
        </Card>

        <Card>
          <SectionHeader title="Quick Entries" subtitle="Start from the section you need" />
          <View style={styles.row}>
            <View style={styles.entryCard}>
              <Text style={styles.title}>Exercise Library</Text>
              <Text style={styles.meta}>Browse movements and add them to active workouts.</Text>
              <Pressable onPress={() => router.push('/start-workout')} style={({ pressed }) => [styles.actionBtn, styles.actionSecondary, pressed && styles.pressed]}>
                <Text style={styles.actionSecondaryText}>Open Library</Text>
              </Pressable>
            </View>
            <View style={styles.entryCard}>
              <Text style={styles.title}>Cardio Entry</Text>
              <Text style={styles.meta}>Track a run, walk, or ride (placeholder flow).</Text>
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
