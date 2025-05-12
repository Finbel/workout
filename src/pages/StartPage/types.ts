import { Weekday } from '../../types'

export interface Workout {
  name: string
  weekDay: Weekday
  type: 'standard' | 'circuit'
}
