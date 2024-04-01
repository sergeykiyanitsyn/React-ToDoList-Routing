import styles from './Button.module.css'
import PropTypes from 'prop-types'

export const ButtonUpdate = ({ updFlag, setUpdFlag }) => {
  const updateTask = () => {
    setUpdFlag(true)
  }

  return (
    <>
      <button disabled={updFlag} onClick={updateTask} className={styles.button}>
        Изменить
      </button>
      {updFlag && (
        <button className={styles.button} onClick={() => setUpdFlag(false)}>
          Отменить
        </button>
      )}
    </>
  )
}

ButtonUpdate.propTypes = {
  updFlag: PropTypes.bool,
  setUpdFlag: PropTypes.any,
}
