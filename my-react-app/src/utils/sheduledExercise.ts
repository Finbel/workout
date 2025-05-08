import { Exercise, ScheduledExercise } from '../types'

export const sheduledExercise = (
  exercise: Exercise,
  sets: number,
): ScheduledExercise => {
  return {
    ...exercise,
    sets,
  }
}
