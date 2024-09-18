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

  // get all data from server once
  useEffect(()=> {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  // Display alert box about an action
  const alertBox = (content, success) => {
    setNotificationMessage(content)
    setNotificationSuccessful(success)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000) 
  }

  // Handle NAME change in form input
  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  // Handle NUMBER change in form input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // Filter and display only searched names
  const filterNumbers = (event) => {
    let filteredList = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredPersons(filteredList)
  }

  // Handle button for adding new people
  const handleClick = (event) => {
    event.preventDefault()

    //check if person exists
    const findPerson = persons.find(person => person.name === newName)
    if (!findPerson) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      
      // add new person
      phonebookService
        .addNew(newPerson)
        .then(response => {
          newPerson.id = response.data.id
          const newList = persons.concat(newPerson)
          setPersons(newList)
          setFilteredPersons(newList)
          setNewName('')
          setNewNumber('')
          alertBox(`Added ${newName}`, true)
        })
        .catch(error => {
          alertBox(error.response.data.error, false)
        })   

    // if person exists check if number differs
    } else if (findPerson.number !== newNumber) {
      if (window.confirm(`${findPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        let newList = persons

        // find and update number for existing person
        let updatedPerson = newList.find(person => person.id === findPerson.id)
        updatedPerson.number = newNumber
        phonebookService
          .updateNumber(updatedPerson.id, updatedPerson)
          .then(response => {
            alertBox(`Successfully changed number for ${updatedPerson.name}`, true)
          })
          .catch(error => {
            alertBox(`Information of ${updatedPerson.name} has already been removed from server`, false)
          }) 
        setPersons(newList)      
      }
    } else {
      alertBox(`${newName} is already added to phonebook`, false)
    }
    
  }


  // function for deleting a person
  const deleteNumber = (id) => {
    const deletedPerson = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      phonebookService
      .deleteNumber(id)
      .then(response => console.log(response))
      .catch(error => {
        alertBox(`Information of ${deletedPerson.name} has already been removed from server`, false)
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