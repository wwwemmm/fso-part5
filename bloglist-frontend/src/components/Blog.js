import { useState } from 'react'

const Blog = ({blog}) => {
  const [showDetail, setShowDetail] = useState(false) 

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
    <p>likes {blog.likes}</p>
    <p>{blog.user.name}</p>
    </div>
    }
  </div>  
)
}
export default Blog