import { EXERCISE_TYPE } from '../../domain/constants'
import { Exercise } from '../../domain/entities'
import { createExerciseLog, ExerciseLog } from '../../domain/valueObjects'
import { WorkoutSessionRepositoryPort } from '../ports'

export const createUpdateWorkoutSessionWithExerciseLog = (
  workoutSessionRepositoryPort: WorkoutSessionRepositoryPort,
) => {
  return async (
    sessionId: string,
    exercise: Exercise,
    logData: Pick<
      ExerciseLog,
      'duration' | 'restDuration' | 'assessment' | 'input'
    >,
    setIndex?: number,
  ) => {
    const exerciseLog = createExerciseLog({
      exerciseName: exercise.name,
      type: exercise.type,
      duration: logData.duration,
      restDuration: logData.restDuration,
      assessment: logData.assessment,
      input: logData.input,
      timestamp: new Date().getTime(),
      setIndex: exercise.type === EXERCISE_TYPE.STANDARD ? setIndex : undefined,
    })

    const newWorkoutSession = await workoutSessionRepositoryPort.logExercise(
      sessionId,
      exerciseLog,
    )

    return newWorkoutSession
  }
}
