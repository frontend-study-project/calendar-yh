import "../styles/main.scss";
import { Event } from "../types/event";

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

import { useState } from "react";

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
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!newEvent.title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }
    if (!newEvent.reminder) {
      setError("시간을 선택해주세요.");
      return;
    }

    // 유효성 검사 통과
    setError(""); // 에러 초기화
    handleSaveEvent();
  };

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

        {error && <p className="error-message">{error}</p>}

        <button className="save-button" onClick={handleSubmit}>
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
