import BlogInfo from './BlogInfo'
const BlogList = ({ blogs, likeBlog, deleteB }) => {
  return(
    <div>
      <ul >{
        blogs.map(value => <li key={value.id} className='blog'>
          <BlogInfo blog={value} likeBlog={likeBlog} deleteB={deleteB}/>
        </li>)
      }</ul>
    </div>
  )
}

export default BlogList