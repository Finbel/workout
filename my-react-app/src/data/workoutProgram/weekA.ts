import {
  WeekAMondayStrengthWorkout,
  WeekAMondayHypertrophyWorkout,
} from '../../schemas/workouts/workouts'
import { exercises } from './exercises'
import { BodyPartEnum } from '../../schemas/base/enums'

export const weekAMondayStrength: WeekAMondayStrengthWorkout = {
  id: 'week-a-monday-strength',
  name: 'Push Day - Strength',
  description: 'Heavy weight chest, shoulders, and triceps focus (6-8 reps)',
  week: 'A',
  day: 'Monday',
  style: 'strength',
  focus: [
    BodyPartEnum.enum.chest,
    BodyPartEnum.enum.shoulders,
    BodyPartEnum.enum.triceps,
    BodyPartEnum.enum.core,
  ],
  exercises: [
    { ...exercises.FlatDumbbellBenchPress, id: 'flat-db-bench-1' },
    { ...exercises.SeatedDumbbellShoulderPress, id: 'seated-db-press-1' },
    // Add more exercises...
  ],
  estimatedDuration: { value: 45, unit: 'minutes' },
}

export const weekAMondayHypertrophy: WeekAMondayHypertrophyWorkout = {
  id: 'week-a-monday-hypertrophy',
  name: 'Push Day - Volume',
  description:
    'Moderate weight chest, shoulders, and triceps focus (10-15 reps)',
  week: 'A',
  day: 'Monday',
  style: 'hypertrophy',
  focus: [
    BodyPartEnum.enum.chest,
    BodyPartEnum.enum.shoulders,
    BodyPartEnum.enum.triceps,
    BodyPartEnum.enum.core,
  ],
  exercises: [
    {
      ...exercises.FlatDumbbellBenchPress,
      id: 'flat-db-bench-2',
      recommendedReps: { min: 10, max: 12 },
    },
    {
      ...exercises.SeatedDumbbellShoulderPress,
      id: 'seated-db-press-2',
      recommendedReps: { min: 10, max: 12 },
    },
    // Add more exercises...
  ],
  estimatedDuration: { value: 45, unit: 'minutes' },
}
