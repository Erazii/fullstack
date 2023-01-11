import Weather from "./Weather";

const CountryInfo = ({value}) => {
    return(
        <div>
            <h1>{value.name.common}</h1>
            <p>Capital {value.capital}</p>
            <p>Area {value.area}</p>
            <h2>Languages:</h2>
            <ul>{Object.values(value.languages).map(value => <li key={value}>{value}</li>)}</ul>
            <img src={value.flags.png} alt={value.name.common}/>
            <Weather value={value}/>
        </div>
    )
}
export default CountryInfo