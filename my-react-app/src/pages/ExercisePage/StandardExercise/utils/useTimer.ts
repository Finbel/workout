import { useEffect, useState } from 'react'

export const useTimer = () => {
  const [isResting, setIsResting] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [restTimer, setRestTimer] = useState(0)

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isResting) {
        setElapsedTime((prev) => prev + 1)
      } else {
        setRestTimer((prev) => prev + 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isResting])

  const toggleResting = () => {
    setIsResting(!isResting)
  }

  const resetTimers = () => {
    setElapsedTime(0)
    setRestTimer(0)
  }

  return { isResting, elapsedTime, restTimer, toggleResting, resetTimers }
}
