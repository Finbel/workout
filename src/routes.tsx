import React from 'react'
import { StartPage } from './pages/StartPage/StartPage'
import { ExercisePage } from './pages/ExercisePage/ExercisePage'
import { WorkoutCompleted } from './pages/WorkoutCompleted'
import { ScheduledWorkout } from './pages/ScheduledWorkout/ScheduledWorkout'

export interface RouteConfig {
  key: string
  path: string
  label: string
  element: React.ReactNode
  meta: {
    showInNav: boolean
    // You can add more meta properties here later
    // requiresAuth?: boolean
    // icon?: React.ComponentType
  }
}

export const routes: RouteConfig[] = [
  {
    key: 'START_PAGE',
    path: '/',
    label: 'Home',
    element: <StartPage />,
    meta: {
      showInNav: true,
    },
  },
  {
    key: 'SCHEDULED_WORKOUT_PAGE',
    path: '/scheduled-workout/:scheduleId/workout/:workoutId',
    label: 'Scheduled Workout',
    element: <ScheduledWorkout />,
    meta: {
      showInNav: false,
    },
  },
  {
    key: 'EXERCISE_PAGE',
    path: '/scheduled-workout/:scheduleId/workout/:workoutId/exercise-session/:sessionId',
    label: 'Exercise Session',
    element: <ExercisePage />,
    meta: {
      showInNav: false,
    },
  },
  {
    key: 'WORKOUT_COMPLETE_PAGE',
    path: '/completed/:sessionId',
    label: 'Workout Complete',
    element: <WorkoutCompleted />,
    meta: {
      showInNav: false,
    },
  },
]

const routesObject = Object.fromEntries(
  routes.map((route) => [route.key, route]),
)

export const getRoute = (key: string) => {
  const route = routesObject[key]
  if (!route) {
    throw new Error(`Route with key ${key} not found`)
  }
  return route
}

export const generatePath = (key: string, params: Record<string, string>) => {
  const route = getRoute(key)
  const pathParams = route.path.match(/:(\w+)/g)?.map((p) => p.slice(1)) || []

  // Check that all required path params are provided
  const missingParams = pathParams.filter((param) => !(param in params))
  if (missingParams.length > 0) {
    throw new Error(
      `Missing required path parameters for route ${key}: ${missingParams.join(
        ', ',
      )}`,
    )
  }

  // Check that only valid params are provided
  const invalidParams = Object.keys(params).filter(
    (param) => !pathParams.includes(param),
  )
  if (invalidParams.length > 0) {
    throw new Error(
      `Invalid path parameters for route ${key}: ${invalidParams.join(', ')}`,
    )
  }

  return route.path.replace(/:(\w+)/g, (_, p1) => params[p1])
}
