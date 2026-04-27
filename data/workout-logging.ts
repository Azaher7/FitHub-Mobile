export type LoggerSet = {
  id: string;
  weight: string;
  reps: string;
  completed: boolean;
};

export type LoggerExercise = {
  id: string;
  name: string;
  sets: LoggerSet[];
};

export type WorkoutTemplateExercise = {
  id: string;
  name: string;
  source: 'library' | 'custom';
};

export type WorkoutTemplate = {
  id: string;
  name: string;
  exercises: WorkoutTemplateExercise[];
};

export type WorkoutSplit = {
  id: string;
  name: string;
  description: string;
  workouts: WorkoutTemplate[];
};

export const workoutPickerExercises = [
  'Incline Dumbbell Press',
  'Lat Pulldown',
  'Seated Row',
  'Shoulder Press',
  'Lateral Raise',
  'Leg Press',
  'Romanian Deadlift',
  'Leg Curl',
  'Leg Extension',
  'Calf Raise',
  'Barbell Curl',
  'Rope Pushdown',
] as const;

export const workoutSplits: WorkoutSplit[] = [
  {
    id: 'split-upper-lower',
    name: 'Upper / Lower',
    description: 'Balanced strength split alternating upper and lower sessions.',
    workouts: [
      {
        id: 'ul-upper-1',
        name: 'Upper 1',
        exercises: [
          { id: 'u1e1', name: 'Incline Dumbbell Press', source: 'library' },
          { id: 'u1e2', name: 'Seated Row', source: 'library' },
          { id: 'u1e3', name: 'Lateral Raise', source: 'library' },
        ],
      },
      {
        id: 'ul-lower-1',
        name: 'Lower 1',
        exercises: [
          { id: 'l1e1', name: 'Leg Press', source: 'library' },
          { id: 'l1e2', name: 'Romanian Deadlift', source: 'library' },
          { id: 'l1e3', name: 'Calf Raise', source: 'library' },
        ],
      },
      {
        id: 'ul-upper-2',
        name: 'Upper 2',
        exercises: [
          { id: 'u2e1', name: 'Shoulder Press', source: 'library' },
          { id: 'u2e2', name: 'Lat Pulldown', source: 'library' },
          { id: 'u2e3', name: 'Rope Pushdown', source: 'library' },
        ],
      },
      {
        id: 'ul-lower-2',
        name: 'Lower 2',
        exercises: [
          { id: 'l2e1', name: 'Leg Curl', source: 'library' },
          { id: 'l2e2', name: 'Leg Extension', source: 'library' },
          { id: 'l2e3', name: 'Tempo Split Squat', source: 'custom' },
        ],
      },
    ],
  },
  {
    id: 'split-ppl',
    name: 'Push Pull Legs',
    description: 'Classic 3-day structure with focused muscle group days.',
    workouts: [
      {
        id: 'ppl-push',
        name: 'Push',
        exercises: [
          { id: 'ppe1', name: 'Incline Dumbbell Press', source: 'library' },
          { id: 'ppe2', name: 'Shoulder Press', source: 'library' },
          { id: 'ppe3', name: 'Rope Pushdown', source: 'library' },
        ],
      },
      {
        id: 'ppl-pull',
        name: 'Pull',
        exercises: [
          { id: 'pple1', name: 'Lat Pulldown', source: 'library' },
          { id: 'pple2', name: 'Seated Row', source: 'library' },
          { id: 'pple3', name: 'Barbell Curl', source: 'library' },
        ],
      },
      {
        id: 'ppl-legs',
        name: 'Legs',
        exercises: [
          { id: 'pple4', name: 'Leg Press', source: 'library' },
          { id: 'pple5', name: 'Romanian Deadlift', source: 'library' },
          { id: 'pple6', name: 'Leg Curl', source: 'library' },
        ],
      },
    ],
  },
  {
    id: 'split-arnold',
    name: 'Arnold Split',
    description: 'Higher-frequency hypertrophy split with shoulder/arm focus.',
    workouts: [
      {
        id: 'ar-chest-back',
        name: 'Chest + Back',
        exercises: [
          { id: 'are1', name: 'Incline Dumbbell Press', source: 'library' },
          { id: 'are2', name: 'Lat Pulldown', source: 'library' },
          { id: 'are3', name: 'Seated Row', source: 'library' },
        ],
      },
      {
        id: 'ar-shoulders-arms',
        name: 'Shoulders + Arms',
        exercises: [
          { id: 'are4', name: 'Shoulder Press', source: 'library' },
          { id: 'are5', name: 'Lateral Raise', source: 'library' },
          { id: 'are6', name: 'Barbell Curl', source: 'library' },
          { id: 'are7', name: 'Rope Pushdown', source: 'library' },
        ],
      },
      {
        id: 'ar-legs',
        name: 'Legs',
        exercises: [
          { id: 'are8', name: 'Leg Press', source: 'library' },
          { id: 'are9', name: 'Leg Extension', source: 'library' },
          { id: 'are10', name: 'Calf Raise', source: 'library' },
        ],
      },
    ],
  },
];
