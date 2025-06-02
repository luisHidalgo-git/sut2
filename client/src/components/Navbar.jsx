import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              PracticePro
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
              Login
            </Link>
            <Link to="/register/student" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
              Student Register
            </Link>
            <Link to="/register/company" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
              Company Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}