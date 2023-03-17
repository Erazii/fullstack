
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import anecdotesServices from "./services/anecdotesServices";
import {setAnecdotes} from "./reducers/anecdoteReducer";

const App = () => {
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()
    useEffect(() => {
        anecdotesServices
            .getAll()
            .then(
            anecdote => dispatch(setAnecdotes(anecdote))
        )
    },[dispatch])

  return (
    <div>
        <h2>Anecdotes</h2>
        {notification !== null &&
            <Notification/>}
        <Filter/>
        <h3>Create new anecdote</h3>
        <AnecdoteForm/>
        <AnecdoteList/>
    </div>
  )
}

export default App