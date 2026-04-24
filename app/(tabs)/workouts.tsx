import { router } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { tokens } from '@/constants/design-tokens';
import { workouts } from '@/data/mock';

export default function WorkoutsScreen() {
  const hasWorkouts = workouts.length > 0;

  return (
    <AppScreen>
      <SectionHeader title="Workout History" subtitle="Session log" />

      {hasWorkouts ? (
        workouts.map((item) => (
          <Card key={item.id}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.focus}</Text>
            <View style={styles.row}>
              <Text style={styles.text}>{item.duration}</Text>
              <Text style={styles.text}>{item.volume}</Text>
              <Text style={styles.text}>{item.date}</Text>
            </View>
          </Card>
        ))
      ) : (
        <Card>
          <Text style={styles.title}>No workouts logged yet</Text>
          <Text style={styles.text}>Start your first workout to begin tracking progress.</Text>
        </Card>
      )}

      <AppButton onPress={() => router.push('/(tabs)/start-workout')}>Start New Workout</AppButton>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '700' },
  text: { color: tokens.colors.textSecondary, fontSize: tokens.typography.caption },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
});
