import { useState, useEffect } from 'react';
import { fetchChatAnswer } from '../services/chatService';
import { FiSend } from 'react-icons/fi';
import { DataSidebar } from '../components/DataSidebar';

const RECOMMENDATIONS = [
  { text: '부산에서 책 읽기 좋은 조용한 도서관 알려줘', icon: '📚' },
  { text: '부산 갈맷길 걷기 좋은 코스 추천해줘', icon: '🥾' },
  { text: '부산 시내 재개발 구역 데이터 알려줘', icon: '🏗️' },
  { text: '관광객들을 위한 부산관광명소 알려줘', icon: '🎡' },
  { text: '부산 맛집정보 알려줘', icon: '🍜' },
  { text: '부산에서 개최되는 축제 알려줘', icon: '🎉' },
  { text: '지역화폐(동백전) 가맹점 현황 알려줘', icon: '💳' },
  { text: '부산 시내버스 실시간 교통 정보 알려줘', icon: '🚌' }
];

const AI_chat_page = () => {
  const [randomItems, setRandomItems] = useState<{ text: string; icon: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [chatResponse, setChatResponse] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<{ query: string; response: any }[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const getRandomItems = () => {
    const shuffled = [...RECOMMENDATIONS].sort(() => 0.5 - Math.random());
    setRandomItems(shuffled.slice(0, 3));
  };

  useEffect(() => {
    getRandomItems();
  }, []);

  const handleSend = async (query?: string) => {
    const textToSearch = query || inputValue;
    if (!textToSearch.trim()) return;

    setIsStarted(true);
    setInputValue("");

    const response = await fetchChatAnswer(textToSearch);

    // 이전 대화 기록을 보존하며 새 대화 추가
    setChatHistory(prev => [...prev, { query: textToSearch, response }]);
    setChatResponse(response); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex p-4 gap-4">
      {/* 왼쪽 사이드바 */}
      <aside className="w-64 bg-white p-6 rounded-lg border border-gray-200 flex flex-col justify-between">
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-[#1b3b6f] text-white py-3 rounded-lg font-bold hover:bg-[#143057] transition"
        >
          + 새로운 대화 시작하기
        </button>
        <div className="text-center text-sm text-gray-600">
          <p>로그인 하시면</p>
          <p>대화 기록이 저장되고</p>
          <p>언제든 다시 보실 수 있어요!</p>
          <button
            onClick={() => {
              const url = "https://www.busan.go.kr/rest/v1/auth?clientId=UIJm17liHPVXBeYJ98frB1WPkK6sXpCOHSnn8r8o0dc.wwwbusangokr&callbackUrl=https://data.busan.go.kr/bdip/unifiedLogin.do";
              window.open(url, "LoginPopup", "width=500,height=600,scrollbars=yes");
            }}
            className="mt-4 border border-gray-300 px-8 py-2 rounded hover:bg-gray-100 transition"
          >
            로그인
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">
        {!isStarted ? (
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-2xl font-bold mb-4">안녕하세요. <span className="text-[#2a5da5]">공공데이터챗봇</span>입니다.</h1>
            <p className="text-gray-600 mb-5 font-semibold text-center">
              이 챗봇은 <span className="text-[#2a5da5]">부산시가 공개한 공공데이터</span>를 일상언어로 대화하듯 검색 할 수 있는 서비스입니다.</p>
            <p className="text-[#c82360] text-center mb-5">
              ※ 날씨, 일반상식, 사적인 질문 등 개방된 공공데이터와 관련 없는 질문에는 정확한 답변이 어려울 수 있습니다.</p>



            <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
              {randomItems.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleSend(item.text)}
                  className="bg-slate-100 p-6 rounded-3xl border border-transparent hover:border-[#2a5da5] hover:bg-white transition-all shadow-sm cursor-pointer flex flex-col justify-between h-40"
                >
                  {/* 텍스트 영역 */}
                  <div>
                    <p className="text-lg font-bold text-gray-800 leading-tight">{item.text}</p>
                  </div>

                  {/* 아이콘 및 화살표 영역 */}
                  <div className="flex justify-between items-end">
                    <span className="text-4xl">{item.icon}</span>
                    <span className="text-gray-400">→</span>
                  </div>
                </div>
              ))}

            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl mx-auto space-y-6 flex-1">
            {chatHistory.map((chat, idx) => (
              <div key={idx} className="space-y-4">
                <div className="text-right">
                  <span className="bg-[#1b3b6f] text-white px-4 py-2 rounded-2xl inline-block">{chat.query}</span>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-gray-700">{chat.response?.data?.message || "답변에 필요한 데이터를 찾고 있습니다."}</p>
                  <br />
                  <p className="text-gray-700">각 데이터는 화면 오른쪽의 데이터셋 목록에서 더 자세히 알아볼 수 있습니다.</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 하단 입력창 */}
        <div className="w-full max-w-2xl mx-auto mt-8 bg-white border border-gray-200 rounded-full flex items-center p-2 shadow-sm">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="찾고 싶은 부산시 공공데이터를 입력해 주세요"
            className="flex-1 px-4 py-2 outline-none bg-transparent"
          />
          <button
            onClick={() => handleSend()}
            className="bg-[#1b3b6f] text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#143057] transition-all"
          >
            <FiSend />
          </button>
        </div>
      </main>

      {/* 오른쪽 추천 질문 영역 */}
      <DataSidebar apiResponse={chatResponse} />
    </div>
  );
};

export default AI_chat_page;