import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import { AuthProvider } from './context/AuthContext';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Profile from './pages/company/Profile';
import CreateJob from './pages/jobs/CreateJob';
import JobList from './pages/jobs/JobList';
import JobApplications from './pages/jobs/JobApplications';
import Search from './pages/search/Search';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/company/profile" element={<Profile />} />
          <Route path="/company/jobs/create" element={<CreateJob />} />
          <Route path="/company/jobs" element={<JobList />} />
          <Route path="/company/jobs/:jobId/applications" element={<JobApplications />} />
          <Route path="/company/search" element={<Search />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
