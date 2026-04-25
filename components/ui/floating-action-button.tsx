import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tokens } from '@/constants/design-tokens';

export function FloatingActionButton() {
  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <Pressable
        onPress={() => router.push('/start-workout')}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Ionicons name="add" size={20} color="#07110C" />
        <Text style={styles.label}>Start Workout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 18,
    bottom: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 46,
    borderRadius: tokens.radius.pill,
    backgroundColor: '#6BFFB0',
    paddingHorizontal: 14,
    shadowColor: '#6BFFB0',
    shadowOpacity: 0.28,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  label: {
    color: '#07110C',
    fontWeight: '800',
    fontSize: 13,
  },
});
