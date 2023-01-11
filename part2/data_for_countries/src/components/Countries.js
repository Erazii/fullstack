import Country from "./Country";

const Countries = ({filtered, newSearch}) => {
    if(newSearch === ''){
        return (
            <div>
                Please enter a search filter
            </div>
        )
    }else if(filtered.length > 10){
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }else if(filtered.length === 0 && newSearch !== ''){
        return (
            <div>
                There's no country with this filter, specify another filter
            </div>
        )
    }else{
        return(
        <Country filtered={filtered}/>
        )
    }
}
export default Countries