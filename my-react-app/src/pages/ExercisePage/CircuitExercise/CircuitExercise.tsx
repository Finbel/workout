import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { Timer, CheckCircle } from '@mui/icons-material'
import { Timer as TimerComponent } from '../components/Timer'
import { ExerciseForm } from './components/ExerciseForm'
import { useNavigate } from 'react-router-dom'
import { CircuitExercise } from '../../../domain/entities'
import { createCompositeRoot } from '../../../compositeRoot/createCompositeRoot'
import { useExerciseForm } from './utils/useExerciseForm'
import { useTimer } from './utils/useTimer'
import { EXERCISE_TYPE } from '../../../domain/constants'

type CircuitExercisePageProps = {
  workoutSessionId: string
  scheduleId: string
  workoutId: string
}

export const CircuitExercisePage: React.FC<CircuitExercisePageProps> = ({
  workoutSessionId,
}) => {
  const navigate = useNavigate()

  const { useCases } = useMemo(() => createCompositeRoot(), [])
  const [currentExercise, setCurrentExercise] =
    useState<CircuitExercise | null>(null)
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
  const [totalRounds, setTotalRounds] = useState(0)
  const {
    exerciseForm,
    handleInputChange,
    handleFormChange,
    handleDifficultyChange,
    handleExcentricChange,
    resetForm,
    validateForm,
    getLogDataFromForm,
  } = useExerciseForm()
  const {
    isResting,
    duration,
    restDuration,
    toggleResting,
    resetTimers,
    getLogDataFromTimers,
  } = useTimer()

  useEffect(() => {
    const fetchWorkoutSession = async () => {
      const storedExercise =
        await useCases.getCurrentExerciseFromWorkoutSession(workoutSessionId)
      const storedRoundIndex = await useCases.getCurrentRoundIndex(
        workoutSessionId,
      )
      const totalRounds = await useCases.getTotalRounds(workoutSessionId)

      if (!storedExercise) {
        navigate(`/completed/${workoutSessionId}`)
      } else if (
        storedExercise.type !== EXERCISE_TYPE.CIRCUIT ||
        storedRoundIndex === null
      ) {
        throw new Error('Exercise is not a circuit exercise')
      } else {
        setCurrentExercise(storedExercise)
        setCurrentRoundIndex(storedRoundIndex)
        setTotalRounds(totalRounds)
      }
    }
    fetchWorkoutSession()
  }, [useCases, workoutSessionId, navigate])

  if (!currentExercise) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  const handleDone = () => {
    toggleResting()
  }

  const handleNext = async () => {
    const validFormState = validateForm(currentExercise)
    if (!validFormState) {
      console.log('Invalid form state')
      return
    }

    const { input, assessment } = getLogDataFromForm()
    const { duration, restDuration } = getLogDataFromTimers()
    if (currentRoundIndex === null) {
      throw new Error('Current set index is not set')
    }

    await useCases.updateWorkoutSessionWithExerciseLog(
      workoutSessionId,
      currentExercise,
      {
        duration,
        restDuration,
        assessment,
        input,
      },
    )
    const newExercise = await useCases.getCurrentExerciseFromWorkoutSession(
      workoutSessionId,
    )
    const newSetIndex = await useCases.getCurrentRoundIndex(workoutSessionId)
    if (!newExercise) {
      navigate(`/completed/${workoutSessionId}`)
    } else if (
      newExercise.type !== EXERCISE_TYPE.CIRCUIT ||
      newSetIndex === null
    ) {
      throw new Error('Exercise is not a standard exercise')
    } else {
      setCurrentExercise(newExercise)
      setCurrentRoundIndex(newSetIndex)
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
        {currentExercise.name} {currentRoundIndex + 1}/{totalRounds}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TimerComponent
          elapsedTime={duration}
          isResting={isResting}
          restTimer={restDuration}
        />
        <ExerciseForm
          exerciseData={currentExercise}
          formState={exerciseForm}
          handleInputChange={handleInputChange}
          handleFormChange={handleFormChange}
          handleDifficultyChange={handleDifficultyChange}
          handleExcentricChange={handleExcentricChange}
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
