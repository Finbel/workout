import { isCircuitWorkout } from '../../domain/entities'
import { isCircuitWorkoutSession } from '../../domain/entities'
import { WorkoutRepositoryPort, WorkoutSessionRepositoryPort } from '../ports'

export const createGetTotalRounds = (
  workoutSessionRepositoryPort: WorkoutSessionRepositoryPort,
  workoutRepositoryPort: WorkoutRepositoryPort,
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
      return workout.rounds
    }
    throw new Error('Workout is not a circuit workout')
  }
}
