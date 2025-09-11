import taskStyle from './Task/taskStyles.js'
import { taskStatus } from '../types/taskStatuses.js'

import '../styles/Task.css' 
import { useState } from 'react'
import TaskForm from './Task/TaskForm.js'

const AddTask = ({addTask}) => {
  const plusStyles = {
    fontWeight: "bold",
    fontSize: "3rem",
    color: "rgb(186 163 0)"
  }

  const [editMode, setEditMode] = useState(false)

  const task = {
    title: '',
    description: '',
    status: taskStatus.toDo.key
  }  

  const saveTask = (task) => {
      addTask(task)
      setEditMode(false)
  }

  if (editMode) {
      return <div style={taskStyle.taskStyle}>
        <TaskForm saveTask={saveTask} setEditMode={setEditMode} task={task} />
      </div> 
  }

  return (
    <div className='add-task' style={taskStyle.taskBase} onClick={() => setEditMode(true)}>
        <span style={plusStyles}>+</span>
    </div>
  )
}

export default AddTask