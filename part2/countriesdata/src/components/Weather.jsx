const Weather = ({ country, weather }) => {
    if (country != null && weather != null) {
      return (
        <div>
          <h1>Weather in {country.capital[0]}</h1>
          <div>{country.latlng[0]} {country.latlng[1]}</div>
          <p>temperature {weather.main.temp} Celcius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      ) 
    } else {
      return null
    } 
}

export default Weather