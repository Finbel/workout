import { createWorkoutSessionRepositoryAdapter } from '../infrastructure/adapters/workoutSessionRepository/createWorkoutSessionRepositoryAdapter'
import { createWorkoutRepositoryAdapter } from '../infrastructure/adapters/workoutRepository/createWorkoutRepositoryAdapter'
import { createDateAdapter } from '../infrastructure/adapters/date/createDateAdapter'
import { createUseCases } from '../application/usecases/createUseCases'

export const createCompositeRoot = () => {
  const workoutSessionRepository = createWorkoutSessionRepositoryAdapter()
  const dateAdapter = createDateAdapter()
  const workoutRepository = createWorkoutRepositoryAdapter()

  const useCases = createUseCases(
    workoutSessionRepository,
    workoutRepository,
    dateAdapter,
  )

  return {
    useCases,
  }
}
