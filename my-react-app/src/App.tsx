import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import NavBar from './components/NavBar'
import { routes, getNavRoutes } from './routes'
import './App.css'

function App() {
  const navRoutes = getNavRoutes()

  // Split routes into those that need navbar and those that don't
  const routesWithNavBar = routes.filter((route) => route.meta.showInNav)
  const routesWithoutNavBar = routes.filter((route) => !route.meta.showInNav)

  return (
    <Router>
      <Routes>
        {/* Routes with navbar */}
        <Route element={<Layout navBar={<NavBar routes={navRoutes} />} />}>
          {routesWithNavBar.map((route) => (
            <Route key={route.key} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Routes without navbar */}
        <Route element={<Layout />}>
          {routesWithoutNavBar.map((route) => (
            <Route key={route.key} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
