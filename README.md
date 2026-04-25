# FitHub Mobile (Expo)

## Setup

1. Install dependencies

```bash
npm install
```

2. Create env file

```bash
cp .env.example .env
```

3. Set Supabase values in `.env`

```bash
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

4. Start app

```bash
npm run start
```

## Auth and Supabase notes

- Mobile uses `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
- Do **not** add service role key to the app.
- Current phase includes:
  - Sign up
  - Log in
  - Log out
  - Profile row upsert/fetch (`profiles` table)
  - Workout plan list/create (`workout_plans` table)
