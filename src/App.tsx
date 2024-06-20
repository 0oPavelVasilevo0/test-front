import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import RegisterPage from './pages/RegisterPage';
import ScrollToTop from './util-scroll/scrollToTop';
import Navbar from './components/navbar/Navbar';
import './App.css';

function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
