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
        <Text style={styles.kicker}>FitHub</Text>
        <Text style={styles.title}>Welcome back, athlete.</Text>
        <Text style={styles.subtitle}>Build momentum this week with one focused session at a time.</Text>
      </View>

      <Card>
        <SectionHeader title="Weekly Summary" subtitle="Your training snapshot" />
        <View style={styles.grid}>
          <Stat label="Workouts" value={String(weeklySummary.workouts)} />
          <Stat label="Minutes" value={String(weeklySummary.totalMinutes)} />
          <Stat label="Streak" value={`${weeklySummary.streak} days`} />
          <Stat label="Volume" value={weeklySummary.volume} />
        </View>
      </Card>

      <Card>
        <SectionHeader title="Quick Actions" />
        <View style={styles.actionRow}>
          <AppButton>Start workout</AppButton>
          <AppButton variant="secondary">Log cardio</AppButton>
          <AppButton variant="secondary">View history</AppButton>
        </View>
      </Card>

      <SectionHeader title="Recent Workouts" subtitle="Latest sessions" />
      {workouts.slice(0, 2).map((workout) => (
        <Card key={workout.id}>
          <Text style={styles.cardTitle}>{workout.title}</Text>
          <Text style={styles.meta}>{workout.focus}</Text>
          <Text style={styles.meta}>
            {workout.date} · {workout.duration} · {workout.volume}
          </Text>
        </Card>
      ))}

      <Card>
        <SectionHeader title="Progress" subtitle="Placeholder cards for future charts" />
        <Text style={styles.meta}>Bodyweight trend, PR timeline, and volume graph will plug in here in Phase 2.</Text>
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
  hero: { gap: 8, paddingTop: 4, marginBottom: 4 },
  kicker: { color: tokens.colors.accent, fontWeight: '700', letterSpacing: 0.6 },
  title: { color: tokens.colors.textPrimary, fontSize: tokens.typography.h1, fontWeight: '800' },
  subtitle: { color: tokens.colors.textSecondary, fontSize: tokens.typography.body, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  stat: {
    width: '48%',
    backgroundColor: tokens.colors.surfaceElevated,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.sm,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  statValue: { color: tokens.colors.textPrimary, fontSize: 20, fontWeight: '800' },
  statLabel: { color: tokens.colors.textMuted, marginTop: 4 },
  actionRow: { gap: 8 },
  cardTitle: { color: tokens.colors.textPrimary, fontSize: 17, fontWeight: '700' },
  meta: { color: tokens.colors.textSecondary, fontSize: tokens.typography.caption },
});
