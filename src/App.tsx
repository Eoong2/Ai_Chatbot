import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AI_chat_page from './page/AI_chat_page';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AI_chat_page />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App