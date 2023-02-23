import Counter from '../Counter/Counter'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './pomodoro.css'

function Pomodoro() {
  return (
    <div className="pomodoro">
      <Header />

      <main className="main">
        <Counter />
      </main>

      <Footer />
    </div>
  )
}

export default Pomodoro
