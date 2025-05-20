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
      getLastWorkoutSessionForWorkout: async (workoutId: string) => {
        const sessions = sessionsService.getAll()

        console.log('sessions', sessions)
        // Filter sessions for the specified workoutId and sort by startedAt timestamp (descending)
        const filteredSessions = sessions
          .filter((session) => session.workoutId === workoutId)
          .sort((a, b) => b.startedAt - a.startedAt)

        // Return the most recent session or null if none exists
        return filteredSessions.length > 0 ? filteredSessions[0] : null
      },
      updateSession: async (session: WorkoutSession) => {
        // Validate that the session exists
        const existingSession = sessionsService.getById(session.id)
        if (!existingSession) {
          throw new Error('Workout session not found')
        }

        // Update the session
        sessionsService.update(session)
        return session
      },
      deleteSession: async (sessionId: string) => {
        // Validate that the session exists
        const existingSession = sessionsService.getById(sessionId)
        if (!existingSession) {
          throw new Error('Workout session not found')
        }

        // Remove the session
        sessionsService.remove(sessionId)
        return true
      },
    }
  }
