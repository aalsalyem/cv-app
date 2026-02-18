import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import CvPage from './pages/CvPage';
import ConsolePage from './pages/ConsolePage';
import './App.css';

function getSubdomain(): string | null {
  const hostname = window.location.hostname;

  // Handle localhost subdomains (e.g., cv.localhost)
  if (hostname.endsWith('.localhost') || hostname.endsWith('.127.0.0.1')) {
    return hostname.split('.')[0];
  }

  // Handle production subdomains (e.g., cv.yourdomain.com)
  const parts = hostname.split('.');
  if (parts.length > 2) {
    return parts[0];
  }

  return null;
}

function App() {
  const subdomain = getSubdomain();

  const renderPage = () => {
    switch (subdomain) {
      case 'cv':
        return <CvPage />;
      case 'admin':
        return <ConsolePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        {renderPage()}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
