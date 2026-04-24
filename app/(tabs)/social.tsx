import { StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { FeedCard } from '@/components/ui/feed-card';
import { FloatingActionButton } from '@/components/ui/floating-action-button';
import { SectionHeader } from '@/components/ui/section-header';
import { tokens } from '@/constants/design-tokens';
import { socialFeed } from '@/data/mock';

export default function SocialScreen() {
  const hasPosts = socialFeed.length > 0;

  return (
    <View style={{ flex: 1 }}>
      <AppScreen>
        <SectionHeader title="Fitness Feed" subtitle="See how your crew is training" />

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
}

const styles = StyleSheet.create({
  emptyTitle: { color: tokens.colors.textPrimary, fontWeight: '700', fontSize: 16 },
  emptyText: { color: tokens.colors.textSecondary, fontSize: 13 },
});
