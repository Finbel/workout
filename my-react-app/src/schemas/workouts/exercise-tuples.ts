import { z } from 'zod'
import {
  FlatDumbbellBenchPressSchema,
  SeatedDumbbellShoulderPressSchema,
  BentOverDumbbellRowSchema,
  SingleArmDumbbellRowSchema,
  GobletSquatSchema,
  DumbbellRomanianDeadliftSchema,
  LyingLegRaisesSchema,
  FrontPlankSchema,
  SidePlankSchema,
  DumbbellRussianTwistsSchema,
  DumbbellSquatToPressSchema,
  RenegadeRowSchema,
  InclineDumbbellBenchPressSchema,
  StandingDumbbellShoulderPressSchema,
} from '../exercises/specific'
import {
  StrengthExerciseSchema,
  HIITExerciseSchema,
  IsometricExerciseSchema,
} from '../exercises/base'

// Exercise Tuples for Week A
export const WeekAMondayStrengthExercises = z.tuple([
  FlatDumbbellBenchPressSchema.extend({
    recommendedSets: z.literal(4),
    recommendedReps: z.object({ min: z.literal(6), max: z.literal(8) }),
  }),
  SeatedDumbbellShoulderPressSchema.extend({
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(6), max: z.literal(8) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('DumbbellFly'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(6), max: z.literal(8) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('BenchDips'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(6), max: z.literal(8) }),
  }),
  LyingLegRaisesSchema.extend({
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
])

export const WeekAMondayHypertrophyExercises = z.tuple([
  FlatDumbbellBenchPressSchema.extend({
    recommendedSets: z.literal(4),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  SeatedDumbbellShoulderPressSchema.extend({
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('DumbbellFly'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(12), max: z.literal(15) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('BenchDips'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(12), max: z.literal(15) }),
  }),
  LyingLegRaisesSchema.extend({
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(15), max: z.literal(20) }),
  }),
])

export const WeekATuesdayStrengthExercises = z.tuple([
  BentOverDumbbellRowSchema.extend({
    recommendedSets: z.literal(4),
    recommendedReps: z.object({ min: z.literal(6), max: z.literal(8) }),
  }),
  SingleArmDumbbellRowSchema.extend({
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(6), max: z.literal(8) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('DumbbellReverseFly'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(8), max: z.literal(10) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('DumbbellBicepCurls'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(6), max: z.literal(8) }),
  }),
  FrontPlankSchema.extend({
    sets: z.literal(3),
    holdDuration: z.object({
      value: z.number().min(45).max(60),
      unit: z.literal('seconds'),
    }),
  }),
])

export const WeekATuesdayHypertrophyExercises = z.tuple([
  BentOverDumbbellRowSchema.extend({
    recommendedSets: z.literal(4),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  SingleArmDumbbellRowSchema.extend({
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('DumbbellReverseFly'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(12), max: z.literal(15) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('DumbbellBicepCurls'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(12), max: z.literal(15) }),
  }),
  FrontPlankSchema.extend({
    sets: z.literal(3),
    holdDuration: z.object({
      value: z.number().min(30).max(45),
      unit: z.literal('seconds'),
    }),
  }),
])

export const WeekAWednesdayExercises = z.tuple([
  GobletSquatSchema.extend({
    recommendedSets: z.literal(4),
    recommendedReps: z.object({ min: z.literal(8), max: z.literal(10) }),
  }),
  DumbbellRomanianDeadliftSchema.extend({
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(8), max: z.literal(10) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('WalkingDumbbellLunges'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(8), max: z.literal(10) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('StepUps'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('CalfRaises'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(12), max: z.literal(15) }),
  }),
  SidePlankSchema.extend({
    sets: z.literal(3),
    holdDuration: z.object({
      value: z.number().min(30).max(45),
      unit: z.literal('seconds'),
    }),
  }),
])

export const WeekAThursdayExercises = z.tuple([
  StrengthExerciseSchema.extend({
    schemaName: z.literal('ArnoldPress'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(8), max: z.literal(10) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('LateralRaises'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('UprightRow'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('SkullCrushers'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('HammerCurls'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('BenchReverseCrunch'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
])

export const WeekAFridayExercises = z.tuple([
  DumbbellSquatToPressSchema.extend({
    rounds: z.number().min(3).max(5),
    workDuration: z.object({
      value: z.literal(30),
      unit: z.literal('seconds'),
    }),
    restDuration: z.object({
      value: z.number().min(15).max(30),
      unit: z.literal('seconds'),
    }),
  }),
  HIITExerciseSchema.extend({
    schemaName: z.literal('PushUps'),
    rounds: z.number().min(3).max(5),
    workDuration: z.object({
      value: z.literal(30),
      unit: z.literal('seconds'),
    }),
    restDuration: z.object({
      value: z.number().min(15).max(30),
      unit: z.literal('seconds'),
    }),
  }),
  HIITExerciseSchema.extend({
    schemaName: z.literal('AlternatingDumbbellLunges'),
    rounds: z.number().min(3).max(5),
    workDuration: z.object({
      value: z.literal(30),
      unit: z.literal('seconds'),
    }),
    restDuration: z.object({
      value: z.number().min(15).max(30),
      unit: z.literal('seconds'),
    }),
  }),
  RenegadeRowSchema.extend({
    rounds: z.number().min(3).max(5),
    workDuration: z.object({
      value: z.literal(30),
      unit: z.literal('seconds'),
    }),
    restDuration: z.object({
      value: z.number().min(15).max(30),
      unit: z.literal('seconds'),
    }),
  }),
  HIITExerciseSchema.extend({
    schemaName: z.literal('MountainClimbers'),
    rounds: z.number().min(3).max(5),
    workDuration: z.object({
      value: z.literal(30),
      unit: z.literal('seconds'),
    }),
    restDuration: z.object({
      value: z.number().min(15).max(30),
      unit: z.literal('seconds'),
    }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('BicycleCrunches'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(30), max: z.literal(60) }),
  }).optional(),
])

// Exercise Tuples for Week B
export const WeekBMondayExercises = z.tuple([
  InclineDumbbellBenchPressSchema.extend({
    recommendedSets: z.literal(4),
    recommendedReps: z.object({ min: z.literal(8), max: z.literal(10) }),
  }),
  StandingDumbbellShoulderPressSchema.extend({
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(8), max: z.literal(10) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('DumbbellFloorFly'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('CloseGripDumbbellPress'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  SidePlankSchema.extend({
    sets: z.literal(3),
    holdDuration: z.object({
      value: z.number().min(30).max(45),
      unit: z.literal('seconds'),
    }),
  }),
])

export const WeekBTuesdayExercises = z.tuple([
  SingleArmDumbbellRowSchema.extend({
    recommendedSets: z.literal(4),
    recommendedReps: z.object({ min: z.literal(8), max: z.literal(10) }),
  }),
  BentOverDumbbellRowSchema.extend({
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(8), max: z.literal(10) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('FacePulls'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(12), max: z.literal(15) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('PreacherCurls'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  IsometricExerciseSchema.extend({
    schemaName: z.literal('InvertedRowHold'),
    sets: z.literal(3),
    holdDuration: z.object({
      value: z.number().min(20).max(30),
      unit: z.literal('seconds'),
    }),
  }),
])

export const WeekBWednesdayExercises = z.tuple([
  StrengthExerciseSchema.extend({
    schemaName: z.literal('FrontSquat'),
    recommendedSets: z.literal(4),
    recommendedReps: z.object({ min: z.literal(6), max: z.literal(8) }),
  }),
  DumbbellRomanianDeadliftSchema.extend({
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(8), max: z.literal(10) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('BulgarianSplitSquat'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(8), max: z.literal(10) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('SingleLegDeadlift'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  DumbbellRussianTwistsSchema.extend({
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(20), max: z.literal(30) }),
  }),
])

export const WeekBThursdayExercises = z.tuple([
  StrengthExerciseSchema.extend({
    schemaName: z.literal('LateralRaiseDropSet'),
    recommendedSets: z.literal(4),
    recommendedReps: z.object({ min: z.literal(12), max: z.literal(15) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('FrontRaise'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(10), max: z.literal(12) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('OverheadTricepExtension'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(12), max: z.literal(15) }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('ConcentrationCurls'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(12), max: z.literal(15) }),
  }),
  LyingLegRaisesSchema.extend({
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(15), max: z.literal(20) }),
  }),
])

export const WeekBFridayExercises = z.tuple([
  HIITExerciseSchema.extend({
    schemaName: z.literal('BurpeeWithDumbbellClean'),
    rounds: z.number().min(3).max(5),
    workDuration: z.object({
      value: z.literal(30),
      unit: z.literal('seconds'),
    }),
    restDuration: z.object({
      value: z.number().min(15).max(30),
      unit: z.literal('seconds'),
    }),
  }),
  HIITExerciseSchema.extend({
    schemaName: z.literal('DumbbellThrusters'),
    rounds: z.number().min(3).max(5),
    workDuration: z.object({
      value: z.literal(30),
      unit: z.literal('seconds'),
    }),
    restDuration: z.object({
      value: z.number().min(15).max(30),
      unit: z.literal('seconds'),
    }),
  }),
  HIITExerciseSchema.extend({
    schemaName: z.literal('PlankToRowWithDumbbells'),
    rounds: z.number().min(3).max(5),
    workDuration: z.object({
      value: z.literal(30),
      unit: z.literal('seconds'),
    }),
    restDuration: z.object({
      value: z.number().min(15).max(30),
      unit: z.literal('seconds'),
    }),
  }),
  HIITExerciseSchema.extend({
    schemaName: z.literal('JumpingLungesWithDumbbells'),
    rounds: z.number().min(3).max(5),
    workDuration: z.object({
      value: z.literal(30),
      unit: z.literal('seconds'),
    }),
    restDuration: z.object({
      value: z.number().min(15).max(30),
      unit: z.literal('seconds'),
    }),
  }),
  StrengthExerciseSchema.extend({
    schemaName: z.literal('PlankWithShoulderTaps'),
    recommendedSets: z.literal(3),
    recommendedReps: z.object({ min: z.literal(20), max: z.literal(30) }),
  }),
])

// Update the workout schema references
export const WeekAMondayExercises = z.union([
  WeekAMondayStrengthExercises,
  WeekAMondayHypertrophyExercises,
])

export const WeekATuesdayExercises = z.union([
  WeekATuesdayStrengthExercises,
  WeekATuesdayHypertrophyExercises,
])

// Type inference
// Week A Exercise Types
export type WeekAMondayStrengthExercises = z.infer<
  typeof WeekAMondayStrengthExercises
>
export type WeekAMondayHypertrophyExercises = z.infer<
  typeof WeekAMondayHypertrophyExercises
>
export type WeekATuesdayStrengthExercises = z.infer<
  typeof WeekATuesdayStrengthExercises
>
export type WeekATuesdayHypertrophyExercises = z.infer<
  typeof WeekATuesdayHypertrophyExercises
>
export type WeekAWednesdayExercises = z.infer<typeof WeekAWednesdayExercises>
export type WeekAThursdayExercises = z.infer<typeof WeekAThursdayExercises>
export type WeekAFridayExercises = z.infer<typeof WeekAFridayExercises>

// Week B Exercise Types
export type WeekBMondayExercises = z.infer<typeof WeekBMondayExercises>
export type WeekBTuesdayExercises = z.infer<typeof WeekBTuesdayExercises>
export type WeekBWednesdayExercises = z.infer<typeof WeekBWednesdayExercises>
export type WeekBThursdayExercises = z.infer<typeof WeekBThursdayExercises>
export type WeekBFridayExercises = z.infer<typeof WeekBFridayExercises>
