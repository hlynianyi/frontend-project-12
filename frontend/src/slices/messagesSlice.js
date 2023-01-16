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
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
      const allEntities = Object.values(state.entities);
      const deletedEntities = allEntities.filter((entity) => entity.channelId === payload.id);
      messagesAdapter.removeMany(state, deletedEntities);
    });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
