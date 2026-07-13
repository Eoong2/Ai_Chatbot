import type { ChatResponse } from '../types/chat';
import dummyData from '../utils/dummyData.json';

export const fetchChatAnswer = async (_query: string): Promise<ChatResponse> => {
  // 백엔드가 아직 없으므로, 당분간은 dummyData.json을 가져오거나 setTimeout으로 가짜 응답을 반환하도록 작성합니다.
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyData as ChatResponse);
    }, 1000);
  });

  // 실제 API가 나오면 아래 주석 친 부분을 활성화합니다.
  /*
  const response = await fetch('/api/v1/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  
  if (!response.ok) {
    throw new Error('서버 통신 에러');
  }
  return response.json();
  */
};