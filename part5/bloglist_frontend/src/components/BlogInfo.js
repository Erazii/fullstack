import { useState } from 'react'

const BlogInfo = ({ blog, likeBlog, deleteB }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLike = async (event) => {
    event.preventDefault()
    likeBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    })
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Do you want to delete ${blog.title}`)){
      deleteB(blog)
    }
  }
  return(
    <div>
      <div style={hideWhenVisible} className='onlyTitle'>
        <p>{blog.title} <button onClick={toggleVisibility} id='view-info' className='view-info'>view</button></p>
      </div>
      <div style={showWhenVisible} className='fullDetail'>
        <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
        <p>Author: {blog.author}</p>
        <p>Url: <a href={blog.url}>{blog.url}</a> </p>
        <p id='blogLikes'>Likes: {blog.likes}<button onClick={increaseLike} id='like-button'  className='like-button'>Like</button></p>
        <button onClick={deleteBlog} id='deleteblog-button'>delete</button>
      </div>
    </div>

  )

}

export default BlogInfo

/**/