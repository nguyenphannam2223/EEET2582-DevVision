import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import { AuthProvider } from './context/AuthContext';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Profile from './pages/company/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/company/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
