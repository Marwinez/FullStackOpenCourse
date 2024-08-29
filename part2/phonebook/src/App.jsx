import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(()=> {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
        console.log(persons)
      })
  }, [])

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterNumbers = (event) => {
    let filteredList = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredPersons(filteredList)
  }

  const handleClick = (event) => {
    event.preventDefault()

    if (!persons.find(person => person.name === newName || person.number === newNumber)) {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      const newList = persons.concat(newPerson)

      setPersons(newList)
      setFilteredPersons(newList)
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} or ${newNumber} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterFunction={filterNumbers}/>
      <h2>add a new number</h2>
      <Form newName={newName} newNumber={newNumber} handleChange={handleChange} handleNumberChange={handleNumberChange} handleClick={handleClick}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App