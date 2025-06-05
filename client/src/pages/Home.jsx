import { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "../components/home/Dashboard";
import LandingMessage from "../components/home/LandingMessage";

export default function Home() {
  const [username, setUsername] = useState("");
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
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <Dashboard username={username} userType={userType} />
  ) : (
    <LandingMessage />
  );
}