import { useState, useEffect } from 'react'

import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(()=> {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
        console.log(response)
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
    const findPerson = persons.find(person => person.name === newName)

    if (!findPerson) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }
      
      phonebookService
        .addNew(newPerson)
        .then(response => console.log(response))

      const newList = persons.concat(newPerson)
      setPersons(newList)
      setFilteredPersons(newList)
      setNewName('')
      setNewNumber('')
    } else if (findPerson.number !== newNumber) {
      if (window.confirm(`${findPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const newList = persons.map(person => {
          if (person.id === findPerson.id) {
            const updatedPerson = { ...person, number: newNumber}
            phonebookService.updateNumber(updatedPerson.id, updatedPerson).then(response => console.log(response)) 
            return updatedPerson
          } else {
            return person
          }
        })
        setPersons(newList)
        setFilteredPersons(newList)

               
      }
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const deleteNumber = (id) => {
    const deletedPerson = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      phonebookService
      .deleteNumber(id)
      .then(response => console.log(response))

    const updatedList = persons.filter(person => person.id !== id)
    setPersons(updatedList)
    setFilteredPersons(updatedList)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterFunction={filterNumbers}/>
      <h2>add a new number</h2>
      <Form newName={newName} newNumber={newNumber} handleChange={handleChange} handleNumberChange={handleNumberChange} handleClick={handleClick}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deleteNumber={deleteNumber}/>
    </div>
  )
}

export default App