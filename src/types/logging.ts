import { ExerciseName, InputType, Weekday } from './index'

// Input logging
export type InputLog = {
  type: InputType
  amount: number
}

// Exercise Log
export type BaseLog = {
  input: InputLog[]
  duration: number
  restDuration: number // Rest duration in seconds, varies per exercise
  timestamp: number
  exerciseName: ExerciseName
  assessment: {
    form: 'good' | 'bad' | 'ok' // Form quality
    difficulty: 'easy' | 'medium' | 'hard' // Difficulty rating
    excentric: boolean // Eccentric phase
  }
}

export type StandardExerciseLog = BaseLog & {
  type: 'standard'
  set: number
}

export type CircuitRoundLog = {
  type: 'circuit'
  roundNumber: number
  restDuration: number // Rest duration in seconds, varies per round
  exerciseLogs: BaseLog[]
}

export type ExerciseLog = StandardExerciseLog | CircuitRoundLog

export type WorkoutLog = {
  workoutName: string
  weekDay: Weekday
  timestamp: number
  date: string
  exerciseData: ExerciseLog[]
}

export type StandardWorkoutLog = WorkoutLog & {
  exerciseData: StandardExerciseLog[]
}

export type CircuitWorkoutLog = WorkoutLog & {
  exerciseData: CircuitRoundLog[]
}
