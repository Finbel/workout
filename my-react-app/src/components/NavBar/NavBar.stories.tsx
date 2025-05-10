import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import NavBar from './NavBar'
import { navbarFixtures } from './fixtures'
import { BrowserRouter } from 'react-router-dom'
import { RouteConfig } from '../../routes'

// Define props interface
interface NavBarProps {
  routes: RouteConfig[]
}

// Create a wrapper to provide the Router context that NavBar needs
const NavBarWithRouter = (props: NavBarProps) => (
  <BrowserRouter>
    <NavBar {...props} />
  </BrowserRouter>
)

const meta = {
  title: 'Components/NavBar',
  component: NavBarWithRouter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ margin: '0', padding: '0', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavBarWithRouter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    routes: navbarFixtures.routes,
  },
}

// NavBar with fewer items
export const MinimalNavBar: Story = {
  args: {
    routes: navbarFixtures.routes.slice(0, 2), // Only first two navigation items
  },
}
