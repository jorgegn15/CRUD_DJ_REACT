import axios from 'axios'

const tasksApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/tasks/api/v1/tasks/'
})

export const getAllTask = () =>{
    return tasksApi.get('/')
}

export const createTask = (task) =>{
    return tasksApi.post('/', task)
}

export const getTask = (id) =>{
    return tasksApi.get(`/${id}/`, id)
}

export const deleteTask = (id) =>{
    return tasksApi.delete(`/${id}`, id)
}

export const updateTask = (id, task) =>{
    return tasksApi.put(`/${id}/`, task)
}