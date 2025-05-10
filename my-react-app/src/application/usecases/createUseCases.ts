import {
  DatePort,
  WorkoutRepositoryPort,
  WorkoutSessionRepositoryPort,
} from '../ports'
import { createGetTodaysWorkouts } from './createGetTodaysWorkouts'
import { createStartWorkoutSession } from './createStartWorkoutSession'
import { createCompleteExercise } from './createCompleteExercise'
import { createGetWorkoutHistory } from './createGetWorkoutHistory'

export const createUseCases = (
  workoutSessionRepositoryPort: WorkoutSessionRepositoryPort,
  workoutRepositoryPort: WorkoutRepositoryPort,
  datePort: DatePort,
) => {
  return {
    getTodaysWorkouts: createGetTodaysWorkouts(workoutRepositoryPort, datePort),
    startWorkoutSession: createStartWorkoutSession(
      workoutRepositoryPort,
      workoutSessionRepositoryPort,
    ),
    completeExercise: createCompleteExercise(workoutSessionRepositoryPort),
    getWorkoutHistory: createGetWorkoutHistory(workoutSessionRepositoryPort),
  }
}
