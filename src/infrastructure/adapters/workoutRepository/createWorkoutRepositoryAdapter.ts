import { WorkoutRepositoryPort } from '../../../application/ports'
import { Weekday } from '../../../types'
import { workoutSchedules } from '../../data/workoutSchedules'

const createWorkoutRepositoryAdapter = (): WorkoutRepositoryPort => {
  return {
    getAllWorkoutSchedules: async () => workoutSchedules,
    getWorkoutScheduleById: async (scheduleId: string) => {
      const workoutSchedule = workoutSchedules.find(
        (schedule) => schedule.id === scheduleId,
      )
      return workoutSchedule ?? null
    },
    getScheduledWorkoutForDate: async (scheduleId: string, date: Weekday) => {
      const workoutSchedule = workoutSchedules.find(
        (schedule) => schedule.id === scheduleId,
      )
      if (!workoutSchedule) {
        return null
      }
      return workoutSchedule.schedule[date] ?? null
    },
    getWorkoutById: async (scheduleId: string, workoutId: string) => {
      const workoutSchedule = workoutSchedules.find(
        (schedule) => schedule.id === scheduleId,
      )
      if (!workoutSchedule) {
        return null
      }
      const workouts = Object.values(workoutSchedule.schedule).flat()
      const workout = workouts.find((workout) => workout.id === workoutId)
      if (!workout) {
        return null
      }
      return workout
    },
  }
}

export { createWorkoutRepositoryAdapter }
