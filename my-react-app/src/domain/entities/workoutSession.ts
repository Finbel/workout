import { z } from 'zod'
import { EXERCISE_TYPE } from '../constants'
import {
  standardExerciseLogSchema,
  circuitExerciseLogSchema,
} from '../valueObjects/exerciseLog'
import { v4 as uuidv4 } from 'uuid'

// Create Zod schemas
export const baseWorkoutSessionSchema = z.object({
  scheduleId: z.string(),
  workoutId: z.string(),
  id: z.string(),
  startedAt: z.number(),
  active: z.boolean(),
})

export const standardWorkoutSessionSchema = baseWorkoutSessionSchema.extend({
  type: z.literal(EXERCISE_TYPE.STANDARD),
  exerciseData: z.array(standardExerciseLogSchema),
})

export const circuitWorkoutSessionSchema = baseWorkoutSessionSchema.extend({
  type: z.literal(EXERCISE_TYPE.CIRCUIT),
  exerciseData: z.array(circuitExerciseLogSchema),
})

// Export the schema
export const WorkoutSessionSchema = z.discriminatedUnion('type', [
  standardWorkoutSessionSchema,
  circuitWorkoutSessionSchema,
])

// Export the types using z.infer
export type BaseWorkoutSession = z.infer<typeof baseWorkoutSessionSchema>
export type StandardWorkoutSession = z.infer<
  typeof standardWorkoutSessionSchema
>
export type CircuitWorkoutSession = z.infer<typeof circuitWorkoutSessionSchema>
export type WorkoutSession = z.infer<typeof WorkoutSessionSchema>

// Factory function
export const createBaseWorkoutSession = (
  scheduleId: string,
  workoutId: string,
): BaseWorkoutSession => {
  return {
    id: uuidv4(),
    workoutId,
    scheduleId,
    startedAt: new Date().getTime(),
    active: true,
  }
}

export const createNewWorkoutSession = (
  scheduleId: string,
  workoutId: string,
  workoutType: keyof typeof EXERCISE_TYPE,
): WorkoutSession => {
  return {
    ...createBaseWorkoutSession(scheduleId, workoutId),
    type: workoutType,
    exerciseData: [],
  } as WorkoutSession
}

// Typeguards
export const isStandardWorkoutSession = (
  workoutSession: WorkoutSession,
): workoutSession is StandardWorkoutSession => {
  return workoutSession.type === EXERCISE_TYPE.STANDARD
}

export const isCircuitWorkoutSession = (
  workoutSession: WorkoutSession,
): workoutSession is CircuitWorkoutSession => {
  return workoutSession.type === EXERCISE_TYPE.CIRCUIT
}
