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
  console.log('getting todays log')
  console.log(logs[today])
  return logs[today] || null
}

const setTodaysLog = (log: WorkoutLog) => {
  const today = getToday()
  const logs = getLogs()
  logs[today] = log
  console.log('setting todays log')
  console.log(log)
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

// New method to delete logs for a specific date
export const deleteLogForDate = (date: string): boolean => {
  try {
    const logs = getLogs()

    // Check if log exists for the date
    if (!logs[date]) {
      return false
    }

    // Delete the log
    delete logs[date]

    // Save updated logs
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
    return true
  } catch (error) {
    console.error('Failed to delete log:', error)
    return false
  }
}
