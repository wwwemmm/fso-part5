import { useState } from 'react'

const Blog = ({blog, updateBlog, userid}) => {
  const [showDetail, setShowDetail] = useState(false) 

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const increaseLike = async () => {
  const newBlog = {
    'user':userid,
    'likes':blog.likes+1,
    'author':blog.author,
    'title':blog.title,
    'url':blog.url
  }
  await updateBlog(blog.id, newBlog)
}

return (
  <div style={blogStyle}>
    {!showDetail && 
    <p>
    <span>{blog.title} {blog.author}</span>
    <button onClick={() => setShowDetail(!showDetail)}>view</button>
    </p>
    }
    {showDetail && 
    <div>
    <span>{blog.title} {blog.author}</span>
    <button onClick={() => setShowDetail(!showDetail)}>hide</button>
    <p>{blog.url}</p>
    <p>
      <span>likes {blog.likes}</span>
      <button onClick = {increaseLike}>like</button>
    </p>
    <p>{blog.user.name}</p>
    </div>
    }
  </div>  
)
}
export default Blog