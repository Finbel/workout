import { WorkoutSessionRepositoryPort } from '../../../application/ports'
import { v4 as uuidv4 } from 'uuid'
import { createNewWorkoutSession, WorkoutSession } from '../../../domain/entities'
import { ExerciseType } from '../../../domain/constants'
import { ExerciseLog } from '../../../domain/valueObjects'
import { createLocalStorageService } from './createLocalStorageService'



const createWorkoutSessionRepositoryAdapter = (): WorkoutSessionRepositoryPort => {

  const sessionsService = createLocalStorageService<WorkoutSession>('workoutSessions')
  sessionsService.init()

  return {
    startSession: async (scheduleId: string, workoutId: string, exerciseType: ExerciseType) => {
      const newWorkoutSession = createNewWorkoutSession(scheduleId, workoutId, exerciseType)
      const sessions = sessionsService.get()
      if (!sessions) {
        throw new Error('No sessions found')
      }
      sessions.push(newWorkoutSession)
      sessionsService.set(sessions)
      return newWorkoutSession
    },
    logExercise: async (sessionId: string, exerciseLog: ExerciseLog) => {
      return updateWorkoutSession(sessionId, exerciseLog)
    },
    getAllSessions: async () => {
      return getWorkoutSessions()
    },