import { ExerciseName, InputType, ExerciseType } from '../constants'

export type BaseExercise = {
  name: ExerciseName
  id: string
  description: string
  expectedInputs: InputType[]
}

export type StandardExercise = BaseExercise & {
  type: ExerciseType.STANDARD
  sets: number
}

export type CircuitExercise = BaseExercise & {
  type: ExerciseType.CIRCUIT
}

export const createStandardExercise = (
  exercise: BaseExercise,
  sets: number,
): StandardExercise => {
  return {
    ...exercise,
    type: ExerciseType.STANDARD,
    sets,
  }
}

export const createCircuitExercise = (
  exercise: BaseExercise,
): CircuitExercise => {
  return {
    ...exercise,
    type: ExerciseType.CIRCUIT,
  }
}

export type Exercise = StandardExercise | CircuitExercise
