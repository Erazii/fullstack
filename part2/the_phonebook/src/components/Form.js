const Form = ({addName,handleName,newName,newNumber,handleNumber,handleFilter, filter}) => {

    return(
        <form onSubmit={addName} >
            <div>
                Filter shown with: <input
                value = {filter}
                onChange= {handleFilter}
            />
            </div>
            <div>
                Name: <input
                value = {newName}
                onChange = {handleName}
            />
            </div>
            <div>
                Number: <input
                value = {newNumber}
                onChange = {handleNumber}
            />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}


export default Form