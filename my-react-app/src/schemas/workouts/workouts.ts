import { z } from 'zod'
import { BodyPartEnum, WorkoutStyleEnum } from '../base/enums'
import { DurationSchema } from '../base/measurements'
import { ExerciseSchema } from '../exercises/base'
import {
  WeekAMondayExercises,
  WeekATuesdayExercises,
  WeekAWednesdayExercises,
  WeekAThursdayExercises,
  WeekAFridayExercises,
  WeekBMondayExercises,
  WeekBTuesdayExercises,
  WeekBWednesdayExercises,
  WeekBThursdayExercises,
  WeekBFridayExercises,
} from './exercise-tuples'

// Base Workout Schema
export const BaseWorkoutSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  week: z.enum(['A', 'B']),
  day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
  style: WorkoutStyleEnum,
  focus: z.array(BodyPartEnum),
  exercises: z.array(ExerciseSchema),
  estimatedDuration: DurationSchema,
})

// Week A Monday Variants
export const WeekAMondayStrengthWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('A'),
  day: z.literal('Monday'),
  style: z.literal('strength'),
  focus: z.array(z.enum(['chest', 'shoulders', 'triceps', 'core'])),
  exercises: WeekAMondayExercises,
  name: z.literal('Push Day - Strength'),
  description: z.literal(
    'Heavy weight chest, shoulders, and triceps focus (6-8 reps)',
  ),
})

export const WeekAMondayHypertrophyWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('A'),
  day: z.literal('Monday'),
  style: z.literal('hypertrophy'),
  focus: z.array(z.enum(['chest', 'shoulders', 'triceps', 'core'])),
  exercises: WeekAMondayExercises,
  name: z.literal('Push Day - Volume'),
  description: z.literal(
    'Moderate weight chest, shoulders, and triceps focus (10-15 reps)',
  ),
})

// Week A Tuesday Variants
export const WeekATuesdayStrengthWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('A'),
  day: z.literal('Tuesday'),
  style: z.literal('strength'),
  focus: z.array(z.enum(['back', 'biceps', 'core'])),
  exercises: WeekATuesdayExercises,
  name: z.literal('Pull Day - Strength'),
  description: z.literal('Heavy weight back and biceps focus (6-8 reps)'),
})

export const WeekATuesdayHypertrophyWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('A'),
  day: z.literal('Tuesday'),
  style: z.literal('hypertrophy'),
  focus: z.array(z.enum(['back', 'biceps', 'core'])),
  exercises: WeekATuesdayExercises,
  name: z.literal('Pull Day - Volume'),
  description: z.literal('Moderate weight back and biceps focus (10-15 reps)'),
})

// Week A Wednesday Variants
export const WeekAWednesdayStrengthWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('A'),
  day: z.literal('Wednesday'),
  style: z.literal('strength'),
  focus: z.array(z.enum(['legs', 'glutes', 'core'])),
  exercises: WeekAWednesdayExercises,
  name: z.literal('Legs Day - Strength'),
  description: z.literal('Heavy weight lower body focus (6-8 reps)'),
})

export const WeekAWednesdayHypertrophyWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('A'),
  day: z.literal('Wednesday'),
  style: z.literal('hypertrophy'),
  focus: z.array(z.enum(['legs', 'glutes', 'core'])),
  exercises: WeekAWednesdayExercises,
  name: z.literal('Legs Day - Volume'),
  description: z.literal('Moderate weight lower body focus (10-15 reps)'),
})

// Week A Thursday Variants
export const WeekAThursdayStrengthWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('A'),
  day: z.literal('Thursday'),
  style: z.literal('strength'),
  focus: z.array(z.enum(['shoulders', 'triceps', 'biceps', 'core'])),
  exercises: WeekAThursdayExercises,
  name: z.literal('Arms Day - Strength'),
  description: z.literal('Heavy weight arms focus (6-8 reps)'),
})

export const WeekAThursdayHypertrophyWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('A'),
  day: z.literal('Thursday'),
  style: z.literal('hypertrophy'),
  focus: z.array(z.enum(['shoulders', 'triceps', 'biceps', 'core'])),
  exercises: WeekAThursdayExercises,
  name: z.literal('Arms Day - Volume'),
  description: z.literal('Moderate weight arms focus (10-15 reps)'),
})

// Week A Friday Variants
export const WeekAFridayStrengthWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('A'),
  day: z.literal('Friday'),
  style: z.literal('strength'),
  focus: z.array(z.enum(['fullBody', 'core'])),
  exercises: WeekAFridayExercises,
  name: z.literal('Full Body - Power HIIT'),
  description: z.literal('High-intensity full body with strength emphasis'),
})

export const WeekAFridayHypertrophyWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('A'),
  day: z.literal('Friday'),
  style: z.literal('hypertrophy'),
  focus: z.array(z.enum(['fullBody', 'core'])),
  exercises: WeekAFridayExercises,
  name: z.literal('Full Body - Volume HIIT'),
  description: z.literal('High-intensity full body with volume emphasis'),
})

// Week B Monday Variants
export const WeekBMondayStrengthWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('B'),
  day: z.literal('Monday'),
  style: z.literal('strength'),
  focus: z.array(z.enum(['chest', 'shoulders', 'triceps', 'core'])),
  exercises: WeekBMondayExercises,
  name: z.literal('Push Day - Strength'),
  description: z.literal('Heavy weight incline focus (6-8 reps)'),
})

export const WeekBMondayHypertrophyWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('B'),
  day: z.literal('Monday'),
  style: z.literal('hypertrophy'),
  focus: z.array(z.enum(['chest', 'shoulders', 'triceps', 'core'])),
  exercises: WeekBMondayExercises,
  name: z.literal('Push Day - Volume'),
  description: z.literal('Moderate weight incline focus (10-15 reps)'),
})

// Week B Tuesday Variants
export const WeekBTuesdayStrengthWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('B'),
  day: z.literal('Tuesday'),
  style: z.literal('strength'),
  focus: z.array(z.enum(['back', 'biceps', 'core'])),
  exercises: WeekBTuesdayExercises,
  name: z.literal('Pull Day - Strength'),
  description: z.literal('Heavy weight back focus with isometrics (6-8 reps)'),
})

export const WeekBTuesdayHypertrophyWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('B'),
  day: z.literal('Tuesday'),
  style: z.literal('hypertrophy'),
  focus: z.array(z.enum(['back', 'biceps', 'core'])),
  exercises: WeekBTuesdayExercises,
  name: z.literal('Pull Day - Volume'),
  description: z.literal(
    'Moderate weight back focus with isometrics (10-15 reps)',
  ),
})

// Week B Wednesday Variants
export const WeekBWednesdayStrengthWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('B'),
  day: z.literal('Wednesday'),
  style: z.literal('strength'),
  focus: z.array(z.enum(['legs', 'glutes', 'core'])),
  exercises: WeekBWednesdayExercises,
  name: z.literal('Legs Day - Strength'),
  description: z.literal('Heavy weight front squat focus (6-8 reps)'),
})

export const WeekBWednesdayHypertrophyWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('B'),
  day: z.literal('Wednesday'),
  style: z.literal('hypertrophy'),
  focus: z.array(z.enum(['legs', 'glutes', 'core'])),
  exercises: WeekBWednesdayExercises,
  name: z.literal('Legs Day - Volume'),
  description: z.literal('Moderate weight front squat focus (10-15 reps)'),
})

// Week B Thursday Variants
export const WeekBThursdayStrengthWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('B'),
  day: z.literal('Thursday'),
  style: z.literal('strength'),
  focus: z.array(z.enum(['shoulders', 'triceps', 'biceps', 'core'])),
  exercises: WeekBThursdayExercises,
  name: z.literal('Arms Day - Strength'),
  description: z.literal(
    'Heavy weight arms with drop sets (6-8 reps primary sets)',
  ),
})

export const WeekBThursdayHypertrophyWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('B'),
  day: z.literal('Thursday'),
  style: z.literal('hypertrophy'),
  focus: z.array(z.enum(['shoulders', 'triceps', 'biceps', 'core'])),
  exercises: WeekBThursdayExercises,
  name: z.literal('Arms Day - Volume'),
  description: z.literal('Moderate weight arms with drop sets (10-15 reps)'),
})

// Week B Friday Variants
export const WeekBFridayStrengthWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('B'),
  day: z.literal('Friday'),
  style: z.literal('strength'),
  focus: z.array(z.enum(['fullBody', 'core'])),
  exercises: WeekBFridayExercises,
  name: z.literal('Full Body - Explosive HIIT'),
  description: z.literal(
    'High-intensity explosive movements with strength focus',
  ),
})

export const WeekBFridayHypertrophyWorkoutSchema = BaseWorkoutSchema.extend({
  week: z.literal('B'),
  day: z.literal('Friday'),
  style: z.literal('hypertrophy'),
  focus: z.array(z.enum(['fullBody', 'core'])),
  exercises: WeekBFridayExercises,
  name: z.literal('Full Body - Volume HIIT'),
  description: z.literal(
    'High-intensity explosive movements with volume focus',
  ),
})

// Combined Week A Schema
const WeekAStrengthSchema = z.object({
  week: z.literal('A'),
  style: z.literal('strength'),
  workouts: z.tuple([
    WeekAMondayStrengthWorkoutSchema,
    WeekATuesdayStrengthWorkoutSchema,
    WeekAWednesdayStrengthWorkoutSchema,
    WeekAThursdayStrengthWorkoutSchema,
    WeekAFridayStrengthWorkoutSchema,
  ]),
})

const WeekAHypertrophySchema = z.object({
  week: z.literal('A'),
  style: z.literal('hypertrophy'),
  workouts: z.tuple([
    WeekAMondayHypertrophyWorkoutSchema,
    WeekATuesdayHypertrophyWorkoutSchema,
    WeekAWednesdayHypertrophyWorkoutSchema,
    WeekAThursdayHypertrophyWorkoutSchema,
    WeekAFridayHypertrophyWorkoutSchema,
  ]),
})

const WeekBStrengthSchema = z.object({
  week: z.literal('B'),
  style: z.literal('strength'),
  workouts: z.tuple([
    WeekBMondayStrengthWorkoutSchema,
    WeekBTuesdayStrengthWorkoutSchema,
    WeekBWednesdayStrengthWorkoutSchema,
    WeekBThursdayStrengthWorkoutSchema,
    WeekBFridayStrengthWorkoutSchema,
  ]),
})

const WeekBHypertrophySchema = z.object({
  week: z.literal('B'),
  style: z.literal('hypertrophy'),
  workouts: z.tuple([
    WeekBMondayHypertrophyWorkoutSchema,
    WeekBTuesdayHypertrophyWorkoutSchema,
    WeekBWednesdayHypertrophyWorkoutSchema,
    WeekBThursdayHypertrophyWorkoutSchema,
    WeekBFridayHypertrophyWorkoutSchema,
  ]),
})

// Export the combined schemas
export const WeekAStrengthWorkoutSchema = WeekAStrengthSchema
export const WeekAHypertrophyWorkoutSchema = WeekAHypertrophySchema
export const WeekBStrengthWorkoutSchema = WeekBStrengthSchema
export const WeekBHypertrophyWorkoutSchema = WeekBHypertrophySchema

// Full Program Schema
export const WorkoutProgramSchema = z.object({
  weeks: z.tuple([
    WeekAStrengthWorkoutSchema,
    WeekBStrengthWorkoutSchema,
    WeekAHypertrophyWorkoutSchema,
    WeekBHypertrophyWorkoutSchema,
  ]),
})

// Type inference
export type BaseWorkout = z.infer<typeof BaseWorkoutSchema>

// Week A Types
export type WeekAMondayStrengthWorkout = z.infer<
  typeof WeekAMondayStrengthWorkoutSchema
>
export type WeekAMondayHypertrophyWorkout = z.infer<
  typeof WeekAMondayHypertrophyWorkoutSchema
>
export type WeekATuesdayStrengthWorkout = z.infer<
  typeof WeekATuesdayStrengthWorkoutSchema
>
export type WeekATuesdayHypertrophyWorkout = z.infer<
  typeof WeekATuesdayHypertrophyWorkoutSchema
>
export type WeekAWednesdayStrengthWorkout = z.infer<
  typeof WeekAWednesdayStrengthWorkoutSchema
>
export type WeekAWednesdayHypertrophyWorkout = z.infer<
  typeof WeekAWednesdayHypertrophyWorkoutSchema
>
export type WeekAThursdayStrengthWorkout = z.infer<
  typeof WeekAThursdayStrengthWorkoutSchema
>
export type WeekAThursdayHypertrophyWorkout = z.infer<
  typeof WeekAThursdayHypertrophyWorkoutSchema
>
export type WeekAFridayStrengthWorkout = z.infer<
  typeof WeekAFridayStrengthWorkoutSchema
>
export type WeekAFridayHypertrophyWorkout = z.infer<
  typeof WeekAFridayHypertrophyWorkoutSchema
>

// Week B Types
export type WeekBMondayStrengthWorkout = z.infer<
  typeof WeekBMondayStrengthWorkoutSchema
>
export type WeekBMondayHypertrophyWorkout = z.infer<
  typeof WeekBMondayHypertrophyWorkoutSchema
>
export type WeekBTuesdayStrengthWorkout = z.infer<
  typeof WeekBTuesdayStrengthWorkoutSchema
>
export type WeekBTuesdayHypertrophyWorkout = z.infer<
  typeof WeekBTuesdayHypertrophyWorkoutSchema
>
export type WeekBWednesdayStrengthWorkout = z.infer<
  typeof WeekBWednesdayStrengthWorkoutSchema
>
export type WeekBWednesdayHypertrophyWorkout = z.infer<
  typeof WeekBWednesdayHypertrophyWorkoutSchema
>
export type WeekBThursdayStrengthWorkout = z.infer<
  typeof WeekBThursdayStrengthWorkoutSchema
>
export type WeekBThursdayHypertrophyWorkout = z.infer<
  typeof WeekBThursdayHypertrophyWorkoutSchema
>
export type WeekBFridayStrengthWorkout = z.infer<
  typeof WeekBFridayStrengthWorkoutSchema
>
export type WeekBFridayHypertrophyWorkout = z.infer<
  typeof WeekBFridayHypertrophyWorkoutSchema
>

// Combined Week Types
export type WeekAStrengthWorkout = z.infer<typeof WeekAStrengthWorkoutSchema>
export type WeekAHypertrophyWorkout = z.infer<
  typeof WeekAHypertrophyWorkoutSchema
>
export type WeekBStrengthWorkout = z.infer<typeof WeekBStrengthWorkoutSchema>
export type WeekBHypertrophyWorkout = z.infer<
  typeof WeekBHypertrophyWorkoutSchema
>

// Program Type
export type WorkoutProgram = z.infer<typeof WorkoutProgramSchema>
