import { WorkoutRepositoryPort } from '../ports'

export const createGetWorkoutForSchedule = (
  workoutRepositoryPort: WorkoutRepositoryPort,
) => {
  return async (scheduleId: string, workoutId: string) => {
    const workout = await workoutRepositoryPort.getWorkoutById(
      scheduleId,
      workoutId,
    )
    if (!workout) {
      throw new Error('Workout schedule not found')
    }
    return workout
  }
}
