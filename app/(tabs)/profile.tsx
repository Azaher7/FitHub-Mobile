import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { StatCard } from '@/components/ui/stat-card';
import { tokens } from '@/constants/design-tokens';
import { useAuth } from '@/providers/auth-provider';

export default function ProfileScreen() {
  const { profile, session, signOut, loading, error } = useAuth();
  const displayName = profile?.full_name ?? profile?.username ?? session?.user.email?.split('@')[0] ?? 'Athlete';

  return (
    <View style={{ flex: 1 }}>
      <AppScreen>
        <Card>
          <View style={styles.headerRow}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.handle}>{session?.user.email ?? '@unknown'}</Text>
            </View>
            <AppButton variant="ghost" onPress={signOut}>{loading ? '...' : 'Logout'}</AppButton>
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </Card>

        <View style={styles.statsGrid}>
          <StatCard label="Workouts" value="124" accent="#6BFFB0" />
          <StatCard label="Followers" value="0" accent="#8FD4FF" />
        </View>

        <Card>
          <SectionHeader title="Workout Calendar" subtitle="Monthly consistency view placeholder" />
          <View style={styles.placeholderBox}><Text style={styles.placeholderText}>Calendar Heatmap Placeholder</Text></View>
        </Card>

        <Card>
          <SectionHeader title="Measurements" subtitle="Bodyweight and body metrics" />
          <Text style={styles.item}>Weight: 181 lb</Text>
          <Text style={styles.item}>Body Fat: -- %</Text>
          <Text style={styles.item}>Chest / Waist / Arms: --</Text>
        </Card>

        <Card>
          <SectionHeader title="Progress Pictures" subtitle="Front / Side / Back check-ins" />
          <View style={styles.imageRow}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.imagePlaceholder} />
            <View style={styles.imagePlaceholder} />
          </View>
        </Card>

        <Card>
          <SectionHeader title="Personal Records" />
          <Text style={styles.item}>Bench Press: 245 lb</Text>
          <Text style={styles.item}>Squat: 335 lb</Text>
          <Text style={styles.item}>Deadlift: 405 lb</Text>
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
  error: { color: tokens.colors.danger, fontSize: 12, marginTop: 6 },
  statsGrid: { flexDirection: 'row', gap: 8 },
  placeholderBox: {
    minHeight: 84,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    backgroundColor: '#151d2c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: { color: tokens.colors.textMuted, fontSize: 12 },
  imageRow: { flexDirection: 'row', gap: 8 },
  imagePlaceholder: {
    flex: 1,
    minHeight: 72,
    borderRadius: tokens.radius.md,
    backgroundColor: '#1A2334',
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
  },
  item: { color: tokens.colors.textSecondary, fontSize: 13 },
});
