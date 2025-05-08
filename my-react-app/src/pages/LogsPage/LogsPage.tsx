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
  List,
  ListItemText,
  ListItemButton,
  Chip,
  Stack,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Collapse,
  Badge,
  styled,
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  FitnessCenter,
  ArrowBack,
  ExpandLess,
} from '@mui/icons-material'
import { getLogs } from '../../utils/workoutLogStorage'
import { StandardExerciseLog, WorkoutLog } from '../../types/logging'

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
  const [expandedMap, setExpandedMap] = useState<{ [key: string]: boolean }>({})

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

  // Handle date click on calendar - ensure it works with the Calendar component
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  // Toggle exercise details for a specific exercise
  const toggleExerciseDetails = (exerciseId: string) => {
    setExpandedMap((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }))
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

  // Render workout log details for selected date
  const renderSelectedDateLog = () => {
    if (!selectedDate) return null

    const dateString = formatDate(selectedDate)
    const log = logs[dateString]

    if (!log) {
      return (
        <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
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

    return (
      <Card elevation={3} sx={{ mt: 3 }}>
        <CardHeader
          title={log.workoutName}
          subheader={formattedDate}
          action={
            <Chip
              label={`${log.exerciseData.length} exercises`}
              color="primary"
              size="small"
              icon={<FitnessCenter />}
            />
          }
        />
        <Divider />
        <CardContent>
          <List>
            {log.exerciseData.map((exercise, index) => {
              if (exercise.type === 'standard') {
                const standard = exercise as StandardExerciseLog
                const exerciseId = `${dateString}-${standard.exerciseName}-${index}`
                const isExpanded = Boolean(expandedMap[exerciseId])

                return (
                  <Paper
                    key={exerciseId}
                    elevation={1}
                    sx={{ mb: 2, overflow: 'hidden' }}
                  >
                    <ListItemButton
                      onClick={() => toggleExerciseDetails(exerciseId)}
                    >
                      <ListItemText
                        primary={standard.exerciseName}
                        secondary={`Set ${standard.set}`}
                      />
                      {isExpanded ? <ExpandLess /> : <ExpandMoreIcon />}
                    </ListItemButton>
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mb: 1, flexWrap: 'wrap' }}
                        >
                          <Chip
                            label={`Form: ${standard.assessment.form}`}
                            color={
                              standard.assessment.form === 'good'
                                ? 'success'
                                : standard.assessment.form === 'ok'
                                ? 'warning'
                                : 'error'
                            }
                            size="small"
                            sx={{ mb: 1 }}
                          />
                          <Chip
                            label={`Difficulty: ${standard.assessment.difficulty}`}
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={{ mb: 1 }}
                          />
                          {standard.assessment.excentric && (
                            <Chip
                              label="Eccentric"
                              color="secondary"
                              size="small"
                              sx={{ mb: 1 }}
                            />
                          )}
                        </Stack>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Duration: {Math.floor(standard.duration / 60)}m{' '}
                          {standard.duration % 60}s
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Rest: {Math.floor(standard.restDuration / 60)}m{' '}
                          {standard.restDuration % 60}s
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="subtitle2" gutterBottom>
                          Input:
                        </Typography>
                        {standard.input.map((input, idx) => (
                          <Typography key={idx} variant="body2">
                            {input.type}: {input.amount}
                          </Typography>
                        ))}
                      </Box>
                    </Collapse>
                  </Paper>
                )
              } else {
                // Handle other exercise types here if needed
                return null
              }
            })}
          </List>
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
    <Box sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={goBack} sx={{ mb: 2 }}>
        Back to Home
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        Workout Calendar
      </Typography>

      {/* Workout Statistics */}
      {renderWorkoutStats()}

      {/* Calendar View */}
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
          tileClassName={tileClassName}
          className="react-calendar"
        />
      </Paper>

      {/* Selected Day Details */}
      {renderSelectedDateLog()}
    </Box>
  )
}
