import { Weekday } from '../../domain/constants'
import { EXERCISES } from './exercises'
import {
  createCircuitWorkout,
  createStandardWorkout,
} from '../../domain/entities/workout'
import {
  createCircuitExercise,
  createStandardExercise,
} from '../../domain/entities/exercise'
import { WorkoutSchedule } from '../../domain/entities/workoutSchedule'

const myWorkoutSchedule: WorkoutSchedule = {
  name: 'Full-Body Strength & HIIT',
  id: 'a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14',
  schedule: {
    [Weekday.MONDAY]: createStandardWorkout(
      'a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14',
      [
        createStandardExercise(EXERCISES.DUMBBELL_BENCH_PRESS, 4),
        createStandardExercise(EXERCISES.DUMBBELL_SHOULDER_PRESS, 3),
        createStandardExercise(EXERCISES.DUMBBELL_TRICEP_OVERHEAD_EXTENSION, 3),
        createStandardExercise(EXERCISES.DUMBBELL_LATERAL_RAISE, 3),
        createStandardExercise(EXERCISES.PLANK, 3),
      ],
    ),
    [Weekday.TUESDAY]: createStandardWorkout(
      'a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14',
      [
        createStandardExercise(EXERCISES.DUMBBELL_BENT_OVER_ROW, 4),
        createStandardExercise(EXERCISES.DUMBBELL_BICEP_CURL, 3),
        createStandardExercise(EXERCISES.DUMBBELL_REVERSE_FLY, 3),
        createStandardExercise(EXERCISES.DUMBBELL_HAMMER_CURL, 3),
        createStandardExercise(EXERCISES.RUSSIAN_TWIST, 3),
      ],
    ),
    [Weekday.WEDNESDAY]: createStandardWorkout(
      'a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14',
      [
        createStandardExercise(EXERCISES.DUMBBELL_SQUAT, 4),
        createStandardExercise(EXERCISES.DUMBBELL_LUNGES, 3),
        createStandardExercise(EXERCISES.DUMBBELL_ROMANIAN_DEADLIFT, 3),
        createStandardExercise(EXERCISES.DUMBBELL_CALF_RAISE, 3),
        createStandardExercise(EXERCISES.LEG_RAISES, 3),
      ],
    ),
    [Weekday.THURSDAY]: createStandardWorkout(
      'a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14',
      [
        createStandardExercise(EXERCISES.DUMBBELL_FRONT_RAISE, 3),
        createStandardExercise(EXERCISES.DUMBBELL_SHRUG, 3),
        createStandardExercise(EXERCISES.DUMBBELL_CONCENTRATION_CURL, 3),
        createStandardExercise(EXERCISES.DUMBBELL_TRICEP_KICKBACK, 3),
        createStandardExercise(EXERCISES.HOLLOW_BODY_HOLD, 1),
      ],
    ),
    [Weekday.FRIDAY]: createCircuitWorkout(
      'a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14',
      3,
      [
        createCircuitExercise(EXERCISES.BURPEES),
        createCircuitExercise(EXERCISES.DUMBBELL_THRUSTER),
        createCircuitExercise(EXERCISES.DUMBBELL_SWING),
        createCircuitExercise(EXERCISES.MOUNTAIN_CLIMBERS),
        createCircuitExercise(EXERCISES.BICYCLE_CRUNCHES),
      ],
    ),
  },
}

export const workoutSchedules: WorkoutSchedule[] = [myWorkoutSchedule]
