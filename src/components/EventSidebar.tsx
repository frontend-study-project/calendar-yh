import '../styles/main.scss';
import { Event } from '../types/event';

interface EventSidebarProps {
  events: Event[];
  onSelectDate: (date: string) => void;
}

const EventSidebar = ({ events, onSelectDate }: EventSidebarProps) => {
  return (
    <aside className="calendar-sidebar">
      <h2>이번 달 일정</h2>
      {events.length === 0 ? (
        <p>일정이 없습니다.</p>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li
              key={event.id}
              className="event-item"
              onClick={() => onSelectDate(event.date)}
            >
              {event.title} ({event.date})
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default EventSidebar;
