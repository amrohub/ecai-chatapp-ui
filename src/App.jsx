import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/chatpage/Chatpage';
import New from './pages/chatpage/New';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          {/* Redirect root to chatpage */}
          <Route path="/" element={<Navigate to="/chatpage" replace />} />

          {/* Chat routes */}  
          <Route path="/chatpage" element={<Chat />} />    

          {/* New chat */}  
          <Route path="/chatpage/new" element={<New />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/chatpage" replace />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;