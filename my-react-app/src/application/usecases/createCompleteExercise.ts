import { ExerciseLog } from '../../domain/valueObjects'
import { WorkoutSessionRepositoryPort } from '../ports'

export const createCompleteExercise = (
  workoutSessionRepositoryPort: WorkoutSessionRepositoryPort,
) => {
  return async (sessionId: string, exerciseLog: ExerciseLog) => {
    const workoutSession = await workoutSessionRepositoryPort.logExercise(
      sessionId,
      exerciseLog,
    )
    return workoutSession
  }
}
