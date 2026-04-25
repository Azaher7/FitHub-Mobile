import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

import { tokens } from '@/constants/design-tokens';
import { AuthProvider, useAuth } from '@/providers/auth-provider';

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

function RootNavigator() {
  const { session, loading } = useAuth();

  if (loading && !session) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: tokens.colors.background }}>
        <ActivityIndicator color={tokens.colors.accent} size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {session ? (
        <>
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
        </>
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={appTheme}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
