import React, { createContext, ReactNode, useMemo } from 'react'
import { createUseCases } from '../application/usecases/createUseCases'
import { createWorkoutSessionRepositoryAdapter } from '../infrastructure/adapters/workoutSessionRepository/createWorkoutSessionRepositoryAdapter'
import { createWorkoutRepositoryAdapter } from '../infrastructure/adapters/workoutRepository/createWorkoutRepositoryAdapter'
import { createDateAdapter } from '../infrastructure/adapters/date/createDateAdapter'

export type AppContextType = {
  useCases: ReturnType<typeof createUseCases>
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Create repository adapters
  const workoutSessionRepositoryAdapter =
    createWorkoutSessionRepositoryAdapter()
  const workoutRepositoryAdapter = createWorkoutRepositoryAdapter()
  const dateAdapter = createDateAdapter()

  // Create use cases
  const useCases = useMemo(
    () =>
      createUseCases(
        workoutSessionRepositoryAdapter,
        workoutRepositoryAdapter,
        dateAdapter,
      ),
    [workoutSessionRepositoryAdapter, workoutRepositoryAdapter, dateAdapter],
  )

  return (
    <AppContext.Provider value={{ useCases }}>{children}</AppContext.Provider>
  )
}
