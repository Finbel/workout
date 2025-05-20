import {
  DatePort,
  WorkoutRepositoryPort,
  WorkoutSessionRepositoryPort,
} from '../ports'
import { createGetTodaysWorkouts } from './createGetTodaysWorkouts'
import { createStartWorkoutSession } from './createStartWorkoutSession'
import { createUpdateWorkoutSessionWithExerciseLog } from './createUpdateWorkoutSessionWithExerciseLog'
import { createGetWorkoutHistory } from './createGetWorkoutHistory'
import { createGetWorkoutForSchedule } from './createGetWorkoutForSchedule'
import { createGetWorkoutSchedule } from './createGetWorkoutSchedule'
import { createGetWorkoutSessionById } from './createGetWorkoutSessionById'
import { createGetCurrentExerciseFromWorkoutSession } from './createGetCurrentExerciseFromWorkoutSession'
import { createGetCurrentSetIndex } from './createGetCurrentSetIndex'
import { createGetCurrentRoundIndex } from './createGetCurrentRoundIndex'
import { createGetTotalRounds } from './createGetTotalRounds'
import { createGetLastWorkoutSession } from './createGetLastWorkoutSession'
import { createUpdateWorkoutSession } from './createUpdateWorkoutSession'
import { createDeleteWorkoutSession } from './createDeleteWorkoutSession'

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
    updateWorkoutSessionWithExerciseLog:
      createUpdateWorkoutSessionWithExerciseLog(workoutSessionRepositoryPort),
    getWorkoutHistory: createGetWorkoutHistory(workoutSessionRepositoryPort),
    getWorkoutForSchedule: createGetWorkoutForSchedule(workoutRepositoryPort),
    getWorkoutSchedule: createGetWorkoutSchedule(workoutRepositoryPort),
    getWorkoutSessionById: createGetWorkoutSessionById(
      workoutSessionRepositoryPort,
    ),
    getLastWorkoutSession: createGetLastWorkoutSession(
      workoutSessionRepositoryPort,
    ),
    getCurrentExerciseFromWorkoutSession:
      createGetCurrentExerciseFromWorkoutSession(
        workoutRepositoryPort,
        workoutSessionRepositoryPort,
      ),
    getCurrentSetIndex: createGetCurrentSetIndex(
      workoutRepositoryPort,
      workoutSessionRepositoryPort,
    ),
    getCurrentRoundIndex: createGetCurrentRoundIndex(
      workoutRepositoryPort,
      workoutSessionRepositoryPort,
    ),
    getTotalRounds: createGetTotalRounds(
      workoutSessionRepositoryPort,
      workoutRepositoryPort,
    ),
    updateWorkoutSession: createUpdateWorkoutSession(
      workoutSessionRepositoryPort,
    ),
    deleteWorkoutSession: createDeleteWorkoutSession(
      workoutSessionRepositoryPort,
    ),
  }
}
