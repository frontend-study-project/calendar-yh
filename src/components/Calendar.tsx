import { useState } from "react";
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
  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <h1>
          {year}.{(month + 1).toString().padStart(2, "0")}
        </h1>
        <div className="calendar-controls">
          <button className="nav-button" onClick={goToPreviousMonth}>
            ◀
          </button>
          <button className="nav-button" onClick={goToNextMonth}>
            ▶
          </button>
          <button className="today-button" onClick={goToToday}>
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
