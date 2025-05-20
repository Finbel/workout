import { WorkoutSessionRepositoryPort } from '../ports'
import { WorkoutSession } from '../../domain/entities'

export const createUpdateWorkoutSession = (
  workoutSessionRepositoryPort: WorkoutSessionRepositoryPort,
) => {
  return async (session: WorkoutSession): Promise<WorkoutSession> => {
    return workoutSessionRepositoryPort.updateSession(session)
  }
}
