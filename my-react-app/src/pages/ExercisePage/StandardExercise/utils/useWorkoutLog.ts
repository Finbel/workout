import { useEffect } from 'react'
import {
  createTodayWorkoutLog,
  getTodayWorkoutLog,
  updateWorkoutLog,
} from '../../../../utils/workoutLogStorage'
import { getToday } from '../../../../utils/getToday'
import {
  CircuitWorkoutLog,
  StandardWorkoutLog,
  StandardExerciseLog,
  CircuitRoundLog,
} from '../../../../types/logging'
import { useState } from 'react'

const useWorkoutLog = <
  T extends StandardWorkoutLog | CircuitWorkoutLog,
  U extends StandardExerciseLog | CircuitRoundLog,
>({
  workoutName,
}: {
  workoutName: string
}) => {
  const [workoutLog, setWorkoutLog] = useState<T | null>(null)
  useEffect(() => {
    const today = getToday()
    let log = getTodayWorkoutLog() as T
    if (!log) {
      log = createTodayWorkoutLog(workoutName, today) as T
    }
    setWorkoutLog(log)
  }, [workoutName])

  const updateLog = (exerciseLog: U) => {
    if (workoutLog) {
      const newWorkoutLog = {
        ...workoutLog,
        exerciseData: [...workoutLog.exerciseData, exerciseLog],
      }

      console.log(newWorkoutLog)

      setWorkoutLog(newWorkoutLog)
      updateWorkoutLog(newWorkoutLog)
    }
  }

  return { workoutLog, updateLog }
}

export default useWorkoutLog
