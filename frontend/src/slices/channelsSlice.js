/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsList: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels(state, { payload }) {
      state.channelsList = payload;
    },
    addChannel(state, { payload }) {
      state.channelsList.push(payload);
    },
    renameChannel(state, { payload }) {
      const channel = state.channelsList.find(({ id }) => id === payload.id);
      channel.name = payload.name;
    },
    removeChannel(state, { payload }) {
      const newChannelsList = state.channelsList.filter(({ id }) => id !== payload.id);
      state.channelsList = newChannelsList;
      state.currentChannelId = 1;
    },
    setCurrentChannelId(state, { payload }) {
      state.currentChannelId = payload;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
