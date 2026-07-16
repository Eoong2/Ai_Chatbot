export interface DatasetResult {
  publicDataPk: string;
  title: string;
  institution: string;
  listType: string;
  format: string;
  description: string;
  url: string;
}

export interface ChatResponse {
  success: boolean;
  data: {
    answer: string;
    resultCount: number;
    results: DatasetResult[];
  };
  message: string | null;
}

// 화면에 그릴 말풍선 하나의 구조
export interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  datasets?: DatasetResult[];
}