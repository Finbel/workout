import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material'
import { Timer, CheckCircle, Save } from '@mui/icons-material'
import { Timer as TimerComponent } from '../components/Timer'
import { ExerciseForm } from './components/ExerciseForm'
import { useNavigate } from 'react-router-dom'
import { StandardExercise } from '../../../domain/entities'
import { createCompositeRoot } from '../../../compositeRoot/createCompositeRoot'
import { useExerciseForm } from './utils/useExerciseForm'
import { useTimer } from './utils/useTimer'
import { EXERCISE_TYPE } from '../../../domain/constants'
import { PreviousExerciseInfo } from './components/PreviousExerciseInfo'
import { usePreviousExerciseData } from './utils/usePreviousExerciseData'
import { ExerciseLog } from '../../../domain/valueObjects'

type StandardExercisePageProps = {
  workoutSessionId: string
  scheduleId: string
  workoutId: string
}

export const StandardExercisePage: React.FC<StandardExercisePageProps> = ({
  workoutSessionId,
}) => {
  const navigate = useNavigate()
  const { useCases } = useMemo(() => createCompositeRoot(), [])

  // Exercise and set state
  const [currentExercise, setCurrentExercise] =
    useState<StandardExercise | null>(null)
  const [currentSetIndex, setCurrentSetIndex] = useState<number>(0)

  // UI state
  const [isWorkingOut, setIsWorkingOut] = useState(true) // true = working out, false = filling form
  const [formSaved, setFormSaved] = useState(false) // whether the form has been saved for the current set

  // Exercise data handling
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

  // Timer handling
  const {
    isResting,
    duration,
    restDuration,
    toggleResting,
    resetTimers,
    getLogDataFromTimers,
  } = useTimer()

  // Store the pending log data until we continue to the next set
  const [pendingLogData, setPendingLogData] = useState<Pick<
    ExerciseLog,
    'duration' | 'assessment' | 'input'
  > | null>(null)

  // Get previous exercise data
  const { previousLog, loading: loadingPreviousData } = usePreviousExerciseData(
    useCases,
    currentExercise,
    currentSetIndex,
  )

  useEffect(() => {
    const fetchWorkoutSession = async () => {
      const storedExercise =
        await useCases.getCurrentExerciseFromWorkoutSession(workoutSessionId)
      const storedSedIndex = await useCases.getCurrentSetIndex(workoutSessionId)

      if (!storedExercise) {
        navigate(`/completed/${workoutSessionId}`)
      } else if (
        storedExercise.type !== EXERCISE_TYPE.STANDARD ||
        storedSedIndex === null
      ) {
        throw new Error('Exercise is not a standard exercise')
      } else {
        setCurrentExercise(storedExercise)
        setCurrentSetIndex(storedSedIndex)
      }
    }
    fetchWorkoutSession()
  }, [useCases, workoutSessionId, navigate])

  // Reset workflow states when exercise or set changes
  useEffect(() => {
    setIsWorkingOut(true)
    setFormSaved(false)
    setPendingLogData(null)
    resetForm()
    resetTimers()
  }, [currentExercise, currentSetIndex])

  if (!currentExercise) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  // User finished the exercise and wants to log their data
  const handleDone = () => {
    setIsWorkingOut(false) // show the form
    toggleResting() // start rest timer
  }

  // User filled the form and wants to save data
  const handleSaveForm = () => {
    const validFormState = validateForm(currentExercise)
    if (!validFormState) {
      console.log('Invalid form state')
      return
    }

    // Save log data to local state, not to backend yet
    const { input, assessment } = getLogDataFromForm()
    const { duration } = getLogDataFromTimers()

    setPendingLogData({
      duration,
      assessment,
      input,
    })

    setFormSaved(true)
  }

  // User clicked start next set after saving form data
  const handleNextSet = async () => {
    if (!pendingLogData) {
      console.error('No pending log data to save')
      return
    }

    // Get the final rest duration at the time of continuing
    const { restDuration } = getLogDataFromTimers()

    // Now update the workout session with the complete log data
    await useCases.updateWorkoutSessionWithExerciseLog(
      workoutSessionId,
      currentExercise,
      {
        ...pendingLogData,
        restDuration,
      },
      currentSetIndex,
    )

    // Get the next exercise and set
    const newExercise = await useCases.getCurrentExerciseFromWorkoutSession(
      workoutSessionId,
    )
    const newSetIndex = await useCases.getCurrentSetIndex(workoutSessionId)

    if (!newExercise) {
      navigate(`/completed/${workoutSessionId}`)
    } else if (
      newExercise.type !== EXERCISE_TYPE.STANDARD ||
      newSetIndex === null
    ) {
      throw new Error('Exercise is not a standard exercise')
    } else {
      setCurrentExercise(newExercise)
      setCurrentSetIndex(newSetIndex)
    }

    // Reset state for next set
    resetTimers()
    resetForm()
    setFormSaved(false)
    setPendingLogData(null)
    setIsWorkingOut(true)
    toggleResting() // Stop resting
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {currentExercise.name} {currentSetIndex + 1}/{currentExercise.sets}
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TimerComponent
          elapsedTime={duration}
          isResting={isResting}
          restTimer={restDuration}
        />

        {isWorkingOut ? (
          // During workout: show previous exercise data
          loadingPreviousData ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <PreviousExerciseInfo
              previousLog={previousLog}
              currentSetIndex={currentSetIndex}
            />
          )
        ) : (
          // After workout: show the form
          <ExerciseForm
            exerciseData={currentExercise}
            formState={exerciseForm}
            handleInputChange={handleInputChange}
            handleFormChange={handleFormChange}
            handleDifficultyChange={handleDifficultyChange}
            handleExcentricChange={handleExcentricChange}
          />
        )}
      </Paper>

      {isWorkingOut ? (
        // During workout: show "Done" button
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
      ) : formSaved ? (
        // Form filled and saved: show "Start Next Set" button
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          startIcon={<Timer />}
          onClick={handleNextSet}
        >
          Start Next Set
        </Button>
      ) : (
        // Form not saved yet: show "Save" button
        <Button
          variant="contained"
          color="success"
          fullWidth
          size="large"
          startIcon={<Save />}
          onClick={handleSaveForm}
        >
          Save
        </Button>
      )}
    </Box>
  )
}
