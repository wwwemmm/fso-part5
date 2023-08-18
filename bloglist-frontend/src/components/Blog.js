import { useState } from 'react'

const Blog = ({blog, updateBlog, userid}) => {
  const [showDetail, setShowDetail] = useState(false) 
  const [likes, setLikes] = useState(blog.likes)

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
    'likes': likes + 1,
    'author':blog.author,
    'title':blog.title,
    'url':blog.url
  }
  await updateBlog(blog.id, newBlog)
  setLikes(likes+1)
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
      <span>likes {likes}</span>
      <button onClick = {increaseLike}>like</button>
    </p>
    <p>{blog.user.name}</p>
    </div>
    }
  </div>  
)
}
export default Blog