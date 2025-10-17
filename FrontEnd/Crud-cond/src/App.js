import React, { useState } from "react";
import './App.css';

// Importa os componentes
import Login from './Login/Login';
import Menu from "./Menu/Menu";
import Welcome from "./Welcome/Welcome";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState('welcome');
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Tatiana Silva', phone: '1621068702' },
    { id: 2, name: 'Graziela Carozelli', phone: '1621068713' }
  ]);
  const [contactToEdit, setContactToEdit] = useState(null);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === '123') {
      setIsLoggedIn(true);
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  const handleSaveContact = (contact) => {
    if (contact.id) {
      setContacts(contacts.map(c => (c.id === contact.id ? contact : c)));
    } else {
      const newContact = { ...contact, id: Date.now() }; 
      setContacts([...contacts, newContact]);
    }
    setContactToEdit(null);
    setActiveScreen('list');
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const startEdit = (contact) => {
    setContactToEdit(contact);
    setActiveScreen('form');
  };

  const showCreateForm = () => {
    setContactToEdit(null);
    setActiveScreen('form');
  };

  const handleNavigate = (screen) => {
    setActiveScreen(screen);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container"> 
      <Menu onNavigate={handleNavigate} onCreate={showCreateForm} />
      <main className='content'>
        {activeScreen === 'welcome' && <Welcome />}
        {activeScreen === 'list' && (
          <ContactList
            contacts={contacts}
            onEdit={startEdit}
            onDelete={handleDeleteContact}
          />
        )}
        {activeScreen === 'form' && (
          <ContactForm
            contactToEdit={contactToEdit}
            onSave={handleSaveContact}
          />
        )}
      </main>
    </div>
  );
}

export default App;