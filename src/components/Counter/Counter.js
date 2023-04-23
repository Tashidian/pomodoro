import { useCallback, useEffect, useState } from 'react'
import Alert from '../Alert/Alert'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import './counter.css'

function Counter(props) {

  const { workMinutes, shortBreakMinutes, longBreakMinutes, pomTimes } = props

  // pomHistory values
  // 0 - inactive
  // 1 - work time
  // 2 - short break
  // 3 - long break

  const [clockMinutes, setClockMinutes] = useState(workMinutes)
  const [clockSeconds, setClockSeconds] = useState(0)
  const [pomState, setPomState] = useState({ isRuning: false, isPaused: false, statusText: 'WORK' })
  const [pomHistory, setPomHistory] = useState([])
  const [alertMessage, setAlertMessage] = useState(null)

  const startPauseButtonClick = useCallback(() => {
    if (!pomState.isRuning) {
      setPomState({ ...pomState, isRuning: true, isPaused: false })

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
      setPomState({ ...pomState, isRuning: false, isPaused: true })
    }
  }, [pomState, pomHistory, pomTimes])

  const resetButtonClick = useCallback(() => {
    setClockMinutes(workMinutes)
    setClockSeconds(0)
    setPomState({ isRuning: false, isPaused: false, statusText: 'WORK' })
    setPomHistory([])
  }, [workMinutes])

  useEffect(() => {
    let counterInterval = 0
    if (pomState.isRuning) {
      counterInterval = setInterval(() => {
        if (clockSeconds === 0) {
          if (clockMinutes === 0) {
            clearInterval(counterInterval)

            if (pomHistory[pomHistory.length - 1] === 1) {
              if (((pomHistory.length + 1) / 2) % pomTimes === 0) {
                setClockMinutes(longBreakMinutes)
                setAlertMessage('Tiempo! Toca descanso largo')
                setPomState({ statusText: 'LONG BREAK', isRuning: false })
              } else {
                setClockMinutes(shortBreakMinutes)
                setAlertMessage('Tiempo! Toca descanso corto')
                setPomState({ statusText: 'SHORT BREAK', isRuning: false })
              }
            }
            if (pomHistory[pomHistory.length - 1] === 2 || pomHistory[pomHistory.length - 1] === 3) {
              setClockMinutes(workMinutes)
              setAlertMessage('Tiempo! Toca trabajar')
              setPomState({ statusText: 'WORK', isRuning: false })
            }
          } else {
            alertMessage && setAlertMessage(null)
            setClockMinutes(clockMinutes - 1)
            setClockSeconds(59)
          }
        } else {
          setClockSeconds(clockSeconds - 1)
        }
      }, 1000)
    }
    return () => {
      clearInterval(counterInterval)
    }
  })

  return (
    <div className="container">
      <div className="counter">
        {alertMessage &&
          <Alert message={alertMessage} sound={true} />
        }
        <div className="counter__stage">
          <span className="h2">{pomState.statusText}</span>
        </div>
        <div className="counter__clock">
          <span className="counter__clock__minutes">
            {(clockMinutes < 10) && 0}{clockMinutes}
          </span>:
          <span className="counter__clock__seconds">
            {(clockSeconds < 10) && 0}{clockSeconds}
          </span>
        </div>

        <div className="counter__buttons">
          <Button type="button" typeAtt="button" css="btn--primary btn--pomodoro" onclick={startPauseButtonClick}>
            <Icon id={(pomState.isPaused || !pomState.isRuning) ? 'play' : 'pause'} width="50" height="50" />
          </Button>
          <Button type="button" typeAtt="button" css="btn--secondary" onclick={resetButtonClick}>
            <Icon id="stop" width="50" height="50" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Counter
