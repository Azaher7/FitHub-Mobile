import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { clearStoredSession, loadStoredSession, saveStoredSession } from '@/lib/session-storage';
import {
  AuthSession,
  ProfileRow,
  fetchProfile,
  signInWithPassword,
  signOutRemote,
  signUpWithPassword,
  upsertProfile,
} from '@/lib/supabase-rest';

type AuthContextValue = {
  session: AuthSession | null;
  profile: ProfileRow | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ensureProfile = useCallback(async (currentSession: AuthSession) => {
    const fallbackName = currentSession.user.email?.split('@')[0] ?? 'athlete';

    await upsertProfile(currentSession.access_token, {
      id: currentSession.user.id,
      username: fallbackName,
      full_name: fallbackName,
      avatar_url: null,
    });

    const row = await fetchProfile(currentSession.access_token, currentSession.user.id);
    setProfile(row);
  }, []);

  useEffect(() => {
    const hydrate = async () => {
      setBooting(true);
      try {
        const restored = await loadStoredSession();
        if (!restored) return;
        setSession(restored);
        await ensureProfile(restored);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to restore session');
      } finally {
        setBooting(false);
      }
    };

    hydrate();
  }, [ensureProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const nextSession = await signInWithPassword(email, password);
      setSession(nextSession);
      await saveStoredSession(nextSession);
      await ensureProfile(nextSession);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [ensureProfile]);

  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signUpWithPassword(email, password);
      if (!result.session) {
        throw new Error('Sign up succeeded. Please verify your email, then log in.');
      }

      setSession(result.session);
      await saveStoredSession(result.session);
      await ensureProfile(result.session);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [ensureProfile]);

  const signOut = useCallback(async () => {
    if (!session?.access_token) {
      setSession(null);
      setProfile(null);
      await clearStoredSession();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await signOutRemote(session.access_token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign out cleanly');
    } finally {
      await clearStoredSession();
      setSession(null);
      setProfile(null);
      setLoading(false);
    }
  }, [session]);

  const refreshProfile = useCallback(async () => {
    if (!session) return;

    setLoading(true);
    setError(null);
    try {
      const row = await fetchProfile(session.access_token, session.user.id);
      setProfile(row);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to refresh profile');
    } finally {
      setLoading(false);
    }
  }, [session]);

  const value = useMemo(
    () => ({ session, profile, loading: loading || booting, error, signIn, signUp, signOut, refreshProfile }),
    [booting, error, loading, profile, refreshProfile, session, signIn, signOut, signUp],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
