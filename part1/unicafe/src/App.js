import { useState } from 'react'

const Head = () => <h1>Give Feedback</h1>

const Button = ({ handleClick, text}) =>(
        <button onClick={handleClick}>{text}
        </button>
)

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    const average = (good - bad)/all
    const StatisticLine = ({text, value}) => {
        return(
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        )
    }

    if(good + neutral + bad === 0){
            return(
                <div>No feedback given</div>
            )
    }

    return(
        <div>
            <table>
                <tbody>
                    <StatisticLine text="Good" value = {good} />
                    <StatisticLine text="Neutral" value = {neutral} />
                    <StatisticLine text="Bad" value = {bad} />
                    <StatisticLine text='All' value = {all} />
                    <StatisticLine text='Average' value = {average} />
                    <StatisticLine text='Positive' value = {good/all}/>
                </tbody>
            </table>
        </div>
    )
}

const Data = ({good, neutral, bad}) => {
    const All = good+ neutral + bad
    const Average = (good - bad)/All
    return(
        <div>
        <p>All {All}</p>
        <p>Average {Average}</p>
        <p>Positive {good / All}</p>
        </div>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setBad(bad + 1)
  const handleBad = () => setNeutral(neutral + 1)

  return (
    <div>
      <Head/>
      <Button handleClick= {handleGood} text='Good'/>
      <Button handleClick= {handleNeutral} text='Neutral'/>
      <Button handleClick= {handleBad} text='Bad'/>
      <h2>STATISTICS</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App