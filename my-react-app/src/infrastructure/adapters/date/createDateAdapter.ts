import { DatePort } from '../../../application/ports'
import { Weekday } from '../../../domain/constants'

const createDateAdapter = (): DatePort => {
  return {
    getToday: () => {
      const today = new Date()
      const day = today.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6
      switch (day) {
        case 0:
          return Weekday.SUNDAY
        case 1:
          return Weekday.MONDAY
        case 2:
          return Weekday.TUESDAY
        case 3:
          return Weekday.WEDNESDAY
        case 4:
          return Weekday.THURSDAY
        case 5:
          return Weekday.FRIDAY
        case 6:
          return Weekday.SATURDAY
        default: {
          const exhaustiveCheck: never = day
          throw new Error(`Invalid day: ${exhaustiveCheck}`)
        }
      }
    },
  }
}

export { createDateAdapter }
