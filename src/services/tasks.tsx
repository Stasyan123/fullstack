import axios from "axios"

const baseUrl = 'http://localhost:3001/api/tasks';

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data);
}

const create = (newTask) => {
    const request = axios.post(baseUrl, newTask)
    return request.then(res => res.data);
}

const update = (task) => {
    const request = axios.put(`${baseUrl}/` + task.id, task)
    return request.then(res => res.data);
}

const deleteTask = (id: number) => {
    const request = axios.delete(baseUrl + '/' + id)
    return request.then(res => res.data);
}

export default { 
    getAll,
    create,
    update,
    deleteTask 
}