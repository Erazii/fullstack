import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const anecdote = {
        content,
        likes: 0,
    }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

const getAnecdote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return  response.data
}
export default {
    getAll,
    createAnecdote,
    update,
    getAnecdote
}