# AI Chatbot Frontend

이 프로젝트는 3인의 프론트엔드 개발자가 협업하기 위해 구축된 React + TypeScript + Vite 기반의 레포지토리입니다.

## 🚀 시작하기 (Getting Started)

이 레포지토리를 클론하고 로컬 서버를 실행하는 방법입니다.

```bash
# 1. 레포지토리 클론
git clone https://github.com/Eoong2/Ai_Chatbot.git

# 2. 프로젝트 폴더로 이동
cd Ai_Chatbot/chatbot-client

# 3. 의존성 패키지 설치
npm install

# 4. 개발 서버 실행
npm run dev
```

## 📂 폴더 구조 (Folder Structure)

협업을 위해 다음과 같이 `src` 내부에 폴더를 분리하여 관리합니다.

- `src/components/`: 여러 곳에서 재사용되는 공통 UI 컴포넌트
- `src/pages/` : 라우팅되는 각 화면(페이지) 단위 컴포넌트
- `src/hooks/`: 커스텀 React 훅 (Custom Hooks)
- `src/services/`: 백엔드 API 연동을 위한 함수 및 로직
- `src/store/`: 전역 상태 관리
- `src/utils/`: 공통으로 사용되는 헬퍼 함수 및 유틸리티
- `src/types/`: 전역으로 사용되는 TypeScript 인터페이스 및 타입 정의

## 💅 코드 포맷팅 (Prettier)

코드 스타일(들여쓰기, 따옴표 등) 차이로 인한 병합 충돌(Merge Conflict)을 방지하기 위해 Prettier가 설정되어 있습니다.

코드를 작성하신 후, 터미널에서 아래 명령어를 실행하면 코드가 자동으로 깔끔하게 정렬됩니다.
(또는 VS Code 등 에디터의 'Format on Save' 기능을 활성화하시면 더 편리합니다.)

```bash
npm run format
```

- 상세 포맷팅 설정은 최상단의 `.prettierrc` 파일에 정의되어 있습니다.

## 🛠️ 기능 구현 현황 (Implementation Status)

프론트엔드 UI 작업을 바로 시작할 수 있도록 핵심 로직들이 미리 구현되어 있습니다.

### 1. `useChat` 커스텀 훅
- 경로: `src/hooks/useChat.ts`
- 역할: 채팅 메시지 배열 관리, 상태 업데이트, 백엔드 데이터 요청
- 사용법: 컴포넌트 내에서 `const { messages, isLoading, sendMessage } = useChat();`를 호출하여 사용합니다.

### 2. 가짜 데이터 (Mock Data) 연동
- 백엔드 API가 완성되기 전까지 프론트엔드 작업을 원활히 진행하기 위해 가짜 데이터를 연동해 두었습니다.
- `useChat`에서 메시지를 전송하면 2.5초 지연(로딩 스피너 테스트용) 후 `src/utils/dummyData.json` 데이터를 가져와 테이블 형태의 응답을 반환합니다.

### 3. API Proxy 설정
- 경로: `vite.config.ts`
- 로컬 환경에서 CORS 에러 없이 백엔드(`http://localhost:8080`)와 통신할 수 있도록 `/api` 경로에 대한 Proxy가 설정되어 있습니다.

## 🧪 기능 테스트 방법

현재 `src/App.tsx` 파일에 임시 테스트용 UI가 작성되어 있습니다. 개발 서버를 띄우고( `npm run dev` ), 화면 하단 입력창에 임의의 텍스트를 입력하면 가짜 데이터가 2.5초 뒤에 테이블 형태로 렌더링되는 과정을 테스트해 볼 수 있습니다! 

이제 이 뼈대를 바탕으로 실제 디자인된 `components` 및 `pages` 작업을 진행해 주시면 됩니다.
