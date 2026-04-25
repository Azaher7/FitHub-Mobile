import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { SocialPost } from '@/data/mock';
import { useAppTheme } from '@/providers/theme-provider';

type FeedCardProps = {
  post: SocialPost;
};

export function FeedCard({ post }: FeedCardProps) {
  const [liked, setLiked] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const { tokens } = useAppTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: tokens.colors.cardAlt,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      borderRadius: tokens.radius.lg,
      padding: 14,
      gap: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 2,
    },
    pressed: { transform: [{ scale: 0.99 }], opacity: 0.95 },
    userRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: tokens.colors.input },
    name: { color: tokens.colors.textPrimary, fontWeight: '700' },
    handle: { color: tokens.colors.textMuted, fontSize: 12 },
    viewProfileBtn: {
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      borderRadius: tokens.radius.pill,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: tokens.colors.input,
    },
    viewProfileText: { color: tokens.colors.textSecondary, fontWeight: '600', fontSize: 11 },
    completed: { color: tokens.colors.accent, fontWeight: '700' },
    body: { color: tokens.colors.textSecondary, lineHeight: 20 },
    metrics: { color: tokens.colors.textPrimary, fontWeight: '600', fontSize: 13 },
    exercises: { color: tokens.colors.textMuted, fontSize: 12 },
    photoPlaceholder: {
      minHeight: 140,
      borderRadius: tokens.radius.md,
      backgroundColor: tokens.colors.input,
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    photoText: { color: tokens.colors.textMuted, fontSize: 12 },
    actionRow: { flexDirection: 'row', gap: 10 },
    actionBtn: {
      backgroundColor: tokens.colors.input,
      borderRadius: tokens.radius.pill,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    actionText: { color: tokens.colors.textSecondary, fontWeight: '600' },
    liked: { color: '#FF6FA4' },
  });

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
        <Pressable style={styles.viewProfileBtn}>
          <Text style={styles.viewProfileText}>View</Text>
        </Pressable>
      </View>

      {post.type === 'photo' ? (
        <>
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoText}>Photo Post Placeholder</Text>
          </View>
          <Text style={styles.body}>{post.text}</Text>
        </>
      ) : (
        <>
          <Text style={styles.completed}>Completed {post.workout}</Text>
          <Text style={styles.body}>{post.text}</Text>
          <Text style={styles.metrics}>{post.duration} · {post.volume}</Text>
          <Text style={styles.exercises}>Exercises: {post.exercises}</Text>
        </>
      )}

      <View style={styles.actionRow}>
        <Pressable onPress={onLike} style={styles.actionBtn}>
          <Animated.Text style={[styles.actionText, liked && styles.liked, { transform: [{ scale }] }]}>♥ {post.likes + (liked ? 1 : 0)}</Animated.Text>
        </Pressable>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionText}>💬 {post.comments}</Text>
        </Pressable>
        <Pressable style={styles.actionBtn}>
          <Text style={styles.actionText}>↗ Share</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
