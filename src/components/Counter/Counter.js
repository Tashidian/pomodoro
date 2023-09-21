import useTimer from '../../hooks/useTimer'
import Alert from '../Alert/Alert'
import Button from '../Button/Button'
import History from '../History/History'
import HistoryList from '../HistoryList/HistoryList'
import HistoryItem from '../HistoryItem/HistoryItem'
import Icon from '../Icon/Icon'
import './counter.css'
import { useEffect, useState } from 'react'

function Counter(props) {

  const { workMinutes, shortBreakMinutes, longBreakMinutes, pomTimes } = props
  const { clockMinutes, clockSeconds, pomState, startPauseTimer, resetTimer, timerMessage, pomHistory } = useTimer(workMinutes, shortBreakMinutes, longBreakMinutes, pomTimes)

  const [sortedHistory, setSortedHistory] = useState([])

  useEffect(() => {
    setSortedHistory(
      pomHistory.reduce((acc, item, index) => {
        if (index % (pomTimes * 2) === 0) {
          acc.push([item])
        } else {
          acc[acc.length - 1].push(item)
        }
        return acc
      }, [])
    )
  }, [pomHistory])

  return (
    <div className="container">
      <div className="counter">
        {timerMessage &&
          <Alert message={timerMessage} sound={true} />
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
          <Button type="button" typeAtt="button" css="btn--primary btn--pomodoro" onclick={startPauseTimer}>
            <Icon id={(pomState.isPaused || !pomState.isRunning) ? 'play' : 'pause'} width="50" height="50" />
          </Button>
          <Button type="button" typeAtt="button" css="btn--secondary" onclick={resetTimer}>
            <Icon id="stop" width="50" height="50" />
          </Button>
        </div>
      </div>
      
      {pomHistory.length > 0 &&
        <History>
          {sortedHistory.map((pomItem, pomIndex) => {
            return (
              <HistoryList key={pomIndex}>
                {
                  pomItem.map((item, index) => {
                    return (
                      <HistoryItem key={index} type={item === 1 ? 'work' : item === 2 ? 'short' : 'long'}></HistoryItem>
                    )
                  })
                }
              </HistoryList>
            )
          })}
        </History>
      }
    </div>
  )
}

export default Counter
