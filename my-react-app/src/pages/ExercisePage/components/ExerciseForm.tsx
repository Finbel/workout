import React, { Dispatch, SetStateAction } from 'react'
import {
  Stack,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { ExerciseFormState } from '../ExercisePage'
import { ExerciseUnion } from '../../../types'

interface ExerciseFormProps {
  exerciseData: ExerciseUnion
  formState: ExerciseFormState
  setFormState: Dispatch<SetStateAction<ExerciseFormState>>
}

export const ExerciseForm = ({
  exerciseData,
  formState,
  setFormState,
}: ExerciseFormProps) => {
  return (
    <Stack spacing={2}>
      {exerciseData.expectedInputs.map((inputType) => (
        <TextField
          key={inputType}
          label={inputType.charAt(0) + inputType.slice(1).toLowerCase()}
          type="number"
          value={
            formState[inputType.toLowerCase() as keyof ExerciseFormState] || ''
          }
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              [inputType.toLowerCase()]: Number(e.target.value),
            }))
          }
          fullWidth
        />
      ))}

      <ToggleButtonGroup
        value={formState.form}
        exclusive
        onChange={(_, value) =>
          value && setFormState((prev) => ({ ...prev, form: value }))
        }
      >
        <ToggleButton value="good">Good Form</ToggleButton>
        <ToggleButton value="ok">OK Form</ToggleButton>
        <ToggleButton value="bad">Bad Form</ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup
        value={formState.difficulty}
        exclusive
        onChange={(_, value) =>
          value && setFormState((prev) => ({ ...prev, difficulty: value }))
        }
      >
        <ToggleButton value="easy">Easy</ToggleButton>
        <ToggleButton value="medium">Medium</ToggleButton>
        <ToggleButton value="hard">Hard</ToggleButton>
      </ToggleButtonGroup>

      <FormControlLabel
        control={
          <Checkbox
            checked={formState.excentric}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                excentric: e.target.checked,
              }))
            }
          />
        }
        label="Eccentric Phase"
      />
    </Stack>
  )
}
