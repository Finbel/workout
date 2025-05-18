import { WorkoutSession } from '../../domain/entities'
import { ExerciseLog } from '../../domain/valueObjects'
import { ExerciseType } from '../../domain/constants'
export type WorkoutSessionRepositoryPort = {
  startSession: (
    scheduleId: string,
    workoutId: string,
    exerciseType: ExerciseType,
  ) => Promise<WorkoutSession>
  logExercise: (
    sessionId: string,
    input: ExerciseLog,
  ) => Promise<WorkoutSession>
  getAllSessions: () => Promise<WorkoutSession[]>
  getWorkoutSessionById: (sessionId: string) => Promise<WorkoutSession>
  getLastWorkoutSessionForWorkout: (
    workoutId: string,
  ) => Promise<WorkoutSession | null>
}
