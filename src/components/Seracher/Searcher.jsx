import styles from './Searcher.module.css'
import PropTypes from 'prop-types'
import { useState } from 'react'

export const Searcher = ({ initialInputValue, setInitialInputValue }) => {
  const [inputText, setInputText] = useState(initialInputValue)

  const onChangeFinder = ({ target }) => {
    if (!target.value) {
      setInitialInputValue(target.value.trim())
    }
    setInputText(target.value.trim())
  }

  const findTasks = (event) => {
    event.preventDefault()
    const sendText = event.target[0].value
    setInitialInputValue(sendText)
  }

  return (
    <form className={styles.search} onSubmit={findTasks}>
      <input
        className={styles.searchString}
        type="text"
        value={inputText}
        placeholder="Поиск задачи по описанию"
        onChange={onChangeFinder}
      />
    </form>
  )
}

Searcher.propTypes = {
  initialInputValue: PropTypes.any,
  setInitialInputValue: PropTypes.any,
}
