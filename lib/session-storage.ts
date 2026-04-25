import * as FileSystem from 'expo-file-system';

import { AuthSession } from '@/lib/supabase-rest';

const SESSION_FILE = `${FileSystem.documentDirectory ?? ''}fithub-session.json`;

export async function loadStoredSession() {
  try {
    if (!FileSystem.documentDirectory) return null;
    const info = await FileSystem.getInfoAsync(SESSION_FILE);
    if (!info.exists) return null;

    const raw = await FileSystem.readAsStringAsync(SESSION_FILE);
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export async function saveStoredSession(session: AuthSession) {
  if (!FileSystem.documentDirectory) return;
  await FileSystem.writeAsStringAsync(SESSION_FILE, JSON.stringify(session));
}

export async function clearStoredSession() {
  if (!FileSystem.documentDirectory) return;
  const info = await FileSystem.getInfoAsync(SESSION_FILE);
  if (info.exists) {
    await FileSystem.deleteAsync(SESSION_FILE, { idempotent: true });
  }
}
