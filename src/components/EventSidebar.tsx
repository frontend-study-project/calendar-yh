import "../styles/main.scss";
import { Event } from "../types/event";

interface EventSidebarProps {
  events: Event[];
  onSelectDate: (date: string) => void;
}

// 날짜 기준으로 그룹화된 이벤트 객체를 반환하는 함수
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

const EventSidebar = ({ events, onSelectDate }: EventSidebarProps) => {
  // 날짜별로 정렬
  const groupedEvents = groupEventsByDate(events);
  const sortedDates = Object.keys(groupedEvents).sort();

  return (
    <aside className="calendar-sidebar">
      <h2>이번 달 일정</h2>
      {events.length === 0 ? (
        <p>일정이 없습니다.</p>
      ) : (
        <ul className="event-list">
          {sortedDates.map((date) => (
            <li key={date} className="event-date-group">
              <strong className="event-date" onClick={() => onSelectDate(date)}>
                📅 {date}
              </strong>
              <ul className="event-sublist">
                {groupedEvents[date].map((event) => (
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
