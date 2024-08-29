const Persons = ({ filteredPersons, deleteNumber }) => {
    return (
        <div>
            {filteredPersons.map(person => 
                <div key={person.name}>
                    {person.name} {person.number} <button onClick={() => deleteNumber(person.id)}>delete</button>
                </div>
            )}
        </div>
    )
}

export default Persons