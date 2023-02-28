const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/user')
const {response} = require("express");

userRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body
    if(password == undefined|| password.length < 3){
        return response.status(401).json({
            error: 'password is too short'
        })
    }
    if (username == undefined|| username.length < 3){
        return response.status(401).json({
            error: 'name is too short'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const user = await User.find({}).populate('blog', { url: 1, title: 1, author: 1, id: 1 })
    response.json(user)
})

module.exports = userRouter