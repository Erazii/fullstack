const Header = ({course}) => {
    return(
        <h1>{course.name}</h1>
        )
    }
const Content = ({course}) => {
    return(
        <Part course= {course}/>
        )
    }

const Total = ({course}) => {
    return(
        <div>
            {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}
        </div>
        )
    }
const Part = ({course}) => {
    return(
        course.parts.map(value => <p>{value.name} {value.exercises}</p>)
        )
}


const App = () => {
     const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
        )
}
export default App
