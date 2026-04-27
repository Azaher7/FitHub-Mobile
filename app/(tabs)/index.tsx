import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AthleteSuggestionCard } from '@/components/ui/athlete-suggestion-card';
import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { StatCard } from '@/components/ui/stat-card';
import { suggestedAthletes, weeklySummary, workouts } from '@/data/mock';
import { useAuth } from '@/providers/auth-provider';
import { useAppTheme } from '@/providers/theme-provider';

export default function HomeScreen() {
  const { tokens, isDark } = useAppTheme();
  const { profile } = useAuth();
  const lastWorkout = workouts[0];
  const firstName = profile?.first_name?.trim();
  const welcomeText = firstName ? `Welcome back, ${firstName}` : 'Welcome back';

  const styles = StyleSheet.create({
    hero: { gap: 4 },
    eyebrow: { color: tokens.colors.textSecondary, fontSize: 16, fontWeight: '700' },
    title: { color: tokens.colors.textPrimary, fontSize: 28, fontWeight: '800', lineHeight: 34 },
    subtitle: { color: tokens.colors.textSecondary, fontSize: 13, lineHeight: 18 },
    streakPill: {
      marginTop: 2,
      alignSelf: 'flex-start',
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    streakText: { color: tokens.colors.textSecondary, fontSize: 12, fontWeight: '700' },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    quickActions: { flexDirection: 'row', gap: 8 },
    primaryAction: {
      flex: 1,
      minHeight: 38,
      borderRadius: tokens.radius.pill,
      backgroundColor: tokens.colors.accent,
      borderWidth: 1,
      borderColor: tokens.colors.accentHover,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      shadowColor: tokens.colors.accentGlow,
      shadowOpacity: 0.32,
      shadowRadius: 9,
      shadowOffset: { width: 0, height: 5 },
      elevation: 4,
    },
    primaryText: { color: '#F5F7FF', fontWeight: '800', fontSize: 12, zIndex: 1 },
    secondaryAction: {
      flex: 1,
      minHeight: 38,
      borderRadius: tokens.radius.pill,
      backgroundColor: tokens.colors.input,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondaryText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 12 },
    pressedBtn: { transform: [{ scale: 0.98 }], opacity: 0.94 },
    pressedPrimary: { backgroundColor: tokens.colors.accentPressed, borderColor: tokens.colors.accentPressed },
    continueCard: {
      backgroundColor: isDark ? '#101B31' : tokens.colors.surface,
      borderColor: tokens.colors.accent,
      shadowColor: tokens.colors.accentGlow,
      shadowOpacity: isDark ? 0.24 : 0.14,
      shadowRadius: isDark ? 12 : 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: isDark ? 4 : 2,
      gap: 10,
    },
    continueMeta: { color: tokens.colors.textMuted, fontSize: 12 },
    continueTitle: { color: tokens.colors.textPrimary, fontSize: 18, fontWeight: '800' },
    continueFocus: { color: tokens.colors.textSecondary, fontSize: 13 },
    continueRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
    resumeBtn: {
      minHeight: 34,
      borderRadius: tokens.radius.pill,
      paddingHorizontal: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: tokens.colors.accent,
      borderWidth: 1,
      borderColor: tokens.colors.accentHover,
      overflow: 'hidden',
    },
    resumeText: { color: '#F5F7FF', fontSize: 12, fontWeight: '800', zIndex: 1 },
    suggestionsHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 4,
    },
    suggestionsTitle: { color: tokens.colors.textPrimary, fontSize: tokens.typography.h3, fontWeight: '700' },
    inviteText: { color: isDark ? tokens.colors.accent : tokens.colors.accentHover, fontSize: 14, fontWeight: '500' },
    suggestionsSubtitle: { color: tokens.colors.textMuted, fontSize: tokens.typography.caption, marginTop: 4 },
    suggestionsRow: { gap: 10, paddingRight: 8 },
    workoutTitle: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '700' },
    meta: { color: tokens.colors.textSecondary, fontSize: 12, lineHeight: 18 },
  });

  return (
    <View style={{ flex: 1 }}>
      <AppScreen>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{welcomeText}</Text>
          <Text style={styles.title}>Ready for today&apos;s training?</Text>
          <Text style={styles.subtitle}>Let&apos;s keep your momentum and build on last session.</Text>
          <View style={styles.streakPill}><Text style={styles.streakText}>{weeklySummary.streak}-day streak</Text></View>
        </View>

        <SectionHeader title="Weekly Snapshot" subtitle="Your consistency at a glance" />
        <View style={styles.statsGrid}>
          <StatCard label="Workouts this week" value={String(weeklySummary.workoutsThisWeek)} accent="#42A5F5" />
          <StatCard label="Total workouts" value={String(weeklySummary.totalWorkouts)} accent="#1E88E5" />
          <StatCard label="Minutes this week" value={String(weeklySummary.totalMinutes)} accent="#1565C0" />
          <StatCard label="Current streak" value={`${weeklySummary.streak} days`} accent="#42A5F5" />
        </View>

        <Card>
          <SectionHeader title="Quick Actions" />
          <View style={styles.quickActions}>
            <Pressable
              onPress={() => router.push('/start-workout')}
              style={({ pressed }) => [styles.primaryAction, pressed && styles.pressedBtn, pressed && styles.pressedPrimary]}>
              <Text style={styles.primaryText}>Start Workout</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/(tabs)/train')} style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressedBtn]}>
              <Text style={styles.secondaryText}>Log Cardio</Text>
            </Pressable>
          </View>
        </Card>

        <Card style={styles.continueCard}>
          <SectionHeader title="Continue Workout" subtitle="Pick up where you left off" />
          <Text style={styles.continueMeta}>{lastWorkout?.date ?? 'Today'} · {lastWorkout?.duration ?? '--'} · {lastWorkout?.volume ?? '--'}</Text>
          <View style={styles.continueRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.continueTitle}>{lastWorkout?.title ?? 'No active workout yet'}</Text>
              <Text style={styles.continueFocus}>{lastWorkout?.focus ?? 'Start a new session when ready.'}</Text>
            </View>
            <Pressable
              onPress={() => router.push('/start-workout')}
              style={({ pressed }) => [styles.resumeBtn, pressed && styles.pressedBtn, pressed && styles.pressedPrimary]}>
              <Text style={styles.resumeText}>{lastWorkout ? 'Resume' : 'Start'}</Text>
            </Pressable>
          </View>
        </Card>

        <View>
          <View style={styles.suggestionsHeaderRow}>
            <Text style={styles.suggestionsTitle}>Suggested Athletes</Text>
            <Pressable style={({ pressed }) => [pressed && styles.pressedBtn]}>
              <Text style={styles.inviteText}>+ Invite a friend</Text>
            </Pressable>
          </View>
          <Text style={styles.suggestionsSubtitle}>People you may know</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsRow}>
          {suggestedAthletes.map((athlete) => (
            <AthleteSuggestionCard key={athlete.id} athlete={athlete} />
          ))}
        </ScrollView>

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
