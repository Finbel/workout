import { workoutSchedules } from '../../../../data/workoutSchedules'
import { ScheduledExercise } from '../../../../types'
import { getToday } from '../../../../utils/getToday'

export const getStandardWorkoutExercises = ({
  workoutName,
}: {
  workoutName: string
}): ScheduledExercise[] => {
  const workoutSchedule = workoutSchedules.find(
    (workout) => workout.name === workoutName,
  )
  if (!workoutSchedule) {
    throw new Error('Workout schedule not found')
  }

  const today = getToday()
  const workout = workoutSchedule.schedule[today]
  if (!workout) {
    throw new Error('Workout not found')
  }

  if (workout.type === 'standard') {
    return workout.exercises
  }

  throw new Error('Workout was not of standard type')
}
