import { WorkoutSession } from '../entities'
import { ExerciseLog } from '../valueObjects'

export const workoutSessionService = {
  addExerciseToWorkoutSession: (
    workoutSession: WorkoutSession,
    exerciseLog: ExerciseLog,
  ) => {
    return {
      ...workoutSession,
      exerciseData: [...workoutSession.exerciseData, exerciseLog],
    }
  },
}
