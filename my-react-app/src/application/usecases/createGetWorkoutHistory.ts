import { WorkoutSessionRepositoryPort } from '../ports'

export const createGetWorkoutHistory = (
  workoutSessionRepositoryPort: WorkoutSessionRepositoryPort,
) => {
  return async () => {
    return workoutSessionRepositoryPort.getAllSessions()
  }
}
