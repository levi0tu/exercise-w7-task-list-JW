const TaskForm = ({ newTodo, onNewTodoChange, onFormSubmit }) => {
  return (
    <form onSubmit={onFormSubmit}>
      <h1>📝 ToDo App</h1>
      <h2>Type you tasks here below 👇</h2>

      <label htmlFor="task-description">Task description</label>
      <textarea id="task-description"
        value={newTodo}
        onChange={onNewTodoChange}
        placeholder="Type a task.."
      />
      <button className="button" type="submit">Submit form!</button>
    </form>
  )
}

export default TaskForm
