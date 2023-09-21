import './history-list.css'

const HistoryList = (props) => {

  return (
    <ul className="history-list">
      {props.children}
    </ul>
  )
}

export default HistoryList