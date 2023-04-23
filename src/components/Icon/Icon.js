// import './button.css'

function Icon(props) {
  const { id, width, height, css = '', onClick = () => {} } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={css} onClick={onClick}>
      <use xlinkHref={`svg/sprite.svg#${id}`} />
    </svg>
  )
}

export default Icon