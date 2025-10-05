import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null,
  participants: [],
  status: 'idle', // 'idle' | 'connecting' | 'connected' | 'disconnected'
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload;
      state.status = 'connected';
    },
    updateParticipants: (state, action) => {
      state.participants = action.payload;
    },
    leaveRoom: (state) => {
      state.roomId = null;
      state.participants = [];
      state.status = 'disconnected';
    },
  },
});

export const { setRoomId, updateParticipants, leaveRoom } = roomSlice.actions;
export default roomSlice.reducer;