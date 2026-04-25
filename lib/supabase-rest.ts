const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY');
}

type RequestOptions = {
  path: string;
  method?: 'GET' | 'POST' | 'PATCH';
  accessToken?: string;
  body?: Record<string, unknown>;
  query?: Record<string, string>;
};

export type AuthUser = {
  id: string;
  email?: string;
};

export type AuthSession = {
  access_token: string;
  refresh_token?: string;
  user: AuthUser;
};

export type ProfileRow = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

export type WorkoutPlanRow = {
  id: string;
  name: string;
  split: string | null;
  created_at?: string;
};

async function supabaseRequest<T>({ path, method = 'GET', accessToken, body, query }: RequestOptions): Promise<T> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase env vars are not configured.');
  }

  const endpoint = new URL(`${supabaseUrl}${path}`);
  Object.entries(query ?? {}).forEach(([key, value]) => endpoint.searchParams.set(key, value));

  const response = await fetch(endpoint.toString(), {
    method,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${accessToken ?? supabaseAnonKey}`,
      'Content-Type': 'application/json',
      ...(method !== 'GET' ? { Prefer: 'return=representation' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      (payload && (payload.msg || payload.message || payload.error_description || payload.error)) ||
      'Request failed';
    throw new Error(message);
  }

  return payload as T;
}

export async function signInWithPassword(email: string, password: string) {
  return supabaseRequest<AuthSession>({
    path: '/auth/v1/token',
    method: 'POST',
    query: { grant_type: 'password' },
    body: { email, password },
  });
}

export async function signUpWithPassword(email: string, password: string) {
  return supabaseRequest<{ session: AuthSession | null; user: AuthUser | null }>({
    path: '/auth/v1/signup',
    method: 'POST',
    body: { email, password },
  });
}

export async function signOutRemote(accessToken: string) {
  return supabaseRequest<{ message: string }>({
    path: '/auth/v1/logout',
    method: 'POST',
    accessToken,
  });
}

export async function fetchProfile(accessToken: string, userId: string) {
  const rows = await supabaseRequest<ProfileRow[]>({
    path: '/rest/v1/profiles',
    accessToken,
    query: {
      select: 'id,username,full_name,avatar_url',
      id: `eq.${userId}`,
      limit: '1',
    },
  });

  return rows[0] ?? null;
}

export async function upsertProfile(accessToken: string, profile: ProfileRow) {
  const rows = await supabaseRequest<ProfileRow[]>({
    path: '/rest/v1/profiles',
    method: 'POST',
    accessToken,
    body: profile,
    query: { on_conflict: 'id' },
  });

  return rows[0] ?? profile;
}

export async function fetchWorkoutPlans(accessToken: string, userId: string) {
  return supabaseRequest<WorkoutPlanRow[]>({
    path: '/rest/v1/workout_plans',
    accessToken,
    query: {
      select: 'id,name,split,created_at',
      user_id: `eq.${userId}`,
      order: 'created_at.desc',
    },
  });
}

export async function createWorkoutPlan(accessToken: string, row: { user_id: string; name: string; split: string }) {
  const rows = await supabaseRequest<WorkoutPlanRow[]>({
    path: '/rest/v1/workout_plans',
    method: 'POST',
    accessToken,
    body: row,
  });

  return rows[0];
}
