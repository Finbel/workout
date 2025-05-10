import { ExerciseName, InputType } from '../../domain/constants'
import { BaseExercise } from '../../domain/entities'

type ExerciseMap = Record<ExerciseName, BaseExercise>

export const EXERCISES: ExerciseMap = {
  DUMBBELL_BENCH_PRESS: {
    id: 'DUMBBELL_BENCH_PRESS',
    name: ExerciseName.DUMBBELL_BENCH_PRESS,
    description: 'Bench press with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_SHOULDER_PRESS: {
    id: 'DUMBBELL_SHOULDER_PRESS',
    name: ExerciseName.DUMBBELL_SHOULDER_PRESS,
    description: 'Shoulder press with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_TRICEP_OVERHEAD_EXTENSION: {
    id: 'DUMBBELL_TRICEP_OVERHEAD_EXTENSION',
    name: ExerciseName.DUMBBELL_TRICEP_OVERHEAD_EXTENSION,
    description: 'Overhead tricep extension with dumbbell.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_LATERAL_RAISE: {
    id: 'DUMBBELL_LATERAL_RAISE',
    name: ExerciseName.DUMBBELL_LATERAL_RAISE,
    description: 'Lateral raises with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_FRONT_RAISE: {
    id: 'DUMBBELL_FRONT_RAISE',
    name: ExerciseName.DUMBBELL_FRONT_RAISE,
    description: 'Front raises with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_SHRUG: {
    id: 'DUMBBELL_SHRUG',
    name: ExerciseName.DUMBBELL_SHRUG,
    description: 'Shrugs with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_CONCENTRATION_CURL: {
    id: 'DUMBBELL_CONCENTRATION_CURL',
    name: ExerciseName.DUMBBELL_CONCENTRATION_CURL,
    description: 'Concentration curls with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_TRICEP_KICKBACK: {
    id: 'DUMBBELL_TRICEP_KICKBACK',
    name: ExerciseName.DUMBBELL_TRICEP_KICKBACK,
    description: 'Tricep kickbacks with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  HOLLOW_BODY_HOLD: {
    id: 'HOLLOW_BODY_HOLD',
    name: ExerciseName.HOLLOW_BODY_HOLD,
    description: 'Core stability hold exercise.',
    expectedInputs: [InputType.SECONDS],
  },
  PLANK: {
    id: 'PLANK',
    name: ExerciseName.PLANK,
    description: 'Hold a plank position.',
    expectedInputs: [InputType.SECONDS],
  },
  DUMBBELL_BENT_OVER_ROW: {
    id: 'DUMBBELL_BENT_OVER_ROW',
    name: ExerciseName.DUMBBELL_BENT_OVER_ROW,
    description: 'Bent-over rows with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_BICEP_CURL: {
    id: 'DUMBBELL_BICEP_CURL',
    name: ExerciseName.DUMBBELL_BICEP_CURL,
    description: 'Bicep curls with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_REVERSE_FLY: {
    id: 'DUMBBELL_REVERSE_FLY',
    name: ExerciseName.DUMBBELL_REVERSE_FLY,
    description: 'Reverse flys with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_HAMMER_CURL: {
    id: 'DUMBBELL_HAMMER_CURL',
    name: ExerciseName.DUMBBELL_HAMMER_CURL,
    description: 'Hammer curls with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  RUSSIAN_TWIST: {
    id: 'RUSSIAN_TWIST',
    name: ExerciseName.RUSSIAN_TWIST,
    description: 'Twisting core exercise.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  BURPEES: {
    id: 'BURPEES',
    name: ExerciseName.BURPEES,
    description: 'Full-body burpee exercise.',
    expectedInputs: [InputType.SECONDS],
  },
  DUMBBELL_THRUSTER: {
    id: 'DUMBBELL_THRUSTER',
    name: ExerciseName.DUMBBELL_THRUSTER,
    description: 'Full-body thruster with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_SWING: {
    id: 'DUMBBELL_SWING',
    name: ExerciseName.DUMBBELL_SWING,
    description: 'Kettlebell-style swing with dumbbell.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  MOUNTAIN_CLIMBERS: {
    id: 'MOUNTAIN_CLIMBERS',
    name: ExerciseName.MOUNTAIN_CLIMBERS,
    description: 'Cardio-based mountain climbers.',
    expectedInputs: [InputType.SECONDS],
  },
  BICYCLE_CRUNCHES: {
    id: 'BICYCLE_CRUNCHES',
    name: ExerciseName.BICYCLE_CRUNCHES,
    description: 'Core exercise with bicycle motion.',
    expectedInputs: [InputType.REPS],
  },
  DUMBBELL_SQUAT: {
    id: 'DUMBBELL_SQUAT',
    name: ExerciseName.DUMBBELL_SQUAT,
    description: 'Squats with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_LUNGES: {
    id: 'DUMBBELL_LUNGES',
    name: ExerciseName.DUMBBELL_LUNGES,
    description: 'Lunges with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_ROMANIAN_DEADLIFT: {
    id: 'DUMBBELL_ROMANIAN_DEADLIFT',
    name: ExerciseName.DUMBBELL_ROMANIAN_DEADLIFT,
    description: 'Romanian deadlifts with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  DUMBBELL_CALF_RAISE: {
    id: 'DUMBBELL_CALF_RAISE',
    name: ExerciseName.DUMBBELL_CALF_RAISE,
    description: 'Calf raises with dumbbells.',
    expectedInputs: [InputType.WEIGHT, InputType.REPS],
  },
  LEG_RAISES: {
    id: 'LEG_RAISES',
    name: ExerciseName.LEG_RAISES,
    description: 'Leg raise core exercise.',
    expectedInputs: [InputType.REPS],
  },
}
