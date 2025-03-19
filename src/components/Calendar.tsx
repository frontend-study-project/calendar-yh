import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  updateEvent,
  removeEvent,
} from "../redux/slices/calendarSlice";
import "../styles/main.scss";
import useCalendar from "../hooks/useCalendar";
import EventSidebar from "./EventSidebar";
import EventModal from "./EventModal";

const Calendar = () => {
  const dispatch = useDispatch();
  const events = useSelector(
    (state: {
      calendar: {
        events: { id: number; title: string; date: string; reminder: string }[];
      };
    }) => state.calendar.events
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [today, setToday] = useState<string>("");
  const [newEvent, setNewEvent] = useState({
    id: 0,
    title: "",
    date: "",
    reminder: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    year,
    month,
    daysInMonth,
    firstDayOfMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  } = useCalendar();

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
    const event = events.find((event) => event.date === date);
    if (event) {
      setNewEvent(event);
      setIsEditing(true);
    } else {
      setNewEvent({ id: Date.now(), title: "", date, reminder: "" });
      setIsEditing(false);
    }
  };

  const handleSaveEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.reminder) {
      if (isEditing) {
        dispatch(updateEvent(newEvent));
      } else {
        dispatch(addEvent(newEvent));
      }
      setNewEvent({ id: 0, title: "", date: "", reminder: "" });
      setSelectedDate("");
      setIsModalOpen(false);
    }
  };

  const handleDeleteEvent = () => {
    dispatch(removeEvent(newEvent.id));
    setIsModalOpen(false);
  };

  // 오늘 버튼 클릭 시 오늘 날짜로 이동
  const handleGoToToday = () => {
    goToToday();

    const now = new Date();
    const todayString = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}`;
    setToday(todayString);
  };

  // 캘린더 훅 아래에 추가
  useEffect(() => {
    const now = new Date();
    const todayString = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}`;
    setToday(todayString);
  }, []);

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <div className="calendar-top">
          <button className="nav-button" onClick={goToPreviousMonth}>
            ◀
          </button>
          <h1>
            {year}.{(month + 1).toString().padStart(2, "0")}
          </h1>
          <button className="nav-button" onClick={goToNextMonth}>
            ▶
          </button>
        </div>
        {/* 오늘 버튼 추가 */}
        <div className="calendar-bottom">
          <button className="today-button" onClick={handleGoToToday}>
            오늘
          </button>
        </div>
      </header>

      <div className="calendar-body">
        {/* 사이드바를 `EventSidebar` 컴포넌트로 분리하여 사용 */}
        <EventSidebar events={events} onSelectDate={handleDateClick} />

        {/* 캘린더 그리드 */}
        <main className="calendar-main">
          <div className="calendar-grid">
            {/* 빈 공간 추가 (월의 시작 요일을 맞추기 위함) */}
            {[...Array(firstDayOfMonth)].map((_, i) => (
              <div key={`empty-${i}`} className="calendar-day empty"></div>
            ))}
            {/* 실제 날짜 렌더링 */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              return (
                <div
                  key={day}
                  className={`calendar-day ${
                    events.some(
                      (event) => event.date === `${year}-${month + 1}-${day}`
                    )
                      ? "has-event"
                      : ""
                  } ${
                    today === `${year}-${month + 1}-${day}`
                      ? "today-highlight"
                      : ""
                  }`}
                  onClick={() => handleDateClick(`${year}-${month + 1}-${day}`)}
                >
                  {day}
                  {events.some(
                    (event) => event.date === `${year}-${month + 1}-${day}`
                  ) && <span className="event-badge">📌</span>}
                </div>
              );
            })}
          </div>
        </main>
        {/* 모달 컴포넌트 사용 */}
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          isEditing={isEditing}
          handleSaveEvent={handleSaveEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>
    </div>
  );
};

export default Calendar;
