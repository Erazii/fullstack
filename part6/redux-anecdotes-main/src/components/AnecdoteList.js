import { useDispatch, useSelector} from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import {changeNotification, removeNotification, setNotification} from "../reducers/notificationReducer";

const Anecdote = ({anecdote, handleClick}) => {
    return(
        <li>
            <p>{anecdote.content}</p>
            <p>has {anecdote.likes} <button onClick={handleClick}>vote</button></p>
        </li>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if (filter !== ''){
            const base = anecdotes.filter(value => {
                return value.content.includes(filter)
            })
            return base.sort((a , b) => {return b.likes - a.likes})
        }
        const sortedAnecdotes = [...anecdotes]
        return sortedAnecdotes.sort((a , b) => {return b.likes - a.likes})
    })

    return(
        <ul>
            {anecdotes.map(value =>
                <Anecdote
                    key={value.id}
                    anecdote={value}
                    handleClick={() =>{
                        dispatch(voteAnecdote(value.id))
                        dispatch(setNotification(`You voted ${value.content}`, 5))
                    }
                }
                />
            )}
        </ul>
    )
}

export default AnecdoteList