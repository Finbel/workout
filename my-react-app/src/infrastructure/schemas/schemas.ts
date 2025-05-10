import { z } from 'zod'
import { ExerciseType, InputType } from '../../domain/constants'
import { WorkoutSession } from '../../domain/entities'

// zod schema for exercise log

const inputLogSchema = z.object({
  type: z.nativeEnum(InputType),
  amount: z.number(),
})

const exerciseLogSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(ExerciseType),
  input: z.array(inputLogSchema),
})

const workoutSessionSchema = z.object({
  id: z.string(),
  scheduleId: z.string(),
  workoutId: z.string(),
  startedAt: z.number(),
  active: z.boolean(),
  type: z.nativeEnum(ExerciseType),
  exerciseData: z.array(exerciseLogSchema),
})

export const parseWorkoutSession = (
  workoutSessionString: string,
): WorkoutSession => {
  const workoutSession = JSON.parse(workoutSessionString)
  return workoutSessionSchema.parse(workoutSession)
}
