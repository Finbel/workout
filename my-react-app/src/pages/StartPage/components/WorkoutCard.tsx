import React from 'react'
import { CardContent, Typography } from '@mui/material'
import { Card } from '@mui/material'
import { Workout } from '../types'

interface WorkoutCardProps {
  workout: Workout
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Card key={workout.name} variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {workout.name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {workout.type === 'standard'
            ? 'Standard Workout'
            : 'Circuit Training'}
        </Typography>
      </CardContent>
    </Card>
  )
}
