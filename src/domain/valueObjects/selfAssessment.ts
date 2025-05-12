import { z } from 'zod'
import { SELF_ASSESSED_FORM, SELF_ASSESSED_DIFFICULTY } from '../constants'

export const SelfAssessmentSchema = z.object({
  form: z.nativeEnum(SELF_ASSESSED_FORM),
  difficulty: z.nativeEnum(SELF_ASSESSED_DIFFICULTY),
  excentric: z.boolean(),
})

export type SelfAssessment = z.infer<typeof SelfAssessmentSchema>
