import React from 'react'
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { Timer, CheckCircle } from '@mui/icons-material'
import { StandardExerciseLog, StandardWorkoutLog } from '../../../types/logging'
import { Timer as TimerComponent } from '../components/Timer'
import { ExerciseForm } from '../components/ExerciseForm'
import { useTimer } from './utils/useTimer'
import { getStandardWorkoutExercises } from './utils/getStandardWorkoutExercises'
import useWorkoutLog from './utils/useWorkoutLog'
import useStandardWorkoutProgress from './utils/useStandardWorkoutProgress'
import { useNavigate } from 'react-router-dom'
import useFormState from './utils/useFormState'
import { formStateToStandardExerciseLog } from './utils/formStateToStandardExerciseLog'

export const StandardExercisePage: React.FC<{
  workoutName: string
}> = ({ workoutName }) => {
  const navigate = useNavigate()
  const exercises = getStandardWorkoutExercises({ workoutName })
  const { workoutLog, updateLog } = useWorkoutLog<
    StandardWorkoutLog,
    StandardExerciseLog
  >({
    workoutName,
  })
  const { formState, setFormState, validateForm, resetForm } = useFormState()
  const { isResting, elapsedTime, restTimer, toggleResting, resetTimers } =
    useTimer()

  const { workoutProgress, incrementExerciseIndex, incrementSet } =
    useStandardWorkoutProgress()

  if (!workoutLog || !workoutProgress) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  const currentExercise = exercises[workoutProgress.currentExerciseIndex]

  const handleDone = () => {
    toggleResting()
  }

  const handleNext = () => {
    const validFormState = validateForm(currentExercise)
    if (!validFormState) {
      console.log('Invalid form state')
      return
    }

    // update log
    const standardExerciseLog = formStateToStandardExerciseLog(
      formState,
      currentExercise,
      elapsedTime,
      restTimer,
      workoutProgress.setNumber,
    )
    updateLog(standardExerciseLog)

    // increment set or exercise index
    const { setNumber, currentExerciseIndex } = workoutProgress
    if (setNumber < currentExercise.sets - 1) {
      incrementSet()
    } else if (currentExerciseIndex < exercises.length - 1) {
      incrementExerciseIndex()
    } else {
      setTimeout(() => {
        navigate(`/workout/${workoutName}/complete`)
      }, 1000)
    }

    // reset timers
    resetTimers()
    // reset form
    resetForm()
    // toggle resting
    toggleResting()
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {currentExercise.name} {workoutProgress.setNumber + 1}/
        {currentExercise.sets}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TimerComponent
          elapsedTime={elapsedTime}
          isResting={isResting}
          restTimer={restTimer}
        />
        <ExerciseForm
          exerciseData={currentExercise}
          formState={formState}
          setFormState={setFormState}
        />
      </Paper>

      {isResting ? (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          startIcon={<Timer />}
          onClick={handleNext}
        >
          Start Next Set
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          startIcon={<CheckCircle />}
          onClick={handleDone}
        >
          Done
        </Button>
      )}
    </Box>
  )
}
