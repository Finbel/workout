import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './LogsPage.css'
import {
  Typography,
  Box,
  Paper,
  Divider,
  Chip,
  Stack,
  Button,
  Card,
  CardContent,
  CardHeader,
  Badge,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from '@mui/material'
import {
  FitnessCenter,
  ArrowBack,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { getLogs, deleteLogForDate } from '../../utils/workoutLogStorage'
import { StandardExerciseLog, WorkoutLog } from '../../types/logging'
import { INPUT_TYPE } from '../../constants'

// Type for organizing logs by date and workout
type LogsMap = {
  [date: string]: WorkoutLog
}

// Type for workout stats
type WorkoutStats = {
  [workoutName: string]: {
    count: number
    dates: string[]
    lastCompleted: string
  }
}

// Custom styled Badge component for calendar date tile
const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    padding: '0 4px',
  },
}))

export const LogsPage: React.FC = () => {
  const navigate = useNavigate()
  const [logs, setLogs] = useState<LogsMap>({})
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats>({})
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    // Get all logs from local storage
    const storedLogs = getLogs() as LogsMap
    setLogs(storedLogs)

    // Calculate workout statistics
    const stats: WorkoutStats = {}

    Object.entries(storedLogs).forEach(([date, log]) => {
      const { workoutName } = log

      if (!stats[workoutName]) {
        stats[workoutName] = {
          count: 0,
          dates: [],
          lastCompleted: date,
        }
      }

      stats[workoutName].count += 1
      stats[workoutName].dates.push(date)

      // Update last completed date if current log is more recent
      if (new Date(date) > new Date(stats[workoutName].lastCompleted)) {
        stats[workoutName].lastCompleted = date
      }
    })

    setWorkoutStats(stats)
  }, [])

  const goBack = () => {
    navigate('/')
  }

  // Handle date click on calendar
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  // Format date as YYYY-MM-DD to match storage format
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  // Calendar tile content - show badge for dates with workouts
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null

    const dateString = formatDate(date)
    const hasWorkout = logs[dateString] !== undefined

    if (hasWorkout) {
      const workoutLog = logs[dateString]
      return (
        <StyledBadge
          badgeContent={workoutLog.exerciseData.length}
          color="primary"
          sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <FitnessCenter color="action" fontSize="small" />
        </StyledBadge>
      )
    }

    return null
  }

  // Callback for calendar tile class name
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null

    const dateString = formatDate(date)
    if (logs[dateString] !== undefined) {
      return 'workout-date'
    }

    return null
  }

  // Handle confirmation dialog
  const openDeleteDialog = () => {
    setDeleteDialogOpen(true)
  }

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false)
  }

  const handleDeleteLog = () => {
    if (!selectedDate) return

    const dateString = formatDate(selectedDate)
    const success = deleteLogForDate(dateString)

    if (success) {
      // Remove the deleted log from state
      const updatedLogs = { ...logs }
      delete updatedLogs[dateString]
      setLogs(updatedLogs)

      // Update workout statistics
      const updatedStats = { ...workoutStats }

      // Check if we need to update stats for the deleted workout
      const deletedWorkoutName = logs[dateString]?.workoutName
      if (deletedWorkoutName && updatedStats[deletedWorkoutName]) {
        if (updatedStats[deletedWorkoutName].count <= 1) {
          // Remove the workout stats if this was the only log
          delete updatedStats[deletedWorkoutName]
        } else {
          // Update the count and dates array
          updatedStats[deletedWorkoutName].count -= 1
          updatedStats[deletedWorkoutName].dates = updatedStats[
            deletedWorkoutName
          ].dates.filter((d) => d !== dateString)

          // Update the lastCompleted if needed
          if (
            updatedStats[deletedWorkoutName].lastCompleted === dateString &&
            updatedStats[deletedWorkoutName].dates.length > 0
          ) {
            updatedStats[deletedWorkoutName].lastCompleted =
              updatedStats[deletedWorkoutName].dates[0]
          }
        }

        setWorkoutStats(updatedStats)
      }
    }

    // Close the dialog
    closeDeleteDialog()
  }

  // Render workout log details for selected date
  const renderSelectedDateLog = () => {
    if (!selectedDate) return null

    const dateString = formatDate(selectedDate)
    const log = logs[dateString]

    if (!log) {
      return (
        <Paper elevation={2} sx={{ p: 3, mt: 3, width: '100%' }}>
          <Typography variant="body1" align="center">
            No workout logged for this date.
          </Typography>
        </Paper>
      )
    }

    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Filter and transform exercise data for the table
    const standardExercises = log.exerciseData
      .filter((exercise) => exercise.type === 'standard')
      .map((exercise) => exercise as StandardExerciseLog)

    return (
      <Card elevation={3} sx={{ mt: 3, width: '100%' }}>
        <CardHeader
          title={log.workoutName}
          subheader={formattedDate}
          action={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip
                label={`${log.exerciseData.length} exercises`}
                color="primary"
                size="small"
                icon={<FitnessCenter />}
                sx={{ mr: 1 }}
              />
              <Tooltip title="Delete this workout log">
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={openDeleteDialog}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          }
        />
        <Divider />
        <CardContent sx={{ p: 0 }}>
          <TableContainer
            component={Paper}
            sx={{ maxWidth: '100%', overflowX: 'auto' }}
          >
            <Table stickyHeader aria-label="workout exercise log table">
              <TableHead>
                <TableRow>
                  <TableCell>Exercise</TableCell>
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
                {standardExercises.map((exercise, index) => {
                  // Find weight, reps, and time from input array
                  const weight =
                    exercise.input.find(
                      (input) => input.type === INPUT_TYPE.WEIGHT,
                    )?.amount || '-'
                  const reps =
                    exercise.input.find(
                      (input) => input.type === INPUT_TYPE.REPS,
                    )?.amount || '-'
                  const time =
                    exercise.input.find(
                      (input) => input.type === INPUT_TYPE.SECONDS,
                    )?.amount || '-'

                  return (
                    <TableRow key={`${exercise.exerciseName}-${index}`} hover>
                      <TableCell component="th" scope="row">
                        {exercise.exerciseName}
                      </TableCell>
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
        </CardContent>
      </Card>
    )
  }

  // Render workout statistics section
  const renderWorkoutStats = () => {
    if (Object.keys(workoutStats).length === 0) {
      return null
    }

    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Workout Statistics
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {Object.entries(workoutStats).map(([name, stats]) => (
            <Chip
              key={name}
              icon={<FitnessCenter />}
              label={`${name}: ${stats.count} times`}
              color="primary"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      </Box>
    )
  }

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={goBack}>
          Back to Home
        </Button>

        <Button
          startIcon={<FitnessCenter />}
          onClick={() => navigate('/logs/workouts')}
          variant="outlined"
        >
          View by Workout
        </Button>
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Workout Calendar
      </Typography>

      {/* Workout Statistics */}
      {renderWorkoutStats()}

      {/* Calendar View */}
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Calendar
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={handleDateChange as any}
          value={selectedDate}
          tileContent={tileContent}
          tileClassName={tileClassName}
          className="react-calendar"
        />
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Workout Log</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this workout log? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteLog} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Selected Day Details */}
      {renderSelectedDateLog()}
    </Container>
  )
}
