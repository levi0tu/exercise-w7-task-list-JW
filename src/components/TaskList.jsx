import { format } from "date-fns"

const TaskList = ({ loading, taskList, setTaskList }) => {
  if (loading) {
    return <h1>Loading in progress...</h1>
  }

  const onTaskCheckChange = async (task) => {
    // Make a POST request here with the updated task isChecked value

    /* 
    update a state object
    
    updatedTask is a new object that is the same as the task object except for the isChecked property, 
    which is toggled from true to false or from false to true. 
    This code is often used to update a property of an object while preserving the rest of its properties. */

    /*     pass the updatedTask to the headers of your POST request

    headers: { updatedTask, "Content-Type": "application/json" }
    */

    const updatedTask = { ...task, isChecked: !task.isChecked }

    try {
      await fetch(`https://task-api-m07f.onrender.com/tasks/${task._id}/check`, {
        method: "POST"
      })

      /*    Update the task list in the state
      Use .map to update the specific task if found, otherwise return it unchanged
  */
      setTaskList((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t)))
    } catch (error) {
      console.error("Could not update task:", error)
    }
  }
  return (
    <section className="tasks">
      {[...taskList]
        .sort((a, b) => b.date - a.date) //nyaste inlägget först
        .slice(0, 10) //Visa bara de senaste 10
        .map((task) => (
          <div key={task._id} className="task">
            <input
              onChange={() => onTaskCheckChange(task)}
              type="checkbox"
              checked={task.isChecked}
            />
            <h4>{task.description}</h4>
            <p>{format(new Date(task.date), "yyyy-MM-dd HH:mm")}</p>
          </div>
        )
        )}
    </section>
  )
}

export default TaskList
