import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const addNew = (newNumber) => {
    return axios.post(baseUrl, newNumber)
}

const updateNumber = (id, updatedNumber) => {
    return axios.put(`${baseUrl}/${id}`, updatedNumber)
}

const deleteNumber = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, addNew, updateNumber, deleteNumber }