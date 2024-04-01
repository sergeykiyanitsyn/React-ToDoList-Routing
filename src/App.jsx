import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { TaskPage, MainPage, Page404 } from './components'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const refreshTasks = () => {
    setIsLoading(true)

    fetch('http://localhost:3005/tasks')
      .then((loadedData) => loadedData.json())
      .then((serverTasks) => {
        setTasks(serverTasks)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            tasks={tasks}
            setTasks={setTasks}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            refreshTasks={refreshTasks}
          />
        }
      />
      <Route path="/tasks/:id" element={<TaskPage refreshTasks={refreshTasks} />}></Route>
      <Route path="*" element={<Navigate to="/404" />}></Route>
      <Route path="/404" element={<Page404 />}></Route>
    </Routes>
  )
}

export default App
