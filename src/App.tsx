import { useState } from 'react';
import { useChat } from './hooks/useChat';
import './App.css';

function App() {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText(''); // 전송 후 입력창 초기화
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🤖 기능 테스트 화면</h2>
      
      {/* 대화 내역 표시 영역 */}
      <div 
        style={{ 
          border: '1px solid #ccc', 
          borderRadius: '8px',
          padding: '15px', 
          height: '400px', 
          overflowY: 'auto',
          marginBottom: '20px',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        {messages.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', marginTop: 'auto', marginBottom: 'auto' }}>
            대화 내역이 없습니다. 메시지를 입력해 보세요!
          </p>
        )}
        
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            style={{ 
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%'
            }}
          >
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
              {msg.sender === 'user' ? '👤 사용자' : '🤖 챗봇'}
            </div>
            
            <div 
              style={{ 
                background: msg.sender === 'user' ? '#007bff' : '#f1f3f5', 
                color: msg.sender === 'user' ? '#fff' : '#000',
                padding: '12px 16px', 
                borderRadius: '16px',
                borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
                borderTopLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                wordBreak: 'break-word',
              }}
            >
              <p style={{ margin: 0, lineHeight: '1.4' }}>{msg.text}</p>
              
              {/* 테이블 데이터 렌더링 (가짜 데이터 확인용) */}
              {msg.type === 'TABLE' && msg.tableData && (
                <div style={{ marginTop: '12px', background: '#fff', color: '#333', padding: '10px', borderRadius: '8px', fontSize: '12px', border: '1px solid #ddd' }}>
                  <strong style={{ display: 'block', marginBottom: '8px' }}>📊 표 데이터 수신됨:</strong>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr>
                          {msg.tableData.columns.map((col, idx) => (
                            <th key={idx} style={{ borderBottom: '2px solid #eee', padding: '4px 8px' }}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {msg.tableData.items.map((row, rowIdx) => (
                          <tr key={rowIdx}>
                            {msg.tableData!.columns.map((col, colIdx) => (
                              <td key={colIdx} style={{ borderBottom: '1px solid #eee', padding: '4px 8px' }}>
                                {row[col]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* 로딩 표시기 */}
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>🤖 챗봇</div>
            <div style={{ background: '#f1f3f5', padding: '12px 16px', borderRadius: '16px', borderTopLeftRadius: '4px', display: 'inline-block' }}>
              <p style={{ margin: 0, color: '#666', fontStyle: 'italic' }}>답변을 기다리는 중... (2.5초 지연)</p>
            </div>
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            // 한글 입력 중 엔터 눌림(이중 입력) 방지
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              handleSend();
            }
          }}
          placeholder={isLoading ? "답변을 기다리는 중입니다..." : "메시지를 입력하세요..."}
          style={{ 
            flex: 1, 
            padding: '12px 16px', 
            borderRadius: '8px', 
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '15px'
          }}
          disabled={isLoading}
        />
        <button 
          onClick={handleSend} 
          disabled={isLoading || !inputText.trim()}
          style={{ 
            padding: '0 20px', 
            borderRadius: '8px', 
            border: 'none',
            background: isLoading || !inputText.trim() ? '#ccc' : '#007bff',
            color: '#fff',
            fontWeight: 'bold',
            cursor: isLoading || !inputText.trim() ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s'
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default App;
