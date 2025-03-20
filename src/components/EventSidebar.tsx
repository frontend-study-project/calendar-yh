import "../styles/main.scss";
import { Event } from "../types/event";

interface EventSidebarProps {
  events: Event[];
  onSelectDate: (date: string) => void;
  year: number;
  month: number; // 0~11
}

// 날짜 기준으로 그룹화된 이벤트 객체를 반환
const groupEventsByDate = (events: Event[]) => {
  const grouped: { [date: string]: Event[] } = {};

  events.forEach((event) => {
    if (!grouped[event.date]) {
      grouped[event.date] = [];
    }
    grouped[event.date].push(event);
  });

  return grouped;
};

const EventSidebar = ({
  events,
  onSelectDate,
  year,
  month,
}: EventSidebarProps) => {
  const groupedEvents = groupEventsByDate(events);

  // 오늘 날짜 구하기
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // 현재 보고 있는 달에 속한 날짜만 필터링
  const filteredDates = Object.keys(groupedEvents)
    .filter((dateStr) => {
      const [eventYear, eventMonth] = dateStr.split("-").map(Number);
      return eventYear === year && eventMonth === month + 1;
    })
    .sort();

  return (
    <aside className="calendar-sidebar">
      <h2>이번 달 일정</h2>
      {filteredDates.length === 0 ? (
        <p>일정이 없습니다.</p>
      ) : (
        <ul className="event-list">
          {filteredDates.map((date) => (
            <li
              key={date}
              className={`event-date-group ${
                date === todayString ? "today-highlight" : ""
              }`}
            >
              <strong className="event-date" onClick={() => onSelectDate(date)}>
                📅 {date} {date === todayString && <span>(오늘)</span>}
              </strong>
              <ul className="event-sublist">
                {groupedEvents[date]
                  .sort((a, b) => a.reminder.localeCompare(b.reminder))
                  .map((event) => (
                    <li
                      key={event.id}
                      className="event-item"
                      onClick={() => onSelectDate(event.date)}
                    >
                      ⏰ {event.reminder} - {event.title}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default EventSidebar;
