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
      backgroundColor: '#42A5F5',
      borderWidth: 1,
      borderColor: '#1E88E5',
      paddingHorizontal: 14,
      shadowColor: 'rgba(66, 165, 245, 0.25)',
      shadowOpacity: 0.4,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
    },
    pressed: {
      transform: [{ scale: 0.97 }],
      backgroundColor: '#1565C0',
    },
    label: {
      color: '#F5F7FF',
      fontWeight: '800',
      fontSize: 13,
    },
  });

  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <Pressable
        onPress={() => router.push('/start-workout')}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Ionicons name="add" size={20} color="#F5F7FF" />
        <Text style={styles.label}>Start Workout</Text>
      </Pressable>
    </View>
  );
}
