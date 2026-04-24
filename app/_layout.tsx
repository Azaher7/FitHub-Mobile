import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { tokens } from '@/constants/design-tokens';

const appTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: tokens.colors.background,
    card: tokens.colors.surface,
    border: tokens.colors.border,
    primary: tokens.colors.accent,
    text: tokens.colors.textPrimary,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={appTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="start-workout"
          options={{
            headerShown: true,
            title: 'Start Workout',
            presentation: 'card',
            headerStyle: { backgroundColor: tokens.colors.background },
            headerTintColor: tokens.colors.textPrimary,
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
