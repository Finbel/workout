import { Weekday } from '../constants'
import { Workout } from './workout'

export type WorkoutSchedule = {
  name: string
  id: string
  schedule: Partial<Record<Weekday, Workout>>
}
