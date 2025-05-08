import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Box, Button, Stack } from '@mui/material'
import { PlayArrow } from '@mui/icons-material'
import { getTodaysExercisesByScheduleName } from './utils/getTodaysExercisesByScheduleName'
import { ExerciseUnion } from '../../types'
import { ExerciseCard } from './components/ExerciseCard'
import { initialExerciseSessionStorage } from '../../utils/exerciseSessionStorage'
export const WorkoutPage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()
  const [exercises, setExercises] = useState<ExerciseUnion[]>([])

  useEffect(() => {
    if (name) {
      const exercises = getTodaysExercisesByScheduleName(name)
      if (exercises) {
        setExercises(exercises)
      }
    }
  }, [name])

  const startWorkout = () => {
    if (exercises.length > 0 && name) {
      // Store the full exercise list in session storage for the flow
      initialExerciseSessionStorage({
        workoutName: name,
      })
      // Navigate to the first exercise
      navigate(`/exercise/${encodeURIComponent(name || '')}`)
    }
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {decodeURIComponent(name || '')}
      </Typography>
      <Stack spacing={2} sx={{ mb: 4 }}>
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.name} exercise={exercise} />
        ))}
      </Stack>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        size="large"
        startIcon={<PlayArrow />}
        onClick={startWorkout}
        disabled={exercises.length === 0}
      >
        Start Workout
      </Button>
    </Box>
  )
}
