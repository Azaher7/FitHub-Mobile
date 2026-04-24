import { router } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { tokens } from '@/constants/design-tokens';
import { weeklySummary, workouts } from '@/data/mock';

export default function HomeScreen() {
  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={styles.kicker}>FIT HUB</Text>
        <Text style={styles.title}>Welcome back.</Text>
        <Text style={styles.subtitle}>You are 1 session away from maintaining your streak.</Text>
      </View>

      <Card>
        <SectionHeader title="Weekly Summary" subtitle="Current week" />
        <View style={styles.grid}>
          <Stat label="Workouts" value={String(weeklySummary.workouts)} />
          <Stat label="Minutes" value={String(weeklySummary.totalMinutes)} />
          <Stat label="Streak" value={`${weeklySummary.streak}d`} />
          <Stat label="Volume" value={weeklySummary.volume} />
        </View>
      </Card>

      <View style={styles.actionRow}>
        <AppButton onPress={() => router.push('/(tabs)/start-workout')}>Start workout</AppButton>
        <AppButton variant="secondary" onPress={() => router.push('/(tabs)/cardio')}>Log cardio</AppButton>
        <AppButton variant="ghost" onPress={() => router.push('/(tabs)/workouts')}>History</AppButton>
      </View>

      <SectionHeader title="Recent Workouts" />
      {workouts.slice(0, 2).map((workout) => (
        <Card key={workout.id}>
          <Text style={styles.cardTitle}>{workout.title}</Text>
          <Text style={styles.meta}>{workout.focus}</Text>
          <Text style={styles.meta}>{workout.date} · {workout.duration} · {workout.volume}</Text>
        </Card>
      ))}

      <Card>
        <SectionHeader title="Progress" subtitle="Charts and PR trends appear in Phase 2" />
      </Card>
    </AppScreen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 4, marginBottom: 2 },
  kicker: { color: tokens.colors.textMuted, fontWeight: '700', letterSpacing: 1.2, fontSize: 12 },
  title: { color: tokens.colors.textPrimary, fontSize: tokens.typography.h1, fontWeight: '800' },
  subtitle: { color: tokens.colors.textSecondary, fontSize: tokens.typography.body, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  stat: {
    width: '48%',
    backgroundColor: '#141823',
    borderRadius: tokens.radius.md,
    padding: 10,
  },
  statValue: { color: tokens.colors.textPrimary, fontSize: 20, fontWeight: '700' },
  statLabel: { color: tokens.colors.textMuted, marginTop: 2, fontSize: 12 },
  actionRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  cardTitle: { color: tokens.colors.textPrimary, fontSize: 17, fontWeight: '700' },
  meta: { color: tokens.colors.textSecondary, fontSize: tokens.typography.caption },
});
