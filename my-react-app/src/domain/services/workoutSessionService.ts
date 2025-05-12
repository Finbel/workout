import {
  isCircuitWorkoutSession,
  isStandardWorkoutSession,
  WorkoutSession,
} from '../entities'
import {
  ExerciseLog,
  isCircuitExerciseLog,
  isStandardExerciseLog,
} from '../valueObjects'

export const workoutSessionService = {
  addExerciseToWorkoutSession: (
    workoutSession: WorkoutSession,
    exerciseLog: ExerciseLog,
  ): WorkoutSession => {
    if (
      isStandardWorkoutSession(workoutSession) &&
      isStandardExerciseLog(exerciseLog)
    ) {
      return {
        ...workoutSession,
        exerciseData: [...workoutSession.exerciseData, exerciseLog],
      }
    }
    if (
      isCircuitWorkoutSession(workoutSession) &&
      isCircuitExerciseLog(exerciseLog)
    ) {
      return {
        ...workoutSession,
        exerciseData: [...workoutSession.exerciseData, exerciseLog],
      }
    }
    throw new Error('Invalid workout session or exercise log')
  },
}
