import React, { ReactNode } from 'react'
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
} from '@mui/material'
import { Outlet } from 'react-router-dom'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Blue
    },
    secondary: {
      main: '#4caf50', // Green
    },
  },
})

interface LayoutProps {
  navBar?: ReactNode
  children?: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ navBar, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* NavBar is rendered outside any container for full width */}
      {navBar && <Box sx={{ width: '100%' }}>{navBar}</Box>}
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {/* Render children if provided, otherwise render Outlet for React Router */}
        {children || <Outlet />}
      </Container>
    </ThemeProvider>
  )
}
