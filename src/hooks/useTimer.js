import { useState, useEffect, useCallback } from 'react'


// pomHistory values
// 0 - inactive
// 1 - work time
// 2 - short break
// 3 - long break

const useTimer = (workMinutes, shortBreakMinutes, longBreakMinutes, pomTimes) => {
  const [clockMinutes, setClockMinutes] = useState(workMinutes)
  const [clockSeconds, setClockSeconds] = useState(0)
  const [pomState, setPomState] = useState({ isRunning: false, isPaused: false, statusText: 'WORK' })
  const [pomHistory, setPomHistory] = useState([])
  const [timerMessage, setTimerMessage] = useState(null)

  const startPauseTimer = useCallback(() => {
    if (!pomState.isRunning) {
      setPomState({ ...pomState, isRunning: true, isPaused: false })

      if (!pomState.isPaused) {
        if (pomHistory.length > 0) {
          if (pomHistory[pomHistory.length - 1] === 1) {
            (((pomHistory.length + 1) / 2) % pomTimes === 0) ? setPomHistory([...pomHistory, 3]) : setPomHistory([...pomHistory, 2])
          }
          if (pomHistory[pomHistory.length - 1] === 2 || pomHistory[pomHistory.length - 1] === 3) {
            setPomHistory([...pomHistory, 1])
          }
        } else {
          setPomHistory([1])
        }
      }
    } else {
      setPomState({ ...pomState, isRunning: false, isPaused: true })
    }
  }, [pomState, pomHistory, pomTimes])

  const resetTimer = useCallback(() => {
    setClockMinutes(workMinutes)
    setClockSeconds(0)
    setPomState({ isRunning: false, isPaused: false, statusText: 'WORK' })
    setPomHistory([])
    setTimerMessage(null)
  }, [workMinutes])

  useEffect(() => {
    let timerInterval
    if (pomState.isRunning) {
      timerInterval = setInterval(() => {
        if (clockSeconds === 0) {
          if (clockMinutes === 0) {
            clearInterval(timerInterval)
            if (pomHistory[pomHistory.length - 1] === 1) {
              if (((pomHistory.length + 1) / 2) % pomTimes === 0) {
                setClockMinutes(longBreakMinutes)
                setTimerMessage('Tiempo! Toca descanso largo')
                
                setPomState({ statusText: 'LONG BREAK', isRuning: false })
              } else {
                setClockMinutes(shortBreakMinutes)
                setTimerMessage('Tiempo! Toca descanso corto')
                setPomState({ statusText: 'SHORT BREAK', isRuning: false })
              }
            }
            if (pomHistory[pomHistory.length - 1] === 2 || pomHistory[pomHistory.length - 1] === 3) {
              setClockMinutes(workMinutes)
              setTimerMessage('Tiempo! Toca trabajar')
              setPomState({ statusText: 'WORK', isRuning: false })
            }
          } else {
            setClockMinutes(clockMinutes - 1)
            setClockSeconds(59)
          }
        } else {
          setClockSeconds(clockSeconds - 1)
        }
      }, 100)
    }
    return () => {
      clearInterval(timerInterval)
    }
  }, [pomState, clockMinutes, clockSeconds, pomHistory, pomTimes, workMinutes, shortBreakMinutes, longBreakMinutes, timerMessage])

  return { clockMinutes, clockSeconds, pomState, pomHistory, startPauseTimer, resetTimer, timerMessage }
}

export default useTimer
