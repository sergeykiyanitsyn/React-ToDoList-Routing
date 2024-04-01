import { useEffect, useState } from 'react'
import styles from './MainPage.module.css'
import PropTypes from 'prop-types'
import { Searcher } from '../Seracher'
import { Sorting } from '../Sorting'
import { Form } from '../Form'
import { Tasks } from '../Task'

export const MainPage = ({ tasks, isLoading, refreshTasks, setIsLoading, setTasks }) => {
  const [addFlag, setAddFlag] = useState(false)
  const [initialInputValue, setInitialInputValue] = useState('')
  const [sortOn, setSortOn] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetch('http://localhost:3005/tasks')
      .then((loadedData) => loadedData.json())
      .then((serverTasks) => setTasks(serverTasks))
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.taskHeaders}> Лист задач </div>
        <div className={styles.flexButtons}>
          <button
            disabled={addFlag}
            onClick={() => setAddFlag(true)}
            className={styles.button}
          >
            Добавить
          </button>
          {addFlag && (
            <button className={styles.button} onClick={() => setAddFlag(false)}>
              Отменить
            </button>
          )}
        </div>
        {addFlag && <Form setAddFlag={setAddFlag} refreshTasks={refreshTasks} />}
        <div className={styles.addFunctional}>
          <Searcher
            initialInputValue={initialInputValue}
            setInitialInputValue={setInitialInputValue}
          />
          <Sorting sortOn={sortOn} setSortOn={setSortOn} />
        </div>
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          <Tasks tasks={tasks} initialInputValue={initialInputValue} sortOn={sortOn} />
        )}
      </div>
    </>
  )
}

MainPage.propTypes = {
  refreshTasks: PropTypes.func,
  setTasks: PropTypes.any,
  setIsLoading: PropTypes.any,
  isLoading: PropTypes.bool,
  tasks: PropTypes.array,
}
