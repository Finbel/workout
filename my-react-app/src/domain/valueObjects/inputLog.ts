import { z } from 'zod'
import { INPUT_TYPE } from '../constants'

export const InputLogSchema = z.object({
  type: z.nativeEnum(INPUT_TYPE),
  amount: z.number(),
})

export type InputLog = z.infer<typeof InputLogSchema>
