import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import NavBar from './components/NavBar'
import { routes } from './routes'
import './App.css'
import { AppProvider } from './contexts/AppContext'

function App() {
  // Split routes into those that need navbar and those that don't
  const routesWithNavBar = routes.filter((route) => route.meta.showInNav)
  const routesWithoutNavBar = routes.filter((route) => !route.meta.showInNav)

  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Routes with navbar */}
          <Route
            element={<Layout navBar={<NavBar routes={routesWithNavBar} />} />}
          >
            {routesWithNavBar.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          {/* Routes without navbar */}
          <Route element={<Layout />}>
            {routesWithoutNavBar.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
