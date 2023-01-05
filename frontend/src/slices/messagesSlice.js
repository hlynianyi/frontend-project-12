import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';


const messagesAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    //
  }
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages)
export const { actions } = channelsSlice;
export default channelsSlice.reducer;