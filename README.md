# 📅 React Calendar (Redux Toolkit)

이 프로젝트는 **React + TypeScript + Vite + Redux Toolkit**을 사용하여 제작된 **캘린더(Calendar) 애플리케이션**입니다.  
사용자는 **일정을 등록, 수정, 삭제**할 수 있으며, Redux를 사용하여 전역 상태를 관리합니다.

---

## 📌 기술 스택
- ⚛️ **React** - UI 구성
- 🟦 **TypeScript** - 정적 타입 적용
- ⚡ **Vite** - 빠른 개발 환경 제공
- 🎯 **Redux Toolkit** - 일정 상태 관리
- 💅 **SCSS** - 스타일링

---

## 📌 주요 기능
✅ **일정 등록**: 사용자가 날짜를 선택하고 새로운 일정을 추가  
✅ **일정 수정**: 기존 일정을 클릭하여 내용 변경  
✅ **일정 삭제**: 선택한 일정을 삭제 가능  
✅ **월별 캘린더**: 월 단위로 일정 관리 및 탐색  

---

## 📌 프로젝트 구조

📂 src  
┣ 📂 components # UI 컴포넌트  
┃ ┣ 📜 Calendar.tsx # 캘린더 UI  
┃ ┣ 📜 EventForm.tsx # 일정 추가/수정 폼   
┃ ┣ 📜 EventSidebar.tsx # 일정 리스트 사이드 바    
┣ 📂 hooks # hooks 설정    
┣ 📂 redux # Redux 설정     
┃ ┣ 📂 slice # Redux slice 설정    
┃ ┣ 📂 store # Redux store 설정    
┣ 📂 types # TypeScript 타입 정의    
┃ ┗ 📜 event.ts # 일정 관련 타입 정의    
┣ 📜 App.tsx # 루트 컴포넌트     
┣ 📜 main.tsx # React 엔트리 포인트      
┗ 📜 index.css # 글로벌 스타일   
