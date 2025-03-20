import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../slices/calendarSlice";
import storage from "redux-persist/lib/storage"; // 기본: localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// 1. persist 설정
const persistConfig = {
  key: "root",
  storage,
};

// 2. 리듀서 결합
const rootReducer = combineReducers({
  calendar: calendarReducer,
});

// 3. persistReducer로 감싸기
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. store 생성
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// 5. persistStore 생성
export const persistor = persistStore(store);

// 6. 타입 export
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
