import { z } from 'zod'
import {
  StrengthExerciseSchema,
  HIITExerciseSchema,
  IsometricExerciseSchema,
} from './base'

// Push Exercises
export const FlatDumbbellBenchPressSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('FlatDumbbellBenchPress'),
  targetMuscles: z.array(z.enum(['chest', 'shoulders', 'triceps'])),
  equipment: z.array(z.enum(['dumbbell', 'bench'])),
  description: z
    .string()
    .default(
      'Lie flat on bench, hold dumbbells at chest level. Press weights up until arms are extended, then lower back to starting position with controlled movement.',
    ),
})

export const InclineDumbbellBenchPressSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('InclineDumbbellBenchPress'),
  targetMuscles: z.array(z.enum(['chest', 'shoulders'])),
  equipment: z.array(z.enum(['dumbbell', 'bench'])),
  description: z
    .string()
    .default(
      'Set bench to 30-45 degree angle. Hold dumbbells at chest level, press up and slightly forward until arms are extended, lower back with control.',
    ),
})

export const SeatedDumbbellShoulderPressSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('SeatedDumbbellShoulderPress'),
  targetMuscles: z.array(z.enum(['shoulders', 'triceps'])),
  equipment: z.array(z.enum(['dumbbell', 'bench'])),
  description: z
    .string()
    .default(
      'Sit on bench with back support, hold dumbbells at shoulder level. Press weights overhead until arms are extended, lower back to shoulders with control.',
    ),
})

export const StandingDumbbellShoulderPressSchema =
  StrengthExerciseSchema.extend({
    schemaName: z.literal('StandingDumbbellShoulderPress'),
    targetMuscles: z.array(z.enum(['shoulders', 'triceps', 'core'])),
    equipment: z.array(z.enum(['dumbbell'])),
    description: z
      .string()
      .default(
        'Stand with feet shoulder-width apart, hold dumbbells at shoulder level. Press weights overhead until arms are extended, engage core throughout movement.',
      ),
  })

// Pull Exercises
export const BentOverDumbbellRowSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('BentOverDumbbellRow'),
  targetMuscles: z.array(z.enum(['back', 'biceps'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Hinge at hips, keep back straight. Hold dumbbells hanging down, pull weights to sides of chest while squeezing shoulder blades together.',
    ),
})

export const SingleArmDumbbellRowSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('SingleArmDumbbellRow'),
  targetMuscles: z.array(z.enum(['back', 'biceps', 'core'])),
  equipment: z.array(z.enum(['dumbbell', 'bench'])),
  description: z
    .string()
    .default(
      'Place one knee and hand on bench, other foot on ground. Hold dumbbell in free hand, pull weight to chest while keeping back straight and core engaged.',
    ),
})

// Leg Exercises
export const GobletSquatSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('GobletSquat'),
  targetMuscles: z.array(z.enum(['legs', 'core'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Hold dumbbell vertically at chest, feet shoulder-width. Squat down keeping chest up and knees tracking over toes, then drive through heels to stand.',
    ),
})

export const DumbbellRomanianDeadliftSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('DumbbellRomanianDeadlift'),
  targetMuscles: z.array(z.enum(['legs', 'glutes', 'back'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Hold dumbbells in front of thighs, hinge at hips while keeping back straight. Lower weights along legs until you feel hamstring stretch, then drive hips forward to stand.',
    ),
})

// Core Exercises
export const LyingLegRaisesSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('LyingLegRaises'),
  targetMuscles: z.array(z.enum(['core'])),
  equipment: z.array(z.enum(['floor'])),
  description: z
    .string()
    .default(
      'Lie on back, legs straight. Keeping legs together, raise them up until perpendicular to floor, lower back down with control while maintaining lower back contact.',
    ),
})

export const FrontPlankSchema = IsometricExerciseSchema.extend({
  schemaName: z.literal('FrontPlank'),
  targetMuscles: z.array(z.enum(['core', 'shoulders'])),
  equipment: z.array(z.enum(['floor'])),
  description: z
    .string()
    .default(
      'Support body on forearms and toes, maintaining straight line from head to heels. Keep core tight and avoid sagging or lifting hips.',
    ),
})

export const SidePlankSchema = IsometricExerciseSchema.extend({
  schemaName: z.literal('SidePlank'),
  targetMuscles: z.array(z.enum(['core'])),
  equipment: z.array(z.enum(['floor'])),
  description: z
    .string()
    .default(
      'Lie on side, support body on forearm with elbow under shoulder. Lift hips to create straight line from head to feet, maintain position while keeping core engaged.',
    ),
})

export const DumbbellRussianTwistsSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('DumbbellRussianTwists'),
  targetMuscles: z.array(z.enum(['core'])),
  equipment: z.array(z.enum(['dumbbell', 'floor'])),
  description: z
    .string()
    .default(
      'Sit with knees bent, feet off ground. Hold dumbbell at chest, lean back slightly. Rotate torso side to side while keeping core tight and back straight.',
    ),
})

// HIIT Exercises
export const DumbbellSquatToPressSchema = HIITExerciseSchema.extend({
  schemaName: z.literal('DumbbellSquatToPress'),
  targetMuscles: z.array(z.enum(['legs', 'shoulders', 'core'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Hold dumbbells at shoulders, perform squat, as you stand explosively press weights overhead. Return weights to shoulders as you lower into next squat.',
    ),
})

export const RenegadeRowSchema = HIITExerciseSchema.extend({
  schemaName: z.literal('RenegadeRow'),
  targetMuscles: z.array(z.enum(['back', 'core'])),
  equipment: z.array(z.enum(['dumbbell', 'floor'])),
  description: z
    .string()
    .default(
      'Start in plank position holding dumbbells. Keeping hips level, row one dumbbell to chest while balancing on other arm. Alternate sides.',
    ),
})

// Additional Strength Exercise Schemas
export const DumbbellFlySchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('DumbbellFly'),
  targetMuscles: z.array(z.enum(['chest', 'shoulders'])),
  equipment: z.array(z.enum(['dumbbell', 'bench'])),
  description: z
    .string()
    .default(
      'Lie on bench, arms extended with slight bend. Lower weights out to sides with control, maintaining arm position. Bring weights back up in hugging motion.',
    ),
})

export const BenchDipsSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('BenchDips'),
  targetMuscles: z.array(z.enum(['chest', 'triceps'])),
  equipment: z.array(z.enum(['bench'])),
  description: z
    .string()
    .default(
      'Place hands on bench behind you, legs extended. Lower body by bending elbows, keeping them close to body. Push back up to starting position.',
    ),
})

export const DumbbellReverseFlySchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('DumbbellReverseFly'),
  targetMuscles: z.array(z.enum(['shoulders', 'back'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Bend forward at hips, let arms hang down with dumbbells. Raise weights out to sides while squeezing shoulder blades together, lower with control.',
    ),
})

export const DumbbellBicepCurlsSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('DumbbellBicepCurls'),
  targetMuscles: z.array(z.enum(['biceps'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Stand with dumbbells at sides, palms forward. Curl weights toward shoulders while keeping upper arms still. Lower with control.',
    ),
})

export const WalkingDumbbellLungesSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('WalkingDumbbellLunges'),
  targetMuscles: z.array(z.enum(['legs', 'glutes'])),
  equipment: z.array(z.enum(['dumbbell', 'floor'])),
  description: z
    .string()
    .default(
      'Hold dumbbells at sides, step forward into lunge position. Lower back knee toward ground, push through front foot to step forward with back leg.',
    ),
})

export const StepUpsSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('StepUps'),
  targetMuscles: z.array(z.enum(['legs', 'glutes'])),
  equipment: z.array(z.enum(['bench'])),
  description: z
    .string()
    .default(
      'Stand facing bench, step one foot onto bench. Drive through heel to step up, bringing other foot onto bench. Step back down with control.',
    ),
})

export const CalfRaisesSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('CalfRaises'),
  targetMuscles: z.array(z.enum(['legs'])),
  equipment: z.array(z.enum(['floor'])),
  description: z
    .string()
    .default(
      'Stand with feet hip-width apart. Rise up onto balls of feet, lifting heels as high as possible. Lower back down with control.',
    ),
})

export const DumbbellFloorFlySchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('DumbbellFloorFly'),
  targetMuscles: z.array(z.enum(['chest', 'shoulders'])),
  equipment: z.array(z.enum(['dumbbell', 'floor'])),
  description: z
    .string()
    .default(
      'Lie on floor, arms extended with slight bend. Lower weights out to sides until upper arms touch floor. Bring weights back up in hugging motion.',
    ),
})

export const CloseGripDumbbellPressSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('CloseGripDumbbellPress'),
  targetMuscles: z.array(z.enum(['chest', 'triceps'])),
  equipment: z.array(z.enum(['dumbbell', 'bench'])),
  description: z
    .string()
    .default(
      'Lie on bench, hold dumbbells close together at chest. Press weights up while keeping them close together, lower back with control.',
    ),
})

export const FacePullsSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('FacePulls'),
  targetMuscles: z.array(z.enum(['shoulders', 'back'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Hold dumbbells at shoulder height, pull weights back while raising elbows up and out. Squeeze shoulder blades together at end of movement.',
    ),
})

export const PreacherCurlsSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('PreacherCurls'),
  targetMuscles: z.array(z.enum(['biceps'])),
  equipment: z.array(z.enum(['dumbbell', 'bench'])),
  description: z
    .string()
    .default(
      'Rest arms on incline bench, hold dumbbells with palms up. Curl weights toward shoulders while keeping upper arms in contact with bench.',
    ),
})

export const FrontSquatSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('FrontSquat'),
  targetMuscles: z.array(z.enum(['legs', 'core'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Hold dumbbells at shoulders, elbows high. Squat down keeping torso upright and elbows elevated, drive through heels to stand.',
    ),
})

export const BulgarianSplitSquatSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('BulgarianSplitSquat'),
  targetMuscles: z.array(z.enum(['legs', 'glutes'])),
  equipment: z.array(z.enum(['dumbbell', 'bench'])),
  description: z
    .string()
    .default(
      'Place one foot behind you on bench, hold dumbbells at sides. Lower back knee toward ground while keeping front knee aligned. Push through front foot to stand.',
    ),
})

export const SingleLegDeadliftSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('SingleLegDeadlift'),
  targetMuscles: z.array(z.enum(['legs', 'glutes', 'core'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Stand on one leg, hold dumbbells in front of thighs. Hinge at hips while raising back leg, keeping back straight. Return to standing position.',
    ),
})

export const LateralRaiseDropSetSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('LateralRaiseDropSet'),
  targetMuscles: z.array(z.enum(['shoulders'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Start with heavier weights, perform lateral raises. Immediately switch to lighter weights and continue raises until failure.',
    ),
})

export const FrontRaiseSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('FrontRaise'),
  targetMuscles: z.array(z.enum(['shoulders'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Hold dumbbells in front of thighs, palms facing back. Raise weights forward to shoulder height while keeping arms straight, lower with control.',
    ),
})

export const OverheadTricepExtensionSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('OverheadTricepExtension'),
  targetMuscles: z.array(z.enum(['triceps'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Hold dumbbell overhead with both hands, elbows pointing forward. Lower weight behind head by bending elbows, then extend arms to starting position.',
    ),
})

export const ConcentrationCurlsSchema = StrengthExerciseSchema.extend({
  schemaName: z.literal('ConcentrationCurls'),
  targetMuscles: z.array(z.enum(['biceps'])),
  equipment: z.array(z.enum(['dumbbell', 'bench'])),
  description: z
    .string()
    .default(
      'Sit on bench, rest elbow on inner thigh. Curl weight toward shoulder while keeping upper arm still, lower with control.',
    ),
})

// HIIT Exercise Schemas
export const BurpeeWithDumbbellCleanSchema = HIITExerciseSchema.extend({
  schemaName: z.literal('BurpeeWithDumbbellClean'),
  targetMuscles: z.array(z.enum(['fullBody'])),
  equipment: z.array(z.enum(['dumbbell', 'floor'])),
  description: z
    .string()
    .default(
      'Start standing with dumbbells, drop to plank position. Perform push-up, jump feet forward, clean dumbbells to shoulders while standing.',
    ),
})

export const DumbbellThrustersSchema = HIITExerciseSchema.extend({
  schemaName: z.literal('DumbbellThrusters'),
  targetMuscles: z.array(z.enum(['legs', 'shoulders', 'core'])),
  equipment: z.array(z.enum(['dumbbell'])),
  description: z
    .string()
    .default(
      'Hold dumbbells at shoulders, perform full squat. As you stand, explosively press weights overhead. Return to shoulder position as you squat.',
    ),
})

export const PlankToRowWithDumbbellsSchema = HIITExerciseSchema.extend({
  schemaName: z.literal('PlankToRowWithDumbbells'),
  targetMuscles: z.array(z.enum(['back', 'core'])),
  equipment: z.array(z.enum(['dumbbell', 'floor'])),
  description: z
    .string()
    .default(
      'Start in plank position holding dumbbells. Perform renegade row on each side, then jump feet forward and stand with upright row.',
    ),
})

export const JumpingLungesWithDumbbellsSchema = HIITExerciseSchema.extend({
  schemaName: z.literal('JumpingLungesWithDumbbells'),
  targetMuscles: z.array(z.enum(['legs', 'glutes'])),
  equipment: z.array(z.enum(['dumbbell', 'floor'])),
  description: z
    .string()
    .default(
      'Hold dumbbells at sides in lunge position. Jump to switch legs mid-air, landing softly in opposite lunge position.',
    ),
})

// Isometric Exercise Schema
export const InvertedRowHoldSchema = IsometricExerciseSchema.extend({
  schemaName: z.literal('InvertedRowHold'),
  targetMuscles: z.array(z.enum(['back', 'core'])),
  equipment: z.array(z.enum(['bench'])),
  description: z
    .string()
    .default(
      'Position under bench gripping edge, body straight. Pull chest to bench and hold position, maintaining tension in back muscles.',
    ),
})

export const PlankWithShoulderTapsSchema = IsometricExerciseSchema.extend({
  schemaName: z.literal('PlankWithShoulderTaps'),
  targetMuscles: z.array(z.enum(['core', 'shoulders'])),
  equipment: z.array(z.enum(['floor'])),
  description: z
    .string()
    .default(
      'Start in plank position. Maintaining hip stability, lift one hand to tap opposite shoulder. Alternate sides while keeping core engaged.',
    ),
})

// Combined specific exercise schema
export const SpecificExerciseSchema = z.discriminatedUnion('schemaName', [
  FlatDumbbellBenchPressSchema,
  InclineDumbbellBenchPressSchema,
  SeatedDumbbellShoulderPressSchema,
  StandingDumbbellShoulderPressSchema,
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
  DumbbellFlySchema,
  BenchDipsSchema,
  DumbbellReverseFlySchema,
  DumbbellBicepCurlsSchema,
  WalkingDumbbellLungesSchema,
  StepUpsSchema,
  CalfRaisesSchema,
  DumbbellFloorFlySchema,
  CloseGripDumbbellPressSchema,
  FacePullsSchema,
  PreacherCurlsSchema,
  FrontSquatSchema,
  BulgarianSplitSquatSchema,
  SingleLegDeadliftSchema,
  LateralRaiseDropSetSchema,
  FrontRaiseSchema,
  OverheadTricepExtensionSchema,
  ConcentrationCurlsSchema,
  BurpeeWithDumbbellCleanSchema,
  DumbbellThrustersSchema,
  PlankToRowWithDumbbellsSchema,
  JumpingLungesWithDumbbellsSchema,
  InvertedRowHoldSchema,
  PlankWithShoulderTapsSchema,
])

// Type inference
export type FlatDumbbellBenchPress = z.infer<
  typeof FlatDumbbellBenchPressSchema
>
export type InclineDumbbellBenchPress = z.infer<
  typeof InclineDumbbellBenchPressSchema
>
export type SeatedDumbbellShoulderPress = z.infer<
  typeof SeatedDumbbellShoulderPressSchema
>
export type StandingDumbbellShoulderPress = z.infer<
  typeof StandingDumbbellShoulderPressSchema
>
export type BentOverDumbbellRow = z.infer<typeof BentOverDumbbellRowSchema>
export type SingleArmDumbbellRow = z.infer<typeof SingleArmDumbbellRowSchema>
export type GobletSquat = z.infer<typeof GobletSquatSchema>
export type DumbbellRomanianDeadlift = z.infer<
  typeof DumbbellRomanianDeadliftSchema
>
export type LyingLegRaises = z.infer<typeof LyingLegRaisesSchema>
export type FrontPlank = z.infer<typeof FrontPlankSchema>
export type SidePlank = z.infer<typeof SidePlankSchema>
export type DumbbellRussianTwists = z.infer<typeof DumbbellRussianTwistsSchema>
export type DumbbellSquatToPress = z.infer<typeof DumbbellSquatToPressSchema>
export type RenegadeRow = z.infer<typeof RenegadeRowSchema>
export type DumbbellFly = z.infer<typeof DumbbellFlySchema>
export type BenchDips = z.infer<typeof BenchDipsSchema>
export type DumbbellReverseFly = z.infer<typeof DumbbellReverseFlySchema>
export type DumbbellBicepCurls = z.infer<typeof DumbbellBicepCurlsSchema>
export type WalkingDumbbellLunges = z.infer<typeof WalkingDumbbellLungesSchema>
export type StepUps = z.infer<typeof StepUpsSchema>
export type CalfRaises = z.infer<typeof CalfRaisesSchema>
export type DumbbellFloorFly = z.infer<typeof DumbbellFloorFlySchema>
export type CloseGripDumbbellPress = z.infer<
  typeof CloseGripDumbbellPressSchema
>
export type FacePulls = z.infer<typeof FacePullsSchema>
export type PreacherCurls = z.infer<typeof PreacherCurlsSchema>
export type FrontSquat = z.infer<typeof FrontSquatSchema>
export type BulgarianSplitSquat = z.infer<typeof BulgarianSplitSquatSchema>
export type SingleLegDeadlift = z.infer<typeof SingleLegDeadliftSchema>
export type LateralRaiseDropSet = z.infer<typeof LateralRaiseDropSetSchema>
export type FrontRaise = z.infer<typeof FrontRaiseSchema>
export type OverheadTricepExtension = z.infer<
  typeof OverheadTricepExtensionSchema
>
export type ConcentrationCurls = z.infer<typeof ConcentrationCurlsSchema>
export type BurpeeWithDumbbellClean = z.infer<
  typeof BurpeeWithDumbbellCleanSchema
>
export type DumbbellThrusters = z.infer<typeof DumbbellThrustersSchema>
export type PlankToRowWithDumbbells = z.infer<
  typeof PlankToRowWithDumbbellsSchema
>
export type JumpingLungesWithDumbbells = z.infer<
  typeof JumpingLungesWithDumbbellsSchema
>
export type InvertedRowHold = z.infer<typeof InvertedRowHoldSchema>
export type PlankWithShoulderTaps = z.infer<typeof PlankWithShoulderTapsSchema>
export type SpecificExercise = z.infer<typeof SpecificExerciseSchema>
