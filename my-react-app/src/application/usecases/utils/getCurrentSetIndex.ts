import { StandardWorkout } from '../../../domain/entities'
import { StandardWorkoutSession } from '../../../domain/entities'

export const getCurrentSetIndex = (
  workoutSession: StandardWorkoutSession,
  workout: StandardWorkout,
) => {
  const { exercises } = workout
  const { exerciseData } = workoutSession

  if (exerciseData.length === 0) {
    return 0
  }

  const mostRecentExercise = exerciseData[exerciseData.length - 1]
  const { exerciseName } = mostRecentExercise

  const amountOfMostRecentExerciseDone = exerciseData.filter(
    (exercise) => exercise.exerciseName === exerciseName,
  ).length

  const matchingExerciseIndex = exercises.findIndex(
    (exercise) => exercise.name === exerciseName,
  )

  if (matchingExerciseIndex === -1) {
    throw new Error('Exercise not found')
  }

  const matchingExercise = exercises[matchingExerciseIndex]

  const haveCompletedAllSets =
    amountOfMostRecentExerciseDone === matchingExercise.sets

  if (haveCompletedAllSets && matchingExerciseIndex === exercises.length - 1) {
    return null
  }
  if (haveCompletedAllSets) {
    return 0
  }

  return amountOfMostRecentExerciseDone
}
