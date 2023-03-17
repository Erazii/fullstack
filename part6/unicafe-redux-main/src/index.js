import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from "./reducer";
import { createStore} from "redux"

const store  = createStore(counterReducer)

const root = ReactDOM.createRoot(document.getElementById('root'))

const App = () => {
    return (
        <div>
            <button onClick={e => store.dispatch({type: 'GOOD'})}>good</button><button onClick={e => store.dispatch({type: 'OK'})}>ok</button><button onClick={e => store.dispatch({type: 'BAD'})}>bad</button><button onClick={e => store.dispatch({type: 'RESET'})}>Reset Stats</button>
            <p>Good: {store.getState().good}</p>
            <p>OK: {store.getState().ok}</p>
            <p>Bad: {store.getState().bad}</p>
        </div>
    )
}

const renderApp = () => {
    root.render(<App />)

}
renderApp()
store.subscribe(renderApp)