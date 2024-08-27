import { useState } from 'react'

import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

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