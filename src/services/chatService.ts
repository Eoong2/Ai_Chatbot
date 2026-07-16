import type { ChatResponse } from '../types/chat';

export const fetchChatAnswer = async (query: string): Promise<ChatResponse> => {
  // 실제 백엔드 API 호출
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  
  if (!response.ok) {
    throw new Error('서버 통신 에러');
  }
  return response.json();
};