import { WEEKDAY } from '../constants'
import { Weekday } from '../types'

export const getToday = (): Weekday => {
  return Object.values(WEEKDAY).find(
    (value) =>
      value ===
      new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
  ) as Weekday
}
