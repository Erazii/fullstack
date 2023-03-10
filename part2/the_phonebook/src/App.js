import {useEffect, useState} from "react";
import peopleServices from './services/services'
import Form from "./components/Form";
import List from "./components/ListOfPeople";
import * as events from "events";
import Notification from "./components/Notification";

const App= () => {
    const [people, setPeople] = useState([])
    useEffect(() => {
        peopleServices
            .getAll()
            .then(initialData => {
                setPeople(initialData)
            })
    },[])
    const [newName, setName] = useState('')
    const [number, setNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const handleName = (event) => {
        setName(event.target.value)
    }
    const handleNumber = (event) => {
        setNumber(event.target.value)
    }
    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number : number,
        }
        const stringPersons = people.map(value => JSON.stringify(value.name))

        if(stringPersons.includes(JSON.stringify(nameObject.name))){
            const id = people.filter(value => {
                if(value.name.toLowerCase().includes(nameObject.name)){
                    return value
                }
            })
            let windows = window.confirm(`${nameObject.name} + ' is already added to phonebook, replace the old number with a new one?`)
            if(windows) {
                const person = people.find(n => n.id === id[0].id)
                const changedPerson = {...person, number: nameObject.number}

                peopleServices
                    .update(id[0].id, changedPerson)
                    .then(response => {
                        setPeople(people.map(n => n.id !== id[0].id ? n: response))
                    })
                setMessage(`${nameObject.name} is been added`)
                setTimeout(() => {
                    setMessage(null)
                },3000)
            }

        }else {
            peopleServices
                .create(nameObject)
                .then(response => {
                    setPeople(people.concat(response))
                    setName('')
                    setNumber('')
                })
            setMessage(`${nameObject.name} is been added`)
            setTimeout(() => {
                setMessage(null)
            },3000)


        }
    }
    const filteredSearch = people.filter(value => {
        if(value.name.toLowerCase().includes(filter)){
            return value
        }
    })


    return (
        <div>
            <Notification errorMessage={errorMessage} message={message}/>
            <Form handleName={handleName} handleNumber={handleNumber}  handleFilter={handleFilter} filter={filter} newName={newName} newNumber={number} addName={addName}/>
            <List filter={filteredSearch} people={people} setPeople={setPeople} setErrorMessage={setErrorMessage}/>
        </div>
    )
}



export default App;
