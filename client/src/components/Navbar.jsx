import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { showSuccessAlert } from "../utils/alerts";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("username");
    await showSuccessAlert(
      "Logged Out",
      "You have been successfully logged out."
    );
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              PracticePro
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <UserCircleIcon className="h-8 w-8" />
                  <span>{username || "User"}</span>
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
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