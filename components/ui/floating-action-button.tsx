import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/providers/theme-provider';

export function FloatingActionButton() {
  const { tokens } = useAppTheme();

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
      backgroundColor: tokens.colors.success,
      paddingHorizontal: 14,
      shadowColor: tokens.colors.success,
      shadowOpacity: 0.22,
      shadowRadius: 12,
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
