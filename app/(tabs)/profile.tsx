import { StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { StatCard } from '@/components/ui/stat-card';
import { tokens } from '@/constants/design-tokens';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1 }}>
      <AppScreen>
        <Card>
          <View style={styles.headerRow}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.name}>Jordan Miles</Text>
              <Text style={styles.handle}>@jordanmiles</Text>
            </View>
          </View>
        </Card>

        <View style={styles.statsGrid}>
          <StatCard label="Workouts" value="124" accent="#6BFFB0" />
          <StatCard label="Followers" value="0" accent="#8FD4FF" />
        </View>

        <Card>
          <SectionHeader title="Recent Activity" />
          <Text style={styles.item}>• Completed Upper Body Strength</Text>
          <Text style={styles.item}>• Logged 4.6 mi run</Text>
          <Text style={styles.item}>• New deadlift rep PR</Text>
        </Card>
      </AppScreen>
      <FloatingActionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  avatar: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#1E2432' },
  name: { color: tokens.colors.textPrimary, fontSize: 22, fontWeight: '800' },
  handle: { color: tokens.colors.textMuted, fontSize: 13 },
  statsGrid: { flexDirection: 'row', gap: 8 },
  item: { color: tokens.colors.textSecondary },
});
