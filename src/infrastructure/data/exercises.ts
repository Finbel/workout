import { EXERCISE_NAME, ExerciseName, INPUT_TYPE } from '../../domain/constants'
import { BaseExercise } from '../../domain/entities'

type ExerciseMap = Record<ExerciseName, BaseExercise>

export const EXERCISES: ExerciseMap = {
  DUMBBELL_BENCH_PRESS: {
    id: '8f7d3b2a-1c4e-5d6f-9a8b-7c0d2e3f4a5b',
    name: EXERCISE_NAME.DUMBBELL_BENCH_PRESS,
    description: 'Bench press with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_SHOULDER_PRESS: {
    id: '2e3f4a5b-6c7d-8e9f-0a1b-2c3d4e5f6a7b',
    name: EXERCISE_NAME.DUMBBELL_SHOULDER_PRESS,
    description: 'Shoulder press with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_TRICEP_OVERHEAD_EXTENSION: {
    id: '4a5b6c7d-8e9f-0a1b-2c3d-4e5f6a7b8c9d',
    name: EXERCISE_NAME.DUMBBELL_TRICEP_OVERHEAD_EXTENSION,
    description: 'Overhead tricep extension with dumbbell.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_LATERAL_RAISE: {
    id: '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f',
    name: EXERCISE_NAME.DUMBBELL_LATERAL_RAISE,
    description: 'Lateral raises with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_FRONT_RAISE: {
    id: '8e9f0a1b-2c3d-4e5f-6a7b-8c9d0e1f2a3b',
    name: EXERCISE_NAME.DUMBBELL_FRONT_RAISE,
    description: 'Front raises with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_SHRUG: {
    id: '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
    name: EXERCISE_NAME.DUMBBELL_SHRUG,
    description: 'Shrugs with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_CONCENTRATION_CURL: {
    id: '2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f',
    name: EXERCISE_NAME.DUMBBELL_CONCENTRATION_CURL,
    description: 'Concentration curls with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_TRICEP_KICKBACK: {
    id: '4e5f6a7b-8c9d-0e1f-2a3b-4c5d6e7f8a9b',
    name: EXERCISE_NAME.DUMBBELL_TRICEP_KICKBACK,
    description: 'Tricep kickbacks with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  HOLLOW_BODY_HOLD: {
    id: '6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d',
    name: EXERCISE_NAME.HOLLOW_BODY_HOLD,
    description: 'Core stability hold exercise.',
    expectedInputs: [INPUT_TYPE.SECONDS],
  },
  PLANK: {
    id: '8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f',
    name: EXERCISE_NAME.PLANK,
    description: 'Hold a plank position.',
    expectedInputs: [INPUT_TYPE.SECONDS],
  },
  DUMBBELL_BENT_OVER_ROW: {
    id: '0e1f2a3b-4c5d-6e7f-8a9b-0c1d2e3f4a5b',
    name: EXERCISE_NAME.DUMBBELL_BENT_OVER_ROW,
    description: 'Bent-over rows with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_BICEP_CURL: {
    id: '2a3b4c5d-6e7f-8a9b-0c1d-2e3f4a5b6c7d',
    name: EXERCISE_NAME.DUMBBELL_BICEP_CURL,
    description: 'Bicep curls with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_REVERSE_FLY: {
    id: '4c5d6e7f-8a9b-0c1d-2e3f-4a5b6c7d8e9f',
    name: EXERCISE_NAME.DUMBBELL_REVERSE_FLY,
    description: 'Reverse flys with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_HAMMER_CURL: {
    id: '6e7f8a9b-0c1d-2e3f-4a5b-6c7d8e9f0a1b',
    name: EXERCISE_NAME.DUMBBELL_HAMMER_CURL,
    description: 'Hammer curls with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  RUSSIAN_TWIST: {
    id: '8a9b0c1d-2e3f-4a5b-6c7d-8e9f0a1b2c3d',
    name: EXERCISE_NAME.RUSSIAN_TWIST,
    description: 'Twisting core exercise.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  BURPEES: {
    id: '0c1d2e3f-4a5b-6c7d-8e9f-0a1b2c3d4e5f',
    name: EXERCISE_NAME.BURPEES,
    description: 'Full-body burpee exercise.',
    expectedInputs: [INPUT_TYPE.SECONDS],
  },
  DUMBBELL_THRUSTER: {
    id: '2e3f4a5b-6c7d-8e9f-0a1b-2c3d4e5f6a7b',
    name: EXERCISE_NAME.DUMBBELL_THRUSTER,
    description: 'Full-body thruster with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_SWING: {
    id: '4a5b6c7d-8e9f-0a1b-2c3d-4e5f6a7b8c9d',
    name: EXERCISE_NAME.DUMBBELL_SWING,
    description: 'Kettlebell-style swing with dumbbell.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  MOUNTAIN_CLIMBERS: {
    id: '6c7d8e9f-0a1b-2c3d-4e5f-6a7b8c9d0e1f',
    name: EXERCISE_NAME.MOUNTAIN_CLIMBERS,
    description: 'Cardio-based mountain climbers.',
    expectedInputs: [INPUT_TYPE.SECONDS],
  },
  BICYCLE_CRUNCHES: {
    id: '8e9f0a1b-2c3d-4e5f-6a7b-8c9d0e1f2a3b',
    name: EXERCISE_NAME.BICYCLE_CRUNCHES,
    description: 'Core exercise with bicycle motion.',
    expectedInputs: [INPUT_TYPE.REPS],
  },
  DUMBBELL_SQUAT: {
    id: '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
    name: EXERCISE_NAME.DUMBBELL_SQUAT,
    description: 'Squats with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_LUNGES: {
    id: '2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f',
    name: EXERCISE_NAME.DUMBBELL_LUNGES,
    description: 'Lunges with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_ROMANIAN_DEADLIFT: {
    id: '4e5f6a7b-8c9d-0e1f-2a3b-4c5d6e7f8a9b',
    name: EXERCISE_NAME.DUMBBELL_ROMANIAN_DEADLIFT,
    description: 'Romanian deadlifts with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  DUMBBELL_CALF_RAISE: {
    id: '6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d',
    name: EXERCISE_NAME.DUMBBELL_CALF_RAISE,
    description: 'Calf raises with dumbbells.',
    expectedInputs: [INPUT_TYPE.WEIGHT, INPUT_TYPE.REPS],
  },
  LEG_RAISES: {
    id: '8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f',
    name: EXERCISE_NAME.LEG_RAISES,
    description: 'Leg raise core exercise.',
    expectedInputs: [INPUT_TYPE.REPS],
  },
}
