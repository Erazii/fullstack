import peopleServices from '../services/services'
const Delete = ({value, setPeople, people, setErrorMessage}) => {
    const handleDelete = (event) => {
        let windows = window.confirm(`Do you wanna remove ${value.name}? `)
        if(windows){
            peopleServices
                .deleteNote(value.id)
                .catch(error => {
                    setErrorMessage(`${value.name} is already been removed from server`)
                    setTimeout(() => {
                        setErrorMessage(null)
                    },3000)
                })
                .then(response =>{
                    setPeople(people.filter((name) => name.id !== value.id))
                })
            setErrorMessage(`${value.name} is been removed from server`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}
export default Delete