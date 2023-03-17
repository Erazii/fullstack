import {createContext, useReducer, useContext} from "react";

const counterReducer = (state, action) => {
    switch (action.type) {
        case 'NEW':
            const notification = action.payload
            return `the anecdote ${notification} has been added`
        case 'VOTE':
            const anecdote = action.payload
            return `you have voted ${anecdote}`
        default:
            return state
    }
}

const CounterContext = createContext()

export const CounterContextProvider = (props) => {
    const [counter, counterDispatch] = useReducer(counterReducer, '')

    return (
        <CounterContextProvider value={{counter, counterDispatch}}>
            {props.children}
        </CounterContextProvider>
    )
}

export const useCounterValue = () => {
    const counterAndDispatch = useContext(CounterContext)
    return counterAndDispatch[0]
}

export const useCounterDispatch = () => {
    const counterAndDispatch = useContext(CounterContext)
    return counterAndDispatch[0]
}
export default CounterContext