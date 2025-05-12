import { z } from 'zod'
import { WEEKDAY } from '../constants'
import { WorkoutSchema } from './workout'

// Create Zod schema
export const WorkoutScheduleSchema = z.object({
  name: z.string(),
  id: z.string(),
  schedule: z.record(z.nativeEnum(WEEKDAY), WorkoutSchema.optional()),
})

// Export the type using z.infer
export type WorkoutSchedule = z.infer<typeof WorkoutScheduleSchema>
