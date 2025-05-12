import { z } from 'zod'
import { EXERCISE_NAME, INPUT_TYPE, EXERCISE_TYPE } from '../constants'

// Create Zod schemas
export const baseExerciseSchema = z.object({
  name: z.nativeEnum(EXERCISE_NAME),
  id: z.string(),
  description: z.string(),
  expectedInputs: z.array(z.nativeEnum(INPUT_TYPE)),
})

export const standardExerciseSchema = baseExerciseSchema.extend({
  type: z.literal(EXERCISE_TYPE.STANDARD),
  sets: z.number().int().positive(),
})

export const circuitExerciseSchema = baseExerciseSchema.extend({
  type: z.literal(EXERCISE_TYPE.CIRCUIT),
})

// Export the schemas
export const ExerciseSchema = z.discriminatedUnion('type', [
  standardExerciseSchema,
  circuitExerciseSchema,
])

// Export the types using z.infer
export type BaseExercise = z.infer<typeof baseExerciseSchema>
export type StandardExercise = z.infer<typeof standardExerciseSchema>
export type CircuitExercise = z.infer<typeof circuitExerciseSchema>
export type Exercise = z.infer<typeof ExerciseSchema>

// Factory functions
export const createStandardExercise = (
  exercise: BaseExercise,
  sets: number,
): StandardExercise => {
  return {
    ...exercise,
    type: EXERCISE_TYPE.STANDARD,
    sets,
  }
}

export const createCircuitExercise = (
  exercise: BaseExercise,
): CircuitExercise => {
  return {
    ...exercise,
    type: EXERCISE_TYPE.CIRCUIT,
  }
}
