import { Weekday } from '../../domain/constants'

export type DatePort = {
  getToday: () => Weekday
}
