import React from 'react'
import { StartPage } from './pages/StartPage/StartPage'
import { WorkoutPage } from './pages/WorkoutPage/WorkoutPage'
import { ExercisePage } from './pages/ExercisePage/ExercisePage'
import { WorkoutCompletePage } from './pages/WorkoutPage/WorkoutCompletePage/WorkoutCompletePage'
import { LogsPage } from './pages/LogsPage'
import { WorkoutLogsPage } from './pages/WorkoutLogsPage'

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
    key: 'WORKOUT_PAGE',
    path: '/workout/:name',
    label: 'Workouts',
    element: <WorkoutPage />,
    meta: {
      showInNav: true,
    },
  },
  {
    key: 'EXERCISE_PAGE',
    path: '/exercise/:workoutName',
    label: 'Exercise',
    element: <ExercisePage />,
    meta: {
      showInNav: false,
    },
  },
  {
    key: 'WORKOUT_COMPLETE_PAGE',
    path: '/workout/:workoutName/complete',
    label: 'Workout Complete',
    element: <WorkoutCompletePage />,
    meta: {
      showInNav: false,
    },
  },
  {
    key: 'LOGS_PAGE',
    path: '/logs/calendar',
    label: 'Logs',
    element: <LogsPage />,
    meta: {
      showInNav: true,
    },
  },
  {
    key: 'WORKOUT_LOGS_PAGE',
    path: '/logs/workouts',
    label: 'Workout Logs',
    element: <WorkoutLogsPage />,
    meta: {
      showInNav: false,
    },
  },
  {
    key: 'WORKOUT_LOGS_DETAIL_PAGE',
    path: '/logs/workouts/:workoutName',
    label: 'Workout Log Detail',
    element: <WorkoutLogsPage />,
    meta: {
      showInNav: false,
    },
  },
  {
    key: 'EXERCISE_LOGS_DETAIL_PAGE',
    path: '/logs/workouts/:workoutName/:exerciseName',
    label: 'Exercise Log Detail',
    element: <WorkoutLogsPage />,
    meta: {
      showInNav: false,
    },
  },
]

// Helper function to get routes for navigation
export const getNavRoutes = () => routes.filter((route) => route.meta.showInNav)
