import React from 'react'
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
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

export const Layout: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}
