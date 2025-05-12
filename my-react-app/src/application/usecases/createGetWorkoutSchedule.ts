import { WorkoutRepositoryPort } from '../ports/workoutRepositoryPort'

export const createGetWorkoutSchedule = (
  workoutRepositoryPort: WorkoutRepositoryPort,
) => {
  return async (scheduleId: string) => {
    return workoutRepositoryPort.getWorkoutScheduleById(scheduleId)
  }
}
