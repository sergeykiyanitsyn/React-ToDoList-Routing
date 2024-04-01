/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Button.module.css'
import PropTypes from 'prop-types'

export const ButtonDelete = ({ refreshTasks, urlId }) => {
  const [isDeliting, setIsDeliting] = useState(false)

  const nagigate = useNavigate()

  const deleteTask = () => {
    setIsDeliting(true)
    fetch(`http://localhost:3005/tasks/${urlId}`, {
      method: 'DELETE',
    })
      .then(() => {
        refreshTasks()
        nagigate('/')
      })
      .finally(() => {
        setIsDeliting(false)
      })
  }

  return (
    <button disabled={isDeliting} onClick={deleteTask} className={styles.button}>
      Удалить
    </button>
  )
}

ButtonDelete.propTypes = {
  refreshTasks: PropTypes.func,
  urlId: PropTypes.string,
}
