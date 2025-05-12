import { CircuitWorkout } from '../../../domain/entities'

import { CircuitWorkoutSession } from '../../../domain/entities'

export const getCurrentRoundIndex = (
  workoutSession: CircuitWorkoutSession,
  workout: CircuitWorkout,
) => {
  const { exercises } = workout
  const { exerciseData } = workoutSession

  // calulate current round based on
  // * length of exercise data (total exercises done)
  // * length of exercises array (total exercises in workout)
  // * rounds (total rounds in workout)

  const currentRoundIndex = Math.floor(exerciseData.length / exercises.length)

  return currentRoundIndex
}
