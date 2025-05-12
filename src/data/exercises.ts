import { EXERCISE_NAME, INPUT_TYPE } from '../constants'
import { Exercise, ExerciseName } from '../types'

type ExerciseMap = Record<ExerciseName, Exercise>

export const EXERCISES: ExerciseMap = {
  DUMBBELL_BENCH_PRESS: {
    name: EXERCISE_NAME.DUMBBELL_BENCH_PRESS,
    description: 'Bench press with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_SHOULDER_PRESS: {
    name: EXERCISE_NAME.DUMBBELL_SHOULDER_PRESS,
    description: 'Shoulder press with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_TRICEP_OVERHEAD_EXTENSION: {
    name: EXERCISE_NAME.DUMBBELL_TRICEP_OVERHEAD_EXTENSION,
    description: 'Overhead tricep extension with dumbbell.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_LATERAL_RAISE: {
    name: EXERCISE_NAME.DUMBBELL_LATERAL_RAISE,
    description: 'Lateral raises with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_FRONT_RAISE: {
    name: EXERCISE_NAME.DUMBBELL_FRONT_RAISE,
    description: 'Front raises with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_SHRUG: {
    name: EXERCISE_NAME.DUMBBELL_SHRUG,
    description: 'Shrugs with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_CONCENTRATION_CURL: {
    name: EXERCISE_NAME.DUMBBELL_CONCENTRATION_CURL,
    description: 'Concentration curls with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_TRICEP_KICKBACK: {
    name: EXERCISE_NAME.DUMBBELL_TRICEP_KICKBACK,
    description: 'Tricep kickbacks with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  HOLLOW_BODY_HOLD: {
    name: EXERCISE_NAME.HOLLOW_BODY_HOLD,
    description: 'Core stability hold exercise.',
    expectedInputs: [INPUT_TYPE.SECONDS],
  },
  PLANK: {
    name: EXERCISE_NAME.PLANK,
    description: 'Hold a plank position.',
    expectedInputs: [INPUT_TYPE.SECONDS],
  },
  DUMBBELL_BENT_OVER_ROW: {
    name: EXERCISE_NAME.DUMBBELL_BENT_OVER_ROW,
    description: 'Bent-over rows with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_BICEP_CURL: {
    name: EXERCISE_NAME.DUMBBELL_BICEP_CURL,
    description: 'Bicep curls with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_REVERSE_FLY: {
    name: EXERCISE_NAME.DUMBBELL_REVERSE_FLY,
    description: 'Reverse flys with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_HAMMER_CURL: {
    name: EXERCISE_NAME.DUMBBELL_HAMMER_CURL,
    description: 'Hammer curls with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  RUSSIAN_TWIST: {
    name: EXERCISE_NAME.RUSSIAN_TWIST,
    description: 'Twisting core exercise.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  BURPEES: {
    name: EXERCISE_NAME.BURPEES,
    description: 'Full-body burpee exercise.',
    expectedInputs: [INPUT_TYPE.SECONDS],
  },
  DUMBBELL_THRUSTER: {
    name: EXERCISE_NAME.DUMBBELL_THRUSTER,
    description: 'Full-body thruster with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_SWING: {
    name: EXERCISE_NAME.DUMBBELL_SWING,
    description: 'Kettlebell-style swing with dumbbell.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  MOUNTAIN_CLIMBERS: {
    name: EXERCISE_NAME.MOUNTAIN_CLIMBERS,
    description: 'Cardio-based mountain climbers.',
    expectedInputs: [INPUT_TYPE.SECONDS],
  },
  BICYCLE_CRUNCHES: {
    name: EXERCISE_NAME.BICYCLE_CRUNCHES,
    description: 'Core exercise with bicycle motion.',
    expectedInputs: [INPUT_TYPE.REPS],
  },
  DUMBBELL_SQUAT: {
    name: EXERCISE_NAME.DUMBBELL_SQUAT,
    description: 'Squats with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_LUNGES: {
    name: EXERCISE_NAME.DUMBBELL_LUNGES,
    description: 'Lunges with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_ROMANIAN_DEADLIFT: {
    name: EXERCISE_NAME.DUMBBELL_ROMANIAN_DEADLIFT,
    description: 'Romanian deadlifts with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_CALF_RAISE: {
    name: EXERCISE_NAME.DUMBBELL_CALF_RAISE,
    description: 'Calf raises with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  LEG_RAISES: {
    name: EXERCISE_NAME.LEG_RAISES,
    description: 'Leg raise core exercise.',
    expectedInputs: [INPUT_TYPE.REPS],
  },
}
