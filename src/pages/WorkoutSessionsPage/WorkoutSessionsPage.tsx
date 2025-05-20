import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Grid,
  IconButton,
  Alert,
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider,
  InputAdornment,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useUseCases } from '../../hooks/useUseCases'
import { WorkoutSession } from '../../domain/entities'
import { format } from 'date-fns'
import { INPUT_TYPE } from '../../domain/constants'

export const WorkoutSessionsPage: React.FC = () => {
  const {
    getWorkoutHistory,
    getWorkoutSessionById,
    updateWorkoutSession,
    deleteWorkoutSession,
  } = useUseCases()
  const [sessions, setSessions] = useState<WorkoutSession[]>([])
  const [selectedSession, setSelectedSession] = useState<WorkoutSession | null>(
    null,
  )
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editedSession, setEditedSession] = useState<Partial<WorkoutSession>>(
    {},
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedExercises, setExpandedExercises] = useState<{
    [key: number]: boolean
  }>({})

  const loadSessions = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const workoutSessions = await getWorkoutHistory()
      setSessions(workoutSessions)
    } catch (error) {
      console.error('Error loading sessions:', error)
      setError('Failed to load workout sessions. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [getWorkoutHistory])

  useEffect(() => {
    loadSessions()
  }, [loadSessions])

  const handleEditClick = (session: WorkoutSession) => {
    setSelectedSession(session)
    setEditedSession({
      ...session,
    })
    setEditDialogOpen(true)
  }

  const handleDeleteClick = (session: WorkoutSession) => {
    setSelectedSession(session)
    setDeleteDialogOpen(true)
  }

  const handleViewClick = async (sessionId: string) => {
    try {
      const session = await getWorkoutSessionById(sessionId)
      setSelectedSession(session)
      setViewDialogOpen(true)
    } catch (error) {
      console.error('Error fetching session:', error)
    }
  }

  const handleEditSave = async () => {
    if (!selectedSession || !editedSession) return

    try {
      const updatedSession = {
        ...selectedSession,
        ...editedSession,
        id: selectedSession.id, // Ensure ID doesn't change
        scheduleId: selectedSession.scheduleId, // Preserve original scheduleId
        workoutId: selectedSession.workoutId, // Preserve original workoutId
      } as WorkoutSession

      await updateWorkoutSession(updatedSession)

      setEditDialogOpen(false)
      loadSessions()
    } catch (error) {
      console.error('Error updating session:', error)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!selectedSession) return

    try {
      await deleteWorkoutSession(selectedSession.id)

      setDeleteDialogOpen(false)
      loadSessions()
    } catch (error) {
      console.error('Error deleting session:', error)
    }
  }

  const toggleExerciseExpand = (index: number) => {
    setExpandedExercises((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const updateExerciseInput = (
    exerciseIndex: number,
    inputIndex: number,
    value: number,
  ) => {
    if (!editedSession.exerciseData) return

    const updatedExerciseData = [...editedSession.exerciseData]
    const exercise = { ...updatedExerciseData[exerciseIndex] }
    const inputs = [...exercise.input]

    inputs[inputIndex] = {
      ...inputs[inputIndex],
      amount: value,
    }

    exercise.input = inputs
    updatedExerciseData[exerciseIndex] = exercise

    setEditedSession({
      ...editedSession,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      exerciseData: updatedExerciseData as any,
    })
  }

  const getInputUnitLabel = (type: string) => {
    switch (type) {
      case INPUT_TYPE.WEIGHT:
        return 'kg'
      case INPUT_TYPE.SECONDS:
        return 'sec'
      case INPUT_TYPE.REPS:
        return 'reps'
      default:
        return ''
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Workout Sessions
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Typography>Loading workout sessions...</Typography>
      ) : sessions.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No workout sessions found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Complete a workout to see your sessions here.
          </Typography>
          <Button variant="contained" color="primary" href="/">
            Go to Workouts
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Workout Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    {format(
                      new Date(session.startedAt),
                      'EEEE, yyyy-MM-dd HH:mm',
                    )}
                  </TableCell>
                  <TableCell>{session.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={session.active ? 'Active' : 'Completed'}
                      color={session.active ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewClick(session.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(session)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(session)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* View Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Workout Session Details</DialogTitle>
        <DialogContent>
          {selectedSession && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Session ID</Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedSession.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Schedule ID</Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedSession.scheduleId}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Workout ID</Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedSession.workoutId}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Started At</Typography>
                <Typography variant="body1" gutterBottom>
                  {format(
                    new Date(selectedSession.startedAt),
                    'EEEE, yyyy-MM-dd HH:mm:ss',
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Status</Typography>
                <Typography variant="body1" gutterBottom>
                  <Chip
                    label={selectedSession.active ? 'Active' : 'Completed'}
                    color={selectedSession.active ? 'success' : 'default'}
                    size="small"
                  />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Workout Type</Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedSession.type}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Exercise Data
                </Typography>
                {selectedSession.exerciseData &&
                selectedSession.exerciseData.length > 0 ? (
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{ mt: 1 }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Exercise</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Duration</TableCell>
                          <TableCell>Rest Duration</TableCell>
                          <TableCell>Input Values</TableCell>
                          <TableCell>Assessment</TableCell>
                          <TableCell>Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedSession.exerciseData.map((exercise, index) => (
                          <TableRow key={index}>
                            <TableCell>{exercise.exerciseName}</TableCell>
                            <TableCell>{exercise.type}</TableCell>
                            <TableCell>{exercise.duration}s</TableCell>
                            <TableCell>{exercise.restDuration}s</TableCell>
                            <TableCell>
                              {exercise.input.map((input, idx) => (
                                <Typography
                                  key={idx}
                                  variant="body2"
                                  sx={{ mb: 0.5 }}
                                >
                                  {input.type}: {input.amount}{' '}
                                  {getInputUnitLabel(input.type)}
                                </Typography>
                              ))}
                            </TableCell>
                            <TableCell>
                              {exercise.assessment?.effort && (
                                <Chip
                                  label={`Effort: ${exercise.assessment.effort}/10`}
                                  size="small"
                                  sx={{ mr: 1 }}
                                />
                              )}
                              {exercise.assessment?.difficulty && (
                                <Chip
                                  label={`Difficulty: ${exercise.assessment.difficulty}/10`}
                                  size="small"
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              {format(new Date(exercise.timestamp), 'HH:mm:ss')}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2">
                    No exercise data available
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          <Button
            onClick={() => {
              setViewDialogOpen(false)
              setSelectedSession(selectedSession)
              setEditedSession({ ...selectedSession })
              setEditDialogOpen(true)
            }}
            color="primary"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit Workout Session</DialogTitle>
        <DialogContent>
          {editedSession && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Session ID: {selectedSession?.id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Schedule ID</Typography>
                <Typography variant="body1" gutterBottom>
                  {editedSession.scheduleId || ''}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Workout ID</Typography>
                <Typography variant="body1" gutterBottom>
                  {editedSession.workoutId || ''}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Started At"
                  type="datetime-local"
                  value={
                    editedSession.startedAt
                      ? format(
                          new Date(editedSession.startedAt),
                          "yyyy-MM-dd'T'HH:mm",
                        )
                      : ''
                  }
                  onChange={(e) => {
                    const date = new Date(e.target.value)
                    setEditedSession({
                      ...editedSession,
                      startedAt: date.getTime(),
                    })
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={editedSession.active || false}
                      onChange={(e) =>
                        setEditedSession({
                          ...editedSession,
                          active: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Active"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Exercise Data
                </Typography>
                {editedSession.exerciseData &&
                editedSession.exerciseData.length > 0 ? (
                  <List>
                    {editedSession.exerciseData.map(
                      (exercise, exerciseIndex) => (
                        <Paper
                          key={exerciseIndex}
                          sx={{ mb: 2, overflow: 'hidden' }}
                        >
                          <ListItem
                            onClick={() => toggleExerciseExpand(exerciseIndex)}
                            sx={{ cursor: 'pointer' }}
                            secondaryAction={
                              <IconButton edge="end">
                                {expandedExercises[exerciseIndex] ? (
                                  <ExpandLessIcon />
                                ) : (
                                  <ExpandMoreIcon />
                                )}
                              </IconButton>
                            }
                          >
                            <ListItemText
                              primary={exercise.exerciseName}
                              secondary={`${exercise.type} - Duration: ${exercise.duration}s`}
                            />
                          </ListItem>

                          <Collapse
                            in={!!expandedExercises[exerciseIndex]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ p: 2 }}>
                              <Typography variant="subtitle2" gutterBottom>
                                Input Values
                              </Typography>

                              {exercise.input.map((input, inputIndex) => (
                                <Box
                                  key={inputIndex}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{ width: '100px' }}
                                  >
                                    {input.type}:
                                  </Typography>
                                  <TextField
                                    size="small"
                                    type="number"
                                    value={input.amount}
                                    onChange={(e) =>
                                      updateExerciseInput(
                                        exerciseIndex,
                                        inputIndex,
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          {getInputUnitLabel(input.type)}
                                        </InputAdornment>
                                      ),
                                    }}
                                    sx={{ width: '150px' }}
                                  />
                                </Box>
                              ))}

                              <Divider sx={{ my: 1 }} />

                              <Typography variant="subtitle2" gutterBottom>
                                Additional Information
                              </Typography>
                              <Typography variant="body2">
                                Duration: {exercise.duration}s
                              </Typography>
                              <Typography variant="body2">
                                Rest Duration: {exercise.restDuration}s
                              </Typography>
                              {exercise.assessment && (
                                <>
                                  <Typography variant="body2">
                                    Effort: {exercise.assessment.effort}/10
                                  </Typography>
                                  <Typography variant="body2">
                                    Difficulty: {exercise.assessment.difficulty}
                                    /10
                                  </Typography>
                                </>
                              )}
                              <Typography variant="body2">
                                Time:{' '}
                                {format(
                                  new Date(exercise.timestamp),
                                  'HH:mm:ss',
                                )}
                              </Typography>
                            </Box>
                          </Collapse>
                        </Paper>
                      ),
                    )}
                  </List>
                ) : (
                  <Typography variant="body2">
                    No exercise data available
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Workout Session</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this workout session? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
