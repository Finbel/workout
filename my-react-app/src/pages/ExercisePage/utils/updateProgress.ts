import { WorkoutProgress } from '../../../utils/exerciseSessionStorage'
import { StandardExerciseLog, WorkoutLog } from '../../../types/logging'

export const updateProgress = (
  workoutProgress: WorkoutProgress,
  workoutLog: WorkoutLog,
  exerciseLog: StandardExerciseLog,
) => {
  const newWorkoutLog = {
    ...workoutLog,
    exerciseData: [...workoutLog.exerciseData, exerciseLog],
  }
  const newWorkoutProgress = {
    ...workoutProgress,
    currentExerciseIndex: workoutProgress.currentExerciseIndex + 1,
  }
  return { newWorkoutLog, newWorkoutProgress }
}
