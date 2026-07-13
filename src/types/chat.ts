// 백엔드에서 받을 표 데이터의 한 줄(Row)
export interface TableItem {
  [key: string]: string | number;
}

// 백엔드 응답 전체 구조 (제안한 규격 기준)
export interface ChatResponse {
  resultCode: number;
  resultMessage: string;
  data: {
    dataType: 'TEXT' | 'TABLE';
    message: string;
    columns?: string[];
    items?: TableItem[];
  };
}

// 화면에 그릴 말풍선 하나의 구조
export interface Message {
  id: number;
  sender: 'user' | 'bot';
  type: 'TEXT' | 'TABLE';
  text: string;
  tableData?: {
    columns: string[];
    items: TableItem[];
  };
}