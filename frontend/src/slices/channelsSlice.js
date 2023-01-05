import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsList: [],
  currentChannelId: 0,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels(state, {payload }){
      state.channelsList = payload;
    },
    addChannel(state, { payload }) {
      state.channelsList.push(payload);
    },
    removeChannel(state, { payload }) {
      const newChannelsList = state.channelsList.filter(({ id }) => id !== payload.id);
      state.channelsList = newChannelsList;
      state.currentChannelId = 0;
    },
    setCurrentChannelId(state, { payload }) {
      state.currentChannelId = payload;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;