export type WorkoutEntry = {
  id: string;
  title: string;
  focus: string;
  duration: string;
  date: string;
  volume: string;
};

export type CardioEntry = {
  id: string;
  type: 'Run' | 'Walk' | 'Ride';
  distance: string;
  pace: string;
  duration: string;
  date: string;
};

export type AthleteSuggestion = {
  id: string;
  name: string;
  subtitle: string;
};

export type WorkoutPlan = {
  id: string;
  name: string;
  workouts: {
    id: string;
    name: string;
    exercises: string[];
  }[];
};

export type SocialPost = {
  id: string;
  user: string;
  handle: string;
  type: 'workout' | 'photo';
  text: string;
  workout?: string;
  exercises?: string;
  duration?: string;
  volume?: string;
  likes: number;
  comments: number;
  timeAgo: string;
};

export const weeklySummary = {
  workoutsThisWeek: 4,
  totalWorkouts: 124,
  totalMinutes: 282,
  streak: 6,
};

export const suggestedAthletes: AthleteSuggestion[] = [
  { id: 'a1', name: 'Maya Rivera', subtitle: 'Strength training · 4 mutuals' },
  { id: 'a2', name: 'Chris Nolan', subtitle: 'Hybrid training · 3 mutuals' },
  { id: 'a3', name: 'Noah Kim', subtitle: 'Powerlifting · 2 mutuals' },
];

export const workouts: WorkoutEntry[] = [
  {
    id: 'w1',
    title: 'Upper Body Strength',
    focus: 'Bench / Row / OHP',
    duration: '58 min',
    date: 'Today',
    volume: '9,120 lb',
  },
  {
    id: 'w2',
    title: 'Leg Day Power',
    focus: 'Squat / RDL / Lunges',
    duration: '67 min',
    date: 'Yesterday',
    volume: '12,870 lb',
  },
];

export const cardioSessions: CardioEntry[] = [
  {
    id: 'c1',
    type: 'Run',
    distance: '4.6 mi',
    pace: '8:32 /mi',
    duration: '39:17',
    date: 'Apr 23',
  },
  {
    id: 'c2',
    type: 'Walk',
    distance: '2.2 mi',
    pace: '15:02 /mi',
    duration: '33:08',
    date: 'Apr 22',
  },
];

export const workoutPlans: WorkoutPlan[] = [
  {
    id: 'p1',
    name: 'Push Pull Legs',
    workouts: [
      { id: 'pw1', name: 'Push A', exercises: ['Bench Press', 'OHP', 'Cable Fly'] },
      { id: 'pw2', name: 'Pull A', exercises: ['Deadlift', 'Barbell Row', 'Pulldown'] },
    ],
  },
  {
    id: 'p2',
    name: 'Upper / Lower',
    workouts: [
      { id: 'uw1', name: 'Upper 1', exercises: ['Incline Press', 'Rows', 'Lateral Raise'] },
      { id: 'lw1', name: 'Lower 1', exercises: ['Squat', 'RDL', 'Leg Press'] },
    ],
  },
];

export const socialFeed: SocialPost[] = [
  {
    id: 's1',
    user: 'Maya Rivera',
    handle: '@maya.r',
    type: 'workout',
    text: 'Tempo squats felt strong today. Controlled every rep and pushed the final set.',
    workout: 'Leg Day Power',
    exercises: 'Back Squat, RDL, Walking Lunges',
    duration: '66 min',
    volume: '12,640 lb',
    likes: 42,
    comments: 8,
    timeAgo: '1h',
  },
  {
    id: 's2',
    user: 'Chris Nolan',
    handle: '@cnolanfit',
    type: 'photo',
    text: 'Post-run sunrise hit different today 🌅',
    likes: 67,
    comments: 14,
    timeAgo: '3h',
  },
];
