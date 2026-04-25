import { DefaultTheme, DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '@/providers/auth-provider';
import { AppThemeProvider, useAppTheme } from '@/providers/theme-provider';

function RootNavigator() {
  const { session, loading } = useAuth();
  const { tokens } = useAppTheme();

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

function AppNavigationTheme() {
  const { tokens, isDark } = useAppTheme();

  const appTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: tokens.colors.background,
      card: tokens.colors.surface,
      border: tokens.colors.border,
      primary: tokens.colors.accent,
      text: tokens.colors.textPrimary,
    },
  };

  return (
    <ThemeProvider value={appTheme}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AppNavigationTheme />
    </AppThemeProvider>
  );
}
