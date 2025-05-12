import React from 'react'
import { RouteConfig } from '../../routes'

export const navbarFixtures = {
  routes: [
    {
      key: 'HOME',
      path: '/',
      label: 'Home',
      element: React.createElement('div', null, 'Home'),
      meta: {
        showInNav: true,
      },
    },
    {
      key: 'WORKOUTS',
      path: '/workout',
      label: 'Workouts',
      element: React.createElement('div', null, 'Workouts'),
      meta: {
        showInNav: true,
      },
    },
    {
      key: 'LOGS',
      path: '/logs/calendar',
      label: 'Logs',
      element: React.createElement('div', null, 'Logs'),
      meta: {
        showInNav: true,
      },
    },
  ] as RouteConfig[],
}
