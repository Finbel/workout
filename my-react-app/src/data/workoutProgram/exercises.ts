import { StrengthExercise } from '../../schemas/exercises/base'
import {
  BodyPartEnum,
  DifficultyEnum,
  EquipmentEnum,
} from '../../schemas/base/enums'

export const exercises: Record<string, Omit<StrengthExercise, 'id'>> = {
  FlatDumbbellBenchPress: {
    name: 'Flat Dumbbell Bench Press',
    description:
      'Lie flat on bench, hold dumbbells at chest level. Press weights up until arms are extended, then lower back to starting position with controlled movement.',
    type: 'strength',
    targetMuscles: [
      BodyPartEnum.enum.chest,
      BodyPartEnum.enum.shoulders,
      BodyPartEnum.enum.triceps,
    ],
    equipment: [EquipmentEnum.enum.dumbbell, EquipmentEnum.enum.bench],
    difficulty: DifficultyEnum.enum.intermediate,
    instructions: [
      'Set up bench flat',
      'Lie back with dumbbells at chest',
      'Press weights up',
      'Lower with control',
    ],
    recommendedSets: 4,
    recommendedReps: { min: 6, max: 8 },
  },

  SeatedDumbbellShoulderPress: {
    name: 'Seated Dumbbell Shoulder Press',
    description:
      'Sit on bench with back support, hold dumbbells at shoulder level. Press weights overhead until arms are extended, lower back to shoulders with control.',
    type: 'strength',
    targetMuscles: [BodyPartEnum.enum.shoulders, BodyPartEnum.enum.triceps],
    equipment: [EquipmentEnum.enum.dumbbell, EquipmentEnum.enum.bench],
    difficulty: DifficultyEnum.enum.intermediate,
    instructions: [
      'Sit on bench with back support',
      'Hold dumbbells at shoulders',
      'Press overhead',
      'Lower with control',
    ],
    recommendedSets: 3,
    recommendedReps: { min: 6, max: 8 },
  },

  // Add more base exercise definitions here...
}
