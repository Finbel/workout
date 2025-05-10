import { ExerciseName, ExerciseType } from '../constants'
import { InputLog } from './inputLog'
import { SelfAssessment } from './selfAssessment'

// Exercise Log
type BaseExerciseLog = {
  input: InputLog[]
  duration: number
  restDuration: number // Rest duration in seconds, varies per exercise
  timestamp: number
  exerciseName: ExerciseName
  assessment: SelfAssessment
}

export type StandardExerciseLog = BaseExerciseLog & {
  type: ExerciseType.STANDARD
  set: number
}

export type CircuitExerciseLog = BaseExerciseLog & {
  type: ExerciseType.CIRCUIT
}

// typeguards
export const isStandardExerciseLog = (
  exerciseLog: ExerciseLog,
): exerciseLog is StandardExerciseLog => {
  return exerciseLog.type === ExerciseType.STANDARD
}

export const isCircuitExerciseLog = (
  exerciseLog: ExerciseLog,
): exerciseLog is CircuitExerciseLog => {
  return exerciseLog.type === ExerciseType.CIRCUIT
}

export type ExerciseLog = StandardExerciseLog | CircuitExerciseLog
