import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Box, Stack } from '@mui/material'
import { WorkoutCard } from './components/WorkoutCard'
import { createCompositeRoot } from '../../compositeRoot/createCompositeRoot'
import { Workout } from '../../domain/entities'

export const StartPage: React.FC = () => {
  const { useCases } = useMemo(() => createCompositeRoot(), [])

  const [scheduledWorkouts, setScheduledWorkouts] = useState<
    { scheduleId: string; workout: Workout }[]
  >([])
  const navigate = useNavigate()

  useEffect(() => {
    useCases.getTodaysWorkouts().then((scheduledWorkouts) => {
      setScheduledWorkouts(scheduledWorkouts)
    })
  }, [useCases])

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {scheduledWorkouts.length
          ? `Today's Workout`
          : 'No workout scheduled for today'}
      </Typography>
      <Stack spacing={2}>
        {scheduledWorkouts.map((scheduledWorkout) => (
          <WorkoutCard
            key={scheduledWorkout.scheduleId}
            workout={scheduledWorkout.workout}
            onClick={() =>
              navigate(
                `/scheduled-workout/${scheduledWorkout.scheduleId}/workout/${scheduledWorkout.workout.id}`,
              )
            }
          />
        ))}
      </Stack>
    </Box>
  )
}
