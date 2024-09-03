import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Result from './components/Result'
import Weather from './components/Weather'
const api_key = import.meta.env.VITE_SOME_KEY


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ inputValue, setInputValue ] = useState('')
  const [ countriesNames, setCountriesNames ] = useState([])
  const [ result, setResult ] = useState(null)
  const [ weather, setWeather ] = useState(null)


  // handle show button next to countries
  const handleShowBtn = (country) => {
    axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setResult(response.data)
          setInputValue('')
        })
  }


  // first get for all country names
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountriesNames(response.data.map( country => country.name.common ))
      })
      .catch(err => console.log(err))
  }, [])


  // get data for particular country
  useEffect(() => {
    if (countries.length == 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countries[0]}`)
        .then(response => {
          setResult(response.data)
          let lat = response.data.latlng[0]
          let lng = response.data.latlng[1]
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
            .then(response => {
              setWeather(response.data)
            })
            .catch(err => console.log(err))
        })
    } else {
      setResult(null)
      setWeather(null)
    }
  }, [countries])


  // handle onChange in filter input
  const handleChange = (event) => {
    setInputValue(event.target.value)
    const searchedValue = event.target.value.toLowerCase()
    let filteredCountries = ''
    if (searchedValue !== '') {
      filteredCountries = countriesNames.filter(country => country.toLowerCase().includes(searchedValue))
    }
    setCountries(filteredCountries)
  }

  // return html
  return (
    <div>
      <Filter handleChange={handleChange} inputValue={inputValue}/>
      <Result result={result} countries={countries} handleShowBtn={handleShowBtn} />
      <Weather country={result} weather={weather} />
    </div>
  )
}

export default App