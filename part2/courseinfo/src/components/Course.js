const Course = ({courses}) => {
        return courses.map(value=> <div key={value.id}>
                    <Header course={value}/>
                    <Content course={value}/>
                    <Total parts={value.parts}/>
                </div>)

}

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

const Total = ({parts}) => {
    const sum = parts.reduce((partialSum, a) => partialSum + a.exercises, 0)
    console.log(sum)
    return(
        <p>Total exercises {sum}</p>
        )
    }
const Part = ({course}) => {
    return(
        course.parts.map(value => <p key={value.id}>{value.name} {value.exercises}</p>)
        )
}

export default Course