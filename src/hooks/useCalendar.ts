import { useState } from "react";

// 현재 월의 날짜 수를 가져오는 함수
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// 해당 월의 시작 요일을 가져오는 함수 (일요일: 0, 월요일: 1, ..., 토요일: 6)
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const useCalendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0 (1월) ~ 11 (12월)

  // 현재 월의 날짜 및 시작 요일 계산
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (month === 0) setYear((prev) => prev - 1);
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (month === 11) setYear((prev) => prev + 1);
  };

  // 오늘 날짜로 이동
  const goToToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  return {
    year,
    month,
    daysInMonth,
    firstDayOfMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  };
};

export default useCalendar;
