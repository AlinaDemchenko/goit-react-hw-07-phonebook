import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/slice';
import { getContactsThunk, addContactThunk, deleteContactThunk } from 'redux/operations'; 
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import Filter from './Filter/Filter';
import Loader from './Loader/Loader';
import Notification from './Notification/Notification';

export function App() {
  const {items} = useSelector(state => state.contacts);
  const {isLoading} = useSelector(state => state.contacts);
  const filterValue = useSelector(state => state.filter);
  const error = useSelector(state => state.contacts.error);
 
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getContactsThunk())
//     .unwrap().catch((error)=>{
// toast.error(error.message);
    // })
  },[dispatch]);

  useEffect(()=>{
if(!error) return;
toast.error(error);
  }, [error])

  const onDeleteContact = id => {
    dispatch(deleteContactThunk(id));
  };

  const onAddContact = contactData => {
    const checkedContact = items.find(
      contact => contactData.name === contact.name
    );
    if (checkedContact) {
      toast.info(`${contactData.name} is already in your contacts`);
      return;
    } else {
      dispatch(addContactThunk(contactData));
    }
  };

  const onFilter = filterData => {
   dispatch(setFilter(filterData));
  };

  const filteredContacts = items.filter(contact =>
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
      {isLoading && <Loader/>}
      {items.length > 0 && !isLoading && (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={onDeleteContact}
        />
      )}
      <Notification/>
    </Section>
  );
}
