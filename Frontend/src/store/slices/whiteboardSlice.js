import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  color: '#FFFFFF',
  lineWidth: 3,
  events: [],
};

const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    setToolColor: (state, action) => {
      state.color = action.payload;
    },
    setLineWidth: (state, action) => {
      state.lineWidth = action.payload;
    },
    addDrawEvent: (state, action) => {
      state.events.push(action.payload);
    },
    clearBoard: (state) => {
      state.events = [];
    },
  },
});

export const { setToolColor, setLineWidth, addDrawEvent, clearBoard } = whiteboardSlice.actions;
export default whiteboardSlice.reducer;