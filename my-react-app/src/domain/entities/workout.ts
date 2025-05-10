import { CircuitExercise, StandardExercise } from './exercise'
import { ExerciseType } from '../constants'

export type BaseWorkout = {
  id: string
}

export type StandardWorkout = BaseWorkout & {
  type: ExerciseType.STANDARD
  exercises: StandardExercise[]
}

export type CircuitWorkout = BaseWorkout & {
  type: ExerciseType.CIRCUIT
  rounds: number
  exercises: CircuitExercise[]
}

export const createStandardWorkout = (
  id: string,
  exercises: StandardExercise[],
): StandardWorkout => {
  return {
    id,
    type: ExerciseType.STANDARD,
    exercises,
  }
}

export const createCircuitWorkout = (
  id: string,
  rounds: number,
  exercises: CircuitExercise[],
): CircuitWorkout => {
  return {
    id,
    type: ExerciseType.CIRCUIT,
    rounds,
    exercises,
  }
}

export type Workout = StandardWorkout | CircuitWorkout
