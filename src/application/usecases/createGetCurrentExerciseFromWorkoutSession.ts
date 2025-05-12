import { WorkoutSessionRepositoryPort, WorkoutRepositoryPort } from '../ports'
import { createGetCurrentExerciseForWorkoutSession } from './utils/createGetCurrentExerciseForWorkoutSession'

export const createGetCurrentExerciseFromWorkoutSession = (
  workoutRepositoryPort: WorkoutRepositoryPort,
  workoutSessionRepositoryPort: WorkoutSessionRepositoryPort,
) => {
  const getCurrentExerciseForWorkoutSession =
    createGetCurrentExerciseForWorkoutSession(workoutRepositoryPort)

  return async (workoutSessionId: string) => {
    const workoutSession =
      await workoutSessionRepositoryPort.getWorkoutSessionById(workoutSessionId)
    if (!workoutSession) {
      throw new Error('Workout session not found')
    }
    return getCurrentExerciseForWorkoutSession(workoutSession)
  }
}
