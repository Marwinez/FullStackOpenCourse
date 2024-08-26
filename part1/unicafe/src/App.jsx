import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const StatisticLine = (props) => <tr><td>{props.name}</td><td>{props.count}</td></tr>

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const calcAll = (good, neutral, bad) => good + neutral + bad
  const calcAverage = (good, neutral, bad) => (good + bad * -1)/(good + neutral + bad)
  const calcPositive = (good, neutral, bad) => `${good / (good + neutral + bad) * 100}%`

  if (good > 0 || neutral > 0 || bad > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine name="good" count={good}/>
          <StatisticLine name="neutral" count={neutral}/>
          <StatisticLine name="bad" count={bad}/>
          <StatisticLine name="all" count={calcAll(good, neutral, bad)} />
          <StatisticLine name="average" count={calcAverage(good, neutral, bad)} />
          <StatisticLine name="positive" count={calcPositive(good, neutral, bad)} />
        </tbody>
      </table>
    )
  } else {
    return (
      <h4>No feedback given</h4>
    )
  }
  
}



const App = () => {
   
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={increaseGood} text="good"/>
        <Button handleClick={increaseNeutral} text="neutral"/>
        <Button handleClick={increaseBad} text="bad"/>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App