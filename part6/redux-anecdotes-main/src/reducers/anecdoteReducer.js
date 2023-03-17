import { createSlice } from '@reduxjs/toolkit'
import anecdotesServices from "../services/anecdotesServices";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    updateAnecdote(state, action) {
      const id = action.payload
      return state.map(value => value.id !== id.id ? value : id)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  },
})

export const createAnecdote = content => {
  return async dispatch => {
    const response = await anecdotesServices.createAnecdote(content)
    dispatch(appendAnecdote(response))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const voteAnecdote = await anecdotesServices.getAnecdote(id)
    const votedAnecdote = {
      ...voteAnecdote, likes: voteAnecdote.likes + 1
    }
    const response = await anecdotesServices.update(id, votedAnecdote)
    dispatch(updateAnecdote(response))
  }
}



export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer