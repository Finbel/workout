import { ExerciseType } from '../constants'
import { CircuitExerciseLog, StandardExerciseLog } from '../valueObjects'
import { v4 as uuidv4 } from 'uuid'
export type BaseWorkoutSession = {
  scheduleId: string
  workoutId: string
  id: string
  startedAt: number
  active: boolean
}

const createBaseWorkoutSession = (
  scheduleId: string,
  workoutId: string,
): BaseWorkoutSession => {
  return {
    id: uuidv4(),
    workoutId,
    scheduleId,
    startedAt: new Date().getTime(),
    active: true,
  }
}

export type StandardWorkoutSession = BaseWorkoutSession & {
  type: ExerciseType.STANDARD
  exerciseData: StandardExerciseLog[]
}

export type CircuitWorkoutSession = BaseWorkoutSession & {
  type: ExerciseType.CIRCUIT
  exerciseData: CircuitExerciseLog[]
}

export const createNewWorkoutSession = (
  scheduleId: string,
  workoutId: string,
  workoutType: ExerciseType,
): WorkoutSession => {
  return {
    ...createBaseWorkoutSession(scheduleId, workoutId),
    type: workoutType,
    exerciseData: [],
  }
}

// typeguards
export const isStandardWorkoutSession = (
  workoutSession: WorkoutSession,
): workoutSession is StandardWorkoutSession => {
  return workoutSession.type === ExerciseType.STANDARD
}

export const isCircuitWorkoutSession = (
  workoutSession: WorkoutSession,
): workoutSession is CircuitWorkoutSession => {
  return workoutSession.type === ExerciseType.CIRCUIT
}

export type WorkoutSession = StandardWorkoutSession | CircuitWorkoutSession
