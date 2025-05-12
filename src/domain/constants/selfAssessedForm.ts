export const SELF_ASSESSED_FORM = {
  GOOD: 'GOOD',
  BAD: 'BAD',
  OK: 'OK',
} as const

export type SelfAssessedForm = keyof typeof SELF_ASSESSED_FORM
