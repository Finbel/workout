import { WorkoutLog } from '../types/logging'
import { Weekday } from '../types'

const STORAGE_KEY = 'workoutLogs'

const getToday = () => {
  return new Date().toISOString().split('T')[0]
}

export const getLogs = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
}

const getTodaysLog = () => {
  const today = getToday()
  const logs = getLogs()
  return logs[today] || null
}

const setTodaysLog = (log: WorkoutLog) => {
  const today = getToday()
  const logs = getLogs()
  logs[today] = log
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
}

export const getTodayWorkoutLog = (): WorkoutLog | null => {
  try {
    return getTodaysLog()
  } catch {
    throw new Error('Failed to access localStorage')
  }
}

export const createTodayWorkoutLog = (
  workoutName: string,
  weekDay: Weekday,
): WorkoutLog => {
  try {
    const newLog: WorkoutLog = {
      workoutName,
      weekDay,
      exerciseData: [],
      timestamp: Date.now(),
      date: getToday(),
    }
    setTodaysLog(newLog)
    return newLog
  } catch {
    throw new Error('Failed to access localStorage')
  }
}

export const updateWorkoutLog = (log: WorkoutLog): void => {
  try {
    setTodaysLog(log)
  } catch {
    throw new Error('Failed to access localStorage')
  }
}
