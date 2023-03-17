import { useDispatch } from 'react-redux'
import { createAnecdote} from "../reducers/anecdoteReducer"
import anecdotesServices from "../services/anecdotesServices";

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(createAnecdote(content))
    }
    return(
        <div>
            <form onSubmit={addAnecdote}>
                <input name='anecdote'/>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}
export default NewAnecdote