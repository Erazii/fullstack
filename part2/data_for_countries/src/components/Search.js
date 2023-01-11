const Search = ({newSearch, handleSearch}) => {
    return(
        <form>
            <div>
                Find countries <input
                    value = {newSearch}
                    onChange={handleSearch}
                />
            </div>
        </form>
    )
}
export default Search