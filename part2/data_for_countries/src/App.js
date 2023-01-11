import axios from 'axios'
import {useEffect, useState} from 'react'
import Search from './components/Search'
import Countries from  './components/Countries'
const App = () => {
  const [countries, setCountries] = useState([])
    useEffect(() => {
      axios
          .get('https://restcountries.com/v3.1/all')
          .then(response => {
            setCountries((response.data))
          })

    },[])
  const [newSearch, setSearch] = useState('')
  const handleSearch = (event) => {
      setSearch(event.target.value)
    }
  let filtered = countries.filter((country) => country.name.common.toLowerCase().includes(newSearch))
    return (
    <div>
        <Search newSearch={newSearch} handleSearch ={handleSearch}/>
        <Countries filtered={filtered} newSearch={newSearch}/>
    </div>
  )
}

export default App
