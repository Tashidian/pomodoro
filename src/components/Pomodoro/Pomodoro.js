import { useState } from 'react'
import Counter from '../Counter/Counter'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './pomodoro.css'

function Pomodoro() {
  const [counterOptions, setCounterOptions] = useState({workMinutes: 25, restMinutes: 5, pomTimes: 4, pomRestMinutes: 30})

  return (
    <div className="pomodoro">
      <Header />

      <main className="main">
        <Counter workMinutes={counterOptions.workMinutes} restMinutes={counterOptions.restMinutes} pomTimes={counterOptions.pomTimes} pomRestMinutes={counterOptions.pomRestMinutes} />
      </main>

      <Footer />
    </div>
  )
}

export default Pomodoro
