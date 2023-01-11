import { useState } from 'react'

const Button = ({handle, text}) => <button onClick={handle}>{text}</button>

const Anecdote = ({anecdotes, number}) => <div><p>{anecdotes[number]}</p></div>

const Day = ({points, anecdotes}) => {
    let max = 0
    let value = 0
    let high = 0
    while(high < anecdotes.length){
        if(points[high] > value){
        max = high
        value = points[high]
        }
        high += 1
    }
    return (
    <div>
        <p>{anecdotes[max]}</p>
        <p>Has {value} votes</p>
    </div>

    )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]



  const [selected, setSelected] = useState(0)
  const handleSelected = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(selected - selected + random)
    console.log(selected)
  }

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])
  const handlePoints = () => {
      const copy = [...points]
          copy[selected] += 1
          setPoints(copy)
  }
  console.log(points)


  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <Anecdote anecdotes = {anecdotes} number = {selected}/>
      <p>Has {points[selected]} votes</p>
      <p>
      <Button handle={handlePoints} text='Vote'/> <Button handle={handleSelected} text='Next anecdote'/>
      </p>
      <h2>Anecdote with the most vote</h2>
      <Day points= {points} anecdotes = {anecdotes}/>
    </div>
  )

}

export default App