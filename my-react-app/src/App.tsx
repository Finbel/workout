import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
} from '@mui/material'
import { StartPage } from './pages/StartPage/StartPage'
import { WorkoutPage } from './pages/WorkoutPage/WorkoutPage'
import { ExercisePage } from './pages/ExercisePage/ExercisePage'
import { WorkoutCompletePage } from './pages/WorkoutPage/WorkoutCompletePage/WorkoutCompletePage'
import { LogsPage } from './pages/LogsPage'
import './App.css'

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Router>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/workout/:name" element={<WorkoutPage />} />
            <Route path="/exercise/:workoutName" element={<ExercisePage />} />
            <Route
              path="/workout/:workoutName/complete"
              element={<WorkoutCompletePage />}
            />
            <Route path="/logs" element={<LogsPage />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App
