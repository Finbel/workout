import { WorkoutSessionRepositoryPort } from '../ports/workoutSessionRepositoryPort'

export const createGetWorkoutSessionById = (
  workoutSessionRepositoryPort: WorkoutSessionRepositoryPort,
) => {
  return async (sessionId: string) => {
    return workoutSessionRepositoryPort.getWorkoutSessionById(sessionId)
  }
}
