import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  Typography,
  Box,
  Paper,
  Chip,
  Stack,
  Button,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from '@mui/material'
import { FitnessCenter, ArrowBack, CalendarToday } from '@mui/icons-material'
import { getLogs } from '../../utils/workoutLogStorage'
import { StandardExerciseLog, WorkoutLog } from '../../types/logging'
import { INPUT_TYPE } from '../../constants'

// Type for organizing logs by workout
type WorkoutLogsMap = {
  [workoutName: string]: {
    [date: string]: WorkoutLog
  }
}

// Type for organizing exercise logs
type ExerciseLogsMap = {
  [exerciseName: string]: {
    [date: string]: StandardExerciseLog
  }
}

export const WorkoutLogsPage: React.FC = () => {
  const navigate = useNavigate()
  const { workoutName, exerciseName } = useParams<{
    workoutName?: string
    exerciseName?: string
  }>()
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLogsMap>({})
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLogsMap>({})

  useEffect(() => {
    // Get all logs from local storage
    const logs = getLogs()

    // Organize logs by workout
    const organizedLogs: WorkoutLogsMap = {}
    Object.entries(logs).forEach(([date, log]) => {
      const workoutLog = log as WorkoutLog
      if (!organizedLogs[workoutLog.workoutName]) {
        organizedLogs[workoutLog.workoutName] = {}
      }
      organizedLogs[workoutLog.workoutName][date] = workoutLog
    })

    // Sort dates in descending order for each workout
    Object.keys(organizedLogs).forEach((name) => {
      const dates = Object.keys(organizedLogs[name]).sort((a, b) =>
        b.localeCompare(a),
      )
      const sortedLogs: { [date: string]: WorkoutLog } = {}
      dates.forEach((date) => {
        sortedLogs[date] = organizedLogs[name][date]
      })
      organizedLogs[name] = sortedLogs
    })

    setWorkoutLogs(organizedLogs)

    // If we have a specific workout and exercise, organize logs for that exercise
    if (workoutName && exerciseName) {
      const exerciseLogsMap: ExerciseLogsMap = {}
      const workoutDates = Object.keys(organizedLogs[workoutName] || {})

      workoutDates.forEach((date) => {
        const log = organizedLogs[workoutName][date]
        const exerciseLog = log.exerciseData.find(
          (exercise) =>
            exercise.type === 'standard' &&
            'exerciseName' in exercise &&
            exercise.exerciseName === exerciseName,
        ) as StandardExerciseLog | undefined

        if (exerciseLog) {
          if (!exerciseLogsMap[exerciseName]) {
            exerciseLogsMap[exerciseName] = {}
          }
          exerciseLogsMap[exerciseName][date] = exerciseLog
        }
      })

      setExerciseLogs(exerciseLogsMap)
    }
  }, [workoutName, exerciseName])

  const goBack = () => {
    if (exerciseName) {
      navigate(`/logs/workouts/${workoutName}`)
    } else if (workoutName) {
      navigate('/logs/workouts')
    } else {
      navigate('/')
    }
  }

  // Render list of workout schedules
  const renderWorkoutList = () => {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Workout Schedules
        </Typography>
        <Stack spacing={2}>
          {Object.entries(workoutLogs).map(([name, logs]) => {
            const dates = Object.keys(logs)
            const lastCompleted = dates[0] // Most recent date
            const count = dates.length

            return (
              <Card key={name} elevation={2}>
                <CardHeader
                  title={name}
                  subheader={`Last completed: ${lastCompleted}`}
                  action={
                    <Chip
                      label={`${count} workouts`}
                      color="primary"
                      size="small"
                      icon={<FitnessCenter />}
                    />
                  }
                />
                <CardContent>
                  <Button
                    component={Link}
                    to={`/logs/workouts/${encodeURIComponent(name)}`}
                    variant="outlined"
                    fullWidth
                  >
                    View History
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </Stack>
      </Box>
    )
  }

  // Render dates for a specific workout
  const renderWorkoutDates = () => {
    if (!workoutName) return null

    const dates = Object.keys(workoutLogs[workoutName] || {})
    if (dates.length === 0) return null

    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          {workoutName} - Workout History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Exercises</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dates.map((date) => {
                const log = workoutLogs[workoutName][date]
                return (
                  <TableRow key={date}>
                    <TableCell>{date}</TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: 'wrap', gap: 1 }}
                      >
                        {log.exerciseData
                          .filter((exercise) => exercise.type === 'standard')
                          .map((exercise) => (
                            <Chip
                              key={exercise.exerciseName}
                              label={exercise.exerciseName}
                              size="small"
                              component={Link}
                              to={`/logs/workouts/${encodeURIComponent(
                                workoutName,
                              )}/${encodeURIComponent(exercise.exerciseName)}`}
                              clickable
                            />
                          ))}
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        component={Link}
                        to={`/logs/calendar?date=${date}`}
                        startIcon={<CalendarToday />}
                        size="small"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  }

  // Render exercise logs
  const renderExerciseLogs = () => {
    if (!workoutName || !exerciseName) return null

    const logs = exerciseLogs[exerciseName]
    if (!logs) return null

    const dates = Object.keys(logs).sort((a, b) => b.localeCompare(a))

    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          {exerciseName} - Progress History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="center">Set</TableCell>
                <TableCell align="center">Form</TableCell>
                <TableCell align="center">Difficulty</TableCell>
                <TableCell align="center">Duration</TableCell>
                <TableCell align="center">Rest</TableCell>
                <TableCell align="center">Weight</TableCell>
                <TableCell align="center">Reps</TableCell>
                <TableCell align="center">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dates.map((date) => {
                const exercise = logs[date]
                const weight =
                  exercise.input.find(
                    (input) => input.type === INPUT_TYPE.WEIGHT,
                  )?.amount || '-'
                const reps =
                  exercise.input.find((input) => input.type === INPUT_TYPE.REPS)
                    ?.amount || '-'
                const time =
                  exercise.input.find(
                    (input) => input.type === INPUT_TYPE.SECONDS,
                  )?.amount || '-'

                return (
                  <TableRow key={date} hover>
                    <TableCell>{date}</TableCell>
                    <TableCell align="center">{exercise.set}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={exercise.assessment.form}
                        color={
                          exercise.assessment.form === 'good'
                            ? 'success'
                            : exercise.assessment.form === 'ok'
                            ? 'warning'
                            : 'error'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {exercise.assessment.difficulty}
                    </TableCell>
                    <TableCell align="center">
                      {Math.floor(exercise.duration / 60)}m{' '}
                      {exercise.duration % 60}s
                    </TableCell>
                    <TableCell align="center">
                      {Math.floor(exercise.restDuration / 60)}m{' '}
                      {exercise.restDuration % 60}s
                    </TableCell>
                    <TableCell align="center">{weight}</TableCell>
                    <TableCell align="center">{reps}</TableCell>
                    <TableCell align="center">{time}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  }

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={goBack}>
          Back
        </Button>

        <Button
          startIcon={<CalendarToday />}
          onClick={() => navigate('/logs/calendar')}
          variant="outlined"
        >
          Calendar View
        </Button>
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Workout History
      </Typography>

      {!workoutName && renderWorkoutList()}
      {workoutName && !exerciseName && renderWorkoutDates()}
      {workoutName && exerciseName && renderExerciseLogs()}
    </Container>
  )
}
