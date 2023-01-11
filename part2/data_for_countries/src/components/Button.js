import {useState} from "react";
import CountryInfo from "./CountryInfo";

const Button = ({value}) => {
    const [isShown, setShown] = useState(false);
    const handleClick = (event) => {
        setShown(current => !current)
    }

    return (
        <div>
        <button onClick={handleClick}>Show</button>
    {isShown && (
        <CountryInfo value={value}/>
    )}
        </div>
    )
}
export default Button