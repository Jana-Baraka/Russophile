import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LessonsPage from './pages/LessonsPage';
import AdminPage from './pages/AdminPage';
import BookTrackPage from './pages/BookTrackPage';


function App() {
  return (
<Router>
      <nav>
        <Link to="/">Login</Link>{" | "}
        <Link to="/register">Register</Link>{" | "}
        <Link to="/lessons">Lessons</Link>{" | "}
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/lessons/master-and-margarita" element={<BookTrackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
