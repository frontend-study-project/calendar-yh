import "../styles/main.scss";
import { Event } from "../types/event";
import { useState } from "react";

// Props 타입 정의 - 여러 일정 관리
interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedEvents: Event[]; // 여러 개의 이벤트 배열
  setSelectedEvents: (events: Event[]) => void;
  handleSaveAllEvents: () => void; // 전체 저장
  handleDeleteEvent: (id: number) => void; // ✅ 특정 id 삭제
}

const EventModal = ({
  isOpen,
  onClose,
  selectedDate,
  selectedEvents,
  setSelectedEvents,
  handleSaveAllEvents,
  handleDeleteEvent,
}: EventModalProps) => {
  const [error, setError] = useState("");

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  // 새 일정 추가 버튼 클릭
  const handleAddEvent = () => {
    const newId = Date.now();
    const newEvent: Event = {
      id: newId,
      title: "",
      date: selectedDate,
      reminder: "",
    };
    setSelectedEvents([...selectedEvents, newEvent]);
  };

  // 입력값 변경 핸들러
  const handleChange = (
    id: number,
    field: "title" | "reminder",
    value: string
  ) => {
    const newEvents = selectedEvents.map((event) =>
      event.id === id ? { ...event, [field]: value } : event
    );
    setSelectedEvents(newEvents);
  };

  // 저장 (전체 저장) 버튼 클릭 시 유효성 검사 후 저장
  const handleSubmit = () => {
    const hasInvalid = selectedEvents.some(
      (event) => !event.title.trim() || !event.reminder
    );
    if (hasInvalid) {
      setError("모든 일정에 제목과 시간을 입력해주세요.");
      return;
    }

    setError(""); // 에러 초기화
    handleSaveAllEvents();
  };

  return (
    <>
      {/* 오버레이 클릭 시 모달 닫힘 */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* 모달 박스 */}
      <div className="modal">
        <h3>{selectedDate} </h3>

        {/* 여러 일정 렌더링 */}
        {selectedEvents.map((event) => (
          <div key={event.id} className="event-item">
            <input
              type="text"
              placeholder="일정 제목"
              value={event.title}
              onChange={(e) => handleChange(event.id, "title", e.target.value)}
            />
            <input
              type="time"
              value={event.reminder}
              onChange={(e) =>
                handleChange(event.id, "reminder", e.target.value)
              }
            />
            <button
              className="delete-button"
              onClick={() => handleDeleteEvent(event.id)}
            >
              삭제
            </button>
          </div>
        ))}

        {/* 새 일정 추가 버튼 */}
        <button className="add-button" onClick={handleAddEvent}>
          + 새 일정 추가
        </button>

        {/* 에러 메시지 */}
        {error && <p className="error-message">{error}</p>}

        {/* 전체 저장 및 닫기 버튼 */}
        <button className="save-button" onClick={handleSubmit}>
          전체 저장
        </button>
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </>
  );
};

export default EventModal;
