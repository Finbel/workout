import { getWorkoutType } from '../pages/ExercisePage/utils/getWorkoutType'

export type BaseWorkoutProgress = {
  workoutName: string
  currentExerciseIndex: number
}

export type StandardWorkoutProgress = BaseWorkoutProgress & {
  setNumber: number
}

export type CircuitWorkoutProgress = BaseWorkoutProgress & {
  roundNumber: number
}

export type WorkoutProgress = StandardWorkoutProgress | CircuitWorkoutProgress

const EXERCISE_SESSION_STORAGE_KEY = 'exercise'

export const getExerciseSessionStorage = <
  T extends WorkoutProgress,
>(): T | null => {
  const item = sessionStorage.getItem(EXERCISE_SESSION_STORAGE_KEY)
  if (!item) return null
  return JSON.parse(item) as T
}

export const initialExerciseSessionStorage = ({
  workoutName,
}: {
  workoutName: string
}) => {
  const type = getWorkoutType({ workoutName })

  const workoutProgress: Record<string, string | number> = {
    workoutName,
    currentExerciseIndex: 0,
  }

  if (type === 'standard') {
    workoutProgress.setNumber = 0
  } else if (type === 'circuit') {
    workoutProgress.roundNumber = 0
  }

  sessionStorage.setItem(
    EXERCISE_SESSION_STORAGE_KEY,
    JSON.stringify(workoutProgress),
  )
}
