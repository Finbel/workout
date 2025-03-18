import { z } from 'zod'

export const BodyPartEnum = z.enum([
  'chest',
  'shoulders',
  'triceps',
  'back',
  'biceps',
  'legs',
  'glutes',
  'core',
  'fullBody',
])

export const EquipmentEnum = z.enum(['dumbbell', 'bench', 'floor', 'none'])

export const DifficultyEnum = z.enum(['beginner', 'intermediate', 'advanced'])

export const ExerciseTypeEnum = z.enum([
  'strength',
  'hiit',
  'isometric',
  'cardio',
])

export const WorkoutStyleEnum = z.enum([
  'strength', // Heavy weights, lower reps (6-8)
  'hypertrophy', // Moderate weights, higher reps (10-15)
])

// Type inference
export type BodyPart = z.infer<typeof BodyPartEnum>
export type Equipment = z.infer<typeof EquipmentEnum>
export type Difficulty = z.infer<typeof DifficultyEnum>
export type ExerciseType = z.infer<typeof ExerciseTypeEnum>
export type WorkoutStyle = z.infer<typeof WorkoutStyleEnum>
