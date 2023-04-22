import './header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <img src="logo.svg" alt="Pomodoro logo" className="header__logo" />
        <h1 className="h1">Pomodoro</h1>
      </div>
    </header>
  )
}

export default Header
