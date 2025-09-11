import { useEffect, useState } from 'react'

import api from './services/tasks';
import Task from './components/Task/Task';

import './App.css';
import AddTask from './components/AddTask';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
      api.getAll()
        .then(tasks => {setTasks(tasks)})
        .catch(err => console.log(err));
  }

  useEffect(fetchTasks, []);
  
  const addTask = (newTask) => {
      api.create(newTask)
      .then((result) => setTasks(tasks.concat(result)))
  }

  const updateTask = (newTask) => {
      api.update(newTask)
      .then(taskUpdated => {
          setTasks(tasks.map(t => t.id === taskUpdated.id ? taskUpdated : t))
      })
  }

  return (
    <div>
      <h1 className="text-align">Task treker</h1>

      <div className='tasks-grid'>
        {tasks && tasks.map((task) => <Task key={task.id} task={task} updateTask={updateTask} />)}
        <AddTask addTask={addTask} />
      </div>
    </div>

  )
}

export default App
