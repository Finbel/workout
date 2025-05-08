import { ExerciseFormState } from '../ExercisePage'
import { BaseLog, StandardExerciseLog } from '../../../types/logging'
import { Exercise, ScheduledExercise } from '../../../types'
import { parseFormStateToInputArray } from './parseFormStateToInputArray'

type CurrentExerciseData =
  | {
      type: 'standard'
      exercise: ScheduledExercise
      setNumber: number
    }
  | {
      type: 'circuit'
      exercise: Exercise
      roundNumber: number
    }

type Arguments = {
  formState: ExerciseFormState
  exercise: CurrentExerciseData
  elapsedTime: number
  restTimer: number
}

const parseFormStateToExerciseLog = ({
  formState,
  exercise,
  elapsedTime,
  restTimer,
}: Arguments): StandardExerciseLog | BaseLog => {
  const baseLog: BaseLog = {
    duration: elapsedTime,
    restDuration: restTimer,
    timestamp: new Date().getTime(),
    exerciseName: exercise.exercise.name,
    assessment: {
      form: formState.form,
      difficulty: formState.difficulty,
      excentric: formState.excentric,
    },
    input: parseFormStateToInputArray(formState),
  }

  return exercise.type === 'standard'
    ? {
        ...baseLog,
        type: 'standard',
        set: exercise.setNumber,
      }
    : baseLog
}

export default parseFormStateToExerciseLog
