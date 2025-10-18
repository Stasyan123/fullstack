const Task = require('../../models/task')

const initialTasks = [
  {
    title: "Test task 1", 
    description: "HTML is easy",
    status: "inProgress"
  }, 
  {
    title: "Test task 2", 
    description: "HTML is easy 2",
    status: "inProgress"
  }, 
]

const getItems = async () => {
  const dbTasks  = await Task.find({})
  
  return dbTasks.map(task => task.toJSON())
}

const notExistingId = async () => {
  const newTask = new Task({ title: 'willremovethissoon', status: 'toDo' })
  
  await newTask.save()
  await newTask.deleteOne()    
  
  return newTask._id.toString()  
}

module.exports = {
  initialTasks,
  getItems,
  notExistingId   
}   