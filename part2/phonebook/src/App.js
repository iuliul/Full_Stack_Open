import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS for styling

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState(null); // State for notification

  useEffect(() => {
    axios.get('http://localhost:3000/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        axios.put(`http://localhost:3000/persons/${existingPerson.id}`, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id === existingPerson.id ? response.data : person));
            setNewName('');
            setNewNumber('');
            setNotification(`Updated number for ${response.data.name}`);
            setTimeout(() => {
              setNotification(null);
            }, 5000); // Clear the notification after 5 seconds
          })
          .catch(error => {
            console.error('Error updating person:', error);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      axios.post('http://localhost:3000/persons', newPerson)
        .then(response => {
          setPersons([...persons, response.data]);
          setNewName('');
          setNewNumber('');
          setNotification(`Added ${response.data.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000); // Clear the notification after 5 seconds
        })
        .catch(error => {
          console.error('Error adding person:', error);
        });
    }
  };

  const handleDelete = id => {
    const personToDelete = persons.find(person => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      axios.delete(`http://localhost:3000/persons/${id}`)
        .then(response => {
          if (response.status === 200) {
            setPersons(persons.filter(person => person.id !== id));
            setNotification(`Deleted ${personToDelete.name}`);
            setTimeout(() => {
              setNotification(null);
            }, 5000); // Clear the notification after 5 seconds
          }
        })
        .catch(error => {
          console.error('Error deleting person:', error);
        });
    }
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
      <h2>Numbers</h2>s
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} - {person.number}
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* Notification component */}
      <div className="notification">
        {notification}
      </div>
    </div>
  );
};

export default App;
