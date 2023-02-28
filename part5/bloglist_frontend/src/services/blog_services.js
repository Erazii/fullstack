import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}
const blogServices = {
  getAll,
  setToken,
  create,
  update,
  deleteBlog
}

export default blogServices