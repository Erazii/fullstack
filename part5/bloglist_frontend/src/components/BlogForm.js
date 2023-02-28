import { useState } from 'react'

const FormNote = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogUrl('')
    setBlogAuthor('')
    setBlogTitle('')
  }

  return(
    <div>
      <h2>Add a blog</h2>
      <form onSubmit={addBlog}>
        <div>Title: <input value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)} placeholder='title' id='newblog-title'/></div>
        <div>Author: <input value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)} placeholder='author' id='newblog-author'/></div>
        <div>Url: <input value={blogUrl} onChange={({ target }) => setBlogUrl(target.value)} placeholder='url' id='newblog-url'/></div>
        <button type='submit' id='newblog-submit-button'>Submit</button>
      </form>
    </div>
  )
}
export default FormNote