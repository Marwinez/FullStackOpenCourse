const Header = ({ content }) => <h2>{content}</h2>
  
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
  
const Content = ({ parts }) => <div>{parts.map(part => <Part key={part.id} part={part} />)}</div>

const Total = ({ parts }) => <p><strong>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong></p>
  
const Course = ({ course }) => {
  return (
    <>
      <Header content={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course