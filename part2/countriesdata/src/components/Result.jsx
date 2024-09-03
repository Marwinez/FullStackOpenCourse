import CountryList from './CountryList'
import CountryInfo from './CountryInfo'

const Result = ({ result, countries, handleShowBtn }) => {
    if (result == null) {
      return <CountryList countries = {countries} handleShowBtn={handleShowBtn} />
    } else {
      return <CountryInfo result={result}/>
    }
}

export default Result