import { useEffect, useState } from "react"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"

// define the setting state functions
export const Tasks = () => {
  const [taskList, setTaskList] = useState([])
  const [loading, setLoading] = useState(false)
  const [newTodo, setNewTodo] = useState("")

  // fetch tasks from API and store them in a local state
  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://task-api-m07f.onrender.com/tasks")
      const data = await response.json()
      setTaskList(data)
    } catch (error) {
      console.error("Could not create task:", error)
    } finally {
      setLoading(false)
    }
  }


  // set a  new ToDo from the value of the textarea defined in the TaskForm component
  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value)
  }
  // submit a new task to API, then refresh task list
  const onFormSubmit = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    setLoading(true)
    try {
      await fetch("https://task-api-m07f.onrender.com/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newTodo.trim() })
      })
      setNewTodo("")
      await fetchTasks()
    } catch (error) {
      console.error("Could not fetch tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="wrapper">
      <TaskForm
        newTodo={newTodo}
        onNewTodoChange={handleNewTodoChange}
        onFormSubmit={onFormSubmit}
      />
      <TaskList
        loading={loading}
        taskList={taskList}
        setTaskList={setTaskList}
      />
    </div>
  )
}
