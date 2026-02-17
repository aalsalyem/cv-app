import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import CvPage from './pages/CvPage';
import ConsolePage from './pages/ConsolePage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cv" element={<CvPage />} />
          <Route path="/console" element={<ConsolePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
