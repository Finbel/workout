import { WorkoutProgress } from '../../../utils/exerciseSessionStorage'

import { useEffect } from 'react'
import { getExerciseSessionStorage } from '../../../utils/exerciseSessionStorage'
import { useState } from 'react'

const useWorkoutProgress = <T extends WorkoutProgress>() => {
  const [workoutProgress, setWorkoutProgress] = useState<T | null>(null)
  useEffect(() => {
    const progress = getExerciseSessionStorage<T>()
    setWorkoutProgress(progress)
  }, [])

  const incrementExerciseIndex = () => {
    if (workoutProgress) {
      setWorkoutProgress({
        ...workoutProgress,
        currentExerciseIndex: workoutProgress.currentExerciseIndex + 1,
      })
    }
  }

  return { workoutProgress, incrementExerciseIndex, setWorkoutProgress }
}

export default useWorkoutProgress
