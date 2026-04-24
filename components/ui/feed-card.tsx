import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { tokens } from '@/constants/design-tokens';
import { SocialPost } from '@/data/mock';

type FeedCardProps = {
  post: SocialPost;
};

export function FeedCard({ post }: FeedCardProps) {
  const [liked, setLiked] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const onLike = () => {
    setLiked((prev) => !prev);
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.18, useNativeDriver: true, speed: 22, bounciness: 9 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }),
    ]).start();
  };

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.userRow}>
        <View style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{post.user}</Text>
          <Text style={styles.handle}>{post.handle} · {post.timeAgo}</Text>
        </View>
      </View>

      <Text style={styles.completed}>Completed {post.workout}</Text>
      <Text style={styles.body}>{post.text}</Text>
      <Text style={styles.metrics}>{post.duration} · {post.volume}</Text>
      <Text style={styles.exercises}>Exercises: {post.exercises}</Text>

      <View style={styles.actionRow}>
        <Pressable onPress={onLike} style={styles.actionBtn}>
          <Animated.Text style={[styles.actionText, liked && styles.liked, { transform: [{ scale }] }]}>♥ {post.likes + (liked ? 1 : 0)}</Animated.Text>
        </Pressable>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionText}>💬 {post.comments}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#121722',
    borderWidth: 1,
    borderColor: tokens.colors.borderSubtle,
    borderRadius: tokens.radius.lg,
    padding: 14,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  pressed: { transform: [{ scale: 0.99 }], opacity: 0.95 },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#212838' },
  name: { color: tokens.colors.textPrimary, fontWeight: '700' },
  handle: { color: tokens.colors.textMuted, fontSize: 12 },
  completed: { color: '#8FD4FF', fontWeight: '700' },
  body: { color: tokens.colors.textSecondary, lineHeight: 20 },
  metrics: { color: tokens.colors.textPrimary, fontWeight: '600', fontSize: 13 },
  exercises: { color: tokens.colors.textMuted, fontSize: 12 },
  actionRow: { flexDirection: 'row', gap: 10 },
  actionBtn: {
    backgroundColor: '#171D2A',
    borderRadius: tokens.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionText: { color: tokens.colors.textSecondary, fontWeight: '600' },
  liked: { color: '#FF6FA4' },
});
