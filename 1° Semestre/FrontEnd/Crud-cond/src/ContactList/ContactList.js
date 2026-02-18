import React from 'react';
import './ContactList.css';

function ContactList({ contacts, onEdit, onDelete }) {
  return (
    <div className="list-container">
      <h2>Lista de Contatos</h2>
      {contacts.length > 0 ? (
        <ul className="contact-list">
          {contacts.map(contact => (
            <li key={contact.id} className="contact-item">
              <div className="contact-info">
                <span className="contact-name">{contact.name}</span>
                <span className="contact-phone">{contact.phone}</span>
              </div>
              <div className="contact-actions">
                <button className="edit-btn" onClick={() => onEdit(contact)}>Alterar</button>
                <button className="delete-btn" onClick={() => onDelete(contact.id)}>Deletar</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-contacts">Nenhum contato cadastrado.</p>
      )}
    </div>
  );
}

export default ContactList;