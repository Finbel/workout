import { ScheduledExercise } from '../../../../types'
import { StandardExerciseLog } from '../../../../types/logging'
import { parseFormStateToInputArray } from '../../utils/parseFormStateToInputArray'
import { ExerciseFormState } from '../StandardExercise'

export const formStateToStandardExerciseLog = (
  formState: ExerciseFormState,
  exercise: ScheduledExercise,
  elapsedTime: number,
  restTimer: number,
  setNumber: number,
): StandardExerciseLog => {
  return {
    type: 'standard',
    set: setNumber,
    duration: elapsedTime,
    restDuration: restTimer,
    timestamp: new Date().getTime(),
    exerciseName: exercise.name,
    assessment: {
      form: formState.form,
      difficulty: formState.difficulty,
      excentric: formState.excentric,
    },
    input: parseFormStateToInputArray(formState),
  }
}
