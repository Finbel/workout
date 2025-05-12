import React, { useEffect, useMemo, useState } from 'react'
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
import { Home } from '@mui/icons-material'
import { createCompositeRoot } from '../../compositeRoot/createCompositeRoot'
import { Workout, WorkoutSession } from '../../domain/entities'

export const WorkoutCompleted: React.FC = () => {
  const { useCases } = useMemo(() => createCompositeRoot(), [])
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const [workout, setWorkout] = useState<Workout | null>(null)
  const [workoutSession, setWorkoutSession] = useState<WorkoutSession | null>(
    null,
  )

  useEffect(() => {
    if (sessionId) {
      useCases.getWorkoutSessionById(sessionId).then((session) => {
        setWorkoutSession(session)
        useCases
          .getWorkoutForSchedule(session.scheduleId, session.workoutId)
          .then((workout) => {
            setWorkout(workout)
          })
      })
    }
  }, [sessionId, useCases])

  const goHome = () => {
    navigate('/')
  }

  const renderExerciseData = () => {
    if (!workoutSession || workoutSession.exerciseData.length === 0) {
      return (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No exercise data available.
        </Typography>
      )
    }

    // Cast exercise data to StandardExerciseLog[]
    const exerciseData = workoutSession.exerciseData

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

  if (!workout || !workoutSession) {
    return <div>Loading...</div>
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Workout Complete!
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {workout.description}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {new Date(workoutSession.startedAt).toLocaleDateString()}
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
      </Stack>
    </Box>
  )
}
