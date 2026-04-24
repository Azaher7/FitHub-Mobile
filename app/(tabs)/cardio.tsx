import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { tokens } from '@/constants/design-tokens';
import { cardioSessions } from '@/data/mock';

export default function CardioScreen() {
  return (
    <AppScreen>
      <SectionHeader title="Cardio" subtitle="Future Strava-style tracking surface" />

      <AppButton>Start Walk / Run</AppButton>

      <Card>
        <Text style={styles.title}>Map Preview</Text>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.muted}>Map & route UI placeholder</Text>
          <Text style={styles.muted}>TODO: integrate GPS + map tiles in Phase 2</Text>
        </View>
      </Card>

      <View style={styles.metricsRow}>
        <Metric label="Distance" value="0.0 mi" />
        <Metric label="Pace" value="--:--" />
        <Metric label="Duration" value="00:00" />
      </View>

      <SectionHeader title="Recent Cardio" />
      {cardioSessions.map((session) => (
        <Card key={session.id}>
          <Text style={styles.title}>{session.type}</Text>
          <Text style={styles.muted}>
            {session.distance} · {session.pace} · {session.duration}
          </Text>
          <Text style={styles.muted}>{session.date}</Text>
        </Card>
      ))}
    </AppScreen>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.muted}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { color: tokens.colors.textPrimary, fontSize: 16, fontWeight: '700' },
  muted: { color: tokens.colors.textSecondary, fontSize: tokens.typography.caption },
  mapPlaceholder: {
    marginTop: 8,
    minHeight: 160,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    backgroundColor: '#0E1118',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  metricsRow: { flexDirection: 'row', gap: 8 },
  metricValue: { color: tokens.colors.textPrimary, fontWeight: '800', fontSize: 18 },
});
