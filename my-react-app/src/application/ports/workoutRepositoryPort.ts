import { Workout, WorkoutSchedule } from '../../domain/entities'
import { Weekday } from '../../domain/constants'
export type WorkoutRepositoryPort = {
  getAllWorkoutSchedules: () => Promise<WorkoutSchedule[]>
  getScheduledWorkoutForDate: (
    scheduleId: string,
    date: Weekday,
  ) => Promise<Workout | null>
  getWorkoutScheduleById: (
    scheduleId: string,
  ) => Promise<WorkoutSchedule | null>
  getWorkoutById: (
    scheduleId: string,
    workoutId: string,
  ) => Promise<Workout | null>
}
