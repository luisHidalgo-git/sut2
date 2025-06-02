import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import StudentRegister from './pages/StudentRegister';
import CompanyRegister from './pages/CompanyRegister';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/student" element={<StudentRegister />} />
          <Route path="/register/company" element={<CompanyRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;