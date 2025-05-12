export const EXERCISE_TYPE = {
  STANDARD: 'STANDARD',
  CIRCUIT: 'CIRCUIT',
} as const

export type ExerciseType = keyof typeof EXERCISE_TYPE
