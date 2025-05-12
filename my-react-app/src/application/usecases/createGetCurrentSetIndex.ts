import {
  isStandardWorkout,
  isStandardWorkoutSession,
} from '../../domain/entities'
import { WorkoutRepositoryPort, WorkoutSessionRepositoryPort } from '../ports'
import { getCurrentSetIndex } from './utils/getCurrentSetIndex'

export const createGetCurrentSetIndex = (
  workoutRepositoryPort: WorkoutRepositoryPort,
  workoutSessionRepositoryPort: WorkoutSessionRepositoryPort,
) => {
  return async (workoutSessionId: string) => {
    const workoutSession =
      await workoutSessionRepositoryPort.getWorkoutSessionById(workoutSessionId)
    const workout = await workoutRepositoryPort.getWorkoutById(
      workoutSession.scheduleId,
      workoutSession.workoutId,
    )
    if (!workout) {
      throw new Error('Workout not found')
    }
    if (
      isStandardWorkout(workout) &&
      isStandardWorkoutSession(workoutSession)
    ) {
      return getCurrentSetIndex(workoutSession, workout)
    }
    throw new Error()
  }
}
