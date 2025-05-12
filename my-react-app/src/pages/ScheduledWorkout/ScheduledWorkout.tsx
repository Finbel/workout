import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Box, Button, Stack } from '@mui/material'
import { PlayArrow } from '@mui/icons-material'
import { createCompositeRoot } from '../../compositeRoot/createCompositeRoot'
import { Workout, WorkoutSchedule } from '../../domain/entities'
import { ExerciseCard } from '../../components/ExerciseCard/ExerciseCard'

export const ScheduledWorkout: React.FC = () => {
  const { scheduleId, workoutId } = useParams<{
    scheduleId: string
    workoutId: string
  }>()
  const { useCases } = useMemo(() => createCompositeRoot(), [])
  const navigate = useNavigate()
  const [workoutSchedule, setWorkoutSchedule] =
    useState<WorkoutSchedule | null>(null)
  const [workout, setWorkout] = useState<Workout | null>(null)

  useEffect(() => {
    if (scheduleId && workoutId) {
      useCases.getWorkoutSchedule(scheduleId).then((workoutSchedule) => {
        setWorkoutSchedule(workoutSchedule)
      })
      useCases.getWorkoutForSchedule(scheduleId, workoutId).then((workout) => {
        setWorkout(workout)
      })
    }
  }, [scheduleId, workoutId, useCases])

  const startWorkout = () => {
    if (workout && scheduleId) {
      useCases
        .startWorkoutSession(scheduleId, workout.id)
        .then((workoutSession) => {
          // Navigate to the first exercise
          navigate(`exercise-session/${workoutSession.id}`)
        })
    }
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {workoutSchedule?.name}
      </Typography>
      <Stack spacing={2} sx={{ mb: 4 }}>
        {workout?.exercises.map((exercise) => (
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
        disabled={workout?.exercises.length === 0}
      >
        Start Workout
      </Button>
    </Box>
  )
}
