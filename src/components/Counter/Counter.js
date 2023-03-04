import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import './counter.css'

function Counter( props ) {

  const {workMinutes, restMinutes, pomTimes, pomRestMinutes} = props

  const [clockState, setClockState] = useState(0)

  const [clockMinutes, setClockMinutes] = useState(workMinutes)
  const [clockSeconds, setClockSeconds] = useState(0)

  const startButtonClick = () => {
    setClockState(1)
  }

  useEffect(() => {
    let intervalo = 0
    if(clockState === 1) {
      intervalo = setInterval( () => {
        if ( clockSeconds === 0 ) {
          if( clockMinutes === 0 ) {
            alert('tiempo!')
            clearInterval(intervalo)
          } else {
            setClockMinutes(clockMinutes - 1)
            setClockSeconds(59)
          }
        } else {
          setClockSeconds(clockSeconds - 1)
        }
      }, 1000)
    }
    return () => {
      clearInterval(intervalo)
    }
  })

  const resetButtonClick = () => {
    setClockMinutes(workMinutes)
    setClockSeconds(0)
    setClockState(0)
  }

  return (
    <div className="container">
      <div className="counter">
        <div className="counter__clock">
          <span className="counter__clock__minutes">
            {(clockMinutes < 10) && 0}{clockMinutes}
          </span>:
          <span className="counter__clock__seconds">
            {(clockSeconds < 10) && 0}{clockSeconds}
            </span>
          </div>

        <div className="counter__buttons">
          <Button type="button" typeAtt="button" css="btn--primary btn--pomodoro" onclick={startButtonClick}>Start</Button>
          <Button type="button" typeAtt="button" css="btn--secondary" onclick={resetButtonClick}>Reset</Button>
        </div>
      </div>
    </div>
  )
}

export default Counter
