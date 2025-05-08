import { workoutSchedules } from '../../../data/workoutSchedules'
import { getToday } from '../../../utils/getToday'

export const getWorkoutType = ({
  workoutName,
}: {
  workoutName: string
}): 'standard' | 'circuit' => {
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
  return workout.type
}
