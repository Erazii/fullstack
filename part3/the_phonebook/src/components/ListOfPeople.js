import Delete from "./Delete";
const List = ({people, filter,setPeople, setErrorMessage}) => {
    if(filter.length !== 0){
        return (
            <ul>{filter.map(name => <li key={name.id}>{name.name} {name.number} <Delete value={name} setPeople={setPeople} people={people} setErrorMessage={setErrorMessage}/> </li>)}</ul>
        )
    }
    else if(filter.length === 0){
        return(
            <p>Contact not found</p>
        )
    }
    else{
        return (
            <ul>{people.map(name => <li key={name.id}>{name.name} {name.number} <Delete value={name} setPeople={setPeople} people={people} setErrorMessage={setErrorMessage}/> </li>)}</ul>
        )
    }
}
export default List