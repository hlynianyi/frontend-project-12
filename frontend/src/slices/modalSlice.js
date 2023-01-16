import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  action: null,
  handledChannelId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setAction(state, { payload }) {
      state.action = payload;
    },
    setHandledChannelId(state, { payload }) {
      state.handledChannelId = payload;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
