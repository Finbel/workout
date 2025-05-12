import React from 'react'
import {
  Stack,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { Exercise } from '../../../../domain/entities'
import type {
  ExerciseFormHook,
  ExerciseForm as ExerciseFormType,
} from '../utils/useExerciseForm'
import {
  SELF_ASSESSED_FORM,
  SELF_ASSESSED_DIFFICULTY,
  SelfAssessedDifficulty,
  SelfAssessedForm,
} from '../../../../domain/constants'

export interface ExerciseFormProps {
  exerciseData: Exercise
  formState: ExerciseFormType
  handleInputChange: ExerciseFormHook['handleInputChange']
  handleFormChange: ExerciseFormHook['handleFormChange']
  handleDifficultyChange: ExerciseFormHook['handleDifficultyChange']
  handleExcentricChange: ExerciseFormHook['handleExcentricChange']
}

export const ExerciseForm = ({
  exerciseData,
  formState,
  handleInputChange,
  handleFormChange,
  handleDifficultyChange,
  handleExcentricChange,
}: ExerciseFormProps) => {
  return (
    <Stack spacing={2}>
      {exerciseData.expectedInputs.map((inputType) => (
        <TextField
          key={inputType}
          label={inputType.charAt(0) + inputType.slice(1).toLowerCase()}
          type="number"
          value={formState[inputType] || 0}
          onChange={(e) => {
            handleInputChange(inputType, Number(e.target.value))
          }}
          fullWidth
        />
      ))}

      <ToggleButtonGroup
        value={formState.assessment.form}
        exclusive
        onChange={(_, value) =>
          value && handleFormChange(value as SelfAssessedForm)
        }
      >
        <ToggleButton value={SELF_ASSESSED_FORM.GOOD}>Good Form</ToggleButton>
        <ToggleButton value={SELF_ASSESSED_FORM.OK}>OK Form</ToggleButton>
        <ToggleButton value={SELF_ASSESSED_FORM.BAD}>Bad Form</ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup
        value={formState.assessment.difficulty}
        exclusive
        onChange={(_, value) =>
          value && handleDifficultyChange(value as SelfAssessedDifficulty)
        }
      >
        <ToggleButton value={SELF_ASSESSED_DIFFICULTY.EASY}>Easy</ToggleButton>
        <ToggleButton value={SELF_ASSESSED_DIFFICULTY.MEDIUM}>
          Medium
        </ToggleButton>
        <ToggleButton value={SELF_ASSESSED_DIFFICULTY.HARD}>Hard</ToggleButton>
      </ToggleButtonGroup>

      <FormControlLabel
        control={
          <Checkbox
            checked={formState.assessment.excentric}
            onChange={(e) => handleExcentricChange(e.target.checked)}
          />
        }
        label="Eccentric Phase"
      />
    </Stack>
  )
}
