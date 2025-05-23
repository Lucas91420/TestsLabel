import React, { useEffect, useState } from 'react';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';

function App() {
  const [users, setUsers] = useState<string[]>([]);

  // Chargement initial des utilisateurs (si back disponible)
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error('Erreur de chargement des utilisateurs', err));
  }, []);

  const handleUserCreated = async (name: string) => {
    try {
      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setUsers([...users, name]);
      } else {
        console.error('Erreur lors de la création');
      }
    } catch (err) {
      console.error('Erreur réseau', err);
    }
  };

  return (
    <div>
      <h1>Utilisateurs</h1>
      <UserForm onCreated={handleUserCreated} />
      <ul role="list">
        {users.map((user, index) => (
          <li key={index} role="listitem">{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
