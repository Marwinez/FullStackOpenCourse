const CountryInfo = ({ result }) => {
    let languages = []
    for (let prop in result.languages) {
      if (Object.prototype.hasOwnProperty.call(result.languages, prop)) {
        languages.push(result.languages[prop])
      }
    }
    return (
      <div>
        <h1>{result.name.common}</h1>
        <span>capital {result.capital}</span>
        <p>area {result.area}</p>
        <br />
        <strong>languages:</strong>
        <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <br />
        <img src={result.flags.png} alt={result.flags.alt} />
      </div>
    )
  }

  export default CountryInfo