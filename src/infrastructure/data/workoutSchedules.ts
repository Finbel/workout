import { WEEKDAY } from '../../domain/constants'
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
    [WEEKDAY.TUESDAY]: createStandardWorkout(
      'b2c3d4e5-f6g7-8h9i-10j1-k12l13m14n15',
      'Upper Body Push Day - Focus on chest, shoulders and triceps with core finisher',
      [
        createStandardExercise(EXERCISES.DUMBBELL_BENCH_PRESS, 4),
        createStandardExercise(EXERCISES.DUMBBELL_SHOULDER_PRESS, 3),
        createStandardExercise(EXERCISES.DUMBBELL_TRICEP_OVERHEAD_EXTENSION, 3),
        createStandardExercise(EXERCISES.DUMBBELL_LATERAL_RAISE, 3),
        createStandardExercise(EXERCISES.PLANK, 3),
      ],
    ),
    [WEEKDAY.SUNDAY]: createStandardWorkout(
      'c3d4e5f6-g7h8-9i10-j11k-l12m13n14o15',
      'Upper Body Pull Day - Back and biceps workout with oblique core training',
      [
        createStandardExercise(EXERCISES.DUMBBELL_BENT_OVER_ROW, 4),
        createStandardExercise(EXERCISES.DUMBBELL_BICEP_CURL, 3),
        createStandardExercise(EXERCISES.DUMBBELL_REVERSE_FLY, 3),
        createStandardExercise(EXERCISES.DUMBBELL_HAMMER_CURL, 3),
        createStandardExercise(EXERCISES.RUSSIAN_TWIST, 3),
      ],
    ),
    [WEEKDAY.WEDNESDAY]: createStandardWorkout(
      'd4e5f6g7-h8i9-10j1-k12l-m13n14o15p16',
      'Lower Body Strength - Complete leg workout targeting all major muscle groups',
      [
        createStandardExercise(EXERCISES.DUMBBELL_SQUAT, 4),
        createStandardExercise(EXERCISES.DUMBBELL_LUNGES, 3),
        createStandardExercise(EXERCISES.DUMBBELL_ROMANIAN_DEADLIFT, 3),
        createStandardExercise(EXERCISES.DUMBBELL_CALF_RAISE, 3),
        createStandardExercise(EXERCISES.LEG_RAISES, 3),
      ],
    ),
    [WEEKDAY.THURSDAY]: createStandardWorkout(
      'e5f6g7h8-i9j0-k1l2-m3n4-o15p16q17r18',
      'Upper Body Isolation - Detailed focus on shoulder, trap and arm development',
      [
        createStandardExercise(EXERCISES.DUMBBELL_FRONT_RAISE, 3),
        createStandardExercise(EXERCISES.DUMBBELL_SHRUG, 3),
        createStandardExercise(EXERCISES.DUMBBELL_CONCENTRATION_CURL, 3),
        createStandardExercise(EXERCISES.DUMBBELL_TRICEP_KICKBACK, 3),
        createStandardExercise(EXERCISES.HOLLOW_BODY_HOLD, 1),
      ],
    ),
    [WEEKDAY.FRIDAY]: createCircuitWorkout(
      'f6g7h8i9-j0k1-l2m3-n4o5-p16q17r18s19',
      'High Intensity Full Body Circuit - Explosive movements for cardio and strength',
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
