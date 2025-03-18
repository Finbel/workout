// Base schemas
export * from './base/measurements'
export * from './base/enums'

// Exercise schemas
export * from './exercises/base'
export * from './exercises/specific'

// Workout schemas
export * from './workouts/exercise-tuples'
export * from './workouts/workouts'

// Progress Tracking Schema
import { z } from 'zod'
import { RepsSchema, WeightSchema, DurationSchema } from './base/measurements'

export const ExerciseLogSchema = z.object({
  exerciseId: z.string(),
  date: z.date(),
  completed: z.boolean(),
  actualSets: z.array(
    z.object({
      reps: RepsSchema.optional(),
      weight: WeightSchema.optional(),
      duration: DurationSchema.optional(),
      notes: z.string().optional(),
    }),
  ),
})

// Type inference
export type ExerciseLog = z.infer<typeof ExerciseLogSchema>
export type ExerciseLogSet = z.infer<
  typeof ExerciseLogSchema
>['actualSets'][number]
