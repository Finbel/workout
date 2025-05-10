import { DatePort, WorkoutRepositoryPort } from '../ports'

export const createGetTodaysWorkouts = (
  workoutRepositoryPort: WorkoutRepositoryPort,
  datePort: DatePort,
) => {
  return async () => {
    const workoutSchedules =
      await workoutRepositoryPort.getAllWorkoutSchedules()
    const date = datePort.getToday()
    const workouts = await Promise.all(
      workoutSchedules.map((workoutSchedule) =>
        workoutRepositoryPort.getScheduledWorkoutForDate(
          workoutSchedule.id,
          date,
        ),
      ),
    )
    return workouts.filter((workout) => workout !== null)
  }
}
