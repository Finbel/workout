import { INPUT_TYPE } from '../../../constants'
import { ExerciseFormState } from '../ExercisePage'
import { InputLog } from '../../../types/logging'

export const parseFormStateToInputArray = (
  formState: ExerciseFormState,
): InputLog[] => {
  return [
    ...(formState.weight
      ? [{ type: INPUT_TYPE.WEIGHT, amount: formState.weight }]
      : []),
    ...(formState.reps
      ? [{ type: INPUT_TYPE.REPS, amount: formState.reps }]
      : []),
    ...(formState.time
      ? [{ type: INPUT_TYPE.SECONDS, amount: formState.time }]
      : []),
  ]
}
