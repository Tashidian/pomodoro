import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import './alert.css'

function Alert(props) {
  const { message, sound = false, close = () => { } } = props

  const [isClosed, setIsClosed] = useState(true)
  const closeButton = useRef(null)

  useEffect(() => {
    setIsClosed(false)
    closeButton.current.focus()
  }, [])

  useEffect(() => {
    if (isClosed) { 
      setIsClosed(false)
      closeButton.current.focus()
    }
  }, [message])

  const closeClick = useCallback(() => {
    closeButton.current.blur()
    setIsClosed(true)
    close()
  }, [close])

  return (
    <div className={isClosed ? 'alert alert--closed' : 'alert'} onClick={closeClick}>
      <Button type={'button'} css={'alert__close'} onClick={closeClick} ref={closeButton} >
        <Icon id="close" width="50" height="50" css="alert__close__icon" />
      </Button>
      <div className="alert__content">
        <p className="h3">{message}</p>
      </div>
      {sound &&
        <audio autoPlay={true} key={message}>
          <source src="sound/strange-notification.mp3" type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      }
    </div>
  )
}

export default Alert