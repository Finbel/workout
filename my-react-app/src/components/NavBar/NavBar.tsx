import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import { RouteConfig } from '../../routes'

interface NavBarProps {
  routes: RouteConfig[]
}

const NavBar: React.FC<NavBarProps> = ({ routes }) => (
  <AppBar
    position="static"
    sx={{ width: '100vw', left: 0, marginLeft: 'calc(-50vw + 50%)' }}
  >
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Workout App
      </Typography>
      {routes.map((route) => (
        <Button
          key={route.key}
          color="inherit"
          component={RouterLink}
          to={route.path.split(':')[0].replace(/\/$/, '')} // Handle parameterized routes
        >
          {route.label}
        </Button>
      ))}
    </Toolbar>
  </AppBar>
)

export default NavBar
