import styles from './Task.module.css'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const isEmpty = ''

export const Tasks = ({ tasks, initialInputValue, sortOn }) => {
  let newTasks = [...tasks]
  let shortTasks = []
  const widthPXSymbolInString = 10
  const widthContainer = 192
  const widthSymbolContainer = widthContainer / widthPXSymbolInString

  if (sortOn === true) {
    newTasks.sort((a, b) => a.title.localeCompare(b.title))
  }
  const searchTasks = (tasks, searchWord) => {
    const foundTasks = []
    tasks.map((task) => {
      const foundTask = task.description.toUpperCase().search(searchWord.toUpperCase())
      if (foundTask !== -1) {
        foundTasks.push(task)
      }
    })
    console.log('foundTasks', foundTasks)
    newTasks = foundTasks
  }

  if (initialInputValue !== isEmpty) {
    searchTasks(newTasks, initialInputValue)
  }

  newTasks.map(({ description, id, title }) => {
    if (description.length > widthSymbolContainer) {
      const shortDescription = description.slice(0, widthSymbolContainer - 3) + '...'
      const shortText = { id, title, description: shortDescription }
      shortTasks.push(shortText)
    } else {
      shortTasks.push({ id, title, description })
    }
  })

  return (
    <>
      <div className={styles.flexDiv}>
        {shortTasks.length > 0 ? (
          shortTasks.map(({ id, title, description }) => {
            return (
              <NavLink key={id} to={`/tasks/${id}`} className={styles.note}>
                <div> {title} </div>
                <div> {description} </div>
              </NavLink>
            )
          })
        ) : (
          <div> Похоже, что таких задач еще нет. Самое время добавить их</div>
        )}
      </div>
    </>
  )
}

Tasks.propTypes = {
  tasks: PropTypes.array,
  initialInputValue: PropTypes.string,
  sortOn: PropTypes.bool,
}
