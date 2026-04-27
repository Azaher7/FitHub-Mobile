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

export const starterPlans = [
  { id: 'sp1', name: 'Push Day', split: 'Push Pull Legs', exercises: 6 },
  { id: 'sp2', name: 'Pull Day', split: 'Push Pull Legs', exercises: 6 },
  { id: 'sp3', name: 'Lower Strength', split: 'Upper / Lower', exercises: 7 },
] as const;
