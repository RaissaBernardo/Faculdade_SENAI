import React, { useState, useEffect } from 'react';
import './ContactForm.css';

function ContactForm({ onSave, contactToEdit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setPhone(contactToEdit.phone);
    } else {
      setName('');
      setPhone('');
    }
  }, [contactToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !phone) {
      alert('Por favor, preencha nome e telefone.');
      return;
    }
    
    onSave({
      id: contactToEdit ? contactToEdit.id : null,
      name,
      phone
    });
  };

  return (
    <div className="form-container">
      <h2>{contactToEdit ? 'Editar Contato' : 'Cadastrar Novo Contato'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do contato"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefone do contato"
            required
          />
        </div>
        <button type="submit" className="save-btn">Salvar</button>
      </form>
    </div>
  );
}

export default ContactForm;