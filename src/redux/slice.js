import { createSlice } from '@reduxjs/toolkit';

import {
  getContactsThunk,
  addContactThunk,
  deleteContactThunk,
} from './operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const handlePending = state => {
  state.contacts.isLoading = true;
  state.contacts.error = null;
};

const handleRejected = (state, { error }) => {
  state.contacts.isLoading = false;
  state.contacts.error = error.message;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.pending, handlePending)
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(getContactsThunk.rejected, handleRejected)
      .addCase(addContactThunk.pending, handlePending)
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContactThunk.rejected, handleRejected)
      .addCase(deleteContactThunk.pending, handlePending)
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContactThunk.rejected, handleRejected);
  },
});

export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
