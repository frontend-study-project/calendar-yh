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
import { Event } from "../types/event";

const Calendar = () => {
  const dispatch = useDispatch();
  const events = useSelector(
    (state: {
      calendar: {
        events: Event[];
      };
    }) => state.calendar.events
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [today, setToday] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const {
    year,
    month,
    daysInMonth,
    firstDayOfMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  } = useCalendar();

  // 날짜 포맷 함수
  const formatDate = (y: number, m: number, d: number) => {
    const mm = (m + 1).toString().padStart(2, "0");
    const dd = d.toString().padStart(2, "0");
    return `${y}-${mm}-${dd}`;
  };

  const handleDateClick = (date: string) => {
    const eventsOnDate = events.filter((event) => event.date === date);
    setSelectedDate(date);
    setSelectedEvents(eventsOnDate);
    setIsModalOpen(true);
  };

  const handleSaveAllEvents = () => {
    selectedEvents.forEach((event) => {
      if (!event.title || !event.reminder) return;

      const isExisting = events.some((ev) => ev.id === event.id);
      if (isExisting) {
        dispatch(updateEvent(event));
      } else {
        dispatch(addEvent(event));
      }
    });
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: number) => {
    dispatch(removeEvent(id));
    setSelectedEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const handleGoToToday = () => {
    goToToday();
    const now = new Date();
    const todayString = formatDate(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    setToday(todayString);
  };

  // 초기 today 상태 설정
  useEffect(() => {
    const now = new Date();
    const todayString = formatDate(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
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
        <div className="calendar-bottom">
          <button className="today-button" onClick={handleGoToToday}>
            오늘
          </button>
        </div>
      </header>

      <div className="calendar-body">
        <EventSidebar events={events} onSelectDate={handleDateClick} />

        <main className="calendar-main">
          <div className="calendar-grid">
            {[...Array(firstDayOfMonth)].map((_, i) => (
              <div key={`empty-${i}`} className="calendar-day empty"></div>
            ))}

            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const formattedDate = formatDate(year, month, day);
              const hasEvent = events.some(
                (event) => event.date === formattedDate
              );
              const isToday = today === formattedDate;

              return (
                <div
                  key={day}
                  className={`calendar-day ${hasEvent ? "has-event" : ""} ${
                    isToday ? "today-highlight" : ""
                  }`}
                  onClick={() => handleDateClick(formattedDate)}
                >
                  <span>{day}</span>
                  {isToday && <div className="today-label">오늘</div>}
                  {hasEvent && <span className="event-badge">📌</span>}
                </div>
              );
            })}
          </div>
        </main>

        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate}
          selectedEvents={selectedEvents}
          setSelectedEvents={setSelectedEvents}
          handleSaveAllEvents={handleSaveAllEvents}
          handleDeleteEvent={handleDeleteEvent}
        />
      </div>
    </div>
  );
};

export default Calendar;
