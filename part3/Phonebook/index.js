const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then((result) => {
    response.json(result)
  })
})

app.get('/api/info', (request, response) => {
  Person.find({})
    .then(result => {
      response.send(`<div><p>Phonebook has info for ${result.length}</p><p>${new Date()}</p></div>`)
    })

})

app.get('/api/persons/:id',(request, response, next) => {
  Person.findById(request.params.id)
    .then(result => {
      if(result){
        response.json(result)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id',(request,response, next) =>{
  Person.findByIdAndDelete(request.params.id)
    .then(()=> {
      response.status(204).end()
    })
    .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  Person.countDocuments({name: body.name}, (err, count) => {
    if(count > 0){
      return response.status(400).json({error: 'you are trying to post a name thats already on the phonebook'})
    }
    else if (body.name === undefined){
      return response.status(400).json({error: 'content missing'})
    }
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person.save()
      .then(person => {
        response.json(person)
      })
      .catch(error => next(error))
  })
})

app.put('/api/persons/:id',(request, response, next) => {
  const {name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query'}
  )
    .then(updated => {
      response.json(updated)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if(error.name === 'CastError') {
    return  response.status(400).send({ error: 'malformatted id'})
  } else if(error.name === 'ValidationError'){
    return  response.status(400).json({error: error.message})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})