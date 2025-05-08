import React from 'react'
import { Typography } from '@mui/material'
import { formatTime } from '../utils/formatTime'

interface TimerProps {
  elapsedTime: number
  isResting: boolean
  restTimer: number
}

export const Timer = ({ elapsedTime, isResting, restTimer }: TimerProps) => {
  return (
    <>
      {isResting ? (
        <Typography variant="h6" color="primary" gutterBottom>
          Rest Time: {formatTime(restTimer)}
        </Typography>
      ) : (
        <Typography variant="h6" gutterBottom>
          Timer: {formatTime(elapsedTime)}
        </Typography>
      )}
    </>
  )
}
