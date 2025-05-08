import {
  ExerciseLog,
  BaseLog,
  StandardExerciseLog,
  CircuitRoundLog,
} from '../../../types/logging'

type StandardLogParams = Omit<StandardExerciseLog, 'timestamp'> & {
  type: 'standard'
}

type CircuitLogParams = Omit<CircuitRoundLog, 'exerciseLogs'> & {
  type: 'circuit'
  exerciseLogs: BaseLog[]
}

export const createExerciseLog = (
  params: StandardLogParams | CircuitLogParams,
): ExerciseLog => {
  const timestamp = Date.now()

  if (params.type === 'standard') {
    return {
      ...params,
      timestamp,
    }
  }

  return params
}
