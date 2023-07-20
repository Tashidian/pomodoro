import { forwardRef } from "react"
import './button.css'

const Button = forwardRef(function Button(props, ref) {
  const { type, css, link, onclick, typeAtt, target, children } = props
  return (
    <>
      {(type === 'button') &&
        <button type={typeAtt} className={'btn ' + css} onClick={onclick} ref={ref}>{children}</button>
      }
      {(type === 'link') &&
        <a href={link} className={'btn ' + css} target={target} ref={ref}>{children}</a>
      }
    </>
  )
})

export default Button