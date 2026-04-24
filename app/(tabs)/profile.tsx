import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { tokens } from '@/constants/design-tokens';

export default function ProfileScreen() {
  return (
    <AppScreen>
      <Card>
        <View style={styles.headerRow}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.name}>Jordan Miles</Text>
            <Text style={styles.handle}>@jordanmiles</Text>
          </View>
        </View>
        <AppButton variant="secondary">Edit Profile (Placeholder)</AppButton>
      </Card>

      <Card>
        <SectionHeader title="Stats" />
        <View style={styles.statsRow}>
          <Stat value="124" label="Workouts" />
          <Stat value="19" label="PRs" />
          <Stat value="38" label="Cardio" />
        </View>
      </Card>

      <Card>
        <SectionHeader title="Recent Activity" />
        <Text style={styles.item}>• Completed Upper Body Strength</Text>
        <Text style={styles.item}>• Logged 4.6 mi run</Text>
        <Text style={styles.item}>• Hit new deadlift rep PR</Text>
      </Card>

      <Card>
        <SectionHeader title="Settings" subtitle="Entry point for auth, preferences, privacy" />
        <Text style={styles.handle}>Account, notifications, units, and linked services will live here.</Text>
      </Card>
    </AppScreen>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.handle}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: tokens.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  name: { color: tokens.colors.textPrimary, fontSize: 20, fontWeight: '800' },
  handle: { color: tokens.colors.textMuted, fontSize: tokens.typography.caption },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: {
    flex: 1,
    borderColor: tokens.colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.md,
    padding: 10,
    backgroundColor: tokens.colors.surfaceElevated,
  },
  statValue: { color: tokens.colors.textPrimary, fontSize: 18, fontWeight: '800' },
  item: { color: tokens.colors.textSecondary },
});
