import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const user = {
    'username':'root',
    'name':'Super User',
    'id':'64ddca53179fef78b5747fef'
  }
  const blog = {
    'title':'Blog list tests, step1',
    'author':'Full Stack Open',
    'url':'https://fullstackopen.com/en/part5',
    'likes':0,
    'user':{
      'username':'root',
      'name':'Super User',
      'id':'64ddca53179fef78b5747fef'
    }
  }
  const mockupdateBlog = jest.fn()
  const mockdeleteBlog = jest.fn()

  const { container } = render(<Blog blog={blog}
    updateBlog={mockupdateBlog}
    deleteBlog={mockdeleteBlog}
    user={user}
  />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Blog list tests, step1'
  )
  expect(div).toHaveTextContent(
    'Full Stack Open'
  )
  expect(div).not.toHaveTextContent(
    'https://fullstackopen.com/en/part5'
  )
  expect(div).not.toHaveTextContent(
    'likes'
  )
})

test('details will be shown affter clicking the controlling button', async() => {
  const user = {
    'username':'root',
    'name':'Super User',
    'id':'64ddca53179fef78b5747fef'
  }
  const blog = {
    'title':'Blog list tests, step1',
    'author':'Full Stack Open',
    'url':'https://fullstackopen.com/en/part5',
    'likes':0,
    'user':{
      'username':'root',
      'name':'Super User',
      'id':'64ddca53179fef78b5747fef'
    }
  }
  const mockupdateBlog = jest.fn()
  const mockdeleteBlog = jest.fn()

  const { container } = render(<Blog blog={blog}
    updateBlog={mockupdateBlog}
    deleteBlog={mockdeleteBlog}
    user={user}
  />)

  const mockuser = userEvent.setup()
  const button = screen.getByText('view')
  await mockuser.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Blog list tests, step1'
  )
  expect(div).toHaveTextContent(
    'Full Stack Open'
  )
  expect(div).toHaveTextContent(
    'https://fullstackopen.com/en/part5'
  )
  expect(div).toHaveTextContent(
    'likes'
  )
})


