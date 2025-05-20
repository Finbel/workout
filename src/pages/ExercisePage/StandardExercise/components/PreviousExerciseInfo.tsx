import React from 'react'
import { Box, Typography, Paper, Chip, Stack } from '@mui/material'
import { StandardExerciseLog } from '../../../../domain/valueObjects'
import { StandardExercise } from '../../../../domain/entities'
import {
  SELF_ASSESSED_DIFFICULTY,
  SELF_ASSESSED_FORM,
} from '../../../../domain/constants'

interface PreviousExerciseInfoProps {
  exercise?: StandardExercise
  previousLog?: StandardExerciseLog
  currentSetIndex: number
}

export const PreviousExerciseInfo: React.FC<PreviousExerciseInfoProps> = ({
  previousLog,
  currentSetIndex,
}) => {
  if (!previousLog) {
    return (
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          No previous data found for this exercise
        </Typography>
      </Box>
    )
  }

  const difficultyColor = {
    [SELF_ASSESSED_DIFFICULTY.EASY]: 'success',
    [SELF_ASSESSED_DIFFICULTY.MEDIUM]: 'warning',
    [SELF_ASSESSED_DIFFICULTY.HARD]: 'error',
  }[previousLog.assessment.difficulty] as 'success' | 'warning' | 'error'

  const formColor = {
    [SELF_ASSESSED_FORM.GOOD]: 'success',
    [SELF_ASSESSED_FORM.OK]: 'warning',
    [SELF_ASSESSED_FORM.BAD]: 'error',
  }[previousLog.assessment.form] as 'success' | 'warning' | 'error'

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Previous Set {currentSetIndex + 1}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip
          label={previousLog.assessment.difficulty}
          color={difficultyColor}
          size="small"
        />
        <Chip
          label={previousLog.assessment.form}
          color={formColor}
          size="small"
        />
        {previousLog.assessment.excentric && (
          <Chip label="Eccentric" color="secondary" size="small" />
        )}
      </Stack>

      {previousLog.input.map((inputLog) => (
        <Box key={inputLog.type} sx={{ mb: 1 }}>
          <Typography variant="subtitle2">
            {inputLog.type.charAt(0) + inputLog.type.slice(1).toLowerCase()}:
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {inputLog.amount}
          </Typography>
        </Box>
      ))}

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">Duration:</Typography>
        <Typography>
          {Math.floor(previousLog.duration / 60)}:
          {String(previousLog.duration % 60).padStart(2, '0')}
        </Typography>
      </Box>
    </Paper>
  )
}
