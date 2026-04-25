import { StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FeedCard } from '@/components/ui/feed-card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { socialFeed } from '@/data/mock';
import { useAppTheme } from '@/providers/theme-provider';

export default function SocialScreen() {
  const hasPosts = socialFeed.length > 0;
  const { tokens } = useAppTheme();

  const styles = StyleSheet.create({
    filterRow: { flexDirection: 'row', gap: 8 },
    chip: {
      borderRadius: tokens.radius.pill,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: tokens.colors.input,
    },
    chipActive: {
      backgroundColor: tokens.colors.accentSoft,
      borderColor: tokens.colors.accent,
    },
    chipText: { color: tokens.colors.textSecondary, fontSize: 12, fontWeight: '600' },
    chipTextActive: { color: tokens.colors.accent, fontWeight: '800' },
    emptyTitle: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 16 },
    emptyText: { color: tokens.colors.textSecondary, fontSize: 13 },
  });

  return (
    <View style={{ flex: 1 }}>
      <AppScreen>
        <SectionHeader title="Fitness Feed" subtitle="Workout and photo updates from athletes" />

        <View style={styles.filterRow}>
          <Chip label="All" active />
          <Chip label="Workouts" />
          <Chip label="Photos" />
        </View>

        {hasPosts ? (
          socialFeed.map((post) => <FeedCard key={post.id} post={post} />)
        ) : (
          <Card>
            <Text style={styles.emptyTitle}>No workouts in your feed yet</Text>
            <Text style={styles.emptyText}>Follow people to see their workouts.</Text>
          </Card>
        )}
      </AppScreen>
      <FloatingActionButton />
    </View>
  );

  function Chip({ label, active = false }: { label: string; active?: boolean }) {
    return (
      <View style={[styles.chip, active && styles.chipActive]}>
        <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
      </View>
    );
  }
}
