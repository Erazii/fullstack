const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {userExtractor} = require("../utils/middleware");

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  if(body.title === undefined ||body.url === undefined ){
    return response.status(400).json({error: 'missing content'})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.user.id
  })
  await blog.save()
  request.user.blog = request.user.blog.concat(blog.id)
  await request.user.save()
  response.json(blog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.find({id: request.params.id})
  if(user.id === blog[0].user.toJSON()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  response.status(401).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const {title, author, url, likes} = request.body
  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      {new: true}
  )
  response.status(200).end()
})

module.exports = blogsRouter