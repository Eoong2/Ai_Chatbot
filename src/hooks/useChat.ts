import { useState } from 'react';
import type { Message } from '../types/chat';
import { fetchChatAnswer } from '../services/chatService';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (inputText: string) => {
    if (!inputText.trim()) return;

    // 1. 사용자 메시지 추가 및 로딩 켜기 로직
    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      type: 'TEXT',
      text: inputText,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 2. chatService.ts의 fetchChatAnswer(inputText) 호출 (또는 가짜 데이터 로직)
      const response = await fetchChatAnswer(inputText);

      // 3. 응답 결과(bot 메시지)를 messages 상태에 추가 및 로딩 끄기
      const botMessage: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        type: response.data.dataType,
        text: response.data.message,
        tableData: response.data.dataType === 'TABLE' ? {
          columns: response.data.columns || [],
          items: response.data.items || []
        } : undefined
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('채팅 응답 에러:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        type: 'TEXT',
        text: '서버 통신 중 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
