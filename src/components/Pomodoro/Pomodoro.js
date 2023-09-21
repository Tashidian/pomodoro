import { useState } from 'react'
import Counter from '../Counter/Counter'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './pomodoro.css'

function Pomodoro() {
  const [counterOptions, setCounterOptions] = useState({workMinutes: 25, shortBreakMinutes: 5, longBreakMinutes: 25, pomTimes: 4})

  return (
    <div className="pomodoro">
      <Header />

      <main className="main">
        <Counter workMinutes={counterOptions.workMinutes} shortBreakMinutes={counterOptions.shortBreakMinutes} longBreakMinutes={counterOptions.longBreakMinutes} pomTimes={counterOptions.pomTimes} />
      </main>

      <Footer />
    </div>
  )
}

export default Pomodoro
