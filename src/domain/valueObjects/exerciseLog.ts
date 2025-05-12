import { z } from 'zod'
import {
  EXERCISE_NAME,
  EXERCISE_TYPE,
  ExerciseName,
  ExerciseType,
} from '../constants'
import { InputLog, InputLogSchema } from './inputLog'
import { SelfAssessment, SelfAssessmentSchema } from './selfAssessment'

// Exercise Log
export const baseExerciseLogSchema = z.object({
  input: z.array(InputLogSchema),
  duration: z.number(),
  restDuration: z.number(), // Rest duration in seconds, varies per exercise
  timestamp: z.number(),
  exerciseName: z.enum(Object.values(EXERCISE_NAME) as [string, ...string[]]),
  assessment: SelfAssessmentSchema,
})

export const standardExerciseLogSchema = baseExerciseLogSchema.extend({
  type: z.literal(EXERCISE_TYPE.STANDARD),
  setIndex: z.number(),
})

export const circuitExerciseLogSchema = baseExerciseLogSchema.extend({
  type: z.literal(EXERCISE_TYPE.CIRCUIT),
})

// Export the schema
export const ExerciseLogSchema = z.discriminatedUnion('type', [
  standardExerciseLogSchema,
  circuitExerciseLogSchema,
])

// Export the types using z.infer
export type BaseExerciseLog = z.infer<typeof baseExerciseLogSchema>
export type StandardExerciseLog = z.infer<typeof standardExerciseLogSchema>
export type CircuitExerciseLog = z.infer<typeof circuitExerciseLogSchema>
export type ExerciseLog = z.infer<typeof ExerciseLogSchema>

export const createExerciseLog = ({
  exerciseName,
  type,
  duration,
  restDuration,
  assessment,
  input,
  timestamp,
  setIndex,
}: {
  exerciseName: ExerciseName
  type: ExerciseType
  duration: number
  restDuration: number
  assessment: SelfAssessment
  input: InputLog[]
  timestamp: number
  setIndex?: number
}): ExerciseLog => {
  if (type === EXERCISE_TYPE.STANDARD) {
    if (setIndex === undefined) {
      throw new Error('Set is required for standard exercises')
    }
    return {
      exerciseName,
      type,
      duration,
      restDuration,
      assessment,
      input,
      timestamp,
      setIndex,
    }
  }
  if (type === EXERCISE_TYPE.CIRCUIT) {
    return {
      exerciseName,
      type,
      duration,
      restDuration,
      assessment,
      input,
      timestamp,
    }
  }
  throw new Error('Invalid exercise type')
}

// Typeguards
export const isStandardExerciseLog = (
  exerciseLog: ExerciseLog,
): exerciseLog is StandardExerciseLog => {
  return exerciseLog.type === EXERCISE_TYPE.STANDARD
}

export const isCircuitExerciseLog = (
  exerciseLog: ExerciseLog,
): exerciseLog is CircuitExerciseLog => {
  return exerciseLog.type === EXERCISE_TYPE.CIRCUIT
}
