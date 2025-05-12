export const INPUT_TYPE = {
  WEIGHT: 'WEIGHT',
  SECONDS: 'SECONDS',
  REPS: 'REPS',
} as const

export type InputType = keyof typeof INPUT_TYPE
