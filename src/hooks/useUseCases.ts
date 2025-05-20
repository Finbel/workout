import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

export const useUseCases = () => {
  const { useCases } = useContext(AppContext) || {}

  if (!useCases) {
    throw new Error('useCases must be used within an AppProvider')
  }

  return useCases
}
