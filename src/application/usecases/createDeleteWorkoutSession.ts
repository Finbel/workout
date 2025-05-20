import { WorkoutSessionRepositoryPort } from '../ports'

export const createDeleteWorkoutSession = (
  workoutSessionRepositoryPort: WorkoutSessionRepositoryPort,
) => {
  return async (sessionId: string): Promise<boolean> => {
    return workoutSessionRepositoryPort.deleteSession(sessionId)
  }
}
