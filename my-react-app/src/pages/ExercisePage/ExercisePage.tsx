import React from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { getWorkoutType } from './utils/getWorkoutType'
import { StandardExercisePage } from './StandardExercise/StandardExercise'
export interface ExerciseFormState {
  weight?: number
  reps?: number
  seconds?: number
  form: 'good' | 'bad' | 'ok'
  difficulty: 'easy' | 'medium' | 'hard'
  excentric: boolean
}

export const ExercisePage: React.FC = () => {
  const { workoutName } = useParams<{
    workoutName: string
  }>()
  if (!workoutName) {
    throw new Error('Workout name is required')
  }
  const workoutType = getWorkoutType({
    workoutName,
  })

  if (workoutType === 'standard') {
    return <StandardExercisePage workoutName={workoutName} />
  }

  if (workoutType === 'circuit') {
    return <Box />
  }

  const exhaustiveCheck: never = workoutType
  throw new Error(`Unknown workout type: ${exhaustiveCheck}`)
}
