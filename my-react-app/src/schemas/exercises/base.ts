import { z } from 'zod'
import { BodyPartEnum, DifficultyEnum, EquipmentEnum } from '../base/enums'
import {
  WeightSchema,
  DurationSchema,
  RepsSchema,
  SetsSchema,
} from '../base/measurements'

// Base Exercise Schema
export const BaseExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  targetMuscles: z.array(BodyPartEnum),
  equipment: z.array(EquipmentEnum),
  difficulty: DifficultyEnum,
  instructions: z.array(z.string()),
})

// Strength Exercise Schema
export const StrengthExerciseSchema = BaseExerciseSchema.extend({
  type: z.literal('strength'),
  recommendedSets: SetsSchema,
  recommendedReps: z.object({
    min: RepsSchema,
    max: RepsSchema,
  }),
  weight: WeightSchema.optional(),
})

// HIIT Exercise Schema
export const HIITExerciseSchema = BaseExerciseSchema.extend({
  type: z.literal('hiit'),
  workDuration: DurationSchema,
  restDuration: DurationSchema,
  rounds: z.number().int().min(1),
})

// Isometric Exercise Schema
export const IsometricExerciseSchema = BaseExerciseSchema.extend({
  type: z.literal('isometric'),
  holdDuration: DurationSchema,
  sets: SetsSchema,
})

// Combined Exercise Schema using tagged union
export const ExerciseSchema = z.discriminatedUnion('type', [
  StrengthExerciseSchema,
  HIITExerciseSchema,
  IsometricExerciseSchema,
])

// Type inference
export type BaseExercise = z.infer<typeof BaseExerciseSchema>
export type StrengthExercise = z.infer<typeof StrengthExerciseSchema>
export type HIITExercise = z.infer<typeof HIITExerciseSchema>
export type IsometricExercise = z.infer<typeof IsometricExerciseSchema>
export type Exercise = z.infer<typeof ExerciseSchema>
