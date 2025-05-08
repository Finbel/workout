import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { FitnessCenter } from '@mui/icons-material'
import { ExerciseUnion } from '../../../types'

interface ExerciseCardProps {
  exercise: ExerciseUnion
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ position: 'relative', pl: 4 }}>
          <FitnessCenter
            color="action"
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">
              {exercise.name.replace(/_/g, ' ')}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {exercise.expectedInputs.join(', ')}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
