import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Display = (props) => <p>{props.name} {props.count}</p>

const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      <div>
        <Display name="good" count={props.good}/>
        <Display name="neutral" count={props.neutral}/>
        <Display name="bad" count={props.bad}/>
        
      </div>
    </>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  const calcAll = (good, neutral, bad) => good + neutral + bad
  const calcAverage = (good, neutral, bad) => (good + bad * -1)/(good + neutral + bad)
  const calcPositive = (good, neutral, bad) => `${good / (good + neutral + bad) * 100}%`

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={increaseGood} text="good"/>
        <Button handleClick={increaseNeutral} text="neutral"/>
        <Button handleClick={increaseBad} text="bad"/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <Display name="all" count={calcAll(good, neutral, bad)} />
      <Display name="average" count={calcAverage(good, neutral, bad)} />
      <Display name="positive" count={calcPositive(good, neutral, bad)} />
    </div>
  )
}

export default App