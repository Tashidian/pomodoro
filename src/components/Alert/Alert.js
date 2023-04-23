import React, { useCallback, useEffect, useState } from 'react'
import Icon from '../Icon/Icon'
import './alert.css'

function Alert(props) {
  const { message, sound = false, close = () => { } } = props

  const [isClosed, setIsClosed] = useState(true)

  useEffect(() => {
    setIsClosed(false)
  }, [])

  const closeClick = useCallback(() => {
    setIsClosed(true)
    close()
  }, [close])

  return (
    <div className={isClosed ? 'alert alert--closed' : 'alert'} onClick={closeClick}>
      <Icon id="close" width="50" height="50" css="alert__close" onClick={closeClick} />
      <div className="alert__content">
        <p className="h3">{message}</p>
      </div>
      {sound &&
        <audio autoPlay={true}>
          <source src="sound/strange-notification.mp3" type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      }
    </div>
  )
}

export default Alert