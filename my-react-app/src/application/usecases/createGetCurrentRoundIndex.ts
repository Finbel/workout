import {
  isCircuitWorkout,
  isCircuitWorkoutSession,
} from '../../domain/entities'
import { WorkoutRepositoryPort, WorkoutSessionRepositoryPort } from '../ports'
import { getCurrentRoundIndex } from './utils/getCurrentRoundIndex'

export const createGetCurrentRoundIndex = (
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
    if (isCircuitWorkout(workout) && isCircuitWorkoutSession(workoutSession)) {
      return getCurrentRoundIndex(workoutSession, workout)
    }
    throw new Error('Workout is not a circuit workout')
  }
}
