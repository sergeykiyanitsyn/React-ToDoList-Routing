import { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import styles from './TaskPage.module.css'
import PropTypes from 'prop-types'
import { ButtonUpdate, ButtonDelete } from '../Buttons'

export const TaskPage = ({ refreshTasks }) => {
  const [updFlag, setUpdFlag] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isDirtyTitle, setIsDirtyTitle] = useState(false)
  const [isDirtyDescription, setIsDirtyDescription] = useState(false)
  const urlParams = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3005/tasks/${urlParams.id}`)
      const data = await response.json()
      setTitle(data.title)
      setDescription(data.description)
    }

    fetchData()
  }, [urlParams.id])

  const saveTask = () => {
    if (isDirtyTitle || isDirtyDescription) {
      fetch(`http://localhost:3005/tasks/${urlParams.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;chapset=utf-8' },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      })
        .then(() => {
          refreshTasks()
        })
        .finally(() => {
          setUpdFlag(false)
        })
    } else {
      setIsDirtyTitle(false)
      setIsDirtyDescription(false)
      setUpdFlag(false)
    }
  }

  const changeValueTitle = ({ target }) => {
    if (!isDirtyTitle) {
      setIsDirtyTitle(true)
    }
    setTitle(target.value)
  }

  const changeValueDescription = ({ target }) => {
    if (!isDirtyDescription) {
      setIsDirtyDescription(true)
    }
    setDescription(target.value)
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <NavLink to={-1} className={styles.back}>
          <i className="bi bi-skip-backward"></i> Назад
        </NavLink>
        <div className={styles.container}>
          <div className={styles.content}>
            <h2>
              {`Task № ${urlParams.id}`} <br />
              {updFlag ? (
                <span>
                  Name: <input type="text" value={title} onChange={changeValueTitle} />
                </span>
              ) : (
                <span>{`Name: ${title}`}</span>
              )}
            </h2>
            {updFlag ? (
              <p>
                <input
                  type="text"
                  value={description}
                  onChange={changeValueDescription}
                />
              </p>
            ) : (
              <p>{`${description}`}</p>
            )}
          </div>
        </div>
        <div className={styles.flexButtons}>
          <ButtonUpdate updFlag={updFlag} setUpdFlag={setUpdFlag}></ButtonUpdate>
          {updFlag ? (
            <button className={styles.button} onClick={saveTask}>
              {' '}
              Сохранить{' '}
            </button>
          ) : (
            <ButtonDelete urlId={urlParams.id} refreshTasks={refreshTasks}></ButtonDelete>
          )}
        </div>
      </div>
    </>
  )
}

TaskPage.propTypes = {
  refreshTasks: PropTypes.func,
}
