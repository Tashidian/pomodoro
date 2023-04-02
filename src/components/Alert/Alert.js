import React, { useEffect, useState } from 'react'
import './alert.css'

function Alert(props) {
  const { message, close = () => {} } = props

  const [isClosed, setIsClosed] = useState(true)

  useEffect(() => {
    setIsClosed(false)
  }, [])

  const closeClick = () => {
    setIsClosed(true)
    close()
  }

  return (
    <div className={isClosed ? 'alert alert--closed' : 'alert'} onClick={closeClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" className="alert__close" onClick={closeClick}>
        <use xlinkHref="svg/sprite.svg#close" />
      </svg>
      <div className="alert__content">
        <p className="h3">{message}</p>
      </div>
    </div>
  )
}

export default Alert