import { DatePort } from '../../../application/ports'
import { WEEKDAY } from '../../../domain/constants'

const createDateAdapter = (): DatePort => {
  return {
    getToday: () => {
      const today = new Date()
      const day = today.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6
      switch (day) {
        case 0:
          return WEEKDAY.SUNDAY
        case 1:
          return WEEKDAY.MONDAY
        case 2:
          return WEEKDAY.TUESDAY
        case 3:
          return WEEKDAY.WEDNESDAY
        case 4:
          return WEEKDAY.THURSDAY
        case 5:
          return WEEKDAY.FRIDAY
        case 6:
          return WEEKDAY.SATURDAY
        default: {
          const exhaustiveCheck: never = day
          throw new Error(`Invalid day: ${exhaustiveCheck}`)
        }
      }
    },
  }
}

export { createDateAdapter }
