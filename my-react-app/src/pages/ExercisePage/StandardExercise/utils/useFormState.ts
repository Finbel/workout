import { useState } from 'react'
import { ScheduledExercise } from '../../../../types'
import { validateFormState } from './validateFormState'
import { ExerciseFormState } from '../../ExercisePage'

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
