import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, setFilter } from 'redux/Slice';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import Filter from './Filter/Filter';

export function App() {
  const contacts = useSelector(state => state.contacts);
  const filterValue = useSelector(state => state.filter);
  
  const dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const onAddContact = contactData => {
    const checkedContact = contacts.find(
      contact => contactData.name === contact.name
    );
    if (checkedContact) {
      alert(`${contactData.name} is already in contacts`);
      return;
    } else {
      dispatch(addContact(contactData));
    }
  };

  const onFilter = filterData => {
   dispatch(setFilter(filterData));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name
      .toLowerCase()
      .includes(filterValue.toLowerCase().trim()));

  return (
    <Section>
      <h1>
        <span>☎︎ </span>Phonebook
      </h1>
      <Form onAddContact={onAddContact} />
      <h2>Contacts</h2>
      <Filter onFilter={onFilter} filter={filterValue} />
      {contacts.length > 0 && (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={onDeleteContact}
        />
      )}
    </Section>
  );
}
