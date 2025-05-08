import { useState } from 'react'
import { ExerciseFormState } from '../StandardExercise'
import { ScheduledExercise } from '../../../../types'
import { validateFormState } from './validateFormState'

const useFormState = () => {
  const [formState, setFormState] = useState<ExerciseFormState>({
    form: 'ok',
    difficulty: 'medium',
    excentric: false,
  })

  const validateForm = (exerciseData: ScheduledExercise) => {
    return validateFormState(formState, exerciseData)
  }

  const resetForm = () => {
    setFormState({
      form: 'ok',
      difficulty: 'medium',
      excentric: false,
    })
  }

  return { formState, setFormState, validateForm, resetForm }
}

export default useFormState
