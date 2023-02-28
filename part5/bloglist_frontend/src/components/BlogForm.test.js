import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm/> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog}/>)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')

  const submitButton = screen.getByText('Submit')

  await user.type(titleInput, 'React patterns')
  await user.type(authorInput, 'Michael Chan"')
  await user.type(urlInput, 'https://reactpatterns.com/')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('React patterns')


})