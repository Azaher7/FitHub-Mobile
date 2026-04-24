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

export type SocialPost = {
  id: string;
  user: string;
  handle: string;
  text: string;
  workout: string;
  exercises: string;
  duration: string;
  volume: string;
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

export const socialFeed: SocialPost[] = [
  {
    id: 's1',
    user: 'Maya Rivera',
    handle: '@maya.r',
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
    text: 'Push day dialed. Hit a clean top set on bench and finished with high-rep dips.',
    workout: 'Push Day',
    exercises: 'Bench Press, Incline DB Press, Dips',
    duration: '54 min',
    volume: '8,980 lb',
    likes: 67,
    comments: 14,
    timeAgo: '3h',
  },
];
