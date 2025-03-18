import { z } from 'zod'

export const WeightSchema = z.object({
  value: z.number().min(0),
  unit: z.enum(['kg', 'lbs']),
})

export const DurationSchema = z.object({
  value: z.number().min(0),
  unit: z.enum(['seconds', 'minutes']),
})

export const RepsSchema = z.number().int().min(1)
export const SetsSchema = z.number().int().min(1)

// Type inference
export type Weight = z.infer<typeof WeightSchema>
export type Duration = z.infer<typeof DurationSchema>
export type Reps = z.infer<typeof RepsSchema>
export type Sets = z.infer<typeof SetsSchema>
