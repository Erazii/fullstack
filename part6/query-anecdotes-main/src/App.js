import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient} from "react-query";
import {createNew, getAll, updateAnecdote} from "./requests";

const App = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createNew, {
      onSuccess: (newAnecdote) => {
          const anecdotes = queryClient.getQueryData('anecdotes')
          queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      }
  })

  const updateMutation = useMutation(updateAnecdote, {
      onSuccess: (updatedAnecdote) => {
          const anecdotes = queryClient.getQueryData('anecdotes')
          queryClient.setQueryData('anecdotes', anecdotes.map(value => value.id !== updatedAnecdote.id ? value : updatedAnecdote))
      }
  })
    const handleVote = (anecdote) => {
        const votedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        updateMutation.mutate(votedAnecdote)

    }

  const addAnecdote = (newAnecdote) => {
      newAnecdoteMutation.mutate(newAnecdote)
  }

  const result = useQuery('anecdotes', getAll, {
      refetchOnWindowFocus: false
  })

  if (result.isLoading) {
      return <div>loading data</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
