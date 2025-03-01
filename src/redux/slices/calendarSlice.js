import { createSlice } from "@reduxjs/toolkit"; // Redux Toolkit에서 createSlice 가져오기

// 캘린더의 초기 상태 정의
const initialState = {
  events: [], // 이벤트 목록을 저장할 배열
};

// Redux Slice 생성
const calendarSlice = createSlice({
  name: "calendar", // Slice의 이름
  initialState, // 초기 상태
  reducers: {
    // 새로운 이벤트 추가
    addEvent: (state, action) => {
      state.events.push(action.payload); // 전달된 payload를 events 배열에 추가
    },

    // 기존 이벤트 업데이트
    updateEvent: (state, action) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      ); // 업데이트할 이벤트 찾기
      if (index !== -1) {
        state.events[index] = action.payload; // 해당 인덱스의 이벤트 업데이트
      }
    },

    // 이벤트 제거
    removeEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      ); // 주어진 ID의 이벤트 제거
    },
  },
});

// 액션 및 리듀서 내보내기
export const { addEvent, updateEvent, removeEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
