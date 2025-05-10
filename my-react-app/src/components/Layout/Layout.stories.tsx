import React, { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Layout } from './Layout'
import { layoutFixtures } from './fixtures'
import { BrowserRouter } from 'react-router-dom'

// Define props interface
interface LayoutProps {
  navBar?: ReactNode
  children?: ReactNode
}

// Create a wrapper to provide the Router context
const LayoutWithRouter = ({ children, ...props }: LayoutProps) => (
  <BrowserRouter>
    <Layout {...props}>{children}</Layout>
  </BrowserRouter>
)

const meta = {
  title: 'Components/Layout',
  component: LayoutWithRouter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LayoutWithRouter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: layoutFixtures.content.default,
  },
}

export const WithNavBar: Story = {
  args: {
    navBar: layoutFixtures.navBar,
    children: layoutFixtures.content.withNavBar,
  },
}

export const WithLongContent: Story = {
  args: {
    children: layoutFixtures.content.longContent,
  },
}
