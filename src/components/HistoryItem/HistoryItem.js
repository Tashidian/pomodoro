import './history-item.css'

function HistoryItem(props) {
  const { type } = props
  
  return (
    <li className={'history-item history-item--' + type}></li>
  )
}

export default HistoryItem