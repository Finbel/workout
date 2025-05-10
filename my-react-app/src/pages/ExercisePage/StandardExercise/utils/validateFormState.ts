import { ScheduledExercise } from '../../../../types'
import { ExerciseFormState } from '../../ExercisePage'
export const validateFormState = (
  formState: ExerciseFormState,
  exerciseData: ScheduledExercise,
) => {
  for (const input of exerciseData.expectedInputs) {
    console.log(input)
    switch (input) {
      case 'WEIGHT':
        if (formState.weight === undefined) {
          return false
        }
        break
      case 'SECONDS':
        console.log(formState)
        if (formState.seconds === undefined) {
          return false
        }
        break
      case 'REPS':
        if (formState.reps === undefined) {
          return false
        }
        break
      default: {
        const exhaustiveCheck: never = input
        throw new Error(`Unknown input type: ${exhaustiveCheck}`)
      }
    }
  }
  return true
}
