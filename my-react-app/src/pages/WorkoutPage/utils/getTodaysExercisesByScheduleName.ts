import { getToday } from '../../../utils/getToday'
import { workoutSchedules } from '../../../data/workoutSchedules'
import { ExerciseUnion } from '../../../types'

export const getTodaysExercisesByScheduleName = (
  scheduleName: string,
): ExerciseUnion[] | null => {
  const workoutSchedule = workoutSchedules.find(
    (schedule) => schedule.name === scheduleName,
  )!
  const today = getToday()
  const todaysWorkout = workoutSchedule.schedule[today]

  if (todaysWorkout) {
    return todaysWorkout.exercises
  }
  return null
}
