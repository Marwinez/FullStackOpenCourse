import { useState, useEffect } from 'react'

import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationSuccessful, setNotificationSuccessful] = useState(true)

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
    let message = {
      content: "",
      successful: true
    }

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
      message.content = `Added ${newName}`
      message.successful = true
    } else if (findPerson.number !== newNumber) {
      if (window.confirm(`${findPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const newList = persons.map(person => {
          if (person.id === findPerson.id) {
            const updatedPerson = { ...person, number: newNumber}
            
            phonebookService
              .updateNumber(updatedPerson.id, updatedPerson)
              .then(response => console.log(response))
              .catch(error => {
                setNotificationMessage(`Information of ${updatedPerson.name} has already been removed from server`)
                setNotificationSuccessful(false)
              }) 
            
            message.content = `Successfully changed number for ${updatedPerson.name}`
            message.successful = true

            return updatedPerson
          } else {
            return person
          }
        })
        setPersons(newList)
        setFilteredPersons(newList)       
      }
    } else {
      message = {
        content: `${newName} is already added to phonebook`,
        successful: false
      }
    }
    setNotificationMessage(message.content)
    setNotificationSuccessful(message.successful)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000) 
  }

  const deleteNumber = (id) => {
    const deletedPerson = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      phonebookService
      .deleteNumber(id)
      .then(response => console.log(response))
      .catch(error => {
        setNotificationMessage(`Information of ${deletedPerson.name} has already been removed from server`)
        setNotificationSuccessful(false)
      })

      const updatedList = persons.filter(person => person.id !== id)
      setPersons(updatedList)
      setFilteredPersons(updatedList)

      setNotificationMessage(`Successfully deleted ${deletedPerson.name}`)
      setNotificationSuccessful(true)
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} successful={notificationSuccessful} />
      <Filter filterFunction={filterNumbers}/>
      <h2>add a new number</h2>
      <Form newName={newName} newNumber={newNumber} handleChange={handleChange} handleNumberChange={handleNumberChange} handleClick={handleClick}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deleteNumber={deleteNumber}/>
    </div>
  )
}

export default App