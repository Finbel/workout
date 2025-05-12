import { DatePort, WorkoutRepositoryPort } from '../ports'

export const createGetTodaysWorkouts = (
  workoutRepositoryPort: WorkoutRepositoryPort,
  datePort: DatePort,
) => {
  return async () => {
    const workoutSchedules =
      await workoutRepositoryPort.getAllWorkoutSchedules()
    const date = datePort.getToday()
    const scheduledWorkouts = await Promise.all(
      workoutSchedules.map(async ({ id }) => {
        const workout = await workoutRepositoryPort.getScheduledWorkoutForDate(
          id,
          date,
        )
        return workout ? { workout, scheduleId: id } : null
      }),
    )
    return scheduledWorkouts.filter((workout) => workout !== null)
  }
}
