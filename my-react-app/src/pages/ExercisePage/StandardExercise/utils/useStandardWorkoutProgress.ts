import useWorkoutProgress from '../../utils/useWorkoutProgress'
import { StandardWorkoutProgress } from '../../../../utils/exerciseSessionStorage'

const useStandardWorkoutProgress = () => {
  const { workoutProgress, setWorkoutProgress } =
    useWorkoutProgress<StandardWorkoutProgress>()

  const incrementSet = () => {
    if (workoutProgress) {
      setWorkoutProgress({
        ...workoutProgress,
        setNumber: workoutProgress.setNumber + 1,
      })
    }
  }

  const incrementExerciseIndex = () => {
    if (workoutProgress) {
      setWorkoutProgress({
        ...workoutProgress,
        currentExerciseIndex: workoutProgress.currentExerciseIndex + 1,
        setNumber: 0,
      })
    }
  }

  return {
    workoutProgress,
    incrementExerciseIndex,
    incrementSet,
  }
}

export default useStandardWorkoutProgress
