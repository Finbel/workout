import { EXERCISE_NAME, INPUT_TYPE, WEEKDAY } from '../constants'

export type ExerciseName = keyof typeof EXERCISE_NAME
export type InputType = keyof typeof INPUT_TYPE
export type Weekday = keyof typeof WEEKDAY

// Exercises

export type Exercise = {
  name: ExerciseName
  description: string
  expectedInputs: InputType[]
}

export type ScheduledExercise = Exercise & { sets: number }

export type ExerciseUnion = Exercise | ScheduledExercise

// Standard Workout Schedule
type StandardWorkout = {
  type: 'standard'
  exercises: ScheduledExercise[]
}

type CircuitWorkout = {
  type: 'circuit'
  rounds: number
  exercises: Exercise[] // Exercises are cycled through each round
}

// Workout per weekday
type WorkoutSchedule = Partial<
  Record<Weekday, StandardWorkout | CircuitWorkout>
>

// Named Workout Schedule
export type NamedWorkoutSchedule = {
  name: string
  schedule: WorkoutSchedule
}
