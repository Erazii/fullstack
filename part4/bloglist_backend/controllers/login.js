const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')


loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body
    const exist = await User.exists({username: username})
    if(!exist){
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }
    const user = await User.find({username})
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user[0].passwordHash)

    if(!(user && passwordCorrect)){
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user[0].username,
        id: user[0]._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    response
        .status(200)
        .send({token, username: user[0].username, name: user[0].name})

})
module.exports = loginRouter