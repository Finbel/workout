import { useState } from 'react'
import { ExerciseLog } from '../../../../domain/valueObjects'
import {
  InputType,
  SELF_ASSESSED_DIFFICULTY,
  SELF_ASSESSED_FORM,
  SelfAssessedDifficulty,
  SelfAssessedForm,
} from '../../../../domain/constants'
import { Exercise } from '../../../../domain/entities'

export type ExerciseForm = Partial<Record<InputType, number>> &
  Pick<ExerciseLog, 'assessment'>

const defaultForm: ExerciseForm = {
  assessment: {
    form: SELF_ASSESSED_FORM.GOOD,
    difficulty: SELF_ASSESSED_DIFFICULTY.EASY,
    excentric: false,
  },
}

export const useExerciseForm = () => {
  const [exerciseForm, setExerciseForm] = useState<ExerciseForm>(defaultForm)

  const handleInputChange = (inputType: InputType, value: number) => {
    setExerciseForm({ ...exerciseForm, [inputType]: value })
  }

  const handleFormChange = (selfAssessedForm: SelfAssessedForm) => {
    setExerciseForm({
      ...exerciseForm,
      assessment: {
        ...exerciseForm.assessment,
        form: selfAssessedForm,
      },
    })
  }

  const handleDifficultyChange = (difficulty: SelfAssessedDifficulty) => {
    setExerciseForm({
      ...exerciseForm,
      assessment: { ...exerciseForm.assessment, difficulty },
    })
  }

  const handleExcentricChange = (excentric: boolean) => {
    setExerciseForm({
      ...exerciseForm,
      assessment: { ...exerciseForm.assessment, excentric },
    })
  }

  const resetForm = () => {
    setExerciseForm(defaultForm)
  }

  const validateForm = (exercise: Exercise) => {
    return exercise.expectedInputs.every((input) => exerciseForm[input])
  }

  const getLogDataFromForm = (): Pick<ExerciseLog, 'assessment' | 'input'> => {
    return {
      assessment: exerciseForm.assessment,
      input: Object.entries(exerciseForm)
        .filter(([key]) => key !== 'assessment')
        .map(([key, value]) => ({
          type: key as InputType,
          amount: value as number,
        })),
    }
  }

  return {
    exerciseForm,
    validateForm,
    handleInputChange,
    handleFormChange,
    handleDifficultyChange,
    handleExcentricChange,
    resetForm,
    getLogDataFromForm,
  }
}

export type ExerciseFormHook = ReturnType<typeof useExerciseForm>
