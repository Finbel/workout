import React from 'react'
import { Typography } from '@mui/material'

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

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
