import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Box, Button, Stack, Divider } from '@mui/material'
import { FitnessCenter, History } from '@mui/icons-material'
import { Workout } from './types'
import { getTodaysWorkouts } from './utils/getTodaysWorkouts'
import { WorkoutCard } from './components/WorkoutCard'
export const StartPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const todaysWorkouts = getTodaysWorkouts()
    setWorkouts(todaysWorkouts)
  }, [])

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Today's Workout
      </Typography>
      <Stack spacing={2}>
        {workouts.map((workout) => (
          <Stack key={workout.name}>
            <WorkoutCard workout={workout} />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              startIcon={<FitnessCenter />}
              onClick={() =>
                navigate(`/workout/${encodeURIComponent(workout.name)}`)
              }
              sx={{ mt: 4 }}
            >
              Start Workout
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        size="large"
        startIcon={<History />}
        onClick={() => navigate('/logs')}
      >
        View Workout History
      </Button>
    </Box>
  )
}
