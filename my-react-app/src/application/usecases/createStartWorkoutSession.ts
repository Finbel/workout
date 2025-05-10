import { WorkoutRepositoryPort, WorkoutSessionRepositoryPort } from '../ports'

export const createStartWorkoutSession = (
  workoutRepositoryPort: WorkoutRepositoryPort,
  workoutSessionRepositoryPort: WorkoutSessionRepositoryPort,
) => {
  return async (scheduleId: string, workoutId: string) => {
    const workoutSchedule = await workoutRepositoryPort.getWorkoutScheduleById(
      scheduleId,
    )
    if (!workoutSchedule) {
      throw new Error('Workout schedule not found')
    }
    const workout = await workoutRepositoryPort.getWorkoutById(
      scheduleId,
      workoutId,
    )
    if (!workout) {
      throw new Error('Workout not found')
    }
    const workoutSession = await workoutSessionRepositoryPort.startSession(
      scheduleId,
      workoutId,
      workout.type,
    )
    return workoutSession
  }
}
