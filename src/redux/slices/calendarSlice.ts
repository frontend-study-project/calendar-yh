import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../../types/event';

// 초기 상태 타입 정의
interface CalendarState {
  events: Event[];
}

// 초기 상태
const initialState: CalendarState = {
  events: [],
};

// Slice 생성
const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    removeEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
  },
});

// 액션과 리듀서 내보내기
export const { addEvent, updateEvent, removeEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
