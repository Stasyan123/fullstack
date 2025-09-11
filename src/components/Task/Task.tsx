import { useState } from "react"
import { taskStatus } from "../../types/taskStatuses"
import taskStyle from './taskStyles.js'
import TaskForm from "./TaskForm.js"

const Task = ({task, updateTask}) => {
  const completeStyle = task.status === taskStatus.finished.key ? {textDecorationLine: "line-through"} : {}
   
  //JS part
  const [editMode, setEditMode] = useState(false)

  const markCompleted = () => {
      let newTask = {...task, status: taskStatus.finished.key}

      if (task.status === taskStatus.finished.key) {
        newTask.status = taskStatus.toDo.key
      } else {
         newTask.status = taskStatus.finished.key
      }
      
      updateTask(newTask)
  }

  const saveTask = (taskForm) => {
      updateTask({...taskForm})
      setEditMode(false)
  }

  return (
    <div style={taskStyle.taskStyle}>
        {editMode ?
          <TaskForm saveTask={saveTask} setEditMode={setEditMode} task={task} />
          :
          <div>
            <div style={taskStyle.flexSpaceBetween}>
              <div style={taskStyle.flexGap10}>
                <input type="checkbox" onChange={markCompleted} checked={task.status === taskStatus.finished.key} />

                <h3 style={completeStyle} className="no-margin">
                    {task.title}
                  </h3>
              </div>
              
              <button onClick={() => setEditMode(!editMode)}>Edit</button>
            </div>
            
            <p style={completeStyle}>{task.description ?? '-'}</p>
            
            <span style={{...taskStyle.statusBase, ...taskStyle.statusStyle[task.status]}}>
              {taskStatus[task.status].text}
            </span>
          </div>
        }
    </div>
  )
}

export default Task