import {
  CircuitWorkout,
  CircuitWorkoutSession,
  isCircuitWorkout,
  isCircuitWorkoutSession,
  isStandardWorkout,
  isStandardWorkoutSession,
  StandardWorkout,
  StandardWorkoutSession,
  WorkoutSession,
} from '../../../domain/entities'
import { WorkoutRepositoryPort } from '../../ports'

const getCurrentStandardExercise = (
  workoutSession: StandardWorkoutSession,
  workout: StandardWorkout,
) => {
  const { exercises } = workout
  const { exerciseData } = workoutSession
  if (exerciseData.length === 0) {
    return exercises[0]
  }

  const mostRecentExercise = exerciseData[exerciseData.length - 1]
  const { setIndex, exerciseName } = mostRecentExercise

  const matchingExerciseIndex = exercises.findIndex(
    (exercise) => exercise.name === exerciseName,
  )

  if (matchingExerciseIndex === -1) {
    throw new Error('Exercise not found')
  }

  const matchingExercise = exercises[matchingExerciseIndex]

  const haveCompletedAllSets = setIndex + 1 === matchingExercise.sets

  if (haveCompletedAllSets && matchingExerciseIndex === exercises.length - 1) {
    return null
  }
  if (haveCompletedAllSets) {
    return exercises[matchingExerciseIndex + 1]
  }

  return matchingExercise
}

const getCurrentCircuitExercise = (
  workoutSession: CircuitWorkoutSession,
  workout: CircuitWorkout,
) => {
  const { exercises } = workout
  const { exerciseData } = workoutSession

  if (exerciseData.length === 0) {
    return exercises[0]
  }

  const mostRecentExercise = exerciseData[exerciseData.length - 1]
  const { exerciseName } = mostRecentExercise

  const matchingExerciseIndex = exercises.findIndex(
    (exercise) => exercise.name === exerciseName,
  )

  if (matchingExerciseIndex === -1) {
    throw new Error('Exercise not found')
  }

  const mostRecentWasLastExercise =
    matchingExerciseIndex === exercises.length - 1

  const completedAllExercises =
    exerciseData.length === exercises.length * workout.rounds

  if (completedAllExercises) {
    return null
  }

  if (mostRecentWasLastExercise) {
    return exercises[0]
  }

  return exercises[matchingExerciseIndex + 1]
}

export const createGetCurrentExerciseForWorkoutSession = (
  workoutRepositoryPort: WorkoutRepositoryPort,
) => {
  return async (workoutSession: WorkoutSession) => {
    if (!workoutSession) {
      throw new Error('Workout session not found')
    }
    const { scheduleId, workoutId } = workoutSession
    const workout = await workoutRepositoryPort.getWorkoutById(
      scheduleId,
      workoutId,
    )
    if (!workout) {
      throw new Error('Workout not found')
    }
    if (
      isStandardWorkout(workout) &&
      isStandardWorkoutSession(workoutSession)
    ) {
      return getCurrentStandardExercise(workoutSession, workout)
    }
    if (isCircuitWorkout(workout) && isCircuitWorkoutSession(workoutSession)) {
      return getCurrentCircuitExercise(workoutSession, workout)
    }
    throw new Error('Invalid workout type')
  }
}
