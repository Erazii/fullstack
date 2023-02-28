const jwt = require ('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')


const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')
const {initialBlogs, usersInDB} = require("./test_helper");

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }
    ]
    const emptyList = []
    const listWithBlogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })
    test(' when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(7)
    })
    test('of a bigger list is calculated right',() => {
        const result = listHelper.totalLikes(listWithBlogs)
        expect(result).toBe(36)
    })
})

test('favorite blog',() => {
    const blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }
    ]
    const favorite  = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(favorite)

})

describe('api tests', () => {
    const blog = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }

    const user = {
        username: 'erazi',
        name: 'tomas',
        password: '123456789'
    }
    const userToken = {
        username: user.username,
        name: user.name
    }

    const token ={Authorization: `Bearer ${jwt.sign(userToken, process.env.SECRET)}`}

    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        await api
            .post('/api/users')
            .send(user)

        await api
            .post('/api/blogs')
            .set(token)
            .send(blog)
    })

    test('HTTP GET to /api/blogs',async () => {
        const response = await initialBlogs
        expect(response).toHaveLength(helper.initialBlogs.length)
        await api
            .get('/api/blogs')
            .expect('Content-Type', /application\/json/)
    },100000)

    test('verify that the property id exists', async () => {
        const response = await helper.blogsInDB()
        expect(response[0].id).toBeDefined()
    },100000)

    test('makes a HTTP POST to /api/blogs',async () =>{
        const blog = {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        }

        await api
            .post('/api/blogs')
            .set(token)
            .send(blog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDB()
        console.log(blogsAtEnd)
        expect(blogsAtEnd.length).toBe(2)
        const content = blogsAtEnd.map(value => value.title)
        expect(content).toContain('Type wars')
    },100000)




    test('HTTP POST with missing value like is 0', async ()=> {
        const blog = {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            __v: 0
        }
        await api
            .post('/api/blogs')
            .set(token)
            .send(blog)

        const blogPosted = await Blog.find({title: 'Go To Statement Considered Harmful'})
        expect(blogPosted[0].likes).toBe(0)
    },100000)

    test('if title or url is missing status code 400', async ()=> {
        const blogNoTitle = {
            _id: "5a422bc61b54a676234d17fc",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            __v: 0
        }
        const blogNoUrl = {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            __v: 0
        }

        await api
            .post('/api/blogs')
            .set(token)
            .send(blogNoTitle)
            .expect(400)
        await api
            .post('/api/blogs')
            .set(token)
            .send(blogNoUrl)
            .expect(400)
    },100000)

    test('delete note', async () => {
        const atStartBlog = await helper.blogsInDB()
        const deleteBlog = atStartBlog[0]
        await api
            .delete(`/api/blogs/${deleteBlog.id}`)
            .set(token)
            .expect(204)

        const atEndBlog = await helper.blogsInDB()
        expect(atEndBlog.length).toBe(atStartBlog.length - 1)

        const content = atEndBlog.map(value => value.title)
        expect(content).not.toContain(deleteBlog.title)
    },100000)

    test('updating a blogs likes number', async () => {
        const blogsAtStart = await helper.blogsInDB()
        const updatedBlog = blogsAtStart[0]
        updatedBlog.likes = 20

        await api
            .put(`/api/blogs/${updatedBlog.id}`)
            .set(token)
            .send(updatedBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd[0].likes).toBe(20)
    },100000)
})


describe('user tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = {
            username: 'izare',
            name: 'Pepe',
            password: '123456789'
        }
        await api
            .post('/api/users')
            .send(user)
    })

    test('creating a user', async () => {
        const user = {
            username: 'erazi',
            name: 'tomas',
            password: '123456789'
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(201)

        const users = await usersInDB()
        expect(users.length).toBe(2)
    })

    test('user without username or password returns status 401', async () => {
        const userNoUsername = {
            name: 'tomas',
            password: '123456789'
        }
        const userPassword = {
            username: "erazi",
            name: 'tomas',
        }
        await api
            .post('/api/users')
            .send(userNoUsername)
            .expect(401)

        await api
            .post('/api/users')
            .send(userPassword)
            .expect(401)

        const users = await usersInDB()
        expect(users.length).toBe(1)
    })
})










/*describe('user tests', () => {
    const blog = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }

    const user = {
        username: 'erazi',
        name: 'tomas',
        password: '123456789'
    }
    const userToken = {
        username: user.username,
        name: user.name
    }

    const token ={Authorization: `Bearer ${jwt.sign(userToken, process.env.SECRET)}`}

    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        await api
            .post('/api/users')
            .send(user)

        await api
            .post('/api/blogs')
            .set(token)
            .send(blog)
    })
   test('creating a user', async () => {
        const user = {
            username: 'erazi',
            name: 'tomas',
            password: '123456789'
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(201)
    })
})*/

afterAll(async () => {
    await mongoose.connection.close()
})