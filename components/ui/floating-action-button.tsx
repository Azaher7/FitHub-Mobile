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
      borderColor: tokens.colors.accentHover,
      paddingHorizontal: 14,
      overflow: 'hidden',
      shadowColor: tokens.colors.accentGlow,
      shadowOpacity: 0.4,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
    },
    pressed: {
      transform: [{ scale: 0.97 }],
      backgroundColor: tokens.colors.accentPressed,
      borderColor: tokens.colors.accentPressed,
    },
    label: {
      color: '#F5F7FF',
      fontWeight: '800',
      fontSize: 13,
      zIndex: 1,
    },
    icon: { zIndex: 1 },
  });

  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <Pressable
        onPress={() => router.push('/start-workout')}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Ionicons name="add" size={20} color="#F5F7FF" style={styles.icon} />
        <Text style={styles.label}>Start Workout</Text>
      </Pressable>
    </View>
  );
}
