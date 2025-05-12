import { useEffect, useState } from 'react'

export const useTimer = () => {
  const [isResting, setIsResting] = useState(false)
  const [duration, setDuration] = useState(0)
  const [restDuration, setRestDuration] = useState(0)

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isResting) {
        setDuration((prev) => prev + 1)
      } else {
        setRestDuration((prev) => prev + 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isResting])

  const toggleResting = () => {
    setIsResting(!isResting)
  }

  const resetTimers = () => {
    setDuration(0)
    setRestDuration(0)
  }

  const getLogDataFromTimers = () => {
    return {
      duration,
      restDuration,
    }
  }

  return {
    isResting,
    duration,
    restDuration,
    toggleResting,
    resetTimers,
    getLogDataFromTimers,
  }
}
