const User = require ('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method;', request.method)
  logger.info('Path', request.path)
  logger.info('Body', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.sendStatus(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error,request, response, next) => {
  logger.error(error.message)
  if(error.name == 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }else if(error.name == 'ValidationError'){
    return response.status(400).json({error: error.message})
  }else if(error.name == 'JsonWebTokenError'){
    return response.status(400).json({error: 'Token missing or invalid'})
  }
  next(error)
}

const getTokenFrom = async (request, response, next) => {
  const auth = request.get('authorization')

  if(auth && auth.startsWith('Bearer ')){
    request.token = auth.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = await jwt.decode(request.token, process.env.SECRET)
  const user = await User.find({username: decodedToken.username})
  if(decodedToken){
    request.user = user[0]
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
  userExtractor
}