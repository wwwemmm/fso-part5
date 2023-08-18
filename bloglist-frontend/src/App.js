import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [notiInfo, setNotiInfo] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async  (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotiInfo(['Wrong username or password','error'])
      setTimeout(() => {
        setNotiInfo([])
      }, 5000)
    }
  }

  const addBlog = async  (blogObject) => {
    console.log("adding blog ",blogObject.title, blogObject.author)
    try {
      const returnedBlog = await blogService.create(blogObject)

      const succeedAddBlog = {
        ...returnedBlog,
        "user":user
      }
      
      await setBlogs(blogs.concat(succeedAddBlog))
      setNotiInfo([`a new blog ${blogObject.title} by ${blogObject.author} added`, 'fulfilled'])
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setNotiInfo([])
      }, 5000)
    } catch (exception) {
      setNotiInfo(['Missing title, author or url', 'error'])
      setTimeout(() => {
        setNotiInfo([])
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
    <Togglable buttonLabel='login'>
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
    </Togglable>
  )}
  
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
  
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }


  const updateBlog = async (blogid, blogObject) => {
    console.log("adding likes",blogObject.title, blogObject.author)
    try {
    const returnedBlog = await blogService.update(blogid,blogObject)
    //console.log('returnedBlog: ', returnedBlog)
    const newBlogs = blogs.filter(blog => blog.id !== blogid).concat(returnedBlog)
    //console.log("newBlogs: ", newBlogs)

    const sortedBlog = await newBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlog)

    setNotiInfo([`Likes of ${blogObject.title} are increased`, 'fulfilled'])
    setTimeout(() => {
      setNotiInfo([])
    }, 5000)
  } catch (exception) {
    setNotiInfo(['fail to increase likes', 'error'])
    setTimeout(() => {
      setNotiInfo([])
    }, 5000)
  }}
  console.log("before return: ", blogs)
  return (
    <div>
      {user === null && loginForm()}
      {user && 
      <div>
      <h2>blogs</h2>
      <Notification message={notiInfo[0]} type = {notiInfo[1]}/>
      <p>
        <span>{user.name} logged in</span>
        <button onClick = {handleLogout} >logout</button>
      </p>
      {blogForm()}
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} userid={user.id}/>
      )}
      </div>
    }
    </div>
  )
}

export default App