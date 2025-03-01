import "../styles/main.scss";

interface Event {
  id: number;
  title: string;
  date: string;
  reminder: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  newEvent: Event;
  setNewEvent: (event: Event) => void;
  isEditing: boolean;
  handleSaveEvent: () => void;
  handleDeleteEvent: () => void;
}

const EventModal = ({
  isOpen,
  onClose,
  selectedDate,
  newEvent,
  setNewEvent,
  isEditing,
  handleSaveEvent,
  handleDeleteEvent,
}: EventModalProps) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <h3>{selectedDate} 일정</h3>
        <input
          type="text"
          placeholder="일정 제목"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="time"
          value={newEvent.reminder}
          onChange={(e) =>
            setNewEvent({ ...newEvent, reminder: e.target.value })
          }
        />
        <button className="save-button" onClick={handleSaveEvent}>
          {isEditing ? "수정" : "저장"}
        </button>
        {isEditing && (
          <button className="delete-button" onClick={handleDeleteEvent}>
            삭제
          </button>
        )}
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </>
  );
};

export default EventModal;
