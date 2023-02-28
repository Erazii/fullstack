import { useEffect, useState } from 'react'
import loginServices from './services/login'
import blogServices from './services/blog_services'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [blogs, setBlogs] = useState([])



  useEffect(() => {
    blogServices
      .getAll()
      .then(response => setBlogs(response))
  },[])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogServices.setToken(user.token)
    }
  },[])


  const loginUser = async (userLogin) => {

    try{
      const user = await loginServices.login(userLogin)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
      blogServices.setToken(user.token)
      if (user){
        const userBlogs = blogs.filter(element => element.user.username === user.username)
        setBlogs(userBlogs.sort(function (a, b) {
          return b.likes - a.likes
        }))
      }
    } catch (exception){
      await setMessage('Invalid password or username')
      setTimeout(() => {
        setMessage('')
      }, 4000)
    }

  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    setUser(null)
    const blogs = await blogServices.getAll()
    setBlogs(blogs)
    window.localStorage.removeItem('loggedUser')
  }

  const addBlog = async (newBlog) => {
    const response = await blogServices.create(newBlog)
    setTimeout(() => {
      setMessage('')
    },4000)
    setBlogs(blogs.concat(response))
  }

  const likeBlog = async (likedBlog) => {
    await blogServices.update(likedBlog.id, likedBlog)
    const newBlog = blogs.map(value => value.id !== likedBlog.id ? value : likedBlog)
    setBlogs(newBlog.sort(function (a, b) {
      console.log('hello')
      return b.likes - a.likes
    }))
  }

  const userInfo = () => (
    <div>
      {user.username} is logged in  <button onClick={handleLogOut}>Logout</button>
    </div>
  )


  const showMessage = () => (
    <div>{message}</div>
  )

  const deleteBlog = async (blog) => {
    await blogServices.deleteBlog(blog.id)
    setBlogs(blogs.filter(value => value.id !== blog.id))
  }

  return (
    <div>
      <h1>BLOGS</h1>
      {message !== '' && showMessage()}
      {user === null &&
                <Togglable buttonLabel="Log in">
                  <LoginForm loginUser={loginUser}/>
                </Togglable>
      }
      {user !== null && userInfo()}
      {user !== null &&
                <Togglable buttonLabel="Add blog" buttonID='createBlog'>
                  <BlogForm createBlog={addBlog}/>
                </Togglable>
      }
      {user !== null &&
            <BlogList blogs={blogs} likeBlog={likeBlog} deleteB={deleteBlog}/>}
    </div>
  )

}


export default App