import { WEEKDAY } from '../../../constants'
import { workoutSchedules } from '../../../data/workoutSchedules'
import { Weekday } from '../../../types'
import { Workout } from '../types'

export const getTodaysWorkouts = () => {
  const today = Object.values(WEEKDAY).find(
    (value) =>
      value ===
      new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
  ) as Weekday

  const todaysWorkouts = workoutSchedules.reduce<Workout[]>((acc, schedule) => {
    const workout = schedule.schedule[today]
    if (workout) {
      return [
        ...acc,
        {
          name: schedule.name,
          weekDay: today,
          type: workout.type,
        },
      ]
    }
    return acc
  }, [])

  return todaysWorkouts
}
