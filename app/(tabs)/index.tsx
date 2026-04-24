import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { StatCard } from '@/components/ui/stat-card';
import { tokens } from '@/constants/design-tokens';
import { weeklySummary, workouts } from '@/data/mock';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <AppScreen>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>FITNESS DASHBOARD</Text>
          <Text style={styles.title}>Welcome back, Jordan</Text>
          <Text style={styles.subtitle}>You are on a {weeklySummary.streak}-day streak. Keep the momentum.</Text>
        </View>

        <View style={styles.statsGrid}>
          <StatCard label="Workouts this week" value={String(weeklySummary.workoutsThisWeek)} accent="#6BFFB0" />
          <StatCard label="Total workouts" value={String(weeklySummary.totalWorkouts)} accent="#8FD4FF" />
          <StatCard label="Minutes this week" value={String(weeklySummary.totalMinutes)} accent="#A998FF" />
          <StatCard label="Current streak" value={`${weeklySummary.streak} days`} accent="#FFD985" />
        </View>

        <Card>
          <SectionHeader title="Quick Actions" />
          <View style={styles.quickActions}>
            <QuickAction label="Start Workout" onPress={() => router.push('/start-workout')} />
            <QuickAction label="Log Cardio" onPress={() => router.push('/(tabs)/train')} />
          </View>
        </Card>

        <SectionHeader title="Recent Workouts" subtitle="Latest sessions" />
        {workouts.map((workout) => (
          <Card key={workout.id}>
            <Text style={styles.workoutTitle}>{workout.title}</Text>
            <Text style={styles.meta}>{workout.focus}</Text>
            <Text style={styles.meta}>{workout.date} · {workout.duration} · {workout.volume}</Text>
          </Card>
        ))}
      </AppScreen>
      <FloatingActionButton />
    </View>
  );
}

function QuickAction({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.actionBtn, pressed && styles.pressedBtn]}>
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 6, marginBottom: 4 },
  eyebrow: { color: tokens.colors.textMuted, fontSize: 11, letterSpacing: 1.2, fontWeight: '700' },
  title: { color: tokens.colors.textPrimary, fontSize: 30, fontWeight: '800', lineHeight: 36 },
  subtitle: { color: tokens.colors.textSecondary, fontSize: 14, lineHeight: 19 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickActions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    flex: 1,
    minHeight: 42,
    borderRadius: tokens.radius.pill,
    backgroundColor: '#1A2234',
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedBtn: { transform: [{ scale: 0.98 }] },
  actionText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 13 },
  workoutTitle: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '700' },
  meta: { color: tokens.colors.textSecondary, fontSize: 12 },
});
