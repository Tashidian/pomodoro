import Button from '../Button/Button'
import './counter.css'

function Counter() {
  const startButtonClick = () => {
    console.log('START')
  }

  const resetButtonClick = () => {
    console.log('RESET')
  }

  return (
    <div className="container">
      <div className="counter">
        <div className="counter__clock">00:00</div>

        <div className="counter__buttons">
          <Button type="button" typeAtt="button" css="btn--primary btn--pomodoro" onclick={startButtonClick}>Start</Button>
          <Button type="button" typeAtt="button" css="btn--secondary" onclick={resetButtonClick}>Reset</Button>
        </div>
      </div>
    </div>
  )
}

export default Counter
