import Button from "./Button";
import CountryInfo from "./CountryInfo";
const Country = ({filtered}) => {
    if (filtered.length !== 1) {
        return <div>
            {filtered.map(value =>
                <div key={value.name.common}>
                    {value.name.common} <Button value={value}/>
                </div>
            )}
        </div>
    } else {
        return (
            <CountryInfo value={filtered[0]}/>
        )
    }
}
export default Country