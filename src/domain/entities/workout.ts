import { z } from 'zod'
import { EXERCISE_TYPE } from '../constants'
import { standardExerciseSchema, circuitExerciseSchema } from './exercise'

// Create Zod schemas
const baseWorkoutSchema = z.object({
  id: z.string(),
  description: z.string(),
})

const standardWorkoutSchema = baseWorkoutSchema.extend({
  type: z.literal(EXERCISE_TYPE.STANDARD),
  exercises: z.array(standardExerciseSchema),
})

const circuitWorkoutSchema = baseWorkoutSchema.extend({
  type: z.literal(EXERCISE_TYPE.CIRCUIT),
  rounds: z.number().int().positive(),
  exercises: z.array(circuitExerciseSchema),
})

// Export the schemas
export const WorkoutSchema = z.discriminatedUnion('type', [
  standardWorkoutSchema,
  circuitWorkoutSchema,
])

// Export the types using z.infer
export type BaseWorkout = z.infer<typeof baseWorkoutSchema>
export type StandardWorkout = z.infer<typeof standardWorkoutSchema>
export type CircuitWorkout = z.infer<typeof circuitWorkoutSchema>
export type Workout = z.infer<typeof WorkoutSchema>

// Factory functions
export const createStandardWorkout = (
  id: string,
  description: string,
  exercises: z.infer<typeof standardExerciseSchema>[],
): StandardWorkout => {
  return {
    id,
    description,
    type: EXERCISE_TYPE.STANDARD,
    exercises,
  }
}

export const createCircuitWorkout = (
  id: string,
  description: string,
  rounds: number,
  exercises: z.infer<typeof circuitExerciseSchema>[],
): CircuitWorkout => {
  return {
    id,
    description,
    type: EXERCISE_TYPE.CIRCUIT,
    rounds,
    exercises,
  }
}

// type guard functions
export const isStandardWorkout = (
  workout: Workout,
): workout is StandardWorkout => {
  return workout.type === EXERCISE_TYPE.STANDARD
}

export const isCircuitWorkout = (
  workout: Workout,
): workout is CircuitWorkout => {
  return workout.type === EXERCISE_TYPE.CIRCUIT
}
