import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Typography,
  Box,
  Button,
  Stack,
  Paper,
  Divider,
  Chip,
} from '@mui/material'
import { PlayArrow } from '@mui/icons-material'
import { createCompositeRoot } from '../../compositeRoot/createCompositeRoot'
import { Workout, WorkoutSchedule, WorkoutSession } from '../../domain/entities'
import { ExerciseCard } from '../../components/ExerciseCard/ExerciseCard'
import { ExerciseLog, isStandardExerciseLog } from '../../domain/valueObjects'
import {
  EXERCISE_TYPE,
  INPUT_TYPE,
  SELF_ASSESSED_FORM,
} from '../../domain/constants'

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
  const [lastWorkoutSession, setLastWorkoutSession] =
    useState<WorkoutSession | null>(null)

  useEffect(() => {
    if (scheduleId && workoutId) {
      useCases.getWorkoutSchedule(scheduleId).then((workoutSchedule) => {
        setWorkoutSchedule(workoutSchedule)
      })
      useCases.getWorkoutForSchedule(scheduleId, workoutId).then((workout) => {
        setWorkout(workout)
      })
      useCases.getLastWorkoutSession(workoutId).then((workoutSession) => {
        console.log('workoutSession', workoutSession)
        setLastWorkoutSession(workoutSession)
      })
    }
  }, [scheduleId, workoutId, useCases])

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatDuration = (startTime: number): string => {
    if (!lastWorkoutSession?.exerciseData.length) return 'N/A'

    const lastExercise =
      lastWorkoutSession.exerciseData[
        lastWorkoutSession.exerciseData.length - 1
      ]
    const endTime = lastExercise.timestamp
    const durationMs = endTime - startTime
    const minutes = Math.floor(durationMs / 60000)
    const seconds = Math.floor((durationMs % 60000) / 1000)

    return `${minutes}m ${seconds}s`
  }

  const groupExercisesByName = (exerciseLogs: ExerciseLog[]) => {
    const grouped: Record<string, ExerciseLog[]> = {}

    exerciseLogs.forEach((log) => {
      if (!grouped[log.exerciseName]) {
        grouped[log.exerciseName] = []
      }
      grouped[log.exerciseName].push(log)
    })

    return grouped
  }

  const renderExerciseInputs = (log: ExerciseLog) => {
    if (log.input.length === 0) return 'No data'

    return log.input.map((input, idx) => (
      <Box key={idx} component="span" sx={{ mr: 1 }}>
        {input.type === INPUT_TYPE.WEIGHT && `${input.amount}kg`}
        {input.type === INPUT_TYPE.REPS && `${input.amount} reps`}
        {input.type === INPUT_TYPE.SECONDS && `${input.amount}s`}
      </Box>
    ))
  }

  const getAssessmentColor = (formValue: string) => {
    if (formValue === SELF_ASSESSED_FORM.GOOD) return 'success'
    if (formValue === SELF_ASSESSED_FORM.OK) return 'warning'
    return 'error' // BAD
  }

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

      {lastWorkoutSession && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h6" gutterBottom>
            Previous Workout Summary
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Typography variant="body2">
              Date: {formatDate(lastWorkoutSession.startedAt)}
            </Typography>
            <Typography variant="body2">
              Total Duration: {formatDuration(lastWorkoutSession.startedAt)}
            </Typography>
            <Typography variant="body2">
              Exercises Completed: {lastWorkoutSession.exerciseData.length}
            </Typography>
          </Stack>

          {lastWorkoutSession.exerciseData.length > 0 && (
            <>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Exercise Breakdown
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {Object.entries(
                groupExercisesByName(lastWorkoutSession.exerciseData),
              ).map(([name, logs]) => (
                <Box key={name} sx={{ mb: 2 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="body1" fontWeight="medium">
                      {name}
                    </Typography>
                    <Chip
                      size="small"
                      label={
                        lastWorkoutSession.type === EXERCISE_TYPE.STANDARD
                          ? `${logs.length} sets`
                          : 'Circuit'
                      }
                      color="primary"
                      variant="outlined"
                    />
                  </Stack>

                  {logs.map((log, idx) => (
                    <Box key={idx} sx={{ ml: 2, mb: 1 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 0.5 }}
                      >
                        {isStandardExerciseLog(log) && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ minWidth: 60 }}
                          >
                            Set {log.setIndex + 1}:
                          </Typography>
                        )}
                        {!isStandardExerciseLog(log) && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ minWidth: 60 }}
                          >
                            Round {idx + 1}:
                          </Typography>
                        )}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mr: 1 }}
                        >
                          {renderExerciseInputs(log)}
                        </Typography>
                        <Chip
                          size="small"
                          label={log.assessment.form}
                          color={getAssessmentColor(log.assessment.form)}
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                        <Chip
                          size="small"
                          label={log.assessment.difficulty}
                          color="default"
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      </Stack>
                    </Box>
                  ))}
                </Box>
              ))}
            </>
          )}
        </Paper>
      )}

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
