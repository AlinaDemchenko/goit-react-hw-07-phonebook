import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "services/api";

export const getContactsThunk = createAsyncThunk("contacts/fetchAll", () => fetchContacts());

export const addContactThunk = createAsyncThunk("contacts/addContact", (contact) => addContact(contact));

export const deleteContactThunk = createAsyncThunk("contacts/deleteContact", (id) => deleteContact(id));




