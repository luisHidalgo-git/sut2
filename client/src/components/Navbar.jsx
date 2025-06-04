import { Link, useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../utils/alerts";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    await showSuccessAlert(
      "Logged Out",
      "You have been successfully logged out."
    );
    navigate("/login");
  };

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
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register/student"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
                >
                  Student Register
                </Link>
                <Link
                  to="/register/company"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
                >
                  Company Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
