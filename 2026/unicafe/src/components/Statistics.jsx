import Stat from "./Stat.jsx";

const Statistics = ({ good, neutral, bad }) => {
    return (
        <table>
            <Stat text={"good"} rating={good}/>
            <Stat text={"neutral"} rating={neutral}/>
            <Stat text={"bad"} rating={bad}/>
            <Stat text={"all"} rating={good + neutral + bad} />
            <Stat text={"average"} rating={(good - bad)/(good + neutral + bad)} />
            <Stat text={"positive"} rating={(good / (good + neutral + bad) * 100).toString() + " %"} />
        </table>
    )
}

export default Statistics