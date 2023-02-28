import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogInfo from './BlogInfo'
import userEvent from '@testing-library/user-event'

describe('BlogInfo tests',() => {

  const blog = {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
  let container
  const user = userEvent.setup()
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    container = render(<BlogInfo blog={blog}/>).container
  })

  test('renders blog title by default',() => {
    // eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
    const element = container.querySelector('.onlyTitle')
    expect(element).toHaveTextContent( 'React patterns')
    expect(element).not.toHaveTextContent('Michael Chan')
  })


  test('when pressing show renders children', async () => {
    const button = screen.getByText('view')
    await user.click(button)
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const element = container.querySelector('.fullDetail')
    expect(element).toHaveTextContent('https://reactpatterns.com/')
    expect(element).toHaveTextContent('Michael Chan')
  })
})


test('expect like function to be called twice', async () => {
  const blog = {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
  const mockHandler = jest.fn()
  render(<BlogInfo blog={blog} likeBlog={mockHandler}/>)
  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})