import { z } from 'zod'

export const InputLogSchema = z.object({
  type: z.enum(['WEIGHT', 'REPS', 'SECONDS']),
  value: z.number(),
})

export type InputLog = z.infer<typeof InputLogSchema>
