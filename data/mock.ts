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
  likes: number;
  comments: number;
  timeAgo: string;
};

export const weeklySummary = {
  workouts: 4,
  totalMinutes: 282,
  streak: 6,
  volume: '31,400 lb',
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
  {
    id: 'w3',
    title: 'Push Hypertrophy',
    focus: 'Chest / Shoulders / Triceps',
    duration: '49 min',
    date: 'Apr 20',
    volume: '8,020 lb',
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
    text: 'Dialed in my tempo squats today. Legs are cooked.',
    workout: 'Leg Day Power',
    likes: 42,
    comments: 8,
    timeAgo: '1h',
  },
  {
    id: 's2',
    user: 'Chris Nolan',
    handle: '@cnolanfit',
    text: 'New 5k PR. Last mile hurt but worth it.',
    workout: 'Morning Run · 5.0 mi',
    likes: 67,
    comments: 14,
    timeAgo: '3h',
  },
];
