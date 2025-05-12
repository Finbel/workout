export const SELF_ASSESSED_DIFFICULTY = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
} as const

export type SelfAssessedDifficulty = keyof typeof SELF_ASSESSED_DIFFICULTY
