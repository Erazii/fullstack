
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
const {response} = require("express");
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

app.get('/api/persons/:id',(request, response) => {
    Person.findById(request.params.id)
        .then(result => {
            if(result){
                response.json(result)
            }else{
                response.status(400).end()
            }
        })
})

app.delete('/api/persons/:id',(request,response) =>{
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })

})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(body.name === undefined){
        return response.status(400).json({error: 'content missing'})
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(person => {
        response.json(person)
    })

})

app.put('/api/persons/:id',(request, response) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person)
        .then(updated => {
            response.json(updated)
        })
})

const PORT = process.env.PORT || 8080
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})