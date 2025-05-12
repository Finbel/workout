import { WorkoutSessionRepositoryPort } from '../../../application/ports'
import {
  createNewWorkoutSession,
  WorkoutSession,
  WorkoutSessionSchema,
} from '../../../domain/entities'
import { ExerciseType } from '../../../domain/constants'
import { ExerciseLog } from '../../../domain/valueObjects'
import { createLocalStorageService } from './createLocalStorageService'
import { z } from 'zod'
import { workoutSessionService } from '../../../domain/services/workoutSessionService'

const workoutSessionParser = (
  value: string,
): Record<string, WorkoutSession> => {
  const parsed = JSON.parse(value)
  try {
    return z.record(z.string(), WorkoutSessionSchema).parse(parsed)
  } catch (error) {
    console.error('Error parsing workout session data')
    console.error(parsed)
    throw error
  }
}

export const createWorkoutSessionRepositoryAdapter =
  (): WorkoutSessionRepositoryPort => {
    const sessionsService = createLocalStorageService<WorkoutSession>(
      'workoutSessions',
      workoutSessionParser,
    )
    sessionsService.init()

    return {
      startSession: async (
        scheduleId: string,
        workoutId: string,
        exerciseType: ExerciseType,
      ) => {
        const newWorkoutSession = createNewWorkoutSession(
          scheduleId,
          workoutId,
          exerciseType,
        )
        sessionsService.update(newWorkoutSession)
        return newWorkoutSession
      },
      logExercise: async (sessionId: string, exerciseLog: ExerciseLog) => {
        const workoutSession = sessionsService.getById(sessionId)
        if (!workoutSession) {
          throw new Error('Workout session not found')
        }
        const newWOrkoutSession =
          workoutSessionService.addExerciseToWorkoutSession(
            workoutSession,
            exerciseLog,
          )
        sessionsService.update(newWOrkoutSession)
        return newWOrkoutSession
      },
      getAllSessions: async () => {
        return sessionsService.getAll()
      },
      getWorkoutSessionById: async (sessionId: string) => {
        const workoutSession = sessionsService.getById(sessionId)
        if (!workoutSession) {
          throw new Error('Workout session not found')
        }
        return workoutSession
      },
    }
  }
