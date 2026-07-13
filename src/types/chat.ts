// 백엔드에서 받을 표 데이터의 한 줄(Row)
export interface TableItem {
  [key: string]: string | number;
}

// 백엔드 응답 전체 구조 (서울데이터허브 벤치마킹 기준)
export interface SourceData {
  title: string;
  datasetId: string; // 전체 URL 대신 고유 ID만 전달받음
}

export interface ChatResponse {
  answer_script: string;
  source_data: SourceData[];
  recommended_questions: string[];
}

// 화면에 그릴 말풍선 하나의 구조
export interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;           // 사용자 질문 또는 챗봇의 answer_script
  sourceData?: SourceData[]; // 챗봇 응답일 경우 우측 패널에 띄울 출처 데이터
  recommendedQuestions?: string[]; // 챗봇 응답일 경우 띄울 추천 질문
}