import './button.css'

function Button(props) {
  const { type, css, link, onclick, typeAtt, target, children } = props
  return (
    <>
      {(type === 'button') &&
        <button type={typeAtt} className={'btn ' + css} onClick={onclick}>{children}</button>
      }
      {(type === 'link') &&
        <a href={link} className={'btn ' + css} target={target}>{children}</a>
      }
    </>
  )
}

export default Button