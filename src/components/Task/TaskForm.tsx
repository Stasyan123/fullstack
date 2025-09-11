import { useState } from 'react'

import { taskStatus } from "../../types/taskStatuses"
import taskStyle from './taskStyles.js'

const TaskForm = ({task, setEditMode, saveTask}) => {
  const [taskForm, setTaskForm] = useState({...task})

  return (
    <div>
      <div style={taskStyle.flexSpaceBetween}>
        <input type="text" value={taskForm.title} onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}/>
        
        <button onClick={() => setEditMode(false)}>X</button>
      </div>

      <div className="form-margin d-flex">
        <textarea name="description" style={{flex: 1}}
          onChange={(e) => setTaskForm({...taskForm, description: e.target.value})} value={taskForm.description} />
      </div>
          
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <select onChange={(e) => setTaskForm({...taskForm, status: e.target.value})} value={task.status}>

          {Object.entries(taskStatus).map(([key, value]) => (
            <option key={key} value={key}>{value.text}</option>
          ))}
        
        </select>

        <button onClick={() => saveTask(taskForm)}>Save</button>
      </div>
  </div>
  )
}

export default TaskForm