import { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../components/home/Dashboard";
import LandingMessage from "../components/home/LandingMessage";

export default function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLoggedIn = !!localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setUsername(response.data.username);
          localStorage.setItem("username", response.data.username);
          setError(null);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to load user data");
          // If token is invalid, clear it
          if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userType");
            localStorage.removeItem("username");
          }
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [isLoggedIn]);

  // Show loading spinner while fetching user data
  if (loading && isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Show error if there's an error
  if (error && isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show dashboard if logged in and we have username, otherwise show landing page
  return isLoggedIn && username ? (
    <Dashboard username={username} userType={userType} />
  ) : (
    <LandingMessage />
  );
}