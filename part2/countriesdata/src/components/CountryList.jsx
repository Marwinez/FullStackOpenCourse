const CountryList = ({ countries, handleShowBtn }) => {
    if (countries.length >= 10) {
      return("Too many matches, specify another filter")
    } else if (countries.length == 0) {
      return null
    } else {
      return(countries.map(country => <div key={country}>{country} <button onClick={() => handleShowBtn(country)}>show</button></div>))
    }
  }

export default CountryList