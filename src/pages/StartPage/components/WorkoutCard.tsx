import React from 'react'
import { Button, CardContent, Stack, Typography } from '@mui/material'
import { Card } from '@mui/material'
import { Workout } from '../../../domain/entities'
import { EXERCISE_TYPE } from '../../../domain/constants'
import { FitnessCenter } from '@mui/icons-material'

interface WorkoutCardProps {
  workout: Workout
  onClick: () => void
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  onClick,
}) => {
  return (
    <Stack key={workout.id}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {workout.description}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {workout.type === EXERCISE_TYPE.STANDARD
              ? 'Standard Workout'
              : 'Circuit Training'}
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        size="large"
        startIcon={<FitnessCenter />}
        onClick={onClick}
        sx={{ mt: 4 }}
      >
        Start Workout
      </Button>
    </Stack>
  )
}
