import { WEEKDAY } from '../constants'
import { EXERCISES } from './exercises'
import { NamedWorkoutSchedule } from '../types'
import { sheduledExercise } from '../utils'

const myWorkoutSchedule: NamedWorkoutSchedule = {
  name: 'Full-Body Strength & HIIT',
  schedule: {
    [WEEKDAY.MONDAY]: {
      type: 'standard',
      exercises: [
        sheduledExercise(EXERCISES.DUMBBELL_BENCH_PRESS, 4),
        sheduledExercise(EXERCISES.DUMBBELL_SHOULDER_PRESS, 3),
        sheduledExercise(EXERCISES.DUMBBELL_TRICEP_OVERHEAD_EXTENSION, 3),
        sheduledExercise(EXERCISES.DUMBBELL_LATERAL_RAISE, 3),
        sheduledExercise(EXERCISES.PLANK, 3),
      ],
    },
    [WEEKDAY.TUESDAY]: {
      type: 'standard',
      exercises: [
        sheduledExercise(EXERCISES.DUMBBELL_BENT_OVER_ROW, 4),
        sheduledExercise(EXERCISES.DUMBBELL_BICEP_CURL, 3),
        sheduledExercise(EXERCISES.DUMBBELL_REVERSE_FLY, 3),
        sheduledExercise(EXERCISES.DUMBBELL_HAMMER_CURL, 3),
        sheduledExercise(EXERCISES.RUSSIAN_TWIST, 3),
      ],
    },
    [WEEKDAY.WEDNESDAY]: {
      type: 'standard',
      exercises: [
        sheduledExercise(EXERCISES.DUMBBELL_SQUAT, 4),
        sheduledExercise(EXERCISES.DUMBBELL_LUNGES, 3),
        sheduledExercise(EXERCISES.DUMBBELL_ROMANIAN_DEADLIFT, 3),
        sheduledExercise(EXERCISES.DUMBBELL_CALF_RAISE, 3),
        sheduledExercise(EXERCISES.LEG_RAISES, 3),
      ],
    },
    [WEEKDAY.THURSDAY]: {
      type: 'standard',
      exercises: [
        sheduledExercise(EXERCISES.DUMBBELL_FRONT_RAISE, 3),
        sheduledExercise(EXERCISES.DUMBBELL_SHRUG, 3),
        sheduledExercise(EXERCISES.DUMBBELL_CONCENTRATION_CURL, 3),
        sheduledExercise(EXERCISES.DUMBBELL_TRICEP_KICKBACK, 3),
        sheduledExercise(EXERCISES.HOLLOW_BODY_HOLD, 1),
      ],
    },
    [WEEKDAY.FRIDAY]: {
      type: 'circuit',
      rounds: 3,
      exercises: [
        EXERCISES.BURPEES,
        EXERCISES.DUMBBELL_THRUSTER,
        EXERCISES.DUMBBELL_SWING,
        EXERCISES.MOUNTAIN_CLIMBERS,
        EXERCISES.BICYCLE_CRUNCHES,
      ],
    },
  },
}

export const workoutSchedules: NamedWorkoutSchedule[] = [myWorkoutSchedule]
