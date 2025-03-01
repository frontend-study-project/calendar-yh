import { configureStore } from "@reduxjs/toolkit"; // Redux Toolkit에서 configureStore 가져오기
import calendarReducer from "../slices/calendarSlice"; // 캘린더 관련 리듀서를 가져오기

// Redux 스토어 생성
export const store = configureStore({
  reducer: {
    calendar: calendarReducer, // 'calendar' 상태를 관리하는 리듀서 등록
  },
});

export default store; // store를 외부에서 사용할 수 있도록 내보내기
