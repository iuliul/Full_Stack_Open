import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhonebookApp = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    axios.post('http://localhost:3000/persons', newPerson)
      .then(response => {
        setPersons([...persons, response.data]);
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('Error adding person:', error);
      });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>{person.name} - {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default PhonebookApp;
