import { StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { tokens } from '@/constants/design-tokens';
import { socialFeed } from '@/data/mock';

export default function SocialScreen() {
  const hasPosts = socialFeed.length > 0;

  return (
    <AppScreen>
      <SectionHeader title="Social" subtitle="Community feed foundation" />

      {hasPosts ? (
        socialFeed.map((post) => (
          <Card key={post.id}>
            <View style={styles.userRow}>
              <View style={styles.avatar} />
              <View>
                <Text style={styles.name}>{post.user}</Text>
                <Text style={styles.handle}>
                  {post.handle} · {post.timeAgo}
                </Text>
              </View>
            </View>
            <Text style={styles.body}>{post.text}</Text>
            <View style={styles.workoutTag}>
              <Text style={styles.tagText}>{post.workout}</Text>
            </View>
            <View style={styles.actionRow}>
              <Text style={styles.handle}>♥ {post.likes}</Text>
              <Text style={styles.handle}>💬 {post.comments}</Text>
            </View>
          </Card>
        ))
      ) : (
        <Card>
          <Text style={styles.name}>No posts yet</Text>
          <Text style={styles.handle}>Follow athletes to build your feed in Phase 2.</Text>
        </Card>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  userRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: tokens.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  name: { color: tokens.colors.textPrimary, fontWeight: '700' },
  handle: { color: tokens.colors.textMuted, fontSize: tokens.typography.caption },
  body: { color: tokens.colors.textSecondary, lineHeight: 20 },
  workoutTag: {
    alignSelf: 'flex-start',
    backgroundColor: tokens.colors.accentSoft,
    borderRadius: tokens.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: { color: tokens.colors.textSecondary, fontSize: tokens.typography.caption },
  actionRow: { flexDirection: 'row', gap: 16 },
});
