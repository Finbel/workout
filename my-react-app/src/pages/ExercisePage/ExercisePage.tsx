import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StandardExercisePage } from './StandardExercise/StandardExercise'
import { createCompositeRoot } from '../../compositeRoot/createCompositeRoot'
import { WorkoutSession } from '../../domain/entities'
import { EXERCISE_TYPE } from '../../domain/constants'
import { CircuitExercisePage } from './CircuitExercise/CircuitExercise'

export const ExercisePage: React.FC = () => {
  const { sessionId } = useParams<{
    sessionId: string
  }>()

  const { useCases } = useMemo(() => createCompositeRoot(), [])

  const [workoutSession, setWorkoutSession] = useState<WorkoutSession | null>(
    null,
  )

  useEffect(() => {
    if (sessionId) {
      useCases.getWorkoutSessionById(sessionId).then((workoutSession) => {
        setWorkoutSession(workoutSession)
      })
    }
  }, [sessionId, useCases])

  if (!workoutSession) {
    return <div>Loading...</div>
  }
  const workoutType = workoutSession.type

  if (workoutType === EXERCISE_TYPE.STANDARD) {
    return (
      <StandardExercisePage
        workoutSessionId={workoutSession.id}
        scheduleId={workoutSession.scheduleId}
        workoutId={workoutSession.workoutId}
      />
    )
  }

  if (workoutType === EXERCISE_TYPE.CIRCUIT) {
    return (
      <CircuitExercisePage
        workoutSessionId={workoutSession.id}
        scheduleId={workoutSession.scheduleId}
        workoutId={workoutSession.workoutId}
      />
    )
  }

  const exhaustiveCheck: never = workoutType
  throw new Error(`Unknown workout type: ${exhaustiveCheck}`)
}
