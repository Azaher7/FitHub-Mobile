import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { useAppTheme } from '@/providers/theme-provider';

type WorkoutSummaryCardProps = {
  workoutName: string;
  duration: string;
  exerciseCount: number;
  totalSets: number;
  estimatedVolume: number;
  onDone: () => void;
  onShare: () => void;
};

export function WorkoutSummaryCard({
  workoutName,
  duration,
  exerciseCount,
  totalSets,
  estimatedVolume,
  onDone,
  onShare,
}: WorkoutSummaryCardProps) {
  const { tokens } = useAppTheme();

  const styles = StyleSheet.create({
    title: { color: tokens.colors.textPrimary, fontSize: 18, fontWeight: '800' },
    subtitle: { color: tokens.colors.textSecondary, fontSize: 13 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
    stat: {
      width: '48.4%',
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      padding: 10,
      gap: 2,
    },
    statLabel: { color: tokens.colors.textMuted, fontSize: 11 },
    statValue: { color: tokens.colors.textPrimary, fontWeight: '800', fontSize: 14 },
    actions: { flexDirection: 'row', gap: 8, marginTop: 10 },
    btn: {
      flex: 1,
      minHeight: 40,
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 14,
    },
    primary: {
      backgroundColor: '#42A5F5',
      borderColor: tokens.colors.accentHover,
      shadowColor: tokens.colors.accentGlow,
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    secondary: { backgroundColor: tokens.colors.input, borderColor: tokens.colors.borderSubtle },
    primaryText: { color: '#F5F7FF', fontWeight: '800', fontSize: 12 },
    secondaryText: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 12 },
    pressed: { transform: [{ scale: 0.98 }], opacity: 0.94 },
  });

  return (
    <Card>
      <Text style={styles.title}>Workout Completed</Text>
      <Text style={styles.subtitle}>{workoutName || 'Custom Session'}</Text>

      <View style={styles.grid}>
        <View style={styles.stat}><Text style={styles.statLabel}>Duration</Text><Text style={styles.statValue}>{duration}</Text></View>
        <View style={styles.stat}><Text style={styles.statLabel}>Exercises</Text><Text style={styles.statValue}>{exerciseCount}</Text></View>
        <View style={styles.stat}><Text style={styles.statLabel}>Total sets</Text><Text style={styles.statValue}>{totalSets}</Text></View>
        <View style={styles.stat}><Text style={styles.statLabel}>Est. volume</Text><Text style={styles.statValue}>{estimatedVolume.toLocaleString()} lb</Text></View>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={onDone} style={({ pressed }) => [styles.btn, styles.primary, pressed && styles.pressed]}>
          <Text style={styles.primaryText}>Done</Text>
        </Pressable>
        <Pressable onPress={onShare} style={({ pressed }) => [styles.btn, styles.secondary, pressed && styles.pressed]}>
          <Text style={styles.secondaryText}>Share (Soon)</Text>
        </Pressable>
      </View>
    </Card>
  );
}
