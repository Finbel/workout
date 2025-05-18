import { WorkoutSessionRepositoryPort } from '../ports'

export const createGetLastWorkoutSession = (
  workoutSessionRepositoryPort: WorkoutSessionRepositoryPort,
) => {
  return async (workoutId: string) => {
    return workoutSessionRepositoryPort.getLastWorkoutSessionForWorkout(
      workoutId,
    )
  }
}
