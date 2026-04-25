import { Link } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { AppScreen } from '@/components/ui/app-screen';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/providers/auth-provider';
import { useAppTheme } from '@/providers/theme-provider';

export default function LoginScreen() {
  const { signIn, loading, error } = useAuth();
  const { tokens } = useAppTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      gap: 12,
    },
    title: { color: tokens.colors.textPrimary, fontSize: 34, fontWeight: '800' },
    subtitle: { color: tokens.colors.textSecondary, marginBottom: 4 },
    label: { color: tokens.colors.textSecondary, fontSize: 13, fontWeight: '600' },
    input: {
      borderWidth: 1,
      borderColor: tokens.colors.borderSubtle,
      backgroundColor: tokens.colors.input,
      borderRadius: tokens.radius.md,
      color: tokens.colors.textPrimary,
      minHeight: 42,
      paddingHorizontal: 12,
      marginBottom: 8,
    },
    error: { color: tokens.colors.danger, fontSize: 12 },
    link: { color: tokens.colors.accent, fontWeight: '600', textAlign: 'center', marginTop: 4 },
  });

  const onSubmit = async () => {
    setLocalError(null);
    if (!email || !password) {
      setLocalError('Email and password are required.');
      return;
    }

    try {
      await signIn(email.trim(), password);
    } catch {
      // handled in provider state
    }
  };

  return (
    <AppScreen scroll={false}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>FitHub</Text>
        <Text style={styles.subtitle}>Log in to continue training.</Text>

        <Card>
          <Text style={styles.label}>Email</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@example.com"
            placeholderTextColor={tokens.colors.textMuted}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={tokens.colors.textMuted}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <AppButton onPress={onSubmit}>{loading ? 'Logging in...' : 'Log In'}</AppButton>
        </Card>

        {loading ? <ActivityIndicator color={tokens.colors.accent} /> : null}
        {localError ? <Text style={styles.error}>{localError}</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Link href="/(auth)/signup" style={styles.link}>
          Don&apos;t have an account? Sign up
        </Link>
      </View>
    </AppScreen>
  );
}
