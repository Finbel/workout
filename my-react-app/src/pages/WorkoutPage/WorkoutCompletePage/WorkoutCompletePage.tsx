import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Typography,
  Box,
  Button,
  Paper,
  Stack,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material'
import { Home, Refresh } from '@mui/icons-material'
import { getTodayWorkoutLog } from '../../../utils/workoutLogStorage'
import { StandardExerciseLog, WorkoutLog } from '../../../types/logging'

export const WorkoutCompletePage: React.FC = () => {
  const { workoutName } = useParams<{ workoutName: string }>()
  const navigate = useNavigate()
  const [workoutLog, setWorkoutLog] = useState<WorkoutLog | null>(null)

  useEffect(() => {
    const log = getTodayWorkoutLog()
    setWorkoutLog(log)
  }, [])

  const goHome = () => {
    navigate('/')
  }

  const startNewWorkout = () => {
    navigate(`/workout/${encodeURIComponent(workoutName || '')}`)
  }

  const renderExerciseData = () => {
    if (!workoutLog || workoutLog.exerciseData.length === 0) {
      return (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No exercise data available.
        </Typography>
      )
    }

    // Cast exercise data to StandardExerciseLog[]
    const exerciseData = workoutLog.exerciseData as StandardExerciseLog[]

    return (
      <Stack spacing={2} sx={{ mt: 3 }}>
        {exerciseData.map((exercise, index) => (
          <Card key={`${exercise.exerciseName}-${index}`}>
            <CardContent>
              <Typography variant="h6" component="div">
                {exercise.exerciseName}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Set {exercise.set}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={`Form: ${exercise.assessment.form}`}
                  color={
                    exercise.assessment.form === 'good'
                      ? 'success'
                      : exercise.assessment.form === 'ok'
                      ? 'warning'
                      : 'error'
                  }
                  size="small"
                />
                <Chip
                  label={`Difficulty: ${exercise.assessment.difficulty}`}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
                {exercise.assessment.excentric && (
                  <Chip label="Eccentric" color="secondary" size="small" />
                )}
              </Box>

              <Typography variant="body2">
                Duration: {Math.floor(exercise.duration / 60)}m{' '}
                {exercise.duration % 60}s
              </Typography>
              <Typography variant="body2">
                Rest: {Math.floor(exercise.restDuration / 60)}m{' '}
                {exercise.restDuration % 60}s
              </Typography>

              <Box sx={{ mt: 1 }}>
                {exercise.input.map((input, idx) => (
                  <Typography key={idx} variant="body2">
                    {input.type}: {input.amount}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    )
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Workout Complete!
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {workoutLog?.workoutName || workoutName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {workoutLog?.date
            ? new Date(workoutLog.date).toLocaleDateString()
            : 'Today'}
        </Typography>
        <Divider sx={{ my: 2 }} />

        {renderExerciseData()}
      </Paper>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          size="large"
          startIcon={<Home />}
          onClick={goHome}
        >
          Home
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          startIcon={<Refresh />}
          onClick={startNewWorkout}
        >
          Restart
        </Button>
      </Stack>
    </Box>
  )
}
