import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AthleteSuggestionCard } from '@/components/ui/athlete-suggestion-card';
import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { StatCard } from '@/components/ui/stat-card';
import { suggestedAthletes, weeklySummary, workouts } from '@/data/mock';
import { useAppTheme } from '@/providers/theme-provider';

export default function HomeScreen() {
  const { tokens } = useAppTheme();

  const styles = StyleSheet.create({
    hero: { gap: 6, marginBottom: 4 },
    eyebrow: { color: tokens.colors.textMuted, fontSize: 11, letterSpacing: 1.2, fontWeight: '700' },
    title: { color: tokens.colors.textPrimary, fontSize: 30, fontWeight: '800', lineHeight: 36 },
    subtitle: { color: tokens.colors.textSecondary, fontSize: 14, lineHeight: 19 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    quickActions: { flexDirection: 'row', gap: 8 },
    suggestionsRow: { gap: 10, paddingRight: 8 },
    actionBtn: {
      flex: 1,
      minHeight: 42,
      borderRadius: tokens.radius.pill,
      backgroundColor: tokens.colors.input,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressedBtn: { transform: [{ scale: 0.98 }] },
    actionText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 13 },
    inviteRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
    inviteTitle: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 16 },
    inviteSubtitle: { color: tokens.colors.textSecondary, fontSize: 12, marginTop: 4, lineHeight: 18 },
    inviteBtn: {
      minHeight: 34,
      borderRadius: tokens.radius.pill,
      backgroundColor: tokens.colors.input,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      paddingHorizontal: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inviteBtnText: { color: tokens.colors.textSecondary, fontWeight: '700', fontSize: 12 },
    inviteBadge: {
      alignSelf: 'flex-start',
      borderRadius: tokens.radius.pill,
      backgroundColor: tokens.colors.accentSoft,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    inviteBadgeText: { color: tokens.colors.accent, fontWeight: '700', fontSize: 11 },
    workoutTitle: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '700' },
    meta: { color: tokens.colors.textSecondary, fontSize: 12 },
  });

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

        <SectionHeader title="Suggested Athletes" subtitle="People you may know" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsRow}>
          {suggestedAthletes.map((athlete) => (
            <AthleteSuggestionCard key={athlete.id} athlete={athlete} />
          ))}
        </ScrollView>

        <Card>
          <View style={styles.inviteBadge}><Text style={styles.inviteBadgeText}>Social Boost</Text></View>
          <View style={styles.inviteRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inviteTitle}>Invite a Friend</Text>
              <Text style={styles.inviteSubtitle}>Train together, compare progress, and stay accountable.</Text>
            </View>
            <Pressable style={({ pressed }) => [styles.inviteBtn, pressed && styles.pressedBtn]}>
              <Text style={styles.inviteBtnText}>Send Invite</Text>
            </Pressable>
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

  function QuickAction({ label, onPress }: { label: string; onPress: () => void }) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.actionBtn, pressed && styles.pressedBtn]}>
        <Text style={styles.actionText}>{label}</Text>
      </Pressable>
    );
  }
}
