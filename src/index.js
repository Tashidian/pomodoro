import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/reset.css'
import './assets/css/base.css'
import Pomodoro from './components/Pomodoro/Pomodoro'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Pomodoro />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
