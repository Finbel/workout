import { useEffect, useState } from 'react'
import { StandardExercise } from '../../../../domain/entities'
import { StandardExerciseLog } from '../../../../domain/valueObjects'
import { isStandardExerciseLog } from '../../../../domain/valueObjects/exerciseLog'
import { createUseCases } from '../../../../application/usecases/createUseCases'

export const usePreviousExerciseData = (
  useCases: ReturnType<typeof createUseCases>,
  exercise: StandardExercise | null,
  currentSetIndex: number,
) => {
  const [previousLog, setPreviousLog] = useState<
    StandardExerciseLog | undefined
  >(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!exercise) {
      setPreviousLog(undefined)
      return
    }

    const fetchPreviousExerciseData = async () => {
      setLoading(true)
      try {
        // Get the last workout session for this exercise's workout
        const lastSession = await useCases.getLastWorkoutSession(exercise.id)

        if (lastSession) {
          // Find logs for this specific exercise name and set
          const exerciseLogs = lastSession.exerciseData.filter(
            (log) =>
              log.exerciseName === exercise.name &&
              isStandardExerciseLog(log) &&
              log.setIndex === currentSetIndex,
          )

          if (exerciseLogs.length > 0) {
            // Get the most recent log
            const latestLog = exerciseLogs.sort(
              (a, b) => b.timestamp - a.timestamp,
            )[0]
            if (isStandardExerciseLog(latestLog)) {
              setPreviousLog(latestLog)
            }
          } else {
            setPreviousLog(undefined)
          }
        } else {
          setPreviousLog(undefined)
        }
      } catch (error) {
        console.error('Error fetching previous exercise data:', error)
        setPreviousLog(undefined)
      } finally {
        setLoading(false)
      }
    }

    fetchPreviousExerciseData()
  }, [useCases, exercise, currentSetIndex])

  return {
    previousLog,
    loading,
  }
}
