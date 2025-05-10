import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StartPage } from './pages/StartPage/StartPage'
import { WorkoutPage } from './pages/WorkoutPage/WorkoutPage'
import { ExercisePage } from './pages/ExercisePage/ExercisePage'
import { WorkoutCompletePage } from './pages/WorkoutPage/WorkoutCompletePage/WorkoutCompletePage'
import { LogsPage } from './pages/LogsPage'
import { WorkoutLogsPage } from './pages/WorkoutLogsPage'
import { Layout } from './components/Layout'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<StartPage />} />
          <Route path="/workout/:name" element={<WorkoutPage />} />
          <Route path="/exercise/:workoutName" element={<ExercisePage />} />
          <Route
            path="/workout/:workoutName/complete"
            element={<WorkoutCompletePage />}
          />
          <Route path="/logs/calendar" element={<LogsPage />} />
          <Route path="/logs/workouts" element={<WorkoutLogsPage />} />
          <Route
            path="/logs/workouts/:workoutName"
            element={<WorkoutLogsPage />}
          />
          <Route
            path="/logs/workouts/:workoutName/:exerciseName"
            element={<WorkoutLogsPage />}
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
